/*
 *
 *
 */

import React from 'react';


class Event extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
        }

    }
   


    render() {
        let weekTitle = "";
        let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        for (let i = 0; i < 5; i++)
        {
            weekTitle += "<div className=\"" + week[i] + "\" >"+ week[i] + "</div>";
        }
        return(
            <div className="calendar">
           
                <div className="weekTitle">
                    <div className="blank">

                    </div>
                    {weekTitle}

                </div>
                <div className="events">

                </div>

            </div>

        )


    }
}
export default Event;