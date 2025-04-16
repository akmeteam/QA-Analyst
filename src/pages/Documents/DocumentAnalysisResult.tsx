
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  ListTodo, 
  ClipboardCheck, 
  GanttChart, 
  CheckCircle2, 
  Download, 
  Save,
  FileCode
} from "lucide-react";

const DocumentAnalysisResult = () => {
  const [selectedTab, setSelectedTab] = useState("stories");
  const { toast } = useToast();

  const handleSaveToProject = () => {
    toast({
      title: "Guardado en el proyecto",
      description: "Los elementos seleccionados han sido guardados en el proyecto.",
    });
  };

  const handleDownloadAutomation = () => {
    toast({
      title: "Descarga iniciada",
      description: "Descargando código de automatización Java.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Resultados del Análisis</CardTitle>
            <CardDescription>
              Resultados del análisis de documentos con IA. Revisa y edita antes de guardar en el proyecto.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadAutomation}>
              <FileCode className="mr-2 h-4 w-4" />
              Descargar Automatización
            </Button>
            <Button onClick={handleSaveToProject}>
              <Save className="mr-2 h-4 w-4" />
              Guardar en Proyecto
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="stories">
              <ListTodo className="mr-2 h-4 w-4" />
              Historias de Usuario
            </TabsTrigger>
            <TabsTrigger value="test-cases">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Casos de Prueba
            </TabsTrigger>
            <TabsTrigger value="test-plan">
              <GanttChart className="mr-2 h-4 w-4" />
              Plan de Pruebas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Historias de Usuario Generadas</h3>
                <div className="text-sm text-muted-foreground">3 historias encontradas</div>
              </div>

              <Card className="p-4 border">
                <div className="flex items-start gap-2">
                  <Checkbox id="story1" defaultChecked />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor="story1" className="font-medium">Como usuario, quiero poder iniciar sesión en la aplicación</Label>
                    <Textarea 
                      defaultValue={`Descripción: El usuario debe poder acceder a la aplicación mediante un proceso de inicio de sesión.

Criterios de Aceptación:
Escenario: Inicio de sesión exitoso
  Dado que soy un usuario registrado
  Cuando ingreso mi email y contraseña correctamente
  Y hago clic en "Iniciar Sesión"
  Entonces debería ser redirigido al dashboard
  Y ver un mensaje de bienvenida

Escenario: Inicio de sesión fallido
  Dado que soy un usuario 
  Cuando ingreso credenciales incorrectas
  Y hago clic en "Iniciar Sesión"
  Entonces debería ver un mensaje de error
  Y permanecer en la página de login`}
                      rows={12}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 border">
                <div className="flex items-start gap-2">
                  <Checkbox id="story2" defaultChecked />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor="story2" className="font-medium">Como administrador, quiero gestionar usuarios</Label>
                    <Textarea 
                      defaultValue={`Descripción: El administrador debe poder ver, crear, editar y eliminar usuarios del sistema.

Criterios de Aceptación:
Escenario: Crear nuevo usuario
  Dado que soy un administrador
  Cuando navego a la sección de usuarios
  Y hago clic en "Nuevo Usuario"
  Y completo todos los campos requeridos
  Y hago clic en "Guardar"
  Entonces debería ver el nuevo usuario en la lista
  Y recibir un mensaje de confirmación

Escenario: Eliminar usuario
  Dado que soy un administrador
  Cuando selecciono un usuario existente
  Y hago clic en "Eliminar"
  Y confirmo la acción
  Entonces el usuario debería desaparecer de la lista
  Y recibir una notificación de eliminación exitosa`}
                      rows={12}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 border">
                <div className="flex items-start gap-2">
                  <Checkbox id="story3" defaultChecked />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor="story3" className="font-medium">Como usuario, quiero restablecer mi contraseña</Label>
                    <Textarea 
                      defaultValue={`Descripción: El usuario debe poder solicitar el restablecimiento de su contraseña cuando la olvide.

Criterios de Aceptación:
Escenario: Solicitud de restablecimiento
  Dado que he olvidado mi contraseña
  Cuando hago clic en "Olvidé mi contraseña"
  Y ingreso mi dirección de email
  Y hago clic en "Enviar enlace"
  Entonces debería recibir un correo con instrucciones
  Y ver un mensaje de confirmación

Escenario: Restablecimiento exitoso
  Dado que he recibido un enlace de restablecimiento
  Cuando hago clic en el enlace
  Y ingreso mi nueva contraseña dos veces
  Y hago clic en "Guardar"
  Entonces debería poder iniciar sesión con mi nueva contraseña
  Y recibir confirmación de cambio exitoso`}
                      rows={12}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="test-cases">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Casos de Prueba Generados</h3>
                <div className="text-sm text-muted-foreground">5 casos de prueba encontrados</div>
              </div>

              <Card className="p-4 border">
                <div className="flex items-start gap-2">
                  <Checkbox id="test1" defaultChecked />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor="test1" className="font-medium">TC001: Validar inicio de sesión con credenciales válidas</Label>
                    <Textarea 
                      defaultValue={`Descripción: Verificar que un usuario pueda iniciar sesión con credenciales válidas.

Precondiciones:
- Usuario registrado en el sistema
- Aplicación accesible

Pasos:
1. Navegar a la pantalla de inicio de sesión
2. Ingresar email válido en el campo correspondiente
3. Ingresar contraseña válida en el campo correspondiente
4. Hacer clic en el botón "Iniciar Sesión"

Datos de prueba:
- Email: usuario_test@example.com
- Contraseña: Password123!

Resultado esperado:
- Usuario redirigido al dashboard
- Se muestra mensaje de bienvenida
- Sesión iniciada correctamente

Tipo de prueba: Funcional
Criticidad: Alta
Automatizable: Sí`}
                      rows={12}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 border">
                <div className="flex items-start gap-2">
                  <Checkbox id="test2" defaultChecked />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor="test2" className="font-medium">TC002: Validar inicio de sesión con credenciales inválidas</Label>
                    <Textarea 
                      defaultValue={`Descripción: Verificar que se muestre un mensaje de error al ingresar credenciales inválidas.

Precondiciones:
- Aplicación accesible

Pasos:
1. Navegar a la pantalla de inicio de sesión
2. Ingresar email en el campo correspondiente
3. Ingresar contraseña incorrecta en el campo correspondiente
4. Hacer clic en el botón "Iniciar Sesión"

Datos de prueba:
- Email: usuario_test@example.com
- Contraseña: ContraseñaIncorrecta123!

Resultado esperado:
- Usuario permanece en la pantalla de inicio de sesión
- Se muestra mensaje de error indicando credenciales inválidas
- No se permite el acceso

Tipo de prueba: Funcional
Criticidad: Alta
Automatizable: Sí`}
                      rows={12}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="test-plan">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Plan de Pruebas Generado</h3>
                <div className="text-sm text-muted-foreground">Plan basado en 2 módulos</div>
              </div>

              <Card className="p-4 border">
                <div className="flex items-start gap-2">
                  <Checkbox id="plan" defaultChecked />
                  <div className="grid gap-1.5 w-full">
                    <Label htmlFor="plan" className="font-medium">Plan de Pruebas - Módulo de Autenticación</Label>
                    <Textarea 
                      defaultValue={`# Plan de Pruebas - Módulo de Autenticación

## 1. Introducción
Este plan abarca las pruebas necesarias para verificar la funcionalidad del módulo de autenticación, incluyendo inicio de sesión, registro y recuperación de contraseña.

## 2. Alcance
- Inicio de sesión de usuarios
- Registro de nuevos usuarios
- Recuperación de contraseña
- Validación de formularios
- Seguridad de acceso

## 3. Tipos de Pruebas
- Pruebas funcionales
- Pruebas de seguridad
- Pruebas de integración
- Pruebas de regresión

## 4. Casos de prueba prioritarios
- TC001: Validar inicio de sesión con credenciales válidas
- TC002: Validar inicio de sesión con credenciales inválidas
- TC003: Validar registro de usuario con datos válidos
- TC004: Validar proceso de recuperación de contraseña

## 5. Entornos de prueba
- Desarrollo
- QA
- Pre-producción

## 6. Criterios de entrada/salida
- Entrada: Código completo en entorno de QA
- Salida: 100% de casos críticos ejecutados exitosamente

## 7. Estimación de esfuerzo
- 5 días-persona (2 QA)

## 8. Riesgos identificados
- Problemas de integración con servicios de autenticación
- Vulnerabilidades de seguridad en el proceso de login`}
                      rows={20}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Ver Documento Original
        </Button>
        <Button onClick={handleSaveToProject}>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Guardar Seleccionados
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentAnalysisResult;
