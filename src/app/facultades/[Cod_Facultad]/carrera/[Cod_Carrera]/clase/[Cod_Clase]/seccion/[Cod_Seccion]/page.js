"use client";
import React, { useEffect, useState } from "react";

import { GetSeccion } from "../../../../../../../../services/facultades";
import { GetEdificios, GetAulas} from "../../../../../../../../services/edificios";
import { GetDocentes } from "../../../../../../../../services/extras";
import { DeleteSection, UpdateSection } from "../../../../../../../../services/secciones"

import AlertModal from "../../../../../../../../components/AlertModal";
import { useAppContext } from "../../../../../../../../context/AppContext";
import SectionForm from "../../../../../../../../components/SectionForm";


import { useRouter } from 'next/navigation';
    

export default function Home(props) {
  const [data, setData] = useState({});
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [docentes, setDocentes] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [open, setOpen] = useState(false);
  const [clase, setClase] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [changing, setChanging] = useState(false);
  const { setTitle, setBanner, toastMessage, setSubtitle } = useAppContext();

/*   title={}
      titleHeader={`${Cod_Seccion} ${Cod_Carrera}-${Cod_Clase}`}
      subtitulo={`${Cod_Seccion} ${Cod_Carrera}-${Cod_Clase} ${clase}`} */

  useEffect(()=>{
    setBanner(false);
    setTitle(`${Cod_Seccion} ${Cod_Carrera}-${Cod_Clase}`);
    setSubtitle(`${Cod_Seccion} ${Cod_Carrera}-${Cod_Clase} ${clase}`);
  })

  const storedTerm = localStorage.getItem('selectedTerm');
  const { Cod_Facultad, Cod_Carrera, Cod_Clase, Cod_Seccion } = props.params;

  const [formData, setFormData] = useState({});
  const [diasSeleccionados, setDiasSeleccionados] = useState(data.Dias || '');
  

  const deleteAction = () => {
    DeleteSection(storedTerm, Cod_Carrera, Cod_Clase, Cod_Seccion).then( (response) => {
        if( response.status != 200 ){ 
            console.log(response.status)   
            toastMessage('warning', 'Error with API call server communication');   
            setChanging(false);            
            return;
        }else{
            /* sessionStorage.setItem('message', 'El elemento se ha eliminado con éxito.'); */
            toastMessage('success', 'Se ha eliminado con éxito'); 
            setTimeout(() => {
              router.back();
            }, 5000); 
        }
    });
}

const updateAction = () => {
  if(formData.Dias != null){
    UpdateSection(storedTerm, Cod_Carrera, Cod_Clase, Cod_Seccion, formData).then( (response) => {
      if( response.status != 200 ){   
          console.log(response.status)     
          toastMessage('warning','Error with API call server communication');
          setChanging(false);       
          return;
      }else{
        toastMessage('success', 'Se ha actualizado con éxito'); 
          console.log(response.status)
          setTimeout(() => {
            setSubtitle('');
            router.back();
          }, 5000); 
          return;
      }
      
  });
  } else{
    toastMessage('warning', 'Debes escoger al menos un dia');       
    return;
  }
  
}

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

const handleEdificioChange = (event) => {
  const selectedEdificio = event.target.value;
  setData(prevData => ({
    ...prevData,
    Cod_Edificio: selectedEdificio
  }));
};

const closeConfirmation = () => {
    setOpen(false);
}

const handleDeleteClick = (e) => {
    e.preventDefault();
    setOpen(true);
}

const handleUpdateClick = (e) => {
  setChanging(true);
  e.preventDefault();
  updateAction();
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
        setClase(seccion[0].Nombre_Clase);
        setFormData(seccion[0] || {});

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
  }, [Cod_Facultad, Cod_Carrera, Cod_Clase, Cod_Seccion, data.Nombre_Clase]);

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

  return (
    <>
      <AlertModal
      title="Borrar Sección"
        description="¿Está seguro que desea borrar esta sección?"
        deleteAction={deleteAction}
        open={open}
        closeConfirmation={closeConfirmation}
      />

      {!loading && (
        <SectionForm
          formData={formData}
          Cod_Carrera={Cod_Carrera}
          Cod_Clase={Cod_Clase}
          handleDeleteClick={handleDeleteClick}
          handleUpdateClick={handleUpdateClick}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleEdificioChange={handleEdificioChange}
          handleHoraChange={handleHoraChange}
          docentes={docentes}
          edificios={edificios}
          aulas={aulas}
          data={data}
          isCreating={isCreating}
          changing={changing}
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

    </>
  );
}
