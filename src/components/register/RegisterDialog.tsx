"use client";
import MyDialog from "@/components/ui/MyDialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { MailIcon } from "lucide-react";
import { PasswordInput } from "@/components/ui/password_input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "@/components/toastcomponent/toast";
import {
  toastErrorOptions,
  toastLoadingOptions,
  toastSuccessOptions,
} from "@/components/toastcomponent/toastOpteions";
import { useModal } from "@/context/ModalContext";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Password and confirm password must match",
      path: ["confirmPassword"],
    }
  );

const RegisterDialog = ({ isOpen, setIsOpen }: Props) => {
  const { openLoginModal } = useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastid = LoadingToast({
      message: "Registering...",
      options: toastLoadingOptions,
    });
    const result = await fetch("/api/auth/Myauth/Register", {
      method: "POST",
      body: JSON.stringify(values),
    });

    toast.dismiss(toastid as string);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    var resultBody = await result.json();
    if (result.status != 201) {
      ErrorToast({
        message: resultBody.message as string,
        options: toastErrorOptions,
        id: toastid as string,
      });
    } else {
      SuccessToast("Register Success", toastSuccessOptions);
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <MyDialog isOpen={isOpen} title="สมัครสมาชิก" setIsOpen={setIsOpen}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="my-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      className="focus-visible:ring-0 focus:border-orange-400"
                      {...field}
                      suffix={<MailIcon color="gray" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="focus-visible:ring-0 focus:border-orange-400"
                      {...field}
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormDescription>
                    Password must be at least 6 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-5">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="focus-visible:ring-0 focus:border-orange-400"
                      {...field}
                      placeholder="Confirm password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="flex justify-center items-center text-sm text-gray-400">
            Already have an account?
            <span>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setIsOpen(false);
                  openLoginModal();
                }}
              >
                Login
              </Button>
            </span>
          </p>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </MyDialog>
  );
};

export default RegisterDialog;
