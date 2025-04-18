// Interfaces de autenticação
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// Interfaces de dashboard
export interface Event {
  id: string
  title: string
  date: string
  time: string
  duration: string
  description: string
}

export interface Statistics {
  questionsAnswered: number
  correctAnswers: number
  accuracy: number
  timeSpentLearning: string
}

export interface Recommendation {
  id: string
  title: string
  description: string
  lastReviewed: string
  questionCount: number
}

// Interfaces de questões
export interface Question {
  id: number
  subject: string
  introduction?: string
  text: string
  image?: string
  options: string[]
  correctAnswer: number
}

// Interfaces de usuário
export interface UserStats {
  level: number
  xp: number
  nextLevelXp: number
  achievements: number
  rank: string
  streak: number
  coins: number
}

export interface UserCustomizations {
  particleEffect: boolean
  profileBanner: string
  avatarFrame: string
}

export interface UserProfile {
  name: string
  avatar: string
  stats: UserStats
  customizations: UserCustomizations
}

export interface UserStatistics {
  totalXP: number
  level: number
  questionsAnswered: number
  accuracy: number
  streak: number
  timeStudied: number
  subjectsStudied: number
  achievements: number
  ranking: number
  totalUsers: number
  improvedSubjects: string[]
  activityDates: Date[]
}

export type TagType = "admin" | "staff" | "beta" | "doador"

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
}

export interface Activity {
  icon: string
  description: string
  timestamp: string
}

export interface StudyStats {
  questionsAnswered: number
  totalQuestions: number
  accuracy: number
  studyTime: number
  studyGoal: number
}
