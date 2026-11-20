/**
 * Tamil Kavi (தமிழ் கவி) - Official Website Interactive Engine
 * Includes: Bilingual Localization (EN / TA), Theme Toggle, Live Tanglish->Tamil Phonetic Engine,
 * Interactive Poem Card Customizer, and Account Deletion Request Handler.
 */

// ==========================================================================
// 1. Language & Theme State Initialization
// ==========================================================================
function getCurrentLang() {
  return localStorage.getItem('tamilkavi_lang') || 'ta';
}

function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('tamilkavi_lang', lang);

  const langBtnText = document.getElementById('langBtnText');
  if (langBtnText) {
    langBtnText.textContent = (lang === 'en') ? 'தமிழ்' : 'English';
  }

  // Update input placeholders if present
  const tanglishInput = document.getElementById('tanglishInput');
  if (tanglishInput) {
    tanglishInput.placeholder = (lang === 'en')
      ? "Type here in Tanglish, e.g. vanakkam, thamizh, kavithai, amma, bharathi..."
      : "ஆங்கில எழுத்துக்களில் தட்டச்சு செய்யவும், எ.கா: vanakkam, thamizh, kavithai...";
  }

  const delReason = document.getElementById('delReason');
  if (delReason) {
    delReason.placeholder = (lang === 'en')
      ? "Optional feedback or reason for account deletion..."
      : "ஏதேனும் கருத்துக்கள் இருந்தால் பகிரலாம்...";
  }
}

