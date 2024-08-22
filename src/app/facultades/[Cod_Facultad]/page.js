"use client";
import React, { useEffect, useState } from "react";
import { GetFacultad } from "../../services/facultades";
import MenuCard from "../../components/MenuCard";
import { useAppContext } from "../../context/AppContext";

export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const { Cod_Facultad } = props.params;
  const { setTitle, setSubtitle, data, setBanner, setData, setTitleBanner } = useAppContext();

  useEffect(() => {
    GetFacultad(Cod_Facultad).then((data) => {
      setData(data);
      setLoading(false);
      console.log(data);
    });
  }, [Cod_Facultad, setData]);

  useEffect(() => {
    setTitle(Cod_Facultad);
    setSubtitle("Escoja una Carrera");
    setBanner(false);
  }, [setTitle, setSubtitle, Cod_Facultad, setBanner]);
  return (
    <>
      {data.map((carrera) => (
        <MenuCard
          key={carrera.Cod_Carrera}
          name={carrera.Nombre}
          url={`./${Cod_Facultad}/carrera/${carrera.Cod_Carrera}`}
          description={carrera.Descripcion}
          icon={carrera.portada}
          onClick={() => setTitleBanner(carrera.Nombre)} // Pasa la función con el `carrera` actual
          loading={loading}
        />
      ))}
    </>
  );
}
