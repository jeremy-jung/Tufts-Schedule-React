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

    showDetail()
    {
        this.setState({
            popDetail: !this.popDetail,
        })
    }
    
   

    render() {

      

        return (
            <div className={style.all}>

                <div >
                    <input type="button" onClick={this.showDetail} value={this.props.courseInfo.course_id} className={style.course}/>
                </div>  
                
                {this.state.popDetail ? <CourseDetailPop showDetail={()=> this.showDetail.bind(this)} courseInfo={this.props.courseInfo}></CourseDetailPop> : <div></div>}

            </div>

            
            );
        
       
        
      
    }
}

export default CourseSelected;