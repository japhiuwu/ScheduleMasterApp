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
  const { setTitle, setBanner, setTitleBanner, setDescriptionBanner } = useAppContext();

  useEffect(() => {
    // Fetch data when the component mounts or when dependencies change
    GetClases(Cod_Facultad, Cod_Carrera, storedTerm).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [Cod_Facultad, Cod_Carrera, storedTerm]);

  useEffect(() => {
    // Update context values when the component mounts or dependencies change
    setTitle(Cod_Carrera);
    setBanner(true);
    setDescriptionBanner(storedTerm);
  }, [Cod_Carrera, storedTerm, setTitle, setBanner, setDescriptionBanner]);

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
        <p>No hay secciones creadas.</p>
      )}
    </>
  );
}
