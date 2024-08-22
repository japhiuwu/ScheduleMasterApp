import { useState } from "react";
import {  useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const none = () => {}

export default function Home({
    formData, data, Cod_Carrera, Cod_Clase, 
    handleDeleteClick = none, handleUpdateClick = none, handleCreateClick = none,
    handleInputChange = none, handleCheckboxChange = none, handleHoraChange = none,
    handleEdificioChange, changing,
    docentes, edificios, aulas,
    isCreating, aulaLoading,
    files = [],
    UpdateFiles = none
}){
    const onDrop = useCallback((acceptedFiles) => {
        UpdateFiles(acceptedFiles);
    }, [UpdateFiles]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
    <form className="mb">
    <div className="grid gap-6 mb-6 md:grid-cols-2">
    <div>
        <label
        htmlFor="Cod_Seccion"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Sección
        </label>
        <input
        type="number"
        id="Cod_Seccion"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={formData.Cod_Seccion}
        required
        disabled
        />
    </div>
    <div>
        <label
        htmlFor="Cod_Clase"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Código de la Clase
        </label>
        <input
        type="text"
        id="Cod_Clase"
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
        id="Num_Empleado"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleInputChange}
    >
        {isCreating && (
            <option
                value={'-1'}
                key={'-1'}
                selected
                >
                {'Selecciona un Docente'}
            </option> )}
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
        htmlFor="Cod_Edificio"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Edificio
        </label>
        <select
        id="Cod_Edificio"
        onChange={handleEdificioChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            {
                isCreating && (
                    <option
                        value={'-1'}
                        key={'-1'}
                        selected
                        >
                        {'Selecciona un Edificio'}
                    </option>
                )
            }
        {edificios.map((edificio) => (
            <option
            value={edificio.Cod_Edificio}
            key={edificio.Cod_Edificio}
            selected={edificio.Cod_Edificio === data.Cod_Edificio && !isCreating}
            >
            {edificio.Nombre}
            </option>
        ))}
        </select>
    </div>
    <div>
        <label
        htmlFor="Num_Aula"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Aula
        </label>
        <select
        id="Num_Aula"
        onChange={handleInputChange}
        disabled={aulaLoading}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
        {
            isCreating && (
                <option
                    value={'-1'}
                    key={'-1'}
                    selected
                    >
                    {'Selecciona un Aula'}
                </option>
            )
        }
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
        htmlFor="Hora_Inicial"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Hora Inicial
        </label>
        <input
        type="time"
        id="Hora_Inicial"
        onChange={handleHoraChange}
        min="7:00"
        max="20:00"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"              
        value={formData.Hora_Inicial}
        required
        />
    </div>
    <div>
        <label
        htmlFor="Hora_Final"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Hora Final
        </label>
        <input
        type="time"
        id="Hora_Final"
        onChange={handleHoraChange}
        min="8:00"
        max="21:00"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"              
        value={formData.Hora_Final}
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
                /* onChange={handleCheckboxChange} */
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
                /* onChange={handleCheckboxChange} */
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
                /* onChange={handleCheckboxChange} */
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
                /* onChange={handleCheckboxChange} */
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
                /* onChange={handleCheckboxChange} */
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
                /* onChange={handleCheckboxChange} */
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
                /* onChange={handleCheckboxChange} */
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
    <div className="mb-6 flex flex-col">
        <div>
            <label
            htmlFor="Cupos"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            Cupos
            </label>
            <input
            type="number"
            id="Cupos"
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"              
            value={formData.Cupos}
            required
            />
        </div>
        <div>
            { !isCreating && (<>
                <label
                    htmlFor="files"
                    className="block mt-6 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Portada
                </label>
                <div {...getRootProps()} className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-center">
                    <input {...getInputProps()} />
                    <p className="text-sm text-gray-600">Drag & drop some files here, or click to select files</p>
                </div>
                <div className="mt-2">
                    {files.map((file) => (
                        <p key={file.path} className="text-sm text-gray-600">
                        {file.path} - {file.size} bytes
                        </p>
                    ))}
                </div>
            </>)}
        </div>
    </div>
    </div>
    {!isCreating && (
    <div>
        <button
                type="button"
                onClick={handleDeleteClick}
                disabled={changing}
                className="text-white mb-6 mr-2 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                {changing ? "Enviando..." : "Eliminar"}
            </button>
        <button
        type="submit"
        onClick={handleUpdateClick}
        disabled={changing}
        className="text-white mb-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
        {changing ? "Enviando..." : "Editar"}
        </button>
    </div>
    )}
    {isCreating && (
    <div>          
        <button
        type="submit"
        disabled={!isCreating || changing}
        onClick={handleCreateClick}
        className="text-white mb-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
        {changing ? "Enviando..." : "Crear Sección"}
        </button>
    </div>
    )}
    </form>
);
}