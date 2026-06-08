import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { apiClient } from "../api/client";
import { toast } from "sonner";
import { 
  Clipboard, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Stethoscope, 
  FileText,
  Search,
  Filter
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function PharmacyPrescriptionsTab() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [statusUpdate, setStatusUpdate] = useState("Received");
  const [pharmacistNotes, setPharmacistNotes] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const fetchPrescriptions = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient("/prescriptions/pharmacy");
      setPrescriptions(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load prescriptions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPrescription) return;

    try {
      await apiClient(`/prescriptions/pharmacy/${selectedPrescription._id}/status`, {
        method: "PUT",
        body: JSON.stringify({
          status: statusUpdate,
          pharmacistNotes
        })
      });
      toast.success("Prescription status updated successfully");
      setIsUpdateModalOpen(false);
      fetchPrescriptions();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const openUpdateModal = (presc: any) => {
    setSelectedPrescription(presc);
    setStatusUpdate(presc.status || "Received");
    setPharmacistNotes(presc.pharmacistNotes || "");
    setIsUpdateModalOpen(true);
  };

  const filteredPrescriptions = prescriptions.filter((item) => {
    const patientName = item.patientId?.name || "";
    const doctorName = item.prescriptionId?.doctorId?.name || "";
    const matchesSearch = patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by patient name or doctor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-2 focus:border-[#0F766E] rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Received", "Processing", "Ready for Pickup", "Completed"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-4 h-12 whitespace-nowrap ${
                statusFilter === status 
                  ? "bg-[#0F766E] text-white" 
                  : "border-2 border-[#B7D1CC] text-[#0F766E]"
              }`}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Loading prescriptions...</div>
      ) : filteredPrescriptions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No prescriptions found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredPrescriptions.map((item) => {
            const presc = item.prescriptionId;
            if (!presc) return null;
            return (
              <Card key={item._id} className="p-6 rounded-[2rem] border-2 border-[#B7D1CC]/30 hover:border-[#0F766E]/50 transition-all shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Patient and Status Details */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase">Patient</p>
                          <p className="text-lg font-bold text-gray-800">{item.patientId?.name}</p>
                          <p className="text-xs text-gray-400">{item.patientId?.phone || "No phone"} • {item.patientId?.email}</p>
                        </div>
                      </div>
                      <Badge className={`rounded-full px-4 py-1.5 font-bold ${
                        item.status === "Completed" ? "bg-green-100 text-green-700" :
                        item.status === "Ready for Pickup" ? "bg-blue-100 text-blue-700" :
                        item.status === "Processing" ? "bg-orange-100 text-orange-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {item.status}
                      </Badge>
                    </div>

                    {/* Prescribing Doctor Info */}
                    <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100/50 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-[#0F766E]" />
                        <div>
                          <p className="text-xs text-teal-600 font-bold">Prescribing Doctor</p>
                          <p className="text-sm font-bold text-[#0F766E]">Dr. {presc.doctorId?.name}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        <p>Specialty: {presc.doctorId?.specialization || "General Medicine"}</p>
                        <p>Lic: {presc.doctorId?.licenseNumber || "N/A"}</p>
                      </div>
                    </div>

                    {/* Diagnosis & Notes */}
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-500 uppercase">Diagnosis</p>
                      <p className="text-sm font-medium text-gray-800">{presc.diagnosis || "No diagnosis provided"}</p>
                    </div>

                    {/* Medications List */}
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-500 uppercase">Medications ({presc.medications?.length || 0})</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {presc.medications?.map((med: any, idx: number) => (
                          <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-xs">
                            <p className="font-bold text-[#0F766E]">{med.name}</p>
                            <p className="text-gray-600">Dosage: {med.dosage} • Frequency: {med.frequency}</p>
                            <p className="text-gray-400">Duration: {med.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pharmacist Notes */}
                    {item.pharmacistNotes && (
                      <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-100 text-xs text-yellow-800">
                        <span className="font-bold">Pharmacist Notes: </span> {item.pharmacistNotes}
                      </div>
                    )}
                  </div>

                  {/* Actions Panel */}
                  <div className="flex flex-col justify-center min-w-[160px] gap-2">
                    <Button onClick={() => openUpdateModal(item)} className="w-full bg-[#0F766E] hover:bg-[#0d6560] text-white h-12 rounded-xl">
                      Update Status
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Update Status Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#0F766E] flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Update Prescription Status
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateStatus} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status-select">Prescription Status</Label>
              <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                <SelectTrigger id="status-select" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Received">Received</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Ready for Pickup">Ready for Pickup</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pharmacist-notes">Pharmacist Notes</Label>
              <textarea
                id="pharmacist-notes"
                placeholder="Specify pickup details, availability, substitutes, etc..."
                value={pharmacistNotes}
                onChange={(e) => setPharmacistNotes(e.target.value)}
                className="w-full min-h-[100px] p-3 border rounded-xl outline-none focus:border-[#0F766E] transition-all resize-none"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-[#0F766E] hover:bg-[#0d6560] h-12 rounded-xl">
                Save Status Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
