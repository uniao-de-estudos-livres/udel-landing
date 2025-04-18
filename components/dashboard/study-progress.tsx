import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen } from "lucide-react"

interface Subject {
  name: string
  progress: number
}

interface StudyProgressData {
  daily: number
  weekly: number
  monthly: number
  subjects: Subject[]
}

interface StudyProgressProps {
  progress: StudyProgressData
}

export function StudyProgress({ progress }: StudyProgressProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          Progresso de Estudo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-zinc-400">Progresso diário</span>
                <span className="text-sm text-zinc-400">{progress.daily}%</span>
              </div>
              <Progress value={progress.daily} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-zinc-400">Progresso semanal</span>
                <span className="text-sm text-zinc-400">{progress.weekly}%</span>
              </div>
              <Progress value={progress.weekly} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-zinc-400">Progresso mensal</span>
                <span className="text-sm text-zinc-400">{progress.monthly}%</span>
              </div>
              <Progress value={progress.monthly} className="h-2" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-3">Progresso por matéria</h3>
            <div className="space-y-3">
              {progress.subjects.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-400">{subject.name}</span>
                    <span className="text-sm text-zinc-400">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
