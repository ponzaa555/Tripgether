"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/UI/form";
import { Input } from "@/src/components/UI/input";
import { Calendar } from "@/src/components/UI/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/UI/popover";
import { Button } from "@/src/components/UI/Button";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/src/components/UI/textarea";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "This field can't be empty.",
  }),
  lastName: z.string().min(1, {
    message: "This field can't be empty.",
  }),
  email: z.string().email().min(1, {
    message: "This field can't be empty.",
  }),
  phoneNumber: z.string().length(10, {
    message: "This field must be 10 characters long.",
  }),
  dateOfBirth: z.date().optional(),
  bio: z.string().optional(),
});

type IdentityFormProps = {};

const IdentityForm = ({}: IdentityFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "test@gmail.com",
      phoneNumber: "",
      dateOfBirth: undefined,
      bio: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/getUserData"); // Replace with your API endpoint
        const data = response.data.profileInfo;
        console.log({data:data})

        // Update form values with fetched data
        form.reset({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          dateOfBirth: data.birthDate ? new Date(data.birthDate) : undefined,
          bio: data.aboutMe || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await axios.post("/api/getUserData",values);
  };

  return (
    <Form {...form}>
      <form className="gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                First name<span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="First name"
                  className="focus-visible:ring-0 focus:border-orange-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Last name<span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Last name"
                  className="focus-visible:ring-0 focus:border-orange-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email<span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="focus-visible:ring-0 focus:border-orange-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone number<span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Phone number"
                  className="focus-visible:ring-0 focus:border-orange-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2 gap-2">
              <FormLabel>Birth date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="mt-11 text-xl font-extrabold">About me</h2>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none w-full h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-5">
          <Button type="submit">Update profile</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default IdentityForm;
