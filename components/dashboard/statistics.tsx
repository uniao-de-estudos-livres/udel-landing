import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Clock, Target } from "lucide-react"
import type { Statistics as StatsInterface } from "@/interfaces/dashboard"

interface StatisticsProps {
  stats: StatsInterface
}

export function Statistics({ stats }: StatisticsProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <PieChart className="w-5 h-5 text-purple-400" />
          Minhas estatísticas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Questões respondidas</p>
              <p className="text-xl font-bold text-white">{stats.questionsAnswered}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Tempo de estudo</p>
              <p className="text-xl font-bold text-white">{stats.timeSpentLearning}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Taxa de acerto</p>
              <p className="text-xl font-bold text-white">{stats.accuracy}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
