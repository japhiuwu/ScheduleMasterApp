"use client";
import React, { useEffect, useState } from "react";
import { GetClases } from "../../../../services/facultades";
import CourseCard from "../../../../components/CourseCard";
import TemplateTerm from "../../../../components/TemplateTerm";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
    const { Cod_Facultad, Cod_Carrera } = props.params;
    const storedTerm = localStorage.getItem('selectedTerm');

    useEffect(() => {
        GetClases(Cod_Facultad, Cod_Carrera, storedTerm).then((data) => {
        setData(data);
        setLoading(false);
      });
    }, [Cod_Facultad,Cod_Carrera, storedTerm]);
  return (
    <TemplateTerm
    title={`${Cod_Carrera} `}
    titleHeader={`Prueba`}
    
    >
      {data.length > 0 ? (
        data.map((clase) => (
        <CourseCard
        key={`${clase.Cod_Carrera}-${clase.Cod_Clase}`}
        code={`${clase.Cod_Carrera}-${clase.Cod_Clase}`}
        className={clase.Nombre}
        subtitle={`${clase.Numero_Secciones} Seccion(es) | ${clase.UV}UV`}
        url={`./${clase.Cod_Carrera}/clase/${clase.Cod_Clase}`}
        />
      ))
    ): (
      !loading && ( 

        <p>No hay secciones creadas.</p> 
        
        )
      
    )}    
    </TemplateTerm>
  );
}
