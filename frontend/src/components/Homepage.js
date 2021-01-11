/*
    Pages: Home page
    Created by Jeremy Jung
*/

import React from 'react';
// import Popup from 'reactjs-popup';
import CoursesSelectedList from './views/CoursesSelectedList.js';
import CourseNameRecommendation from './views/CourseNameRecommendation.js';
import OptionsMainList from './views/OptionsMainList.js';
import style from './views/styles/Homepage.module.css';
import Popup from './views/Popup.js';

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
        }


        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
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
            if (mappedResults[i].course_id != checkID)
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
        console.log("the beginning state: " + this.state.checkSameID);
        //prevent default event handler
        event.preventDefault();
        let nameField = document.getElementById("input");
        let mappedResults = this.state.listCourseIDs[this.state.currentInput];
        // checks if user input is valid
        if (mappedResults != undefined)
        {
            // resets the state of popUp
            this.setState({
                popUp: false,
            })
            // needs checkSameID to be up to date. always.
            await this.handleCheckID(mappedResults);
            if(this.state.checkSameID && mappedResults.length > 1)
            {
                this.setState({
                    popUp: true,
                    popMap: mappedResults,
                })
            }
            // console.log("selectedCourses: " + this.state.selectedCourses);
            // console.log("include? " + ( (this.state.selectedCourses.includes(mappedResults[0].course_id))));
            else if (this.state.checkSameID && (this.state.selectedCourses.includes(mappedResults[0])))
            {
                window.alert("This course has already been added!");
            }
            else if (this.state.checkSameID || mappedResults.length == 1)
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
                window.alert("Please enter a VALID COURSE ID!");
                console.log("alerts here");
                // resets the state
                this.setState({
                    checkSameID: true
                })
            }
        }
        else{
            console.log("here 1's map: " + mappedResults);
            console.log("here 1");
            window.alert("Please enter a VALID COURSE ID!");
        }
        
        
    }

    closePop()
    {
        this.setState({
            popUp: false
        })
    }
   
    // updates selected list
    updateSelectedPop(popSelected)
    {
        console.log("close: " + popSelected);
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
            window.alert("This course has already been added!");
        }
        else{
            document.getElementById("input").value = "";
        }
        
        
        
    }

    handleGenerate() {
        
        var selectedCourses = this.state.selectedCourses;
        console.log("handling generate");
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
                        <CoursesSelectedList handleGenerate = {this.handleGenerate.bind(this)} selectedCourses={this.state.selectedCourses} listCourseIDs = {this.state.listCourseIDs}>
                            <input type = "submit"></input>
                        </CoursesSelectedList>
                        <div className={style.containerInput}>
                            <h1>Choose a course</h1>
                            <div>
                                <form onSubmit={this.handleAdd}>
                                    <div>
                                        <input onChange={this.handleChange} list='recommendedCourseIDs' id="input" className={style.courseInput} type="text" autoComplete="off" placeholder="COMP-0015" />
                                        <CourseNameRecommendation listCourseIDs = {this.state.listCourseIDs} currentInput = {this.state.currentInput}></CourseNameRecommendation>
                                    </div>
                                    
                                    <div id = "addPop">
                                        {this.state.popUp ? <Popup popMap={this.state.popMap} updateSelectedPop={this.updateSelectedPop.bind(this)} closePop={this.closePop.bind(this)}  /> : <input className={style.courseSubmit} type="submit" value="Add" />}
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                        <OptionsMainList></OptionsMainList>
                    </div>
                );
        }
    }
}

export default Homepage;