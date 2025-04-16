
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Upload } from "lucide-react";
import JavaAutomationTemplate from './Documents/JavaAutomationTemplate';

const Documents = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="container mx-auto">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análisis de Documentos</h1>
          <p className="text-muted-foreground mt-2">
            Carga documentos de requerimientos para generar historias de usuario, casos de prueba y planes de prueba automáticamente.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Cargar Documentos</TabsTrigger>
            <TabsTrigger value="automation">Automatización Java</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="py-4">
            <Card>
              <CardHeader>
                <CardTitle>Cargar y Analizar Documentos</CardTitle>
                <CardDescription>
                  Arrastra un documento de requisitos o especificaciones para analizarlo con IA.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Arrastra archivos aquí o haz clic para navegar</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Se admiten archivos PDF, DOCX y TXT de hasta 10MB
                    </p>
                  </div>
                  <Button>Seleccionar Archivo</Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Documentos Recientes</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">Requerimientos_Modulo_Usuarios.pdf</p>
                        <p className="text-sm text-muted-foreground">Subido el 15 de abril, 2025</p>
                      </div>
                      <Button variant="outline">Ver Análisis</Button>
                    </div>
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">Especificaciones_Tecnicas.docx</p>
                        <p className="text-sm text-muted-foreground">Subido el 10 de abril, 2025</p>
                      </div>
                      <Button variant="outline">Ver Análisis</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="py-4">
            <JavaAutomationTemplate />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documents;
