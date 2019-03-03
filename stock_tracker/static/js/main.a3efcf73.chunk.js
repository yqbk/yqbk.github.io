(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{48:function(e,a,n){e.exports=n(73)},57:function(e,a,n){},58:function(e,a,n){},59:function(e,a,n){},60:function(e,a,n){},72:function(e,a,n){},73:function(e,a,n){"use strict";n.r(a);var t=n(0),c=n.n(t),o=n(30),r=n.n(o),l=n(16),i=n(13),m=n(41),s=n(46),u=n(17);function p(e){if(!e.ok)throw Error(e.statusText);return e}var h=function(e){return fetch(e).then(p).then(function(e){return e.json()})},y="U3Vuc2NyYXBlcnM=";function f(e){return function(a){var n="https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=".concat(e,"&apikey=").concat(y),t="https://autocomplete.clearbit.com/v1/companies/suggest?query=".concat(e);return a(v(e)),h(n).then(function(e){var n,c=e.bestMatches[0];return h((n=c["1. symbol"],"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=".concat(n,"&apikey=").concat(y))).then(function(e){return h(t).then(function(n){return a(g(Object(u.a)({},c,e["Global Quote"],n.filter(function(e){return e.name.toUpperCase()===c["2. name"].split(" ")[0].toUpperCase()})[0])))})})}).catch(function(e){return a(w(e))})}}var d="GET_COMPANY_INFO",E="GET_COMPANY_INFO_SUCCESS",b="GET_COMPANY_INFO_FAILURE",v=function(e){return{type:"GET_COMPANY_INFO",payload:{searchValue:e}}},g=function(e){return{type:"GET_COMPANY_INFO_SUCCESS",payload:e}},w=function(e){return{type:"GET_COMPANY_INFO_FAILURE",payload:{error:e}}},C={searchValue:"",companies:[],loading:!1,error:null};var k=Object(i.c)({companyInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case d:return Object(u.a)({},e,{searchValue:a.payload.searchValue,loading:!0});case E:var n=a.payload,t={name:n["2. name"],region:n["4. region"],symbol:n["1. symbol"],time:"".concat(n["5. marketOpen"]," - ").concat(n["6. marketClose"]," ").concat(n["7. timezone"]),price:Math.round(100*n["05. price"])/100,currency:n["8. currency"],change:"".concat(Math.round(100*n["09. change"])/100," (").concat(Math.round(100*n["10. change percent"].slice(0,-1))/100,"%)"),closed:"Closed: ".concat(n["07. latest trading day"]),domain:n.domain,logo:n.logo};return Object(u.a)({},e,{loading:!1,companies:e.companies.map(function(e){return e.symbol}).includes(t.symbol)?e.companies:[].concat(Object(s.a)(e.companies),[t])});case b:return Object(u.a)({},e,{loading:!1,error:a.payload.error});default:return e}}}),N=n(20),O=n(21),T=n(28),j=n(22),I=n(29),_=n(77),S=n(76),A=n(75),M=n(43),F=n(74),G=(n(57),function(e){function a(e){var n;return Object(N.a)(this,a),(n=Object(T.a)(this,Object(j.a)(a).call(this,e))).onInputChange=function(e){n.setState({company:e.target.value})},n.onFormSubmit=function(e){e.preventDefault(),n.props.fetchCompanyInfo(n.state.company),n.setState({company:""}),n.props.changeTab()},n.state={company:""},n}return Object(I.a)(a,e),Object(O.a)(a,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("h3",null,"Track new company"),c.a.createElement("p",null,"Company symbol"),c.a.createElement(A.a,{inline:!0,onSubmit:this.onFormSubmit,className:"track-form"},c.a.createElement(M.a,{type:"text",placeholder:"Company symbol",className:"mr-sm-2",value:this.state.company,onChange:this.onInputChange}),c.a.createElement("span",null,"Provide the stock exchange symbol of a company you want to track"),c.a.createElement(F.a,{type:"submit",className:"track-button"},"Track")))}}]),a}(t.Component)),U=Object(l.b)(null,function(e){return{fetchCompanyInfo:function(a){return e(f(a))}}})(G),Y=(n(58),n(59),function(e){var a,n=e.company;return c.a.createElement("div",{className:"company-container"},c.a.createElement("img",{className:"company-image",src:n.logo,alt:"".concat(64,"x").concat(64)}),c.a.createElement("div",{className:"company-info"},c.a.createElement("div",{className:"company-info-row"},c.a.createElement("span",{className:"company-name"},n.name),c.a.createElement("span",null," ",n.symbol),c.a.createElement("span",null," ",n.domain)),c.a.createElement("div",{className:"company-info-row"},c.a.createElement("span",null," ",n.region),c.a.createElement("span",null," ",n.time)),c.a.createElement("div",{className:"company-info-row"},c.a.createElement("span",{className:"bolded"},n.price),c.a.createElement("span",null," ",n.currency),c.a.createElement("span",{className:(a=n.change,"-"===a[0]?"change-red bolded":"change-green bolded")}," ",n.change),c.a.createElement("span",null," ",n.closed))))}),L=function(e){var a=e.companies,n=e.onClick;return c.a.createElement("div",null,c.a.createElement("h3",null,"Companies"),a&&a.length?a.map(function(e){return c.a.createElement(Y,{company:e,key:e.name})}):c.a.createElement("div",null,c.a.createElement("p",null,"There are no companies yet."," ",c.a.createElement("span",{onClick:n,className:"link"},"Track your first company."))))},P=(n(60),function(e){function a(e){var n;return Object(N.a)(this,a),(n=Object(T.a)(this,Object(j.a)(a).call(this,e))).switchToTackNewCompany=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];n.setState({trackNewCompanyIsActive:e})},n.state={trackNewCompanyIsActive:!1},n}return Object(I.a)(a,e),Object(O.a)(a,[{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"App"},c.a.createElement(_.a,{bg:"light",expand:"lg"},c.a.createElement(_.a.Brand,{href:"#home"},"Stock Tracker"),c.a.createElement(_.a.Toggle,{"aria-controls":"basic-navbar-nav"}),c.a.createElement(_.a.Collapse,{id:"basic-navbar-nav"},c.a.createElement(S.a,{className:"mr-auto"},c.a.createElement(S.a.Link,{onClick:this.switchToTackNewCompany},"Track new company"),c.a.createElement(S.a.Link,{onClick:function(){return e.switchToTackNewCompany(!1)}},"Companies")))),this.state.trackNewCompanyIsActive?c.a.createElement(U,{changeTab:function(){return e.switchToTackNewCompany(!1)}}):c.a.createElement(L,{companies:this.props.companies,onClick:this.switchToTackNewCompany}))}}]),a}(t.Component)),x=Object(l.b)(function(e){return{companies:e.companyInfo.companies}},null)(P);n(72),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var B=Object(i.d)(k,Object(i.a)(m.a));r.a.render(c.a.createElement(l.a,{store:B},c.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[48,1,2]]]);
//# sourceMappingURL=main.a3efcf73.chunk.js.map