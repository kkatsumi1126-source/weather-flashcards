const cards = [
  { category: "定義", front: "台風とは？", back: "北西太平洋または南シナ海にある広義の熱帯低気圧のうち、最大風速がおよそ34KT以上のもの。" },
  { category: "定義", front: "台風の「強さ」は何で決まる？", back: "中心付近の最大風速で決まる。" },
  { category: "大きさ", front: "台風の「大きさ」は何で決まる？", back: "15m/s以上、つまりおよそ30KT以上の強風域の半径で決まる。" },
  { category: "大きさ", front: "台風の大きさで「大型」とは？", back: "強風域の半径が500km以上、800km未満。" },
  { category: "大きさ", front: "台風の大きさで「超大型」とは？", back: "強風域の半径が800km以上。" },
  { category: "大きさ", front: "30KT風とは、台風の何を見る目安？", back: "台風の大きさを見る目安。" },
  { category: "大きさ", front: "500km以上の強風域は？", back: "大型の台風。" },
  { category: "大きさ", front: "800km以上の強風域は？", back: "超大型の台風。" },
  { category: "大きさ", front: "強風域500kmは海里でおよそ何NM？", back: "約270NM。" },
  { category: "大きさ", front: "強風域800kmは海里でおよそ何NM？", back: "約430NM。" },
  { category: "強さ", front: "強い台風の最大風速は？", back: "64KT以上、85KT未満。" },
  { category: "強さ", front: "非常に強い台風の最大風速は？", back: "85KT以上、105KT未満。" },
  { category: "強さ", front: "猛烈な台風の最大風速は？", back: "105KT以上。" },
  { category: "強さ", front: "日本の台風の強さで、64KT以上は？", back: "強い台風。" },
  { category: "強さ", front: "日本の台風の強さで、85KT以上は？", back: "非常に強い台風。" },
  { category: "強さ", front: "日本の台風の強さで、105KT以上は？", back: "猛烈な台風。" },
  { category: "英文", front: "MAX WINDS 85 KT NEAR CENTER の意味は？", back: "中心付近の最大風速が85ノットという意味。日本の強さでは「非常に強い」にあたる。" },
  { category: "英文", front: "GUST 120 KT の意味は？", back: "最大瞬間風速が120ノットという意味。" },
  { category: "英文", front: "最大風速と最大瞬間風速の違いは？", back: "最大風速は平均的な風の強さ、最大瞬間風速は一瞬で吹く最も強い風。" },
  { category: "英文", front: "OVER 50 KT WITHIN 60 NM の意味は？", back: "中心から60海里以内で、50KT以上の風が吹いているという意味。" },
  { category: "英文", front: "暴風域とは？", back: "強い風、一般に25m/s以上の風が吹く範囲。" },
  { category: "英文", front: "OVER 30 KT WITHIN 180 NM NW-SEMICIRCLE の意味は？", back: "北西側半円では、中心から180海里以内で30KT以上の風が吹いているという意味。" },
  { category: "英文", front: "140 NM ELSEWHERE の意味は？", back: "それ以外の方向では、中心から140海里以内という意味。" },
  { category: "英文", front: "台風の大きさを英文で見るとき、注目する風速は？", back: "OVER 30 KT の範囲。" },
  { category: "略号", front: "T は何の意味？", back: "Tropical Cyclone または Typhoon の意味。熱帯低気圧・台風の中心を示す記号。" },
  { category: "略号", front: "TD とは？", back: "Tropical Depression。最大風速34KT未満の熱帯低気圧。まだ台風ではない。" },
  { category: "略号", front: "TS とは？", back: "Tropical Storm。最大風速34KT以上48KT未満。日本ではこの段階から台風扱い。" },
  { category: "略号", front: "STS とは？", back: "Severe Tropical Storm。最大風速48KT以上64KT未満。台風だが、日本式の「強い台風」にはまだ届かない。" },
  { category: "略号", front: "TY / T とは？", back: "Typhoon。最大風速64KT以上の発達した台風。" },
  { category: "略号", front: "TD の覚え方は？", back: "まだ台風ではない熱帯低気圧。" },
  { category: "略号", front: "TS の覚え方は？", back: "台風になったばかり程度。" },
  { category: "略号", front: "STS の覚え方は？", back: "台風としてかなり発達。" },
  { category: "略号", front: "T / TY の覚え方は？", back: "さらに発達した台風。" },
  { category: "略号", front: "34KT未満の表記は？", back: "TD。Tropical Depression。" },
  { category: "略号", front: "34KT以上48KT未満の表記は？", back: "TS。Tropical Storm。" },
  { category: "略号", front: "48KT以上64KT未満の表記は？", back: "STS。Severe Tropical Storm。" },
  { category: "強さ", front: "64KT以上85KT未満の表記と強さは？", back: "TY / T。日本の強さでは「強い」。" },
  { category: "強さ", front: "85KT以上105KT未満の表記と強さは？", back: "TY / T。日本の強さでは「非常に強い」。" },
  { category: "強さ", front: "105KT以上の表記と強さは？", back: "TY / T。日本の強さでは「猛烈な」。" },
  { category: "整理", front: "日本では最大風速何KT以上で台風扱い？", back: "34KT以上。" },
  { category: "整理", front: "国際的な台風関連の表記は、どのように分かれる？", back: "TD、TS、STS、T / TY のように細かく分けて表す。" },
  { category: "整理", front: "台風の強さと大きさで混同しやすい点は？", back: "強さは最大風速で決まり、大きさは30KT以上の強風域の半径で決まる。" },
  { category: "整理", front: "「強い台風」と「大型の台風」の違いは？", back: "強い台風は風速の強さ、大型の台風は強風域の広さを表す。" },
  { category: "分類表", front: "TD・TS・STS・TY は何を表す分類？", back: "熱帯低気圧の発達段階・国際的な分類。" },
  { category: "分類表", front: "「強い・非常に強い・猛烈な」は何を表す？", back: "日本で台風の最大風速に応じて付ける強さの表現。" },
  { category: "分類表", front: "TD・TS・STS・TY と日本の強さ表現の違いは？", back: "TD・TS・STS・TY は国際的な発達段階。\n強い・非常に強い・猛烈な は日本の台風の強さ表現。" },
  { category: "分類表", front: "最大風速34KT未満の表記・英語・意味・日本の強さ表現は？", back: "表記: TD\n英語: Tropical Depression\n意味: 狭義の熱帯低気圧。まだ台風ではない\n日本の強さ表現: なし" },
  { category: "分類表", front: "最大風速34KT以上48KT未満の表記・英語・意味・日本の強さ表現は？", back: "表記: TS\n英語: Tropical Storm\n意味: 熱帯暴風雨。日本ではこの段階から台風扱い\n日本の強さ表現: なし" },
  { category: "分類表", front: "最大風速48KT以上64KT未満の表記・英語・意味・日本の強さ表現は？", back: "表記: STS\n英語: Severe Tropical Storm\n意味: 強い熱帯暴風雨。台風だが、まだ「強い台風」表現には届かない\n日本の強さ表現: なし" },
  { category: "分類表", front: "最大風速64KT以上85KT未満の表記・英語・意味・日本の強さ表現は？", back: "表記: TY / T\n英語: Typhoon\n意味: 台風\n日本の強さ表現: 強い" },
  { category: "分類表", front: "最大風速85KT以上105KT未満の表記・英語・意味・日本の強さ表現は？", back: "表記: TY / T\n英語: Typhoon\n意味: 台風\n日本の強さ表現: 非常に強い" },
  { category: "分類表", front: "最大風速105KT以上の表記・英語・意味・日本の強さ表現は？", back: "表記: TY / T\n英語: Typhoon\n意味: 台風\n日本の強さ表現: 猛烈な" },
  { category: "分類表", front: "64KT以上になると、表記と日本の強さ表現はどう整理する？", back: "64KT以上で TY / T = Typhoon。\nその中で、64KT以上は「強い」、85KT以上は「非常に強い」、105KT以上は「猛烈な」。" },
  { category: "分類表", front: "ノットとm/s換算で注意することは？", back: "1KT ≒ 0.514m/s。\nm/s換算では少し丸めがあるので、ノットは目安として見る。" },
  { category: "中心確度", front: "中心位置の確度とは？", back: "台風の中心位置を、どれくらい正確に決められているかを表すもの。" },
  { category: "中心確度", front: "中心位置の確度「正確 GOOD」とは？", back: "おおむね55km、30海里以下。" },
  { category: "中心確度", front: "中心位置の確度「ほぼ正確 FAIR」とは？", back: "おおむね55km超から110km、60海里以下。" },
  { category: "中心確度", front: "中心位置の確度「不確実 POOR」とは？", back: "おおむね110km超。" },
  { category: "中心確度", front: "中心位置の確度は、予報が当たる確率のこと？", back: "いいえ。\n現在の台風中心を解析したときの、位置の確からしさを表す。" },
  { category: "中心確度", front: "台風の中心位置は何から決める？", back: "衛星画像、レーダー、地上観測などから決める。" },
  { category: "中心確度", front: "どんなときに中心位置が不確実になりやすい？", back: "台風の目がはっきりしない場合など。" },
  { category: "中心確度", front: "中心位置の確度の覚え方は？", back: "中心位置の確度 = 今の中心がどれくらい正確に決められているか。" }
];

