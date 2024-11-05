import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Copy } from 'lucide-react'
import { Toaster } from "@/components/ui/toaster"

type MessageGeneratedProps = {
  message: string
}

export default function MessageGenerated({ message }: MessageGeneratedProps) {
  const { toast } = useToast()
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message).then(() => {
      toast({
        description: "Mensaje copiado",
      })
    }, (err) => {
      console.error('Error al copiar el mensaje: ', err)
    })
  }
  if (!message) {
    return (
      <p>Aún no se ha generado ningún mensaje. Por favor, completa el formulario y haz clic en "Generar Mensaje".</p>
    )
  }

  return(<div className="space-y-4"> <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded">{message}</pre>
    <Button  onClick={copyToClipboard} className="flex items-center space-x-2">
      <Copy className="h-4 w-4" />
      <span>Copiar Mensaje</span>
    <Toaster />
    </Button>
  </div>
)
}
