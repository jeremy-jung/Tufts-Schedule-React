(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{13:function(e,t,n){e.exports={container:"Homepage_container__cwfji",containerInput:"Homepage_containerInput__2lEJ8",courseInput:"Homepage_courseInput__1Wo5U",courseSubmit:"Homepage_courseSubmit__3ylg9"}},21:function(e,t,n){e.exports={container:"CoursesSelectedList_container__1Tmkz",button:"CoursesSelectedList_button__2lQ6A"}},25:function(e,t,n){e.exports={course:"CourseSelected_course__3NBu-"}},27:function(e,t,n){e.exports={button:"ButtonFBLogin_button__1iqyz"}},40:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n(0),c=n.n(a),o=n(17),i=n.n(o),r=n(4),u=n(5),l=n(7),d=n(6),h=n(16),j=n.n(h),p=n(20),b=n(8),g=(n(34),n(21)),m=n.n(g),f=n(25),v=n.n(f),O=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){return Object(r.a)(this,n),t.call(this,e)}return Object(u.a)(n,[{key:"handleSubmit",value:function(e){e.preventDefault()}},{key:"render",value:function(){return Object(s.jsx)("div",{className:v.a.course,children:this.props.courseID})}}]),n}(c.a.Component),k=n(14),I=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={listCourseIDs:s.props.listCourseIDs},s}return Object(u.a)(n,[{key:"render",value:function(){return Object(s.jsxs)("div",{className:m.a.container,id:"coursesSelectedList",children:[Object(s.jsx)("h1",{children:"Your selected courses"}),Object(s.jsx)("div",{children:this.props.selectedCourses.map((function(e){return Object(s.jsx)(O,{courseID:e})}))}),Object(s.jsx)(k.b,{className:m.a.button,onClick:this.props.handleGenerate,to:"/schedule",children:"Schedule"})]})}}]),n}(c.a.Component),x=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(r.a)(this,n),s=t.call(this,e),console.log("render"),s.state={recommendedCourseIDs:null},s}return Object(u.a)(n,[{key:"recommendSearch",value:function(e,t){var n=[],s=[];if(void 0!=t||null!=t)if(void 0!=t[0])if(void 0!=(s=e[t])){var a=5;a>s.length&&(a=s.length);for(var c=0;n.length<a&&c<s.length&&!(c>=s.length);){var o=s[c].course_id;console.log("mappedResults:",s);for(var i=!0,r=0;r<n.length;r++)if(n[r]==o){i=!1;break}i&&n.push(o),c++}}else n=[];else n=[];else n=[];return n}},{key:"render",value:function(){var e=this.props.currentInput,t=this.props.listCourseIDs,n=this.recommendSearch(t,e);return console.log("recommendedCourseIDs: "+n),Object(s.jsx)("datalist",{id:"recommendedCourseIDs",children:n.map((function(e){return Object(s.jsx)("option",{value:e},e)}))})}}]),n}(c.a.Component),C=n(13),B=n.n(C),D=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={listCourseIDs:null,currentInput:null,recommendedCourseIDs:null,selectedCourses:[],checkSameID:!0},s.handleAdd=s.handleAdd.bind(Object(b.a)(s)),s.handleChange=s.handleChange.bind(Object(b.a)(s)),s}return Object(u.a)(n,[{key:"handleCheckID",value:function(e){console.log("mappedResults length: "+e.length),console.log("checkSameID: "+this.state.checkSameID),console.log(e[0]);for(var t=e[0].course_id,n=0;n<e.length;n++){if(console.log(this.state.checkSameID),console.log("the length of mappedReusults:"+e.length),e[n].course_id!==t){console.log("it went in here"),this.setState({checkSameID:!1});break}console.log(this.state.checkSameID)}}},{key:"handleAdd",value:function(){var e=Object(p.a)(j.a.mark((function e(t){var n,s,a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("the beginning state: "+this.state.checkSameID),t.preventDefault(),n=document.getElementById("input"),void 0===(s=this.state.listCourseIDs[this.state.currentInput])){e.next=10;break}return e.next=7,this.handleCheckID(s);case 7:this.state.checkSameID&&this.state.selectedCourses.includes(s[0].course_id)?window.alert("This course has already been added!"):this.state.checkSameID||1===s.length?(a=this.state.currentInput.toUpperCase(),c=this.state.selectedCourses.concat(a),this.setState({selectedCourses:c}),n.value=""):(console.log("here 2"),window.alert("Please enter a VALID COURSE ID!"),console.log("alerts here"),this.setState({checkSameID:!0})),e.next=13;break;case 10:console.log("here 1's map: "+s),console.log("here 1"),window.alert("Please enter a VALID COURSE ID!");case 13:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleGenerate",value:function(){var e=this.state.selectedCourses;console.log("handling generate"),console.log("selectedCourses: ",e)}},{key:"componentDidMount",value:function(){this.getListCourseIDs()}},{key:"getListCourseIDs",value:function(){var e=Object(p.a)(j.a.mark((function e(){var t=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"https://tufts-schedule-api.herokuapp.com/api/courses/alg/search-table",fetch("https://tufts-schedule-api.herokuapp.com/api/courses/alg/search-table").then((function(e){return e.json()})).then((function(e){t.setState({listCourseIDs:e.data})}),(function(e){console.log("error",e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"handleChange",value:function(){console.log("handling change");var e=document.getElementById("input").value.toLowerCase();this.setState((function(t){return{currentInput:e}}))}},{key:"render",value:function(){return null==this.state.listCourseIDs?Object(s.jsx)("div",{className:B.a.container,children:"Loading..."}):Object(s.jsxs)("div",{className:B.a.container,children:[Object(s.jsx)(I,{handleGenerate:this.handleGenerate.bind(this),selectedCourses:this.state.selectedCourses,listCourseIDs:this.state.listCourseIDs,children:Object(s.jsx)("input",{type:"submit"})}),Object(s.jsxs)("div",{className:B.a.containerInput,children:[Object(s.jsx)("h1",{children:"Choose a course"}),Object(s.jsx)("div",{children:Object(s.jsxs)("form",{onSubmit:this.handleAdd,children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{onChange:this.handleChange,list:"recommendedCourseIDs",id:"input",className:B.a.courseInput,type:"text",autoComplete:"off",placeholder:"COMP-0015"}),Object(s.jsx)(x,{listCourseIDs:this.state.listCourseIDs,currentInput:this.state.currentInput})]}),Object(s.jsx)("div",{children:Object(s.jsx)("input",{className:B.a.courseSubmit,type:"submit",value:"Add"})})]})})]})]})}}]),n}(c.a.Component),S=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={},s}return Object(u.a)(n,[{key:"render",value:function(){for(var e="",t=["Monday","Tuesday","Wednesday","Thursday","Friday"],n=0;n<5;n++)e+='<div className="'+t[n]+'" >'+t[n]+"</div>";return Object(s.jsxs)("div",{className:"calendar",children:[Object(s.jsxs)("div",{className:"weekTitle",children:[Object(s.jsx)("div",{className:"blank"}),e]}),Object(s.jsx)("div",{className:"events"})]})}}]),n}(c.a.Component),_=n(27),w=n.n(_),F=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).handleFBLogin=function(e){window.FB.login((function(t){t.authResponse?e(t.authResponse):console.log("authResponse is undefined")}))},s.handleStatusChange=function(e){s.setState({accessToken_FB:e.accessToken,dataAccessExpirationTime_FB:e.data_access_expiration_time,userID_FB:e.userID}),s.props.getGroupsFB()},s.parseLoginStatus=function(e){"unknown"===e.status?s.handleFBLogin((function(e){return s.handleStatusChange(e)})):"connected"===e.status&&s.handleStatusChange(e.authResponse)},s.checkFBLoginState=function(){window.FB.getLoginStatus((function(e){return s.parseLoginStatus(e)}))},s.state={accessToken_FB:void 0,dataAccessExpirationTime_FB:void 0,userID_FB:void 0},s.handleFBLogin=s.handleFBLogin.bind(Object(b.a)(s)),s.parseLoginStatus=s.parseLoginStatus.bind(Object(b.a)(s)),s.handleStatusChange=s.handleStatusChange.bind(Object(b.a)(s)),s}return Object(u.a)(n,[{key:"render",value:function(){return void 0!==window.FB&&console.log("window.FB is defined!!!!!!!!!!1"),Object(s.jsx)("div",{children:Object(s.jsx)("div",{children:Object(s.jsx)("button",{onClick:this.checkFBLoginState,className:w.a.button,children:"Login to Facebook"})})})}}]),n}(c.a.Component),y=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={TimeRangeView:!1,accessToken_FB:void 0,dataAccessExpirationTime_FB:void 0,userID_FB:void 0},s.handleTimeRangeView=s.handleTimeRangeView.bind(Object(b.a)(s)),s.getFBAuthDetails=s.getFBAuthDetails.bind(Object(b.a)(s)),s.getGroupsFB=s.getGroupsFB.bind(Object(b.a)(s)),s}return Object(u.a)(n,[{key:"getFBAuthDetails",value:function(e){this.setState({accessToken_FB:e.accessToken_FB,dataAccessExpirationTime_FB:e.dataAccessExpirationTime_FB,userID_FB:e.userID_FB}),this.getGroupsFB()}},{key:"getGroupsFB",value:function(){window.FB.api("/"+this.state.userID_FB+"/groups",(function(e){e&!e.error&&console.log("response: ",e)}))}},{key:"handleTimeRangeView",value:function(){this.setState({TimeRangeView:!this.state.TimeRangeView}),console.log(this.TimeRangeView)}},{key:"render",value:function(){return Object(s.jsxs)("main",{children:[Object(s.jsx)("h1",{children:"Schedule!"}),Object(s.jsx)("div",{className:"navbar",children:Object(s.jsx)("button",{onClick:this.handleTimeRangeView,children:"".concat(this.state.TimeRangeView?"My Schedule":"Time Range Selector")})}),Object(s.jsx)("div",{children:Object(s.jsx)(S,{})}),Object(s.jsx)("div",{children:Object(s.jsx)(F,{getGroupsFB:this.getGroupsFB})})]})}}]),n}(c.a.Component),T=n(2),L=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(s.jsx)("div",{children:Object(s.jsxs)(T.c,{children:[Object(s.jsx)(T.a,{path:"/schedule",children:Object(s.jsx)(y,{})}),Object(s.jsx)(T.a,{path:"/",children:Object(s.jsx)(D,{})})]})})}}]),n}(c.a.Component);new Promise((function(e){!function(e,t,n){var s,a=e.getElementsByTagName(t)[0];e.getElementById(n)||((s=e.createElement(t)).id=n,s.src="https://connect.facebook.net/en_US/sdk.js",a.parentNode.insertBefore(s,a))}(document,"script","facebook-jssdk"),window.fbAsyncInit=function(){window.FB.init({appId:"165323528290142",cookie:!0,xfbml:!0,version:"v9.0"}),window.FB.getLoginStatus((function(t){t.authResponse?console.log("Already logged in to facebook"):(console.log("Not logged in to facebook"),e())})),window.FB.AppEvents.logPageView()}})).then(i.a.render(Object(s.jsx)(k.a,{children:Object(s.jsx)(L,{})}),document.getElementById("root")))}},[[40,1,2]]]);
//# sourceMappingURL=main.71307569.chunk.js.map