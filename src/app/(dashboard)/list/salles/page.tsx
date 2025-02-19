"use client"; // Mark this component as a Client Component

import { useState } from "react";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData, role } from "@/lib/data";
import Image from "next/image";

const mockData = [
  {
    examen: "Mathématiques ",
    duration: "2h",
    date: "2023-10-15",
    debut: "09:00",
    fin: "11:00",
  },
  {
    examen: "Physique",
    duration: "1.5h",
    date: "2023-10-16",
    debut: "10:00",
    fin: "12:00",
  },
  {
    examen: "Chimie",
    duration: "1h",
    date: "2023-10-17",
    debut: "08:00",
    fin: "10:00",
  },

];

type Class = {
  id: number;
  name: string;
  location: string;
  capacity: number;
  disponibility: string;
};

const columns = [
  { header: "Room ID", accessor: "id" },
  { header: "Room Name", accessor: "name" },
  { header: "Location", accessor: "location", className: "hidden md:table-cell" },
  { header: "Capacity", accessor: "capacity", className: "hidden md:table-cell" },
  { header: "Disponibility", accessor: "disponibility", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const ITEMS_PER_PAGE = 10;

const ClassListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(classesData.length / ITEMS_PER_PAGE);

  const renderRow = (item: Class) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-5">{item.id}</td>
      <td>{item.name}</td>
      <td className="hidden md:table-cell">{item.location}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.disponibility}</td>
      <td>
        <div className="flex items-center gap-2">
            <>
              <FormModal table="salle" type="reserve" />
              <FormModal table="salle" type="view" data={mockData} />
            </>
        </div>
      </td>
    </tr>
  );

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = classesData.slice(startIndex, endIndex);

  return (
    <div className="bg-white p-5 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Réservations des salles</h1>
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
      <div className="mt-9">
      <Table columns={columns} renderRow={renderRow} data={currentData} />
      </div>

      {/* PAGINATION */}
      <Pagination totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ClassListPage;
