"use client";
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState();
  const [password, setPassword] = useState();
  const [cpsw, setCpsw] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const formHandler = (e) => {
    e.preventDefault();
    if (cpsw === password) {
      if (password.length >= 8) {
        axios
          .post("/api/auth/reset/update", { token, password })
          .then((res) => {
            toast.success("Password changed");
            setLoading(false);
            router.push("/pages/public/auth/login");
          })
          .catch(console.log("server experienced error"));
      } else {
        toast.error(
          `Password must be atleast 8 characters long you have only ${password.length}`
        );
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  useEffect(() => {
    const path = window.location.href.split("=");
    setToken(path[1]);
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .post("/api/auth/reset/valid", { token })
        .then((res) => {
          setVerified(true);
          setInterval(() => {
            setLoading(false);
          }, 3000);
        })
        .catch((err) => {
          setVerified(false);
          console.log(err);
          setInterval(() => {
            setLoading(false);
          }, 3000);
        });
    }
  });

  if (loading) {
    return (
      <>
        <section className="flex flex-col h-[60vh] justify-center items-center">
          <p className="text-2xl text-center pt-4 font-bold">
            Please Wait while we bring you your results <br />
          </p>
          <p className="p-4 text-center text-black text-opacity-40">
            Your reset password link has expiry of 24 hours.
          </p>
        </section>
      </>
    );
  } else {
    if (verified) {
      return (
        <>
          <section className="mt-20">
            <div className="title text-secondary text-center p-4 text-[30px]">
              Reset Password
            </div>

            <form
              className="relative max-w-xl  mx-auto  flex flex-col p-5 mt-4 gap-5 "
              onSubmit={formHandler}
            >
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
                autoComplete="of"
                required
              />
              <input
                id="email"
                type="password"
                placeholder="confirm Password"
                autoComplete="of"
                onChange={(e) => {
                  setCpsw(e.target.value);
                }}
                required
              />

              <div className="cmd flex flex-col items-center gap-4">
                <button className="bg-primary text-white w-full rounded-md">
                  Reset
                </button>
              </div>
            </form>
          </section>
        </>
      );
    } else {
      return (
        <section className="flex flex-col h-[60vh] justify-center items-center">
          <p className="text-2xl text-center pt-4 font-bold">
            INVALID: TOKEN ERROR (Invalid Entery) NOT FOUND <br />
          </p>
        </section>
      );
    }
  }
};

export default page;
