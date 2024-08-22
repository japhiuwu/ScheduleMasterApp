"use client";
import React, { useEffect, useState } from "react";
import { GetClases } from "../../../../services/facultades";
import CourseCard from "../../../../components/CourseCard";
import { useAppContext } from "../../../../context/AppContext";
import Skeleton from "@/app/components/Skeleton";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Cod_Facultad, Cod_Carrera } = props.params;
  const storedTerm = localStorage.getItem('selectedTerm');
  const { setTitle, setBanner, setTitleBanner, setDescriptionBanner, toastMessage, setSubtitle } = useAppContext();

  useEffect(() => {
    // Fetch data when the component mounts or when dependencies change
    GetClases(Cod_Facultad, Cod_Carrera, storedTerm).then((response) => {
      if(response.status != 200){
        toastMessage("warnign", `${response,error}`);
      } else{
        setData(response.data);
        if(response.data.length > 0){
          setTitleBanner(response.data[0].Carrera);
        }
      }
      setLoading(false);
      
    });
  }, [Cod_Facultad, Cod_Carrera, storedTerm, setTitleBanner]);

  useEffect(() => {
    // Update context values when the component mounts or dependencies change
    setTitle(Cod_Carrera);
    setBanner(true);
    setDescriptionBanner(storedTerm);
    setSubtitle('')
  });

  return (
    <>
      {loading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : data.length > 0 ? (
        data.map((clase) => (
          <CourseCard
            key={`${clase.Cod_Carrera}-${clase.Cod_Clase}`}
            code={`${clase.Cod_Carrera}-${clase.Cod_Clase}`}
            className={clase.Nombre}
            subtitle={`${clase.Numero_Secciones} Seccion(es) | ${clase.UV} UV`}
            url={`./${clase.Cod_Carrera}/clase/${clase.Cod_Clase}`}
            onClick={() => setTitleBanner(clase.Nombre)}
            loading={loading}
          />
        ))
      ) : (
        <p>No hay clases creadas.</p>
      )}
    </>
  );
}
