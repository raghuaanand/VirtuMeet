import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VirtuMeet - Premium Video Conferencing",
  description: "Experience the future of video conferencing with VirtuMeet's premium features",
  keywords: "video conferencing, virtual meetings, collaboration, VirtuMeet",
  authors: [{ name: "VirtuMeet Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#667eea",
  icons: {
    icon: "/icons/logo.svg",
    shortcut: "/icons/logo.svg",
    apple: "/icons/logo.svg",
  },
  openGraph: {
    title: "VirtuMeet - Premium Video Conferencing",
    description: "Experience seamless video conferencing with advanced features",
    type: "website",
    images: ["/icons/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/VirtuMeet-logo.svg",
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
        },
      }}
      // Enable multiple sessions for the same account
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <html lang="en" className="dark">
        <body className={cn(inter.className, "bg-gradient-to-br from-gray-900 via-slate-900 to-black min-h-screen")}>
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
          <Toaster 
            position="top-center" 
            toastOptions={{
              className: 'glass-morphism-dark border border-white/10 text-white',
              duration: 4000,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
