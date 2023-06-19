"use client";
import { getServerSession } from "next-auth/next";

import * as Dialog from "@radix-ui/react-dialog";
import { signIn } from "next-auth/react";
import { X } from "lucide-react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";

const LoginModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-white mt-4 py-4 shadow-blackA7 hover:bg-green-800 inline-flex h-[35px] items-center justify-center rounded-md bg-green-600 px-8 font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Get Started
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur-lg data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-black m-0 text-[17px] font-medium">
            Sign In
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Choose an authentication way you prefer.
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <button
              className="w-full rounded-md bg-green-500 hover:bg-green-600 text-white p-2 mb-4"
              onClick={() => signIn("google")}
            >
              Gontinue with Google
            </button>
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <button
              className="w-full rounded-md bg-black hover:bg-neutral-800 text-white p-2 mb-4"
              onClick={() => signIn("github")}
            >
              Jump into using GitHub
            </button>
          </fieldset>

          <form method="post" action="/api/auth/checkEmail">
            <fieldset className="mb-[15px] flex items-center gap-5">
              {/* <input name="csrfToken" type="hidden" defaultValue={null} /> */}
              <label>
                Email address
                <br />
                <input
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="rounded-md border-gray-300 p-2 w-full mb-4"
                />
              </label>
            </fieldset>

            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Continue with Email
                </button>
              </Dialog.Close>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-black hover:bg-neutral-200 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoginModal;
