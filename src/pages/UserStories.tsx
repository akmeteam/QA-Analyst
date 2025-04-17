
import { Button } from "@/components/ui/button";
import { useState } from "react"; // Importa useState para manejar el estado de búsqueda
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Filter, 
  BookText,
  Check,
  CheckCircle2,
  Clock,
  CheckCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Datos simulados de historias de usuario
const mockUserStories = [
  {
    id: "US001",
    title: "Registro de usuario",
    description: "Como usuario nuevo, quiero poder registrarme en el sistema para acceder a las funcionalidades.",
    status: "Completado",
    priority: "Alta",
    assignee: "Ana P.",
    testCases: 5,
    completedTests: 5,
  },
  {
    id: "US002",
    title: "Inicio de sesión",
    description: "Como usuario registrado, quiero poder iniciar sesión para acceder a mi cuenta.",
    status: "En Progreso",
    priority: "Alta",
    assignee: "Carlos M.",
    testCases: 4,
    completedTests: 2,
  },
  {
    id: "US003",
    title: "Recuperación de contraseña",
    description: "Como usuario, quiero poder recuperar mi contraseña en caso de olvidarla.",
    status: "Pendiente",
    priority: "Media",
    assignee: "Sin asignar",
    testCases: 3,
    completedTests: 0,
  },
  {
    id: "US004",
    title: "Edición de perfil",
    description: "Como usuario, quiero poder editar mi información de perfil.",
    status: "En Progreso",
    priority: "Baja",
    assignee: "Luis R.",
    testCases: 3,
    completedTests: 1,
  }
];

const UserStories = () => {
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historias de Usuario</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona las historias de usuario y sus criterios de aceptación
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Historia
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
                placeholder="Buscar historias..."
                className="pl-8"
              />
            </div>
          </div>{/* Elimina el botón de filtro junto al input de búsqueda */}

          {/* Componente Tabs para filtrar las historias por estado */}
          <Tabs defaultValue="todas"> 
            <TabsList className="w-full">
              {/* Trigger para mostrar todas las historias */}
              <TabsTrigger value="todas" className="flex-1">Todas</TabsTrigger>
              {/* Trigger para mostrar solo las historias con estado "Pendiente" */}
              <TabsTrigger value="pendientes" className="flex-1">Pendientes</TabsTrigger>
              {/* Trigger para mostrar solo las historias con estado "En Progreso" */}
              <TabsTrigger value="proceso" className="flex-1">En Proceso</TabsTrigger>
              {/* Trigger para mostrar solo las historias con estado "Completado" */}
              <TabsTrigger value="completadas" className="flex-1">Completadas</TabsTrigger>
            </TabsList>
            
            {/* Muestra las historias que coinciden con el término de búsqueda y el estado "Todas" */}
            <TabsContent value="todas" className="space-y-4 mt-4">
              {mockUserStories
                .filter((story) => 
                  searchTerm === "" || // Si no hay término de búsqueda, muestra todas las historias
                  Object.values(story).some(value => // Busca en todos los valores de cada historia
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .map((story) => (
                  <Card 
                    key={story.id} 
                    className="hover:shadow-md cursor-pointer transition-shadow"
                  >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <BookText className="h-5 w-5 text-qa-purple" />
                        <CardTitle className="text-base">{story.id}: {story.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {story.status === "Completado" && <Badge className="bg-green-500">{story.status}</Badge>}
                        {story.status === "En Progreso" && <Badge className="bg-amber-500">{story.status}</Badge>}
                        {story.status === "Pendiente" && <Badge className="bg-gray-500">{story.status}</Badge>}
                        <Badge variant="outline">{story.priority}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {story.description}
                    </p>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Asignado a: {story.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <CheckCheck className="h-4 w-4 text-green-500" /> {/* Icono para tests completados */}
                          <span className="text-muted-foreground">
                            {story.completedTests}/{story.testCases} tests
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent> {/* Fin del contenido para "todas" las historias */}

            {/* Muestra las historias que coinciden con el término de búsqueda y el estado "Pendiente" */}
            <TabsContent value="pendientes" className="space-y-4 mt-4"> {/* Contenido para historias "Pendientes" */}
              {mockUserStories
                .filter((story) => story.status === "Pendiente") // Filtra por estado "Pendiente"
                .filter((story) =>
                  searchTerm === "" || // Si no hay término de búsqueda, muestra todas las historias pendientes
                  Object.values(story).some(value => // Busca en todos los valores de cada historia
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .map((story) => (
                  <Card 
                    key={story.id} 
                    className="hover:shadow-md cursor-pointer transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <BookText className="h-5 w-5 text-qa-purple" />
                          <CardTitle className="text-base">{story.id}: {story.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gray-500">{story.status}</Badge>
                          <Badge variant="outline">{story.priority}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {story.description}
                      </p>
                      <div className="flex justify-between items-center mt-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Asignado a: {story.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <CheckCheck className="h-4 w-4 text-green-500" /> {/* Icono para tests completados */}
                            <span className="text-muted-foreground">
                              {story.completedTests}/{story.testCases} tests
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent> {/* Fin del contenido para historias "Pendientes" */}

            {/* Muestra las historias que coinciden con el término de búsqueda y el estado "En Progreso" */}
            <TabsContent value="proceso" className="space-y-4 mt-4"> {/* Contenido para historias "En Progreso" */}
              {mockUserStories
                .filter((story) => story.status === "En Progreso") // Filtra por estado "En Progreso"
                .filter((story) =>
                  searchTerm === "" || // Si no hay término de búsqueda, muestra todas las historias en progreso
                  Object.values(story).some(value => // Busca en todos los valores de cada historia
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .map((story) => (
                  <Card 
                    key={story.id} 
                    className="hover:shadow-md cursor-pointer transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <BookText className="h-5 w-5 text-qa-purple" />
                          <CardTitle className="text-base">{story.id}: {story.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-amber-500">{story.status}</Badge>
                          <Badge variant="outline">{story.priority}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {story.description}
                      </p>
                      <div className="flex justify-between items-center mt-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Asignado a: {story.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <CheckCheck className="h-4 w-4 text-green-500" /> {/* Icono para tests completados */}
                            <span className="text-muted-foreground">
                              {story.completedTests}/{story.testCases} tests
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent> {/* Fin del contenido para historias "En Progreso" */}

            {/* Muestra las historias que coinciden con el término de búsqueda y el estado "Completado" */}
            <TabsContent value="completadas" className="space-y-4 mt-4"> {/* Contenido para historias "Completadas" */}
              {mockUserStories
                .filter((story) => story.status === "Completado") // Filtra por estado "Completado"
                .filter((story) =>
                  searchTerm === "" || // Si no hay término de búsqueda, muestra todas las historias completadas
                  Object.values(story).some(value => // Busca en todos los valores de cada historia
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .map((story) => (
                  <Card 
                    key={story.id} 
                    className="hover:shadow-md cursor-pointer transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <BookText className="h-5 w-5 text-qa-purple" />
                          <CardTitle className="text-base">{story.id}: {story.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500">{story.status}</Badge>
                          <Badge variant="outline">{story.priority}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {story.description}
                      </p>
                      <div className="flex justify-between items-center mt-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Asignado a: {story.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <CheckCheck className="h-4 w-4 text-green-500" /> {/* Icono para tests completados */}
                            <span className="text-muted-foreground">
                              {story.completedTests}/{story.testCases} tests
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent> {/* Fin del contenido para historias "Completadas" */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserStories;
