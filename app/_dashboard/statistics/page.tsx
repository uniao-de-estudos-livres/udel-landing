"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Clock, Trophy, Target, Zap, BookOpen, Users, Star, TrendingUp } from "lucide-react"
import { CustomCalendar } from "@/components/ui/custom-calendar"
import { Button } from "@/components/ui/button"
import { useNotification } from "@/components/ui/notifications"

// Mock data - replace with actual API call in production
const fetchUserStatistics = (): Promise<UserStatistics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalXP: 15000,
        level: 25,
        questionsAnswered: 500,
        accuracy: 85,
        streak: 30,
        timeStudied: 120, // in hours
        subjectsStudied: 8,
        achievements: 15,
        ranking: 350,
        totalUsers: 10000,
        improvedSubjects: ["Matemática", "Física", "Química"],
        activityDates: [
          new Date(2024, 0, 1),
          new Date(2024, 0, 2),
          new Date(2024, 0, 3),
          new Date(2024, 0, 5),
          new Date(2024, 0, 8),
          new Date(2024, 0, 9),
          new Date(2024, 0, 10),
          new Date(2023, 11, 28),
          new Date(2023, 11, 29),
          new Date(2023, 11, 30),
        ],
      })
    }, 500)
  })
}

interface UserStatistics {
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

export default function StatisticsPage() {
  const [stats, setStats] = useState<UserStatistics | null>(null)
  const notification = useNotification()

  useEffect(() => {
    fetchUserStatistics().then(setStats)
  }, [])

  const handleTestNotification = () => {
    notification.success("Estatísticas Atualizadas", "Suas estatísticas foram atualizadas com sucesso!")
  }

  if (!stats) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pl-16">
        <main className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Suas Estatísticas</h1>
            <Button onClick={handleTestNotification}>Testar Notificação</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-zinc-900/50 border-purple-500/20 col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Calendário de Atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <CustomCalendar activityDates={stats.activityDates} />
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">XP Total</CardTitle>
                <Brain className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalXP.toLocaleString()}</div>
                <p className="text-xs text-zinc-400">Nível {stats.level}</p>
                <Progress value={(stats.totalXP % 1000) / 10} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-zinc-900/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Questões Respondidas</CardTitle>
                <BookOpen className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.questionsAnswered}</div>
                <p className="text-xs text-zinc-400">Taxa de acerto: {stats.accuracy}%</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sequência de Dias</CardTitle>
                <Zap className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.streak} dias</div>
                <p className="text-xs text-zinc-400">Continue assim!</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Total de Estudo</CardTitle>
                <Clock className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.timeStudied} horas</div>
                <p className="text-xs text-zinc-400">Dedicação é a chave do sucesso!</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Matérias Estudadas</CardTitle>
                <Target className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.subjectsStudied}</div>
                <p className="text-xs text-zinc-400">Diversidade de conhecimento</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
                <Trophy className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.achievements}</div>
                <p className="text-xs text-zinc-400">Suas realizações importam!</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ranking Global</CardTitle>
                <Users className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#{stats.ranking}</div>
                <p className="text-xs text-zinc-400">De {stats.totalUsers} usuários</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Matérias Mais Melhoradas</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {stats.improvedSubjects.map((subject, index) => (
                    <li key={index} className="text-sm">
                      {subject}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900/50 border-purple-500/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Média de Acertos</CardTitle>
                <Star className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.accuracy}%</div>
                <Progress value={stats.accuracy} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
