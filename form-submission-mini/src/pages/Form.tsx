import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createSubmission } from "../services/submissions";
import { useAuthStore } from "@/store/userStore";

export default function Form() {
  const navigate = useNavigate();

  const email = useAuthStore((state) => state.email);
  const isFilled = useAuthStore((state) => state.isFilled);
  const logout = useAuthStore((state) => state.logout);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!image) {
      setError("Please select an image");
      return;
    }

    try {
      setSubmitting(true);
      await createSubmission({
        name,
        email: email ?? "",
        phone: phoneNumber,
        image,
      });
      isFilled({
        formFilled: true,
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <form
      className="mx-auto my-16 max-w-2xl px-4 sm:px-6 lg:px-8"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-bold mb-6">Complete Your Profile</h2>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 block w-full rounded-md border px-3 py-2 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email || ""}
            readOnly
            contentEditable={false}
            required
            disabled
            className="mt-2 block w-full rounded-md border px-3 py-2 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-900"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="mt-2 block w-full rounded-md border px-3 py-2 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
            className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-semibold text-gray-900 hover:underline"
        >
          Logout
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Save"}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </form>
  );
}
