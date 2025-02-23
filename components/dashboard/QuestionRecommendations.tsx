import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from 'lucide-react'

interface Recommendation {
  id: number
  topic: string
  lastReviewed: string
  questionCount: number
}

interface QuestionRecommendationsProps {
  recommendations: Recommendation[]
}

export function QuestionRecommendations({ recommendations }: QuestionRecommendationsProps) {
  return (
    <Card className="bg-zinc-800/50 border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recomendações de Revisão</span>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
            {recommendations.length} tópicos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-purple-500/10 hover:border-purple-500/30 transition-colors"
          >
            <div>
              <h3 className="font-semibold text-white mb-1">{rec.topic}</h3>
              <p className="text-sm text-zinc-400">Última revisão: {rec.lastReviewed}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{rec.questionCount} questões</Badge>
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

