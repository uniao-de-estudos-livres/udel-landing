"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil, Eraser, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface SketchCanvasProps {
  className?: string
}

export function SketchCanvas({ className }: SketchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil")
  const [color, setColor] = useState("#ffffff")
  const [lineWidth, setLineWidth] = useState(3)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set initial background
    ctx.fillStyle = "#1e1e1e"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Handle resize
    const handleResize = () => {
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.putImageData(imageData, 0, 0)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Get canvas coordinates
  const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  // Start drawing
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(event)
    setIsDrawing(true)
    setLastPosition({ x, y })
  }

  // Draw
  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCoordinates(event)

    ctx.beginPath()
    ctx.moveTo(lastPosition.x, lastPosition.y)
    ctx.lineTo(x, y)
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = tool === "pencil" ? color : "#1e1e1e"
    ctx.lineWidth = tool === "eraser" ? lineWidth * 2 : lineWidth
    ctx.stroke()

    setLastPosition({ x, y })
  }

  // Stop drawing
  const stopDrawing = () => {
    setIsDrawing(false)
  }

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#1e1e1e"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  // Save canvas as image
  const saveCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = "rascunho.png"
    link.click()
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex justify-between items-center mb-2 bg-zinc-800 p-2 rounded-t-lg">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTool("pencil")}
            className={cn(tool === "pencil" && "bg-purple-500/20")}
          >
            <Pencil className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTool("eraser")}
            className={cn(tool === "eraser" && "bg-purple-500/20")}
          >
            <Eraser className="h-5 w-5" />
          </Button>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent"
          />
          <select
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="bg-zinc-700 rounded px-2 text-sm"
          >
            <option value="1">Fino</option>
            <option value="3">Médio</option>
            <option value="5">Grosso</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={clearCanvas}>
            <Trash2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={saveCanvas}>
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-zinc-900 rounded-b-lg">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  )
}
