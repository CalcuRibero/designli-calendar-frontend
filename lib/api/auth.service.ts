import type { GoogleUserProfile } from "@/lib/types/auth";

export interface AuthResponse {
  token: string;
  user?: GoogleUserProfile;
}

export class AuthService {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    const apiUrl = (baseUrl ?? process.env.DESIGNLI_CALENDAR_API ?? "").replace(/\/+$/, "");
    this.baseUrl = apiUrl ? `${apiUrl}/auth` : "";
  }

  private ensureBaseUrl(): void {
    if (!this.baseUrl) {
      throw new Error("Missing DESIGNLI_CALENDAR_API environment variable.");
    }
  }

  private async request<T>(path: string, body: Record<string, unknown>): Promise<T> {
    this.ensureBaseUrl();

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Auth request failed with status ${response.status}: ${errorText}`);
    }

    return response.json();
  }

  async signInWithGoogle(): Promise<AuthResponse> {
    return this.request<AuthResponse>("/sign-in", { provider: "google" });
  }

  async signUpWithGoogle(): Promise<AuthResponse> {
    return this.request<AuthResponse>("/sign-up", { provider: "google" });
  }

  async fetchGoogleProfile(token: string): Promise<GoogleUserProfile> {
    this.ensureBaseUrl();

    const response = await fetch(`${this.baseUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Profile request failed with status ${response.status}: ${errorText}`);
    }

    return response.json();
  }
}
