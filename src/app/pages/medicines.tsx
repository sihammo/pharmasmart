import { useState, useEffect } from "react";
import { apiClient } from "../api/client";
import { toast } from "sonner";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, Filter, ShoppingCart, Pill, ChevronRight, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { useCart } from "../context/CartContext";

const categories = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Allergy"];

export function MedicinesPage() {
  const { addToCart } = useCart();
  const [medicines, setMedicines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await apiClient("/medicines");
        setMedicines(data);
      } catch (error: any) {
        toast.error("Failed to load medicines");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || medicine.category === selectedCategory;
    const matchesPrice = medicine.price >= priceRange[0] && medicine.price <= priceRange[1];
    const matchesStock = !inStockOnly || medicine.stockQuantity > 0;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#0F766E' }}>Search Medicines</h1>
        <p className="text-xl text-gray-600">Find and compare thousands of medicines</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
           <Input
              type="search"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 focus:border-[#0F766E] rounded-2xl shadow-sm"
           />
        </div>
        <Button
           variant="outline"
           className="h-14 px-8 border-2 rounded-2xl font-bold"
           style={{ borderColor: '#0F766E', color: '#0F766E' }}
           onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-5 h-5 mr-2" />
          {showFilters ? 'Hide Filters' : 'Filters'}
        </Button>
      </div>

      {showFilters && (
        <Card className="p-8 rounded-2xl border-2 border-teal-50" style={{ backgroundColor: '#B7D1CC/10' }}>
           <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <Label className="text-xl font-bold" style={{ color: '#0F766E' }}>Categories</Label>
                 <div className="flex flex-wrap gap-3">
                   {categories.map((c) => (
                     <Button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`rounded-xl px-6 h-11 font-medium transition-all ${
                          selectedCategory === c ? "bg-[#0F766E] text-white shadow-lg" : "bg-white text-teal-800 border-2 border-teal-100 hover:border-teal-400"
                        }`}
                     >
                       {c}
                     </Button>
                   ))}
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="flex justify-between items-center">
                    <Label className="text-xl font-bold" style={{ color: '#0F766E' }}>Max Price: ${priceRange[1]}</Label>
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        id="stock" 
                        checked={inStockOnly} 
                        onCheckedChange={(checked) => setInStockOnly(!!checked)} 
                        className="w-5 h-5" 
                      />
                      <label htmlFor="stock" className="font-medium text-teal-800 cursor-pointer">In Stock Only</label>
                    </div>
                 </div>
                 <Slider
                    min={0}
                    max={500}
                    step={1}
                    value={[priceRange[1]]}
                    onValueChange={(v) => setPriceRange([0, v[0]])}
                    className="w-full h-2"
                 />
              </div>
           </div>
        </Card>
      )}

      {/* Results */}
      <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="h-[450px] rounded-3xl animate-pulse bg-teal-50/50 border-2 border-teal-50" />
            ))
          ) : filteredMedicines.length === 0 ? (
            <Card className="col-span-full p-24 text-center rounded-3xl border-2 border-dashed border-teal-100 bg-teal-50/30">
               <Pill className="w-20 h-20 mx-auto mb-6 text-teal-200" />
               <h3 className="text-3xl font-bold text-teal-800 mb-2">No results found</h3>
               <p className="text-xl text-teal-600/60 max-w-md mx-auto">Try widening your price range or exploring different categories.</p>
            </Card>
          ) : (
            filteredMedicines.map((medicine) => (
              <Card key={medicine._id} className="group relative overflow-hidden rounded-3xl border-2 border-teal-50 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 bg-white">
                 <div className="h-56 overflow-hidden relative">
                    <ImageWithFallback 
                      src={medicine.imageUrl} 
                      alt={medicine.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${
                        medicine.stockQuantity > 0 ? "bg-white/90 text-teal-800" : "bg-red-500/90 text-white"
                      }`}>
                        {medicine.stockQuantity > 0 ? `${medicine.stockQuantity} In Stock` : "Out of Stock"}
                      </span>
                      {medicine.requiresPrescription && (
                        <span className="bg-orange-500/90 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md">
                          R𝗑 Only
                        </span>
                      )}
                    </div>
                 </div>
                 <div className="p-8 space-y-6">
                    <div>
                       <h3 className="text-2xl font-bold mb-2 group-hover:text-teal-600 transition-colors" style={{ color: '#0F766E' }}>{medicine.name}</h3>
                       <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed">{medicine.description || "No description available for this medicine."}</p>
                    </div>

                    <div className="flex items-center gap-1.5 py-1">
                       {[1,2,3,4,5].map(i => (
                         <Star key={i} className={`w-4 h-4 ${i <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-200"}`} />
                       ))}
                       <span className="text-sm font-bold text-teal-800 ml-1">4.2</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-teal-50">
                       <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Price</p>
                          <p className="text-3xl font-black" style={{ color: '#0F766E' }}>${medicine.price.toFixed(2)}</p>
                       </div>
                       <Button 
                          onClick={() => {
                            const itemToAdd = {
                              ...medicine,
                              pharmacyId: medicine.pharmacyId?._id || medicine.pharmacyId,
                              pharmacyName: medicine.pharmacyId?.name || "Unknown Pharmacy"
                            };
                            addToCart(itemToAdd);
                          }}
                          disabled={medicine.stockQuantity <= 0}
                          className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-2xl h-14 px-8 shadow-lg shadow-teal-900/10 active:scale-95 transition-all"
                       >
                          <ShoppingCart className="w-5 h-5 mr-2" />
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
