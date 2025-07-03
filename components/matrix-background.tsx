"use client"

import type React from "react"
import { useRef, useEffect, useCallback } from "react"

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawMatrix = useCallback(() => {
    if (typeof window === "undefined") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const characters = "01"
    const fontSize = 28
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const desiredFps = 15
    const frameInterval = 1000 / desiredFps
    let lastFrameTime = 0

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const baseCharColor = "rgba(0, 255, 0, 0.15)"
      const flickerCharColor = "rgba(255, 255, 255, 0.8)"
      const flickerChance = 0.005

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))

        if (Math.random() < flickerChance) {
          ctx.fillStyle = flickerCharColor
        } else {
          ctx.fillStyle = baseCharColor
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.85) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    let animationFrameId: number
    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate)

      if (currentTime - lastFrameTime > frameInterval) {
        lastFrameTime = currentTime - (currentTime % frameInterval)
        draw()
      }
    }

    const startAnimating = () => {
      lastFrameTime = performance.now()
      animate(lastFrameTime)
    }

    startAnimating()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const cleanup = drawMatrix()
    const handleResize = () => {
      drawMatrix()
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (cleanup) cleanup()
    }
  }, [drawMatrix])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" aria-hidden="true" />
}

export default MatrixBackground
