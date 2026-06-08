import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, UserPlus, MoreVertical, Mail, Phone, Calendar, Shield, Ban, Trash2, X } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { apiClient } from "../../api/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "CUSTOMER",
    specialization: "",
    licenseNumber: ""
  });

  const [selectedDoctorForEdit, setSelectedDoctorForEdit] = useState<any>(null);
  const [editDoctorData, setEditDoctorData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    licenseNumber: "",
    status: "ACTIVE",
    schedule: {
      days: [] as string[],
      timeSlots: [] as string[]
    }
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient("/auth/users");
      setUsers(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await apiClient(`/auth/users/${id}`, { method: "DELETE" });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify(newUserData),
      });
      toast.success("User created successfully");
      setIsAddUserOpen(false);
      setNewUserData({ 
        name: "", 
        email: "", 
        password: "", 
        phone: "", 
        role: "CUSTOMER",
        specialization: "",
        licenseNumber: ""
      });
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to create user");
    }
  };

  const handleUpdateRole = async (id: string, role: string) => {
    try {
      await apiClient(`/auth/users/${id}/role`, {
        method: "PUT",
        body: JSON.stringify({ role }),
      });
      toast.success("User role updated");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to update role");
    }
  };

  const handleEditDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorForEdit) return;
    try {
      await apiClient(`/auth/users/doctor/${selectedDoctorForEdit._id}`, {
        method: "PUT",
        body: JSON.stringify(editDoctorData)
      });
      toast.success("Doctor details updated successfully");
      setSelectedDoctorForEdit(null);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to update doctor details");
    }
  };

  const openEditDoctorModal = (doctor: any) => {
    setSelectedDoctorForEdit(doctor);
    setEditDoctorData({
      name: doctor.name || "",
      email: doctor.email || "",
      phone: doctor.phone || "",
      specialization: doctor.specialization || "",
      licenseNumber: doctor.licenseNumber || "",
      status: doctor.status || "ACTIVE",
      schedule: doctor.schedule || { days: [], timeSlots: [] }
    });
  };

  const filteredUsers = users.filter((user) => {
    const name = user.name || "";
    const email = user.email || "";
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#0F766E' }}>User Management</h1>
          <p className="text-xl text-gray-600">Manage all user accounts and permissions</p>
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-xl h-12 px-6 shadow-lg">
              <UserPlus className="w-5 h-5 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#0F766E]">Add New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={newUserData.name} 
                  onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                  placeholder="John Doe" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newUserData.email} 
                  onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={newUserData.password} 
                  onChange={(e) => setNewUserData({...newUserData, password: e.target.value})}
                  placeholder="********" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={newUserData.phone} 
                  onChange={(e) => setNewUserData({...newUserData, phone: e.target.value})}
                  placeholder="+1 (555) 000-0000" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">User Role</Label>
                <Select value={newUserData.role} onValueChange={(v) => setNewUserData({...newUserData, role: v})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUSTOMER">Customer Account</SelectItem>
                    <SelectItem value="PHARMACY_OWNER">Pharmacy Owner</SelectItem>
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                    <SelectItem value="DOCTOR">Doctor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newUserData.role === "DOCTOR" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input 
                      id="specialization" 
                      value={newUserData.specialization} 
                      onChange={(e) => setNewUserData({...newUserData, specialization: e.target.value})}
                      placeholder="Cardiologist, General Practitioner, etc." 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input 
                      id="licenseNumber" 
                      value={newUserData.licenseNumber} 
                      onChange={(e) => setNewUserData({...newUserData, licenseNumber: e.target.value})}
                      placeholder="LIC-123456" 
                      required 
                    />
                  </div>
                </>
              )}

              <DialogFooter className="pt-4">
                <Button type="submit" className="w-full bg-[#0F766E] hover:bg-[#0d6560] h-12 text-lg">
                  Create User Account
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <Card className="p-6 rounded-2xl border-2 border-[#B7D1CC]/30">
          <p className="text-gray-600 mb-1 text-sm">Total Users</p>
          <p className="text-3xl font-bold" style={{ color: '#0F766E' }}>{users.length}</p>
        </Card>
        <Card className="p-6 rounded-2xl border-2 border-[#B7D1CC]/30">
          <p className="text-gray-600 mb-1 text-sm">Doctors</p>
          <p className="text-3xl font-bold" style={{ color: '#0F766E' }}>{users.filter(u => u.role === "DOCTOR").length}</p>
        </Card>
        <Card className="p-6 rounded-2xl border-2 border-[#B7D1CC]/30">
          <p className="text-gray-600 mb-1 text-sm">Owners</p>
          <p className="text-3xl font-bold" style={{ color: '#0F766E' }}>{users.filter(u => u.role === "PHARMACY_OWNER").length}</p>
        </Card>
        <Card className="p-6 rounded-2xl border-2 border-[#B7D1CC]/30">
          <p className="text-gray-600 mb-1 text-sm">Customers</p>
          <p className="text-3xl font-bold" style={{ color: '#0F766E' }}>{users.filter(u => u.role === "CUSTOMER").length}</p>
        </Card>
        <Card className="p-6 rounded-2xl border-2 border-[#B7D1CC]/30">
          <p className="text-gray-600 mb-1 text-sm">Admins</p>
          <p className="text-3xl font-bold" style={{ color: '#0F766E' }}>{users.filter(u => u.role === "ADMIN").length}</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-2 focus:border-[#0F766E] rounded-xl"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {["All", "DOCTOR", "CUSTOMER", "PHARMACY_OWNER", "ADMIN"].map((role) => (
              <Button
                key={role}
                variant={filterRole === role ? "default" : "outline"}
                onClick={() => setFilterRole(role)}
                className={`rounded-xl px-4 h-12 whitespace-nowrap ${
                  filterRole === role 
                    ? "bg-[#0F766E] text-white" 
                    : "border-2 border-[#B7D1CC] text-[#0F766E]"
                }`}
              >
                {role === "PHARMACY_OWNER" ? "Owners" : role === "DOCTOR" ? "Doctors" : role.charAt(0) + role.slice(1).toLowerCase()}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="rounded-2xl overflow-hidden shadow-sm border-2 border-[#B7D1CC]/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#B7D1CC]/20">
                <th className="text-left p-6 font-semibold" style={{ color: '#0F766E' }}>User</th>
                <th className="text-left p-6 font-semibold" style={{ color: '#0F766E' }}>Role</th>
                <th className="text-left p-6 font-semibold" style={{ color: '#0F766E' }}>Joined</th>
                <th className="text-right p-6 font-semibold" style={{ color: '#0F766E' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={4} className="p-12 text-center text-gray-500">Loading users...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={4} className="p-12 text-center text-gray-500">No users found.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#0F766E' }}>
                          {user.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-lg">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <Select 
                        defaultValue={user.role} 
                        onValueChange={(newRole) => handleUpdateRole(user._id, newRole)}
                      >
                        <SelectTrigger className={`w-[140px] h-8 rounded-full text-xs font-semibold border-2 ${
                          user.role === "ADMIN" 
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : user.role === "PHARMACY_OWNER"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-emerald-100 text-emerald-700 border-emerald-200"
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                          <SelectItem value="PHARMACY_OWNER">OWNER</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="DOCTOR">DOCTOR</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-6 text-gray-600 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.role === "DOCTOR" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDoctorModal(user)}
                            className="rounded-xl border-[#B7D1CC] text-[#0F766E] hover:bg-teal-50"
                          >
                            Edit Profile
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Doctor Modal */}
      <Dialog open={selectedDoctorForEdit !== null} onOpenChange={(open) => !open && setSelectedDoctorForEdit(null)}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#0F766E]">Edit Doctor Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditDoctorSubmit} className="space-y-4 py-4 max-h-[75vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Doctor Name</Label>
              <Input 
                id="edit-name" 
                value={editDoctorData.name} 
                onChange={(e) => setEditDoctorData({...editDoctorData, name: e.target.value})}
                placeholder="Dr. John Doe"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input 
                id="edit-email" 
                type="email"
                value={editDoctorData.email} 
                onChange={(e) => setEditDoctorData({...editDoctorData, email: e.target.value})}
                placeholder="dr.john@example.com" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input 
                id="edit-phone" 
                value={editDoctorData.phone} 
                onChange={(e) => setEditDoctorData({...editDoctorData, phone: e.target.value})}
                placeholder="+1 (555) 000-0000" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-spec">Specialization</Label>
              <Input 
                id="edit-spec" 
                value={editDoctorData.specialization} 
                onChange={(e) => setEditDoctorData({...editDoctorData, specialization: e.target.value})}
                placeholder="Pediatrician, Oncologist, etc." 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-license">License Number</Label>
              <Input 
                id="edit-license" 
                value={editDoctorData.licenseNumber} 
                onChange={(e) => setEditDoctorData({...editDoctorData, licenseNumber: e.target.value})}
                placeholder="LIC-987654" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={editDoctorData.status} onValueChange={(v) => setEditDoctorData({...editDoctorData, status: v})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Schedule Section */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <Label className="font-bold text-gray-700">Manage Weekly Schedule</Label>
              
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Days Active (comma separated)</Label>
                <Input 
                  placeholder="Monday, Wednesday, Friday"
                  value={editDoctorData.schedule?.days?.join(", ") || ""}
                  onChange={(e) => {
                    const days = e.target.value.split(",").map(d => d.trim()).filter(Boolean);
                    setEditDoctorData({
                      ...editDoctorData,
                      schedule: { ...editDoctorData.schedule, days }
                    });
                  }}
                />
              </div>

              <div className="space-y-1 mt-2">
                <Label className="text-xs text-gray-500">Time Slots (comma separated)</Label>
                <Input 
                  placeholder="09:00, 10:00, 14:00, 15:00"
                  value={editDoctorData.schedule?.timeSlots?.join(", ") || ""}
                  onChange={(e) => {
                    const timeSlots = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                    setEditDoctorData({
                      ...editDoctorData,
                      schedule: { ...editDoctorData.schedule, timeSlots }
                    });
                  }}
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full bg-[#0F766E] hover:bg-[#0d6560] h-12 text-lg">
                Save Doctor Details
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
