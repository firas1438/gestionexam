"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

// Define the schema for the form
const schema = z.object({
  examen: z.string().min(1, { message: "Examen est requis!" }), // User must choose a examen
  duration: z.string().min(1, { message: "Durée est requis!" }), // User must choose a duration
  date: z.string().min(1, { message: "Date est requis!" }), // User must pick a date
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({type,data,id}: {
  type: "create" | "update";
  data?: any;
  id?: number;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>

      {/* CREATE FORM */}
      {type === "create" && (
        <form className="flex flex-col gap-8 p-3" onSubmit={onSubmit}>
          {/* TITRE */}
          <h1 className="text-xl font-semibold text-center">Créer un nouveau examen</h1>

          {/* CONTENU */}
          <div className="flex justify-between flex-wrap gap-4">

            <div className="flex gap-4 w-full">

              {/* Matière Field (Dropdown list) */}
              <div className="flex flex-col gap-2 w-3/4">
                <label className="text-xs text-gray-500">Examen</label>
                <select
                  {...register("examen")} // Register the examen field
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                >
                  <option value="">Sélectionnez un examen</option>
                  {/* Backend engineer (Lbaby) will populate options here */}
                </select>
                {errors.examen && (
                  <span className="text-red-500 text-xs">{errors.examen.message}</span>
                )}
              </div>

                {/* Coefficient Field */}
                <div className="flex flex-col gap-2 w-1/4">
                  <label className="text-xs text-gray-500">Coefficient</label>
                  <input
                    type="number"
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>

            </div>

            {/* Durée Field (Dropdown) */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs text-gray-500">Durée</label>
              <select
                {...register("duration")} // Register the duration field
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              >
                <option value="">Sélectionnez une durée</option>
                <option value="1">1h</option>
                <option value="1.5">1.5h</option>
                <option value="2">2h</option>
              </select>
              {errors.duration && (
                <span className="text-red-500 text-xs">{errors.duration.message}</span>
              )}
            </div>


            {/* Date Field */}
            <InputField
              label="Date"
              name="date"
              type="date"
              register={register}
              error={errors?.date}
            />
          </div>

          {/* BUTTON CREER */}
          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400 transition-colors">
            Créer
          </button>
        </form>
      )}
      

      {/* UPDATE FORM */}
      {type === "update" && (
        <form className="flex flex-col gap-8 p-3" onSubmit={onSubmit}>
          {/* TITRE */}
          <h1 className="text-xl font-semibold text-center">Modifier un examen</h1>

          {/* CONTENU */}
          <div className="flex justify-between flex-wrap gap-4">
            {/* Matière and Coefficient Fields */}
            <div className="flex gap-4 w-full">
              {/* Matière Field (Locked Text Field) */}
              <div className="flex flex-col gap-2 w-3/4">
                <label className="text-xs text-gray-500">Examen</label>
                <input
                  type="text"
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>

              {/* Coefficient Field (Locked) */}
              <div className="flex flex-col gap-2 w-1/4">
                <label className="text-xs text-gray-500">Coefficient</label>
                <input
                  type="number"
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            {/* Durée Field (Locked Text Field) */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs text-gray-500">Durée</label>
              <input
                type="text"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Date Field */}
            <InputField
              label="Date"
              name="date"
              type="date"
              register={register}
              error={errors?.date}
            />

          </div>

          <button className="bg-blue-500 text-white text-base p-2 rounded-md hover:bg-blue-400 transition-colors">
            Modifier
          </button>
        </form>
      )}

    </>
  );
};

export default ExamForm;