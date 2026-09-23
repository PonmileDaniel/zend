import {API_URL_DASHBOARD } from "../lib/api";

export interface DashboardTransaction {
  reference: string;
  description: string;
  amount: number;
  transactionType: string;
  direction: "INWARD" | "OUTWARD";
  status: string;
  timestamp: string;
}

export interface DashboardResponse {
  accountNumber: string;
  balance: number;
  recentTransactions: DashboardTransaction[];
}


export async function getDashboard(): Promise<DashboardResponse> {
  const response = await fetch(API_URL_DASHBOARD , {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to load dashboard");
  }

  return result;
}