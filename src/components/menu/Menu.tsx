import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <div className="text-xl font-bold text-gray-800">
        <Link to="/">Dev-Clients</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/">
          <Button variant={location.pathname === "/" ? "default" : "outline"}>Accueil</Button>
        </Link>
        <Link to="/admin">
          <Button variant={location.pathname === "/admin" ? "default" : "outline"}>Admin</Button>
        </Link>
      </div>
    </nav>
  );
}

export default Menu;