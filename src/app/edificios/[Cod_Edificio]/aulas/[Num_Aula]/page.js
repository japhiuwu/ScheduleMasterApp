"use client";
import React, { useEffect, useState } from "react";
import { GetAula } from "../../../../services/edificios";
import CourseCard from "../../../../components/CourseCard";
import TemplateTerm from "../../../../components/TemplateTerm";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
    const { Cod_Edificio, Num_Aula } = props.params;

    useEffect(() => {
      GetAula(Cod_Edificio,Num_Aula).then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      });
    }, [Cod_Edificio,Num_Aula]);
  return (
    <TemplateTerm
    title={`${Cod_Edificio} | Aula ${Num_Aula}`}
    titleHeader={`${Cod_Edificio} | Aula ${Num_Aula}`}
    
    >
      {data.map((section) => (
        <CourseCard
        key={`${section.Cod_Carrera}-${section.Cod_Seccion}-${section.Cod_Clase}-${section.Cod_Seccion}`}
        code={`${section.Cod_Seccion} ${section.Cod_Carrera}-${section.Cod_Clase}`}
        className={section.Nombre_Clase}
        subtitle={`${section.Cupos} Cupos - Dias: ${section.Dias}`}
        />
      ))}      
    </TemplateTerm>
  );
}
