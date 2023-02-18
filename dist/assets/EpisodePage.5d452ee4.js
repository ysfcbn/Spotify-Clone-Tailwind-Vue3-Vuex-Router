import{I as k}from"./Info.93f79524.js";import{E as b}from"./EpisodeOptions.9801ee17.js";import{_ as B,a as m,r as g,o as a,c as l,b as s,k as v,t as p,i as _,w,d as u,f as P,F as T,p as M,h as I,g as y}from"./index.61b4be93.js";const C={name:"EpisodePage",components:{Info:k,EpisodeOptions:b},props:{id:{type:String,required:!0}},data(){return{episodePage:!1,episodeOptions:!1,toggle:!1,seeMoreBtn:!0,more:"... daha fazlas\u0131n\u0131 g\xF6ster",less:"daha az\u0131n\u0131 g\xF6ster"}},computed:{isAuth(){return this.$store.getters.isAuth},getToken(){return this.$store.getters.accessToken},currentEpisode(){return this.$store.getters["episodes/getCurrentEpisode"]},currentEpisodeIsFav(){return this.$store.getters["episodes/getCurrentEpisodeIsFav"]},episodeImage(){var e,o;return(o=(e=this.currentEpisode)==null?void 0:e.images[0])==null?void 0:o.url},ifPlayed(){var e,o;return(o=(e=this.currentEpisode)==null?void 0:e.resume_point)==null?void 0:o.fully_played},resumePosition(){var e,o;return(o=(e=this.currentEpisode)==null?void 0:e.resume_point)==null?void 0:o.resume_position_ms},getMonths(){return this.$store.getters["controller/getMonths"]}},methods:{async fetchFavEpisodes(){return await m.get("https://api.spotify.com/v1/me/episodes?limit=50",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:e})=>{console.log(e),this.$store.dispatch("episodes/favEpisodes",e)}).catch(e=>console.log(e))},async fetchEpisode(){await m.get("https://api.spotify.com/v1/episodes/"+this.$route.params.id,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:e})=>{console.log(e),this.$store.dispatch("episodes/currentEpisode",e)}).catch(e=>console.log(e))},async checkUserFavEpisode(){await m.get("https://api.spotify.com/v1/me/episodes/contains?ids="+this.$route.params.id,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:e})=>{this.$store.dispatch("episodes/currentEpisodeIsFav",...e)}).catch(e=>console.log(e))},async addEpisode(){await fetch("https://api.spotify.com/v1/me/episodes?ids="+this.$route.params.id,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(e=>{console.log(e.status),e.status===200&&(this.checkUserFavEpisode(),this.$store.dispatch("controller/modalInfoType",{type:"episode",status:!0}))}).catch(e=>{console.log(e),this.$store.dispatch("controller/modalInfoType",{type:"error",status:!0})})},async deleteEpisode(){await m.delete("https://api.spotify.com/v1/me/episodes?ids="+this.$route.params.id,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(e=>{console.log(e.status),e.status===200&&(this.checkUserFavEpisode(),this.$store.dispatch("controller/modalInfoType",{type:"episode",status:!1}))}).catch(e=>{console.log(e),this.$store.dispatch("controller/modalInfoType",{type:"error",status:!0})})},htmlDescription(){const e=document.getElementById("episode--description"),o=document.getElementById("episode--description1");e.innerHTML=`${this.currentEpisode.html_description}`;const n=[...e.getElementsByTagName("p")];if(n.length?o.innerHTML=`${n[0].innerHTML}`:(o.innerHTML=this.currentEpisode.description,this.seeMoreBtn=!1),this.toggle){o.innerHTML=`${this.currentEpisode.html_description}`;const i=[...o.getElementsByTagName("a")];i.length&&i.forEach(r=>{r.style.color="#ffffff",r.style.fontWeight="600",r.style.textDecoration="underline"})}},currentReleaseDate(){var n,i;const e=new Date((n=this.currentEpisode)==null?void 0:n.release_date).getDate(),o=this.getMonths[new Date((i=this.currentEpisode)==null?void 0:i.release_date).getMonth()];return`${e} ${o} `},totalDuration(e,o,n=!1){const i=o-n,r=Math.floor(i/1e3/60/60),t=()=>i>36e5?Math.abs(Math.floor((i/1e3/60/60-r)*60)):Math.floor(i/1e3/60/60*60),c=Math.abs(Math.floor((i/1e3/60/60*60-t())*60));return(()=>{if(e&&n)return i>36e5?r+" sa. "+t()+" dk. kald\u0131":t()+" dk. "+c+" sn. kald\u0131";if(!e&&!n)return i>36e5?r+" sa. "+t()+" dk.":t()+" dk. "+c+" sn.";if(!e&&n)return i>36e5?r+" sa. "+t()+" dk. kald\u0131":t()+" dk. "+c+" sn. kald\u0131";if(e)return i>36e5?r+" sa. "+t()+" dk.":t()+" dk. "+c+" sn."})()},episodeBarProgress(e,o){return 100*o/e},toggleDescription(){this.toggle=!this.toggle,this.htmlDescription()},toggleEpisodeOptions(){this.episodeOptions=!this.episodeOptions},toggleEpisodeOptionsFunc(e){this.episodeOptions=e},async addRemoveEpisode(){this.currentEpisodeIsFav?(await this.deleteEpisode(),await this.fetchFavEpisodes()):(await this.addEpisode(),await this.fetchFavEpisodes())}},async created(){console.log("EpisodePage Mounted!"),this.episodePage=!0,await this.fetchEpisode(),await this.checkUserFavEpisode(),this.header=document.getElementById("header"),this.episodeEl=document.getElementById("episodePage"),this.htmlDescription(),this.options={root:null,threshold:[.1,.4]},this.observer=new IntersectionObserver(e=>{this.header.classList.toggle("podcast-intersec-bg1",e[0].intersectionRatio<=.4),this.header.classList.toggle("podcast-intersec-bg2",e[0].intersectionRatio<=.1),e[0].intersectionRatio>=.1?this.$store.dispatch("controller/closeHeaderBtn"):this.$store.dispatch("controller/showHeaderBtn")},this.options),this.observer.observe(this.episodeEl)},beforeUnmount(){this.observer.unobserve(this.episodeEl),this.header.classList.remove("podcast-intersec-bg1"),this.header.classList.remove("podcast-intersec-bg2"),this.episodePage=!1}},d=e=>(M("data-v-1b10844a"),e=e(),I(),e),z={class:"episode--page"},A={class:"relative flex items-end justify-start h-full lg:ml-[1rem]"},D={class:"flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"},F=["src"],O={class:"flex flex-col text-white font-semibold px-4"},j=d(()=>s("h2",{class:"text-sm tracking-tighter uppercase"},"podcast b\xF6l\xFCm\xFC",-1)),L={class:"w-full sm:text-2xl md:text-4xl lg:text-5xl lg3:text-6xl xl:text-7xl xl2:text-8xl tracking-tighter py-2 cursor-default"},H={class:"flex flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"},R={class:"flex items-center flex-nowrap shrink-0"},S={class:"flex items-center"},V={class:"relative flex items-center text-opacwhite3 font-semibold text-sm sm:pl-4 sm:pt-6 lg:pl-8"},N={class:"flex items-center"},U={class:""},q={class:"before:content-['\xB7'] before:px-1"},G={key:0},W={key:1},J={key:2,class:""},K={key:0,class:"px-2"},Q=d(()=>s("svg",{role:"img",height:"16",width:"16",class:"text-podcastGreen5",viewBox:"0 0 16 16"},[s("path",{fill:"currentColor",d:"M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"})],-1)),X=[Q],Y={key:1,class:"episode--bar--wrapper ml-3 h-4 flex items-center"},Z={id:"episode-bar",class:"group relative w-[5.8rem] max-w-[85px] h-1 bg-opacwhite2 rounded-full"},$={class:"w-full h-[6.8rem] relative flex items-start py-[24px]"},ee={class:"w-full ml-[1.2rem] flex items-center lg:ml-[2rem]"},te=d(()=>s("button",{class:"rounded-full bg-green3 p-[0.9rem] cursor-default"},[s("span",null,[s("svg",{role:"img",height:"28",width:"28",viewBox:"0 0 24 24",class:""},[s("path",{fill:"currentColor",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"})]),s("svg",{role:"img",height:"28",width:"28",viewBox:"0 0 24 24",class:"hidden"},[s("path",{d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"})])])],-1)),se={key:0,role:"img",height:"32",width:"32",viewBox:"0 0 24 24",class:"text-green3"},oe=d(()=>s("path",{fill:"currentColor",d:"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.398-2.38a1 1 0 00-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 00-1.414 1.414l3.308 3.308 7.425-7.425z"},null,-1)),ie=[oe],re={key:1,role:"img",height:"32",width:"32",viewBox:"0 0 24 24"},ae=d(()=>s("path",{fill:"currentColor",d:"M11.999 3a9 9 0 100 18 9 9 0 000-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"},null,-1)),ne=d(()=>s("path",{fill:"currentColor",d:"M17.999 12a1 1 0 01-1 1h-4v4a1 1 0 11-2 0v-4h-4a1 1 0 110-2h4V7a1 1 0 112 0v4h4a1 1 0 011 1z"},null,-1)),le=[ae,ne],de=d(()=>s("svg",{role:"img",height:"32",width:"32",viewBox:"0 0 24 24",class:"hover:text-white pointer-events-none"},[s("path",{fill:"currentColor",d:"M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"})],-1)),ce=[de],pe={class:"content--spacing sm:pl-4 lg:pl-8"},he=d(()=>s("h2",{class:"text-white1 text-2xl py-[16px] tracking-tighter",style:{"font-weight":"700"}}," B\xF6l\xFCm A\xE7\u0131klamas\u0131 ",-1)),ue=d(()=>s("div",{id:"episode--description",class:"absolute hidden text-lightest max-w-[45rem]"},null,-1)),me={class:"py-[16px] relative text-lightest max-w-[45rem]"},ge=d(()=>s("p",{id:"episode--description1"},null,-1)),_e={key:0,class:"text-white font-semibold cursor-pointer"},fe={key:1,class:"absolute bottom-[-5px] left-[-2px] text-white font-semibold cursor-pointer w-[8rem] hover:underline"},xe={class:"my-5 relative"},ve={class:"hover:scale-105 absolute"},we=y("B\xF6l\xFCmlerin hepsini g\xF6r"),ye={class:"sm:pl-5 lg:p-5 lg:ml-[1rem]"};function Ee(e,o,n,i,r,t){var x;const c=g("router-link"),f=g("EpisodeOptions"),E=g("Info");return a(),l(T,null,[s("section",z,[s("div",{id:"episodePage",class:"p-5 h-[326px] max-h-[800px] min-h-[340px] w-full mt-[-66px] relative shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)]",style:v({"--bgEpisodeImage":`url(${t.episodeImage})`})},[s("div",A,[s("div",D,[s("img",{class:"object-cover h-full w-full rounded-[12px]",src:t.episodeImage,alt:"single"},null,8,F)]),s("div",O,[j,s("h1",L,p(t.currentEpisode.name),1),s("div",H,[s("div",R,[s("span",S,[_(c,{to:{name:"show",params:{id:t.currentEpisode.show.id}},class:"hover:underline sm:text-xl md:text-2xl tracking-tighter py-2"},{default:w(()=>[y(p(t.currentEpisode.show.name),1)]),_:1},8,["to"])])])])])])],4),s("div",V,[s("div",N,[s("p",U,p(t.currentReleaseDate()),1),s("p",q,[!t.ifPlayed&&!t.resumePosition?(a(),l("span",G,p(t.totalDuration(t.ifPlayed,t.currentEpisode.duration_ms,t.resumePosition)),1)):u("",!0),!t.ifPlayed&&t.resumePosition?(a(),l("span",W,p(t.totalDuration(t.ifPlayed,t.currentEpisode.duration_ms,t.resumePosition)),1)):t.ifPlayed?(a(),l("span",J," \xC7al\u0131nd\u0131")):u("",!0)])]),t.ifPlayed?(a(),l("div",K,X)):t.resumePosition?(a(),l("div",Y,[s("div",Z,[s("span",{style:v({width:t.episodeBarProgress(t.currentEpisode.duration_ms,t.resumePosition)+"%"}),class:"absolute bg-white max-w-[85px] h-1 absolute rounded-full"},null,4)])])):u("",!0)]),s("div",$,[s("div",ee,[te,s("div",null,[s("button",{onClick:o[0]||(o[0]=(...h)=>t.addRemoveEpisode&&t.addRemoveEpisode(...h)),class:"p-[0.9rem] ml-4 mx-1 text-lightest cursor-default hover:text-white"},[t.currentEpisodeIsFav?(a(),l("svg",se,ie)):(a(),l("svg",re,le))]),s("button",{onClick:o[1]||(o[1]=(...h)=>t.toggleEpisodeOptions&&t.toggleEpisodeOptions(...h)),class:"text-lightest cursor-default w-fit relative hover:text-white"},ce),r.episodeOptions?(a(),P(f,{key:0,episodePage:r.episodePage,onToggleEpisodeOptions:t.toggleEpisodeOptionsFunc},null,8,["episodePage","onToggleEpisodeOptions"])):u("",!0)])])]),s("div",pe,[he,ue,s("div",me,[ge,r.seeMoreBtn?(a(),l("button",{key:0,onClick:o[2]||(o[2]=(...h)=>t.toggleDescription&&t.toggleDescription(...h))},[r.toggle?(a(),l("p",fe,p(r.less),1)):(a(),l("span",_e,p(r.more),1))])):u("",!0)]),s("div",xe,[s("div",ve,[_(c,{to:{name:"show",params:{id:(x=t.currentEpisode)==null?void 0:x.show.id}},class:"text-white border-textColor hover:border-white border-[1px] rounded-full px-4 py-1 text-sm",style:{"font-weight":"700"}},{default:w(()=>[we]),_:1},8,["to"])])])])]),s("section",ye,[_(E)])],64)}var Pe=B(C,[["render",Ee],["__scopeId","data-v-1b10844a"]]);export{Pe as default};
