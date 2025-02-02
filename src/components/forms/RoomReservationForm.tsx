"use client";

import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect, useRef } from "react";
import { subjectsData } from "../../lib/data";

const schema = z.object({
  subject: z.string().min(1, { message: "Subject is required!" }),
  coefficient: z.string(),
  date: z.string(),
  start_time: z.string().min(1, { message: "Start time is required!" }),
  end_time: z.string(),
  duration: z.string(), 
});

type Inputs = z.infer<typeof schema>;

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
  {header: "Exam ID",accessor: "exam_id",},
  {header: "Subject",accessor: "subject",},
  {header: "Dep. ID",accessor: "department_id",},
  {header: "Date",accessor: "exam_date",},
  {header: "Start Time",accessor: "start_time",},
  {header: "End Time",accessor: "end_time",},
  {header: "Duration", accessor: "duration",},
  {header: "Coefficient",accessor: "coefficient",},
  {header: "Salle",accessor: "salle",},
  {header: "Actions",accessor: "action",},
];

type RoomReservationFormProps = {
  mode: "reserve" | "view"; // add the mode prop to decide which content to show
  roomId?: number;
};


const RoomReservationForm = ({ mode, roomId }: RoomReservationFormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      coefficient: "",
      date: "",
      start_time: "",
      end_time: "",
      duration: "",
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState(subjectsData);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [assignedExams, setAssignedExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


// Fetch exams from backend API
useEffect(() => {
  const fetchExams = async () => {
    if (mode === "view" && roomId) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/exams?roomId=${roomId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exams");
        }

        const data = await response.json();
        setAssignedExams(data);
      } catch (err) {
        setError("Failed to load reservation list");
      } finally {
        setIsLoading(false);
      }
    }
  };

  fetchExams();
}, [mode, roomId]);



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setFilteredSubjects(
      subjectsData.filter((subject) =>
        subject.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleSubjectSelect = (subject: any) => {
    setSearchTerm(subject.subject);
    setValue("subject", subject.subject);
    setValue("coefficient", String(subject.coefficient)); 
    setValue("date", subject.exam_date);
    setValue("duration", subject.duration); 
    setShowDropdown(false);
  };

  const calculateEndTime = (startTime: string) => {
    const selectedSubject = subjectsData.find((sub) => sub.subject === searchTerm);
    if (!selectedSubject) return "";

    const [hours, minutes] = startTime.split(":").map(Number);
    const duration = parseFloat(selectedSubject.duration);
    const durationHours = Math.floor(duration);
    const durationMinutes = (duration % 1) * 60;

    let endHours = hours + durationHours;
    let endMinutes = minutes + durationMinutes;

    if (endMinutes >= 60) {
      endHours += Math.floor(endMinutes / 60);
      endMinutes = endMinutes % 60;
    }

    return `${String(endHours).padStart(2, "0")}:${String(Math.round(endMinutes)).padStart(2, "0")}`;
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });


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
          Liste de réservations du salle
        </h2>
        <br />
        <div className="overflow-x-auto max-h-96">
          {isLoading ? (
            <p className="text-center p-4">Loading exams...</p>
          ) : error ? (
            <p className="text-center text-red-500 p-4">{error}</p>
          ) : assignedExams.length === 0 ? (
            <p className="text-center p-4">Aucun examen réservé à cette salle</p>
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
    <form className="flex flex-col gap-8 p-3" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Exam Room Reservation</h1>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-full relative" ref={dropdownRef}>
            <label className="font-medium text-sm text-gray-700">Subject</label>
            <input
              type="text"
              {...register("subject")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="p-2 border rounded-md"
              placeholder="Search for a subject..."
              autoComplete="off"
            />
            {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
            {showDropdown && filteredSubjects.length > 0 && (
              <ul className="absolute z-10 left-0 top-full mt-1 w-full bg-white border rounded-md shadow-md max-h-40 overflow-y-auto">
                {filteredSubjects.map((exam) => (
                  <li
                    key={exam.exam_id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSubjectSelect(exam)}
                  >
                    {exam.subject}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col gap-2 w-1/4">
            <label className="font-medium text-sm text-gray-700">Coefficient</label>
            <input
              type="text"
              {...register("coefficient")}
              readOnly
              className="p-2 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
            />
            {errors.coefficient && <span className="text-red-500">{errors.coefficient.message}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Date</label>
          <input
            type="text"
            {...register("date")}
            readOnly
            className="p-2 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
          />
          {errors.date && <span className="text-red-500">{errors.date.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Duration</label>
          <input
            type="text"
            {...register("duration")}
            readOnly
            className="p-2 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
          />
          {errors.duration && <span className="text-red-500">{errors.duration.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Start Time</label>
          <input
            type="time"
            {...register("start_time")}
            onChange={(e) => setValue("end_time", calculateEndTime(e.target.value))}
            className="p-2 border rounded-md"
          />
          {errors.start_time && <span className="text-red-500">{errors.start_time.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">End Time</label>
          <input
            type="text"
            {...register("end_time")}
            readOnly
            className="p-2 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
          />
          {errors.end_time && <span className="text-red-500">{errors.end_time.message}</span>}
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">Réserver</button>
    </form>
  );
};

export default RoomReservationForm;
