"use client";
import React from "react";
import Banner from "@/app/components/secondaryBanner/Banner";
import SectionTitle from "@/app/components/title/SectionTitle";
import { useState } from "react";
import axios from "axios";
import { FaLocationPin, FaMap, FaPhone } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";

export default function App() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    // This will prevent page refresh
    e.preventDefault();

    axios
      .post(
        "https://formcarry.com/s/XXXXXXX",
        {
          email: email,
          message: message,
          phone: phone,
          name: name,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.data.message);
        }
      });
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (submitted) {
    return <p>We've received your message, thank you for contacting us!</p>;
  }

  return (
    <>
      <section className=" min-h-[400px] ">
        <Banner ForCrumb="Contact" />
        <section className="section-1 px-4">
          <SectionTitle title="Leave us a message!" subtitle="Contact us!" />
        </section>
        <section className="section-1 min-h-[500px] text-Dark md:grid flex flex-col gap-8 lg:gap-2 justify-center item-center grid-cols-2 m-4">
          <form
            onSubmit={submit}
            className="bg-white flex gap-2 flex-col p-4 justify-center min-w-[400px] max-w-[500px]  justify-self-end rounded-md   hover:drop-shadow-2xl shadow-xl transition-all md:hover:translate-x-[-10px] hover:translate-y-[-10px] "
          >
            <h1 className="text-center tracking-[5px]">Fill out all fields</h1>
            <input
              id="email"
              placeholder="Email"
              className="rounded-md h-10 p-2 border-2 border-Dark border-opacity-25"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="group grid grid-cols-2 gap-1">
              <div className="Input-group">
                <input
                  className="rounded-md w-full h-10 p-2 border-2 border-Dark border-opacity-25"
                  placeholder="Phone"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="Input-group">
                <input
                  id="email"
                  placeholder="Name"
                  className="rounded-md h-10 p-2 border-2 border-Dark border-opacity-25 w-full"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <textarea
              className="w-full  resize-none rounded-md h-[200px] border-2  border-Dark border-opacity-25 p-2"
              id="message"
              maxLength={100}
              placeholder="100 words"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="bg-Dark hover:bg-opacity-45 text-white h-[50px] rounded-lg"
              type="submit"
            >
              Send
            </button>
          </form>
          <section className="info p-4 text-Dark text-opacity-80 flex flex-col justify-center  gap-4">
            <p className="text-Dark text-opacity-40">Contact Information</p>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              nam, est laboriosam quibusdam libero ad, ratione corrupti
              voluptatem illum in provident eos alias accusamus vero atque.
              Perferendis vero quae architecto?
            </p>
            <p className="text-sm flex gap-2">
              <FaLocationPin className="text-primary text-2xl" /> Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Provident rerum
              impedit, fuga vero odit quaerat. Culpa repellendus
            </p>
            <p className="text-md flex gap-2">
              <FaPhone className="text-primary text-2xl" /> 00-00-00-00
            </p>
            <p className="text-md flex gap-2">
              <HiMail className="text-primary text-2xl" /> info@travelwavezs.com
            </p>
          </section>
        </section>
      </section>
    </>
  );
}
