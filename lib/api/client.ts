import { AuthService, type AuthResponse } from "@/lib/api/auth.service";

const authService = new AuthService();

export const authClient = {
  signInWithGoogle: (): Promise<AuthResponse> => authService.signInWithGoogle(),
  signUpWithGoogle: (): Promise<AuthResponse> => authService.signUpWithGoogle(),
  fetchGoogleProfile: (token: string) => authService.fetchGoogleProfile(token),
};
