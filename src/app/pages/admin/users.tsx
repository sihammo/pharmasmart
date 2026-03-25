import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, UserPlus, MoreVertical, Mail, Phone, Calendar, Shield, Ban } from "lucide-react";
import { Badge } from "../../components/ui/badge";

const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    role: "Customer",
    status: "Active",
    joined: "March 10, 2026",
    orders: 12,
    spent: "$1,245.80"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    role: "Customer",
    status: "Active",
    joined: "March 8, 2026",
    orders: 8,
    spent: "$876.50"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    phone: "+1 (555) 345-6789",
    role: "Pharmacy Owner",
    status: "Active",
    joined: "February 28, 2026",
    orders: 156,
    spent: "$15,432.90"
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "+1 (555) 456-7890",
    role: "Customer",
    status: "Active",
    joined: "March 15, 2026",
    orders: 5,
    spent: "$445.25"
  },
  {
    id: 5,
    name: "James Brown",
    email: "james.brown@example.com",
    phone: "+1 (555) 567-8901",
    role: "Customer",
    status: "Suspended",
    joined: "March 1, 2026",
    orders: 3,
    spent: "$298.75"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1 (555) 678-9012",
    role: "Admin",
    status: "Active",
    joined: "January 5, 2026",
    orders: 0,
    spent: "$0.00"
  },
  {
    id: 7,
    name: "David Martinez",
    email: "david.m@example.com",
    phone: "+1 (555) 789-0123",
    role: "Customer",
    status: "Active",
    joined: "March 12, 2026",
    orders: 15,
    spent: "$1,876.40"
  },
  {
    id: 8,
    name: "Rachel Green",
    email: "rachel.green@example.com",
    phone: "+1 (555) 890-1234",
    role: "Pharmacy Owner",
    status: "Active",
    joined: "February 15, 2026",
    orders: 89,
    spent: "$9,234.60"
  },
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl mb-2" style={{ color: '#0F766E' }}>User Management</h1>
          <p className="text-xl text-gray-600">Manage all user accounts and permissions</p>
        </div>
        <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg">
          <UserPlus className="w-5 h-5 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 rounded-2xl">
          <p className="text-gray-600 mb-1">Total Users</p>
          <p className="text-3xl" style={{ color: '#0F766E' }}>12,458</p>
        </Card>
        <Card className="p-6 rounded-2xl">
          <p className="text-gray-600 mb-1">Active Users</p>
          <p className="text-3xl" style={{ color: '#0F766E' }}>11,892</p>
        </Card>
        <Card className="p-6 rounded-2xl">
          <p className="text-gray-600 mb-1">New This Month</p>
          <p className="text-3xl" style={{ color: '#0F766E' }}>1,245</p>
        </Card>
        <Card className="p-6 rounded-2xl">
          <p className="text-gray-600 mb-1">Suspended</p>
          <p className="text-3xl text-orange-600">566</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Customer", "Pharmacy Owner", "Admin"].map((role) => (
              <Button
                key={role}
                variant={filterRole === role ? "default" : "outline"}
                onClick={() => setFilterRole(role)}
                className={filterRole === role 
                  ? "bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg" 
                  : "border-2 rounded-lg"
                }
                style={filterRole !== role ? { borderColor: '#5FA79A', color: '#0F766E' } : {}}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#B7D1CC' }}>
              <tr>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>User</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Contact</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Role</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Status</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Orders</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Total Spent</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Joined</th>
                <th className="text-left p-4" style={{ color: '#0F766E' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#0F766E' }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ color: '#0F766E' }}>{user.name}</p>
                        <p className="text-sm text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge 
                      variant="outline"
                      className={
                        user.role === "Admin" 
                          ? "border-purple-500 text-purple-700"
                          : user.role === "Pharmacy Owner"
                            ? "border-blue-500 text-blue-700"
                            : "border-gray-500 text-gray-700"
                      }
                    >
                      {user.role === "Admin" && <Shield className="w-3 h-3 mr-1" />}
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{user.orders}</td>
                  <td className="p-4" style={{ color: '#0F766E' }}>{user.spent}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{user.joined}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
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
        <p className="text-gray-600">Showing {filteredUsers.length} of {mockUsers.length} users</p>
        <div className="flex gap-2">
          <Button variant="outline" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
            Previous
          </Button>
          <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg">1</Button>
          <Button variant="outline" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>2</Button>
          <Button variant="outline" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>3</Button>
          <Button variant="outline" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
