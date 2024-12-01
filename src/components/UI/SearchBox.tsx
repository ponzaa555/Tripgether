import { IoIosSearch } from "react-icons/io";

type Props = {};

const SearchBox = (props: Props) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-2 shadow-sm w-full">
      <div className="flex items-center w-full">
        <IoIosSearch size={30} />
        <input
          type="text"
          placeholder="Search place"
          className="text-gray-700 placeholder-gray-400 border-none w-full focus:border-none focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
};

export default SearchBox;
