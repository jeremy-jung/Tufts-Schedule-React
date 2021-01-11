/*
 * 
 */

import React from 'react';
import Event from './Event.js';
import ButtonFBLogin from './views/ButtonFBLogin.js';

class Schedule extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            TimeRangeView: false,
            accessToken_FB: undefined,
            dataAccessExpirationTime_FB: undefined,
            userID_FB: undefined
        };

        this.handleTimeRangeView = this.handleTimeRangeView.bind(this);
        this.getFBAuthDetails = this.getFBAuthDetails.bind(this);
        this.getGroupsFB = this.getGroupsFB.bind(this);
    }
    
    getFBAuthDetails (state) {
        this.setState({
            accessToken_FB: state.accessToken_FB,
            dataAccessExpirationTime_FB:  state.dataAccessExpirationTime_FB,
            userID_FB: state.userID_FB
        })

        this.getGroupsFB();
    }

    getGroupsFB () {
        /*
        var API_URL = "https://graph.facebook.com/"+ this.state.userID_FB + "/groups";

        fetch(API_URL)
        .then(
            (response) => response.json()
        )
        .then(result => {
            //if the request is valid
            console.log(result);
        },
        (error) => {
            console.log("error", error);
        });
        */

        window.FB.api(
            "/" + this.state.userID_FB + "/groups", 
            function (response) {

                if (response & !response.error) {

                    console.log("response: ", response);
                    
                }
            }
        )

    }

    handleTimeRangeView() {
  
        this.setState({
            TimeRangeView: !this.state.TimeRangeView
        });
        console.log(this.TimeRangeView);
    
    }

    render() {
        return (
            <main>
                <h1>
                    Schedule!
                </h1>
                <div className="navbar">
                    <button onClick={this.handleTimeRangeView}>{`${this.state.TimeRangeView ? 'My Schedule' : 'Time Range Selector'}`}</button>

                </div>
                
                <div>
                    <Event />
                </div>
                <div>
                    <ButtonFBLogin getGroupsFB = {this.getGroupsFB} ></ButtonFBLogin>
                </div>
            </main>
            
        )

    }
}
export default Schedule;