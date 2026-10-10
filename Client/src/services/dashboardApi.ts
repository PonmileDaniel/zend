import { API_URL_DASHBOARD } from "../lib/api";

export interface DashboardTransaction {
  name: string;
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
  transactionPinConfigured: boolean;
}

export interface TransactionPinRequest {
  pin: string;
  confirmPin: string;
}

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await fetch(API_URL_DASHBOARD, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to load dashboard");
  }

  return result;
}

export async function setTransactionPin(
  request: TransactionPinRequest,
): Promise<void> {
  const response = await fetch(`${API_URL_DASHBOARD}/transaction-pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to set transaction PIN");
  }
}
