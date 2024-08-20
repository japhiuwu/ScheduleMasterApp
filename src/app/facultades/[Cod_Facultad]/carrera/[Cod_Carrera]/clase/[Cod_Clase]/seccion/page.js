"use client";
import React, { useEffect, useState } from "react";

import { GetClase } from "../../../../../../../services/facultades";
import { GetEdificios, GetAulas } from "../../../../../../../services/edificios";
import { GetDocentes } from "../../../../../../../services/extras";
import { CreateSection } from "../../../../../../../services/secciones"

import Template from "../../../../../../../components/Template";
import SectionForm from "../../../../../../../components/SectionForm";
import InformationToast from "../../../../../../../components/InformationToast";

import { useRouter } from 'next/navigation';
    

export default function Home(props) {
  const [data, setData] = useState({});
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [docentes, setDocentes] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [aulaLoading, setAulaLoading] = useState(true);
  const [clase, setClase] = useState('');
  const [isCreating, setIsCreating] = useState(true);
  const [status, setStatus] = useState('');
  const [informationMessage, setInformationMessage] = useState('');
  const storedTerm = localStorage.getItem('selectedTerm');
  const { Cod_Facultad, Cod_Carrera, Cod_Clase } = props.params;

  const [formData, setFormData] = useState({});
  const [diasSeleccionados, setDiasSeleccionados] = useState(data.Dias || '');
  const isEmpty = value => value === null || value === undefined || value === '';
  

  const createAction = () => {
    console.log(formData);

    // Verifica si un campo está vacío o no definido
    const isEmpty = value => value === null || value === undefined || value === '';

    // Verificar si alguno de los campos está vacío
    if (
        isEmpty(formData.Num_Empleado) ||
        isEmpty(formData.Cod_Edificio) ||
        isEmpty(formData.Num_Aula) ||
        isEmpty(formData.Hora_Inicial) ||
        isEmpty(formData.Hora_Final) ||
        isEmpty(formData.Cupos)
    ) {
        setStatus('warning');
        setInformationMessage('Debe llenar todos los datos');
        setTimeout(() => {
            setStatus('');
        }, 5000);
        return;
    }

    // Llamada a la función de creación si todos los campos están llenos
    CreateSection(storedTerm, Cod_Carrera, Cod_Clase, formData).then(response => {
        if (response.status !== 200) {
            console.log(response.status);
            setStatus('warning');
            setInformationMessage('Error with API call server communication');
            setTimeout(() => {
                setStatus('');
            }, 5000);
            return;
        } else {
            setStatus('success');
            console.log(response.status);
            setInformationMessage('Se ha creado con éxito');
            setTimeout(() => {
                router.back();
            }, 5000);
            return;
        }
    });
};

const handleHoraChange = (e) => {
    handleInputChange(e);
    const formatTimeToSectionCode = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const formattedHours = hours.padStart(2, '0');
        const formattedMinutes = '00';
        return formattedHours + formattedMinutes;
      };
  
      // Actualiza Cod_Seccion si Hora_Inicial cambia
      const newSectionCode = formatTimeToSectionCode(formData.Hora_Inicial);
      if (newSectionCode !== formData.Cod_Seccion) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          Cod_Seccion: newSectionCode
        }));
/*         setFormData((prevFormData) => ({
            ...prevFormData,
            Hora_Final: formData.Hora_Inicial + 1
          })); */
      }
}
  
const handleCreateClick = (e) => {
  e.preventDefault();
  createAction();
}

const handleInputChange = (e) => {
  const { id, value, type, checked } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [id]: type === 'checkbox' ? checked : value
  }));
};

const handleCheckboxChange = (e) => {
/*   const { id, checked } = e.target;
  setDiasSeleccionados((prevDias) => {
    const diasArray = prevDias.split(''); // Convertir cadena en array
    if (checked) {
      return [...diasArray, id].sort().join(''); // Agregar el nuevo valor y ordenar
    } else {
      return diasArray.filter((dia) => dia !== id).join(''); // Eliminar el valor
    }
  });
  console.log(diasSeleccionados) */
};

const handleEdificioChange = (event) => {
    setAulaLoading(true);
    const selectedEdificio = event.target.value;
    handleInputChange(event);
    setData(prevData => ({
      ...prevData,
      Cod_Edificio: selectedEdificio
    }));
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clase = await GetClase(
          Cod_Facultad,
          Cod_Carrera,
          Cod_Clase,
          storedTerm
        );
        console.log(clase);
        setClase(clase[0].Nombre_Clase);

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
  }, [Cod_Facultad, Cod_Carrera, Cod_Clase, storedTerm, data.Nombre_Clase]);

  useEffect(() => {
    if (data.Cod_Edificio) {
      GetAulas(data.Cod_Edificio)
        .then((aulasData) => {
          setAulas(aulasData || []);
          setAulaLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching aulas:", error);
        });
    }
  }, [data.Cod_Edificio]);

  return (
    <Template
      title={`${Cod_Carrera}-${Cod_Clase}`}
      titleHeader={`${Cod_Carrera}-${Cod_Clase}`}
      subtitulo={`${Cod_Carrera}-${Cod_Clase} ${clase}`}
    >
      <InformationToast 
        message={informationMessage}
        status={status}
        setStatus={setStatus}
      />

      {!loading && (
        <SectionForm
          formData={formData}
          Cod_Carrera={Cod_Carrera}
          Cod_Clase={Cod_Clase}
          handleCreateClick={handleCreateClick}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleEdificioChange={handleEdificioChange}
          handleHoraChange={handleHoraChange}
          docentes={docentes}
          edificios={edificios}
          aulas={aulas}
          data={data}
          isCreating={isCreating}
          aulaLoading={aulaLoading}
        />
      )}
      {loading && (
            <div role="status" className="animate-pulse mt-6">
              <h3 className="h-3 bg-gray-300 rounded-full  w-48 mb-4" />
              <p className="h-2 bg-gray-300 rounded-full w-[380px] mb-2.5" />
              <p className="h-2 bg-gray-300 rounded-full w-[340px] mb-2.5" />
              <p className="h-2 bg-gray-300 rounded-full w-[320px] mb-2.5" />
            </div>
      )}

    </Template>
  );
}
