"use client"; // Mark this component as a Client Component

import { useState } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import FormModal from "@/components/FormModal";

const mockData = [
  {
    examen: "Programmation Mobile",
    salle: "A33",
    duration: "2h",
    date: "2023-10-15",
    debut: "09:00",
    fin: "11:00",
  },
  {
    examen: "Java 2 ",
    salle: "A32",
    duration: "1.5h",
    date: "2023-10-16",
    debut: "10:00",
    fin: "12:00",
  },
  {
    examen: "Anglais",
    salle: "A31",
    duration: "1h",
    date: "2023-10-17",
    debut: "08:00",
    fin: "10:00",
  },
  {
    examen: "Java 2 ",
    salle: "A32",
    duration: "1.5h",
    date: "2023-10-16",
    debut: "10:00",
    fin: "12:00",
  },
  {
    examen: "Anglais",
    salle: "A31",
    duration: "1h",
    date: "2023-10-17",
    debut: "08:00",
    fin: "10:00",
  },  {
    examen: "Java 2 ",
    salle: "A32",
    duration: "1.5h",
    date: "2023-10-16",
    debut: "10:00",
    fin: "12:00",
  },
  {
    examen: "Anglais",
    salle: "A31",
    duration: "1h",
    date: "2023-10-17",
    debut: "08:00",
    fin: "10:00",
  },  {
    examen: "Java 2 ",
    salle: "A32",
    duration: "1.5h",
    date: "2023-10-16",
    debut: "10:00",
    fin: "12:00",
  },
  {
    examen: "Anglais",
    salle: "A31",
    duration: "1h",
    date: "2023-10-17",
    debut: "08:00",
    fin: "10:00",
  },  {
    examen: "Java 2 ",
    salle: "A32",
    duration: "1.5h",
    date: "2023-10-16",
    debut: "10:00",
    fin: "12:00",
  },
  {
    examen: "Anglais",
    salle: "A31",
    duration: "1h",
    date: "2023-10-17",
    debut: "08:00",
    fin: "10:00",
  },
];

type Teacher = {
  id: number;
  teacherId: string; // Surveillant ID
  name: string;
  email?: string;
  photo: string;
  phone: string; // Number
  departmentId: string; // Department ID
};

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Surveillant ID", accessor: "teacherId", className: "hidden md:table-cell" },
  { header: "Number", accessor: "phone", className: "hidden md:table-cell" },
  { header: "Department ID", accessor: "departmentId", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const ITEMS_PER_PAGE = 10;

const TeacherListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(teachersData.length / ITEMS_PER_PAGE);

  const renderRow = (item: Teacher) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-3">
        <Image src="/pfp.jpg" alt="Profile" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.departmentId}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="surveillant" type="assign" />
              <FormModal table="surveillant" type="view" data={mockData} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = teachersData.slice(startIndex, endIndex);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Tous les surveillants</h1>
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

export default TeacherListPage;
