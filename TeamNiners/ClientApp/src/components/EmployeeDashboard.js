import React, { Component } from 'react';
import { Col, Grid, Row, Glyphicon, Carousel, Button } from 'react-bootstrap';
import axios from 'axios';
import './css/Dashboard.css';
import ryansRacerImage from './img/ryansRacerCarouselImage.jpg';
import { Redirect, Link } from 'react-router-dom';

import { webAddress } from './reference/reference';

export class Dashboard extends Component {
    displayName = "Employee Dashboard"
    displayName = Dashboard.name

    constructor(props) {
        super(props);
        this.state = { changePage: 0, businessId: 0, oldPassword: "", newPassword: "", newPasswordConfirmation: "" };
        this.oldPasswordInput = null;
        this.newPasswordInput = null;
        this.newPasswordConfirmationInput = null;
        this.setOldPassword = this.setOldPassword.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
        this.setNewPasswordConfirmation = this.setNewPasswordConfirmation.bind(this);
        this.changePassword = this.changePassword.bind(this);

        axios.get(webAddress + 'api/users/getEmployeeId')
            .then(res => {
                console.log("The business ID for dashboard is: " + res.data);
                this.setState({ businessId: res.data })
                //this.setState({
                //    businessCity: res.data[0].businessCity
                //});

            })
            .catch(function (error) {
                // errorMessage = ""
                console.log("this is the error on the login page for saving the id: " + error);
            });
    }

    changePage(pageNum) {
        this.props.changePage(pageNum);
    }

    goToGameMod() {

        if (this.state.changePage == 1) {
            //return <Redirect to='/ModifyGame' />

            return <Redirect to={{
                pathname: '/ModifyGame',
                state: { id: this.state.businessId, location: 1 }
            }}
            />

        } else if (this.state.changePage == 2) {
            return <Redirect to='/ShowGames' />
        }
        else if (this.state.changePage == 3) {
            return <Redirect to='/Report' />
        }
        else if (this.state.changePage == 5) {
            return <Redirect to='/EditGame' />
        }

    }
        
    setOldPassword(event) {
        this.state.oldPassword = event.target.value;
        console.log(this.state.oldPassword);
    }

    setNewPassword(event) {
        this.state.newPassword = event.target.value
    }

    setNewPasswordConfirmation(event) {
        this.state.newPasswordConfirmation = event.target.value
    }

    

    async changePassword() {

        var isLoggedOut = false;

        axios.put(webAddress + 'api/users/changepassword',
            {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                newPasswordConfirmation: this.state.newPasswordConfirmation

                
            })
            .then(res => {
                axios.post(webAddress + 'api/users/Logout', {

                })
                    .then(function (response) {
                        console.log(response);
                        isLoggedOut = true;
                       
                    })
                    .catch(function (error) {
                        console.log("this is the error: " + error);

                    });
                    console.log("Test");
                   
            })
         this.props.updateParentState();
    }




    render() {
        return (
            <div>
                {this.goToGameMod()}
                <div id="dashboardContainer">
                    <Grid fluid>
                        <Row>
                            <Col xl={12} id="gameButtonsColumn">
                                <Link to={'/GameMod'}>
                                    <button href="#" className="gameButton" id="addGame" onClick={() => this.changePage(2)}>
                                        Add Game
                                    </button>
                                </Link>

                                <Link to={'/ShowGames'}>
                                    <button href="" className="gameButton" id="showGames" onClick={() => this.changePage(3)}>
                                        Show Games
                                    </button>
                                </Link>

                                <Link to={'/Report'}>
                                    <button href="" className="gameButton" id="reports" onClick={() => this.changePage(4)}>
                                        Reports
                                    </button>
                                </Link>
                            </Col>
                        </Row>


                        <Row>
                            <Col xl={12} id="widgetOne">
                                <h3 id="gameInsightsTitle">Game Insights</h3>
                                <table className="table" id="#gamesTable">
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
                                <h3 id="recentGamesTitle">Recent Games</h3>

                                <Carousel id="gameCarousel">
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
                                <h3 id="accountSettingsTitle">Account Settings</h3>
                                <form>
                                    <div className="form-group" id="oldPassword">
                                        <label id="passwordLabel">Old Password</label>
                                        <span> <br /> <br /> </span>
                                        <input type="password" minLength="8" ref={elem => (this.oldPasswordInput = elem)} onChange={this.setOldPassword} className="form-control" required autoFocus />
                                        <span> <br /> <br /> </span>

                                    </div>


                                    <div className="form-group" id="newPassword">
                                        <label id="passwordLabel">New Password</label>
                                        <span> <br /> <br /> </span>
                                        <input type="password" ref={elem => (this.newPasswordInput = elem)} onChange={this.setNewPassword} className="form-control" required />
                                        <span> <br /> <br /> </span>
                                    </div>

                                    <div className="form-group" id="confirmPassword">
                                        <label id="passwordLabel">Confirm Password</label>
                                        <span> <br /> <br /> </span>
                                        <input type="password" ref={elem => (this.newPasswordConfirmationInput = elem)} onChange={this.setNewPasswordConfirmation} className="form-control" required />
                                        <span> <br /> <br /> </span>
                                    </div>

                                    <div className="form-group" id="submissionDiv">
                                        <Button onClick={this.changePassword} className="btn btn-light">Submit</Button>

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
