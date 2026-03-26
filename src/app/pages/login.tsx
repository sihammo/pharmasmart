import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Package } from "lucide-react";

import { apiClient } from "../api/client";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await apiClient("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Logged in successfully!");
      
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#B7D1CC' }}>
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#0F766E' }}>
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl" style={{ color: '#0F766E' }}>
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            Sign in to access your healthcare dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded accent-[#0F766E]" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="hover:underline" style={{ color: '#0F766E' }}>
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg"
          >
            Sign In
          </Button>

          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="hover:underline" style={{ color: '#0F766E' }}>
              Sign up
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
