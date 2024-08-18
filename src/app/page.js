import Image from "next/image";
import HeaderCard from "./components/HeaderCard";
import MenuLateral from "./components/MenuLateral";
import Header from "./components/Header";
import MenuCard from "./components/MenuCard";
import Template from "./components/Template";

export default function Home() {
  return (
    <Template
    subtitulo="¿Cómo desea trabajar hoy?"
    title="Inicio"
    >
      <MenuCard name="Aula" description="Visualizar por Aula" url="/edificios"/>
      <MenuCard name="Carrera" description="Visualizar por Carrera" url="/facultades"/>
    </Template>
  );
}
