

import React from 'react';
import Day from './Day.js';
import weekStyle from './calendarStyles/Week.module.css'


class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dows: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        }

        console.log("event Info: ", this.props.eventInfo);
    }









    


    render () {
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