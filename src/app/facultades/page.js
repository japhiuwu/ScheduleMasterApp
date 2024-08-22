"use client";
import React, { useEffect, useState } from "react";
import { GetFacultades } from "../services/facultades";
import MenuCard from "../components/MenuCard";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { setTitle, setSubtitle, data, setData, toastMessage } = useAppContext();
  const [loading, setLoading] = useState(data.length > 0 ? false : true);

  useEffect(() => {
    setTitle("Facultades");
    setSubtitle("Escoja una Facultad");
  }, [setTitle, setSubtitle]);

  useEffect(() => {
    GetFacultades().then((response) => {
      if(response.status != 200){
        toastMessage("warnign", `${response,error}`);
      } else{
        setData(response.data);
      }
      setLoading(false);
    });
  }, [setData]);
  

  return (
    <div className="flex flex-row flex-wrap justify-center w-auto">
      {data.map((facultad) => (
        <MenuCard
          key={facultad.Cod_Facultad}
          name={facultad.Nombre}
          url={`facultades/${facultad.Cod_Facultad}`}
          description={facultad.descripcion}
          icon={facultad.portada}
          loading={loading}
        />
      ))}
    </div>
  );
}
