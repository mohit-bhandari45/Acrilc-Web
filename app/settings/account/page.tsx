"use client";

import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import api, { ADD_PASSWORD, UPDATE_EMAIL, UPDATE_PASSWORD } from "@/apis/api";
import { Card, CardContent } from "@/components/ui/card";
import { PasswordInput } from "@/components/settingscomps/password-input";

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

  const resetAll = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEmailUpdate = async () => {
    if (!email) return toast.error("Email is required");

    setLoadingEmail(true);
    try {
      const res = await api.post(UPDATE_EMAIL, { newEmail: email });
      if (res.status === 200) {
        toast.success("Verification email sent. Please check your inbox.");
      }
      resetAll();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update email");
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleAddPassword = async () => {
    if (!newAddedPassword) return toast.error("New password is required");

    setLoadingAddPassword(true);
    try {
      const response = await api.post(ADD_PASSWORD, {
        password: newAddedPassword,
      });
      if (response.status === 200) {
        toast.success("Password added");
        window.location.href = "/settings/account";
      }
      resetAll();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add password");
    } finally {
      setLoadingAddPassword(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoadingUpdatePassword(true);
    try {
      const response = await api.post(UPDATE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      if (response.status === 200) {
        toast.success("Password updated");
        window.location.href = "/settings/account";
      }
      resetAll();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password");
    } finally {
      setLoadingUpdatePassword(false);
    }
  };

  console.log(user);

  return (
    <div className="max-w-2xl mx-auto space-y-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      {/* Add Password (if user has no password) */}
      {/* {!user?.password && ( */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <h3 className="text-lg font-semibold">Add Password</h3>
          <PasswordInput
            placeholder="New password"
            value={newAddedPassword}
            onChange={(e) => setNewAddedPassword(e.target.value)}
          />
          <Button
            className="cursor-pointer border-2 border-transparent hover:border-black transition-all duration-300 ease-in-out"
            onClick={handleAddPassword}
            disabled={loadingAddPassword}
          >
            {loadingAddPassword ? "Adding…" : "Add Password"}
          </Button>
        </CardContent>
      </Card>
      {/* )} */}

      {/* Change Email */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <h3 className="text-lg font-semibold">Change Email</h3>
          <Input
            type="email"
            placeholder="Enter new email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="cursor-pointer border-2 border-transparent hover:border-black transition-all duration-300 ease-in-out"
            onClick={handleEmailUpdate}
            disabled={loadingEmail}
          >
            {loadingEmail ? "Updating…" : "Update Email"}
          </Button>
        </CardContent>
      </Card>

      {/* Update Password (only if password exists) */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <h3 className="text-lg font-semibold">Update Password</h3>
          <PasswordInput
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            className="cursor-pointer border-2 border-transparent hover:border-black transition-all duration-300 ease-in-out"
            onClick={handlePasswordUpdate}
            disabled={loadingUpdatePassword}
          >
            {loadingUpdatePassword ? "Updating…" : "Update Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
