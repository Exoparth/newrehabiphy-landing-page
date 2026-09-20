import React, { useEffect, useState } from 'react';
import { CheckCircle2, Smartphone, ExternalLink } from 'lucide-react';
import { RehabiphyLogo } from './RehabiphyLogo';

// Reached when this device didn't intercept the verification link via
// Android/iOS App Links (e.g. the Rehabiphy app isn't installed yet, link
// verification hasn't completed on this device, or it was opened on
// desktop). The app itself also polls for verification in the background,
// so this page's job is just to hand off to the app if it's present.
export const VerifyRedirect: React.FC = () => {
  const [attempted, setAttempted] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || '';
  const email = params.get('email') || '';

  const deepLink = `rehabiphy://verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

  useEffect(() => {
    if (!token) return;
    // Give the app a chance to intercept before we render the fallback UI.
    const timer = window.setTimeout(() => setAttempted(true), 1200);
    window.location.href = deepLink;
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FFFC] text-slate-800 flex flex-col items-center justify-center px-6 py-16 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center space-y-6">
        <RehabiphyLogo variant="light" showTagline layout="vertical" iconSize={56} />

        {!token ? (
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-800">This verification link looks incomplete.</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Please open the verification link directly from the email we sent you, on the same device where you're signing up.
            </p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0F766E]/10 flex items-center justify-center">
              <Smartphone className="w-7 h-7 text-[#0F766E]" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-800">
                {attempted ? "Didn't open automatically?" : 'Opening the Rehabiphy app…'}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {email && <>Verifying <span className="font-semibold text-slate-700">{email}</span>. </>}
                This link verifies your email inside the Rehabiphy app. If it didn't open on its own, tap below.
              </p>
            </div>

            <a
              href={deepLink}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0F766E] hover:bg-[#115E59] text-white text-sm font-bold rounded-2xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Rehabiphy App
            </a>

            <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-left">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Don't have Rehabiphy installed yet? Install the app, sign up again with the same email, and we'll send a fresh verification link.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
