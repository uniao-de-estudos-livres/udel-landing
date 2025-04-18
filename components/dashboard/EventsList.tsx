import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from 'lucide-react'

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

interface EventsListProps {
  events: Event[]
}

export function EventsList({ events }: EventsListProps) {
  return (
    <Card className="bg-zinc-800/50 border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Eventos Disponíveis</span>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
            {events.length} eventos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900/50 border border-purple-500/10 hover:border-purple-500/30 transition-colors"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 font-bold">
              {event.date}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1">{event.title}</h3>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                  <span className="text-zinc-600">•</span>
                  <span>{event.duration}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
            {event.registered && (
              <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
                Registrado
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
