import{_ as c,o as a,c as i,b as e,d as n,l as p,s as u,n as h,j as m}from"./index.c0e18d16.js";const x={name:"EpisodeOptions",emits:["toggleEpisodeOptions","removeEpisodeOptions"],props:["episodeOptions","episodes","episodePage","podcastShowPage","episodeIsFav"],data(){return{visible:!1,visible2:!1,searching:!1,searchEl:""}},methods:{async removeAddEpisode(d,s){const l=s.target.closest(".episodeContainer").id;console.log(l),this.$emit("removeEpisodeOptions",l),this.$emit("toggleEpisodeOptions",!1)},visibleFunc(){this.visible=!0,document.removeEventListener("click",this.close)},visibleFunc2(){this.visible=!1,document.addEventListener("click",this.close)},clean(){this.searchEl=""},close(d){this.$el.contains(d.target)||((this.episodePage||this.podcastShowPage||this.episodes)&&this.$emit("toggleEpisodeOptions",!1),console.log("clickledi",this.episodePage||this.podcastShowPage||this.episodes))}},computed:{typing(){return this.searchEl.length?this.searching=!0:this.searching=!1}},mounted(){console.log("sadasdas",this.episodes),setTimeout(()=>{document.addEventListener("click",this.close)},100)},beforeUnmount(){document.removeEventListener("click",this.close)}},f=e("li",{class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 truncate"},[e("button",{class:"cursor-default"},[e("span",{class:"text-xs md:text-sm"},"S\u0131raya Ekle ")])],-1),b={key:0,class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},g=e("span",{class:"text-xs md:text-sm"},"B\xF6l\xFCmlerin'e kaydet",-1),v=[g],w={key:1,class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},_=e("span",{class:"text-xs md:text-sm"},"B\xF6l\xFCmlerin'den kald\u0131r",-1),k=[_],y={key:2,class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},E=e("button",{class:"cursor-default"},[e("span",{class:"text-xs md:text-sm"},"B\xF6l\xFCm A\xE7\u0131klamas\u0131na Bak\u0131n")],-1),j=[E],B=e("button",{class:"cursor-default flex items-center justify-between w-full"},[e("span",{class:"text-xs md:text-sm"},"\xC7alma listesine ekle"),e("span",{class:"text-white"},[e("svg",{role:"img",height:"16",width:"16",class:"rotate-90",viewBox:"0 0 16 16"},[e("path",{fill:"currentColor",d:"M14 10L8 4l-6 6h12z"})])])],-1),L={key:0,class:"z-40 absolute bg-dark2 top-[-15rem] left-[12.4rem] p-[4px] h-[25rem] w-[15.8rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"},M={class:"w-full flex items-center justify-start hover:bg-dark3 border-opacwhite mb-1"},C=e("div",{class:"absolute pl-2"},[e("span",{class:""},[e("svg",{role:"img",height:"16",width:"16",class:"text-opacwhite5","aria-hidden":"true",viewBox:"0 0 16 16"},[e("path",{fill:"currentColor",d:"M7 1.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM.25 7a6.75 6.75 0 1112.096 4.12l3.184 3.185a.75.75 0 11-1.06 1.06L11.304 12.2A6.75 6.75 0 01.25 7z"})])])],-1),P=e("svg",{role:"img",height:"16",width:"16",viewBox:"0 0 16 16",class:"text-opacwhite5"},[e("path",{fill:"currentColor",d:"M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"})],-1),z=[P],F=e("li",{class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"},[e("button",{class:"cursor-default"},[e("span",{class:"text-xs md:text-sm"},"\xC7alma listesi olu\u015Ftur")])],-1),O=e("button",{class:"cursor-default flex items-center justify-between w-full"},[e("span",{class:"text-xs md:text-sm"},"Payla\u015F"),e("span",{class:"text-white"},[e("svg",{role:"img",height:"16",width:"16",class:"rotate-90",viewBox:"0 0 16 16"},[e("path",{fill:"currentColor",d:"M14 10L8 4l-6 6h12z"})])])],-1),S={key:0,class:"z-40 absolute bg-dark2 top-[10rem] left-[12.4rem] p-[4px] h-fit w-[13.8rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"},A=m('<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-opacwhite"><button class="cursor-default"><span class="text-xs md:text-sm">B\xF6l\xFCm ba\u011Flant\u0131s\u0131n\u0131 kopyala</span></button></li><li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"><button class="cursor-default"><span class="text-xs md:text-sm">B\xF6l\xFCm\xFC g\xF6m</span></button></li>',2),V=[A],I=e("li",{class:"w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"},[e("button",{class:"cursor-default"},[e("span",{class:"text-xs md:text-sm"},"Masa\xFCst\xFC uygulamas\u0131nda a\xE7")])],-1);function N(d,s,l,D,r,o){return a(),i("ul",{class:h([{"top-[2.2rem] left-[7rem]":l.episodes||l.podcastShowPage,"top-[4.5rem] left-[10rem]":l.episodePage},"z-40 absolute bg-dark2 p-[4px] h-fit w-[12.6rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"])},[f,l.episodeIsFav?(a(),i("li",w,[e("button",{onClick:s[1]||(s[1]=t=>o.removeAddEpisode(d.msg,t)),class:"cursor-default"},k)])):(a(),i("li",b,[e("button",{onClick:s[0]||(s[0]=t=>o.removeAddEpisode(d.msg,t)),class:"cursor-default"},v)])),l.episodes||l.podcastShowPage?(a(),i("li",y,j)):n("",!0),e("li",{onMouseenter:s[4]||(s[4]=(...t)=>o.visibleFunc&&o.visibleFunc(...t)),onMouseleave:s[5]||(s[5]=(...t)=>o.visibleFunc2&&o.visibleFunc2(...t)),class:"group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"},[B,r.visible?(a(),i("ul",L,[e("li",M,[p(e("input",{"onUpdate:modelValue":s[2]||(s[2]=t=>r.searchEl=t),type:"text",placeholder:"\xC7alma listesi ara",class:"text-sm w-[15.3rem] bg-opacwhite relative rounded-md pl-8 h-8 left-0 focus:outline-none"},null,512),[[u,r.searchEl]]),C,o.typing?(a(),i("button",{key:0,id:"close--btn",onClick:s[3]||(s[3]=(...t)=>o.clean&&o.clean(...t)),class:"right-0 px-3 absolute"},z)):n("",!0)]),F])):n("",!0)],32),e("li",{onMouseenter:s[6]||(s[6]=t=>r.visible2=!0),onMouseleave:s[7]||(s[7]=t=>r.visible2=!1),class:"group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"},[O,r.visible2?(a(),i("ul",S,V)):n("",!0)],32),I],2)}var U=c(x,[["render",N]]);export{U as E};
