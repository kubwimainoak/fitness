"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, ArrowLeft, CreditCard, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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

// Mock data for all subscription plans
const availablePlans: { [key: string]: SubscriptionPlan } = {
  "basic-monthly": {
    id: "basic-monthly",
    name: "Basic",
    price: 29.99,
    frequency: "monthly",
    description: "Perfect for casual gym-goers",
    features: [
      { name: "Access to all basic gyms", included: true },
      { name: "Standard equipment usage", included: true },
      { name: "Online class booking", included: true },
      { name: "Access to premium gyms", included: false },
      { name: "Personal trainer sessions", included: false },
      { name: "Spa and wellness access", included: false },
    ],
  },
  "plus-monthly": {
    id: "plus-monthly",
    name: "Plus",
    price: 49.99,
    frequency: "monthly",
    description: "Ideal for regular fitness enthusiasts",
    features: [
      { name: "Access to all basic gyms", included: true },
      { name: "Standard equipment usage", included: true },
      { name: "Online class booking", included: true },
      { name: "Access to premium gyms", included: true },
      { name: "Personal trainer sessions (2/month)", included: true },
      { name: "Spa and wellness access", included: false },
    ],
    popular: true,
  },
  "premium-monthly": {
    id: "premium-monthly",
    name: "Premium",
    price: 79.99,
    frequency: "monthly",
    description: "Ultimate fitness experience",
    features: [
      { name: "Access to all basic gyms", included: true },
      { name: "Standard equipment usage", included: true },
      { name: "Online class booking", included: true },
      { name: "Access to premium gyms", included: true },
      { name: "Personal trainer sessions (4/month)", included: true },
      { name: "Spa and wellness access", included: true },
    ],
  },
  "basic-annual": {
    id: "basic-annual",
    name: "Basic Annual",
    price: 299.99,
    frequency: "annual",
    description: "Perfect for casual gym-goers with annual savings",
    features: [
      { name: "Access to all basic gyms", included: true },
      { name: "Standard equipment usage", included: true },
      { name: "Online class booking", included: true },
      { name: "Access to premium gyms", included: false },
      { name: "Personal trainer sessions", included: false },
      { name: "Spa and wellness access", included: false },
    ],
  },
  "plus-annual": {
    id: "plus-annual",
    name: "Plus Annual",
    price: 499.99,
    frequency: "annual",
    description: "Ideal for regular fitness enthusiasts with annual savings",
    features: [
      { name: "Access to all basic gyms", included: true },
      { name: "Standard equipment usage", included: true },
      { name: "Online class booking", included: true },
      { name: "Access to premium gyms", included: true },
      { name: "Personal trainer sessions (2/month)", included: true },
      { name: "Spa and wellness access", included: false },
    ],
    popular: true,
  },
  "premium-annual": {
    id: "premium-annual",
    name: "Premium Annual",
    price: 799.99,
    frequency: "annual",
    description: "Ultimate fitness experience with annual savings",
    features: [
      { name: "Access to all basic gyms", included: true },
      { name: "Standard equipment usage", included: true },
      { name: "Online class booking", included: true },
      { name: "Access to premium gyms", included: true },
      { name: "Personal trainer sessions (4/month)", included: true },
      { name: "Spa and wellness access", included: true },
    ],
  },
};

export default function PlanDetailsPage() {
  const { planId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get the plan details based on the planId from the URL
  const plan = availablePlans[planId as string];

  // Handle case where plan is not found
  if (!plan) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Plan Not Found</h1>
        <p className="text-gray-500 mb-8">The subscription plan you&apos;re looking for doesn&apos;t exist.</p>
        <Button onClick={() => router.push("/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  const handleSubscribe = () => {
    setIsProcessing(true);
    
    // Simulate API call to subscribe to a plan
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Subscription Successful!",
        description: `You are now subscribed to the ${plan.name} plan.`,
        variant: "default",
      });
      router.push("/dashboard/subscription");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{plan.name} Plan</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Plan Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Plan Details</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <p className="font-medium">Price</p>
                <p className="text-xl font-bold">
                  ${plan.price}<span className="text-sm font-normal text-gray-500">/{plan.frequency === "monthly" ? "month" : "year"}</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">What&apos;s Included:</h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 
                        className={`h-5 w-5 mt-0.5 ${
                          feature.included ? "text-green-500" : "text-gray-300"
                        }`} 
                      />
                      <span className={feature.included ? "" : "text-gray-400 line-through"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
              <CardDescription>Important information about your subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium mb-1">Billing</h3>
                <p className="text-gray-600">
                  Your subscription will be automatically renewed at the end of each billing period. 
                  You can cancel your subscription at any time from your account dashboard.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Refunds</h3>
                <p className="text-gray-600">
                  We offer a 7-day money-back guarantee. If you&apos;re not satisfied with your subscription, 
                  you can request a refund within 7 days of purchase.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Usage Policy</h3>
                <p className="text-gray-600">
                  Your membership is personal and non-transferable. Each gym may have additional rules and 
                  policies that members must follow.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{plan.name} Plan</span>
                <span>${plan.price}</span>
              </div>
              {plan.frequency === "annual" && (
                <div className="flex justify-between text-green-600">
                  <span>Annual Discount</span>
                  <span>-$59.89</span>
                </div>
              )}
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${plan.price}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <CreditCard className="h-4 w-4" />
                <span>Secure payment processing</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full" 
                onClick={handleSubscribe}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Subscribe Now"}
              </Button>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <Shield className="h-3 w-3" />
                <span>100% Secure Transaction</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 