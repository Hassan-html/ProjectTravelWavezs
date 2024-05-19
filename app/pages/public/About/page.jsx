"use client";
import React from "react";
import Banner from "@/app/components/secondaryBanner/Banner";
import SectionTitle from "@/app/components/title/SectionTitle";
import TimeProgressComponent from "@/app/components/TimeLine/Timeline";

const Time1 = [
  {
    head: "Our Expertise",
    title: "Expertise and Experience",
    descp:
      "Our team brings years of experience and expertise in the travel industry. We have navigated through various destinations, encountered different cultures, and handled diverse travel requirements.",
    clickLink: { text: "Explore Packages", src: "/pages/Packages" },
  },
  {
    head: "Personalized Assistance",
    title: "Tailored Service",
    descp:
      "At our core, we prioritize personalized service that exceeds expectations. We understand that every traveler is unique, with distinct preferences and requirements. That's why we take the time to listen, understand, and customize each aspect of your journey to ensure it reflects your individual tastes and desires.",
  },
  {
    head: "Quality Assurance",
    title: "Quality and Reliability",
    descp:
      "Quality and reliability are the cornerstones of our service philosophy. We are committed to delivering excellence in every aspect of your journey, from the moment you book with us to the final farewell.",
  },
  {
    head: "Customer Delight",
    title: "Customer Satisfaction Guaranteed",
    descp:
      "Our dedication to customer satisfaction is unwavering. We strive to go above and beyond to ensure that every aspect of your journey exceeds your expectations. From our responsive customer service team to our expertly curated experiences, we are committed to making your travel dreams a reality..",
  },
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

const page = () => {
  return (
    <>
      <section className=" min-h-[400px] ">
        <Banner ForCrumb="About" />
        <section className="section-1 px-4">
          <SectionTitle
            title="Why chose us?"
            subtitle="This can help you to make a better choice"
          />
          <section className="trail">
            <div className=" my-[200px] grid grid-cols-2 min-h-screen">
              <div className="part-1 sticky top-0 flex flex-col  justify-center items-center text-center h-[200px] ">
                <h1 className="text-primary text-[13px] md:text-[3rem]">
                  Years of Experience
                </h1>
                <p className="text-special text-[12px] md:text-base">
                  Our team brings years of experience and expertise in the
                  travel industry.
                </p>
              </div>

              <div className="part-2 text-[1.3rem]">
                <TimeProgressComponent timeContent={Time1} />
              </div>
            </div>
            <div className="my=[200px] grid grid-cols-2 min-h-screen">
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
        </section>
      </section>
    </>
  );
};

export default page;
