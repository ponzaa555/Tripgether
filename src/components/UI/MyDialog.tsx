import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/UI/dialog";
import { MyDialogProps } from "@/src/models/components/myDialog";

const MyDialog = ({ isOpen, title, setIsOpen, children }: MyDialogProps) => {
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
