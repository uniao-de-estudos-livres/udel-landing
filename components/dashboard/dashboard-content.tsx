"use client"

import { useState } from "react"
import { UserHeader } from "@/components/dashboard/user-header"
import { EventsList } from "@/components/dashboard/events-list"
import { Statistics } from "@/components/dashboard/statistics"
import { QuestionRecommendations } from "@/components/dashboard/question-recommendations"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StudyProgress } from "@/components/dashboard/study-progress"

const mockData = {
  user: {
    name: "Astah",
    avatar: "/placeholder.svg?height=96&width=96",
    stats: {
      level: 15,
      xp: 8824,
      nextLevelXp: 10000,
      achievements: 42,
      rank: "Mestre do Conhecimento",
      streak: 7,
      coins: 1500,
    },
  },
  events: [
    {
      id: "1",
      title: "Codeforces Round #888 (Div. 3)",
      date: "2023-08-02",
      time: "15:00",
      duration: "2h",
      description: "A programming contest on Codeforces.",
    },
    {
      id: "2",
      title: "LeetCode Biweekly Contest 110",
      date: "2023-08-05",
      time: "10:30",
      duration: "1h30",
      description: "A programming contest on LeetCode.",
    },
  ],
  statistics: {
    questionsAnswered: 520,
    correctAnswers: 480,
    accuracy: 92.3,
    timeSpentLearning: "32h 47m",
  },
  recommendations: [
    {
      id: "1",
      title: "Estruturas de Dados Avançadas",
      description: "Aprenda sobre árvores balanceadas e grafos.",
      lastReviewed: "2 semanas atrás",
      questionCount: 15,
    },
    {
      id: "2",
      title: "Algoritmos de Ordenação",
      description: "Revise quicksort, mergesort e heapsort.",
      lastReviewed: "1 mês atrás",
      questionCount: 20,
    },
  ],
  recentActivities: [
    {
      id: "1",
      type: "question",
      title: "Completou 10 questões de Matemática",
      timestamp: "Hoje, 14:30",
    },
    {
      id: "2",
      type: "achievement",
      title: "Desbloqueou conquista: Estudante Dedicado",
      timestamp: "Ontem, 18:45",
    },
    {
      id: "3",
      type: "streak",
      title: "Manteve sequência de estudos por 7 dias",
      timestamp: "3 dias atrás",
    },
  ],
  studyProgress: {
    daily: 85,
    weekly: 70,
    monthly: 65,
    subjects: [
      { name: "Matemática", progress: 75 },
      { name: "Física", progress: 60 },
      { name: "Programação", progress: 90 },
    ],
  },
}

export function DashboardContent() {
  const [data] = useState(mockData)

  return (
    <div className="min-h-screen bg-zinc-950">
      <UserHeader name={data.user.name} avatar={data.user.avatar} stats={data.user.stats} />
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Statistics stats={data.statistics} />
            <QuestionRecommendations recommendations={data.recommendations} />
            <StudyProgress progress={data.studyProgress} />
          </div>
          <div className="space-y-6">
            <EventsList events={data.events} />
            <RecentActivity activities={data.recentActivities} />
          </div>
        </div>
      </main>
    </div>
  )
}
