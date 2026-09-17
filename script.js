const quotes = {
  arabic: [
    'الكتابة السريعة تحتاج إلى تركيز مستمر وممارسة منتظمة حتى تتقن الحركات الصغيرة في أصابعك.',
    'عند التدريب اليومي على لوحة المفاتيح ستلاحظ تحسنًا واضحًا في السرعة والدقة مع مرور الوقت.',
    'التعلم يتطلب الصبر والمراجعة المستمرة، فكل دقيقة تمر على الحروف ترفع مهارتك أكثر من السابق.',
    'اللغة العربية غنية بالأصوات والتراكيب، لذلك من المهم أن تركز على الدقة قبل زيادة السرعة.'
  ],
  english: [
    'Typing fast is a skill that improves with consistent practice and calm focus every single day.',
    'Great typists do not only move quickly, they also stay accurate and confident while building rhythm.',
    'The more you practice, the more your fingers remember the keyboard and your speed becomes natural.',
    'Accuracy matters as much as speed, because clean typing helps you stay productive and error-free.'
  ]
};

const state = {
  language: 'arabic',
  quote: '',
  started: false,
  finished: false,
  timeLeft: 60,
  timerId: null,
  correctChars: 0,
  mistakes: 0,
  typedChars: 0
};

const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('typing-input');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const timeEl = document.getElementById('time');
const mistakesEl = document.getElementById('mistakes');
const modeLabelEl = document.getElementById('mode-label');
const newTestBtn = document.getElementById('new-test');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const langButtons = document.querySelectorAll('.lang-btn');
const typingPanelEl = document.querySelector('.typing-panel');
const progressBarEl = document.getElementById('progress-bar');
const resultEl = document.getElementById('result');
const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggleBtn.setAttribute('aria-pressed', String(theme === 'dark'));
}

function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem('typesprint-theme');
  } catch (error) {
    saved = null;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem('typesprint-theme', next);
  } catch (error) {
    // Storage unavailable; theme still applies for this visit.
  }
}

function getRandomQuote(language) {
  const list = quotes[language];
  return list[Math.floor(Math.random() * list.length)];
}

function setLanguage(language) {
  state.language = language;
  langButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  modeLabelEl.textContent = `الوضع: ${language === 'arabic' ? 'عربي' : 'English'}`;
  quoteEl.classList.toggle('rtl', language === 'arabic');
  quoteEl.classList.toggle('en', language === 'english');
  quoteEl.setAttribute('lang', language === 'arabic' ? 'ar' : 'en');
  typingPanelEl.classList.toggle('is-en', language === 'english');
  inputEl.setAttribute('dir', language === 'arabic' ? 'rtl' : 'ltr');
  inputEl.placeholder = language === 'arabic' ? 'ابدأ الكتابة هنا...' : 'Start typing here...';
  selectNewQuote();
}

function selectNewQuote() {
  state.quote = getRandomQuote(state.language);
  state.started = false;
  state.finished = false;
  state.timeLeft = 60;
  state.correctChars = 0;
  state.mistakes = 0;
  state.typedChars = 0;

  clearInterval(state.timerId);
  state.timerId = null;

  inputEl.value = '';
  inputEl.disabled = false;
  resultEl.hidden = true;
  progressBarEl.style.transform = 'scaleX(0)';
  inputEl.focus();
  renderQuote();
  highlightQuote();
  updateStats();
}

function renderQuote() {
  quoteEl.innerHTML = '';

  state.quote.split('').forEach((char, index) => {
    const charEl = document.createElement('span');
    charEl.className = 'char';
    charEl.textContent = char;
    charEl.dataset.index = index;
    quoteEl.appendChild(charEl);
  });
}

function updateStats() {
  const minutes = (60 - state.timeLeft) / 60 || 0;
  const wpm = state.correctChars === 0 || minutes <= 0 ? 0 : Math.round(state.correctChars / 5 / minutes);
  const accuracy = state.typedChars === 0 ? 100 : Math.round((state.correctChars / state.typedChars) * 100);

  wpmEl.textContent = String(wpm);
  accuracyEl.textContent = `${accuracy}%`;
  timeEl.textContent = `${state.timeLeft}s`;
  mistakesEl.textContent = String(state.mistakes);
}

function highlightQuote() {
  const typedValue = inputEl.value;
  const chars = Array.from(quoteEl.querySelectorAll('.char'));

  chars.forEach((charEl, index) => {
    charEl.classList.remove('correct', 'incorrect', 'current');

    if (typedValue[index] == null) {
      if (index === typedValue.length && !state.finished) {
        charEl.classList.add('current');
      }
      return;
    }

    if (typedValue[index] === state.quote[index]) {
      charEl.classList.add('correct');
    } else {
      charEl.classList.add('incorrect');
    }
  });
}

function calculateMetrics() {
  const typedValue = inputEl.value;
  state.typedChars = typedValue.length;
  state.correctChars = 0;
  state.mistakes = 0;

  for (let i = 0; i < typedValue.length; i += 1) {
    if (typedValue[i] === state.quote[i]) {
      state.correctChars += 1;
    } else {
      state.mistakes += 1;
    }
  }

  updateStats();
}

function startTimer() {
  if (state.started || state.finished) {
    return;
  }

  state.started = true;
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    updateStats();

    if (state.timeLeft <= 0) {
      finishTest();
    }
  }, 1000);
}

function finishTest() {
  if (state.finished) {
    return;
  }

  state.finished = true;
  clearInterval(state.timerId);
  inputEl.disabled = true;
  inputEl.blur();
  updateStats();
  highlightQuote();

  const isArabic = state.language === 'arabic';
  resultEl.textContent = isArabic
    ? `انتهى الاختبار: ${wpmEl.textContent} كلمة في الدقيقة بدقة ${accuracyEl.textContent}. اضغط "نص جديد" للمحاولة مرة أخرى.`
    : `Test complete: ${wpmEl.textContent} WPM at ${accuracyEl.textContent} accuracy.`;
  resultEl.dir = isArabic ? 'rtl' : 'ltr';
  resultEl.hidden = false;
}

function handleTyping(event) {
  if (!state.started && event.target.value.length > 0) {
    startTimer();
  }

  if (state.finished) {
    return;
  }

  calculateMetrics();
  highlightQuote();
  const progress = Math.min(inputEl.value.length / state.quote.length, 1);
  progressBarEl.style.transform = `scaleX(${progress})`;

  if (inputEl.value === state.quote) {
    finishTest();
  }
}

langButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.language);
  });
});

newTestBtn.addEventListener('click', selectNewQuote);
startBtn.addEventListener('click', () => {
  inputEl.focus();
  startTimer();
});
resetBtn.addEventListener('click', selectNewQuote);
inputEl.addEventListener('input', handleTyping);

themeToggleBtn.addEventListener('click', toggleTheme);

initTheme();
setLanguage('arabic');
