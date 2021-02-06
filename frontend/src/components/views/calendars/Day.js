
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
            events: this.props.events
        };

        this.generateTime = this.generateTime.bind(this);
        this.createTimeSlots = this.createTimeSlots.bind(this);
        this.createTimeSlots();
        console.log("events of " , this.state.dow , " : " , this.state.events);
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
        // if rendering time slots for course schedule, just need to show 7:30 - 23:00
        // 4 time slots per hour 
        if (this.state.courseSchedule)
        {
            star = 29;
            end = 95;
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
        // for the time column
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
        // for the drag display
        else if (this.state.events == null)
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
                    
    
    
                </div>
                )
        }
        // for display of schedule with events 
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
                

                {this.state.events.map(function (eventInfo) {
                    return <Event eventInfo={eventInfo}> </Event>
                }, this)}
             


            </div>
            )
        }
        


    }
}

export default Day;