// app/privacy-policy/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { sections } from "./data";

export const metadata: Metadata = {
  title: "Privacy Policy | Acrilc",
  description: "Learn how Acrilc collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen font-[Helvetica] py-16 px-4 sm:px-10 md:px-20 text-neutral-800">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center text-[#FAA21B]">Privacy Policy</h1>
        <p className="text-center text-sm text-muted-foreground">Last Updated: May 18, 2025</p>
        <Card className="bg-white shadow-lg border-orange-100 border rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <p className="text-lg">
              Hey there, art lovers! At Acrilc, we’re all about spreading artsy joy while keeping your personal info safe. This Privacy Policy explains how we collect, use, and protect your data when you use our website (<a className="text-blue-600 underline" href="https://www.acrilc.com">www.acrilc.com</a>) or mobile app (if applicable). We follow Indian laws like the Information Technology Act, 2000, SPDI Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDPA). Let’s dive in!
            </p>
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold text-[#FAA21B] mb-2">{section.title}</h2>
                <p className="text-base leading-relaxed text-gray-800">{section.content}</p>
                <Separator className="my-4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}