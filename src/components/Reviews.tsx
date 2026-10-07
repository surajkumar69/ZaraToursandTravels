"use client";

import { useState, useEffect } from "react";
import { Star, Quote, Loader2, Send } from "lucide-react";
import { supabase, supabaseUrl } from "@/lib/supabaseClient";
import { submitReviewAction } from "@/app/actions";

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  created_at: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      // If the URL is missing or is the placeholder, we shouldn't attempt a real fetch
      // because it will cause a CORS error / Failed to fetch in the browser.
      if (!supabaseUrl || supabaseUrl.includes('placeholder.supabase.co')) {
        setReviews([]);
        return;
      }

      const pubKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
      if (pubKey.includes('sb_secret_') || pubKey.includes('service_role')) {
        console.error("Configuration Error: Vercel NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY contains a secret service role key. Please use your sb_publishable_ key.");
        setReviews([]);
        return;
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err: any) {
      console.error(`Error fetching reviews from ${supabaseUrl}:`, err.message || err);
      // Fail silently for read operations to avoid breaking the UI for regular visitors
      setReviews([]); 
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!name.trim() || !reviewText.trim()) {
      setErrorMsg("Please fill out all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      if (!supabaseUrl || supabaseUrl.includes('placeholder.supabase.co')) {
        throw new Error("Database connection is not configured correctly.");
      }

      // Early detection of incorrect Vercel configuration
      const pubKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
      if (pubKey.includes('sb_secret_') || pubKey.includes('service_role')) {
        throw new Error("Configuration Error: You pasted a SECRET server key into the PUBLIC publishable key field in Vercel. Please use your valid sb_publishable_ key.");
      }

      // Submit via Server Action to bypass RLS and securely auto-approve
      await submitReviewAction(name, rating, reviewText);

      setSuccessMsg("Thank you! Your review has been submitted and is now public.");
      setName("");
      setRating(5);
      setReviewText("");
      
      // Instantly refresh the UI to show the newly approved review
      fetchReviews();
    } catch (err: any) {
      console.error("Error submitting review:", err);
      // Display a more friendly message for network errors
      const errorText = err.message || "Failed to submit review. Please try again.";
      if (
        errorText.includes("Failed to fetch") || 
        errorText.includes("NetworkError") || 
        errorText.includes("Load failed")
      ) {
        setErrorMsg(`Unable to connect to the database (${errorText}). It failed to reach: ${supabaseUrl}. Please ensure this URL is correct and disable any Ad-Blockers (e.g. Brave Shields) that might block Supabase domains.`);
      } else {
        setErrorMsg(`Error: ${errorText}`);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reviews" className="py-20 bg-slate-50 text-navy-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h4 className="text-gold-500 font-bold uppercase tracking-wider mb-2">Testimonials</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Read what travelers have to say about their journey with Zara Tours & Travels.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-gold-500/20" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 italic leading-relaxed flex-grow">
                  "{review.review}"
                </p>
                
                <div className="mt-auto border-t border-gray-100 pt-4">
                  <h3 className="font-bold text-lg">{review.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 mb-16">
            <p>No reviews yet. Be the first to leave a review!</p>
          </div>
        )}

        {/* Review Submission Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Leave a Review</h3>
            <p className="text-gray-600 text-sm">We'd love to hear about your experience with us!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {successMsg && (
              <div className="p-4 bg-green-50 text-green-700 rounded-xl text-sm border border-green-200 text-center font-medium">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200 text-center font-medium">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star className={`w-8 h-8 ${rating >= star ? 'fill-gold-500 text-gold-500' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
              <textarea 
                required 
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:border-transparent outline-none text-navy-900 resize-none"
                placeholder="Tell us about your trip..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold-500 hover:bg-gold-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Review
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
