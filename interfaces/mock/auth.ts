import { mockUsers, mockConfig } from "./config"; // Import mock data and config
import type { MockUser } from "./user"; // Import MockUser type

// Helper function to simulate API calls
const simulateApiCall = <T>(data: T, shouldFail: boolean = false): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail || (mockConfig.simulateErrors && Math.random() > 0.7)) {
        reject(new Error("Erro simulado na API"));
      } else {
        resolve(data);
      }
    }, mockConfig.delay);
  });
};

// Mock authentication service object
export const MockAuthService = {
  async login(email: string, password: string): Promise<{ user: MockUser; token: string }> {
    console.log("[MockAuthService] Login attempt:", { email, password });
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return simulateApiCall({ user: mockUsers[0], token: "mock-token-" + Date.now() }, true);
    }
    return simulateApiCall({ user, token: "mock-token-" + Date.now() });
  },

  async checkAuth(): Promise<MockUser | null> {
    console.log("[MockAuthService] Checking authentication");
    if (typeof window === 'undefined') return Promise.resolve(null);
    const hasToken = localStorage.getItem("mock_auth_token");
    if (!hasToken) return simulateApiCall(null);
    return simulateApiCall(mockUsers[0]);
  },

  async logout(): Promise<void> {
    console.log("[MockAuthService] Logout");
    if (typeof window !== 'undefined') localStorage.removeItem("mock_auth_token");
    return simulateApiCall(undefined);
  },

  async register(name: string, email: string, password: string): Promise<{ user: MockUser; token: string }> {
    console.log("[MockAuthService] Register:", { name, email, password });
    const newUser: MockUser = { id: String(mockUsers.length + 1), name, email, role: "user" };
    return simulateApiCall({ user: newUser, token: "mock-token-" + Date.now() });
  },

  showFeatureDisabledToast(featureName: string): void {
    console.log(`[Toast] Feature Desativada: A funcionalidade "${featureName}" está temporariamente desativada.`);
  }
};

// Optional: Keep the alias export if it was used elsewhere
export const mockAuthService = MockAuthService;
