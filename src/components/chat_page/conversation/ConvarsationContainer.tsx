import { Card } from "@/src/components/ui/card";

type Props = React.PropsWithChildren<{}>;

const ConvarsationContainer = ({ children }: Props) => {
  return (
    <Card className="w-full h-[cal(100svh-32px)] lg:h-full p-2 flex flex-col gap-2">
      {children}
    </Card>
  );
};

export default ConvarsationContainer;
