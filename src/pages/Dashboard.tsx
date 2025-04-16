
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  BookText, 
  ClipboardList, 
  FileText
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const barData = [
  { name: "Historia 1", completados: 10, pendientes: 2, fallidos: 1 },
  { name: "Historia 2", completados: 8, pendientes: 4, fallidos: 2 },
  { name: "Historia 3", completados: 12, pendientes: 1, fallidos: 0 },
  { name: "Historia 4", completados: 5, pendientes: 5, fallidos: 3 },
];

const pieData = [
  { name: "Completados", value: 35, color: "#4ade80" },
  { name: "Pendientes", value: 12, color: "#facc15" },
  { name: "Fallidos", value: 6, color: "#f87171" },
];

const testTypesData = [
  { name: "Funcional", tests: 28 },
  { name: "Integración", tests: 12 },
  { name: "Rendimiento", tests: 8 },
  { name: "Seguridad", tests: 5 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Resumen de métricas y estado del proyecto
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="proyecto1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar proyecto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="proyecto1">Proyecto Alpha</SelectItem>
              <SelectItem value="proyecto2">Proyecto Beta</SelectItem>
              <SelectItem value="proyecto3">Proyecto Gamma</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Historias de Usuario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookText className="h-5 w-5 text-qa-blue mr-2" />
              <div className="text-2xl font-bold">12</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              4 completadas, 8 en progreso
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Casos de Prueba
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ClipboardList className="h-5 w-5 text-qa-purple mr-2" />
              <div className="text-2xl font-bold">53</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              35 ejecutados, 18 pendientes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Planes de Prueba
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-emerald-500 mr-2" />
              <div className="text-2xl font-bold">4</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              2 activos, 2 completados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Defectos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <div className="text-2xl font-bold">8</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              3 críticos, 5 menores
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="historias">Historias</TabsTrigger>
          <TabsTrigger value="pruebas">Pruebas</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Pruebas</CardTitle>
                <CardDescription>
                  Distribución de casos de prueba ejecutados
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Pruebas</CardTitle>
                <CardDescription>
                  Distribución por categoría de prueba
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={testTypesData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tests" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="historias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progreso por Historia de Usuario</CardTitle>
              <CardDescription>
                Seguimiento de pruebas para cada historia
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completados" stackId="a" fill="#4ade80" />
                  <Bar dataKey="pendientes" stackId="a" fill="#facc15" />
                  <Bar dataKey="fallidos" stackId="a" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pruebas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Casos de Prueba Recientes</CardTitle>
                <Button variant="outline" size="sm">Ver todos</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50">
                  <div className="flex gap-3">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <div>
                      <p className="font-medium text-sm">Validar inicio de sesión</p>
                      <p className="text-xs text-muted-foreground">Funcional | Historia 1</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Hace 2h</div>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50">
                  <div className="flex gap-3">
                    <XCircle className="text-red-500 h-5 w-5" />
                    <div>
                      <p className="font-medium text-sm">Validar límites de campos</p>
                      <p className="text-xs text-muted-foreground">Funcional | Historia 2</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Hace 5h</div>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50">
                  <div className="flex gap-3">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <div>
                      <p className="font-medium text-sm">Flujo de recuperación de contraseña</p>
                      <p className="text-xs text-muted-foreground">Funcional | Historia 1</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Ayer</div>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50">
                  <div className="flex gap-3">
                    <Clock className="text-amber-500 h-5 w-5" />
                    <div>
                      <p className="font-medium text-sm">Prueba de carga de usuarios concurrentes</p>
                      <p className="text-xs text-muted-foreground">Rendimiento | Historia 3</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Pendiente</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
