import Link from "next/link";
import { 
  Dumbbell, 
  MapPin, 
  Calendar, 
  CreditCard, 
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#1E3A8A]/5">
      {/* Header/Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-[#1E3A8A]" />
            <h1 className="text-xl font-bold text-[#1E3A8A]">Universal Gym Membership</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#8B0000] hover:bg-[#A52A2A] text-white">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1E3A8A]">
              One Membership.<br />Thousands of Gyms.
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Access over 1,000 premium fitness centers nationwide with a single membership. 
              Work out anywhere, anytime, with no long-term contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button className="w-full sm:w-auto bg-[#8B0000] hover:bg-[#A52A2A] text-white text-lg py-6 px-8">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/dashboard/gyms">
                <Button variant="outline" className="w-full sm:w-auto border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10 text-lg py-6 px-8">
                  Find Gyms Near You
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-[#1E3A8A] to-[#4C6EF5]">
            {/* Placeholder for a hero image */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
              <div className="text-center">
                <Dumbbell className="h-16 w-16 mx-auto mb-4" />
                Your Fitness Journey Starts Here
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Universal Gym Membership</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#1E3A8A]/5 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="bg-[#1E3A8A]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MapPin className="h-7 w-7 text-[#1E3A8A]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1E3A8A]">Access Everywhere</h3>
              <p className="text-gray-600">
                Work out at over 1,000 gyms nationwide with a single membership. Never worry about finding a gym when traveling.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-[#1E3A8A]/5 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="bg-[#1E3A8A]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calendar className="h-7 w-7 text-[#1E3A8A]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1E3A8A]">Book Classes</h3>
              <p className="text-gray-600">
                Browse and book fitness classes easily through our platform. From yoga to HIIT, find the perfect workout.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-[#1E3A8A]/5 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="bg-[#1E3A8A]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <CreditCard className="h-7 w-7 text-[#1E3A8A]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1E3A8A]">Flexible Plans</h3>
              <p className="text-gray-600">
                Choose from monthly or annual plans that fit your budget. No long-term contracts, cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#1E3A8A]/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Members Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
              &quot;Universal Gym has revolutionized how I work out. I travel for work, and now I can access great gyms in every city I visit!&quot;
              </p>
              <div className="font-bold">Sarah K.</div>
              <div className="text-sm text-gray-500">Member since 2022</div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
              &quot;The class booking feature is fantastic. I&apos;ve tried workouts I would never have considered before, and the trainers are top-notch.&quot;
              </p>
              <div className="font-bold">Michael T.</div>
              <div className="text-sm text-gray-500">Member since 2023</div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
              &quot;The value is unbeatable. I used to pay twice as much for access to just one gym. Now I have options everywhere I go!&quot;
              </p>
              <div className="font-bold">Jessica M.</div>
              <div className="text-sm text-gray-500">Member since 2021</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1E3A8A] to-[#3E5ABA] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Fitness Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied members who have simplified their fitness journey with Universal Gym Membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="w-full sm:w-auto bg-white text-[#1E3A8A] hover:bg-gray-100 text-lg py-6 px-8">
                Start Your Free Trial
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg py-6 px-8">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="h-6 w-6" />
                <h3 className="text-xl font-bold">Universal Gym</h3>
              </div>
              <p className="text-gray-400">
                Transforming fitness access nationwide with a single membership.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                <li><Link href="/dashboard/gyms" className="text-gray-400 hover:text-white">Find Gyms</Link></li>
                <li><Link href="/dashboard/classes" className="text-gray-400 hover:text-white">Book Classes</Link></li>
                <li><Link href="/dashboard/subscription" className="text-gray-400 hover:text-white">Memberships</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Universal Gym Membership. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Star component for testimonials
function Star() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}
