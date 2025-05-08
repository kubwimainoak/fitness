"use client";

import { useState } from "react";
import Image from "next/image";
import { Save, Edit, Bell, ShieldCheck, User, Camera, CreditCard, Check, Trash2, Calendar, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Define types for our state objects
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  fitnessGoals: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  memberSince: string;
  profileImage: string | null;
}

interface NotificationSettings {
  emailUpdates: boolean;
  classReminders: boolean;
  promotionalOffers: boolean;
  appNotifications: boolean;
}

type NotificationSettingKey = keyof NotificationSettings;

interface PrivacySettings {
  profileVisibility: "public" | "members" | "private";
  shareWorkoutData: boolean;
  allowFriendRequests: boolean;
}

type PrivacySettingKey = keyof PrivacySettings;

// Profile page with edit functionality
export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - in a real app this would come from an API
  const [userData, setUserData] = useState<UserData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    fitnessGoals: "Lose weight and build muscle",
    dateOfBirth: "1990-05-15",
    height: "5'10\"",
    weight: "175 lbs",
    memberSince: "January 15, 2023",
    profileImage: null,
  });

  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailUpdates: true,
    classReminders: true,
    promotionalOffers: false,
    appNotifications: true,
  });

  // State for privacy settings
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: "members", // public, members, private
    shareWorkoutData: true,
    allowFriendRequests: true,
  });

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

  const handleSaveProfile = () => {
    // In a real app, this would call an API to update the user profile
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
      duration: 2000,
    });
  };

  const toggleNotificationSetting = (setting: NotificationSettingKey) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
      duration: 2000,
    });
  };

  const updatePrivacySetting = (setting: PrivacySettingKey, value: boolean | string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved.",
      duration: 2000,
    });
  };

  const handleCancelSubscription = () => {
    // In a real app, this would call an API to cancel the subscription
    toast({
      title: "Are you sure?",
      description: "This action cannot be undone.",
      variant: "destructive",
      duration: 3000,
      action: (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              toast({
                title: "Cancelled",
                description: "Your subscription has been cancelled.",
                duration: 2000,
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
      duration: 2000,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-500">
          View and manage your personal information and settings
        </p>
      </div>

      {/* Profile Header Card */}
      <Card className="border-[#1E3A8A]/10 bg-gradient-to-br from-white to-[#1E3A8A]/[0.05] transition-all duration-300 hover:shadow-md">
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                {userData.profileImage ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={userData.profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <User className="h-12 w-12 text-[#1E3A8A]/50" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-[#1E3A8A] text-white p-1.5 rounded-full hover:bg-[#2E4A9A] transition-colors duration-300">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-xl font-bold">{userData.firstName} {userData.lastName}</h2>
              <p className="text-sm text-gray-500">Member since {userData.memberSince}</p>
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-start mt-1">
                <span className="bg-[#1E3A8A]/10 text-[#1E3A8A] px-2 py-0.5 rounded-full text-xs font-medium transition-colors hover:bg-[#1E3A8A]/20">
                  Plus Member
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium transition-colors hover:bg-green-200">
                  Active
                </span>
              </div>
            </div>

            <div className="md:ml-auto">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
                className={cn(
                  "transition-colors duration-300 text-sm",
                  isEditing 
                    ? "border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10" 
                    : "border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10"
                )}
              >
                {isEditing ? (
                  <>
                    <Edit className="h-3.5 w-3.5 mr-1.5" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="h-3.5 w-3.5 mr-1.5" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accordion Sections */}
      <Accordion type="single" collapsible className="space-y-4">
        {/* Personal Information Accordion */}
        <AccordionItem value="personal-info" className="border rounded-lg overflow-hidden bg-white">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#1E3A8A]" />
              <div className="text-left">
                <h3 className="font-semibold">Personal Information</h3>
                <p className="text-sm text-gray-500">Manage your personal details and contact information</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={userData.firstName} 
                    onChange={(e) => setUserData({...userData, firstName: e.target.value})} 
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={userData.lastName} 
                    onChange={(e) => setUserData({...userData, lastName: e.target.value})} 
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={userData.email} 
                    onChange={(e) => setUserData({...userData, email: e.target.value})} 
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={userData.phone} 
                    onChange={(e) => setUserData({...userData, phone: e.target.value})} 
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input 
                    id="dob" 
                    type="date" 
                    value={userData.dateOfBirth} 
                    onChange={(e) => setUserData({...userData, dateOfBirth: e.target.value})} 
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={userData.address} 
                    onChange={(e) => setUserData({...userData, address: e.target.value})} 
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={userData.city} 
                    onChange={(e) => setUserData({...userData, city: e.target.value})} 
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    value={userData.state} 
                    onChange={(e) => setUserData({...userData, state: e.target.value})} 
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input 
                    id="zipCode" 
                    value={userData.zipCode} 
                    onChange={(e) => setUserData({...userData, zipCode: e.target.value})} 
                    disabled={!isEditing}
                    className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="pt-4 border-t">
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-[#1E3A8A] to-[#3E5ABA] hover:from-[#1E3A9A] hover:to-[#4E6ACA] text-white transition-all duration-300"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Subscription Accordion */}
        <AccordionItem value="subscription" className="border rounded-lg overflow-hidden bg-white">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#1E3A8A]" />
              <div className="text-left">
                <h3 className="font-semibold">Subscription</h3>
                <p className="text-sm text-gray-500">Manage your gym membership subscription</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-6 space-y-6">
              {/* Current Subscription */}
              <div className={cn(
                "p-4 rounded-lg border",
                subscription.status === "active" ? "bg-white" : "bg-[#8B0000]/5"
              )}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-semibold">Current Subscription</h4>
                    <p className="text-sm text-gray-500">Your active gym membership plan</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    subscription.status === "active" 
                      ? "bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20" 
                      : "bg-[#8B0000]/10 text-[#8B0000] hover:bg-[#8B0000]/20"
                  }`}>
                    {subscription.status === "active" ? "Active" : "Cancelled"}
                  </div>
                </div>
                
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

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b py-4 gap-4">
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
                        className="w-full sm:w-auto border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10 transition-colors duration-300"
                      >
                        Change Billing Date
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 gap-4">
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
                        className="w-full sm:w-auto border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10 transition-colors duration-300"
                      >
                        Update Payment
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 mt-6 border-t">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10 transition-colors duration-300"
                        onClick={handleCancelSubscription}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel Subscription
                      </Button>
                      <Button 
                        className="w-full sm:w-auto bg-gradient-to-r from-[#1E3A8A] to-[#3E5ABA] hover:from-[#1E3A9A] hover:to-[#4E6ACA] text-white transition-all duration-300"
                      >
                        Change Plan
                        <ArrowRight className="h-4 w-4 ml-2" />
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
              </div>

              {/* Subscription Benefits */}
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Your Benefits</h4>
                <p className="text-sm text-gray-500 mb-4">What&apos;s included in your {subscription.name} plan</p>
                <ul className="space-y-3">
                  {["Access to all basic gyms", "Standard equipment usage", "Online class booking", "Access to premium gyms", "Personal trainer sessions (2/month)"].map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 group transition-all duration-300 hover:translate-x-1">
                      <div className="p-1 rounded-full bg-[#1E3A8A]/10 group-hover:bg-[#1E3A8A]/20 transition-colors duration-300">
                        <Check className="h-4 w-4 text-[#1E3A8A]" />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Notification Settings Accordion */}
        <AccordionItem value="notifications" className="border rounded-lg overflow-hidden bg-white">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#1E3A8A]" />
              <div className="text-left">
                <h3 className="font-semibold">Notification Settings</h3>
                <p className="text-sm text-gray-500">Manage how you receive updates and notifications</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-6 space-y-6">
              <div className="space-y-4">
                {[
                  { id: "emailUpdates" as const, label: "Email Updates", description: "Receive important account updates via email" },
                  { id: "classReminders" as const, label: "Class Reminders", description: "Get notified before your booked classes" },
                  { id: "promotionalOffers" as const, label: "Promotional Offers", description: "Receive special offers and promotions" },
                  { id: "appNotifications" as const, label: "App Notifications", description: "Push notifications in the mobile app" },
                ].map((item) => (
                  <div key={item.id} className="flex items-start gap-4 group transition-all duration-300 p-2 rounded-lg hover:bg-[#1E3A8A]/5">
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={notificationSettings[item.id]}
                        onChange={() => toggleNotificationSetting(item.id)}
                        className="h-5 w-5 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor={item.id} className="font-medium">
                        {item.label}
                      </label>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium transition-colors",
                      notificationSettings[item.id] 
                        ? "bg-[#1E3A8A]/10 text-[#1E3A8A]" 
                        : "bg-gray-100 text-gray-500"
                    )}>
                      {notificationSettings[item.id] ? "Enabled" : "Disabled"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Privacy Settings Accordion */}
        <AccordionItem value="privacy" className="border rounded-lg overflow-hidden bg-white">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#1E3A8A]" />
              <div className="text-left">
                <h3 className="font-semibold">Privacy Settings</h3>
                <p className="text-sm text-gray-500">Control your data and privacy preferences</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-6 space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <select 
                    id="profileVisibility" 
                    value={privacySettings.profileVisibility}
                    onChange={(e) => updatePrivacySetting('profileVisibility', e.target.value as "public" | "members" | "private")}
                    className="w-full rounded-md border border-input p-2 bg-background text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="public">Public - Anyone can see my profile</option>
                    <option value="members">Members Only - Only gym members can see my profile</option>
                    <option value="private">Private - Only I can see my profile</option>
                  </select>
                </div>
                
                <div className="flex items-start gap-4 group transition-all duration-300 p-2 rounded-lg hover:bg-[#1E3A8A]/5">
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      id="shareWorkoutData"
                      checked={privacySettings.shareWorkoutData}
                      onChange={(e) => updatePrivacySetting('shareWorkoutData', e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="shareWorkoutData" className="font-medium">
                      Share Workout Data
                    </label>
                    <p className="text-sm text-gray-500">
                      Allow the app to use your workout data for personalized recommendations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group transition-all duration-300 p-2 rounded-lg hover:bg-[#1E3A8A]/5">
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      id="allowFriendRequests"
                      checked={privacySettings.allowFriendRequests}
                      onChange={(e) => updatePrivacySetting('allowFriendRequests', e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="allowFriendRequests" className="font-medium">
                      Allow Friend Requests
                    </label>
                    <p className="text-sm text-gray-500">
                      Allow other users to send you friend requests
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 rounded-lg p-4 flex items-start gap-3">
                <div className="mt-1 text-[#1E3A8A]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-[#1E3A8A]">Data Protection</h3>
                  <p className="text-sm text-[#1E3A8A]/80">
                    Your data is encrypted and securely stored. You can request a full export or deletion of your data at any time.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10 transition-colors duration-300"
                >
                  Request Data Export
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10 transition-colors duration-300"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        
      </Accordion>
    </div>
  );
} 