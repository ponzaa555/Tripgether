import { Card } from "@/components/ui/card";

const ConvarsationFallback = () => {
  return (
    <Card className="hidden lg:flex h-full w-full p-2 items-center justify-center bg-secondary text-secondary-foreground">
      Select/start a conversation to get started!
    </Card>
  );
};

export default ConvarsationFallback;
