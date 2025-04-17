
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  PlaySquare, 
  CalendarDays, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BarChart2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react"; // Importa useState para manejar el estado de búsqueda

// Datos simulados de ejecuciones
const mockExecutions = [
  {
    id: "EX001",
    title: "Ejecución - Sprint 10 - Módulo Autenticación",
    description: "Ejecución de casos de prueba para el Sprint 10",
    status: "En Progreso",
    progress: 65,
    startDate: "2023-11-10",
    endDate: "2023-11-15",
    executor: {
      name: "Ana P.",
    },
    testCases: 18,
    executedTests: 12,
    passedTests: 10,
    failedTests: 2,
    blockedTests: 0
  },
  {
    id: "EX002",
    title: "Ejecución - Pruebas de Regresión",
    description: "Ejecución de pruebas de regresión previo a release",
    status: "Completado",
    progress: 100,
    startDate: "2023-10-25",
    endDate: "2023-10-28",
    executor: {
      name: "Carlos M.",
    },
    testCases: 30,
    executedTests: 30,
    passedTests: 27,
    failedTests: 3,
    blockedTests: 0
  },
  {
    id: "EX003",
    title: "Ejecución - Pruebas de Aceptación",
    description: "Ejecución de pruebas de aceptación con el cliente",
    status: "Bloqueado",
    progress: 35,
    startDate: "2023-11-05",
    endDate: "2023-11-08",
    executor: {
      name: "Luis R.",
    },
    testCases: 20,
    executedTests: 7,
    passedTests: 5,
    failedTests: 1,
    blockedTests: 1
  }
];

