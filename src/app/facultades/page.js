"use client";
import React, { useEffect, useState } from "react";
import { GetFacultades } from "../services/facultades";
import MenuCard from "../components/MenuCard";
import Template from "../components/Template";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setTitle, setSubtitle } = useAppContext();

  useEffect(() => {
    setTitle("Facultades");
    setSubtitle("Escoja una Facultad");
  }, [setTitle, setSubtitle]);

  useEffect(() => {
    GetFacultades().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);
  

  return (
    <div className="flex flex-row flex-wrap justify-center w-auto">
      {data.map((facultad) => (
        <MenuCard
          key={facultad.Cod_Facultad}
          name={facultad.Nombre}
          url={`facultades/${facultad.Cod_Facultad}`}
          description={facultad.descripcion}
          icon={facultad.portada}
        />
      ))}
    </div>
  );
}
