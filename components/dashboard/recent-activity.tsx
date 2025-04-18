import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Zap } from "lucide-react"

interface Activity {
  id: string
  type: "question" | "achievement" | "streak"
  title: string
  timestamp: string
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "question":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "achievement":
        return <Award className="w-4 h-4 text-yellow-400" />
      case "streak":
        return <Zap className="w-4 h-4 text-purple-400" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-400" />
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700">
            <div className="mt-0.5">{getIcon(activity.type)}</div>
            <div>
              <p className="text-sm text-white">{activity.title}</p>
              <p className="text-xs text-zinc-400">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
