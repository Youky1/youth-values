var le=Object.defineProperty,de=Object.defineProperties;var he=Object.getOwnPropertyDescriptors;var Et=Object.getOwnPropertySymbols;var Ee=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable;var mt=(t,n,e)=>n in t?le(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,Y=(t,n)=>{for(var e in n||(n={}))Ee.call(n,e)&&mt(t,e,n[e]);if(Et)for(var e of Et(n))me.call(n,e)&&mt(t,e,n[e]);return t},j=(t,n)=>de(t,he(n));import{l as T,m as pt,h as f,i as tt,c as pe,a as fe,b as ge,t as ve,d as C,u as ft,e as D,r as d,j as u,f as o,M,g as S,C as gt,D as vt,S as A,F as et,I as q,E as _e,R as _t,k as $,T as F,n as nt,o as ye,p as Ce,B as yt,q as De,s as z,N as Fe,v as Be,P as Ae,H as we,w as Ne}from"./vendor.60374e32.js";const xe=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}};xe();const Ct="todolist/addTodoItem",Dt="todolist/setTodoItem",Ft="todolist/deleteTodoItem",Bt="todolist/updateTodoItem",At="todolist/toggleTodoItem",wt="todolist/search",Nt="todolist/show/done",xt="todolist/show/level",Tt="todolist/show/ddl",St="todolist/show/group",Te={todolist:[],isShowDone:!0};function Se(t=Te,n){const e=T.exports.cloneDeep(t),{type:i,payload:s}=n;switch(i){case xt:case Tt:case St:case Dt:return e.todolist=s,e;case Nt:return e.isShowDone=s.isShowDone,e.todolist=s.list,e;case Ct:return e.todolist.push(s),e;case Bt:{for(let a=0;a<e.todolist.length;a++)if(e.todolist[a].id===s.id){e.todolist[a]=s;break}return e}case Ft:{for(let a=0;a<e.todolist.length;a++)if(e.todolist[a].id===s){e.todolist.splice(a,1);break}return e}case At:{for(let a=0;a<e.todolist.length;a++)if(e.todolist[a].id===s){e.todolist[a].done=!e.todolist[a].done;break}return e}case wt:{const{currentList:a}=s;return e.todolist=a.filter(c=>c.name.includes(s.name)),e}default:return e}}const It="INIT_EVENT_LIST",ot="ADD_EVENT",kt="SET_CURRENT_EVENT",Lt="DELETE_EVENT",Ot="EDIT_EVENT",bt="SET_IS_TIMING",Gt="ADD_TIMING_RECORD",Mt="TOOGLE_EVENT_DONE",w=T.exports.debounce(t=>{pt.success(t)},500),v=T.exports.debounce(t=>{pt.error(t)},500),st=()=>{const t=f().isoWeekday(1).startOf("day"),n=f().isoWeekday(7).endOf("day"),e=f().startOf("month").startOf("day"),i=f().endOf("month").endOf("day"),s=f().startOf("year").startOf("day"),a=f().endOf("year").endOf("day");return{weekStart:t,weekEnd:n,monthStart:e,monthEnd:i,yearStart:s,yearEnd:a}},Rt=t=>{const n=f(t);return t&&n.endOf("day").isBefore(f().endOf("day"))},Ht=t=>{const n=f(t),{weekStart:e,weekEnd:i}=st();return t&&n.isSameOrBefore(i)&&n.isSameOrAfter(e)},Pt=t=>{const n=f(t),{monthStart:e,monthEnd:i}=st();return t&&n.isSameOrBefore(i)&&n.isSameOrAfter(e)},Ie=t=>f(t).format("YY-MM-DD"),ke=t=>f(t).format("HH:mm:ss"),Le=t=>{const n=[{title:"\u5DF2\u8FC7\u671F",list:[]},{title:"\u672C\u5468",list:[]},{title:"\u672C\u6708",list:[]},{title:"\u5176\u4ED6",list:[]}];return t.map(e=>{const{ddl:i}=e;Rt(i)?n[0].list.push(e):Ht(i)?n[1].list.push(e):Pt(i)?n[2].list.push(e):n[3].list.push(e)}),n},Oe=(t,n)=>{const{ddl:e}=t;switch(n){case"\u5168\u90E8":return!0;case"\u5DF2\u8FC7\u671F":return Rt(e);case"\u672C\u5468":return Ht(e);case"\u672C\u6708":return Pt(e);default:return!0}},be=(t,n)=>{const e=f(t),i=[e.format("MM-DD")],s=n.diff(t,"days");for(let a=0;a<s;a++)i.push(e.add(1,"d").format("MM-DD"));return i},Ge=(t,n)=>{const e=f(t),i=[e.format("YYYY-MMM")],s=n.diff(t,"months");for(let a=0;a<s;a++)i.push(e.add(1,"months").format("YYYY-MMM"));return i},Me=(t,n,e)=>{const i=f(e);return i.isSameOrBefore(n)&&i.isSameOrAfter(t)},it=t=>document.getElementById(t)||document.createElement("div"),W=(t,n,e,i,s,a)=>{const c=T.exports.merge({tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"category",data:n},yAxis:{type:"value"},series:[{data:e,type:s,backgroundStyle:{color:"rgba(180, 180, 180, 0.2)"}}],title:{x:"center",y:"bottom",text:t}},a);tt(it(i)).setOption(c)},Vt=(t,n,e,i,s,a)=>{const c=T.exports.merge({tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"value"},yAxis:{type:"category",data:e},series:[{data:n,type:s,backgroundStyle:{color:"rgba(180, 180, 180, 0.2)"}}],title:{x:"center",y:"bottom",text:t}},a);tt(it(i)).setOption(c)},Re=({title:t,domId:n,data:e})=>{const i={title:{text:t,top:"bottom",left:"center"},tooltip:{trigger:"item"},series:[{type:"pie",radius:"50%",data:e,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}],color:["#f56c6c","#e6a23c","#67c23a","#909399"]};tt(it(n)).setOption(i)},He=t=>{var e;return((e=t[1])==null?void 0:e.diff(t[0],"days"))<32?be(t[0],t[1]):Ge(t[0],t[1])},$t=(t,n,e)=>{const i=Array(n.length).fill(0);return t.forEach(s=>{const a=s[e];if(a){const c=f(a).format("MM-DD"),l=n.indexOf(c);l>=0&&i[l]++}}),i},Wt=(t,n,e)=>{const i=Array(n.length).fill(0);return t.forEach(s=>{const a=s[e];if(a){const c=f(a).format("YYYY-MMM"),l=n.indexOf(c);l>=0&&i[l]++}}),i},Yt=(t,n)=>{const e=["#823835","#8ABEB2","#C9BAAA","#DDD38C","#DE9C52"],i=T.exports.cloneDeep(t).sort((s,a)=>a[n]-s[n]).slice(0,5).filter(s=>s[n]!==0);return{xData:i.map(s=>s.name),yData:i.map((s,a)=>({value:s[n],itemStyle:{color:e[a]}}))}},U=["#99CCFF","#3399CC","#66CCCC","#009999"];function Pe(t){const n=t.record.reduce.length;let e;return n<=5?e=U[0]:n<20||n<50?e=U[1]:e=U[2],{backgroundColor:e}}const I=(t,n)=>{for(let e=0;e<t.length;e++)if(t[e].name===n)return e;return-1},Ve={eventList:[],currentEvent:"",isTiming:!1};function $e(t=Ve,n){const e=T.exports.cloneDeep(t),{type:i,payload:s}=n;switch(i){case It:{e.eventList=s;break}case ot:{e.eventList.push({name:s,record:[],isDone:!1});break}case kt:{e.currentEvent=s;const a=I(e.eventList,s);e.eventList[a].isDone=!1;break}case Lt:{e.currentEvent===s&&(e.currentEvent="");const a=I(e.eventList,s);e.eventList.splice(a,1);break}case Ot:{const{oldName:a,newName:c}=s,l=I(e.eventList,a);e.eventList[l].name=c;break}case bt:{e.isTiming=s;break}case Gt:{const{name:a,start:c,end:l,length:h}=s;for(let m=0;m<e.eventList.length;m++)if(e.eventList[m].name===a){e.eventList[m].record.push({start:c,end:l,length:h});break}break}case Mt:{for(let a=0;a<e.eventList.length;a++)if(e.eventList[a].name===s){e.eventList[a].isDone=!e.eventList[a].isDone;break}break}}return e}var R={CHANGE_RANGE:"CHANGE_RANGE",CHANGE_SHOWING_TODO:"CHANGE_SHOWING_TODO",CHANGE_SHOWING_TIMING:"CHANGE_SHOWING_TIMING"};const We={showingRange:[f().startOf("day"),f().endOf("day")],showingTodo:!0,showingTiming:!0};function Ye(t=We,n){const e=T.exports.cloneDeep(t),{type:i,payload:s}=n;switch(i){case R.CHANGE_RANGE:{e.showingRange=s;break}case R.CHANGE_SHOWING_TIMING:{e.showingTiming=!e.showingTiming;break}case R.CHANGE_SHOWING_TODO:{e.showingTodo=!e.showingTodo;break}}return e}const je=pe({todolist:Se,timing:$e,statistics:Ye}),qe=fe(je,ge(ve)),ze="_todo_ugq82_1";var Ue={todo:ze};const Ke="_list_zvcb1_17",Xe="_listItem_zvcb1_17";var jt={list:Ke,listItem:Xe};const Je="_listItem_19x8q_6",Qe="_itemStatus_19x8q_19",Ze="_itemBtn_19x8q_23",tn="_itemText_19x8q_28",en="_doneText_19x8q_35",nn="_itemDate_19x8q_39";var k={listItem:Je,itemStatus:Qe,itemBtn:Ze,itemText:tn,doneText:en,itemDate:nn};const on=async()=>{const t=await C.getItem("currentId")||0;return Promise.resolve(t)},sn=t=>C.setItem("currentId",t),B=async()=>{const t=await C.getItem("todolist")||[];return Promise.resolve(t)},K=t=>C.setItem("todolist",t),an=async t=>{try{const n=await on(),e=await B()||[],i=j(Y({},t),{id:n+1});return e.push(i),await sn(n+1),await K(e),Promise.resolve(i)}catch(n){return Promise.reject(n)}},qt=async t=>{try{const n=await B();for(let e=0;e<n.length;e++)if(n[e].id===t.id){n[e]=t;break}return K(n)}catch(n){return Promise.reject(n)}},cn=async t=>{try{const n=await B();for(let e=0;e<n.length;e++)if(n[e].id=t)return n.splice(e,1),K(n);return Promise.reject("\u6CA1\u6709\u627E\u5230\u8BE5ID")}catch(n){return Promise.reject(n)}},un=async t=>{try{const n=await B();for(const e of n)if(e.id===t)return qt(j(Y({},e),{done:!e.done,doneDate:e.done?e.doneDate:new Date}));return Promise.reject(`\u6CA1\u6709\u627E\u5230ID: ${t}`)}catch(n){return Promise.reject(n)}},rn=async()=>{const t=await C.getItem("groupList")||[];return Promise.resolve(t)},ln=async t=>{if(!t){v("\u5206\u7EC4\u540D\u4E0D\u80FD\u4E3A\u7A7A");return}try{const n=await C.getItem("groupList")||[];if(n.includes(t))throw new Error("\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728");n.push(t),await C.setItem("groupList",n),w("\u6DFB\u52A0\u5206\u7EC4\u6210\u529F")}catch(n){v(n)}},dn=async t=>{try{const n=await C.getItem("groupList")||[],e=n.indexOf(t);if(e>n.length)throw new Error("\u4E0B\u6807\u4E0D\u5B58\u5728");{n.splice(e,1),await C.setItem("groupList",n);const i=await B();await K(i.map(s=>(s.group===t&&(s.group="\u65E0"),s)))}w("\u5220\u9664\u5206\u7EC4\u6210\u529F")}catch(n){console.log(n),v(String(n))}},hn=t=>({type:Ct,payload:t}),En=t=>({type:Dt,payload:t}),mn=t=>({type:Bt,payload:t}),pn=t=>async n=>{await cn(t),n({type:Ft,payload:t})},fn=t=>async n=>{await un(t),n({type:At,payload:t})},gn=t=>async n=>{const e=await B();n({type:wt,payload:{name:t,currentList:e}})},vn=t=>async n=>{try{const e=await B(),i=t?e:e.filter(s=>!s.done);n({type:Nt,payload:{isShowDone:t,list:i}})}catch(e){console.log(e)}},_n=t=>async n=>{try{const e=await B();n({type:xt,payload:t==="\u5168\u90E8"?e:e.filter(i=>i.level===t)})}catch(e){console.log(e)}},yn=t=>async n=>{try{const e=await B();n({type:Tt,payload:e.filter(i=>Oe(i,t))})}catch(e){console.log(e)}},Cn=t=>async n=>{try{const e=await B();n({type:St,payload:t==="\u5168\u90E8"?e:e.filter(i=>i.group===t)})}catch(e){console.log(e)}},x=async()=>await C.getItem("eventList")||[],H=async t=>await C.setItem("eventList",t),zt=async t=>(await x()).some(e=>e.name===t),Ut=async t=>{const n=await x();return await zt(t)?Promise.reject("\u8BE5\u4E8B\u4EF6\u5DF2\u5B58\u5728"):(n.push({name:t,record:[],isDone:!1}),H(n))},Dn=async t=>{if(await zt(t)){const n=await x(),e=I(n,t);return n[e].isDone=!1,await H(n),!0}else return await Ut(t),!1},Fn=async t=>{const n=await x(),e=I(n,t);n.splice(e,1),await H(n)},Bn=async(t,n)=>{const e=await x(),i=I(e,t);e[i].name=n,await H(e)},An=async(t,n,e,i)=>{const s=await x(),a=await x(),c=I(a,t);s[c].record.push({start:n,end:e,length:i}),await H(s)},wn=async t=>{const n=await x(),e=I(n,t);n[e].isDone=!n[e].isDone,await H(n)},Nn=t=>({type:It,payload:t}),xn=t=>async n=>{try{await Ut(t),n({type:ot,payload:t}),w("\u6DFB\u52A0\u4E8B\u4EF6\u6210\u529F")}catch(e){v(e)}},Kt=t=>async n=>{await Dn(t)||(n({type:ot,payload:t}),w("\u5F53\u524D\u4E8B\u4EF6\u4E0D\u5B58\u5728\uFF0C\u5DF2\u6DFB\u52A0")),n({type:kt,payload:t})},Xt=t=>async n=>{try{await Fn(t),n({type:Lt,payload:t}),w("\u5220\u9664\u4E8B\u4EF6\u6210\u529F")}catch(e){v(e)}},Tn=(t,n)=>async e=>{try{await Bn(t,n),e({type:Ot,payload:{oldName:t,newName:n}}),w("\u7F16\u8F91\u4E8B\u4EF6\u6210\u529F")}catch(i){v(i)}},at=t=>({type:bt,payload:t}),Sn=(t,n,e,i)=>async s=>{try{await An(t,n,e,i),s({type:Gt,payload:{name:t,start:n,end:e,length:i}})}catch(a){v(a)}},Jt=t=>async n=>{try{await wn(t),n({type:Mt,payload:t})}catch(e){v(e)}},In=new Map([["\u9AD8","#f56c6c"],["\u4E2D","#e6a23c"],["\u4F4E","#67c23a"],["\u65E0","#909399"]]);function kn({item:t,callback:n}){const{level:e,name:i,done:s,ddl:a}=t,c=ft(),l=()=>{n(t)},h=D(),m=()=>{h(fn(t.id))},[E,g]=d.exports.useState(!1),r=()=>{g(!1)},P=async()=>{try{h(pn(t.id)),r(),w("\u5220\u9664\u6210\u529F")}catch(G){v(String(G))}},L=async()=>{h(Kt(i)),c("/timing")};return u("div",{className:k.listItem,children:[o("div",{className:k.itemStatus,style:{backgroundColor:In.get(e||"\u65E0")}}),o("i",{onClick:m,className:k.itemBtn+" iconfont "+(s?"icon-quanduigou":"icon-c"),style:{color:s?"#67c23a":"#ddd"}}),o("i",{className:k.itemBtn+" iconfont icon-jishi",style:{color:"#409eff",fontSize:28},onClick:L}),o("i",{className:k.itemBtn+" iconfont icon-shanchu",style:{color:"#f56c6c"},onClick:()=>g(!0)}),o("span",{className:k.itemText+(s?" "+k.doneText:""),onClick:l,children:i}),a&&o("span",{className:k.itemDate,children:Ie(a)}),o(M,{title:"\u786E\u8BA4\u8981\u5220\u9664\u8BE5\u4E8B\u9879\u5417\uFF1F",visible:E,onCancel:r,onOk:P})]})}const Ln="_inputBox_1sles_6",On="_input_1sles_6",bn="_inputIcon_1sles_23";var ct={inputBox:Ln,input:On,inputIcon:bn};function Qt({callback:t,icon:n,tip:e,placeholder:i,defaultContent:s,clear:a,allowEmpty:c}){const[l,h]=d.exports.useState("");d.exports.useEffect(()=>{s&&h(s)},[s]);const m=r=>{h(r.target.value)},E=()=>{c||l.length>0?(t(l),a&&h(""),e&&w(e)):v("\u8F93\u5165\u4E3A\u7A7A")},g=r=>{r.key==="Enter"&&E()};return u("div",{className:ct.inputBox,children:[o("input",{type:"text",className:ct.input,value:l,onChange:m,onKeyDown:g,placeholder:i}),o("i",{className:ct.inputIcon+" iconfont "+n,onClick:E})]})}const Zt=({sort:t,hideDone:n})=>{const e=D();return d.exports.useEffect(()=>{B().then(i=>{const s=n?i.filter(a=>!a.done):i;e(En(s))}).catch(i=>console.log(i))},[]),S(i=>t?Le(i.todolist.todolist):i.todolist.todolist)},te=()=>{const[t,n]=d.exports.useState([]);return d.exports.useEffect(()=>{rn().then(e=>{n(e)})}),t},Gn="_create_fnn9v_1",Mn="_info_fnn9v_14",Rn="_itemLine_fnn9v_18",Hn="_option_fnn9v_31";var O={create:Gn,info:Mn,itemLine:Rn,option:Hn};const{Panel:Pn}=gt,{Option:ee}=A,{TextArea:Vn}=q,$n=[{value:"\u9AD8",color:"#f56c6c"},{value:"\u4E2D",color:"#e6a23c"},{value:"\u4F4E",color:"#67c23a"},{value:"\u65E0",color:"#909399"}];function ne({callback:t,initObj:n,clear:e,showDetail:i}){const s=d.exports.useRef(""),[a,c]=d.exports.useState(""),[l,h]=d.exports.useState(new Date),[m,E]=d.exports.useState(null),[g,r]=d.exports.useState("\u65E0"),[P,L]=d.exports.useState(""),[G,V]=d.exports.useState("");d.exports.useEffect(()=>{n&&(c(n.name),s.current=n.name,h(n.createDate),E(n.ddl),r(n.level),L(n.group),V(n.description))},[n==null?void 0:n.id]);const Q=te(),Z=async()=>{const p=Object.assign({},n,{name:s.current,createDate:l,level:g,group:P,description:G,done:!1},m?{ddl:m}:{});try{await t(p),e&&(E(new Date),r(""),L(""),V(""))}catch(re){v("Error\uFF1A"+re)}};return u("div",{id:O.create,children:[o(Qt,{icon:"icon-tijiao",callback:p=>{s.current=p,Z()},placeholder:"\u56DE\u8F66\u6216\u70B9\u51FB\u53F3\u4FA7\u6309\u94AE\u6DFB\u52A0\u4E8B\u9879",defaultContent:a,clear:e}),o(gt,{className:O.info,defaultActiveKey:i?"1":"",children:u(Pn,{header:"\u66F4\u591A\u4FE1\u606F\uFF08\u53EF\u9009\uFF09",children:[u("div",{className:O.itemLine,children:[o("div",{children:"\u622A\u6B62\u65E5\u671F:"}),o(vt,{onChange:p=>E(p._d)})]}),u("div",{className:O.itemLine,children:[o("div",{children:"\u91CD\u8981\u7A0B\u5EA6:"}),o(A,{onChange:p=>r(p),value:g,children:$n.map(p=>o(ee,{value:p.value,children:o(et,{children:u("div",{className:O.option,children:[o("div",{style:{backgroundColor:p.color}}),p.value]})})},p.color))})]}),u("div",{className:O.itemLine,children:[o("div",{children:"\u6240\u5C5E\u5206\u7EC4:"}),o(A,{onChange:p=>L(p),defaultValue:"\u65E0",children:Q.map(p=>o(ee,{value:p,children:p},p))})]}),u("div",{className:O.itemLine,style:{height:"auto"},children:[o("div",{children:"\u5177\u4F53\u63CF\u8FF0:"}),o(Vn,{rows:6,value:G,onChange:({target:{value:p}})=>V(p)})]})]},"1")})]})}const Wn="_title_fhark_6",Yn="_color_fhark_17",jn="_text_fhark_23";var ut={title:Wn,color:Yn,text:jn};function b(t){return u("div",{className:ut.title,children:[o("div",{className:ut.color}),o("div",{className:ut.text,children:t.children})]})}const qn="_empty_569pg_6";var zn={empty:qn};function oe({visiable:t}){return t?o(_e,{className:zn.empty}):o(et,{})}function Un(){const t=D(),n=Zt({sort:!0,hideDone:!0}),e=d.exports.useCallback(E=>{t(gn(E))},[]),[i,s]=d.exports.useState(),[a,c]=d.exports.useState(!1),l=E=>{c(!0),s(E)},h=()=>{c(!1)},m=async E=>{try{await qt(E),t(mn(E)),w("\u4FEE\u6539\u4EE3\u529E\u4E8B\u9879\u6210\u529F")}catch(g){v("\u4FEE\u6539\u4EE3\u529E\u4E8B\u9879\u51FA\u9519\uFF1A"+g)}};return u("div",{id:jt.list,children:[o(Qt,{icon:"icon-sousuo",callback:e,tip:"\u641C\u7D22\u6210\u529F",allowEmpty:!0,placeholder:"\u8F93\u5165\u4EE3\u529E\u540D\u79F0\u8FDB\u884C\u641C\u7D22"}),n.map(E=>E.list.length?u(_t.Fragment,{children:[o(b,{children:E.title}),o("div",{className:jt.listItem,children:E.list.map(g=>o(kn,{item:g,callback:l},g.id))})]},E.title):null),o(oe,{visiable:n.every(E=>E.list.length===0)}),o($,{title:"\u65B0\u5EFA\u4E8B\u9879",placement:"right",onClose:h,visible:a,width:640,children:o(ne,{callback:m,initObj:i,showDetail:!0})})]})}const Kn="_detail_1eb3v_1";var Xn={detail:Kn};function se({callback:t,overlay:n}){return o("div",{className:"mainButton",style:{bottom:"15vh",right:40},onClick:t,children:o(F,{overlay:n,children:o("i",{className:"iconfont icon-icon-"})})})}function Jn(){const[t,n]=d.exports.useState(!1),e=()=>{n(!0)},i=()=>{n(!1)},s=D(),a=async c=>{const l=await an(c);s(hn(l)),w("\u6DFB\u52A0\u4EE3\u529E\u4E8B\u9879\u6210\u529F")};return u("div",{id:Xn.detail,children:[o(se,{overlay:"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879",callback:e}),o($,{title:"\u65B0\u5EFA\u4E8B\u9879",placement:"right",onClose:i,visible:t,width:640,children:o(ne,{callback:a,clear:!0})})]})}const Qn="_groupContainer_1g42i_6",Zn="_btn_1g42i_13";var X={groupContainer:Qn,btn:Zn};const{Option:y}=A;function to(){const t=D(),n=te(),[e,i]=d.exports.useState(""),s=async()=>{e?(await ln(e),i("")):v("\u65B0\u589E\u5206\u7EC4\u540D\u4E0D\u80FD\u4E3A\u7A7A")},[a,c]=d.exports.useState(""),l=async()=>{a?(await dn(a),c("")):v("\u8FD8\u672A\u9009\u4E2D\u5206\u7EC4")};return u("div",{children:[o(b,{children:"\u663E\u793A\u7B5B\u9009"}),u("div",{className:"lineContainer",children:[o("p",{children:"\u662F\u5426\u663E\u793A\u5DF2\u5B8C\u6210"}),o(nt,{onChange:r=>{t(vn(r))}})]}),u("div",{className:"lineContainer",children:[o("p",{children:"\u65F6\u95F4\u8303\u56F4"}),u(A,{defaultValue:"\u5168\u90E8",style:{width:150},onChange:r=>{t(yn(r))},children:[o(y,{value:"\u5168\u90E8",children:"\u5168\u90E8"}),o(y,{value:"\u5DF2\u8FC7\u671F",children:"\u5DF2\u8FC7\u671F"}),o(y,{value:"\u672C\u5468",children:"\u672C\u5468"}),o(y,{value:"\u672C\u6708",children:"\u672C\u6708"})]})]}),u("div",{className:"lineContainer",children:[o("p",{children:"\u7D27\u6025\u7A0B\u5EA6"}),u(A,{defaultValue:"\u65E0",style:{width:150},onChange:r=>{t(_n(r))},children:[o(y,{value:"\u9AD8",children:"\u9AD8"}),o(y,{value:"\u4E2D",children:"\u4E2D"}),o(y,{value:"\u4F4E",children:"\u4F4E"}),o(y,{value:"\u65E0",children:"\u65E0"}),o(y,{value:"\u5168\u90E8",children:"\u5168\u90E8"})]})]}),u("div",{className:"lineContainer",children:[o("p",{children:"\u5206\u7EC4"}),u(A,{defaultValue:"\u5168\u90E8",style:{width:150},onChange:r=>{t(Cn(r))},children:[o(y,{value:"\u5168\u90E8",children:"\u5168\u90E8"}),n.map(r=>o(y,{value:r,children:r},r))]})]}),o(b,{children:"\u5206\u7EC4\u7BA1\u7406"}),u("div",{className:"lineContainer",children:[o("p",{children:"\u65B0\u5EFA\u5206\u7EC4"}),u("div",{className:X.groupContainer,children:[o(q,{value:e,style:{width:150},onChange:r=>i(r.target.value),onPressEnter:s}),o("i",{className:X.btn+" iconfont icon-jiahao",onClick:s})]})]}),u("div",{className:"lineContainer",children:[o("p",{children:"\u5220\u9664\u5206\u7EC4"}),u("div",{className:X.groupContainer,children:[o(A,{value:a,style:{width:150},onChange:r=>c(r),children:n.map(r=>o(y,{value:r,children:r},r))}),o("i",{className:X.btn+" iconfont icon-24gf-minusCircle",onClick:l})]})]})]})}function eo(){const[t,n]=d.exports.useState(!1);return u("div",{children:[o("div",{className:"mainButton",onClick:()=>{n(!0)},style:{right:100,height:60},children:o(F,{overlay:"\u663E\u793A\u8BBE\u7F6E",children:o("i",{className:"iconfont icon-shezhi"})})}),o($,{title:"TODOList\u663E\u793A\u8BBE\u7F6E",placement:"left",onClose:()=>{n(!1)},visible:t,width:640,children:o(to,{})})]})}function no(){return u("div",{id:Ue.todo,children:[o(Un,{}),o(Jn,{}),o(eo,{})]})}const oo="_timing_1fe2t_6",so="_card_1fe2t_16",io="_nameBox_1fe2t_31",ao="_btnBar_1fe2t_41",co="_clock_1fe2t_55",uo="_wrapper_1fe2t_67",ro="_info_1fe2t_79",lo="_clockBox_1fe2t_90",ho="_btnWrapper_1fe2t_102";var N={timing:oo,card:so,nameBox:io,btnBar:ao,clock:co,wrapper:uo,info:ro,clockBox:lo,btnWrapper:ho};const rt=t=>{const n=D();return d.exports.useEffect(()=>{x().then(e=>{n(Nn(e))}).catch(e=>console.log(e))},[]),S(e=>t?e.timing.eventList.filter(i=>!i.isDone):e.timing.eventList)},Eo=(t,n)=>rt(!1).map(i=>{let s=0;for(const a of i.record)Me(t,n,a.start)&&(s+=a.length);return{name:i.name,duration:s,times:i.record.length}}),mo=(t,n)=>{const e=rt(!1),i=Array(t.length).fill(0),s=Array(t.length).fill(0);for(const a of e)for(const c of a.record){const l=t.indexOf(f(c.start).format(n));l>=0&&(s[l]+=c.length/60,i[l]++)}return{timesList:i,durationList:s}},{confirm:ie}=M;function po(){const t=d.exports.useRef(new Date),{seconds:n,minutes:e,hours:i,isRunning:s,start:a,pause:c,reset:l}=ye.exports.useStopwatch({autoStart:!0}),h=D(),m=S(r=>r.timing.currentEvent),E=()=>{ie({title:"\u786E\u5B9A\u8981\u5B8C\u6210\u8BA1\u65F6\u5417",icon:"",onOk(){const r=i*3600+e*60+n;console.log("currentEvent: ",m),h(Sn(m,t.current,new Date,r)),h(at(!1)),l()},onCancel(){}})},g=()=>{ie({title:"\u786E\u5B9A\u8981\u5B8C\u6210\u8BA1\u65F6\u5417",onOk(){l(),h(at(!1))},onCancel(){}})};return o("div",{className:N.clock,children:u("div",{className:N.wrapper,children:[o("h1",{children:"\u4E13\u6CE8\u8BA1\u65F6\u4E2D"}),u("p",{className:N.info,children:[o("span",{children:"\u5F00\u59CB\u65F6\u95F4"})," | ",o("span",{children:ke(t.current)})]}),u("div",{className:N.clockBox,children:[o("div",{children:i.toString().padStart(2,"0")}),o("span",{children:":"}),o("div",{children:e.toString().padStart(2,"0")}),o("span",{children:":"}),o("div",{children:n.toString().padStart(2,"0")})]}),u("div",{className:N.btnWrapper,children:[o(F,{overlay:s?"\u6682\u505C\u8BA1\u65F6":"\u7EE7\u7EED\u8BA1\u65F6",placement:"bottom",children:s?o("i",{className:"iconfont icon-zanting",onClick:c}):o("i",{className:"iconfont icon-yunhang",onClick:a})}),o(F,{overlay:"\u5B8C\u6210\u8BA1\u65F6",placement:"bottom",children:o("i",{className:"iconfont icon-jieshu",onClick:E})}),o(F,{overlay:"\u653E\u5F03\u8BA1\u65F6",placement:"bottom",children:o("i",{className:"iconfont icon-fangqi1",onClick:g})})]})]})})}const{confirm:ae}=M;function fo({item:t}){const n=D(),[e,i]=d.exports.useState(!1),[s,a]=d.exports.useState(t.name),c=()=>{n(Kt(t.name)),n(at(!0))},l=()=>{t.name===s?v("\u540D\u79F0\u672A\u53D8"):(n(Tn(t.name,s)),i(!1))},h=()=>{ae({title:"\u786E\u5B9A\u5220\u9664\u4E8B\u4EF6\u5417\uFF1F\u8BE5\u4E8B\u4EF6\u5C06\u4E0D\u518D\u663E\u793A\u4E14\u4E13\u6CE8\u8BB0\u5F55\u5C06\u5220\u9664",onOk(){n(Xt(t.name))}})},m=()=>{ae({title:"\u786E\u5B9A\u5B8C\u6210\u4E8B\u4EF6\u5417\uFF1F\u8BE5\u4E8B\u4EF6\u5C06\u4E0D\u518D\u663E\u793A\uFF0C\u4F46\u4E13\u6CE8\u8BB0\u5F55\u4ECD\u7136\u4FDD\u5B58",onOk(){n(Jt(t.name))}})};return u("div",{className:N.card,style:Pe(t),children:[o("div",{className:N.nameBox,children:t.name}),u("div",{className:N.btnBar,children:[o(F,{overlay:"\u5F00\u59CB\u8BA1\u65F6",placement:"bottom",children:o("i",{className:"iconfont icon-yunhang",onClick:c})}),o(F,{overlay:"\u7F16\u8F91",placement:"bottom",children:o("i",{className:"iconfont icon-bianji",onClick:()=>i(!0)})}),o(F,{overlay:"\u5B8C\u6210",placement:"bottom",children:o("i",{className:"iconfont icon-wancheng",onClick:m})}),o(F,{overlay:"\u5220\u9664",placement:"bottom",children:o("i",{className:"iconfont icon-shanchu",onClick:h})})]}),o(M,{visible:e,title:"\u7F16\u8F91\u4E8B\u4EF6\u540D\u79F0",onCancel:()=>i(!1),onOk:l,children:o(q,{value:s,onChange:E=>a(E.target.value)})})]})}const{confirm:ce}=M;function go(){const t=S(i=>i.timing.eventList.filter(s=>s.isDone)),n=D(),e=[{title:"\u4E8B\u4EF6\u540D",dataIndex:"name"},{title:"\u64CD\u4F5C",dataIndex:"name",render(i){return u(et,{children:[o(yt,{style:{marginRight:20},onClick:()=>{ce({title:"\u786E\u8BA4\u8981\u6062\u590D\u5417",icon:null,onOk(){n(Jt(i))}})},children:"\u6062\u590D"}),o(yt,{onClick:()=>{ce({title:"\u786E\u8BA4\u8981\u5220\u9664\u5417",icon:null,onOk(){n(Xt(i))}})},children:"\u5220\u9664"})]})}}];return o("div",{className:N.doneList,children:o(Ce,{columns:e,dataSource:t})})}function vo(){const t=rt(!0),n=S(r=>r.timing.isTiming),[e,i]=d.exports.useState(!1),[s,a]=d.exports.useState(""),c=D(),l=()=>{c(xn(s)),i(!1)},[h,m]=d.exports.useState(!1),E=()=>m(!0),g=()=>m(!1);return u("div",{className:N.timing,children:[u("main",{children:[t.map(r=>o(fo,{item:r},r.name)),o(oe,{visiable:t.length===0})]}),n&&o(po,{}),o(se,{overlay:"\u6DFB\u52A0\u8BA1\u65F6\u4E8B\u4EF6",callback:()=>i(!0)}),o("div",{className:"mainButton",onClick:E,style:{right:100,height:60},children:o(F,{overlay:"\u67E5\u770B\u5DF2\u5B8C\u6210\u4E8B\u4EF6",children:o("i",{className:"iconfont icon-gengduo"})})}),o(M,{title:"\u65B0\u5EFA\u8BA1\u65F6\u4E8B\u4EF6",visible:e,onCancel:()=>i(!1),onOk:l,children:o(q,{placeholder:"\u8BF7\u8F93\u5165\u65B0\u5EFA\u4E8B\u4EF6\u540D",value:s,onChange:r=>a(r.target.value)})}),o($,{width:640,visible:h,title:"\u5DF2\u5B8C\u6210\u8BA1\u65F6\u4E8B\u9879",placement:"left",onClose:g,children:o(go,{})})]})}const _o="_statistic_158ux_6",yo="_dateBox_158ux_10";var lt={statistic:_o,dateBox:yo};const Co=t=>({type:R.CHANGE_RANGE,payload:t}),Do=()=>({type:R.CHANGE_SHOWING_TODO}),Fo=()=>({type:R.CHANGE_SHOWING_TIMING}),Bo="_chatPart_1gf7b_6",Ao="_chartContent_1gf7b_10",wo="_line_1gf7b_15";var _={chatPart:Bo,chartContent:Ao,line:wo};const ue=()=>{var n;const{showingRange:t}=S(e=>e.statistics);return{start:t[0],end:t[1],abscissa:He(t),type:((n=t[1])==null?void 0:n.diff(t[0],"days"))<32?"days":"months"}},dt=["\u9AD8","\u4E2D","\u4F4E","\u65E0"];function No(){const{start:t,end:n,abscissa:e,type:i}=ue(),s=Zt({sort:!1,hideDone:!1});return d.exports.useEffect(()=>{const a=i==="days"?$t(s,e,"createDate"):Wt(s,e,"createDate");W("\u521B\u5EFA\u4E8B\u9879\u7EDF\u8BA1",e,a,"chart_todo_create","line")},[t,n]),d.exports.useEffect(()=>{const a=i==="days"?$t(s,e,"doneDate"):Wt(s,e,"doneDate");W("\u5B8C\u6210\u4E8B\u9879\u7EDF\u8BA1",e,a,"chart_todo_done","line")},[t,n]),d.exports.useEffect(()=>{const a=[{value:0,itemStyle:{color:"#f56c6c"}},{value:0,itemStyle:{color:"#e6a23c"}},{value:0,itemStyle:{color:"#67c23a"}},{value:0,itemStyle:{color:"#909399"}}];s.filter(c=>!c.done).forEach(c=>{const l=dt.indexOf(c.level);l>=0&&a[l].value++}),W("\u5269\u4F59\u4E8B\u4EF6\u7EDF\u8BA1",dt,a,"chart_todo_left","bar")}),d.exports.useEffect(()=>{const a=[{value:0,name:"\u9AD8"},{value:0,name:"\u4E2D"},{value:0,name:"\u4F4E"},{value:0,name:"\u65E0"}];s.filter(c=>!c.done).forEach(c=>{const l=dt.indexOf(c.level);l>=0&&a[l].value++}),Re({title:"\u5269\u4F59\u4E8B\u4EF6\u5206\u5E03\u60C5\u51B5",domId:"chart_todo_left_percentage",data:a})}),u("div",{className:_.chatPart,children:[o(b,{children:"\u4EFB\u52A1\u6E05\u5355\u6570\u636E"}),u("div",{className:_.line,children:[o("div",{id:"chart_todo_create",className:_.chartContent}),o("div",{id:"chart_todo_done",className:_.chartContent})]}),u("div",{className:_.line,children:[o("div",{id:"chart_todo_left",className:_.chartContent}),o("div",{id:"chart_todo_left_percentage",className:_.chartContent})]})]})}function xo(){const{start:t,end:n,abscissa:e,type:i}=ue(),s=Eo(t,n),{timesList:a,durationList:c}=mo(e,i==="days"?"MM-DD":"YYYY-MMM");return d.exports.useEffect(()=>{W("\u4E13\u6CE8\u65F6\u957F\u7EDF\u8BA1",e,c,"chart_timing_len","line",{color:"#9A9F77",yAxis:{name:"\u5206\u949F"}})},[t,n]),d.exports.useEffect(()=>{const{xData:l,yData:h}=Yt(s,"duration");Vt("\u4E13\u6CE8\u65F6\u957F\u6392\u884C",h.map(m=>j(Y({},m),{value:m.value/60})),l,"chart_timing_len_rank","bar",{xAxis:{name:"\u5206\u949F"}})},[t,n]),d.exports.useEffect(()=>{W("\u4E13\u6CE8\u6B21\u6570\u7EDF\u8BA1",e,a,"chart_timing_count","line",{color:"#9BC4CA"})},[t,n]),d.exports.useEffect(()=>{const{xData:l,yData:h}=Yt(s,"times");Vt("\u4E13\u6CE8\u6B21\u6570\u6392\u884C",h,l,"chart_timing_count_rank","bar")},[t,n]),u("div",{className:_.chatPart,children:[o(b,{children:"\u4E13\u6CE8\u8BA1\u65F6\u6570\u636E"}),u("div",{className:_.line,children:[o("div",{id:"chart_timing_len",className:_.chartContent}),o("div",{id:"chart_timing_len_rank",className:_.chartContent})]}),u("div",{className:_.line,children:[o("div",{id:"chart_timing_count",className:_.chartContent}),o("div",{id:"chart_timing_count_rank",className:_.chartContent})]})]})}function To(){const{showingTodo:t,showingTiming:n}=S(e=>e.statistics);return u("div",{children:[t&&o(No,{}),n&&o(xo,{})]})}const{RangePicker:So}=vt,{Option:ht}=A;function Io(){const[t,n]=d.exports.useState(!1),{showingRange:e,showingTodo:i,showingTiming:s}=S(r=>r.statistics),[a,c]=d.exports.useState("\u5468/\u6708/\u5E74"),l=D(),h=r=>{l(Co(r))},m=r=>{c(r);const{weekStart:P,weekEnd:L,monthStart:G,monthEnd:V,yearStart:Q,yearEnd:Z}=st();r==="\u672C\u5468"?h([P,L]):r==="\u672C\u6708"?h([G,V]):r==="\u672C\u5E74"&&h([Q,Z])},E=()=>l(Do()),g=()=>l(Fo());return u("div",{className:lt.statistic,children:[o("div",{className:"mainButton",style:{right:60,bottom:100},onClick:()=>n(!0),children:o(F,{overlay:"\u5C55\u5F00\u8BBE\u7F6E",children:o("i",{className:"iconfont icon-shezhi"})})}),u($,{title:"\u663E\u793A\u914D\u7F6E",visible:t,placement:"right",onClose:()=>n(!1),width:640,className:lt.drawer,children:[o(b,{children:"\u663E\u793A\u7684\u65F6\u95F4\u8303\u56F4"}),u("div",{className:"lineContainer",children:[o("p",{children:"\u5FEB\u6377\u9009\u62E9"}),u(A,{value:a,onChange:m,style:{width:120},children:[o(ht,{value:"\u672C\u5468",children:"\u672C\u5468"}),o(ht,{value:"\u672C\u6708",children:"\u672C\u6708"}),o(ht,{value:"\u672C\u5E74",children:"\u672C\u5E74"})]})]}),o("div",{className:lt.dateBox,children:o(So,{style:{width:"80%"},value:e,onChange:h})}),o(b,{children:"\u663E\u793A\u7684\u5185\u5BB9"}),u("div",{className:"lineContainer",children:[o("p",{children:"\u4EFB\u52A1\u6E05\u5355\u6570\u636E"}),o(nt,{checked:i,onChange:E})]}),u("div",{className:"lineContainer",children:[o("p",{children:"\u4E13\u6CE8\u8BA1\u65F6\u6570\u636E"}),o(nt,{checked:s,onChange:g})]})]}),o(To,{})]})}function ko(){return u(De,{children:[o(z,{path:"/",element:o(Fe,{to:"/todo"})}),o(z,{path:"/todo",element:o(no,{})}),o(z,{path:"/timing",element:o(vo,{})}),o(z,{path:"/statistics",element:o(Io,{})})]})}const Lo="_header_j1nnf_1",Oo="_menu_j1nnf_13",bo="_menuItem_j1nnf_23",Go="_isActive_j1nnf_38";var J={header:Lo,menu:Oo,menuItem:bo,isActive:Go};const Mo=[{text:"TodoList",icon:"icon-todolist",path:"/todo"},{text:"\u756A\u8304\u8BA1\u65F6",icon:"icon-jishi",path:"/timing"},{text:"\u5B66\u4E60\u5C0F\u7EC4",icon:"icon-xiaozu",path:"/group"},{text:"\u6570\u636E\u7EDF\u8BA1",icon:"icon-changguishujutongji",path:"/statistics"},{text:"\u4E2A\u4EBA\u4FE1\u606F",icon:"icon-gerenxinxi",path:"/user"},{text:"\u5173\u4E8E",icon:"icon-guanyu",path:"/about"}];function Ro(){const[t,n]=d.exports.useState(""),e=Be();d.exports.useEffect(()=>{n(e.pathname)},[e]);const i=ft();return o("div",{id:J.header,children:o("div",{className:J.menu,children:Mo.map(s=>u("div",{className:J.menuItem+(t===s.path?" "+J.isActive:""),onClick:()=>i(s.path),children:[o("i",{className:"iconfont "+s.icon}),o("span",{children:s.text})]},s.text))})})}const Ho="_footer_1byz1_1";var Po={footer:Ho};function Vo(){return o("div",{id:Po.footer,children:u("p",{children:["Copyright\xA9 2022"," ",o("a",{href:"https://youky.top",target:"__blank",children:"Youky"})]})})}function $o(){return o("div",{className:"App",style:{overflow:"hidden"},children:o(Ae,{store:qe,children:u(we,{children:[o(Ro,{}),o("div",{style:{flex:1,minHeight:"80vh"},children:o(ko,{})}),o(Vo,{})]})})})}Ne.render(o(_t.StrictMode,{children:o($o,{})}),document.getElementById("root"));