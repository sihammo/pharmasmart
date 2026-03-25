import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home, Search } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#B7D1CC' }}>
      <div className="text-center space-y-6 max-w-2xl">
        <div className="text-9xl" style={{ color: '#0F766E' }}>404</div>
        <h1 className="text-4xl" style={{ color: '#0F766E' }}>Page Not Found</h1>
        <p className="text-xl text-gray-600">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link to="/">
            <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white text-lg px-6 py-6 h-auto rounded-lg">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button 
              variant="outline"
              className="border-2 text-lg px-6 py-6 h-auto rounded-lg"
              style={{ borderColor: '#0F766E', color: '#0F766E' }}
            >
              <Search className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
