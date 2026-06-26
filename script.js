const cards = [
  { category: "雲パターン", front: "クラウドクラスターとは？", back: "積乱雲 Cb が集まってできた大きな雲のかたまり", note: "大雨・雷・激しい対流に注意します。水平スケールは数百kmに達することがあります。" },
  { category: "見たら考えること", front: "クラウドクラスターを見たら何を考える？", back: "大雨・雷・激しい対流", note: "日本付近では梅雨期に大雨をもたらすことがあります。" },
  { category: "雲パターン", front: "バルジとは？", back: "前線に伴う雲バンドが、寒気側・極側へふくらむ形", note: "雲域が発達するほど、ふくらみがはっきりします。" },
  { category: "見たら考えること", front: "バルジを見たら何を考える？", back: "低気圧の発達・前線波動・暖湿気の上昇", note: "試験では、バルジは低気圧発達や暖湿気上昇と結びつけます。" },
  { category: "雲パターン", front: "フックとは？", back: "発達中の雲域の縁が、かぎ針のように曲がる形", note: "雲域後面から寒気が入り始めたサインです。" },
  { category: "見たら考えること", front: "フックを見たら何を考える？", back: "寒気流入・地上低気圧付近", note: "地上低気圧の中心位置とおおよそ対応することがあります。" },
  { category: "雲パターン", front: "トランスバースラインとは？", back: "上空の流れにほぼ直角に並ぶ、小さな波状の巻雲列", note: "ジェット気流付近に現れやすい雲パターンです。" },
  { category: "見たら考えること", front: "トランスバースラインを見たら何を考える？", back: "強いジェット気流・乱気流", note: "通常ジェット気流に沿って現れ、80kt以上の風速を伴うことがあります。" },
  { category: "雲パターン", front: "Ciストリークとは？", back: "細長い筋状の巻雲", note: "Ci は巻雲のことです。" },
  { category: "見たら考えること", front: "Ciストリークを見たら何を考える？", back: "上層の流れ・ジェット気流", note: "ジェットに沿って見られ、下層の雲を発達させることもあります。" },
  { category: "雲パターン", front: "にんじん状雲とは？", back: "風上側が細く、風下側に広がるにんじん形の雲", note: "形で覚えやすい、激しい対流現象のサインです。" },
  { category: "見たら考えること", front: "にんじん状雲を見たら何を考える？", back: "豪雨・突風・雷・降ひょう", note: "特に細い穂先部分で顕著現象を伴いやすいです。" },
  { category: "意味", front: "雲パターンから何が推定できる？", back: "上空の風、ジェット気流、低気圧の発達、大雨・雷の危険", note: "雲の形は、大気の流れ・温度・水蒸気分布・安定度と関係します。" },
  { category: "意味", front: "雲パターンを見る意義は？", back: "大気の立体構造を把握する手がかりになること", note: "衛星画像では、雲の形から上空や下層の状態を推定します。" },
  { category: "略語", front: "Cb とは何のこと？", back: "積乱雲", note: "正式には Cumulonimbus（キュムロニンバス）の略です。" },
  { category: "略語", front: "Cb の特徴は？", back: "強い上昇気流で発達する背の高い雲", note: "大雨・雷・突風・降ひょうなどの激しい現象と関係します。" },
  { category: "試験ポイント", front: "強い雨・積乱雲系に分ける雲パターンは？", back: "クラウドクラスター、にんじん状雲", note: "どちらも対流活動や大雨に注意するパターンです。" },
  { category: "試験ポイント", front: "低気圧の発達を見る雲パターンは？", back: "バルジ、フック", note: "バルジは発達・暖湿気上昇、フックは寒気流入・低気圧付近と覚えます。" },
  { category: "試験ポイント", front: "上空のジェット気流を見る雲パターンは？", back: "Ciストリーク、トランスバースライン", note: "Ciストリークはジェットに沿う、トランスバースラインはジェット付近の乱気流に注意です。" },
  { category: "試験ポイント", front: "バルジのキーワードは？", back: "低気圧発達・暖湿気上昇", note: "前線に伴う雲バンドが寒気側・極側へふくらむ形です。" },
  { category: "試験ポイント", front: "フックのキーワードは？", back: "寒気流入・地上低気圧付近", note: "発達中の雲域の縁がフック状に曲がる形です。" },
  { category: "試験ポイント", front: "Ciストリークのキーワードは？", back: "ジェットに沿う", note: "上層の流れを示す細長い筋状の巻雲です。" },
  { category: "試験ポイント", front: "トランスバースラインのキーワードは？", back: "ジェット付近・乱気流", note: "上空の流れにほぼ直角に並ぶ小さな波状の巻雲列です。" },
  { category: "試験ポイント", front: "にんじん状雲のキーワードは？", back: "激しい対流現象", note: "豪雨・突風・雷・降ひょうに注意します。" }
];

const STORAGE_KEYS = {
  filter: "satelliteCloudPatternFlashcards.filter",
  index: "satelliteCloudPatternFlashcards.index",
  remembered: "satelliteCloudPatternFlashcards.remembered",
  again: "satelliteCloudPatternFlashcards.again"
};

const progress = document.getElementById("progress");
const flashcard = document.getElementById("flashcard");
const categoryLabel = document.getElementById("categoryLabel");
const backCategoryLabel = document.getElementById("backCategoryLabel");
const frontText = document.getElementById("frontText");
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
  return text.replace(/(Cb|Cumulonimbus|数百km|80kt以上|ジェット気流|乱気流|低気圧|大雨|雷|突風|降ひょう|寒気|暖湿気|積乱雲)/g, '<span class="important">$1</span>');
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
  renderCardFromCurrentList();
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
  });
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
