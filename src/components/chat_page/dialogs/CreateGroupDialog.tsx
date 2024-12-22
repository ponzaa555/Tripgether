import { useQuery } from "convex/react";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/src/hooks/useMutation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/UI/dialog";
import { TooltipContent, TooltipTrigger } from "@/src/components/UI/tooltip";
import { Button } from "@/src/components/UI/Button";
import { Tooltip } from "@radix-ui/react-tooltip";
import { CirclePlus, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/UI/form";
import { Input } from "@/src/components/UI/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/UI/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/UI/avatar";
import { Card } from "@/src/components/UI/card";

type Props = {};

const createGroupFormSchema = z.object({
  name: z.string().min(1, { message: "This field can't be empthy" }),
  members: z
    .string()
    .array()
    .min(1, { message: "You must select at least 1 friend" }),
});

const CreateGroupDialog = (props: Props) => {
  const { data: session } = useSession();
  const friends = useQuery(api.friends.get, {
    currentUserId: session?.user?.id!,
  });
  const { mutate: createGroup, pending } = useMutationState(
    api.conversation.createGroup
  );

  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = form.watch("members", []);

  const unselectedFriends = useMemo(() => {
    return friends
      ? friends.filter((friend) => !members.includes(friend._id))
      : [];
  }, [friends, members]);

  const handleSubmit = async (
    values: z.infer<typeof createGroupFormSchema>
  ) => {
    await createGroup({
      name: values.name,
      members: values.members,
      currentUserId: session?.user?.id!,
    })
      .then(() => {
        form.reset();
        toast.success("Group created!");
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError ? error.data : "An error occurred"
        );
      });
  };
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" asChild>
            <DialogTrigger>
              <CirclePlus />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create Group</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="block">
        <DialogHeader>
          <DialogTitle>Create group</DialogTitle>
          <DialogDescription>
            Add your friends to get started!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Group name ..." {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="members"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>Friends</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          disabled={unselectedFriends.length === 0}
                        >
                          <Button className="w-full" variant="outline">
                            Select
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          {unselectedFriends.map((friend) => {
                            return (
                              <DropdownMenuCheckboxItem
                                key={friend._id}
                                className="flex items-center gap-2 w-full p-2"
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    form.setValue("members", [
                                      ...members,
                                      friend._id,
                                    ]);
                                  }
                                }}
                              >
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={friend.imageUrl} />
                                  <AvatarFallback>
                                    {friend.username.substring(0, 1)}
                                  </AvatarFallback>
                                </Avatar>
                                <h4 className="truncate">{friend.username}</h4>
                              </DropdownMenuCheckboxItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                );
              }}
            />{" "}
            {members && members.length ? (
              <Card className="flex items-center gap-3 overflow-x-auto w-full h-24 p-2 no-scrollbar">
                {friends
                  ?.filter((friend) => members.includes(friend._id))
                  .map((friend) => {
                    return (
                      <div
                        key={friend._id}
                        className="flex flex-col items-center gap-1"
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={friend.imageUrl} />
                            <AvatarFallback>
                              {friend.username.substring(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <X
                            className="text-muted-foreground w-4 h-4 absolute bottom-8 left-7 bg-muted rounded-full cursor-pointer"
                            onClick={() =>
                              form.setValue(
                                "members",
                                members.filter((id) => id !== friend._id)
                              )
                            }
                          />
                        </div>
                        <p className="truncate text-sm">
                          {friend.username.split(" ")[0]}
                        </p>
                      </div>
                    );
                  })}
              </Card>
            ) : null}
            <DialogFooter>
              <Button disabled={pending} type="submit" className="w-full">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
