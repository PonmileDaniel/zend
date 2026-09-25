import { API_URL_TRANSFER } from "../lib/api";

export interface RecipientResponse {
  firstName: string;
  lastName: string;
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
