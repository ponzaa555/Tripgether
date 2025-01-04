export type MyDialogProps = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
