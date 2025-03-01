'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SSOCallback() {
    const router = useRouter();

    useEffect(() => {
        const params = Object.fromEntries(new URLSearchParams(location.search));
        if (!params || Object.keys(params).length === 0) {
            console.error("Nenhum parâmetro encontrado.");
            window.close();
            return;
        }

        if (!window.opener) {
            console.error("Janela principal não encontrada.");
            router.push("/signup");
        } else {
            console.log("Enviando postMessage com params:", params);
            window.opener.postMessage(params, window.location.origin);

            // Delay para garantir que o postMessage seja recebido
            setTimeout(() => window.close(), 500);
        }
    }, [router]);

    return <p>Autenticando...</p>;
}