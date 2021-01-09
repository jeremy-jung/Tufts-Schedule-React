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
    recommendSearch (listCourseIDs, courseID) {
        var courseIDsRecommended = [];

        if (courseID != undefined || courseID != null) {

            // recommend if there is at least one character in input
            if (courseID[0] != undefined) {

                let mappedResults = listCourseIDs[courseID];

                if (mappedResults != undefined) {

                    let resultsMaxDisplay = 5;
                    
                    // lower maximum results length if one specified is greater than what's possible
                    if (resultsMaxDisplay > mappedResults.length)
                        resultsMaxDisplay = mappedResults.length

                    /* DEBUG: list all info */
                    // console.log("resultsMaxDisplay: ", resultsMaxDisplay)
                    // console.log("mappedResults:", mappedResults)
                    // console.log("mappedResults.length: ", mappedResults.length)
                    // console.log("mappedResults[0]: " + mappedResults[0]);
                    // console.log("mappedResults[0].course_id: " + mappedResults[0].course_id);

                    let i = 0;
                    /* add recommended courseIDs to list by amount specified by resultsMaxDisplay*/
                    while (courseIDsRecommended.length < resultsMaxDisplay && i < mappedResults.length) {
                        // console.log("i: ", i);
                        /* break if i is equal to the length of mappedResults */
                        if (i >= mappedResults.length)
                            break; 

                        let courseId = mappedResults[i].course_id;

                        /* check if the courseId already exists in courseIDsRecommended */
                        let doesNotExist = true;
                        for (let j = 0; j < courseIDsRecommended.length; j++) {

                            if (courseIDsRecommended[j] == courseId) {

                                doesNotExist = false;
                                break;
                            }
                        }

                        /* push to recommended list if entry does not yet exist */
                        if (doesNotExist) {
                            courseIDsRecommended.push(courseId);
                        }
                        i++;
                    }

                }
                else {
                    courseIDsRecommended = [];
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