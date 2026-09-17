<div align="center">

# ⌨️ TypeSprint

**موقع بسيط لتعلّم الكتابة السريعة يدعم اللغتين العربية والإنجليزية**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-0d9488?style=flat)

</div>

---

## 🎯 نظرة عامة

**TypeSprint** أداة تدريب على الكتابة السريعة تعمل في المتصفح مباشرة، بدون أي مكتبات أو أدوات بناء. اكتب النص المعروض خلال 60 ثانية، وتابع سرعتك ودقتك لحظة بلحظة.

## ✨ الميزات

- 🇸🇦 / 🇬🇧 **لغتان** — تدريب باللغة العربية (RTL) والإنجليزية.
- ⚡ **عدّاد السرعة (WPM)** يُحدَّث أثناء الكتابة.
- 🎯 **نسبة الدقة** وعدّاد الأخطاء.
- ⏱️ **مؤقّت 60 ثانية** مع شريط تقدّم.
- 🌗 **وضع فاتح وداكن** يتذكّر اختيارك.
- 🎨 **تلوين مباشر** للحروف: الصحيح أخضر، والخطأ أحمر بخط متموّج.
- ♿ **إتاحة (Accessibility)** — تباين ألوان، تنقّل بلوحة المفاتيح، وتسميات ARIA.
- 📱 **تصميم متجاوب** يعمل على الجوال والحاسب.

## 🚀 التشغيل

الموقع لا يحتاج تثبيت أي شيء. شغّل خادمًا محليًا بسيطًا:

```bash
cd typeing
python3 -m http.server 8000
```

ثم افتح في المتصفح:

```text
http://localhost:8000
```

> يمكن أيضًا فتح ملف `index.html` مباشرة، لكن الخادم المحلي أفضل لتحميل الخطوط بشكل صحيح.

## 🗂️ بنية المشروع

```text
typeing/
├── index.html   # هيكل الصفحة
├── styles.css   # التصميم ونظام الألوان (فاتح/داكن)
├── script.js    # منطق الاختبار والإحصائيات
└── README.md
```

## 🛠️ التقنيات

- HTML5 + CSS3 (متغيّرات CSS، Grid، Flexbox)
- JavaScript خام (Vanilla) — بلا أي اعتماديات
- خطوط Google: Noto Sans Arabic · Inter · JetBrains Mono

## 📄 الرخصة

مشروع تعليمي مفتوح للاستخدام الشخصي.
