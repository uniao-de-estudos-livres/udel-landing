"use client"

import { ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DiscordRedirectDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  discordUrl?: string // Keep prop in case it's needed elsewhere, but use updated default
}

export function DiscordRedirectDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  // Update the default value here as well
  discordUrl = "https://discord.gg/NUtQEtuW",
}: DiscordRedirectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Redirecionamento Externo</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Você será redirecionado para o servidor do Discord da comunidade Udel.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium">Discord da Udel</h3>
                <p className="text-sm text-zinc-400">Junte-se à nossa comunidade de estudantes</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-zinc-400">
            No Discord, você poderá interagir com outros estudantes, tirar dúvidas e participar de eventos exclusivos.
          </p>
        </div>
        <DialogFooter className="flex sm:justify-between sm:flex-row flex-col gap-2">
          <Button
             variant="outline"
             className="text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
             onClick={() => onOpenChange(false)}
           >
            Cancelar
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={onConfirm}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Ir para o Discord
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
