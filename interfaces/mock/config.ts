import type { MockUser } from "./user"; // Import MockUser type

// Mock users data
export const mockUsers: MockUser[] = [
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
];

// Configuration for mock behavior
export const mockConfig = {
  enabled: false, // Keep mock disabled
  simulateErrors: false,
  delay: 800,
};
