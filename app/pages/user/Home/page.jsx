"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

import { FaCartShopping, FaPencil, FaTrash } from "react-icons/fa6";
import { HiSearch } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
const pages = () => {
  const [filterNav, setFilterNav] = useState(false);
  const [data, setData] = useState([]);
  const [airLines, setAirLines] = useState([]);

  useEffect(() => {
    axios
      .post("/api/public/Tickets", [])
      .then((res) => {
        console.log(res);
        setData(res.data.message);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      console.log(data);
      const items = data.map((item, index) => {
        return item.tickets[0].airLine;
      });
      let values = new Set(items);
      setAirLines([...values]);
      console.log(data, values);
    }
  }, [data]);

  return (
    <>
      <section>
        <div className="Title bg-Dark bg-opacity-10 shadow-xl p-4 min-h-30px flex flex-col justify-center items-center"></div>
        <h1 className="text-primary text-center text-[40px] p-6">
          User-Booking
        </h1>
        <div className="buttons flex m-6 items-center gap-2">
          <button
            className="bg-Dark text-white m-2 "
            onClick={() => {
              setFilterNav(!filterNav);
            }}
          >
            Advance Search
          </button>
          <Link href="/pages/admin/Tickets">
            <button
              className="bg-green-400 text-white m-2 flex gap-2 justify-center items-center "
              onClick={() => {
                setFilterNav(false);
              }}
            >
              <BsWhatsapp className="text-white text-[25px]" />
              Contact
            </button>
          </Link>
        </div>
        <section className="tickets flex overflow-auto w-full p-2 py-7">
          {/* filter Nav */}

          <section
            className={`${
              !filterNav && "close"
            } filterNav h-full min-w-[400px]`}
          >
            <div className="searchBox pb-[80px]">
              <div className="box flex">
                <input
                  type="text"
                  placeholder="Search By key word"
                  className="w-full h-10 p-2 border-2 border-Dark border-opacity-25"
                />
                <button className="text-[20px] bg-Dark text-white">
                  <HiSearch />
                </button>
              </div>
            </div>
            <h1 className="text-[25px]">Flight</h1>
            <div className="selects flex gap-3">
              <select name="" id="">
                <option value="">Airlies</option>
              </select>
              <select name="" id="">
                <option value="">Sectors</option>
              </select>
            </div>
            <div className="Date flex-col flex gap-[20px]">
              <h1 className="text-[25px]">Departure Date</h1>
              <input type="date" />
            </div>
            <div className="Date flex-col flex gap-[20px]">
              <h1 className="text-[25px]">Additionals</h1>
              <div className="input-group flex justify-normal items-center gap-4">
                <input type="checkbox" id="Meal" />
                <label htmlFor="Meal">Meal</label>
              </div>
            </div>
          </section>
          <section className="homeTableWraper">
            <table>
              <thead>
                <tr>
                  <td>AirLine</td>
                  <td>Flight No</td>
                  <td>Sector</td>
                  <td>Date</td>
                  <td>Depart/Arrive</td>
                  <td>Baggage</td>
                  <td>Meal</td>
                  <td>Price</td>
                  <td>Action</td>
                </tr>
              </thead>

              {airLines.length > 0 ? (
                airLines.map((airline, inde) => {
                  return (
                    <>
                      <tr>
                        {" "}
                        <td colSpan="9">
                          <h1 className="flex gap-2 justify-center items-center overflow-hidden">
                            <img
                              src={`/airlines/${airline
                                .replace(/\s/g, "")
                                .toLowerCase()}.png`}
                              alt="img"
                              width="150px"
                            />
                            {airline}
                          </h1>
                        </td>
                      </tr>
                      {data.map((item, index) => {
                        if (item.tickets[0].airLine == airline) {
                          return (
                            <>
                              <tbody key={index}>
                                {item.tickets.map((ticket, ind) => {
                                  return (
                                    <tr>
                                      <td>{ticket.airLine}</td>
                                      <td>{ticket.flightNo}</td>
                                      <td>{ticket.Sector}</td>
                                      <td>{ticket.DepartureDate}</td>
                                      <td>
                                        {ticket.DepartureTime}/
                                        {ticket.ArrivalTime}
                                      </td>
                                      <td>{ticket.Baggage}</td>
                                      <td>{ticket.Meal}</td>
                                      {ind === 0 && (
                                        <td rowSpan={item.tickets.length}>
                                          {item.details.price}
                                        </td>
                                      )}
                                      {ind === 0 && (
                                        <td rowSpan={item.tickets.length}>
                                          <div className="flex gap-2 justify-center items-center">
                                            <Link
                                              href={`/pages/user/Tickets/${item._id}`}
                                              className="bg-primary text-white rounded-md hover:scale-110
                                               py-2 px-4 flex gap-2 justify-center items-center"
                                            >
                                              <FaCartShopping /> Book
                                            </Link>
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </>
                          );
                        }
                      })}
                    </>
                  );
                })
              ) : (
                <tr className="TicketTitle">
                  <td colSpan="11" className="Titles">
                    <div className="h-[500px] flex flex-col justify-center items-center gap-[10px]">
                      <h1 className="text-[35px] mb-6">
                        Please Wait We are Fetching Data
                      </h1>
                      <p className="text-sm">
                        Reload page if it take longer than 1 minute
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </table>
          </section>
        </section>
      </section>
    </>
  );
};

export default pages;
