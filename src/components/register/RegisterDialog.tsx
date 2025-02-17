"use client";
import MyDialog from "@/src/components/UI/MyDialog";
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
} from "@/src/components/UI/form";
import { Input } from "@/src/components/UI/input";
import { useEffect } from "react";
import { MailIcon } from "lucide-react";
import { PasswordInput } from "@/src/components/UI/password_input";
import { Button } from "@/src/components/UI/Button";
import { useModal } from "@/src/context/ModalContext";
import { toast } from "sonner";
import { RegisterDialogProps } from "@/src/models/components/registerDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

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

const RegisterDialog = ({ isOpen, setIsOpen }: RegisterDialogProps) => {
  const createUser = useMutation(api.user.createOrUpdateUser);
  const { openLoginModal } = useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // email: string;
  // password: string | null;
  // id: string;
  // name: string | null;
  // createdAt: Date;
  // image: string | null;
  // emailVerified: JsonValue | null;
  // updatedAt: Date;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await fetch("/api/auth/Myauth/Register", {
      method: "POST",
      body: JSON.stringify(values),
    });

    var resultBody = await result.json();
    if (result.status != 201) {
      toast.error(resultBody.message as string);
    } else {
      await createUser({
        userId: resultBody.id,
        username: resultBody.name ?? "Unknown",
        imageUrl:
          resultBody.imageUrl ??
          "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg",
        email: resultBody.email,
      });
      toast.success("Register Success");
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
