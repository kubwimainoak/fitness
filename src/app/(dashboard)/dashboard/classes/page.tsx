"use client";

import { useState, useEffect } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Calendar, Clock, MapPin, Users, Star, Filter, ChevronRight, ChevronLeft, X, QrCode, Share2, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Types
interface GymClass {
  id: string;
  name: string;
  type: string;
  instructor: string;
  datetime: Date;
  duration: number; // in minutes
  spotsAvailable: number;
  totalSpots: number;
  location: {
    name: string;
    address: string;
    city: string;
    distance: number; // in miles
  };
  description: string;
  intensity: "low" | "medium" | "high";
  rating: number;
  ratingCount: number;
  popularity: number; // 1-100 scale
  image?: string;
}

interface ClassFilters {
  type: string;
  intensity: string;
  maxDistance: number;
  availability: boolean;
}

// Mock data generator for classes
const generateMockClasses = (): GymClass[] => {
  const classTypes = [
    "Yoga", "Pilates", "Spinning", "HIIT", "Strength Training", 
    "Boxing", "Zumba", "CrossFit", "Bootcamp", "Barre"
  ];
  
  const locations = [
    { 
      name: "FitLife Gym - Downtown", 
      address: "123 Main St", 
      city: "New York, NY", 
      distance: 1.2 
    },
    { 
      name: "PowerFit Centre", 
      address: "456 Park Ave", 
      city: "New York, NY", 
      distance: 2.5 
    },
    { 
      name: "Elite Fitness Club", 
      address: "789 Broadway", 
      city: "New York, NY", 
      distance: 3.7 
    },
    { 
      name: "FlexGym", 
      address: "101 5th Ave", 
      city: "New York, NY", 
      distance: 4.1 
    },
    { 
      name: "PureStrength", 
      address: "202 7th St", 
      city: "Brooklyn, NY", 
      distance: 5.8 
    }
  ];
  
  const instructors = [
    "Sarah Johnson", "Michael Chen", "Alicia Rodriguez", 
    "David Kim", "Emily Wilson", "James Taylor", "Maria Garcia"
  ];
  
  const intensities: Array<"low" | "medium" | "high"> = ["low", "medium", "high"];
  
  // Create classes for the next 7 days
  const classes: GymClass[] = [];
  
  for (let day = 0; day < 7; day++) {
    // Create 3-6 classes for each day
    const numClasses = Math.floor(Math.random() * 4) + 3;
    
    for (let i = 0; i < numClasses; i++) {
      const classDate = addDays(new Date(), day);
      
      // Randomize the hour between 6am and 8pm
      classDate.setHours(Math.floor(Math.random() * 14) + 6);
      // Randomize minutes to 00, 15, 30, or 45
      classDate.setMinutes([0, 15, 30, 45][Math.floor(Math.random() * 4)]);
      
      const classType = classTypes[Math.floor(Math.random() * classTypes.length)];
      const totalSpots = Math.floor(Math.random() * 15) + 10; // 10-25 spots
      const spotsAvailable = Math.floor(Math.random() * (totalSpots + 1)); // 0 to totalSpots
      const duration = [45, 60, 75, 90][Math.floor(Math.random() * 4)]; // Common class durations
      const location = locations[Math.floor(Math.random() * locations.length)];
      const instructor = instructors[Math.floor(Math.random() * instructors.length)];
      const intensity = intensities[Math.floor(Math.random() * intensities.length)];
      const rating = (Math.random() * 2) + 3; // Rating between 3.0 and 5.0
      const ratingCount = Math.floor(Math.random() * 100) + 5; // 5 to 105 ratings
      
      // Higher popularity for classes with higher ratings and fewer available spots
      const popularity = Math.floor(
        (rating / 5) * 50 + 
        ((totalSpots - spotsAvailable) / totalSpots) * 30 + 
        Math.random() * 20
      );
      
      classes.push({
        id: `class-${day}-${i}`,
        name: `${classType} ${intensity === "high" ? "Advanced" : intensity === "medium" ? "Intermediate" : "Beginner"}`,
        type: classType,
        instructor,
        datetime: classDate,
        duration,
        spotsAvailable,
        totalSpots,
        location,
        description: `Join us for an energizing ${classType} class suitable for ${
          intensity === "high" ? "experienced enthusiasts" : 
          intensity === "medium" ? "those with some experience" : 
          "all levels including beginners"
        }. Instructor ${instructor} will guide you through ${duration} minutes of ${
          intensity === "high" ? "challenging" : 
          intensity === "medium" ? "moderately intense" : 
          "approachable"
        } exercises.`,
        intensity,
        rating,
        ratingCount,
        popularity,
      });
    }
  }
  
  return classes;
};

