"use client";
import { Datepicker } from "flowbite-react";
import React, { useState } from "react";
import Link from "next/link";

const TicketBar = () => {
  const [returnFlight, setReturnFlight] = useState(false);
  return (
    <>
      <section className="absolute z-20 bottom-[-180px] md:bottom-0 w-[80%] min-h-[100px] rounded-[15px] shadow-md shadow-Dark bg-white translate-y-[40px] flex flex-col ">
        <div className="buttons">
          <button
            className={`p-2 ${!returnFlight && "bg-secondary text-white"}`}
            onClick={() => {
              setReturnFlight(!returnFlight);
            }}
          >
            One Way
          </button>
          <button
            className={`p-2 ${returnFlight && "bg-secondary text-white"}`}
            onClick={() => {
              setReturnFlight(!returnFlight);
            }}
          >
            Return
          </button>
        </div>
        <section className="search md:grid grid-cols-[20%,20%,40%,15%]  flex gap-2 p-5 w-full flex-wrap">
          <input type="text" placeholder="From" className="rounded-lg w-full" />
          <input
            type="text"
            placeholder="Destination"
            className="rounded-lg w-full"
          />
          <div className="dates flex gap-3">
            <Datepicker className="w-full" minDate={new Date()} />
            {returnFlight && (
              <Datepicker className="w-full" minDate={new Date()} />
            )}
          </div>
          <Link href="/pages/Contact">
            <button className="bg-special text-white w-full">Search</button>
          </Link>
        </section>
      </section>
    </>
  );
};

export default TicketBar;
