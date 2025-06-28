"use client"

import type React from "react"
import { useRef, useEffect, useCallback } from "react"

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawMatrix = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to fill the screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Matrix characters (binary for "hacking sensation")
    const characters = "01"
    const fontSize = 28 // Tamanho da fonte dos caracteres
    const columns = canvas.width / fontSize

    // An array of drops - one per column
    // storing the y-coordinate of the last character drawn
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1 // Start at the first row
    }

    const desiredFps = 15 // FPS para a velocidade da queda
    const frameInterval = 1000 / desiredFps
    let lastFrameTime = 0

    // Drawing the characters
    const draw = () => {
      // Fundo preto mais opaco para que os caracteres desapareçam mais rápido
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Base color for characters with very low opacity
      const baseCharColor = "rgba(0, 255, 0, 0.15)" // <-- Opacidade dos caracteres reduzida para 15%
      const flickerCharColor = "rgba(255, 255, 255, 0.8)" // Cor para o efeito de flicker (branco brilhante)
      const flickerChance = 0.005 // 0.5% de chance de um caractere cintilar

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length))

        // Apply flicker effect
        if (Math.random() < flickerChance) {
          ctx.fillStyle = flickerCharColor // Temporarily set to flicker color
        } else {
          ctx.fillStyle = baseCharColor // Use base opacity
        }

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Send the drop back to the top more frequently to create more gaps
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.85) {
          drops[i] = 0
        }

        // Increment y-coordinate for the next character in the column
        drops[i]++
      }
    }

    let animationFrameId: number
    const animate = (currentTime: DOMHighResTimeStamp) => {
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

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  useEffect(() => {
    drawMatrix()
    const handleResize = () => {
      drawMatrix()
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [drawMatrix])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" aria-hidden="true" />
}

export default MatrixBackground
