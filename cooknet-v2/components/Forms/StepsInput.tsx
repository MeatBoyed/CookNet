"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface props {
  errorMessage?: string;
  steps: string[];
  setSteps: Dispatch<SetStateAction<string[]>>;
}

export default function StepsInput({ errorMessage, steps, setSteps }: props) {
  const [step, setStep] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  return (
    <section className="flex flex-col justify-center items-start gap-3 w-full">
      <Separator />
      <div className="flex justify-between items-center w-full">
        <p className="text-base font-semibold tracking-widest">Instructions</p>
        <Button
          size={"sm"}
          variant={expand ? "outline" : "default"}
          onClick={() => setExpand(!expand)}
        >
          Expand All
        </Button>
      </div>
      <p className="text-destructive text-sm">{errorMessage && errorMessage}</p>
      <Accordion
        type="multiple"
        value={expand ? steps : [steps[0], steps[1]]}
        className="w-full"
      >
        {steps.map((step, index) => {
          if (step !== "input") {
            return (
              <AccordionItem key={index} value={step}>
                <AccordionTrigger>Step {index}</AccordionTrigger>
                <AccordionContent>{step}</AccordionContent>
              </AccordionItem>
            );
          }
        })}
        <AccordionItem value="input">
          <AccordionTrigger>Step {steps.length}</AccordionTrigger>
          <AccordionContent className="flex flex-col justify-center items-center gap-5">
            <Textarea
              name="step"
              required
              onChange={(e) => setStep(e.target.value)}
              placeholder="Get choppin!"
              className="h-32"
            />
            <p>{error && "Enter A Step"}</p>

            <Button
              className="w-full"
              onClick={() => {
                setError(false);
                if (step !== "") return setSteps((prev) => [...prev, step]);
                setError(true);
              }}
            >
              Add
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
