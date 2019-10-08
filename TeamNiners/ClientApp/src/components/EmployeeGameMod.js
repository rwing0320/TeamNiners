import React, { Component } from 'react';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export class EmployeeGameMod extends Component {
    constructor(props) {
        super(props);
        this.state = { gameName: "", gamePlatform: "", gameCat: "", gameReleaseDate: "", gameDesc: "", value: "", gameCost: 0, changePage: false };

        this.onChangePlat = this.onChangePlat.bind(this);
        this.onChangeCat = this.onChangeCat.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);

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

    changePage() {
        this.setState({changePage: true})
    }

    goToDashboard() {
        if (this.state.changePage) {
            return <Redirect to='/dashboard' />
        }
    }


    render() {
        return (
            <div>
                {this.goToDashboard()}
                <form className="form-signin">

                    <div id="gameDiv">
                        <h1 className="h3 mb-3 font-weight-normal addgameText"> Add Game</h1>
                        <div id="buttonCont">
                            <Button className="addGameButton" id="addButton">Add</Button>
                            <Button className="cancelGameButton" onClick={() => this.changePage()}>Cancel</Button>
                        </div>
                    </div>
                    <label className="">Game Name</label>
                    <input type="email" ref={elem => (this.gameName = elem)} onChange={this.onChangeGameName} id="gameName" className="form-control" placeholder="Name" required autoFocus />

                    <label className="">Platform</label>
                    <select name="platform" onChange={this.onChangePlat} >
                        <option value="Xbox">Xbox</option>
                        <option value="Playstation">Playstation</option>
                        <option value="Nintendo">Nintendo</option>
                        <option value="PC">PC</option>
                    </select>

                    <br />

                    <label className="">Category</label>
                    <select name="category" onChange={this.onChangeCat}>
                        <option value="Puzzle">Puzzle</option>
                        <option value="RPG">RPG</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Action">Action</option>
                    </select>

                    <br />

                    <label className="">Cost: </label>
                    <input type="number" min="0.05" step="any" onChange={this.onChangeCat} />

                    <br />

                    <p id="errorMessage">{this.state.error} </p>

                    <br />
                </form>


            </div>
        );
    }
}