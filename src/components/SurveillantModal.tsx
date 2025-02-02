"use client";

import { useState } from "react";
import Image from "next/image";
import SurveillantForm from "./forms/SurveillantForm";

const SurveillantModal = ({
  table,
  type,
}: {
  table: string;
  type: "assign" | "view";
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        className={`w-8 h-8 flex items-center justify-center rounded-full relative group ${
          type === "assign" ? "bg-orange-200" : "bg-green-200"
        }`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={type === "assign" ? "/assign.png" : "/live.png"}
          alt={type === "assign" ? "Assign" : "View List"}
          width={18}
          height={18}
        />
        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {type === "assign" ? "Assigner surveillant" : "Consulter liste de surveillance"}
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          {/* Conditional width based on mode */}
          <div
            className={`bg-white p-4 rounded-md relative ${
              type === "assign"
                ? "w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]" // Old measurements for assign mode
                : "w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[75%] max-w-screen-2xl" // Wider for view mode
            }`}
          >
            <SurveillantForm mode={type} />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="Close" width={15} height={15} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SurveillantModal;