import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/UI/accordion";
import GalleryContentComponent from "./GalleryContentComponent";

const ListGalleryComponent = () => {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg font-black decoration-transparent w-full">
          <p>{"Title of that Album"} </p>
        </AccordionTrigger>
        <AccordionContent>
          <GalleryContentComponent />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ListGalleryComponent;
