"use client";
import React, { useEffect, useState } from "react";
import { GetAula } from "../../../../services/edificios";
import CourseCard from "../../../../components/CourseCard";
import { useAppContext } from "../../../../context/AppContext";


export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState('Periodo 0');
  const { Cod_Edificio, Num_Aula } = props.params;
  const { setTitle, setShowMenu, setBanner, setTitleBanner, setDescriptionBanner } = useAppContext();

  const storedTerm = localStorage.getItem('selectedTerm');
  const message = sessionStorage.getItem('deleteMessage');

    useEffect(() => {
      setBanner(true)
      setTitle(`${Cod_Edificio} | Aula ${Num_Aula}`);
      setTitleBanner(`${Cod_Edificio} | Aula ${Num_Aula}`);
      setDescriptionBanner(storedTerm);
      GetAula(Cod_Edificio,Num_Aula,storedTerm).then((data) => {
        setData(data);
        setLoading(false);
      });
    }, [setTitle,Cod_Edificio,Num_Aula,storedTerm,setDescriptionBanner,setTitleBanner,setBanner]);
  return (
    <
    >
    {data.length > 0 ? (
      data.map((section) => (
        <CourseCard
          key={`${section.Cod_Carrera}-${section.Cod_Clase}-${section.Cod_Seccion}`}
          code={`${section.Cod_Seccion} ${section.Cod_Carrera}-${section.Cod_Clase}`}
          className={`${section.Nombre_Clase}`}
          subtitle={`Dias ${section.Dias} - ${section.Cupos} Cupos`}
          description={`Docente ${section.Nombre_Docente} ${section.Apellido_Docente}`}
          url={`/facultades/${section.Cod_Facultad}/carrera/${section.Cod_Carrera}/clase/${section.Cod_Clase}/seccion/${section.Cod_Seccion}`}
        />
      ))
    ) : (
      !loading && ( 

        <p>No hay secciones creadas.</p> 
        
        )
      
    )}
  
    </>
  );
}
