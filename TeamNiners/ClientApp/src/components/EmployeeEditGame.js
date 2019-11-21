import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import './css/EmployeeGameModPage.css';
import { webAddress } from './reference/reference';


export class EmployeeEditGame extends Component {
    displayName = EmployeeEditGame.name

    constructor(props) {
        super(props);
        this.state = { game: [], gamePlatforms: [], gameCategories: [],  gameName: "", gamePlatform: 1, gameCat: 1, gameReleaseDate: "", gameDesc: "", value: "", gameCost: 0, changePage: false  };


        this.onChangePlat = this.onChangePlat.bind(this);
        this.onChangeCat = this.onChangeCat.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeGameName = this.onChangeGameName.bind(this);
        this.onChangeGameDesc = this.onChangeGameDesc.bind(this);
        this.onChangeReleaseDate = this.onChangeReleaseDate.bind(this);
        this.getGame = this.getGame.bind(this);
        this.goToDashboard = this.goToDashboard.bind(this);

        this.gameNameInput = null;
        this.releaseDateInput = null;
        this.gameDescInput = null;
        this.gameCostInput = null;

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
                var gameReleaseDate = res.data[0].releaseDate.split('T')[0];
                var gamePlatform = res.data[0].gamePlatform;
                var gameCategory = res.data[0].gameCategory;
                var gameName = res.data[0].gameTitle;
                var gameDesc = res.data[0].gameDescription;
                var gameCost = res.data[0].gamePrice;

                this.state.gameNameInput = gameName;
                this.setState({ game: res.data, gameReleaseDate, gamePlatform, gameCategory, gameName, gameDesc, gameCost });
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
        console.log(this.state.gameName);
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
        axios.post(webAddress + 'api/Game/editGameItem',
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
                    <h3>Edit Game</h3>
                    <label className="">Game Name</label>

                        <input type="text" defaultValue={games.gameTitle} ref={elem => (this.gameNameInput = elem)} onChange={this.onChangeGameName} id="gameName" className="form-control" required autoFocus />

                        <br />
                        <br />

                        <label className="">Platform</label>

                        <br />

                        <select name="platform" className="employee_custom_select" onChange={this.onChangePlat} >
                            {this.state.gamePlatforms.map(gamePlat =>
                                <option key={gamePlat.platformId} value={gamePlat.platformId} defaultValue={games.platformId} > { gamePlat.platformName }</option>
                        )}
                        </select>

                        <br />
                        <br />

                        <label className="">Category</label>

                        <br />

                        <select name="category" className="employee_custom_select" onChange={this.onChangeCat}>
                            {this.state.gameCategories.map(gameCat =>
                                <option key={gameCat.categoryId} value={gameCat.categoryId} defaultValue={games.categoryId}>{gameCat.categoryName}</option>
                            )}
                        </select>

                        <br />
                        <br />

                        <label className="">Cost</label>

                        <br />

                        <input type="number" min="1" step="any" ref={elem => (this.gameCostInput = elem)} defaultValue={games.gamePrice} onChange={this.onChangeCost} />

                        <br />
                        <br />

                        <label className="">Release Date</label>
                        <br />
                        <input type="date" ref={elem => (this.releaseDateInput = elem)} defaultValue={this.state.gameReleaseDate} onChange={this.onChangeReleaseDate} />

                        <br />
                        <br />

                        <label className="">Game Description: </label>
                        <br />
                        <textarea name="message" rows="10" cols="30" ref={elem => (this.gameDescInput = elem)} defaultValue={games.gameDescription} onChange={this.onChangeGameDesc} className="gameTextArea">

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