const STORAGE_KEYS = {
  filter: "typhoonFlashcards.filter",
  index: "typhoonFlashcards.index",
  remembered: "typhoonFlashcards.remembered",
  again: "typhoonFlashcards.again"
};

const progress = document.getElementById("progress");
const flashcard = document.getElementById("flashcard");
const categoryLabel = document.getElementById("categoryLabel");
const backCategoryLabel = document.getElementById("backCategoryLabel");
const frontText = document.getElementById("frontText");
const backText = document.getElementById("backText");
const flipButton = document.getElementById("flipButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const shuffleButton = document.getElementById("shuffleButton");
const restartButton = document.getElementById("restartButton");
const rememberedButton = document.getElementById("rememberedButton");
const againButton = document.getElementById("againButton");
const rememberedCount = document.getElementById("rememberedCount");
const againCount = document.getElementById("againCount");
const resetButton = document.getElementById("resetButton");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));

let currentFilter = localStorage.getItem(STORAGE_KEYS.filter) || "すべて";
let currentIndex = Number(localStorage.getItem(STORAGE_KEYS.index)) || 0;
let isBackVisible = false;
let deckCards = [];
let rememberedCards = loadSet(STORAGE_KEYS.remembered);
let againCards = loadSet(STORAGE_KEYS.again);

