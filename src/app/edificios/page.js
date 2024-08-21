"use client";
import React, { useEffect, useState } from "react";
import { GetEdificios } from "../services/edificios";
import { useAppContext } from "../context/AppContext";
import MenuCard from "../components/MenuCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setTitle, setSubtitle,setShowMenu } = useAppContext();

  useEffect(() => {
    GetEdificios().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  useEffect(() =>{
    setTitle("Edificios");
    setSubtitle("Escoja un Edificio");
  }, [setTitle, setSubtitle])

  return (
    <>
      {data.map((edificio) => (
        <MenuCard
          key={edificio.Cod_Edificio}
          name={edificio.Nombre}
          url={`edificios/${edificio.Cod_Edificio}`}
        />
      ))}
    </>
  );
}
