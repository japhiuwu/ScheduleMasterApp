"use client";
import React, { useEffect, useState } from "react";
import { GetAulas } from "../../services/edificios";
import MenuCard from "../../components/MenuCard";
import { useAppContext } from "../../context/AppContext";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Cod_Edificio } = props.params;
  const { setTitle, setSubtitle,setShowMenu } = useAppContext();

  useEffect(() => {
    setTitle(Cod_Edificio);
    setSubtitle("Escoja un Aula");
    setShowMenu(true);
  }, [setTitle, setSubtitle, setShowMenu, Cod_Edificio]);

  useEffect(() => {
    GetAulas(Cod_Edificio).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [Cod_Edificio]);

  return (
    <>
      {data.map((aula) => (
        <MenuCard
          key={aula.Num_Aula}
          name={aula.Num_Aula}
          url={`${aula.Cod_Edificio}/aulas/${aula.Num_Aula}`}
          description={`${aula.Cod_Edificio} | ${aula.Tipo}`}
        />
      ))}
    </>
  );
}
