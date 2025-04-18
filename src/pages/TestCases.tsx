
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  CheckCircle, 
  CheckCircle2, 
  ClipboardList, 
  Clock, 
  Filter, 
  Info, 
  Plus, 
  Search, 
  XCircle 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

import { useState } from "react"; // Importa useState para manejar el estado de búsqueda
// Datos simulados de casos de prueba
const mockTestCases = [
  {
    id: "TC001",
    title: "Validar registro con credenciales válidas",
    description: "Verificar que un usuario puede registrarse con credenciales válidas",
    status: "Pasado",
    type: "Funcional",
    priority: "Alta",
    createdBy: "Ana P.",
    userStory: "US001",
    lastExecuted: "2023-11-10"
  },
  {
    id: "TC002",
    title: "Validar formato de email",
    description: "Verificar que el sistema valida correctamente el formato del email",
    status: "Fallido",
    type: "Validación",
    priority: "Media",
    createdBy: "Carlos M.",
    userStory: "US001",
    lastExecuted: "2023-11-12"
  },
  {
    id: "TC003",
    title: "Validar inicio de sesión con credenciales correctas",
    description: "Verificar que un usuario registrado puede iniciar sesión",
    status: "No Ejecutado",
    type: "Funcional",
    priority: "Alta",
    createdBy: "Luis R.",
    userStory: "US002",
    lastExecuted: "-"
  },
  {
    id: "TC004",
    title: "Validar campos requeridos en login",
    description: "Verificar que el sistema valida los campos requeridos",
    status: "Pasado",
    type: "Validación",
    priority: "Baja",
    createdBy: "Ana P.",
    userStory: "US002",
    lastExecuted: "2023-11-08"
  },
  {
    id: "TC005",
    title: "Validar recuperación de contraseña",
    description: "Verificar que un usuario pueda recuperar su contraseña",
    status: "No Ejecutado",
    type: "Funcional",
    priority: "Media",
    createdBy: "Carlos M.",
    userStory: "US003",
    lastExecuted: "-"
  }
];

