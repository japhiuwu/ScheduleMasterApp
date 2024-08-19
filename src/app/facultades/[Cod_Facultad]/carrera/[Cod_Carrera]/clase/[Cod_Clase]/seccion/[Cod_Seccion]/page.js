"use client";
import React, { useEffect, useState } from "react";

import { GetSeccion } from "../../../../../../../../services/facultades";
import { GetEdificios, GetAulas} from "../../../../../../../../services/edificios";
import { GetDocentes } from "../../../../../../../../services/extras";

import AlertModal from "../../../../../../../../components/AlertModal";
import Template from "../../../../../../../../components/Template";

export default function Home(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [docentes, setDocentes] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [open, setOpen] = useState(false);

  const storedTerm = localStorage.getItem('selectedTerm');
  const { Cod_Facultad, Cod_Carrera, Cod_Clase, Cod_Seccion } = props.params;

  const deleteAction = () => {
    DeleteSection(Term, Cod_Carrera, Cod_Clase, Cod_Seccion).then( (response) => {
        if( response.status != 200 ){            
            setInformationMessage('Error with API call server communication');
            setOpen(false);
            return;
        }else{
            router.push('/');
        }
    });
}

const closeConfirmation = () => {
    setOpen(false);
}

const handleDeleteClick = (e) => {
    e.preventDefault();
    setOpen(true);
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seccion = await GetSeccion(
          Cod_Facultad,
          Cod_Carrera,
          Cod_Clase,
          Cod_Seccion
        );
        setData(seccion[0] || {});
        const docentesData = await GetDocentes(Cod_Carrera);
        setDocentes(docentesData || []);
        const edificiosData = await GetEdificios();
        setEdificios(edificiosData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Cod_Facultad, Cod_Carrera, Cod_Clase, Cod_Seccion]);

  useEffect(() => {
    if (data.Cod_Edificio) {
      GetAulas(data.Cod_Edificio)
        .then((aulasData) => {
          setAulas(aulasData || []);
        })
        .catch((error) => {
          console.error("Error fetching aulas:", error);
        });
    }
  }, [data.Cod_Edificio]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Template
      title={`${Cod_Seccion} ${Cod_Carrera}-${Cod_Clase}`}
      titleHeader={`${Cod_Seccion} ${Cod_Carrera}-${Cod_Clase}`}
      subtitulo={`${Cod_Seccion} ${Cod_Carrera}-${Cod_Clase} ${data.Nombre_Clase}`}
    >
      <AlertModal
      title="Borrar Sección"
        description="¿Está seguro que desea borrar esta sección?"
        deleteAction={deleteAction}
        open={open}
        closeConfirmation={closeConfirmation}
      />
      <form className="mb">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="section"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sección
            </label>
            <input
              type="number"
              id="section"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={Cod_Seccion}
              required
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="classCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Código de la Clase
            </label>
            <input
              type="text"
              id="classCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={`${Cod_Carrera}-${Cod_Clase}`}
              disabled
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="teachers"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Docente Asignado
          </label>
          <select
            id="teachers"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {docentes.map((docente) => (
              <option
                value={docente.Num_Empleado}
                key={docente.Num_Empleado}
                selected={docente.Num_Empleado === data.Num_Empleado}
              >
                {`${docente.Primer_Nombre} ${docente.Primer_Apellido}`}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="buildings"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Edificio
            </label>
            <select
              id="buildings"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {edificios.map((edificio) => (
                <option
                  value={edificio.Cod_Edificio}
                  key={edificio.Cod_Edificio}
                  selected={edificio.Cod_Edificio === data.Cod_Edificio}
                >
                  {edificio.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="classroom"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Aula
            </label>
            <select
              id="classroom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {aulas.map((aula) => (
                <option
                  value={aula.Num_Aula}
                  key={aula.Num_Aula}
                  selected={aula.Num_Aula === data.Num_Aula}
                >
                  {aula.Num_Aula}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="start"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Hora Inicial
            </label>
            <input
              type="time"
              id="start"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"              
              value={data.Hora_Inicial}
              required
            />
          </div>
          <div>
            <label
              htmlFor="end"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Hora Final
            </label>
            <input
              type="time"
              id="end"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"              
              value={data.Hora_Final}
              required
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="mb-6">
            <label
              htmlFor="end"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Días
            </label>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Lu"
                    type="checkbox"
                    value="Lu"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="Lu"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Lunes
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Ma"
                    type="checkbox"
                    value="Ma"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="Ma"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Martes
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Mi"
                    type="checkbox"
                    value="Mi"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="Mi"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Miércoles
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Ju"
                    type="checkbox"
                    value="Ju"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="Ju"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Jueves
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Vi"
                    type="checkbox"
                    value="Vi"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="Vi"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Viernes
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Sa"
                    type="checkbox"
                    value="Sa"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="Sa"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Sábado
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="Do"
                    type="checkbox"
                    value="Do"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="Do"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Domingo
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <label
              htmlFor="quotas"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cupos
            </label>
            <input
              type="number"
              id="quotas"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"              
              value={data.Cupos}
              required
            />
          </div>
        </div>

        <button
                type="button"
                onClick={handleDeleteClick}
                className="text-white mb-6 mr-2 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete
              </button>
        <button
          type="submit"
          className="text-white mb-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Editar
        </button>
      </form>
    </Template>
  );
}
