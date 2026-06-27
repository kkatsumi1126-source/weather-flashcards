const cards = presentWeatherMajorCards;

const STORAGE_KEYS = {
  filter: "presentWeatherFlashcards.filter",
  index: "presentWeatherFlashcards.index",
  remembered: "presentWeatherFlashcards.remembered",
  again: "presentWeatherFlashcards.again"
};

const progress = document.getElementById("progress");
const flashcard = document.getElementById("flashcard");
const categoryLabel = document.getElementById("categoryLabel");
const backCategoryLabel = document.getElementById("backCategoryLabel");
const symbolImage = document.getElementById("symbolImage");
const symbolFallback = document.getElementById("symbolFallback");
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
  return text.replace(/(ww \d{2}|00〜03|20〜29|40番台|50番台|60番台|70番台|80番台|90番台|48・49|56・57|66・67|68・69|83・84|85・86|89・90|95|96|97|99|霧|霧雨|雨|雪|雷|雷電|着氷性|しゅう雨|しゅう雪|ひょう|あられ|スコール|竜巻|水上竜巻|視程)/g, '<span class="important">$1</span>');
}

function getWwNumber(card) {
  const match = card.front.match(/ww\s*(\d{2})/);
  return match ? match[1] : "";
}

function renderFrontSymbol(card) {
  const wwNumber = getWwNumber(card);
  const imagePath = card.image || (wwNumber ? `symbols/ww_${wwNumber}.png` : "");

  symbolFallback.textContent = wwNumber ? `ww ${wwNumber}` : "ww";
  symbolFallback.hidden = false;
  symbolImage.hidden = true;
  symbolImage.removeAttribute("src");
  symbolImage.alt = wwNumber ? `ww ${wwNumber} の天気記号` : "天気記号";

  if (!imagePath) {
    return;
  }

  symbolImage.onload = () => {
    symbolImage.hidden = false;
    symbolFallback.hidden = true;
  };
  symbolImage.onerror = () => {
    symbolImage.hidden = true;
    symbolFallback.hidden = false;
  };
  symbolImage.src = imagePath;
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
  renderFrontSymbol(card);
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
