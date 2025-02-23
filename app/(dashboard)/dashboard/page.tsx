"use client"

import { useEffect, useState } from "react"
import { UserHeader } from "@/components/dashboard/UserHeader"
import { EventsList } from "@/components/dashboard/EventsList"
import { Statistics } from "@/components/dashboard/Statistics"
import { QuestionRecommendations } from "@/components/dashboard/QuestionRecommendations"

interface UserStats {
  level: number
  xp: number
  nextLevelXp: number
  achievements: number
  rank: string
  streak: number
  coins: number
}

interface UserData {
  name: string
  avatar: string
  stats: UserStats
}

interface Event {
  id: string
  title: string
  date: string
  location: string
}

interface Statistics {
  totalQuestions: number
  answeredQuestions: number
  correctAnswers: number
}

interface Recommendation {
  id: string
  question: string
  topic: string
}

const fetchUserData = async (): Promise<UserData> => {
  // Mock data for user
  return {
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
    stats:{
      xp: 10,
      level: 20,
      nextLevelXp: 21,
      rank: "20",
      achievements: 20,
      coins: 1,
      streak: 1000
    }
  }
}

const fetchEvents = async (): Promise<Event[]> => {
  // Mock data for events
  return [
    {
      id: "1",
      title: "React Meetup",
      date: "2024-03-15",
      location: "Online",
    },
    {
      id: "2",
      title: "Next.js Workshop",
      date: "2024-03-22",
      location: "In-person",
    },
  ]
}

const fetchStatistics = async (): Promise<Statistics> => {
  // Mock data for statistics
  return {
      totalQuestions: 500,
      answeredQuestions: 450,
      correctAnswers: 400,
  }
}

const fetchRecommendations = async (): Promise<Recommendation[]> => {
  // Mock data for recommendations
  return [
    {
      id: "1",
      question: "What is the difference between useState and useRef?",
      topic: "React Hooks",
    },
    {
      id: "2",
      question: "How does Next.js handle routing?",
      topic: "Next.js Routing",
    },
  ]
}

export default function DashboardPage() {
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
        fetchRecommendations(),
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
    <div className="min-h-screen bg-black">
      <UserHeader name={userData.name} avatar={userData.avatar} stats={userData.stats} />
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* <Statistics stats={userData.stats} /> */}
            {/* <QuestionRecommendations recommendations={recommendations} /> */}
          </div>
          <div>
            {/* <EventsList events={events} /> */}
          </div>
        </div>
      </main>
    </div>
  )
}

