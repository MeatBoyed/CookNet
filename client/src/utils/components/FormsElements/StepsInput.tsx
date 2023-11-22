"use client";
import { type Dispatch, type SetStateAction, useState } from "react";
import TextField from "~/utils/components/FormsElements/TextField";
import StepCard from "~/utils/components/RecipePage/StepCard";
import { type RecipeFormData } from "../Forms/CreateRecipeForm";
import Step from "../RecipePage/Step";
import { TiDeleteOutline } from "react-icons/ti";

type props = {
  steps: string[];
  setFormData: Dispatch<SetStateAction<RecipeFormData>>;
};

export default function StepsInput({ steps, setFormData }: props) {
  const [stepInput, setStepInput] = useState<string>("");
  const [expandAll, setExpandAll] = useState<boolean>(true);

  const removeStep = (step: string) => {
    const newStpes = steps.filter((stp) => stp != step);
    setFormData((prev) => ({
      ...prev,
      steps: newStpes,
    }));
  };

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
        <div key={index} className="flex w-full flex-col ">
          <Step
            stepNo={index + 1}
            content={step}
            key={index}
            openStep={expandAll}
            removeStep={removeStep}
          />
        </div>
      ))}
      <div className="border-b border-black">
        <div className="flex cursor-pointer items-center justify-between py-2">
          <p className="text-base font-semibold">Step {steps.length + 1}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 p-4">
          <TextField
            onChange={(newValue) => setStepInput(newValue)}
            size="Default"
            type="text"
            placeholder="Add A Step"
            value={stepInput}
          />
          <button
            onClick={() => {
              steps.push(stepInput);
              setFormData((prev) => ({ ...prev, steps: steps }));
              setStepInput("");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-black bg-black py-2 text-sm font-normal leading-normal text-white"
          >
            Add Step
          </button>
        </div>
      </div>
    </div>
  );
}
