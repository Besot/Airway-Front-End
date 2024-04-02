import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPageSearch.css';
import axios from 'axios';

const Search = (props) => {
    const [departurePort, setDeparturePort] = useState('');
    const [arrivalPort, setArrivalPort] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [noOfAdult, setNoOfAdult] = useState(0);
    const [noOfChildren, setNoOfChildren] = useState(0);
    const [noOfInfant, setNoOfInfant] = useState(0);
    const [tripType, setTripType] = useState("ONE_WAY");
    const [flights, setFlights] = useState([]);
    const [departureOptions, setDepartureOptions] = useState([]);
    const [arrivalOptions, setArrivalOptions] = useState([]);
    const navigate = useNavigate();
    const handleOptionChange = (event) => {
        setTripType(event.target.value);
    };

    useEffect(() => {
        const fetchPorts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/airports/all-airports");
                setDepartureOptions(response.data);
                setArrivalOptions(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching ports:', error);
            }
        };

        fetchPorts();
    }, []);

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Logout request failed');
            }
            console.log('Logged out successfully');
            localStorage.removeItem("user");
            localStorage.removeItem("userFirstName");
            localStorage.removeItem("userRole");
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    const handleAction = async (e) => {
        e.preventDefault();
        const firstName = await JSON.parse(localStorage.getItem('userFirstName') ?? 'null');
        if (firstName !== null && firstName !== undefined && firstName !== '') {
            logout();
        } else {
            navigate("/login")
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/flights/availableFlight?flightDirection=${tripType}&departurePort=${departurePort}&arrivalPort=${arrivalPort}&departureDate=${departureDate}&returnDate=${returnDate}`
            );
            setFlights(response.data);
            console.log(response);
            console.log(
                departureDate,
                departurePort,
                arrivalPort,
                noOfAdult,
                noOfChildren,
                noOfInfant,
                returnDate
            );
            const searchDetails = {
                departurePort,
                arrivalPort,
                departureDate,
                returnDate,
                noOfAdult,
                noOfChildren,
                noOfInfant,
                tripType,
            };

            localStorage.setItem("searchDetails", JSON.stringify(searchDetails));
            console.log("saving search:", response.data);

            navigate(`/flight-select`, {
                state: response.data,
                flightDetails: searchDetails,
            });
        } catch (error) {
            console.error(`Error fetching flights:`, error);
            alert(error.response.data);
        }
    };

    const handleDepartureDateChange = (e) => {
        setDepartureDate(e.target.value);
    };

    const handleReturnDateChange = (e) => {
        setReturnDate(e.target.value);
    };

    const firstName = JSON.parse(localStorage.getItem('userFirstName') ?? 'null');

    return (
        <div className="backgroundd">
            <div className="booking-header">
                <div className='header-first'>
                    <button className="btnsty1">
                        <img src="../src/assets/plane-LandingForm.png" alt="Flights" className="icon" /><span className="flight-text">Flights</span>
                    </button>
                    <div className="formimg"><img src="../src/assets/Polygon-Landingform.png" /></div>
                </div>
                <button className="btnsty2" onClick={handleAction}>
                    <img src="../src/assets/loginLandingForm.png" alt="Login" className="icon" /><span className="flight-text">{firstName ? "Logout" : "Log In"}</span>
                </button>
            </div>
            <div className="search-container">
                <form className="search-form" onSubmit={handleSearch}>
                    <div className='form-inputs'>
                        <div className="trip-type">
                            <input
                                type="radio"
                                id="ONE_WAY"
                                name="trip-type"
                                value="ONE_WAY"
                                checked={tripType === 'ONE_WAY'}
                                onChange={handleOptionChange}
                            />
                            <label className="labell1" htmlFor="ONE_WAY">One Way</label>
                            <input
                                type="radio"
                                id="ROUND_TRIP"
                                name="trip-type"
                                value="ROUND_TRIP"
                                checked={tripType === 'ROUND_TRIP'}
                                onChange={handleOptionChange}
                            />
                            <label className="labell2" htmlFor="ROUND_TRIP">Round Trip</label>
                        </div>
                        <div className='form-rows'>
                            <div className="form-row1">
                                <div className="input-groupp">
                                    <label className="labell" htmlFor="from">From</label>
                                    <select id="from" value={departurePort} onChange={(e) => setDeparturePort(e.target.value)}>
                                        <option value="">Select...</option>
                                        {departureOptions?.map((port) => (
                                            <option key={port.iataCode} value={port.iataCode}>
                                                {port.city} ({port.iataCode})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-groupp">
                                    <label className="labell" htmlFor="to">To</label>
                                    <select id="to" value={arrivalPort} onChange={(e) => setArrivalPort(e.target.value)}>
                                        <option value="">Select...</option>
                                        {arrivalOptions?.map((port) => (
                                            <option key={port.iataCode} value={port.iataCode}>
                                                {port.city} ({port.iataCode})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row2">
                                <div className="input-groupp">
                                    <label className="labell" htmlFor="departure">Departure Date</label>
                                    <input type="date" id="departure" value={departureDate} onChange={handleDepartureDateChange} />
                                </div>
                                {tripType === 'ROUND_TRIP' && (
                                    <div className="input-groupp">
                                        <label className="labell" htmlFor="return">Arrival Date</label>
                                        <input type="date" id="return" value={returnDate} onChange={handleReturnDateChange} />
                                    </div>
                                )}
                            </div>
                            <div className="form-row3">
                                <div className="input-group">
                                    <label className="labell" htmlFor="child">Child</label>
                                    <select id="child" type="number" value={noOfChildren} onChange={e => setNoOfChildren(e.target.value)}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="labell" htmlFor="adult">Adult</label>
                                    <select id="adult" value={noOfAdult} type="number" onChange={e => setNoOfAdult(e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="labell" htmlFor="infant">Infant</label>
                                    <select id="infant" value={noOfInfant} type="number" onChange={e => setNoOfInfant(e.target.value)}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="search-button" type='submit'><div className='search-button-text'>Search Flights</div></button>
                </form>
            </div>
        </div>
    );
};

export default Search;
