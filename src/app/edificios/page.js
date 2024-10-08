"use client";
import React, { useEffect, useState } from "react";
import { GetEdificios } from "../services/edificios";
import { useAppContext } from "../context/AppContext";
import MenuCard from "../components/MenuCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setTitle, setSubtitle, toastMessage } = useAppContext();

  useEffect(() => {
    GetEdificios().then((response) => {
      if(response.status != 200){
        toastMessage("warnign", `${response.error}`);
      } else{
        setData(response.data);
      }
      setLoading(false); // Cambia esto a false cuando los datos se hayan cargado
    });
  }, [toastMessage]);

  useEffect(() =>{
    setTitle("Edificios");
    setSubtitle("Escoja un Edificio");
  }, [setTitle, setSubtitle]);

  return (
    <>
      {data.map((edificio) => (
        <MenuCard
          key={edificio.Cod_Edificio}
          name={edificio.Nombre}
          url={`edificios/${edificio.Cod_Edificio}`}
          description={edificio.Descripcion} // Asegúrate de pasar la descripción si es necesario
          loading={loading}
        />
      ))}
    </>
  );
}
