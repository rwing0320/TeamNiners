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
        this.state = { gameId: 0 };


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
                    <input type="date" ref={elem => (this.releaseDateInput = elem)} onChange={this.onChangeReleaseDate} />

                    <br />
                    <br />

                    <label className="">Game Description: </label>
                    <br />
                    <textarea name="message" rows="10" cols="30" ref={elem => (this.gameDescInput = elem)} onChange={this.onChangeGameDesc} className="gameTextArea">

                    </textarea>

                    <Link to={"/Dashboard"}>
                        <Button type="button" className="btn btn-lg btn-success btn-block" id="addButton" onClick={() => this.addGame()}>Add</Button>
                    </Link>
                    <br />

                    <Link to={"/Dashboard"}>
                        <Button type="button" className="btn btn-lg btn-danger btn-block" id="cancelButton" onClick={() => this.goToDashboard()}>Cancel</Button>
                    </Link>

                    <p id="errorMessage">{this.state.error} </p>

                    <br />
                </form>


            </div>
        );
    }
}


