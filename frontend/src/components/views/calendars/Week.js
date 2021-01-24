

import React from 'react';
import Day from './Day.js';
import weekStyle from './calendarStyles/Week.module.css'


class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dows: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            selectedCourses: this.props.selectedCourses,
        }

        console.log("event Info: ", this.props.eventInfo);
    }

    componentDidMount() {
        this.getRecSchedule();
    }

    // maps through selected courses and push all object ids to array
    getObjectIDs() {
        let res = [];
        this.state.selectedCourses.map(function(info) {
            res.push(info._id);
        })
        return res;
    }


    // post requests recommended schedule made by API
    async getRecSchedule() {
        console.log("selected Courses: " , this.state.selectedCourses);
        console.log("object ids: ", this.getObjectIDs());
        var API_URL = process.env.REACT_APP_API_URL + "/courses/schedule";
        var requestDetail = {
            "objectIds": this.getObjectIDs(),
            "filter": {
            "time": {
                "Monday": [
                {
                    "time_earliest": "00:00",
                    "time_latest": "23:59"
                }
                ],
                "Tuesday": [
                {
                    "time_earliest": "00:00",
                    "time_latest": "23:59"
                }
                ],
                "Wednesday": [
                {
                    "time_earliest": "00:00",
                    "time_latest": "23:59"
                }
                ],
                "Thursday": [
                {
                    "time_earliest": "00:00",
                    "time_latest": "23:59"
                }
                ],
                "Friday": [
                {
                    "time_earliest": "00:00",
                    "time_latest": "23:59"
                }
                ],
                "Saturday": [
                {
                    "time_earliest": "00:00",
                    "time_latest": "23:59"
                }
                ],
                "Sunday": [
                {
                    "time_earliest": "00:00",
                    "time_latest": "23:59"
                }
                ]
            }
            }
        };


        fetch(API_URL, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(requestDetail) // body data type must match "Content-Type" header
        })
        .then(response => 
            console.log("response post: " , response))
            // response.json())
        .then(result => {
            //if the request is valid
            console.log("result post: " , result);
            this.setState({
                eventInfo: result.data
            });
        },
            (error) => {
                console.log("error", error);
        });
        
        console.log("post request event: ", this.state.eventInfo);

    }





    


    render () {
        console.log("props eventinfo: ", this.props.eventInfo);
        return(
            <div className={weekStyle.weekContainer}> 
                <Day dow="" timeBar={true} courseSchedule={this.props.courseSchedule}></Day>
                {this.state.dows.map(function (dow) {
                    return <Day className={weekStyle.day} dow={dow} courseSchedule={this.props.courseSchedule}></Day>;
                }, this)}

            </div>
            

        )

    }
}

export default Week;