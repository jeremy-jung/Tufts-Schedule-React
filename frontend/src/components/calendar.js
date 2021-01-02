/*
 * install "react-big-calendar" and "moment"
 * check the following for the documentation
 * https://jquense.github.io/react-big-calendar/examples/index.html#intro check 
 * 
 */

import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css"; // needed for calendar styling

const localizer = momentLocalizer(moment);

class Cal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            events: [
                {
                  start: moment().toDate(),
                  end: moment()
                    .add(1, "days")
                    .toDate(),
                  title: "Some title"
                }
            ]

        }

    }


    rendCourses() {



    }



    render() {



        return (

            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                style={{ height: "100vh" }}
                startAccessor="start"
                endAccessor="end"

            />

        )

    }
}
export default Cal;