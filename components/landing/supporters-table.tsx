"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Supporter {
  id: string
  name: string
  tier: string
  since: string
  amount: string
  avatar: string
}

interface SupportersTableProps {
  supporters: Supporter[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function SupportersTable({ supporters, currentPage, totalPages, onPageChange }: SupportersTableProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Nossos Apoiadores</h2>
      <p className="text-xl text-zinc-400 max-w-3xl mx-auto text-center mb-12">
        Agradecemos a todos que tornam este projeto possível
      </p>

      <div className="overflow-hidden rounded-xl border border-purple-500/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Apoiador</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Desde</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-zinc-300">Contribuição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-black">
              {supporters.map((supporter) => (
                <motion.tr
                  key={supporter.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="hover:bg-zinc-900/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={supporter.avatar || "/placeholder.svg"}
                          alt={supporter.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{supporter.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        supporter.tier === "Diamante"
                          ? "bg-blue-100 text-blue-800"
                          : supporter.tier === "Ouro"
                            ? "bg-yellow-100 text-yellow-800"
                            : supporter.tier === "Prata"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {supporter.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">{supporter.since}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">{supporter.amount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-t border-zinc-800 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="text-zinc-400 border-zinc-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="text-zinc-400 border-zinc-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-zinc-400">
                Mostrando <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> a{" "}
                <span className="font-medium">{Math.min(currentPage * 10, supporters.length)}</span> de{" "}
                <span className="font-medium">{supporters.length}</span> apoiadores
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="text-zinc-400 border-zinc-700 rounded-l-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    className={`${
                      currentPage === i + 1
                        ? "bg-purple-600 text-white border-purple-600"
                        : "text-zinc-400 border-zinc-700"
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="text-zinc-400 border-zinc-700 rounded-r-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
