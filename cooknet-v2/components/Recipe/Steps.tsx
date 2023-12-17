"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";

export default function Steps() {
  return (
    <section className="flex flex-col justify-center items-start gap-3 w-full">
      <Separator />
      <p className="text-base font-semibold tracking-widest">Instructions</p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Step 1</AccordionTrigger>
          <AccordionContent>
            Cut the alien meat into thin patties and season them with salt,
            pepper, and alien spices.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Step 2</AccordionTrigger>
          <AccordionContent>
            Heat a skillet over medium-high heat and cook the meat patties for
            about 4 minutes per side, or until well done.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Step 3</AccordionTrigger>
          <AccordionContent>
            Slice the alien cheese and place it on top of the meat patties in
            the last minute of cooking, so that it melts slightly.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Step 4</AccordionTrigger>
          <AccordionContent>
            Toast the alien bread and spread some alien sauce on both sides.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Step 5</AccordionTrigger>
          <AccordionContent>
            Wash and chop the alien lettuce, alien tomato, and alien onion.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Step 6</AccordionTrigger>
          <AccordionContent>
            Place one slice of bread on a plate, then add a cheese-covered meat
            patty, then some alien lettuce, alien tomato, and alien onion.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>Step 7</AccordionTrigger>
          <AccordionContent>
            Repeat with another slice of bread and another cheese-covered meat
            patty, then top with the final slice of bread.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>Step 8</AccordionTrigger>
          <AccordionContent>
            Cut the burger in half and secure it with a toothpick if needed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>Step 9</AccordionTrigger>
          <AccordionContent>
            Repeat with the remaining ingredients to make as many burgers as you
            want.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger>Step 10</AccordionTrigger>
          <AccordionContent>
            Enjoy your alien cheese burger! 🍔
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
