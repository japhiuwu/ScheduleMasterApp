"use client";
import React, { useEffect, useState } from "react";
import { GetClaseSeccion } from "../../../../../../services/facultades";
import CourseCard from "../../../../../../components/CourseCard";
import { useAppContext } from "../../../../../../context/AppContext";
import Skeleton from "@/app/components/Skeleton";

export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const { Cod_Facultad, Cod_Carrera, Cod_Clase } = props.params;
  const { setTitle, setSubtitle, data, setBanner, setData, setDescriptionBanner, toastMessage, setTitleBanner, setLinkBanner } = useAppContext();
  
  const storedTerm = localStorage.getItem('selectedTerm');
  const message = sessionStorage.getItem('deleteMessage');

  if (message) {
      alert(message); 
      console.log(message);
      sessionStorage.removeItem('deleteMessage'); 
  }

  useEffect(() => {
    setLoading(true); // Mueve el setLoading aquí si es parte de la lógica de carga
  
    GetClaseSeccion(Cod_Facultad, Cod_Carrera, Cod_Clase, storedTerm).then((response) => {
      if (response.status !== 200) {
        toastMessage("warning", `${response.error}`);
      } else {
        console.log(response.data);
        setData(response.data);
        if (response.data.length > 0) {
          setTitleBanner(response.data[0].Carrera);
        }
      }
      setLoading(false); // Solo después de recibir la respuesta
    });
  }, [setData]); // Lista de dependencias
  

  useEffect(() => {
    setSubtitle('');
    setBanner(true);
    console.log(data);
    setTitle(`${Cod_Carrera}-${Cod_Clase}`);
    if (data && data.length > 0) {
      setTitleBanner(data[0].Nombre_Clase);
    } else {
      setTitleBanner(`${Cod_Carrera}-${Cod_Clase}`);
    }
  
    setDescriptionBanner(`${Cod_Carrera}-${Cod_Clase} | ${storedTerm}`);
    setLinkBanner(`./${Cod_Clase}/seccion`);
  }, [data]); // Dependencias necesarias para el efecto
  
  

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
        data.map((section) => (
          <CourseCard
            key={`${section.Cod_Carrera}-${section.Cod_Clase}-${section.Cod_Seccion}`}
            code={`${section.Cod_Seccion} ${section.Cod_Carrera}-${section.Cod_Clase}`}
            className={`${section.Nombre_Clase}`}
            subtitle={`${section.Cod_Edificio} Aula ${section.Num_Aula} - Dias ${section.Dias}`}
            description={`Docente ${section.Nombre_Docente} ${section.Apellido_Docente} - ${section.Cupos} Cupos`}
            url={`./${section.Cod_Clase}/seccion/${section.Cod_Seccion}`}
            onClick={() => {console.log(`${section.Nombre_Clase}`)}}
          />
        ))
      ) : (
        <p>No hay secciones creadas.</p>
      )}
    </>
  );
}
