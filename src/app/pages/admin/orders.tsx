import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, Package, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react";
import { apiClient } from "../../api/client";
import { toast } from "sonner";

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiClient("/orders");
        setOrders(data);
      } catch (error: any) {
        toast.error("Failed to fetch orders");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || order.status === filterStatus.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, order) => 
    order.status === "DELIVERED" ? sum + order.totalAmount : sum, 0
  );

  const statusCounts = {
    completed: orders.filter(o => o.status === "DELIVERED").length,
    processing: orders.filter(o => ["ACCEPTED", "READY"].includes(o.status)).length,
    pending: orders.filter(o => o.status === "PENDING").length,
    cancelled: orders.filter(o => o.status === "CANCELLED").length,
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
          <p className="text-3xl" style={{ color: '#0F766E' }}>{orders.length}</p>
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
                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p style={{ color: '#0F766E' }}>#{order._id.slice(-8).toUpperCase()}</p>
                  </td>
                  <td className="p-4">
                    <div>
                      <p style={{ color: '#0F766E' }}>{order.userId?.name || "Unknown User"}</p>
                      <p className="text-sm text-gray-500">{order.userId?.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700 text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-4 text-gray-700">{order.items?.length || 0}</td>
                  <td className="p-4">
                    <p className="text-lg" style={{ color: '#0F766E' }}>${order.totalAmount?.toFixed(2)}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      order.status === "DELIVERED"
                        ? "bg-green-100 text-green-800"
                        : ["ACCEPTED", "READY"].includes(order.status)
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "PENDING"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-teal-800">{order.pharmacyId?.name || "Direct Sale"}</span>
                      <span className="text-[10px] text-gray-400 capitalize">{order.pharmacyId?.address}</span>
                    </div>
                  </td>
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
        <p className="text-gray-600">Showing {filteredOrders.length} of {orders.length} orders</p>
        <div className="flex gap-2">
          <Button variant="outline" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>Previous</Button>
          <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg">1</Button>
          <Button variant="outline" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>Next</Button>
        </div>
      </div>
    </div>
  );
}
