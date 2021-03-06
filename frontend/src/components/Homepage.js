/*
    Pages: Home page
    Created by Jeremy Jung, Duncan Chang
*/

import React from 'react';
import CoursesSelectedList from './views/CoursesSelectedList.js';
import CourseNameRecommendation from './views/CourseNameRecommendation.js';
import style from './views/styles/Homepage.module.css';
import csStyle from './views/styles/CourseSchedule.module.css';
import Popup from './views/Popup.js';
import Week from './views/calendars/Week.js'

/* scripts */

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listCourseIDs: null, // all course IDs in semester catalog (mapped first letter)
            currentInput: null,
            recommendedCourseIDs: null,
            selectedCourses: [], // courses added to list
            checkSameID: true, // if courses returned from API has same couresID
            popUp: false, // the state of popUp
            popMap: [],
            alertMessage: " ", 
            renderSchedule: false,
            modifySearch: false, // true after render scheduled, false when user is able to add course on spot
            eventInfo: [], // parsed JSON of event info from post request
            drag: false, // if drag view is selected
            dragAbove: false,
            dayTimePref: {"Monday":[], "Tuesday":[],"Wednesday":[], "Thursday":[],"Friday":[], "Saturday":[],"Sunday":[] }, // stores the pref time in int
            postReqTime: {"Monday":[], "Tuesday":[],"Wednesday":[], "Thursday":[],"Friday":[], "Saturday":[],"Sunday":[] }, // stores the pref time in proper json format
            noTimeCourse: [],
            showNoTimeCourse: false,
            mobile: false,
        }


        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.updateSelectedPop = this.updateSelectedPop.bind(this);
        this.closeModifySearch = this.closeModifySearch.bind(this);
        this.handleCheckInclude = this.handleCheckInclude.bind(this);
        this.sortTimePref = this.sortTimePref.bind(this);
        this.handleReload = this.handleReload.bind(this);
        this.resizeScreen = this.resizeScreen.bind(this);
        /* this.showUnscheduled = this.showUnscheduled.bind(this); */
    }   

    resizeScreen() {
        if (window.innerWidth <= 600) {
            this.setState({
                mobile: true,
            })

        }
        else {
            this.setState({
                mobile: false,
            })
        }
        console.log("Homepage resizeScreen() - screensize: ", window.innerWidth);
    }

    /*
     * handleCheckID
     * checks if user is entering a valid courseID.
     * effect: sets checkSameID to false if multiple courses with different ID 
     *          is found, meaning that the user hasn't entered the exact courseID
     */
    handleCheckID(mappedResults) {
        // Debug purpose
        console.log("mappedResults length: " + mappedResults.length);
        console.log("checkSameID: " + this.state.checkSameID);
        console.log(mappedResults[0]);
        // console.log(mappedResults[1]);
        // console.log(mappedResults[0].course_id == mappedResults[1].course_id);

        
        let checkID = mappedResults[0].course_id;

        // checks if the user input is a valid courseID
        for (var i = 0; i < mappedResults.length; i++)
        {
            console.log(this.state.checkSameID);
            console.log("the length of mappedReusults:" + mappedResults.length);
            if (mappedResults[i].course_id !== checkID)
            {
                console.log("it went in here");
                // prevent user from adding incomplete course ID 
                this.setState({
                    checkSameID: false
                })
                break;
            }
            console.log(this.state.checkSameID);

        }

    }

    handleCheckInclude(mappedResult) {
        this.state.selectedCourses.map(function(course) {
            if (JSON.stringify(mappedResult) === JSON.stringify(course))
            {
                console.log("mappedResult: " , mappedResult);
                console.log("course: " , course);
                console.log("equal? " , JSON.stringify(mappedResult) === JSON.stringify(course));
                return true;
            }
        })
        return false;
    }

    // handles the add function. prevents user from adding non-existing courseID
    async handleAdd(event) {

        await this.setMessage(" ");

        console.log("the beginning state: " + this.state.checkSameID);
        //prevent default event handler
        event.preventDefault();
        let nameField = document.getElementById("input");
        let mappedResults = this.state.listCourseIDs[this.state.currentInput];

        // checks if user input is valid
        if (mappedResults !== undefined)
        {
            // resets the state of popUp
            this.setState({
                popUp: false,
            })
            // needs checkSameID to be up to date. always.
            await this.handleCheckID(mappedResults);

            // This if is to check if Popup is needed
            if(this.state.checkSameID && mappedResults.length > 1)
            {
                this.setState({
                    popUp: true,
                    popMap: mappedResults,
                })
            }
            // checks if a course has been added
            else if (this.state.checkSameID && (this.state.selectedCourses.includes(mappedResults[0])))
            {
                await this.setMessage("** This course has already been added! **");
            }
            // adds that one course to list
            else if (this.state.checkSameID && mappedResults.length === 1)
            {
                console.log("check multt add before" , mappedResults);
                console.log("check selectedcourses add before" , this.state.selectedCourses);
                console.log("check include again " , (this.state.selectedCourses.includes(mappedResults[0])))

                // let name = this.state.currentInput.toUpperCase(); // get user input
                let courseToAdd = mappedResults[0];
                // UPDATE STATE selectedCourses 
                var arrayJoined = this.state.selectedCourses.concat(courseToAdd);
                await this.setState({ selectedCourses: arrayJoined });
                console.log("check selectedcourses add after" , this.state.selectedCourses);

                nameField.value = "";
            }
            else{
                console.log("here 2");
                console.log("alerts here");
                // resets the state
                this.setState({
                    checkSameID: true,
                })
                await this.setMessage("** Please enter a VALID COURSE ID! **");
            }
        }
        // if user input is invalid
        else{
            await this.setMessage("** Please enter a VALID COURSE ID! **");

        }
        
        
    }

    /*  
     *  closePop()
     *  a callback function by Popup.js's closing div (x)
     *  manages the state of whether a Popup should be shown
     *  resets the state of popUp
     */ 
    closePop()
    {
        this.setState({
            popUp: false
        })
    }
   
    /*  
     *  updateSelectedPop()
     *  manages actions if a course is selected from Popup
     *  adds course to courselist 
     */ 
    async updateSelectedPop(popSelected)
    {
        console.log("close: " + popSelected);
        // checks if popUp should be shown, and if selected course was previously added
        if (this.state.popUp && !this.state.selectedCourses.includes(popSelected))
        {
            
            var arrayJoined = this.state.selectedCourses.concat(popSelected);
            console.log("test: " , popSelected);
            this.setState({ 
                selectedCourses: arrayJoined,
                popUp: false 
            });
            document.getElementById("input").value = "";
        }
        else if (this.state.popUp){
            console.log("this alert");
            await this.setMessage("** This Course Has Already Been Added! **");
        }
        else{
            document.getElementById("input").value = "";
            this.setMessage(" ");
        }
        
        
        
    }
    /*  
     *  setMessage()
     *  changes the message in div when called using {message}
     *  sets the state of alertMessage 
     */ 
    setMessage(message){
        this.setState({
            alertMessage: message,
        })
        
    }

    handleGenerate() {
        
        var selectedCourses = this.state.selectedCourses;
        console.log("handling generate");
        console.log("selectedCourses: ", selectedCourses);
    }

    componentDidMount() {
        // initialize {listCourseIDs} in this component's state
        this.getListCourseIDs();
        window.addEventListener("resize", this.resizeScreen());


    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeScreen())
    }
    
    async getListCourseIDs() {
        var API_URL = process.env.REACT_APP_API_URL + "/courses/alg/search-table";
        fetch(API_URL)
            .then(
                (response) => response.json()
            )
            .then(result => {
                //if the request is valid
                this.setState({
                    listCourseIDs: result.data,
                });
            },
            (error) => {
                console.log("error", error);
        });
    }



    /* CourseID input scripts */

    // todo: link
    handleChange() {
        console.log("handling change");
        let nameField = document.getElementById("input");
        let name = nameField.value.toLowerCase(); // get user input
        this.setState((state) => ({ currentInput: name })); // update state (currentInput)
        
    }

    /*  
     *  removeCourse(item)
     *  deletes the course specified (passed in as "item") 
     *  looks through selectedCourses, finds, then delete
     */ 
    async removeCourse(item) {
        
        var res = this.state.selectedCourses;
        // look for the index and remove
        for (var i = 0 ; i < this.state.selectedCourses.length; i++)
        {
            if (this.state.selectedCourses[i] === item)
            {
                delete res[i]
                await this.setState({
                    selectedCourses: res,
                })
                break;
            }
        }

    }
    async handleSchedule(check) {
        await this.setState({
            renderSchedule: check,
            modifySearch: check,
        })
        console.log("schedule called");
        console.log(this.state.renderSchedule);
        await this.getListCourseIDs();
        console.log("called rerender");
        this.convertSchedulePref();
        await this.setState({
            renderSchedule:false,
        })
        await this.setState({
            renderSchedule:true,
        })
        // runs post request 
        // await this.getRecSchedule();
    }


    async closeModifySearch(){
        await this.setState({
            modifySearch: false,
        })
    }

    async storeTimePref(timePref)
    {
        await this.setState({            
            dayTimePref: timePref,
        })

    }

    async sortTimePref()
    {
        console.log("called here from HOME");
        for (var key in this.state.dayTimePref) {
            console.log("try print sort: " , this.state.dayTimePref[key].sort());
            this.state.dayTimePref[key] = this.state.dayTimePref[key].sort();
            
            console.log("HOME - sorted: " , this.state.dayTimePref[key]);
        }
    }

    convertTimeIntToString(time)
    {
        var hours = Math.trunc(time / 100);
        var minutes = time % 100 + hours * 60;
        console.log("minutes with hour: " , minutes);
        hours = Math.trunc(minutes / 60);
        minutes = minutes % 60;
        console.log("intToString - time: " , time , " hour: ", hours, " minute: " , minutes);
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
        for (var key in this.state.dayTimePref) {
            /* reset all to empty */
            this.state.postReqTime[key] = [];
            // check if it's empty, empty -> 00:00 to 23:59
            if (this.state.dayTimePref[key].length == 0)
            {
                this.state.postReqTime[key].push({
                    "time_earliest": "00:00",
                    "time_latest": "23:59"
                });
            }
            else if (this.state.dayTimePref[key].length == 1)
            {
                var begin = this.state.dayTimePref[key][0];
                var end = this.state.dayTimePref[key][0] + 30;
                
                this.state.postReqTime[key].push({
                    "time_earliest": this.convertTimeIntToString(begin),
                    "time_latest": this.convertTimeIntToString(end)
                });
            }
            else {
                var begin = this.state.dayTimePref[key][0];
                for (var i = 1; i < this.state.dayTimePref[key].length; i++)
                {
                    // if the time is not consecutive from previous
                    console.log("prev: ", this.state.dayTimePref[key][i-1], " current: ", this.state.dayTimePref[key][i]);
                    if ((this.state.dayTimePref[key][i - 1] + 30) != (this.state.dayTimePref[key][i]))
                    {
                        this.state.postReqTime[key].push({
                            "time_earliest": this.convertTimeIntToString(begin),
                            "time_latest": this.convertTimeIntToString(this.state.dayTimePref[key][i - 1] + 30)
                        });
                        begin = this.state.dayTimePref[key][i];
                        // if time is the end, and not consecutive from previous
                        if (i == (this.state.dayTimePref[key].length - 1))
                        {
                            this.state.postReqTime[key].push({
                                "time_earliest": this.convertTimeIntToString(begin),
                                "time_latest": this.convertTimeIntToString(begin + 30)
                            });
                        }
                    }
                    // if time is consecutive, but last
                    else if (i == (this.state.dayTimePref[key].length - 1))
                    {
                        this.state.postReqTime[key].push({
                            "time_earliest": this.convertTimeIntToString(begin),
                            "time_latest": this.convertTimeIntToString(this.state.dayTimePref[key][i] + 30)
                        });
                    }
                    
                }
            }
            

            
            
        }
    }

    async handleReload() 
    {
        console.log("handleReload() clicked\n");
        this.setState({
            drag: !this.state.drag,
        })
        if (this.state.drag) {
            this.setState({
                modifySearch: true,
            });
            console.log("Homepage handleReload() - Modify Search Bar should be turned off");
            await this.sortTimePref();
            await this.convertSchedulePref();
            this.handleSchedule(true);


        }
    }

    showUnscheduled = (show, courses) => {
        console.log("showUnscheduled is called ", show, courses);
        if (show) {
            this.setState({
                noTimeCourse: courses,
                showNoTimeCourse: true,
            })
            /* this.state.noTimeCourse = courses; */
            console.log("unscheduled courses? " , this.state.noTimeCourse);
            /* this.state.showNoTimeCourse = true; */

        }
        else {
            this.state.noTimeCourse =[];
            console.log("unscheduled courses? ", this.state.noTimeCourse);
            this.state.showNoTimeCourse = false;
        }
    }

    render() {
        console.log("HOMEPAGE: daytimepref: ", this.state.dayTimePref);
        const {showNoTimeCourse, NoTimeCourse} = this.state;
        /* asynchronously render home page after getting courseIDs*/
        if (!this.state.mobile) {

        }
        else {

        }
        if (this.state.listCourseIDs == null) {
            // render loading state...
            return (
                <div className={style.loadContainer}>
                    Loading...
                </div>
            );
        }
        else {
            /* desktop view screen size > 600 */
            if (!this.state.mobile) {
                return (

                    <div className={csStyle.csContainer}>
                        {/* part 1 header logo and stuff  */}
                        <header >
                            <h1>Schedule Planner</h1>
                            <br/>
                            <br/>
                        </header>
        
                        {/* part 2 the rest goes in flex column */}
                        <div className={csStyle.columnContainer}>
                            <div className={csStyle.searchContainer}>
                                    
                                {/* part 2-1 the selected courses block */}
                                <CoursesSelectedList 
                                    handleGenerate = {this.handleGenerate.bind(this)} 
                                    selectedCourses={this.state.selectedCourses} 
                                    listCourseIDs = {this.state.listCourseIDs} 
                                    popUp={this.state.popUp} 
                                    removeCourse={this.removeCourse.bind(this)} 
                                    setMessage={this.setMessage.bind(this)} 
                                    handleSchedule={this.handleSchedule.bind(this)}>
                                </CoursesSelectedList>
    
                                {/* Course Time Unspecified List */}
                                {this.state.showNoTimeCourse ? 
                                    <div className={csStyle.unscheduledBox}> 
                                        <div type="text" value="Course Time Unspecified" className={csStyle.unscheduledBoxTitle}>Course Time Unspecified</div>
                                        {this.state.noTimeCourse.map(function (course){
                                            console.log("course from unscheduled: " , course);
                                            return <div className={csStyle.unscheduled}>{course.details + " " + course.name}</div>
                                        }, this)}
                                    </div>
                                    :
                                    <p></p>
                                }
        
        
                            </div>
                            
                            
                            
                            {/* part 2-2 flex row the search input and calendar */}
                            <div className={(this.state.renderSchedule || this.state.drag)? csStyle.verticalContainer : csStyle.verticalContainerEmpty}>
                                
    
                                {this.state.modifySearch ? 
            
                                    // the modify search button
                                    <input className={csStyle.courseSubmit} type="button" value="Modify List" onClick={this.closeModifySearch} /> :
    
                                    // or the input field that allows user to add courses
                                    <div className={csStyle.inputContainer}>
    
    
                                        {/* handles the add course form */}
                                        <form onSubmit={this.handleAdd}>
                                            
                                            {/* input text field and search rec droplist */}
                                            <div>
                                                <input className={csStyle.courseInput} onChange={this.handleChange} list='recommendedCourseIDs' id="input" type="text" autoComplete="off" placeholder="CS-0015" />
                                                
                                                <CourseNameRecommendation 
                                                    listCourseIDs = {this.state.listCourseIDs} 
                                                    currentInput = {this.state.currentInput}>
                                                </CourseNameRecommendation>
                                            </div>
                                            &nbsp;
                                            {/* add button */}
                                            {this.state.popUp ? 
                                                // popup for courses of same id but diff names
                                                <Popup 
                                                    popMap={this.state.popMap} 
                                                    updateSelectedPop={this.updateSelectedPop.bind(this)} 
                                                    closePop={this.closePop.bind(this)} 
                                                    setMessage={this.setMessage.bind(this)}  >
                                                </Popup> : 
    
                                                // or just the add button
                                                <input className={csStyle.courseAdd} type="submit" value="Add" />
                                            }
    
                                        </form>
    
                                        <br/>
    
                                        {/* the alert message */}
                                        {(this.state.alertMessage.localeCompare(" "))? <div className={csStyle.alert} id="alert">{this.state.alertMessage}</div> : <div className={style.noAlert} id="alert">{this.state.alertMessage}</div>}
                                        
                                </div>
    
                            }
    
    
    
    
    
    
    
    
    
    
    
                                {this.state.renderSchedule ? <input type="button" className={csStyle.timePref} value={this.state.drag ? "View Schedule" : "Edit Time Preference"} onClick={()=> this.handleReload()}/> : <br></br>}
                                <br/>
                                {this.state.renderSchedule ? <Week courseSchedule={true} selectedCourses={this.state.selectedCourses} eventInfo={this.state.eventInfo} drag={false} dayTimePref={this.state.dayTimePref} postReqTime={this.state.postReqTime} showUnscheduled={this.showUnscheduled.bind(this)} mobile={this.state.mobile}></Week> : <p></p>}
                                {this.state.drag ? <Week courseSchedule={true} selectedCourses={this.state.selectedCourses} eventInfo={{}} drag={true} storeTimePref={() => this.storeTimePref.bind(this)} dayTimePref={this.state.dayTimePref} mobile={this.state.mobile}></Week> : <p></p>}
        
        
                            </div>
        
        
        
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <footer class={csStyle.footer}>
                            <br/>
                            <div>By Jeremy Jung, Duncan Chang</div>
                            <br/>
                        </footer>
        
        
        
                    </div>
                
                );
            }
            else {
                /* mobile view */
                return (

                    <div className={csStyle.csContainer}>
                        {/* part 1 header logo and stuff  */}
                        <header >
                            <h1>Schedule Planner</h1>
                            <br/>
                            <br/>
                        </header>
    
                            
                        {/* part 2-2 flex row the search input and calendar */}
                        <div className={(this.state.renderSchedule || this.state.drag)? csStyle.verticalContainer : csStyle.verticalContainerEmpty}>
                                
    
                            {this.state.modifySearch ? 
            
                                // the modify search button
                                <input className={csStyle.courseSubmit} type="button" value="Modify List" onClick={this.closeModifySearch} /> :
    
                                // or the input field that allows user to add courses
                                <div className={csStyle.inputContainer}>
    
    
                                    {/* handles the add course form */}
                                    <form onSubmit={this.handleAdd}>
                                                
                                        {/* input text field and search rec droplist */}
                                        <div>
                                            <input className={csStyle.courseInput} onChange={this.handleChange} list='recommendedCourseIDs' id="input" type="text" autoComplete="off" placeholder="CS-0015" />
                                                    
                                            <CourseNameRecommendation 
                                                        listCourseIDs = {this.state.listCourseIDs} 
                                                        currentInput = {this.state.currentInput}>
                                            </CourseNameRecommendation>
                                        </div>
                                        &nbsp;
                                        {/* add button */}
                                        {this.state.popUp ? 
                                            // popup for courses of same id but diff names
                                            <Popup 
                                                        popMap={this.state.popMap} 
                                                        updateSelectedPop={this.updateSelectedPop.bind(this)} 
                                                        closePop={this.closePop.bind(this)} 
                                                        setMessage={this.setMessage.bind(this)}  >
                                            </Popup> : 
        
                                            // or just the add button
                                            <input className={csStyle.courseAdd} type="submit" value="Add" />
                                        }
        
                                    </form>
        
                                    <br/>
        
                                    {/* the alert message */}
                                    {(this.state.alertMessage.localeCompare(" "))? <div className={csStyle.alert} id="alert">{this.state.alertMessage}</div> : <div className={style.noAlert} id="alert">{this.state.alertMessage}</div>}



                                    



                                </div>
    
                            }



                           {/* part 2-1 the selected courses block */}
                           <CoursesSelectedList 
                                            handleGenerate = {this.handleGenerate.bind(this)} 
                                            selectedCourses={this.state.selectedCourses} 
                                            listCourseIDs = {this.state.listCourseIDs} 
                                            popUp={this.state.popUp} 
                                            removeCourse={this.removeCourse.bind(this)} 
                                            setMessage={this.setMessage.bind(this)} 
                                            handleSchedule={this.handleSchedule.bind(this)}>
                            </CoursesSelectedList>
            
                            {/* Course Time Unspecified List */}
                            {this.state.showNoTimeCourse ? 
                                <div className={csStyle.unscheduledBox}> 
                                    <div type="text" value="Course Time Unspecified" className={csStyle.unscheduledBoxTitle}>Course Time Unspecified</div>
                                    {this.state.noTimeCourse.map(function (course){
                                        console.log("course from unscheduled: " , course);
                                        return <div className={csStyle.unscheduled}>{course.details + " " + course.name}</div>
                                    }, this)}
                                </div>
                                :
                                <p></p>
                            }
    
    
    
                            {this.state.renderSchedule ? <input type="button" className={csStyle.timePref} value={this.state.drag ? "View Schedule" : "Edit Time Preference"} onClick={()=> this.handleReload()}/> : <br></br>}
                            <br/>
                            {this.state.renderSchedule ? <Week courseSchedule={true} selectedCourses={this.state.selectedCourses} eventInfo={this.state.eventInfo} drag={false} dayTimePref={this.state.dayTimePref} postReqTime={this.state.postReqTime} showUnscheduled={this.showUnscheduled.bind(this)} mobile={this.state.mobile}></Week> : <p></p>}
                            {this.state.drag ? <Week courseSchedule={true} selectedCourses={this.state.selectedCourses} eventInfo={{}} drag={true} storeTimePref={() => this.storeTimePref.bind(this)} dayTimePref={this.state.dayTimePref} mobile={this.state.mobile}></Week> : <p></p>}
        
        
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                      
                        <br/>
                        <footer class={csStyle.footer}>
                            <br/>
                            <div>By Jeremy Jung, Duncan Chang</div>
                            <br/>
                        </footer>
        
        
                    </div>
                        
        
        
        
        
                
                );
    
            }
            
        }
    }
}

export default Homepage;