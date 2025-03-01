export interface IWizardEmail {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    captchaSize: "invisible" | "normal" | "compact";
    setCaptchaSize: React.Dispatch<React.SetStateAction<"invisible" | "normal" | "compact">>;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}
