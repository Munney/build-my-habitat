import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact BuildMyHabitat",
  description: "Contact BuildMyHabitat for questions, feedback, and support.",
};

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-base mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-8 md:p-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Contact</h1>
            <p className="text-slate-300 leading-relaxed mb-6">
              Questions, feedback, and product safety suggestions are welcome.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center gap-2">
                  <Mail size={14} /> Email
                </p>
                <p className="text-slate-200">
                  <a href="mailto:buildmyhabitat@gmail.com" className="hover:text-white transition-colors underline">
                    buildmyhabitat@gmail.com
                  </a>
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center gap-2">
                  <MessageCircle size={14} /> What to Include
                </p>
                <p className="text-slate-300 text-sm">
                  Include species, page URL, and product/item details so we can review quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
