import { useForm } from "react-hook-form";
import { UserSignUpSchemaType } from "@/schemas/user-signup-schema";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { ApiResponse } from "@/types/api-responses";
import Head from "next/head";
import { cn } from "@/lib/utils";

export default function SignUpPage(): JSX.Element {
  const router = useRouter();
  const { toast } = useToast();
  type FormData = {
    userName: string;
    userPwd: string;
    userConfirmPwd: string;
    userEmail: string;
    userEcommerceId: string;
  };

  const {
    formState: { isSubmitSuccessful, isSubmitting, errors },
    register,
    reset,
    getValues,
    handleSubmit,
  } = useForm<FormData>();
  //imported schema from zod resolves to-->
  // type FormData = {
  //   userName: string;
  //   userPwd: string;
  //   userConfirmPwd: string;
  //   userEmail: string;
  // };

  async function onSubmit(data: UserSignUpSchemaType) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: data.userName,
        userEmail: data.userEmail,
        userPwd: data.userPwd,
        userEcommerceId: data.userEcommerceId,
      }),
    });
    const ans: ApiResponse = await response.json();

    if (ans.status === "success") {
      reset();
      toast({
        title: "Sign Up Successful!",
        description:
          "You have been successfully signed up. You will be shortly taken to the login page...",
      });
      setTimeout(() => {
        router.push("/auth/login");
      }, 4000);
    } else if (ans.status === "error") {
      toast({
        variant: "destructive",
        title: "Sign Up failed!",
        description:
          ans.message ||
          "Something went wrong. Please check everything carefully and try again",
      });
    }
  }

  return (
    <>
      <Head>
        <title>weBank sign up page</title>
      </Head>

      <form
        className="flex flex-col mt-8 mx-auto p-4 w-[400px] md:w-[600px] lg:w-[600px] sm:p-8 h-2/3 justify-between border-2 border-red-50 rounded-md shadow-md shadow-slate-600"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="mt-2 mb-4 text-slate-500 font-bold text-3xl">
          Sign Up here
        </h1>
        <p className="text-red-500 mb-4">
          You must be a member of
          <span className="font-bold text-slate-500 mx-2 transition-all hover:border-slate-500 hover:border-b-2 hover:p-1">
            <a href="we-buy-omega.vercel.app" target="_blank">
              weBuy
            </a>
          </span>
          before you can use weBank
        </p>
        <label className="form-label" htmlFor="userName">
          Your name*
        </label>
        <p className="text-red-700">{errors.userName?.message}</p>
        <input
          className={cn("form-input", "rounded-xl")}
          {...register("userName", {
            required: { value: true, message: "Your name is required" },
            minLength: {
              value: 5,
              message: "Your name cant must be at least 5 characters",
            },
          })}
          id="userName"
          type="text"
        />
        <label className="form-label" htmlFor="userEmail">
          Your email*
        </label>
        <p className="text-red-700">{errors.userEmail?.message}</p>
        <input
          className={cn("form-input", "rounded-xl")}
          {...register("userEmail", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email",
            },
          })}
          type="email"
          id="userEmail"
        />
        <label className="form-label" htmlFor="userEcommerceId">
          Your we Buy ecommerce Id*
        </label>
        <p className="text-red-700">{errors.userEcommerceId?.message}</p>
        <input
          className={cn("form-input", "rounded-xl")}
          {...register("userEcommerceId", {
            required: {
              value: true,
              message: "We buy member id is required",
            },
          })}
          type="text"
          id="userEcommerceId"
        />
        <label className="form-label" htmlFor="userPwd">
          Choose a password*
        </label>
        <p className="text-red-700">{errors.userPwd?.message}</p>
        <input
          className={cn("form-input", "rounded-xl")}
          {...register("userPwd", {
            required: {
              value: true,
              message: "Please enter your password",
            },
            minLength: {
              value: 5,
              message: "Password must be greater than 5 characters",
            },
          })}
          id="userPwd"
          type="text"
        />
        <label className="form-label" htmlFor="userConfirmPwd">
          Confirm your password*
        </label>
        <p className="text-red-700">{errors.userConfirmPwd?.message}</p>
        <input
          className={cn("form-input", "rounded-xl")}
          {...register("userConfirmPwd", {
            required: {
              value: true,
              message: "Please match your passwords",
            },
            validate: (fieldValue) => {
              if (getValues("userPwd") === fieldValue) {
                return true;
              }
              return "Passwords must match";
            },
          })}
          id="userConfirmPwd"
          type="text"
        />
        <button className="btn2 disabled:bg-gray-500" disabled={isSubmitting}>
          Sign Up
        </button>
      </form>
      <Toaster />
    </>
  );
}
