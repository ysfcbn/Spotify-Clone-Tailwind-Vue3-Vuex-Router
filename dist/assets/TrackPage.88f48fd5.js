import{T as S}from"./TrackItems.c284972d.js";import{_ as L,o as c,c as h,e as y,t as n,F as b,a as g,r as _,b as s,i as v,w as l,k as z,n as f,d as x,f as w,p as j,h as I,g as d}from"./index.61b4be93.js";import{C as M}from"./Card.e1099280.js";import{A as U}from"./AppOptions.edb4307c.js";const O={data(){return{lyrics:[]}},mounted(){this.FetchLyric=["The way you shake it, I can't believe it","I ain't never seen an ass like that","The way you move it, you make my pee-pee go","D-doin', doin', doin'","I don't believe it, it's almost too good to be true"],this.lyrics=this.FetchLyric}};function N(e,t,o,u,i,a){return c(!0),h(b,null,y(i.lyrics,p=>(c(),h("p",{key:p},n(p),1))),128)}var Y=L(O,[["render",N]]);const V={name:"Track",components:{TrackItems:S,Lyrics:Y,Card:M,AppOptions:U},props:{id:{type:String,required:!0}},data(){return{lyrics:!1,appOptions:!1,TrackPage:!0,seeMore:!1,margin:!1,artistImg:"",heartBtn:document.getElementById("heartBtn"),copyrights:[],popSongs:[],albumTracks:[],popularAlbums:[],popularSingles:[]}},computed:{isAuth(){return this.$store.getters.isAuth},getToken(){return this.$store.getters.accessToken},currentTrack(){return this.$store.getters["albums/getCurrentTrack"]},currentTrackUri(){var e;return(e=this.currentTrack)==null?void 0:e.uri},currentAlbumUri(){var e,t;return(t=(e=this.currentTrack)==null?void 0:e.album)==null?void 0:t.uri},currentArtistID(){var e,t;return(t=(e=this.currentTrack)==null?void 0:e.artists[0])==null?void 0:t.id},currentTrackID(){var e;return(e=this.currentTrack)==null?void 0:e.id},currentArtistUri(){var e,t;return(t=(e=this.currentTrack)==null?void 0:e.artists[0])==null?void 0:t.uri},getCurrentlyPlayingTrack(){return this.$store.getters["controller/getCurrentlyPlayingTrack"]},isPlayingCurrentTrack(){var e,t,o;return((e=this.getCurrentlyPlayingTrack)==null?void 0:e.item.id)===this.currentTrackID&&!((t=this.getCurrentlyPlayingTrack)!=null&&t.context)&&((o=this.getCurrentlyPlayingTrack)==null?void 0:o.is_playing)},isClickHeaderBtn(){return this.$store.getters["controller/isClickHeaderBtn"]},artistTopTracks(){return this.$store.getters["artists/getTopTracks"]},artistTopTrackUris(){return this.artistTopTracks.map(e=>e.uri)},trackArtistName(){var e;return(e=this.currentTrack)==null?void 0:e.artists},allFavTracks(){return this.$store.getters["favTracks/getTracks"].items},albumTrackImage(){var e,t;return(t=(e=this.currentTrack)==null?void 0:e.album)==null?void 0:t.images[1].url},isFavTrack(){var e;return((e=this.allFavTracks)==null?void 0:e.filter(t=>t.track.id===this.$route.params.id).length)>0},getFavTracksonalbum(){return this.$store.getters["albums/getfavTracksID"]},getFavTracksonalbum2(){return this.$store.getters["albums/getfavTracksID2"]},addGreenHeartEl(){return this.getFavTracksonalbum.map(e=>document.getElementById(`${e}`))},addGreenHeartEl2(){return this.getFavTracksonalbum2.map(e=>document.getElementsByClassName(`${e}`))}},watch:{async trackArtistName(e){await g.get(e[0].href,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:t})=>{console.log(t),this.artistImg=t.images[2].url}).catch(t=>console.log(t))},isPlayingCurrentTrack(e){e?this.$store.dispatch("controller/isPlayingHeaderBtn",e):this.$store.dispatch("controller/isPlayingHeaderBtn",e)},async isClickHeaderBtn(e,t){e!==t&&await this.playCurrentTrack({uri:this.currentTrackUri,id:this.currentTrackID})}},methods:{async fetchFavTracks(){return await g.get("https://api.spotify.com/v1/me/tracks?limit=50",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:e})=>{console.log(e.items),this.$store.dispatch("favTracks/getTracks",e)}).catch(e=>console.log(e))},async fetchTrack(){return await g.get("https://api.spotify.com/v1/tracks/"+this.id,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:e})=>{console.log(e),this.$store.dispatch("albums/currentTrack",e)}).catch(e=>console.log(e))},async playCurrentTrack(e){console.log(e),this.isPlayingCurrentTrack?await this.$store.dispatch("controller/pauseCurrentTrack"):await this.$store.dispatch("controller/playSelectedTrack",e)},async fetchArtistTopTracks(){var e;return await g.get("https://api.spotify.com/v1/artists/"+((e=this.currentTrack)==null?void 0:e.artists[0].id)+"/top-tracks?market=US",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:t})=>{console.log(t),console.log(t.tracks),this.$store.dispatch("artists/topTracks",t.tracks)}).catch(t=>console.log(t))},async fetchArtistTopAlbums(){var e;return await g.get("https://api.spotify.com/v1/artists/"+((e=this.currentTrack)==null?void 0:e.artists[0].id)+"/albums?include_groups=album",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:t})=>(console.log(t.items),t.items)).catch(t=>console.log(t))},async fetchArtistTopSingles(){var e;return await g.get("https://api.spotify.com/v1/artists/"+((e=this.currentTrack)==null?void 0:e.artists[0].id)+"/albums?include_groups=single,compilation",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:t})=>(console.log(t.items),t.items)).catch(t=>console.log(t))},async fetchTotalTracks(){var e;return await g.get(await((e=this.currentTrack)==null?void 0:e.album.href),{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:t})=>(console.log(t),this.copyrights=t.copyrights,this.albumType=t.album_type,t.tracks.items)).catch(t=>console.log(t))},async unFollowTrack(){this.isFavTrack?await g.delete("https://api.spotify.com/v1/me/tracks?ids="+this.id,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(e=>{console.log(e),e.status===200&&(heartBtn.classList.add("animationEmptyHeart"),heartBtn.classList.remove("animationGreenHeart"),this.$store.dispatch("controller/modalInfoType",{type:"favSong",status:!1}),this.fetchFavTracks().then(()=>{this.$store.dispatch("albums/clearTracksID"),this.$store.dispatch("albums/clearTracksID2"),this.findFavTracks(),this.findFavTracks2(),this.removeGreenHeartFavTracks(document.getElementById(this.id)),this.removeGreenHeartFavTracks2(document.getElementsByClassName(this.id))}))}).catch(e=>console.log(e)):await this.followTrack()},async followTrack(){await fetch("https://api.spotify.com/v1/me/tracks?ids="+this.id,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(e=>{console.log(e),e.status===200&&(heartBtn.classList.add("animationGreenHeart"),heartBtn.classList.remove("animationEmptyHeart"),this.$store.dispatch("controller/modalInfoType",{type:"favSong",status:!0}),this.fetchFavTracks().then(()=>{this.$store.dispatch("albums/clearTracksID"),this.$store.dispatch("albums/clearTracksID2"),this.findFavTracks(),this.findFavTracks2(),this.addGreenHeartFavTracks(document.getElementById(this.id)),this.addGreenHeartFavTracks2(document.getElementsByClassName(this.id))}))}).catch(e=>console.log(e))},findFavTracks(){this.allFavTracks.forEach(e=>{this.artistTopTracks.forEach(t=>{e.track.id===t.id&&this.$store.dispatch("albums/favTracksID",t.id)})})},findFavTracks2(){this.allFavTracks.forEach(e=>{this.albumTracks.forEach(t=>{e.track.id===t.id&&this.$store.dispatch("albums/favTracksID2",t.id)})})},addGreenHeartFavTracks(e=!1){e?(e==null||e.children[4].children[0].classList.remove("emptyHeart","animationEmptyHeart"),e==null||e.children[4].children[0].classList.add("greenHeart"),e==null||e.children[4].children[0].classList.add("animationGreenHeart"),e==null||e.children[4].children[0].children[0].children[0].classList.remove("hidden"),e==null||e.children[4].children[0].children[0].children[1].classList.add("hidden")):this.addGreenHeartEl.forEach(t=>{t==null||t.children[4].children[0].classList.remove("emptyHeart","animationEmptyHeart"),t==null||t.children[4].children[0].classList.add("greenHeart"),t==null||t.children[4].children[0].children[0].children[0].classList.remove("hidden"),t==null||t.children[4].children[0].children[0].children[1].classList.add("hidden")})},removeGreenHeartFavTracks(e){e==null||e.children[4].children[0].classList.remove("greenHeart","animationGreenHeart"),e==null||e.children[4].children[0].classList.add("emptyHeart"),e==null||e.children[4].children[0].classList.add("animationEmptyHeart"),e==null||e.children[4].children[0].children[0].children[0].classList.add("hidden"),e==null||e.children[4].children[0].children[0].children[1].classList.remove("hidden")},addGreenHeartFavTracks2(e=!1){var t,o,u,i,a;e?((t=e[0])==null||t.children[4].children[0].classList.remove("emptyHeart","animationEmptyHeart"),(o=e[0])==null||o.children[4].children[0].classList.add("greenHeart"),(u=e[0])==null||u.children[4].children[0].classList.add("animationGreenHeart"),(i=e[0])==null||i.children[4].children[0].children[0].children[0].classList.remove("hidden"),(a=e[0])==null||a.children[4].children[0].children[0].children[1].classList.add("hidden")):this.addGreenHeartEl2.forEach(p=>{p[0].children[4].children[0].classList.remove("emptyHeart","animationEmptyHeart"),p[0].children[4].children[0].classList.add("greenHeart"),p[0].children[4].children[0].children[0].children[0].classList.remove("hidden"),p[0].children[4].children[0].children[0].children[1].classList.add("hidden")})},removeGreenHeartFavTracks2(e){var t,o,u,i,a;(t=e[0])==null||t.children[4].children[0].classList.remove("greenHeart","animationGreenHeart"),(o=e[0])==null||o.children[4].children[0].classList.add("emptyHeart"),(u=e[0])==null||u.children[4].children[0].classList.add("animationEmptyHeart"),(i=e[0])==null||i.children[4].children[0].children[0].children[0].classList.add("hidden"),(a=e[0])==null||a.children[4].children[0].children[0].children[1].classList.remove("hidden")},trackDuration(e){const t=Math.floor(e/6e4),o=Math.floor(e%6e4/1e3);return t+":"+(o<10?"0":"")+o},albumYear(e){return new Date(`${e}`).getFullYear()},toggleAppOptions(){this.appOptions=!this.appOptions},OpenArtistPage(e,t){this.$emit("selectedArtistName",t.target.textContent),this.$router.push("/artist/id")},openAlbumPage(e,t){var o;if(((o=t.target.closest("#playBtn"))==null?void 0:o.id)==="playBtn")console.log("toggle Play/Stop Users");else{const u=t.target.closest(".card--container").id;console.log(u),this.$router.push({name:"album",params:{id:u}})}},async seeMoreFunc(){this.seeMore=!this.seeMore}},async created(){console.log("TrackPage Mounted"),this.TrackPage=!0,await this.fetchTrack(),await this.fetchArtistTopTracks(),this.albumTracks=await this.fetchTotalTracks(),this.albumTracks=this.albumTracks.length>9?this.albumTracks.slice(0,9):this.albumTracks,this.popularAlbums=await this.fetchArtistTopAlbums(),this.popularAlbums=this.popularAlbums.length>9?this.popularAlbums.slice(0,9):this.popularAlbums,this.popularSingles=await this.fetchArtistTopSingles(),this.popularSingles=this.popularSingles.length>9?this.popularSingles.slice(0,9):this.popularSingles,this.popSongs=this.artistTopTracks,await this.getFavTracksonalbum,await this.getFavTracksonalbum2,this.findFavTracks(),this.findFavTracks2(),this.addGreenHeartFavTracks(),this.addGreenHeartFavTracks2(),this.header=document.getElementById("header"),this.TrackEl=document.getElementById("track--page"),this.options={root:null,threshold:[.1,.5,1]},this.observer=new IntersectionObserver(e=>{console.log(e),this.header.classList.toggle("trackPage-intersec-bg1",e[0].intersectionRatio<=.5),e[0].intersectionRatio>=.1?this.$store.dispatch("controller/closeHeaderBtn"):this.$store.dispatch("controller/showHeaderBtn")},this.options),this.observer.observe(this.TrackEl)},beforeUnmount(){this.TrackPage=!1,this.TrackEl&&(this.header.classList.remove("trackPage-intersec-bg1"),this.observer.unobserve(this.TrackEl))},unmounted(){this.$store.dispatch("controller/closeHeaderBtn"),this.$store.dispatch("albums/clearTracksID"),this.$store.dispatch("albums/clearTracksID2"),this.$store.dispatch("albums/clearCurrentTrack"),this.$store.dispatch("controller/isClickHeaderBtn",null)}},T=e=>(j("data-v-1c4645f4"),e=e(),I(),e),R={key:0,class:"box-border"},q={class:"relative flex items-end justify-start h-full lg:ml-[1rem]"},K={class:"flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"},J=["src"],Q={class:"flex flex-col text-white font-semibold px-4"},W=T(()=>s("h2",{class:"text-sm"},"\u015EARKI",-1)),X={class:"w-full sm:text-3xl md:text-5xl md2:text-6xl xl:text-7xl tracking-tighter py-2",style:{"font-weight":"700"}},Z={class:"flex items-center flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"},$={class:"flex items-center flex-nowrap shrink-0"},ee={class:"flex items-center justify-around gap-x-2"},te={class:"w-8 h-8"},re=["src"],se={class:"ml-1 after:content-['\u2022'] after:mx-1"},ae={class:"text-sm"},ie={class:"relative z-20 w-full h-[6.8rem] relative flex items-start py-[24px]"},ne={class:"w-full ml-[1.2rem] flex items-center lg:ml-[2rem]"},le={role:"img",height:"26",width:"26",viewBox:"0 0 24 24",class:""},ce={key:0,fill:"currentColor",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"},oe={key:1,fill:"currentColor",d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"},he={role:"img",height:"28",width:"28",viewBox:"0 0 24 24"},de=T(()=>s("path",{fill:"currentColor",d:"M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"},null,-1)),ue=T(()=>s("svg",{role:"img",height:"32",width:"32",viewBox:"0 0 24 24",class:"hover:text-white pointer-events-none"},[s("path",{fill:"currentColor",d:"M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"})],-1)),pe=[ue],me=d("\u015Eark\u0131 radyosuna git"),ge={class:"p-5 lg:ml-[1rem] relative lg3:flex"},Te={key:0,class:"min-w-[60%] mb-8"},ke=T(()=>s("h2",{class:"text-white text-3xl font-semibold tracking-tighter"}," \u015Eark\u0131 S\xF6zleri ",-1)),ve=T(()=>s("br",null,null,-1)),fe={class:"text-lightest"},_e={class:"h-20 w-30 z-10"},ye=["src"],be={class:"flex flex-col gap-y-1"},xe=T(()=>s("h2",{class:"uppercase text-sm text-opacwhite5",style:{"font-weight":"700"}}," Sanat\xE7\u0131 ",-1)),we={class:"p-5 lg:ml-[1rem]"},Fe={class:"relative mb-2"},He={class:"h-fit flex flex-col h-[3.8rem]"},Ae=T(()=>s("span",{class:"text-lightest text-sm"},"Pop\xFCler Par\xE7alar -",-1)),Ce={class:"text-[1.5rem] text-white leading-7 tracking-tight",style:{"font-weight":"600"}},Ge=["src"],Pe={class:"cursor-default"},Be={key:0},Le={key:1},De=d("Diskografiye bak"),Ee={class:"w-full relative mb-5"},Se=["src"],ze={class:"before:content-['\u2022'] before:mx-2"},je=d("Diskografiye bak"),Ie={class:"w-full relative mb-5"},Me=["src"],Ue={class:"before:content-['\u2022'] before:mx-2"},Oe=d("Diskografiye bak"),Ne={class:"w-full relative mb-5"},Ye=["src"],Ve={class:"before:content-['\u2022'] before:mx-2"},Re={class:"text-lightest text-[11px] mt-14"},qe={class:"relative h-full min-w-[450]"},Ke={class:"mb-[2px] sm:w-full"},Je={class:"flex items-center gap-x-4 w-full bg-dark2 hover:bg-dark3 transition duration-300 cursor-pointer rounded-t-lg"},Qe={class:"w-20 h-20"},We=["src"],Xe={class:"flex flex-col gap-y-1"},Ze={class:"text-xs text-opacwhite5",style:{"font-weight":"700"}},$e={class:"text-white text-[16px] cursor-ponter hover:underline",style:{"font-weight":"700"}},et={class:"trackItems--container playlists2 h-fit w-full text-lightest"},tt={class:"mt-8"};function rt(e,t,o,u,i,a){var A,C,G,P;const p=_("router-link"),D=_("AppOptions"),E=_("Lyrics"),H=_("TrackItems"),F=_("Card");return a.currentTrack&&a.isAuth?(c(),h("section",R,[s("div",{id:"track--page",class:"relative z-10 p-5 h-[326px] max-h-[800px] min-h-[340px] w-full mt-[-66px] shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)]",style:z({"--bgTrackImage":`url(${a.albumTrackImage})`})},[s("div",q,[s("div",K,[s("img",{class:"h-full w-full",src:a.albumTrackImage,alt:"single"},null,8,J)]),s("div",Q,[W,s("span",null,[s("h1",X,n(a.currentTrack.name),1)]),s("div",Z,[s("div",$,[s("span",ee,[s("div",te,[s("img",{class:"rounded-full",src:i.artistImg,alt:"user"},null,8,re)]),v(p,{to:{name:"artist",params:{id:`${a.currentArtistID}`}},class:"hover:underline cursor-pointer after:content-['\u2022'] after:ml-1 after:inline-block"},{default:l(()=>[d(n(a.currentTrack.artists[0].name),1)]),_:1},8,["to"])])]),s("div",null,[s("span",se,n(a.albumYear((A=a.currentTrack)==null?void 0:A.album.release_date)),1),s("span",ae,n(a.trackDuration(e.duration=a.currentTrack.duration_ms)),1)])])])])],4),s("div",ie,[s("div",ne,[s("button",{onClick:t[0]||(t[0]=r=>a.playCurrentTrack(e.uri={uri:a.currentTrackUri,id:a.currentTrackID})),class:"rounded-full bg-green3 p-[12px] cursor-default hover:scale-105"},[s("span",null,[(c(),h("svg",le,[a.isPlayingCurrentTrack?(c(),h("path",oe)):(c(),h("path",ce))]))])]),s("div",null,[s("button",{onClick:t[1]||(t[1]=(...r)=>a.unFollowTrack&&a.unFollowTrack(...r)),id:"heartBtn",class:f(["p-[0.9rem] w-[4rem] ml-3 text-lightest cursor-default hover:text-white",{greenHeart:a.isFavTrack,emptyHeart:!a.isFavTrack}])},[(c(),h("svg",he,[de,a.isFavTrack?(c(),h("path",{key:0,class:f({"text-green3":a.isFavTrack}),fill:"currentColor",d:"M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"},null,2)):x("",!0)]))],2),s("button",{onClick:t[2]||(t[2]=(...r)=>a.toggleAppOptions&&a.toggleAppOptions(...r)),class:"text-lightest hover:text-white cursor-default w-fit relative"},pe),i.appOptions?(c(),w(D,{key:0,TrackPage:i.TrackPage,appOptions:i.appOptions,onToggleAppOptions:a.toggleAppOptions},{openRadio:l(()=>[me]),_:1},8,["TrackPage","appOptions","onToggleAppOptions"])):x("",!0)])])]),s("div",ge,[i.lyrics?(c(),h("div",Te,[ke,ve,s("div",fe,[v(E)])])):x("",!0),s("div",{class:f([{"lg3:w-[30%]":i.lyrics},"sm:w-full"])},[s("div",{class:f([{"hover:bg-dark2":i.lyrics,"hover:bg-opacwhite1":!i.lyrics},"flex items-center gap-x-4 w-full transition duration-300 p-2 cursor-pointer rounded-md"])},[s("div",_e,[s("img",{class:"rounded-[100%] object-cover h-[5rem] w-[5rem]",src:i.artistImg,alt:"artistImg"},null,8,ye)]),s("div",be,[xe,v(p,{to:{name:"artist",params:{id:a.currentArtistID}},class:"text-white/95 font-semibold cursor-ponter hover:underline"},{default:l(()=>{var r,k;return[d(n((k=(r=a.currentTrack)==null?void 0:r.artists[0])==null?void 0:k.name),1)]}),_:1},8,["to"])])],2)],2)]),s("section",we,[s("div",Fe,[s("div",He,[Ae,s("h2",Ce,n((C=a.currentTrack)==null?void 0:C.artists[0].name),1)])]),s("div",{class:f([{"h-[17.5rem]":!i.seeMore,"h-full":i.seeMore},"trackItems--container relative overflow-y-hidden wrapper"])},[(c(!0),h(b,null,y(i.popSongs,(r,k)=>(c(),w(H,{key:r.id,id:r.id,uri:a.currentArtistUri,itemUri:r.uri,artistTopTrackUris:a.artistTopTrackUris,trackID:r.id,contextType:"artist",index:k,TrackPage:i.TrackPage,margin:!0,findFavTracks:a.findFavTracks,addGreenHeartFavTracks:a.addGreenHeartFavTracks,removeGreenHeartFavTracks:a.removeGreenHeartFavTracks,findFavTracks2:a.findFavTracks2,addGreenHeartFavTracks2:a.addGreenHeartFavTracks2,removeGreenHeartFavTracks2:a.removeGreenHeartFavTracks2},{trackImg:l(()=>{var m,B;return[s("img",{class:"object-fit w-[40px] h-[40px] mr-4",src:(B=(m=r==null?void 0:r.album)==null?void 0:m.images[2])==null?void 0:B.url,alt:""},null,8,Ge)]}),trackName:l(()=>[s("p",Pe,n(r.name),1)]),listenNumber:l(()=>[d(n(r.popularity),1)]),duration:l(()=>[d(n(a.trackDuration(e.duration=r.duration_ms)),1)]),_:2},1032,["id","uri","itemUri","artistTopTrackUris","trackID","index","TrackPage","findFavTracks","addGreenHeartFavTracks","removeGreenHeartFavTracks","findFavTracks2","addGreenHeartFavTracks2","removeGreenHeartFavTracks2"]))),128))],2),s("button",{onClick:t[3]||(t[3]=(...r)=>a.seeMoreFunc&&a.seeMoreFunc(...r)),class:"m-2 mb-10 text-[0.75rem] text-opacwhite5 hover:text-white leading-7 tracking-widest hover:text-underline-offset-8 font-semibold cursor-default uppercase"},[i.seeMore?(c(),h("span",Le,"daha az\u0131n\u0131 g\xF6ster")):(c(),h("span",Be,"See More"))]),v(F,{onClick:t[4]||(t[4]=r=>a.openAlbumPage(e.msg,r)),currentData:a.artistTopTracks},{cardTitle:l(()=>{var r;return[d(n((r=a.currentTrack)==null?void 0:r.artists[0].name)+"- Pop\xFCler M\xFCzikleri",1)]}),seeMore:l(()=>[De]),imgContainer:l(({data:r})=>[s("div",Ee,[s("img",{class:"h-full w-full object-cover",src:r.album.images[0].url,alt:"image"},null,8,Se)])]),firstTitle:l(({data:r})=>[d(n(r.name),1)]),secondTitle:l(({data:r})=>[s("span",null,n(a.albumYear(r.album.release_date)),1),s("span",ze,n(r.album.album_type),1)]),_:1},8,["currentData"]),v(F,{onClick:t[5]||(t[5]=r=>a.openAlbumPage(e.msg,r)),currentData:i.popularAlbums},{cardTitle:l(()=>{var r;return[d(n((r=a.currentTrack)==null?void 0:r.artists[0].name)+" - Pop\xFCler Alb\xFCmleri",1)]}),seeMore:l(()=>[je]),imgContainer:l(({data:r})=>[s("div",Ie,[s("img",{class:"h-full w-full object-cover",src:r==null?void 0:r.images[0].url,alt:"image"},null,8,Me)])]),firstTitle:l(({data:r})=>[d(n(r.name),1)]),secondTitle:l(({data:r})=>[s("span",null,n(a.albumYear(r.release_date)),1),s("span",Ue,n(r.album_type),1)]),_:1},8,["currentData"]),v(F,{onClick:t[6]||(t[6]=r=>a.openAlbumPage(e.msg,r)),currentData:i.popularSingles},{cardTitle:l(()=>{var r;return[d(n((r=a.currentTrack)==null?void 0:r.artists[0].name)+" - Pop\xFCler Single ve EP'leri",1)]}),seeMore:l(()=>[Oe]),imgContainer:l(({data:r})=>[s("div",Ne,[s("img",{class:"h-full w-full object-cover",src:r.images[0].url,alt:"image"},null,8,Ye)])]),firstTitle:l(({data:r})=>[d(n(r.name),1)]),secondTitle:l(({data:r})=>[s("span",null,n(a.albumYear(r.release_date)),1),s("span",Ve,n(r.album_type),1)]),_:1},8,["currentData"]),s("div",Re,[s("div",qe,[s("div",Ke,[s("div",Je,[s("div",Qe,[s("img",{class:"w-full h-full rounded-tl-lg",src:(P=(G=a.currentTrack.album)==null?void 0:G.images[0])==null?void 0:P.url,alt:""},null,8,We)]),s("div",Xe,[s("h2",Ze,n(a.currentTrack.album.album_type)+"'dan: ",1),s("h4",$e,n(a.currentTrack.album.name),1)])])]),s("div",et,[(c(!0),h(b,null,y(i.albumTracks,(r,k)=>(c(),w(H,{class:f(r.id),key:r.id,id:r.id,track:r,uri:a.currentAlbumUri,itemUri:r.uri,trackID:r.id,contextType:"album",index:k,TrackPage2:i.TrackPage,TrackPage:i.TrackPage,margin:!0,findFavTracks:a.findFavTracks,addGreenHeartFavTracks:a.addGreenHeartFavTracks,removeGreenHeartFavTracks:a.removeGreenHeartFavTracks,findFavTracks2:a.findFavTracks2,addGreenHeartFavTracks2:a.addGreenHeartFavTracks2,removeGreenHeartFavTracks2:a.removeGreenHeartFavTracks2},{trackName:l(()=>[s("span",null,n(r.name),1)]),artist:l(()=>[(c(!0),h(b,null,y(r.artists,m=>(c(),w(p,{class:"hover:underline",key:m.id,to:{name:"artist",params:{id:m.id}}},{default:l(()=>[d(n(r.artists.length>1?m.name===r.artists[r.artists.length-1].name?m.name:m.name+", ":m.name),1)]),_:2},1032,["to"]))),128))]),duration:l(()=>[d(n(a.trackDuration(e.duration=r.duration_ms)),1)]),_:2},1032,["class","id","track","uri","itemUri","trackID","index","TrackPage2","TrackPage","findFavTracks","addGreenHeartFavTracks","removeGreenHeartFavTracks","findFavTracks2","addGreenHeartFavTracks2","removeGreenHeartFavTracks2"]))),128))])])]),s("div",tt,[(c(!0),h(b,null,y(i.copyrights,r=>(c(),h("p",{class:"text-[11px] text-lightest",key:r.type},n(r.text),1))),128))])])])):x("",!0)}var lt=L(V,[["render",rt],["__scopeId","data-v-1c4645f4"]]);export{lt as default};
