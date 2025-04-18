"use client"

import { useState, useEffect } from "react";
import { AlertTriangle, Send, Loader2 } from "lucide-react" // Import Loader2
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/hooks/use-notification";
import { AuthService } from "@/services/auth-service";
import { z } from "zod";
import { useCaptcha } from "@/hooks/use-captcha";
import { HCaptchaComponent } from "@/components/ui/h-captcha";

interface FeatureDevelopmentDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
  featureName: string
}

// Simple email schema for validation
const emailSchema = z.string().email({ message: "Por favor, insira um email válido." });

export function FeatureDevelopmentDialog({
  isOpen,
  onOpenChange,
  onClose,
  featureName = "Esta funcionalidade",
}: FeatureDevelopmentDialogProps) {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const notification = useNotification();
  const { captchaRef, executeCaptcha, resetCaptcha } = useCaptcha();
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);

  const onHCaptchaVerify = (token: string) => setHCaptchaToken(token);
  const onHCaptchaExpire = () => setHCaptchaToken(null);
  const onHCaptchaError = (err: Error) => {
    setHCaptchaToken(null);
    notification.error("Erro no Captcha", err.message);
  };

  const handleWaitlistSubmit = async () => {
    setEmailError(null);
    const validationResult = emailSchema.safeParse(waitlistEmail);
    if (!validationResult.success) {
      setEmailError(validationResult.error.errors[0].message);
      return;
    }

    if (!hCaptchaToken) {
        notification.error("Verificação necessária", "Por favor, complete a verificação de segurança.");
        return;
    }

    setIsSubmitting(true);
    try {
      await AuthService.addToWaitlist(waitlistEmail, hCaptchaToken);

      notification.success("Inscrição Recebida!", "Avisaremos você quando a funcionalidade estiver disponível.");
      setWaitlistEmail("");
      resetCaptcha();
      setHCaptchaToken(null);
    } catch (error: any) {
      console.error("Failed to add to waitlist:", error);
      resetCaptcha();
      setHCaptchaToken(null);
      const errorMessage = error.response?.data?.detail || error.message || "Não foi possível adicionar à lista. Tente novamente.";
      if (typeof errorMessage === 'string' && errorMessage.toLowerCase().includes("already on waitlist")) {
           notification.info("Já Inscrito", "Este email já está na nossa lista de espera!");
           setWaitlistEmail("");
      } else if (error.response?.status === 400 && typeof errorMessage === 'string' && errorMessage.toLowerCase().includes("hcaptcha")) {
           notification.error("Erro de Verificação", "Falha na verificação hCaptcha. Tente novamente.");
      } else {
           notification.error("Erro", errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
      if (!isOpen) {
          setWaitlistEmail("");
          setEmailError(null);
          resetCaptcha();
          setHCaptchaToken(null);
      }
  }, [isOpen, resetCaptcha]);


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Funcionalidade em Desenvolvimento
          </DialogTitle>
          <DialogDescription className="text-zinc-400 pt-1">
            {featureName} ainda está em construção e será liberada em breve.
          </DialogDescription>
        </DialogHeader>

        {/* Waitlist Section (Re-enabled) */}
        <div className="space-y-4 py-4 border-t border-b border-zinc-800/50 my-4">
           <p className="text-sm text-zinc-300">
             Quer receber um aviso quando estiver disponível? Deixe seu email abaixo!
           </p>
           <div className="flex flex-col space-y-2">
             <Label htmlFor="waitlist-email" className="sr-only">Email para lista de espera</Label>
             <Input
               id="waitlist-email"
               type="email"
               placeholder="seu@email.com"
               value={waitlistEmail}
               onChange={(e) => setWaitlistEmail(e.target.value)}
               disabled={isSubmitting}
               className="bg-zinc-800 border-zinc-700"
             />
             {emailError && <p className="text-xs text-red-500">{emailError}</p>}
           </div>
           {/* HCaptcha Component (Re-enabled) */}
           <div className="flex justify-center">
             <HCaptchaComponent
               ref={captchaRef}
               onVerify={onHCaptchaVerify}
               onExpire={onHCaptchaExpire}
               onError={onHCaptchaError}
               size="normal"
             />
           </div>
           <Button
             onClick={handleWaitlistSubmit}
             disabled={isSubmitting || !waitlistEmail || !hCaptchaToken}
             className="w-full bg-purple-600 hover:bg-purple-700"
           >
             {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <> <Send className="mr-2 h-4 w-4" /> Me avise! </>}
           </Button>
         </div>

        <DialogFooter className="flex sm:justify-end sm:flex-row flex-col gap-2">
          <Button
             variant="outline"
             className="text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
             onClick={onClose}
           >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
