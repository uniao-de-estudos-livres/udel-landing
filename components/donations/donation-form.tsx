"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CreditCard, Calendar, Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useNotification } from "@/components/ui/notifications"
import { useSearchParams } from "next/navigation"

interface DonationFormProps {
  selectedTier: string | null
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  amount: z.string().min(1, { message: "Valor é obrigatório" }),
  paymentMethod: z.enum(["credit", "pix", "boleto"], { required_error: "Selecione um método de pagamento" }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  anonymous: z.boolean().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function DonationForm({ selectedTier }: DonationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const notification = useNotification()
  const searchParams = useSearchParams()
  const showForm = searchParams.get("showForm") === "true"

  const getTierAmount = (tier: string | null): string => {
    switch (tier) {
      case "apoiador":
        return "15"
      case "colaborador":
        return "30"
      case "patrocinador":
        return "50"
      case "unico":
        return ""
      default:
        return ""
    }
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: getTierAmount(selectedTier),
      paymentMethod: "credit",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      anonymous: false,
    },
  })

  // Atualizar o valor do formulário quando o tier selecionado mudar
  useEffect(() => {
    form.setValue("amount", getTierAmount(selectedTier))
  }, [selectedTier, form])

  const paymentMethod = form.watch("paymentMethod")

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Donation data:", data)
      setIsSuccess(true)
      notification.success("Doação realizada", "Obrigado por apoiar o projeto Udel!")
    } catch (error) {
      console.error("Error submitting donation:", error)
      notification.error("Erro", "Ocorreu um erro ao processar sua doação. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section id="donation-form" className="py-16 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-zinc-900/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Doação Realizada com Sucesso!</h2>
            <p className="text-zinc-400 mb-8">
              Muito obrigado por apoiar o projeto Udel. Sua contribuição faz toda a diferença para continuarmos
              oferecendo educação de qualidade.
            </p>
            <p className="text-zinc-400 mb-4">
              Enviamos um comprovante para o seu email. Em breve você receberá mais informações sobre os benefícios do
              seu plano.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Voltar para a Página Inicial</Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="donation-form" className="py-16 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete sua Doação</h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Preencha os dados abaixo para finalizar sua contribuição
          </p>
        </motion.div>

        <motion.div
          className="bg-zinc-900/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} className="bg-zinc-800 border-zinc-700" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          {...field}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Valor da Doação (R$)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">R$</span>
                        <Input
                          type="number"
                          placeholder="0,00"
                          {...field}
                          className="bg-zinc-800 border-zinc-700 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Método de Pagamento</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2 bg-zinc-800 p-3 rounded-md border border-zinc-700">
                          <RadioGroupItem value="credit" id="credit" />
                          <label
                            htmlFor="credit"
                            className="flex items-center cursor-pointer text-white font-medium flex-1"
                          >
                            <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                            Cartão de Crédito
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 bg-zinc-800 p-3 rounded-md border border-zinc-700">
                          <RadioGroupItem value="pix" id="pix" />
                          <label
                            htmlFor="pix"
                            className="flex items-center cursor-pointer text-white font-medium flex-1"
                          >
                            <svg
                              className="w-5 h-5 mr-2 text-purple-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.5 4L4 9.5L9.5 15L15 9.5L9.5 4Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14.5 9L9 14.5L14.5 20L20 14.5L14.5 9Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            PIX
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 bg-zinc-800 p-3 rounded-md border border-zinc-700">
                          <RadioGroupItem value="boleto" id="boleto" />
                          <label
                            htmlFor="boleto"
                            className="flex items-center cursor-pointer text-white font-medium flex-1"
                          >
                            <svg
                              className="w-5 h-5 mr-2 text-purple-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                              <path
                                d="M7 9V15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11 9V15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15 9V15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19 9V15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Boleto Bancário
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {paymentMethod === "credit" && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Número do Cartão</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="1234 5678 9012 3456"
                              {...field}
                              className="bg-zinc-800 border-zinc-700 pl-10"
                            />
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="cardExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Data de Validade</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="MM/AA" {...field} className="bg-zinc-800 border-zinc-700 pl-10" />
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cardCvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Código de Segurança</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="123" {...field} className="bg-zinc-800 border-zinc-700 pl-10" />
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="w-4 h-4 text-purple-600 bg-zinc-800 border-zinc-700 rounded focus:ring-purple-500"
                  onChange={(e) => form.setValue("anonymous", e.target.checked)}
                />
                <label htmlFor="anonymous" className="text-zinc-400 text-sm cursor-pointer">
                  Fazer doação anônima (seu nome não aparecerá na lista de apoiadores)
                </label>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processando..." : "Finalizar Doação"}
                </Button>
              </div>

              <p className="text-xs text-zinc-500 text-center mt-4">
                Ao finalizar sua doação, você concorda com nossos termos de serviço e política de privacidade. Todas as
                transações são processadas com segurança.
              </p>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