const TestCases = () => {
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Casos de Prueba</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los casos de prueba y sus ejecuciones
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Caso
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm} // Asigna el valor del estado al input
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el valor del input
                type="search"
                placeholder="Buscar casos de prueba..."
                className="pl-8"
              />
            </div>
          </div>{/* Elimina el botón de filtro */}

          <Tabs defaultValue="todos">
            <TabsList className="w-full">
              <TabsTrigger value="todos" className="flex-1">Todos</TabsTrigger>
              <TabsTrigger value="no-ejecutados" className="flex-1">No Ejecutados</TabsTrigger>
              <TabsTrigger value="pasados" className="flex-1">Pasados</TabsTrigger>
              <TabsTrigger value="fallidos" className="flex-1">Fallidos</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="mt-4">
              {/* Card que contiene la tabla de casos de prueba */} <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">Estado</TableHead>
                        <TableHead className="w-20">ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Historia</TableHead>
                        <TableHead className="text-right">Última Ejecución</TableHead>
                      </TableRow> 
                    </TableHeader>
                     {/* Mapeo y renderizado de los casos de prueba */} <TableBody>
                      {mockTestCases.filter((testCase) => // Filtra los casos de prueba segun el estado del tab
                      searchTerm === "" || // Si no hay termino de busqueda, muestra todos los casos de prueba
                      Object.values(testCase).some(value => 
                        typeof value === "string" && 
                        value.toLowerCase().includes(searchTerm.toLowerCase()) // Busca en todos los valores del caso de prueba si el valor (en minusculas) incluye el termino de busqueda (en minusculas)
                      )).map((testCase) => (
                          <TableRow
                            key={testCase.id}
                            className="cursor-pointer hover:bg-muted/50"
                          >
                           {/* Icono de estado del caso de prueba */} <TableCell>
                            {testCase.status === "Pasado" && (<CheckCircle className="h-5 w-5 text-green-500" />)}
                            {testCase.status === "Fallido" && (<XCircle className="h-5 w-5 text-red-500" />)}
                            {testCase.status === "No Ejecutado" && (<Clock className="h-5 w-5 text-amber-500" />)}
                          </TableCell>
                          {/* ID del caso de prueba */} <TableCell className="font-medium">{testCase.id}</TableCell>
                          {/* Título del caso de prueba */} <TableCell>{testCase.title}</TableCell>
                           {/* Tipo del caso de prueba */} <TableCell><Badge variant="outline">{testCase.type}</Badge></TableCell>
                          {/* Prioridad del caso de prueba */} <TableCell>
                            {testCase.priority === "Alta" && (<Badge className="bg-red-500">{testCase.priority}</Badge>)}
                            {testCase.priority === "Media" && (<Badge className="bg-amber-500">{testCase.priority}</Badge>)}
                            {testCase.priority === "Baja" && (<Badge className="bg-green-500">{testCase.priority}</Badge>)}
                          </TableCell>
                           {/* Historia de usuario asociada al caso de prueba */} <TableCell>{testCase.userStory}</TableCell>
                           {/* Última ejecución del caso de prueba */} <TableCell className="text-right">{testCase.lastExecuted}</TableCell>
                          </TableRow>
                        ))} 
                    </TableBody> 
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                  <div className="text-sm text-muted-foreground">
                    Mostrando 5 de 5 casos de prueba
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Siguiente
                    </Button>
                  </div>
                </CardFooter>
              </Card> 
            </TabsContent>

            <TabsContent value="no-ejecutados">
              {/* Card que contiene la tabla de casos de prueba */} <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">Estado</TableHead>
                        <TableHead className="w-20">ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Historia</TableHead>
                        <TableHead className="text-right">Última Ejecución</TableHead>
                      </TableRow> 
                    </TableHeader>
                     {/* Mapeo y renderizado de los casos de prueba */} <TableBody>
                      {mockTestCases.filter((testCase) => testCase.status === "No Ejecutado" && // Filtra los casos de prueba segun el estado del tab
                      (searchTerm === "" || // Si no hay termino de busqueda, muestra todos los casos de prueba
                      Object.values(testCase).some(value => 
                        typeof value === "string" && 
                        value.toLowerCase().includes(searchTerm.toLowerCase()) // Busca en todos los valores del caso de prueba si el valor (en minusculas) incluye el termino de busqueda (en minusculas)
                      ))).map((testCase) => (
                          <TableRow
                            key={testCase.id}
                            className="cursor-pointer hover:bg-muted/50"
                          >
                           {/* Icono de estado del caso de prueba */} <TableCell>
                            {testCase.status === "Pasado" && (<CheckCircle className="h-5 w-5 text-green-500" />)}
                            {testCase.status === "Fallido" && (<XCircle className="h-5 w-5 text-red-500" />)}
                            {testCase.status === "No Ejecutado" && (<Clock className="h-5 w-5 text-amber-500" />)}
                          </TableCell>
                          {/* ID del caso de prueba */} <TableCell className="font-medium">{testCase.id}</TableCell>
                          {/* Título del caso de prueba */} <TableCell>{testCase.title}</TableCell>
                           {/* Tipo del caso de prueba */} <TableCell><Badge variant="outline">{testCase.type}</Badge></TableCell>
                          {/* Prioridad del caso de prueba */} <TableCell>
                            {testCase.priority === "Alta" && (<Badge className="bg-red-500">{testCase.priority}</Badge>)}
                            {testCase.priority === "Media" && (<Badge className="bg-amber-500">{testCase.priority}</Badge>)}
                            {testCase.priority === "Baja" && (<Badge className="bg-green-500">{testCase.priority}</Badge>)}
                          </TableCell>
                           {/* Historia de usuario asociada al caso de prueba */} <TableCell>{testCase.userStory}</TableCell>
                           {/* Última ejecución del caso de prueba */} <TableCell className="text-right">{testCase.lastExecuted}</TableCell>
                          </TableRow>
                        ))} 
                    </TableBody> 
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                  <div className="text-sm text-muted-foreground">
                    Mostrando 5 de 5 casos de prueba
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Siguiente
                    </Button>
                  </div>
                </CardFooter>
              </Card> 
            </TabsContent>

            <TabsContent value="pasados">
              {/* Card que contiene la tabla de casos de prueba */} <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">Estado</TableHead>
                        <TableHead className="w-20">ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Historia</TableHead>
                        <TableHead className="text-right">Última Ejecución</TableHead>
                      </TableRow> 
                    </TableHeader>
                     {/* Mapeo y renderizado de los casos de prueba */} <TableBody>
                      {mockTestCases.filter((testCase) => testCase.status === "Pasado" && // Filtra los casos de prueba segun el estado del tab
                      (searchTerm === "" || // Si no hay termino de busqueda, muestra todos los casos de prueba
                      Object.values(testCase).some(value => 
                        typeof value === "string" && 
                        value.toLowerCase().includes(searchTerm.toLowerCase()) // Busca en todos los valores del caso de prueba si el valor (en minusculas) incluye el termino de busqueda (en minusculas)
                      ))).map((testCase) => (
                          <TableRow
                            key={testCase.id}
                            className="cursor-pointer hover:bg-muted/50"
                          >
                           {/* Icono de estado del caso de prueba */} <TableCell>
                            {testCase.status === "Pasado" && (<CheckCircle className="h-5 w-5 text-green-500" />)}
                            {testCase.status === "Fallido" && (<XCircle className="h-5 w-5 text-red-500" />)}
                            {testCase.status === "No Ejecutado" && (<Clock className="h-5 w-5 text-amber-500" />)}
                          </TableCell>
                          {/* ID del caso de prueba */} <TableCell className="font-medium">{testCase.id}</TableCell>
                          {/* Título del caso de prueba */} <TableCell>{testCase.title}</TableCell>
                           {/* Tipo del caso de prueba */} <TableCell><Badge variant="outline">{testCase.type}</Badge></TableCell>
                          {/* Prioridad del caso de prueba */} <TableCell>
                            {testCase.priority === "Alta" && (<Badge className="bg-red-500">{testCase.priority}</Badge>)}
                            {testCase.priority === "Media" && (<Badge className="bg-amber-500">{testCase.priority}</Badge>)}
                            {testCase.priority === "Baja" && (<Badge className="bg-green-500">{testCase.priority}</Badge>)}
                          </TableCell>
                           {/* Historia de usuario asociada al caso de prueba */} <TableCell>{testCase.userStory}</TableCell>
                           {/* Última ejecución del caso de prueba */} <TableCell className="text-right">{testCase.lastExecuted}</TableCell>
                          </TableRow>
                        ))} 
                    </TableBody> 
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                  <div className="text-sm text-muted-foreground">
                    Mostrando 5 de 5 casos de prueba
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Siguiente
                    </Button>
                  </div>
                </CardFooter>
              </Card> 
            </TabsContent>

            <TabsContent value="fallidos">
              {/* Card que contiene la tabla de casos de prueba */} <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">Estado</TableHead>
                        <TableHead className="w-20">ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Historia</TableHead>
                        <TableHead className="text-right">Última Ejecución</TableHead>
                      </TableRow> 
                    </TableHeader>
                     {/* Mapeo y renderizado de los casos de prueba */} <TableBody>
                      {mockTestCases.filter((testCase) => testCase.status === "Fallido" && // Filtra los casos de prueba segun el estado del tab
                      (searchTerm === "" || // Si no hay termino de busqueda, muestra todos los casos de prueba
                      Object.values(testCase).some(value => 
                        typeof value === "string" && 
                        value.toLowerCase().includes(searchTerm.toLowerCase()) // Busca en todos los valores del caso de prueba si el valor (en minusculas) incluye el termino de busqueda (en minusculas)
                      ))).map((testCase) => (
                          <TableRow
                            key={testCase.id}
                            className="cursor-pointer hover:bg-muted/50"
                          >
                           {/* Icono de estado del caso de prueba */} <TableCell>
                            {testCase.status === "Pasado" && (<CheckCircle className="h-5 w-5 text-green-500" />)}
                            {testCase.status === "Fallido" && (<XCircle className="h-5 w-5 text-red-500" />)}
                            {testCase.status === "No Ejecutado" && (<Clock className="h-5 w-5 text-amber-500" />)}
                          </TableCell>
                          {/* ID del caso de prueba */} <TableCell className="font-medium">{testCase.id}</TableCell>
                          {/* Título del caso de prueba */} <TableCell>{testCase.title}</TableCell>
                           {/* Tipo del caso de prueba */} <TableCell><Badge variant="outline">{testCase.type}</Badge></TableCell>
                          {/* Prioridad del caso de prueba */} <TableCell>
                            {testCase.priority === "Alta" && (<Badge className="bg-red-500">{testCase.priority}</Badge>)}
                            {testCase.priority === "Media" && (<Badge className="bg-amber-500">{testCase.priority}</Badge>)}
                            {testCase.priority === "Baja" && (<Badge className="bg-green-500">{testCase.priority}</Badge>)}
                          </TableCell>
                           {/* Historia de usuario asociada al caso de prueba */} <TableCell>{testCase.userStory}</TableCell>
                           {/* Última ejecución del caso de prueba */} <TableCell className="text-right">{testCase.lastExecuted}</TableCell>
                          </TableRow>
                        ))} 
                    </TableBody> 
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                  <div className="text-sm text-muted-foreground">
                    Mostrando 5 de 5 casos de prueba
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Siguiente
                    </Button>
                  </div>
                </CardFooter>
              </Card> 
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-base">Casos Pasados</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">40% del total de casos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-base">Casos Fallidos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">20% del total de casos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-base">Pendientes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <p className="text-sm text-muted-foreground">40% del total de casos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCases;
