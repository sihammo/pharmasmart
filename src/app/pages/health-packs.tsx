import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ShoppingCart, Heart, Check, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { apiClient } from "../api/client";

const healthPacks = [
  {
    id: 1,
    name: "Diabetes Care Pack",
    description: "Complete monthly supply for diabetes management",
    price: 89.99,
    items: [
      "Blood glucose monitor",
      "100 test strips",
      "Lancets (100 count)",
      "Control solution",
      "Metformin 500mg (60 tablets)",
      "Insulin needles",
      "Glucose tablets",
      "Diabetes management guide"
    ],
    savings: "Save 25 DZ",
    image: "https://images.unsplash.com/photo-1763142842671-573188baaabd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFiZXRlcyUyMGhlYWx0aCUyMGNhcmV8ZW58MXx8fHwxNzczNzgwMTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true
  },
  {
    id: 2,
    name: "Asthma Relief Pack",
    description: "Essential asthma management supplies",
    price: 64.99,
    items: [
      "Albuterol inhaler",
      "Peak flow meter",
      "Spacer device",
      "Montelukast 10mg (30 tablets)",
      "Nebulizer mask",
      "Allergy-proof pillow cover",
      "Breathing exercise guide",
      "Emergency action plan"
    ],
    savings: "Save 18 DZ",
    image: "https://images.unsplash.com/photo-1733152121054-8c3d7a8d7b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3RobWElMjBpbmhhbGVyJTIwbWVkaWNhdGlvbnxlbnwxfHx8fDE3NzM3ODAxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: true
  },
  {
    id: 3,
    name: "Blood Pressure Pack",
    description: "Monitor and manage your blood pressure",
    price: 54.99,
    items: [
      "Digital BP monitor",
      "Amlodipine 5mg (30 tablets)",
      "Heart health vitamins",
      "Low-sodium cookbook",
      "BP tracking journal",
      "Exercise resistance band",
      "Stress relief guide",
      "24/7 nurse hotline access"
    ],
    savings: "Save 15 DZ",
    image: "https://images.unsplash.com/photo-1621525466547-4ac135e85f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwaGVhbHRofGVufDF8fHx8MTc3Mzc4MDE0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: false
  },
  {
    id: 4,
    name: "Heart Health Pack",
    description: "Comprehensive cardiovascular care",
    price: 79.99,
    items: [
      "Omega-3 supplements (90 count)",
      "CoQ10 capsules",
      "Aspirin 81mg (100 tablets)",
      "Cholesterol test kit",
      "Heart rate monitor",
      "Mediterranean diet guide",
      "Exercise tracking app subscription",
      "Telehealth consultation"
    ],
    savings: "Save 22 DZ",
    image: "https://images.unsplash.com/photo-1635367216109-aa3353c0c22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMGNhcmV8ZW58MXx8fHwxNzczNzgwMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: false
  },
  {
    id: 5,
    name: "Arthritis Care Pack",
    description: "Pain management and joint support",
    price: 69.99,
    items: [
      "Glucosamine & Chondroitin",
      "Turmeric capsules",
      "Ibuprofen gel",
      "Hot/cold therapy pack",
      "Compression gloves",
      "Joint support braces",
      "Exercise therapy guide",
      "Pain relief cream"
    ],
    savings: "Save 20 DZ",
    image: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwdGFibGV0c3xlbnwxfHx8fDE3NzM3NjI4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: false
  },
  {
    id: 6,
    name: "Thyroid Health Pack",
    description: "Support healthy thyroid function",
    price: 59.99,
    items: [
      "Levothyroxine 50mcg (30 tablets)",
      "Selenium supplements",
      "Vitamin D3 capsules",
      "Iodine complex",
      "Thyroid test kit",
      "Energy boost vitamins",
      "Metabolism support guide",
      "Monthly check-in calls"
    ],
    savings: "Save 16 DZ",
    image: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHMlMjBjYXBzdWxlc3xlbnwxfHx8fDE3NzM3ODAyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    popular: false
  },
];

