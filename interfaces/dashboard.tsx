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
