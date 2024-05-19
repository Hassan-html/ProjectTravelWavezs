"use client";
import React, { useEffect, useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
const ONE = () => {
  const [oneWay, setOneWay] = useState();
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState(false);
  const deleteTicket = (e) => {
    axios
      .post(
        "/api/Tickets/delete",
        JSON.stringify({ id: e.target.value, type: "oneWay" })
      )
      .then((res) => {
        toast.success(res.data.message);
        if (res) {
          setOneWay(false);
          setHeaders(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!oneWay) {
      axios
        .post("/api/Tickets/getOneWay", JSON.stringify({}))
        .then((res) => {
          setOneWay(res.data.message);
          console.log(oneWay);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (oneWay) {
      setLoading(true);
      let heads = oneWay.map((item) => {
        return item.Airline;
      });
      heads = new Set(heads);
      heads = [...heads];
      setHeaders(heads);
      setLoading(false);
    }
  }, [oneWay]);
  return (
    <>
      {loading ? (
        <>
          <tr className="TicketTitle">
            <td colSpan="11" className="Titles">
              <h1 className="text-[35px] mb-6">
                Please Wait We are Fetching Data
              </h1>
              <p className="text-sm">
                Reload page if it take longer than 1 minute
              </p>
            </td>
          </tr>
        </>
      ) : (
        <>
          {headers && (
            <>
              {headers.map((item, index) => {
                return (
                  <>
                    <tr key={index} className="TicketTitle">
                      <td colSpan="11" className="Titles">
                        {item}
                      </td>
                    </tr>
                    {oneWay.map((innerItem) => {
                      const {
                        Airline,
                        ArrivalTime,
                        Baggage,
                        Booked,
                        DepartureDate,
                        DepartureTime,
                        FlightNo,
                        Meal,
                        Sector,
                        price,
                        id,
                      } = innerItem;
                      if (Airline === item) {
                        return (
                          <tr>
                            <td>
                              <FaPlaneDeparture className="absolute left-[5px]" />{" "}
                              {Airline}
                            </td>
                            <td> {FlightNo}</td>
                            <td>{Sector}</td>
                            <td>{DepartureDate.split("T")[0]}</td>
                            <td>
                              {DepartureTime.slice(0, -3)}-
                              {ArrivalTime.slice(0, -3)}
                            </td>
                            <td>{Baggage}</td>
                            <td>{Meal}</td>
                            <td>{Booked ? "Yes" : "No"}</td>
                            <td>{price}</td>
                            <td>
                              <button
                                className="underline text-red-700"
                                value={id}
                                onClick={deleteTicket}
                              >
                                Del
                              </button>{" "}
                              /{" "}
                              <button className="underline text-special ">
                                Edit
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ONE;
