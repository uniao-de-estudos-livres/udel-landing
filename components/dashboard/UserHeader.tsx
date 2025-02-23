import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Trophy, Star, Target, Coins } from 'lucide-react'

interface UserStats {
  level: number
  xp: number
  nextLevelXp: number
  achievements: number
  rank: string
  streak: number
  coins: number
}

interface UserHeaderProps {
  name: string
  avatar: string
  stats: UserStats
}

export function UserHeader({ name, avatar, stats }: UserHeaderProps) {
  const xpProgress = (stats.xp / stats.nextLevelXp) * 100

  return (
    <div className="h-[40vh] bg-gradient-to-b from-purple-500/20 to-transparent p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-6">
          <div className="relative">
            <img 
              src={avatar} 
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-purple-500"
            />
            <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              {stats.level}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
            <div className="flex items-center gap-2 text-zinc-400 mb-4">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>{stats.rank}</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              <Star className="w-4 h-4 text-purple-400" />
              <span>{stats.achievements} conquistas</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              <Target className="w-4 h-4 text-purple-400" />
              <span>{stats.streak} dias seguidos</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              <Coins className="w-4 h-4 text-yellow-400" />
              <span>{stats.coins} moedas</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Nível {stats.level}</span>
                <span className="text-purple-400">{stats.xp} / {stats.nextLevelXp} XP</span>
              </div>
              <Progress value={xpProgress} className="h-3" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
          <Card className="bg-zinc-800/50 border-purple-500/20 p-4">
            <div className="text-2xl font-bold text-white mb-1">42</div>
            <div className="text-sm text-zinc-400">Questões resolvidas hoje</div>
          </Card>
          <Card className="bg-zinc-800/50 border-purple-500/20 p-4">
            <div className="text-2xl font-bold text-white mb-1">85%</div>
            <div className="text-sm text-zinc-400">Taxa de acerto</div>
          </Card>
          <Card className="bg-zinc-800/50 border-purple-500/20 p-4">
            <div className="text-2xl font-bold text-white mb-1">3</div>
            <div className="text-sm text-zinc-400">Conquistas pendentes</div>
          </Card>
          <Card className="bg-zinc-800/50 border-purple-500/20 p-4">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.coins}</div>
            <div className="text-sm text-zinc-400">Moedas disponíveis</div>
          </Card>
        </div>
      </div>
    </div>
  )
}

