import Image from "next/image";
import HeaderCard from "./components/HeaderCard";
import MenuLateral from "./components/MenuLateral";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header en la parte superior */}
      <Header
        title={"Inicio"}
        img={
          "https://upload.wikimedia.org/wikipedia/en/e/e6/Billie_Eilish_-_Everything_I_Wanted.png"
        }
        initials={"IM"}
      />

      <div className="flex flex-1">
        {/* Menu lateral a la izquierda */}
        <MenuLateral />

        <div className="flex flex-col w-full ml-16">
          {/* HeaderCard en el espacio vacío */}
          <HeaderCard
            term={"III PAC"}
            year={2025}
            startDate={"1 Jan"}
            endDate={"31 Dec"}
          />
          <CourseCard
            code={"IS-410"}
            className={"Programacion Orientada a Objetos"}
            sections={6}
          />
          <CourseCard
            code={"IS-410"}
            className={"Programacion Orientada a Objetos"}
            sections={6}
          />
          <CourseCard
            code={"IS-410"}
            className={"Programacion Orientada a Objetos"}
            sections={6}
          />
          <CourseCard
            code={"IS-410"}
            className={"Programacion Orientada a Objetos"}
            sections={6}
          />
        </div>
      </div>
    </div>
  );
}
