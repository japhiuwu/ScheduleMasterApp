"use client";
import React, { useEffect, useState } from "react";
import { GetClases } from "../../../../services/facultades";
import CourseCard from "../../../../components/CourseCard";
import TemplateTerm from "../../../../components/TemplateTerm";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
    const { Cod_Facultad, Cod_Carrera } = props.params;

    useEffect(() => {
        GetClases(Cod_Facultad, Cod_Carrera).then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      });
    }, [Cod_Facultad,Cod_Carrera]);
  return (
    <TemplateTerm
    title={`${Cod_Carrera} `}
    titleHeader={`Prueba`}
    
    >
      {data.map((clase) => (
        <CourseCard
        key={`${clase.Cod_Carrera}-${clase.Cod_Clase}`}
        code={`${clase.Cod_Carrera}-${clase.Cod_Clase}`}
        className={clase.Nombre}
        subtitle={`${clase.Numero_Secciones} Seccion(es) | ${clase.UV}UV`}
        />
      ))}      
    </TemplateTerm>
  );
}
