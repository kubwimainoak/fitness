"use client";

import { useState } from "react";
import { Save, Edit, Bell, ShieldCheck, User, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

  const handleSaveProfile = () => {
    // In a real app, this would call an API to update the user profile
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
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
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-[#1E3A8A]/50" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-[#1E3A8A] text-white p-2 rounded-full hover:bg-[#2E4A9A] transition-colors duration-300">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h2>
              <p className="text-gray-500">Member since {userData.memberSince}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                <span className="bg-[#1E3A8A]/10 text-[#1E3A8A] px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-[#1E3A8A]/20">
                  Plus Member
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-green-200">
                  Active
                </span>
              </div>
            </div>

            <div className="md:ml-auto">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
                className={cn(
                  "transition-colors duration-300",
                  isEditing 
                    ? "border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10" 
                    : "border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10"
                )}
              >
                {isEditing ? (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Card */}
      <Card className="transition-all duration-300 hover:shadow-md border hover:border-[#1E3A8A]/30">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Manage your personal details and contact information</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
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
        </CardContent>
        
        {isEditing && (
          <CardFooter className="border-t pt-6">
            <Button 
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-[#1E3A8A] to-[#3E5ABA] hover:from-[#1E3A9A] hover:to-[#4E6ACA] text-white transition-all duration-300"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Fitness Profile Card */}
      <Card className="transition-all duration-300 hover:shadow-md border hover:border-[#1E3A8A]/30">
        <CardHeader>
          <CardTitle>Fitness Profile</CardTitle>
          <CardDescription>Your fitness information and personal goals</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input 
                id="height" 
                value={userData.height} 
                onChange={(e) => setUserData({...userData, height: e.target.value})} 
                disabled={!isEditing}
                className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input 
                id="weight" 
                value={userData.weight} 
                onChange={(e) => setUserData({...userData, weight: e.target.value})} 
                disabled={!isEditing}
                className={!isEditing ? "bg-[#1E3A8A]/5" : ""}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fitnessGoals">Fitness Goals</Label>
            <textarea 
              id="fitnessGoals" 
              rows={3} 
              value={userData.fitnessGoals} 
              onChange={(e) => setUserData({...userData, fitnessGoals: e.target.value})} 
              disabled={!isEditing}
              className={cn(
                "w-full rounded-md border border-input p-3 text-sm shadow-sm transition-colors", 
                !isEditing ? "bg-[#1E3A8A]/5" : "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences Card */}
      <Card className="transition-all duration-300 hover:shadow-md border hover:border-[#1E3A8A]/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive updates and notifications</CardDescription>
          </div>
          <div className="rounded-full bg-[#1E3A8A]/10 p-2 transition-all duration-300 hover:bg-[#1E3A8A]/20">
            <Bell className="h-5 w-5 text-[#1E3A8A]" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>

      {/* Privacy Settings Card */}
      <Card className="transition-all duration-300 hover:shadow-md border hover:border-[#1E3A8A]/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control your data and privacy preferences</CardDescription>
          </div>
          <div className="rounded-full bg-[#1E3A8A]/10 p-2 transition-all duration-300 hover:bg-[#1E3A8A]/20">
            <ShieldCheck className="h-5 w-5 text-[#1E3A8A]" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
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
        </CardContent>
        
        <CardFooter className="border-t pt-6 flex justify-end space-x-4">
          <Button 
            variant="outline" 
            className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10 transition-colors duration-300"
          >
            Request Data Export
          </Button>
          <Button 
            variant="outline" 
            className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10 transition-colors duration-300"
          >
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 