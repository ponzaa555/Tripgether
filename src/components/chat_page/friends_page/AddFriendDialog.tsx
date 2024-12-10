"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutationState } from "@/hooks/useMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";
import { useSession } from "next-auth/react";
import { ConvexError } from "convex/values";

const addFriendFormSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

const AddFriendDialog = () => {
  const { data: session, status } = useSession();
  const { mutate: createRequest, pending } = useMutationState(
    api.request.create
  );

  const form = useForm<z.infer<typeof addFriendFormSchema>>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
    try {
      const data = await fetch("/api/emailCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });
      const user = await data.json();
      console.log(user);
      await createRequest({
        receiverId: user.user.id,
        senderId: session?.user!.email!,
      })
        .then(() => {
          form.reset();
          toast.success("Friend request sent!");
        })
        .catch((e) => {
          toast.error(
            e instanceof ConvexError ? e.data : "Unexpected error occurred"
          );
        });
    } catch (e) {
      toast.error("User not found");
    }
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <UserPlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Friend</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add friend</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Send a request to connect with your friend!
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {/* {isLoading ? ( */}
              {/* <Button disabled>
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button> */}
              {/* ) : ( */}
              <Button type="submit">Send</Button>
              {/* )} */}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
