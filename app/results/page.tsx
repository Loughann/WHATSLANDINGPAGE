"use client"
import Image from "next/image"
import {
  Eye,
  AlertTriangle,
  Lock,
  Zap,
  BarChart,
  Users,
  MessageCircle,
  Calendar,
  MapPin,
  PhoneCall,
  Star,
  Navigation,
  Play,
} from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

// Lista de motéis por região/DDD
const motelsByRegion: { [key: string]: { name: string; city: string; state: string; lat: number; lng: number } } = {
  "11": { name: "Motel Luxor", city: "São Paulo", state: "SP", lat: -23.5505, lng: -46.6333 },
  "12": { name: "Motel Vale do Paraíba", city: "São José dos Campos", state: "SP", lat: -23.2237, lng: -45.9009 },
  "13": { name: "Motel Praia Grande", city: "Santos", state: "SP", lat: -23.9618, lng: -46.3322 },
  "14": { name: "Motel Central", city: "Bauru", state: "SP", lat: -22.3208, lng: -49.0608 },
  "15": { name: "Motel Sorocaba Palace", city: "Sorocaba", state: "SP", lat: -23.5015, lng: -47.4526 },
  "16": { name: "Motel Ribeirão", city: "Ribeirão Preto", state: "SP", lat: -21.1704, lng: -47.8103 },
  "17": { name: "Motel Rio Preto", city: "São José do Rio Preto", state: "SP", lat: -20.8197, lng: -49.3794 },
  "18": { name: "Motel Oeste", city: "Presidente Prudente", state: "SP", lat: -22.1256, lng: -51.3895 },
  "19": { name: "Motel Campinas", city: "Campinas", state: "SP", lat: -22.9099, lng: -47.0626 },
  "21": { name: "Ouro | Motel Rio de Janeiro", city: "Rio de Janeiro", state: "RJ", lat: -22.9068, lng: -43.1729 },
  "22": { name: "Motel Campos", city: "Campos dos Goytacazes", state: "RJ", lat: -21.7648, lng: -41.337 },
  "24": { name: "Motel Volta Redonda", city: "Volta Redonda", state: "RJ", lat: -22.5231, lng: -44.1044 },
  "27": { name: "Motel Vitória", city: "Vitória", state: "ES", lat: -20.3155, lng: -40.3128 },
  "28": { name: "Motel Cachoeiro", city: "Cachoeiro de Itapemirim", state: "ES", lat: -20.8487, lng: -41.1129 },
  "31": { name: "Motel BH Palace", city: "Belo Horizonte", state: "MG", lat: -19.9167, lng: -43.9345 },
  "32": { name: "Motel Juiz de Fora", city: "Juiz de Fora", state: "MG", lat: -21.7587, lng: -43.3496 },
  "33": { name: "Motel Governador Valadares", city: "Governador Valadares", state: "MG", lat: -18.8512, lng: -41.9491 },
  "34": { name: "Motel Uberlândia", city: "Uberlândia", state: "MG", lat: -18.9113, lng: -48.2622 },
  "35": { name: "Motel Poços de Caldas", city: "Poços de Caldas", state: "MG", lat: -21.7879, lng: -46.5619 },
  "37": { name: "Motel Divinópolis", city: "Divinópolis", state: "MG", lat: -20.1439, lng: -44.8839 },
  "38": { name: "Motel Montes Claros", city: "Montes Claros", state: "MG", lat: -16.7285, lng: -43.8647 },
  "41": { name: "Motel Curitiba", city: "Curitiba", state: "PR", lat: -25.4284, lng: -49.2733 },
  "42": { name: "Motel Ponta Grossa", city: "Ponta Grossa", state: "PR", lat: -25.0916, lng: -50.1668 },
  "43": { name: "Motel Londrina", city: "Londrina", state: "PR", lat: -23.3045, lng: -51.1696 },
  "44": { name: "Motel Maringá", city: "Maringá", state: "PR", lat: -23.4205, lng: -51.9331 },
  "45": { name: "Motel Foz do Iguaçu", city: "Foz do Iguaçu", state: "PR", lat: -25.5163, lng: -54.5854 },
  "46": { name: "Motel Francisco Beltrão", city: "Francisco Beltrão", state: "PR", lat: -26.0811, lng: -53.0544 },
  "47": { name: "Motel Joinville", city: "Joinville", state: "SC", lat: -26.3044, lng: -48.8487 },
  "48": { name: "Motel Florianópolis", city: "Florianópolis", state: "SC", lat: -27.5954, lng: -48.548 },
  "49": { name: "Motel Chapecó", city: "Chapecó", state: "SC", lat: -27.1009, lng: -52.6156 },
  "51": { name: "Motel Porto Alegre", city: "Porto Alegre", state: "RS", lat: -30.0346, lng: -51.2177 },
  "53": { name: "Motel Pelotas", city: "Pelotas", state: "RS", lat: -31.7654, lng: -52.3376 },
  "54": { name: "Motel Caxias do Sul", city: "Caxias do Sul", state: "RS", lat: -29.1678, lng: -51.1794 },
  "55": { name: "Motel Santa Maria", city: "Santa Maria", state: "RS", lat: -29.6842, lng: -53.8069 },
  "61": { name: "Motel Brasília", city: "Brasília", state: "DF", lat: -15.8267, lng: -47.9218 },
  "62": { name: "Motel Goiânia", city: "Goiânia", state: "GO", lat: -16.6869, lng: -49.2648 },
  "63": { name: "Motel Palmas", city: "Palmas", state: "TO", lat: -10.1689, lng: -48.3317 },
  "64": { name: "Motel Rio Verde", city: "Rio Verde", state: "GO", lat: -17.7973, lng: -50.9249 },
  "65": { name: "Motel Cuiabá", city: "Cuiabá", state: "MT", lat: -15.6014, lng: -56.0979 },
  "66": { name: "Motel Rondonópolis", city: "Rondonópolis", state: "MT", lat: -16.4728, lng: -54.6354 },
  "67": { name: "Motel Campo Grande", city: "Campo Grande", state: "MS", lat: -20.4697, lng: -54.6201 },
  "68": { name: "Motel Rio Branco", city: "Rio Branco", state: "AC", lat: -9.9754, lng: -67.8249 },
  "69": { name: "Motel Porto Velho", city: "Porto Velho", state: "RO", lat: -8.7612, lng: -63.9023 },
  "71": { name: "Motel Salvador", city: "Salvador", state: "BA", lat: -12.9714, lng: -38.5014 },
  "73": { name: "Motel Ilhéus", city: "Ilhéus", state: "BA", lat: -14.788, lng: -39.0208 },
  "74": { name: "Motel Juazeiro", city: "Juazeiro", state: "BA", lat: -9.4111, lng: -40.4986 },
  "75": { name: "Motel Feira de Santana", city: "Feira de Santana", state: "BA", lat: -12.2662, lng: -38.9663 },
  "77": { name: "Motel Barreiras", city: "Barreiras", state: "BA", lat: -12.1527, lng: -44.99 },
  "79": { name: "Motel Aracaju", city: "Aracaju", state: "SE", lat: -10.9472, lng: -37.0731 },
  "81": { name: "Motel Recife", city: "Recife", state: "PE", lat: -8.0476, lng: -34.877 },
  "82": { name: "Motel Maceió", city: "Maceió", state: "AL", lat: -9.6658, lng: -35.7353 },
  "83": { name: "Motel João Pessoa", city: "João Pessoa", state: "PB", lat: -7.1195, lng: -34.845 },
  "84": { name: "Motel Natal", city: "Natal", state: "RN", lat: -5.7945, lng: -35.211 },
  "85": { name: "Motel Fortaleza", city: "Fortaleza", state: "CE", lat: -3.7319, lng: -38.5267 },
  "86": { name: "Motel Teresina", city: "Teresina", state: "PI", lat: -5.0892, lng: -42.8019 },
  "87": { name: "Motel Petrolina", city: "Petrolina", state: "PE", lat: -9.3891, lng: -40.503 },
  "88": { name: "Motel Juazeiro do Norte", city: "Juazeiro do Norte", state: "CE", lat: -7.2304, lng: -39.3158 },
  "89": { name: "Motel Picos", city: "Picos", state: "PI", lat: -7.0776, lng: -41.4669 },
  "91": { name: "Motel Belém", city: "Belém", state: "PA", lat: -1.4558, lng: -48.5044 },
  "92": { name: "Motel Manaus", city: "Manaus", state: "AM", lat: -3.119, lng: -60.0217 },
  "93": { name: "Motel Santarém", city: "Santarém", state: "PA", lat: -2.4093, lng: -54.7081 },
  "94": { name: "Motel Marabá", city: "Marabá", state: "PA", lat: -5.3687, lng: -49.1178 },
  "95": { name: "Motel Boa Vista", city: "Boa Vista", state: "RR", lat: 2.8235, lng: -60.6758 },
  "96": { name: "Motel Macapá", city: "Macapá", state: "AP", lat: 0.0389, lng: -51.0664 },
  "97": { name: "Motel Coari", city: "Coari", state: "AM", lat: -4.0853, lng: -63.1441 },
  "98": { name: "Motel São Luís", city: "São Luís", state: "MA", lat: -2.5387, lng: -44.2825 },
  "99": { name: "Motel Imperatriz", city: "Imperatriz", state: "MA", lat: -5.5242, lng: -47.4821 },
}

