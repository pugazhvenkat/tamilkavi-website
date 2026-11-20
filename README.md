# தமிழ் கவி (Tamil Kavi) - Official Website & Privacy Portal

> **"உன் வரிகள் உலகை வெல்லட்டும்!"**  
> *எழுதுங்கள், வாசியுங்கள், பகிருங்கள்! தமிழின் கவிதை உலகம்.*

The official landing website, interactive playground, and legal privacy portal for the **Tamil Kavi** Android Application (`com.kavithaigalvp.app`).

---

## 🏛️ Overview of Tamil Kavi App

Tamil Kavi is a dedicated, rich mobile literary sanctuary celebrating classical and contemporary Tamil poetry, featuring:

1. **Ancient Manuscript Aesthetic & Dual Themes**: Royal Parchment (Light) and Dark Chamber (Night) modes with palm-leaf manuscript typography and custom font sizing slider.
2. **In-App Phonetic Tamil Transliteration Engine**: Pure Tamil typing right from English letters (Tanglish to தமிழ்) with smart word suggestion dictionary and context analyzer.
3. **AI Poet Studio & Co-pilot**: Powered by Gemini AI with poetic rhyme heuristics and offline fallback library for verse completion.
4. **Royal Parchment Poem Card Generator**: High-resolution graphic cards with royal wax seal and ancient borders for instant sharing to WhatsApp, Instagram Stories, Facebook, and Telegram.
5. **WhatsApp Status Saver & Direct Chat Companion**: View, play, and save WhatsApp/WhatsApp Business photos and videos to local gallery, plus direct WhatsApp chat without saving contacts.
6. **Secure Cloud Sync & Community**: Google Sign-In, Cloud Firestore sync, author metrics, and **1-Click In-App Account Deletion**.

---

## 🛡️ Google Play Console URLs & Data Safety Compliance

When publishing or updating **Tamil Kavi** on the Google Play Developer Console, use these verified URLs:

| Requirement | Live Web URL | Purpose |
| :--- | :--- | :--- |
| **Privacy Policy URL** | `https://pugazhvenkat.github.io/tamilkavi-website/privacy-policy.html` | Mandatory Google Play Privacy Policy declaration. |
| **User Data & Account Deletion URL** | `https://pugazhvenkat.github.io/tamilkavi-website/delete-account.html` | Mandatory Google Play Data Safety account deletion URL. |
| **Terms of Service** | `https://pugazhvenkat.github.io/tamilkavi-website/terms.html` | User agreement & community standards. |
| **Main Website** | `https://pugazhvenkat.github.io/tamilkavi-website/` | Public app showcase & interactive typing demo. |

---

## 📂 Website Architecture & Files

```tree
tamilkavi-website/
├── index.html              # Main showcase landing page with live interactive Tamil typing demo
├── privacy-policy.html     # Comprehensive Google Play compliant Privacy Policy
├── delete-account.html     # Dedicated Account & Data Deletion request portal
├── terms.html              # Terms of Service & Community Guidelines
├── styles.css              # Ancient Manuscript & Royal Gold CSS Design System
├── script.js               # Tanglish->Tamil transliterator, theme toggle & i18n
├── assets/
│   └── images/
│       ├── app_logo.jpg
│       ├── banner.jpg
│       ├── tamil_kavi_banner.png
│       ├── preview_sangam.jpg
│       ├── preview_realistic.jpg
│       ├── oldletter.jpg
│       ├── fallback_sangam_marutham.jpg
│       └── fallback_realistic_sunset.jpg
└── README.md
```

---

## 📜 Privacy & Security Highlights

- **Storage Permission Justification**: `READ_EXTERNAL_STORAGE` / `WRITE_EXTERNAL_STORAGE` / `READ_MEDIA_IMAGES` / `READ_MEDIA_VIDEO` are strictly used on-device for WhatsApp Status Saver and saving generated poem cards. No user media is uploaded or scanned.
- **Zero Third-Party Data Selling**: User emails and poems are never sold to advertisers or brokers.
- **Direct Deletion**: Users can delete their account directly within the app (Settings -> Account Management -> Delete Account) or via the online form on `delete-account.html`.
- **SDKs Disclosed**: Google Firebase Authentication, Cloud Firestore, Google Mobile Ads (AdMob), and Google Play Services.

---

## 👨‍💻 Developer & Support

- **Developer**: புகழ் வெங்கட்  (Pugazh Venkat)
- **Official Contact**: [pugazh.developer@gmail.com](mailto:pugazh.developer@gmail.com)
- **Package ID**: `com.kavithaigalvp.app`
- **Version**: 1.0.0+1
