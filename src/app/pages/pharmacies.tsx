import { useState, useEffect } from "react";
import { apiClient } from "../api/client";
import { toast } from "sonner";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MapPin, Navigation, Phone, Clock, Search, Map } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const data = await apiClient("/pharmacies");
        setPharmacies(data);
      } catch (error: any) {
        toast.error("Failed to load pharmacies");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

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
