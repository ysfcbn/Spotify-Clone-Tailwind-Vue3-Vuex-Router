import{T as E}from"./TrackItems.febab12d.js";import{_ as I,o as l,c as n,b as s,d as F,a as m,r as C,t as p,k as B,n as y,i as _,F as N,e as Z,w as h,p as V,h as G,f as J,g as w}from"./index.a3af601f.js";import{I as Y}from"./Info.e7a95ea4.js";import{C as Q}from"./Card.50444f4a.js";const W={name:"ArtistOptions",props:["follow","addRemoveArtist","artistURL"],data(){return{artistOptions:!1,visible:!1}},methods:{toggleOptions(){this.artistOptions=!this.artistOptions},copyArtistURL(){console.log(this.artistURL)},paylasDropDown(){this.paylasDropDown=!0},close(t){this.$el.contains(t.target)||(this.artistOptions=!1)}},mounted(){document.addEventListener("click",this.close)},beforeUnmount(){document.removeEventListener("click",this.close)}},X=s("svg",{role:"img",height:"32",width:"32",viewBox:"0 0 24 24",class:"hover:text-white"},[s("path",{fill:"currentColor",d:"M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"})],-1),q={key:0,class:"z-40 absolute bg-dark2 top-[2rem] left-0 p-[4px] h-fit w-[11.6rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"},K={class:"cursor-default"},$={key:0,class:"text-xs md:text-sm"},tt={key:1,class:"text-xs md:text-sm"},et=s("li",{class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},[s("button",{class:"cursor-default"},[s("span",{class:"text-xs md:text-sm"},"Sanat\xE7\u0131 radyosuna git")])],-1),st=s("button",{class:"cursor-default flex items-center justify-between w-full"},[s("span",{class:"text-xs md:text-sm"},"Payla\u015F"),s("span",{class:"text-white"},[s("svg",{role:"img",height:"16",width:"16",class:"rotate-90",viewBox:"0 0 16 16"},[s("path",{fill:"currentColor",d:"M14 10L8 4l-6 6h12z"})])])],-1),it={key:0,class:"z-40 absolute bg-dark2 top-[5.2rem] left-[11.4rem] p-[4px] h-fit w-[13.8rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"},rt=s("button",{class:"cursor-default"},[s("span",{class:"text-xs md:text-sm"},"Sanat\xE7\u0131n\u0131n ba\u011Flant\u0131s\u0131n\u0131 kopyala")],-1),at=[rt],ot=s("li",{class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},[s("button",{class:"cursor-default"},[s("span",{class:"text-xs md:text-sm"},"Sanat\xE7\u0131y\u0131 g\xF6m")])],-1),lt=s("li",{class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},[s("button",{class:"cursor-default"},[s("span",{class:"text-xs md:text-sm"},"Sanat\xE7\u0131 radyosuna git")])],-1);function nt(t,e,o,c,a,r){return l(),n("button",{onClick:e[4]||(e[4]=(...u)=>r.toggleOptions&&r.toggleOptions(...u)),class:"text-lightest cursor-default w-fit relative"},[X,a.artistOptions?(l(),n("ul",q,[s("li",{onClick:e[0]||(e[0]=(...u)=>o.addRemoveArtist&&o.addRemoveArtist(...u)),class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 truncate"},[s("button",K,[o.follow?(l(),n("span",tt,"Takip Etmeyi B\u0131rak ")):(l(),n("span",$,"Takip Et "))])]),et,s("li",{onMouseenter:e[2]||(e[2]=u=>a.visible=!0),onMouseleave:e[3]||(e[3]=u=>a.visible=!1),class:"group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"},[st,a.visible?(l(),n("ul",it,[s("li",{onClick:e[1]||(e[1]=(...u)=>r.copyArtistURL&&r.copyArtistURL(...u)),class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-opacwhite"},at),ot])):F("",!0)],32),lt])):F("",!0)])}var ct=I(W,[["render",nt]]);const ht={name:"artistPage",components:{TrackItems:E,ArtistOptions:ct,Info:Y,Card:Q},props:{id:{type:String,required:!0}},data(){return{artistPage:!0,typeOfSelectedSection:null,type:"all",selectedArtistCardID:null,contextType:"artist",opac:"",leftClick:!1,prevRatio:null,follow:!1,popPublications:!0,albums:!1,shuffled:!1,singles:!1,compilations:!1,topSongs:[],diskografiList:[],frontOfYou:[],seeMore:!1}},computed:{isAuth(){return this.$store.getters.isAuth},getToken(){return this.$store.getters.accessToken},currentArtist(){return this.$store.getters["artists/getCurrentArtist"]},currentArtistURL(){var t;return(t=this.currentArtist)==null?void 0:t.external_urls.spotify},currentArtistUri(){var t;return(t=this.currentArtist)==null?void 0:t.uri},artistImage(){var t,e;return(e=(t=this.currentArtist)==null?void 0:t.images[0])==null?void 0:e.url},currentArtistIsFav(){return this.$store.getters["artists/getCurrentArtistIsFav"]},allFavTracks(){return this.$store.getters["favTracks/getTracks"].items},currentAlbumTracks(){var t,e;return(e=(t=this.$store.getters["albums/getAlbum"])==null?void 0:t.tracks)==null?void 0:e.items},artistTopTracks(){return this.$store.getters["artists/getTopTracks"]},artistTopTrackUris(){return this.artistTopTracks.map(t=>t.uri)},selectedCardArtistTopTracks(){return this.$store.getters["artists/getSelectedCardTopTracks"]},selectedCardArtistTopTrackUris(){return this.selectedCardArtistTopTracks.map(t=>t.uri)},getCurrentlyPlayingTrack(){return this.$store.getters["controller/getCurrentlyPlayingTrack"]},currentTrackID(){var t,e;return(e=(t=this.getCurrentlyPlayingTrack)==null?void 0:t.item)==null?void 0:e.id},isPlayingContextUri(){var t;return(t=this.getCurrentlyPlayingTrack)==null?void 0:t.is_playing},findCurrentPlayingTrackIndex(){var t,e,o,c;return this.typeOfSelectedSection==="playlist"?(e=this.currentPlaylist)==null?void 0:e.indexOf((t=this.currentPlaylist)==null?void 0:t.find(a=>a.track.id===this.currentTrackID)):this.typeOfSelectedSection==="album"?(c=this.currentAlbumTracks)==null?void 0:c.indexOf((o=this.currentAlbumTracks)==null?void 0:o.find(a=>a.id===this.currentTrackID)):this.typeOfSelectedSection==="artist"?this.selectedCardArtistTopTracks.indexOf(this.selectedCardArtistTopTracks.find(a=>a.id===this.currentTrackID)):this.typeOfSelectedSection===this.id?this.artistTopTracks.indexOf(this.artistTopTracks.find(a=>a.id===this.currentTrackID)):""},currentPlayingTrackIndex(){return this.findCurrentPlayingTrackIndex+1?this.findCurrentPlayingTrackIndex:0},isArtistContext(){return this.$store.getters["controller/isArtistContext"]},isPlayingArtistTopTracks(){var t,e,o,c,a;return((o=(e=(t=this.getCurrentlyPlayingTrack)==null?void 0:t.item)==null?void 0:e.artists[0])==null?void 0:o.id)===this.id&&!((c=this.getCurrentlyPlayingTrack)!=null&&c.context)&&((a=this.getCurrentlyPlayingTrack)==null?void 0:a.is_playing)&&this.isArtistContext},isPlayingArtistTopCardTracks(){var t,e,o,c,a;return((o=(e=(t=this.getCurrentlyPlayingTrack)==null?void 0:t.item)==null?void 0:e.artists[0])==null?void 0:o.id)===this.selectedArtistCardID&&!((c=this.getCurrentlyPlayingTrack)!=null&&c.context)&&((a=this.getCurrentlyPlayingTrack)==null?void 0:a.is_playing)&&this.isArtistContext},isClickHeaderBtn(){return this.$store.getters["controller/isClickHeaderBtn"]},artistPublications(){return this.$store.getters["artists/getArtistPublications"]},artistAlbums(){return this.$store.getters["artists/getArtistAlbums"]},artistSingles(){return this.$store.getters["artists/getArtistSingles"]},artistCompilations(){return this.$store.getters["artists/getArtistCompilations"]},fansLove(){return this.$store.getters["artists/getFansLove"]},getFavTracks(){return this.$store.getters["artists/getfavTracksID"]},addGreenHeartEl(){return this.getFavTracks.map(t=>document.getElementById(`${t}`))}},methods:{async fetchFavArtists(){await m.get("https://api.spotify.com/v1/me/following?type=artist",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:t})=>{console.log(t.artists),this.$store.dispatch("artists/favArtists",t.artists.items)}).catch(t=>console.log(t))},async fetchArtist(t=!1){await m.get(t||"https://api.spotify.com/v1/artists/"+this.id,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:e})=>{console.log(e),t?this.$store.dispatch("artists/selectedCardArtist",e):this.$store.dispatch("artists/currentArtist",e)}).catch(e=>console.log(e))},async fetchArtistTopTracks(t=!1){await m.get(t?"https://api.spotify.com/v1/artists/"+t+"/top-tracks?market=US":"https://api.spotify.com/v1/artists/"+this.id+"/top-tracks?market=US",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:e})=>{console.log(e),t?this.$store.dispatch("artists/selectedCardTopTracks",e.tracks):this.$store.dispatch("artists/topTracks",e.tracks)}).catch(e=>console.log(e))},async playArtistTopTracksFunc(t,e){this.id===t?(this.selectedArtistCardID=null,await this.fetchArtist(),await this.fetchArtistTopTracks(),await this.playArtistTopTracks({uri:this.artistTopTrackUris,index:this.currentPlayingTrackIndex,type:"artist",artistID:t},e)):(this.selectedArtistCardID=t,await this.fetchArtist(e),await this.fetchArtistTopTracks(t),await this.playArtistTopTracks({uri:this.selectedCardArtistTopTrackUris,index:this.currentPlayingTrackIndex,type:"artist",artistID:t},e))},async playArtistTopTracks(t){var e,o;console.log(t),this.id===t.artistID?(this.typeOfSelectedSection=this.id,this.isPlayingArtistTopTracks?await this.$store.dispatch("controller/pauseCurrentTrack"):((e=this.getCurrentlyPlayingTrack)!=null&&e.context?t.index=0:t.index=this.currentPlayingTrackIndex,await this.$store.dispatch("controller/playArtitsTopTracks",t))):(this.typeOfSelectedSection="artist",this.isPlayingArtistTopCardTracks?await this.$store.dispatch("controller/pauseCurrentTrack"):((o=this.getCurrentlyPlayingTrack)!=null&&o.context?t.index=0:t.index=this.currentPlayingTrackIndex,await this.$store.dispatch("controller/playArtitsTopTracks",t)))},async fetchAlbum(t){await m.get(t,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:e})=>{this.$store.dispatch("albums/getAlbum",e)}).catch(e=>console.log(e))},async fetchArtistPublications(){await m.get("https://api.spotify.com/v1/artists/"+this.id+"/albums?limit=10",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:t})=>{console.log(t),this.$store.dispatch("artists/artistPublications",t)}).catch(t=>console.log(t))},async fetchArtistAlbums(){await m.get("https://api.spotify.com/v1/artists/"+this.id+"/albums?limit=10&include_groups=album,single,compilation",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:t})=>{console.log(t),this.$store.dispatch("artists/artistAlbums",t)}).catch(t=>console.log(t))},async fetchArtistSingles(){await m.get("https://api.spotify.com/v1/artists/"+this.id+"/albums?limit=10&include_groups=single",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:t})=>{console.log(t),this.$store.dispatch("artists/artistSingles",t)}).catch(t=>console.log(t))},async fetchArtistCompilations(){await m.get("https://api.spotify.com/v1/artists/"+this.id+"/albums?limit=10&include_groups=compilation",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:t})=>{console.log(t),this.$store.dispatch("artists/artistCompilations",t)}).catch(t=>console.log(t))},async fetchFansLoveArtists(){await m.get("https://api.spotify.com/v1/artists/"+this.id+"/related-artists",{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:t})=>{console.log(t),this.$store.dispatch("artists/fansLove",t)}).catch(t=>console.log(t))},async checkUserFavArtist(){await m.get("https://api.spotify.com/v1/me/following/contains?type=artist&ids="+this.id,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:t})=>{this.$store.dispatch("artists/currentArtistIsFav",...t)}).catch(t=>console.log(t))},async followArtist(){await fetch("https://api.spotify.com/v1/me/following?type=artist&ids="+this.id,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(t=>{console.log(t.status),t.status===204&&(this.checkUserFavArtist(),this.$store.dispatch("controller/modalInfoType",{type:"artist",status:!0}))}).catch(t=>console.log(t))},async unfollowArtist(){await m.delete("https://api.spotify.com/v1/me/following?type=artist&ids="+this.id,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(t=>{console.log(t.status),t.status===204&&(this.checkUserFavArtist(),this.$store.dispatch("controller/modalInfoType",{type:"artist",status:!1}))}).catch(t=>console.log(t))},async addRemoveArtist(){this.currentArtistIsFav?(await this.unfollowArtist(),await this.fetchFavArtists()):(await this.followArtist(),await this.fetchFavArtists())},async playContextUri(t,e){var o,c,a,r,u,P;console.log(this.currentPlayingTrackIndex),this.isPlayingContextUri&&t.uri===((c=(o=this.getCurrentlyPlayingTrack)==null?void 0:o.context)==null?void 0:c.uri)?await this.$store.dispatch("controller/pauseCurrentTrack"):(await t.type==="album"&&(this.typeOfSelectedSection="album",t.uri!==((r=(a=this.getCurrentlyPlayingTrack)==null?void 0:a.context)==null?void 0:r.uri)&&await this.fetchAlbum(e)),console.log(t),console.log(this.currentPlayingTrackIndex),console.log((u=this.currentAlbumTracks[this.currentPlayingTrackIndex])==null?void 0:u.id),t.id=(P=this.currentAlbumTracks[this.currentPlayingTrackIndex])==null?void 0:P.id,t.index=this.currentPlayingTrackIndex,await this.$store.dispatch("controller/playSelectedContext",t))},findFavTracks(){this.allFavTracks.forEach(t=>{this.artistTopTracks.forEach(e=>{t.track.id===e.id&&this.$store.dispatch("artists/favTracksID",e.id)})})},addGreenHeartFavTracks(t=!1){t?(t==null||t.children[4].children[0].classList.remove("emptyHeart","animationEmptyHeart"),t==null||t.children[4].children[0].classList.add("greenHeart"),t==null||t.children[4].children[0].classList.add("animationGreenHeart"),t==null||t.children[4].children[0].children[0].children[0].classList.remove("hidden"),t==null||t.children[4].children[0].children[0].children[1].classList.add("hidden")):this.addGreenHeartEl.forEach(e=>{e==null||e.children[4].children[0].classList.remove("emptyHeart","animationEmptyHeart"),e==null||e.children[4].children[0].classList.add("greenHeart"),e==null||e.children[4].children[0].children[0].children[0].classList.remove("hidden"),e==null||e.children[4].children[0].children[0].children[1].classList.add("hidden")})},removeGreenHeartFavTracks(t){t==null||t.children[4].children[0].classList.remove("greenHeart","animationGreenHeart"),t==null||t.children[4].children[0].classList.add("emptyHeart"),t==null||t.children[4].children[0].classList.add("animationEmptyHeart"),t==null||t.children[4].children[0].children[0].children[0].classList.add("hidden"),t==null||t.children[4].children[0].children[0].children[1].classList.remove("hidden")},trackDuration(t){const e=Math.floor(t/6e4),o=Math.floor(t%6e4/1e3);return e+":"+(o<10?"0":"")+o},cartAlbumYear(t){return new Date(t).getFullYear()},openDiscografi(){this.$store.dispatch("discography/selectedType",this.type)},togglePublications(){var t;this.popPublications||(this.popPublications=!0),this.albums&&(this.albums=!1),this.singles&&(this.singles=!1),this.compilations&&(this.compilations=!1),this.type="all",this.diskografiList=(t=this.artistPublications)==null?void 0:t.items},async toggleAlbums(){var t;this.albums||(this.albums=!0),this.popPublications&&(this.popPublications=!1),this.singles&&(this.singles=!1),this.compilations&&(this.compilations=!1),this.type="albums",this.diskografiList=(t=this.artistAlbums)==null?void 0:t.items},async toggleSingles(){var t;this.singles||(this.singles=!0),this.albums&&(this.albums=!1),this.popPublications&&(this.popPublications=!1),this.compilations&&(this.compilations=!1),this.type="singles",this.diskografiList=(t=this.artistSingles)==null?void 0:t.items},toggleCompilations(){var t;this.compilations||(this.compilations=!0),this.albums&&(this.albums=!1),this.singles&&(this.singles=!1),this.popPublications&&(this.popPublications=!1),this.type="compilations",this.diskografiList=(t=this.artistCompilations)==null?void 0:t.items},seeMoreFunc(){this.seeMore=!this.seeMore}},watch:{isPlayingArtistTopTracks(t){t?this.$store.dispatch("controller/isPlayingHeaderBtn",t):this.$store.dispatch("controller/isPlayingHeaderBtn",t)},async isClickHeaderBtn(t,e){t!==e&&await this.playArtistTopTracks({uri:this.artistTopTrackUris,index:this.currentPlayingTrackIndex,type:this.contextType,artistID:this.id})}},async created(){var t,e,o;console.log("artistPage Mounted"),this.artistPage=!0,this.margin=!0,this.prevRatio=0,await this.fetchArtist(),await this.fetchArtistTopTracks(),this.topSongs=this.artistTopTracks,this.isPlayingArtistTopTracks?this.$store.dispatch("controller/isPlayingHeaderBtn",!0):this.$store.dispatch("controller/isPlayingHeaderBtn",!1),this.findFavTracks(),await this.getFavTracks,this.addGreenHeartFavTracks(),await this.checkUserFavArtist(),await this.fetchArtistPublications(),this.diskografiList=(t=this.artistPublications)==null?void 0:t.items,await this.fetchArtistAlbums(),await this.fetchArtistSingles(),this.frontOfYou=(e=this.artistAlbums)==null?void 0:e.items,console.log(this.frontOfYou),this.shuffled||(this.frontOfYou=this.frontOfYou.sort(()=>Math.random()-.5),this.shuffled=!0),await this.fetchArtistCompilations(),(o=this.artistCompilations)!=null&&o.items.length?this.$store.dispatch("discography/isCompExist",!0):this.$store.dispatch("discography/isCompExist",!1),await this.fetchFansLoveArtists(),this.header=document.getElementById("header"),this.artistEl=document.getElementById("artistPage"),this.buildThresholdList=function(){let c=[],a=20;for(let r=1;r<=a;r++){let u=r/a;c.push(u)}return c.push(0),c},this.options={root:null,threshold:this.buildThresholdList()},this.observer=new IntersectionObserver(c=>{c.forEach(a=>{a.intersectionRatio>this.prevRatio?(this.prevRatio=a.intersectionRatio,this.opac=a.intersectionRatio+.15,a.intersectionRatio<=.3&&(this.opac=.15)):(this.prevRatio=a.intersectionRatio,this.opac=this.prevRatio-.2,a.intersectionRatio<=.4&&(this.opac=0))}),this.header.classList.toggle("fav-songs-intersec-bg1",c[0].intersectionRatio<=.4),this.header.classList.toggle("fav-songs-intersec-bg2",c[0].intersectionRatio<=.1),c[0].intersectionRatio>=.1?this.$store.dispatch("controller/closeHeaderBtn"):this.$store.dispatch("controller/showHeaderBtn")},this.options),console.log(this.observer),this.observer.observe(this.artistEl)},beforeUnmount(){this.artistPage=!1,this.artistEl&&(this.observer.unobserve(this.artistEl),this.header.classList.remove("fav-songs-intersec-bg1"),this.header.classList.remove("fav-songs-intersec-bg2"))},unmounted(){this.$store.dispatch("controller/closeHeaderBtn"),this.$store.dispatch("artists/clearTracksID"),this.$store.dispatch("artists/clearArtistPageData")}},A=t=>(V("data-v-77b9da8e"),t=t(),G(),t),dt={class:"box-border"},pt={class:"flex items-end justify-start h-full lg:ml-[1rem] relative z-100"},ut={class:"flex flex-col h-[65%] items-start justify-end text-white"},gt=A(()=>s("div",{class:"relative flex items-center pb-2"},[s("div",{class:"absolute bg-white w-[0.9rem] h-[0.9rem] rounded-full left-[6px] z-10"}),s("span",{class:"relative text-verifiedAccount z-20"},[s("svg",{role:"img",height:"24",width:"24",class:"Svg-sc-1bi12j5-0 NJEYP b0NcxAbHvRbqgs2S8QDg",viewBox:"0 0 24 24"},[s("path",{fill:"currentColor",d:"M10.814.5a1.658 1.658 0 012.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 011.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 01-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 01-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 01-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 010-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 011.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 00-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 00-1.414 1.414l3.308 3.308 7.425-7.425z"})])]),s("span",{class:"text-[13px] leading-4 w-[8.2rem] flex justify-end"},"Do\u011Frulanm\u0131\u015F Sanat\xE7\u0131")],-1)),ft={class:"w-full mb-3 text-[5.5rem] leading-none py-1 tracking-tighter font-semibold whitespace-nowrap"},mt={class:"mr-2"},yt=A(()=>s("div",{class:"absolute w-full h-[212px] left-0 shrink-0 z-[-10]",style:{background:"linear-gradient(rgba(213, 33, 33,0.3), rgba(0, 0, 0,0)"}},null,-1)),vt={class:"w-full h-[5rem] relative flex flex-col items-start justify-center pt-5"},bt={class:"w-full ml-[1.2rem] lg:ml-[2rem]"},xt={class:"flex justify-start items-center"},kt={class:"w-[5.5rem]"},Tt={role:"img",height:"28",width:"28",viewBox:"0 0 24 24",class:""},At={key:0,fill:"currentColor",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"},_t={key:1,fill:"currentColor",d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"},wt={key:0,class:"text-sm",style:{"font-weight":"600"}},Ct={key:1,class:"text-sm",style:{"font-weight":"600"}},Pt={class:"p-5 lg:ml-[1rem]"},Ft=A(()=>s("div",{class:"relative"},[s("div",{class:"flex justify-between h-[3.3rem]"},[s("div",{class:"h-fit flex-end"},[s("h2",{class:"text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 font-semibold cursor-pointer"}," Pop\xFCler ")])])],-1)),Ht=["src"],Lt={class:"cursor-default truncate"},Dt={key:0},jt={key:1},Rt=w("Diskografi"),St=w("HEPS\u0130N\u0130 G\xD6R"),zt=["src"],Mt={class:"before:content-['\u2022'] before:mx-2"},Bt=["onClick"],It={role:"img",height:"18",width:"18",viewBox:"0 0 24 24"},Ut={key:0,fill:"text-black",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"},Ot={key:1,fill:"text-black",d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"},Et=["src"],Nt={class:"before:content-['\u2022'] before:mx-2"},Zt=["onClick"],Vt={role:"img",height:"20",width:"20",viewBox:"0 0 24 24"},Gt={key:0,fill:"text-black",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"},Jt={key:1,fill:"text-black",d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"},Yt=w("Hayranlar\u0131n\u0131n ho\u015Fland\u0131\u011F\u0131"),Qt=["src"],Wt=["onClick"],Xt=A(()=>s("h1",{class:"text-white"},null,-1)),qt={role:"img",height:"20",width:"20",viewBox:"0 0 24 24"},Kt={key:0,fill:"text-black",d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"},$t={key:1,fill:"text-black",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"},te={class:"p-5 lg:ml-[1rem]"},ee={class:"grid grid-cols-info gap-6 auto-rows-auto grid-rows-1 shrink-1"},se={class:"col-span-4 min-w-[516px]"},ie=A(()=>s("h2",{class:"text-[1.5rem] mb-[20px] text-white font-semibold"}," Hakk\u0131nda ",-1)),re={class:"col-span-4"},ae=A(()=>s("div",{class:"w-full h-full bg-[rgba(0,0,0,0.3)]"},null,-1)),oe={class:"absolute bottom-0 p-[40px] text-white max-w-[672px] h-[11rem] box-border"},le={class:"text-[1rem] text-left font-semibold"},ne=A(()=>s("div",{class:"mt-[8px] h-[4.5rem] text-justify overflow-hidden line-clamp-3"}," With an impressive string of hits, numerous awards under her trendy belt and concerts throughout Europe, Asia, Latin enon, one of those larger-than-life stars of the moment. One of the most exciting voices in the dance world, the Romanian artist has blazed through the global charts with hits like Hot, Sun Is Up or D\xE9j\xE0 vu, reaching the top slots in dozen of countries, from Romania, to Japan, Mexico, Turkey, Argentina, Spain, Finland, Poland and the U.S. The queen of dance music collaborated with lots of top worldwide artists like ",-1)),ce=A(()=>s("div",{class:"col-span-2"},[s("h2",{class:"text-[1.5rem] p-2 mb-[10px] text-white font-semibold"}," \xDCr\xFCnler "),s("ul",{class:""},[s("li",{class:"group hover:bg-dark2 p-2"},[s("a",{href:"#",class:"flex items-center relative"},[s("img",{class:"object-cover object-center w-[4.5rem]",src:"https://merch-img.scdn.co/https%3A%2F%2Fmerchbar.imgix.net%2Fproduct%2F4%2F1616%2F36719716%2F4988002763795.jpg%3Fblend64%3DaHR0cHM6Ly9tZXJjaGJhci5pbWdpeC5uZXQvfnRleHQ_dHh0LWZvbnQ9c2Fucy1zZXJpZi1ib2xkJnR4dC1jb2xvcj1mZmYmdHh0LXNpemU9NjQmdHh0LXBhZD0xNiZ3PTMyMCZiZz1mNzMxMTkmZHByPTImdHh0LWFsaWduPW1pZGRsZSUyQ2NlbnRlciZ0eHQ2ND1UMDRnVTBGTVJRJTNEJTNE%26blend-mode%3Dnormal%26blend-align%3Dbottom%2Cleft%26dpr%3D2%26blend-w%3D0.75%26w%3D640%26h%3D640?h=300&w=300&s=11a9d67006f00d98f64a31687f161ec6",alt:"sale image"}),s("div",{class:"mx-4"},[s("h3",{class:"text-white font-semibold"},"NIRVANA CD"),s("p",{class:"text-opacwhite5 text-sm"}," This is a new, unopened CD in its original packaging. ")]),s("svg",{role:"img",height:"16",width:"16",class:"text-lightest absolute top-2 right-2 hidden group-hover:block",viewBox:"0 0 16 16"},[s("path",{fill:"currentColor",d:"M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"}),s("path",{fill:"currentColor",d:"M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"})])])]),s("li",{class:"group hover:bg-dark2 p-2"},[s("a",{href:"#",class:"flex items-center relative"},[s("img",{class:"object-cover object-center w-[4.5rem]",src:"https://merch-img.scdn.co/https%3A%2F%2Fmerchbar.imgix.net%2Fproduct%2F4%2F1616%2F36719716%2F4988002763795.jpg%3Fblend64%3DaHR0cHM6Ly9tZXJjaGJhci5pbWdpeC5uZXQvfnRleHQ_dHh0LWZvbnQ9c2Fucy1zZXJpZi1ib2xkJnR4dC1jb2xvcj1mZmYmdHh0LXNpemU9NjQmdHh0LXBhZD0xNiZ3PTMyMCZiZz1mNzMxMTkmZHByPTImdHh0LWFsaWduPW1pZGRsZSUyQ2NlbnRlciZ0eHQ2ND1UMDRnVTBGTVJRJTNEJTNE%26blend-mode%3Dnormal%26blend-align%3Dbottom%2Cleft%26dpr%3D2%26blend-w%3D0.75%26w%3D640%26h%3D640?h=300&w=300&s=11a9d67006f00d98f64a31687f161ec6",alt:"sale image"}),s("div",{class:"mx-4"},[s("h3",{class:"text-white font-semibold"},"NIRVANA CD"),s("p",{class:"text-opacwhite5 text-sm"}," This is a new, unopened CD in its original packaging. ")]),s("svg",{role:"img",height:"16",width:"16",class:"text-lightest absolute top-2 right-2 hidden group-hover:block",viewBox:"0 0 16 16"},[s("path",{fill:"currentColor",d:"M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"}),s("path",{fill:"currentColor",d:"M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"})])])])])],-1)),he={class:"sm:pl-5 lg:p-5 lg:ml-[1rem]"};function de(t,e,o,c,a,r){var L,D,j,R,S,z;const u=C("ArtistOptions"),P=C("TrackItems"),U=C("router-link"),H=C("Card"),O=C("Info");return l(),n("section",dt,[s("div",{id:"artistPage",class:"p-5 max-h-[400px] h-[340px] min-h-[400px] w-full mt-[-96px] relative bg-dark5 z-10",style:B({"--opacity":a.opac,"--bgArtistImage":`url(${r.artistImage})`})},[s("div",pt,[s("div",ut,[gt,s("h1",ft,p((L=r.currentArtist)==null?void 0:L.name),1),s("div",null,[s("span",mt," Ayl\u0131k "+p((j=(D=r.currentArtist)==null?void 0:D.followers)==null?void 0:j.total)+" dinleyici ",1)])])])],4),yt,s("div",vt,[s("div",bt,[s("div",xt,[s("div",kt,[s("button",{onMousedown:e[0]||(e[0]=i=>a.leftClick=!0),onMouseup:e[1]||(e[1]=i=>a.leftClick=!1),onClick:e[2]||(e[2]=i=>r.playArtistTopTracksFunc(t.artistID=o.id)),class:y([{"bg-green3/70 scale-[1]":a.leftClick,"hover:scale-[1.04] bg-green3/95 hover:bg-green3":!a.leftClick},"rounded-full p-[12px] w-fit cursor-default"])},[(l(),n("svg",Tt,[r.isPlayingArtistTopTracks?(l(),n("path",_t)):(l(),n("path",At))]))],34)]),s("div",{class:y({"w-[9.5rem]":r.currentArtistIsFav,"w-[6.6rem]":!r.currentArtistIsFav})},[s("button",{onClick:e[3]||(e[3]=(...i)=>r.addRemoveArtist&&r.addRemoveArtist(...i)),class:y([{"w-[8rem] border-white":r.currentArtistIsFav,"hover:border-white border-opacwhite2":!r.currentArtistIsFav},"border cursor-default w-[5.5rem] h-fit text-white px-2 py-1 rounded-[5px]"])},[r.currentArtistIsFav?(l(),n("span",wt,"TAK\u0130P ED\u0130L\u0130YOR")):(l(),n("span",Ct," TAK\u0130P ET"))],2)],2),_(u,{follow:r.currentArtistIsFav,addRemoveArtist:r.addRemoveArtist,artistURL:r.currentArtistURL},null,8,["follow","addRemoveArtist","artistURL"])])])]),s("section",Pt,[Ft,s("div",{class:y([{"h-[15.8rem]":!a.seeMore,"h-full":a.seeMore},"overflow-hidden wrapper"])},[(l(!0),n(N,null,Z(a.topSongs,(i,d)=>(l(),J(P,{key:i.id,id:i.id,uri:r.currentArtistUri,itemUri:i.uri,artistTopTrackUris:r.artistTopTrackUris,track:i,trackID:i.id,contextType:a.contextType,index:d,artistPage:!0,margin:!0,findFavTracks:r.findFavTracks,addGreenHeartFavTracks:r.addGreenHeartFavTracks,removeGreenHeartFavTracks:r.removeGreenHeartFavTracks},{trackImg:h(()=>{var g,f;return[s("img",{class:"object-fit w-[40px] h-[40px] mr-4",src:(f=(g=i==null?void 0:i.album)==null?void 0:g.images[2])==null?void 0:f.url,alt:""},null,8,Ht)]}),trackName:h(()=>[s("p",Lt,p(i.name),1)]),listenNumber:h(()=>[w(p(i.popularity),1)]),duration:h(()=>[w(p(r.trackDuration(t.duration=i.duration_ms)),1)]),_:2},1032,["id","uri","itemUri","artistTopTrackUris","track","trackID","contextType","index","findFavTracks","addGreenHeartFavTracks","removeGreenHeartFavTracks"]))),128))],2),s("button",{onClick:e[4]||(e[4]=(...i)=>r.seeMoreFunc&&r.seeMoreFunc(...i)),class:"m-4 sm:text-[10px] sm3:text-[0.75rem] text-opacwhite5 hover:text-white leading-7 tracking-widest hover:text-underline-offset-8 font-semibold cursor-default uppercase mb-8"},[a.seeMore?(l(),n("span",jt,"daha az\u0131n\u0131 g\xF6ster")):(l(),n("span",Dt,"See More"))]),_(H,{artistPage:!0,togglePublications:r.togglePublications,toggleAlbums:r.toggleAlbums,toggleSingles:r.toggleSingles,popPublications:a.popPublications,toggleCompilations:r.toggleCompilations,albums:a.albums,singles:a.singles,compilations:a.compilations,currentData:a.diskografiList},{cardTitle:h(()=>[Rt]),seeMore:h(()=>{var i;return[_(U,{onClick:r.openDiscografi,to:{name:"discography",params:{id:(i=r.currentArtist)==null?void 0:i.id,type:this.type}},class:"uppercase text-lightest"},{default:h(()=>[St]),_:1},8,["onClick","to"])]}),imgContainer:h(({data:i})=>[s("img",{class:"h-full w-full object-cover",src:i==null?void 0:i.images[0].url,alt:"image"},null,8,zt)]),firstTitle:h(({data:i})=>[s("span",null,p(i.name),1)]),secondTitle:h(({data:i})=>[s("span",null,p(r.cartAlbumYear(i.release_date)),1),s("span",Mt,p(i.album_type),1)]),playBtn:h(({data:i})=>{var d,g,f,v,b,x,k;return[s("div",{class:y([((d=r.getCurrentlyPlayingTrack)==null?void 0:d.is_playing)&&i.uri===((f=(g=r.getCurrentlyPlayingTrack)==null?void 0:g.context)==null?void 0:f.uri)?"opacity-100 translate-y-[-0.4rem]":"opacity-0","bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"])},[(v=i==null?void 0:i.images[0])!=null&&v.url?(l(),n("button",{key:0,id:"playBtn",onClick:T=>r.playContextUri(t.uri={uri:i.uri,index:r.currentPlayingTrackIndex,type:i.type},t.href=i.href),onMousedown:e[5]||(e[5]=T=>a.leftClick=!0),onMouseup:e[6]||(e[6]=T=>a.leftClick=!1),class:y([{" bg-green3/80 scale-80":a.leftClick,"hover:scale-104 bg-green3/95 hover:bg-green3":!a.leftClick},"p-3 rounded-full cursor-default shadow-[0px_3px_3px_1px_rgba(0,0,0,0.3)]"])},[(l(),n("svg",It,[((b=r.getCurrentlyPlayingTrack)==null?void 0:b.is_playing)&&i.uri===((k=(x=r.getCurrentlyPlayingTrack)==null?void 0:x.context)==null?void 0:k.uri)?(l(),n("path",Ot)):(l(),n("path",Ut))]))],42,Bt)):F("",!0)],2)]}),_:1},8,["togglePublications","toggleAlbums","toggleSingles","popPublications","toggleCompilations","albums","singles","compilations","currentData"]),_(H,{currentData:a.frontOfYou},{cardTitle:h(()=>{var i;return[w("Kar\u015F\u0131n\u0131zda "+p((i=r.currentArtist)==null?void 0:i.name),1)]}),imgContainer:h(({data:i})=>{var d;return[s("img",{class:"h-full w-full object-cover",src:(d=i==null?void 0:i.images[0])==null?void 0:d.url,alt:"image"},null,8,Et)]}),firstTitle:h(({data:i})=>[s("span",null,p(i.name),1)]),secondTitle:h(({data:i})=>[s("span",null,p(r.cartAlbumYear(i.release_date)),1),s("span",Nt,p(i.album_type),1)]),playBtn:h(({data:i})=>{var d,g,f,v,b,x,k;return[s("div",{class:y([((d=r.getCurrentlyPlayingTrack)==null?void 0:d.is_playing)&&i.uri===((f=(g=r.getCurrentlyPlayingTrack)==null?void 0:g.context)==null?void 0:f.uri)?"opacity-100 translate-y-[-0.4rem]":"opacity-0","bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"])},[(v=i==null?void 0:i.images[0])!=null&&v.url?(l(),n("button",{key:0,id:"playBtn",onClick:T=>r.playContextUri(t.uri={uri:i.uri,index:r.currentPlayingTrackIndex,type:i.type},t.href=i.href),onMousedown:e[7]||(e[7]=T=>a.leftClick=!0),onMouseup:e[8]||(e[8]=T=>a.leftClick=!1),class:y([{" bg-green3/80 scale-80":a.leftClick,"hover:scale-104 bg-green3/95 hover:bg-green3":!a.leftClick},"p-3 rounded-full cursor-default shadow-[0px_3px_3px_1px_rgba(0,0,0,0.3)]"])},[(l(),n("svg",Vt,[((b=r.getCurrentlyPlayingTrack)==null?void 0:b.is_playing)&&i.uri===((k=(x=r.getCurrentlyPlayingTrack)==null?void 0:x.context)==null?void 0:k.uri)?(l(),n("path",Jt)):(l(),n("path",Gt))]))],42,Zt)):F("",!0)],2)]}),_:1},8,["currentData"]),_(H,{artists:!0,currentData:(R=r.fansLove)==null?void 0:R.artists},{cardTitle:h(()=>[Yt]),imgContainer:h(({data:i})=>{var d;return[s("img",{class:"h-full w-full object-cover rounded-[100%] shadow-[0px_10px_16px_8px_rgba(0,0,0,0.4)]",src:(d=i==null?void 0:i.images[0])==null?void 0:d.url,alt:"image"},null,8,Qt)]}),firstTitle:h(({data:i})=>[s("span",null,p(i.name),1)]),secondTitle:h(({data:i})=>[s("span",null,p(i.type),1)]),playBtn:h(({data:i})=>{var d,g,f,v,b,x,k,T;return[s("div",{class:y([((g=(d=r.getCurrentlyPlayingTrack)==null?void 0:d.item)==null?void 0:g.artists[0].id)===(i==null?void 0:i.id)&&((f=r.getCurrentlyPlayingTrack)==null?void 0:f.is_playing)&&!((v=r.getCurrentlyPlayingTrack)!=null&&v.context)&&r.isArtistContext?"opacity-100 translate-y-[-0.4rem]":"opacity-0","bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"])},[s("button",{onClick:M=>r.playArtistTopTracksFunc(t.artistID=i==null?void 0:i.id,t.href=i==null?void 0:i.href),onMousedown:e[9]||(e[9]=M=>a.leftClick=!0),onMouseup:e[10]||(e[10]=M=>a.leftClick=!1),id:"playBtn",class:y([{" bg-green3/80 scale-80":a.leftClick,"hover:scale-104 bg-green3/95 hover:bg-green3":!a.leftClick},"p-3 rounded-full cursor-default shadow-[0px_3px_3px_1px_rgba(0,0,0,0.3)]"])},[Xt,(l(),n("svg",qt,[((x=(b=r.getCurrentlyPlayingTrack)==null?void 0:b.item)==null?void 0:x.artists[0].id)===(i==null?void 0:i.id)&&((k=r.getCurrentlyPlayingTrack)==null?void 0:k.is_playing)&&!((T=r.getCurrentlyPlayingTrack)!=null&&T.context)&&r.isArtistContext?(l(),n("path",Kt)):(l(),n("path",$t))]))],42,Wt)],2)]}),_:1},8,["currentData"])]),s("section",te,[s("div",ee,[s("div",se,[ie,s("div",re,[s("button",{style:B({"--bgArtistImage":`url(${r.artistImage})`}),class:"info-container relative h-[516px] rounded-xl bg-cover bg-center w-full bg-no-repeat hover:scale-[1.01] transition duration-200 linear"},[ae,s("div",oe,[s("div",le," Ayl\u0131k "+p((z=(S=r.currentArtist)==null?void 0:S.followers)==null?void 0:z.total)+" dinleyici ",1),ne])],4)])]),ce]),s("section",he,[_(O)])])])}var me=I(ht,[["render",de],["__scopeId","data-v-77b9da8e"]]);export{me as default};
