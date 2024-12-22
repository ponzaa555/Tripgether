import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/UI/dialog";

type Props = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyDialog = ({ isOpen, title, setIsOpen, children }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="self-center text-2xl font-medium">
            {title}
          </DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
