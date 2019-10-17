import React, { Component } from 'react';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import './css/EmployeeGameModPage.css';

export class EmployeeGameMod extends Component {
    displayName = EmployeeGameMod.name

    constructor(props) {
        super(props);
        this.state = { comeFrom: this.props.data2 ,gamePlatforms: [],gameCategories: [] ,gameName: "", gamePlatform: 1, gameCat: 1, gameReleaseDate: "", gameDesc: "", value: "", gameCost: 0, changePage: false };

        this.onChangePlat = this.onChangePlat.bind(this);
        this.onChangeCat = this.onChangeCat.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.addGame = this.addGame.bind(this);
        this.onChangeGameName = this.onChangeGameName.bind(this);
        this.onChangeGameDesc = this.onChangeGameDesc.bind(this);
        this.onChangeReleaseDate = this.onChangeReleaseDate.bind(this);
        this.goToDashboard = this.goToDashboard.bind(this);

        this.gameNameInput = null;
        this.releaseDateInput = null;
        this.gameDescInput = null;
        this.gameCostInput = null;

        axios.get('http://localhost:49874/api/GameCategory')
            .then(res => {
                console.log(res.data);
                this.setState({gameCategories: res.data})
                //this.setState({
                //    businessCity: res.data[0].businessCity
                //});
            })
 
        axios.get('http://localhost:49874/api/GamePlatform')
            .then(res => {
                console.log(res.data);
                this.setState({ gamePlatforms: res.data })
                //this.setState({
                //    businessCity: res.data[0].businessCity
                //});
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

    changePage() {
        this.setState({ changePage: true })
      
    }



    goToDashboard() {
        
            this.props.changePage(1)
        
    }


    checkLocation() {
        if (this.state.comeFrom == 2) {
            return <h3 className="addgameText"> Add Game</h3>
        }
        else {
            return <h3 className="addgameText"> Edit Game</h3>
        }
    }


    async addGame() {
        var gameId = 0;
        var businessId = this.props.data2;
        var success = true;
        axios.post('http://localhost:49874/api/Game', {
            GameTitle: this.state.gameName,
            GameDescription: this.state.gameDesc,
            ReleaseDate: this.state.gameReleaseDate,
            GamePlatform: this.state.gamePlatform,
            GameCategory: this.state.gameCat,
            GamePrice: this.state.gameCost
        })
            .then(function (response) {
                console.log(response);
                //successFlag = true;
                //console.log(response.data);
                gameId = response.data.gameId;
                console.log("the game id is: " + gameId);

                axios.post('http://localhost:49874/api/Game/AddBusinessGame', {
                    businessId: businessId,
                    gameId: gameId,

                })
                    .then(function (response) {
                        console.log(response);
                        //successFlag = true;
                        console.log(response.data);
                        //businessName = response.data.businessName;

                    })
                    .catch(function (error) {

                        console.log("this is the error: " + error);
                    });
                //businessName = response.data.businessName;

            })
            .catch(function (error) {
                success = false;
                console.log("this is the error: " + error);
            });

        if (success == true) {
            //this.state = { comeFrom: this.props.location.state.location, gamePlatforms: [], gameCategories: [], gameName: "", gamePlatform: 1, gameCat: 1, gameReleaseDate: "", gameDesc: "", value: "", gameCost: 0.00, changePage: false };

            this.setState({
                gameName: "",
                gamePlatform: 1,
                gameCat: 1,
                gameReleaseDate: "",
                gameDesc: "",
                gameCost: 0,
                changePage: true
            });

            this.goToDashboard();
          

        }
    }

    render() {
        return (
            <div className="rowGame">
                
                <form className="form-signin">

                    <div id="gameDiv">
                        {this.checkLocation()}
                       
                    </div>

                    <label className="">Game Name</label>
                    <input type="email" ref={elem => (this.gameNameInput = elem)} onChange={this.onChangeGameName} id="gameName" className="form-control" placeholder="Name" required autoFocus />

                    <br />
                    <br />

                    <label className="">Platform</label>

                    <br />

                    <select name="platform" className="employee_custom_select" onChange={this.onChangePlat} >
                        {this.state.gamePlatforms.map(gamePlat =>
                            <option key={gamePlat.platformId} value={gamePlat.platformId}>{gamePlat.platformName}</option>
                        )}
                    </select>

                    <br />
                    <br />

                    <label className="">Category</label>

                    <br />

                    <select name="category" className="employee_custom_select" onChange={this.onChangeCat}>
                        {this.state.gameCategories.map(gameCat =>
                            <option key={gameCat.categoryId} value={gameCat.categoryId}>{gameCat.categoryName}</option>
                        )}
                    </select>

                    <br />
                    <br />

                    <label className="">Cost</label>

                    <br />

                    <input type="number" min="1" step="any" ref={elem => (this.gameCostInput = elem)} onChange={this.onChangeCost} />

                    <br />
                    <br />

                    <label className="">Release Date</label>
                    <br />
                    <input type="date" ref={elem => (this.releaseDateInput = elem)} onChange={this.onChangeReleaseDate}/>

                    <br />
                    <br />

                    <label className="">Game Description: </label>
                    <br />
                    <textarea name="message" rows="10" cols="30" ref={elem => (this.gameDescInput = elem)} onChange={this.onChangeGameDesc} className="gameTextArea">
                        
                    </textarea>

                   
                        <Button type="button" className="btn btn-lg btn-success btn-block" id="addButton" onClick={() => this.addGame()}>Add</Button>

                        <br />

                    <Button type="button" className="btn btn-lg btn-danger btn-block" id="cancelButton" onClick={() => this.goToDashboard()}>Cancel</Button>
                   

                    <p id="errorMessage">{this.state.error} </p>

                    <br />
                </form>


            </div>
        );
    }
}

