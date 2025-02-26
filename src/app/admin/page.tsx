"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, LogOut } from "lucide-react";

type EarlyAccessSubmission = {
  id: string;
  name: string;
  email: string;
  company: string;
  useCase: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [submissions, setSubmissions] = useState<EarlyAccessSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<EarlyAccessSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  
  // Simple authentication check
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      setIsLoading(false);
    }
  }, []);
  
  // Fetch submissions from the API
  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/early-access/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("admin_token");
          setIsAuthenticated(false);
          setError("Session expired. Please log in again.");
          return;
        }
        throw new Error("Failed to fetch submissions");
      }
      
      const data = await response.json();
      setSubmissions(data);
      setFilteredSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("Failed to load submissions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/early-access/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      
      if (!response.ok) {
        throw new Error("Invalid password");
      }
      
      const data = await response.json();
      localStorage.setItem("admin_token", data.token);
      setIsAuthenticated(true);
      fetchSubmissions();
    } catch (error) {
      setError("Invalid password. Please try again.");
      setIsLoading(false);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredSubmissions(submissions);
      return;
    }
    
    const filtered = submissions.filter(
      (submission) =>
        submission.name.toLowerCase().includes(term) ||
        submission.email.toLowerCase().includes(term) ||
        submission.company.toLowerCase().includes(term) ||
        submission.useCase.toLowerCase().includes(term)
    );
    
    setFilteredSubmissions(filtered);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="w-full max-w-md p-8 bg-background rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-md"
              />
            </div>
            
            <Button type="submit" className="w-full rounded-md">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Early Access Requests</h1>
          
          <Button variant="outline" onClick={handleLogout} className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        
        <div className="bg-background rounded-lg shadow-lg p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, email, company..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 rounded-md"
            />
          </div>
          
          <div className="overflow-x-auto">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {submissions.length === 0
                  ? "No early access requests yet."
                  : "No results found for your search."}
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="border-b hover:bg-muted/20">
                      <td className="py-3 px-4">{submission.name}</td>
                      <td className="py-3 px-4">
                        <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                          {submission.email}
                        </a>
                      </td>
                      <td className="py-3 px-4">{submission.company}</td>
                      <td className="py-3 px-4">{formatDate(submission.createdAt)}</td>
                      <td className="py-3 px-4">
                        {submission.useCase ? (
                          <div className="max-w-xs truncate" title={submission.useCase}>
                            {submission.useCase}
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic">Not provided</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 