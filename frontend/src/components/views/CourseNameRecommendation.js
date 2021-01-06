/*
    Drop down list of course name suggestions
    Created by Jeremy Jung
*/

import React from 'react';
//import style from './styles/CourseNameRecommendation.module.css';


class CourseNameRecommendation extends React.Component {
    
    constructor (props) {
        super(props);
        console.log("render");

        this.state = {
            recommendedCourseIDs: null
        }
    }
    // O(k) where k is length of courseID
    recommendSearch(listCourseIDs, courseID) {
        var courseIDsRecommended = [];

        if (courseID != undefined || courseID != null) {
            // recommend if there is at least one character in input
            if (courseID[0] != undefined) {
                let courseIDLength = courseID.length;

                let mappedResults = listCourseIDs.data[courseID];
                var len = 5; 
                // if (listCourseIDs.length < 5)
                // {
                //     len = listCourseIDs.length() - 1;
                // }
                console.log("mappedResukt: " + mappedResults);
                //console.log("listCourseIDs: " + listCourseIDs);
                courseIDsRecommended = [];
                for (let i = 0; i < 5; i++) {
                    console.log("in here: " + mappedResults);
                    console.log("listCourseIDs: " + listCourseIDs);
                    courseIDsRecommended.push(mappedResults);
                }

               
            }
            else {
                courseIDsRecommended = [];
            }
        }
        else {
            courseIDsRecommended = [];
        }

        return courseIDsRecommended
    }

    render() {
        let currentInput = this.props.currentInput;
        let listCourseIDs = this.props.listCourseIDs;
        console.log("rendeing")
        var recommendedCourseIDs = this.recommendSearch(listCourseIDs, currentInput);

        console.log(recommendedCourseIDs);

        return(
            <datalist id="recommendedCourseIDs">
                {recommendedCourseIDs.map(function (id) {
                    return <option key={id} value={id} ></option>
                })}
            </datalist>
        );
    }

}
export default CourseNameRecommendation;