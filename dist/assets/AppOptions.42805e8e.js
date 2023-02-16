import{_ as d,o as s,c as a,d as i,b as t,n as c,l as m,s as h}from"./index.c0e18d16.js";const x={name:"AppOptions",props:["appOptions","albumPage","singlePage","TrackPage","playlistPage","isFavAlbum","unFollowAlbum","diskografiPage","firstElement"],emits:["toggleAppOptions","unFollowAlbumE"],data(){return{visible:!1,visible2:!1,searching:!1,searchEl:""}},methods:{paylasDropDown(){this.paylasDropDown=!0},async addToQueue(o,l){this.TrackPage&&await this.$store.dispatch("controller/addItemToQueue",o),this.$store.dispatch("controller/modalInfoType",{type:"queue",status:!0}),this.close()},visibleFunc(){this.visible=!0,document.removeEventListener("click",this.close)},visibleFunc2(){this.visible=!1,document.addEventListener("click",this.close)},clean(){this.searchEl=""},close(o){if(!this.$el.contains(o==null?void 0:o.target))this.appOptions&&this.$emit("toggleAppOptions",!1),console.log("clickledi",this.appOptions);else return},unFollowAlbumFunc(o,l){this.$emit("unFollowAlbumE",l.target.closest(".app--option").id)},copyURL(){this.$store.dispatch("controller/modalInfoType",{type:"copyURL",status:!0}),this.close()}},computed:{getCurrentlyPlayingTrack(){return this.$store.getters["controller/getCurrentlyPlayingTrack"]},currentUri(){var o,l,e;return this.TrackPage?(o=this.$store.getters["albums/getCurrentTrack"])==null?void 0:o.uri:this.playlistPage?(l=this.$store.getters["playlists/getPlaylist"])==null?void 0:l.uri:this.albumPage?(e=this.$store.getters["albums/getAlbum"])==null?void 0:e.uri:""},isPlayingCurrentSectionTrack(){var o;return((o=this.getCurrentlyPlayingTrack)==null?void 0:o.item.uri)!==this.currentUri},typing(){return this.searchEl.length?this.searching=!0:this.searching=!1}},mounted(){setTimeout(()=>{document.addEventListener("click",this.close)},100)},beforeUnmount(){document.removeEventListener("click",this.close)}},g=t("button",{class:"cursor-default"},[t("span",{class:"text-xs md:text-sm"}," S\u0131raya Ekle ")],-1),p=[g],f={class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"},b={class:"cursor-default"},_={key:0,class:"text-xs md:text-sm"},k={key:1,class:"text-xs md:text-sm"},y={key:2,class:"text-xs md:text-sm"},w={key:1,class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},v={key:0,class:"cursor-default"},P=t("span",{class:"text-xs md:text-sm"}," Katk\u0131da bulunanlar\u0131 g\xF6ster ",-1),T=[P],A={key:1,class:"flex items-center justify-between w-full cursor-default text-white"},C=t("span",{class:"text-xs md:text-sm justify-start"}," Bildir ",-1),j=t("svg",{role:"img",height:"16",width:"16",viewBox:"0 0 16 16"},[t("path",{fill:"currentColor",d:"M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"}),t("path",{fill:"currentColor",d:"M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"})],-1),E=[C,j],F={key:2,class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},L={class:"cursor-default"},M={key:0,class:"text-xs md:text-sm"},B={key:1,class:"text-xs md:text-sm"},z={key:0,class:"cursor-default"},U=t("span",{class:"text-xs md:text-sm"}," Kitapl\u0131\u011F\u0131na Ekle ",-1),K=[U],O={key:1,class:"cursor-default"},V=t("span",{class:"text-xs md:text-sm"}," Kitapl\u0131\u011F\u0131ndan Kald\u0131r ",-1),D=[V],H={key:0,class:"cursor-default"},R=t("span",{class:"text-xs md:text-sm"}," Kitapl\u0131\u011F\u0131na Ekle ",-1),S=[R],I={key:1,class:"cursor-default"},Q=t("span",{class:"text-xs md:text-sm"}," Kitapl\u0131\u011F\u0131ndan Kald\u0131r ",-1),N=[Q],q=t("button",{class:"cursor-default flex items-center justify-between w-full"},[t("span",{class:"text-xs md:text-sm"}," \xC7alma listesine ekle "),t("span",{class:"text-white"},[t("svg",{role:"img",height:"16",width:"16",class:"rotate-90",viewBox:"0 0 16 16"},[t("path",{fill:"currentColor",d:"M14 10L8 4l-6 6h12z"})])])],-1),G={class:"w-full flex items-center justify-start hover:bg-dark3 border-opacwhite mb-1"},J=t("div",{class:"absolute pl-2"},[t("span",{class:""},[t("svg",{role:"img",height:"16",width:"16",class:"text-opacwhite5","aria-hidden":"true",viewBox:"0 0 16 16"},[t("path",{fill:"currentColor",d:"M7 1.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM.25 7a6.75 6.75 0 1112.096 4.12l3.184 3.185a.75.75 0 11-1.06 1.06L11.304 12.2A6.75 6.75 0 01.25 7z"})])])],-1),W=t("svg",{role:"img",height:"16",width:"16",viewBox:"0 0 16 16",class:"text-opacwhite5"},[t("path",{fill:"currentColor",d:"M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"})],-1),X=[W],Y=t("li",{class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"},[t("button",{class:"cursor-default"},[t("span",{class:"text-xs md:text-sm"}," \xC7alma listesi olu\u015Ftur ")])],-1),Z=t("button",{class:"cursor-default flex items-center justify-between w-full"},[t("span",{class:"text-xs md:text-sm"}," Payla\u015F "),t("span",{class:"text-white"},[t("svg",{role:"img",height:"16",width:"16",class:"rotate-90",viewBox:"0 0 16 16"},[t("path",{fill:"currentColor",d:"M14 10L8 4l-6 6h12z"})])])],-1),$={class:"cursor-default"},tt={key:0,class:"text-xs md:text-sm"},et={key:1,class:"text-xs md:text-sm"},st={key:2,class:"text-xs md:text-sm"},at={class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},lt={class:"cursor-default"},it={key:0,class:"text-xs md:text-sm"},rt={key:1,class:"text-xs md:text-sm"},ot={key:2,class:"text-xs md:text-sm"},nt={key:6,class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"},ut=t("button",{class:"cursor-default"},[t("span",{class:"text-xs md:text-sm"},"\xD6neriler hakk\u0131nda ")],-1),ct=[ut],dt=t("li",{class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},[t("button",{class:"cursor-default"},[t("span",{class:"text-xs md:text-sm"},"Masa\xFCst\xFC uygulamas\u0131nda a\xE7")])],-1);function mt(o,l,e,ht,u,n){return s(),a("ul",{class:c([{"top-[18.4rem] left-[18.4rem] p-[4px] ":e.diskografiPage&&e.firstElement,"top-[11.3rem] left-[18.4rem] p-[4px] ":e.diskografiPage&&!e.firstElement},"app--option absolute bg-dark2 top-[4.8rem] left-[10.8rem] p-[4px] w-fit h-fit text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"])},[n.isPlayingCurrentSectionTrack?(s(),a("li",{key:0,onClick:l[0]||(l[0]=r=>n.addToQueue(o.uri=n.currentUri)),class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 truncate"},p)):i("",!0),t("li",f,[t("button",b,[e.TrackPage?(s(),a("span",_," \u015Eark\u0131 radyosuna git ")):i("",!0),e.albumPage||e.singlePage||e.diskografiPage?(s(),a("span",k," Sanat\xE7\u0131 radyosuna git ")):i("",!0),e.playlistPage?(s(),a("span",y," \xC7alma listesi radyosuna git ")):i("",!0)])]),e.TrackPage||e.playlistPage?(s(),a("li",w,[e.TrackPage?(s(),a("button",v,T)):i("",!0),e.playlistPage?(s(),a("button",A,E)):i("",!0)])):i("",!0),e.TrackPage?(s(),a("li",F,[t("button",L,[e.TrackPage?(s(),a("span",B,"Be\u011Fenilen \u015Eark\u0131lar listesinden kald\u0131r")):(s(),a("span",M," Be\u011Fenilen \u015Eark\u0131lar\u0131na kaydet "))])])):i("",!0),e.diskografiPage?(s(),a("li",{key:3,onClick:l[1]||(l[1]=r=>n.unFollowAlbumFunc(o._,r)),class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},[e.isFavAlbum?(s(),a("button",O,D)):(s(),a("button",z,K))])):i("",!0),!e.TrackPage&&!e.diskografiPage?(s(),a("li",{key:4,onClick:l[2]||(l[2]=(...r)=>e.unFollowAlbum&&e.unFollowAlbum(...r)),class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},[e.isFavAlbum?(s(),a("button",I,N)):(s(),a("button",H,S))])):i("",!0),e.albumPage||e.singlePage||e.TrackPage||e.diskografiPage?(s(),a("li",{key:5,onMouseenter:l[5]||(l[5]=(...r)=>n.visibleFunc&&n.visibleFunc(...r)),onMouseleave:l[6]||(l[6]=(...r)=>n.visibleFunc2&&n.visibleFunc2(...r)),class:"group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"},[q,u.visible?(s(),a("ul",{key:0,class:c([{"left-[15.65rem] top-[-12.5rem]":e.TrackPage},"z-50 absolute bg-dark2 top-[-14.9rem] left-[12.2rem] p-[4px] h-[25rem] w-fit text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"])},[t("li",G,[m(t("input",{"onUpdate:modelValue":l[3]||(l[3]=r=>u.searchEl=r),type:"text",placeholder:"\xC7alma listesi ara",class:"text-sm w-[15.3rem] bg-opacwhite relative rounded-md pl-8 h-8 left-0 focus:outline-none"},null,512),[[h,u.searchEl]]),J,n.typing?(s(),a("button",{key:0,onClick:l[4]||(l[4]=(...r)=>n.clean&&n.clean(...r)),class:"right-0 px-3 absolute"},X)):i("",!0)]),Y],2)):i("",!0)],32)):i("",!0),t("li",{onMouseenter:l[8]||(l[8]=r=>u.visible2=!0),onMouseleave:l[9]||(l[9]=r=>u.visible2=!1),class:"group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"},[Z,u.visible2?(s(),a("ul",{key:0,class:c([{"w-[16.2rem] top-[7.4rem] ":e.playlistPage,"left-[15.55rem] top-[12.65rem]":e.TrackPage},"z-50 absolute bg-dark2 top-[10rem] left-[14.9rem] p-[4px] h-fit w-[13.3rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"])},[t("li",{onClick:l[7]||(l[7]=(...r)=>n.copyURL&&n.copyURL(...r)),class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-opacwhite"},[t("button",$,[e.albumPage||e.singlePage||e.diskografiPage?(s(),a("span",tt,"Alb\xFCm ba\u011Flant\u0131s\u0131n\u0131 kopyala")):i("",!0),e.TrackPage?(s(),a("span",et,"\u015Eark\u0131n\u0131n ba\u011Flant\u0131s\u0131n\u0131 kopyala")):i("",!0),e.playlistPage?(s(),a("span",st,"\xC7alma listesinin ba\u011Flant\u0131s\u0131n\u0131 kopyala")):i("",!0)])]),t("li",at,[t("button",lt,[e.albumPage||e.singlePage||e.diskografiPage?(s(),a("span",it,"Alb\xFCm\xFC g\xF6m")):i("",!0),e.TrackPage?(s(),a("span",rt,"Par\xE7ay\u0131 g\xF6m")):i("",!0),e.playlistPage?(s(),a("span",ot,"\xC7alma listesini g\xF6m")):i("",!0)])])],2)):i("",!0)],32),e.playlistPage?(s(),a("li",nt,ct)):i("",!0),dt],2)}var gt=d(x,[["render",mt]]);export{gt as A};
