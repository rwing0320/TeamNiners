import React, { Component } from 'react';
import { Col, Grid, Row, Glyphicon, Button, Accordion, Panel } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Redirect, Route } from 'react-router-dom';
import { EmployeeNav } from './EmployeeNav';
import { Link } from 'react-router-dom';


export class EmployeeGameReport extends Component {
    constructor(props) {
        super(props);
        this.state = { changePage: false, listName: "", gameList: false, gameDetail: false, info: [], gameCategories: [], gamePlatforms: [], platformID: 0, platformName: "" };

        this.listInput = null;
        this.makeChange = this.makeChange.bind(this);

        axios.get('http://localhost:50524/api/game/showgames_business')
            .then(res => {
                console.log(res.data);
                this.setState({ info: res.data })
   
            })

        super(props);
        this.state = { changePage: false };
        this.goToDashboard = this.goToDashboard.bind(this);
    }


    changePage() {
        this.setState({ changePage: true })
    }

    goToDashboard() {
        this.props.changePage(1)
    }
    makeChange(event) {
        this.state.listName = event.target.value;
        if (this.state.listName == "gameList") {
            this.setState({ gameList: true })
            this.setState({ gameDetail: false })
        }
        if (this.state.listName == "gameDetail") {
            this.setState({ gameList: false })
            this.setState({ gameDetail: true })


        }
        if (this.state.listName != "gameList" && this.state.listName != "gameDetail") {
            this.setState({ gameList: false })
            this.setState({ gameDetail: false })
        }
    }

    exportPDF() {
        const doc = new jsPDF();
        doc.autoTable({ html: '.table' });
        doc.save('table.pdf');
    }

    changePage() {
        this.setState({ changePage: true })
    }

    goToDashboard() {
        if (this.state.changePage) {
            return <Redirect to='/dashboard' />
        }
    }

    render() {

        if (this.state.gameList == true) {
            return (
                <div>
                    <div id="dashboardContainer">
                        <Grid fluid>
                            <Row>
                                <Col xl={12} id="widgetOne">
                                    <h3 id="widgetTitle">All Reports</h3>
                                    <form action="/action_page.php">
                                        <span class="choose">Choose Report: </span>
                                        <select name="chooseReport" onChange={this.makeChange}>
                                            <option value=""></option>
                                            <option value="gameList">Game List</option>
                                            <option value="gameDetail">Game Detail</option>
                                        </select>
                                    </form>



                                    <h4 id="widgetTitle">Game Lists</h4>
                                    <table className="table1">
                                        <thead>
                                            <tr>
                                                <th>Game Name</th>
                                                <th>Copies Sold <Glyphicon glyph="ok" /></th>
                                                <th>Average Rating <Glyphicon glyph="thumbs-up" id="ratingIcon" /></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.info.map(gameInfo =>
                                                <tr key={gameInfo.gameID}>
                                                    <td>{gameInfo.gameTitle}</td>
                                                    <td>{gameInfo.gameDescription}</td>
                                                    <td>{gameInfo.gamePrice}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>

                        </Grid>
                    </div>
                    {this.goToDashboard()}
                    <h1>Game Report Page</h1>
                    <Link to={'/DashBoard'}>
                        <button onClick={() => this.goToDashboard()}>Back</button>
                    </Link>

                </div>
            );
        }

        else if (this.state.gameDetail == true) {
            return (

                <div>
                    <div id="dashboardContainer">
                        <Grid fluid>
                            <Row>
                                <Col xl={12} id="widgetOne">
                                    <h3 id="widgetTitle">All Reports</h3>
                                    <form action="/action_page.php">
                                        <span class="choose">Choose Report: </span>
                                        <select name="chooseReport" onChange={this.makeChange}>
                                            <option value=""></option>
                                            <option value="gameList">Game List</option>
                                            <option value="gameDetail">Game Detail</option>
                                        </select>
                                    </form>



                                    <h4 id="widgetTitle">Game Detail</h4>
                                    <table className="table">
                                        <caption>Game Detail</caption>
                                        <thead>
                                            <tr>
                                                <th>Game Name</th>
                                                <th>Game Description</th>
                                                <th>Release Date</th>
                                                <th>Platform</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.info.map(gameInfo =>
                                                <tr key={gameInfo.id}>
                                                    <td>{gameInfo.title}</td>
                                                    <td>{gameInfo.description}</td>
                                                    <td>{gameInfo.releasedate}</td>
                                                    <td>{gameInfo.platform}</td>
                                                    <td>{gameInfo.category}</td>
                                                    <td>${gameInfo.price}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <button onClick={() => this.exportPDF()}>Generate Report</button>
                                </Col>
                            </Row>

                        </Grid>
                    </div>
                    {this.goToDashboard()}
                    <h1>Game Report Page</h1>
                    <Link to={'/DashBoard'}>
                        <button onClick={() => this.goToDashboard()}>Back</button>
                    </Link>


                </div>
            );
        }
        else {
            return (
                <div>
                    <div id="dashboardContainer">
                        <Grid fluid>
                            <Row>
                                <Col xl={12} id="widgetOne">
                                    <h3 id="widgetTitle">All Reports</h3>
                                    <form action="/action_page.php">
                                        <span>Choose Report: </span>
                                        <select name="chooseReport" onChange={this.makeChange}>
                                            <option value=""></option>
                                            <option value="gameList">Game List</option>
                                            <option value="gameDetail"> Game Detail</option>
                                        </select>
                                    </form>



                                </Col>
                            </Row>

                        </Grid>
                    </div>
                    {this.goToDashboard()}
                    <h1>Game Report Page</h1>
                    <Link to={'/DashBoard'}>
                        <button onClick={() => this.goToDashboard()}>Back</button>
                    </Link>


                </div>
            );
        }
    }
}