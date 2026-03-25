import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MapPin, Navigation, Phone, Clock, Search, Map } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const pharmacies = [
  {
    id: 1,
    name: "HealthPlus Pharmacy",
    address: "123 Main Street, Downtown",
    distance: "0.5 km",
    status: "Open",
    closingTime: "Closes at 10:00 PM",
    phone: "+1 (555) 123-4567",
    lat: 40.7128,
    lng: -74.0060,
    image: "https://images.unsplash.com/photo-1771315763139-629702d6c49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN0b3JlZnJvbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzM3ODAxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "MediCare Central",
    address: "456 Oak Avenue, Midtown",
    distance: "1.2 km",
    status: "Open",
    closingTime: "Closes at 11:00 PM",
    phone: "+1 (555) 234-5678",
    lat: 40.7580,
    lng: -73.9855,
    image: "https://images.unsplash.com/photo-1666886573452-9dc8ce8f5cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzM2OTMyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Quick Meds Pharmacy",
    address: "789 Elm Street, Westside",
    distance: "2.1 km",
    status: "Open 24/7",
    closingTime: "Open 24 hours",
    phone: "+1 (555) 345-6789",
    lat: 40.7489,
    lng: -73.9680,
    image: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwaGFybWFjeSUyMG1lZGljaW5lc3xlbnwxfHx8fDE3NzM3ODAwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    name: "City Health Pharmacy",
    address: "321 Park Lane, Eastside",
    distance: "3.5 km",
    status: "Open",
    closingTime: "Closes at 9:00 PM",
    phone: "+1 (555) 456-7890",
    lat: 40.7614,
    lng: -73.9776,
    image: "https://images.unsplash.com/photo-1635367216109-aa3353c0c22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMGNhcmV8ZW58MXx8fHwxNzczNzgwMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 5,
    name: "Wellness Express",
    address: "654 Broadway, Uptown",
    distance: "4.2 km",
    status: "Open",
    closingTime: "Closes at 8:00 PM",
    phone: "+1 (555) 567-8901",
    lat: 40.7831,
    lng: -73.9712,
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2F0aW9uJTIwcGlsbHMlMjBwcmVzY3JpcHRpb258ZW58MXx8fHwxNzczNzgwMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 6,
    name: "Care Pharmacy Plus",
    address: "987 Fifth Avenue, Central",
    distance: "5.0 km",
    status: "Closed",
    closingTime: "Opens tomorrow at 8:00 AM",
    phone: "+1 (555) 678-9012",
    lat: 40.7505,
    lng: -73.9934,
    image: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwaGFybWFjeSUyMG1lZGljaW5lc3xlbnwxfHx8fDE3NzM3ODAwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
];

export function PharmaciesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2" style={{ color: '#0F766E' }}>Nearby Pharmacies</h1>
        <p className="text-xl text-gray-600">Find pharmacies near you with real-time availability</p>
      </div>

      {/* Search and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
          />
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-[#0F766E] hover:bg-[#0d6560] text-white" : ""}
          >
            List View
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "ghost"}
            onClick={() => setViewMode("map")}
            className={viewMode === "map" ? "bg-[#0F766E] hover:bg-[#0d6560] text-white" : ""}
          >
            <Map className="w-5 h-5 mr-2" />
            Map View
          </Button>
        </div>
      </div>

      {/* Map View */}
      {viewMode === "map" && (
        <Card className="p-8 rounded-2xl">
          <div className="relative h-[500px] rounded-xl overflow-hidden" style={{ backgroundColor: '#B7D1CC' }}>
            {/* Mock Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl mb-2" style={{ color: '#0F766E' }}>Interactive Map View</h3>
                  <p className="text-gray-600 text-lg">
                    Map integration would show pharmacy locations with teal-colored pins
                  </p>
                </div>
              </div>
            </div>

            {/* Mock Pharmacy Pins */}
            {filteredPharmacies.slice(0, 3).map((pharmacy, index) => (
              <div
                key={pharmacy.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${30 + index * 20}%`,
                  top: `${40 + index * 15}%`,
                }}
                onClick={() => setSelectedPharmacy(pharmacy.id)}
              >
                <div className="relative">
                  <MapPin className="w-10 h-10" style={{ color: '#0F766E', fill: '#0F766E' }} />
                  {selectedPharmacy === pharmacy.id && (
                    <Card className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-4 w-64 shadow-xl rounded-xl">
                      <h4 style={{ color: '#0F766E' }}>{pharmacy.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{pharmacy.address}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-[#0F766E] hover:bg-[#0d6560] text-white">
                          Directions
                        </Button>
                        <Button size="sm" variant="outline" style={{ borderColor: '#0F766E', color: '#0F766E' }}>
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.length === 0 ? (
            <Card className="col-span-full p-12 text-center rounded-2xl">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl mb-2 text-gray-600">No pharmacies found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </Card>
          ) : (
            filteredPharmacies.map((pharmacy) => (
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
                    <p className="text-gray-600 mb-2">{pharmacy.address}</p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Navigation className="w-4 h-4" />
                      <span className="text-lg">{pharmacy.distance} away</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      pharmacy.status === "Closed"
                        ? "bg-red-100 text-red-800"
                        : pharmacy.status === "Open 24/7" 
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
                      disabled={pharmacy.status === "Closed"}
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
            ))
          )}
        </div>
      )}
    </div>
  );
}
