"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
const page = () => {
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const path = window.location.href.split("=");
    setToken(path[1]);
  }, []);
  useEffect(() => {
    if (token) {
      axios
        .post("/api/auth/verify", { token })
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
            login with your register account for new verification Link in case
            previous link is expired!
          </p>
        </section>
      </>
    );
  } else {
    if (verified) {
      return (
        <>
          <section className="flex flex-col h-[60vh] justify-center items-center">
            <motion.div
              className="w-[200px] h-[200px] rounded-full bg-secondary overflow-hidden flex  justify-center items-center relative"
              animate={{
                scale: [0, 0.3, 0.3, 1],
                y: [200, 0],
                opacity: [0, 1, 1],
              }}
              transition={{ duration: 1, delay: 2 }}
            >
              <motion.div className="h-[15%] w-[10px] rounded-full bg-white rotate-[-30deg] translate-x-[-18px] translate-y-[10px]"></motion.div>
              <motion.div className="h-[40%] w-[10px] rounded-full bg-white rotate-[60deg] translate-x-[10px]"></motion.div>
              <motion.div
                className="w-[100px] right-[39px] bottom-[80px] rotate-[148deg] h-[100px]  absolute bg-secondary "
                animate={{ y: [30, 30, 30], x: [0, 0, 300] }}
                transition={{ duration: 2, delay: 3 }}
              ></motion.div>
            </motion.div>
            <motion.p
              className="text-2xl text-center pt-4 font-bold"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 4 }}
            >
              Verified Successfully! Continue to{" "}
              <Link className="text-special" href="/pages/public/auth/login">
                Login
              </Link>
            </motion.p>
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
