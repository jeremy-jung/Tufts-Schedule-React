(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{13:function(e,t,n){e.exports={container:"Homepage_container__cwfji",containerInput:"Homepage_containerInput__2lEJ8",courseInput:"Homepage_courseInput__1Wo5U",courseSubmit:"Homepage_courseSubmit__3ylg9"}},21:function(e,t,n){e.exports={container:"CoursesSelectedList_container__1Tmkz",button:"CoursesSelectedList_button__2lQ6A"}},25:function(e,t,n){e.exports={course:"CourseSelected_course__3NBu-"}},27:function(e,t,n){e.exports={container:"OptionsMainList_container__1lS8U"}},28:function(e,t,n){e.exports={button:"OptionMainButton_button__3s6JW"}},29:function(e,t,n){e.exports={button:"ButtonFBLogin_button__1iqyz"}},42:function(e,t,n){"use strict";n.r(t);var s=n(1),c=n(0),o=n.n(c),a=n(17),r=n.n(a),i=n(3),l=n(4),u=n(6),d=n(5),h=n(16),j=n.n(h),b=n(20),p=n(11),m=(n(36),n(21)),f=n.n(m),v=n(25),O=n.n(v),g=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){return Object(i.a)(this,n),t.call(this,e)}return Object(l.a)(n,[{key:"handleSubmit",value:function(e){e.preventDefault()}},{key:"render",value:function(){return Object(s.jsx)("div",{className:O.a.course,children:this.props.courseID})}}]),n}(o.a.Component),k=n(14),x=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(i.a)(this,n),(s=t.call(this,e)).state={listCourseIDs:s.props.listCourseIDs},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsxs)("div",{className:f.a.container,id:"coursesSelectedList",children:[Object(s.jsx)("h1",{children:"Your selected courses"}),Object(s.jsx)("div",{children:this.props.selectedCourses.map((function(e){return Object(s.jsx)(g,{courseID:e})}))}),Object(s.jsx)(k.b,{className:f.a.button,onClick:this.props.handleGenerate,to:"/schedule",children:"Schedule"})]})}}]),n}(o.a.Component),C=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(i.a)(this,n),s=t.call(this,e),console.log("render"),s.state={recommendedCourseIDs:null},s}return Object(l.a)(n,[{key:"recommendSearch",value:function(e,t){var n=[],s=[];if(void 0!=t||null!=t)if(void 0!=t[0])if(void 0!=(s=e[t])){var c=5;c>s.length&&(c=s.length);for(var o=0;n.length<c&&o<s.length&&!(o>=s.length);){var a=s[o].course_id;console.log("mappedResults:",s);for(var r=!0,i=0;i<n.length;i++)if(n[i]==a){r=!1;break}r&&n.push(a),o++}}else n=[];else n=[];else n=[];return n}},{key:"render",value:function(){var e=this.props.currentInput,t=this.props.listCourseIDs,n=this.recommendSearch(t,e);return console.log("recommendedCourseIDs: "+n),Object(s.jsx)("datalist",{id:"recommendedCourseIDs",children:n.map((function(e){return Object(s.jsx)("option",{value:e},e)}))})}}]),n}(o.a.Component),I=n(27),w=n.n(I),y=n(28),D=n.n(y),S=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(i.a)(this,n),(s=t.call(this,e)).state={option:"default"},s}return Object(l.a)(n,[{key:"handleSubmit",value:function(e){e.preventDefault()}},{key:"render",value:function(){return Object(s.jsx)("button",{className:D.a.button,children:this.state.option})}}]),n}(o.a.Component),_=(o.a.Component,n(29)),B=n.n(_),N=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(i.a)(this,n),(s=t.call(this,e)).checkFBLoginState=function(){window.FB.getLoginStatus((function(e){console.log("response: ",e),console.log(window.FB)}))},s.state={FB:void 0},s}return Object(l.a)(n,[{key:"render",value:function(){return void 0!=window.FB&&(console.log("window.FB is defined!!!!!!!!!!1"),console.log(window.FB)),Object(s.jsx)("div",{children:Object(s.jsx)("div",{children:Object(s.jsx)("button",{onClick:this.checkFBLoginState,className:B.a.button,children:"Login to Facebook"})})})}}]),n}(o.a.Component),L=n(13),R=n.n(L),T=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(i.a)(this,n),(s=t.call(this,e)).state={listCourseIDs:null,currentInput:null,recommendedCourseIDs:null,selectedCourses:[],checkSameID:!0},s.handleAdd=s.handleAdd.bind(Object(p.a)(s)),s.handleChange=s.handleChange.bind(Object(p.a)(s)),s}return Object(l.a)(n,[{key:"handleCheckID",value:function(e){console.log("mappedResults length: "+e.length),console.log("checkSameID: "+this.state.checkSameID),console.log(e[0]);for(var t=e[0].course_id,n=0;n<e.length;n++){if(console.log(this.state.checkSameID),console.log("the length of mappedReusults:"+e.length),e[n].course_id!=t){console.log("it went in here"),this.setState({checkSameID:!1});break}console.log(this.state.checkSameID)}}},{key:"handleAdd",value:function(){var e=Object(b.a)(j.a.mark((function e(t){var n,s,c,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("the beginning state: "+this.state.checkSameID),t.preventDefault(),n=document.getElementById("input"),void 0==(s=this.state.listCourseIDs[this.state.currentInput])){e.next=10;break}return e.next=7,this.handleCheckID(s);case 7:this.state.checkSameID&&this.state.selectedCourses.includes(s[0].course_id)?window.alert("This course has already been added!"):this.state.checkSameID||1==s.length?(c=this.state.currentInput.toUpperCase(),o=this.state.selectedCourses.concat(c),this.setState({selectedCourses:o}),n.value=""):(console.log("here 2"),window.alert("Please enter a VALID COURSE ID!"),console.log("alerts here"),this.setState({checkSameID:!0})),e.next=13;break;case 10:console.log("here 1's map: "+s),console.log("here 1"),window.alert("Please enter a VALID COURSE ID!");case 13:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleGenerate",value:function(){this.state.selectedCourses;console.log("handling generate")}},{key:"componentDidMount",value:function(){this.getListCourseIDs()}},{key:"getListCourseIDs",value:function(){var e=Object(b.a)(j.a.mark((function e(){var t=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"https://tufts-schedule-api.herokuapp.com/api/courses/alg/search-table",fetch("https://tufts-schedule-api.herokuapp.com/api/courses/alg/search-table").then((function(e){return e.json()})).then((function(e){t.setState({listCourseIDs:e.data})}),(function(e){console.log("error",e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"handleChange",value:function(){console.log("handling change");var e=document.getElementById("input").value.toLowerCase();this.setState((function(t){return{currentInput:e}}))}},{key:"render",value:function(){return null==this.state.listCourseIDs?Object(s.jsx)("div",{className:R.a.container,children:"Loading..."}):Object(s.jsxs)("div",{className:R.a.container,children:[Object(s.jsx)(x,{handleGenerate:this.handleGenerate.bind(this),selectedCourses:this.state.selectedCourses,listCourseIDs:this.state.listCourseIDs,children:Object(s.jsx)("input",{type:"submit"})}),Object(s.jsxs)("div",{className:R.a.containerInput,children:[Object(s.jsx)("h1",{children:"Choose a course"}),Object(s.jsx)("div",{children:Object(s.jsxs)("form",{onSubmit:this.handleAdd,children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{onChange:this.handleChange,list:"recommendedCourseIDs",id:"input",className:R.a.courseInput,type:"text",autoComplete:"off",placeholder:"COMP-0015"}),Object(s.jsx)(C,{listCourseIDs:this.state.listCourseIDs,currentInput:this.state.currentInput})]}),Object(s.jsx)("div",{children:Object(s.jsx)("input",{className:R.a.courseSubmit,type:"submit",value:"Add"})})]})})]}),Object(s.jsx)(N,{})]})}}]),n}(o.a.Component),F=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(i.a)(this,n),(s=t.call(this,e)).state={},s}return Object(l.a)(n,[{key:"render",value:function(){for(var e="",t=["Monday","Tuesday","Wednesday","Thursday","Friday"],n=0;n<5;n++)e+='<div className="'+t[n]+'" >'+t[n]+"</div>";return Object(s.jsxs)("div",{className:"calendar",children:[Object(s.jsxs)("div",{className:"weekTitle",children:[Object(s.jsx)("div",{className:"blank"}),e]}),Object(s.jsx)("div",{className:"events"})]})}}]),n}(o.a.Component),V=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(i.a)(this,n),(s=t.call(this,e)).state={TimeRangeView:!1},s.handleTimeRangeView=s.handleTimeRangeView.bind(Object(p.a)(s)),s}return Object(l.a)(n,[{key:"handleTimeRangeView",value:function(){this.setState({TimeRangeView:!this.state.TimeRangeView}),console.log(this.TimeRangeView)}},{key:"render",value:function(){return Object(s.jsxs)("main",{children:[Object(s.jsx)("h1",{children:"Schedule!"}),Object(s.jsx)("div",{className:"navbar",children:Object(s.jsx)("button",{onClick:this.handleTimeRangeView,children:"".concat(this.state.TimeRangeView?"My Schedule":"Time Range Selector")})}),Object(s.jsx)("div",{children:Object(s.jsx)(F,{})})]})}}]),n}(o.a.Component),A=n(2),E=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsx)("div",{children:Object(s.jsxs)(A.c,{children:[Object(s.jsx)(A.a,{path:"/schedule",children:Object(s.jsx)(V,{})}),Object(s.jsx)(A.a,{path:"/",children:Object(s.jsx)(T,{})})]})})}}]),n}(o.a.Component),M="165323528290142";new Promise((function(e){!function(e,t,n){var s,c=e.getElementsByTagName(t)[0];e.getElementById(n)||((s=e.createElement(t)).id=n,s.src="https://connect.facebook.net/en_US/sdk.js",c.parentNode.insertBefore(s,c))}(document,"script","facebook-jssdk"),window.fbAsyncInit=function(){console.log(M),window.FB.init({appId:M,cookie:!0,xfbml:!0,version:"v9.0"}),window.FB.getLoginStatus((function(t){t.authResponse?console.log("Already logged in to facebook"):(console.log("Not logged in to facebook"),e())})),window.FB.AppEvents.logPageView()}})).then(r.a.render(Object(s.jsx)(k.a,{children:Object(s.jsx)(E,{})}),document.getElementById("root")))}},[[42,1,2]]]);
//# sourceMappingURL=main.0e1b4be4.chunk.js.map