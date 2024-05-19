"use client";
import React, { useEffect, useState } from "react";
import "./Header.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import UserButton from "@/app/components/avatar/avatar";

import {
  FaArrowUpLong,
  FaBars,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";
import Dashboard from "@/app/components/admincomponents/navigation/Dashboard";
import { signOut, useSession } from "next-auth/react";
export default function Header() {
  const [nav, setNav] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(status, session);
  }, [status]);
  if (status === "loading") {
    return <h1>Loading....</h1>;
  } else {
    if (status === "authenticated") {
      return (
        <>
          {" "}
          <Dashboard user={session?.user} />
        </>
      );
    } else {
      return (
        <>
          {/* strip bar at top */}
          <nav className="strip hidden md:flex justify-between items-center bg-secondary p-0.5 text-white text-[10px]">
            <div className="left flex items-center">
              <span className="social-icons flex justify-around items-center">
                <FaFacebook className="m-0 flex justify-center items-center" />
                <FaInstagram className="m-0 flex justify-center items-center" />
                <FaTwitter className="m-0 flex justify-center items-center" />
              </span>
              <span className="number">052345989</span>
              <span className="mail">info@travel.com</span>
            </div>
            <div className="right flex items-center gap-2 ">
              <Link href="pages/public/auth/Login">Login</Link>
              <Link href="pages/public/auth/Register">Register</Link>
            </div>
          </nav>
          {/* main nav*/}

          <motion.nav
            className={`w-full main grid grid-cols-1  lg:grid-cols-[16%,1fr,20%]  items-center text-secondary px-4 py-2 z-[1000] shadow-lg lg:h-[80px] ${
              !nav ? "h-[60px] " : "h-[330px]"
            } overflow-hidden border-b-2 lg:border-none ${
              scroll > 60 ? "fixed bg-white top-0" : "relative"
            }`}
            layout
          >
            {/* title */}
            <section className="logo lg:text-[20px] flex justify-between">
              <div className="itm flex  items-center gap-2">
                <Image
                  className="relative"
                  src="/logo.svg"
                  width="35"
                  height="35"
                />
                Travel Wavez
              </div>

              {/* togel button */}
              <div className="toggle-button flex justify-end items-center lg:hidden">
                <FaBars
                  className="text-[30px] text-secondary cursor-pointer"
                  onClick={() => {
                    setNav(!nav);
                  }}
                />
              </div>
            </section>

            {/* nav links */}

            <ul className="links h-full flex flex-col lg:flex-row gap-4 lg:items-center text-[17px] text-secondary mt-3 lg:mt-0">
              <li>
                <Link
                  href="/"
                  onClick={() => {
                    setNav(false);
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/public/Packages"
                  onClick={() => {
                    setNav(false);
                  }}
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/public/About"
                  onClick={() => {
                    setNav(false);
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/public/Contact"
                  onClick={() => {
                    setNav(false);
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* register button */}
            {status === "unauthenticated" ? (
              <section className="buttons grid grid-rows-2 lg:flex items-center lg:justify-end   gap-2">
                <Link
                  className="w-full lg:w-fit flex items-center justify-center"
                  href="/pages/public/auth/login"
                  onClick={() => {
                    setNav(false);
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/pages/public/auth/register"
                  onClick={() => {
                    setNav(false);
                  }}
                >
                  <Button className="w-full bg-primary hover:bg-secondary">
                    Register
                  </Button>
                </Link>
              </section>
            ) : (
              <div className="wraper flex justify-end items-center pr-4">
                {session} <UserButton />
              </div>
            )}
          </motion.nav>

          {/* back to top button */}
          <motion.button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            layout
            className={`toTop fixed ${
              scroll > 70
                ? "translate-y-[0] opacity-100"
                : "translate-y-[-1000] opacity-0"
            } bottom-10 right-10 bg-secondary text-white z-[1000]`}
          >
            <FaArrowUpLong />
          </motion.button>
        </>
      );
    }
  }
}
