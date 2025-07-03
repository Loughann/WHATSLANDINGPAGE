"use client" // Adicionado para permitir o uso de hooks de estado

import type React from "react"
import Script from "next/script" // Importe o componente Script aqui
import Image from "next/image"

import {
  Heart,
  ShieldCheck,
  CheckCircle,
  Lock,
  Star,
  AlertTriangle,
  Flame,
  MessageCircle,
  Eye,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WhatsAppBackground from "@/components/whatsapp-background"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

export default function WhatsEspiaoPage() {
  // Hook para detectar mobile
  const [isMobile, setIsMobile] = useState(false)
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [remainingVerifications, setRemainingVerifications] = useState<number>(30)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showPhoneWarning, setShowPhoneWarning] = useState(false)
  const [currentDate, setCurrentDate] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  const userMessages = [
    { username: "Bia_oliveira", gender: "female" },
    { username: "João_silva", gender: "male" },
    { username: "Ana_costa", gender: "female" },
    { username: "Pedro_alves", gender: "male" },
    { username: "Mari_souza", gender: "female" },
  ]
  const [currentUserMessageIndex, setCurrentUserMessageIndex] = useState(0)
  const userMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Efeito para marcar como carregado e iniciar animações
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Efeito para definir a data atual
  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    setCurrentDate(formattedDate)
  }, [])

  // Efeito para diminuir o número de verificações em tempo aleatório
  useEffect(() => {
    const decrementVerifications = () => {
      setRemainingVerifications((prevCount) => {
        if (prevCount > 1) {
          // Intervalos maiores em mobile para reduzir carga
          const minDelay = isMobile ? 8000 : 5000
          const maxDelay = isMobile ? 15000 : 10000
          const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay
          timeoutRef.current = setTimeout(decrementVerifications, randomDelay)
          return prevCount - 1
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          return 1
        }
      })
    }

    // Inicia o primeiro decremento
    const minDelay = isMobile ? 8000 : 5000
    const maxDelay = isMobile ? 15000 : 10000
    const initialDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay
    timeoutRef.current = setTimeout(decrementVerifications, initialDelay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isMobile])

  // Efeito para alternar as mensagens de usuários
  useEffect(() => {
    const rotateUserMessage = () => {
      setCurrentUserMessageIndex((prevIndex) => (prevIndex + 1) % userMessages.length)
      // Intervalos maiores em mobile
      const minDelay = isMobile ? 6000 : 4000
      const maxDelay = isMobile ? 12000 : 8000
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay
      userMessageTimeoutRef.current = setTimeout(rotateUserMessage, randomDelay)
    }

    // Inicia a primeira rotação de mensagem
    const minDelay = isMobile ? 6000 : 4000
    const maxDelay = isMobile ? 12000 : 8000
    const initialDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay
    userMessageTimeoutRef.current = setTimeout(rotateUserMessage, initialDelay)

    return () => {
      if (userMessageTimeoutRef.current) {
        clearTimeout(userMessageTimeoutRef.current)
      }
    }
  }, [userMessages.length, isMobile])

  const formatPhoneNumber = (value: string) => {
    if (!value) return ""
    value = value.replace(/\D/g, "") // Remove tudo que não é dígito
    if (value.length > 11) value = value.slice(0, 11) // Limita a 11 dígitos

    if (value.length <= 2) {
      return `(${value}`
    }
    if (value.length <= 7) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`
    }
    if (value.length <= 10) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`
    }
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
  }

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedGender) {
        setShowPhoneWarning(true) // Mostra o aviso se não houver gênero selecionado
        e.preventDefault() // Impede a digitação
        return
      }
      setShowPhoneWarning(false) // Esconde o aviso se um gênero estiver selecionado
      const formattedValue = formatPhoneNumber(e.target.value)
      setPhoneNumber(formattedValue)
    },
    [selectedGender],
  )

  const handlePhoneInputFocus = useCallback(() => {
    // Removido a lógica que causava re-renderizações desnecessárias
  }, [])

  const handleGenderSelection = (gender: string) => {
    setSelectedGender(gender)
    setShowPhoneWarning(false) // Esconde o aviso ao selecionar um gênero
  }

  const scrollToInvestigation = () => {
    const investigationSection = document.getElementById("investigation-form")
    if (investigationSection) {
      investigationSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getCleanPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, "") // Remove tudo que não é dígito
  }

  const handleExposeTruth = () => {
    const cleanPhoneNumber = getCleanPhoneNumber(phoneNumber)
    if (!selectedGender || cleanPhoneNumber.length !== 11) {
      setShowPhoneWarning(true)
      return
    }
    router.push(`/investigating?phone=${encodeURIComponent(phoneNumber)}`)
  }

  const currentMessage = userMessages[currentUserMessageIndex]
  const pronoun = currentMessage.gender === "female" ? "dela" : "dele"

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* UTMify Scripts */}
      <Script
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
        async
        defer
        strategy="afterInteractive"
      />

      <Script
        id="utmify-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.pixelId = "6859c44c8c3a8e69c4f45491";
      var a = document.createElement("script");
      a.setAttribute("async", "");
      a.setAttribute("defer", "");
      a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
      document.head.appendChild(a);
    `,
        }}
      />

      {/* Novo fundo animado do WhatsApp */}
      <WhatsAppBackground />

      {/* Barra de aviso de consulta gratuita */}
      <div className="fixed top-0 left-0 w-full text-white text-center py-2 z-50 shadow-lg bg-[rgba(255,0,0,1)]">
        <p className="text-base sm:text-lg md:text-xl font-bold px-4 animate-text-pulse-subtle">
          Você GANHOU 1 Analise Completa 100% GRATUITA válida somente até o dia {currentDate}.
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full mt-12">
        {" "}
        {/* Added mt-12 to push content down */}
        {/* Header Section */}
        <header
          className={`flex flex-col items-center text-center mb-12 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div
            className={`flex items-center justify-center gap-4 mb-6 transition-all ${
              isMobile ? "duration-500" : "duration-1200"
            } ease-out delay-200 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="w-16 h-16 flex items-center justify-center">
              <Image
                src="/images/whatsapp-logo.webp"
                alt="WhatsApp Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                loading="eager"
                priority
              />
            </div>
            <h1
              className={`text-5xl font-extrabold tracking-tight text-whatsapp-accent-main ${
                isMobile ? "" : "animate-title-glow"
              } flex flex-col items-center`}
            >
              <span className="text-6xl">WHATS</span>
              <span className="text-4xl">ESPIÃO</span>
            </h1>
            <div className="w-16 h-16 flex items-center justify-center">
              <Image
                src="/images/whatsapp-logo.webp"
                alt="WhatsApp Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 max-w-2xl text-whatsapp-text-light transition-all duration-1000 ease-out delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A desconfiança te paralisa? Descubra o histórico de conversas no WhatsApp.
          </h2>
          <p
            className={`text-whatsapp-text-light mb-8 max-w-3xl transition-all duration-1000 ease-out delay-500 text-base ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Milhões de pessoas usam o WhatsApp para esconder segredos. Nossa tecnologia expõe conversas e te dá a prova
            que você precisa. Chega de noites em claro e incerteza.
          </p>

          <div
            className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 ease-out delay-600 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark text-sm font-medium shadow-md text-white">
              <ShieldCheck className="w-4 h-4" />
              100% Seguro
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark text-sm font-medium shadow-md text-white">
              <CheckCircle className="w-5 h-5" />
              Resultados Precisos
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark text-sm font-medium shadow-md text-white">
              <Lock className="w-4 h-4" />
              Totalmente Anônimo
            </div>
          </div>

          <div
            className={`flex items-center gap-2 text-lg font-semibold mb-4 text-white transition-all duration-1000 ease-out delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current text-[rgba(255,214,0,1)]" />
            ))}
            4.9/5.0
          </div>
          <p
            className={`text-whatsapp-text-light text-sm max-w-xl transition-all duration-1000 ease-out delay-800 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Junte-se às mais de <span className="font-bold text-whatsapp-text-light">7 mil pessoas</span> que usaram
            hoje para descobrir a verdade.
            <br />
            <span className="text-emerald-500 text-sm">(+50.000 investigações de sucesso)</span>
          </p>
        </header>
        {/* Call to Action Button */}
        <Button
          onClick={scrollToInvestigation}
          className={`w-full max-w-xs py-6 rounded-xl text-xl font-bold shadow-xl hover:opacity-90 hover:shadow-2xl hover:scale-105 transition-all mb-4 text-black animate-led-pulse border-2 duration-1000 ease-out delay-900 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            background: "linear-gradient(45deg, #25D366, #1DA851)",
            borderColor: "#25D366",
            boxShadow:
              "0 0 3px #25D366, 0 0 6px #25D366, 0 0 9px #25D366, 0 0 12px #25D366, 0 0 18px #25D366, 0 0 22px #25D366",
          }}
        >
          <Heart className="w-6 h-6 mr-2 text-white" />
          <span className="text-white">Descubra a Verdade</span>
        </Button>
        {/* Texto de Escassez */}
        <p
          className={`text-sm font-semibold mb-16 text-center animate-title-glow text-white transition-all duration-1000 ease-out delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Investigação válida até {currentDate}
        </p>
        {/* What You'll Discover Section */}
        <section
          className={`w-full max-w-4xl mb-16 transition-all duration-1200 ease-out delay-1200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative p-8 rounded-xl overflow-hidden border border-transparent">
            <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
            <div className="relative z-10">
              <h3
                className={`text-3xl font-bold text-center px-0 py-0 mt-[-33px] text-[rgba(36,206,99,1)] ${
                  isMobile ? "" : "animate-led-text-glow"
                } mb-6`}
              >
                O QUE VOCÊ VAI DESCOBRIR SOBRE SEU PARCEIRO
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`flex items-start gap-4 p-6 rounded-lg border border-hacking-primary/50 ${
                    isMobile ? "" : "animate-led-glow-pulse"
                  } backdrop-blur-sm bg-black/20`}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 mt-1 ${
                      isMobile ? "" : "animate-hacking-icon-glow-primary"
                    }`}
                  >
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-hacking-primary mb-2">ATIVIDADE RECENTE</h4>
                    <p className="text-whatsapp-text-light text-base">
                      Veja quando ele(a) usou o WhatsApp pela última vez - até mesmo hoje HOJE
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-6 rounded-lg border border-hacking-primary/50 ${
                    isMobile ? "" : "animate-led-glow-pulse"
                  } backdrop-blur-sm bg-black/20`}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 mt-1 ${
                      isMobile ? "" : "animate-hacking-icon-glow-primary"
                    }`}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-hacking-primary mb-2">LOCALIZAÇÃO EXATA</h4>
                    <p className="text-whatsapp-text-light text-base">
                      Onde ele(a) está marcando encontros às suas costas
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-6 rounded-lg border border-hacking-primary/50 ${
                    isMobile ? "" : "animate-led-glow-pulse"
                  } backdrop-blur-sm bg-black/20`}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 mt-1 ${
                      isMobile ? "" : "animate-hacking-icon-glow-primary"
                    }`}
                  >
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-hacking-primary mb-2">FOTOS ÍNTIMAS</h4>
                    <p className="text-whatsapp-text-light text-base">
                      Todas as fotos que ele(a) está mostrando para outros
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-4 p-6 rounded-lg border border-hacking-primary/50 ${
                    isMobile ? "" : "animate-led-glow-pulse"
                  } backdrop-blur-sm bg-black/20`}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 mt-1 ${
                      isMobile ? "" : "animate-hacking-icon-glow-primary"
                    }`}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-hacking-primary mb-2">CONVERSAS EXPLÍCITAS</h4>
                    <p className="text-whatsapp-text-light text-base">O que ele(a) está dizendo para outras pessoas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Investigation Form Section */}
        <section
          id="investigation-form"
          className={`w-full max-w-md p-8 rounded-xl bg-gradient-section-bg relative overflow-hidden border border-transparent animate-glow-pulse transition-all duration-1200 ease-out delay-1500 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
          <div className="relative z-10">
            <p
              className={`text-center text-whatsapp-text-light mb-6 text-xl italic transition-all duration-800 ease-out delay-1600 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Você vai continuar na dúvida enquanto outros descobrem a verdade?
            </p>
            <div
              className={`flex items-center justify-center gap-2 mb-6 transition-all duration-800 ease-out delay-1700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="font-bold bg-clip-text bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark text-center text-4xl animate-pulse text-[rgba(21,255,0,1)]">
                INVESTIGUE ELE(A) AGORA!
              </h3>
            </div>
            <p
              className={`text-center text-whatsapp-text-light mb-8 max-w-2xl mx-auto transition-all duration-800 ease-out delay-1800 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Um simples número de telefone é tudo o que precisamos para revelar se a sua confiança está sendo traída.
            </p>

            <p
              className={`text-center font-semibold mb-4 text-whatsapp-text-light text-2xl transition-all duration-800 ease-out delay-1900 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Quem você quer investigar?
            </p>
            <div
              className={`flex justify-center gap-6 mb-8 transition-all duration-800 ease-out delay-2000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={selectedGender === "male"}
                    onChange={() => handleGenderSelection("male")}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      selectedGender === "male"
                        ? "border-whatsapp-blue-selected bg-whatsapp-blue-selected shadow-blue-glow"
                        : "border-gray-400 bg-transparent"
                    }`}
                  >
                    {selectedGender === "male" && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/whatsapp-white-logo.webp"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-semibold text-whatsapp-text-light group-hover:text-whatsapp-accent-main transition-colors">
                    Homem
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={selectedGender === "female"}
                    onChange={() => handleGenderSelection("female")}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                      selectedGender === "female"
                        ? "border-whatsapp-pink-selected bg-whatsapp-pink-selected shadow-pink-glow"
                        : "border-gray-400 bg-transparent"
                    }`}
                  >
                    {selectedGender === "female" && (
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/whatsapp-white-logo.webp"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-lg font-semibold text-whatsapp-text-light group-hover:text-whatsapp-accent-main transition-colors">
                    Mulher
                  </span>
                </div>
              </label>
            </div>

            <p
              className={`text-center text-lg font-semibold mb-2 text-whatsapp-text-light transition-all duration-800 ease-out delay-2100 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Número de Whatsapp:
            </p>
            <Input
              type="tel"
              placeholder="(11) 11111-1111"
              className={`w-full py-3 px-4 rounded-lg border border-whatsapp-border-light text-center text-lg mb-6 focus:border-whatsapp-accent-main focus:ring-whatsapp-accent-main bg-white text-black transition-all duration-800 ease-out delay-2200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              value={phoneNumber}
              onChange={handlePhoneChange}
              onFocus={handlePhoneInputFocus}
            />
            {showPhoneWarning && (
              <p className="text-center text-red-400 text-sm mb-4 transition-all duration-300 ease-in-out">
                Por favor, selecione um gênero antes de digitar o número.
              </p>
            )}

            <div
              className={`flex items-center gap-2 p-3 rounded-lg bg-yellow-900/50 text-yellow-300 text-sm mb-6 animate-text-neon-pulse transition-all duration-800 ease-out delay-2300 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <AlertTriangle className="w-4 h-4 animate-icon-neon-pulse" />
              Apenas <span className="font-bold">{remainingVerifications}</span> verificações restantes hoje.
            </div>

            <Button
              onClick={handleExposeTruth}
              disabled={!selectedGender || getCleanPhoneNumber(phoneNumber).length !== 11}
              className={`w-full py-4 rounded-xl text-xl font-bold shadow-xl hover:opacity-90 hover:shadow-2xl hover:scale-105 transition-all mb-6 ${
                isMobile ? "" : "animate-led-pulse"
              } border-2 duration-800 ease-out delay-2400 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                background: "linear-gradient(45deg, #25D366, #14FE00)",
                borderColor: "#25D366",
                boxShadow:
                  "0 0 3px #25D366, 0 0 6px #25D366, 0 0 9px #25D366, 0 0 12px #25D366, 0 0 18px #25D366, 0 0 22px #25D366",
                color: "white",
              }}
            >
              EXPOR A VERDADE AGORA
            </Button>

            <div
              className={`flex items-center gap-2 p-3 rounded-lg bg-green-900/50 text-green-300 text-sm mb-6 animate-subtle-glow transition-all duration-800 ease-out delay-2500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Flame className="w-4 h-4 text-red-500 animate-subtle-glow" />
              <span className="font-semibold">
                @{currentMessage.username} viu as conversas que tentaram esconder {pronoun}.
              </span>
            </div>

            <div
              className={`flex flex-wrap justify-center gap-4 text-sm text-whatsapp-text-light transition-all duration-800 ease-out delay-2600 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                Totalmente Anônimo
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                Sem Rastros
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5" />
                Resultados Instantâneos
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="relative z-10 w-full py-8 border-t border-gray-700/50 mt-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-whatsapp-accent-main transition-colors">
              Políticas de Privacidade
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-whatsapp-accent-main transition-colors">
              Cookies
            </a>
          </div>
          <p className="text-sm text-gray-400">©2025 – Todos os Direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
