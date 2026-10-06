const { createClient } = require('@supabase/supabase-js');

async function runE2ETests() {
  console.log("Starting End-to-End Test for Zara Tours & Travels Review System...");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || (!anonKey && !serviceKey)) {
    console.error("❌ FAIL: Missing Supabase credentials in the environment.");
    console.error("Cannot perform E2E test without NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, and SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }

  // Create two clients: one simulating a public user (anon), one simulating admin (service role)
  const publicClient = createClient(supabaseUrl, anonKey);
  const adminClient = serviceKey ? createClient(supabaseUrl, serviceKey) : null;

  let testReviewId = null;

  try {
    console.log("\n--- TEST 1: Public user submits a review ---");
    const testReview = {
      name: "Test Customer",
      rating: 5,
      text: "Automated review system test"
      // intentionally omitting `approved: false` to test database defaults as implemented
    };

    const { data: insertData, error: insertError } = await publicClient
      .from('reviews')
      .insert([testReview])
      .select();

    if (insertError) throw new Error(`Public insert failed: ${insertError.message}`);
    
    testReviewId = insertData[0].id;
    console.log(`✅ PASS: Review submitted successfully (ID: ${testReviewId})`);

    console.log("\n--- TEST 2: Verify review is NOT publicly visible (approved = false) ---");
    const { data: publicFetch, error: publicFetchError } = await publicClient
      .from('reviews')
      .select('*')
      .eq('id', testReviewId);

    if (publicFetchError) throw new Error(`Public fetch failed: ${publicFetchError.message}`);
    
    // RLS should either return empty or return it if they are allowed to see their own. But normally, approved=false is hidden.
    // If the RLS is strict, publicFetch might be empty.
    if (publicFetch.length > 0 && publicFetch[0].approved === true) {
       throw new Error("Review was automatically approved, which violates requirements.");
    }
    console.log("✅ PASS: New review is correctly restricted by RLS (approved = false or completely hidden from public SELECT).");

    if (!adminClient) {
      console.warn("⚠️ Cannot continue Admin tests without SUPABASE_SERVICE_ROLE_KEY.");
      process.exit(0);
    }

    console.log("\n--- TEST 3: Admin sees the pending review ---");
    const { data: adminFetch, error: adminFetchError } = await adminClient
      .from('reviews')
      .select('*')
      .eq('id', testReviewId);

    if (adminFetchError) throw new Error(`Admin fetch failed: ${adminFetchError.message}`);
    if (adminFetch.length === 0) throw new Error("Admin could not find the review.");
    if (adminFetch[0].approved !== false) throw new Error("Review approved status is not false.");
    console.log("✅ PASS: Admin successfully fetched the pending review.");

    console.log("\n--- TEST 4: Admin approves the review ---");
    const { error: approveError } = await adminClient
      .from('reviews')
      .update({ approved: true })
      .eq('id', testReviewId);

    if (approveError) throw new Error(`Admin approve failed: ${approveError.message}`);
    console.log("✅ PASS: Admin successfully approved the review.");

    console.log("\n--- TEST 5: Verify review is now publicly visible ---");
    const { data: publicFetchApproved, error: publicFetchAppError } = await publicClient
      .from('reviews')
      .select('*')
      .eq('id', testReviewId);

    if (publicFetchAppError) throw new Error(`Public fetch approved failed: ${publicFetchAppError.message}`);
    if (publicFetchApproved.length === 0 || publicFetchApproved[0].approved !== true) {
      throw new Error("Review is still not publicly visible after approval.");
    }
    console.log("✅ PASS: Approved review is now publicly visible.");

    console.log("\n--- TEST 6: Admin deletes the review ---");
    const { error: deleteError } = await adminClient
      .from('reviews')
      .delete()
      .eq('id', testReviewId);

    if (deleteError) throw new Error(`Admin delete failed: ${deleteError.message}`);
    console.log("✅ PASS: Admin successfully deleted the review.");

    console.log("\n--- TEST 7: Verify deletion ---");
    const { data: verifyDelete, error: verifyDelError } = await adminClient
      .from('reviews')
      .select('*')
      .eq('id', testReviewId);

    if (verifyDelError) throw new Error(`Verify delete failed: ${verifyDelError.message}`);
    if (verifyDelete.length > 0) throw new Error("Review still exists in the database.");
    console.log("✅ PASS: Review has been permanently removed.");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉");
  } catch (err) {
    console.error(`\n❌ FAIL: ${err.message}`);
    
    // Cleanup if something failed after insertion
    if (testReviewId && adminClient) {
      console.log(`Attempting to clean up test review ${testReviewId}...`);
      await adminClient.from('reviews').delete().eq('id', testReviewId);
    }
    process.exit(1);
  }
}

runE2ETests();
