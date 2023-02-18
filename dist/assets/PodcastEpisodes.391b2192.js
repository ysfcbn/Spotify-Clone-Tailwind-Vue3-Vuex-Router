import{E as k}from"./EpisodeOptions.9801ee17.js";import{_ as y,a as _,r as f,o as r,c as l,d as h,b as o,i as v,w,t as u,n as g,k as b,l as x,v as E,f as M,p as P,h as F}from"./index.61b4be93.js";const O={name:"PodcastEpisodes",components:{EpisodeOptions:k},props:["episode","index","isNextEpisode","episodes","podcastShowPage","checkUserFavEpisode"],data(){return{episodeOptions:!1}},computed:{getToken(){return this.$store.getters.accessToken},getMonths(){return this.$store.getters["controller/getMonths"]},favEpisodes(){return this.$store.getters["episodes/getFavEpisodes"].items},episodeImage(){var e,i;return(i=(e=this.episode)==null?void 0:e.images[0])==null?void 0:i.url},checkUserFavEpisodes(){return this.$store.getters["episodes/getIsFavEpisode"]},ifPlayed(){return this.episode.resume_point.fully_played},resumePosition(){return this.episode.resume_point.resume_position_ms},currentEpisodeIsFav(){return this.$store.getters["episodes/getCurrentEpisodeIsFav"]},episodeIsFav(){return this.episodes?this.checkUserFavEpisodes[this.index]:this.podcastShowPage?this.currentEpisodeIsFav[this.index]:""}},methods:{async fetchFavEpisodes(){return await _.get("https://api.spotify.com/v1/me/episodes?limit=50",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:e})=>{console.log(e),this.$store.dispatch("episodes/favEpisodes",e)}).catch(e=>console.log(e))},async removeAddEpisode(e,i){var d;console.log(e);let s;e?s=e:s=i.target.closest(".episodeContainer").id,console.log(s);const a=(d=this.favEpisodes.find(t=>t.episode.id===s))==null?void 0:d.episode.id;a?await this.deleteEpisode(a):await this.addEpisode(s),await this.fetchFavEpisodes(),this.podcastShowPage&&await this.checkUserFavEpisode()},removeEpisodeOptionsFunc(e){e&&this.removeAddEpisode(e)},async addEpisode(e){await fetch("https://api.spotify.com/v1/me/episodes?ids="+e,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(i=>{console.log(i.status),i.status===200&&(console.log(e,"ADDED!!!!"),this.$store.dispatch("controller/modalInfoType",{type:"episode",status:!0}),this.isUserFavEpisode())}).catch(i=>console.log(i))},async deleteEpisode(e){await _.delete("https://api.spotify.com/v1/me/episodes?ids="+e,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(i=>{console.log(i.status),i.status===200&&(console.log(e,"DELETED!!!!"),this.$store.dispatch("controller/modalInfoType",{type:"episode",status:!1}),this.fetchFavEpisodes())}).catch(i=>console.log(i))},toggleEpisodeOptions(){this.episodeOptions=!this.episodeOptions},toggleEpisodeOptionsFunc(e){this.episodeOptions=e},selectedEpisode(e,i){i.target.closest("#play")||i.target.closest("#share")||i.target.closest("#add-library")||i.target.closest("#options")||i.target.closest("#podcast")||i.target.closest("#episode--options")||this.$router.push({name:"episode",params:{id:`${this.episode.id}`}})},totalDuration(e,i,s=!1){let a,d,t,n;return e&&s?(a=i-s,d=Math.floor(a/1e3/60/60),t=()=>a>36e5?Math.abs(Math.floor((a/1e3/60/60-d)*60)):Math.floor(a/1e3/60/60*60),n=Math.abs(Math.floor((a/1e3/60/60*60-t())*60))):e?(a=this.episode.duration_ms,d=Math.floor(a/1e3/60/60),t=()=>a>36e5?Math.abs(Math.floor((a/1e3/60/60-d)*60)):Math.floor(a/1e3/60/60*60),n=Math.abs(Math.floor((a/1e3/60/60*60-t())*60))):(a=i-s,d=Math.floor(a/1e3/60/60),t=()=>a>36e5?Math.abs(Math.floor((a/1e3/60/60-d)*60)):Math.floor(a/1e3/60/60*60),n=Math.abs(Math.floor((a/1e3/60/60*60-t())*60))),(()=>{if(e&&s)return a>36e5?d+" sa. "+t()+" dk. kald\u0131":t()+" dk. "+n+" sn. kald\u0131";if(!e&&!s)return a>36e5?d+" sa. "+t()+" dk.":t()+" dk. "+n+" sn.";if(!e&&s)return a>36e5?d+" sa. "+t()+" dk. kald\u0131":t()+" dk. "+n+" sn. kald\u0131";if(e)return a>36e5?d+" sa. "+t()+" dk.":t()+" dk. "+n+" sn."})()},currentReleaseDate(){var a,d,t;const e=new Date((a=this.episode)==null?void 0:a.release_date).getDate(),i=this.getMonths[new Date((d=this.episode)==null?void 0:d.release_date).getMonth()],s=new Date((t=this.episode)==null?void 0:t.release_date).getFullYear();return new Date().getFullYear()===s?`${e} ${i}`:`${i} ${s}`},isNewEpisode(){var s,a;const e=new Date,i=Math.abs(Math.round((e.getTime()-new Date((s=this.episode)==null?void 0:s.release_date).getTime())/1e3/60/60/24));return(a=this.episode)!=null&&a.resume_point.fully_played?!1:i<=7},episodeBarProgress(e,i){return 100*i/e}},created(){console.log("podcastEpisode created!")}},c=e=>(P("data-v-162d9796"),e=e(),F(),e),C={key:0,class:"group-hover:invisible border border-white/10"},z=["id"],S={key:0,class:"sm:row-span-1 md2:row-span-2 rounded-lg sm:w-[64px] sm:h-[64px] md2:w-[112px] md2:h-[112px] mr-[24px]"},D=["src"],I={class:"text-white flex flex-col shrink-0 col-start-2 col-end-4 gap-1 pr-[2rem]"},B={key:0},T={class:"text-sm font-semibold text-lightest pb-1 grid row-start-0 col-start-1 col-end-4"},N={key:0},A={key:1},V={class:"flex"},j={key:0,class:"w-2 h-2 bg-newEpisode mr-2 rounded-full self-start mt-2 shrink-0"},L={class:"text-base font-semibold"},U={key:1,id:"podcast",class:"w-fit"},H={class:"text-sm",style:{"font-weight":"700"}},R={class:"text-lightest text-sm line-clamp-2"},Y={class:"row-start-2 mt-[4.5rem] sm:col-start-1 md2:col-start-2 col-end-3 flex items-center"},G=c(()=>o("svg",{role:"img",height:"14",width:"14",viewBox:"0 0 16 16",class:"hidden"},[o("path",{fill:"#000",d:"M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"})],-1)),W=c(()=>o("svg",{height:"16",width:"16",viewBox:"0 0 16 16",class:""},[o("path",{fill:"#000",d:"M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"})],-1)),q=[G,W],J={class:"text-lightest text-sm shrink-0"},K={class:"flex items-center font-semibold ml-5"},Q={class:"pr-2"},X={key:0,class:"before:content-['\xB7'] before:px-1"},Z={key:1,class:"episode--bar--wrapper ml-3 h-4 flex items-center"},$={id:"episode-bar",class:"group relative w-[5.8rem] max-w-[85px] h-1 bg-opacwhite2 rounded-full"},ee={key:2,class:"before:content-['\xB7'] before:px-1 pr-2 flex items-center"},se=c(()=>o("span",{class:"px-2"}," \xC7al\u0131nd\u0131",-1)),te=c(()=>o("svg",{role:"img",height:"16",width:"16",class:"text-podcastGreen5",viewBox:"0 0 16 16"},[o("path",{fill:"currentColor",d:"M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"})],-1)),oe=[se,te],ie={class:"row-start-2 mt-[4.5rem] col-start-3"},ae={class:"relative text-lightest flex items-center w-full justify-around"},de=c(()=>o("button",{id:"share",class:"hover:text-white cursor-default group-hover:visible invisible"},[o("span",{"aria-hidden":"true"},[o("svg",{role:"img",height:"24",width:"24",viewBox:"0 0 24 24"},[o("path",{fill:"currentColor",d:"M3 8a1 1 0 011-1h3.5v2H5v11h14V9h-2.5V7H20a1 1 0 011 1v13a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"}),o("path",{fill:"currentColor",d:"M12 12.326a1 1 0 001-1V3.841l1.793 1.793a1 1 0 101.414-1.414L12 .012 7.793 4.22a1 1 0 101.414 1.414L11 3.84v7.485a1 1 0 001 1z"})])])],-1)),re={role:"img",height:"24",width:"24",viewBox:"0 0 24 24",class:"text-green3"},le=c(()=>o("path",{fill:"currentColor",d:"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.398-2.38a1 1 0 00-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 00-1.414 1.414l3.308 3.308 7.425-7.425z"},null,-1)),ne=[le],ce={role:"img",height:"24",width:"24",viewBox:"0 0 24 24",class:"invisible text-lightest hover:text-white group-hover:visible"},he=c(()=>o("path",{fill:"currentColor",d:"M11.999 3a9 9 0 100 18 9 9 0 000-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"},null,-1)),pe=c(()=>o("path",{fill:"currentColor",d:"M17.999 12a1 1 0 01-1 1h-4v4a1 1 0 11-2 0v-4h-4a1 1 0 110-2h4V7a1 1 0 112 0v4h4a1 1 0 011 1z"},null,-1)),ue=[he,pe],ge=c(()=>o("svg",{role:"img",height:"24",width:"24",viewBox:"0 0 24 24"},[o("path",{fill:"currentColor",d:"M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"})],-1)),me=[ge];function _e(e,i,s,a,d,t){const n=f("router-link"),m=f("EpisodeOptions");return r(),l("div",{class:g([{" lg:mx-[1rem]":s.episodes,"hover:bg-opacwhite1":!s.isNextEpisode},"sm:pl-[1.4rem] group max-w-[990px] min-w-[440px] shrink-0 hover:rounded-[4px] cursor-pointer relative z-100"])},[s.isNextEpisode?h("",!0):(r(),l("hr",C)),o("div",{id:s.episode.id,onClick:i[2]||(i[2]=p=>t.selectedEpisode(e.msg,p)),class:g([{"w-full":s.episodes},"episodeContainer grid grid-cols-colPodcast grid-rows-rowPodcast py-5"])},[s.isNextEpisode?h("",!0):(r(),l("div",S,[o("img",{class:"w-[7rem] h-full rounded-lg",src:t.episodeImage,alt:"fatih acet"},null,8,D)])),o("div",I,[s.isNextEpisode?(r(),l("div",B,[o("h4",T,[s.episode.resume_point.resume_position_ms?(r(),l("span",A,"Dinlemeye devam et")):(r(),l("span",N,"S\u0131radaki"))])])):h("",!0),o("div",V,[t.isNewEpisode()?(r(),l("span",j)):h("",!0),v(n,{to:{name:"episode",params:{id:s.episode.id}},class:"hover:underline"},{default:w(()=>[o("h4",L,u(s.episode.name),1)]),_:1},8,["to"])]),s.podcastShowPage?h("",!0):(r(),l("div",U,[v(n,{to:{name:"show",params:{id:s.episode.show.id}},class:"flex-start hover:underline"},{default:w(()=>[o("h5",H,u(s.episode.show.name),1)]),_:1},8,["to"])]))]),o("div",{class:g([{"col-span-full":s.isNextEpisode},"description row-start-2 col-span-full sm:col-start-1 md2:col-start-2 col-end-4 pr-[2rem] pt-4"])},[o("p",R,u(s.episode.description),1)],2),o("div",Y,[o("div",null,[o("button",{id:"play",class:g([{"bg-white":!s.isNextEpisode,"bg-green3":s.isNextEpisode},"items-center rounded-full w-fit p-[8px] cursor-default hover:scale-110"])},q,2)]),o("div",J,[o("div",K,[o("p",Q,u(t.currentReleaseDate()),1),!t.ifPlayed||!s.podcastShowPage?(r(),l("p",X,[o("span",null,u(t.totalDuration(t.ifPlayed,s.episode.duration_ms,t.resumePosition)),1)])):h("",!0),!(s.podcastShowPage&&t.ifPlayed)&&t.resumePosition?(r(),l("div",Z,[o("div",$,[o("span",{style:b({width:t.episodeBarProgress(s.episode.duration_ms,t.resumePosition)+"%"}),class:"absolute bg-white max-w-[85px] h-1 absolute rounded-full"},null,4)])])):t.ifPlayed&&s.podcastShowPage?(r(),l("div",ee,oe)):h("",!0)])])]),o("div",ie,[o("div",ae,[de,o("button",{onClick:i[0]||(i[0]=p=>t.removeAddEpisode(e.currentID=this.removeEpisodeOptionsFunc(),p)),id:"add-library",type:"button",class:"cursor-default"},[x((r(),l("svg",re,ne,512)),[[E,t.episodeIsFav]]),x((r(),l("svg",ce,ue,512)),[[E,!t.episodeIsFav]])]),o("button",{id:"options",onClick:i[1]||(i[1]=(...p)=>t.toggleEpisodeOptions&&t.toggleEpisodeOptions(...p)),type:"button",class:"hover:text-white group-hover:visible invisible cursor-default"},me),d.episodeOptions?(r(),M(m,{key:0,id:"episode--options",class:"absolute",episodeOptions:d.episodeOptions,episodes:s.episodes,podcastShowPage:s.podcastShowPage,episodeIsFav:t.episodeIsFav,onRemoveEpisodeOptions:t.removeEpisodeOptionsFunc,onToggleEpisodeOptions:t.toggleEpisodeOptionsFunc},null,8,["episodeOptions","episodes","podcastShowPage","episodeIsFav","onRemoveEpisodeOptions","onToggleEpisodeOptions"])):h("",!0)])])],10,z)],2)}var we=y(O,[["render",_e],["__scopeId","data-v-162d9796"]]);export{we as P};
