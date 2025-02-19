"use client";

import { useState } from 'react';
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, subjectsData } from "@/lib/data";
import Image from "next/image";

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
};

const columns = [
  { header: "Exam ID", accessor: "exam_id" },
  { header: "Matiere", accessor: "subject" },
  { header: "Dep. ID", accessor: "department_id" },
  { header: "Date", accessor: "exam_date" },
  { header: "Start Time", accessor: "start_time" },
  { header: "End Time", accessor: "end_time" },
  { header: "Duration", accessor: "duration" },
  { header: "Coeff.", accessor: "coefficient" },
  { header: "Salle", accessor: "salle" },
  { header: "Actions", accessor: "action" },
];

const ITEMS_PER_PAGE = 10;

const ExamListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(subjectsData.length / ITEMS_PER_PAGE);

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
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="exam" type="update" data={item} />
              <FormModal table="exam" type="delete" id={item.exam_id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // Calculate the data for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = subjectsData.slice(startIndex, endIndex);

  return (
    <div className="bg-white p-4 rounded-lg flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Tous les examens</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            <FormModal table="exam" type="create" />
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

export default ExamListPage;
