"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Globe, BarChart, MessageCircle, Trash2, History, Clock, FileText, Volume2, Play } from "lucide-react"
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
  const [showCompletionButton, setShowCompletionButton] = useState(false) // Estado para mostrar botão de conclusão
  const [showRedirectMessage, setShowRedirectMessage] = useState(false) // Estado para mostrar mensagem de redirecionamento
  const [showPlayButton, setShowPlayButton] = useState(true) // Estado para controlar a visibilidade do botão play
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null) // Ref para o tempo de início da animação da simulação
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const stepsRef = useRef<InvestigationStep[]>([
    {
      id: 0,
      text: "Cruzando dados com o número fornecido...",
      icon: Globe,
      delay: 1000,
      duration: 12000,
    },
    {
      id: 1,
      text: "Gerando conversas arquivadas...",
      icon: MessageCircle,
      delay: 1000,
      duration: 11000,
    },
    {
      id: 2,
      text: "Recuperando conversas apagadas...",
      icon: Trash2,
      delay: 1000,
      duration: 13000,
    },
    {
      id: 3,
      text: "Compilando conversas antigas...",
      icon: History,
      delay: 1000,
      duration: 12000,
    },
    {
      id: 4,
      text: "Coletando conversas atuais...",
      icon: Clock,
      delay: 1000,
      duration: 10000,
    },
    {
      id: 5,
      text: "Compilando relatório completo da investigação...",
      icon: FileText,
      delay: 1000,
      duration: 15000,
    },
  ])

  // Calcula a duração total da simulação somando os delays e durations de cada passo
  // Total: 6000ms (delays) + 73000ms (durations) = 79000ms
  // Ajustando para 90000ms (90 segundos)
  const totalSimulationDuration = 90000 // 90 segundos

  // Função para lidar com o clique no botão play
  const handlePlayClick = () => {
    setShowPlayButton(false)
    // Tentar iniciar o vídeo via postMessage para o iframe do Vimeo
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage('{"method":"play"}', "*")
    }
  }

  // Função para lidar com o clique no botão de descobrir a verdade
  const handleDiscoverTruth = () => {
    setShowRedirectMessage(true)
    // Aguarda 2 segundos e depois redireciona
    setTimeout(() => {
      router.push(`/results?phone=${encodeURIComponent(phoneNumber)}`)
    }, 2000)
  }

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
        setShowCompletionButton(true) // Mostra o botão de conclusão

        // Não redireciona automaticamente mais

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
    <div className="min-h-screen flex flex-col py-4 px-2 relative overflow-hidden">
      {/* Novo fundo animado do WhatsApp */}
      <WhatsAppBackground />

      <div className="relative z-10 flex flex-col w-full">
        {/* Video Instructions Section */}
        <div className="w-full max-w-sm mx-auto mb-4">
          <p className="text-sm text-whatsapp-text-light mb-3 text-center">
            Essa análise pode durar até{" "}
            <span className="font-semibold text-hacking-primary">1 minuto e 30 segundos...</span>
          </p>

          <div className="bg-hacking-card-bg border border-hacking-primary/50 rounded-lg p-4 text-center animate-led-glow-pulse">
            <h2 className="mb-3 text-xl text-[rgba(255,0,0,1)] font-black">ASSISTA O VÍDEO ENQUANTO</h2>
            <div className="flex items-center justify-center gap-2 mb-1">
              <p className="text-hacking-primary text-2xl font-extrabold">O NÚMERO É RASTREADO </p>
            </div>
            <p className="text-whatsapp-text-light mb-3 text-xl">e as conversas são processadas</p>
            <div className="flex items-center justify-center gap-2 text-sm text-hacking-secondary">
              <Volume2 className="w-4 h-4 text-[rgba(3,255,0,1)]" />
              <span className="text-[rgba(3,255,0,1)]">Verifique se seu som está ligado</span>
            </div>
          </div>
        </div>

        {/* VSL Video Section - Tight Container */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-hacking-primary/30 w-full mb-6 mx-auto max-w-sm">
          <div className="w-full h-48 relative">
            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/1097730571?h=bd53fcce96&autoplay=0&muted=0&playsinline=1&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title="WhatsApp Investigation VSL"
              className="w-full h-full object-cover"
            ></iframe>

            {/* Botão Play Customizado */}
            {showPlayButton && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                <button
                  onClick={handlePlayClick}
                  className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse border-4 border-white/30"
                  style={{
                    boxShadow:
                      "0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4)",
                  }}
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Container - Mobile Optimized */}
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
          {/* Analyzing Phone Number */}
          <div className="w-full p-3 rounded-lg bg-hacking-card-bg border border-hacking-primary/50 mb-4 text-center animate-led-glow-pulse">
            <p className="text-base font-semibold text-whatsapp-text-light mb-2">
              Analisando: <span className="text-hacking-primary text-sm">{phoneNumber}</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-gray-400">Status:</span>
              <span className="text-hacking-primary font-medium">Ativo</span>
            </div>
          </div>

          {/* Progress Percentage */}
          <p className="text-lg font-bold text-whatsapp-text-light mb-6 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-hacking-primary" />
            {Math.round(progress)}% CONCLUÍDO
          </p>

          {/* Completion Button */}
          {showCompletionButton && (
            <div className="w-full mb-6">
              <button
                onClick={handleDiscoverTruth}
                className="w-full py-4 px-6 rounded-xl text-lg font-bold shadow-xl hover:opacity-90 hover:shadow-2xl hover:scale-105 transition-all animate-led-pulse border-2 text-neutral-900"
                style={{
                  background: "linear-gradient(45deg, #25D366, #14FE00)",
                  borderColor: "#25D366",
                  boxShadow:
                    "0 0 3px #25D366, 0 0 6px #25D366, 0 0 9px #25D366, 0 0 12px #25D366, 0 0 18px #25D366, 0 0 22px #25D366",
                }}
              >
                Descubra toda a verdade agora!
              </button>
            </div>
          )}

          {/* Investigation Steps - Mobile Optimized */}
          <div className="w-full space-y-3">
            {stepsRef.current.map((step, index) => (
              <div
                key={step.id}
                className={`relative p-3 rounded-lg transition-all duration-500 ease-in-out
                ${
                  index === currentStepIndex
                    ? "bg-hacking-card-bg border border-hacking-primary/80 shadow-lg animate-pulse-border" // Active step
                    : index < currentStepIndex
                      ? "bg-hacking-card-bg border border-hacking-primary/80" // Completed step
                      : "bg-hacking-card-bg border border-hacking-primary/10 opacity-40" // Pending step
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      index <= currentStepIndex ? "bg-hacking-primary" : "bg-gray-800"
                    } ${index === currentStepIndex ? "animate-hacking-icon-glow-primary" : ""}`}
                  >
                    <step.icon className={`w-4 h-4 ${index <= currentStepIndex ? "text-white" : "text-gray-400"}`} />
                  </div>
                  <p
                    className={`text-sm font-medium leading-tight ${
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
      </div>

      {/* Redirect Message Overlay - Aparece só quando o botão é clicado */}
      {showRedirectMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="text-center w-full max-w-xs">
            <div className="mb-6">
              <h2
                className="text-lg font-bold text-hacking-primary leading-tight"
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
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-hacking-primary"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
