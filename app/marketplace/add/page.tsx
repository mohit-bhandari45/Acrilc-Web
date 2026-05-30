"use client";

import Navbar from "@/components/profilecomps/navbar";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Plus, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FormData, PricingOption, currencies, handleAddToMarket } from "../marketutils";
import { useAppSelector } from "@/store/hooks";

const inputCls = "h-11 rounded-full border-[#ead7c9] bg-white px-4 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm";
const textareaCls = "rounded-2xl border-[#ead7c9] bg-white px-4 py-3 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm resize-none";
const labelCls = "block text-sm font-semibold text-[#765240] mb-1.5";

export default function AddProjectsPage() {
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { user: currentUser, loading } = useAppSelector(state => state.userReducer);

  const imageUrl = useMemo(() => {
    if (!file) return null;
    
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => { if (imageUrl) URL.revokeObjectURL(imageUrl); };
  }, [imageUrl]);

  const [formData, setFormData] = useState<FormData>({
    title: "", year: "", description: "", additionalInfo: "",
    forte: "", keywords: "", contactInfo: "", showContactInfo: false,
  });
  const [loader, setLoader] = useState(false);
  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([
    { id: "1", currency: "", size: "", price: "" },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePricingChange = (id: string, field: keyof Omit<PricingOption, "id">, value: string) => {
    setPricingOptions(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const validatePricingRow = (option: PricingOption) => {
    const newErrors: Record<string, string> = {};
    if (!option.currency) newErrors[`currency-${option.id}`] = "Currency is required";
    if (!option.size.trim()) newErrors[`size-${option.id}`] = "Size is required";
    if (!option.price) newErrors[`price-${option.id}`] = "Price is required";
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const addPricingOption = () => {
    const last = pricingOptions[pricingOptions.length - 1];
    if (validatePricingRow(last)) {
      setPricingOptions(prev => [...prev, { id: (prev.length + 1).toString(), currency: "", size: "", price: "" }]);
      setErrors(prev => {
        const e = { ...prev };
        delete e[`currency-${last.id}`]; delete e[`size-${last.id}`]; delete e[`price-${last.id}`];
        return e;
      });
    }
  };

  const handleSubmit = async (isDraft = false) => {
    const newErrors: Record<string, string> = {};
    if (!file) newErrors.file = "Image is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.additionalInfo.trim()) newErrors.additionalInfo = "Additional info is required";
    if (!formData.forte.trim()) newErrors.forte = "Forte is required";
    if (!formData.keywords.trim()) newErrors.keywords = "Keywords are required";
    if (!formData.contactInfo.trim()) newErrors.contactInfo = "Contact info is required";
    pricingOptions.forEach(o => {
      if (!o.currency) newErrors[`currency-${o.id}`] = "Required";
      if (!o.size.trim()) newErrors[`size-${o.id}`] = "Required";
      if (!o.price.trim()) newErrors[`price-${o.id}`] = "Required";
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoader(true);
    const { data, status } = await handleAddToMarket(formData, file!, pricingOptions, isDraft);
    if (status) { router.push(`/marketplace/${data}`); toast.success("Added to Marketplace"); }
    else { toast.error("Something went wrong"); setLoader(false); }
  };

  if (!currentUser || loading) return null;

  return (
    <>
      {loader && (
        <div className="fixed inset-0 flex flex-col gap-5 justify-center z-[60] items-center bg-[#2e1a10]/80 backdrop-blur-sm">
          <div className="relative flex items-center justify-center">
            <div className="h-14 w-14 rounded-full border-4 border-[#ead7c9] border-t-[#834C3D] animate-spin" />
            <div className="absolute h-9 w-9 rounded-full border-2 border-[#E2725B]/20 border-t-[#a8664f]/60 animate-spin [animation-direction:reverse] [animation-duration:800ms]" />
          </div>
          <p className="text-base font-semibold text-white">Adding to Marketplace…</p>
        </div>
      )}

      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(226,114,91,0.10)_0%,_transparent_50%),linear-gradient(180deg,_#f5e8dc_0%,_#eedad0_60%,_#e5cfc0_100%)]">
        <Navbar currentUser={currentUser} show={true} portfolio={false} />

        <main className="max-w-2xl mx-auto px-4 pt-28 pb-16">
          <div className="mb-8 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-[#9a8578] font-medium mb-2">Marketplace</p>
            <h1 className="font-playfair text-3xl font-normal text-[#2e1f14]">Add Listing</h1>
          </div>

          <div className="space-y-4">

            {/* Image upload */}
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
              <label className={labelCls}>Artwork Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative h-48 w-full rounded-xl overflow-hidden border-2 border-dashed cursor-pointer transition-all group
                  ${file ? "border-[#834C3D]" : "border-[#d4a98a] bg-[#fdf5ef] hover:border-[#834C3D] hover:bg-[#f5e2d8]"}`}
              >
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
                {file && imageUrl ? (
                  <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2">
                    <div className="h-12 w-12 rounded-full bg-[#f0d5c4] group-hover:bg-[#e8c4aa] flex items-center justify-center transition-colors">
                      <Upload size={20} className="text-[#834C3D]" />
                    </div>
                    <p className="text-sm font-medium text-[#834C3D]">Click to upload image</p>
                  </div>
                )}
              </div>
              {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
            </div>

            {/* Title & Year */}
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 space-y-4">
              <div>
                <label className={labelCls}>Title</label>
                <input type="text" value={formData.title} onChange={e => handleInputChange("title", e.target.value)} placeholder="Title of your artwork" className={inputCls} />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>
              <div className="w-1/2">
                <label className={labelCls}>Year Made</label>
                <input type="text" value={formData.year} onChange={e => handleInputChange("year", e.target.value)} placeholder="e.g. 2024" className={inputCls} />
                {errors.year && <p className="text-xs text-red-500 mt-1">{errors.year}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
              <label className={labelCls}>Description</label>
              <Textarea rows={3} value={formData.description} onChange={e => handleInputChange("description", e.target.value)} placeholder="Describe your artwork…" className={textareaCls} />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 space-y-4">
              <label className={labelCls}>Pricing Options</label>
              {pricingOptions.map((option, idx) => (
                <div key={option.id} className="grid grid-cols-3 gap-3">
                  <div>
                    {idx === 0 && <label className="text-xs text-[#9a8578] mb-1 block">Currency</label>}
                    <Select value={option.currency} onValueChange={v => handlePricingChange(option.id, "currency", v)}>
                      <SelectTrigger className={`h-11 rounded-full border border-[#ead7c9] bg-white text-sm text-[#2e1f14] px-4 ${errors[`currency-${option.id}`] ? "border-red-400" : ""}`}>
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors[`currency-${option.id}`] && <p className="text-xs text-red-500 mt-0.5">{errors[`currency-${option.id}`]}</p>}
                  </div>
                  <div>
                    {idx === 0 && <label className="text-xs text-[#9a8578] mb-1 block">Size</label>}
                    <Input value={option.size} onChange={e => handlePricingChange(option.id, "size", e.target.value)}
                      placeholder="e.g. A3, 24×18 in"
                      className={`h-11 rounded-full border border-[#ead7c9] bg-white px-4 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm ${errors[`size-${option.id}`] ? "border-red-400" : ""}`} />
                    {errors[`size-${option.id}`] && <p className="text-xs text-red-500 mt-0.5">{errors[`size-${option.id}`]}</p>}
                  </div>
                  <div>
                    {idx === 0 && <label className="text-xs text-[#9a8578] mb-1 block">Price</label>}
                    <Input type="number" min="0" value={option.price} onChange={e => handlePricingChange(option.id, "price", e.target.value)}
                      placeholder="0"
                      className={`h-11 rounded-full border border-[#ead7c9] bg-white px-4 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm ${errors[`price-${option.id}`] ? "border-red-400" : ""}`} />
                    {errors[`price-${option.id}`] && <p className="text-xs text-red-500 mt-0.5">{errors[`price-${option.id}`]}</p>}
                  </div>
                </div>
              ))}
              <button type="button" onClick={addPricingOption}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#834C3D]/40 bg-[#fff7f2] px-4 py-1.5 text-xs font-semibold text-[#834C3D] hover:bg-[#f5e2d8] transition cursor-pointer">
                <Plus size={12} /> Add Size
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
              <label className={labelCls}>Additional Information</label>
              <Textarea rows={3} value={formData.additionalInfo} onChange={e => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Framing, materials, certificate of authenticity, etc."
                className={textareaCls} />
              {errors.additionalInfo && <p className="text-xs text-red-500 mt-1">{errors.additionalInfo}</p>}
            </div>

            {/* Forte & Keywords */}
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 space-y-4">
              <div>
                <label className={labelCls}>Forte</label>
                <div className="relative">
                  <Select value={formData.forte} onValueChange={v => handleInputChange("forte", v)}>
                    <SelectTrigger className={`h-11 rounded-full border border-[#ead7c9] bg-white text-sm text-[#2e1f14] px-4 ${errors.forte ? "border-red-400" : ""}`}>
                      <SelectValue placeholder="Select forte" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentUser.preferences?.map((f, i) => <SelectItem key={i} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {errors.forte && <p className="text-xs text-red-500 mt-1">{errors.forte}</p>}
              </div>
              <div>
                <label className={labelCls}>Keywords</label>
                <input type="text" value={formData.keywords} onChange={e => handleInputChange("keywords", e.target.value)}
                  placeholder="e.g. watercolor, nature, abstract" className={inputCls} />
                {errors.keywords && <p className="text-xs text-red-500 mt-1">{errors.keywords}</p>}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <label className={labelCls + " mb-0"}>Show Contact Info to Buyers</label>
                <Switch
                  checked={formData.showContactInfo}
                  onCheckedChange={v => handleInputChange("showContactInfo", v)}
                  className="data-[state=checked]:bg-[#834C3D]"
                />
              </div>
              <div>
                <label className={labelCls}>Contact Info</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2 text-[#9a8578]">
                    <MessageCircle size={14} />
                  </div>
                  <input type="text" value={formData.contactInfo} onChange={e => handleInputChange("contactInfo", e.target.value)}
                    placeholder="WhatsApp number, email, or Instagram handle"
                    className={inputCls + " pl-9"} />
                </div>
                {errors.contactInfo && <p className="text-xs text-red-500 mt-1">{errors.contactInfo}</p>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => handleSubmit(true)}
                className="flex-none px-6 h-11 rounded-full border border-[#834C3D]/40 bg-white text-sm font-semibold text-[#834C3D] hover:bg-[#fff7f2] transition cursor-pointer">
                Save as Draft
              </button>
              <button type="button" onClick={() => handleSubmit(false)}
                className="flex-1 h-11 inline-flex items-center justify-center gap-2 cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.36)]">
                Publish Listing
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
