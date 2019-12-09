import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Clock from "react-live-clock";
import DynamicMultiSeriesChart from "./displayCharts"

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

require("./navbar.css");

//test chartcode
const chart = require("./displayCharts")



window.onload = function () {



    //
    document.getElementById("showtempC").checked = false;

    document.getElementById("showtempC").onclick = function () {
        const showTempCVal = document.getElementById("showtempC").checked;
        console.log(showTempCVal);
    };

    document.getElementById("showtempF").checked = true;

    document.getElementById("showtempF").onclick = function () {
        const showTempCVal = document.getElementById("showtempF").checked;
        console.log(showTempCVal);
    };

    document.getElementById("showhumidity").checked = true;

    document.getElementById("showhumidity").onclick = function () {
        const showTempCVal = document.getElementById("showhumidity").checked;
        console.log(showTempCVal);
    };

    document.getElementById("showgroundmoisture").checked = false;

    document.getElementById("showgroundmoisture").onclick = function () {
        const showTempCVal = document.getElementById("showgroundmoisture").checked;
        console.log(showTempCVal);
    };

    document.getElementById("openNav").onclick = function () {
        document.getElementById("mySidenav").style.width = "250px";
    };

    document.getElementById("closeNav").onclick = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
};

const App = () => (
    <>
        <Navbar bg="light">
            <Navbar.Brand href="#home">Sensor Network Project</Navbar.Brand>
        </Navbar>

        {/* open Config menu */}
        <span class="mouseSelect" id="openNav"> &#9776; Config </span>

        {/* Side nav setup */}
        <div id="mySidenav" class="sidenav">
            <h2 id="sideNavTitle">Config</h2>
            <a href="javascript:void(0)" class="closebtn" id="closeNav"> &times;</a>
            <div>
                <input type="checkbox" id="showtempC" name="showtempC" />
                <label for="showtempC">TempC</label>
            </div>
            <div>
                <input type="checkbox" id="showtempF" name="showtempF" />
                <label for="showtempF">TempF</label>
            </div>
            <div>
                <input type="checkbox" id="showhumidity" name="showhumidity" />
                <label for="showhumidity">Humidity</label>
            </div>
            <div>
                <input type="checkbox" id="showgroundmoisture" name="showgroundmoisture" checked='false' />
                <label for="showgroundmoisture">Ground Moisture</label>
            </div>
        </div>

        <Container>
            <Row>
                <Col align="left" >
                    {/* clock displayed here */}
                    <h3 className="text-center">
                        <Clock
                            format={"dddd, MMMM Do YYYY, HH:mm:ss A"}
                            ticking={true}
                            timezone={"US/Pacific"}
                        />
                    </h3>
                    {/* chart is displayed here */}
                    <DynamicMultiSeriesChart/>
                </Col>
                <Col className="text-center" align="right" md="auto">
                    <h5>Sensor Node Select</h5>
                    <div class="vertical-menu">
                        <a href="#" class="active">Sensor Node 1</a>
                        <a href="#">Sensor Node 2</a>
                        <a href="#">Sensor Node 3</a>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
);

ReactDOM.render(<App />, document.getElementById("root"));
