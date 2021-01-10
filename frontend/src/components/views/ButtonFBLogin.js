/* Written by Jeremy (9/1/2021)
    Facebook Login button
*/

import React from 'react';
import style from './styles/ButtonFBLogin.module.css';

class ButtonFBLogin extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            FB: undefined
        }
    }

    checkFBLoginState = () => {
        window.FB.getLoginStatus(function(response) {
            console.log("response: ", response);
            console.log(window.FB);
            // window.FB.statusChangeCallback(response);
        })
    }

    render () {
        if (window.FB != undefined ) {
            console.log("window.FB is defined!!!!!!!!!!1")
            console.log(window.FB);
        }

        return (
            <div>
                <div>
                    <button onClick = {this.checkFBLoginState} className = {style.button}>
                        Login to Facebook
                    </button>
                </div>
            </div>
        );
    }
}

export default ButtonFBLogin;