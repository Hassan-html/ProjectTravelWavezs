import React from "react";
import "./Featured.css";
import { easeInOut, motion } from "framer-motion";
import Image from "next/image";

function Featured(prop) {
  const { flip, images, articleText } = prop;
  const { title, subtitle, descp } = articleText;
  return (
    <>
      <section className="relative grid grid-rows-2 lg:grid-cols-2 justify-items-center items-center h-screen lg:h-[600px] p-10 lg:p-20 mt-[200px] gap-20 lg:gap-0 ">
        <motion.article
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={
            flip ? "grid lg:order-none order-2" : "grid order-2  lg:pl-[100px]"
          }
        >
          <h1 className="text-secondary text-[30px]">{title}</h1>
          <h3 className="text-primary text-opacity-80">{subtitle}</h3>
          <p className="lg:w-[70%] pt-5">{descp}</p>
        </motion.article>

        <section
          className={`scrolled-section absolute w-[90%] lg:w-[90%] h-[450px] lg:grid gap-[100px] ${
            flip ? "justify-end" : "justify-start"
          } overflow-y-auto overflow-x-hidden snap-y snap-mandatory pb-10 justify-self-center self-start lg:self-start  lg:mt-0 order-1`}
        >
          {images.map((item, index) => {
            const { img } = item;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: easeInOut }}
                className=" lg:aspect-[3/2] h-[400px] rounded-md snap-start snap-always relative overflow-hidden mt-[100px] lg:m-0 "
              >
                <Image
                  src={img}
                  alt="Images for crousel section"
                  fill
                  objectFit="cover"
                  priority
                />
              </motion.article>
            );
          })}
        </section>
        <article className="crousel"></article>
      </section>
    </>
  );
}

export default Featured;
