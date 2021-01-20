

import React from 'react';
import eStyle from './calendarStyles/Event.module.css'


class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            transY: this.props.transY,
            eventInfo: this.props.eventInfo,
            eventStyle: this.props.eventStyle,
            eventDetail: "",

        };
        


    }

    getEventInfo() {
       

    }

    getEventHeight() {
        let res = 0;
        // start time hour - end time hour
        let hr = (parseInt(this.state.eventInfo.start.substring(0, 2)) - parseInt(this.state.eventInfo.end.substring(0, 2))) * 2
        
        // 60 - start time min + end time min
        let min = (60 - parseInt(this.state.eventInfo.start.substring(3, 5))) + parseInt(this.state.eventInfo.end.substring(3, 5))
        // if start time's min == "00" then don't count start time's min
        if (parseInt(this.state.eventInfo.start.substring(3, 5)) == 0)
        {
            min = parseInt(this.state.eventInfo.end.substring(3, 5));
        }

        min = min / 30;
        // gets the height of event in px
        res = (hr + min) * 21;
        return res;
    }


    // returns the px of translateY to put event at right Y pos
    getTranslate() {
        // 8:00 is translateY(43px)
        let res = 43;
        // start gives in the format of "00:00"
        let hr  = (parseInt(this.state.eventInfo.start.substring(0, 2)) - 8) * 2;
        let min = parseInt(this.state.eventInfo.start.substring(3, 5)) / 30;
        // half an hour is an additional of 21px
        res += ((hr + min) * 21)
        return res;
    }





    render () {

        return (
            <input type="button" style={this.state.eventStyle} className={eStyle.eventButton} value={this.state.eventDetail}/>
            

        );



    }
}

export default Event;