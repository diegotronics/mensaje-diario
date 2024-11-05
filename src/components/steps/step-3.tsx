import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, X } from 'lucide-react'
import { WeekData } from "@/lib/types"


type Step3Props = {
  weekData: WeekData;
  handleInputChange: any;
  setWeekData: (weekData: WeekData) => void;
}


export default function Step3({ weekData,  handleInputChange, setWeekData }: Step3Props) {
  const removeTarjeta = (index: number) => {
    const newTarjetas = weekData.tarjetas.filter((_, i) => i !== index)
    setWeekData({ ...weekData, tarjetas: newTarjetas })
  }
  const addTarjeta = () => {
    setWeekData({ ...weekData, tarjetas: [...weekData.tarjetas, ''] })
  }
  const handleTarjetaChange = (index: number, value: string) => {
    const newTarjetas = [...weekData.tarjetas]
    newTarjetas[index] = value
    setWeekData({ ...weekData, tarjetas: newTarjetas })
  }
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Paso 3: Tarjetas y Retrospectiva</h3>
        <div>
          <Label>Tarjetas</Label>
          {weekData.tarjetas.map((tarjeta, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                type="url"
                value={tarjeta || 'https://claritywave.atlassian.net/browse/'}
                onChange={(e) => handleTarjetaChange(index, e.target.value)}
                placeholder="https://claritywave.atlassian.net/browse/tarjeta"
              />
              {index === weekData.tarjetas.length - 1 ? (
                <Button type="button" onClick={addTarjeta} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={() => removeTarjeta(index)} size="icon" variant="destructive">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div>
          <Label htmlFor="retrospectiva">Retrospectiva</Label>
          <Textarea id="retrospectiva" name="retrospectiva" value={weekData.retrospectiva} onChange={handleInputChange} rows={4} />
        </div>
      </div>
    )
}