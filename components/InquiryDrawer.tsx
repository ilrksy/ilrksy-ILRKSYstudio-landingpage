'use client';

import React, { useState } from 'react';
import { X, Check, Copy, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playClickSound, playToggleSound } from '@/lib/audio';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryDrawer({ isOpen, onClose }: InquiryDrawerProps) {
  const [services, setServices] = useState<string[]>(['EDITORIAL & PRINT']);
  const [budget, setBudget] = useState<string>('$40k — $80k');
  const [timeline, setTimeline] = useState<string>('Q3 2026');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableServices = [
    'EDITORIAL & PRINT',
    'VISUAL IDENTITY',
    'DIGITAL ARCHITECTURE',
    'SPATIAL & MOTION',
    'CUSTOM TYPOGRAPHY'
  ];

  const budgetRanges = ['$20k — $40k', '$40k — $80k', '$80k — $150k+'];
  const timelines = ['IMMEDIATE / Q3 2026', 'Q4 2026', '2027 ARCHIVE'];

  const toggleService = (serv: string) => {
    playToggleSound(!services.includes(serv));
    if (services.includes(serv)) {
      if (services.length > 1) {
        setServices(services.filter(s => s !== serv));
      }
    } else {
      setServices([...services, serv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setSubmitted(true);
  };

  const copyBriefDraft = () => {
    playClickSound();
    const briefText = `COMMISSION INQUIRY - ILRKSY STUDIO
---------------------------------
Name: ${name || 'N/A'}
Organization: ${organization || 'N/A'}
Email: ${email || 'N/A'}
Selected Services: ${services.join(', ')}
Budget Range: ${budget}
Timeline: ${timeline}
Project Brief: ${message || 'No additional details provided.'}`;

    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
        {/* Backdrop */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Drawer Window */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl bg-white text-black h-full overflow-y-auto p-6 md:p-12 shadow-2xl flex flex-col justify-between border-l border-black/20"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-8">
              <div>
                <span className="font-editorial-mono text-xs uppercase tracking-widest text-[#525252] block mb-1">
                  [COMMISSION BRIEF BUILDER]
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
                  Start a Project
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full border border-black/20 hover:bg-black hover:text-white transition-colors"
                data-cursor-text="CLOSE"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight uppercase">
                  INQUIRY RECEIVED
                </h3>
                <p className="text-base text-[#525252] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-black">{name || 'partner'}</span>. Our studio principals review all inquiries within 24 hours. A formal project brief response will be dispatched to <span className="font-bold text-black">{email || 'your email'}</span>.
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="px-8 py-3 bg-black text-white font-editorial-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors"
                  >
                    RETURN TO ARCHIVE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Services Selection */}
                <div>
                  <span className="font-editorial-mono text-xs uppercase tracking-widest text-[#525252] block mb-3">
                    01. SELECT DISCIPLINE(S):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((serv) => {
                      const isSelected = services.includes(serv);
                      return (
                        <button
                          key={serv}
                          type="button"
                          onClick={() => toggleService(serv)}
                          className={`px-3.5 py-2 font-editorial-mono text-xs uppercase tracking-wider transition-all border ${
                            isSelected
                              ? 'bg-black text-white border-black font-bold'
                              : 'bg-white text-black border-black/20 hover:border-black'
                          }`}
                        >
                          {serv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="font-editorial-mono text-xs uppercase tracking-widest text-[#525252] block mb-3">
                      02. ESTIMATED BUDGET:
                    </span>
                    <div className="space-y-2">
                      {budgetRanges.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`w-full text-left px-4 py-2.5 font-editorial-mono text-xs uppercase transition-all border ${
                            budget === b
                              ? 'bg-black text-white border-black font-bold'
                              : 'bg-neutral-50 text-black border-black/10 hover:border-black'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-editorial-mono text-xs uppercase tracking-widest text-[#525252] block mb-3">
                      03. TARGET TIMELINE:
                    </span>
                    <div className="space-y-2">
                      {timelines.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeline(t)}
                          className={`w-full text-left px-4 py-2.5 font-editorial-mono text-xs uppercase transition-all border ${
                            timeline === t
                              ? 'bg-black text-white border-black font-bold'
                              : 'bg-neutral-50 text-black border-black/10 hover:border-black'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 3: Contact Inputs */}
                <div className="space-y-4 pt-4 border-t border-black/10">
                  <span className="font-editorial-mono text-xs uppercase tracking-widest text-[#525252] block">
                    04. CONTACT INFORMATION:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-editorial-mono text-[10px] uppercase tracking-widest text-[#525252] block mb-1">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kenzo Tange"
                        className="w-full p-3 bg-neutral-50 border border-black/20 focus:border-black focus:outline-none font-sans text-sm"
                      />
                    </div>

                    <div>
                      <label className="font-editorial-mono text-[10px] uppercase tracking-widest text-[#525252] block mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kenzo@arch.design"
                        className="w-full p-3 bg-neutral-50 border border-black/20 focus:border-black focus:outline-none font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-editorial-mono text-[10px] uppercase tracking-widest text-[#525252] block mb-1">
                      ORGANIZATION / BRAND
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Archival Press / Mori Art Foundation"
                      className="w-full p-3 bg-neutral-50 border border-black/20 focus:border-black focus:outline-none font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-editorial-mono text-[10px] uppercase tracking-widest text-[#525252] block mb-1">
                      PROJECT OVERVIEW & BRIEF
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe project objectives, scope, and visual references..."
                      className="w-full p-3 bg-neutral-50 border border-black/20 focus:border-black focus:outline-none font-sans text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-4 bg-black text-white font-editorial-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                  >
                    <span>SUBMIT INQUIRY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={copyBriefDraft}
                    className="w-full sm:w-auto px-4 py-4 border border-black/20 text-black font-editorial-mono text-xs uppercase tracking-widest hover:border-black transition-colors flex items-center justify-center gap-2"
                    title="Copy formatted brief text to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'COPIED' : 'COPY BRIEF'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-black/10 font-editorial-mono text-[10px] text-[#525252] flex justify-between items-center">
            <span>SD STUDIO © 2026</span>
            <span>DIRECT: HELLO@STUDIODESIGN.EDITORIAL</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
