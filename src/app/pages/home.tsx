import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MapPin, Clock, Phone, Heart, Package, Navigation } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const nearbyPharmacies = [
  {
    id: 1,
    name: "HealthPlus Pharmacy",
    distance: "0.5 km",
    status: "Open",
    closingTime: "Closes at 10:00 PM",
    phone: "+1 (555) 123-4567",
    image: "https://images.unsplash.com/photo-1771315763139-629702d6c49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN0b3JlZnJvbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzM3ODAxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "MediCare Central",
    distance: "1.2 km",
    status: "Open",
    closingTime: "Closes at 11:00 PM",
    phone: "+1 (555) 234-5678",
    image: "https://images.unsplash.com/photo-1666886573452-9dc8ce8f5cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzM2OTMyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Quick Meds Pharmacy",
    distance: "2.1 km",
    status: "Open 24/7",
    closingTime: "Open 24 hours",
    phone: "+1 (555) 345-6789",
    image: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwaGFybWFjeSUyMG1lZGljaW5lc3xlbnwxfHx8fDE3NzM3ODAwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
];

const healthPacks = [
  {
    id: 1,
    name: "Diabetes Care Pack",
    description: "Complete monthly supply for diabetes management including glucose monitor strips and medication",
    price: "$89.99",
    items: "12 items",
    image: "https://images.unsplash.com/photo-1763142842671-573188baaabd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFiZXRlcyUyMGhlYWx0aCUyMGNhcmV8ZW58MXx8fHwxNzczNzgwMTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Asthma Relief Pack",
    description: "Essential asthma management supplies with inhalers and preventive medication",
    price: "$64.99",
    items: "8 items",
    image: "https://images.unsplash.com/photo-1733152121054-8c3d7a8d7b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3RobWElMjBpbmhhbGVyJTIwbWVkaWNhdGlvbnxlbnwxfHx8fDE3NzM3ODAxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Blood Pressure Pack",
    description: "Monitor and manage your blood pressure with this comprehensive care package",
    price: "$54.99",
    items: "10 items",
    image: "https://images.unsplash.com/photo-1621525466547-4ac135e85f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwaGVhbHRofGVufDF8fHx8MTc3Mzc4MDE0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
];

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #2F8F7E 100%)' }}>
        <h1 className="text-4xl text-white mb-2">Welcome to MediCare+</h1>
        <p className="text-xl text-white/90">Your health, our priority. Find medicines and pharmacies near you.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/dashboard/pharmacies" className="block">
          <Card className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#5FA79A] rounded-2xl">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#5FA79A' }}>
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl mb-2" style={{ color: '#0F766E' }}>Find Pharmacies</h3>
            <p className="text-gray-600 text-lg">Locate nearby pharmacies with real-time availability</p>
          </Card>
        </Link>

        <Link to="/dashboard/medicines" className="block">
          <Card className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#5FA79A] rounded-2xl">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#2F8F7E' }}>
              <Package className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl mb-2" style={{ color: '#0F766E' }}>Search Medicines</h3>
            <p className="text-gray-600 text-lg">Find and compare medicine prices instantly</p>
          </Card>
        </Link>

        <Link to="/dashboard/health-packs" className="block">
          <Card className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#5FA79A] rounded-2xl">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#0F766E' }}>
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl mb-2" style={{ color: '#0F766E' }}>Health Packs</h3>
            <p className="text-gray-600 text-lg">Specialized packs for chronic conditions</p>
          </Card>
        </Link>
      </div>

      {/* Nearby Pharmacies */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl" style={{ color: '#0F766E' }}>Nearby Pharmacies</h2>
          <Link to="/dashboard/pharmacies">
            <Button variant="ghost" style={{ color: '#0F766E' }}>
              View All
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {nearbyPharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="overflow-hidden hover:shadow-xl transition-shadow rounded-2xl">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src={pharmacy.image}
                  alt={pharmacy.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#0F766E' }}>{pharmacy.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Navigation className="w-4 h-4" />
                    <span className="text-lg">{pharmacy.distance} away</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    pharmacy.status === "Open 24/7" 
                      ? "bg-[#0F766E] text-white" 
                      : "bg-green-100 text-green-800"
                  }`}>
                    {pharmacy.status}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{pharmacy.closingTime}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-2 rounded-lg"
                    style={{ borderColor: '#0F766E', color: '#0F766E' }}
                  >
                    <Phone className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Health Packs */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl" style={{ color: '#0F766E' }}>Popular Health Packs</h2>
          <Link to="/dashboard/health-packs">
            <Button variant="ghost" style={{ color: '#0F766E' }}>
              View All
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {healthPacks.map((pack) => (
            <Card key={pack.id} className="overflow-hidden hover:shadow-xl transition-shadow rounded-2xl">
              <div className="h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, #5FA79A 0%, #8FB9B0 100%)' }}>
                <ImageWithFallback
                  src={pack.image}
                  alt={pack.name}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl" style={{ color: '#0F766E' }}>{pack.name}</h3>
                    <span className="text-2xl" style={{ color: '#0F766E' }}>{pack.price}</span>
                  </div>
                  <p className="text-gray-600">{pack.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{pack.items}</span>
                  <Button 
                    className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg"
                  >
                    Add to Cart
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
