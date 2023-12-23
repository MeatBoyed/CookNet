"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { AccordionHeader } from "@radix-ui/react-accordion";

export default function Steps({
  steps,
  isCooking,
}: {
  steps: string[];
  isCooking?: boolean;
}) {
  const [expand, setExpand] = useState<boolean>(false);
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
      <Accordion
        type="multiple"
        value={expand ? steps : [steps[0]]}
        className="w-full"
      >
        {steps.map((step, index) => (
          <AccordionItem key={index} value={step}>
            <AccordionHeader className="flex justify-between items-center">
              <div>Step {index + 1}</div>
              <div className="flex justify-center items-center gap-5">
                {isCooking && <Checkbox />}
                <AccordionTrigger />
              </div>
            </AccordionHeader>
            <AccordionContent>{step}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
