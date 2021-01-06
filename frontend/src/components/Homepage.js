/*
    Pages: Home page
    Created by Jeremy Jung
*/

import React from 'react';
import CoursesSelectedList from './views/CoursesSelectedList.js';
import CourseNameRecommendation from './views/CourseNameRecommendation.js';
import OptionsMainList from './views/OptionsMainList.js';
import style from './views/styles/Homepage.module.css';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCourseIDs: null, // all course IDs in semester catalog (mapped first letter)
            currentInput: null,
            recommendedCourseIDs: null,
            selectedCourses: []
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleAdd(event) {
        //prevent default event handler
        event.preventDefault();

        let nameField = document.getElementById("input");
        let name = nameField.value.toUpperCase(); // get user input

        // UPDATE STATE selectedCourses 
        var arrayJoined = this.state.selectedCourses.concat(name);
        this.setState({ selectedCourses: arrayJoined });

        nameField.value = "";
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
                        <CoursesSelectedList handleGenerate = {this.handleGenerate.bind(this)} selectedCourses={this.state.selectedCourses}>
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
                        <OptionsMainList></OptionsMainList>
                    </div>
                );
        }
    }
}

export default Homepage;