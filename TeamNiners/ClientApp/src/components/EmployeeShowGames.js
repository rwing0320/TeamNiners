import React, { Component } from 'react';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ShowGamesPage.css';

import { webAddress } from './reference/reference';


export class EmployeeShowGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePage: false, games: [], filter: "h-l" };
        this.goToDashboard = this.goToDashboard.bind(this);
        this.filterGames = this.filterGames.bind(this);
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
        axios.get(webAddress + 'api/game/showgames_business')
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

    filterGames(select) {

        var text = select.target.value;
        this.state.filter = text;
        alert(this.state.filter);


        if (text == 'price_hl') {
            this.setState
        }

        if (text == 'price_lh') {

        }

        if (text == 'name_desc') {

        }

        if (text == 'name_asc') {

        }



    }


    render() {
        return (
            <div>
                <div id="dashboardContainer">
                    <Grid fluid>
                        <Row>
                            <Col xl={12} id="filterColumn">
                                <div id="filterBar">
                                    <select onChange={this.filterGames}>
                                        <option value="price_hl">Price: High to Low</option>
                                        <option value="price_lh">Price: Low to High</option>
                                        <option value="name_desc">Name: Descending</option>
                                        <option value="name_asc">Name: Ascending</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div>
                                <h1>Show Games Page</h1>
                                <ul>
                                     

                                    {this.state.games.map(game =>
                                        

                                        <div key={game.gameId} id="showGameItem">
                                            
                                            <h5><b>Name:</b> {game.title}</h5>
                                            <h5><b>Description:</b> {game.description}</h5>
                                            <h5><b>Release Date:</b> {game.releaseDate}</h5>
                                            <h5><b>Platform:</b> {game.platform}</h5>
                                            <h5><b>Category:</b> {game.category}</h5>
                                            <h5><b>Price:</b> ${game.price}</h5>

                                        </div>
                                        
                                        )}

                                   
                                </ul>

                                
                                <Link to={"/Dashboard"}>
                                    <button onClick={() => this.goToDashboard()}>Back</button>
                                </Link>
                            </div>
                        </Row>
                    </Grid>
                </div>

            </div>
        );
    }
}