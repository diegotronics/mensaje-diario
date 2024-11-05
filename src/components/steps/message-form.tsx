import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Step1 from '@/components/steps/step-1'
import Step3 from '@/components/steps/step-3'
import Step2 from '@/components/steps/step-2'
import { useState } from 'react'
import LoadPreviousMessage from "./load-previous-message"
import { DayName, WeekData } from "@/lib/types"


type MessageFormProps = {
  setMessage: (message: string) => void;
  setActiveTab: (tab: string) => void;
  tabsRef: React.MutableRefObject<any>;
}

export default function MessageForm( { setMessage, setActiveTab, tabsRef }: MessageFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [weekData, setWeekData] = useState<WeekData>({
    inicialesSemana: '',
    dias: {
      Lunes: { realizados: '', invertidos: '' },
      Martes: { realizados: '', invertidos: '' },
      Miercoles: { realizados: '', invertidos: '' },
      Jueves: { realizados: '', invertidos: '' },
      Viernes: { realizados: '', invertidos: '' },
    },
    tiempoReunion: '',
    tiempoTarjetas: '',
    tiempoCodeReview: '',
    tarjetas: [''],
    retrospectiva: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, day?: string) => {
    const { name, value } = e.target
    if (day) {
      setWeekData(prev => ({
        ...prev,
        dias: {
          ...prev.dias,
          [day]: { ...prev.dias[(day as DayName)], [name]: value }
        }
      }))
    } else {
      setWeekData(prev => ({ ...prev, [name]: value }))
    }
  }

  const generateMessage = () => {
    const parseNumber = (value:string | number) => value === '' ? 0 : Number(value)
    const realizadosTotal = Object.values(weekData.dias).reduce((sum, day) => sum + parseNumber(day.realizados), 0)
    const invertidosTotal = Object.values(weekData.dias).reduce((sum, day) => sum + parseNumber(day.invertidos), 0)
    const promedioRealizado = realizadosTotal / 5
    const promedioAcumulado = invertidosTotal / 5
    const restantesSemana = parseNumber(weekData.inicialesSemana) - realizadosTotal
    const puntosTotalesDia = parseNumber(weekData.tiempoReunion) + parseNumber(weekData.tiempoTarjetas) + parseNumber(weekData.tiempoCodeReview)


  return `
    **Semana**
    Iniciales: ${weekData.inicialesSemana}
    Realizados: ${realizadosTotal}
    Restantes: ${restantesSemana}

    **Progreso semanal**
    Realizados: ${Object.entries(weekData.dias).map(([day, data]) => `${parseNumber(data.realizados)} (${day})`).join(' ')} Total: ${realizadosTotal}
    Promedio realizado: ${promedioRealizado.toFixed(2)}
    Invertidos: ${Object.entries(weekData.dias).map(([day, data]) => `${parseNumber(data.invertidos)} (${day})`).join(' ')} Total: ${invertidosTotal}
    Promedio acumulados: ${promedioAcumulado.toFixed(2)}

    **Inversión en tiempo dedicado**
    Reunión: ${weekData.tiempoReunion}
    Tarjetas: ${weekData.tiempoTarjetas}
    Code-Review: ${weekData.tiempoCodeReview}
    Puntos Totales del Día: ${puntosTotalesDia}

    **Tarjetas**
    ${weekData.tarjetas.filter(t => t).join('\n')}

    **Retrospectiva**
    ${weekData.retrospectiva}
  `
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(currentStep === 4){
      setMessage(generateMessage())
      setActiveTab('generated')
      if (tabsRef.current) {
        tabsRef.current.value = 'generated'
      }
    }
  }
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 weekData={weekData} handleInputChange={handleInputChange} />
      case 2:
        return <Step2 weekData={weekData} handleInputChange={handleInputChange} />
      case 3:
        return <Step3 weekData={weekData} handleInputChange={handleInputChange} setWeekData={setWeekData} />
      default:
        return null
    }
  }

  let nextButton = <Button type="button" onClick={() => setCurrentStep(prev => Math.min(prev + 1, 3))}>Siguiente</Button>
  if (currentStep === 3) {
    nextButton = <Button type="submit">Generar Mensaje</Button>
  }
    return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Progress value={(currentStep / 3) * 100} className="w-full" />
      <LoadPreviousMessage currentStep={currentStep} weekData={weekData} setWeekData={setWeekData} />
      {renderStep()}
      <div className="flex justify-between mt-4">
        <Button
          type="button"
          onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
          disabled={currentStep === 1}
        >
          Anterior
        </Button>
        {nextButton}
      </div>
    </form>
  )
}