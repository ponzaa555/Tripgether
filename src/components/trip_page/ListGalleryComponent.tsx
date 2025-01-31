import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/UI/accordion";
import GalleryContentComponent from "./GalleryContentComponent";
import { Album } from "@/src/models/components/Blog";

type ListGalleryComponentProps = {
  album: Album[] | undefined;
};

const ListGalleryComponent = ({ album }: ListGalleryComponentProps) => {
  return (
    <Accordion type="multiple" className="w-full">
      {album?.map((data, index) => (
        <AccordionItem value={index.toString()} key={index}>
          <AccordionTrigger className="text-lg font-black decoration-transparent w-full">
            <p>
              {data.name}{" "}
              <span className="text-sm text-slate-400">{data.describtion}</span>
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <GalleryContentComponent listUrl={data.listUrl} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ListGalleryComponent;
