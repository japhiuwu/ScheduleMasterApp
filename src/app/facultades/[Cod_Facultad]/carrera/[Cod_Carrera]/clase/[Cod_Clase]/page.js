"use client";
import React, { useEffect, useState } from "react";
import { GetClase } from "../../../../../../services/facultades";
import CourseCard from "../../../../../../components/CourseCard";
import TemplateTerm from "../../../../../../components/TemplateTerm";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
    const { Cod_Facultad, Cod_Carrera, Cod_Clase } = props.params;
    const [clase, setClase] = useState('Nombre de la clase');
    
    const storedTerm = localStorage.getItem('selectedTerm');
    const message = sessionStorage.getItem('deleteMessage');

    if (message) {
        alert(message); 
        console.log(message)
        sessionStorage.removeItem('deleteMessage'); 
    }

    useEffect(() => {
      GetClase(Cod_Facultad, Cod_Carrera, Cod_Clase, storedTerm).then((secciones) => {
        console.log(secciones);
        setData(secciones);
        setClase(secciones[0].Nombre_Clase)
        setLoading(false);
      });
    }, [Cod_Facultad,Cod_Carrera,Cod_Clase, storedTerm]);
  return (
    <TemplateTerm
    title={`${Cod_Carrera}-${Cod_Clase} `}
    titleHeader={clase}
    description={`${Cod_Carrera}-${Cod_Clase} | ${storedTerm}`}
    link={`./${Cod_Clase}/seccion`}
    >
      {data.map((section) => (
        <CourseCard
        key={`${section.Cod_Carrera}-${section.Cod_Clase}-${section.Cod_Seccion}`}
        code={`${section.Cod_Seccion} ${section.Cod_Carrera}-${section.Cod_Clase}`}
        className={`${section.Nombre_Clase}`}
        subtitle={`${section.Cod_Edificio} Aula ${section.Num_Aula} - Dias ${section.Dias}`}
        description={`Docente ${section.Nombre_Docente} ${section.Apellido_Docente} - ${section.Cupos} Cupos`}
        url={`./${section.Cod_Clase}/seccion/${section.Cod_Seccion}`}
        />
      ))}      
    </TemplateTerm>
  );
}
