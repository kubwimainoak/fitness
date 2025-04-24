"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Define the form schema with Zod
const registerFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Infer the form type from the schema
type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      console.log("Registration data:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created!",
        description: "You have successfully created your account.",
        variant: "default",
      });
      
      // Redirect to login after successful registration
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your details to create your Universal Gym Membership account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                placeholder="John" 
                {...register("firstName")}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <p className="text-sm text-[#8B0000]">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                placeholder="Doe" 
                {...register("lastName")}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <p className="text-sm text-[#8B0000]">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@example.com" 
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-sm text-[#8B0000]">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-sm text-[#8B0000]">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              {...register("confirmPassword")}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-[#8B0000]">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input 
                id="terms" 
                type="checkbox" 
                className="h-4 w-4" 
                {...register("terms")}
                aria-invalid={errors.terms ? "true" : "false"}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <Link href="/terms" className="text-[#1E3A8A] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#1E3A8A] hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {errors.terms && (
              <p className="text-sm text-[#8B0000]">{errors.terms.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-[#8B0000] hover:bg-[#A52A2A] text-white" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1E3A8A] hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
} 