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
        }

    }

    async handlePop()
    {
        console.log("coursePopDetail before: " , this.state.coursePopDetail);

        await this.setState({
            coursePopDetail: true,
        })
        console.log("coursePopDetail after: " , this.state.coursePopDetail);
    }
    
    async closePop()
    {
        await this.setState({
            coursePopDetail: false,
        })
    }

    // async removeCourse(item)
    // {
    //     await this.props.removeCourse(item);
    // }

    render() {
        console.log("my seleceted courses: " , this.props.selectedCourses);
        let containerClass;
        // checks which css class the container should follow
        if (this.state.coursePopDetail)
        {
            containerClass = false;
        }
        else
        {
            containerClass = this.props.popUp;
        }
        
        console.log("test this: " , this.state.coursePopDetail);
        console.log("containerClass: ", containerClass);
        return (
            <div className = {containerClass ? style.popContainer : style.container}id = "coursesSelectedList">
                <h2>Your selected courses</h2>
                <div className={this.state.coursePopDetail ? style.popCourseList : style.courseList}>
                    {this.props.selectedCourses.map(function (courseInfo) {
                        return <CourseSelected courseInfo = {courseInfo} pop={false} handlePop = {this.handlePop.bind(this)} closePop= {this.closePop.bind(this)} coursePopDetail = {this.state.coursePopDetail} removeCourse={this.props.removeCourse}></CourseSelected>
                    }, this)}
                </div>
                <br/>
                <Link className = {this.state.coursePopDetail ? style.popButton : style.button} onClick = {this.props.handleGenerate} to = "/schedule">
                    Schedule
                </Link>
            </div>
        );
    }
}

export default CoursesSelectedList;