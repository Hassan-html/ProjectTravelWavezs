"use client";
import React, { useEffect, useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const RTicket = () => {
  const [rTicket, setRTicket] = useState();
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState(false);
  const deleteTicket = (e) => {
    console.log("clicked");
    axios
      .post(
        "/api/Tickets/delete",
        JSON.stringify({ id: e.target.value, type: "return" })
      )
      .then((res) => {
        toast.success(res.data.message);
        if (res) {
          setRTicket(false);
          setHeaders(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!rTicket) {
      axios
        .post("/api/Tickets/getReturn", JSON.stringify({}))
        .then((res) => {
          setRTicket(res.data.message);
          console.log(rTicket);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (rTicket) {
      setLoading(true);
      let heads = rTicket.map((item) => {
        return item.Airline;
      });
      heads = new Set(heads);
      heads = [...heads];
      setHeaders(heads);
      setLoading(false);
    }
  }, [rTicket]);

  return (
    <>
      {headers && (
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
                    {rTicket.map((innerItem) => {
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
                        rAirline,
                        rArrivalTime,
                        rBaggage,
                        rDepartureDate,
                        rDepartureTime,
                        rFlightNo,
                        rMeal,
                        rSector,
                      } = innerItem;
                      if (Airline === item) {
                        return (
                          <>
                            <tr key={id}>
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
                                <button className="underline text-special">
                                  Edit
                                </button>
                              </td>
                            </tr>
                            <tr className="returnT">
                              <td>
                                <FaPlaneArrival className="absolute left-[5px]" />
                                Serene
                              </td>
                              <td>{rFlightNo}</td>
                              <td>{rSector}</td>
                              <td>{DepartureDate.split("T")[0]}</td>
                              <td>
                                {rDepartureTime.slice(0, -3)}-
                                {rArrivalTime.slice(0, -3)}
                              </td>
                              <td>{rBaggage}</td>
                              <td>{rMeal}</td>
                              <td>{Booked ? "Yes" : "No"}</td>
                            </tr>
                          </>
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

export default RTicket;
