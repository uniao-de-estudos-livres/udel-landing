import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  const discordUrl = "https://discord.gg/NUtQEtuW";

  const discordUrl = "https://discord.gg/NUtQEtuW";

  return (
    <footer className="bg-black border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 flex flex-col items-center text-center">
            <Link href="/" className="w-24 h-24 mb-4 block" aria-label="Página Inicial">
            <Link href="/" className="w-24 h-24 mb-4 block" aria-label="Página Inicial">
              <Logo variant="white" />
            </Link>
            </Link>
            <p className="text-zinc-400 mt-4 text-sm">
              Unindo Desenvolvimento e Evolução na Aprendizagem
            </p>
            <div className="flex space-x-4 mt-6">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Github, href: "#", label: "GitHub" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-zinc-400 hover:text-purple-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2">
              {[
                { name: "Recursos", href: "#" },
                // { name: "Questões", href: "/questions" }, // Link desativado
                // { name: "Estatísticas", href: "/statistics" }, // Link desativado
                // { name: "Questões", href: "/questions" }, // Link desativado
                // { name: "Estatísticas", href: "/statistics" }, // Link desativado
                { name: "Clubes", href: "#" },
                { name: "Eventos", href: "#" },
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-zinc-400 hover:text-purple-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              {[
                { name: "FAQ", href: "/faq" },
                { name: "Contato", href: "/contact" },
                { name: "Reportar Bug", href: "#" },
                { name: "Sugerir Recurso", href: "#" },
                { name: "Política de Privacidade", href: "/privacy" },
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-zinc-400 hover:text-purple-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Comunidade</h3>
            <ul className="space-y-2">
              {[
                { name: "Discord", href: discordUrl },
                { name: "Blog", href: "#" },
                { name: "Contribuir", href: "#" },
                // { name: "Doações", href: "/donations" }, // Link desativado
                // { name: "Doações", href: "/donations" }, // Link desativado
                { name: "Parceiros", href: "#" },
              ].filter(Boolean).map((link, index) => ( // filter(Boolean) para remover nulos se comentar itens
                  <li key={link.name}> {/* Use link.name for key */}
                    <Link href={link.href} className="text-zinc-400 hover:text-purple-400 transition-colors text-sm" target={link.name === 'Discord' ? '_blank' : undefined} rel={link.name === 'Discord' ? 'noopener noreferrer' : undefined}>
                      {link.name}
                    </Link>
                  </li>
              ].filter(Boolean).map((link, index) => ( // filter(Boolean) para remover nulos se comentar itens
                  <li key={link.name}> {/* Use link.name for key */}
                    <Link href={link.href} className="text-zinc-400 hover:text-purple-400 transition-colors text-sm" target={link.name === 'Discord' ? '_blank' : undefined} rel={link.name === 'Discord' ? 'noopener noreferrer' : undefined}>
                      {link.name}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Udel. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-zinc-500 hover:text-purple-400 text-sm transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-purple-400 text-sm transition-colors">
            <Link href="/privacy" className="text-zinc-500 hover:text-purple-400 text-sm transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-purple-400 text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
