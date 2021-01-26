/*
    CourseDetailPop
    Created by Duncan Chang
*/
import React from 'react';
import style from './styles/Popup.module.css';


class CourseDetailPop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            showPop: true,
        }
        this.closePop = this.closePop.bind(this);
        this.removeCourse = this.removeCourse.bind(this);
    }

    /*  
     *  closePop()
     *  calls the closePop function in Homepage
     *  calls updateSelectedPop function in Homepage to reset alertMessage
     */ 
    async closePop()
    {
        console.log("test here:");
      
        await this.props.closePop();
        console.log("it's closed?");

    }

    async removeCourse()
    {
        await this.props.removeCourse(this.props.courseInfo);
        await this.closePop();
    }
   

    render() {
        
        return (
            <div>
                {/* container for the rest of info */}
                <div className={style.couresPopContainer} >
                
                    {/* This is the close div */}
                    <div className={style.closeContainer} >
                        <button className={style.close} onClick={this.closePop}>✕</button>
                    </div>
                    <p className={style.tit} >{this.props.courseInfo.course_id}</p>

                    <div className={style.courseInfo}>
                        {this.props.courseInfo.course_name}
                    </div>

                    
                    <br/>
                    <input type="button" value="Remove From List" className={style.removeCourse} onClick={this.removeCourse}></input>
                    
                </div>

                <br/>

                {/* // overlay div */}
                <div className={style.overlay}></div>

            </div>
           
            
        );
      
    }
}

export default CourseDetailPop;