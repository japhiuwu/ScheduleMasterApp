"use client";
import { useEffect } from "react";
import { useAppContext } from "./context/AppContext";
import MenuCard from "./components/MenuCard";

export default function Home() {
  const { setTitle, setSubtitle,setShowMenu } = useAppContext();

  useEffect(() => {
    setTitle("Inicio");
    setSubtitle("¿Cómo desea trabajar hoy?");
    setShowMenu(true);
  }, [setTitle, setSubtitle, setShowMenu]);

  return (
    <div className="flex flex-row">
      <MenuCard name="Aula" description="Visualizar por Aula" url="/edificios" />
      <MenuCard name="Carrera" description="Visualizar por Carrera" url="/facultades" />
    </div>
  );
}
