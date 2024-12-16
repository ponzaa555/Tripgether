import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  return (
    <div className="flex flex-col h-screen items-center justify-center pt-10 px-10">
      <h1 className="text-xl font-extrabold self-start py-4">
        Account settings
      </h1>
      <div className="w-full h-[100vh] flex flex-col p-4 border-2 border-gray-300 rounded-lg">
        <h2 className="font-extrabold">Profile</h2>
        <Avatar className="">
          <AvatarImage src="" />
          <AvatarFallback>111</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