export function HealthPacksPage() {
  const [dbPacks, setDbPacks] = useState<any[]>([]);
  const [addingId, setAddingId] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const data = await apiClient("/medicines");
        setDbPacks(data.filter((m: any) => m.category?.toLowerCase().includes("pack")));
      } catch (error) {
        console.error("Failed to fetch packs", error);
      }
    };
    fetchPacks();
  }, []);

  const handleAddToCart = (pack: any) => {
    if (pack.isDemo) {
      toast.info("This is a demo pack. Pharmacies manage real packs in their inventory!");
      return;
    }
    setAddingId(pack.id);
    setTimeout(() => {
      addToCart({
        ...pack.original,
        quantity: 1
      });
      setAddingId(null);
    }, 800);
  };

  const displayPacks = dbPacks.length > 0 
    ? dbPacks.map(p => ({
        id: p._id,
        name: p.name,
        description: p.description || "Healthcare essentials packaged together.",
        price: p.price,
        items: p.description ? p.description.split(",").map((s:string) => s.trim()) : ["Comprehensive kit", "Consultation Guide"],
        savings: "Available Now",
        image: p.imageUrl || "https://images.unsplash.com/photo-1635367216109-aa3353c0c22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMGNhcmV8ZW58MXx8fHwxNzczNzgwMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        popular: p.price > 50,
        original: p
      }))
    : healthPacks.map(p => ({ ...p, isDemo: true }));

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2" style={{ color: '#0F766E' }}>Health Packs</h1>
        <p className="text-xl text-gray-600">Specialized care packages for chronic conditions</p>
      </div>

      {/* Info Banner */}
      <Card className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #5FA79A 0%, #8FB9B0 100%)' }}>
        <div className="flex items-center gap-4 text-white">
          <Heart className="w-12 h-12" />
          <div>
            <h3 className="text-2xl mb-1">All-in-One Care Packages</h3>
            <p className="text-lg opacity-90">
              Everything you need for managing chronic conditions, delivered monthly. Save up to 30% compared to individual purchases.
            </p>
          </div>
        </div>
      </Card>

      {/* Popular Packs */}
      <div>
        <h2 className="text-3xl mb-6" style={{ color: '#0F766E' }}>Popular Packs</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {displayPacks.filter(pack => pack.popular).map((pack) => (
            <Card key={pack.id} className="overflow-hidden hover:shadow-2xl transition-shadow rounded-2xl border-2" style={{ borderColor: '#0F766E' }}>
              <div className="relative">
                <div className="h-64 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #2F8F7E 100%)' }}>
                  <ImageWithFallback
                    src={pack.image}
                    alt={pack.name}
                    className="w-full h-full object-cover opacity-40"
                  />
                </div>
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-white" style={{ backgroundColor: '#0F766E' }}>
                  {pack.savings}
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl" style={{ color: '#0F766E' }}>{pack.name}</h3>
                    <span className="text-3xl" style={{ color: '#0F766E' }}>{pack.price} DZ</span>
                  </div>
                  <p className="text-gray-600 text-lg mb-4">{pack.description}</p>
                  <p className="text-sm" style={{ color: '#2F8F7E' }}>Monthly subscription</p>
                </div>

                <div>
                  <h4 className="mb-3" style={{ color: '#0F766E' }}>What's Included ({pack.items.length} items):</h4>
                  <ul className="space-y-2">
                    {pack.items.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0F766E' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => handleAddToCart(pack)}
                  disabled={addingId === pack.id}
                  className="w-full h-12 text-lg bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg"
                >
                  {addingId === pack.id ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Adding...</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart</>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* All Packs */}
      <div>
        <h2 className="text-3xl mb-6" style={{ color: '#0F766E' }}>More Health Packs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPacks.filter(pack => !pack.popular).map((pack) => (
            <Card key={pack.id} className="overflow-hidden hover:shadow-xl transition-shadow rounded-2xl">
              <div className="relative">
                <div className="h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, #5FA79A 0%, #8FB9B0 100%)' }}>
                  <ImageWithFallback
                    src={pack.image}
                    alt={pack.name}
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: '#0F766E' }}>
                  {pack.savings}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl" style={{ color: '#0F766E' }}>{pack.name}</h3>
                    <span className="text-2xl" style={{ color: '#0F766E' }}>{pack.price} DZ</span>
                  </div>
                  <p className="text-gray-600">{pack.description}</p>
                </div>

                <div>
                  <p className="text-sm mb-2" style={{ color: '#2F8F7E' }}>{pack.items.length} items included</p>
                  <ul className="space-y-1">
                    {pack.items.slice(0, 4).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#0F766E' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                    {pack.items.length > 4 && (
                      <li className="text-sm text-gray-500 pl-6">
                        +{pack.items.length - 4} more items
                      </li>
                    )}
                  </ul>
                </div>

                <Button 
                  onClick={() => handleAddToCart(pack)}
                  disabled={addingId === pack.id}
                  className="w-full bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-lg"
                >
                  {addingId === pack.id ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding...</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Subscription Benefits */}
      <Card className="p-8 rounded-2xl" style={{ backgroundColor: '#B7D1CC' }}>
        <h2 className="text-3xl mb-6 text-center" style={{ color: '#0F766E' }}>Subscription Benefits</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#0F766E' }}>
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl" style={{ color: '#0F766E' }}>Save Money</h3>
            <p className="text-gray-600">Up to 30% savings on bundled items</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#2F8F7E' }}>
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl" style={{ color: '#0F766E' }}>Convenient</h3>
            <p className="text-gray-600">Automatic monthly deliveries</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#5FA79A' }}>
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl" style={{ color: '#0F766E' }}>Flexible</h3>
            <p className="text-gray-600">Cancel or modify anytime</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
