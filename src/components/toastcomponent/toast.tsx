
import { toast, ToastOptions } from 'react-hot-toast';

// Define a type for the function parameters
type ToastProps = {
  message: string; // The error message to display
  options?: ToastOptions; // Optional additional options for customization
  id?: string;
};

export const ErrorToast:React.FC<ToastProps> = ({message, options, id}) => {
  const defaultOptions = {
    id: id,
  }
  toast.error(message, options);
  return null;
};

export const SuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, options);
};
export const LoadingToast:React.FC<ToastProps> = ({message, options}) => {
  toast.loading(message, options);
  return null;
};