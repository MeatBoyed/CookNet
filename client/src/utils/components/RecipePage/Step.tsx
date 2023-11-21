"use client";
import { useEffect, useState } from "react";

export const StepsRenderer = ({ steps }: { steps: string[] }) => {
  const [expandAll, setExpandAll] = useState<boolean>(false);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-black">Instructions</p>
        <button
          className="border border-black px-2 py-1"
          onClick={() => setExpandAll(!expandAll)}
        >
          <p className="text-sm font-normal leading-normal text-black">
            {expandAll ? "Collapse All" : "Expand All"}
          </p>
        </button>
      </div>
      {steps.map((step, index) => (
        <Step
          stepNo={index + 1}
          content={step}
          key={index}
          openStep={expandAll}
        />
      ))}
    </div>
  );
};

const Step = ({
  stepNo,
  content,
  openStep,
}: {
  stepNo: number;
  content: string;
  openStep: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(openStep);

  useEffect(() => {
    setIsOpen(openStep);
  }, [openStep]);

  return (
    <div className="border-b border-black">
      <div
        className="flex cursor-pointer items-center justify-between py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-base font-semibold">Step {stepNo}</h2>
        <svg
          className={`h-6 w-6 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div className="p-4">
          <p className="font-base text-gray-900">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Step;
