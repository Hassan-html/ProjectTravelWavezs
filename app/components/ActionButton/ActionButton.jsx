"use client";
import { easeInOut, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const h1Action = {
  initial: {
    opacity: 1,
    x: 0,
  },
  hover: {
    borderRadius: "none",
    x: 30,
    opacity: 0,
    transition: {
      duration: 1,
      ease: easeInOut,
    },
  },
};
const pAction = {
  initial: {
    opacity: 1,
  },
  hover: {
    y: -60,
    transition: {
      duration: 1,
      ease: easeInOut,
    },
  },
};

const ActionButton = (prop) => {
  const { main, hoverText, link } = prop;
  return (
    <>
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        transition={{ duration: 2, ease: easeInOut }}
        layout
      >
        <Link
          href={link}
          className="text-white badge cursor-pointer rounded-md relative bg-white grid grid-cols-[30%,80%] px-4 content-center items-center  py-2 w-[200px]  h-[60px] overflow-hidden flex-nowrap"
        >
          <motion.img
            src="/logo.svg"
            width={40}
            height={40}
            className=" left-[10px]"
            variants={h1Action}
            transition={{ duration: 1, ease: easeInOut }}
            layout
          />
          <motion.h1
            className="text-Dark w-fit text-nowrap"
            variants={h1Action}
            layout
          >
            {main}
          </motion.h1>
          <motion.p
            className="absolute left-0 bottom-[-60px] w-full h-full bg-Dark text-white flex justify-center items-center text-center"
            variants={pAction}
          >
            <span>{hoverText}</span>
          </motion.p>
        </Link>
      </motion.div>
    </>
  );
};

export default ActionButton;
