"use client";

import { useState, useEffect, useRef } from "react";
import {
  Star,
  Quote,
  Loader2,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { supabase, supabaseUrl } from "@/lib/supabaseClient";
import { submitReviewAction } from "@/app/actions";

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  created_at: string;
}

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "ZT";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
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

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  // Sync aria-invalid & fallback class after blur/input for non-intrusive feedback
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const supportsUserInvalid =
      typeof CSS !== "undefined" &&
      CSS.supports?.("selector(:user-invalid)");

    const onBlur = (e: FocusEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        if (!target.checkValidity()) {
          target.setAttribute("aria-invalid", "true");
          if (!supportsUserInvalid) {
            target.classList.add("user-invalid-fallback");
          }
        } else {
          target.removeAttribute("aria-invalid");
          target.classList.remove("user-invalid-fallback");
        }
      }
    };

    const onInput = (e: Event) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        if (target.checkValidity()) {
          target.removeAttribute("aria-invalid");
          target.classList.remove("user-invalid-fallback");
        }
      }
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);

    return () => {
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
    };
  }, []);

  async function fetchReviews() {
    try {
      // If the URL is missing or is the placeholder, we shouldn't attempt a real fetch
      // because it will cause a CORS error / Failed to fetch in the browser.
      if (!supabaseUrl || supabaseUrl.includes("placeholder.supabase.co")) {
        setReviews([]);
        return;
      }

      const pubKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
      if (pubKey.includes("sb_secret_") || pubKey.includes("service_role")) {
        console.error(
          "Configuration Error: Vercel NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY contains a secret service role key. Please use your sb_publishable_ key."
        );
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
      console.error(
        `Error fetching reviews from ${supabaseUrl}:`,
        err.message || err
      );
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
      if (!supabaseUrl || supabaseUrl.includes("placeholder.supabase.co")) {
        throw new Error("Database connection is not configured correctly.");
      }

      // Early detection of incorrect Vercel configuration
      const pubKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
      if (pubKey.includes("sb_secret_") || pubKey.includes("service_role")) {
        throw new Error(
          "Configuration Error: You pasted a SECRET server key into the PUBLIC publishable key field in Vercel. Please use your valid sb_publishable_ key."
        );
      }

      // Submit via Server Action to bypass RLS and securely auto-approve
      await submitReviewAction(name, rating, reviewText);

      setSuccessMsg(
        "Thank you! Your review has been submitted and is now public."
      );
      setName("");
      setRating(5);
      setReviewText("");

      // Clear validation classes after reset
      formRef.current
        ?.querySelectorAll(".user-invalid-fallback, [aria-invalid]")
        .forEach((el) => {
          el.classList.remove("user-invalid-fallback");
          el.removeAttribute("aria-invalid");
        });

      // Instantly refresh the UI to show the newly approved review
      fetchReviews();
    } catch (err: any) {
      console.error("Error submitting review:", err);
      // Display a more friendly message for network errors
      const errorText =
        err.message || "Failed to submit review. Please try again.";
      if (
        errorText.includes("Failed to fetch") ||
        errorText.includes("NetworkError") ||
        errorText.includes("Load failed")
      ) {
        setErrorMsg(
          `Unable to connect to the database (${errorText}). It failed to reach: ${supabaseUrl}. Please ensure this URL is correct and disable any Ad-Blockers (e.g. Brave Shields) that might block Supabase domains.`
        );
      } else {
        setErrorMsg(`Error: ${errorText}`);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <section
      id="reviews"
      className="py-20 md:py-28 bg-ivory-100 text-charcoal-900 border-t border-ivory-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-champagne-600 font-semibold uppercase tracking-[0.2em] text-xs mb-3">
            Testimonials
          </p>
          <h2
            className="font-display font-bold text-forest-900 text-balance mb-4"
            style={{ fontSize: "clamp(2rem, 1.4rem + 2.2vw, 3.25rem)" }}
          >
            What Our Customers Say
          </h2>
          <p className="text-charcoal-600 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
            Don&apos;t just take our word for it. Read what travelers have to
            say about their journey with Zara Tours &amp; Travels.
          </p>

          {averageRating && (
            <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-ivory-50 border border-champagne-400/40 shadow-sm">
              <div className="flex items-center gap-1" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 fill-champagne-500 text-champagne-500"
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-forest-900">
                {averageRating} / 5.0
              </span>
              <span className="text-xs text-charcoal-600 border-l border-ivory-200 pl-3">
                {reviews.length}{" "}
                {reviews.length === 1 ? "Guest Review" : "Guest Reviews"}
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12" role="status" aria-label="Loading reviews">
            <Loader2 className="w-8 h-8 animate-spin text-champagne-500" />
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
            {reviews.map((review) => {
              const safeRating = Math.max(
                1,
                Math.min(5, Math.round(Number(review.rating) || 5))
              );
              return (
                <article
                  key={review.id}
                  className="luxury-card bg-ivory-50 p-7 sm:p-8 rounded-3xl border border-ivory-200 shadow-sm hover:shadow-[0_18px_40px_rgba(7,22,16,0.09)] hover:-translate-y-1 transition-all duration-300 relative flex flex-col"
                >
                  <Quote
                    className="absolute top-6 right-6 w-9 h-9 text-champagne-500/25"
                    aria-hidden="true"
                  />

                  <div
                    className="flex items-center gap-1 mb-5"
                    aria-label={`Rated ${safeRating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        aria-hidden="true"
                        className={`w-4 h-4 ${
                          star <= safeRating
                            ? "fill-champagne-500 text-champagne-500"
                            : "text-ivory-300"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-charcoal-700 mb-6 leading-relaxed flex-grow text-base text-pretty">
                    &ldquo;{review.review}&rdquo;
                  </blockquote>

                  <footer className="mt-auto border-t border-ivory-200 pt-4 flex items-center gap-3.5">
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 rounded-full bg-forest-900 text-champagne-300 font-display font-bold text-sm flex items-center justify-center shrink-0"
                    >
                      {getInitials(review.name)}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-forest-900 leading-tight">
                        {review.name}
                      </h3>
                      <p className="text-xs text-charcoal-400 mt-0.5">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </footer>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 px-6 bg-ivory-50 rounded-3xl border border-ivory-200 text-charcoal-600 mb-16 max-w-xl mx-auto">
            <p className="font-display text-xl text-forest-900 font-semibold mb-1">
              No reviews yet
            </p>
            <p className="text-sm">Be the first traveler to leave a review!</p>
          </div>
        )}

        {/* Review Submission Form */}
        <div className="luxury-card max-w-2xl mx-auto bg-ivory-50 p-7 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(7,22,16,0.08)] border border-ivory-200 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-900 via-champagne-400 to-forest-900"
          />

          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-champagne-600 font-semibold mb-2">
              Share Your Experience
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-forest-900 mb-2">
              Leave a Review
            </h3>
            <p className="text-charcoal-600 text-sm">
              We&apos;d love to hear about your experience with us!
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {successMsg && (
              <div
                role="status"
                aria-live="polite"
                className="p-4 bg-forest-50 text-forest-900 rounded-2xl text-sm border border-forest-700/30 font-medium flex items-center justify-center gap-2.5 text-center"
              >
                <CheckCircle2
                  className="w-5 h-5 text-forest-700 shrink-0"
                  aria-hidden="true"
                />
                <span>{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-4 bg-red-50 text-red-800 rounded-2xl text-sm border border-red-200 font-medium flex items-center justify-center gap-2.5 text-center"
              >
                <AlertCircle
                  className="w-5 h-5 text-red-700 shrink-0"
                  aria-hidden="true"
                />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="review-name"
                className="block text-sm font-semibold text-charcoal-900 mb-1.5"
              >
                Your Name{" "}
                <span className="text-red-700" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="review-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-errormessage="review-name-error"
                className="field-input w-full min-h-[48px] px-4 py-3 text-base bg-ivory-100/70 border border-charcoal-400/40 rounded-xl focus:bg-ivory-50 focus:border-forest-800 focus:ring-2 focus:ring-champagne-500/40 outline-none text-charcoal-900 placeholder:text-charcoal-400 transition-colors"
                placeholder="John Doe"
              />
              <div id="review-name-error" className="field-error">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Please enter your name.</span>
              </div>
            </div>

            <fieldset>
              <legend className="block text-sm font-semibold text-charcoal-900 mb-2">
                Rating
              </legend>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} out of 5 stars`}
                    aria-pressed={rating === star}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-champagne-100 transition-transform hover:scale-105"
                  >
                    <Star
                      aria-hidden="true"
                      className={`w-7 h-7 transition-colors ${
                        rating >= star
                          ? "fill-champagne-500 text-champagne-500"
                          : "text-ivory-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-semibold text-charcoal-600">
                  {rating} / 5
                </span>
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="review-text"
                className="block text-sm font-semibold text-charcoal-900 mb-1.5"
              >
                Your Review{" "}
                <span className="text-red-700" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="review-text"
                name="review"
                required
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                aria-errormessage="review-text-error"
                className="field-input w-full px-4 py-3 text-base bg-ivory-100/70 border border-charcoal-400/40 rounded-xl focus:bg-ivory-50 focus:border-forest-800 focus:ring-2 focus:ring-champagne-500/40 outline-none text-charcoal-900 placeholder:text-charcoal-400 transition-colors"
                placeholder="Tell us about your trip..."
              />
              <div id="review-text-error" className="field-error">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Please share a few words about your journey.</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full min-h-[52px] bg-forest-900 hover:bg-forest-800 text-ivory-50 py-3.5 px-6 rounded-xl font-bold flex justify-center items-center gap-2.5 transition-all shadow-lg shadow-forest-950/15 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2
                    className="w-5 h-5 animate-spin text-champagne-300"
                    aria-hidden="true"
                  />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send
                    className="w-4 h-4 text-champagne-300"
                    aria-hidden="true"
                  />
                  <span>Submit Review</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
