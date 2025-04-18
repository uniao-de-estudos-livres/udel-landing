"use client";

import { useState } from "react";
import { Footer } from "@/components/landing/footer";
// import { Header } from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, Copy, Loader2 } from "lucide-react";
import { useNotification } from "@/hooks/use-notification";
import { AuthService } from "@/services/auth-service";

// Define interface for form data
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactPage() {
  const notification = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const discordUrl = "https://discord.gg/NUtQEtuW"; // Updated Discord URL

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    if (!data.name || !data.email || !data.subject || !data.message) {
        notification.error("Erro", "Por favor, preencha todos os campos obrigatórios.");
        setIsSubmitting(false);
        return;
    }

    try {
      await AuthService.sendContactForm(data);
      notification.success("Mensagem Enviada!", "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.");
      event.currentTarget.reset();
    } catch (error: any) {
      console.error("Failed to send contact form:", error);
      notification.error("Erro", error.message || "Não foi possível enviar sua mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to copy email to clipboard
  const copyEmail = () => {
    const email = "suporte@udel.study";
    navigator.clipboard.writeText(email).then(() => {
      notification.success("Email Copiado!", "O email de suporte foi copiado para a área de transferência.");
    }).catch(err => {
      console.error('Failed to copy email: ', err);
      notification.error("Erro", "Não foi possível copiar o email.");
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Header /> */}
      <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-4">
            <Mail className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
            Entre em Contato
          </h1>
          <p className="text-xl text-zinc-400">
            Tem alguma dúvida, sugestão ou quer reportar um problema? Fale conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-zinc-300 mb-2 block">Nome</Label>
              <Input id="name" name="name" required disabled={isSubmitting} className="bg-zinc-900/50 border-zinc-800/50" />
            </div>
            <div>
              <Label htmlFor="email" className="text-zinc-300 mb-2 block">Email</Label>
              <Input id="email" name="email" type="email" required disabled={isSubmitting} className="bg-zinc-900/50 border-zinc-800/50" />
            </div>
            <div>
              <Label htmlFor="subject" className="text-zinc-300 mb-2 block">Assunto</Label>
              <Input id="subject" name="subject" required disabled={isSubmitting} className="bg-zinc-900/50 border-zinc-800/50" />
            </div>
            <div>
              <Label htmlFor="message" className="text-zinc-300 mb-2 block">Mensagem</Label>
              <Textarea id="message" name="message" rows={5} required disabled={isSubmitting} className="bg-zinc-900/50 border-zinc-800/50" />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <> <Send className="mr-2 h-4 w-4" /> Enviar Mensagem </>}
            </Button>
          </form>

          {/* Contact Info / Discord */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">Outras Formas de Contato</h3>
            <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50 space-y-2">
               <p className="text-zinc-300">Email de Suporte:</p>
               <div className="flex items-center justify-between">
                 <a href="mailto:suporte@udel.study" className="text-purple-400 hover:text-purple-300 font-medium break-all">
                   suporte@udel.study
                 </a>
                 <Button variant="ghost" size="icon" onClick={copyEmail} className="text-zinc-400 hover:text-white h-8 w-8">
                    <Copy className="h-4 w-4" />
                 </Button>
               </div>
            </div>
            <p className="text-zinc-400">
              Você também pode nos encontrar em nossa comunidade no Discord. É um ótimo lugar para tirar dúvidas rápidas, interagir com outros membros e ficar por dentro das novidades.
            </p>
            <Button asChild variant="outline" className="w-full text-zinc-300 border-indigo-500/50 hover:bg-indigo-500/10 hover:border-indigo-500/80 hover:text-white transition-all">
              {/* Use updated Discord URL */}
              <a href={discordUrl} target="_blank" rel="noopener noreferrer">
                 <MessageSquare className="mr-2 h-5 w-5 text-indigo-400" /> Entrar no Discord
              </a>
            </Button>
             <div className="text-sm text-zinc-500">
                <p>Para parcerias ou assuntos comerciais, por favor, utilize o formulário ao lado ou o email de suporte.</p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