// Função para calcular a distância entre dois pontos (Haversine formula simplificada)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Raio da Terra em quilômetros
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distância em km
  return distance
}

// Função para gerar endereço mais realista baseado na localização específica do motel
function generateAddress(motel: { name: string; city: string; state: string; lat: number; lng: number }): string {
  // Endereços específicos baseados nas coordenadas reais dos motéis
  const specificAddresses: { [key: string]: string } = {
    "Ouro | Motel Rio de Janeiro": "R. Aristides Gouveia, 526 - Sepetiba, Rio de Janeiro - RJ, 23535-031",
    "Motel Luxor": "Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200",
    "Motel BH Palace": "Av. Afonso Pena, 867 - Centro, Belo Horizonte - MG, 30130-002",
    "Motel Curitiba": "R. XV de Novembro, 123 - Centro, Curitiba - PR, 80020-310",
    "Motel Porto Alegre": "Av. Borges de Medeiros, 456 - Centro, Porto Alegre - RS, 90020-025",
    "Motel Fortaleza": "Av. Beira Mar, 789 - Meireles, Fortaleza - CE, 60165-121",
    "Motel Salvador": "R. Chile, 321 - Centro, Salvador - BA, 40070-110",
    "Motel Recife": "Av. Boa Viagem, 654 - Boa Viagem, Recife - PE, 51021-000",
    "Motel Brasília": "Esplanada dos Ministérios - Brasília, DF, 70040-010",
    "Motel Manaus": "Av. Eduardo Ribeiro, 987 - Centro, Manaus - AM, 69010-001",
    "Motel Teresina": "Av. Beira Mar, 195 - Centro, Teresina - PI, 79593-457",
    "Motel Belém": "Av. Presidente Vargas, 645 - Campina, Belém - PA, 66017-000",
    "Motel Goiânia": "Av. Anhanguera, 1234 - Setor Central, Goiânia - GO, 74015-100",
    "Motel Cuiabá": "Av. Getúlio Vargas, 567 - Centro Norte, Cuiabá - MT, 78005-370",
    "Motel Campo Grande": "Av. Afonso Pena, 890 - Centro, Campo Grande - MS, 79002-070",
  }

  // Se existe endereço específico, usar ele
  if (specificAddresses[motel.name]) {
    return specificAddresses[motel.name]
  }

  // Fallback para endereço consistente baseado no hash do nome do motel
  const seed = motel.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  const streets = ["R. das Flores", "Av. Principal", "R. Central", "Av. Beira Mar", "R. do Comércio"]
  const neighborhoods = ["Centro", "Vila Nova", "Jardim América", "Bela Vista"]

  const streetIndex = seed % streets.length
  const neighborhoodIndex = (seed + 1) % neighborhoods.length
  const number = 100 + (seed % 899) // Entre 100 e 999
  const cepBase = 10000 + (seed % 89999) // Entre 10000 e 99999
  const cepSuffix = 100 + (seed % 899) // Entre 100 e 999

  return `${streets[streetIndex]}, ${number} - ${neighborhoods[neighborhoodIndex]}, ${motel.city} - ${motel.state}, ${cepBase.toString().padStart(5, "0")}-${cepSuffix.toString().padStart(3, "0")}`
}

