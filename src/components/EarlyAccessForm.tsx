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
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function EarlyAccessForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    useCase: "",
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
          Your early access request for AICyclinder has been submitted. We&apos;ll be in touch soon!
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
      <h3 className="text-xl font-semibold mb-6 text-center">Request AICyclinder Early Access</h3>
      
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
            className="rounded-md"
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
            className="rounded-md"
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
            className="rounded-md"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="useCase">How do you plan to use our AI solutions?</Label>
          <Textarea
            id="useCase"
            name="useCase"
            placeholder="Tell us about your use case..."
            value={formData.useCase}
            onChange={handleChange}
            rows={3}
            className="rounded-md"
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