// Modal for class details and booking
function ClassModal({ 
  isOpen, 
  onClose,
  classItem,
  onBook 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  classItem: GymClass;
  onBook: (classItem: GymClass) => void;
}) {
  const [isBooked, setIsBooked] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  
  const handleBookClass = () => {
    onBook(classItem);
    setIsBooked(true);
    
    // Generate QR code data (in a real app, this would be a unique identifier)
    setQrCodeData(`CLASS-${classItem.id}-${Date.now()}`);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="h-[200px] bg-gradient-to-r from-[#1E3A8A] to-[#3E5ABA] flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white">{classItem.type}</h2>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4">{classItem.name}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20">
                  {format(classItem.datetime, 'EEEE')}
                </Badge>
                <Badge className="bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20">
                  {format(classItem.datetime, 'MMM d, yyyy')}
                </Badge>
                <Badge className="bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20">
                  {format(classItem.datetime, 'h:mm a')}
                </Badge>
                <Badge className="bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20">
                  {classItem.duration} min
                </Badge>
              </div>
              
              <p className="text-gray-700 mb-6">{classItem.description}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-[#1E3A8A] mt-0.5" />
                  <div>
                    <p className="font-medium">Instructor</p>
                    <p className="text-gray-600">{classItem.instructor}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-[#1E3A8A] mt-0.5" />
                  <div>
                    <p className="font-medium">Rating</p>
                    <p className="text-gray-600">{classItem.rating.toFixed(1)} ({classItem.ratingCount} reviews)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-[40%] space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Gym Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#1E3A8A] mt-0.5" />
                    <div>
                      <p className="font-medium">{classItem.location.name}</p>
                      <p className="text-sm text-gray-500">{classItem.location.address}</p>
                      <p className="text-sm text-gray-500">{classItem.location.city}</p>
                      <p className="text-sm text-[#1E3A8A]">{classItem.location.distance.toFixed(1)} miles away</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Available spots</span>
                    <span className="font-medium">{classItem.spotsAvailable} / {classItem.totalSpots}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#1E3A8A]" 
                      style={{ width: `${(classItem.spotsAvailable / classItem.totalSpots) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {isBooked ? (
                    <div className="w-full space-y-4">
                      <div className="flex items-center p-3 bg-green-50 text-green-700 rounded-md">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Your spot is confirmed!</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-white">
                        <div className="mb-2 text-center">
                          <p className="font-medium text-[#1E3A8A]">Your Check-in Code</p>
                          <p className="text-xs text-gray-500 mb-2">Present this code at the gym</p>
                        </div>
                        <div className="p-3 bg-[#1E3A8A]/5 rounded-lg mb-2">
                          <QrCode className="h-32 w-32 text-[#1E3A8A]" />
                        </div>
                        <p className="text-sm font-mono text-center">{qrCodeData}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => navigator.clipboard.writeText(qrCodeData)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share Code
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleBookClass} 
                      disabled={classItem.spotsAvailable === 0}
                      className={cn(
                        "w-full transition-all",
                        classItem.spotsAvailable === 0
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#1E3A8A] to-[#3E5ABA] hover:from-[#1E3A9A] hover:to-[#4E6ACA] text-white"
                      )}
                    >
                      {classItem.spotsAvailable === 0 ? "Class Full" : "Book Class"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClassesPage() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<GymClass[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("time");
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<ClassFilters>({
    type: "all",
    intensity: "all",
    maxDistance: 10,
    availability: false,
  });
  
  // Load mock data
  useEffect(() => {
    const mockClasses = generateMockClasses();
    setClasses(mockClasses);
    setFilteredClasses(mockClasses);
  }, []);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...classes];
    
    // Filter by date
    result = result.filter(c => isSameDay(c.datetime, selectedDate));
    
    // Apply other filters
    if (filters.type !== "all") {
      result = result.filter(c => c.type === filters.type);
    }
    
    if (filters.intensity !== "all") {
      result = result.filter(c => c.intensity === filters.intensity);
    }
    
    if (filters.maxDistance < 10) {
      result = result.filter(c => c.location.distance <= filters.maxDistance);
    }
    
    if (filters.availability) {
      result = result.filter(c => c.spotsAvailable > 0);
    }
    
    // Apply sorting
    switch (sortOption) {
      case "time":
        result.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
        break;
      case "popularity":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        result.sort((a, b) => a.location.distance - b.location.distance);
        break;
    }
    
    setFilteredClasses(result);
  }, [classes, selectedDate, filters, sortOption]);
  
  // Generate array of next 7 days for date selector
  const nextSevenDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  // Unique class types for filter
  const classTypes = ["all", ...Array.from(new Set(classes.map(c => c.type)))];
  
  const handleBookClass = (classItem: GymClass) => {
    if (classItem.spotsAvailable === 0) {
      toast({
        title: "Class is Full",
        description: "Sorry, there are no spots available for this class.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API to book the class
    toast({
      title: "Class Booked",
      description: `You have successfully booked ${classItem.name} with ${classItem.instructor}.`,
    });
    
    // Update available spots
    const updatedClasses = classes.map(c => 
      c.id === classItem.id 
        ? { ...c, spotsAvailable: c.spotsAvailable - 1 } 
        : c
    );
    
    setClasses(updatedClasses);
  };

  const handleViewClass = (classItem: GymClass) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    if (previousDay >= new Date()) {
      setSelectedDate(previousDay);
    }
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    if (nextDay <= addDays(new Date(), 6)) {
      setSelectedDate(nextDay);
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Fitness Classes</h1>
        <p className="text-gray-500">
          Browse and book classes at gyms in your area
        </p>
      </div>
      
      {/* Date and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePreviousDay}
            disabled={isSameDay(selectedDate, new Date())}
            className="h-9 w-9 flex-shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex overflow-x-auto no-scrollbar rounded-lg border border-[#1E3A8A]/10">
            {nextSevenDays.map((date, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "flex flex-col h-auto py-1.5 px-4 items-center rounded-none border-0 hover:bg-[#1E3A8A]/5 min-w-[60px]",
                  isSameDay(date, selectedDate) && "bg-[#1E3A8A]/10 text-[#1E3A8A] font-medium"
                )}
                onClick={() => setSelectedDate(date)}
              >
                <span className="text-xs uppercase font-medium mb-1">{format(date, 'EEE')}</span>
                <span className="text-lg font-semibold">{format(date, 'd')}</span>
                <span className="text-[10px] text-gray-500">{format(date, 'MMM')}</span>
              </Button>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNextDay}
            disabled={isSameDay(selectedDate, addDays(new Date(), 6))}
            className="h-9 w-9 flex-shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="time">Sort by Time</SelectItem>
              <SelectItem value="popularity">Sort by Popularity</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="distance">Sort by Distance</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className={cn(
              "border-[#1E3A8A]", 
              showFilters ? "bg-[#1E3A8A]/10 text-[#1E3A8A]" : "text-[#1E3A8A]"
            )}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
      
      {/* Filters Panel */}
      {showFilters && (
        <Card className="border-[#1E3A8A]/10 bg-[#1E3A8A]/[0.02] transition-all duration-300">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Type</label>
                <Select 
                  value={filters.type} 
                  onValueChange={(value) => setFilters({...filters, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {classTypes.filter(t => t !== "all").map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Intensity Level</label>
                <Select 
                  value={filters.intensity} 
                  onValueChange={(value) => setFilters({...filters, intensity: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="low">Beginner</SelectItem>
                    <SelectItem value="medium">Intermediate</SelectItem>
                    <SelectItem value="high">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Max Distance</label>
                  <span className="text-sm font-medium text-[#1E3A8A]">{filters.maxDistance} miles</span>
                </div>
                <Slider
                  defaultValue={[filters.maxDistance]}
                  max={10}
                  min={1}
                  step={1}
                  onValueChange={(value) => setFilters({...filters, maxDistance: value[0]})}
                  className="py-4"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="availability"
                  checked={filters.availability}
                  onChange={(e) => setFilters({...filters, availability: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                />
                <label htmlFor="availability" className="text-sm font-medium">
                  Show only classes with available spots
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Classes List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Classes for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredClasses.length} classes found
          </span>
        </div>
        
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClasses.map(classItem => (
              <ClassCard 
                key={classItem.id} 
                classItem={classItem} 
                onView={() => handleViewClass(classItem)} 
              />
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-[#1E3A8A]/20 bg-[#1E3A8A]/[0.01]">
            <CardContent className="py-10 flex flex-col items-center">
              <div className="rounded-full bg-[#1E3A8A]/10 p-3 mb-4">
                <Calendar className="h-6 w-6 text-[#1E3A8A]" />
              </div>
              <h3 className="text-lg font-medium mb-1">No Classes Found</h3>
              <p className="text-gray-500 text-center max-w-md">
                There are no classes matching your filters on this date. Try adjusting your filters or selecting a different date.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Class Details Modal */}
      {selectedClass && (
        <ClassModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          classItem={selectedClass}
          onBook={handleBookClass}
        />
      )}
    </div>
  );
}

function ClassCard({ classItem, onView }: { classItem: GymClass; onView: () => void }) {
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "low": return "bg-green-100 text-green-700 hover:bg-green-200";
      case "medium": return "bg-amber-100 text-amber-700 hover:bg-amber-200";
      case "high": return "bg-red-100 text-red-700 hover:bg-red-200";
      default: return "bg-blue-100 text-blue-700 hover:bg-blue-200";
    }
  };
  
  const getSpotStatusColor = (spotsAvailable: number, totalSpots: number) => {
    const availability = spotsAvailable / totalSpots;
    if (availability === 0) return "text-[#8B0000]";
    if (availability < 0.2) return "text-amber-600";
    return "text-green-600";
  };
  
  return (
    <Card className="transition-all duration-300 hover:shadow-md border overflow-hidden group">
      <div className="relative h-[150px] bg-gradient-to-b from-[#1E3A8A]/50 to-[#1E3A8A]/10 flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
          <div className="flex justify-between items-start">
            <Badge className={cn("transition-colors", getIntensityColor(classItem.intensity))}>
              {classItem.intensity === "low" ? "Beginner" : 
               classItem.intensity === "medium" ? "Intermediate" : "Advanced"}
            </Badge>
            <Badge className="bg-white/90 text-[#1E3A8A] hover:bg-white">
              <Star className="h-3 w-3 fill-[#FFD700] stroke-[#FFD700] mr-1" />
              {classItem.rating.toFixed(1)}
            </Badge>
          </div>
          <div>
            <p className="text-xl font-bold drop-shadow-md">{classItem.type}</p>
            <p className="text-sm drop-shadow-md">{classItem.instructor}</p>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-4 pb-0">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#1E3A8A] mt-0.5" />
            <div>
              <p className="font-medium">{format(classItem.datetime, 'h:mm a')}</p>
              <p className="text-sm text-gray-500">{classItem.duration} minutes</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-[#1E3A8A] mt-0.5" />
            <div>
              <p className="font-medium">{classItem.location.name}</p>
              <p className="text-sm text-gray-500">{classItem.location.distance.toFixed(1)} miles away</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-[#1E3A8A] mt-0.5" />
            <div>
              <p className={cn(
                "font-medium",
                getSpotStatusColor(classItem.spotsAvailable, classItem.totalSpots)
              )}>
                {classItem.spotsAvailable === 0 
                  ? "Class Full" 
                  : `${classItem.spotsAvailable} spots available`}
              </p>
              <p className="text-sm text-gray-500">{classItem.totalSpots} total spots</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t mt-4 p-4">
        <Button 
          onClick={onView}
          className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3E5ABA] hover:from-[#1E3A9A] hover:to-[#4E6ACA] text-white transition-all duration-300"
        >
          View Class
        </Button>
      </CardFooter>
    </Card>
  );
} 