import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, Plus, MapPin, Phone, Trash2, Edit2, Check, X, ShieldCheck } from "lucide-react";
import { apiClient } from "../../api/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";

export function AdminPharmacies() {
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPharmacy, setNewPharmacy] = useState({
    name: "",
    address: "",
    phone: "",
    licenseNumber: "",
    ownerId: "", // Will need a user selection in real app
    location: { coordinates: [0, 0] }
  });

  const fetchPharmacies = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient("/pharmacies");
      setPharmacies(data);
    } catch (error: any) {
      toast.error("Failed to load pharmacies");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const handleCreate = async () => {
    try {
      await apiClient("/pharmacies", {
        method: "POST",
        body: JSON.stringify(newPharmacy)
      });
      toast.success("Pharmacy registered successfully");
      setIsAddDialogOpen(false);
      fetchPharmacies();
    } catch (error: any) {
      toast.error(error.message || "Failed to create pharmacy");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pharmacy?")) return;
    try {
      await apiClient(`/pharmacies/${id}`, { method: "DELETE" });
      toast.success("Pharmacy removed");
      fetchPharmacies();
    } catch (error: any) {
      toast.error("Failed to delete pharmacy");
    }
  };

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      await apiClient(`/pharmacies/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isApproved: !currentStatus })
      });
      toast.success(!currentStatus ? "Pharmacy Verified!" : "Verification Revoked");
      fetchPharmacies();
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const filtered = pharmacies.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold" style={{ color: '#0F766E' }}>Pharmacy Network</h1>
          <p className="text-gray-500">Manage all registered pharmacies and their verification status.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-xl h-12 px-6">
              <Plus className="w-5 h-5 mr-2" />
              Register Pharmacy
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-teal-900 border-b pb-4">Register New Pharmacy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pharmacy Name</Label>
                    <Input placeholder="e.g. City Care Pharmacy" value={newPharmacy.name} onChange={e => setNewPharmacy({...newPharmacy, name: e.target.value})} className="rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label>License Number</Label>
                    <Input placeholder="PH-123456" value={newPharmacy.licenseNumber} onChange={e => setNewPharmacy({...newPharmacy, licenseNumber: e.target.value})} className="rounded-xl border-2" />
                  </div>
               </div>
               <div className="space-y-2">
                  <Label>Full Address</Label>
                  <Input placeholder="123 Health St, New York, NY" value={newPharmacy.address} onChange={e => setNewPharmacy({...newPharmacy, address: e.target.value})} className="rounded-xl border-2" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="+1 234 567 890" value={newPharmacy.phone} onChange={e => setNewPharmacy({...newPharmacy, phone: e.target.value})} className="rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label>Owner User ID</Label>
                    <Input placeholder="User MongoDB ID" value={newPharmacy.ownerId} onChange={e => setNewPharmacy({...newPharmacy, ownerId: e.target.value})} className="rounded-xl border-2" />
                  </div>
               </div>
               <div className="bg-teal-50 p-4 rounded-2xl border-2 border-teal-100">
                  <p className="text-xs font-bold text-teal-800 uppercase mb-2">Location Coordinates</p>
                  <div className="flex gap-4">
                     <Input type="number" step="any" placeholder="Longitude" onChange={e => setNewPharmacy({...newPharmacy, location: { ...newPharmacy.location, coordinates: [parseFloat(e.target.value), newPharmacy.location.coordinates[1]] }})} className="bg-white rounded-lg" />
                     <Input type="number" step="any" placeholder="Latitude" onChange={e => setNewPharmacy({...newPharmacy, location: { ...newPharmacy.location, coordinates: [newPharmacy.location.coordinates[0], parseFloat(e.target.value)] }})} className="bg-white rounded-lg" />
                  </div>
               </div>
               <Button onClick={handleCreate} className="w-full bg-[#0F766E] h-12 rounded-xl mt-4">Complete Registration</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input 
          className="pl-12 h-14 bg-white border-2 rounded-2xl shadow-sm focus:border-[#0F766E] transition-all" 
          placeholder="Search by name, address or license..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-64 animate-pulse bg-gray-50 border-2 border-dashed border-gray-200" />
          ))
        ) : filtered.map(pharmacy => (
          <Card key={pharmacy._id} className="group overflow-hidden rounded-3xl border-2 border-teal-50 hover:border-teal-400 hover:shadow-xl transition-all duration-300">
            <div className="p-6 space-y-4">
               <div className="flex justify-between items-start">
                  <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100">
                    <MapPin className="w-8 h-8 text-[#0F766E]" />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      title={pharmacy.isApproved ? "Revoke Verification" : "Verify Pharmacy"}
                      onClick={() => handleToggleApproval(pharmacy._id, pharmacy.isApproved)}
                      variant="ghost" size="icon" 
                      className={`rounded-full ${pharmacy.isApproved ? 'hover:bg-orange-50 text-orange-600' : 'hover:bg-green-50 text-green-600'}`}
                    >
                      {pharmacy.isApproved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-teal-50 text-teal-600">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleDelete(pharmacy._id)} variant="ghost" size="icon" className="rounded-full hover:bg-red-50 text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
               </div>

               <div>
                  <h3 className="text-2xl font-bold truncate" style={{ color: '#0F766E' }}>{pharmacy.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     {pharmacy.isApproved ? (
                       <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 uppercase tracking-tighter">
                         <ShieldCheck className="w-3 h-3" /> Verified
                       </span>
                     ) : (
                       <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100 uppercase tracking-tighter">
                         Pending Verification
                       </span>
                     )}
                  </div>
               </div>

               <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {pharmacy.address}</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {pharmacy.phone}</p>
                  <p className="font-mono bg-gray-50 p-2 rounded-lg border border-gray-100 text-[10px] truncate">LICENSE: {pharmacy.licenseNumber}</p>
               </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
