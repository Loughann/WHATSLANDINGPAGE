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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WhatsAppBackground from "@/components/whatsapp-background"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

export default function WhatsEspiaoPage() {
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

  // Testimonials carousel state
  const testimonials = [
    {
      name: "Ana S.",
      location: "São Paulo",
      time: "há 2 horas",
      initial: "A",
      text: "Descobri que meu namorado estava marcando encontros no WhatsApp enquanto eu trabalhava. Graças ao WhatsEspião pude pegar ele em flagrante!",
    },
    {
      name: "Carlos R.",
      location: "Rio de Janeiro",
      time: "há 1 hora",
      initial: "C",
      text: "Minha esposa dizia que não usava mais aplicativos, mas descobri que estava ativo TODOS OS DIAS no WhatsApp marcando encontros.",
    },
    {
      name: "Mariana L.",
      location: "Belo Horizonte",
      time: "há 3 horas",
      initial: "M",
      text: "Ele jurava que não conversava com ninguém, mas o relatório mostrou 15 conversas íntimas com outras mulheres. Agora tenho as provas!",
    },
    {
      name: "Roberto M.",
      location: "Salvador",
      time: "há 4 horas",
      initial: "R",
      text: "Minha namorada apagava as conversas, mas o WhatsEspião recuperou TUDO. Vi as fotos que ela mandava para outros caras.",
    },
    {
      name: "Juliana F.",
      location: "Fortaleza",
      time: "há 5 horas",
      initial: "J",
      text: "Descobri que meu marido tinha um perfil fake e conversava com várias mulheres. As evidências estavam todas lá!",
    },
    {
      name: "Lucas P.",
      location: "Brasília",
      time: "há 6 horas",
      initial: "L",
      text: "Ela dizia que estava trabalhando até tarde, mas o relatório mostrou que estava online conversando com ex-namorados.",
    },
    {
      name: "Patrícia S.",
      location: "Recife",
      time: "há 7 horas",
      initial: "P",
      text: "Finalmente consegui as provas que precisava! Ele estava marcando encontros enquanto eu cuidava dos filhos.",
    },
    {
      name: "Diego A.",
      location: "Porto Alegre",
      time: "há 8 horas",
      initial: "D",
      text: "Minha esposa negava tudo, mas o WhatsEspião mostrou as conversas íntimas que ela tinha com o colega de trabalho.",
    },
    {
      name: "Fernanda C.",
      location: "Curitiba",
      time: "há 9 horas",
      initial: "F",
      text: "Descobri que ele tinha 3 relacionamentos paralelos. O relatório mostrou tudo: horários, fotos e conversas.",
    },
    {
      name: "Rafael T.",
      location: "Goiânia",
      time: "há 10 horas",
      initial: "R",
      text: "Ela mentia sobre onde estava. O WhatsEspião revelou que estava se encontrando com outros homens há meses.",
    },
  ]

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const testimonialTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play testimonials carousel
  useEffect(() => {
    if (isAutoPlaying) {
      const autoPlay = () => {
        setCurrentTestimonialIndex((prevIndex) => {
          // Para mobile, avança de 2 em 2
          if (window.innerWidth < 640) {
            return prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 2
          }
          // Para desktop, mantém a lógica original
          return prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 1
        })
        testimonialTimeoutRef.current = setTimeout(autoPlay, 4000)
      }

      testimonialTimeoutRef.current = setTimeout(autoPlay, 4000)
    }

    return () => {
      if (testimonialTimeoutRef.current) {
        clearTimeout(testimonialTimeoutRef.current)
      }
    }
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setIsAutoPlaying(false)
    setCurrentTestimonialIndex((prevIndex) => {
      // Para mobile, avança de 2 em 2
      if (window.innerWidth < 640) {
        return prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 2
      }
      // Para desktop, mantém a lógica original
      return prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 1
    })
    if (testimonialTimeoutRef.current) {
      clearTimeout(testimonialTimeoutRef.current)
    }
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const prevTestimonial = () => {
    setIsAutoPlaying(false)
    setCurrentTestimonialIndex((prevIndex) => {
      // Para mobile, retrocede de 2 em 2
      if (window.innerWidth < 640) {
        return prevIndex <= 0 ? testimonials.length - 2 : prevIndex - 2
      }
      // Para desktop, mantém a lógica original
      return prevIndex <= 0 ? testimonials.length - 2 : prevIndex - 1
    })
    if (testimonialTimeoutRef.current) {
      clearTimeout(testimonialTimeoutRef.current)
    }
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

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
    })
    setCurrentDate(formattedDate)
  }, [])

  // Efeito para diminuir o número de verificações em tempo aleatório
  useEffect(() => {
    const decrementVerifications = () => {
      setRemainingVerifications((prevCount) => {
        if (prevCount > 1) {
          const randomDelay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000 // Atraso aleatório entre 5 e 10 segundos
          timeoutRef.current = setTimeout(decrementVerifications, randomDelay)
          return prevCount - 1
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current) // Limpa o timeout quando chega a 1
          }
          return 1 // Garante que o valor não desça de 1
        }
      })
    }

    // Inicia o primeiro decremento
    const initialDelay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000
    timeoutRef.current = setTimeout(decrementVerifications, initialDelay)

    // Limpa o timeout ao desmontar o componente
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Efeito para alternar as mensagens de usuários
  useEffect(() => {
    const rotateUserMessage = () => {
      setCurrentUserMessageIndex((prevIndex) => (prevIndex + 1) % userMessages.length)
      const randomDelay = Math.floor(Math.random() * (8000 - 4000 + 1)) + 4000 // Atraso aleatório entre 4 e 8 segundos
      userMessageTimeoutRef.current = setTimeout(rotateUserMessage, randomDelay)
    }

    // Inicia a primeira rotação de mensagem
    const initialDelay = Math.floor(Math.random() * (8000 - 4000 + 1)) + 4000
    userMessageTimeoutRef.current = setTimeout(rotateUserMessage, initialDelay)

    // Limpa o timeout ao desmontar o componente
    return () => {
      if (userMessageTimeoutRef.current) {
        clearTimeout(userMessageTimeoutRef.current)
      }
    }
  }, [userMessages.length])

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
          Você possui apenas 1 consulta totalmente gratuita válida somente até dia {currentDate}.
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
            className={`flex items-center justify-center gap-4 mb-6 transition-all duration-1200 ease-out delay-200 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center">
              <Image
                src="/images/whatsapp-logo.webp"
                alt="WhatsApp Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-whatsapp-accent-main animate-title-glow flex flex-col items-center">
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
            className={`text-lg text-whatsapp-text-light mb-8 max-w-3xl transition-all duration-1000 ease-out delay-500 ${
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
            <span className="text-xs text-emerald-500">(+50.000 investigações de sucesso)</span>
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
        {/* Feature Cards Section */}
        <section
          className={`grid md:grid-cols-3 gap-8 w-full max-w-5xl mb-16 transition-all duration-1200 ease-out delay-1100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Card 1: Descubra a Verdade */}
          <div
            className={`w-full p-4 rounded-lg border border-hacking-primary/50 text-center animate-led-glow-pulse transition-all duration-800 ease-out delay-1200 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-whatsapp-accent-main to-whatsapp-accent-dark mb-4">
                <Heart className="w-8 h-8 text-whatsapp-text-light animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark animate-pulse">
                Descubra a Verdade
              </h3>
              <p className="text-whatsapp-text-light">
                Mesmo que ele(a) use um nome falso ou outra foto, nosso sistema encontra. Descubra a verdade que tentam
                esconder de você.
              </p>
            </div>
          </div>

          {/* Card 2: Provas Irrefutáveis */}
          <div
            className={`w-full p-4 rounded-lg border border-hacking-primary/50 text-center animate-led-glow-pulse transition-all duration-800 ease-out delay-1300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-whatsapp-accent-main to-whatsapp-accent-dark mb-4">
                <MessageCircle className="w-8 h-8 text-whatsapp-text-light animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark animate-pulse">
                Provas Irrefutáveis
              </h3>
              <p className="text-whatsapp-text-light">
                Veja com quem ele(a) conversa, as fotos que usa e até o início das conversas. A verdade, na palma da sua
                mão.
              </p>
            </div>
          </div>

          {/* Card 3: Proteja-se com Sigilo */}
          <div
            className={`w-full p-4 rounded-lg border border-hacking-primary/50 text-center animate-led-glow-pulse transition-all duration-800 ease-out delay-1400 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-gradient-to-br from-whatsapp-accent-main to-whatsapp-accent-dark mb-4">
                <ShieldCheck className="w-8 h-8 text-whatsapp-text-light animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark animate-pulse">
                Proteja-se com Sigilo
              </h3>
              <p className="text-whatsapp-text-light">
                Sua identidade é 100% protegida. Ele(a) NUNCA saberá que você investigou. Aja com segurança e recupere
                sua paz.
              </p>
            </div>
          </div>
        </section>
        {/* What You'll Discover Section */}
        <section
          className={`w-full max-w-4xl mb-16 transition-all duration-1200 ease-out delay-1200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative p-8 rounded-xl overflow-hidden border border-transparent">
            <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center text-hacking-primary animate-led-text-glow mb-8">
                O QUE VOCÊ VAI DESCOBRIR SOBRE SEU PARCEIRO
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 rounded-lg border border-hacking-primary/50 animate-led-glow-pulse backdrop-blur-sm bg-black/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 mt-1 animate-hacking-icon-glow-primary">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-hacking-primary mb-2">ATIVIDADE RECENTE</h4>
                    <p className="text-whatsapp-text-light text-base">
                      Veja quando ele(a) usou o WhatsApp pela última vez - até mesmo hoje HOJE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg border border-hacking-primary/50 animate-led-glow-pulse backdrop-blur-sm bg-black/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 mt-1 animate-hacking-icon-glow-primary">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-hacking-primary mb-2">LOCALIZAÇÃO EXATA</h4>
                    <p className="text-whatsapp-text-light text-base">
                      Onde ele(a) está marcando encontros às suas costas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg border border-hacking-primary/50 animate-led-glow-pulse backdrop-blur-sm bg-black/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 mt-1 animate-hacking-icon-glow-primary">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-hacking-primary mb-2">FOTOS ÍNTIMAS</h4>
                    <p className="text-whatsapp-text-light text-base">
                      Todas as fotos que ele(a) está mostrando para outros
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-lg border border-hacking-primary/50 animate-led-glow-pulse backdrop-blur-sm bg-black/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 mt-1 animate-hacking-icon-glow-primary">
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
        {/* Testimonials Carousel Section */}
        <section
          className={`w-full max-w-4xl mb-16 transition-all duration-1200 ease-out delay-1300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative p-4 sm:p-8 rounded-xl overflow-hidden border border-transparent">
            <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-hacking-primary animate-led-text-glow mb-6 sm:mb-8">
                NÃO FIQUE NA DÚVIDA - VEJA O QUE OUTROS DESCOBRIRAM
              </h3>

              {/* Mobile Version - Stack Layout */}
              <div className="block sm:hidden">
                <div className="space-y-4">
                  {/* Show only 2 testimonials at a time on mobile */}
                  {testimonials
                    .slice(currentTestimonialIndex, currentTestimonialIndex + 2)
                    .map((testimonial, index) => (
                      <div
                        key={currentTestimonialIndex + index}
                        className="flex gap-3 p-4 rounded-lg border border-hacking-primary/50 animate-led-glow-pulse backdrop-blur-sm bg-black/20"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 animate-hacking-icon-glow-primary">
                          <span className="text-white font-bold text-sm">{testimonial.initial}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <h4 className="font-bold text-hacking-primary text-sm">{testimonial.name}</h4>
                            <p className="text-gray-400 text-xs">
                              {testimonial.location} • {testimonial.time}
                            </p>
                          </div>
                          <p className="text-whatsapp-text-light italic text-xs leading-relaxed">
                            "{testimonial.text}"
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center hover:opacity-80 transition-opacity shadow-lg"
                    aria-label="Depoimento anterior"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>

                  {/* Mobile Dots Indicator */}
                  <div className="flex gap-2">
                    {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentTestimonialIndex(index * 2)
                          setIsAutoPlaying(false)
                          if (testimonialTimeoutRef.current) {
                            clearTimeout(testimonialTimeoutRef.current)
                          }
                          setTimeout(() => setIsAutoPlaying(true), 8000)
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          Math.floor(currentTestimonialIndex / 2) === index
                            ? "bg-whatsapp-accent-main w-4"
                            : "bg-gray-500"
                        }`}
                        aria-label={`Ir para página ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center hover:opacity-80 transition-opacity shadow-lg"
                    aria-label="Próximo depoimento"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Desktop Version - Original Carousel */}
              <div className="hidden sm:block">
                <div className="relative">
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center hover:opacity-80 transition-opacity shadow-lg"
                    aria-label="Depoimento anterior"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center hover:opacity-80 transition-opacity shadow-lg"
                    aria-label="Próximo depoimento"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>

                  {/* Testimonials Container */}
                  <div className="overflow-hidden mx-12">
                    <div
                      className="flex transition-transform duration-500 ease-in-out gap-6"
                      style={{
                        transform: `translateX(-${currentTestimonialIndex * 50}%)`,
                      }}
                    >
                      {testimonials.map((testimonial, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-1/2 flex gap-4 p-4 rounded-lg border border-hacking-primary/50 animate-led-glow-pulse backdrop-blur-sm bg-black/20"
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-whatsapp-accent-main to-whatsapp-accent-dark flex items-center justify-center flex-shrink-0 animate-hacking-icon-glow-primary">
                            <span className="text-white font-bold text-lg">{testimonial.initial}</span>
                          </div>
                          <div>
                            <div className="mb-2">
                              <h4 className="font-bold text-hacking-primary">{testimonial.name}</h4>
                              <p className="text-gray-400 text-sm">
                                {testimonial.location} • {testimonial.time}
                              </p>
                            </div>
                            <p className="text-whatsapp-text-light italic text-sm leading-relaxed">
                              "{testimonial.text}"
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Dots Indicator */}
                  <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: testimonials.length - 1 }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentTestimonialIndex(index)
                          setIsAutoPlaying(false)
                          if (testimonialTimeoutRef.current) {
                            clearTimeout(testimonialTimeoutRef.current)
                          }
                          setTimeout(() => setIsAutoPlaying(true), 8000)
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTestimonialIndex
                            ? "bg-whatsapp-accent-main w-6"
                            : "bg-gray-500 hover:bg-gray-400"
                        }`}
                        aria-label={`Ir para depoimento ${index + 1}`}
                      />
                    ))}
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
              className={`w-full py-4 rounded-xl text-xl font-bold shadow-xl hover:opacity-90 hover:shadow-2xl hover:scale-105 transition-all mb-6 animate-led-pulse border-2 duration-800 ease-out delay-2400 ${
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
    </div>
  )
}
