'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import MessageForm from '@/components/steps/message-form'
import MessageGenerated from '@/components/steps/message-generated'

export default function HomePage() {
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('form')
  const tabsRef = useRef(null)


  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Generador de Mensaje Diario</CardTitle>
          <CardDescription>Completa el formulario para generar tu mensaje diario</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} ref={tabsRef}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="form">Formulario</TabsTrigger>
              <TabsTrigger value="generated">Mensaje Generado</TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <MessageForm setMessage={setMessage} setActiveTab={setActiveTab} tabsRef={tabsRef} />
            </TabsContent>
            <TabsContent value="generated">
              <MessageGenerated message={message} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}