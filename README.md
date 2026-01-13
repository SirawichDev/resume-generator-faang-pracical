# FAANG Resume Generator

A professional, ATS-friendly resume builder based on [Tech Interview Handbook](https://www.techinterviewhandbook.org/resume/) principles. Perfect for software engineers applying to top tech companies like FAANG (Facebook/Meta, Amazon, Apple, Netflix, Google).

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

### 🎯 ATS-Friendly Format
- **Standard fonts** (Arial) at readable sizes (10-12pt)
- **Clean structure** with proper sections and spacing
- **Machine-readable** text (all content is highlightable)
- **Standard section ordering** for optimal ATS parsing

### 📝 Complete Resume Sections
- **Contact Information** - Name, email, phone, location, LinkedIn, GitHub, portfolio
- **Professional Summary** - Concise career overview
- **Technical Skills** - Organized by category (Languages, Frameworks, etc.)
- **Work Experience** - Multiple roles with accomplishments
- **Projects** - Personal/professional projects with highlights
- **Education** - Degrees, honors, and GPA
- **Awards & Certifications** - Professional achievements

### 💾 Smart Features
- **Auto-save** - Changes persist in localStorage
- **Live preview** - See your resume update in real-time
- **PDF export** - Download professional PDF with one click
- **Responsive design** - Works on desktop and mobile
- **Dark mode support** - Modern UI with glassmorphism effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository or navigate to the project:
```bash
cd /Users/sirawit0676/Desktop/Projects/resume-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📖 Usage

1. **Fill out Contact Information** - Start with your basic details
2. **Add Professional Summary** - 2-3 sentences about your experience
3. **Add Technical Skills** - Organize by categories
4. **Add Work Experience** - Include accomplishments using the action-result format
5. **Add Projects** - Showcase your best work
6. **Add Education** - Include degrees and honors
7. **Add Awards** - Certifications and achievements
8. **Download PDF** - Export your professional resume

### 💡 Tips for Success

- Use **action verbs** in accomplishments (Built, Developed, Implemented, Led)
- Follow the **action-result format**: "[Action] that resulted in [quantifiable outcome]"
- Include **quantifiable metrics** (40% improvement, 1M users, $500K savings)
- Add **relevant keywords** from job descriptions
- Keep it **concise** - ideally 1 page, max 2 pages

## 🏗️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
resume-generator/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── ResumeForm/        # Form components for each section
│   └── ResumePreview/     # Live resume preview
├── lib/
│   ├── resume-store.ts    # Zustand state management
│   ├── pdf-generator.ts   # PDF export logic
│   └── utils.ts           # Utility functions
└── types/
    └── resume.ts          # TypeScript interfaces
```

## 🎨 Design Principles

Following [Tech Interview Handbook](https://www.techinterviewhandbook.org/resume/) guidelines:

1. ✅ Use standard fonts (Arial, Calibri, Garamond)
2. ✅ Maintain readable font sizes (minimum 10pt)
3. ✅ Standard section headings and ordering
4. ✅ No complex graphics or formatting
5. ✅ Easily parseable by ATS systems
6. ✅ Clean, professional appearance

## 🔧 Customization

### Adding New Sections
1. Define the type in `types/resume.ts`
2. Add store actions in `lib/resume-store.ts`
3. Create form component in `components/ResumeForm/`
4. Add preview rendering in `components/ResumePreview/ResumePreview.tsx`
5. Include in `app/page.tsx`

### Styling
- Global styles: `app/globals.css`
- Component styles: Tailwind CSS classes
- Theme colors: `components.json` (shadcn/ui config)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Resume guidelines: [Tech Interview Handbook](https://www.techinterviewhandbook.org/resume/)
- UI components: [shadcn/ui](https://ui.shadcn.com/)
- Built with: [Next.js](https://nextjs.org/)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Built with ❤️ for software engineers seeking FAANG opportunities**
