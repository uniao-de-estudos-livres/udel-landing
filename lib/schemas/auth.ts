import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Digite um email válido",
  }),
  password: z.string().min(1, {
    message: "Digite sua senha",
  }),
})

export const signupEmailSchema = z.object({
  email: z.string().email({
    message: "Digite um email válido",
  }),
})

export const signupVerificationSchema = z.object({
  code: z.string().length(6, {
    message: "O código deve ter 6 dígitos",
  }),
})

export const WizardSignupData = z.object({
    email: z.string().email("Email inválido"),
    token: z.string().min(1, ("Você precisa resolver o captcha!"))
});

export type WizardSignupSchema = z.infer<typeof WizardSignupData>

export const signupCompleteSchema = z
  .object({
    nickname: z.string().min(3, {
      message: "O nickname deve ter pelo menos 3 caracteres",
    }),
    password: z
      .string()
      .min(8, {
        message: "A senha deve ter pelo menos 8 caracteres",
      })
      .regex(/[A-Z]/, {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "A senha deve conter pelo menos um caractere especial",
      }),
    confirmPassword: z.string(),
    email: z.string().email("Emaillllll")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupEmailFormData = z.infer<typeof signupEmailSchema>
export type SignupVerificationFormData = z.infer<typeof signupVerificationSchema>
export type SignupCompleteFormData = z.infer<typeof signupCompleteSchema>

