"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, CheckCircle2, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Subscription plan types
interface Feature {
  name: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  frequency: "monthly" | "annual";
  description: string;
  features: Feature[];
  popular?: boolean;
}

// Mock data for subscription plans
const basicFeatures: Feature[] = [
  { name: "Access to all basic gyms", included: true },
  { name: "Standard equipment usage", included: true },
  { name: "Online class booking", included: true },
  { name: "Access to premium gyms", included: false },
  { name: "Personal trainer sessions", included: false },
  { name: "Spa and wellness access", included: false },
];

const plusFeatures: Feature[] = [
  { name: "Access to all basic gyms", included: true },
  { name: "Standard equipment usage", included: true },
  { name: "Online class booking", included: true },
  { name: "Access to premium gyms", included: true },
  { name: "Personal trainer sessions (2/month)", included: true },
  { name: "Spa and wellness access", included: false },
];

const premiumFeatures: Feature[] = [
  { name: "Access to all basic gyms", included: true },
  { name: "Standard equipment usage", included: true },
  { name: "Online class booking", included: true },
  { name: "Access to premium gyms", included: true },
  { name: "Personal trainer sessions (4/month)", included: true },
  { name: "Spa and wellness access", included: true },
];

const monthlyPlans: SubscriptionPlan[] = [
  {
    id: "basic-monthly",
    name: "Basic",
    price: 29.99,
    frequency: "monthly",
    description: "Perfect for casual gym-goers",
    features: basicFeatures,
  },
  {
    id: "plus-monthly",
    name: "Plus",
    price: 49.99,
    frequency: "monthly",
    description: "Ideal for regular fitness enthusiasts",
    features: plusFeatures,
    popular: true,
  },
  {
    id: "premium-monthly",
    name: "Premium",
    price: 79.99,
    frequency: "monthly",
    description: "Ultimate fitness experience",
    features: premiumFeatures,
  },
];

const annualPlans: SubscriptionPlan[] = [
  {
    id: "basic-annual",
    name: "Basic",
    price: 299.99,
    frequency: "annual",
    description: "Perfect for casual gym-goers",
    features: basicFeatures,
  },
  {
    id: "plus-annual",
    name: "Plus",
    price: 499.99,
    frequency: "annual",
    description: "Ideal for regular fitness enthusiasts",
    features: plusFeatures,
    popular: true,
  },
  {
    id: "premium-annual",
    name: "Premium",
    price: 799.99,
    frequency: "annual",
    description: "Ultimate fitness experience",
    features: premiumFeatures,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [currentSubscription, setCurrentSubscription] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    // Navigate to the plan details page
    router.push(`/dashboard/subscription/${planId}`);
  };

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

      {/* Subscription Plans */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Subscription Plans</h2>
        <Tabs defaultValue="monthly">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-64 grid-cols-2 bg-[#1E3A8A]/5">
              <TabsTrigger value="monthly" className="data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]">Monthly</TabsTrigger>
              <TabsTrigger value="annual" className="data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]">Annual (Save 20%)</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {monthlyPlans.map((plan) => (
                <SubscriptionCard 
                  key={plan.id} 
                  plan={plan} 
                  isActive={currentSubscription === plan.id}
                  onSelect={() => handleSelectPlan(plan.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="annual">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {annualPlans.map((plan) => (
                <SubscriptionCard 
                  key={plan.id} 
                  plan={plan} 
                  isActive={currentSubscription === plan.id}
                  onSelect={() => handleSelectPlan(plan.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

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
function SubscriptionCard({ 
  plan, 
  isActive, 
  onSelect 
}: { 
  plan: SubscriptionPlan; 
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
      plan.popular 
        ? 'border-[#1E3A8A] bg-gradient-to-b from-white to-[#1E3A8A]/[0.08] shadow-lg' 
        : 'hover:border-[#1E3A8A]/30 bg-gradient-to-b from-white to-[#1E3A8A]/[0.02]'
    }`}>
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-[#1E3A8A] text-white text-xs font-bold py-1 px-3 rounded-bl">
            MOST POPULAR
          </div>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <CardTitle className={plan.popular ? "text-[#1E3A8A]" : ""}>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-gray-500">/{plan.frequency === "monthly" ? "mo" : "year"}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 group">
              <CheckCircle2 
                className={`h-5 w-5 mt-0.5 transition-colors ${
                  feature.included 
                    ? "text-[#1E3A8A] group-hover:text-[#1E3A8A]/80" 
                    : "text-gray-300"
                }`} 
              />
              <span className={feature.included 
                ? "group-hover:text-[#1E3A8A]/80 transition-colors" 
                : "text-gray-400 line-through"
              }>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full transition-colors ${
            isActive 
              ? "bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20 border border-[#1E3A8A]/30" 
              : "bg-[#8B0000] hover:bg-[#A52A2A] text-white"
          }`}
          variant={isActive ? "outline" : "default"}
          onClick={onSelect}
        >
          {isActive ? "Current Plan" : "Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
} 