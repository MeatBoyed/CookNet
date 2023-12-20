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

const steps = [
  "Cut the alien meat into thin patties and season them with salt, pepper, and alien spices.",
  "Heat a skillet over medium-high heat and cook the meat patties for,about 4 minutes per side, or until well done.",
  "Slice the alien cheese and place it on top of the meat patties in the last minute of cooking, so that it melts slightly.",
  "Toast the alien bread and spread some alien sauce on both sides.",
  "Wash and chop the alien lettuce, alien tomato, and alien onion.",
  "Place one slice of bread on a plate, then add a cheese-covered meat patty, then some alien lettuce, alien tomato, and alien onion.",
  "Repeat with another slice of bread and another cheese-covered meat patty, then top with the final slice of bread.",
  "Cut the burger in half and secure it with a toothpick if needed.",
  "Repeat with the remaining ingredients to make as many burgers as you want.",
  "Enjoy your alien cheese burger! 🍔",
];

export default function Steps({ isCooking }: { isCooking?: boolean }) {
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
        value={expand ? steps : [steps[0], steps[1]]}
        className="w-full"
      >
        {steps.map((step, index) => (
          <AccordionItem key={index} value={step}>
            <AccordionHeader className="flex justify-between items-center">
              <div>Step {index + 1}</div>
              {/* <AccordionTrigger>
              </AccordionTrigger> */}
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
