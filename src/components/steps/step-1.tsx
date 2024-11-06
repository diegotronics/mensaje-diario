import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { WeekData } from '@/lib/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Step1Props = {
  weekData: WeekData
  handleInputChange: any
}

export default function Step1({ weekData, handleInputChange }: Step1Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Paso 1: Datos de la Semana</h3>
      <div>
        <Label htmlFor="inicialesSemana">Iniciales de la Semana</Label>
        <Input
          type="number"
          id="inicialesSemana"
          name="inicialesSemana"
          value={weekData.inicialesSemana}
          onChange={handleInputChange}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Día</TableHead>
            <TableHead>Realizados</TableHead>
            <TableHead>Invertidos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(weekData.dias).map(([day, data]) => (
            <TableRow key={day}>
              <TableCell className="font-medium">{day}</TableCell>
              <TableCell>
              <Input
                    type="number"
                    id={`realizados${day}`}
                    name="realizados"
                    value={data.realizados}
                    onChange={(e) => handleInputChange(e, day)}
                  />
              </TableCell>
              <TableCell>
              <Input
                    type="number"
                    id={`invertidos${day}`}
                    name="invertidos"
                    value={data.invertidos}
                    onChange={(e) => handleInputChange(e, day)}
                  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
