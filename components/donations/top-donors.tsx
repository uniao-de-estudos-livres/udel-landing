"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { AuthService } from "@/services/auth-service";
import { Skeleton } from "@/components/ui/skeleton";

interface SupporterData {
    id: string;
    name: string;
    avatar_url?: string | null;
    contribution_date: string;
}

export function TopDonors() {
  const [supporters, setSupporters] = useState<SupporterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupporters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await AuthService.getSupporters(10); // Fetch top 10
        setSupporters(data);
      } catch (err) {
        console.error("Failed to fetch supporters:", err);
        setError("Não foi possível carregar a lista de apoiadores.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupporters();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' });
    } catch (e) {
      return 'Data inválida';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-4">
            <Heart className="w-6 h-6 text-purple-400 mr-2" />
            <span className="text-purple-300 font-medium">Nossos Apoiadores</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Principais Apoiadores</h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Agradecemos a todos que contribuem para tornar este projeto possível
          </p>
        </motion.div>

        <div className="overflow-hidden rounded-xl border border-purple-500/20">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Apoiador</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Desde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-black">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={`skeleton-${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="ml-4 space-y-2">
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-20" />
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center text-red-400">{error}</td>
                  </tr>
                ) : supporters.length === 0 ? (
                   <tr>
                     <td colSpan={2} className="px-6 py-4 text-center text-zinc-400">Ainda não há apoiadores para exibir.</td>
                   </tr>
                ) : (
                  supporters.map((supporter, index) => (
                    <motion.tr
                      key={supporter.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="hover:bg-zinc-900/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={supporter.avatar_url || "/placeholder.svg"}
                              alt={supporter.name}
                              onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{supporter.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                        {formatDate(supporter.contribution_date)}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-400">
            Junte-se a estes apoiadores e faça parte da comunidade que está transformando a educação no Brasil.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
