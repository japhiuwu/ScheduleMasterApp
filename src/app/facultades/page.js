"use client";
import React, { useEffect, useState } from "react";
import { GetFacultades } from "../services/facultades";
import MenuLateral from "../components/MenuLateral";
import Header from "../components/Header";
import MenuCard from "../components/MenuCard";
import Template from "../components/Template";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetFacultades().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <Template subtitulo={"Escoja una facultad"}>
      {data.map((facultad) => (
        <MenuCard
          key={facultad.Cod_Facultad}
          name={facultad.Nombre}
          url={`facultades/${facultad.Cod_Facultad}`}
          description={facultad.descripcion}
          icon={facultad.portada}
        />
      ))}
    </Template>
  );
}
