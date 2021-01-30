

import React, {useState} from 'react';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import eStyle from './calendarStyles/Event.module.css'


class Event extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            transY: this.props.transY,
            eventInfo: this.props.eventInfo,
            eventStyle: this.props.eventStyle,
            eventDetail: "",
            hov: false,

        };
        console.log("info: ", this.state.eventInfo);
        console.log("eventheight: " , this.getEventHeight);
        this.getEventHeight = this.getEventHeight.bind(this);
        this.getTranslate = this.getTranslate.bind(this);
        this.setEventDetail = this.setEventDetail.bind(this);
        this.dblClick = this.dblClick.bind(this);
        this.setEventDetail();

    }

    setEventDetail() {
        var detail = this.state.eventInfo.details.split(",");
        var courseID = detail[1];
        var courseName = detail[0];
        var res = "";
        console.log("detail: " + courseID + " - " + courseName);
        return courseID + " : " + courseName;

    }

    setEventHover() {
        var detail = this.state.eventInfo.name.split("-");
        var type = detail[1];
        var sec = detail[0];
        var res =  type + "-" + sec 
                    + " ▶" +this.state.eventInfo.time_start + "~" 
                    + this.state.eventInfo.time_end + "◀ "
                    +  " Location: " + this.state.eventInfo.location;
        console.log("doubleclicked");
        return res;
    }

    getEventHeight() {
        let res = 0;
        // end time hour - start time hour
        let hr = (parseInt(this.state.eventInfo.time_end.substring(0, 2)) - parseInt(this.state.eventInfo.time_start.substring(0, 2))) * 60
        console.log("eventheight hr: ", hr);
        // 60 - start time min + end time min
        let min = (hr + parseInt(this.state.eventInfo.time_end.substring(3, 5))) - parseInt(this.state.eventInfo.time_start.substring(3, 5))
        console.log("eventheight min: ", min);

        // // if start time's min == "00" then don't count start time's min
        // if (parseInt(this.state.eventInfo.time_start.substring(3, 5)) == 0)
        // {
        //     min = parseInt(this.state.eventInfo.time_end.substring(3, 5));
        // }

        res = min / 30 * 21;
        // // gets the height of event in px
        // res = (hr + min) * 21;
        console.log("eventheihgt: " + res + "px");
        return res;
    }


    // returns the px of translateY to put event at right Y pos
    getTranslate() {
        // 8:00 is translateY(43px)
        let res = 43;
        // start gives in the format of "00:00"
        let hr  = (parseInt(this.state.eventInfo.time_start.substring(0, 2)) - 8) * 2;
        let min = parseInt(this.state.eventInfo.time_start.substring(3, 5)) / 30;
        // half an hour is an additional of 21px
        res += ((hr + min) * 21)
        return res;
    }

    async dblClick() {
        await this.setState({
            hov: !this.state.hov
        })
        console.log("dblckickckc");
    }





    render () {

        let transY = "translateY(" + this.getTranslate() + "px)";
        let eventHeight = "" + this.getEventHeight() + "px";
        let eventStyle = {transform:`${transY}`, height:`${eventHeight}`};

        return (
            <input type="button" 
                    id="eventButton"
                    style={eventStyle} 
                    className={this.state.hov ? eStyle.eventButtonHover : eStyle.eventButton} 
                    onDoubleClick={() => this.dblClick()}
                    value={this.state.hov ? this.setEventHover() : this.setEventDetail()}/>
            

        );



    }
}

export default Event;