import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full text-center z-10">
        <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-gray-200 mb-8">
          Ops! Parece que você se aventurou em território desconhecido.
          Não se preocupe, até os melhores exploradores às vezes se perdem.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" /> Voltar ao Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar à página inicial
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/50 to-black pointer-events-none" />
    </div>
  )
}
