import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-purple-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-zinc-300 mb-8">
          Ops! Parece que você se aventurou em território desconhecido. 
          Não se preocupe, até os melhores exploradores às vezes se perdem.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="bg-purple-500 hover:bg-purple-600">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" /> Voltar ao Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-400/20">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar à página inicial
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/30 to-black pointer-events-none" />
    </div>
  )
}
