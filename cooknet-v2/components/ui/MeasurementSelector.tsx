"use client";
import { measurements } from "@/lib/utils";
import { useState } from "react";

export default function MeasurementSelector() {
  const [type, setType] = useState<string>("");
  return (
    <select
      onChange={(e) => setType(e.target.value)}
      className="w-full h-10 rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
    >
      <option value="" className="font-semibold tracking-widest ">
        Measurements
      </option>
      {measurements.dry.map((option, index) => (
        <option className="text-sm" key={index} value={option}>
          {option}
        </option>
      ))}
      {measurements.volume.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
      {measurements.weight.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
