"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Table from "../Table"; // Import the Table component
import { useEffect } from "react";

const schema = z.object({
  examen: z.string().min(1, { message: "Examen est requis!" }),
  date: z.string(),
  debut: z.string().min(1, { message: "Temps du début d'examen est requis!" }),
  fin: z.string(),
  duration: z.string(),
  coefficient: z.number(),
});

type Inputs = z.infer<typeof schema>;


const RoomReservationForm = ({ type, data, id, handleClose }: {
  type: "reserve" | "view";
  data?: any;
  id?: number;
  handleClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });


  {/*CALCUL AUTOMATIQUE DE CHAMP "FIN" QUAND "DEBUT" CHANGE */}
  const debut = watch("debut");
  const duration = watch("duration");

  useEffect(() => {
      if (debut && duration) {
        const finTime = calculateFinTime(debut, duration);
        setValue("fin", finTime);
      }
  }, [debut, duration, setValue]);

  // Méthode pour calculer le temps du "fin" d'examen
  const calculateFinTime = (debut: string, duration: string): string => {
      // Extract the numeric value from the duration string (e.g., "1h" -> 1, "1.5h" -> 1.5)
      const durationValue = parseFloat(duration.slice(0, -1));
    
      // Convert the duration to minutes
      const durationInMinutes = durationValue * 60;
    
      // Split the debut time into hours and minutes
      const [debutHours, debutMinutes] = debut.split(':').map(Number);
    
      // Convert the debut time to total minutes since midnight
      const debutInMinutes = debutHours * 60 + debutMinutes;
    
      // Calculate the fin time in total minutes since midnight
      const finInMinutes = debutInMinutes + durationInMinutes;
    
      // Convert the fin time back to HH:MM format
      const finHours = Math.floor(finInMinutes / 60) % 24; // Ensure it wraps around if necessary
      const finMinutes = finInMinutes % 60;
    
      // Format the fin time to always show two digits for hours and minutes
      const formattedFinHours = String(finHours).padStart(2, '0');
      const formattedFinMinutes = String(finMinutes).padStart(2, '0');
    
      return `${formattedFinHours}:${formattedFinMinutes}`;
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    handleClose();
  });

  {/* COLONNES POUR LA LISTE DES RESERVATIONS DES SALLES */}
  const columns = [
    { header: "Examen", accessor: "examen", className: "text-center" },
    { header: "Date", accessor: "date", className: "text-center" },
    { header: "Durée", accessor: "duration", className: "text-center" },
    { header: "Début", accessor: "debut", className: "text-center" },
    { header: "Fin", accessor: "fin", className: "text-center" },
  ];


  return (
    <>

      {/* RESERVE FORM */}
      {type === "reserve" && (
        <form className="flex flex-col gap-8 p-3" onSubmit={onSubmit}>
          <h1 className="text-lg font-semibold text-center">Réserver une salle</h1>

          <div className="flex justify-between flex-wrap gap-4">
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-3/4">
                <label className="text-xs text-gray-500">Examen</label>
                <select
                  {...register("examen")}
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                >
                  <option value="">Sélectionnez un examen</option>
                </select>
                {errors.examen && (
                  <span className="text-red-500 text-xs">{errors.examen.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2 w-1/4">
                <label className="text-xs text-gray-500">Coefficient</label>
                <input
                  {...register("coefficient", { valueAsNumber: true })}
                  type="number"
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs text-gray-500">Date</label>
              <input
                {...register("date")}
                type="date"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs text-gray-500">Durée</label>
              <input
                {...register("duration")}
                type="text"
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-xs text-gray-500">Début</label>
                <input
                  {...register("debut")}
                  type="time"
                  step="1800"  // 30-minute steps
                  min="08:00"  // Earliest time
                  max="15:00"  // Latest time
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                />
                {errors.debut && (
                  <span className="text-red-500 text-xs">{errors.debut.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-xs text-gray-500">Fin</label>
                <input
                  {...register("fin")}
                  type="time"
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>
          </div>

          <button className="bg-blue-500 text-white text-base p-2 rounded-md hover:bg-blue-400 transition-colors">
            Réserver
          </button>
        </form>
      )}

      {/* VIEW FORM */}
      {type === "view" && (
        <div className="flex flex-col gap-4 mt-3">
          <h1 className="text-lg font-semibold text-center mb-2">Liste des réservations du salle</h1>

          <div className="overflow-y-auto max-h-[420px] border border-gray-300 rounded-lg ">
            <Table
              columns={columns}
              data={data}
              renderRow={(item) => (
                <tr
                  key={item.examen}
                  className="border-b border-gray-200 odd:bg-slate-50 text-sm hover:bg-lamaPurpleLight text-center"
                >
                  <td className="p-4">{item.examen}</td>
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">{item.duration}</td>
                  <td className="p-4">{item.debut}</td>
                  <td className="p-4">{item.fin}</td>
                </tr>
              )}
            />
          </div>
        </div>
      )}

    </>
  );
};

export default RoomReservationForm;