import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Package, LayoutDashboard, Users, ShoppingBag, Pill, MapPin, BarChart3, Settings, Menu, X, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== "ADMIN") {
      navigate("/");
    }
  }, [user, navigate, isLoading]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  if (!user || user.role !== "ADMIN") return null;

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
    { path: "/admin/medicines", icon: Pill, label: "Medicines" },
    { path: "/admin/pharmacies", icon: MapPin, label: "Pharmacies" },
    { path: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
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
            <Link to="/admin" className="flex items-center gap-2">
              <img src="/logo.jpg" alt="PharmaSmart" className="w-10 h-10 object-contain rounded-lg bg-white" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none" style={{ color: '#0F766E' }}>PHARMA<span className="text-teal-400">SMART</span></span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">Management Cluster</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold" style={{ color: '#0F766E' }}>{user.name || "Administrator"}</p>
              <p className="text-[10px] text-gray-400 font-mono uppercase">{user.email || "system@pharmasmart.io"}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-teal-50 border-2 border-teal-100 flex items-center justify-center text-teal-700 font-bold overflow-hidden shadow-sm">
               {user.name?.charAt(0) || "A"}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
              onClick={logout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
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
                    <img src="/logo.jpg" alt="PharmaSmart" className="w-10 h-10 object-contain rounded-lg bg-white shadow-sm" />
                    <span className="text-xl" style={{ color: '#0F766E' }}>Admin Panel</span>
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
