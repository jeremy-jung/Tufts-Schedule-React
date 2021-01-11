/* Written by Jeremy Jung (9/1/2021)
    async get Facebook javascript SDK
*/

const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

export default function initFBSDK () {
    return new Promise(resolve => {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v9.0'
            });
            
            // check if user is logged in to facebook
            window.FB.getLoginStatus(({ authResponse }) => {

                if (authResponse) {
                    console.log("Already logged in to facebook");
                } else {
                    console.log("Not logged in to facebook");
                    resolve();
                }

            });

            window.FB.AppEvents.logPageView();
        }

    })
}