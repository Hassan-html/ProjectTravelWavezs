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
  const [mail, setMail] = useState("");
  const [err, setErr] = useState();
  const [findUser, setFindUser] = useState(true);

  const navigate = useRouter();

  const formHandler = async (e) => {
    e.preventDefault();
    setFindUser(false);
    axios
      .post("/api/auth/reset", { email: mail })
      .then((res) => {
        console.log(res);
        setFindUser(true);
        navigate.push("/pages/public/auth/login");
        toast.success("Email sent successfully");
      })
      .catch((err) => {
        console.log(err);
        setFindUser(true);
      });
  };
  return (
    <>
      <section className="mt-20">
        <div className="title text-secondary text-center p-4 text-[30px]">
          Enter Your email we will send you link on it
        </div>

        <form
          className="relative max-w-xl  mx-auto  flex flex-col p-5 mt-4 gap-5 "
          onSubmit={formHandler}
        >
          {!findUser && (
            <div className="overlay top-0 left-0 absolute w-full h-full z-[100] ">
              <ComponentSpinner />
            </div>
          )}

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="of"
            onChange={(e) => {
              setMail(e.target.value);
            }}
            required
          />

          <div className="cmd flex flex-col items-center gap-4">
            <button className="bg-primary text-white w-full rounded-md">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
