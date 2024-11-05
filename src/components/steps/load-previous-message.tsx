import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { WeekData, DayName } from '@/lib/types'

type LoadPreviousMessageProps = {
    currentStep: number
    weekData: WeekData
    setWeekData: (weekData: WeekData) => void
}

export default function LoadPreviousMessage({currentStep, weekData, setWeekData}: LoadPreviousMessageProps) {
    const [previousMessage, setPreviousMessage] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleLoadPrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (previousMessage) {
          const lines = previousMessage.split('\n')
          const newWeekData = { ...weekData }

          lines.forEach(line => {
            if (line.startsWith('Iniciales:')) {
              newWeekData.inicialesSemana = line.split(':')[1].trim()
            } else if (line.startsWith('Realizados:') && line.includes('(')) {
              const realizados = line.split(':')[1].trim().split(' ')
              realizados.forEach(item => {
                if (item.includes('(')) {
                  const [value, day] = item.split('(')
                  const dayName = day.replace(')', '')
                  if (newWeekData.dias[(dayName as DayName)]) {
                    newWeekData.dias[(dayName as DayName)].realizados = value
                  }
                }
              })
            } else if (line.startsWith('Invertidos:') && line.includes('(')) {
              const invertidos = line.split(':')[1].trim().split(' ')
              invertidos.forEach(item => {
                if (item.includes('(')) {
                  const [value, day] = item.split('(')
                  const dayName = day.replace(')', '')
                  if (newWeekData.dias[(dayName as DayName)]) {
                    newWeekData.dias[(dayName as DayName)].invertidos = value
                  }
                }
              })
            }
          })

          setWeekData(newWeekData)
        }
        setIsDialogOpen(false)
      }

    if (currentStep !== 1) return null

    return (
      <div className='my-6'>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
            <Button variant="outline" className="w-full">Cargar Mensaje Anterior (Opcional)</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Cargar Mensaje Anterior</DialogTitle>
                <DialogDescription>
                Pega el mensaje anterior para cargar los datos de la semana.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Textarea
                value={previousMessage}
                onChange={(e) => setPreviousMessage(e.target.value)}
                rows={10}
                placeholder="Pega aquí el mensaje del día anterior"
                />
                <Button onClick={handleLoadPrevious}>Cargar Datos</Button>
            </div>
            </DialogContent>
        </Dialog>
      </div>
    )
}
