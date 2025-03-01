import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { IWizardEmail } from '@/lib/interfaces/auth/wizard';
import { SocialButton } from '../social-button';
import { FaArrowRight, FaDiscord, FaGoogle, FaSpinner } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { useNotification } from "@/components/ui/notifications";
import { useCallback, useRef, useState } from "react";
import { z } from "zod";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axios";

interface State{
    setStep: React.Dispatch<React.SetStateAction<string>>
}

export const EmailStep = ({ setStep }: State ) => {
    const notification = useNotification();
    const captchaRef = useRef<HCaptcha | null>(null);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, formState: { errors }, getValues, setValue, handleSubmit } = useFormContext();


    const handleEmailBlur = useCallback(() => {
        const currentEmail = getValues("email");
        setValue('email', currentEmail);

        if (currentEmail && currentEmail.includes("@") && captchaRef.current) {
            captchaRef.current.execute();
        }
    }, [getValues('email')]);

    const handlerSubmit = (async (data) => {

        if (!isCaptchaVerified) {
            notification.error("Erro !!", "Você precisa concluir o captcha com sucesso!");
            return;
        }
        setIsLoading(true);

        try {
            axiosInstance.post("/v1/auth/signin/email", data)
        } catch (erro) {
            console.log(erro)
        }

        notification.success("Sucesso", "Email validado com sucesso!");
        setIsLoading(false)
        setStep((prev) => prev + 1)
    });

    const handleSSO = (provider: string) => {
        notification.success("SSO", `Iniciando login com ${provider}`);
        console.log(`SSO login with ${provider}`);
    };

    return (
        <form onSubmit={handleSubmit(handlerSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="text-w hite"
                    {...register("email")}
                    onBlur={handleEmailBlur}
                />
                {errors.email?.message && (
                    <p style={{ color: "red" }}>{errors.email.message.toString()}</p>
                )}
            </div>

            <div className="flex select-none justify-center items-center">
                <HCaptcha
                    key="normal"
                    sitekey="3a7ab9d2-028c-4db0-8c6e-bca697a2bb6a"
                    size="normal"
                    onVerify={(captchaToken) => {
                        setValue("token", captchaToken);
                        setIsCaptchaVerified(true);
                    }}
                    onExpire={() => {
                        setValue("token", "");
                        setIsCaptchaVerified(false);
                        notification.error("Token Expirado", "Por favor, conclua o captcha novamente.");
                    }}
                    theme="dark"
                    ref={captchaRef}
                />
            </div>

            <div className="flex justify-between">
                <div />
                <Button
                    type="submit"
                    disabled={!isCaptchaVerified}
                    className="w-full flex justify-center"
                >
                    {isLoading ? (
                        <FaSpinner className="animate-spin mr-2" />
                    ) : (
                        <FaArrowRight className="mr-2" />
                    )}
                    Próximo
                </Button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-zinc-500">OU LOGUE COM</span>
                </div>
            </div>

            <div className="grid gap-2">
                <SocialButton
                    icon={FaDiscord}
                    onClick={() => handleSSO("discord")}
                    isLoading={false}
                >
                    Discord
                </SocialButton>
                <SocialButton
                    icon={FaGoogle}
                    onClick={() => handleSSO("google")}
                    isLoading={false}
                >
                    Google
                </SocialButton>
            </div>
        </form>
    );
};
