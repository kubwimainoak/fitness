"use client";

import { useState, useEffect } from "react";
import { MapPin, Star, Filter, Search as SearchIcon, Dumbbell, Users, Clock, ChevronDown, QrCode, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

// Types
interface Gym {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  rating: number;
  ratingCount: number;
  distance: number; // in miles
  amenities: string[];
  hours: {
    weekday: string;
    weekend: string;
  };
  classes: string[];
  photos: string[];
  tier: "basic" | "premium";
  popular: boolean;
}

// Class type for the schedule
interface GymClass {
  id: string;
  name: string;
  instructor: string;
  datetime: Date;
  duration: number; // in minutes
  spotsAvailable: number;
  totalSpots: number;
}

// Mock data for gyms
const mockGyms: Gym[] = [
  {
    id: "gym-1",
    name: "FitLife Downtown",
    location: {
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      coordinates: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
    rating: 4.7,
    ratingCount: 248,
    distance: 0.8,
    amenities: ["Cardio Equipment", "Free Weights", "Pool", "Sauna"],
    hours: {
      weekday: "5:00 AM - 11:00 PM",
      weekend: "7:00 AM - 9:00 PM",
    },
    classes: ["Yoga", "Spin", "HIIT", "Pilates"],
    photos: ["/gym1.jpg", "/gym1-2.jpg", "/gym1-3.jpg"],
    tier: "premium",
    popular: true,
  },
  {
    id: "gym-2",
    name: "PowerFit Centre",
    location: {
      address: "456 Park Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10022",
      coordinates: {
        latitude: 40.7592,
        longitude: -73.9686,
      },
    },
    rating: 4.5,
    ratingCount: 187,
    distance: 1.2,
    amenities: ["Cardio Equipment", "Free Weights", "Basketball Court"],
    hours: {
      weekday: "6:00 AM - 10:00 PM",
      weekend: "8:00 AM - 8:00 PM",
    },
    classes: ["Boxing", "Zumba", "CrossFit"],
    photos: ["/gym2.jpg", "/gym2-2.jpg"],
    tier: "basic",
    popular: false,
  },
  {
    id: "gym-3",
    name: "Elite Fitness Club",
    location: {
      address: "789 Broadway",
      city: "New York",
      state: "NY",
      zipCode: "10003",
      coordinates: {
        latitude: 40.7309,
        longitude: -73.9872,
      },
    },
    rating: 4.9,
    ratingCount: 342,
    distance: 0.5,
    amenities: ["Cardio Equipment", "Free Weights", "Pool", "Spa", "Tennis Courts"],
    hours: {
      weekday: "5:00 AM - 12:00 AM",
      weekend: "6:00 AM - 10:00 PM",
    },
    classes: ["Yoga", "Pilates", "Spin", "HIIT", "Meditation"],
    photos: ["/gym3.jpg", "/gym3-2.jpg", "/gym3-3.jpg"],
    tier: "premium",
    popular: true,
  },
  {
    id: "gym-4",
    name: "Urban Strength Gym",
    location: {
      address: "321 Hudson Street",
      city: "New York",
      state: "NY",
      zipCode: "10013",
      coordinates: {
        latitude: 40.7264,
        longitude: -74.0094,
      },
    },
    rating: 4.6,
    ratingCount: 156,
    distance: 1.7,
    amenities: ["Free Weights", "Strongman Equipment", "Powerlifting"],
    hours: {
      weekday: "6:00 AM - 11:00 PM",
      weekend: "7:00 AM - 9:00 PM",
    },
    classes: ["Strength Training", "Powerlifting", "Olympic Lifting"],
    photos: ["/gym4.jpg", "/gym4-2.jpg"],
    tier: "basic",
    popular: false,
  },
  {
    id: "gym-5",
    name: "Wellness Fitness Center",
    location: {
      address: "555 5th Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10017",
      coordinates: {
        latitude: 40.7557,
        longitude: -73.9787,
      },
    },
    rating: 4.8,
    ratingCount: 218,
    distance: 2.3,
    amenities: ["Cardio Equipment", "Free Weights", "Pool", "Yoga Studio", "Juice Bar"],
    hours: {
      weekday: "5:30 AM - 10:30 PM",
      weekend: "7:30 AM - 8:30 PM",
    },
    classes: ["Yoga", "Meditation", "Pilates", "Aqua Fitness"],
    photos: ["/gym5.jpg", "/gym5-2.jpg"],
    tier: "premium",
    popular: true,
  },
  {
    id: "gym-6",
    name: "FlexFit Gym",
    location: {
      address: "888 West End Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10025",
      coordinates: {
        latitude: 40.7993,
        longitude: -73.9707,
      },
    },
    rating: 4.3,
    ratingCount: 127,
    distance: 3.1,
    amenities: ["Cardio Equipment", "Free Weights", "Group Classes"],
    hours: {
      weekday: "6:00 AM - 10:00 PM",
      weekend: "8:00 AM - 8:00 PM",
    },
    classes: ["Zumba", "HIIT", "Spin"],
    photos: ["/gym6.jpg"],
    tier: "basic",
    popular: false,
  },
];

// Mock data for gym classes
const generateMockClasses = (gymId: string): GymClass[] => {
  const today = new Date();
  const classes: GymClass[] = [];
  
  // Common class names
  const classNames = ["Yoga", "HIIT", "Spin", "Pilates", "Zumba", "Boxing", "CrossFit", "Strength Training"];
  // Common instructor names
  const instructors = ["Sarah Johnson", "Mike Davis", "Emma Wilson", "John Smith", "Lisa Chen"];
  
  // Generate classes for the next 3 days
  for (let day = 0; day < 3; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    
    // Generate 3-5 classes per day
    const numClasses = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < numClasses; i++) {
      const hour = Math.floor(Math.random() * 12) + 6; // Classes between 6am and 6pm
      const date = new Date(today);
      date.setDate(today.getDate() + day);
      date.setHours(hour, 0, 0, 0);
      
      classes.push({
        id: `${gymId}-day${day}-class${i}`,
        name: classNames[Math.floor(Math.random() * classNames.length)],
        instructor: instructors[Math.floor(Math.random() * instructors.length)],
        datetime: date,
        duration: [30, 45, 60][Math.floor(Math.random() * 3)],
        spotsAvailable: Math.floor(Math.random() * 10) + 1,
        totalSpots: 20,
      });
    }
  }
  
  // Sort classes by date/time
  return classes.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
};

export default function FindGymsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState(5); // miles
  const [gyms, setGyms] = useState<Gym[]>(mockGyms);
  const [filteredGyms, setFilteredGyms] = useState<Gym[]>(mockGyms);
  const [gymTier, setGymTier] = useState<"all" | "basic" | "premium">("all");
  const [sortBy, setSortBy] = useState<"distance" | "rating">("distance");
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter gyms based on search and filters
  useEffect(() => {
    let results = [...gyms];
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        gym => 
          gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gym.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gym.amenities.some(amenity => amenity.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by distance
    results = results.filter(gym => gym.distance <= maxDistance);
    
    // Filter by tier
    if (gymTier !== "all") {
      results = results.filter(gym => gym.tier === gymTier);
    }
    
    // Sort results
    if (sortBy === "distance") {
      results.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredGyms(results);
  }, [searchQuery, maxDistance, gymTier, sortBy, gyms]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Find Gyms</h1>
        <p className="text-gray-500">
          Discover gyms in your area and start working out today
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="pl-10"
            placeholder="Search by gym name, location, or amenities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select 
            value={sortBy} 
            onValueChange={(value) => setSortBy(value as "distance" | "rating")}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Nearest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Gyms</SheetTitle>
                <SheetDescription>
                  Customize your gym search results
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Maximum Distance</h3>
                  <div className="flex flex-col space-y-1">
                    <Slider
                      defaultValue={[maxDistance]}
                      max={10}
                      step={0.5}
                      onValueChange={(value) => setMaxDistance(value[0])}
                    />
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">0 miles</span>
                      <span className="text-sm font-medium">{maxDistance} miles</span>
                      <span className="text-xs text-gray-500">10 miles</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Gym Tier</h3>
                  <Select 
                    value={gymTier} 
                    onValueChange={(value) => setGymTier(value as "all" | "basic" | "premium")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Gym Tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="basic">Basic Gyms</SelectItem>
                      <SelectItem value="premium">Premium Gyms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Additional filters could go here */}
              </div>
              
              <SheetFooter>
                <SheetClose asChild>
                  <Button 
                    onClick={() => {
                      // Apply filters
                      setFilterOpen(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Results Stats */}
      <div className="flex justify-between items-center py-2 border-b">
        <p className="text-sm text-gray-500">
          Found {filteredGyms.length} {filteredGyms.length === 1 ? 'gym' : 'gyms'} 
          {maxDistance < 10 ? ` within ${maxDistance} miles` : ''}
        </p>
      </div>

      {/* Gym Results */}
      {filteredGyms.length === 0 ? (
        <div className="text-center py-12">
          <Dumbbell className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No gyms found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search or filters to find gyms in your area.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>
      )}
    </div>
  );
}

function GymCard({ gym }: { gym: Gym }) {
  const [showQrCode, setShowQrCode] = useState(false);
  const [classes, setClasses] = useState<GymClass[]>([]);

  // Generate mock class schedule for this gym
  useEffect(() => {
    setClasses(generateMockClasses(gym.id));
  }, [gym.id]);

  // Format date to human-readable
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Group classes by day
  const classsByDay = classes.reduce((acc, cls) => {
    const dateStr = formatDate(cls.datetime);
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(cls);
    return acc;
  }, {} as Record<string, GymClass[]>);

  // Get dates sorted
  const dayKeys = Object.keys(classsByDay);

  return (
    <Card className="overflow-hidden h-full flex flex-col border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        {/* For a real app, replace with proper image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#2E4A9A] opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between">
            <div className="bg-white text-xs font-semibold py-1 px-2 rounded-full">
              {gym.distance} mi away
            </div>
            {gym.tier === "premium" && (
              <div className="bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white text-xs font-semibold py-1 px-2 rounded-full">
                PREMIUM
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{gym.name}</h2>
            <div className="flex items-center text-white text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {gym.location.address}, {gym.location.city}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="flex-grow pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="font-medium">{gym.rating}</span>
            <span className="text-gray-500 text-sm ml-1">({gym.ratingCount})</span>
          </div>
          {gym.popular && (
            <div className="text-xs px-2 py-1 bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-full">
              Popular
            </div>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <Clock className="h-4 w-4 text-[#1E3A8A] mr-2 mt-0.5" />
            <div className="text-sm">
              <p className="text-gray-600">Weekdays: {gym.hours.weekday}</p>
              <p className="text-gray-600">Weekends: {gym.hours.weekend}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Dumbbell className="h-4 w-4 text-[#1E3A8A] mr-2 mt-0.5" />
            <p className="text-sm text-gray-600">
              {gym.amenities.slice(0, 3).join(", ")}
              {gym.amenities.length > 3 && ` + ${gym.amenities.length - 3} more`}
            </p>
          </div>
          <div className="flex items-start">
            <Users className="h-4 w-4 text-[#1E3A8A] mr-2 mt-0.5" />
            <p className="text-sm text-gray-600">
              {gym.classes.slice(0, 3).join(", ")}
              {gym.classes.length > 3 && ` + ${gym.classes.length - 3} more`}
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 border-t">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10 hover:text-[#8B0000]"
            >
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{gym.name}</span>
                {gym.tier === "premium" && (
                  <Badge variant="outline" className="bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white border-0">
                    PREMIUM
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{gym.location.address}, {gym.location.city}, {gym.location.state} {gym.location.zipCode}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="about" className="mt-4">
              <TabsList className="w-full bg-gray-100">
                <TabsTrigger value="about" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]">About</TabsTrigger>
                <TabsTrigger value="classes" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]">Classes</TabsTrigger>
                <TabsTrigger value="access" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]">Access</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4">
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2 text-[#1E3A8A]">Hours</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday:</span>
                    </div>
                    <div>
                      <span>{gym.hours.weekday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday - Sunday:</span>
                    </div>
                    <div>
                      <span>{gym.hours.weekend}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2 text-[#1E3A8A]">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {gym.amenities.map((amenity, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2 text-[#1E3A8A]">Class Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {gym.classes.map((cls, idx) => (
                      <Badge key={idx} variant="outline" className="border-[#1E3A8A] text-[#1E3A8A]">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="classes">
                <div className="mt-4 space-y-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-[#1E3A8A]" />
                    <span>Class schedule for the next 3 days</span>
                  </div>
                  
                  {dayKeys.length > 0 ? (
                    dayKeys.map(day => (
                      <div key={day} className="space-y-2">
                        <h3 className="font-medium text-md border-b pb-1 text-[#1E3A8A]">{day}</h3>
                        <div className="space-y-2">
                          {classsByDay[day].map(cls => (
                            <div key={cls.id} className="border rounded-lg p-3 flex justify-between items-center hover:border-[#1E3A8A]/30 transition-colors">
                              <div>
                                <div className="font-medium">{cls.name}</div>
                                <div className="text-sm text-gray-600">
                                  {cls.instructor} • {cls.datetime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} • {cls.duration} min
                                </div>
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{cls.spotsAvailable}</span>
                                <span className="text-gray-500">/{cls.totalSpots} spots</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No classes scheduled for the next 3 days</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="access">
                <div className="mt-4 flex flex-col items-center space-y-4">
                  {showQrCode ? (
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2E4A9A] w-64 h-64 rounded-lg flex items-center justify-center">
                        {/* This is a placeholder for a real QR code - in a real app, you'd generate this based on user/gym data */}
                        <QrCode className="h-32 w-32 text-white" />
                      </div>
                      <p className="text-center mt-4 text-sm text-gray-600">
                        Show this QR code at the gym entrance for access.
                        <br />
                        Valid for 24 hours.
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 text-center space-y-4">
                      <QrCode className="h-16 w-16 mx-auto text-[#1E3A8A]" />
                      <h3 className="font-medium text-[#1E3A8A]">Generate QR Code for Gym Access</h3>
                      <p className="text-sm text-gray-500">
                        You can use this QR code to check in at the gym entrance. The code is valid for 24 hours.
                      </p>
                      <Button 
                        onClick={() => setShowQrCode(true)}
                        className="bg-[#8B0000] hover:bg-[#A52A2A] text-white"
                      >
                        Generate QR Code
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button className="w-full bg-[#8B0000] hover:bg-[#A52A2A] text-white">
                Check In Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
} 