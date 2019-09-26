import React, { Component } from 'react';
import { Col, Grid, Row, Glyphicon, Carousel } from 'react-bootstrap';
import axios from 'axios';
import './Dashboard.css';
import ryansRacerImage from './Images/ryansRacerCarouselImage.jpg';

export class Dashboard extends Component {
    displayName = "Employee Dashboard"

    constructor(props) {
        super(props);
        this.state = {};
    }


    myFunction = () => {
        console.log("test");
        axios.get('http://localhost:54047/api/APIBusinesses')
            .then(res => {
                console.log(res.data);
            })

    }


    render() {
        return (
            <div>

                <div id="dashboardContainer">
                    <Grid fluid>
                        <Row>
                            <Col xl={12} id="gameButtons">
                                <button href="#" class="btn btn-info">
                                    Add Game
                                </button>

                                <button href="" class="btn btn-info">
                                    Show Games
                                </button>

                                <button href="" class="btn btn-info">
                                    Reports
                                </button>
                            </Col>
                        </Row>


                        <Row>
                            <Col xl={12} id="widgetOne">
                                <h3 id="widgetTitle">Game Insights</h3>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Game Name</th>
                                            <th>Copies Sold <Glyphicon glyph="ok" /></th>
                                            <th>Average Rating <Glyphicon glyph="thumbs-up" id="ratingIcon" /></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th scope="col">Sam's Shooter</th>
                                            <td>3350</td>
                                            <td>7.8</td>
                                        </tr>

                                        <tr>
                                            <th scope="col">Fahad's Platformer</th>
                                            <td>5915</td>
                                            <td>8.3</td>

                                        </tr>

                                        <tr>
                                            <th scope="col">Ryan's Racer</th>
                                            <td>4289</td>
                                            <td>8.6</td>
                                        </tr>

                                    </tbody>
                                </table>

                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} id="widgetTwo">
                                <h3 id="widgetTitle">Recent Games</h3>

                                <Carousel>
                                    <Carousel.Item>
                                        <img src={ryansRacerImage} class="d-block w 100" id="ryansRacerImage" />
                                        <Carousel.Caption id="ryansRacerCaption">
                                            <h2 id="captionTitle">Ryan's Racer</h2>
                                            <h3 id="captionDescription">A next generation street racing game by RatedGeek based in Toronto, Canada.</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>


                                    <Carousel.Item>
                                        <img src={ryansRacerImage} class="d-block w 100" id="ryansRacerImage" />
                                        <Carousel.Caption id="ryansRacerCaption">
                                            <h2 id="captionTitle">Fahad's Platformer</h2>
                                            <h3 id="captionDescription">A new take on a classic jumping game.</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>

                            </Col>

                            <Col md={6} id="widgetThree">
                                <h3 id="widgetTitle">Account Settings</h3>
                                <form>
                                    <div class="form-group" id="oldPassword">
                                        <label>Old Password</label>
                                        <span> <br /> <br /> </span>
                                        <input type="password" class="form-control" />
                                        <span> <br /> <br /> </span>

                                    </div>


                                    <div class="form-group" id="newPassword">
                                        <label>New Password</label>
                                        <span> <br /> <br /> </span>
                                        <input type="password" class="form-control" />
                                        <span> <br /> <br /> </span>
                                    </div>

                                    <div class="form-group" id="confirmPassword">
                                        <label>Confirm Password</label>
                                        <span> <br /> <br /> </span>
                                        <input type="password" class="form-control" />
                                        <span> <br /> <br /> </span>
                                    </div>

                                    <div class="form-group" id="submissionDiv">
                                        <button class="btn btn-light">Submit</button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Grid>
                </div>

            </div>
        );
    }
}
