import { Card } from "../../components/ui/card";
import { Users, ShoppingBag, Pill, TrendingUp, DollarSign, MapPin } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,458",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "#0F766E"
  },
  {
    title: "Total Orders",
    value: "3,842",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    color: "#2F8F7E"
  },
  {
    title: "Medicines",
    value: "1,256",
    change: "+5.4%",
    trend: "up",
    icon: Pill,
    color: "#5FA79A"
  },
  {
    title: "Revenue",
    value: "$284,592",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "#0F766E"
  },
  {
    title: "Pharmacies",
    value: "156",
    change: "+3.1%",
    trend: "up",
    icon: MapPin,
    color: "#2F8F7E"
  },
  {
    title: "Growth Rate",
    value: "23.8%",
    change: "+2.4%",
    trend: "up",
    icon: TrendingUp,
    color: "#5FA79A"
  },
];

const recentOrders = [
  { id: "ORD-2026-145", user: "John Smith", amount: 89.99, status: "Completed", time: "5 min ago" },
  { id: "ORD-2026-144", user: "Sarah Johnson", amount: 45.50, status: "Processing", time: "12 min ago" },
  { id: "ORD-2026-143", user: "Mike Wilson", amount: 124.99, status: "Completed", time: "25 min ago" },
  { id: "ORD-2026-142", user: "Emma Davis", amount: 67.25, status: "Pending", time: "1 hour ago" },
  { id: "ORD-2026-141", user: "James Brown", amount: 198.75, status: "Completed", time: "2 hours ago" },
];

const topMedicines = [
  { name: "Paracetamol 500mg", sales: 1248, revenue: "$11,232" },
  { name: "Amoxicillin 250mg", sales: 987, revenue: "$15,780" },
  { name: "Vitamin D3 1000 IU", sales: 856, revenue: "$10,700" },
  { name: "Ibuprofen 400mg", sales: 745, revenue: "$8,184" },
  { name: "Cetirizine 10mg", sales: 623, revenue: "$6,224" },
];

export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2" style={{ color: '#0F766E' }}>Admin Dashboard</h1>
        <p className="text-xl text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  stat.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-3xl" style={{ color: '#0F766E' }}>{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="p-6 rounded-2xl">
          <h2 className="text-2xl mb-6" style={{ color: '#0F766E' }}>Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{order.id}</p>
                  <p style={{ color: '#0F766E' }}>{order.user}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg" style={{ color: '#0F766E' }}>${order.amount}</p>
                  <p className="text-xs text-gray-500">{order.time}</p>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Completed" 
                      ? "bg-green-100 text-green-800"
                      : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-orange-100 text-orange-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Medicines */}
        <Card className="p-6 rounded-2xl">
          <h2 className="text-2xl mb-6" style={{ color: '#0F766E' }}>Top Selling Medicines</h2>
          <div className="space-y-4">
            {topMedicines.map((medicine, index) => (
              <div key={medicine.name} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#0F766E' }}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p style={{ color: '#0F766E' }}>{medicine.name}</p>
                  <p className="text-sm text-gray-500">{medicine.sales} units sold</p>
                </div>
                <p className="text-lg" style={{ color: '#0F766E' }}>{medicine.revenue}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #2F8F7E 100%)' }}>
        <h2 className="text-2xl text-white mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
            <Users className="w-6 h-6 mb-2 mx-auto" />
            <p>Add User</p>
          </button>
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
            <Pill className="w-6 h-6 mb-2 mx-auto" />
            <p>Add Medicine</p>
          </button>
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
            <MapPin className="w-6 h-6 mb-2 mx-auto" />
            <p>Add Pharmacy</p>
          </button>
          <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
            <ShoppingBag className="w-6 h-6 mb-2 mx-auto" />
            <p>View Orders</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
