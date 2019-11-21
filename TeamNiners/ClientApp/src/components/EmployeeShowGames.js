import React, { Component } from 'react';
import { Col, Grid, Row, Button} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ShowGamesPage.css';

import { webAddress } from './reference/reference';


export class EmployeeShowGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePage: false, games: [], filterValue: 'name_desc' };
        this.goToDashboard = this.goToDashboard.bind(this);
        this.filterGames = this.filterGames.bind(this);
        this.getGames = this.getGames.bind(this);
        this.getGames();
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

    getGames() {       
        axios.get(webAddress + 'api/game/showgames_business/' + this.state.filterValue)
            .then(res => {
                const games = res.data;
                this.setState({ games });
                console.log(res.data);
                //this.setState({ gamePlatforms: res.data })
                //this.setState({
                //    businessCity: res.data[0].businessCity
                //});
            })
    }

    deleteGame(gId) {

        axios.post(webAddress + 'api/game/deleteGameItem/' + gId)
        .then(res => {
            console.log(res.data);
            alert("Game has been successfully deleted");
            this.getGames()
        })
    }
    gotToEditPage(gId) {
        axios.post(webAddress + 'api/game/postId/' + gId)
            .then(res => {
                console.log(res.data);
                this.props.changePage(11);
            })
    }

    filterGames(select) {

        var text = select.target.value;
        this.state.filterValue = text;
        this.getGames();

    }


    render() {
        return (
            <div>
                <div id="dashboardContainer">
                    <Grid fluid>
                        <Row>
                            <Col xl={12} id="filterColumn">
                             
                                <div id="filterBar">
                                    <Link to={"/Dashboard"}>
                                        <span id="backButton" onClick={() => this.goToDashboard()} className="glyphicon glyphicon-arrow-left fa-lg" aria-hidden="true"></span>
                                    </Link>
                                    <select onChange={this.filterGames}>
                                        <option value="name_desc">Name: Descending</option>
                                        <option value="name_asc">Name: Ascending</option>
                                        <option value="price_hl">Price: High to Low</option>
                                        <option value="price_lh">Price: Low to High</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div>
                                <h1 id="pageTitle"><b>Show Games Page</b></h1>
                                <ul>
                                     

                                    {this.state.games.map(game =>
                                        

                                        <div key={game.gameId} id="showGameItem">

                                            <Grid fluid>
                                                <Row>
                                                    <Col xl={12} id="gameColumn">
                                                        <label htmlFor="gameNameLabel">Title:</label>
                                                        <input type="text" className="form-control" id="gameInputBox" placeholder={game.title} readOnly />

                                                        <label htmlFor="gameDescriptionLabel">Description:</label>
                                                        <input type="text" className="form-control" id="gameInputBox" placeholder={game.description} readOnly />

                                                        <label htmlFor="gameReleaseLabel">Release Date:</label>
                                                        <input type="text" className="form-control" id="gameInputBox" placeholder={game.releaseDate} readOnly />

                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xl={12} id="gameColumn2">
                                                        <label htmlFor="gamePlatformLabel">Platform:</label>
                                                        <input type="text" className="form-control" id="gameInputBox" placeholder={game.platform} readOnly />

                                                        <label htmlFor="gameCategoryLabel">Category:</label>
                                                        <input type="text" className="form-control" id="gameInputBox" placeholder={game.category} readOnly />

                                                        <label htmlFor="gamePriceLabel">Price:</label>
                                                        <input type="text" className="form-control" id="gameInputBox" placeholder={game.price} readOnly />
                                                        <br/>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Button type="button" className="btn btn-small btn-info btn-block" id="" onClick={() => this.gotToEditPage(game.gameId)}>Edit Game</Button>
                                                    <Button type="button" className="btn btn-small btn-danger btn-block" id="" onClick={() => this.deleteGame(game.gameId)}>Delete Game</Button>
                                                </Row>

                                            </Grid>
                                       

                                        </div>
                                        
                                        )}

                                   
                                </ul>
                            </div>
                        </Row>
                    </Grid>
                </div>

            </div>
        );
    }
}