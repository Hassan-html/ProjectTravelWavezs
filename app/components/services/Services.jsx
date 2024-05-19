import React from "react";
import SectionTitle from "../title/SectionTitle";
import Gallery from "../gallery/Gallery";

const Services = () => {
  return (
    <>
      <section className="w-full service-section  flex flex-col gap-10 justify-center items-center mt-[100px]">
        <SectionTitle
          title={"Our Services"}
          subtitle={"Avail from best offers"}
        />
        <Gallery />
      </section>
    </>
  );
};

export default Services;
