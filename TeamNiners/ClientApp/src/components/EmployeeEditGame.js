import React, { Component } from 'react';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import './css/EmployeeGameModPage.css';
import { webAddress } from './reference/reference';


export class EmployeeEditGame extends Component {
    displayName = EmployeeEditGame.name

    constructor(props) {
        super(props);
        this.state = { game: [], gamePlatform: [], gameCat: [], date: "", category: 0, platform: 0, gameName: "", gamePlatform: 1, gameCat: 1, gameReleaseDate: "", gameDesc: "", value: "", gameCost: 0, changePage: false  };


        this.onChangePlat = this.onChangePlat.bind(this);
        this.onChangeCat = this.onChangeCat.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeGameName = this.onChangeGameName.bind(this);
        this.onChangeGameDesc = this.onChangeGameDesc.bind(this);
        this.onChangeReleaseDate = this.onChangeReleaseDate.bind(this);
        this.getGame = this.getGame.bind(this);
        this.goToDashboard = this.goToDashboard.bind(this);

        axios.get(webAddress + 'api/GameCategory')
            .then(res => {
                console.log(res.data);
                this.setState({ gameCategories: res.data })
                //this.setState({
                //    businessCity: res.data[0].businessCity
                //});
            })

        axios.get(webAddress + 'api/GamePlatform')
            .then(res => {
                console.log(res.data);
                this.setState({ gamePlatforms: res.data })
                //this.setState({
                //    businessCity: res.data[0].businessCity
                //});
            })

        this.getGame();


    }

    changePage() {
        this.setState({ changePage: true })

    }



    goToDashboard() {
        <Redirect to="/DashBoard" push />
        this.props.changePage(1)

    }

    getGame() {
        axios.get(webAddress + 'api/Game/GetGame/')
            .then(res => {
                var date = res.data[0].releaseDate.split('T')[0];
                var platform = res.data[0].platformId;
                this.setState({ game: res.data, date, platform });
                console.log(res.data);
            })
    }

    onChangePlat(event) {
        this.state.gamePlatform = event.target.value;
        console.log(this.state.gamePlatform);
    }

    onChangeCat(event) {
        this.state.gameCat = event.target.value;
        console.log(this.state.gameCat);
    }

    onChangeCost(event) {
        this.state.gameCost = event.target.value;
        console.log(this.state.gameCost);
    }

    onChangeGameName(event) {
        this.state.gameName = event.target.value;
        console.log(this.state.gameCost);
    }


    onChangeGameDesc(event) {
        this.state.gameDesc = event.target.value;
        console.log(this.state.gameDesc);
    }

    onChangeReleaseDate(event) {
        this.state.gameReleaseDate = event.target.value;
        console.log(this.state.gameReleaseDate);
    }

    async editGame() {
        axios.put(webAddress + 'api/Game/editGameItem',
            {
                GameTitle: this.state.gameName,
                GameDescription: this.state.gameDesc,
                ReleaseDate: this.state.gameReleaseDate,
                GamePlatform: this.state.gamePlatform,
                GameCategory: this.state.gameCat,
                GamePrice: this.state.gameCost
            })
            .then(res => {
                console.log(res.data);
                alert("Game Edited Successfully");
                this.goToDashboard();
    })
    }
    render() {
        return (
            <div className="rowGame">
                {this.state.game.map(games =>
                    <form className="form-signin" key={games.gameId} >
                    <h1>Edit Game</h1>
                    <label className="">Game Name</label>
                    
                        <input type="email" ref={elem => (this.gameNameInput = elem)} onChange={this.onChangeGameName} id="gameName" className="form-control" value={games.gameTitle} required autoFocus />

                        <br />
                        <br />

                        <label className="">Platform</label>

                        <br />

                        <select name="platform" className="employee_custom_select" onChange={this.onChangePlat} >
                            {this.state.gamePlatforms.map(gamePlat =>
                                <option key={gamePlat.platformId} >{gamePlat.platformName}</option>
                            )}
                        </select>

                        <br />
                        <br />

                        <label className="">Category</label>

                        <br />

                        <select name="category" className="employee_custom_select" onChange={this.onChangeCat}>
                            {this.state.gameCategories.map(gameCat =>
                                <option key={gameCat.categoryId} value={games.gameCategory} selected>{gameCat.categoryName}</option>
                            )}
                        </select>

                        <br />
                        <br />

                        <label className="">Cost</label>

                        <br />

                        <input type="number" min="1" step="any"  value={games.gamePrice} onChange={this.onChangeCost} />

                        <br />
                        <br />

                        <label className="">Release Date</label>
                        <br />
                        <input type="date" value={this.state.date} onChange={this.onChangeReleaseDate} />

                        <br />
                        <br />

                        <label className="">Game Description: </label>
                        <br />
                        <textarea name="message" rows="10" cols="30" value={games.gameDescription} className="gameTextArea">

                        </textarea>

                        <Link to={"/Dashboard"}>
                            <Button type="button" className="btn btn-lg btn-success btn-block" id="addButton" onClick={() => this.editGame()}>Edit</Button>
                        </Link>
                        <br />

                        <Link to={"/Dashboard"}>
                            <Button type="button" className="btn btn-lg btn-danger btn-block" id="cancelButton" onClick={() => this.goToDashboard()}>Cancel</Button>
                        </Link>

                

                        <br />
                     </form>
                )}


            </div>
        );
    }
}


