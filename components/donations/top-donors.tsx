"use client"

import { useState, useEffect } from "react"; // Import hooks
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { AuthService } from "@/services/auth-service"; // Import AuthService
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton for loading state

// Define type for supporter data matching AuthService return type
interface SupporterData {
    id: string;
    name: string;
    avatar_url?: string | null;
    contribution_date: string; // Keep as string for now, formatting can be done later
}

// Removed mock data array

export function TopDonors() {
  const [supporters, setSupporters] = useState<SupporterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupporters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch supporters from the API using the service
        const data = await AuthService.getSupporters(10); // Fetch top 10 for example
        setSupporters(data);
      } catch (err) {
        console.error("Failed to fetch supporters:", err);
        setError("Não foi possível carregar a lista de apoiadores.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupporters();
  }, []); // Empty dependency array ensures this runs once on mount

  const formatDate = (dateString: string) => {
    try {
      // Format date nicely, e.g., "Jan 2023"
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' });
    } catch (e) {
      return 'Data inválida'; // Fallback for invalid dates
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
            <table className="w-full min-w-[600px]"> {/* Added min-w for better responsiveness */}
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Apoiador</th>
                  {/* Removed Tier and Amount columns as they are not in the current model/DTO */}
                  {/* <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Categoria</th> */}
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Desde</th>
                  {/* <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Contribuição</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-black">
                {isLoading ? (
                  // Loading Skeleton
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
                  // Error Message
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center text-red-400">{error}</td>
                  </tr>
                ) : supporters.length === 0 ? (
                   // No Supporters Message
                   <tr>
                     <td colSpan={2} className="px-6 py-4 text-center text-zinc-400">Ainda não há apoiadores para exibir.</td>
                   </tr>
                ) : (
                  // Render Supporters
                  supporters.map((supporter, index) => (
                    <motion.tr
                      key={supporter.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }} // Slightly faster delay
                      className="hover:bg-zinc-900/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover" // Added object-cover
                              src={supporter.avatar_url || "/placeholder.svg"} // Use avatar_url
                              alt={supporter.name}
                              onError={(e) => (e.currentTarget.src = "/placeholder.svg")} // Fallback image
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{supporter.name}</div>
                          </div>
                        </div>
                      </td>
                      {/* Removed Tier column */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                        {formatDate(supporter.contribution_date)} {/* Format date */}
                      </td>
                      {/* Removed Amount column */}
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
