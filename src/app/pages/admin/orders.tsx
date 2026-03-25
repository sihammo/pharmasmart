import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, Package, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react";

const mockOrders = [
  {
    id: "ORD-2026-145",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "March 17, 2026 10:30 AM",
    items: 3,
    total: 89.99,
    status: "Completed",
    payment: "Paid",
    pharmacy: "HealthPlus Pharmacy"
  },
  {
    id: "ORD-2026-144",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "March 17, 2026 10:18 AM",
    items: 2,
    total: 45.50,
    status: "Processing",
    payment: "Paid",
    pharmacy: "MediCare Central"
  },
  {
    id: "ORD-2026-143",
    customer: "Mike Wilson",
    email: "mike.wilson@example.com",
    date: "March 17, 2026 10:05 AM",
    items: 5,
    total: 124.99,
    status: "Completed",
    payment: "Paid",
    pharmacy: "Quick Meds Pharmacy"
  },
  {
    id: "ORD-2026-142",
    customer: "Emma Davis",
    email: "emma.davis@example.com",
    date: "March 17, 2026 09:15 AM",
    items: 1,
    total: 67.25,
    status: "Pending",
    payment: "Pending",
    pharmacy: "HealthPlus Pharmacy"
  },
  {
    id: "ORD-2026-141",
    customer: "James Brown",
    email: "james.brown@example.com",
    date: "March 17, 2026 08:42 AM",
    items: 4,
    total: 198.75,
    status: "Completed",
    payment: "Paid",
    pharmacy: "City Health Pharmacy"
  },
  {
    id: "ORD-2026-140",
    customer: "Lisa Anderson",
    email: "lisa.a@example.com",
    date: "March 17, 2026 07:30 AM",
    items: 2,
    total: 54.99,
    status: "Shipped",
    payment: "Paid",
    pharmacy: "Wellness Express"
  },
  {
    id: "ORD-2026-139",
    customer: "David Martinez",
    email: "david.m@example.com",
    date: "March 16, 2026 11:45 PM",
    items: 6,
    total: 234.50,
    status: "Cancelled",
    payment: "Refunded",
    pharmacy: "MediCare Central"
  },
  {
    id: "ORD-2026-138",
    customer: "Rachel Green",
    email: "rachel.green@example.com",
    date: "March 16, 2026 10:20 PM",
    items: 1,
    total: 89.99,
    status: "Completed",
    payment: "Paid",
    pharmacy: "HealthPlus Pharmacy"
  },
];

export function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = mockOrders.reduce((sum, order) => 
    order.status === "Completed" ? sum + order.total : sum, 0
  );

  const statusCounts = {
    completed: mockOrders.filter(o => o.status === "Completed").length,
    processing: mockOrders.filter(o => o.status === "Processing").length,
    pending: mockOrders.filter(o => o.status === "Pending").length,
    shipped: mockOrders.filter(o => o.status === "Shipped").length,
    cancelled: mockOrders.filter(o => o.status === "Cancelled").length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2" style={{ color: '#0F766E' }}>Order Management</h1>
        <p className="text-xl text-gray-600">Track and manage all customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5" style={{ color: '#0F766E' }} />
            <p className="text-gray-600">Total Orders</p>
          </div>
          <p className="text-3xl" style={{ color: '#0F766E' }}>{mockOrders.length}</p>
        </Card>
        <Card className="p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-gray-600">Completed</p>
          </div>
          <p className="text-3xl text-green-600">{statusCounts.completed}</p>
        </Card>
        <Card className="p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <p className="text-gray-600">Processing</p>
          </div>
          <p className="text-3xl text-blue-600">{statusCounts.processing}</p>
        </Card>
        <Card className="p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" style={{ color: '#0F766E' }} />
            <p className="text-gray-600">Revenue</p>
          </div>
          <p className="text-3xl" style={{ color: '#0F766E' }}>${totalRevenue.toFixed(2)}</p>
        </Card>
        <Card className="p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <p className="text-gray-600">Cancelled</p>
          </div>
          <p className="text-3xl text-red-600">{statusCounts.cancelled}</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by order ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Completed", "Processing", "Pending", "Shipped", "Cancelled"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status 
                  ? "bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg" 
                  : "border-2 rounded-lg"
                }
                style={filterStatus !== status ? { borderColor: '#5FA79A', color: '#0F766E' } : {}}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#B7D1CC' }}>
              <tr>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Order ID</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Customer</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Date & Time</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Items</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Total</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Status</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Payment</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Pharmacy</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p style={{ color: '#0F766E' }}>{order.id}</p>
                  </td>
                  <td className="p-4">
                    <div>
                      <p style={{ color: '#0F766E' }}>{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700 text-sm">{order.date}</td>
                  <td className="p-4 text-gray-700">{order.items}</td>
                  <td className="p-4">
                    <p className="text-lg" style={{ color: '#0F766E' }}>${order.total.toFixed(2)}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Shipped"
                            ? "bg-purple-100 text-purple-800"
                            : order.status === "Pending"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.payment === "Paid"
                        ? "bg-green-100 text-green-800"
                        : order.payment === "Refunded"
                          ? "bg-red-100 text-red-800"
                          : "bg-orange-100 text-orange-800"
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700 text-sm">{order.pharmacy}</td>
                  <td className="p-4">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-2 rounded-lg"
                      style={{ borderColor: '#0F766E', color: '#0F766E' }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">Showing {filteredOrders.length} of {mockOrders.length} orders</p>
        <div className="flex gap-2">
          <Button variant="outline" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
            Previous
          </Button>
          <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg">1</Button>
          <Button variant="outline" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
