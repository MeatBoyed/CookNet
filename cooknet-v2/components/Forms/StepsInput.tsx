import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";

export default function StepsInput() {
  return (
    <section className="flex flex-col justify-center items-start gap-3 w-full">
      <Separator />
      <p className="text-base font-semibold tracking-widest">Instructions</p>
      <Accordion
        type="multiple"
        defaultValue={["item-1", "item-2"]}
        className="w-full"
      >
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
      </Accordion>
    </section>
  );
}
