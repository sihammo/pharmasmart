import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, CreditCard, LogOut } from "lucide-react";
import { Switch } from "../components/ui/switch";

export function ProfilePage() {
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
              <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl" style={{ color: '#0F766E' }}>John Doe</h3>
                <p className="text-gray-600">john.doe@example.com</p>
              </div>
              <Separator />
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Member since March 2026</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>New York, USA</span>
                </div>
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

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="John"
                    className="h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    className="h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="pl-10 h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
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
                    defaultValue="+1 (555) 123-4567"
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
                    defaultValue="123 Main Street, New York, NY 10001"
                    className="pl-10 h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
                  />
                </div>
              </div>

              <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg">
                Save Changes
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

            <div className="space-y-4">
              <Card className="p-4 rounded-xl" style={{ backgroundColor: '#B7D1CC' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded flex items-center justify-center bg-white">
                      💳
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Visa ending in 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/2027</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-white" style={{ color: '#0F766E' }}>
                    Default
                  </span>
                </div>
              </Card>

              <Button 
                variant="outline"
                className="w-full border-2 border-dashed rounded-lg"
                style={{ borderColor: '#0F766E', color: '#0F766E' }}
              >
                + Add Payment Method
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
