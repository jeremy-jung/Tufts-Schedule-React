/*
    Pages: Home page
    Created by Jeremy Jung
*/

import React from 'react';
import Popup from 'reactjs-popup';
import CoursesSelectedList from './views/CoursesSelectedList.js';
import CourseNameRecommendation from './views/CourseNameRecommendation.js';
import OptionsMainList from './views/OptionsMainList.js';
import ButtonFBLogin from './views/ButtonFBLogin.js';
import style from './views/styles/Homepage.module.css';

/* scripts */

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCourseIDs: null, // all course IDs in semester catalog (mapped first letter)
            currentInput: null,
            recommendedCourseIDs: null,
            selectedCourses: [],
            checkSameID: true
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
            // needs checkSameID to be up to date. always.
            await this.handleCheckID(mappedResults);
            // if(this.state.checkSameID && mappedResults.length > 1)
            // {
            //     return <Popup 
            //     trigger={<div className="popUp">Add</div>} 
            //     position="right top"
            //     on="hover"
            //     closeOnDocumentClick
            //     mouseLeaveDelay={300}
            //     mouseEnterDelay={0}
            //     contentStyle={{ padding: "0px", border: "none" }}
            //     arrow={false} >

                    
            //     </Popup>;
            // }
            // console.log("selectedCourses: " + this.state.selectedCourses);
            // console.log("include? " + ( (this.state.selectedCourses.includes(mappedResults[0].course_id))));
            if (this.state.checkSameID && (this.state.selectedCourses.includes(mappedResults[0].course_id)))
            {
                window.alert("This course has already been added!");
            }
            else if (this.state.checkSameID || mappedResults.length == 1)
            {
                let name = this.state.currentInput.toUpperCase(); // get user input

                // UPDATE STATE selectedCourses 
                var arrayJoined = this.state.selectedCourses.concat(name);
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
            let pop;
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
                                    <div>
                                        <input className={style.courseSubmit} type="submit" value="Add" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <ButtonFBLogin></ButtonFBLogin>

                    </div>
                );
        }
    }
}

export default Homepage;