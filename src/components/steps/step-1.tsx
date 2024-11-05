import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WeekData } from "@/lib/types"

type Step1Props = {
    weekData: WeekData;
    handleInputChange: any;
}


export default function Step1({ weekData,  handleInputChange }: Step1Props) {
    return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Paso 1: Datos de la Semana</h3>
          <div>
            <Label htmlFor="inicialesSemana">Iniciales de la Semana</Label>
            <Input type="number" id="inicialesSemana" name="inicialesSemana" value={weekData.inicialesSemana} onChange={handleInputChange} />
          </div>
          {Object.entries(weekData.dias).map(([day, data]) => (
            <div key={day} className="space-y-2">
              <Label>{day}</Label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor={`realizados${day}`}>Realizados</Label>
                  <Input type="number" id={`realizados${day}`} name="realizados" value={data.realizados} onChange={(e) => handleInputChange(e, day)} />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`invertidos${day}`}>Invertidos</Label>
                  <Input type="number" id={`invertidos${day}`} name="invertidos" value={data.invertidos} onChange={(e) => handleInputChange(e, day)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
}