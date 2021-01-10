import React, {useState, useEffect, useCallback} from 'react';
import style from './styles/ButtonFBLogin.module.css';
class ButtonFBLogin extends React.Component {
    constructor (props) {
        /* use callbacks from parent to get states from this child */
        super(props);

        this.state = {
            accessToken_FB: undefined,
            dataAccessExpirationTime_FB: undefined,
            userID_FB: undefined
        }

        this.handleFBLogin = this.handleFBLogin.bind(this);
        this.parseLoginStatus = this.parseLoginStatus.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }
    
    /* open Facebook Login pop up and prompt user login */
    handleFBLogin = (callback) => {
        window.FB.login(function (responseLogin) {

            if (responseLogin.authResponse) {

                /* FB authorization is complete */

                callback(responseLogin.authResponse);

            }
            else {
                console.log("authResponse is undefined");
            }
        })
    }

    /* parse authorization response from FB and update component's states with them */
    handleStatusChange = (authResponse) => {

        this.setState({
            accessToken_FB: authResponse.accessToken,
            dataAccessExpirationTime_FB: authResponse.data_access_expiration_time,
            userID_FB: authResponse.userID
        })

        this.props.getGroupsFB();
    }
    
    // parse response for login from FB.getLoginStatus()
    parseLoginStatus = (response) => {

        // check facebook login status
        if (response.status === "unknown") {

            /* Not already logged in to facebook, start login to FB */

            this.handleFBLogin(
                // Update component's states with Facebook auth details
                (authResponse) => this.handleStatusChange(authResponse)
            );

        }
        else if (response.status === "connected") {

            /* Logged in to FB */

            // Update component's states with Facebook auth details
            this.handleStatusChange(response.authResponse);
        }
    }

    /* check if web page is already logged in to Facebook */
    checkFBLoginState = () => {

        window.FB.getLoginStatus (  
            (response) => this.parseLoginStatus(response)
        );
    }

    render () {

        if (window.FB !== undefined ) {
            console.log("window.FB is defined!!!!!!!!!!1")
        }

        return (
            <div>
                <div>
                    <button onClick={this.checkFBLoginState} className={style.button}>
                        Login to Facebook
                    </button>
                </div>
            </div>
        );
    }
}

export default ButtonFBLogin;