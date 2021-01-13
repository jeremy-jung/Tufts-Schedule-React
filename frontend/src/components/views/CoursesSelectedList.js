/*
    List containing selected selected courses represented by {CourseSelected}
    Created by Jeremy Jung
*/

import React from 'react';
import style from './styles/CoursesSelectedList.module.css';
import CourseSelected from './CourseSelected.js';
import {
    Link
} from "react-router-dom";
class CoursesSelectedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCourseIDs: this.props.listCourseIDs,
            coursePopDetail: false,
            popUp: this.props.popUp,
        }
        this.handlePop = this.handlePop.bind(this);
    }

    async handlePop()
    {
        
        await this.setState({
            popup: !this.state.popUp,
        })
    }
    

    render() {
       
        return (
            <div className = {this.props.popUp ? style.popContainer : style.container}id = "coursesSelectedList">
                <h2>Your selected courses</h2>
                <div>
                    {this.props.selectedCourses.map(function (courseInfo) {
                        return <CourseSelected courseInfo = {courseInfo} pop={false} handlePop = {()=>this.handlePop.bind(this)}></CourseSelected>
                    })}
                </div>
                <Link className = {style.button} onClick = {this.props.handleGenerate} to = "/schedule">
                    Schedule
                </Link>
            </div>
        );
    }
}

export default CoursesSelectedList;