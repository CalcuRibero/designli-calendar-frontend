import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { clearSessionToken, getSessionToken, hasSession, setSessionToken } from "@/lib/auth/session";

describe("session storage utilities", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("stores and retrieves the session token", () => {
    setSessionToken("token-123");

    expect(getSessionToken()).toBe("token-123");
    expect(hasSession()).toBe(true);
  });

  it("clears the session token", () => {
    setSessionToken("token-123");
    clearSessionToken();

    expect(getSessionToken()).toBeNull();
    expect(hasSession()).toBe(false);
  });
});
