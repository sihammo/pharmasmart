import { Outlet, Link, useLocation } from "react-router";
import { Package, Home, MapPin, Pill, Heart, ShoppingCart, User, Search, Bell, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";

export function DashboardLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/dashboard/pharmacies", icon: MapPin, label: "Pharmacies" },
    { path: "/dashboard/medicines", icon: Pill, label: "Medicines" },
    { path: "/dashboard/health-packs", icon: Heart, label: "Health Packs" },
    { path: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
    { path: "/dashboard/account", icon: User, label: "Account" },
    { path: "/dashboard/profile", icon: User, label: "Settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl hidden sm:inline" style={{ color: '#0F766E' }}>MediCare+</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search medicines, pharmacies, or health packs..."
                className="pl-10 h-10 border-2 focus:border-[#0F766E] rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#0F766E' }}></span>
            </Button>
            <Link to="/dashboard/profile">
              <Button variant="ghost" size="icon" className="rounded-full w-10 h-10" style={{ backgroundColor: '#B7D1CC' }}>
                <User className="w-5 h-5" style={{ color: '#0F766E' }} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside 
          className="hidden lg:block w-64 border-r border-gray-200 min-h-[calc(100vh-4rem)] sticky top-16"
          style={{ backgroundColor: '#B7D1CC' }}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      active
                        ? "text-white shadow-lg"
                        : "text-gray-700 hover:bg-[#8FB9B0]"
                    }`}
                    style={active ? { backgroundColor: '#0F766E' } : {}}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-lg">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Sidebar - Mobile */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <aside 
              className="fixed top-0 left-0 w-64 h-full shadow-xl"
              style={{ backgroundColor: '#B7D1CC' }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl" style={{ color: '#0F766E' }}>MediCare+</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                        <div
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            active
                              ? "text-white shadow-lg"
                              : "text-gray-700 hover:bg-[#8FB9B0]"
                          }`}
                          style={active ? { backgroundColor: '#0F766E' } : {}}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-lg">{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}