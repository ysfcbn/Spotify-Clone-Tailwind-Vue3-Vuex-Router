import{_ as d,o as s,c as i,b as a,n as t,d as l}from"./index.62f1d9c3.js";const o={name:"trackItemsHeader",props:["margin","albumPage","user","favoriteSongs","playlistPage","diskografiPage"]},r=a("div",{class:"mb:text-base md:text-lg flex justify-start items-end h-full w-full"}," # ",-1),c=a("div",null,"BA\u015ELIK",-1),m={key:0,class:"hidden md2:block"},n={key:1,class:"hidden lg2:block"},g=a("div",{class:"flex items-start"},[a("svg",{role:"img",height:"16",width:"16",viewBox:"0 0 16 16",class:""},[a("path",{fill:"currentColor",d:"M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"}),a("path",{fill:"currentColor",d:"M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"})])],-1),f=[g];function u(_,b,e,x,h,P){return s(),i("div",{class:t([{"top-[114px]":e.diskografiPage,"top-[64px] sticky":!e.diskografiPage},"w-[100%] presentation py-1 border-b border-opacwhite overflow-hidden pl-[1.4rem] lg:pl-[2.2rem]"]),style:{"z-index":"30"}},[a("div",{class:t({"mx-5":!e.margin})},[a("div",{class:t([{"mb:grid-cols-colPreDisco":e.albumPage||e.diskografiPage,"mb:grid-cols-colPresm md2:grid-cols-colPremd lg2:grid-cols-colPre":e.favoriteSongs||e.playlistPage},"grid text-lightest mb:text-[11px] sm3:text-[12px] items-center min-w-[300px] gap-2 font-semibold"])},[r,c,!e.albumPage&&!e.diskografiPage?(s(),i("div",m," ALB\xDCM ")):l("",!0),!e.albumPage&&!e.diskografiPage?(s(),i("div",n," TAR\u0130H EKLEND\u0130 ")):l("",!0),a("div",{class:t([{"justify-end mb:pr-12 md2:pr-[3rem]":e.albumPage,"justify-center mb:pl-[10px]":e.favoriteSongs||e.playlistPage,"justify-end mb:pr-[3rem] ":e.diskografiPage},"flex items-center w-full h-full"])},f,2)],2)],2)],2)}var k=d(o,[["render",u]]);export{k as T};