import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WeekData } from "@/lib/types";

type Step2Props = {
  weekData: WeekData;
  handleInputChange: any;
}

export default function Step2({ weekData,  handleInputChange }: Step2Props) {
    return (
      <div className="space-y-4">
      <h3 className="text-lg font-semibold">Paso 2: Tiempos Dedicados</h3>
      <div>
        <Label htmlFor="tiempoReunion">Tiempo en Reunión</Label>
        <Input type="number" id="tiempoReunion" name="tiempoReunion" value={weekData.tiempoReunion} onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="tiempoTarjetas">Tiempo en Tarjetas</Label>
        <Input type="number" id="tiempoTarjetas" name="tiempoTarjetas" value={weekData.tiempoTarjetas} onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="tiempoCodeReview">Tiempo en Code-Review</Label>
        <Input type="number" id="tiempoCodeReview" name="tiempoCodeReview" value={weekData.tiempoCodeReview} onChange={handleInputChange} />
      </div>
    </div>
      )
}