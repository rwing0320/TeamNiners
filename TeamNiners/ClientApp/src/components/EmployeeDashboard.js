import React, { Component } from 'react';
import { Col, Grid, Row, Glyphicon, Carousel, Button } from 'react-bootstrap';
import axios from 'axios';
import './css/Dashboard.css';
import ryansRacerImage from './img/ryansRacerCarouselImage.jpg';
import { Redirect, Route } from 'react-router-dom';

export class Dashboard extends Component {
    displayName = "Employee Dashboard"
    displayName = Dashboard.name

    constructor(props) {
        super(props);
        this.state = { changePage: 0 };

        
    }

    changePage(pageNum) {
        this.setState({changePage: pageNum})
    }

    goToGameMod() {

        if (this.state.changePage == 1) {
            //return <Redirect to='/ModifyGame' />

              return  <Redirect to={{
                pathname: '/ModifyGame',
                state: { id: this.props.location.state.id, location: 1 }
                }}
                />

        } else if (this.state.changePage == 2) {
            return <Redirect to='/ShowGames' />
        }
        else if (this.state.changePage == 3) {
            return <Redirect to='/Report' />
        }
    }


    myFunction = () => {
        console.log("test");
        axios.get('http://localhost:50272/api/APIBusinesses')
            .then(res => {
                console.log(res.data);
            })

    }


    render() {
        return (
            <div>
                {this.goToGameMod()}
                <div id="dashboardContainer">
                    <Grid fluid>
                        <Row>
                            <Col xl={12} id="gameButtonsColumn">
                                <button href="#" id="gameButton" onClick={() => this.changePage(1)}>
                                    Add Game
                                </button>

                                <button href="" id="gameButton" onClick={() => this.changePage(2)}>
                                    Show Games
                                </button>

                                <button href="" id="gameButton" onClick={() => this.changePage(3)}>
                                    Reports
                                </button>
                            </Col>
                        </Row>


                        <Row>
                            <Col xl={12} id="widgetOne">
                                <h3 id="widgetTitle">Game Insights</h3>
                                <table className="table">
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
                                        <img src={ryansRacerImage} className="d-block w 100" id="ryansRacerImage" />
                                        <Carousel.Caption id="ryansRacerCaption">
                                            <h2 id="captionTitle">Ryan's Racer</h2>
                                            <h3 id="captionDescription">A next generation street racing game by RatedGeek based in Toronto, Canada.</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>


                                    <Carousel.Item>
                                        <img src={ryansRacerImage} className="d-block w 100" id="ryansRacerImage" />
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
                                    <div className="form-group" id="oldPassword">
                                        <label>Old Password</label>
                                        <span> <br /> <br /> </span>
                                        <input type="password" className="form-control" />
                                        <span> <br /> <br /> </span>

                                    </div>


                                    <div className="form-group" id="newPassword">
                                        <label>New Password</label>
                                        <span> <br /> <br /> </span>
                                        <input type="password" className="form-control" />
                                        <span> <br /> <br /> </span>
                                    </div>

                                    <div className="form-group" id="confirmPassword">
                                        <label>Confirm Password</label>
                                        <span> <br /> <br /> </span>
                                        <input type="password" className="form-control" />
                                        <span> <br /> <br /> </span>
                                    </div>

                                    <div className="form-group" id="submissionDiv">
                                        <button className="btn btn-light">Submit</button>

                                        <span> <br /> <br /> </span>
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
