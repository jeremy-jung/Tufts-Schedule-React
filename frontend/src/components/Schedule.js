/*
 * install "react-big-calendar" and "moment"
 * check the following for the documentation
 * https://jquense.github.io/react-big-calendar/examples/index.html#intro check 
 * 
 */

import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css"; // needed for calendar styling

const DnDCalendar = withDragAndDrop(Calendar); // allow drags
const localizer = momentLocalizer(moment);

class Schedule extends React.Component {

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

    onEventResize = (data) => {
        const { start, end } = data;
    
        this.setState((state) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };
    

    onEventDrop = (data) => {
        console.log(data);
    };



    render() {



        return (
            <div className="scheduleView">
                <DnDCalendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="week"
                    events={this.state.events}
                    style={{ height: "100vh" }}
                    onEventDrop={this.onEventDrop}
                    onEventResize={this.onEventResize}
                    resizable
                    startAccessor="start"
                    endAccessor="end"

                />

            </div>
        )

    }
}
export default Schedule;