"use client";
import React, { useEffect, useState } from "react";
import { GetEdificios } from "../services/edificios";
import MenuLateral from "../components/MenuLateral";
import Header from "../components/Header";
import MenuCard from "../components/MenuCard";
import Template from "../components/Template";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetEdificios().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <Template subtitulo={"Escoja un Edificio"}>
      {data.map((edificio) => (
        <MenuCard
          key={edificio.Cod_Edificio}
          name={edificio.Nombre}
          url={`edificios/${edificio.Cod_Edificio}`}
        />
      ))}
    </Template>
  );
}
