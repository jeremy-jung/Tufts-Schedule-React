/*
    Pages: Home page
    Created by Jeremy Jung
*/

import React from 'react';
// import Popup from 'reactjs-popup';
import CoursesSelectedList from './views/CoursesSelectedList.js';
import CourseNameRecommendation from './views/CourseNameRecommendation.js';
import style from './views/styles/Homepage.module.css';
import Popup from './views/Popup.js';

/* scripts */

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listCourseIDs: null, // all course IDs in semester catalog (mapped first letter)
            currentInput: null,
            recommendedCourseIDs: null,
            selectedCourses: [],
            checkSameID: true,
            popUp: false,
            popMap: [],
            alertMessage: "***",
        }


        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.updateSelectedPop = this.updateSelectedPop.bind(this);
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

    // handles the add function. prevents user from adding non-existing courseID
    async handleAdd(event) {

        await this.setMessage("***");

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
            else if (this.state.checkSameID || mappedResults.length === 1)
            {
                // let name = this.state.currentInput.toUpperCase(); // get user input
                let courseToAdd = mappedResults[0];
                // UPDATE STATE selectedCourses 
                var arrayJoined = this.state.selectedCourses.concat(courseToAdd);
                this.setState({ selectedCourses: arrayJoined });

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
            this.setMessage("***");
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
                    listCourseIDs: result.data
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

    render() {

        /* asynchronously render home page after getting courseIDs*/
        if (this.state.listCourseIDs == null) {
            // render loading state...
            return (
                <div className={style.container}>
                    Loading...
                </div>
            );
        }
        else {
            // render real UI..
                return (
                    <div className={style.container}>
                        <header className={style.logoContainer}>
                            <h1>Schedule Planner</h1>
                            <br/>
                            <br/>
                        </header>
                        <CoursesSelectedList handleGenerate = {this.handleGenerate.bind(this)} selectedCourses={this.state.selectedCourses} listCourseIDs = {this.state.listCourseIDs} popUp={this.state.popUp} removeCourse={this.removeCourse.bind(this)}>
                            <input type = "submit"></input>
                        </CoursesSelectedList>
                        <div className={style.containerInput}>

                            <h2>Choose a course</h2>
                            <div>
                                <form onSubmit={this.handleAdd}>
                                    <div>
                                        <input onChange={this.handleChange} list='recommendedCourseIDs' id="input" className={style.courseInput} type="text" autoComplete="off" placeholder="COMP-0015" />
                                        <CourseNameRecommendation listCourseIDs = {this.state.listCourseIDs} currentInput = {this.state.currentInput}></CourseNameRecommendation>
                                    </div>
                                    <div id = "addPop">
                                        {this.state.popUp ? <Popup popMap={this.state.popMap} updateSelectedPop={this.updateSelectedPop.bind(this)} closePop={this.closePop.bind(this)} setMessage={this.setMessage.bind(this)}  /> : <input className={style.courseSubmit} type="submit" value="Add" />}
                                        
                                    </div>
                                </form>
                            </div>


                            <br/>
                            {(this.state.alertMessage.localeCompare("***"))? <div className={style.alert} id="alert">{this.state.alertMessage}</div> : <div className={style.noAlert} id="alert">{this.state.alertMessage}</div>}
                        </div>
                        
                    </div>
                
            );
        }
    }
}

export default Homepage;