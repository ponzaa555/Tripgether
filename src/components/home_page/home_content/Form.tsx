// import Dropdown from "./Dropdown";
import { Button } from "@/components/UI/button";

type Props = {};

const Form = (props: Props) => {
  return (
    <ul className="flex items-center justify-around px-0 rounded-md bg-gray-100 bg-opacity-85 max-w-2xl w-full h-20">
      <li className="flex items-center justify-center relative px-8">
        <Button variant={"ghost"}>
          <p className="text-center m-0">Where to?</p>
        </Button>
        <span className="absolute -right-4 h-12 border-r-2 border-white"></span>
      </li>
      <li className="flex items-center justify-center relative">
        {/* <Dropdown /> */}
        <span className="absolute -right-4 h-12 border-r-2 border-white"></span>
      </li>
      <li>
        <Button>
          <p className="text-white text-center m-0">Register</p>
        </Button>
      </li>
      <li>
        <Button>
          <p className="text-white text-center m-0">Sign In</p>
        </Button>
      </li>
    </ul>
  );
};

export default Form;
