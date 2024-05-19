"use client";

import React, { useEffect, useState } from "react";
import "./Footer.css";
import Link from "next/link";
import { FaCopyright, FaFacebook } from "react-icons/fa6";
import ActionButton from "../ActionButton/ActionButton";
import axios from "axios";
export default function Footer() {
  const [Loged, setLoged] = useState(false);
  const [user, setUser] = useState();

  if (Loged === true) {
    return <></>;
  } else {
    return (
      <>
        <footer className="mt-[200px]">
          <div className="hero min-h-[400px]  bg-base-200 flex justify-center items-center bg-Dark text-white">
            <div className="hero-content text-center p-[50px]">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Connect with Us</h1>
                <p className="py-6">
                  We're excited to connect with you further. Whether you have
                  questions about our services, want to share your travel
                  experiences, or simply want to say hello, we're here for you.
                </p>
                <div className="buttons flex flex-col gap-[20px] justify-center items-center">
                  <ActionButton
                    main="Travel Wavez"
                    hoverText="Contact"
                    link="/pages/Contact"
                  />
                </div>
              </div>
            </div>
          </div>
          <section className="bottom-title bg-primary p-4 flex items-center justify-center ]"></section>
          <footer className="bg-Dark bg-opacity-20 flex flex-wrap px-[40px] py-[100px] justify-around">
            <article className="w-full flex flex-col justify-center items-center gap-[10px] pb-[20px]">
              <h1 className="title">Our Brief History</h1>
              <p className="text-center">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptas mollitia ratione neque sed quas, excepturi in sint ex
                quisquam nisi tempore eos inventore, placeat deserunt ipsa ipsam
                minima reiciendis aspernatur dolor quibusdam? Quisquam quod
                perferendis repellendus vitae mollitia eveniet voluptate.
              </p>
            </article>
            <section className="footer-section">
              <h1 className="title ">Want to get in touch?</h1>
              <article className="box">
                <div className="subTiltle">Call 24/7 for inquirires</div>
                <a className="spcLink " href="tel:0524563707">
                  052-8979090
                </a>
              </article>
              <article className="box">
                <div className="subTiltle">Call 24/7 for inquirires</div>
                <a className="spcLink " href="tel:0524563707">
                  052-8979090
                </a>
              </article>
              <article className="box">
                <div className="subTiltle">Call 24/7 for inquirires</div>
                <a className="spcLink " href="tel:0524563707">
                  052-8979090
                </a>
              </article>
            </section>
            <section className="footer-section">
              <h1 className="title ">Quick Links</h1>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/pages/Packages">Packages</Link>
                </li>
                <li>
                  <Link href="/pages/About">About</Link>
                </li>
                <li>
                  <Link href="/pages/Contact">Contact</Link>
                </li>
              </ul>
            </section>
            <section className="footer-section">
              <h1 className="title ">Socials</h1>
              <ul>
                <li>
                  <Link href="/">Facebook</Link>
                </li>
                <li>
                  <Link href="/">Twitter</Link>
                </li>
                <li>
                  <Link href="/">Instagram</Link>
                </li>
              </ul>
            </section>
          </footer>
          <footer className="tracking-widest flex text-white bg-Dark p-2">
            <p className="flex justify-center items-center gap-2 text-sm">
              {" "}
              <FaCopyright /> All Rights Reserved {new Date().getFullYear()}{" "}
              Developer Hsn-Code{" "}
            </p>
          </footer>
        </footer>
      </>
    );
  }
}
