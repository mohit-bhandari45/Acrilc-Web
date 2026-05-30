"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React, { useState } from "react";

const ContactSection: React.FC = () => {
	const [formData, setFormData] = useState({ name: "", email: "", message: "" });
	const [submitting, setSubmitting] = useState(false);
	const [sent, setSent] = useState(false);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		await new Promise(r => setTimeout(r, 1000));
		setSent(true);
		setSubmitting(false);
		setFormData({ name: "", email: "", message: "" });
	};

	const inputCls = "h-11 rounded-lg border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-900 focus-visible:ring-1 focus-visible:ring-gray-900";

	return (
		<section id="contact" className="py-24 px-6 lg:px-16 bg-gray-50">
			<div className="max-w-6xl mx-auto">

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

					{/* Left — Form */}
					<div className="lg:col-span-3">
						<p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4">Contact</p>
						<h2 className="font-serif text-4xl lg:text-5xl font-normal text-gray-900 mb-4">Get in Touch</h2>
						<p className="text-gray-500 text-base leading-relaxed mb-10">
							Interested in a commission or have a question about my work? I'd love to hear from you.
						</p>

						{sent ? (
							<div className="py-12 text-center border border-gray-200 rounded-2xl bg-white">
								<p className="font-serif text-2xl text-gray-900 mb-2">Thank you!</p>
								<p className="text-gray-500 text-sm">Your message has been received. I'll be in touch soon.</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Name</label>
										<Input name="name" value={formData.name} onChange={handleInput} required placeholder="Your name" className={inputCls} />
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</label>
										<Input type="email" name="email" value={formData.email} onChange={handleInput} required placeholder="your@email.com" className={inputCls} />
									</div>
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Message</label>
									<Textarea name="message" value={formData.message} onChange={handleInput} required rows={5}
										placeholder="Tell me about your project or question…"
										className="rounded-lg border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-900 focus-visible:ring-1 focus-visible:ring-gray-900 resize-none"
									/>
								</div>
								<button
									type="submit"
									disabled={submitting}
									className="px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 disabled:opacity-60 cursor-pointer"
								>
									{submitting ? "Sending…" : "Send Message →"}
								</button>
							</form>
						)}
					</div>

					{/* Right — Info */}
					<div className="lg:col-span-2 space-y-10 pt-2 lg:pt-[72px]">
						<div>
							<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Follow Along</h3>
							<div className="flex gap-3">
								{[
									{ href: "https://www.instagram.com/theacrilc?igsh=NjRndzAydDdqcnF0", label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
									{ href: "https://www.facebook.com/share/16CThH4ZMU/", label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
									{ href: "#", label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
								].map(({ href, label, path }) => (
									<Link key={label} href={href} target="_blank" aria-label={label}
										className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
									>
										<svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d={path} /></svg>
									</Link>
								))}
							</div>
						</div>

						<div>
							<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Response Time</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								I typically respond to enquiries within 2–3 business days.
							</p>
						</div>

						<div className="p-6 bg-white rounded-2xl border border-gray-100">
							<p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Commission Enquiries</p>
							<p className="text-sm text-gray-600 leading-relaxed">
								Each commission is unique. Please share your vision, dimensions, and timeline in your message and I'll get back with availability and pricing.
							</p>
						</div>
					</div>

				</div>
			</div>
		</section>
	);
};

export default ContactSection;
