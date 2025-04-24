"use client";

import { useState } from "react";
import { CreditCard, Check, Trash2, Calendar, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function SubscriptionPage() {
  const { toast } = useToast();
  // Mock subscription data - in a real app this would come from an API
  const [subscription, setSubscription] = useState({
    id: "plus-monthly",
    name: "Plus",
    price: 49.99,
    frequency: "monthly",
    nextBilling: "July 15, 2023",
    paymentMethod: {
      type: "Credit Card",
      last4: "4242",
      expiryDate: "09/25",
    },
    status: "active",
  });

  const handleCancelSubscription = () => {
    // In a real app, this would call an API to cancel the subscription
    toast({
      title: "Are you sure?",
      description: "This action cannot be undone.",
      variant: "destructive",
      action: (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              toast({
                title: "Cancelled",
                description: "Your subscription has been cancelled.",
              });
              setSubscription({
                ...subscription,
                status: "cancelled",
              });
            }}
          >
            Yes, Cancel
          </Button>
        </div>
      ),
    });
  };

  const handleReactivateSubscription = () => {
    // In a real app, this would call an API to reactivate the subscription
    setSubscription({
      ...subscription,
      status: "active",
    });
    
    toast({
      title: "Subscription Reactivated",
      description: "Your subscription has been successfully reactivated.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
        <p className="text-gray-500">
          View and manage your gym membership subscription
        </p>
      </div>

      {/* Current Subscription */}
      <Card className={cn(
        "transition-all duration-300 hover:shadow-md border",
        subscription.status === "active" ? "hover:border-[#1E3A8A]/30" : "hover:border-[#8B0000]/30"
      )}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>Your active gym membership plan</CardDescription>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              subscription.status === "active" 
                ? "bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20" 
                : "bg-[#8B0000]/10 text-[#8B0000] hover:bg-[#8B0000]/20"
            }`}>
              {subscription.status === "active" ? "Active" : "Cancelled"}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {subscription.status === "active" ? (
            <>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="font-medium text-lg text-[#1E3A8A]">{subscription.name}</p>
                </div>
                <div>
                  <p className="text-right text-sm text-gray-500">Billing</p>
                  <p className="font-medium text-lg">${subscription.price}/{subscription.frequency === "monthly" ? "month" : "year"}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#1E3A8A]/10 p-2 rounded-full transition-all duration-300 hover:bg-[#1E3A8A]/20">
                    <Calendar className="h-5 w-5 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next Billing</p>
                    <p className="font-medium">{subscription.nextBilling}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10 transition-colors duration-300"
                >
                  Change Billing Date
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#1E3A8A]/10 p-2 rounded-full transition-all duration-300 hover:bg-[#1E3A8A]/20">
                    <CreditCard className="h-5 w-5 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{subscription.paymentMethod.type} ending in {subscription.paymentMethod.last4}</p>
                    <p className="text-xs text-gray-500">Expires {subscription.paymentMethod.expiryDate}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10 transition-colors duration-300"
                >
                  Update Payment
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">
                Your subscription has been cancelled and will end on {subscription.nextBilling}.
              </p>
              <Button 
                className="bg-gradient-to-r from-[#8B0000] to-[#A52A2A] hover:from-[#7B0000] hover:to-[#952A2A] text-white transition-all duration-300"
                onClick={handleReactivateSubscription}
              >
                Reactivate Subscription
              </Button>
            </div>
          )}
        </CardContent>

        {subscription.status === "active" && (
          <CardFooter className="flex justify-between border-t pt-6">
            <Button 
              variant="outline" 
              className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10 transition-colors duration-300"
              onClick={handleCancelSubscription}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Cancel Subscription
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#1E3A8A] to-[#3E5ABA] hover:from-[#1E3A9A] hover:to-[#4E6ACA] text-white transition-all duration-300"
            >
              Change Plan
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Subscription Benefits */}
      <Card className="transition-all duration-300 hover:shadow-md border hover:border-[#1E3A8A]/30">
        <CardHeader>
          <CardTitle>Your Benefits</CardTitle>
          <CardDescription>What's included in your {subscription.name} plan</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {["Access to all basic gyms", "Standard equipment usage", "Online class booking", "Access to premium gyms", "Personal trainer sessions (2/month)"].map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
                <div className="p-1 rounded-full bg-[#1E3A8A]/10 group-hover:bg-[#1E3A8A]/20 transition-colors duration-300">
                  <Check className="h-4 w-4 text-[#1E3A8A]" />
                </div>
                <span className="group-hover:text-[#1E3A8A] transition-colors duration-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="transition-all duration-300 hover:shadow-md border hover:border-[#1E3A8A]/30">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "June 15, 2023", plan: "Plus Monthly Plan", amount: 49.99 },
              { date: "May 15, 2023", plan: "Plus Monthly Plan", amount: 49.99 },
              { date: "April 15, 2023", plan: "Plus Monthly Plan", amount: 49.99 }
            ].map((transaction, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex justify-between items-center pb-4 transition-all duration-300 hover:bg-[#1E3A8A]/5 p-2 rounded-lg",
                  index < 2 ? "border-b" : ""
                )}
              >
                <div>
                  <p className="font-medium">{transaction.date}</p>
                  <p className="text-sm text-gray-500">{transaction.plan}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.amount}</p>
                  <p className="text-xs text-[#1E3A8A]">Payment Successful</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button 
            variant="outline" 
            className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10 transition-all duration-300"
          >
            View All Transactions
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 