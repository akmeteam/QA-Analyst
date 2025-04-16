
import { Button } from "@/components/ui/button";
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
                type="search"
                placeholder="Buscar historias..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="todas">
            <TabsList className="w-full">
              <TabsTrigger value="todas" className="flex-1">Todas</TabsTrigger>
              <TabsTrigger value="pendientes" className="flex-1">Pendientes</TabsTrigger>
              <TabsTrigger value="proceso" className="flex-1">En Proceso</TabsTrigger>
              <TabsTrigger value="completadas" className="flex-1">Completadas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todas" className="space-y-4 mt-4">
              {mockUserStories.map((story) => (
                <Card key={story.id} className="hover:shadow-md cursor-pointer transition-shadow">
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
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{story.description}</p>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Asignado a: {story.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <CheckCheck className="h-4 w-4 text-green-500" />
                          <span className="text-muted-foreground">{story.completedTests}/{story.testCases} tests</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="pendientes">
              <div className="p-4 text-center text-muted-foreground">
                Filtro de historias pendientes
              </div>
            </TabsContent>
            
            <TabsContent value="proceso">
              <div className="p-4 text-center text-muted-foreground">
                Filtro de historias en proceso
              </div>
            </TabsContent>
            
            <TabsContent value="completadas">
              <div className="p-4 text-center text-muted-foreground">
                Filtro de historias completadas
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de Historia</CardTitle>
              <CardDescription>
                Selecciona una historia para ver sus detalles
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <BookText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Selecciona una historia de usuario para ver los detalles y criterios de aceptación
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserStories;
