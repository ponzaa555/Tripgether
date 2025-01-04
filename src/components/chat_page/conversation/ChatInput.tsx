"use client";

import { Card } from "@/src/components/UI/card";
import { useConversation } from "@/src/hooks/useConversation";
import { useMutationState } from "@/src/hooks/useMutation";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/src/components/UI/form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/src/components/UI/Button";
import { SendHorizonal } from "lucide-react";
import { ChatInputProps } from "@/src/models/chat/conversation";

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field can't be emtpy",
  }),
});

const ChatInput = ({ userId }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { conversationId } = useConversation();

  const { mutate: createMessage, pending } = useMutationState(
    api.message.create
  );

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (value: z.infer<typeof chatMessageSchema>) => {
    await createMessage({
      currentUserId: userId,
      conversationId,
      type: "text",
      content: [value.content],
    })
      .then(() => {
        form.reset();
      })
      .catch((e) => {
        toast.error(
          e instanceof ConvexError ? e.data : "Unexpected error occured",
          {
            position: "bottom-right",
          }
        );
      });
  };

  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;

    if (selectionStart !== null) {
      form.setValue("content", value);
    }
  };
  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-2 items-end w-full"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <FormItem className="h-full w-full">
                    <FormControl>
                      <TextareaAutosize
                        onKeyDown={async (e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            await form.handleSubmit(handleSubmit)();
                          }
                        }}
                        placeholder="Type a message..."
                        rows={1}
                        maxRows={3}
                        {...field}
                        onChange={handleInputChange}
                        onClick={handleInputChange}
                        className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5 "
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <Button disabled={pending} size="icon" type="submit">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ChatInput;
