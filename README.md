# Aura AI Finder 🚀

A modern AI tool discovery platform that uses intelligent reasoning to match user tasks with the best available AI solutions.

## 🌐 Deployment Guide (The Easiest Way)

If you want to get this app online so others can use it:

### 1. Upload to GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Click the link that says **"uploading an existing file"**.
3. Drag and drop all files from this project into GitHub.
4. Click **"Commit changes"**.

### 2. Connect to Netlify
1. Log in to [Netlify](https://app.netlify.com/) using your GitHub account.
2. Click **"Add new site"** -> **"Import from GitHub"**.
3. Choose your `ai-finder` repository.
4. **Important**: Go to "Site Settings" -> "Environment Variables".
5. Add a variable with the key `API_KEY` and paste your Gemini API Key as the value.
6. Click **Deploy**. Your site will be live at a `.netlify.app` URL!

## 🛠️ Tech Stack
- **Engine**: Google Gemini 3 Flash (GenAI SDK)
- **UI**: React 19 + Tailwind CSS
- **Deployment**: Netlify (Automated via `netlify.toml`)

## 📄 License
MIT License. Created for the AI community.
