import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Filter, ShoppingCart, Pill } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    manufacturer: "PharmaCorp",
    price: 8.99,
    stock: "In Stock",
    description: "Effective pain and fever relief",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NzM3NjI4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    manufacturer: "MediHealth",
    price: 15.99,
    stock: "In Stock",
    description: "Broad-spectrum antibiotic",
    image: "https://images.unsplash.com/photo-1631669969504-f35518bf96ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBtZWRpY2F0aW9uJTIwYm90dGxlfGVufDF8fHx8MTc3Mzc2MTU2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7
  },
  {
    id: 3,
    name: "Vitamin D3 1000 IU",
    category: "Vitamins",
    manufacturer: "HealthPlus",
    price: 12.50,
    stock: "In Stock",
    description: "Essential vitamin supplement",
    image: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBjYXBzdWxlc3xlbnwxfHx8fDE3NzM3ODAyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.3
  },
  {
    id: 4,
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    manufacturer: "CarePharm",
    price: 10.99,
    stock: "In Stock",
    description: "Anti-inflammatory pain reliever",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NzM3NjI4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6
  },
  {
    id: 5,
    name: "Cetirizine 10mg",
    category: "Allergy",
    manufacturer: "AllerCare",
    price: 9.99,
    stock: "Low Stock",
    description: "Allergy and hay fever relief",
    image: "https://images.unsplash.com/photo-1631669969504-f35518bf96ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBtZWRpY2F0aW9uJTIwYm90dGxlfGVufDF8fHx8MTc3Mzc2MTU2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.4
  },
  {
    id: 6,
    name: "Omega-3 Fish Oil",
    category: "Vitamins",
    manufacturer: "WellnessLab",
    price: 18.99,
    stock: "In Stock",
    description: "Heart and brain health support",
    image: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBjYXBzdWxlc3xlbnwxfHx8fDE3NzM3ODAyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8
  },
];

const categories = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Allergy"];

export function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || medicine.category === selectedCategory;
    const matchesPrice = medicine.price >= priceRange[0] && medicine.price <= priceRange[1];
    const matchesStock = !inStockOnly || medicine.stock === "In Stock";
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2" style={{ color: '#0F766E' }}>Search Medicines</h1>
        <p className="text-xl text-gray-600">Find and compare thousands of medicines</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg border-2 focus:border-[#0F766E] rounded-lg"
          />
        </div>
        <Button
          variant="outline"
          className="border-2 rounded-lg"
          style={{ borderColor: '#0F766E', color: '#0F766E' }}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-5 h-5 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category 
              ? "bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg whitespace-nowrap" 
              : "border-2 rounded-lg whitespace-nowrap"
            }
            style={selectedCategory !== category ? { borderColor: '#5FA79A', color: '#0F766E' } : {}}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="p-6 rounded-2xl" style={{ backgroundColor: '#B7D1CC' }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-lg mb-4 block" style={{ color: '#0F766E' }}>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  min={0}
                  max={50}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="inStock"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                  className="w-5 h-5"
                />
                <Label htmlFor="inStock" className="text-lg cursor-pointer" style={{ color: '#0F766E' }}>
                  In Stock Only
                </Label>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      <div>
        <p className="text-gray-600 mb-4 text-lg">
          Showing {filteredMedicines.length} result{filteredMedicines.length !== 1 ? 's' : ''}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.length === 0 ? (
            <Card className="col-span-full p-12 text-center rounded-2xl">
              <Pill className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl mb-2 text-gray-600">No medicines found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </Card>
          ) : (
            filteredMedicines.map((medicine) => (
              <Card key={medicine.id} className="overflow-hidden hover:shadow-xl transition-shadow rounded-2xl">
                <div className="h-48 overflow-hidden" style={{ backgroundColor: '#B7D1CC' }}>
                  <ImageWithFallback
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl flex-1" style={{ color: '#0F766E' }}>{medicine.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        medicine.stock === "In Stock" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {medicine.stock}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">{medicine.description}</p>
                    <p className="text-sm text-gray-500">{medicine.manufacturer}</p>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(medicine.rating) ? '★' : '☆'}
                      </span>
                    ))}
                    <span className="text-gray-600 ml-2 text-sm">({medicine.rating})</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-3xl" style={{ color: '#0F766E' }}>
                      ${medicine.price.toFixed(2)}
                    </span>
                    <Button 
                      className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg"
                      disabled={medicine.stock !== "In Stock"}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
