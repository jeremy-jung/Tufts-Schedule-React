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
       
    }

    /*  
     *  closePop()
     *  calls the closePop function in Homepage
     *  calls updateSelectedPop function in Homepage to reset alertMessage
     */ 
    async closePop()
    {
        console.log("test here:");
        if (this.state.showPop)
        {
            await this.props.showDetail();
        }

    }
   

    render() {
        
        return (
            <div>
                {/* container for the rest of info */}
                <div className={style.coursePopContainer} >
                
                    {/* This is the close div */}
                    <div className={style.closeContainer} >
                        <button className={style.close} onClick={this.closePop}>X</button>
                    </div>

                    <p className={style.tit} >{this.props.courseInfo.course_id}</p>

                    <div >
                        
                    </div>
                </div>

                {/* // overlay div */}
                <div className={style.overlay}></div>

            </div>
           
            
        );
      
    }
}

export default CourseDetailPop;