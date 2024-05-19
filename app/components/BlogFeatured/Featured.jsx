import React from "react";
import "./Featured.css";
import { easeInOut, motion } from "framer-motion";
import Image from "next/image";

function Featured(prop) {
  const { flip, images, articleText } = prop;
  const { title, subtitle, descp } = articleText;
  // make sure the images is in object format
  return (
    <>
      <section
        className={`relative grid grid-rows-2 lg:grid-cols-2 justify-items-center items-center min-h-screen lg:min-h-[360px] p-10 lg:p-20 mt-[200px] lg:gap-[100px] overflow-hidden`}
      >
        <motion.article
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`z-10
           ${
             flip
               ? "lg:pl-[20px] grid lg:order-none order-2"
               : "grid order-2  justify-self-center"
           }
          `}
        >
          <h1 className="text-secondary lg:text-[30px] text-lg">{title}</h1>
          <h3 className="text-primary lg:20px text-opacity-80">{subtitle}</h3>
          <p className="lg:w-[90%] pt-5 text-xs md:text-sm">{descp}</p>
        </motion.article>

        <section
          className={`w-full h-full ${flip ? "justify-end" : "justify-start"} `}
        >
          {images.map((item, index) => {
            const { img } = item;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: easeInOut }}
                className="relative overflow-hidden lg:w-full h-[300px] lg:h-[400px] w-full rounded-md  "
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
      </section>
    </>
  );
}

export default Featured;
