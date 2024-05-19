"use client";
import React from "react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
const Gallery = () => {
  const DataArray = [
    {
      img: "/cities/city4.jpg",
      name: "Makkah",
      sDescp: "Have you spirtual journey with our Hajj & umrah packages",
    },
    {
      img: "/cities/city1.jpg",
      name: "Turkey",
      sDescp: "Experience some of the most beautiful ceramics in the world",
    },
    {
      img: "/cities/city2.jpg",
      name: "Londan",
      sDescp: "Travel to the Heart of great britian.",
    },
    {
      img: "/cities/city3.jpg",
      name: "Dubai",
      sDescp: "Enjoy the luxury of on of the world most advanced country",
    },
    {
      img: "/cities/city5.jpg",
      name: "Newyork",
      sDescp: "Travel to a great urban citie to enjoy city life.",
    },
  ];
  return (
    <>
      <section
        className="gallery flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-2 
         lg:w-full justify-center items-center gap-5 lg:p-4 min-h-[80vh] overflow-hidden"
      >
        {DataArray.map((item, index) => {
          const { img, name, sDescp } = item;
          if (index === 0) {
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: easeInOut }}
                viewport={{ once: true }}
                className="bg-special relative overflow-hidden w-[95vw] lg:w-full lg:h-full col-span-2 row-span-2 h-[400px] rounded-md "
              >
                <Image
                  src={img}
                  alt="city picture"
                  fill
                  objectFit="cover"
                  priority
                />
                <div className="text absolute bottom-0 text-white h-[100px] bg-Dark   w-full shadow-2xl shadow-secondary p-4">
                  <h1 className="text-[25px]">{item.name}</h1>
                  <p className="text-special">{item.sDescp}</p>
                </div>
              </motion.article>
            );
          } else {
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: easeInOut }}
                viewport={{ once: true }}
                className="bg-Dark
              relative overflow-hidden w-[95vw] lg:w-full lg:h-full  h-[400px] rounded-md"
              >
                <Image
                  src={img}
                  alt="city picture"
                  fill
                  objectFit="cover"
                  priority
                />
                <div className="text absolute bottom-0 text-white h-[100px] lg:h-[60px] bg-Dark   w-full shadow-2xl shadow-secondary p-4 lg:p-1">
                  <h1 className="text-[25px] lg:text-[15px]">{item.name}</h1>
                  <p className="text-special lg:text-[10px]">{item.sDescp}</p>
                </div>
              </motion.article>
            );
          }
        })}
      </section>
    </>
  );
};

export default Gallery;
