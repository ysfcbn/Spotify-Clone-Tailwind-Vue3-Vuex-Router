import{I as U}from"./Info.93f79524.js";import{_ as F,a as B,r as I,o as a,c as o,b as t,n as u,F as w,e as S,t as d,i as z,g as V,d as M}from"./index.61b4be93.js";const E={name:"playlists",components:{Info:U},data(){return{librarySec:!1,leftClick:!1,typeOfSelectedSection:null}},methods:{toggleFavSong(e,s){var l;((l=s.target.closest("#playBtn"))==null?void 0:l.id)==="playBtn"?(console.log("toggle Play/Stop Playlists"),this.playContextUri({uri:this.userFavSongsContextUri,index:this.currentPlayingTrackIndex,type:"collection"})):this.$router.push("/collection/tracks")},toggleEpisodes(e,s){var l;((l=s.target.closest("#playBtn"))==null?void 0:l.id)==="playBtn"?console.log("toggle Play/Stop Playlists"):this.$router.push("/collection/episodes")},selectedPlaylist(e,s){var l;((l=s.target.closest("#playBtn"))==null?void 0:l.id)==="playBtn"?(console.log("toggle Play/Stop Playlists"),this.playContextUri({uri:e.uri,index:this.currentPlayingTrackIndex,type:e.type},e.href)):this.$router.push({name:"playlist",params:{id:e.id}})},async fetchPlaylist(e){await B.get(e,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:s})=>{this.$store.dispatch("playlists/getPlaylist",s)}).catch(s=>console.log(s))},async playFavSongs(e){var s,l;console.log(e),this.isPlayingFavSongsContextUri?await this.$store.dispatch("controller/pauseCurrentTrack"):(console.log(this.currentPlayingTrackIndex),e.index=this.currentPlayingTrackIndex,((s=this.getCurrentlyPlayingTrack.context)==null?void 0:s.type)==="collection"&&!this.currentPlayingTrackIndex?(console.log((l=this.getCurrentlyPlayingTrack.context)==null?void 0:l.type),await this.$store.dispatch("controller/playCurrentTrack",e)):(e.index=this.currentPlayingTrackIndex,await this.$store.dispatch("controller/playSelectedContext",e)))},async playContextUri(e,s){var l,g;console.log(e),console.log(e.type),console.log(s),this.isPlayingContextUri&&e.uri===((g=(l=this.getCurrentlyPlayingTrack)==null?void 0:l.context)==null?void 0:g.uri)?await this.$store.dispatch("controller/pauseCurrentTrack"):(await e.type==="playlist"&&(await this.fetchPlaylist(s),this.typeOfSelectedSection="playlist"),await e.type==="collection"&&(this.typeOfSelectedSection="collection"),await e.type==="episodes"&&(this.typeOfSelectedSection="episodes"),e.index=this.currentPlayingTrackIndex,console.log(e),await this.$store.dispatch("controller/playSelectedContext",e))}},computed:{getToken(){return this.$store.getters.accessToken},getCurrentUser(){return this.$store.getters.getCurrentUser},currentUserUri(){var e;return(e=this.getCurrentUser)==null?void 0:e.uri},userFavSongsContextUri(){return`${this.currentUserUri}:collection`},isPlayingFavSongsContextUri(){var e,s,l;return((s=(e=this.getCurrentlyPlayingTrack)==null?void 0:e.context)==null?void 0:s.uri)===this.userFavSongsContextUri&&((l=this.getCurrentlyPlayingTrack)==null?void 0:l.is_playing)},getCurrentlyPlayingTrack(){return this.$store.getters["controller/getCurrentlyPlayingTrack"]},currentTrackID(){var e,s;return(s=(e=this.getCurrentlyPlayingTrack)==null?void 0:e.item)==null?void 0:s.id},getFavTracks(){var e;return(e=this.$store.getters["favTracks/getTracks"])==null?void 0:e.items},currentPlaylistTracks(){var e,s;return(s=(e=this.$store.getters["playlists/getPlaylist"])==null?void 0:e.tracks)==null?void 0:s.items},getCurrentPlaylistUri(){var e;return(e=this.$store.getters["playlists/getPlaylist"])==null?void 0:e.uri},findCurrentPlayingTrackIndex(){var e,s,l,g,n,i;return this.typeOfSelectedSection==="playlist"?(s=this.currentPlaylistTracks)==null?void 0:s.indexOf((e=this.currentPlaylistTracks)==null?void 0:e.find(c=>c.track.id===this.currentTrackID)):this.typeOfSelectedSection==="collection"?(g=this.getFavTracks)==null?void 0:g.indexOf((l=this.getFavTracks)==null?void 0:l.find(c=>c.track.id===this.currentTrackID)):this.typeOfSelectedSection==="episodes"?(i=this.currentAlbum)==null?void 0:i.indexOf((n=this.currentAlbum)==null?void 0:n.find(c=>c.id===this.currentTrackID)):""},currentPlayingTrackIndex(){return this.findCurrentPlayingTrackIndex+1?this.findCurrentPlayingTrackIndex:0},isPlayingContextUri(){var e;return(e=this.getCurrentlyPlayingTrack)==null?void 0:e.is_playing},getUserFavPlaylists(){return this.$store.getters["playlists/getUserFavPlaylists"]},getFavTracks(){return this.$store.getters["favTracks/getTracks"].items},totalTrack(){return this.$store.getters["favTracks/getTracks"].total},totalFavEpisodes(){var e;return(e=this.$store.getters["episodes/getFavEpisodes"])==null?void 0:e.total}},mounted(){this.librarySec=!0,console.log("Playlists Mounted"),this.header=document.getElementById("header"),this.playlistsEl=document.getElementById("playlists"),this.headerHeight=document.getElementById("header").getBoundingClientRect().height,console.log(this.playlistsEl),this.options={root:null,threshold:[.4,.6],rootMargin:`-${this.headerHeight}px 0px 0px 0px`},this.observer=new IntersectionObserver(e=>{this.header.classList.toggle("librarySec-intersec-bg1",e[0].intersectionRatio<=.6),this.header.classList.toggle("librarySec-intersec-bg2",e[0].intersectionRatio<=.4)},this.options),console.log(this.observer),this.observer.observe(this.playlistsEl)},beforeUnmount(){this.librarySec=!1,console.log("Library Unmounted"),this.observer.unobserve(this.playlistsEl),this.header.classList.remove("librarySec-intersec-bg1"),this.header.classList.remove("librarySec-intersec-bg2")}},O={class:"Playlists-Page p-5 mt-2 lg:ml-[1rem]"},L={class:"text-white"},j=t("div",{id:"playlists",class:"mb-8"},[t("div",{class:"h-fit"},[t("h2",{class:"text-[1.5rem] text-white leading-7 tracking-tighter font-semibold"}," \xC7alma Listeleri ")])],-1),A={class:"relative grid grid-cols-col180 gap-5 grid-rows-1 flex-1 mb-10"},$={role:"img",height:"24",width:"24",viewBox:"0 0 24 24"},D={key:0,fill:"text-black",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"},H={key:1,fill:"text-black",d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"},N={class:"h-full relative"},R={class:"flex flex-col justify-end h-full relative"},G={class:"text-white max-h-[90px] overflow-hidden line-clamp-3 mb-8 w-full"},q={class:"text-white font-semibol"},J={class:"text-lightest after:content-['\u2022'] after:inline-block after:px-1 after:text-lightest font-semibold"},K={class:"w-full min-h-[62px]"},Q=t("div",{class:"inline-block max-w-full text-3xl text-white tracking-tight pb-5",style:{"font-weight":"700"}}," Be\u011Fenilen \u015Eark\u0131lar ",-1),W={class:"text-md text-white tracking-tight font-semibold"},X={class:"text-white lowercase leading-6 tracking-tight text-[16px]"},Y={class:"h-full"},Z=t("div",{class:"relative py-[50%] w-full mb-5 relative flex items-start bg-podcastGreen2 justify-center rounded-md"},[t("svg",{role:"img",height:"64",width:"64",viewBox:"0 0 24 24",class:"text-green3 absolute top-[50%] bottom-0 -translate-y-[50%]"},[t("path",{fill:"currentColor",d:"M7 1a3 3 0 00-3 3v17.167c0 1.448 1.657 2.27 2.81 1.393L12 18.612l5.19 3.948c1.153.876 2.81.055 2.81-1.393V4a3 3 0 00-3-3H7z"})]),t("div",{class:"absolute flex items-start right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:block group-hover:translate-y-[-0.4rem]"},[t("button",{id:"playBtn",class:"p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"},[t("span",null,[t("svg",{role:"img",height:"24",width:"24",viewBox:"0 0 24 24"},[t("path",{fill:"text-black",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"})])])])])],-1),ee={class:"flex items-middle flex-col justify-center"},te=t("div",{class:"text-white max-w-full truncate leading-7",style:{"font-weight":"700"}}," B\xF6l\xFCmlerin ",-1),se={class:"text-sm text-lightest w-full truncate leading-7"},re=["id","onClick"],ie={class:"h-full"},le={class:"w-full mb-5 relative rounded-md"},ae=["src"],oe={key:1,class:"relative py-[50%] w-full mb-5 relative flex items-start bg-light justify-center rounded-md"},ne=t("svg",{height:"100",width:"100",viewBox:"0 0 54 54",class:"absolute top-[50%] bottom-0 -translate-y-[50%]"},[t("path",{fill:"#808080",d:`M52.16,0.249c-0.217-0.19-0.503-0.275-0.788-0.241l-31,4C19.873,4.072,19.5,4.497,19.5,5v6v28.623
	C17.674,37.428,14.773,36,11.5,36c-5.514,0-10,4.037-10,9s4.486,9,10,9s10-4.037,10-9v-33.12l29-3.742v22.485
	C48.674,28.428,45.773,27,42.5,27c-5.514,0-10,4.037-10,9s4.486,9,10,9s10-4.037,10-9V7V1C52.5,0.712,52.376,0.438,52.16,0.249z
	 M11.5,52c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7S15.911,52,11.5,52z M42.5,43c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7
	S46.911,43,42.5,43z M21.5,5.878l29-3.741v3.983l-29,3.741V5.878z`})],-1),ce=[ne],de=["onClick"],ge={role:"img",height:"24",width:"24",viewBox:"0 0 24 24"},he={key:0,fill:"text-black",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"},ue={key:1,fill:"text-black",d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"},ye={class:"flex items-middle flex-col justify-around"},pe={class:"text-white max-w-full truncate leading-7"},ve={class:"text-sm text-lightest w-full line-clamp-2 leading-7"},xe={key:0},fe={key:1};function ke(e,s,l,g,n,i){const c=I("Info");return a(),o("section",O,[t("div",L,[j,t("div",A,[t("div",{onClick:s[1]||(s[1]=r=>i.toggleFavSong(e.msg,r)),class:"col-span-2 group hover:bg-opacblack1 ease duration-200 w-full h-auto cursor-pointer rounded-md flex-1 p-5 relative leading-8 text-md text-white bg-gradient-to-br from-purple3 to-blue2"},[t("div",{class:u([{"opacity-100 translate-y-[-0.4rem]":i.isPlayingFavSongsContextUri},"z-10 absolute flex items-center opacity-0 group-hover:opacity-100 transition ease-in duration-200 right-1 bottom-1 p-3 group-hover:block group-hover:translate-y-[-0.5rem]"])},[t("button",{id:"playBtn",onClick:s[0]||(s[0]=r=>i.playFavSongs(e.uri={uri:i.userFavSongsContextUri,index:i.currentPlayingTrackIndex,type:"collection"})),class:"p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-105 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"},[t("span",null,[(a(),o("svg",$,[i.isPlayingFavSongsContextUri?(a(),o("path",H)):(a(),o("path",D))]))])])],2),t("div",N,[t("div",R,[t("div",G,[(a(!0),o(w,null,S(i.getFavTracks,r=>(a(),o("span",{key:r.track.id,class:""},[t("span",q,[V(d(r.track.artists[0].name)+" ",1),t("span",J,d(r.track.name),1)])]))),128))]),t("div",K,[Q,t("div",W,[t("div",X,d(i.totalTrack)+" be\u011Fenilen \u015Fark\u0131lar ",1)])])])])]),t("div",{onClick:s[2]||(s[2]=r=>i.toggleEpisodes(e.msg,r)),class:"bg-dark1 hover:bg-opacblack1 ease duration-200 w-full cursor-pointer rounded-md flex-1 p-4 relative group"},[t("div",Y,[Z,t("div",ee,[te,t("div",se,d(i.totalFavEpisodes)+" b\xF6l\xFCm ",1)])])]),(a(!0),o(w,null,S(i.getUserFavPlaylists,r=>{var y,p,v,x,f,k,m,_,b,C,P,T;return a(),o("div",{key:r.id,id:r.id,onClick:h=>i.selectedPlaylist(r=r,h),class:"playlist--container bg-dark1 hover:bg-opacblack1 ease duration-200 w-full h-auto cursor-pointer rounded-md flex-1 p-4 relative group"},[t("div",ie,[t("div",le,[(y=r==null?void 0:r.images[0])!=null&&y.url?(a(),o("img",{key:0,class:"object-cover rounded-md",src:(p=r==null?void 0:r.images[0])==null?void 0:p.url,alt:""},null,8,ae)):(a(),o("div",oe,ce)),t("div",{class:u([{"opacity-100 translate-y-[-0.4rem]":((v=i.getCurrentlyPlayingTrack)==null?void 0:v.is_playing)&&r.uri===((f=(x=i.getCurrentlyPlayingTrack)==null?void 0:x.context)==null?void 0:f.uri),"opacity-0":((k=i.getCurrentlyPlayingTrack)==null?void 0:k.is_playing)&&r.uri!==((_=(m=i.getCurrentlyPlayingTrack)==null?void 0:m.context)==null?void 0:_.uri)},"bg-dark rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"])},[(b=r==null?void 0:r.images[0])!=null&&b.url?(a(),o("button",{key:0,onClick:h=>i.playContextUri(e.uri={uri:r.uri,index:0,type:"playlist"},e.href=r.href),onMousedown:s[3]||(s[3]=h=>n.leftClick=!0),onMouseup:s[4]||(s[4]=h=>n.leftClick=!1),id:"playBtn",class:u([{" bg-green3/80 scale-80":n.leftClick,"hover:scale-104 bg-green3/95 hover:bg-green3":!n.leftClick},"p-3 rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"])},[(a(),o("svg",ge,[((C=i.getCurrentlyPlayingTrack)==null?void 0:C.is_playing)&&r.uri===((T=(P=i.getCurrentlyPlayingTrack)==null?void 0:P.context)==null?void 0:T.uri)?(a(),o("path",ue)):(a(),o("path",he))]))],42,de)):M("",!0)],2)]),t("div",ye,[t("div",pe,d(r.name),1),t("div",ve,[r.description?(a(),o("span",xe,d(r.description),1)):(a(),o("span",fe," Olu\u015Fturan: "+d(r.owner.display_name),1))])])])],8,re)}),128))])]),t("section",null,[z(c)])])}var be=F(E,[["render",ke]]);export{be as default};
