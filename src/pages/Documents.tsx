
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, BookText, ClipboardList, Sparkles, Bot } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Documents = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedResult, setProcessedResult] = useState<any>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = [
        'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Formato no soportado",
          description: "Por favor sube un archivo PDF, Word o TXT.",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      setProcessedResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulación de procesamiento de IA
    setTimeout(() => {
      // Resultado simulado de IA
      setProcessedResult({
        userStories: [
          {
            id: "US001",
            title: "Registro de usuario",
            description: "Como usuario nuevo, quiero poder registrarme en el sistema para acceder a las funcionalidades.",
            acceptanceCriteria: [
              "Escenario: Registro exitoso\nDado que soy un usuario no registrado\nCuando complete el formulario con datos válidos\nY presione el botón de registro\nEntonces debería recibir una confirmación\nY debería poder iniciar sesión con mis credenciales",
              "Escenario: Validación de email\nDado que soy un usuario en proceso de registro\nCuando ingrese un formato de email inválido\nEntonces debería ver un mensaje de error\nY no debería poder continuar con el registro"
            ]
          }
        ],
        testCases: [
          {
            id: "TC001",
            title: "Validar registro con credenciales válidas",
            steps: [
              "Acceder a la página de registro",
              "Completar todos los campos con datos válidos",
              "Hacer clic en el botón 'Registrarse'"
            ],
            expectedResult: "El sistema muestra mensaje de confirmación y envía email de verificación",
            type: "Funcional"
          },
          {
            id: "TC002",
            title: "Validar formato de email",
            steps: [
              "Acceder a la página de registro",
              "Ingresar un email con formato inválido",
              "Hacer clic fuera del campo o intentar continuar"
            ],
            expectedResult: "El sistema muestra mensaje de error indicando formato inválido",
            type: "Validación"
          }
        ],
        testPlan: {
          title: "Plan de Pruebas - Módulo de Registro",
          description: "Este plan cubre las pruebas necesarias para el módulo de registro de usuarios",
          scope: "Pruebas funcionales, validación de datos y experiencia de usuario",
          types: ["Funcional", "Validación", "Usabilidad"]
        }
      });
      
      setIsProcessing(false);
      
      toast({
        title: "Procesamiento completado",
        description: "El documento ha sido analizado con éxito."
      });
    }, 3000);
  };

  // Función para renderizar el editor de historias de usuario
  const renderUserStoryEditor = (story: any) => (
    <div key={story.id} className="space-y-4 mt-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{story.id}</Badge>
          <h3 className="font-medium">{story.title}</h3>
        </div>
        <Button variant="ghost" size="sm">Editar</Button>
      </div>
      
      <div>
        <Label>Descripción</Label>
        <Textarea 
          defaultValue={story.description}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label>Criterios de Aceptación</Label>
        {story.acceptanceCriteria.map((criteria: string, index: number) => (
          <Textarea 
            key={index}
            defaultValue={criteria}
            className="mt-1 mb-2"
          />
        ))}
      </div>
    </div>
  );

  // Función para renderizar el editor de casos de prueba
  const renderTestCaseEditor = (testCase: any) => (
    <div key={testCase.id} className="space-y-4 mt-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{testCase.id}</Badge>
          <h3 className="font-medium">{testCase.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge>{testCase.type}</Badge>
          <Button variant="ghost" size="sm">Editar</Button>
        </div>
      </div>
      
      <div>
        <Label>Pasos</Label>
        <ol className="space-y-2 mt-1">
          {testCase.steps.map((step: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">
                {index + 1}
              </span>
              <Textarea 
                defaultValue={step}
                className="flex-1"
              />
            </li>
          ))}
        </ol>
      </div>
      
      <div>
        <Label>Resultado Esperado</Label>
        <Textarea 
          defaultValue={testCase.expectedResult}
          className="mt-1"
        />
      </div>
    </div>
  );

  // Función para renderizar el editor del plan de pruebas
  const renderTestPlanEditor = (plan: any) => (
    <div className="space-y-4 mt-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{plan.title}</h3>
        <Button variant="ghost" size="sm">Editar</Button>
      </div>
      
      <div>
        <Label>Descripción</Label>
        <Textarea 
          defaultValue={plan.description}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label>Alcance</Label>
        <Textarea 
          defaultValue={plan.scope}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label>Tipos de Prueba</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {plan.types.map((type: string, index: number) => (
            <Badge key={index} variant="outline">{type}</Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subir Documentos</h1>
        <p className="text-muted-foreground mt-1">
          Sube documentos para generar automáticamente elementos de prueba
        </p>
      </div>

      {!processedResult ? (
        <Card>
          <CardHeader>
            <CardTitle>Subir Documento</CardTitle>
            <CardDescription>
              Sube un documento PDF, Word o TXT para analizarlo y generar automáticamente historias de usuario, casos de prueba y planes de prueba.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="document">Documento</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <Input
                      id="document"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Label htmlFor="document" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="font-medium">Arrastra un archivo o haz clic para seleccionar</p>
                        <p className="text-xs text-muted-foreground">Soporta PDF, Word y TXT (máx. 10MB)</p>
                      </div>
                    </Label>
                  </div>
                </div>
                
                {file && (
                  <div className="flex items-center gap-2 bg-muted/50 p-2 rounded">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                      {file.name}
                    </div>
                    <Badge variant="outline">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => setFile(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-medium mb-1">Qué generará la IA:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <BookText className="h-5 w-5 text-qa-blue" />
                      <div className="text-sm">Historias de Usuario con criterios Gherkin</div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <ClipboardList className="h-5 w-5 text-qa-purple" />
                      <div className="text-sm">Casos de Prueba detallados</div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-5 w-5 text-emerald-500" />
                      <div className="text-sm">Plan de Pruebas inicial</div>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" disabled={!file || isProcessing} className="w-full">
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analizar con IA
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Resultados del Análisis</CardTitle>
                <CardDescription>
                  Revisa y edita los elementos generados por la IA antes de confirmarlos
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setProcessedResult(null)}>
                  Cancelar
                </Button>
                <Button size="sm">
                  Confirmar Todo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg mb-4">
                <Bot className="h-5 w-5 text-primary" />
                <p className="text-sm">
                  Los elementos han sido generados por IA. Puedes editarlos antes de confirmarlos.
                </p>
              </div>
              
              <Tabs defaultValue="historias" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="historias" className="flex-1">Historias de Usuario</TabsTrigger>
                  <TabsTrigger value="casos" className="flex-1">Casos de Prueba</TabsTrigger>
                  <TabsTrigger value="plan" className="flex-1">Plan de Pruebas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="historias" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Historias de Usuario Generadas</h3>
                    <Button size="sm" variant="outline">
                      Agregar Historia
                    </Button>
                  </div>
                  
                  {processedResult.userStories.map((story: any) => 
                    renderUserStoryEditor(story)
                  )}
                </TabsContent>
                
                <TabsContent value="casos" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Casos de Prueba Generados</h3>
                    <Button size="sm" variant="outline">
                      Agregar Caso
                    </Button>
                  </div>
                  
                  {processedResult.testCases.map((testCase: any) => 
                    renderTestCaseEditor(testCase)
                  )}
                </TabsContent>
                
                <TabsContent value="plan" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Plan de Pruebas Generado</h3>
                  </div>
                  
                  {renderTestPlanEditor(processedResult.testPlan)}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setProcessedResult(null)}>
              Cancelar
            </Button>
            <Button>
              Confirmar Todo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
