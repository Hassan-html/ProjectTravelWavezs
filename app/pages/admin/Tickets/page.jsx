"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import toast from "react-hot-toast";
import { FloatingLabel } from "flowbite-react";

const airlines = [
  "Salam Air",
  "Oman Air",
  "Air Arabia",
  "Fly Dubai",
  "Emirates",
  "Etihad Airways",
  "Vizz Airline",
  "Qatar Airways",
  "Flynass",
  "Saudi Airline",
  "PIA",
  "Air Sial",
  "Air Blue",
  "Seren Air",
  "Fly Jinnah",
  "Turkish Airline",
  "Gulf Air",
  "Sirilankan Airline",
  "Malindo Air",
  "Thai Airways",
];

const page = () => {
  const [tickets, setTickets] = useState({ tickets: [], details: {} });
  const [ticket, setTicket] = useState({});
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [hold, setHold] = useState("");
  const [ct, setCt] = useState(0);
  const regex = new RegExp(ticket.airLine + "\\s*", "i");
  const FiltArray = airlines.filter((airline) => regex.test(airline));
  const [chng, setChng] = useState(false);

  const [loading, setLoading] = useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setLoading(true);
    tickets.details = {
      price: price,
      categories: categories,
      hold: hold,
      date: new Date(),
    };
    setCt(0);
    if (tickets.tickets.length > 0) {
      fetch("/api/admin/Tickets/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tickets),
      })
        .then((res) => {
          console.log(res);
          setTickets({ tickets: [], details: {} });
          toast.success("Ticket Added");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast.error("Make sure you have atleast 1 ticket before submiting");
      setLoading(false);
    }
  };
  const handelAdd = (e) => {
    e.preventDefault();
    e.target.reset();
    tickets.tickets.push(ticket);
    console.log(ticket);
    setCt(ct + 1);
  };
  const Check = () => {
    console.log(tickets);
  };
  const Remove = (e) => {
    tickets.tickets.pop(parseInt(e.target.value));
    setCt(ct - 1);
  };

  return (
    <>
      <div className="Title bg-Dark bg-opacity-10 shadow-xl p-4 min-h-30px flex flex-col justify-center items-center"></div>
      <h1 className="text-primary text-center text-[40px] p-6">Admin-Pannel</h1>
      <section className="tableWraper">
        <table>
          <thead>
            <tr>
              <td>Provider</td>
              <td>AirLine</td>
              <td>Flight No</td>
              <td>Sector</td>
              <td>Date</td>
              <td>Depart/Arrive</td>
              <td>Baggage</td>
              <td>Meal</td>

              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {!tickets.tickets.length > 0
              ? ""
              : tickets.tickets.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.provider}</td>
                      <td>{item.airLine}</td>
                      <td>{item.flightNo}</td>
                      <td>{item.Sector}</td>
                      <td>{item.DepartureDate}</td>
                      <td>
                        <div className="flex column gap-2 justify-center items-center">
                          <span>{item.DepartureTime}</span>
                          <span>{item.ArrivalTime}</span>
                        </div>
                      </td>
                      <td>{item.Baggage}</td>
                      <td>{item.Meal}</td>

                      <td>
                        <button value={index} onClick={Remove}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </section>
      {price && (
        <h1 className="text-primary text-center text-[20px] p-6 mt-6">
          Total Price: <span className="text-black ">{price}</span>{" "}
        </h1>
      )}

      <h1 className="text-primary text-center text-[20px] p-6 mt-6">Entries</h1>
      <form
        className="max-w-[500px] min-w-[400px] m-auto relative"
        onSubmit={handelAdd}
      >
        <div className={loading && "overlay"}></div>

        <div className="oneway">
          <div className="relative z-0 w-full mb-5 group">
            {/* ===================Airline=============== */}
            <input
              type="text"
              name="floating_email"
              id="floating_email "
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => {
                setTicket({ ...ticket, provider: e.target.value });
              }}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              provider
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email filter"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={ticket.airLine}
              onChange={(e) => {
                setTicket({ ...ticket, airLine: e.target.value });
                if (e.target.value.length <= 1) {
                  return setChng(false);
                } else {
                  return setChng(true);
                }
              }}
              autoComplete="off"
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              AirLine
            </label>
            <div
              className={`hidden${
                chng ? "flex flex-col w-[300px] p-4 bg-white " : ""
              }`}
            >
              {FiltArray.map((item) => {
                return (
                  <button
                    type="button"
                    onClick={() => {
                      setTicket({ ...ticket, airLine: item });
                      setChng(false);
                      console.log(chng);
                    }}
                    className={`hidden${chng ? "block " : ""}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Fligh No"
              id="FlighNo"
              onChange={(e) => {
                setTicket({ ...ticket, flightNo: e.target.value });
              }}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="FlighNo"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              FlightNo
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="Sector"
              id="Sector"
              onChange={(e) => {
                setTicket({ ...ticket, Sector: e.target.value });
              }}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="Sector"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Sector
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="Date"
              onChange={(e) => {
                setTicket({
                  ...ticket,
                  DepartureDate: e.target.value,
                });
              }}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="time flex justify-center items-center flex-col">
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Departure
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="time"
                  onChange={(e) => {
                    setTicket({
                      ...ticket,
                      DepartureTime: e.target.value,
                    });
                  }}
                  id="time"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="time flex justify-center items-center flex-col">
              <label
                htmlFor="Arrival"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrival
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="time"
                  onChange={(e) => {
                    setTicket({
                      ...ticket,
                      ArrivalTime: e.target.value,
                    });
                  }}
                  id="Arrival"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="Sector"
                id="Bagge"
                onChange={(e) => {
                  setTicket({ ...ticket, Baggage: e.target.value });
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="Bagge"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Baggage
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="Meal"
                id="Meal"
                onChange={(e) => {
                  setTicket({ ...ticket, Meal: e.target.value });
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="Meal"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Meal
              </label>
            </div>
          </div>

          <button className="bg-purple-600 w-full text-white " type="submit">
            Add
          </button>
        </div>
      </form>
      <form
        className="max-w-[500px] min-w-[400px] m-auto py-4 relative"
        onSubmit={handelSubmit}
      >
        <div className={loading && "overlay"}></div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => {
              setHold(e.target.value);
            }}
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Holding Duration (hrs)
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="floating_email"
            id="price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
          />
          <label
            htmlFor="price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            price
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_email"
            id="cate"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => {
              setCategories(e.target.value);
            }}
            required
          />
          <label
            htmlFor="cate"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Categories (put , comma between each category)
          </label>
          <button className="bg-Dark w-full text-white " type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
