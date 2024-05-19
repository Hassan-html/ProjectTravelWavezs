"use client";
import { Spinner } from "flowbite-react";
import React from "react";
import { CircleLoader } from "react-spinners";

const ComponentSpinner = () => {
  return (
    <>
      <section className="w-full h-full flex justify-center flex-col items-center bg-white bg-opacity-60">
        <CircleLoader color="#05445E" />
      </section>
    </>
  );
};

export default ComponentSpinner;
