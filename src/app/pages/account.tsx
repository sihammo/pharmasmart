import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { 
  User, Mail, Phone, MapPin, Calendar, CreditCard, 
  Package, Heart, Shield, Edit, Save, X, Plus, Trash2,
  Clock, Star, ExternalLink
} from "lucide-react";
import { apiClient } from "../api/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

interface HealthProfile {
  conditions: string[];
  allergies: string[];
  medications: string[];
  bloodType: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  createdAt: string;
  healthProfile: HealthProfile;
}

const recentOrders = [
  { id: "ORD-2026-001", date: "March 15, 2026", status: "Delivered", total: 67.48, items: ["Paracetamol 500mg", "Vitamin D3"] },
  { id: "ORD-2026-002", date: "March 10, 2026", status: "Delivered", total: 89.99, items: ["Diabetes Care Pack"] },
];

export function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingHealth, setIsEditingHealth] = useState(false);

  const [profileForm, setProfileForm] = useState({ name: "", phone: "", address: "" });
  const [healthForm, setHealthForm] = useState<HealthProfile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await apiClient("/auth/profile");
      setUser(data);
      setProfileForm({
        name: data.name,
        phone: data.phone || "",
        address: data.address || ""
      });
      setHealthForm(data.healthProfile || {
        conditions: [],
        allergies: [],
        medications: [],
        bloodType: "",
        emergencyContact: { name: "", relationship: "", phone: "" }
      });
    } catch (error: any) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updated = await apiClient("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(profileForm)
      });
      setUser({ ...user!, ...updated });
      setIsEditingProfile(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdateHealth = async () => {
    try {
      const updated = await apiClient("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ healthProfile: healthForm })
      });
      setUser({ ...user!, healthProfile: updated.healthProfile });
      setIsEditingHealth(false);
      toast.success("Health profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[60vh] text-[#0F766E] font-medium">Loading your profile...</div>;
  if (!user) return <div className="text-center p-12 text-red-600">User not found. Please log in again.</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#0F766E' }}>Account Settings</h1>
          <p className="text-xl text-gray-500">Manage your personal information, security, and health records.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-teal-900/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0FDFA] rounded-full -mr-16 -mt-16 z-0" />
            <div className="relative z-10 text-center space-y-6">
              <div className="w-28 h-28 rounded-3xl mx-auto flex items-center justify-center shadow-lg transform -rotate-3" style={{ backgroundColor: '#0F766E' }}>
                <User className="w-14 h-14 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1" style={{ color: '#0F766E' }}>{user.name}</h2>
                <span className="px-3 py-1 bg-teal-50 text-[#0F766E] text-xs font-bold rounded-full uppercase tracking-wider">
                  {user.role.replace('_', ' ')}
                </span>
              </div>
              <Separator className="bg-gray-100" />
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email Address</p>
                    <p className="text-sm font-medium text-gray-700 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Phone Number</p>
                    <p className="text-sm font-medium text-gray-700">{user.phone || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Primary Address</p>
                    <p className="text-sm font-medium text-gray-700 truncate">{user.address || "Not set"}</p>
                  </div>
                </div>
              </div>
              <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                <DialogTrigger asChild>
                  <Button className="w-full py-6 bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-2xl shadow-lg shadow-teal-900/20 transition-all hover:scale-[1.02]">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white rounded-3xl sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#0F766E]">Update Personal Info</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-gray-500">Full Name</Label>
                      <Input id="name" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="rounded-xl" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="text-gray-500">Phone</Label>
                      <Input id="phone" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="rounded-xl" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address" className="text-gray-500">Address</Label>
                      <Input id="address" value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} className="rounded-xl" />
                    </div>
                  </div>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="ghost" onClick={() => setIsEditingProfile(false)} className="rounded-xl">Discard</Button>
                    <Button onClick={handleUpdateProfile} style={{ backgroundColor: '#0F766E' }} className="text-white rounded-xl px-8">Save Profile</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-teal-900/5 bg-white relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: '#0F766E' }}>
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0F766E]">Health Profile</h2>
                  <p className="text-sm text-gray-400">Keep your records updated for better care.</p>
                </div>
              </div>
              <Dialog open={isEditingHealth} onOpenChange={setIsEditingHealth}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl border-2 px-6 font-bold" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
                    Edit Info
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white rounded-3xl overflow-y-auto max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#0F766E]">Update Health Profile</DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6 py-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="font-bold text-gray-600">Medical Conditions</Label>
                        <div className="flex flex-wrap gap-2">
                          {healthForm?.conditions.map((c, i) => (
                            <span key={i} className="flex items-center gap-1 px-3 py-1 bg-teal-50 text-[#0F766E] rounded-full text-xs font-medium border border-teal-100">
                              {c}
                              <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => {
                                const next = [...healthForm.conditions];
                                next.splice(i, 1);
                                setHealthForm({ ...healthForm, conditions: next });
                              }} />
                            </span>
                          ))}
                        </div>
                        <Input id="new-condition" placeholder="Add condition..." className="rounded-xl" onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value;
                            if (val) {
                              setHealthForm({ ...healthForm!, conditions: [...healthForm!.conditions, val] });
                              (e.target as HTMLInputElement).value = "";
                            }
                          }
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-gray-600">Allergies</Label>
                        <div className="flex flex-wrap gap-2">
                          {healthForm?.allergies.map((a, i) => (
                            <span key={i} className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium border border-red-100">
                              {a}
                              <X className="w-3 h-3 cursor-pointer hover:text-red-800" onClick={() => {
                                const next = [...healthForm.allergies];
                                next.splice(i, 1);
                                setHealthForm({ ...healthForm, allergies: next });
                              }} />
                            </span>
                          ))}
                        </div>
                        <Input id="new-allergy" placeholder="Add allergy..." className="rounded-xl" onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value;
                            if (val) {
                              setHealthForm({ ...healthForm!, allergies: [...healthForm!.allergies, val] });
                              (e.target as HTMLInputElement).value = "";
                            }
                          }
                        }} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="font-bold text-gray-600">Current Medications</Label>
                        <div className="flex flex-wrap gap-2">
                          {healthForm?.medications.map((m, i) => (
                            <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
                              {m}
                              <X className="w-3 h-3 cursor-pointer" onClick={() => {
                                const next = [...healthForm.medications];
                                next.splice(i, 1);
                                setHealthForm({ ...healthForm, medications: next });
                              }} />
                            </span>
                          ))}
                        </div>
                        <Input id="new-med" placeholder="Add medication..." className="rounded-xl" onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value;
                            if (val) {
                              setHealthForm({ ...healthForm!, medications: [...healthForm!.medications, val] });
                              (e.target as HTMLInputElement).value = "";
                            }
                          }
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-gray-600">Blood Type</Label>
                        <select 
                          className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                          value={healthForm?.bloodType || ""}
                          onChange={(e) => setHealthForm({...healthForm!, bloodType: e.target.value})}
                        >
                          <option value="">Select Blood Type</option>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(v => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-full pt-4 border-t">
                      <p className="font-bold text-gray-800 mb-4">Emergency Contact</p>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input value={healthForm?.emergencyContact.name || ""} onChange={(e) => setHealthForm({...healthForm!, emergencyContact: {...healthForm!.emergencyContact, name: e.target.value}})} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label>Relationship</Label>
                          <Input value={healthForm?.emergencyContact.relationship || ""} onChange={(e) => setHealthForm({...healthForm!, emergencyContact: {...healthForm!.emergencyContact, relationship: e.target.value}})} className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input value={healthForm?.emergencyContact.phone || ""} onChange={(e) => setHealthForm({...healthForm!, emergencyContact: {...healthForm!.emergencyContact, phone: e.target.value}})} className="rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button variant="ghost" onClick={() => setIsEditingHealth(false)} className="rounded-xl">Cancel</Button>
                    <Button onClick={handleUpdateHealth} style={{ backgroundColor: '#0F766E' }} className="text-white rounded-xl px-10">Record Updates</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-3">
                <p className="text-[10px] tracking-widest uppercase font-bold text-gray-400">Medical History</p>
                <div className="flex flex-wrap gap-2">
                  {user.healthProfile.conditions.length > 0 ? user.healthProfile.conditions.map((c, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#F0FDFA] text-[#0F766E] rounded-xl text-sm font-semibold border border-teal-100">
                      {c}
                    </span>
                  )) : <p className="text-sm text-gray-400 italic">No conditions recorded</p>}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] tracking-widest uppercase font-bold text-gray-400">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {user.healthProfile.allergies.length > 0 ? user.healthProfile.allergies.map((a, i) => (
                    <span key={i} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100">
                      {a}
                    </span>
                  )) : <p className="text-sm text-gray-400 italic">No allergies recorded</p>}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] tracking-widest uppercase font-bold text-gray-400">Medications</p>
                <div className="flex flex-col gap-2">
                  {user.healthProfile.medications.length > 0 ? user.healthProfile.medications.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {m}
                    </div>
                  )) : <p className="text-sm text-gray-400 italic">No medications recorded</p>}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] tracking-widest uppercase font-bold text-gray-400">Biological Markers</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-bold text-[#0F766E]">{user.healthProfile.bloodType || "N/A"}</span>
                   <span className="text-sm font-bold text-gray-400 uppercase">Blood Group</span>
                </div>
              </div>
            </div>
            <div className="mt-10 p-5 rounded-2xl bg-teal-50/50 border border-teal-100/50">
              <p className="text-[10px] tracking-widest uppercase font-bold text-[#0F766E] mb-4 flex items-center gap-2">
                <Shield className="w-3 h-3" />
                Emergency Response
              </p>
              {user.healthProfile.emergencyContact.name ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{user.healthProfile.emergencyContact.name}</p>
                    <p className="text-sm text-teal-700">{user.healthProfile.emergencyContact.relationship}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-mono font-bold text-[#0F766E]">{user.healthProfile.emergencyContact.phone}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Primary Contact</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Please add an emergency contact for your safety.</p>
              )}
            </div>
          </Card>
          <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-teal-900/5 bg-white">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#0F766E]">Recent Activity</h2>
              <Button variant="ghost" className="text-[#0F766E] font-bold">View History</Button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="group flex items-center justify-between p-5 rounded-3xl hover:bg-[#F0FDFA] transition-all border border-gray-100/50 cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#0F766E] transition-colors">
                      <Clock className="w-6 h-6 text-[#0F766E] group-hover:text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-bold text-gray-800">{order.id}</p>
                        <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium">{order.date} • {order.items.join(", ")}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#0F766E]">${order.total.toFixed(2)}</p>
                    <ExternalLink className="w-4 h-4 ml-auto text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
