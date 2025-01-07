import { Loader2 } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <Loader2 className="w-16 h-16 animate-spin text-orange-400" />
      <h2 className="animate-pulse">Please wait...</h2>
    </div>
  );
};

export default LoadingComponent;
