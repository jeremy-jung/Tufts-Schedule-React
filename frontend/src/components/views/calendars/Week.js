

import React from 'react';
import Day from './Day.js';
import weekStyle from './calendarStyles/Week.module.css'


class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dows: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            selectedCourses: this.props.selectedCourses,
            postReqTime: {"Monday":[], "Tuesday":[],"Wednesday":[], "Thursday":[],"Friday":[], "Saturday":[],"Sunday":[] },
            dayTimePref: this.props.dayTimePref,
            retrievedTime: this.props.dayTimePref,
            requestError: false,
            requestErrorReason: undefined,
            mobileCount: 0, /* keeps count of the day on mobile view */
            timeSlots: {"Monday":[], "Tuesday":[],"Wednesday":[], "Thursday":[],"Friday":[], "Saturday":[],"Sunday":[] },
            
        }
    
        this.retrieveTimePref = this.retrieveTimePref.bind(this);
        this.scheduleReload = this.scheduleReload.bind(this);
        this.convertTimeIntToString = this.convertTimeIntToString.bind(this);
        this.minusDay = this.minusDay.bind(this);
        this.addDay = this.addDay.bind(this);


    }



    
    async componentDidMount() {
        //console.log("componentDidMount() - drag? " , this.props.drag);
        if (!this.props.drag)
        {
            //console.log("daypref")
            //console.log("sort before: " , this.props.dayTimePref);
            //console.log("scheduleReload() - call retrieveTimePref");
            //console.log("sort after: " , this.props.dayTimePref);

            //console.log("scheduleReload() - call convertSchedulePref");
            await this.convertSchedulePref();
            //console.log("scheduleReload() - call getRecSchedule");
            await this.getRecSchedule();
           
        }
    }
    async scheduleReload() {


        //console.log("componentDidMount() - drag? " , this.props.drag);
        if (!this.props.drag)
        {
            //console.log("daypref")
            //console.log("sort before: " , this.props.dayTimePref);
            //console.log("scheduleReload() - call retrieveTimePref");
            await this.props.sortTimePref();
            //console.log("sort after: " , this.props.dayTimePref);

            //console.log("scheduleReload() - call convertSchedulePref");
            await this.convertSchedulePref();
            //console.log("scheduleReload() - call getRecSchedule");
            await this.getRecSchedule();
           
        }
    }




    // updates time pref called by "Day"
    // day is the dow
    // time is the time in int
    // type is either true (add) or false (remove)
    async dayUpdateTimePref(day, time, type) {
        //console.log("dayUpdateTimePref() - props: ", this.props.dayTimePref);
        if(type)
        {
            // add time of day
            this.props.dayTimePref[day].push(time);
        }
        else
        {
            // remove time of day
            // find index of time
            let pos = this.props.dayTimePref[day].indexOf(time);
            // remove time at pos
            this.props.dayTimePref[day].splice(pos, 1);

        }
        // await this.props.storeTimePref(this.state.dayTimePref);
        //console.log("time pref updated? ", this.props.dayTimePref[day]);

    }

    async retrieveTimePref() {
        //console.log("time before sort: ", this.props.dayTimePref);

        // this.props.dayTimePref.setState({
        //     dayTimePref: this.props.dayTimePref
        // })

        for (var key in this.state.dayTimePref) {
            await this.setState({
                dayTimePref: this.state.dayTimePref[key].sort()
            })
            // await this.props.dayTimePref[key].sort();
            
        }
        //console.log("time after sort: ", this.state.dayTimePref);
    }


    // converts time in integer to string for post request arg
    convertTimeIntToString(time)
    {
        var hours = time / 100;
        var minutes = time % 100;
        var hourString = "" + hours;
        var minuteString = "" + minutes;
        if (hours < 10)
        {
            hourString = "0" + hours;
        }
        if (minutes < 10)
        {
            minuteString = "0" + minutes;
        }

        return hourString + ":" + minuteString;

    }

    // converts all int time pref to string and push in json
    convertSchedulePref() {
        for (var key in this.props.dayTimePref) {
            // check if it's empty, empty -> 00:00 to 23:59
            if (this.props.dayTimePref[key].length == 0)
            {
                this.state.postReqTime[key].push({
                    "time_earliest": "00:00",
                    "time_latest": "23:59"
                });
            }
            else if (this.props.dayTimePref[key].length == 1)
            {
                var begin = this.props.dayTimePref[key][0];
                var end = this.props.dayTimePref[key][0] + 30;
                
                this.state.postReqTime[key].push({
                    "time_earliest": this.convertTimeIntToString(begin),
                    "time_latest": this.convertTimeIntToString(end)
                });
            }
            else {
                var begin = this.props.dayTimePref[key][0];
                for (var i = 1; i < this.props.dayTimePref[key].length; i++)
                {
                    // if the time is not consecutive from previous
                    if ((this.props.dayTimePref[key][i - 1] + 30) != (this.props.dayTimePref[key][i]))
                    {
                        this.state.postReqTime[key].push({
                            "time_earliest": this.convertTimeIntToString(begin),
                            "time_latest": this.convertTimeIntToString(this.props.dayTimePref[key][i - 1] + 30)
                        });
                        begin = this.props.dayTimePref[key][i];
                        // if time is the end, and not consecutive from previous
                        if (i == (this.props.dayTimePref[key].length - 1))
                        {
                            this.state.postReqTime[key].push({
                                "time_earliest": this.convertTimeIntToString(begin),
                                "time_latest": this.convertTimeIntToString(begin + 30)
                            });
                        }
                    }
                    // if time is consecutive, but last
                    else if (i == (this.props.dayTimePref[key].length - 1))
                    {
                        this.state.postReqTime[key].push({
                            "time_earliest": this.convertTimeIntToString(begin),
                            "time_latest": this.convertTimeIntToString(this.props.dayTimePref[key][i] + 30)
                        });
                    }
                    
                }
            }
        }
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
        this.setState({
            requestError: false
        });

        //console.log("selected Courses: " , this.state.selectedCourses);
        //console.log("object ids: ", this.getObjectIDs());
        var API_URL = process.env.REACT_APP_API_URL + "/courses/schedule";
        var requestDetail = {
            "objectIds": this.getObjectIDs(),
            "filter": {
                "time": this.props.postReqTime,
            }
        };
        await fetch(API_URL, {
            
            /* NOTE for duncan: when using the API, you can only set  */
            method: 'POST',

            /* Note to Duncan: don't set mode: to 'no-cors' because the API does have CORS. You can laeve the 'mode:' out and it will work */
            // mode: 'no-cors', // no-cors, *cors, same-origin

            headers: {
            'Content-Type': 'application/json'
            },
            /* Note to duncan: i dont think you need these. It still works without them i guess? */
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(requestDetail) // body data type must match "Content-Type" header
        })
        .then(async (response) => {
            console.log("waiting response")
            if (!response.ok) {
                console.log("response is not ok")
                throw await response.json()
            }
            else {
                console.log("response is ok")
                return response.json();
            }
        })
        .then(result => {
            //if the request is valid
            console.log("result post: " , result)
            this.setState({
                eventInfo: result.data
            });
            /* Note to Duncan: because this //console.log is inside a .then() statement, it will execute after response is received */
            //console.log("within post request event: ", this.state.eventInfo);
        }).catch(async (error) => {
                console.log("error encountered")
                this.setState({
                    requestError: true,
                    requestErrorReason: error.error
                });
            })

        /* Note to Duncan: this will show undefined because it will be executed before a response is received */
        //console.log("test thiis post request event: ", this.state.eventInfo);
        //console.log("defined? ", this.state.eventInfo != undefined);
        if (this.state.eventInfo != undefined) {
            //console.log("timeunspec", this.state.eventInfo["TimeUnspecified"]);
            await this.props.showUnscheduled(true, this.state.eventInfo["TimeUnspecified"]);
        }
    }

    async minusDay() 
    {   
        var mobileCount = this.state.mobileCount;
        await console.log("week minusDay() - b4 mobileCount: ", mobileCount);

        if (this.state.mobileCount  == 0) {
            await this.setState({
                mobileCount: 6,
            })
        }
        else {
            mobileCount = mobileCount - 1;
            await this.setState({
                mobileCount: mobileCount,
            })
        }
        await console.log("week minusDay() - after mobileCount: ", this.state.mobileCount);
    }

    async addDay() 
    {   
        var mobileCount = this.state.mobileCount;
        await console.log("week minusDay() - b4 mobileCount: ", mobileCount);

        if (this.state.mobileCount  == 6) {
            await this.setState({
                mobileCount: 0,
            })
        }
        else {
            mobileCount = mobileCount + 1;
            await this.setState({
                mobileCount: mobileCount,
            })
        }
        await console.log("week minusDay() - after mobileCount: ", this.state.mobileCount);
    }


    render () 
    {
        if (this.state.eventInfo === undefined && !this.props.drag && !this.state.requestError)
        {
            //console.log("check if list updates before: " , this.state.eventInfo);
            return (
                
                <div>
                    Loading Course Schedule... 
                </div>
            )
        }
        else if (this.state.eventInfo === undefined && !this.props.drag && this.state.requestError) {
            /* the request for schedule came back with an error */
            return (

                <div className={weekStyle.errorMessage}>
                    {this.state.requestErrorReason}
                </div>
            )
        }
        else if (!this.props.mobile) {
            /* renders desktop view screen size > 600 */
            if (this.props.drag)
            {
                /* drag box render */
                return(
                    <div className={weekStyle.dragBox}> 
                        <div className={weekStyle.dragWeekContainer }> 
                            <Day dow="" timeBar={true} courseSchedule={this.props.courseSchedule}></Day>
                            {this.state.dows.map(function (dow) {
                                
                                return <Day className={weekStyle.day} dow={dow} courseSchedule={{}} events={null} dayUpdateTimePref={this.dayUpdateTimePref.bind(this)} dayTimePref={this.props.dayTimePref} timeSlots={this.state.timeSlots[countMobile]}></Day>;
                            }, this)}
            
                        </div>
                    </div>
                    
                    
        
                )
            }
            else
            {
                /* schedule reneder */
                return(
                    <div>
                        <div className={weekStyle.weekContainer}>
                            <Day dow="" timeBar={true} courseSchedule={this.props.courseSchedule}></Day>
                            {this.state.dows.map(function (dow) {

                                return <Day className={weekStyle.day} dow={dow} courseSchedule={this.props.courseSchedule} events={this.state.eventInfo[dow]} ></Day>;
                            }, this)}
                        </div>
                        <div className={weekStyle.hintTextBox}>
                            <br/>
                            <br/>
                            <br/>
                            <br />
                            <br />
                            <div>
                                Click "Render Schedule" to retrieve randomized selections of the courses you want to take.
                            </div>
                            <div>
                                Click "Edit Time Preference" and select times of the day in which you ONLY want to take classes. 
                            </div>
                            <div>
                                Note: Days without selected time is assumed to be entirely free
                            </div>
                        </div>
                    </div>
                    
        
                )
            }
        }
        else {
            /* renders mobile view screen size <= 600 of dragbox*/
            if (this.props.drag)
            {
                var countMobile = this.state.mobileCount;
                console.log("Week render() - countMobile: " , countMobile);

                /* drag box render */
                return(
                    <div className={weekStyle.dragBox}> 
                            <div className={weekStyle.navDayContainer}>
                                <input type="button"  onClick={this.minusDay} value="ᐊ"/>
                                <input type="button"  onClick={this.addDay} value="ᐅ"/>
                            </div>
                        <div className={weekStyle.dragWeekContainer }> 
                            <Day dow="" timeBar={true} courseSchedule={this.props.courseSchedule}></Day>
                            <Day className={weekStyle.day} dow={this.state.dows[countMobile]} courseSchedule={{}} events={null} dayUpdateTimePref={this.dayUpdateTimePref.bind(this)} dayTimePref={this.props.dayTimePref} mobile={this.props.mobile} timeSlots={this.props.dayTimePref[countMobile]}></Day>
         
                        </div>
                    
                    </div>
                    
                    
        
                )
            }
            else
            {
                /* mobile view screen size <= 600 of course calendar */
                var countMobile = this.state.mobileCount;
                console.log("Week render() - countMobile: " , countMobile);

                return(
                    <div>
                        <div className={weekStyle.weekContainer}>
                            <div className={weekStyle.navDayContainer}>
                                <input type="button"  onClick={this.minusDay} value="ᐊ"/>
                                <input type="button"  onClick={this.addDay} value="ᐅ"/>
                            </div>
                            <div className={weekStyle.timeContainer}> 
                                <Day dow="" timeBar={true} courseSchedule={this.props.courseSchedule}></Day>
                                <Day className={weekStyle.day} dow={this.state.dows[countMobile]} courseSchedule={this.props.courseSchedule} events={this.state.eventInfo[this.state.dows[countMobile]]} mobile={this.props.mobile}></Day>
                            </div>
                           
                        </div>



                        <div className={weekStyle.hintTextBox}>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div>
                                Click "Render Schedule" to retrieve randomized selections of the courses you want to take.
                            </div>
                            <div>
                                Click "Edit Time Preference" and select times of the day in which you ONLY want to take classes. 
                            </div>
                            <div>
                                Note: Days without selected time is assumed to be entirely free
                            </div>
                        </div>
                    </div>
                    
        
                )
            }
        }
        
        

    }
}

export default Week;