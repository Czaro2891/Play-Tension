// Small modular JS for the prototype

const LS_KEYS = {
  likes: 'cardLikes',
  dislikes: 'cardDislikes',
  survey: 'moodSurvey',
  supervisor: 'supervisorPrompt',
};

/** Utils: LocalStorage JSON */
const readJSON = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const writeJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

/** State */
let cards = [];
let currentCard = null;

/** Elements */
const moodRange = document.getElementById('moodRange');
const moodValue = document.getElementById('moodValue');
const comfortToggle = document.getElementById('comfortToggle');
const saveSurveyBtn = document.getElementById('saveSurvey');

const btnSupervisor = document.getElementById('btnSupervisor');
const supervisorModal = document.getElementById('supervisorModal');
const supervisorForm = document.getElementById('supervisorForm');
const supervisorText = document.getElementById('supervisorText');

const seriesSelect = document.getElementById('seriesSelect');
const difficultySelect = document.getElementById('difficultySelect');
const drawBtn = document.getElementById('drawBtn');

const visibleHint = document.getElementById('visibleHint');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const likeCount = document.getElementById('likeCount');
const dislikeCount = document.getElementById('dislikeCount');

const privateModal = document.getElementById('privateModal');
const privateInstruction = document.getElementById('privateInstruction');
const metaInfo = document.getElementById('metaInfo');

/** Init */
init();

async function init() {
  hydrateSurvey();
  hydrateSupervisor();
  await loadCards();
  updateCounters();
  wireUI();
}

function hydrateSurvey() {
  const survey = readJSON(LS_KEYS.survey, { mood: 5, comfort: false });
  moodRange.value = String(survey.mood ?? 5);
  moodValue.textContent = String(survey.mood ?? 5);
  comfortToggle.checked = Boolean(survey.comfort);
}

function hydrateSupervisor() {
  const txt = localStorage.getItem(LS_KEYS.supervisor) || '';
  supervisorText.value = txt;
}

function wireUI() {
  moodRange.addEventListener('input', () => { moodValue.textContent = moodRange.value; });
  saveSurveyBtn.addEventListener('click', () => {
    const payload = { mood: Number(moodRange.value), comfort: comfortToggle.checked, ts: Date.now() };
    writeJSON(LS_KEYS.survey, payload);
    toast('Zapisano ankietę');
  });

  btnSupervisor.addEventListener('click', () => supervisorModal.showModal());
  supervisorModal.addEventListener('click', (e) => { if (e.target?.dataset?.close !== undefined || e.target === supervisorModal) supervisorModal.close(); });
  supervisorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    applySupervisorPrompt(supervisorText.value);
    supervisorModal.close();
    toast('Zapisano Supervisor Prompt');
  });

  document.querySelectorAll('dialog [data-close]').forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault(); e.currentTarget.closest('dialog')?.close();
  }));

  drawBtn.addEventListener('click', () => {
    const filter = { series: seriesSelect.value || undefined, difficulty: difficultySelect.value || undefined };
    drawCard(filter);
  });

  likeBtn.addEventListener('click', () => { if (currentCard) saveRating(currentCard.id, true); });
  dislikeBtn.addEventListener('click', () => { if (currentCard) saveRating(currentCard.id, false); });

  document.getElementById('btnPrivate').addEventListener('click', () => {
    if (!currentCard) return;
    privateInstruction.textContent = currentCard.privateInstruction || '—';
    metaInfo.innerHTML = `
      <span>Seria: <b>${currentCard.series}</b></span>
      <span>Poziom: <b>${currentCard.difficulty}</b></span>
      <span>Czas: <b>${currentCard.duration}s</b></span>
    `;
    privateModal.showModal();
  });
  privateModal.addEventListener('click', (e) => { if (e.target?.dataset?.close !== undefined || e.target === privateModal) privateModal.close(); });
}

/** Data */
export async function loadCards() {
  const res = await fetch('./cards.json', { cache: 'no-store' });
  cards = await res.json();
}

/** Logic */
export function drawCard(filter = {}) {
  const { series, difficulty } = filter;
  let pool = cards.slice();
  if (series) pool = pool.filter((c) => c.series === series);
  if (difficulty) pool = pool.filter((c) => c.difficulty === difficulty);
  if (pool.length === 0) { toast('Brak kart dla wybranego filtra'); return; }
  const idx = Math.floor(Math.random() * pool.length);
  currentCard = pool[idx];
  visibleHint.textContent = currentCard.visibleHint || '—';
  updateCounters();
}

export function saveRating(cardId, like) {
  const likes = new Set(readJSON(LS_KEYS.likes, []));
  const dislikes = new Set(readJSON(LS_KEYS.dislikes, []));
  if (like) {
    likes.add(cardId); dislikes.delete(cardId);
  } else {
    dislikes.add(cardId); likes.delete(cardId);
  }
  writeJSON(LS_KEYS.likes, Array.from(likes));
  writeJSON(LS_KEYS.dislikes, Array.from(dislikes));
  updateCounters();
}

export function applySupervisorPrompt(text) {
  localStorage.setItem(LS_KEYS.supervisor, String(text || ''));
}

function updateCounters() {
  const likes = new Set(readJSON(LS_KEYS.likes, []));
  const dislikes = new Set(readJSON(LS_KEYS.dislikes, []));
  likeCount.textContent = String(likes.size);
  dislikeCount.textContent = String(dislikes.size);
}

/** UI helpers */
function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  Object.assign(el.style, { position: 'fixed', bottom: '16px', right: '16px', background: '#111827', color: '#e5e7eb', border: '1px solid #1f2937', padding: '8px 12px', borderRadius: '10px', opacity: '0', transition: 'opacity .2s' });
  document.body.appendChild(el);
  requestAnimationFrame(() => el.style.opacity = '1');
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 200); }, 1400);
}


