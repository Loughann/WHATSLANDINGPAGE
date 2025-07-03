"use client"

import type React from "react"
import { useRef, useEffect, useCallback } from "react"

const WhatsAppBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const createFloatingElement = useCallback(() => {
    if (!containerRef.current || typeof window === "undefined") return

    const isMobile = window.innerWidth < 768
    const element = document.createElement("div")
    element.className = "floating-whatsapp-element"

    const startX = Math.random() * window.innerWidth
    const startY = window.innerHeight + 50

    const duration = isMobile ? 20000 + Math.random() * 10000 : 15000 + Math.random() * 10000
    const size = isMobile ? 20 + Math.random() * 25 : 30 + Math.random() * 40
    const opacity = isMobile ? 0.03 + Math.random() * 0.05 : 0.05 + Math.random() * 0.1
    const rotation = Math.random() * 360

    element.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size}px;
      opacity: ${opacity};
      pointer-events: none;
      z-index: 1;
      background-image: url('/images/whatsapp-logo.webp');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      transform: rotate(${rotation}deg);
      ${isMobile ? "" : `filter: hue-rotate(${Math.random() * 60}deg) brightness(1.2);`}
    `

    containerRef.current.appendChild(element)

    const animation = element.animate(
      [
        {
          transform: `translateY(0px) rotate(${rotation}deg) scale(1)`,
          opacity: opacity,
        },
        {
          transform: `translateY(-${window.innerHeight + 100}px) rotate(${rotation + 180}deg) scale(0.5)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,
        easing: "linear",
      },
    )

    animation.onfinish = () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const isMobile = window.innerWidth < 768
    const interval = isMobile ? 4000 : 2000
    const initialElements = isMobile ? 1 : 3

    const intervalId = setInterval(() => {
      createFloatingElement()
    }, interval)

    for (let i = 0; i < initialElements; i++) {
      setTimeout(() => createFloatingElement(), i * (isMobile ? 2000 : 1000))
    }

    return () => {
      clearInterval(intervalId)
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [createFloatingElement])

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-950 to-black z-0" />

      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-emerald-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-lime-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="fixed inset-0 z-0">
        {typeof window !== "undefined" &&
          [...Array(window.innerWidth < 768 ? 10 : 20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400/20 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
      </div>

      <div ref={containerRef} className="fixed inset-0 z-0" />

      <div
        className="fixed inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #25D366 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #128C7E 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, #075E54 0%, transparent 50%)`,
        }}
      />
    </>
  )
}

export default WhatsAppBackground
