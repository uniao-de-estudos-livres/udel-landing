import { Footer } from "@/components/landing/footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-4">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
            Política de Privacidade
          </h1>
          <p className="text-xl text-zinc-400">
            Sua privacidade é importante para nós.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-8 space-y-6">
          <h2>1. Coleta de Informações</h2>
          <p>
            Coletamos informações que você nos fornece diretamente ao se cadastrar, como nome, email e senha (armazenada de forma segura com hash). Também podemos coletar informações de uso da plataforma para melhorar nossos serviços.
          </p>

          <h2>2. Uso das Informações</h2>
          <p>
            Utilizamos suas informações para operar e manter a plataforma, personalizar sua experiência, enviar comunicações importantes (como códigos de verificação) e analisar o uso para aprimoramento contínuo. Não compartilhamos suas informações pessoais com terceiros sem o seu consentimento, exceto quando exigido por lei.
          </p>

          <h2>3. Segurança</h2>
          <p>
            Empregamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração ou destruição. Isso inclui o uso de hashing para senhas e outras práticas recomendadas.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Podemos usar cookies essenciais para o funcionamento da plataforma (como gerenciamento de sessão). Não utilizamos cookies de rastreamento de terceiros para publicidade.
          </p>

          <h2>5. Seus Direitos</h2>
          <p>
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Entre em contato conosco se desejar exercer esses direitos.
          </p>

          <h2>6. Alterações na Política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através da plataforma ou por email.
          </p>

          <h2>7. Contato</h2>
          <p>
            Se tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através da nossa página de Contato.
          </p>

          <p className="text-sm text-zinc-500">Última atualização: 18 de Abril de 2025</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
