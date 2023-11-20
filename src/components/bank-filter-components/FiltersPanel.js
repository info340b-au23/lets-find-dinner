import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";

export function FiltersPanel(props) {
    // TODO: add filters to filter.json

    return (
        <Col lg="3">
            <section id="search-filters">
                <Row className="shadow-lg sub-section-title">
                    <h2>Filters</h2>
                </Row>
                <Row>
                    <TimeFilters days={props.days} dayCallback={props.dayCallback} />
                </Row>
            </section>
        </Col>
    );

    return (
        <div className="col-lg-3">
            <section id="search-filters">
                <div className="row shadow-lg sub-section-title">
                    <h2>Filters</h2>
                </div>
                <section className="filter-category" id="filter-time">
                    <h4>Time Period</h4>
                    <div className="input-element">
                        <p>7:00 AM - 8:30 PM</p>
                        <input id="time-hours" type="range" name="time-hours" min="0" max="100" step="4" />
                    </div>
                </section>    
                <section className="filter-category" id="filter-donation">
                    <h3>Donation Requests</h3>
                    <div className="input-element">
                        <input id="donation-produce" type="checkbox" name="donation-produce" />
                        <label htmlFor="donation-produce">Fruits, Vegetables</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-bread" type="checkbox" name="donation-bread" />
                        <label htmlFor="donation-bread">Bread, Rice, Pasta</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-dairy" type="checkbox" name="donation-dairy" />
                        <label htmlFor="donation-dairy">Milk and Dairy</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-poultry" type="checkbox" name="donation-poultry" />
                        <label htmlFor="donation-poultry">Poultry (Chicken, Turkey)</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-redmeat" type="checkbox" name="donation-redmeat" />
                        <label htmlFor="donation-redmeat">Red Meat (Beef, Pork)</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-nonperishables" type="checkbox" name="donation-nonperishables" />
                        <label htmlFor="donation-nonperishables">Boxed, Canned Foods</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-clothing" type="checkbox" name="donation-clothing" />
                        <label htmlFor="donation-clothing">Clothing</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-bedding" type="checkbox" name="donation-bedding" />
                        <label htmlFor="donation-bedding">Bedding, Sheets, Blankets</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-toiletries" type="checkbox" name="donation-toiletries" />
                        <label htmlFor="donation-toiletries">Toiletries</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-baby" type="checkbox" name="donation-baby" />
                        <label htmlFor="donation-baby">Baby/Infant Food, Diapers</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-cleaning" type="checkbox" name="donation-cleaning" />
                        <label htmlFor="donation-cleaning">Cleaning Supplies</label>
                    </div>
                </section>
                <section className="filter-category" id="filter-location">
                    {/* Possibly change to select city instead; alternatively based location on navigator.geolocate (js) */}
                    <h3>Location</h3>
                        <fieldset>
                            {/* <div className="input-element">
                                <input id="location-all" type="radio" name="location-radius" checked />
                                <label htmlFor="location-all">Any Location</label> 
                            </div>
                            <div className="input-element">
                                <input id="location-5" type="radio" name="location-radius" />
                                <label htmlFor="location-5">Within 5 Miles</label> 
                            </div>
                            <div className="input-element">
                                <input id="location-10" type="radio" name="location-radius" />
                                <label htmlFor="location-10">Within 10 Miles</label> 
                            </div>
                            <div className="input-element">
                                <input id="location-20" type="radio" name="location-radius" />
                                <label htmlFor="location-20">Within 20 Miles</label> 
                            </div> */}
                        </fieldset>
                </section>
            </section>
        </div>
    );
}

const MIN_TIME_PERIOD = 15;

function TimeFilters(props) {
    const [time, setTime] = useState([480, 1200]);
    const [displayTime, setDisplayTime] = useState(["8:00 a.m.", "8:00 p.m."])

    const handleTimeChange = (event, newValue, activeThumb) => {
        if (activeThumb === 0) {
            setTime([Math.min(newValue[0], time[1] - MIN_TIME_PERIOD), time[1]]);
        } else {
            setTime([time[0], Math.max(newValue[1], time[0] + MIN_TIME_PERIOD)]);
        }
    };

    const weekdayFilters = props.days.map((day) => {
        return <CheckBoxFilter name={day} dayCallback={props.dayCallback} key={day} />;
    });

    return (
        <Col md="6" lg="12" className="filter-category" id="filter-time">
            <h3>Hours of Operation</h3>
            <Form>
                <h4>Day of Week</h4>
                {weekdayFilters}
                <h4>Time Period</h4>
                <Box sx={{width: {lg: 0.8}}} >
                    <Typography />
                    <Slider
                        getAriaLabel={() => 'Filter food banks by hours of operation'}
                        value={time}
                        min={480}
                        max={1200}
                        step={15}
                        onChange={handleTimeChange}
                        valueLabelDisplay="off"
                        // getAriaValueText={valuetext}
                        disableSwap
                    />
                </Box>
            </Form>
        </Col>
    );
}

function CheckBoxFilter(props) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        props.dayCallback(event.target.name);
        setChecked(!checked);
    }

    const timeID = "time-" + props.name;

    return (
        <div className="input-element">
            <input
                type="checkbox"
                id={timeID}
                name={props.name}
                checked={checked}
                onChange={handleChange}
            />
            <Form.Label htmlFor={timeID}>{props.name}</Form.Label>
        </div>
    );
}