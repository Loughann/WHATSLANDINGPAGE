"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Globe, BarChart, MessageCircle, Trash2, History, Clock, FileText } from "lucide-react"
import WhatsAppBackground from "@/components/whatsapp-background"
import { useRouter } from "next/navigation" // Importar useRouter

interface InvestigationStep {
  id: number
  text: string
  icon: React.ElementType
  delay: number // Delay in milliseconds before this step starts
  duration: number // Duration of this step in milliseconds
}

export default function InvestigatingPage() {
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get("phone") || "(XX) XXXXX-XXXX" // Get phone number from URL
  const router = useRouter() // Inicializar useRouter

  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [progress, setProgress] = useState(0) // Reintroduzindo o estado de progresso
  const [simulating, setSimulating] = useState(true) // Reintroduzindo o estado de simulação
  const [showCompletionMessage, setShowCompletionMessage] = useState(false) // Estado para mostrar mensagem de conclusão
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null) // Ref para o tempo de início da animação da simulação

  const stepsRef = useRef<InvestigationStep[]>([
    {
      id: 0,
      text: "Cruzando dados com o número fornecido...",
      icon: Globe,
      delay: 500,
      duration: 2000,
    },
    {
      id: 1,
      text: "Gerando conversas arquivadas...",
      icon: MessageCircle,
      delay: 300,
      duration: 1800,
    },
    {
      id: 2,
      text: "Recuperando conversas apagadas...",
      icon: Trash2,
      delay: 400,
      duration: 2200,
    },
    {
      id: 3,
      text: "Compilando conversas antigas...",
      icon: History,
      delay: 300,
      duration: 1700,
    },
    {
      id: 4,
      text: "Coletando conversas atuais...",
      icon: Clock,
      delay: 200,
      duration: 1500,
    },
    {
      id: 5,
      text: "Compilando relatório completo da investigação...",
      icon: FileText,
      delay: 400,
      duration: 2500,
    },
  ])

  // Calcula a duração total da simulação somando os delays e durations de cada passo
  const totalSimulationDuration = stepsRef.current.reduce((acc, step) => acc + step.delay + step.duration, 0)

  useEffect(() => {
    // Se a simulação não deve estar ativa, garante que qualquer animação ativa seja cancelada
    if (!simulating) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      return
    }

    // Define a função do loop de animação
    const animateProgress = (currentTime: DOMHighResTimeStamp) => {
      // Inicializa startTimeRef.current apenas se for nulo (primeira execução deste ciclo de simulação)
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime
      }

      const elapsedTime = currentTime - startTimeRef.current
      const newProgress = (elapsedTime / totalSimulationDuration) * 100
      const currentProgress = Math.min(newProgress, 100) // Garante que o progresso não exceda 100%

      setProgress(currentProgress)

      // Determina o passo de investigação atual com base no tempo decorrido
      let cumulativeTime = 0
      let foundCurrentStep = false
      for (let i = 0; i < stepsRef.current.length; i++) {
        const step = stepsRef.current[i]
        const stepStart = cumulativeTime + step.delay
        const stepEnd = stepStart + step.duration

        if (elapsedTime >= stepStart && elapsedTime < stepEnd) {
          setCurrentStepIndex(i)
          foundCurrentStep = true
          break
        }
        cumulativeTime += step.delay + step.duration
      }

      // Se o tempo decorrido atingiu ou ultrapassou a duração total da simulação
      if (elapsedTime >= totalSimulationDuration) {
        setCurrentStepIndex(stepsRef.current.length - 1) // Garante que o último passo esteja ativo
        setProgress(100) // Define o progresso para 100%
        setSimulating(false) // Para a simulação
        setShowCompletionMessage(true) // Mostra a mensagem de conclusão

        // Aguarda 2 segundos e depois redireciona
        setTimeout(() => {
          router.push(`/results?phone=${encodeURIComponent(phoneNumber)}`)
        }, 3000)

        // Não é necessário cancelar requestAnimationFrame aqui, o retorno já impede a próxima requisição
      } else {
        // Continua a animação agendando o próximo frame
        animationFrameRef.current = requestAnimationFrame(animateProgress)
      }
    }

    // Inicia o loop de animação
    animationFrameRef.current = requestAnimationFrame(animateProgress)

    // Função de limpeza: cancela o requestAnimationFrame quando o componente é desmontado
    // ou quando as dependências do useEffect mudam e o efeito é re-executado
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null // Limpa a referência
      }
    }
  }, [simulating, totalSimulationDuration, phoneNumber, router]) // Dependências: o efeito só roda quando 'simulating' ou 'totalSimulationDuration' mudam

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Novo fundo animado do WhatsApp */}
      <WhatsAppBackground />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Header Section */}
        <header className="flex items-center justify-center gap-2 mb-8 w-full">
          <div className="relative">
            <h1
              className="text-5xl font-extrabold tracking-tight text-hacking-primary overflow-hidden whitespace-nowrap animate-typing-loading animate-led-pulse"
              style={{
                fontFamily: "monospace",
                textShadow:
                  "0 0 10px var(--tw-colors-hacking-primary), 0 0 20px rgba(0, 255, 0, 0.8), 0 0 30px rgba(0, 255, 0, 0.6)",
                filter: "drop-shadow(0 0 5px rgba(0, 255, 0, 0.8)) drop-shadow(0 0 15px rgba(0, 255, 0, 0.4))",
              }}
            >
              INVESTIGANDO
            </h1>
          </div>
        </header>

        {/* Analyzing Phone Number */}
        <div className="w-full p-4 rounded-lg bg-hacking-card-bg border border-hacking-primary/50 mb-6 text-center animate-led-glow-pulse">
          <p className="text-lg font-semibold text-whatsapp-text-light mb-3">
            Analisando: <span className="text-hacking-primary">{phoneNumber}</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-400">Status do dispositivo:</span>
            <span className="text-hacking-primary font-medium">Ativo</span>
          </div>
        </div>

        {/* Progress Percentage */}
        <p className="text-xl font-bold text-whatsapp-text-light mb-8 flex items-center gap-2">
          <BarChart className="w-6 h-6 text-hacking-primary" />
          {Math.round(progress)}% CONCLUÍDO
        </p>

        {/* Investigation Steps */}
        <div className="w-full space-y-4">
          {stepsRef.current.map((step, index) => (
            <div
              key={step.id}
              className={`relative p-4 rounded-lg transition-all duration-500 ease-in-out
              ${
                index === currentStepIndex
                  ? "bg-hacking-card-bg border border-hacking-primary/80 shadow-lg animate-pulse-border" // Active step
                  : index < currentStepIndex
                    ? "bg-hacking-card-bg border border-hacking-primary/80" // Completed step (mais acesso)
                    : "bg-hacking-card-bg border border-hacking-primary/10 opacity-40" // Pending step
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    index <= currentStepIndex ? "bg-hacking-primary" : "bg-gray-800"
                  } ${index === currentStepIndex ? "animate-hacking-icon-glow-primary" : ""}`}
                >
                  <step.icon className={`w-5 h-5 ${index <= currentStepIndex ? "text-white" : "text-gray-400"}`} />
                </div>
                <p
                  className={`text-lg font-medium ${
                    index <= currentStepIndex ? "text-hacking-primary" : "text-whatsapp-text-light"
                  }`}
                >
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Message Overlay */}
      {showCompletionMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <div className="text-center w-full max-w-xs">
            <div className="mb-6">
              <h2
                className="text-xl sm:text-2xl font-bold text-hacking-primary leading-tight"
                style={{
                  textShadow: "0 0 3px rgba(0, 255, 0, 0.4), 0 0 6px rgba(0, 255, 0, 0.2)",
                  filter: "drop-shadow(0 0 2px rgba(0, 255, 0, 0.3))",
                  animation: "led-glow 3s ease-in-out infinite",
                }}
              >
                Encontramos conversas suspeitas no relatório 👀
              </h2>
            </div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hacking-primary"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
