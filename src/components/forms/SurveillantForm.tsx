"use client";

import { useState } from "react";
import { subjectsData } from "../../lib/data"; // Import your data
import FormModal from "@/components/FormModal"; // Import FormModal if needed
import { role } from "@/lib/data"; // Import role if needed

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
  surveillant1id: number;
  surveillant2id: number;
};

const columns = [
  {
    header: "Exam ID",
    accessor: "exam_id",
  },
  {
    header: "Subject",
    accessor: "subject",
  },
  {
    header: "Dep. ID",
    accessor: "department_id",
  },
  {
    header: "Date",
    accessor: "exam_date",
  },
  {
    header: "Start Time",
    accessor: "start_time",
  },
  {
    header: "End Time",
    accessor: "end_time",
  },
  {
    header: "Duration",
    accessor: "duration",
  },
  {
    header: "Coefficient",
    accessor: "coefficient",
  },
  {
    header: "Salle",
    accessor: "salle",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

interface SurveillantFormProps {
  mode: "assign" | "view";
  surveillantId?: number; // Add surveillantId as an optional prop
}

const SurveillantForm = ({ mode, surveillantId }: SurveillantFormProps) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredExams = subjectsData.filter((exam) =>
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter exams for the specific surveillant in view mode
  const assignedExams = subjectsData.filter(
    (exam) =>
      surveillantId &&
      (exam.surveillant1id === surveillantId || exam.surveillant2id === surveillantId)
  );

  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam);
    setSearchTerm(exam.subject);
    setShowDropdown(false);
  };

  const renderRow = (item: Exam) => (
    <tr
      key={item.exam_id}
      className="border-2 border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-5 text-center">{item.exam_id}</td>
      <td className="text-center">{item.subject}</td>
      <td className="text-center">{item.department_id}</td>
      <td className="text-center">{item.exam_date}</td>
      <td className="text-center">{item.start_time}</td>
      <td className="text-center">{item.end_time}</td>
      <td className="text-center">{item.duration}</td>
      <td className="text-center">{item.coefficient}</td>
      <td className="text-center">{item.salle}</td>
      <td className="text-center">
        <div className="flex items-center justify-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="exam" type="delete" id={item.exam_id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  if (mode === "view") {
    return (
      <div className="bg-white p-2 rounded-md flex-1 m-4 mt-0 w-full max-w-screen-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Liste de surveillance des examens
        </h2>
        <br />
        <div className="overflow-x-auto max-h-96">
          {assignedExams.length === 0 ? (
            <p className="text-center p-4">Aucun examen assigné</p>
          ) : (
            <table className="w-full border border-gray-300 rounded-lg">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.accessor}
                      className="p-3 font-semibold text-center"
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assignedExams.map((item) => renderRow(item))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-screen-md mx-auto">
      {/* Exam Dropdown */}
      <div className="flex flex-col gap-2 w-full relative">
        <label className="font-medium text-sm text-gray-700">Exam</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="p-2 border rounded-md"
          placeholder="Search for an exam..."
          autoComplete="off"
        />
        {showDropdown && filteredExams.length > 0 && (
          <ul className="absolute z-10 left-0 top-full mt-1 w-full bg-white border rounded-md shadow-md max-h-40 overflow-y-auto">
            {filteredExams.map((exam) => (
              <li
                key={exam.exam_id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleExamSelect(exam)}
              >
                {exam.subject}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Locked Fields */}
      {selectedExam && (
        <>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">Salle</label>
            <input
              type="text"
              value={selectedExam.salle}
              readOnly
              className="p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">Date</label>
            <input
              type="text"
              value={selectedExam.exam_date}
              readOnly
              className="p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">Start Time</label>
            <input
              type="text"
              value={selectedExam.start_time}
              readOnly
              className="p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">End Time</label>
            <input
              type="text"
              value={selectedExam.end_time}
              readOnly
              className="p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm text-gray-900">Duration</label>
            <input
              type="text"
              value={selectedExam.duration}
              readOnly
              className="p-2 border rounded-md bg-gray-100"
            />
          </div>
        </>
      )}

      {/* Assign Button */}
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!selectedExam}
      >
        Assigner surveillant
      </button>
    </div>
  );
};

export default SurveillantForm;