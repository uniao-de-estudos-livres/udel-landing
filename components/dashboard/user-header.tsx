import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, Coins } from "lucide-react"

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
    <div className="bg-zinc-900 border-b border-zinc-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-6">
          <img
            src={avatar || "/placeholder.svg"}
            alt={name}
            className="w-20 h-20 rounded-full border-2 border-purple-500"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">{name}</h1>
            <div className="flex items-center gap-2 text-zinc-400 mb-4 flex-wrap">
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
                <span className="text-purple-400">
                  {stats.xp} / {stats.nextLevelXp} XP
                </span>
              </div>
              <Progress value={xpProgress} className="h-2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="text-xl font-bold text-white mb-1">42</div>
            <div className="text-sm text-zinc-400">Questões hoje</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="text-xl font-bold text-white mb-1">85%</div>
            <div className="text-sm text-zinc-400">Taxa de acerto</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="text-xl font-bold text-white mb-1">3</div>
            <div className="text-sm text-zinc-400">Conquistas pendentes</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="text-xl font-bold text-white mb-1">{stats.coins}</div>
            <div className="text-sm text-zinc-400">Moedas disponíveis</div>
          </div>
        </div>
      </div>
    </div>
  )
}
