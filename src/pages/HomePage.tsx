
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText, ClipboardList, FileText, PlaySquare, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const quickLinks = [
    {
      title: "Historias de Usuario",
      description: "Gestionar historias y criterios de aceptación",
      icon: BookText,
      to: "/user-stories",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      title: "Casos de Prueba",
      description: "Crear y organizar casos de prueba",
      icon: ClipboardList,
      to: "/test-cases",
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
    },
    {
      title: "Planes de Prueba",
      description: "Definir estrategias y planes de testing",
      icon: FileText,
      to: "/test-plans",
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
    },
    {
      title: "Ejecuciones",
      description: "Ejecutar pruebas y registrar resultados",
      icon: PlaySquare,
      to: "/executions",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
    },
    {
      title: "Subir Documentos",
      description: "Procesar documentos con inteligencia artificial",
      icon: Upload,
      to: "/documents",
      color: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido a QA Analyst</h1>
          <p className="text-muted-foreground mt-1">
            Herramienta integral para gestionar todo el ciclo de pruebas de software
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/documents">Subir Documento</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/dashboard">Ver Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Card key={link.title} className="transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${link.color}`}>
                  <link.icon className="h-5 w-5" />
                </div>
              </div>
              <CardTitle className="text-xl mt-2">{link.title}</CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to={link.to}>Acceder</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">Nueva historia de usuario creada</p>
                  <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">3 casos de prueba actualizados</p>
                  <p className="text-xs text-muted-foreground">Hace 5 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <div>
                  <p className="text-sm font-medium">Plan de pruebas aprobado</p>
                  <p className="text-xs text-muted-foreground">Ayer</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estado de Proyectos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Proyecto Alpha</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-qa-blue rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Proyecto Beta</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-qa-purple rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Proyecto Gamma</span>
                  <span className="text-sm text-muted-foreground">90%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
