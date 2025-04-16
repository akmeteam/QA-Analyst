
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Search, CheckCircle, Clock, XCircle, Calendar, CheckCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Datos simulados de planes de prueba
const mockTestPlans = [
  {
    id: "TP001",
    title: "Plan de Pruebas - Módulo de Autenticación",
    description: "Plan de pruebas para validar el módulo completo de autenticación",
    status: "En Progreso",
    progress: 65,
    createdDate: "2023-10-25",
    dueDate: "2023-12-15",
    owner: {
      name: "Ana P.",
      avatar: ""
    },
    testCases: 18,
    executedTests: 12,
    passedTests: 10,
    failedTests: 2
  },
  {
    id: "TP002",
    title: "Plan de Pruebas - Módulo de Gestión de Usuarios",
    description: "Plan de pruebas para validar la gestión de usuarios y permisos",
    status: "No Iniciado",
    progress: 0,
    createdDate: "2023-11-05",
    dueDate: "2023-12-30",
    owner: {
      name: "Carlos M.",
      avatar: ""
    },
    testCases: 14,
    executedTests: 0,
    passedTests: 0,
    failedTests: 0
  },
  {
    id: "TP003",
    title: "Plan de Pruebas - Funcionalidades de Administrador",
    description: "Plan de pruebas para validar las funcionalidades del rol administrador",
    status: "Completado",
    progress: 100,
    createdDate: "2023-09-15",
    dueDate: "2023-11-01",
    owner: {
      name: "Luis R.",
      avatar: ""
    },
    testCases: 22,
    executedTests: 22,
    passedTests: 20,
    failedTests: 2
  }
];

const TestPlans = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planes de Prueba</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los planes de prueba y su progreso
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Plan
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar planes de prueba..."
          className="pl-8"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockTestPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-qa-blue mt-1" />
                  <div>
                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                    <CardDescription className="mt-1">{plan.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {plan.status === "En Progreso" && <Badge className="bg-amber-500">{plan.status}</Badge>}
                  {plan.status === "No Iniciado" && <Badge className="bg-gray-500">{plan.status}</Badge>}
                  {plan.status === "Completado" && <Badge className="bg-green-500">{plan.status}</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-medium">{plan.progress}%</span>
                </div>
                <Progress value={plan.progress} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg flex flex-col">
                  <span className="text-xs text-muted-foreground">Casos de Prueba</span>
                  <span className="text-xl font-bold mt-1">{plan.testCases}</span>
                </div>
                <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg flex flex-col">
                  <span className="text-xs text-green-800 dark:text-green-300">Pasados</span>
                  <span className="text-xl font-bold mt-1 text-green-800 dark:text-green-300">{plan.passedTests}</span>
                </div>
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg flex flex-col">
                  <span className="text-xs text-red-800 dark:text-red-300">Fallidos</span>
                  <span className="text-xl font-bold mt-1 text-red-800 dark:text-red-300">{plan.failedTests}</span>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg flex flex-col">
                  <span className="text-xs text-amber-800 dark:text-amber-300">Pendientes</span>
                  <span className="text-xl font-bold mt-1 text-amber-800 dark:text-amber-300">{plan.testCases - plan.executedTests}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{plan.owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{plan.owner.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Creado: {plan.createdDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Vence: {plan.dueDate}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestPlans;