function loadSet(key) {
  try {
    const values = JSON.parse(localStorage.getItem(key) || "[]");
    return new Set(Array.isArray(values) ? values : []);
  } catch {
    return new Set();
  }
}

function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify(Array.from(set)));
}

function cardId(card) {
  return `${card.category}:${card.front}`;
}

function highlightImportant(text) {
  return text.replace(/(15m\/s|25m\/s|30KT|30海里|34KT|48KT|50KT|55km|60海里|64KT|85KT|105KT|110km|120ノット|140海里|180海里|270NM|430NM|500km|800km|0\.514m\/s|TD|TS|STS|TY|GOOD|FAIR|POOR|Tropical Depression|Tropical Storm|Severe Tropical Storm|Typhoon|MAX WINDS|GUST|OVER 30 KT|OVER 50 KT|NW-SEMICIRCLE|ELSEWHERE)/g, '<span class="important">$1</span>');
}

function refreshDeck() {
  deckCards = currentFilter === "すべて"
    ? [...cards]
    : cards.filter((card) => card.category === currentFilter);

  if (currentIndex >= deckCards.length) {
    currentIndex = 0;
  }
}

function savePosition() {
  localStorage.setItem(STORAGE_KEYS.filter, currentFilter);
  localStorage.setItem(STORAGE_KEYS.index, String(currentIndex));
}

function showFront() {
  isBackVisible = false;
  flashcard.classList.remove("is-back");
  flipButton.textContent = "答えを見る";
}

function showBack() {
  isBackVisible = true;
  flashcard.classList.add("is-back");
  flipButton.textContent = "問題に戻る";
}

function flipCard() {
  isBackVisible ? showFront() : showBack();
}

function renderCard() {
  refreshDeck();
  const card = deckCards[currentIndex];

  progress.textContent = `${currentIndex + 1} / ${deckCards.length}`;
  categoryLabel.textContent = card.category;
  backCategoryLabel.textContent = `${card.category}の答え`;
  frontText.innerHTML = highlightImportant(card.front);
  backText.innerHTML = highlightImportant(card.back);

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
  });

  rememberedCount.textContent = rememberedCards.size;
  againCount.textContent = againCards.size;
  showFront();
  savePosition();
}

function moveCard(step) {
  currentIndex = (currentIndex + step + deckCards.length) % deckCards.length;
  renderCard();
}

function shuffleCards() {
  for (let i = deckCards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckCards[i], deckCards[j]] = [deckCards[j], deckCards[i]];
  }
  currentIndex = 0;
  renderCard();
}

function markCard(target) {
  const id = cardId(deckCards[currentIndex]);
  if (target === "remembered") {
    rememberedCards.add(id);
    againCards.delete(id);
  } else {
    againCards.add(id);
    rememberedCards.delete(id);
  }
  saveSet(STORAGE_KEYS.remembered, rememberedCards);
  saveSet(STORAGE_KEYS.again, againCards);
  renderCard();
}

flashcard.addEventListener("click", flipCard);
flipButton.addEventListener("click", flipCard);
prevButton.addEventListener("click", () => moveCard(-1));
nextButton.addEventListener("click", () => moveCard(1));
shuffleButton.addEventListener("click", shuffleCards);
restartButton.addEventListener("click", () => {
  currentIndex = 0;
  renderCard();
});

rememberedButton.addEventListener("click", () => markCard("remembered"));
againButton.addEventListener("click", () => markCard("again"));

resetButton.addEventListener("click", () => {
  rememberedCards.clear();
  againCards.clear();
  localStorage.removeItem(STORAGE_KEYS.remembered);
  localStorage.removeItem(STORAGE_KEYS.again);
  renderCard();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    currentIndex = 0;
    renderCard();
  });
});

renderCard();
