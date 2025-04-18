import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import type { Event } from "@/interfaces/dashboard"

interface EventsListProps {
  events: Event[]
}

export function EventsList({ events }: EventsListProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Eventos Disponíveis</span>
          <Badge variant="outline" className="bg-zinc-800 text-zinc-200">
            {events.length} eventos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg bg-zinc-800 border border-zinc-700">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-700 text-zinc-200 font-medium text-sm">
              {event.date}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white mb-1">{event.title}</h3>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Clock className="w-3 h-3" />
                <span>{event.time}</span>
                <span className="text-zinc-600">•</span>
                <span>{event.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