function initLanguage() {
  const langToggle = document.getElementById('langToggle');
  const savedLang = getCurrentLang();
  applyLanguage(savedLang);

  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const current = getCurrentLang();
      const next = (current === 'ta') ? 'en' : 'ta';
      applyLanguage(next);
    });
  }
}

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('tamilkavi_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = (current === 'light') ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('tamilkavi_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = (theme === 'light') ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// Mobile Drawer Navigation Toggle
function initMobileMenu() {
  const toggle = document.getElementById('mobileNavToggle');
  const menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      const icon = toggle.querySelector('i');
      if (icon) {
        if (menu.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close on nav link click
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }
}

// ==========================================================================
// 2. Phonetic Tamil Transliteration Engine
// ==========================================================================
const TamilTransliteration = {
  vowels: {
    'a': 'அ', 'aa': 'ஆ', 'A': 'ஆ',
    'i': 'இ', 'ii': 'ஈ', 'I': 'ஈ', 'ee': 'ஈ',
    'u': 'உ', 'uu': 'ஊ', 'U': 'ஊ', 'oo': 'ஊ',
    'e': 'எ', 'ea': 'ஏ', 'E': 'ஏ',
    'ai': 'ஐ',
    'o': 'ஒ', 'oa': 'ஓ', 'O': 'ஓ',
    'au': 'ஔ', 'ow': 'ஔ'
  },

  vowelSigns: {
    'a': '', 'aa': 'ா', 'A': 'ா',
    'i': 'ி', 'ii': 'ீ', 'I': 'ீ', 'ee': 'ீ',
    'u': 'ு', 'uu': 'ூ', 'U': 'ூ', 'oo': 'ூ',
    'e': 'ெ', 'ea': 'ே', 'E': 'ே',
    'ai': 'ை',
    'o': 'ொ', 'oa': 'ோ', 'O': 'ோ',
    'au': 'ௌ', 'ow': 'ௌ'
  },

  consonants: {
    'k': 'க்', 'g': 'க்',
    'ng': 'ங்',
    'ch': 'ச்', 's': 'ச்', 'c': 'ச்', 'j': 'ஜ்',
    'nj': 'ஞ்', 'gn': 'ஞ்',
    't': 'ட்', 'd': 'ட்', 'th': 'த்', 'dh': 'த்',
    'N': 'ண்', 'nn': 'ண்',
    'n': 'ந்',
    'p': 'ப்', 'b': 'ப்',
    'm': 'ம்',
    'y': 'ய்',
    'r': 'ர்', 'R': 'ற்',
    'l': 'ல்', 'L': 'ள்', 'zh': 'ழ்', 'z': 'ழ்',
    'v': 'வ்', 'w': 'வ்',
    'sh': 'ஷ்', 'S': 'ஸ்', 'h': 'ஹ'
  },

  dictionary: {
    'vanakkam': 'வணக்கம்',
    'thamizh': 'தமிழ்',
    'tamil': 'தமிழ்',
    'kavithai': 'கவிதை',
    'kavithaigal': 'கவிதைகள்',
    'kavi': 'கவி',
    'kavignar': 'கவிஞர்',
    'bharathi': 'பாரதி',
    'bharathiyar': 'பாரதியார்',
    'amma': 'அம்மா',
    'appa': 'அப்பா',
    'kadhal': 'காதல்',
    'natpu': 'நட்பு',
    'anbu': 'அன்பு',
    'ulagam': 'உலகம்',
    'thunai': 'துணை',
    'nenaivu': 'நினைவு',
    'ninaivu': 'நினைவு',
    'kanavu': 'கனவு',
    'vazhkai': 'வாழ்க்கை',
    'vaazhkai': 'வாழ்க்கை',
    'nilavu': 'நிலவு',
    'thendral': 'தென்றல்',
    'mazhai': 'மழை',
    'pesu': 'பேசு',
    'ezhuthu': 'எழுது',
    'ezhuthungal': 'எழுதுங்கள்',
    'vasiyungal': 'வாசியுங்கள்',
    'pagirungal': 'பகிருங்கள்',
    'pagir': 'பகிர்',
    'yaathum': 'யாதும்',
    'yathum': 'யாதும்',
    'oore': 'ஊரே',
    'yaavarum': 'யாவரும்',
    'yavarum': 'யாவரும்',
    'kelir': 'கேளிர்',
    'nandri': 'நன்றி',
    'sol': 'சொல்',
    'vizhi': 'விழி',
    'uyir': 'உயிர்',
    'manam': 'மனம்',
    'ithayam': 'இதயம்'
  },

  transliterateWord(word) {
    if (!word) return '';
    const lower = word.toLowerCase();
    if (this.dictionary[lower]) {
      return this.dictionary[lower];
    }

    let result = '';
    let i = 0;
    const len = word.length;

    while (i < len) {
      let matchedConsonant = null;
      let consLen = 0;

      if (i + 2 <= len) {
        const sub2 = word.substring(i, i + 2).toLowerCase();
        if (this.consonants[sub2]) {
          matchedConsonant = this.consonants[sub2];
          consLen = 2;
        }
      }

      if (!matchedConsonant && i + 1 <= len) {
        const sub1 = word[i];
        const sub1Lower = sub1.toLowerCase();
        if (this.consonants[sub1] || this.consonants[sub1Lower]) {
          matchedConsonant = this.consonants[sub1] || this.consonants[sub1Lower];
          consLen = 1;
        }
      }

      if (matchedConsonant) {
        i += consLen;
        let vowelLen = 0;
        let vowelSign = '';

        if (i + 2 <= len) {
          const v2 = word.substring(i, i + 2).toLowerCase();
          if (this.vowelSigns[v2] !== undefined) {
            vowelSign = this.vowelSigns[v2];
            vowelLen = 2;
          }
        }

        if (vowelLen === 0 && i + 1 <= len) {
          const v1 = word[i];
          const v1Lower = v1.toLowerCase();
          if (this.vowelSigns[v1] !== undefined || this.vowelSigns[v1Lower] !== undefined) {
            vowelSign = (this.vowelSigns[v1] !== undefined) ? this.vowelSigns[v1] : this.vowelSigns[v1Lower];
            vowelLen = 1;
          }
        }

        if (vowelLen > 0) {
          const baseCons = matchedConsonant.replace('்', '');
          result += baseCons + vowelSign;
          i += vowelLen;
        } else {
          result += matchedConsonant;
        }
      } else {
        let vowelLen = 0;
        let standaloneVowel = '';

        if (i + 2 <= len) {
          const v2 = word.substring(i, i + 2).toLowerCase();
          if (this.vowels[v2]) {
            standaloneVowel = this.vowels[v2];
            vowelLen = 2;
          }
        }

        if (vowelLen === 0 && i + 1 <= len) {
          const v1 = word[i];
          const v1Lower = v1.toLowerCase();
          if (this.vowels[v1] || this.vowels[v1Lower]) {
            standaloneVowel = this.vowels[v1] || this.vowels[v1Lower];
            vowelLen = 1;
          }
        }

        if (vowelLen > 0) {
          result += standaloneVowel;
          i += vowelLen;
        } else {
          result += word[i];
          i++;
        }
      }
    }

    return result;
  },

  transliterateText(text) {
    if (!text) return '';
    return text.replace(/[a-zA-Z]+/g, (match) => {
      return this.transliterateWord(match);
    });
  }
};

// ==========================================================================
// 3. Interactive Typing Demo
// ==========================================================================
function initTypingDemo() {
  const inputEl = document.getElementById('tanglishInput');
  const outputEl = document.getElementById('tamilOutput');
  const sampleTags = document.querySelectorAll('.sample-tag');

  if (inputEl && outputEl) {
    const defaultText = "kavithai ezhuthuvom thamizhil\nyathum oore yavarum kelir!";
    inputEl.value = defaultText;
    outputEl.textContent = TamilTransliteration.transliterateText(defaultText);

    inputEl.addEventListener('input', () => {
      const raw = inputEl.value;
      if (!raw.trim()) {
        const isEn = (getCurrentLang() === 'en');
        outputEl.textContent = isEn ? "Your Tamil verse will appear here..." : "இங்கே உங்கள் தமிழ் கவிதை வரிகள் தோன்றும்...";
      } else {
        outputEl.textContent = TamilTransliteration.transliterateText(raw);
      }
    });

    sampleTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const text = tag.getAttribute('data-sample') || tag.textContent;
        inputEl.value = text;
        outputEl.textContent = TamilTransliteration.transliterateText(text);
      });
    });
  }
}

