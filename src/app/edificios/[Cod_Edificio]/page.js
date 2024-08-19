"use client";
import React, { useEffect, useState } from "react";
import { GetAulas } from "../../services/edificios";
import MenuCard from "../../components/MenuCard";
import Template from "../../components/Template";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Cod_Edificio } = props.params;

  useEffect(() => {
    GetAulas(Cod_Edificio).then((data) => {
      
      setData(data);
      console.log(data);
      setLoading(false);
    });
  }, [Cod_Edificio]);

  return (
    <Template subtitulo={"Escoja un Aula"}>
      {data.map((aula) => (
        <MenuCard
          key={aula.Num_Aula}
          name={aula.Num_Aula}
          url={`${aula.Cod_Edificio}/aulas/${aula.Num_Aula}`}
          description={`${aula.Cod_Edificio} | ${aula.Tipo}`}
        />
      ))}
    </Template>
  );
}
