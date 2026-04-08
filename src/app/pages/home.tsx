import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MapPin, Clock, Phone, Heart, Package, Navigation } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { apiClient } from "../api/client";
import { useAuth } from "../context/AuthContext";

export function HomePage() {
  const { user, isLoading: authLoading } = useAuth();
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, totalRevenue: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role === "PHARMACY_OWNER") {
          const incomingOrders = await apiClient("/orders/incoming");
          const total = incomingOrders.reduce((acc: number, o: any) => acc + (o.totalAmount || 0), 0);
          const pending = incomingOrders.filter((o: any) => o.status === "PENDING").length;
          setStats({
            totalOrders: incomingOrders.length,
            pendingOrders: pending,
            totalRevenue: total
          });
        }
        
        const [pharmsData, medsData] = await Promise.all([
          apiClient("/pharmacies"),
          apiClient("/medicines")
        ]);
        setPharmacies(pharmsData.slice(0, 3));
        setMedicines(medsData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load home data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (user?.role === "PHARMACY_OWNER") {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
        <div className="rounded-[2rem] p-10 relative overflow-hidden shadow-2xl shadow-teal-900/20" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #2F8F7E 100%)' }}>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name || 'User'}</h1>
            <p className="text-teal-50/80 mb-0">Pharmacy Management Hub • {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 border-none shadow-xl shadow-teal-900/5 rounded-[2rem] bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-teal-50 rounded-xl">
                <Package className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
                <h3 className="text-3xl font-black text-gray-800">{stats.totalOrders}</h3>
              </div>
            </div>
            <Link to="/dashboard/orders">
              <Button variant="link" className="text-teal-600 p-0 h-auto font-bold">View all orders →</Button>
            </Link>
          </Card>

          <Card className="p-8 border-none shadow-xl shadow-teal-900/5 rounded-[2rem] bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Pending</p>
                <h3 className="text-3xl font-black text-gray-800">{stats.pendingOrders}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-400">Requires your attention</p>
          </Card>

          <Card className="p-8 border-none shadow-xl shadow-teal-900/5 rounded-[2rem] bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Navigation className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
                <h3 className="text-3xl font-black text-gray-800">{stats.totalRevenue.toFixed(2)} DZ</h3>
              </div>
            </div>
            <p className="text-sm text-gray-400">Total volume processed</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-teal-900/5 bg-white">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Operational Tools</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <Link to="/dashboard/account" className="p-4 rounded-2xl bg-teal-50 hover:bg-teal-100 transition-colors group">
                   <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-teal-600" />
                   </div>
                   <p className="font-bold text-teal-900">Manage Location</p>
                   <p className="text-xs text-teal-600/60">Update map visibility</p>
                </Link>
                <Link to="/dashboard/profile" className="p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                   <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-gray-600" />
                   </div>
                   <p className="font-bold text-gray-900">Working Hours</p>
                   <p className="text-xs text-gray-400">Update availability</p>
                </Link>
             </div>
          </Card>

          <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-teal-900/5 bg-white flex items-center justify-center text-center">
             <div>
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Heart className="w-10 h-10 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Need Assistance?</h3>
                <p className="text-gray-500 text-sm mb-6">Contact the PharmaSmart Support <br/>team for technical issues.</p>
                <Button variant="outline" className="rounded-xl border-teal-200 text-teal-700 font-bold">Open Support Ticket</Button>
             </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="rounded-[2rem] p-10 relative overflow-hidden shadow-2xl shadow-teal-900/20" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #2F8F7E 100%)' }}>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">Your Health, <br/>Our Absolute Priority.</h1>
          <p className="text-xl text-teal-50/80 mb-8">Access thousands of medicines and nearby pharmacies with real-time stock verification and home delivery.</p>
          <div className="flex gap-4">
             <Link to="/dashboard/medicines">
               <Button className="bg-white text-[#0F766E] hover:bg-teal-50 h-14 px-8 rounded-2xl font-bold text-lg shadow-xl">
                 Start Shopping
               </Button>
             </Link>
             <Link to="/dashboard/pharmacies">
               <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 h-14 px-8 rounded-2xl font-bold text-lg backdrop-blur-md">
                 Find Near Me
               </Button>
             </Link>
          </div>
        </div>
        {/* Abstract decorative elements */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute right-20 bottom-0 w-60 h-60 bg-teal-400/20 rounded-full blur-2xl" />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-8">
        <Link to="/dashboard/pharmacies" className="group">
          <Card className="p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer border-none shadow-xl shadow-teal-900/5 rounded-[2rem] bg-white group-hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform" style={{ backgroundColor: '#5FA79A' }}>
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[#0F766E]">Verified Pharmacies</h3>
            <p className="text-gray-500 text-lg leading-relaxed">Browse 100+ licensed pharmacies with instant stock confirmation.</p>
          </Card>
        </Link>

        <Link to="/dashboard/medicines" className="group">
          <Card className="p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer border-none shadow-xl shadow-teal-900/5 rounded-[2rem] bg-white group-hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg -rotate-3 group-hover:rotate-0 transition-transform" style={{ backgroundColor: '#2F8F7E' }}>
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[#0F766E]">Global Inventory</h3>
            <p className="text-gray-500 text-lg leading-relaxed">Search 5000+ medicines, vitamins, and healthcare equipment.</p>
          </Card>
        </Link>

        <Card className="p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer border-none shadow-xl shadow-teal-900/5 rounded-[2rem] bg-white group hover:-translate-y-2 lg:bg-teal-50/30">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: '#0F766E' }}>
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#0F766E]">Chronic Care</h3>
          <p className="text-gray-500 text-lg leading-relaxed">Specialized monthly packs for diabetes, asthma, and heart health.</p>
        </Card>
      </div>

      {/* Nearby Pharmacies */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#0F766E]">Verified Pharmacies Nearby</h2>
            <p className="text-gray-500">Live status and availability within your region.</p>
          </div>
          <Link to="/dashboard/pharmacies">
            <Button variant="ghost" className="text-[#0F766E] font-bold text-lg hover:bg-teal-50 rounded-xl px-6">
              Explore All Network
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            [1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-3xl" />)
          ) : pharmacies.length === 0 ? (
             <div className="col-span-3 text-center py-12 bg-gray-50 rounded-3xl text-gray-500 italic text-lg font-medium">No pharmacies found in your area yet.</div>
          ) : pharmacies.map((pharmacy) => (
            <Card key={pharmacy._id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-[2rem] border-none shadow-xl shadow-teal-900/5 group">
              <div className="h-52 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md text-[#0F766E] text-xs font-bold rounded-full shadow-sm">
                   Network Partner
                </div>
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=1000`}
                  alt={pharmacy.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{pharmacy.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium truncate">{pharmacy.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full uppercase tracking-widest border border-emerald-100">
                    Open Now
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs uppercase">{pharmacy.openingHours?.open || "08:00"} - {pharmacy.openingHours?.close || "22:00"}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-2xl h-14 font-bold shadow-lg shadow-teal-900/10">
                    <Navigation className="w-5 h-5 mr-3" />
                    Visit Shop
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-2 rounded-2xl w-14 h-14 transition-colors"
                    style={{ borderColor: '#B7D1CC', color: '#0F766E' }}
                  >
                    <Phone className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Items */}
      <div className="pt-8 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#0F766E]">Featured Healthcare Products</h2>
            <p className="text-gray-500">Most requested medicines and equipment today.</p>
          </div>
          <Link to="/dashboard/medicines">
            <Button variant="ghost" className="text-[#0F766E] font-bold text-lg hover:bg-teal-50 rounded-xl px-6">
              Full Catalog
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
             [1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-3xl" />)
          ) : medicines.length === 0 ? (
             <div className="col-span-3 text-center py-12 bg-gray-50 rounded-3xl text-gray-500 italic text-lg font-medium">No medicines available in the catalog.</div>
          ) : medicines.map((med) => (
            <Card key={med._id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-[2rem] border-none shadow-xl shadow-teal-900/5 group flex flex-col h-full bg-white">
              <div className="h-56 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #B7D1CC 0%, #D1E5E1 100%)' }}>
                <ImageWithFallback
                  src={med.imageUrl || `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000`}
                  alt={med.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply opacity-80"
                />
                <div className="absolute bottom-4 left-4">
                   <div className="px-3 py-1 bg-[#0F766E] text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] shadow-lg">
                      {med.category}
                   </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1 justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-800">{med.name}</h3>
                    <span className="text-3xl font-black text-[#0F766E]">{med.price?.toFixed(2)} DZ</span>
                  </div>
                  <p className="text-gray-500 line-clamp-3 leading-relaxed text-sm">{med.description || "Premium pharmaceutical product verified by health experts."}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Availability</span>
                    <span className={`text-sm font-bold ${med.stockQuantity > 0 ? "text-[#0F766E]" : "text-red-500"}`}>
                      {med.stockQuantity > 0 ? `${med.stockQuantity} Ready to Ship` : "Out of Stock"}
                    </span>
                  </div>
                  <Button 
                    disabled={med.stockQuantity <= 0}
                    className="bg-[#0F766E] hover:bg-[#2F8F7E] text-white rounded-2xl px-6 h-12 font-bold shadow-lg shadow-teal-900/10 transition-transform active:scale-95"
                  >
                    Get Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