// ==========================================================================
// 4. Account Deletion Request Form
// ==========================================================================
function initAccountDeletionForm() {
  const form = document.getElementById('accountDeletionForm');
  const statusMsg = document.getElementById('deletionStatusMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('delEmail').value.trim();
      const uid = document.getElementById('delUid').value.trim();
      const reason = document.getElementById('delReason').value.trim();

      if (!email) {
        const isEn = (getCurrentLang() === 'en');
        alert(isEn ? 'Please enter your registered account email.' : 'தயவுசெய்து உங்கள் கணக்கு மின்னஞ்சலை உள்ளிடவும்.');
        return;
      }

      const subject = encodeURIComponent(`Tamil Kavi Account Deletion Request - ${email}`);
      const body = encodeURIComponent(
        `Dear Tamil Kavi Support Team,\n\nI am requesting permanent deletion of my account and personal data from Tamil Kavi (com.kavithaigalvp.app).\n\nAccount Details:\n- Registered Email: ${email}\n- Firebase UID (Optional): ${uid || 'N/A'}\n- Reason / Notes: ${reason || 'User requested deletion'}\n\nI confirm that I understand this will permanently delete my published poems, favorites, profile data, and cloud records.\n\nThank you,\nAccount Owner`
      );

      const mailtoUrl = `mailto:pugazh.developer@gmail.com?subject=${subject}&body=${body}`;

      if (statusMsg) {
        const isEn = (getCurrentLang() === 'en');
        statusMsg.style.display = 'block';
        statusMsg.innerHTML = `
          <div style="background: rgba(212, 175, 55, 0.15); border: 1px solid var(--border-gold); padding: 16px; border-radius: 12px; margin-top: 14px;">
            <p style="color: var(--gold-bright); font-weight: 700; margin-bottom: 6px;">
              ${isEn ? '✓ Request Prepared!' : '✓ கோரிக்கை உருவாக்கப்பட்டது!'}
            </p>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 10px;">
              ${isEn ? 'Click the button below to dispatch the deletion request via your email app.' : 'உங்கள் மின்னஞ்சல் செயலி வழியாக கோரிக்கையை அனுப்ப கீழே உள்ள பொத்தானை அழுத்தவும்.'}
            </p>
            <a href="${mailtoUrl}" class="btn-cta" style="display: inline-flex; font-size: 0.88rem; padding: 8px 16px;">
              📧 ${isEn ? 'Send Deletion Email Now' : 'மின்னஞ்சல் வழியாக அனுப்பு'}
            </a>
          </div>
        `;
      }

      window.location.href = mailtoUrl;
    });
  }
}

// Global DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initMobileMenu();
  initTypingDemo();
  initAccountDeletionForm();
});
