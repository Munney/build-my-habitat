"use client";

import { useState, useEffect } from "react";
import { Share2, Facebook, Twitter, Copy, Check, Link2, MessageCircle } from "lucide-react";

function speciesShareCopy(species) {
  if (species === "betta") return { title: "Betta Fish", short: "betta fish" };
  if (species === "bearded-dragon") return { title: "Bearded Dragon", short: "bearded dragon" };
  if (species === "ball-python") return { title: "Ball Python", short: "ball python" };
  return { title: "Leopard Gecko", short: "leopard gecko" };
}

export function SocialShare({ buildName, total, species, shareUrl }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);

  const { title: speciesTitle, short: speciesShort } = speciesShareCopy(species);

  useEffect(() => {
    setHasNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);

      // Track analytics
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "link_copied",
          species,
          build_total: total,
        });
      }
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleNativeShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `My ${speciesTitle} Habitat Build - $${total}`,
          text: `Check out my safe ${speciesShort} setup! Built with BuildMyHabitat.`,
          url: shareUrl || window.location.href,
        });

        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "native_share",
            species,
          });
        }
      } catch (error) {
        // User cancelled or error
        console.log("Share cancelled");
      }
    }
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(shareUrl || window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400");

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "social_share",
        platform: "facebook",
        species,
      });
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Check out my ${speciesShort} setup! Built with BuildMyHabitat - $${total}`);
    const url = encodeURIComponent(shareUrl || window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "width=600,height=400");

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "social_share",
        platform: "twitter",
        species,
      });
    }
  };

  const shareToReddit = () => {
    const title = encodeURIComponent(`My ${speciesTitle} Setup - $${total}`);
    const url = encodeURIComponent(shareUrl || window.location.href);
    window.open(`https://reddit.com/submit?title=${title}&url=${url}`, "_blank", "width=600,height=400");

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "social_share",
        platform: "reddit",
        species,
      });
    }
  };

  if (hasNativeShare) {
    return (
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30"
      >
        <Share2 size={20} />
        Share Build
      </button>
    );
  }

  // Desktop share menu (or initial render before navigator is known)
  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30"
      >
        <Share2 size={20} />
        Share Build
      </button>

      {showShareMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowShareMenu(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-slate-900 border border-white/10 rounded-2xl p-3 shadow-2xl z-50 min-w-[200px]">
            <div className="space-y-2">
              <button
                onClick={() => {
                  shareToFacebook();
                  setShowShareMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-left"
              >
                <Facebook className="text-blue-500" size={20} />
                <span className="text-white font-medium">Facebook</span>
              </button>

              <button
                onClick={() => {
                  shareToTwitter();
                  setShowShareMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-left"
              >
                <Twitter className="text-cyan-400" size={20} />
                <span className="text-white font-medium">Twitter</span>
              </button>

              <button
                onClick={() => {
                  shareToReddit();
                  setShowShareMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-left"
              >
                <MessageCircle className="text-orange-500" size={20} />
                <span className="text-white font-medium">Reddit</span>
              </button>

              <div className="border-t border-white/10 my-2" />

              <button
                onClick={() => {
                  handleCopyLink();
                  setShowShareMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-left"
              >
                {linkCopied ? (
                  <>
                    <Check className="text-emerald-400" size={20} />
                    <span className="text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="text-slate-400" size={20} />
                    <span className="text-white font-medium">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

