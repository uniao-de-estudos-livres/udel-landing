// Tipo para usuário mockado
export interface MockUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

// Usuários mockados para teste
const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Usuário de Teste",
    email: "teste@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "user",
  },
  {
    id: "2",
    name: "Admin de Teste",
    email: "admin@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "admin",
  },
  {
    id: "3",
    name: "Professor de Teste",
    email: "professor@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "teacher",
  },
  {
    id: "4",
    name: "Estudante de Teste",
    email: "estudante@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "student",
  },
]

// Configuração para controlar o comportamento do mock
export const mockConfig = {
  // Define se o serviço de autenticação mockado está ativo
  enabled: false, // Set to false to disable mock and enable real auth/hCaptcha
  // Define se deve simular erros de autenticação
  simulateErrors: false,
  // Define o atraso em ms para simular chamadas de API
  delay: 800,
}

// Função para simular uma chamada de API com atraso
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

// Serviço de autenticação mockado
export const MockAuthService = {
  // Login mockado
  async login(email: string, password: string): Promise<{ user: MockUser; token: string }> {
    console.log("[MockAuthService] Login attempt:", { email, password });

    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      // Simulate failure if user not found in mock list
      return simulateApiCall({
        user: mockUsers[0], // This line might be problematic if user not found should fail
        token: "mock-token-" + Date.now()
      }, true); // Force failure simulation
    }

    return simulateApiCall({
      user,
      token: "mock-token-" + Date.now()
    });
  },

  // Verificação de autenticação mockada
  async checkAuth(): Promise<MockUser | null> {
    console.log("[MockAuthService] Checking authentication");

    if (typeof window === 'undefined') {
      return Promise.resolve(null);
    }

    const hasToken = localStorage.getItem("mock_auth_token");

    if (!hasToken) {
      return simulateApiCall(null);
    }

    // Simulate finding a user based on a mock token if needed, or just return first user
    return simulateApiCall(mockUsers[0]);
  },

  // Logout mockado
  async logout(): Promise<void> {
    console.log("[MockAuthService] Logout");

    if (typeof window !== 'undefined') {
      localStorage.removeItem("mock_auth_token");
    }

    return simulateApiCall(undefined);
  },

  // Registro mockado
  async register(name: string, email: string, password: string): Promise<{ user: MockUser; token: string }> {
    console.log("[MockAuthService] Register:", { name, email, password });

    const newUser: MockUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      role: "user",
    };

    return simulateApiCall({
      user: newUser,
      token: "mock-token-" + Date.now()
    });
  },

  // Função para mostrar toast de feature desativada
  showFeatureDisabledToast(featureName: string): void {
    console.log(`[Toast] Feature Desativada: A funcionalidade "${featureName}" está temporariamente desativada para fins de desenvolvimento.`);
  }
};

// Exportar também como mockAuthService para compatibilidade
export const mockAuthService = MockAuthService;
