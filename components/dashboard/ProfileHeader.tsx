import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Clock, Calendar, Trophy } from 'lucide-react'

interface ProfileHeaderProps {
  name: string
  avatar: string
  stats: {
    timeStudied: string
    streak: number
    level: number
  }
}

export function ProfileHeader({ name, avatar, stats }: ProfileHeaderProps) {
  return (
    <div className="w-full bg-zinc-900/50 border-b border-purple-500/20 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-2 border-purple-500">
            <AvatarImage src={avatar} />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Boa noite, {name}!
            </h1>
            <p className="text-zinc-400">Nível {stats.level}</p>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto">
          <Card className="bg-zinc-800/50 border-purple-500/20 p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm text-zinc-400">Tempo estudado hoje</p>
              <p className="text-lg font-semibold text-white">{stats.timeStudied}</p>
            </div>
          </Card>
          <Card className="bg-zinc-800/50 border-purple-500/20 p-4 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm text-zinc-400">Sequência de dias</p>
              <p className="text-lg font-semibold text-white">{stats.streak} dias</p>
            </div>
          </Card>
          <Card className="bg-zinc-800/50 border-purple-500/20 p-4 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm text-zinc-400">Próximo nível</p>
              <div className="w-full h-2 bg-zinc-700 rounded-full mt-1">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
