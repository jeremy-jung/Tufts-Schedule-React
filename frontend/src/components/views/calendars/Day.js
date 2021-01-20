

import React from 'react';
import { ThemeProvider } from 'react-bootstrap';
import dayStyle from './calendarStyles/Day.module.css'
import Event from './Event.js'


class Day extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dow: this.props.dow,
            timeSlots: [],
            courseSchedule: this.props.courseSchedule,
            events: [],
        };

        this.generateTime = this.generateTime.bind(this);
        this.createTimeSlots = this.createTimeSlots.bind(this);
        this.createTimeSlots();
    }

   

    generateTime(pos) { 
        let check = pos % 4;
        let res = "";
        if (check == 0) 
        {
            res = Math.floor(pos / 4) + ":00";
        }
        else if (check == 1)
        {
            res = Math.floor(pos / 4) + ":15";        
        }
        else if (check == 2) 
        {
            res = Math.floor(pos / 4) + ":30";
        }
        else if (check == 3) 
        {
            res = Math.floor(pos / 4) + ":45";
        }

        // add "0" accordingly
        if (res.length != 5)
        {
            res = "0" + res;
        }
        
        return res;
    }

    async createTimeSlots() {
        var tempSlots = [];
        let star = 0;
        let end = 96;
        // if rendering time slots for course schedule, just need to show 7:30 - 21:30
        if (this.state.courseSchedule)
        {
            star = 29;
            end = 87;
        }
        for (var i = star; i < end; i++)
        {
            this.state.timeSlots.push({
                start: this.generateTime(i),
                end: this.generateTime(i + 1),
                busy: false,

            });
        }
     
        console.log("time slots generated: " + tempSlots.length + "&&" + this.state.timeSlots.length);
        console.log(this.state.timeSlots);
        console.log("what is props today: " + this.props.dow);
        console.log("what is today: " + this.state.dow);
    }








    render() {

        if (this.props.timeBar)
        {
            return (
                <div className={dayStyle.timeBarContainer}>
                    <div className={dayStyle.timeSlots}>
                        <div className={dayStyle.timeSlotTop}>
                            <h3>&nbsp;</h3>
                        </div>
                        
                        {this.state.timeSlots.map(function (timeInfo) { 
                            if (timeInfo.start.substring(3) == "00")
                                return  <div className={dayStyle.timeSlotTop} value={timeInfo.start}>{timeInfo.start}</div>;
                            else if (timeInfo.start.substring(4) == "0")
                                return <div className={dayStyle.timeSlot} value={timeInfo.start}>&nbsp;</div>;
                            else    
                                return <div className={dayStyle.slot} value={timeInfo.start}></div>;
                        })}
                    </div>
                    
                </div>
            )
        }
        else 
        {
            return (
            <div className={dayStyle.dayContainer}>
                <div className={dayStyle.timeSlots}>
                    <div className={dayStyle.timeSlotTop}>
                        <h3>{this.state.dow.substring(0, 3)}</h3>
                    </div>
                    
                    {this.state.timeSlots.map(function (timeInfo) {
                        if (timeInfo.start.substring(3) == "00")
                            return  <div className={dayStyle.timeSlotTop} value={timeInfo.start}>&nbsp;</div>;                    
                        else if (timeInfo.start.substring(4) == "0")
                            return  <div className={dayStyle.timeSlot} value={timeInfo.start}>&nbsp;</div>;
                        
                        else
                            return <div className={dayStyle.slot} value={timeInfo.start}></div>;
                    })}

                </div>
                

                {/* <input type="button" style={{transform:"translateY(53px)", backgroundColor:"#9A322B", position:"absolute", height:"20px", zIndex:"2" }} /> */}
                {/* <Event eventStyle={{transform:"translateY(53px)", height:"40px"}}></Event> */}
                <Event eventStyle={{transform:"translateY(43px)", height:"35px"}}></Event>

                {/* <div style={{transform:"translateY(-50vh)", backgroundColor:"#9A322B", position:"relative", height:"2vh", zIndex:"2"}} >&nbsp;</div>

                <div style={{transform:"translateY(-60vh)", backgroundColor:"#9A322B", position:"relative", height:"2vh" , zIndex:"2"}} >&nbsp;</div>
 */}


            </div>
            )
        }
        


    }
}

export default Day;