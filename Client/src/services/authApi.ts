import API_URL from "../lib/api";
import type { SignupFormData } from "../schemas/auth/signupSchema";

export interface SignupResponse {
  message: string;
}

export interface VerifyOtpResponse {
  message: string;
}

export interface OtpResponse {
  message: string;
}


export async function signup(data: SignupFormData): Promise<SignupResponse> {
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

export async function verifyOtp(
  email: string,
  otp: string,
): Promise<VerifyOtpResponse> {
  const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Invalid verification code");
  }
  return result;
}

export async function resendOtp(email: string): Promise<OtpResponse> {
  const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to resend verification code");
  }
  return result;
}