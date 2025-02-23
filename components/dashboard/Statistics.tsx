import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Clock, Target } from 'lucide-react'

interface StatisticsProps {
  stats: {
    questionsAnswered: number
    averageTime: string
    accuracy: number
  }
}

export function Statistics({ stats }: StatisticsProps) {
  return (
    <Card className="bg-zinc-800/50 border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-purple-400" />
          Minhas estatísticas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Questões no período</p>
              <p className="text-2xl font-bold text-white">{stats.questionsAnswered}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Tempo médio</p>
              <p className="text-2xl font-bold text-white">{stats.averageTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Taxa de acerto</p>
              <p className="text-2xl font-bold text-white">{stats.accuracy}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

