'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AnalyticsData {
  total_users: number;
  premium_users: number;
  free_users: number;
  total_contacts: number;
  total_revenue: number;
  mrr: number;
  churn_rate: number;
  daily_signups: any[];
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch analytics');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Admin Analytics</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <p>Loading analytics...</p>
        ) : !analytics ? (
          <p>Failed to load analytics</p>
        ) : (
          <div>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.total_users}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm">Premium Users</p>
                <p className="text-3xl font-bold text-blue-600">{analytics.premium_users}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm">Total Contacts</p>
                <p className="text-3xl font-bold text-green-600">{analytics.total_contacts}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm">MRR</p>
                <p className="text-3xl font-bold text-purple-600">${analytics.mrr.toFixed(2)}</p>
              </div>
            </div>

            {/* Revenue & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Revenue</span>
                    <span className="font-bold">${analytics.total_revenue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Recurring Revenue</span>
                    <span className="font-bold">${analytics.mrr.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Free Users</span>
                    <span className="font-bold">{analytics.free_users}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Churn Rate</span>
                    <span className="font-bold text-red-600">{(analytics.churn_rate * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Premium Conversion</span>
                    <span className="font-bold text-green-600">
                      {analytics.total_users > 0
                        ? ((analytics.premium_users / analytics.total_users) * 100).toFixed(2)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Contacts per User</span>
                    <span className="font-bold">
                      {analytics.total_users > 0
                        ? (analytics.total_contacts / analytics.total_users).toFixed(2)
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
