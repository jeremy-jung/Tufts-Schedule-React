/*
    Popup
    Created by Duncan Chang
*/
import React from 'react';
import style from './styles/Popup.module.css';


class Popup extends React.Component {
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
            await this.props.closePop();
            this.props.updateSelectedPop("hey");
        }

    }
   

    render() {
        
        return (
            <div>
                <div className={style.popupContainer} >
                
                
                    <div className={style.closeContainer} >
                        <button className={style.close} onClick={this.closePop}>X</button>

                    </div>
                    <p className={style.tit} >Please select a class from the list!</p>
                    <div >
                        {this.props.popMap.map(function (courseInfo) {
                        
                            return <input className={style.popOptions} type="button" item={courseInfo} onClick={() => this.props.updateSelectedPop(courseInfo)} value={courseInfo.course_id + ":    " + courseInfo.course_name}/>

                            }, this)
                        }
                    
                        <div className={style.alert} id="alert">{this.props.alertMessage}</div>
                    </div>

                

                </div>
                <div className={style.overlay}></div>

            </div>
           
            
        );
      
    }
}

export default Popup;