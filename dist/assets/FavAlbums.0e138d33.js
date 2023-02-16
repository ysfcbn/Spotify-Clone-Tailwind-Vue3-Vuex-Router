import{I as p}from"./Info.f12069df.js";import{_ as b,a as y,o as l,c as n,b as r,n as m,t as h,F as f,e as v,r as g,i as x,f as _}from"./index.c0e18d16.js";const k={props:["album"],data(){return{leftClick:!1}},methods:{async openSelectedAlbum(e,t){var c;const s=t.target.closest(".album--card").id;((c=t.target.closest("#playBtn"))==null?void 0:c.id)==="playBtn"?(await this.fetchAlbum(e==null?void 0:e.href),await this.playContextUri({uri:e.uri,index:this.currentPlayingTrackIndex,type:"album"})):this.$router.push({name:"album",params:{id:s}})},async fetchAlbum(e){await y.get(e,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+this.getToken}}).then(({data:t})=>{this.$store.dispatch("albums/getAlbum",t)}).catch(t=>console.log(t))},async playContextUri(e){this.isPlayingContextUri?await this.$store.dispatch("controller/pauseCurrentTrack"):(e.index=this.currentPlayingTrackIndex,await this.$store.dispatch("controller/playSelectedContext",e))}},computed:{getToken(){return this.$store.getters.accessToken},getFavAlbums(){return this.$store.getters["albums/getFavAlbums"]},currentAlbumTracks(){var e,t;return(t=(e=this.$store.getters["albums/getAlbum"])==null?void 0:e.tracks)==null?void 0:t.items},getCurrentlyPlayingTrack(){return this.$store.getters["controller/getCurrentlyPlayingTrack"]},currentTrackID(){var e,t;return(t=(e=this.getCurrentlyPlayingTrack)==null?void 0:e.item)==null?void 0:t.id},findCurrentPlayingTrackIndex(){var e,t;return(t=this.currentAlbumTracks)==null?void 0:t.indexOf((e=this.currentAlbumTracks)==null?void 0:e.find(s=>s.id===this.currentTrackID))},currentPlayingTrackIndex(){return this.findCurrentPlayingTrackIndex+1?this.findCurrentPlayingTrackIndex:0},isPlayingContextUri(){var e,t,s;return((t=(e=this.getCurrentlyPlayingTrack)==null?void 0:e.context)==null?void 0:t.uri)===this.album.uri&&((s=this.getCurrentlyPlayingTrack)==null?void 0:s.is_playing)}}},A={class:"h-full group"},C={class:"w-full mb-5 relative"},T=["src"],w={role:"img",height:"24",width:"24",viewBox:"0 0 24 24"},I={key:0,fill:"text-black",d:"M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"},P={key:1,fill:"text-black",d:"M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"},B={class:"flex items-middle flex-col justify-center"},F={class:"text-white max-w-full truncate"},U={class:"text-lightest line-clamp-2"},S=["id"];function $(e,t,s,c,o,i){var u,d;return l(),n("div",{onClick:t[2]||(t[2]=a=>i.openSelectedAlbum(s.album=s.album,a)),class:"album--card bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 p-4 relative"},[r("div",A,[r("div",C,[r("img",{class:"h-full w-full object-cover",src:(d=(u=s.album)==null?void 0:u.images[0])==null?void 0:d.url,alt:""},null,8,T),r("div",{class:m([{"opacity-100 translate-y-[-0.4rem]":i.isPlayingContextUri,"opacity-0":!i.isPlayingContextUri},"bg-dark rounded-full right-0 bottom-0 absolute flex items-center mx-1 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"])},[r("button",{onMousedown:t[0]||(t[0]=a=>o.leftClick=!0),onMouseup:t[1]||(t[1]=a=>o.leftClick=!1),id:"playBtn",class:m([{" bg-green3/80 scale-80":o.leftClick,"hover:scale-106 bg-green3/95 hover:bg-green3":!o.leftClick},"p-[10px] rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"])},[r("span",null,[(l(),n("svg",w,[i.isPlayingContextUri?(l(),n("path",P)):(l(),n("path",I))]))])],34)],2)]),r("div",B,[r("h2",F,h(s.album.name),1),r("div",U,[(l(!0),n(f,null,v(s.album.artists,a=>(l(),n("span",{key:a.id,id:a.id,class:"artist--card text-sm hover:underline cursor-pointer w-full"},h(s.album.artists.length>1?a.name===s.album.artists[s.album.artists.length-1].name?a.name:a.name+", ":a.name),9,S))),128))])])])])}var E=b(k,[["render",$]]);const L={name:"FavAlbums",components:{Info:p,FavAlbumItems:E},data(){return{favAlbums:!1}},computed:{getFavAlbums(){return this.$store.getters["albums/getFavAlbums"]}},mounted(){this.favAlbums=!0,console.log("favAlbums Mounted"),this.header=document.getElementById("header"),this.favAlbumsEl=document.getElementById("favAlbums"),this.headerHeight=document.getElementById("header").getBoundingClientRect().height,this.options={root:null,threshold:[.4,.95],rootMargin:`-${this.headerHeight}px`},this.observer=new IntersectionObserver(e=>{console.log(e),this.header.classList.toggle("librarySec3-intersec-bg1",e[0].intersectionRatio<=.95),this.header.classList.toggle("librarySec3-intersec-bg2",e[0].intersectionRatio<=.4)},this.options),console.log(this.observer),this.observer.observe(this.favAlbumsEl)},beforeUnmount(){console.log("FavAlbums Unmounted"),this.observer.unobserve(this.favAlbumsEl),this.header.classList.remove("librarySec3-intersec-bg1"),this.header.classList.remove("librarySec3-intersec-bg2"),this.favAlbums=!1}},M={class:"favAlbums-Page p-5 mt-2 lg:ml-[1rem]"},z=r("div",{class:"text-white"},[r("div",{id:"favAlbums",class:"mb-7"},[r("div",{class:"h-fit"},[r("h2",{class:"text-[1.6rem] text-white leading-7 tracking-tighter",style:{"font-weight":"700"}}," Alb\xFCmler ")])])],-1),V={class:"relative grid grid-cols-col180 sm:gap-3 md2:gap-6 grid-rows-auto"};function j(e,t,s,c,o,i){const u=g("favAlbumItems"),d=g("Info");return l(),n("section",M,[z,r("div",V,[(l(!0),n(f,null,v(i.getFavAlbums,a=>(l(),_(u,{key:a.album.id,id:a.album.id,album:a.album},null,8,["id","album"]))),128))]),r("section",null,[x(d)])])}var R=b(L,[["render",j]]);export{R as default};
