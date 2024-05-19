"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ComponentSpinner from "@/app/components/spinnerPage/componentSpinner";
export default function Register() {
  const router = useRouter();
  const [body, setBody] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [userCreated, setUserCreated] = useState(true);

  const formHandler = (e) => {
    e.preventDefault();
    setUserCreated(false);

    axios
      .post("/api/auth/register", JSON.stringify(body))
      .then((res) => {
        console.log(res);
        setErr("");
        setSuccess(res.data.message);
        toast.success(res.data.message);
        setInterval(() => {
          router.push("/pages/public/auth/login");
          setUserCreated(true);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        const error = err.response.data.message;
        toast.error(error);
        setErr(error);
        setUserCreated(true);
        setSuccess("");
      });
  };
  useEffect(() => {
    if (err || success) {
      setInterval(() => {
        setErr("");
        setSuccess("");
      }, 5000);
    }
  }, []);

  return (
    <section className="relative mt-20">
      {!userCreated && (
        <div className="overlay top-0 left-0 absolute w-full h-full z-[100] ">
          <ComponentSpinner />
        </div>
      )}

      <div className="title text-secondary text-center p-4 text-[30px]">
        Register
      </div>

      <form
        className="max-w-xl  mx-auto  flex flex-col p-5 mt-4 gap-10 "
        onSubmit={formHandler}
      >
        <div className="flex flex-col lg:grid grid-cols-2 lg:gap-1 gap-10">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setBody({ ...body, FirstName: e.target.value });
            }}
            autoComplete="of"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            autoComplete="of"
            onChange={(e) => {
              setBody({ ...body, LastName: e.target.value });
            }}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          autoComplete="of"
          onChange={(e) => {
            setBody({ ...body, email: e.target.value });
          }}
          required
        />
        <input
          type="password"
          placeholder="password"
          autoComplete="of"
          onChange={(e) => {
            setBody({ ...body, password: e.target.value });
          }}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          required
          autoComplete="of"
          onChange={(e) => {
            setBody({ ...body, password_confirmation: e.target.value });
          }}
        />
        <div className="cmd flex flex-col items-center gap-2">
          <button className="bg-primary text-white w-full rounded-md">
            Register Account
          </button>

          <div className="txt">
            or if you already have account{" "}
            <Link href="/pages/auth/login" className=" underline text-special">
              Sign-In
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
