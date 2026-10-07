"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Trash2, Loader2, Lock } from "lucide-react";
import { 
  fetchAllReviewsAction, 
  approveReviewAction, 
  deleteReviewAction,
  loginAction,
  logoutAction,
  checkAuthAction
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
    if (!confirm("Are you sure you want to permanently delete this review?")) return;
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-gold-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-navy-900">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-gold-100 p-4 rounded-full text-gold-600">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">{errorMsg}</p>
            )}
            <div>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy-900 outline-none"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-navy-900 text-white font-bold py-3 rounded-xl hover:bg-navy-800 transition-colors disabled:opacity-70"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-navy-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Review Management</h1>
          <div className="flex gap-4">
            <button 
              onClick={fetchReviews}
              className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              Refresh
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {loading && reviews.length === 0 ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gold-500" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600">Name</th>
                  <th className="p-4 font-semibold text-gray-600">Rating</th>
                  <th className="p-4 font-semibold text-gray-600">Review</th>
                  <th className="p-4 font-semibold text-gray-600">Date</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review.id} className="border-b border-gray-50 hover:bg-slate-50/50">
                      <td className="p-4 whitespace-nowrap">
                        {review.approved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3" /> Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Loader2 className="w-3 h-3 animate-spin" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-medium whitespace-nowrap">{review.name}</td>
                      <td className="p-4 whitespace-nowrap">{review.rating} / 5</td>
                      <td className="p-4 max-w-xs md:max-w-md truncate text-gray-600" title={review.review}>
                        {review.review}
                      </td>
                      <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(review.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        {!review.approved && (
                          <button
                            onClick={() => approveReview(review.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
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
