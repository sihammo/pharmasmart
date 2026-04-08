import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, Plus, Pill, Trash2, Edit2, AlertCircle, ShoppingBag, Layers } from "lucide-react";
import { apiClient } from "../../api/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export function AdminMedicines() {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    pharmacyId: "",
    category: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    requiresPrescription: false
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [medsData, pharmsData] = await Promise.all([
        apiClient("/medicines"),
        apiClient("/pharmacies")
      ]);
      setMedicines(medsData);
      setPharmacies(pharmsData);
    } catch (error: any) {
      toast.error("Failed to load medicines inventory");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      if (!newMedicine.pharmacyId) throw new Error("Select a pharmacy first");
      await apiClient("/medicines", {
        method: "POST",
        body: JSON.stringify(newMedicine)
      });
      toast.success(`${newMedicine.name} added to inventory`);
      setIsAddDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to add medicine");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this medicine? Stock data will be lost.")) return;
    try {
      await apiClient(`/medicines/${id}`, { method: "DELETE" });
      toast.success("Medicine removed");
      fetchData();
    } catch (error: any) {
      toast.error("Delete failed");
    }
  };

  const filtered = medicines.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold" style={{ color: '#0F766E' }}>Medicine Inventory</h1>
          <p className="text-gray-500">Track and manage global stock levels across the network.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d6560] text-white rounded-xl h-12 px-6">
              <Plus className="w-5 h-5 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-teal-900 border-b pb-4">Inventory Injection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Medicine Name</Label>
                    <Input placeholder="e.g. Paracetamol 500mg" value={newMedicine.name} onChange={e => setNewMedicine({...newMedicine, name: e.target.value})} className="rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label>Assign Pharmacy</Label>
                    <Select onValueChange={v => setNewMedicine({...newMedicine, pharmacyId: v})}>
                       <SelectTrigger className="rounded-xl border-2">
                          <SelectValue placeholder="Select Store" />
                       </SelectTrigger>
                       <SelectContent>
                          {pharmacies.map(p => (
                            <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>
                          ))}
                       </SelectContent>
                    </Select>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input placeholder="Pain Relief" value={newMedicine.category} onChange={e => setNewMedicine({...newMedicine, category: e.target.value})} className="rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label>Requires Prescription?</Label>
                    <Select onValueChange={v => setNewMedicine({...newMedicine, requiresPrescription: v === "true"})}>
                       <SelectTrigger className="rounded-xl border-2">
                          <SelectValue placeholder="No" />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="false">No (OTC)</SelectItem>
                          <SelectItem value="true">Yes (Rx Only)</SelectItem>
                       </SelectContent>
                    </Select>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price ($)</Label>
                    <Input type="number" value={newMedicine.price} onChange={e => setNewMedicine({...newMedicine, price: parseFloat(e.target.value)})} className="rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label>Initial Stock</Label>
                    <Input type="number" value={newMedicine.stockQuantity} onChange={e => setNewMedicine({...newMedicine, stockQuantity: parseInt(e.target.value)})} className="rounded-xl border-2" />
                  </div>
               </div>
               <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea 
                    className="w-full h-24 rounded-xl border-2 p-3 text-sm focus:border-teal-600 focus:outline-none"
                    placeholder="Short product brief..."
                    value={newMedicine.description}
                    onChange={e => setNewMedicine({...newMedicine, description: e.target.value})}
                  />
               </div>
               <Button onClick={handleCreate} className="w-full bg-[#0F766E] h-12 rounded-xl mt-4">Add to Catalog</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input 
          className="pl-12 h-14 bg-white border-2 rounded-2xl focus:border-[#0F766E] transition-all" 
          placeholder="Search by name, category or pharmacy..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-3xl border-2 border-teal-50 overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-teal-50 border-b-2 border-teal-100">
               <tr className="text-teal-900 font-bold uppercase text-xs tracking-widest">
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4">Pricing</th>
                  <th className="px-6 py-4">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-teal-50">
               {isLoading ? (
                  <tr><td colSpan={4} className="p-12 text-center text-teal-600 animate-pulse">Synchronizing inventory...</td></tr>
               ) : filtered.map(med => (
                 <tr key={med._id} className="hover:bg-teal-50/20 transition-colors group">
                    <td className="px-6 py-4">
                       <p className="font-bold text-[#0F766E] text-lg">{med.name}</p>
                        <p className="text-xs text-gray-400 font-semibold">
                          {med.category} • Assign: {
                            typeof med.pharmacyId === 'object' 
                              ? med.pharmacyId.name 
                              : (pharmacies.find(p => p._id === med.pharmacyId)?.name || med.pharmacyId)
                          }
                        </p>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${med.stockQuantity < 10 ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
                          <p className="font-black text-gray-700">{med.stockQuantity} Units</p>
                       </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-teal-900 text-lg">${med.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                       <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="rounded-lg hover:bg-teal-100 text-[#0F766E]"><Edit2 className="w-4 h-4" /></Button>
                          <Button onClick={() => handleDelete(med._id)} variant="ghost" size="icon" className="rounded-lg hover:bg-red-100 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
