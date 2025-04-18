import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, PenTool, PlayCircle } from 'lucide-react'
import Link from "next/link"

export function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link href="/questions">
        <Card className="bg-zinc-800/50 border-purple-500/20 hover:bg-zinc-800 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Questões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400">
              Encontre mais de 200 mil questões em áreas de conhecimento diversos.
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/exams">
        <Card className="bg-zinc-800/50 border-purple-500/20 hover:bg-zinc-800 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-purple-400" />
              Provas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400">
              Faça provas de anos anteriores e chegue mais perto do seu objetivo.
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/video-lessons">
        <Card className="bg-zinc-800/50 border-purple-500/20 hover:bg-zinc-800 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-purple-400" />
              Videoaulas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400">
              Aprenda mais vendo videoaulas com os melhores professores.
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
