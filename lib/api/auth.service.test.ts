import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthService } from "@/lib/api/auth.service";

describe("AuthService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends a sign-in request to the configured auth endpoint", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: "test-token" }),
      }) as Promise<Response>,
    );

    vi.stubGlobal("fetch", fetchMock);

    const service = new AuthService("https://api.example.com");
    const response = await service.signInWithGoogle();

    expect(response.token).toBe("test-token");
    expect(fetchMock).toHaveBeenCalledWith("https://api.example.com/auth/sign-in", expect.objectContaining({
      method: "POST",
    }));
  });

  it("throws when the API base URL is missing", async () => {
    const service = new AuthService("");

    await expect(service.signInWithGoogle()).rejects.toThrow("Missing DESIGNLI_CALENDAR_API environment variable.");
  });
});
