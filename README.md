# Value Validator

**The Automated Strategy Consultant. Porter. Buffett. Collins. In one tool.**

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Google AI API key:
     ```env
     GOOGLE_AI_API_KEY=your-google-ai-api-key-here
     ```
   - Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## 🛠️ Build for Production

```bash
npm run build
npm start
```

## 📦 Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add `GOOGLE_AI_API_KEY` environment variable in Vercel dashboard
4. Deploy

## 🔧 Tech Stack

- Next.js 15.1.9+ (App Router)
- TypeScript
- Tailwind CSS
- Google Gemini API (Gemini 1.5 Pro)

## 📝 Features

- Real-time business idea validation
- Three strategic framework analysis (Porter, Buffett, Collins)
- Metron Value Score (0-100)
- Downloadable strategic assessment reports
- Rate limiting (5 validations per hour per IP)

## ⚠️ Requirements

- Node.js 18+
- Google AI API key (get it free from [Google AI Studio](https://aistudio.google.com/app/apikey))
- Next.js 15.1.9+ (required for Vercel deployment)

## 🎯 How It Works

1. Enter your business idea in the form
2. The system consults three strategic frameworks:
   - **Michael Porter**: Five Forces & Barriers to Entry
   - **Warren Buffett**: Value Investing & Economic Moats
   - **Jim Collins**: Good to Great Flywheel Effect
3. Receive a comprehensive analysis with scores and insights
4. Get a final Metron Value Score and verdict
5. Download your strategic assessment report

## 📄 License

Consultant License - $499

---

**Powered by Metron Ventures**

