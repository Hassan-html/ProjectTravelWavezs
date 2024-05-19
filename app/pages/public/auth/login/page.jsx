"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FileInput, Toast } from "flowbite-react";
import ComponentSpinner from "@/app/components/spinnerPage/componentSpinner";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  const [success, setSuccess] = useState("");
  const [userLogged, setUserLogged] = useState(true);

  const navigate = useRouter();

  const formHandler = async (e) => {
    e.preventDefault();
    setUserLogged(false);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result.error) {
        console.log(result.error);
        toast.error(result.error);
        setUserLogged(true);
      } else {
        navigate.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="mt-20">
        <div className="title text-secondary text-center p-4 text-[30px]">
          Login
        </div>

        <form
          className="relative max-w-xl  mx-auto  flex flex-col p-5 mt-4 gap-5 "
          onSubmit={formHandler}
        >
          {!userLogged && (
            <div className="overlay top-0 left-0 absolute w-full h-full z-[100] ">
              <ComponentSpinner />
            </div>
          )}

          <input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="of"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            autoComplete="of"
            required
          />

          <div className="cmd flex flex-col items-center gap-4">
            <button className="bg-primary text-white w-full rounded-md">
              Login
            </button>
            <div className="txt">
              <Link
                href="/pages/public/auth/resetPass/Account"
                className=" text-primary "
              >
                Forgot password ?
              </Link>
            </div>

            <div className="txt">
              or if you Dont have an account{" "}
              <Link
                href="/pages/auth/register"
                className=" underline text-special"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
