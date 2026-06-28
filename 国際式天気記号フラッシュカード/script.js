const raw = [
 ["現在天気","１時間前から現在の天気・強さ・連続性（止み間）を表す","現在天気の記号は、観測時だけでなく前1時間の経過も含む。"],
 ["現在天気","観測時に弱い雨・並の雨・強い雨（前1時間に止み間あり）","止み間あり＝連続性なし。"],
 ["現在天気","弱い雨・並の雨・強い雨（前1時間に止み間なし）","止み間なし＝連続性あり。"],
 ["現在天気","弱い霧雨・並の霧雨・強い霧雨（前1時間に止み間あり）","霧雨でも連続性を区別する。"],
 ["現在天気","弱い霧雨・並の霧雨・強い霧雨（前1時間に止み間なし）","止み間なし＝連続性あり。"],
 ["現在天気","弱い雪・並の雪・強い雪（前1時間に止み間あり）","雪も強さと連続性を読む。"],
 ["現在天気","弱い雪・並の雪・強い雪（前1時間に止み間なし）","止み間なし＝連続性あり。"],
 ["しゅう雨性降水","積乱雲からの降水。にわか雨・にわか雪","対流性の雲から急に降り、強度変化も大きい。"],
 ["しゅう雨性降水","弱いしゅう雨・並または強いしゅう雨・激しいしゅう雨","しゅう雨は強度で区別する。"],
 ["しゅう雨性降水","弱いしゅう雪・並または強いしゅう雪","積乱雲や積雲によるにわか雪。"],
 ["しゅう雨性降水","弱いしゅう性みぞれ・並または強いしゅう性みぞれ","にわかに降るみぞれ。"],
 ["しゅう雨性降水","弱いあられ・並または強いあられ","あられも強度を区別する。"],
 ["しゅう雨性降水","ひょう。雨またはみぞれを伴ってもよく、雷鳴なし","弱と、並または強を区別する。"],
 ["しゅう雨性降水","凍雨","雨滴が凍結した透明または半透明の氷粒。"],
 ["雷電","雷電（観測時に降水なし）","雷があっても観測時の降水がない場合。"],
 ["雷電","雨または雪を伴う雷電／ひょうまたはあられを伴う雷電","雷電と伴う降水の種類を読む。"],
 ["雷電","電光は見えるが、雷鳴は聞こえない","光だけを確認した状態。"],
 ["雷電","弱または並の雷電。ひょう・氷あられ・雪あられはないが、雨・雪・みぞれを伴う","観測時に雷電がある。"],
 ["雷電","強い雷電。観測時にひょう・氷あられ・雪あられを伴う","強い雷電と固体降水の組合せ。"],
 ["視程現象","もや：空気中の水滴で視程1km以上10km未満","霧との境目は視程1km。"],
 ["視程現象","霧：空気中の水滴で視程1km未満。空を透視できる／できない","観測時1時間以内に変化なし。"],
 ["視程現象","煙霧：乾いた微粒子で視程10km未満","もや・霧は水滴、煙霧は乾いた微粒子。"],
 ["濃霧","陸上は視程100m以下、海上は視程500m以下（0.3海里）","陸上と海上で基準が異なる。"],
 ["霧の変化","霧。空を透視できる／できない。観測時1時間以内に始まった、または濃くなった","直近1時間の悪化を表す。"],
 ["霧の変化","霧。空を透視できる／できない。観測時1時間以内に薄くなった","直近1時間の改善を表す。"],
 ["過去1時間","現在はないが、過去1時間以内に霧雨・雨・雪・みぞれ・凍雨があった","強弱の区別はしない。"],
 ["過去天気","現在からさかのぼって6時間前までの天気","弱い・並など程度の区別はしない。"],
 ["過去天気","霧","過去6時間の代表的な天気。"],
 ["過去天気","霧雨","過去6時間の代表的な天気。"],
 ["過去天気","雨","過去6時間の代表的な天気。"],
 ["過去天気","雪","過去6時間の代表的な天気。"],
 ["過去天気","しゅう雨性降水","過去6時間の代表的な天気。"],
 ["過去天気","雷電","過去6時間の代表的な天気。"]
];
const imagesByRow={4:["image37.jpg","image25.jpg","image6.jpg"],6:["image38.jpg","image7.jpg","image9.jpg"],7:["image15.jpg","image1.jpg","image39.jpg"],8:["image24.jpg","image34.jpg","image28.jpg"],9:["image14.jpg","image3.jpg","image18.jpg"],10:["image8.jpg","image29.jpg","image41.jpg"],12:["image4.jpg"],13:["image19.jpg"],14:["image17.jpg"],15:["image11.jpg"],16:["image35.jpg","image33.jpg"],17:["image31.jpg"],18:["image32.jpg"],19:["image10.jpg"],20:["image21.jpg"],21:["image12.jpg"],22:["image36.jpg"],23:["image16.jpg"],24:["image22.jpg"],25:["image13.jpg"],27:["image30.jpg"],28:["image2.jpg"],29:["image42.jpg"],31:["image23.jpg"],32:["image5.jpg"],33:["image40.jpg"],34:["image14.jpg"],35:["image26.jpg"],36:["image20.jpg"]};
const cards=raw.map(([category,back,note],i)=>{const sourceRow=i<2?i+3:i+4;return{category,front:`${category}：この記号が表す天気は？`,images:imagesByRow[sourceRow]||[],back,note}});
const key="weatherSymbolFlashcards";let filter=localStorage.getItem(key+".filter")||"すべて",index=+(localStorage.getItem(key+".index")||0),deck=[],backVisible=false;const load=n=>new Set(JSON.parse(localStorage.getItem(key+n)||"[]"));let remembered=load(".remembered"),again=load(".again");
const $=id=>document.getElementById(id), els={progress:$("progress"),card:$("flashcard"),cat:$("categoryLabel"),backCat:$("backCategoryLabel"),front:$("frontText"),back:$("backText"),note:$("noteText"),flip:$("flipButton"),remembered:$("rememberedCount"),again:$("againCount")};
const categories=["すべて",...new Set(cards.map(c=>c.category))];$("filters").innerHTML=categories.map(c=>`<button class="filter-button${c===filter?' active':''}" data-filter="${c}">${c}</button>`).join("");
function id(c){return c.category+":"+c.back} function save(){localStorage.setItem(key+".filter",filter);localStorage.setItem(key+".index",index)} function front(){backVisible=false;els.card.classList.remove("is-back");els.flip.textContent="答えを見る"} function flip(){backVisible=!backVisible;els.card.classList.toggle("is-back",backVisible);els.flip.textContent=backVisible?"問題に戻る":"答えを見る"}
function render(rebuild=true){if(rebuild)deck=filter==="すべて"?[...cards]:cards.filter(c=>c.category===filter);if(index>=deck.length)index=0;const c=deck[index];els.progress.textContent=`${index+1} / ${deck.length}`;els.cat.textContent=c.category;els.backCat.textContent=c.category+"の答え";els.front.innerHTML=c.images.length?`<span class="symbol-group">${c.images.map((src,i)=>`<img src="images/${src}" alt="${c.category}の記号 ${i+1}">`).join("")}</span><small>この記号が表す天気は？</small>`:c.front;els.back.textContent=c.back;els.note.textContent=c.note;els.remembered.textContent=remembered.size;els.again.textContent=again.size;document.querySelectorAll(".filter-button").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));front();save()}
function move(n){index=(index+n+deck.length)%deck.length;render(false)} function mark(which){const cid=id(deck[index]);if(which==="remembered"){remembered.add(cid);again.delete(cid)}else{again.add(cid);remembered.delete(cid)}localStorage.setItem(key+".remembered",JSON.stringify([...remembered]));localStorage.setItem(key+".again",JSON.stringify([...again]));render(false)}
els.card.onclick=flip;els.flip.onclick=flip;$("prevButton").onclick=()=>move(-1);$("nextButton").onclick=()=>move(1);$("restartButton").onclick=()=>{index=0;render()};$("shuffleButton").onclick=()=>{for(let i=deck.length-1;i;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}index=0;render(false)};$("rememberedButton").onclick=()=>mark("remembered");$("againButton").onclick=()=>mark("again");$("resetButton").onclick=()=>{remembered.clear();again.clear();localStorage.removeItem(key+".remembered");localStorage.removeItem(key+".again");render(false)};document.querySelectorAll(".filter-button").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;index=0;render()});render();
