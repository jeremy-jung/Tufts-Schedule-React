/*
    Selected course
    Created by Jeremy Jung
*/
import React from 'react';
import style from './styles/CourseSelected.module.css';
import CourseDetailPop from './CourseDetailPop'

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
    }
    
   

    render() {

      

        return (
            <div className={style.all}>

                <div >
                    <input type="button" onClick={this.showDetail} value={this.props.courseInfo.course_id} className={this.state.popDetail ? style.popCourse : style.course}/>
                </div>  
                
                {this.state.popDetail ? <CourseDetailPop showDetail={()=> this.showDetail.bind(this)} courseInfo={this.props.courseInfo} closePop={this.closePop.bind(this)}></CourseDetailPop> : <div></div>}

            </div>

            
            );
        
       
        
      
    }
}

export default CourseSelected;