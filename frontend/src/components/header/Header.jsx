import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Material UI Icon imports
import HotelIcon from "@mui/icons-material/Hotel";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import CarRentalIcon from "@mui/icons-material/CarRental";
import AttractionsIcon from "@mui/icons-material/Attractions";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

// Date picker packages
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

// Context Imports
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

import "./header.css";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [dateShow, setDateShow] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [peopleOptionsShow, setPeopleOptionsShow] = useState(false);
  const [peopleOptions, setPeopleOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);

  const handleOption = (type, op) => {
    setPeopleOptions((prev) => {
      return {
        ...prev,
        [type]: op === "inc" ? prev[type] + 1 : prev[type] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, peopleOptions },
    });
    navigate("/hotels", { state: { destination, dates, peopleOptions } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="listItem active">
            <HotelIcon />
            <span>Stays</span>
          </div>
          <div className="listItem">
            <LocalAirportIcon />
            <span>Flights</span>
          </div>
          <div className="listItem">
            <LocalTaxiIcon />
            <span>Taxis</span>
          </div>
          <div className="listItem">
            <AttractionsIcon />
            <span>Attractions</span>
          </div>
          <div className="listItem">
            <CarRentalIcon />
            <span>Car Rentals</span>
          </div>
        </div>
        <h1 className="headerTitle">A lifetime of discounts? It's genius.</h1>
        <p className="headerDesc">
          Get rewarded for your travels - unlock instant discounts and more with
          a free Booking.com account.
        </p>
        {!user && <button className="headerButton">Sign In / Register</button>}
        <div className="headerSearch">
          <div className="searchItem">
            <HotelIcon className="searchIcon" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="searchInput"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="searchItem">
            <CalendarMonthIcon className="searchIcon" />
            <span
              onClick={() => setDateShow((prev) => !prev)}
              className="searchText"
            >
              {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </span>
            {dateShow && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="searchItem">
            <PersonIcon />
            <span
              onClick={() => setPeopleOptionsShow((prev) => !prev)}
              className="searchText"
            >
              {`${peopleOptions.adult} adult · ${peopleOptions.children} children · ${peopleOptions.room} room`}
            </span>
            {peopleOptionsShow && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      className="optionCounterButton"
                      disabled={peopleOptions.adult <= 1}
                      onClick={() => handleOption("adult", "dec")}
                    >
                      -
                    </button>
                    <button className="optionCounterNumber">
                      {peopleOptions.adult}
                    </button>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "inc")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      className="optionCounterButton"
                      disabled={peopleOptions.children <= 1}
                      onClick={() => handleOption("children", "dec")}
                    >
                      -
                    </button>
                    <button className="optionCounterNumber">
                      {peopleOptions.children}
                    </button>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "inc")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      className="optionCounterButton"
                      disabled={peopleOptions.room <= 1}
                      onClick={() => handleOption("room", "dec")}
                    >
                      -
                    </button>
                    <button className="optionCounterNumber">
                      {peopleOptions.room}
                    </button>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "inc")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="searchItem">
            <button className="searchBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
