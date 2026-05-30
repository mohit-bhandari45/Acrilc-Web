"use client";

import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import api, { ADD_PASSWORD, UPDATE_EMAIL, UPDATE_PASSWORD } from "@/apis/api";
import { PasswordInput } from "@/components/settingscomps/password-input";
import { Mail, KeyRound, ShieldCheck } from "lucide-react";

const inputCls = "h-11 rounded-full border-[#ead7c9] bg-white px-4 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm";

function SectionCard({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#f5e2d8] text-[#834C3D]">{icon}</div>
                <div>
                    <h2 className="text-base font-bold text-[#2e1f14]">{title}</h2>
                    <p className="text-xs text-[#9a8578] mt-0.5">{subtitle}</p>
                </div>
            </div>
            {children}
        </div>
    );
}

function SaveButton({ loading, label, loadingLabel, onClick }: { loading: boolean; label: string; loadingLabel: string; onClick: () => void }) {
    return (
        <button onClick={onClick} disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-6 py-2 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(131,76,61,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(131,76,61,0.32)] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
            {loading ? (
                <><div className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />{loadingLabel}</>
            ) : label}
        </button>
    );
}

const AccountSettings = () => {
    const { user } = useAppSelector((state) => state.userReducer);

    const [email, setEmail] = useState(user?.email || "");
    const [newAddedPassword, setNewAddedPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingAddPassword, setLoadingAddPassword] = useState(false);
    const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false);

    const handleEmailUpdate = async () => {
        if (!email) return toast.error("Email is required");
        setLoadingEmail(true);
        try {
            const res = await api.post(UPDATE_EMAIL, { newEmail: email });
            if (res.status === 200) toast.success("Verification email sent. Please check your inbox.");
        } catch {
            toast.error("Failed to update email");
        } finally {
            setLoadingEmail(false);
        }
    };

    const handleAddPassword = async () => {
        if (!newAddedPassword) return toast.error("New password is required");
        setLoadingAddPassword(true);
        try {
            const res = await api.post(ADD_PASSWORD, { password: newAddedPassword });
            if (res.status === 200) { toast.success("Password added"); window.location.href = "/settings/account"; }
        } catch {
            toast.error("Failed to add password");
        } finally {
            setLoadingAddPassword(false);
        }
    };

    const handlePasswordUpdate = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) return toast.error("All fields are required");
        if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
        setLoadingUpdatePassword(true);
        try {
            const res = await api.post(UPDATE_PASSWORD, { currentPassword, newPassword });
            if (res.status === 200) { toast.success("Password updated"); window.location.href = "/settings/account"; }
        } catch {
            toast.error("Failed to update password");
        } finally {
            setLoadingUpdatePassword(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-5">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-[#2e1f14]">Account & Privacy</h1>
                <p className="text-sm text-[#9a8578] mt-1">Manage your email, password and security settings</p>
            </div>

            {/* Change Email */}
            <SectionCard icon={<Mail className="h-4 w-4" />} title="Email Address" subtitle="Update the email associated with your account">
                <div className="space-y-3">
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="Enter new email" autoComplete="off" className={inputCls} />
                    <SaveButton loading={loadingEmail} label="Update Email" loadingLabel="Updating…" onClick={handleEmailUpdate} />
                </div>
            </SectionCard>

            {/* Add Password (Google users) */}
            {!user?.password && (
                <SectionCard icon={<ShieldCheck className="h-4 w-4" />} title="Add Password" subtitle="Set a password to enable email/password sign-in">
                    <div className="space-y-3">
                        <PasswordInput placeholder="Set a new password" value={newAddedPassword} onChange={e => setNewAddedPassword(e.target.value)} />
                        <SaveButton loading={loadingAddPassword} label="Add Password" loadingLabel="Adding…" onClick={handleAddPassword} />
                    </div>
                </SectionCard>
            )}

            {/* Update Password */}
            <SectionCard icon={<KeyRound className="h-4 w-4" />} title="Update Password" subtitle="Change your current password to something new">
                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#765240]">Current Password</label>
                        <PasswordInput placeholder="Enter current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#765240]">New Password</label>
                        <PasswordInput placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#765240]">Confirm New Password</label>
                        <PasswordInput placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <SaveButton loading={loadingUpdatePassword} label="Update Password" loadingLabel="Updating…" onClick={handlePasswordUpdate} />
                </div>
            </SectionCard>
        </div>
    );
};

export default AccountSettings;
