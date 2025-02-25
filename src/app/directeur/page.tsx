"use client";

import { useState } from "react";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { directeurData } from "@/lib/data";
import Image from "next/image";
import UserCard from "@/components/UserCard";
import DepartmentCard from "@/components/DepartmentCard";

type Exam = {
  exam_id: number;
  subject: string;
  department_id: number;
  exam_date: string;
  start_time: string;
  end_time: string;
  coefficient: number;
  duration: string;
  salle: string;
  surveillant: string;
};

const columns = [
  { header: "Exam ID", accessor: "exam_id" },
  { header: "Matiere", accessor: "subject" },
  { header: "Dep. ID", accessor: "department_id" },
  { header: "Date", accessor: "exam_date" },
  { header: "Start Time", accessor: "start_time" },
  { header: "End Time", accessor: "end_time" },
  { header: "Duration", accessor: "duration" },
  { header: "Coefficient", accessor: "coefficient" },
  { header: "Salle", accessor: "salle" },
  { header: "Surveillant", accessor: "surveillant" },
];

const renderRow = (item: Exam) => (
  <tr key={item.exam_id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
    <td className="p-5">{item.exam_id}</td>
    <td>{item.subject}</td>
    <td>{item.department_id}</td>
    <td>{item.exam_date}</td>
    <td>{item.start_time}</td>
    <td>{item.end_time}</td>
    <td>{item.duration}</td>
    <td>{item.coefficient}</td>
    <td>{item.salle}</td>
    <td>{item.surveillant}</td>
  </tr>
);

export default function DirecteurPage() {
  return (
    <div className="p-4 flex flex-col items-center w-full">
      {/* USER CARDS */}
      <div className="flex gap-4 justify-center flex-wrap w-full">
        <UserCard type="Directeur des étude" count="Imed ABBASI" />
        <UserCard type="Enseignant" count={128} />
        <UserCard type="Etudiant" count={1375} />
        <UserCard type="Département" count={3} />
        <UserCard type="Examen" count={251} />
      </div>

      {/* TABLE */}
      <div className="mt-16 w-full">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">
            Les examens de toutes les départements:
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/filter.png" alt="Filter" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/sort.png" alt="Sort" width={14} height={14} />
              </button>
            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="mt-5 w-full overflow-auto max-h-[500px]">
          <Table columns={columns} renderRow={renderRow} data={directeurData} />
        </div>

      </div>

      {/* DEP CARDS */}
      <div className="flex flex-wrap justify-center gap-5 w-full mt-10">
        <DepartmentCard imageSrc="/logo.png" title="Tous les départements" />
        <DepartmentCard
          imageSrc="/lap.png"
          title="Département Informatique"
          statusText="Status de validation:"
          statusIcon="/validated.png"
        />
        <DepartmentCard
          imageSrc="/math.png"
          title="Département Mathématiques"
          statusText="Status de validation:"
          statusIcon="/notvalidated.png"
        />
        <DepartmentCard
          imageSrc="/elec.png"
          title="Département Electrique"
          statusText="Status de validation:"
          statusIcon="/notvalidated.png"
          imageClassName="absolute w-40 h-40 mb-14 -right-16 -bottom-16"
        />
      </div>

      {/* BUTTON TEXT */}
      <div className="text-center text-sm text-gray-700 mt-10">
        <p>
          Après avoir vérifié les plannings de votre département, vous devrez
          cliquer sur le bouton <strong>Valider</strong>.
        </p>
        <p>
          Notez bien que la validation{" "}
          <em>
            ne peut pas avoir lieu sans la validation des autres "chefs de
            départements"
          </em>
          .
        </p>
        <p>* Cette action est irréversible *</p>
      </div>

      {/* VALIDER BUTTON */}
      <div className="w-full mt-8 mb-4">
        <button
          type="button"
          className="w-full bg-[#1c933b] text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-[#41c237] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled
        >
          Valider toutes les entrées
        </button>
      </div>
    </div>
  );
}
