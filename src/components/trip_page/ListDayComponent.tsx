import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/UI/accordion";
import ListPlaceComponent from "@/src/components/trip_page/ListPlaceComponent";
import { DayTrips } from "@/src/models/components/Blog";

type Props = {
  listDate: DayTrips[];
};

const ListDayComponent = ({ listDate }: Props) => {
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
        {listDate.map((data, index) => (
          <AccordionItem value={data.day} key={index}>
            <AccordionTrigger className="text-lg font-black decoration-transparent w-full">
              <p>
                {data.day}
                {" - "}
                <span className="text-slate-400 text-sm">({data.date})</span>
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <ListPlaceComponent
                listDestination={data.ListDestination}
                title={data.title}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ListDayComponent;
