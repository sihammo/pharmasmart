import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Package, Heart, Shield, Edit } from "lucide-react";

const userInfo = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street, Apt 4B, New York, NY 10001",
  memberSince: "March 2026",
  totalOrders: 12,
  totalSpent: "$1,245.80",
  savedPharmacies: 3,
  activeSubscriptions: 2
};

const recentOrders = [
  { id: "ORD-2026-001", date: "March 15, 2026", status: "Delivered", total: 67.48, items: ["Paracetamol 500mg", "Vitamin D3"] },
  { id: "ORD-2026-002", date: "March 10, 2026", status: "Delivered", total: 89.99, items: ["Diabetes Care Pack"] },
  { id: "ORD-2026-003", date: "March 5, 2026", status: "Delivered", total: 145.50, items: ["Amoxicillin 250mg", "Ibuprofen 400mg", "Omega-3"] },
];

const subscriptions = [
  { name: "Diabetes Care Pack", nextDelivery: "March 25, 2026", price: "$89.99/month", status: "Active" },
  { name: "Blood Pressure Pack", nextDelivery: "March 28, 2026", price: "$54.99/month", status: "Active" },
];

const savedPharmacies = [
  { name: "HealthPlus Pharmacy", distance: "0.5 km", rating: 4.8 },
  { name: "MediCare Central", distance: "1.2 km", rating: 4.6 },
  { name: "Quick Meds Pharmacy", distance: "2.1 km", rating: 4.9 },
];

const healthProfile = {
  conditions: ["Type 2 Diabetes", "Hypertension"],
  allergies: ["Penicillin"],
  medications: ["Metformin 500mg", "Amlodipine 5mg"],
  bloodType: "A+",
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543"
  }
};

export function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2" style={{ color: '#0F766E' }}>My Account</h1>
        <p className="text-xl text-gray-600">Manage your personal information and health profile</p>
      </div>

      {/* Profile Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-8 rounded-2xl lg:col-span-1">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl mb-1" style={{ color: '#0F766E' }}>{userInfo.name}</h2>
              <p className="text-gray-600">Premium Member</p>
            </div>
            <Separator />
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{userInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{userInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{userInfo.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Member since {userInfo.memberSince}</span>
              </div>
            </div>
            <Button 
              className="w-full bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Stats and Quick Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#5FA79A' }}>
                  <Package className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-600">Total Orders</p>
              </div>
              <p className="text-3xl" style={{ color: '#0F766E' }}>{userInfo.totalOrders}</p>
            </Card>

            <Card className="p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2F8F7E' }}>
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-600">Total Spent</p>
              </div>
              <p className="text-3xl" style={{ color: '#0F766E' }}>{userInfo.totalSpent}</p>
            </Card>

            <Card className="p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-600">Saved Pharmacies</p>
              </div>
              <p className="text-3xl" style={{ color: '#0F766E' }}>{userInfo.savedPharmacies}</p>
            </Card>

            <Card className="p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#5FA79A' }}>
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-600">Active Subscriptions</p>
              </div>
              <p className="text-3xl" style={{ color: '#0F766E' }}>{userInfo.activeSubscriptions}</p>
            </Card>
          </div>

          {/* Health Profile */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl" style={{ color: '#0F766E' }}>Health Profile</h2>
              </div>
              <Button variant="outline" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Medical Conditions</p>
                <div className="space-y-1">
                  {healthProfile.conditions.map((condition, i) => (
                    <p key={i} className="px-3 py-1 rounded-lg inline-block mr-2" style={{ backgroundColor: '#B7D1CC', color: '#0F766E' }}>
                      {condition}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Allergies</p>
                <div className="space-y-1">
                  {healthProfile.allergies.map((allergy, i) => (
                    <p key={i} className="px-3 py-1 bg-red-100 text-red-800 rounded-lg inline-block mr-2">
                      {allergy}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Current Medications</p>
                <ul className="space-y-1">
                  {healthProfile.medications.map((med, i) => (
                    <li key={i} className="text-gray-700">• {med}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Blood Type</p>
                <p className="text-2xl" style={{ color: '#0F766E' }}>{healthProfile.bloodType}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <p className="text-sm text-gray-500 mb-3">Emergency Contact</p>
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#B7D1CC' }}>
                <Shield className="w-6 h-6" style={{ color: '#0F766E' }} />
                <div>
                  <p style={{ color: '#0F766E' }}>{healthProfile.emergencyContact.name}</p>
                  <p className="text-sm text-gray-600">{healthProfile.emergencyContact.relationship} • {healthProfile.emergencyContact.phone}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Orders */}
      <Card className="p-8 rounded-2xl">
        <h2 className="text-2xl mb-6" style={{ color: '#0F766E' }}>Recent Orders</h2>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <p style={{ color: '#0F766E' }}>{order.id}</p>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{order.date}</p>
                <p className="text-sm text-gray-500">{order.items.join(", ")}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl mb-2" style={{ color: '#0F766E' }}>${order.total.toFixed(2)}</p>
                <Button variant="outline" size="sm" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Subscriptions */}
      <Card className="p-8 rounded-2xl">
        <h2 className="text-2xl mb-6" style={{ color: '#0F766E' }}>Active Subscriptions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {subscriptions.map((sub, i) => (
            <div key={i} className="p-6 rounded-xl border-2" style={{ borderColor: '#5FA79A', backgroundColor: '#B7D1CC' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-1" style={{ color: '#0F766E' }}>{sub.name}</h3>
                  <p className="text-sm text-gray-600">Next delivery: {sub.nextDelivery}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {sub.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl" style={{ color: '#0F766E' }}>{sub.price}</p>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" className="border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Saved Pharmacies */}
      <Card className="p-8 rounded-2xl">
        <h2 className="text-2xl mb-6" style={{ color: '#0F766E' }}>Saved Pharmacies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {savedPharmacies.map((pharmacy, i) => (
            <div key={i} className="p-6 rounded-xl border-2 hover:shadow-lg transition-shadow" style={{ borderColor: '#B7D1CC' }}>
              <h3 className="text-lg mb-2" style={{ color: '#0F766E' }}>{pharmacy.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{pharmacy.distance} away</p>
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j}>{j < Math.floor(pharmacy.rating) ? '★' : '☆'}</span>
                ))}
                <span className="text-gray-600 text-sm ml-1">({pharmacy.rating})</span>
              </div>
              <Button variant="outline" size="sm" className="w-full border-2 rounded-lg" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
                View Pharmacy
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
