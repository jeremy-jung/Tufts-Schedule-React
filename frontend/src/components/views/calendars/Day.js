
import React from 'react';
import dayStyle from './calendarStyles/Day.module.css'
import Event from './Event.js'


class Day extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dow: this.props.dow,
            timeSlots: [],
            courseSchedule: this.props.courseSchedule,
            events: this.props.events,
            startTime: "",
            endTime: "",
        };

        this.generateTime = this.generateTime.bind(this);
        this.createTimeSlots = this.createTimeSlots.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
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
     
        
    }

    onDrag(st){
        this.setState({
            startTime: st,
        })
        console.log("ondrag starts");
    }


    async onDragEnter(e, et) 
    {
        this.setState({
            endTime: et,
        })
        var res = et.split(":");
        res = parseInt(res[0] + res[1]);
        if (e.target.style.backgroundColor.localeCompare("") == 0)
        {
            e.target.style.backgroundColor = "#59f100";
            console.log("the props: " , this.props);
            await this.props.dayUpdateTimePref(this.state.dow, res, true);

        }
        else
        {
            e.target.style.backgroundColor = "";
            await this.props.dayUpdateTimePref(this.state.dow, res, false);

        }
        console.log("check style of event: " , e.target.style);
        console.log("check res: " , res);
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
                <div className={dayStyle.dragDayContainer}>
                    <div className={dayStyle.timeSlots}>
                        <div className={dayStyle.timeSlotTop}>
                            <h3>{this.state.dow.substring(0, 3)}</h3>
                        </div>
                        
                        {this.state.timeSlots.map(function (timeInfo) {
                            var res = timeInfo.start.split(":");
                            res = parseInt(res[0] + res[1]); 
                            if (timeInfo.start.substring(3) == "00")
                            {
                                if (this.props.dayTimePref[this.state.dow].includes(res))
                                {
                                    return <div className={dayStyle.timeSlotTop} style={{backgroundColor:"#59f100"}} value={timeInfo.start} draggable={true} onDrag={()=>this.onDrag(timeInfo.start)} onDragEnter={(e)=>this.onDragEnter(e, timeInfo.start)} onClick={(e)=>this.onDragEnter(e, timeInfo.start)}>&nbsp;</div>;                    
                                }
                                return  <div className={dayStyle.timeSlotTop} value={timeInfo.start} draggable={true} onDrag={()=>this.onDrag(timeInfo.start)} onDragEnter={(e)=>this.onDragEnter(e, timeInfo.start)} onClick={(e)=>this.onDragEnter(e, timeInfo.start)}>&nbsp;</div>;                    

                            }
                            else if (timeInfo.start.substring(4) == "0")
                            {
                                if (this.props.dayTimePref[this.state.dow].includes(res))
                                {
                                    return <div className={dayStyle.timeSlotTop} style={{backgroundColor:"#59f100"}} value={timeInfo.start} draggable={true} onDrag={()=>this.onDrag(timeInfo.start)} onDragEnter={(e)=>this.onDragEnter(e, timeInfo.start)} onClick={(e)=>this.onDragEnter(e, timeInfo.start)}>&nbsp;</div>;                    
                                }
                                return  <div className={dayStyle.timeSlot} value={timeInfo.start} draggable={true} onDrag={()=>this.onDrag(timeInfo.start)} onDragEnter={(e)=>this.onDragEnter(e, timeInfo.start)} onClick={(e)=>this.onDragEnter(e, timeInfo.start)}>&nbsp;</div>;

                            }
                            else
                                return <div className={dayStyle.slot} value={timeInfo.start}></div>;
                        }, this )}
    
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
                        if (timeInfo.start.substring(3) == "00"){
                            return  <div className={dayStyle.timeSlotTop} value={timeInfo.start}>&nbsp;</div>;                    
                        }
                        else if (timeInfo.start.substring(4) == "0")
                        {
                            return  <div className={dayStyle.timeSlot} value={timeInfo.start}>&nbsp;</div>;

                        }
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