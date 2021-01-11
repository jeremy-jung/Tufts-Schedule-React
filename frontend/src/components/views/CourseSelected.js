/*
    Selected course
    Created by Jeremy Jung
*/
import React from 'react';
import style from './styles/CourseSelected.module.css';
import popStyle from './styles/Popup.module.css';


class CourseSelected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlight: false
        }
        this.changeHighlight = this.changeHighlight.bind(this);
    }

    handleSubmit(event) {
        //prevent default event handler
        event.preventDefault();
    }
    // updateSelectedPop(courseInfo)
    // {
    //     this.props.updateSelectedPop(courseInfo);
    // }

    changeHighlight() {
        this.setState({
            highlight: !this.state.highlight,
        })
    }
   

    render() {

        if (this.props.pop)
        {
            return (
                // <input type="radio" value={this.props.courseInfo.course_name} id={this.props.courseInfo.course_name}/>
                <input type="submit" item={this.props.courseInfo} className={this.state.highlight? popStyle.highlightButt: popStyle.butt} onClick={this.changeHighlight} value={this.props.courseInfo.course_id + "    " + this.props.courseInfo.course_name}/>
                
            );
        }
        else{
            return (
                <div className={style.course}>
                    {this.props.courseInfo.course_id}
                </div>
                );
        }
       
        
      
    }
}

export default CourseSelected;