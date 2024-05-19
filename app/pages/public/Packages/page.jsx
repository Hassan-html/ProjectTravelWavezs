"use client";
import React from "react";
import Banner from "@/app/components/secondaryBanner/Banner";
import Image from "next/image";
import SectionTitle from "@/app/components/title/SectionTitle";
import Gallery from "@/app/components/gallery/Gallery";
import Featured from "@/app/components/BlogFeatured/Featured";

const page = () => {
  return (
    <>
      <section className=" min-h-[400px]">
        <Banner ForCrumb="Packages" />
        <section className="section-1">
          <SectionTitle
            title="Browse our Packages"
            subtitle="Customised According to your need"
          />
          <Gallery />
        </section>
        <section className="section-2">
          <Featured
            images={[{ img: "/cities/city4.jpg" }]}
            articleText={{
              title: "Journey of Faith: Hajj & Umrah in Makkah",
              subtitle: "Discover the Spiritual Heartbeat of Islam",
              descp:
                "Begin your journey to Makkah with our Hajj and Umrah experience. Our friendly team is here to guide you every step of the way, ensuring your trip is filled with warmth and support. Let Makkah's spirit embrace you like a dear friend on this sacred adventure.",
            }}
          />
          <Featured
            flip={true}
            images={[{ img: "/cities/city2.jpg" }]}
            articleText={{
              title: "Study in London",
              subtitle: "Your Gateway to Global Education",
              descp:
                "Embark on a study adventure in London, the vibrant hub of education and culture. Our team will help you navigate the visa process and settle into student life. Explore London's rich history and dynamic atmosphere while pursuing your academic goals.",
            }}
          />
          <Featured
            images={[{ img: "/cities/city4.jpg" }]}
            articleText={{
              title: "Journey of Faith: Hajj & Umrah in Makkah",
              subtitle: "Discover the Spiritual Heartbeat of Islam",
              descp:
                "Begin your journey to Makkah with our Hajj and Umrah experience. Our friendly team is here to guide you every step of the way, ensuring your trip is filled with warmth and support. Let Makkah's spirit embrace you like a dear friend on this sacred adventure.",
            }}
          />
          <Featured
            flip={true}
            images={[{ img: "/cities/city2.jpg" }]}
            articleText={{
              title: "Study in London",
              subtitle: "Your Gateway to Global Education",
              descp:
                "Embark on a study adventure in London, the vibrant hub of education and culture. Our team will help you navigate the visa process and settle into student life. Explore London's rich history and dynamic atmosphere while pursuing your academic goals.",
            }}
          />
          <Featured
            images={[{ img: "/cities/city4.jpg" }]}
            articleText={{
              title: "Journey of Faith: Hajj & Umrah in Makkah",
              subtitle: "Discover the Spiritual Heartbeat of Islam",
              descp:
                "Begin your journey to Makkah with our Hajj and Umrah experience. Our friendly team is here to guide you every step of the way, ensuring your trip is filled with warmth and support. Let Makkah's spirit embrace you like a dear friend on this sacred adventure.",
            }}
          />
          <Featured
            flip={true}
            images={[{ img: "/cities/city2.jpg" }]}
            articleText={{
              title: "Study in London",
              subtitle: "Your Gateway to Global Education",
              descp:
                "Embark on a study adventure in London, the vibrant hub of education and culture. Our team will help you navigate the visa process and settle into student life. Explore London's rich history and dynamic atmosphere while pursuing your academic goals.",
            }}
          />
        </section>
      </section>
    </>
  );
};

export default page;
