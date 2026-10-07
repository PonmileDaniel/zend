import { API_URL_TRANSFER } from "../lib/api";

export interface RecipientResponse {
  firstName: string;
  lastName: string;
}

export interface TransferRequest {
  to: string;
  amount: number;
  description: string;
  pin: string;
}

export async function getRecipient(
  accountNumber: string,
): Promise<RecipientResponse> {
  const response = await fetch(
    `${API_URL_TRANSFER}/recipient?accountNumber=${encodeURIComponent(accountNumber)}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Recipient not found");
  }
  return response.json();
}

export async function transferMoney(request: TransferRequest): Promise<string> {
  const response = await fetch(`${API_URL_TRANSFER}/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request),
  });

  ///////////////////////////////////////Work on theis let it be a json
  const result = await response.text();
  if (!response.ok) {
    throw new Error(result);
  }
  return result;
}
