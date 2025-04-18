import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Recommendation } from "@/interfaces/dashboard"

interface QuestionRecommendationsProps {
  recommendations: Recommendation[]
}

export function QuestionRecommendations({ recommendations }: QuestionRecommendationsProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Recomendações de Revisão</span>
          <Badge variant="outline" className="bg-zinc-800 text-zinc-200">
            {recommendations.length} tópicos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-center justify-between p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          >
            <div>
              <h3 className="font-medium text-white mb-1">{rec.title}</h3>
              <p className="text-xs text-zinc-400">{rec.description}</p>
              <p className="text-xs text-zinc-500 mt-1">Última revisão: {rec.lastReviewed}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-zinc-700 text-zinc-200">
                {rec.questionCount} questões
              </Badge>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
