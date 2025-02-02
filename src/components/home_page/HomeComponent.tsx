"use client";
import { api } from "@/convex/_generated/api";
import HomeContent from "@/src/components/home_page/home_content/HomeContent";
import Welcome from "@/src/components/home_page/welcome_content/Welcome";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import ShowRecommandComponent from "./blog_content/ShowRecommandComponent";
import { Button } from "@/src/components/UI/Button";
import { MdOutlineExplore } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

type HomeComponentProps = {
  session: Session | null;
};

const HomeComponent = ({ session }: HomeComponentProps) => {
  const router = useRouter();
  const createUser = useMutation(api.user.createOrUpdateUser);
  useEffect(() => {
    const createUserIfAuthenticated = async () => {
      if (session) {
        try {
          if (!session.user.id) {
            console.error("User id not found in session:", session.user);
            return;
          }
          await createUser({
            userId: session.user.id,
            username: session.user.name ?? "Unknown",
            imageUrl:
              session.user.image ??
              "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg",
            email: session.user.email ?? "Unknown",
          });
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    };

    createUserIfAuthenticated();
  }, [createUser, session]);

  return (
    <div className="pt-14">
      <HomeContent />
      <div className="flex flex-col gap-4 h-full w-screen bg-white">
        <Welcome />
        <div className="flex flex-col gap-7 pt-5">
          <h3 className="flex self-center text-orange-500">TRIP</h3>
          <h3 className="flex self-center text-2xl sm:text-3xl md:text-4xl font-black">
            Enjoy The Moment
          </h3>
          <ShowRecommandComponent />
          <Button
            className="w-min px-10 py-5 text-xl font-black self-center mb-14"
            onClick={() => router.push("/trip")}
          >
            <MdOutlineExplore />
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
