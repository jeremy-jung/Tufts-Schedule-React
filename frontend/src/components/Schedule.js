/*
 * 
 */

import React from 'react';
import Event from './Event.js';


class Schedule extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            TimeRangeView: false,

        };

        this.handleTimeRangeView = this.handleTimeRangeView.bind(this);

    }

    handleTimeRangeView() {
  
        this.setState({
            TimeRangeView: !this.state.TimeRangeView
        });
        console.log(this.TimeRangeView);
    
    }

   


    render() {

        

        return (
            <main>
                <h1>
                    Schedule!
                </h1>
                <div className="navbar">
                    <button onClick={this.handleTimeRangeView}>{`${this.state.TimeRangeView ? 'My Schedule' : 'Time Range Selector'}`}</button>

                </div>
                
                <div>
                    <Event />
                </div>
            </main>
            
        )

    }
}
export default Schedule;