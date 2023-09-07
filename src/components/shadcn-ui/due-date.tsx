"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Input } from "../ui/input";

export function DueDate({ date, setDate }: any) {
  const [openCalender, setOpenCalender] = useState(false);

  const handleOpenCalender = () => {
    if (openCalender) {
      setOpenCalender(!true);
    } else {
      setOpenCalender(true);
    }
  };

  return (
    <div className="relative w-full">
      <Input
        onClick={() => handleOpenCalender()}
        placeholder="select due date"
        onChange={() => {}}
        value={date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />
      {openCalender && (
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onDayClick={() => setOpenCalender(false)}
          className="rounded-md border absolute -left-[50px] top-12 shadow-lg bg-gray-950"
        />
      )}
    </div>
  );
}
