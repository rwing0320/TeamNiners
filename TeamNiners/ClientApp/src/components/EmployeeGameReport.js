import React, { Component } from 'react';
import { Col, Grid, Row, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import './css/Report.css';
import { webAddress } from './reference/reference';

export class EmployeeGameReport extends Component {
    constructor(props) {
        super(props);
        this.state = { changePage: false, listName: "", gameList: false, gameDetail: false, info: [], gameCategories: [], gamePlatforms: [], platformID: 0, platformName: "", filterValue: 'name_desc' };

        this.listInput = null;
        this.makeChange = this.makeChange.bind(this);

        axios.get(webAddress + 'api/game/showgames_business/' + this.state.filterValue)
            .then(res => {
                console.log(res.data);
                this.setState({ info: res.data })
   
            })

        this.goToDashboard = this.goToDashboard.bind(this);
    }


    changePage() {
        this.setState({ changePage: true })
    }

    goToDashboard() {
        //if (this.state.changePage) {
        //    return <Redirect to='/dashboard' />
        //}
        this.props.changePage(1)
    }


    makeChange(event) {
        this.state.listName = event.target.value;
        if (this.state.listName === "gameList") {
            this.setState({ gameList: true })
            this.setState({ gameDetail: false })
        }
        if (this.state.listName === "gameDetail") {
            this.setState({ gameList: false })
            this.setState({ gameDetail: true })


        }
        if (this.state.listName !== "gameList" && this.state.listName != "gameDetail") {
            this.setState({ gameList: false })
            this.setState({ gameDetail: false })
        }
    }

    exportDetail() {
        const doc = new jsPDF();
        doc.text('Game Detail Report', 80,10)
        doc.autoTable({ html: '.table' });
        doc.save('GameDetail.pdf');
    }
    exportList() {
        const doc = new jsPDF();
        doc.text('Game List Report', 80, 10)
        doc.autoTable({ html: '.table' });
        doc.save('GameList.pdf');
    }

 

    render() {

        if (this.state.gameList === true) {
            return (
                <div>
                    <div id="dashboardContainer">
                        <Grid fluid>
                            <Row>
                                <Col xl={12} id="widgetOne">
                                    <div id="reportsTitle_andSelect">
                                        <Link to={"/dashboard"}>
                                            <span id="backButton" onClick={() => this.goToDashboard()} className="glyphicon glyphicon-arrow-left fa-lg" aria-hidden="true"></span>
                                        </Link>
                                        <h2 id="widgetTitle">All Reports</h2>
                                        
                                    <form action="/action_page.php">
                                            <span className="choose">Choose Report: </span>
                                            <br />
                                        <select name="chooseReport" onChange={this.makeChange}>
                                            <option value=""></option>
                                            <option value="gameList">Game List</option>
                                            <option value="gameDetail">Game Detail</option>
                                        </select>
                                    </form>
                                    </div>


                                    <h3 id="gameInsightsTitle">Game Lists</h3>
                                    <table className="table" id="#gamesTable1">
                                        <thead>
                                            <tr>
                                                <th>Game Name</th>
                                                <th>Copies Sold <Glyphicon glyph="ok" /></th>
                                                <th>Average Rating <Glyphicon glyph="thumbs-up" id="ratingIcon" /></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                {this.state.info.map(gameInfo =>
                                                    <th scope="col">{gameInfo.title}</th>
                                                    )}
                                                <td>3350</td>
                                                <td>7.8</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div id="generateReportDiv">
                                        <button id="generateReportButton" onClick={() => this.exportList()}>Generate Report</button>
                                    </div>
                                </Col>
                            </Row>

                        </Grid>
                    </div>
                </div>
            );
        }

        else if (this.state.gameDetail === true) {
            return (
                <div>
                    <div id="dashboardContainer">
                        <Grid fluid>
                            <Row>
                                <Col xl={12} id="widgetOne">
                                    <div id="reportsTitle_andSelect">
                                        <Link to={"/Dashboard"}>
                                            <span id="backButton" onClick={() => this.goToDashboard()} className="glyphicon glyphicon-arrow-left fa-lg" aria-hidden="true"></span>
                                        </Link>
                                    <h2 id="widgetTitle">All Reports</h2>
                                    <form action="/action_page.php">
                                            <span className="choose">Choose Report: </span>
                                            <br/>
                                        <select name="chooseReport" onChange={this.makeChange}>
                                            <option value=""></option>
                                            <option value="gameList">Game List</option>
                                            <option value="gameDetail">Game Detail</option>
                                        </select>

                                        </form>
                                     </div>

                                    <h3 id="gameInsightsTitle">Game Details</h3>
                                    <table className="table" id="#gamesTable">
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
                                                    <th scope="col">{gameInfo.title}</th>
                                                    <td>{gameInfo.description}</td>
                                                    <td>{gameInfo.releaseDate}</td>
                                                    <td>{gameInfo.platform}</td>
                                                    <td>{gameInfo.category}</td>
                                                    <td>${gameInfo.price}</td>
                                                </tr>
                                            )}                                                                        

                                        </tbody>
                                    </table>
                                    <div id="generateReportDiv">
                                        <button id="generateReportButton" onClick={() => this.exportDetail()}>Generate Report</button>
                                        </div>
                                </Col>
                            </Row>

                        </Grid>
                    </div>
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
                                    <div id="reportsTitle_andSelect">
                                        <Link to={"/Dashboard"}>
                                            <span id="backButton" onClick={() => this.goToDashboard()} className="glyphicon glyphicon-arrow-left fa-lg" aria-hidden="true"></span>
                                        </Link>
                                    <h2 id="widgetTitle">All Reports</h2>
                                    <form action="/action_page.php">
                                            <span>Choose Report: </span>
                                            <br/>
                                        <select name="chooseReport" onChange={this.makeChange}>
                                            <option value=""></option>
                                            <option value="gameList">Game List</option>
                                            <option value="gameDetail"> Game Detail</option>
                                        </select>
                                    </form>

                                 </div>

                                </Col>
                            </Row>

                        </Grid>
                    </div>
                </div>
            );
        }
    }
}