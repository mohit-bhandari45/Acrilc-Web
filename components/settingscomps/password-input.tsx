"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export const PasswordInput = ({ placeholder, value, onChange, name }: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="new-password"
        value={value}
        onChange={onChange}
        className="h-11 rounded-full border-[#ead7c9] bg-white px-4 pr-11 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9a8578] hover:text-[#834C3D] transition-colors cursor-pointer"
        tabIndex={-1}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};
