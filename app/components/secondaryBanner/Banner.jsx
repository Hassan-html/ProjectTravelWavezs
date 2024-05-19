"use Client";
import React from "react";
import Image from "next/image";
import "./secondBanner.css";
import ActionButton from "../ActionButton/ActionButton";
import BreadCrumbs from "../PageNavigation/BreadCrumbs";
import SectionTitle from "../title/SectionTitle";

const Banner = (props) => {
  return (
    <>
      <section className="relative  h-[400px]">
        <Image src="/others/map.jpg" alt="city3" fill objectFit="cover" />
        <div className="overlay bg-Dark bg-opacity-20 absolute w-full h-full justify-center items-center flex flex-col gap-4">
          <BreadCrumbs navi={props.ForCrumb} />
        </div>
      </section>
    </>
  );
};

export default Banner;
