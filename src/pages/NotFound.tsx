
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50">
      <div className="text-center max-w-md p-6">
        <h1 className="text-9xl font-bold text-qa-blue">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Página no encontrada</h2>
        <p className="text-muted-foreground mb-6">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <Button asChild>
          <Link to="/">Volver al Inicio</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
