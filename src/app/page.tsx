import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Collections } from "@/components/landing/Collection";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      <Navbar />

      <main id="main-content">
        <Hero />
        <Features />
        <Collections />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
