import API_URL from "../lib/api";
import type { SignupFormData } from "../schemas/auth/signupSchema";

export interface SignupResponse {
  message: string;
}

export async function signup(
  data: SignupFormData,
): Promise<SignupResponse> {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to create account");
  }

  return result;
}