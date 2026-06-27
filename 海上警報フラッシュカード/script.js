const cards = [
  { category: "略号", front: "[W] は何の海上警報？", back: "海上風警報", note: "最大風速28kt以上34kt未満。まず危ない風が W。" },
  { category: "基準", front: "最大風速28kt以上34kt未満なら？", back: "海上風警報［W］", note: "28ktを超えたら、まず W。" },
  { category: "略号", front: "[GW] は何の海上警報？", back: "海上強風警報", note: "最大風速34kt以上48kt未満。Gale Warning の GW と覚える。" },
  { category: "基準", front: "最大風速34kt以上48kt未満なら？", back: "海上強風警報［GW］", note: "34ktは強風の入口。" },
  { category: "略号", front: "[SW] は何の海上警報？", back: "海上暴風警報", note: "最大風速48kt以上。Storm Warning の SW と覚える。" },
  { category: "基準", front: "最大風速48kt以上なら？", back: "海上暴風警報［SW］", note: "48ktから暴風。ただし台風による64kt以上は海上台風警報。" },
  { category: "略号", front: "[TW] は何の海上警報？", back: "海上台風警報", note: "台風による最大風速64kt以上。Typhoon Warning の TW。" },
  { category: "基準", front: "台風による風が64kt以上なら？", back: "海上台風警報［TW］", note: "台風警報は48ktではなく64kt以上で覚える。" },
  { category: "略号", front: "[FOG] または海上濃霧警報は何を見る？", back: "視程を見る", note: "風速ではなく、見通しの悪さを見る。" },
  { category: "基準", front: "視程0.3海里以下なら？", back: "海上濃霧警報", note: "約500m以下。瀬戸内海では0.5海里以下が基準になる。" },
  { category: "基準", front: "海上警報の風速基準を小さい順に言う", back: "28ktでW、34ktでGW、48ktでSW、台風64ktでTW", note: "合言葉は、28で風、34で強風、48で暴風、64で台風。" },
  { category: "意義", front: "海上警報は誰のために出される？", back: "船舶のため", note: "陸上の人ではなく、海を航行する船の安全のため。" },
  { category: "意義", front: "海上警報の目的は？", back: "船の運航に危険がある気象現象を知らせるため", note: "強い風、暴風、台風、濃霧などによる危険を知らせる。" },
  { category: "意義", front: "海上警報はどんなときに発表される？", back: "基準に達している、または24時間以内に達すると予想されるとき", note: "今危ない場合だけでなく、これから危ない場合にも発表される。" },
  { category: "意義", front: "海上警報で見る場所の単位は？", back: "市町村ではなく海域", note: "陸上警報は市町村など、海上警報は海域単位で見る。" },
  { category: "意義", front: "海上警報で特に重要な気象要素は？", back: "風と視程", note: "風が強いと操船が難しくなり、視程が悪いと衝突や座礁の危険が高まる。" },
  { category: "意義", front: "海上濃霧警報の意義は？", back: "視界不良による衝突・座礁などの危険を知らせる", note: "霧は、風ではなく『見えない危険』。" },
  { category: "意義", front: "海上風警報・強風警報・暴風警報の意義は？", back: "強風・暴風による高波、しけ、操船困難の危険を知らせる", note: "海では風が強いことが、波や操船の危険につながる。" },
  { category: "意義", front: "海上台風警報の意義は？", back: "台風による非常に強い風で、船舶に重大な危険があることを知らせる", note: "海上台風警報は、台風による最大風速64kt以上。" },
  { category: "意義", front: "海上警報の意義を一言で言うと？", back: "船舶の安全な運航のために、海上の危険な気象現象を知らせる警報", note: "合言葉は、海上警報は船を守るための警報。" },
  { category: "ひっかけ注意", front: "台風で48kt以上なら、すぐ海上台風警報［TW］？", back: "いいえ", note: "48kt以上は海上暴風警報［SW］。海上台風警報［TW］は、台風による64kt以上。" },
  { category: "ひっかけ注意", front: "海上濃霧警報は風速で判断する？", back: "いいえ", note: "海上濃霧警報は視程で判断する。基本は0.3海里以下。" }
];

const STORAGE_KEYS = {
  filter: "marineWarningFlashcards.filter",
  index: "marineWarningFlashcards.index",
  remembered: "marineWarningFlashcards.remembered",
  again: "marineWarningFlashcards.again"
};

const progress = document.getElementById("progress");
const flashcard = document.getElementById("flashcard");
const categoryLabel = document.getElementById("categoryLabel");
const backCategoryLabel = document.getElementById("backCategoryLabel");
const frontText = document.getElementById("frontText");
const backArea = document.getElementById("backArea");
const backText = document.getElementById("backText");
const noteText = document.getElementById("noteText");
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
let filteredCards = [];
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
  return text.replace(/(28kt|34kt|48kt|64kt|0\.3海里)/g, '<span class="important">$1</span>');
}

function refreshFilteredCards() {
  filteredCards = currentFilter === "すべて"
    ? [...cards]
    : cards.filter((card) => card.category === currentFilter);
  deckCards = [...filteredCards];

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
  if (isBackVisible) {
    showFront();
  } else {
    showBack();
  }
}

function renderCard() {
  refreshFilteredCards();
  const card = deckCards[currentIndex];

  progress.textContent = `${currentIndex + 1} / ${deckCards.length}`;
  categoryLabel.textContent = card.category;
  backCategoryLabel.textContent = `${card.category}の答え`;
  frontText.innerHTML = highlightImportant(card.front);
  backText.innerHTML = highlightImportant(card.back);
  noteText.innerHTML = highlightImportant(card.note);

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
  renderCardFromCurrentList();
}

function shuffleCards() {
  for (let i = deckCards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckCards[i], deckCards[j]] = [deckCards[j], deckCards[i]];
  }
  currentIndex = 0;
  renderCardFromCurrentList();
}

function renderCardFromCurrentList() {
  const card = deckCards[currentIndex];
  progress.textContent = `${currentIndex + 1} / ${deckCards.length}`;
  categoryLabel.textContent = card.category;
  backCategoryLabel.textContent = `${card.category}の答え`;
  frontText.innerHTML = highlightImportant(card.front);
  backText.innerHTML = highlightImportant(card.back);
  noteText.innerHTML = highlightImportant(card.note);
  rememberedCount.textContent = rememberedCards.size;
  againCount.textContent = againCards.size;
  showFront();
  savePosition();
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
  renderCardFromCurrentList();
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
  renderCardFromCurrentList();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    currentIndex = 0;
    renderCard();
  });
});

renderCard();
