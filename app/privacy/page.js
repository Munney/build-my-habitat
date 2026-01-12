import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              Legal
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-slate-400 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-slate-300 leading-relaxed">
            <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="text-blue-400" size={24} />
                Information We Collect
              </h2>
              <p className="mb-4">
                HabitatBuilder is designed to be privacy-friendly. We collect minimal information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Build Data:</strong> Your habitat configurations are stored locally in your browser. We don't send this data to our servers unless you explicitly share a build via URL.</li>
                <li><strong>Analytics:</strong> We use Google Analytics to understand how visitors use our site. This includes anonymous data like page views, time on site, and general location (country/city level).</li>
                <li><strong>No Personal Accounts:</strong> We don't require registration or collect email addresses, names, or payment information.</li>
              </ul>
            </section>

            <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="text-emerald-400" size={24} />
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To improve our website and user experience</li>
                <li>To understand which features are most useful</li>
                <li>To fix bugs and technical issues</li>
                <li>We do NOT sell your data to third parties</li>
                <li>We do NOT use your data for advertising purposes</li>
              </ul>
            </section>

            <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="text-purple-400" size={24} />
                Cookies and Tracking
              </h2>
              <p className="mb-4">
                We use cookies for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Analytics:</strong> Google Analytics cookies to track site usage (you can opt out via Google Analytics Opt-out Browser Add-on)</li>
                <li><strong>Local Storage:</strong> Your saved builds are stored in your browser's local storage, not on our servers</li>
                <li><strong>No Third-Party Advertising:</strong> We don't use advertising cookies or tracking pixels</li>
              </ul>
            </section>

            <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="text-amber-400" size={24} />
                Affiliate Links
              </h2>
              <p className="mb-4">
                HabitatBuilder uses Amazon affiliate links. When you click on a product link and make a purchase, we earn a small commission at no extra cost to you. This helps us keep the site free.
              </p>
              <p>
                Amazon may use cookies to track that you came from our site. This is standard affiliate marketing practice and is covered by Amazon's privacy policy.
              </p>
            </section>

            <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Your Rights
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You can clear your browser's local storage to delete saved builds</li>
                <li>You can opt out of Google Analytics tracking</li>
                <li>You can use the site without accepting cookies (though some features may not work)</li>
                <li>You can contact us with privacy concerns (see contact information below)</li>
              </ul>
            </section>

            <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. The "Last updated" date at the top will reflect any changes. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                Contact Us
              </h2>
              <p>
                If you have questions about this privacy policy, please contact us through our website or social media channels.
              </p>
            </section>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/40"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

