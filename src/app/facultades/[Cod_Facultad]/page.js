"use client";
import React, { useEffect, useState } from "react";
import { GetFacultad } from "../../services/facultades";
import MenuCard from "../../components/MenuCard";
import Template from "../../components/Template";


export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Cod_Facultad } = props.params;

  useEffect(() => {
    GetFacultad(Cod_Facultad).then((data) => {
      setData(data);
      setLoading(false);
      console.log(data);
    });
  }, [Cod_Facultad]);

  return (
    <Template title={Cod_Facultad} subtitulo={"Escoja una Carrera"}>
      {data.map((carrera) => (
        <MenuCard
          key={carrera.Cod_Carrera}
          name={carrera.Nombre}
          url={`./${Cod_Facultad}/carrera/${carrera.Cod_Carrera}`}
          description={carrera.Descripcion}
          icon={carrera.portada}
        />
      ))}
    </Template>
  );
}
