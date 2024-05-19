"use client";
import { Spinner } from "flowbite-react";
import React from "react";
import { CircleLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <section className="h-screen flex justify-center flex-col items-center">
        <CircleLoader color="#05445E" />
        <span className="text-4xl tracking-[10px]">Travel Wavezs</span>
      </section>
    </>
  );
};

export default Loading;
