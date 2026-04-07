import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, CreditCard, LogOut, Heart, Plus, Trash2, Activity, Pill } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { apiClient } from "../api/client";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    createdAt: "",
    healthProfile: {
      conditions: [] as string[],
      allergies: [] as string[],
      medications: [] as string[],
      bloodType: "",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: ""
      }
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiClient("/auth/profile");
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          createdAt: data.createdAt || "",
          healthProfile: data.healthProfile || {
            conditions: [],
            allergies: [],
            medications: [],
            bloodType: "",
            emergencyContact: { name: "", relationship: "", phone: "" }
          }
        });
      } catch (error: any) {
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const data = await apiClient("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(profile),
      });
      // Update local storage to reflect everywhere
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...localUser, name: data.name, email: data.email }));

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const memberSince = profile.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    : "Recently";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F766E]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2" style={{ color: '#0F766E' }}>Profile Settings</h1>
        <p className="text-xl text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <Card className="p-6 rounded-2xl sticky top-24">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center font-bold text-3xl text-white" style={{ backgroundColor: '#0F766E' }}>
                {profile.name.charAt(0).toUpperCase() || <User className="w-12 h-12 text-white" />}
              </div>
              <div>
                <h3 className="text-2xl" style={{ color: '#0F766E' }}>{profile.name || "User"}</h3>
                <p className="text-gray-600">{profile.email}</p>
              </div>
              <Separator />
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {memberSince}</span>
                </div>
                {profile.address && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{profile.address}</span>
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full border-2 rounded-lg"
                style={{ borderColor: '#0F766E', color: '#0F766E' }}
              >
                Change Photo
              </Button>
            </div>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#5FA79A' }}>
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl" style={{ color: '#0F766E' }}>Personal Information</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="pl-10 h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="pl-10 h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    placeholder="123 Main Street, City, Country"
                    className="pl-10 h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
                  />
                </div>
              </div>

              <Button type="submit" disabled={isSaving} className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg px-8 h-12">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Card>

          {/* Health Profile */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl" style={{ color: '#0F766E' }}>Health Profile</h2>
            </div>

            <div className="space-y-8">
              {/* Blood Type */}
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Input
                  id="bloodType"
                  value={profile.healthProfile.bloodType}
                  onChange={(e) => setProfile({
                    ...profile,
                    healthProfile: { ...profile.healthProfile, bloodType: e.target.value }
                  })}
                  placeholder="e.g. A+"
                  className="h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
                />
              </div>

              {/* Lists Section */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Conditions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-red-500" />
                      Conditions
                    </Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-[#0F766E]"
                      onClick={() => {
                        const val = prompt("Enter medical condition:");
                        if (val) setProfile({
                          ...profile,
                          healthProfile: { ...profile.healthProfile, conditions: [...profile.healthProfile.conditions, val] }
                        });
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {profile.healthProfile.conditions.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group text-sm">
                        <span>{item}</span>
                        <Trash2 
                          className="w-3 h-3 text-red-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                          onClick={() => {
                            const newList = [...profile.healthProfile.conditions];
                            newList.splice(idx, 1);
                            setProfile({ ...profile, healthProfile: { ...profile.healthProfile, conditions: newList } });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      Allergies
                    </Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-[#0F766E]"
                      onClick={() => {
                        const val = prompt("Enter allergy:");
                        if (val) setProfile({
                          ...profile,
                          healthProfile: { ...profile.healthProfile, allergies: [...profile.healthProfile.allergies, val] }
                        });
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {profile.healthProfile.allergies.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group text-sm">
                        <span>{item}</span>
                        <Trash2 
                          className="w-3 h-3 text-red-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                          onClick={() => {
                            const newList = [...profile.healthProfile.allergies];
                            newList.splice(idx, 1);
                            setProfile({ ...profile, healthProfile: { ...profile.healthProfile, allergies: newList } });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medications */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-green-500" />
                      Medications
                    </Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-[#0F766E]"
                      onClick={() => {
                        const val = prompt("Enter medication:");
                        if (val) setProfile({
                          ...profile,
                          healthProfile: { ...profile.healthProfile, medications: [...profile.healthProfile.medications, val] }
                        });
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {profile.healthProfile.medications.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group text-sm">
                        <span>{item}</span>
                        <Trash2 
                          className="w-3 h-3 text-red-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                          onClick={() => {
                            const newList = [...profile.healthProfile.medications];
                            newList.splice(idx, 1);
                            setProfile({ ...profile, healthProfile: { ...profile.healthProfile, medications: newList } });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-6 pt-4 border-t">
                <h4 className="text-lg font-bold text-gray-800">Emergency Contact</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Contact Name</Label>
                    <Input
                      value={profile.healthProfile.emergencyContact.name}
                      onChange={(e) => setProfile({
                        ...profile,
                        healthProfile: {
                          ...profile.healthProfile,
                          emergencyContact: { ...profile.healthProfile.emergencyContact, name: e.target.value }
                        }
                      })}
                      className="border-2 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Input
                      value={profile.healthProfile.emergencyContact.relationship}
                      onChange={(e) => setProfile({
                        ...profile,
                        healthProfile: {
                          ...profile.healthProfile,
                          emergencyContact: { ...profile.healthProfile.emergencyContact, relationship: e.target.value }
                        }
                      })}
                      className="border-2 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={profile.healthProfile.emergencyContact.phone}
                      onChange={(e) => setProfile({
                        ...profile,
                        healthProfile: {
                          ...profile.healthProfile,
                          emergencyContact: { ...profile.healthProfile.emergencyContact, phone: e.target.value }
                        }
                      })}
                      className="border-2 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleUpdateProfile} 
                className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg px-8 h-12 w-full mt-4"
                disabled={isSaving}
              >
                {isSaving ? "Saving Health Profile..." : "Update Health Profile"}
              </Button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2F8F7E' }}>
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl" style={{ color: '#0F766E' }}>Notification Preferences</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-lg">Order Updates</Label>
                  <p className="text-sm text-gray-600">Receive notifications about your orders</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-lg">Health Pack Reminders</Label>
                  <p className="text-sm text-gray-600">Get reminded when it's time to reorder</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-lg">Promotional Emails</Label>
                  <p className="text-sm text-gray-600">Special offers and discounts</p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-lg">SMS Notifications</Label>
                  <p className="text-sm text-gray-600">Text messages for urgent updates</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Payment Methods */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl" style={{ color: '#0F766E' }}>Payment Methods</h2>
            </div>
            <div className="text-center py-12 border-2 border-dashed border-[#B7D1CC] rounded-2xl bg-gray-50/50">
              <div className="w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center mb-4 shadow-sm">
                <CreditCard className="w-8 h-8 text-[#B7D1CC]" />
              </div>
              <p className="text-gray-500 font-medium">No payment methods added yet</p>
              <Button 
                variant="ghost"
                className="mt-4 text-[#0F766E] font-bold hover:bg-teal-50"
              >
                + Add New Card
              </Button>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#5FA79A' }}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl" style={{ color: '#0F766E' }}>Security</h2>
            </div>

            <div className="space-y-4">
              <Button 
                variant="outline"
                className="w-full border-2 rounded-lg"
                style={{ borderColor: '#0F766E', color: '#0F766E' }}
              >
                Change Password
              </Button>

              <Button 
                variant="outline"
                className="w-full border-2 rounded-lg"
                style={{ borderColor: '#0F766E', color: '#0F766E' }}
              >
                Enable Two-Factor Authentication
              </Button>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-8 rounded-2xl border-2 border-red-200">
            <h2 className="text-2xl mb-6 text-red-600">Danger Zone</h2>
            <div className="space-y-4">
              <Button 
                variant="outline"
                className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-lg"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Log Out
              </Button>

              <Button 
                variant="outline"
                className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
