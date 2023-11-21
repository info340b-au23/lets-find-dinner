import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Box, Slider } from "@mui/material";
import { useState } from "react";

const MIN_TIME_PERIOD = 15;

export function FiltersPanel(props) {
    return (
        <Col lg="3">
            <section id="search-filters">
                <Row className="shadow-lg sub-section-title">
                    <h2>Filters</h2>
                </Row>
                <Row>
                    <Col md="6" lg="12">
                        <TimeFilters
                            days={props.days}
                            dayCallback={props.dayCallback}
                            timeCallback={props.timeCallback}
                        />
                        <LocationFilters
                            cities={props.cities}
                            cityCallback={props.cityCallback}
                        />
                    </Col>
                    <Col md="6" lg="12">
                        <DonationFilters
                            donationTypes={props.donationTypes}
                            donationCallback={props.donationCallback}
                        />
                    </Col>
                </Row>
            </section>
        </Col>
    );
}

function TimeFilters(props) {
    const [time, setTime] = useState([480, 1200]);
    const [displayTime, setDisplayTime] = useState(["8:00 a.m.", "8:00 p.m."])

    const handleTimeChange = (event, newValue, activeThumb) => {
        let newTime;
        if (activeThumb === 0) {
            newTime = [Math.min(newValue[0], time[1] - MIN_TIME_PERIOD), time[1]];
        } else {
            newTime = [time[0], Math.max(newValue[1], time[0] + MIN_TIME_PERIOD)];
        }
        const updatedDisplayTime = newTime.map((time) => {
            let timeOfDay = "a.m.";
            let updatedHour = Math.floor(time / 60);
            const updatedMinutes = time % 60;
            if (updatedHour >= 12) {
                timeOfDay = "p.m.";
                updatedHour = updatedHour === 12 ? updatedHour : updatedHour - 12;
            }
            return updatedHour + ":" + (updatedMinutes === 0 ? "00" : updatedMinutes) + " " + timeOfDay;
        });
        props.timeCallback(newTime);
        setDisplayTime(updatedDisplayTime);
        setTime(newTime);
    };

    const weekdayFilters = props.days.map((day) => {
        return <CheckBoxFilter name={day} prefix="time" callback={props.dayCallback} key={day} />;
    });

    return (
        <Row className="filter-category" id="filter-time">
            <h3>Hours of Operation</h3>
            <Form>
                <h4>Day of Week</h4>
                {weekdayFilters}
                <h4>Time Period</h4>
                <Box sx={{width: {xs: 0.8}, fontFamily: "Montsserat, Trebuchet MS, Arial, sans-serif"}} >
                    <p className="time-filter-label">{displayTime[0] + " - " + displayTime[1]}</p>
                    <Slider
                        id="time-slider-input"
                        getAriaLabel={() => { return "Filter food banks by hours of operation"; }}
                        value={time}
                        min={480}
                        max={1200}
                        step={15}
                        onChange={handleTimeChange}
                        valueLabelDisplay="off"
                        getAriaValueText={(value, idx) => { return displayTime[idx]; }}
                        disableSwap
                    />
                </Box>
            </Form>
        </Row>
    );
}

function LocationFilters(props) {
    const [selectedLocation, setSelectedLocation] = useState("");
    
    const handleChange = (event) => {
        const newLocation = event.target.value;
        props.cityCallback(newLocation);
        setSelectedLocation(newLocation);
    };

    const cityOptions = props.cities.map((city) => {
        return <option key={city} value={city}>{city}</option>
    });

    return (
        <Row className="filter-category" id="filter-location">
            <h3>Location</h3>
            <Form>
                <Form.Select
                    id="location-select-input"
                    aria-label="Location select input"
                    value={selectedLocation}
                    onChange={handleChange}
                >
                    <option value="">All Cities</option>
                    {cityOptions}
                </Form.Select>
            </Form>
        </Row>
    );
}

function DonationFilters(props) {
    const donationFilters = props.donationTypes.map((donation) => {
        return <CheckBoxFilter name={donation} prefix="donation" callback={props.donationCallback} key={donation} />;
    });
    
    return (
        <Row className="filter-category" id="filter-donation">
            <h3>Donation Requests</h3>
            <Form>
                {donationFilters}
            </Form>
        </Row>
    );
}

function CheckBoxFilter(props) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        props.callback(event.target.name);
        setChecked(!checked);
    }

    const elementID = props.prefix + "-" + props.name;

    return (
        <div className="input-element">
            <input
                type="checkbox"
                id={elementID}
                name={props.name}
                checked={checked}
                onChange={handleChange}
            />
            <Form.Label htmlFor={elementID}>{props.name[0].toUpperCase() + props.name.substring(1)}</Form.Label>
        </div>
    );
}