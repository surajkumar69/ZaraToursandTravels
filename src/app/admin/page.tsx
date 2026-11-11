"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Trash2,
  Loader2,
  Lock,
  ArrowLeft,
  Star,
} from "lucide-react";
import {
  fetchAllReviewsAction,
  approveReviewAction,
  deleteReviewAction,
  loginAction,
  logoutAction,
  checkAuthAction,
} from "./actions";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function verifyAuth() {
      const isAuth = await checkAuthAction();
      setIsAuthenticated(isAuth);
      setCheckingAuth(false);
      if (isAuth) {
        fetchReviews();
      }
    }
    verifyAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const result = await loginAction(password);
      if (result.success) {
        setIsAuthenticated(true);
        fetchReviews();
      } else {
        setErrorMsg(result.error || "Login failed");
      }
    } catch (err) {
      setErrorMsg("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAction();
    setIsAuthenticated(false);
    setPassword("");
    setReviews([]);
  };

  async function fetchReviews() {
    setLoading(true);
    try {
      const data = await fetchAllReviewsAction();
      setReviews(data || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to fetch reviews");
      if (err.message === "Unauthorized") {
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  }

  async function approveReview(id: string) {
    try {
      await approveReviewAction(id);
      fetchReviews();
    } catch (err: any) {
      alert("Error approving review: " + err.message);
      if (err.message === "Unauthorized") setIsAuthenticated(false);
    }
  }

  async function deleteReview(id: string) {
    if (!confirm("Are you sure you want to permanently delete this review?"))
      return;
    try {
      await deleteReviewAction(id);
      fetchReviews();
    } catch (err: any) {
      alert("Error deleting review: " + err.message);
      if (err.message === "Unauthorized") setIsAuthenticated(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-champagne-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center p-4 text-charcoal-900">
        <div className="bg-ivory-50 p-8 sm:p-10 rounded-3xl shadow-xl border border-ivory-200 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-forest-900 p-4 rounded-2xl text-champagne-300 shadow-md">
              <Lock className="w-7 h-7" aria-hidden="true" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold text-center text-forest-900 mb-2">
            Admin Access
          </h1>
          <p className="text-center text-sm text-charcoal-600 mb-6">
            Zara Tours &amp; Travels Review Moderation
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <p
                role="alert"
                className="text-red-700 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-200"
              >
                {errorMsg}
              </p>
            )}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold text-charcoal-900 mb-1.5"
              >
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-h-[48px] px-4 py-3 text-base bg-ivory-100/70 border border-charcoal-400/40 rounded-xl focus:ring-2 focus:ring-champagne-500/40 focus:border-forest-800 outline-none text-charcoal-900"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-forest-900 text-ivory-50 font-bold py-3 rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-70"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>Login</span>
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-600 hover:text-forest-900"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100 p-4 md:p-10 text-charcoal-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-champagne-600 hover:text-forest-900 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Back to Website
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest-900">
              Review Management
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={fetchReviews}
              className="min-h-[44px] px-5 py-2 bg-ivory-50 border border-ivory-200 hover:border-champagne-500 rounded-xl font-semibold text-sm text-forest-900 transition-colors"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="min-h-[44px] px-5 py-2 bg-forest-900 hover:bg-forest-800 text-ivory-50 rounded-xl font-semibold text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl text-sm border border-red-200 text-center font-medium"
          >
            {errorMsg}
          </div>
        )}

        {loading && reviews.length === 0 ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-champagne-500" />
          </div>
        ) : (
          <div className="bg-ivory-50 rounded-3xl shadow-sm border border-ivory-200 overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-forest-900 text-ivory-50">
                  <th scope="col" className="p-4 font-semibold text-sm">
                    Status
                  </th>
                  <th scope="col" className="p-4 font-semibold text-sm">
                    Name
                  </th>
                  <th scope="col" className="p-4 font-semibold text-sm">
                    Rating
                  </th>
                  <th scope="col" className="p-4 font-semibold text-sm">
                    Review
                  </th>
                  <th scope="col" className="p-4 font-semibold text-sm">
                    Date
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-semibold text-sm text-right"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-10 text-center text-charcoal-600"
                    >
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-ivory-200 hover:bg-ivory-100/60 transition-colors"
                    >
                      <td className="p-4 whitespace-nowrap">
                        {review.approved ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest-100 text-forest-900">
                            <CheckCircle
                              className="w-3.5 h-3.5"
                              aria-hidden="true"
                            />
                            Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-champagne-200 text-charcoal-900">
                            <Loader2
                              className="w-3.5 h-3.5 animate-spin"
                              aria-hidden="true"
                            />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-semibold whitespace-nowrap text-forest-900">
                        {review.name}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-medium">
                          <Star
                            className="w-4 h-4 fill-champagne-500 text-champagne-500"
                            aria-hidden="true"
                          />
                          {review.rating} / 5
                        </span>
                      </td>
                      <td
                        className="p-4 max-w-xs md:max-w-md truncate text-charcoal-600"
                        title={review.review}
                      >
                        {review.review}
                      </td>
                      <td className="p-4 text-xs text-charcoal-600 whitespace-nowrap">
                        {new Date(review.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        {!review.approved && (
                          <button
                            type="button"
                            onClick={() => approveReview(review.id)}
                            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-forest-700 hover:bg-forest-100 rounded-lg transition-colors"
                            aria-label={`Approve review from ${review.name}`}
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" aria-hidden="true" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteReview(review.id)}
                          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label={`Delete review from ${review.name}`}
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
