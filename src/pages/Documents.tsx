
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Upload, File, CheckCircle, X, Loader2 } from "lucide-react";
import JavaAutomationTemplate from './Documents/JavaAutomationTemplate';
import DocumentAnalysisResult from './Documents/DocumentAnalysisResult';

const Documents = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<File | null>(null);
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileType = file.type;
    const fileSize = file.size / (1024 * 1024); // Convert to MB
    
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(fileType)) {
      toast({
        title: "Formato no soportado",
        description: "Por favor, carga un archivo PDF, DOCX o TXT.",
        variant: "destructive",
      });
      return;
    }
    
    if (fileSize > 10) {
      toast({
        title: "Archivo demasiado grande",
        description: "El tamaño máximo permitido es de 10MB.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentDocument(file);
    toast({
      title: "Archivo cargado",
      description: `${file.name} se ha cargado correctamente.`,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUploading(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUploading(false);
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileType = file.type;
    const fileSize = file.size / (1024 * 1024); // Convert to MB
    
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(fileType)) {
      toast({
        title: "Formato no soportado",
        description: "Por favor, carga un archivo PDF, DOCX o TXT.",
        variant: "destructive",
      });
      return;
    }
    
    if (fileSize > 10) {
      toast({
        title: "Archivo demasiado grande",
        description: "El tamaño máximo permitido es de 10MB.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentDocument(file);
    toast({
      title: "Archivo cargado",
      description: `${file.name} se ha cargado correctamente.`,
    });
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAnalyzeDocument = () => {
    if (!currentDocument) return;
    
    setIsAnalyzing(true);
    
    // Simulación de análisis de documento con IA
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysisResults(true);
      setActiveTab("results");
      toast({
        title: "Análisis completado",
        description: "El documento ha sido analizado con éxito.",
      });
    }, 3000);
  };

  const handleDocumentViewClick = (documentName: string) => {
    setShowAnalysisResults(true);
    setActiveTab("results");
    toast({
      title: "Análisis cargado",
      description: `Mostrando análisis de ${documentName}`,
    });
  };

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Cargar Documentos</TabsTrigger>
            <TabsTrigger value="results" disabled={!showAnalysisResults}>Resultados de Análisis</TabsTrigger>
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
                {!currentDocument ? (
                  <div 
                    className={`border-2 border-dashed ${isUploading ? 'border-primary' : 'border-gray-300 dark:border-gray-700'} rounded-lg p-12 text-center flex flex-col items-center justify-center space-y-4`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Upload className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Arrastra archivos aquí o haz clic para navegar</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Se admiten archivos PDF, DOCX y TXT de hasta 10MB
                      </p>
                    </div>
                    <Button onClick={handleClickUpload}>
                      Seleccionar Archivo
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" 
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                      />
                    </Button>
                  </div>
                ) : (
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <File className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{currentDocument.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(currentDocument.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setCurrentDocument(null)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleAnalyzeDocument}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analizando...
                        </>
                      ) : (
                        <>
                          <FileUp className="mr-2 h-4 w-4" />
                          Analizar Documento
                        </>
                      )}
                    </Button>
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Documentos Recientes</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">Requerimientos_Modulo_Usuarios.pdf</p>
                        <p className="text-sm text-muted-foreground">Subido el 15 de abril, 2025</p>
                      </div>
                      <Button variant="outline" onClick={() => handleDocumentViewClick("Requerimientos_Modulo_Usuarios.pdf")}>
                        Ver Análisis
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">Especificaciones_Tecnicas.docx</p>
                        <p className="text-sm text-muted-foreground">Subido el 10 de abril, 2025</p>
                      </div>
                      <Button variant="outline" onClick={() => handleDocumentViewClick("Especificaciones_Tecnicas.docx")}>
                        Ver Análisis
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="py-4">
            <DocumentAnalysisResult />
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
