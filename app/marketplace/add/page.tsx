"use client";

import Navbar from "@/components/profilecomps/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Instagram, Mail, MessageCircle, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GridLoader } from "react-spinners";
import {
  FormData,
  PricingOption,
  currencies,
  handleAddToMarket,
} from "../marketutils";

export default function AddProjectsPage() {
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const { currentUser, loading } = useCurrentUser({ token });

  const imageUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    year: "",
    description: "",
    additionalInfo: "",
    forte: "",
    keywords: "",
    contactInfo: "",
    showContactInfo: false,
  });
  const [loader, setLoader] = useState<boolean>(false);

  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([
    { id: "1", currency: "", size: "", price: "" },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePricingChange = (
    id: string,
    field: keyof Omit<PricingOption, "id">,
    value: string
  ) => {
    setPricingOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, [field]: value } : option
      )
    );
  };

  const validatePricingRow = (option: PricingOption): boolean => {
    const newErrors: Record<string, string> = {};

    if (!option.currency)
      newErrors[`currency-${option.id}`] = "Currency is required";
    if (!option.size.trim())
      newErrors[`size-${option.id}`] = "Size is required";
    if (!option.price) newErrors[`price-${option.id}`] = "Price is required";

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const addPricingOption = () => {
    const lastOption = pricingOptions[pricingOptions.length - 1];
    if (validatePricingRow(lastOption)) {
      const newId = (pricingOptions.length + 1).toString();
      setPricingOptions((prev) => [
        ...prev,
        { id: newId, currency: "", size: "", price: "" },
      ]);
      // Clear errors for the last row
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`currency-${lastOption.id}`];
        delete newErrors[`size-${lastOption.id}`];
        delete newErrors[`price-${lastOption.id}`];
        return newErrors;
      });
    }
  };

  /* Content submission */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    const newErrors: Record<string, string> = {};

    // Validate formData fields
    if (!file) newErrors.file = "File is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.additionalInfo.trim())
      newErrors.additionalInfo = "Additional info is required";
    // if (!formData.collection.trim())
    //   newErrors.collection = "Collection is required";
    if (!formData.forte.trim()) newErrors.forte = "Forte is required";
    if (!formData.keywords.trim()) newErrors.keywords = "Keywords are required";
    if (!formData.contactInfo.trim())
      newErrors.contactInfo = "Contact info is required";

    // Validate at least one pricing option
    pricingOptions.forEach((option) => {
      if (!option.currency) {
        newErrors[`currency-${option.id}`] = "Currency is required";
      }
      if (!option.size.trim()) {
        newErrors[`size-${option.id}`] = "Size is required";
      }
      if (!option.price.trim()) {
        newErrors[`price-${option.id}`] = "Price is required";
      }
    });

    // Check if image is uploaded
    if (!file) {
      newErrors.image = "Image is required";
      return;
    }
    // Set errors
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.warn("Validation failed", newErrors);
      return;
    }

    setLoader(true);

    const { data, status } = await handleAddToMarket(
      formData,
      file,
      pricingOptions,
      isDraft
    );
    if (status) {
      router.push(`/marketplace/${data}`);
      toast.success("Added to Marketplace");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  if (!currentUser || loading) return null;

  return (
    <>
      {loader && (
        <div className="fixed inset-0 flex flex-col gap-8 justify-center z-60 items-center bg-[#171617cc]">
          <GridLoader color="#FAA21B" size={50} speedMultiplier={1.1} />
          <div className="font-bold text-2xl text-white">
            Adding To MarketPlace...
          </div>
        </div>
      )}

      <div className="min-h-screen bg-white w-full">
        {/* Header */}
        <Navbar currentUser={currentUser} show={true} portfolio={false} />

        {/* Main Content */}
        <main className="max-w-3xl mx-auto p-4 md:p-8 mt-20">
          <h1 className="text-2xl md:text-3xl font-normal mb-6">
            <span className="font-bold">Add</span> Project
          </h1>

          {/* Media Upload Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="flex flex-col h-full justify-center items-center">
              <Card
                onClick={handleClick}
                className="w-full h-36 md:h-44 border-2 border-dashed border-gray-300 bg-gray-50 hover:border-orange-400 transition cursor-pointer group"
              >
                {!file && (
                  <CardContent className="flex items-center justify-center h-full">
                    <Plus className="h-8 w-8 text-gray-400 group-hover:text-orange-400" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </CardContent>
                )}
                {file && imageUrl && (
                  <div className="relative w-full h-full">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </Card>
              {errors[`file`] && (
                <span className="text-xs text-red-500 mt-1">
                  {errors[`file`]}
                </span>
              )}
            </div>
          </section>

          {/* Form Section */}
          <form className="space-y-6">
            {/* Title */}
            <Label className="text-sm font-medium mb-2 block mt-5">Title</Label>
            <Input
              placeholder="Title of the project"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="focus:ring-orange-400 focus:border-orange-400 mb-0.5"
            />
            {errors[`title`] && (
              <span className="text-xs text-red-500 mt-1">
                {errors[`title`]}
              </span>
            )}

            {/* Year & Price Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mb-0.5">
              <Input
                placeholder="Year of making"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                className="focus:ring-orange-400 focus:border-orange-400"
              />
            </div>
            {errors[`year`] && (
              <span className="text-xs text-red-500">{errors[`year`]}</span>
            )}

            {/* Description */}
            <div className="mb-0.5">
              <Label className="text-sm font-medium mb-2 block mt-5">
                Description
              </Label>
              <Textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="resize-none focus:ring-orange-400 focus:border-orange-400"
              />
            </div>
            {errors[`description`] && (
              <span className="text-xs text-red-500">
                {errors[`description`]}
              </span>
            )}

            {/* Pricing Options */}
            <div className="space-y-4 mt-5">
              {pricingOptions.map((option, index) => (
                <div
                  key={option.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
                >
                  <div className="flex flex-col">
                    <Label className="text-sm font-medium mb-2">
                      {index === 0 ? "Select pricing option" : "Currency"}
                    </Label>
                    <Select
                      value={option.currency}
                      onValueChange={(value) =>
                        handlePricingChange(option.id, "currency", value)
                      }
                    >
                      <SelectTrigger
                        className={`focus:ring-orange-400 focus:border-orange-400 ${
                          errors[`currency-${option.id}`]
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                          >
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors[`currency-${option.id}`] && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors[`currency-${option.id}`]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-sm font-medium mb-2">
                      Size of the print
                    </Label>
                    <Input
                      placeholder="e.g. 2'x1.5' canvas, A3 paper"
                      value={option.size}
                      onChange={(e) =>
                        handlePricingChange(option.id, "size", e.target.value)
                      }
                      className={`focus:ring-orange-400 focus:border-orange-400 ${
                        errors[`size-${option.id}`] ? "border-red-500" : ""
                      }`}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Enter size (e.g. 2&apos;x1.5&apos; canvas, A3 paper, etc.)
                    </div>
                    {errors[`size-${option.id}`] && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors[`size-${option.id}`]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-sm font-medium mb-2">
                      Enter the price
                    </Label>
                    <div className="flex">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter price"
                        value={option.price}
                        onChange={(e) =>
                          handlePricingChange(
                            option.id,
                            "price",
                            e.target.value
                          )
                        }
                        className={`rounded-r-none focus:ring-orange-400 focus:border-orange-400 ${
                          errors[`price-${option.id}`] ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors[`price-${option.id}`] && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors[`price-${option.id}`]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Another Button */}
            <div className="flex justify-center md:justify-start">
              <Button
                type="button"
                variant="secondary"
                onClick={addPricingOption}
                className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Add Another
              </Button>
            </div>

            {/* Additional Information */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Additional Information
              </Label>
              <Textarea
                rows={3}
                value={formData.additionalInfo}
                onChange={(e) =>
                  handleInputChange("additionalInfo", e.target.value)
                }
                className="resize-none focus:ring-orange-400 focus:border-orange-400"
              />
            </div>

            {/* Tags Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* <Select
              value={formData.collection}
              onValueChange={(value) => handleInputChange("collection", value)}
            >
              <SelectTrigger className="focus:ring-orange-400 focus:border-orange-400">
                <SelectValue placeholder="Collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="collection1">Collection 1</SelectItem>
                <SelectItem value="collection2">Collection 2</SelectItem>
              </SelectContent>
            </Select> */}

              <Select
                value={formData.forte}
                onValueChange={(value) => handleInputChange("forte", value)}
              >
                <SelectTrigger className="focus:ring-orange-400 focus:border-orange-400">
                  <SelectValue placeholder="Forte" />
                </SelectTrigger>
                <SelectContent>
                  {currentUser.preferences?.map((forte, idx) => {
                    return (
                      <SelectItem key={idx} value={forte}>
                        {forte}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <div className="flex">
                <Input
                  placeholder="Key Words"
                  value={formData.keywords}
                  onChange={(e) =>
                    handleInputChange("keywords", e.target.value)
                  }
                  className="rounded-r-none focus:ring-orange-400 focus:border-orange-400"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-l-none border-l-0 hover:bg-orange-400 hover:text-white"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
              <div className="flex items-center gap-3">
                <Label className="text-sm font-medium">
                  Buyers can see the contact information
                </Label>
                <Switch
                  checked={formData.showContactInfo}
                  onCheckedChange={(checked) =>
                    handleInputChange("showContactInfo", checked)
                  }
                  className="data-[state=checked]:bg-orange-400"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border">
                    <MessageCircle className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border">
                    <Instagram className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <Input
                  placeholder="Enter contact info"
                  value={formData.contactInfo}
                  onChange={(e) =>
                    handleInputChange("contactInfo", e.target.value)
                  }
                  className="focus:ring-orange-400 focus:border-orange-400"
                />
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex flex-col md:flex-row justify-end gap-4 mt-8">
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleSubmit(true)}
                className="md:w-auto cursor-pointer"
              >
                Draft
              </Button>
              <Button
                type="button"
                onClick={() => handleSubmit(false)}
                className="bg-orange-400 cursor-pointer hover:bg-orange-500 md:w-auto"
              >
                Publish
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
