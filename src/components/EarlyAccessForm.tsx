"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  company: string;
  useCase: string;
  organizationType: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function EarlyAccessForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    useCase: "",
    organizationType: "",
  });
  
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    
    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
      }
      
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        useCase: "",
        organizationType: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };
  
  if (status === "success") {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md w-full mx-auto text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          Your early access request for AI agent solutions has been submitted. We&apos;ll be in touch soon!
        </p>
        <Button 
          variant="outline" 
          onClick={() => setStatus("idle")}
          className="rounded-full"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md w-full mx-auto"
    >
      <h3 className="text-xl font-semibold mb-6 text-center">Request Early Access to AI Agent Solutions</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="rounded-md text-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-md text-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            name="company"
            placeholder="Your company"
            value={formData.company}
            onChange={handleChange}
            required
            className="rounded-md text-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="organizationType">Organization Type</Label>
          <select
            id="organizationType"
            name="organizationType"
            value={formData.organizationType}
            onChange={handleChange as any}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Select organization type</option>
            <option value="business">Business</option>
            <option value="finance">Financial Institution</option>
            <option value="government">Government</option>
            <option value="ngo">NGO</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="useCase">How do you plan to use our AI agent solutions?</Label>
          <Textarea
            id="useCase"
            name="useCase"
            placeholder="Tell us about your AI agent needs, infrastructure requirements, or cost management goals..."
            value={formData.useCase}
            onChange={handleChange}
            rows={3}
            className="rounded-md text-foreground"
          />
        </div>
        
        {status === "error" && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 text-sm">
            {errorMessage || "Failed to submit form. Please try again."}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full rounded-full py-6 mt-2"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Request Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
} 