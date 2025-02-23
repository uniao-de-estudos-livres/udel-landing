'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from "@/components/layout/sidebar"
import { UserHeader } from "@/components/dashboard/UserHeader"
import { EventsList } from "@/components/dashboard/EventsList"
import { Statistics } from "@/components/dashboard/Statistics"
import { QuestionRecommendations } from "@/components/dashboard/QuestionRecommendations"

// Tipos para os dados da API
interface UserData {
  name: string
  avatar: string
  stats: {
    level: number
    xp: number
    nextLevelXp: number
    achievements: number
    rank: string
    streak: number
    coins: number
  }
}

interface Event {
  id: number
  title: string
  type: 'challenge' | 'exam' | 'meetup'
  date: string
  time: string
  duration: string
  location?: string
  registered?: boolean
}

interface Statistics {
  questionsAnswered: number
  averageTime: string
  accuracy: number
}

interface Recommendation {
  id: number
  topic: string
  lastReviewed: string
  questionCount: number
}

// Funções de mock para simular chamadas à API
const fetchUserData = (): Promise<UserData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Astah",
        avatar: "/placeholder.svg?height=96&width=96",
        stats: {
          level: 15,
          xp: 8824,
          nextLevelXp: 10000,
          achievements: 42,
          rank: "Mestre do Conhecimento",
          streak: 7,
          coins: 1500
        }
      })
    }, 500)
  })
}

const fetchEvents = (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Desafio: Maratona de Questões",
          type: "challenge",
          date: "14 DEZ",
          time: "12:00",
          duration: "24h",
          registered: true
        },
        {
          id: 2,
          title: "Simulado ENEM 2024",
          type: "exam",
          date: "16 DEZ",
          time: "08:00",
          duration: "5h",
          location: "Online"
        },
        {
          id: 3,
          title: "Grupo de Estudos: Matemática",
          type: "meetup",
          date: "18 DEZ",
          time: "14:00",
          duration: "2h",
          location: "Sala Virtual 3"
        }
      ])
    }, 500)
  })
}

const fetchStatistics = (): Promise<Statistics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        questionsAnswered: 150,
        averageTime: "2m 30s",
        accuracy: 75
      })
    }, 500)
  })
}

const fetchRecommendations = (): Promise<Recommendation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, topic: "Matemática Básica", lastReviewed: "2 semanas atrás", questionCount: 20 },
        { id: 2, topic: "Física Mecânica", lastReviewed: "1 mês atrás", questionCount: 15 },
        { id: 3, topic: "Gramática", lastReviewed: "3 semanas atrás", questionCount: 25 }
      ])
    }, 500)
  })
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    const loadDashboardData = async () => {
      const [user, eventsList, stats, recs] = await Promise.all([
        fetchUserData(),
        fetchEvents(),
        fetchStatistics(),
        fetchRecommendations()
      ])

      setUserData(user)
      setEvents(eventsList)
      setStatistics(stats)
      setRecommendations(recs)
    }

    loadDashboardData()
  }, [])

  if (!userData || !statistics) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Sidebar />
      <div className="pl-16 h-screen overflow-y-auto">
        <UserHeader 
          name={userData.name}
          avatar={userData.avatar}
          stats={userData.stats}
        />
        <main className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <Statistics stats={statistics} />
              <QuestionRecommendations recommendations={recommendations} />
            </div>
            <div>
              <EventsList events={events} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

