"use client";

import { useState } from "react";
import { CreditCard, CheckCircle2, Info } from "lucide-react";
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";

// Subscription plan types

export default function DashboardPage() {
  // Using useState without destructuring to avoid the unused variable warning
  const [currentSubscription] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">
          Welcome to your universal gym membership dashboard
        </p>
      </div>

      {/* Subscription Status Card */}
      <Card className="border-[#1E3A8A]/10 bg-gradient-to-br from-white to-[#1E3A8A]/[0.03]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>
              {currentSubscription 
                ? "You currently have an active subscription" 
                : "You don't have an active subscription yet"}
            </CardDescription>
          </div>
          <div className="bg-[#1E3A8A]/10 p-3 rounded-full">
            <CreditCard className="h-8 w-8 text-[#1E3A8A]" />
          </div>
        </CardHeader>
        <CardContent>
          {currentSubscription ? (
            <div className="bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 rounded-lg p-4 flex items-start gap-3">
              <div className="mt-1 text-[#1E3A8A]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-[#1E3A8A]">Active Membership</h3>
                <p className="text-sm text-[#1E3A8A]/80">
                  You have access to all facilities under your Plus plan. Your next payment is on June 15, 2023.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#8B0000]/5 border border-[#8B0000]/10 rounded-lg p-4 flex items-start gap-3">
              <div className="mt-1 text-[#8B0000]">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-[#8B0000]">No Active Membership</h3>
                <p className="text-sm text-[#8B0000]/80">
                  Choose a subscription plan below to get started with your gym membership.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      

      {/* Recent Activity */}
      <Card className="border-[#1E3A8A]/10 bg-gradient-to-br from-white to-[#1E3A8A]/[0.02]">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent gym visits and bookings</CardDescription>
        </CardHeader>
        <CardContent>
          {currentSubscription ? (
            <div className="space-y-4">
              <div className="border-b border-[#1E3A8A]/10 pb-4 hover:bg-[#1E3A8A]/[0.02] p-2 rounded transition-colors">
                <p className="text-sm text-gray-500">June 10, 2023 • 10:30 AM</p>
                <p className="font-medium">Visited FitLife Gym - Downtown</p>
              </div>
              <div className="border-b border-[#1E3A8A]/10 pb-4 hover:bg-[#1E3A8A]/[0.02] p-2 rounded transition-colors">
                <p className="text-sm text-gray-500">June 8, 2023 • 5:45 PM</p>
                <p className="font-medium">Booked: Yoga Class with Sarah (June 15)</p>
              </div>
              <div className="hover:bg-[#1E3A8A]/[0.02] p-2 rounded transition-colors">
                <p className="text-sm text-gray-500">June 5, 2023 • 7:15 AM</p>
                <p className="font-medium">Visited PowerFit Centre - Westside</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 bg-[#1E3A8A]/[0.01] rounded-lg p-4">
              <p>No recent activity to display.</p>
              <p className="text-sm mt-1">Subscribe to a plan to start using our gym network!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Subscription Card Component