// Função para gerar avaliação consistente baseada no nome do motel
function generateRating(motelName: string): { rating: number; reviews: number } {
  // Usar o nome do motel como seed para gerar valores consistentes
  const seed = motelName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const rating = Number.parseFloat((3.5 + (seed % 15) / 10).toFixed(1)) // Entre 3.5 e 5.0
  const reviews = 800 + (seed % 1500) // Entre 800 e 2300
  return { rating, reviews }
}

function buildGoogleMapsEmbedUrl(lat: number, lon: number, placeName: string): string {
  const encodedPlaceName = encodeURIComponent(placeName)
  return `https://www.google.com/maps/embed/v1/view?key=AIzaSyAW616dsHMKfzenwtYWtTAd99ekhk41Prw&center=${lat},${lon}&zoom=16&maptype=roadmap`
}

export default function ResultsPage() {
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutos em segundos
  const [nearestMotel, setNearestMotel] = useState<{
    name: string
    city: string
    state: string
    lat: number
    lng: number
  } | null>(null)
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get("phone") || "(XX) XXXXX-XXXX"

  // Obter uma lista de todos os motéis para seleção
  const allMotels = Object.values(motelsByRegion)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Função para extrair DDD do número de telefone
  function extractDDD(phoneNumber: string): string {
    const cleanPhone = phoneNumber.replace(/\D/g, "")
    if (cleanPhone.length >= 2) {
      return cleanPhone.substring(0, 2)
    }
    return ""
  }

  // Determinar o motel mais próximo com base na localização do usuário
  useEffect(() => {
    // Função para selecionar motel por DDD
    const selectMotelByDDD = () => {
      const ddd = extractDDD(phoneNumber)
      if (ddd && motelsByRegion[ddd]) {
        setNearestMotel(motelsByRegion[ddd])
      } else {
        // Se não encontrar DDD, usar um motel fixo baseado no hash do número
        const phoneHash = phoneNumber.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const motelIndex = phoneHash % allMotels.length
        setNearestMotel(allMotels[motelIndex] || allMotels[0])
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLon = position.coords.longitude

          let closestMotel = null
          let minDistance = Number.POSITIVE_INFINITY

          allMotels.forEach((motel) => {
            const distance = calculateDistance(userLat, userLon, motel.lat, motel.lng)
            if (distance < minDistance) {
              minDistance = distance
              closestMotel = motel
            }
          })

          if (closestMotel) {
            setNearestMotel(closestMotel)
          }
        },
        (error) => {
          console.error("Erro ao obter localização:", error)
          // Fallback: usar DDD do número de telefone
          selectMotelByDDD()
        },
      )
    } else {
      console.warn("Geolocalização não suportada pelo navegador.")
      // Fallback: usar DDD do número de telefone
      selectMotelByDDD()
    }
  }, []) // Dependências vazias para executar apenas uma vez

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-hacking-bg-dark">
      <MatrixBackground />
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl space-y-12">
        {/* Top Alert Section */}
        <div className="w-full p-4 rounded-lg flex items-center justify-center gap-4 shadow-lg border border-red-700 animate-pulse-border bg-[rgba(255,0,0,1)] text-white">
          <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          <h2 className="text-lg sm:text-2xl font-bold text-center">ALERTA: CONVERSA SUSPEITA DETECTADA</h2>
          <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>

        {/* Main Results Card */}
        <div className="relative w-full p-8 rounded-xl bg-hacking-card-bg overflow-hidden border border-transparent animate-glow-pulse">
          <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <h3 className="text-4xl font-bold animate-led-text-glow text-[rgba(0,255,0,1)] text-center">
                Relatórios de Conversas Encontradas
              </h3>
            </div>
            <p className="text-center text-whatsapp-text-light mb-8 max-w-2xl mx-auto">
              As conversas e mídias a seguir foram detectadas e estão protegidas. Desbloqueie para ver o conteúdo
              completo.
            </p>

            {/* Visual Proofs Section */}
            <div className="mb-12">
              <h4 className="text-2xl font-semibold text-hacking-primary mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" /> Capturas de Conversas e Mídias
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="relative w-full h-48 bg-gray-800 rounded-lg flex flex-col items-center justify-center border border-hacking-primary/50 overflow-hidden">
                  <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mb-2" />
                  <p className="text-gray-400 text-lg">Trecho de Conversa #1</p>
                  <Image
                    src="/images/E-agora-né_.webp"
                    alt="Trecho de Conversa de WhatsApp"
                    width={192}
                    height={192}
                    className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50"
                  />
                </div>
                <div className="relative w-full h-48 bg-gray-800 rounded-lg flex flex-col items-center justify-center border border-hacking-primary/50 overflow-hidden">
                  <Lock className="w-10 h-10 sm:w-12 sm:w-12 text-gray-500 mb-2" />
                  <p className="text-gray-400 text-lg">Trecho de Conversa #2</p>
                  <Image
                    src="/images/ZAP-fake.webp"
                    alt="Outro Trecho de Conversa de WhatsApp"
                    width={192}
                    height={192}
                    className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50"
                  />
                </div>
                <div className="relative w-full h-48 bg-gray-800 rounded-lg flex flex-col items-center justify-center border border-hacking-primary/50 overflow-hidden">
                  <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mb-2" />
                  <p className="text-gray-400 text-lg">Foto Oculta #1</p>
                  <Image
                    src="/images/whatsapp-conversation-3.webp"
                    alt="Foto Oculta 2"
                    width={192}
                    height={192}
                    className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50"
                  />
                </div>
              </div>
              <p className="text-center text-gray-300 text-sm mt-4">
                <Lock className="inline-block w-4 h-4 mr-1" /> Mais de 15 trechos de conversas e 37 mídias foram
                encontrados e estão bloqueados.
              </p>
            </div>

            {/* Activity and Behavior Analysis */}
            <div className="mb-12">
              <h4 className="text-2xl font-semibold text-hacking-primary mb-6 flex items-center gap-2">
                <BarChart className="w-5 h-5 sm:w-6 sm:h-6" /> Análise de Padrões de Conversa
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-gray-800 border border-yellow-500/50 flex items-center gap-3">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Última Conversa Detectada</p>
                    <p className="text-white font-semibold">Hoje, 2:17 AM</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-800 border border-blue-500/50 flex items-center gap-3">
                  <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Frequência de Conversas</p>
                    <p className="text-white font-semibold">Muito Ativo</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-800 border border-purple-500/50 flex items-center gap-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Novos Contatos Recentes</p>
                    <p className="text-white font-semibold">3 nas últimas 24h</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-800 border border-pink-500/50 flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Padrão de Mensagens</p>
                    <p className="text-white font-semibold">7 conversas iniciadas</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-800 border border-orange-500/50 flex items-center gap-3">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Horários de Atividade</p>
                    <p className="text-white font-semibold">Padrão Noturno (22h - 3h)</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-800 border flex items-center gap-3 border-[rgba(239,68,68,1)]">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Local de Acesso Suspeito</p>
                    <p className="text-white font-semibold">{nearestMotel?.name || "Localização não identificada"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Level */}
            <div className="w-full p-4 rounded-lg text-center shadow-lg border border-red-700 bg-[rgba(255,0,0,1)] text-white">
              <AlertTriangle className="inline-block w-5 h-5 mr-2" />
              <span className="font-bold">Nível de Risco: Elevado</span>
              <p className="text-sm mt-2">
                A atividade do perfil indica um alto risco de infidelidade e comportamento secreto.
              </p>
            </div>
          </div>
        </div>

        {/* Matches and Interactions Section */}
        <div className="relative w-full p-8 rounded-xl bg-hacking-card-bg overflow-hidden border border-transparent animate-glow-pulse">
          <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <h3 className="text-4xl font-bold text-hacking-primary animate-led-text-glow text-center">
                Contatos Recentes e Interações
              </h3>
            </div>
            <p className="text-center text-whatsapp-text-light mb-8 max-w-2xl mx-auto">
              Encontramos contatos recentes e interações. Os detalhes estão protegidos.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {[
                {
                  name: "Jez****",
                  age: 31,
                  src: "/images/make-clean-mulheres-com-mais-de-40.webp",
                  alt: "Foto de Jezebel",
                },
                { name: "Am****", age: 27, src: "/images/sophia-scaramella.webp", alt: "Foto de Amanda" },
                {
                  name: "Car****",
                  age: 22,
                  src: "/images/saveclip-app-506059474-1135088225043963-181757085848136623-n.webp",
                  alt: "Foto de Carla",
                },
                { name: "Sof****", age: 39, src: "/images/download.webp", alt: "Foto de Sofia" },
              ].map((match, i) => (
                <div
                  key={i}
                  className="relative w-full h-48 bg-gray-800 rounded-lg flex flex-col items-center justify-center border border-hacking-primary/50 overflow-hidden"
                >
                  <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mb-2" />
                  <p className="text-gray-400 text-lg">
                    {match.name}, {match.age}
                  </p>
                  <p className="text-gray-500 text-sm">Contato Recente</p>
                  <Image
                    src={match.src || "/placeholder.svg"}
                    alt={match.alt}
                    width={192}
                    height={192}
                    className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50"
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-gray-300 text-sm mt-4">
              <Lock className="inline-block w-4 h-4 mr-1" /> O relatório completo revela nomes, fotos sem blur e o
              conteúdo das conversas.
            </p>
            <div className="text-center mt-8">
              <Button
                onClick={() => window.open("https://whatscheckout.netlify.app/", "_blank")}
                className="w-full sm:w-auto py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg font-bold shadow-xl hover:opacity-90 hover:shadow-2xl hover:scale-105 transition-all animate-led-pulse border-2 text-neutral-900"
                style={{
                  background: "linear-gradient(45deg, #25D366, #14FE00)",
                  borderColor: "#25D366",
                  boxShadow:
                    "0 0 3px #25D366, 0 0 6px #25D366, 0 0 9px #25D366, 0 0 12px #25D366, 0 0 18px #25D366, 0 0 22px #25D366",
                }}
              >
                ACESSO COMPLETO POR R$14,90
              </Button>
            </div>
          </div>
        </div>

        {/* Call History Section */}
        <div className="relative w-full p-8 rounded-xl bg-hacking-card-bg overflow-hidden border border-transparent animate-glow-pulse">
          <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <h3 className="text-4xl font-bold text-hacking-primary animate-led-text-glow text-center">
                Histórico de Ligações
              </h3>
            </div>
            <p className="text-center text-whatsapp-text-light mb-8 max-w-2xl mx-auto">
              Detectamos um histórico de chamadas de áudio e vídeo recentes.
            </p>

            <div className="space-y-4 blur-sm">
              {[
                { name: "Ana****", time: "Hoje, 21:14", duration: "12 min 45s", type: "received" },
                { name: "Sab****", time: "Ontem, 18:32", duration: "03 min 21s", type: "received" },
                { name: "Jul****", time: "13/06/2025", status: "Não atendida", type: "missed" },
                { name: "Lar****", time: "13/06/2025", duration: "28 min 09s", type: "received" },
                { name: "Cam****", time: "11/06/2025", status: "Não atendida", type: "missed" },
              ].map((call, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-800 border border-hacking-primary/30"
                >
                  <div className="flex items-center gap-3">
                    {call.type === "received" ? (
                      <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    ) : (
                      <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 rotate-180" />
                    )}
                    <div>
                      <p className="text-white font-semibold">{call.name}</p>
                      <p className="text-gray-400 text-sm">{call.time}</p>
                    </div>
                  </div>
                  {call.duration && <p className="text-white font-semibold">{call.duration}</p>}
                  {call.status && <p className="font-semibold text-[rgba(248,113,113,1)]">{call.status}</p>}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-300 text-sm mt-4">
              <Lock className="inline-block w-4 h-4 mr-1" /> O conteúdo das chamadas e conversas está disponível no
              relatório completo.
            </p>
          </div>
        </div>

        {/* Suspicious Keywords Section */}
        <div className="relative w-full p-8 rounded-xl bg-hacking-card-bg overflow-hidden border border-transparent animate-glow-pulse">
          <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <h3 className="text-4xl font-bold text-hacking-primary animate-led-text-glow text-center">
                Palavras-chave Suspeitas
              </h3>
            </div>

            <p className="text-whatsapp-text-light mb-6">
              O sistema escaneou <span className="text-red-400 font-bold">4.327 mensagens</span> e identificou várias
              palavras-chave que podem indicar comportamento suspeito.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { word: "Gostosa", count: 13 },
                { word: "Amor", count: 9 },
                { word: "Segredo", count: 8 },
                { word: "Escondido", count: 6 },
                { word: "Não conta", count: 5 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                  <span className="text-whatsapp-text-light font-medium">"{item.word}"</span>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-300 text-sm mt-4">
              <Lock className="inline-block w-4 h-4 mr-1" /> Desbloqueie as conversas privadas e descubra pra quem ele
              está enviando mensagens suspeitas
            </p>
          </div>
        </div>

        {/* Suspicious Location Section */}
        <div className="relative w-full p-8 rounded-xl bg-hacking-card-bg overflow-hidden border border-transparent animate-glow-pulse">
          <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <h3 className="text-4xl font-bold text-hacking-primary animate-led-text-glow text-center">
                Localização Suspeita
              </h3>
            </div>

            <p className="text-whatsapp-text-light mb-6">
              O número <span className="font-bold text-hacking-primary">{phoneNumber}</span> esteve neste motel{" "}
              <span className="font-bold text-hacking-primary">
                {nearestMotel?.name || "Localização não identificada"}
              </span>{" "}
              nos últimos <span className="text-red-400 font-bold">7 dias</span>. Este é o motel mais próximo da sua
              localização atual. Abaixo está a localização exata registrada.
            </p>

            <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-800 border border-hacking-primary/30">
              {nearestMotel && (
                <div className="relative">
                  <iframe
                    key={`${nearestMotel.lat}-${nearestMotel.lng}`}
                    src={buildGoogleMapsEmbedUrl(
                      nearestMotel.lat,
                      nearestMotel.lng,
                      `${nearestMotel.name}, ${nearestMotel.city}, ${nearestMotel.state}`,
                    )}
                    width="100%"
                    height="400"
                    style={{ border: 0, pointerEvents: "none" }}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-96 rounded-lg"
                    allowFullScreen={false}
                  />

                  {/* Overlay com blur que cobre todo o mapa */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-5"></div>

                  {/* Google Maps Info Window - Posicionada nas coordenadas exatas do motel */}
                  <div className="absolute top-4 left-4 z-20 bg-white rounded-lg shadow-lg border border-gray-200 max-w-xs">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight pr-2">{nearestMotel.name}</h4>
                        <button className="text-blue-600 text-xs font-medium hover:underline flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          Rotas
                        </button>
                      </div>

                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{generateAddress(nearestMotel)}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-gray-900">
                            {generateRating(nearestMotel.name).rating}
                          </span>
                          <div className="flex ml-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(generateRating(nearestMotel.name).rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-blue-600">
                          {generateRating(nearestMotel.name).reviews.toLocaleString()} avaliações
                        </span>
                      </div>

                      <button className="text-blue-600 text-xs hover:underline">Ver mapa ampliado</button>
                    </div>
                  </div>

                  {/* Marcador posicionado exatamente nas coordenadas do motel mais próximo */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-15">
                    <div className="relative">
                      {/* Pin do marcador */}
                      <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      {/* Sombra do marcador */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/30 rounded-full blur-sm"></div>
                    </div>
                  </div>

                  {/* Sobreposição para bloquear interação */}
                  <div className="absolute inset-0 bg-transparent cursor-not-allowed z-25" />
                </div>
              )}
              {!nearestMotel && (
                <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center shadow-lg">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white px-3 py-2 rounded-lg shadow-lg">
                      <p className="font-bold text-gray-800 text-sm">Carregando localização...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-gray-300 text-sm mt-4">
              <Lock className="inline-block w-4 h-4 mr-1" /> Desbloqueie o relatório completo para saber onde ele já
              visitou, onde ele frequenta sempre e onde ele está atualmente!
            </p>
          </div>
        </div>

        {/* Video Testimonial Section */}
        <div className="relative w-full p-4 sm:p-8 rounded-xl bg-hacking-card-bg overflow-hidden border border-transparent animate-glow-pulse">
          <div className="absolute inset-[-3px] rounded-xl bg-gradient-neon-border animate-pulse-border z-[-1]"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-hacking-primary mb-6 sm:mb-8 animate-led-text-glow">
              Veja o que nossos usuários estão dizendo
            </h3>
            <p className="text-center text-whatsapp-text-light mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Depoimentos reais de pessoas que descobriram a verdade usando o WhatsEspião
            </p>

            {/* First Video */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-hacking-primary/30 w-full mx-auto mb-6 sm:mb-8 -mx-4 sm:mx-0">
              <div className="w-full h-[70vh] sm:h-[80vh] relative">
                <iframe
                  src="https://player.vimeo.com/video/1097295094?h=3cec6d984d&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  title="Bianca - Whats Espião Depoimento"
                  className="w-full h-full object-cover"
                ></iframe>

                {/* Green Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-hacking-primary rounded-full flex items-center justify-center shadow-2xl animate-pulse border-4 border-white/30"
                    style={{
                      boxShadow:
                        "0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6), 0 0 60px rgba(0, 255, 0, 0.4)",
                    }}
                  >
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Second Video */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-hacking-primary/30 w-full mx-auto mb-6 sm:mb-8 -mx-4 sm:mx-0">
              <div className="w-full h-[70vh] sm:h-[80vh] relative">
                <iframe
                  src="https://player.vimeo.com/video/1097295099?h=d4cbac1d09&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  title="Depoimento WhatsEspião 2"
                  className="w-full h-full object-cover"
                ></iframe>

                {/* Green Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-hacking-primary rounded-full flex items-center justify-center shadow-2xl animate-pulse border-4 border-white/30"
                    style={{
                      boxShadow:
                        "0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6), 0 0 60px rgba(0, 255, 0, 0.4)",
                    }}
                  >
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Third Video */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-hacking-primary/30 w-full mx-auto mb-6 sm:mb-8 -mx-4 sm:mx-0">
              <div className="w-full h-[70vh] sm:h-[80vh] relative">
                <iframe
                  src="https://player.vimeo.com/video/1097295195?h=10b2051a25&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  title="Depoimento WhatsEspião 3"
                  className="w-full h-full object-cover"
                ></iframe>

                {/* Green Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-hacking-primary rounded-full flex items-center justify-center shadow-2xl animate-pulse border-4 border-white/30"
                    style={{
                      boxShadow:
                        "0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6), 0 0 60px rgba(0, 255, 0, 0.4)",
                    }}
                  >
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => window.open("https://whatscheckout.netlify.app/", "_blank")}
                className="w-full sm:w-auto py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg font-bold shadow-xl hover:opacity-90 hover:shadow-2xl hover:scale-105 transition-all animate-led-pulse border-2 text-neutral-900 mb-4"
                style={{
                  background: "linear-gradient(45deg, #25D366, #14FE00)",
                  borderColor: "#25D366",
                  boxShadow:
                    "0 0 3px #25D366, 0 0 6px #25D366, 0 0 9px #25D366, 0 0 12px #25D366, 0 0 18px #25D366, 0 0 22px #25D366",
                }}
              >
                DESBLOQUEAR AGORA TUDO POR R$14,90
              </Button>
              <p className="text-gray-400 text-xs sm:text-sm">
                <Lock className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Mais de 50.000 pessoas já descobriram a verdade
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
