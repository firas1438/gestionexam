"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import ExamForm from "./forms/ExamForm";
import RoomReservationForm from "./forms/RoomReservationForm";
import SurveillantForm from "./forms/SurveillantForm";

// Define all possible types for all forms
type FormType = "create" | "update" | "delete" | "reserve" | "view" | "assign";

// Define the forms object
const forms: {
  [key: string]: (type: FormType, data?: any, id?: number) => JSX.Element;
} = {
  exam: (type, data, id) => {
    if (type === "create" || type === "update") {
      return <ExamForm type={type} data={data} id={id} />;
    }
    return <span className="text-red-500">Invalid type for ExamForm!</span>;
  },

  salle: (type, data, id) => {
    if (type === "reserve" || type === "view") {
      return <RoomReservationForm type={type} data={data} id={id} />;
    }
    return <span className="text-red-500">Invalid type for RoomReservationForm!</span>;
  },

  surveillant: (type, data, id) => {
    if (type === "assign" || type === "view") {
      return <SurveillantForm type={type} data={data} id={id} />;
    }
    return <span className="text-red-500">Invalid type for SurveillantForm!</span>;
  },
};

const FormModal = ({ table, type, data, id }: {
  table: "exam" | "salle" | "surveillant";
  type: FormType;
  data?: any;
  id?: number;
}) => {
  const size = "w-8 h-8";
  const bgColor = type === "create" ? "bg-lamaYellow" :
    type === "update" ? "bg-purple-300" :
    type === "delete" ? "bg-red-400" :
    type === "reserve" ? "bg-blue-200" :
    type === "view" ? "bg-green-200" :
    type === "assign" ? "bg-orange-200" : "";

  const [open, setOpen] = useState(false);

  const Form = () => {
    // DELETE LOGIC
    if (type === "delete" && id) {
      return (
        <form action="" className="flex flex-col gap-4 p-3">
          <h1 className="text-xl font-semibold text-center">Supprimer examen</h1>
          <span className="text-center font-medium">
            Toutes les données seront perdues. Êtes-vous sûr?
          </span>
          <button className="bg-red-700 text-white mt-2 py-2 px-20 rounded-md border-none w-max self-center">
            Supprimer
          </button>
        </form>
      );
    }

    // Render the appropriate form based on the table and type
    if (forms[table]) {
      return forms[table](type, data, id);
    }

    // If no form is found
    return <span className="text-red-500">Form not found!</span>;
  };

  return (
    <>
      <div className="relative group">
        {/* Button/icon */}
        <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`} onClick={() => setOpen(true)}>
          <Image src={`/${type}.png`} alt="{type}" width={18} height={18} />
        </button>

        {/* Tooltip */}
        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {type === "update" ? "Modifier" :
          type === "delete" ? "Supprimer" :
          type === "create" ? "Créer" :
          type === "reserve" ? "Réserver" :
          type === "view" ? "Consulter" :
          type === "assign" ? "Assigner" : ""}
        </span>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          {/* Conditional width based on type */}
          <div className={`bg-white p-4 rounded-md relative ${
            type === "view" ? "w-[80%] lg:w-[70%] xl:w-[60%]" : "w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"
          }`}>
            <Form />
            {/* Close button */}
            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
              <Image src="/close.png" alt="Close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;