import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Sentiment Analyzer - Advanced AI Analytical Engine",
  description: "Advanced AI-powered text analysis tool. Analyze text, audio files, PDFs, and web URLs with intelligent insights and comprehensive reports.",
  keywords: ["AI", "Text Analysis", "Content Analysis", "NLP", "Machine Learning", "Audio Transcription", "PDF Analysis", "URL Analysis"],
  authors: [{ name: "AI Analyzer Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sentiment Analyzer",
    description: "Advanced AI-powered text analysis tool for comprehensive content insights",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentiment Analyzer",
    description: "Advanced AI-powered text analysis tool for comprehensive content insights",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
