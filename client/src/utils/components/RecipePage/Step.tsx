"use client";
import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { CheckBox } from "../FormsElements/Checkbox";

export const StepsRenderer = ({
  steps,
  isCooking,
  expand,
}: {
  steps: string[];
  isCooking?: boolean;
  expand?: boolean;
}) => {
  const [expandAll, setExpandAll] = useState<boolean>(expand ?? false);
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
          isCooking={isCooking}
        />
      ))}
    </div>
  );
};

const Step = ({
  stepNo,
  content,
  openStep,
  removeStep,
  isCooking,
}: {
  stepNo: number;
  content: string;
  openStep: boolean;
  removeStep?: (step: string) => void;
  isCooking?: boolean;
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
        <p className="text-base font-semibold">Step {stepNo}</p>
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
        <div className="flex items-center justify-between p-2">
          <p className="font-base text-gray-900">{content}</p>
          {removeStep && (
            <TiDeleteOutline size={30} onClick={() => removeStep(content)} />
          )}
          {isCooking && <CheckBox />}
        </div>
      )}
    </div>
  );
};

export default Step;
