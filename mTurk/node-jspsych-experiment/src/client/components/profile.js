/* Copyright G. Hemingway, 2017 - All rights reserved */
'use strict';


import React, { Component }     from 'react';
import { Link }                 from 'react-router';
import { Gravitar }             from './gravitar';

/*************************************************************************/

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                primary_email: "",
                games: []
            }
        }
    }

    fetchUser(username) {
        $.ajax({
            url: `/v1/user/${username}`,
            method: "get",
            success: (data) => {
                this.setState({ user: data });
            },
            error: (err) => {
                let errorEl = document.getElementById('errorMsg');
                errorEl.innerHTML = `Error: ${err.responseJSON.error}`;
            }
        });
    }

    componentDidMount() {
        this.fetchUser(this.props.params.username);
    }

    componentWillReceiveProps(nextProps) {
        this.fetchUser(nextProps.params.username);
    }

    render() {
        // Is the logged in user viewing their own profile
        const isUser = this.props.params.username === this.props.route.user.getUser().username;
        // Build array of games
        let games = this.state.user.games.map((game, index) => {
            let date = new Date(game.start);
            const url = game.active ? `/game/${game.id}` : `/results/${game.id}`;
            return <tr key={index}>
                <th><Link to={url}>{game.active?"Active":"Complete"}</Link></th>
                <th>{date.toLocaleString()}</th>
                <th>{game.moves}</th>
                <th>{game.score}</th>
                <th>{game.game}</th>
            </tr>;
        });
        return <div className="row">
            <div className="center-block">
                <p id="errorMsg" className="bg-danger"></p>
            </div>
            <div className="col-xs-2">
                <h4>Player Profile</h4>
                { isUser ? <Link to="/edit">Edit Profile</Link> : undefined }
            </div>
            <div className="col-xs-8">
                <div className="row">
                    <div className="col-xs-1">
                        <Gravitar email={this.state.user.primary_email} size={100}/>
                    </div>
                    <div className="col-xs-11">
                        <div className="col-xs-6 text-right">
                            <p><b>Username:</b></p>
                            <p><b>First Name:</b></p>
                            <p><b>Last Name:</b></p>
                            <p><b>City:</b></p>
                            <p><b>Email Address:</b></p>
                        </div>
                        <div className="col-xs-6">
                            <p>{this.state.user.username}</p>
                            <p>{this.state.user.first_name}</p>
                            <p>{this.state.user.last_name}</p>
                            <p>{this.state.user.city}</p>
                            <p>{this.state.user.primary_email}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <h4 id="games_count">Games Played ({this.state.user.games.length}):</h4>
                        { isUser ? <Link to="/start">Start new game</Link> : undefined }
                    </div>
                    <table id="gameTable" className="col-xs-12 table">
                        <thead>
                        <tr>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th># of moves</th>
                            <th>Score</th>
                            <th>Game Type</th>
                        </tr>
                        </thead>
                        <tbody>{games}</tbody>
                    </table>
                </div>
            </div>
        </div>;
    }
}
