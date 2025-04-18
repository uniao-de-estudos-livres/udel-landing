import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/ui/logo' // Assuming Logo component exists

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-white flex flex-col items-center justify-center p-4">
       <div className="w-24 h-24 mb-8">
         <Logo variant="white" />
       </div>
      <h1 className="text-8xl font-bold text-purple-400 mb-4 animate-pulse">404</h1>
      <h2 className="text-3xl font-semibold text-white mb-4">Página não encontrada</h2>
      <p className="text-zinc-400 text-center max-w-md mb-8">
        Ops! Parece que você se aventurou em território desconhecido.
        Não se preocupe, até os melhores exploradores às vezes se perdem.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Link para a página inicial (landing page) */}
        <Button asChild variant="outline" className="text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:text-white">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar à página inicial
          </Link>
        </Button>
        {/* Opcional: Link para o dashboard se o usuário puder estar logado */}
        {/* Você pode adicionar lógica aqui para mostrar este botão apenas se o usuário estiver autenticado */}
        {/* <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard">
             <Home className="mr-2 h-4 w-4" /> Voltar ao Dashboard
          </Link>
        </Button> */}
      </div>
    </div>
  )
}
