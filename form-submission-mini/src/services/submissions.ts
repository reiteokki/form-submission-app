import { useAuthStore } from "@/store/userStore";

export async function createSubmission({
  name,
  email,
  phone,
  image,
}: {
  name: string;
  email: string;
  phone: string;
  image: File;
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone_number", phone);
  formData.append("image", image);

  const token = useAuthStore.getState().accessToken;

  const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetch(`${API_URL}/customers/submit`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to submit form");
  }

  return data;
}