const Executions = () => {
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ejecuciones</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona las ejecuciones de pruebas y su progreso
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Ejecución
        </Button>
      </div>

      {/* Contenedor del buscador */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm} // Asigna el valor del estado al input
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el valor del input
            type="search"
            placeholder="Buscar ejecuciones..."
            className="pl-8"
          />
        </div>
      </div>{/* Elimina el botón de filtro */}

      <Tabs defaultValue="all"> {/* Componente Tabs para filtrar las ejecuciones por estado */}
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
          <TabsTrigger value="in-progress" className="flex-1">En Progreso</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">Completadas</TabsTrigger>
          <TabsTrigger value="blocked" className="flex-1">Bloqueadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6"> {/* Muestra las ejecuciones que coinciden con el término de búsqueda y el estado "Todas" */}
          <div className="grid grid-cols-1 gap-6">
            {mockExecutions
              .filter((execution) =>
                searchTerm === "" || // Si no hay término de búsqueda, muestra todas las ejecuciones
                Object.values(execution).some(value => // Busca en todos los valores de cada ejecución
                  typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
              .map((execution) => (
              <Card key={execution.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <PlaySquare className="h-5 w-5 text-qa-purple mt-1" />
                      <div>
                        <CardTitle className="text-xl">{execution.title}</CardTitle>
                        <CardDescription className="mt-1">{execution.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {execution.status === "En Progreso" && <Badge className="bg-amber-500">{execution.status}</Badge>}
                      {execution.status === "Completado" && <Badge className="bg-green-500">{execution.status}</Badge>}
                      {execution.status === "Bloqueado" && <Badge className="bg-red-500">{execution.status}</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{execution.progress}%</span>
                    </div>
                    <Progress value={execution.progress} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-muted-foreground">Casos de Prueba</span>
                      <span className="text-xl font-bold mt-1">{execution.testCases}</span>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-green-800 dark:text-green-300">Pasados</span>
                      <span className="text-xl font-bold mt-1 text-green-800 dark:text-green-300">{execution.passedTests}</span>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-red-800 dark:text-red-300">Fallidos</span>
                      <span className="text-xl font-bold mt-1 text-red-800 dark:text-red-300">{execution.failedTests}</span>
                    </div>
                    <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-amber-800 dark:text-amber-300">Pendientes</span>
                      <span className="text-xl font-bold mt-1 text-amber-800 dark:text-amber-300">{execution.testCases - execution.executedTests}</span>
                    </div>
                    {execution.blockedTests > 0 && (
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg flex flex-col">
                        <span className="text-xs text-purple-800 dark:text-purple-300">Bloqueados</span>
                        <span className="text-xl font-bold mt-1 text-purple-800 dark:text-purple-300">{execution.blockedTests}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{execution.executor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{execution.executor.name}</div>
                        <div className="text-xs text-muted-foreground">Ejecutor</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <div>Inicio: {execution.startDate}</div>
                          <div>Fin: {execution.endDate}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress"> {/* Muestra las ejecuciones que coinciden con el término de búsqueda y el estado "En Progreso" */}
        <div className="grid grid-cols-1 gap-6">
          {mockExecutions
            .filter(
              (execution) =>
                execution.status === "En Progreso" &&
                (searchTerm === "" ||
                  Object.values(execution).some((value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                  ))
            )
            .map((execution) => (
              <Card key={execution.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <PlaySquare className="h-5 w-5 text-qa-purple mt-1" />
                      <div>
                        <CardTitle className="text-xl">{execution.title}</CardTitle>
                        <CardDescription className="mt-1">{execution.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {execution.status === "En Progreso" && <Badge className="bg-amber-500">{execution.status}</Badge>}
                      {execution.status === "Completado" && <Badge className="bg-green-500">{execution.status}</Badge>}
                      {execution.status === "Bloqueado" && <Badge className="bg-red-500">{execution.status}</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{execution.progress}%</span>
                    </div>
                    <Progress value={execution.progress} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-muted-foreground">Casos de Prueba</span>
                      <span className="text-xl font-bold mt-1">{execution.testCases}</span>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-green-800 dark:text-green-300">Pasados</span>
                      <span className="text-xl font-bold mt-1 text-green-800 dark:text-green-300">{execution.passedTests}</span>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-red-800 dark:text-red-300">Fallidos</span>
                      <span className="text-xl font-bold mt-1 text-red-800 dark:text-red-300">{execution.failedTests}</span>
                    </div>
                    <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-amber-800 dark:text-amber-300">Pendientes</span>
                      <span className="text-xl font-bold mt-1 text-amber-800 dark:text-amber-300">{execution.testCases - execution.executedTests}</span>
                    </div>
                    {execution.blockedTests > 0 && (
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg flex flex-col">
                        <span className="text-xs text-purple-800 dark:text-purple-300">Bloqueados</span>
                        <span className="text-xl font-bold mt-1 text-purple-800 dark:text-purple-300">{execution.blockedTests}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{execution.executor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{execution.executor.name}</div>
                        <div className="text-xs text-muted-foreground">Ejecutor</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <div>Inicio: {execution.startDate}</div>
                          <div>Fin: {execution.endDate}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="completed"> {/* Muestra las ejecuciones que coinciden con el término de búsqueda y el estado "Completado" */}
        <div className="grid grid-cols-1 gap-6">
          {mockExecutions
            .filter(
              (execution) =>
                execution.status === "Completado" &&
                (searchTerm === "" ||
                  Object.values(execution).some((value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                  ))
            )
            .map((execution) => (
              <Card key={execution.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <PlaySquare className="h-5 w-5 text-qa-purple mt-1" />
                      <div>
                        <CardTitle className="text-xl">{execution.title}</CardTitle>
                        <CardDescription className="mt-1">{execution.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {execution.status === "En Progreso" && <Badge className="bg-amber-500">{execution.status}</Badge>}
                      {execution.status === "Completado" && <Badge className="bg-green-500">{execution.status}</Badge>}
                      {execution.status === "Bloqueado" && <Badge className="bg-red-500">{execution.status}</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{execution.progress}%</span>
                    </div>
                    <Progress value={execution.progress} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-muted-foreground">Casos de Prueba</span>
                      <span className="text-xl font-bold mt-1">{execution.testCases}</span>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-green-800 dark:text-green-300">Pasados</span>
                      <span className="text-xl font-bold mt-1 text-green-800 dark:text-green-300">{execution.passedTests}</span>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-red-800 dark:text-red-300">Fallidos</span>
                      <span className="text-xl font-bold mt-1 text-red-800 dark:text-red-300">{execution.failedTests}</span>
                    </div>
                    <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-amber-800 dark:text-amber-300">Pendientes</span>
                      <span className="text-xl font-bold mt-1 text-amber-800 dark:text-amber-300">{execution.testCases - execution.executedTests}</span>
                    </div>
                    {execution.blockedTests > 0 && (
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg flex flex-col">
                        <span className="text-xs text-purple-800 dark:text-purple-300">Bloqueados</span>
                        <span className="text-xl font-bold mt-1 text-purple-800 dark:text-purple-300">{execution.blockedTests}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{execution.executor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{execution.executor.name}</div>
                        <div className="text-xs text-muted-foreground">Ejecutor</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <div>Inicio: {execution.startDate}</div>
                          <div>Fin: {execution.endDate}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="blocked"> {/* Muestra las ejecuciones que coinciden con el término de búsqueda y el estado "Bloqueado" */}
        <div className="grid grid-cols-1 gap-6">
          {mockExecutions
            .filter(
              (execution) =>
                execution.status === "Bloqueado" &&
                (searchTerm === "" ||
                  Object.values(execution).some((value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                  ))
            )
            .map((execution) => (
              <Card key={execution.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <PlaySquare className="h-5 w-5 text-qa-purple mt-1" />
                      <div>
                        <CardTitle className="text-xl">{execution.title}</CardTitle>
                        <CardDescription className="mt-1">{execution.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {execution.status === "En Progreso" && <Badge className="bg-amber-500">{execution.status}</Badge>}
                      {execution.status === "Completado" && <Badge className="bg-green-500">{execution.status}</Badge>}
                      {execution.status === "Bloqueado" && <Badge className="bg-red-500">{execution.status}</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{execution.progress}%</span>
                    </div>
                    <Progress value={execution.progress} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-muted-foreground">Casos de Prueba</span>
                      <span className="text-xl font-bold mt-1">{execution.testCases}</span>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-green-800 dark:text-green-300">Pasados</span>
                      <span className="text-xl font-bold mt-1 text-green-800 dark:text-green-300">{execution.passedTests}</span>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-red-800 dark:text-red-300">Fallidos</span>
                      <span className="text-xl font-bold mt-1 text-red-800 dark:text-red-300">{execution.failedTests}</span>
                    </div>
                    <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg flex flex-col">
                      <span className="text-xs text-amber-800 dark:text-amber-300">Pendientes</span>
                      <span className="text-xl font-bold mt-1 text-amber-800 dark:text-amber-300">{execution.testCases - execution.executedTests}</span>
                    </div>
                    {execution.blockedTests > 0 && (
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg flex flex-col">
                        <span className="text-xs text-purple-800 dark:text-purple-300">Bloqueados</span>
                        <span className="text-xl font-bold mt-1 text-purple-800 dark:text-purple-300">{execution.blockedTests}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{execution.executor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{execution.executor.name}</div>
                        <div className="text-xs text-muted-foreground">Ejecutor</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <div>Inicio: {execution.startDate}</div>
                          <div>Fin: {execution.endDate}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>
    </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <CardTitle className="text-base">Pasadas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-sm text-muted-foreground">62% del total de pruebas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-base">Fallidas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
            <p className="text-sm text-muted-foreground">9% del total de pruebas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-base">Bloqueadas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">1% del total de pruebas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Executions;
