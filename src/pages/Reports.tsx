
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  Cell,
  LineChart,
  Line
} from "recharts";

import { 
  BarChart3,
  ChevronDown,
  Download,
  FileBarChart,
  FileSpreadsheet,
  PieChart as PieChartIcon,
  Share2
} from "lucide-react";

const pieData = [
  { name: "Funcionales", value: 42, color: "#4361ee" },
  { name: "Integración", value: 18, color: "#7209b7" },
  { name: "Rendimiento", value: 8, color: "#4cc9f0" },
  { name: "Seguridad", value: 12, color: "#f72585" },
];

const statusData = [
  { name: "Pasadas", value: 42, color: "#4ade80" },
  { name: "Fallidas", value: 6, color: "#f87171" },
  { name: "Bloqueadas", value: 1, color: "#a78bfa" },
  { name: "No Ejecutadas", value: 19, color: "#94a3b8" },
];

const trendData = [
  { name: "Semana 1", pasadas: 10, fallidas: 5, bloqueadas: 2 },
  { name: "Semana 2", pasadas: 15, fallidas: 3, bloqueadas: 1 },
  { name: "Semana 3", pasadas: 22, fallidas: 2, bloqueadas: 0 },
  { name: "Semana 4", pasadas: 30, fallidas: 1, bloqueadas: 0 },
  { name: "Semana 5", pasadas: 42, fallidas: 6, bloqueadas: 1 }
];

const storiesData = [
  { name: "US001", completados: 5, pendientes: 0, fallidos: 0 },
  { name: "US002", completados: 3, pendientes: 1, fallidos: 0 },
  { name: "US003", completados: 0, pendientes: 3, fallidos: 0 },
  { name: "US004", completados: 1, pendientes: 1, fallidos: 1 },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-muted-foreground mt-1">
            Visualiza y analiza datos de calidad del proyecto
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
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Progreso de Pruebas</CardTitle>
              <FileBarChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
            <p className="text-sm text-muted-foreground">48/68 casos de prueba ejecutados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Tasa de Éxito</CardTitle>
              <FileBarChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">88%</div>
            <p className="text-sm text-muted-foreground">42/48 casos pasados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Defectos Críticos</CardTitle>
              <FileBarChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">2 defectos bloqueantes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="tendencias">Tendencias</TabsTrigger>
          <TabsTrigger value="historias">Historias</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resumen" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Estado de Pruebas</CardTitle>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Distribución de casos de prueba por estado
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {statusData.map((entry, index) => (
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
                <div className="flex items-center justify-between">
                  <CardTitle>Tipos de Pruebas</CardTitle>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Distribución por categoría de prueba
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
          </div>
        </TabsContent>
        
        <TabsContent value="tendencias" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tendencia de Pruebas</CardTitle>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Progreso semanal de ejecución de pruebas
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pasadas" stroke="#4ade80" strokeWidth={2} />
                  <Line type="monotone" dataKey="fallidas" stroke="#f87171" strokeWidth={2} />
                  <Line type="monotone" dataKey="bloqueadas" stroke="#a78bfa" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="historias" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Progreso por Historia de Usuario</CardTitle>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Estado de pruebas por historia de usuario
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={storiesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completados" stackId="a" fill="#4ade80" />
                  <Bar dataKey="pendientes" stackId="a" fill="#94a3b8" />
                  <Bar dataKey="fallidos" stackId="a" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reportes Disponibles</CardTitle>
            <Select defaultValue="ultimos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ultimos">Últimos Generados</SelectItem>
                <SelectItem value="populares">Más Populares</SelectItem>
                <SelectItem value="personalizados">Personalizados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-qa-blue" />
                <div>
                  <h3 className="font-medium">Reporte de Ejecución - Sprint 10</h3>
                  <p className="text-sm text-muted-foreground">Generado: 10/11/2023</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <PieChartIcon className="h-8 w-8 text-qa-purple" />
                <div>
                  <h3 className="font-medium">Reporte de Cobertura</h3>
                  <p className="text-sm text-muted-foreground">Generado: 05/11/2023</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-emerald-500" />
                <div>
                  <h3 className="font-medium">Matriz de Trazabilidad</h3>
                  <p className="text-sm text-muted-foreground">Generado: 01/11/2023</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
