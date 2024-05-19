"use client";
import Image from "next/image";
import React from "react";
import { easeInOut, motion } from "framer-motion";
import { FaHatCowboy, FaHotel, FaMap, FaPlaneDeparture } from "react-icons/fa6";
import Featured from "./components/Featured/Featured";
import Services from "./components/services/Services";
import TicketBar from "./components/TicketsSearch/TicketBar";
import TimeProgressComponent from "./components/TimeLine/Timeline";

export default function Home() {
  const forFeature1 = [
    { img: "/others/hero4.jpg" },
    { img: "/others/hero1.jpg" },
    { img: "/others/hero2.jpg" },
    { img: "/others/hero3.jpg" },
  ];
  const forFeature2 = [
    { img: "/people/people1.jpg" },
    { img: "/people/people2.jpg" },
    { img: "/people/people3.jpg" },
    { img: "/people/people4.jpg" },
  ];
  const Time2 = [
    {
      head: "Destination Insights",
      title: "Destination Expertise",
      descp:
        "Our team is well-versed in the destinations we offer, providing you with in-depth knowledge and insider tips to make the most of your trip.",
    },
    {
      head: "Value Proposition",
      title: "Value for Money",
      descp:
        "We understand the importance of value for money when it comes to travel. That's why we work tirelessly to negotiate the best deals and discounts for our customers, ensuring that you get the most bang for your buck.",
    },
    {
      head: "Convenience and Flexibility",
      title: "Flexible Booking Options",
      descp:
        "We prioritize convenience and flexibility to make your travel experience as smooth and stress-free as possible. With easy booking processes, flexible payment options, and hassle-free cancellations, we're here to accommodate your needs and preferences every step of the way.",
      clickLink: { text: "Contact Now", src: "/pages/Contact" },
    },
    {
      head: "Safety and Security",
      title: "Your Safety Matters",
      descp:
        "Your safety and security are our top priorities. We adhere to the highest safety standards and work with trusted partners to ensure that your journey is safe and secure.",
    },
    {
      head: "Community Engagement",
      title: "Connecting Communities",
      descp:
        "We are committed to giving back to the communities we visit and supporting sustainable tourism practices. Through partnerships with local organizations and initiatives, we strive to make a positive impact on the destinations we explore..",
    },
  ];

  return (
    <>
      {/* Hero section */}
      <section className="hero w-full relative h-[400px] flex justify-center items-center p-3">
        <Image
          src="/HeroImages/travel-city-newyork.jpg"
          alt="new york city Image.jpg"
          fill
          objectFit="cover"
          priority
        />
        <div className="overlay absolute w-full h-full bg-Dark bg-opacity-80"></div>
        <article className="text-white z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: easeInOut, duration: 0.7 }}
            className="spaced-title text-[25px] "
          >
            Welcome to Travel Wavez !!
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: easeInOut, duration: 0.7, delay: 0.2 }}
            className="sub text-special "
          >
            Where Dreams Take Flight!
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: easeInOut, duration: 0.7, delay: 0.4 }}
            className="text-center mt-[10px] text-white text-opacity-70"
          >
            Immerse yourself in a world of possibilities as you browse through
            our curated collection of destinations, each offering its own unique
            charm and allure.
          </motion.p>
        </article>
        {/* ticket section */}

        <TicketBar />

        {/* Home cards after hero */}
      </section>
      <section className="homeSec1 min-h-[200px]  px-10 gap-[40px] grid lg:grid-cols-4 items-center justify-items-center my-[20px] mt-[350px] md:mt-[150px]">
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: easeInOut, duration: 0.7, delay: 0.4 }}
          className="relative flex justify-center items-center flex-col  gap-[10px]"
        >
          <div className="icon">
            <FaMap className="text-[20px]" />
          </div>
          <h2 className="title">Customized Itineraries</h2>
          <p className="description text-xs text-center">
            Personalized travel plans tailored to your preferences and
            interests.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: easeInOut, duration: 0.7, delay: 0.5 }}
          className="relative flex justify-center items-center flex-col  gap-[10px]"
        >
          <div className="icon">
            <FaHatCowboy className="text-[20px]" />
          </div>
          <h2 className="title">Expert Guides</h2>
          <p className="description text-xs text-center">
            Knowledgeable and experienced guides to accompany you on your
            journey
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: easeInOut, duration: 0.7, delay: 0.7 }}
          className="relative flex justify-center items-center flex-col  gap-[10px]"
        >
          <div className="icon">
            <FaPlaneDeparture className="text-[20px]" />
          </div>
          <h2 className="title text-center">Seamless Transportation</h2>
          <p className="description text-xs text-center">
            Hassle-free transportation arrangements for smooth and comfortable
            travels
          </p>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: easeInOut, duration: 0.7, delay: 0.8 }}
          className="relative flex justify-center items-center flex-col  gap-[10px]"
        >
          <div className="icon">
            <FaHotel className="text-[20px]" />
          </div>
          <h2 className="title text-center">Exclusive Accommodations</h2>
          <p className="description text-xs text-center">
            Handpicked selection of accommodations ranging from boutique hotels
            to luxury resorts.
          </p>
        </motion.article>
      </section>

      <Services />

      <section className="trial p-4">
        <div className="my-[500px] grid grid-cols-2 h-screen">
          <div className="part-2 text-[1.3rem]">
            <TimeProgressComponent timeContent={Time2} />
          </div>
          <div className="part-1 sticky top-0 flex flex-col  justify-center items-center text-center h-[200px] ">
            <h1 className="text-primary text-[13px] md:text-[3rem]">
              Quality and Reliability
            </h1>
            <p className="text-special text-[12px] md:text-base">
              Quality and reliability are at the core of everything we do
            </p>
          </div>
        </div>
      </section>
      <Featured
        flip={false}
        images={[...forFeature1]}
        articleText={{
          title: "Explore Tour destinations with us.",
          subtitle: "Travelers Space",
          descp: `Whether you're dreaming of sipping cocktails on a tropical beach,
            trekking through lush forests, or wandering the streets of bustling
            cities`,
        }}
      />
      <Featured
        flip={true}
        images={[...forFeature2]}
        articleText={{
          title: "Why Choose Us ?",
          subtitle: "Your trusted guide to get you to your destination",
          descp: ` Skyways is here to turn your dreams into reality. So pack your bags, grab your passport, and let's embark on an adventure of a lifetime together!`,
        }}
      />
    </>
  );
}
