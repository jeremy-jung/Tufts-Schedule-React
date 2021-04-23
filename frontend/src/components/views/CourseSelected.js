/*
    Selected course
    Created by Jeremy Jung
*/
import React from 'react';
import style from './styles/CourseSelected.module.css';
import CourseDetailPop from './CourseDetailPop'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

class CourseSelected extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            popDetail: false,
        }

        this.showDetail = this.showDetail.bind(this);

    }

    handleSubmit(event) {
        //prevent default event handler
        event.preventDefault();
    }

    async showDetail()
    {
        console.log("it called this");
        await this.setState({
            popDetail: true,
        })
        console.log("did it call, " , this.state.popDetail);
        await this.props.handlePop();
        console.log("did it call here");

    }

    async closePop()
    {
        await this.setState({
            popDetail: false,
        })
        await this.props.closePop();
    }
    
   

    render() {
        console.log("popDetail: " , this.state.popDetail);
      

        return (
            <div className={style.all}>

                <input type="button" onClick={this.showDetail} value={this.props.courseInfo.course_id} className={this.props.coursePopDetail ? style.popCourse : style.course}/>
                
                {this.state.popDetail ? <CourseDetailPop showDetail={()=> this.showDetail.bind(this)} courseInfo={this.props.courseInfo} closePop={this.closePop.bind(this)} removeCourse={this.props.removeCourse}></CourseDetailPop> : <span></span>}

            </div>

            
            );
        
       
        
      
    }
}

export default CourseSelected;