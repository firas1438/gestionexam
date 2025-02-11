"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useRef } from "react";
import InputField from "../InputField";
import { subjectsData } from "../../lib/data";

// Schema validation
const schema = z.object({
  subject: z.string().min(1, { message: "Subject is required!" }),
  exam_date: z.string().min(1, { message: "Exam date is required!" }),
  duration: z.string().min(1, { message: "Duration is required!" }),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: data?.subject || "",
      exam_date: data?.exam_date || "",
      duration: data?.duration || "",
    },
  });

  const [searchTerm, setSearchTerm] = useState(data?.subject || "");
  const [filteredSubjects, setFilteredSubjects] = useState(subjectsData);
  const [showDropdown, setShowDropdown] = useState(false);
  const [coefficient, setCoefficient] = useState(data?.coefficient || ""); // State for coefficient
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setFilteredSubjects(
      subjectsData
        .filter((subject) =>
          subject.subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.subject.localeCompare(b.subject)) // Sort alphabetically
    );
  }, [searchTerm]);

  // Watch the subject field to update the coefficient dynamically
  const selectedSubject = watch("subject");
  
  useEffect(() => {
    if (selectedSubject) {
      const selectedSubjectData = subjectsData.find(
        (subject) => subject.subject === selectedSubject
      );
      setCoefficient(selectedSubjectData?.coefficient || "");
    } else {
      setCoefficient(""); // Clear coefficient if no subject is selected
    }
  }, [selectedSubject]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8 p-3" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new exam" : "Update exam"}</h1>

      <div className="flex flex-col gap-4">
        {/* Subject and Coefficient Fields */}
        <div className="flex gap-4">
          {/* Searchable Subject Dropdown */}
          <div className="flex flex-col gap-2 relative flex-1" ref={dropdownRef}>
            <label htmlFor="subject" className="font-medium text-sm text-gray-700">
              Subject
            </label>
            <input
              type="text"
              {...register("subject")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="p-2 border rounded-md text-sm"
              placeholder="Search for a subject..."
              autoComplete="off"
            />
            {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}

            {/* Dropdown List */}
            {showDropdown && filteredSubjects.length > 0 && (
              <ul className="absolute z-10 left-0 top-full mt-1 w-full bg-white border rounded-md shadow-md max-h-40 overflow-y-auto">
                {filteredSubjects.map((exam) => (
                  <li
                    key={exam.exam_id}
                    className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
                    onClick={() => {
                      setSearchTerm(exam.subject);
                      setValue("subject", exam.subject);
                      setShowDropdown(false);
                    }}
                  >
                    {exam.subject}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Coefficient Field */}
          <div className="flex flex-col gap-2 w-1/4">
            <label htmlFor="coefficient" className="font-medium text-sm text-gray-700">
              Coefficient
            </label>
            <input
              type="text"
              value={coefficient}
              readOnly
              className="p-2 border rounded-md bg-gray-100 cursor-not-allowed text-sm"
            />
          </div>
        </div>

        {/* Exam Date Field */}
        <div className="flex flex-col">
          <label htmlFor="exam_date" className="font-medium text-sm text-gray-700">Exam Date</label>
          <InputField
            label=""
            name="exam_date"
            type="date"
            defaultValue={data?.exam_date}
            register={register}
            error={errors?.exam_date}
          />
          {errors?.exam_date && <span className="text-red-500">{errors.exam_date.message}</span>}
        </div>

        {/* Duration Dropdown */}
        <div className="flex flex-col gap-2">
          <label htmlFor="duration" className="font-medium text-sm text-gray-700">Duration</label>
          <select {...register("duration")} defaultValue={data?.duration || ""} className="p-2 border rounded-md text-sm">
            <option value="" disabled>
              Select duration
            </option>
            <option value="0.5h">0.5h</option>
            <option value="1h">1h</option>
            <option value="1.5h">1.5h</option>
            <option value="2h">2h</option>
          </select>
          {errors?.duration && <span className="text-red-500">{errors.duration.message}</span>}
        </div>
      </div>

      {/* Submit Button */}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ExamForm;