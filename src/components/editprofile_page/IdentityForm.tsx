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
import { updateProfileData } from "@/src/lib/frontend/http";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/UI/select";
import { IdentityFormProps } from "@/src/models/user/profile";

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
  birthDate: z.date().optional(),
  aboutMe: z.string().optional(),
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const startYear = 1900;
const endYear = new Date().getFullYear();
const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
  return startYear + i;
});

const IdentityForm = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  birthDate,
  aboutMe,
}: IdentityFormProps) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      email: email,
      phoneNumber: phoneNumber ?? "",
      birthDate: birthDate ? new Date(birthDate) : undefined,
      aboutMe: aboutMe ?? "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    const res = await updateProfileData(values);
    if (res) {
      toast.success("Profile updated successfully.");
      setSubmitting(false);
      router.back();
    } else {
      toast.error("Failed to update profile. Please try again later.");
      setSubmitting(false);
    }
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
          name="birthDate"
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
                  <div className="flex flex-row justify-between gap-2 p-2">
                    <Select
                      onValueChange={(value) => {
                        const date = new Date(field.value ?? new Date());
                        date.setMonth(months.indexOf(value));
                        field.onChange(date);
                      }}
                      value={months[field.value?.getMonth() ?? 0]}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, index) => (
                          <SelectItem key={index} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(value) => {
                        const date = new Date(field.value ?? new Date());
                        date.setFullYear(parseInt(value));
                        field.onChange(date);
                      }}
                      value={
                        field.value ? field.value.getFullYear().toString() : ""
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Years" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year, index) => (
                          <SelectItem key={index} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    onMonthChange={(month) => {
                      const date = new Date(field.value ?? new Date());
                      date.setMonth(month.getMonth());
                      field.onChange(date);
                    }}
                    initialFocus
                    month={field.value ?? new Date()}
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
          name="aboutMe"
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
          <Button type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update"}
          </Button>
          <Button
            type="button"
            disabled={submitting}
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
