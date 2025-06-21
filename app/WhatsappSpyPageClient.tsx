"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Eye,
  ShieldCheck,
  CheckCircle,
  Lock,
  Star,
  Phone,
  TriangleAlert,
  Flame,
  BarChart2,
  Zap,
  Users,
  MessageSquare,
  Calendar,
  MapPin,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  CheckCircle2,
} from "lucide-react"

export default function WhatsappSpyPageClient() {
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [verificationsLeft, setVerificationsLeft] = useState(27)

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const reviews = [
    {
      name: "Ana Silva",
      comment:
        "Descobri tudo que precisava saber. O relatório foi muito detalhado e me ajudou a tomar uma decisão importante que já tinha que ter tomado.",
      date: "2 dias atrás",
    },
    {
      name: "Juliana Moraes",
      comment:
        "Funcionou perfeitamente! Em poucos minutos tinha todas as informações que procurava há meses, nem acredito rs",
      date: "1 semana atrás",
    },
    {
      name: "Maria Oliveira",
      comment: "Recomendo 100%. Finalmente consegui as provas que precisava. Muito fácil de usar.",
      date: "3 dias atrás",
    },
    {
      name: "Rafaela Muniz",
      comment: "Amei esse serviço, ass informações eram exatamente o que eu suspeitava. arrasou",
      date: "5 dias atrás",
    },
    {
      name: "Fernanda Lima",
      comment:
        "Rápido e eficiente. O relatório completo me mostrou tudo que eu precisava saber sobre as conversas e até coisas que nem imaginava...",
      date: "1 dia atrás",
    },
  ]

  const firstResultSectionRef = useRef<HTMLDivElement>(null)

  const successMessages = [
    "@Maria_santos descobriu as mensagens que tentavam esconder dela.",
    "@Ana_costa viu as conversas secretas do marido.",
    "@Carla_lima encontrou as provas que precisava da traição.",
    "@Fernanda_silva descobriu as conversas apagadas.",
    "@Juliana_rocha viu as mensagens que tentaram ocultar.",
    "@Patricia_alves encontrou as evidências da infidelidade.",
    "@Camila_ferreira descobriu as conversas comprometedoras.",
    "@Beatriz_martins viu as mensagens que confirmaram suas suspeitas.",
    "@Larissa_oliveira encontrou as provas da mentira.",
    "@Gabriela_souza descobriu as conversas que mudaram tudo.",
    "@Renata_pereira viu as mensagens que ele tentou apagar.",
    "@Vanessa_rodrigues descobriu a verdade sobre as saídas noturnas.",
    "@Luciana_barbosa encontrou as conversas com a amante.",
    "@Daniela_cardoso viu as fotos que confirmaram a traição.",
    "@Roberta_nascimento descobriu as ligações escondidas.",
    "@Priscila_moreira encontrou as mensagens de madrugada.",
    "@Tatiana_gomes viu as conversas que explicavam tudo.",
    "@Simone_ribeiro descobriu os encontros secretos.",
    "@Claudia_machado encontrou as provas que procurava há meses.",
    "@Adriana_teixeira viu as mensagens que mudaram sua vida.",
    "@Mariana_correia descobriu as conversas íntimas com outra.",
    "@Cristina_dias encontrou as evidências da dupla vida.",
    "@Sabrina_monteiro viu as mensagens que confirmaram a suspeita.",
    "@Eliane_castro descobriu as conversas que tentaram esconder.",
    "@Monica_vieira encontrou as provas da infidelidade emocional.",
    "@Raquel_azevedo viu as mensagens comprometedoras no trabalho.",
    "@Silvia_ramos descobriu as conversas durante as viagens.",
    "@Denise_freitas encontrou as evidências que precisava para decidir.",
    "@Luana_carvalho viu as mensagens que explicavam os atrasos.",
    "@Viviane_mendes descobriu a verdade sobre os fins de semana.",
  ]

  const getRandomInterval = () => {
    // Retorna um tempo aleatório entre 8 e 15 segundos (muito mais lento)
    return Math.floor(Math.random() * 7000) + 8000
  }

  const getRandomVerificationInterval = () => {
    // Retorna um tempo aleatório entre 5 e 18 segundos para diminuir verificações
    return Math.floor(Math.random() * 13000) + 5000
  }

  useEffect(() => {
    const scheduleNextChange = () => {
      const randomTime = getRandomInterval()
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % successMessages.length)
        scheduleNextChange() // Agenda a próxima mudança com um novo tempo aleatório
      }, randomTime)
    }

    scheduleNextChange()

    // Cleanup não é necessário pois estamos usando setTimeout recursivo
    return () => {}
  }, [])

  useEffect(() => {
    const scheduleVerificationDecrease = () => {
      if (verificationsLeft > 0) {
        const randomTime = getRandomVerificationInterval()
        setTimeout(() => {
          setVerificationsLeft((prev) => Math.max(0, prev - 1))
          scheduleVerificationDecrease() // Agenda a próxima diminuição
        }, randomTime)
      }
    }

    scheduleVerificationDecrease()

    return () => {}
  }, [verificationsLeft])

  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 4000) // Muda a cada 4 segundos

    return () => clearInterval(reviewInterval)
  }, [reviews.length])

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "")

    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11)

    // Aplica a máscara (11) 11111-1111
    if (limitedNumbers.length <= 2) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`
    }
  }

  const getCarrier = (phoneNumber: string) => {
    // Remove formatação e pega apenas números
    const numbers = phoneNumber.replace(/\D/g, "")

    if (numbers.length < 11) return "Desconhecida"

    const ddd = numbers.slice(0, 2)
    const firstDigit = numbers.charAt(2)
    const secondDigit = numbers.charAt(3)

    // Lógica baseada em DDDs e padrões das operadoras brasileiras
    if (firstDigit === "9") {
      const prefix = secondDigit

      // Vivo (prefixos mais comuns)
      if (["6", "7", "8", "9"].includes(prefix)) {
        return "Vivo"
      }
      // Claro (prefixos mais comuns)
      if (["1", "2", "3"].includes(prefix)) {
        return "Claro"
      }
      // TIM (prefixos mais comuns)
      if (["4", "5"].includes(prefix)) {
        return "TIM"
      }
      // Oi (prefixo comum)
      if (prefix === "0") {
        return "Oi"
      }
    }

    return "Operadora Móvel"
  }

  const isPhoneNumberComplete = (phoneNumber: string) => {
    // Remove formatação e pega apenas números
    const numbers = phoneNumber.replace(/\D/g, "")
    // Verifica se tem exatamente 11 dígitos (DDD + 9 dígitos do celular)
    return numbers.length === 11
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const handleExposeTruth = () => {
    setIsLoading(true)
    // Diminui uma verificação imediatamente ao usar o serviço
    setVerificationsLeft((prev) => Math.max(0, prev - 1))

    // Simulate API call or data processing
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)

      // Scroll automático para a primeira seção após um pequeno delay
      setTimeout(() => {
        if (firstResultSectionRef.current) {
          firstResultSectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }, 500) // 500ms delay para garantir que a seção foi renderizada
    }, 4000) // 4 seconds loading time
  }

  const conversationSnippets = [
    { id: 1, title: "Trecho de Conversa #1" },
    { id: 2, title: "Trecho de Conversa #2" },
  ]

  const hiddenMedia = [{ id: 1, title: "Foto Oculta #1" }]

  const callHistory = [
    { id: 1, type: "incoming", time: "12 min 40s", status: "answered" },
    { id: 2, type: "outgoing", time: "08 min 23s", status: "answered" },
    { id: 3, type: "missed", time: "Não atendida", status: "missed" },
    { id: 4, type: "incoming", time: "05 min 09s", status: "answered" },
    { id: 5, type: "missed", time: "Não atendida", status: "missed" },
  ]

  const conversationPatterns = [
    { icon: Zap, title: "Última Conversa Detectada", value: "Hoje, 2:17 AM" },
    { icon: BarChart2, title: "Frequência de Conversas", value: "Muito Ativo" },
    { icon: Users, title: "Novos Contatos Recentes", value: "3 nas últimas 24h" },
    { icon: MessageSquare, title: "Padrão de Mensagens", value: "7 conversas iniciadas" },
    { icon: Calendar, title: "Horários de Atividade", value: "Padrão Noturno (22h - 3h)" },
    { icon: MapPin, title: "Local de Acesso Suspeito", value: "Login fora da cidade" },
  ]

  const fullReportFeatures = [
    "Fotos e vídeos das conversas",
    "Conteúdo completo das mensagens (arquivadas, antigas e atuais)",
    "Lista de contatos e interações recentes",
    "Início e conteúdo de conversas suspeitas",
    "Padrões de atividade e horários de conversa",
    "Localizações de acesso às conversas",
  ]

  return (
    <>
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 tracking-normal">
        <div className="relative w-full max-w-md mx-auto p-6 md:p-8 rounded-xl border border-[#00FF00] shadow-[0_0_20px_rgba(0,255,0,0.7)] overflow-hidden">
          {/* Binary background effect - simplified */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-green-500 text-xs font-mono"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
              >
                {Math.random() > 0.5 ? "0" : "1"}
              </div>
            ))}
          </div>

          <div className="relative z-10 text-center space-y-8">
            {/* Header */}
            <div className="flex items-center justify-center gap-4">
              <div className="bg-green-500 rounded-full p-2 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-green-500 text-5xl md:text-6xl font-bold tracking-wider drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] leading-none animate-pulse-glow">
                <div>WHATS</div>
                <div>ESPIÃO</div>
              </div>
              <div className="bg-green-500 rounded-full p-2 flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mt-8">
              A desconfiança te paralisa? Descubra o histórico de conversas no WhatsApp.
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-300">
              Milhões de pessoas usam o WhatsApp para esconder segredos. Nossa tecnologia expõe conversas e te dá a
              prova que você precisa. Chega de noites em claro e incerteza.
            </p>

            {/* Feature Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 rounded-full px-4 py-2 text-sm w-[calc(50%-0.375rem)]">
                <ShieldCheck className="w-4 h-4" />
                100% Seguro
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 rounded-full px-4 py-2 text-sm w-[calc(50%-0.375rem)]">
                <CheckCircle className="w-4 h-4" />
                Resultados Precisos
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 rounded-full px-4 py-2 text-sm w-[calc(70%-0.375rem)]">
                <Lock className="w-4 h-4" />
                Totalmente Anônimo
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-lg">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4.9 ? "fill-yellow-400" : "fill-gray-600"}`} />
              ))}
              <span className="text-white ml-2">4.9/5.0</span>
            </div>

            {/* Call to Action */}
            <p className="text-sm md:text-base text-gray-300">
              Junte-se às mais de <strong className="text-green-500">7 mil pessoas</strong> que usaram hoje para
              descobrir a verdade. <br />
              <span className="text-xs text-green-600">(+50.000 investigações de sucesso)</span>
            </p>

            {/* Seção de Avaliações */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-green-500">O que dizem nossos usuários:</h3>
              <div className="relative overflow-hidden bg-black rounded-lg p-4 border border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.6)]">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
                >
                  {reviews.map((review, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <div className="bg-black rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">"{review.comment}"</p>
                        <p className="text-xs text-green-400 font-medium">- {review.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  {reviews.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentReviewIndex ? "bg-green-500" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Mensagem discreta sobre anonimato */}
            <p className="text-xs text-gray-500 text-center italic mt-2">
              * Fotos de perfil não exibidas para preservar o anonimato dos usuários
            </p>

            {/* Separator */}
            <div className="w-full h-px bg-gray-700 my-8" />

            {/* Form Section */}
            <div className="space-y-6">
              <p className="text-sm md:text-base text-gray-300">
                Você vai continuar na dúvida enquanto outros descobrem a verdade?
              </p>
              <h2 className="font-extrabold text-green-500 leading-tight animate-pulse-glow drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] text-4xl">
                ACABE COM A ANGÚSTIA
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                Um simples número de telefone é tudo o que precisamos para revelar se a sua confiança está sendo traída.
              </p>

              {/* Gender Selection */}
              <div className="text-left space-y-2">
                <h3 className="font-semibold text-center text-2xl">Quem você quer investigar?</h3>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setSelectedGender("male")}
                    disabled={isLoading || showResults}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedGender === "male" ? "bg-blue-700" : "bg-blue-900 hover:bg-blue-800"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Homem
                  </Button>
                  <Button
                    onClick={() => setSelectedGender("female")}
                    disabled={isLoading || showResults}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedGender === "female" ? "bg-purple-700" : "bg-purple-900 hover:bg-purple-800"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Mulher
                  </Button>
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="text-left space-y-2">
                <h3 className="text-lg font-semibold text-center">Número de Whatsapp:</h3>
                <Input
                  type="tel"
                  placeholder="(11) 11111-1111"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  disabled={isLoading || showResults}
                  className="bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus-visible:ring-green-500 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {!isPhoneNumberComplete(phoneNumber) && phoneNumber.length > 0 && (
                  <p className="text-xs text-yellow-400 text-center flex items-center justify-center gap-1">
                    <TriangleAlert className="w-3 h-3" />
                    Digite o número completo com DDD (11 dígitos)
                  </p>
                )}
              </div>

              {/* Warning Message with Dynamic Scarcity */}
              <div
                className={`text-white p-3 rounded-lg flex items-center gap-2 text-sm transition-all duration-500 ${
                  verificationsLeft === 0
                    ? "bg-red-900 animate-pulse border border-red-500"
                    : verificationsLeft <= 3
                      ? "bg-red-800 animate-pulse"
                      : "bg-[#4A2C00]"
                }`}
              >
                <TriangleAlert
                  className={`w-4 h-4 ${
                    verificationsLeft === 0
                      ? "text-red-200"
                      : verificationsLeft <= 3
                        ? "text-red-300"
                        : "text-[#FFD700]"
                  }`}
                />
                {verificationsLeft === 0 ? (
                  <span className="text-red-200 font-bold">
                    Verificações gratuitas esgotadas hoje! Próximas verificações disponíveis amanhã.
                  </span>
                ) : (
                  <>
                    Apenas{" "}
                    <strong
                      className={`${verificationsLeft <= 3 ? "text-red-300" : "text-[#FFD700]"} transition-all duration-500`}
                    >
                      {verificationsLeft} verificações
                    </strong>{" "}
                    gratuitas hoje.
                  </>
                )}
              </div>

              {/* Main Action Button */}
              <Button
                onClick={handleExposeTruth}
                disabled={isLoading || showResults || !isPhoneNumberComplete(phoneNumber)}
                className={`w-full relative overflow-hidden ${
                  !isPhoneNumberComplete(phoneNumber)
                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-green-500 via-green-600 to-green-500 hover:from-green-400 hover:via-green-500 hover:to-green-400 shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] animate-pulse-led border border-green-400"
                } text-white py-3 text-lg font-bold rounded-lg transition-all duration-300`}
                style={
                  isPhoneNumberComplete(phoneNumber)
                    ? {
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.6), inset 0 0 20px rgba(34, 197, 94, 0.1)",
                        animation: "ledPulse 2s ease-in-out infinite alternate",
                      }
                    : {}
                }
              >
                {/* LED glow effect overlay - só aparece quando o número está completo */}
                {isPhoneNumberComplete(phoneNumber) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                )}

                {isLoading ? (
                  <span className="flex items-center gap-2 relative z-10">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Carregando...
                  </span>
                ) : showResults ? (
                  <span className="relative z-10">ANÁLISE CONCLUÍDA</span>
                ) : !isPhoneNumberComplete(phoneNumber) ? (
                  <span className="relative z-10">DIGITE O NÚMERO COMPLETO</span>
                ) : (
                  <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                    EXPOR A VERDADE AGORA
                  </span>
                )}
              </Button>

              {/* Success Message (always visible as per original image) */}
              <div className="bg-[#4A2C00] text-white p-3 rounded-lg flex items-center gap-2 text-sm transition-all duration-700 ease-in-out">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="transition-all duration-700 ease-in-out">{successMessages[currentMessageIndex]}</span>
              </div>

              {/* Conditional Results Sections */}
              {showResults && (
                <div className="space-y-8 mt-8">
                  {/* Separator for results section */}
                  <div className="w-full h-px bg-gray-700 my-8" />

                  {/* Mini Dashboard - Número Analisado */}
                  <div ref={firstResultSectionRef} className="text-left space-y-4 relative">
                    {/* Indicador visual piscante */}
                    <div className="absolute -left-4 top-0 w-2 h-full bg-green-500 rounded-full animate-pulse opacity-80"></div>

                    <h2 className="text-2xl font-bold text-green-500 flex items-center gap-2 animate-bounce-once">
                      <Phone className="w-6 h-6" />
                      Número Analisado
                      <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full animate-pulse ml-2">
                        NOVO
                      </span>
                    </h2>
                    <div className="bg-gray-800 rounded-lg p-4 border border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.5)] animate-glow-once">
                      <div className="flex items-center gap-3 mb-2">
                        <Phone className="w-6 h-6 text-green-500" />
                        <span className="text-xl font-semibold text-white">{phoneNumber || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-300">Operadora: </span>
                        <span className="text-green-400 font-medium">{getCarrier(phoneNumber)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-full h-px bg-gray-700 my-8" />

                  {/* Capturas de Conversas e Mídias Section */}
                  <div className="text-left space-y-4">
                    <h2 className="text-2xl font-bold text-green-500 flex items-center gap-2">
                      <Eye className="w-6 h-6" />
                      Capturas de Conversas e Mídias
                    </h2>
                    <div className="space-y-3">
                      <div className="bg-gray-800 rounded-lg p-4 border border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.5)] overflow-hidden relative">
                        <div className="flex items-center gap-2 mb-3">
                          <Eye className="w-5 h-5 text-green-500" />
                          <span className="text-lg font-semibold text-green-400">Lista de Conversas Suspeitas #1</span>
                        </div>
                        <div className="relative">
                          <img
                            src="/images/whatsapp-conversations-1.webp"
                            alt="Capturas de conversas comprometedoras"
                            className="w-full rounded-lg border border-green-400 blur-md"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/70 rounded-full p-4 border-2 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.6)]">
                              <Lock className="w-8 h-8 text-green-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-4 border border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.5)] overflow-hidden relative">
                        <div className="flex items-center gap-2 mb-3">
                          <Eye className="w-5 h-5 text-green-500" />
                          <span className="text-lg font-semibold text-green-400">Lista de Conversas Suspeitas #2</span>
                        </div>
                        <div className="relative">
                          <img
                            src="/images/whatsapp-conversations-2.webp"
                            alt="Mais capturas de conversas comprometedoras"
                            className="w-full rounded-lg border border-green-400 blur-md"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/70 rounded-full p-4 border-2 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.6)]">
                              <Lock className="w-8 h-8 text-green-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-4 border border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.5)] overflow-hidden relative">
                        <div className="flex items-center gap-2 mb-3">
                          <Eye className="w-5 h-5 text-green-500" />
                          <span className="text-lg font-semibold text-green-400">Conversa Íntima Interceptada</span>
                        </div>
                        <div className="relative">
                          <img
                            src="/images/whatsapp-chat-evidence.webp"
                            alt="Evidência de conversa íntima comprometedora"
                            className="w-full rounded-lg border border-green-400 blur-md"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/70 rounded-full p-4 border-2 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.6)]">
                              <Lock className="w-8 h-8 text-green-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 flex items-center gap-1 justify-center">
                      <Lock className="w-4 h-4" />
                      Mais 5 trechos de conversas
                    </p>
                  </div>

                  {/* Separator */}
                  <div className="w-full h-px bg-gray-700 my-8" />

                  {/* Histórico de Ligações Section */}
                  <div className="text-left space-y-4">
                    <h2 className="text-2xl font-bold text-green-500">Histórico de Ligações</h2>
                    <p className="text-sm text-gray-300">
                      Detectamos um histórico de chamadas de áudio e vídeo recentes.
                    </p>
                    <div className="space-y-3">
                      {callHistory.map((call) => (
                        <div
                          key={call.id}
                          className="bg-gray-800 rounded-lg p-3 flex items-center justify-between border border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                        >
                          <div className="flex items-center gap-3">
                            {call.type === "incoming" && <PhoneIncoming className="w-5 h-5 text-green-500" />}
                            {call.type === "outgoing" && <PhoneCall className="w-5 h-5 text-green-500" />}
                            {call.type === "missed" && <PhoneMissed className="w-5 h-5 text-red-500" />}
                            <span className="text-gray-300 text-lg font-semibold blur-sm">Usuário Anônimo</span>
                          </div>
                          <span className={`text-sm ${call.status === "missed" ? "text-red-500" : "text-green-500"}`}>
                            {call.time}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400 flex items-center gap-1 justify-center">
                      <Lock className="w-4 h-4" />O conteúdo das chamadas e conversas está disponível no relatório
                      completo.
                    </p>
                  </div>

                  {/* Separator */}
                  <div className="w-full h-px bg-gray-700 my-8" />

                  {/* Análise de Padrões de Conversa Section */}
                  <div className="text-left space-y-4">
                    <h2 className="text-2xl font-bold text-green-500 flex items-center gap-2">
                      <BarChart2 className="w-6 h-6" />
                      Análise de Padrões de Conversa
                    </h2>
                    <div className="space-y-3">
                      {conversationPatterns.map((pattern, index) => (
                        <div
                          key={index}
                          className="bg-gray-800 rounded-lg p-3 flex items-center gap-3 border border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                        >
                          <pattern.icon className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-400">{pattern.title}</p>
                            <p className="text-lg font-semibold text-white">{pattern.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Risk Level Alert */}
                    <div className="bg-red-700 text-white p-4 rounded-lg flex items-center gap-3 mt-6">
                      <TriangleAlert className="w-6 h-6" />
                      <div>
                        <p className="text-lg font-bold">Nível de Risco: Elevado</p>
                        <p className="text-sm">
                          A atividade do perfil indica um alto risco de infidelidade e comportamento secreto.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-full h-px bg-gray-700 my-8" />

                  {/* Relatório Completo Section */}
                  <div className="text-center space-y-6">
                    <p className="text-base text-gray-300">
                      Por um pagamento único de <strong className="text-green-500 text-base">R$9,90</strong>, você terá
                      acesso total e irrestrito a um relatório completo com todas as conversas e mídias. Chega de
                      dúvidas.
                    </p>
                    <div className="space-y-3 text-left">
                      {fullReportFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-300">
                          <CheckCircle2
                            className={`${feature === "Conteúdo completo das mensagens (arquivadas, antigas e atuais)" ? "w-6 h-6" : "w-5 h-5"} text-green-500`}
                          />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-green-500 text-lg font-bold">
                      <Eye className="w-5 h-5" />A Verdade Está a Um Clique
                      <Heart className="w-5 h-5" />
                    </div>
                    <a
                      href="https://whatscheckout.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        className="w-full relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-500 text-white py-3 text-lg font-bold rounded-lg shadow-[0_0_10px_rgba(34,197,94,0.4)] hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300 border border-green-500 animate-pulse"
                        style={{
                          animation: "intensePulse 1.5s ease-in-out infinite alternate",
                        }}
                      >
                        <span className="relative z-10 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">
                          RELATÓRIO COMPLETO POR R$9,90
                        </span>
                      </Button>
                    </a>
                    <p className="text-xs text-gray-400">
                      Pagamento único e 100% seguro. Acesso vitalício às informações.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <style jsx>{`
    @keyframes ledPulse {
      0% {
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), inset 0 0 20px rgba(34, 197, 94, 0.1);
      }
      100% {
        box-shadow: 0 0 40px rgba(34, 197, 94, 0.9), inset 0 0 30px rgba(34, 197, 94, 0.2);
      }
    }
    
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    
    @keyframes bounceOnce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0, -8px, 0);
      }
      70% {
        transform: translate3d(0, -4px, 0);
      }
      90% {
        transform: translate3d(0, -2px, 0);
      }
    }
    
    @keyframes glowOnce {
      0% {
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
      }
      50% {
        box-shadow: 0 0 30px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6);
      }
      100% {
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
      }
    }

    @keyframes intensePulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 10px rgba(34, 197, 94, 0.4), inset 0 0 10px rgba(34, 197, 94, 0.1);
      }
      100% {
        transform: scale(1.05);
        box-shadow: 0 0 25px rgba(34, 197, 94, 0.8), inset 0 0 20px rgba(34, 197, 94, 0.3);
      }
    }
    
    .animate-shimmer {
      animation: shimmer 3s ease-in-out infinite;
    }
    
    .animate-bounce-once {
      animation: bounceOnce 1s ease-out;
    }
    
    .animate-glow-once {
      animation: glowOnce 2s ease-in-out;
    }
  `}</style>
      </div>
    </>
  )
}
