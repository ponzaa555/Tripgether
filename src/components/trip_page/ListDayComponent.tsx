import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/UI/accordion";
import ListPlaceComponent from "./ListPlaceComponent";

const ListDayComponent = () => {
  return (
    <div>
      <Image
        src="/logo.png"
        alt={"logo"}
        width={500}
        height={500}
        className="w-28 h-full"
      />
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-black decoration-transparent w-full">
            <p>
              Day {1}{" "}
              <span className="text-slate-400 text-sm">(25 Aug 2023)</span>
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <ListPlaceComponent />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-black decoration-transparent w-full">
            <p>
              Day {1}{" "}
              <span className="text-slate-400 text-sm">(25 Aug 2023)</span>
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <ListPlaceComponent />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ListDayComponent;
