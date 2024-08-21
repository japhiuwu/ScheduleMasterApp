"use client"
import { useEffect } from 'react';
import CourseCard from "../components/CourseCard";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { setTitle, setSubtitle } = useAppContext();

  useEffect(() => {
    setTitle("Periodos");
    setSubtitle("Escoja un Periodo");
  }, [setTitle, setSubtitle]);
  return (
    <div>
      <CourseCard
        code={"IS-410"}
        className={"Programacion Orientada a Objetos"}
        sections={6}
        url={"/"}
      />
    </div>
  );
}
