import{I as w}from"./Info.e7a95ea4.js";import{_ as I,a as C,r as P,o as c,c as g,b as n,t as h,i as T,w as a,g as _,n as x}from"./index.a3af601f.js";import{C as B}from"./Card.50444f4a.js";const $={name:"genrePage",props:{id:{type:String,required:!0}},components:{Info:w,Card:B},data(){return{genrePage:!1,leftClick:!1}},methods:{async fetchCategoryPlaylists(){await C.get(`https://api.spotify.com/v1/browse/categories/${this.$route.params.id}/playlists?limit=50`,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+await this.getToken}}).then(({data:e})=>{console.log(e),this.$store.dispatch("genres/currentCategoryPlaylists",e)}).catch(e=>console.log(e))},async fetchPlaylist(e){await C.get(e,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:r})=>{this.$store.dispatch("playlists/getPlaylist",r)}).catch(r=>console.log(r))},async playContextUri(e,r){var l,u,i,s;console.log(e),e.uri===((u=(l=this.getCurrentlyPlayingTrack)==null?void 0:l.context)==null?void 0:u.uri)&&((i=this.getCurrentlyPlayingTrack)==null?void 0:i.is_playing)?await this.$store.dispatch("controller/pauseCurrentTrack"):(await this.fetchPlaylist(r),e.id=(s=this.currentPlaylistTracks[this.currentPlayingTrackIndex])==null?void 0:s.track.id,e.index=this.currentPlayingTrackIndex,console.log(e),await this.$store.dispatch("controller/playSelectedContext",e))}},computed:{isAuth(){return this.$store.getters.isAuth},getToken(){return this.$store.getters.accessToken},getToken(){return this.$store.getters.accessToken},getCurrentlyPlayingTrack(){return this.$store.getters["controller/getCurrentlyPlayingTrack"]},currentTrackID(){var e,r;return(r=(e=this.getCurrentlyPlayingTrack)==null?void 0:e.item)==null?void 0:r.id},currentPlaylistTracks(){var e,r;return(r=(e=this.$store.getters["playlists/getPlaylist"])==null?void 0:e.tracks)==null?void 0:r.items},findCurrentPlayingTrackIndex(){var e,r;return(r=this.currentPlaylistTracks)==null?void 0:r.indexOf((e=this.currentPlaylistTracks)==null?void 0:e.find(l=>l.track.id===this.currentTrackID))},currentPlayingTrackIndex(){return this.findCurrentPlayingTrackIndex+1?this.findCurrentPlayingTrackIndex:0},currentCategoryPlaylists(){var e,r;return(r=(e=this.$store.getters["genres/getCurrentCategoryPlaylists"])==null?void 0:e.playlists)==null?void 0:r.items},genreTitle(){return this.$store.getters["genres/getGenreTitle"]}},async created(){console.log("genrePage Mounted"),this.genrePage=!0,await this.fetchCategoryPlaylists(),this.header=document.getElementById("header"),this.genreEl=document.getElementById("genres"),this.headerHeight=document.getElementById("header").getBoundingClientRect().height,this.options={root:null,threshold:[.4,.95],rootMargin:`-${this.headerHeight}px`},this.observer=new IntersectionObserver(e=>{console.log(e),this.header.classList.toggle("librarySec3-intersec-bg1",e[0].intersectionRatio<=.95),this.header.classList.toggle("librarySec3-intersec-bg2",e[0].intersectionRatio<=.4),e[0].intersectionRatio>=.4?this.$store.dispatch("controller/closeHeaderBtn"):this.$store.dispatch("controller/showHeaderBtn")},this.options),console.log(this.observer),this.observer.observe(this.genreEl)},beforeUnmount(){console.log("genrePage Unmounted"),this.observer.unobserve(this.genreEl),this.header.classList.remove("librarySec3-intersec-bg1"),this.header.classList.remove("librarySec3-intersec-bg2"),this.genrePage=!1}},A={class:"genre-page p-5 lg:ml-[1rem]"},E={id:"genres",class:"items-center flex min-h-[240px] w-full relative"},S={class:"text-white font-semibold"},z={class:"w-full sm:text-8xl tracking-tighter",style:{"font-weight":"700"}},M={class:"w-full relative mb-5"},V=["src"],j=["onClick"],D=n("h1",{class:"text-white"},null,-1),H={role:"img",height:"24",width:"24",viewBox:"0 0 24 24"},L={key:0,fill:"text-black",d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"},R={key:1,fill:"text-black",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"};function U(e,r,l,u,i,s){const b=P("Card"),v=P("Info");return c(),g("section",A,[n("div",E,[n("div",S,[n("h1",z,h(s.genreTitle),1)])]),T(b,{genrePage:i.genrePage,currentData:s.currentCategoryPlaylists},{cardTitle:a(()=>[_(h(s.genreTitle),1)]),imgContainer:a(({data:t})=>{var o;return[n("div",M,[n("img",{class:"h-full w-full object-cover",src:(o=t==null?void 0:t.images[0])==null?void 0:o.url,alt:"image"},null,8,V)])]}),firstTitle:a(({data:t})=>[_(h(t.name),1)]),secondTitle:a(({data:t})=>[n("span",null,h(t.description),1)]),playBtn:a(({data:t})=>{var o,y,p,d,m,f;return[n("div",{class:x([{"opacity-100 translate-y-[-0.4rem]	":(t==null?void 0:t.uri)===((y=(o=s.getCurrentlyPlayingTrack)==null?void 0:o.context)==null?void 0:y.uri)&&((p=s.getCurrentlyPlayingTrack)==null?void 0:p.is_playing)},"bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center my-1 mx-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"])},[n("button",{onClick:k=>s.playContextUri(e.uri={uri:t==null?void 0:t.uri,index:s.currentPlayingTrackIndex,type:t==null?void 0:t.type},e.href=t==null?void 0:t.href),onMousedown:r[0]||(r[0]=k=>i.leftClick=!0),onMouseup:r[1]||(r[1]=k=>i.leftClick=!1),id:"playBtn",class:x([{" bg-green3/80 scale-80":i.leftClick,"hover:scale-110 bg-green3/95 hover:bg-green3 ":!i.leftClick},"p-3 rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"])},[D,(c(),g("svg",H,[(t==null?void 0:t.uri)===((m=(d=s.getCurrentlyPlayingTrack)==null?void 0:d.context)==null?void 0:m.uri)&&((f=s.getCurrentlyPlayingTrack)==null?void 0:f.is_playing)?(c(),g("path",L)):(c(),g("path",R))]))],42,j)],2)]}),_:1},8,["genrePage","currentData"]),n("section",null,[T(v)])])}var q=I($,[["render",U]]);export{q as default};
