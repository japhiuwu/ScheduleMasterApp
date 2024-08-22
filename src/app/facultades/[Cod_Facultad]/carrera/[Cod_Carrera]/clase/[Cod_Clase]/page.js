"use client";
import React, { useEffect, useState } from "react";
import { GetClase } from "../../../../../../services/facultades";
import CourseCard from "../../../../../../components/CourseCard";
import TemplateTerm from "../../../../../../components/TemplateTerm";
import { useAppContext } from "../../../../../../context/AppContext";

export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const { Cod_Facultad, Cod_Carrera, Cod_Clase } = props.params;
  const { setTitle, setSubtitle, data, setBanner, setData, setDescriptionBanner, setTitleBanner, setLinkBanner } = useAppContext();
  
  const storedTerm = localStorage.getItem('selectedTerm');
  const message = sessionStorage.getItem('deleteMessage');

  if (message) {
      alert(message); 
      console.log(message);
      sessionStorage.removeItem('deleteMessage'); 
  }

  useEffect(() => {
    GetClase(Cod_Facultad, Cod_Carrera, Cod_Clase, storedTerm).then((secciones) => {
      console.log(secciones);
      setData(secciones);
      setTitleBanner(secciones[0].Nombre_Clase)
      setLoading(false);
    });
  }, [Cod_Facultad, Cod_Carrera, Cod_Clase, storedTerm, setData, setTitleBanner]);

  useEffect(() => {
    setSubtitle('');
    setBanner(true);
    setTitle(`${Cod_Carrera}-${Cod_Clase}`);
    setTitleBanner();
    setDescriptionBanner(`${Cod_Carrera}-${Cod_Clase} | ${storedTerm}`);
    setLinkBanner(`./${Cod_Clase}/seccion`);
  }, [Cod_Carrera, Cod_Clase, storedTerm, setBanner, setTitle, setSubtitle, setTitleBanner, setDescriptionBanner, setLinkBanner]);

  return (
    <>
      {data && data.length > 0 ? (
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
        <p>No hay clases creadas.</p>
      )}
    </>
  );
}
