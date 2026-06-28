import React, { useState } from 'react';
import { ChevronUp, Send, Check, Brain, ShieldAlert, Sparkles, Lock, GitFork, Download } from 'lucide-react';

export default function MainContent({ activeAgent, onReflectionComplete }) {
  const [isDroptopOpen, setIsDroptopOpen] = useState(false);
  const [modelName, setModelName] = useState('Gemini Pro');
  const [userPrompt, setUserPrompt] = useState('');
  const [reflectionInput, setReflectionInput] = useState('');
  const [stepStatus, setStepStatus] = useState('idle');
  const [showReportToast, setShowReportToast] = useState(false);

  const handleSendPrompt = (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    setStepStatus('reflecting'); 
  };

  const handleSendReflection = (e) => {
    e.preventDefault();
    if (!reflectionInput.trim()) return;
    setStepStatus('streaming');
    setTimeout(() => {
      setStepStatus('answered');
      onReflectionComplete();
    }, 1200);
  };

  // Simulasi unduh artefak pembelajaran
  const triggerDownloadReport = () => {
    setShowReportToast(true);
    setTimeout(() => setShowReportToast(false), 3000);
  };

  return (
    <main className="flex-1 h-screen flex flex-col items-center justify-between p-6 bg-[#F4F6F3] relative font-sans">
      
      {/* Toast Animasi Unduh Laporan */}
      {showReportToast && (
        <div className="absolute top-4 bg-gray-900 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xl z-50 flex items-center gap-2 animate-bounce">
          <Download size={14} className="text-emerald-400" />
          <span>Mengekspor Human-AI Collaboration Report.pdf Berhasil!</span>
        </div>
      )}

      <div className="w-full max-w-2xl flex-1 flex flex-col justify-start overflow-y-auto pt-4 pb-8">
        {stepStatus === 'idle' && (
          <div className="text-center select-none my-auto">
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Good evening, Faiz</h2>
            <p className="text-xs text-gray-400 mt-2">Masukkan topik esai atau tugas Anda untuk memicu Mitra Berpikir.</p>
          </div>
        )}

        {stepStatus !== 'idle' && (
          <div className="w-full flex flex-col gap-5 animate-in fade-in duration-200">
            {/* Prompt Bubble */}
            <div className="self-end bg-emerald-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-sm font-medium shadow-xs">
              {userPrompt}
            </div>

            {/* Intervensi Guardrail */}
            {stepStatus === 'reflecting' && (
              <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-4.5 shadow-xs">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-2">
                  <ShieldAlert size={15} />
                  <span>REFLECT BEFORE REVEAL SYSTEM (INTERVENSI AKTIF)</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed mb-3">
                  Sistem mendeteksi risiko *cognitive offloading* tinggi. Sesuai aturan integritas akademik THINKER AI, tuliskan **hipotesis dasar atau poin argumentasi awal Anda** terlebih dahulu pada kolom di bawah ini.
                </p>
                <form onSubmit={handleSendReflection} className="flex gap-2">
                  <input type="text" value={reflectionInput} onChange={(e) => setReflectionInput(e.target.value)} placeholder="Tuliskan gagasan awal versi Anda..." className="flex-1 h-9 bg-white border border-amber-300 rounded-xl px-3 text-xs outline-none focus:border-amber-500 text-gray-800" />
                  <button className="h-9 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl cursor-pointer">Kirim</button>
                </form>
              </div>
            )}

            {/* Loading */}
            {stepStatus === 'streaming' && (
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium pl-2">
                <Sparkles size={14} className="animate-spin text-emerald-500" />
                <span>{activeAgent.name} sedang menyusun penalaran...</span>
              </div>
            )}

            {/* JAWABAN YANG SUDAH MEMENUHI KEUNGGULAN PROTEKSI DAN ARTEFAK VISUAL */}
            {stepStatus === 'answered' && (
              <>
                <div className="self-end bg-amber-600/10 border border-amber-200 text-amber-900 rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-xs font-semibold">
                  <span className="block font-bold text-[10px] text-amber-700 mb-0.5">REFLEKSI MANDIRI ANDA:</span>
                  "{reflectionInput}"
                </div>

                {/* KEUNGGULAN 1: ANTI-COPY PASTE (Teks dikunci dengan select-none) */}
                <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs relative">
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 border border-red-200 rounded-lg">
                    <Lock size={10} />
                    <span>ANTI-COPY PASTE GUARDRAIL ACTIVE</span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-3">
                    <span className={`px-2.5 py-0.5 rounded border text-[10px] font-bold tracking-wider ${activeAgent.badgeBg}`}>
                      {activeAgent.label}
                    </span>
                  </div>
                  
                  {/* Class select-none memblokir pemadaman/copy teks manual */}
                  <p className="text-gray-900 text-sm font-medium leading-relaxed select-none pointer-events-none">
                    "{activeAgent.defaultResponse}"
                  </p>
                </div>

                {/* KEUNGGULAN 2: OUTPUT LAYER (VISUALISASI ARGUMENT MAP TREE) */}
                <div className="w-full bg-white border border-[#DCE3DD] rounded-2xl p-5 shadow-xs flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-xs border-b border-gray-100 pb-2">
                    <GitFork size={14} className="text-emerald-600" />
                    <span>OUTPUT ARTEFAK: ARTIFACT ARGUMENT MAP</span>
                  </div>
                  <div className="flex flex-col gap-2 text-[11px] font-medium text-center">
                    <div className="mx-auto w-full max-w-[240px] rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">
                      <span className="block font-bold text-[9px] text-emerald-600 uppercase mb-0.5">Akar Argumen</span>
                      {userPrompt.substring(0, 24) || 'Menunggu klaim utama'}
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="h-4 w-px bg-emerald-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                        <span className="block font-bold text-[9px] text-amber-600 uppercase mb-0.5">Cabang Bukti</span>
                        {reflectionInput.substring(0, 24) || 'Belum ada refleksi'}
                      </div>
                      <div className="rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-purple-800">
                        <span className="block font-bold text-[9px] text-purple-600 uppercase mb-0.5">Cabang Scaffolding</span>
                        Pertanyaan konseptual lanjutan
                      </div>
                    </div>
                  </div>

                  {/* KEUNGGULAN 3: HUMAN-AI COLLABORATION REPORT DOWNLOADER */}
                  <div className="flex justify-end pt-2 mt-1 border-t border-gray-100">
                    <button 
                      onClick={triggerDownloadReport}
                      className="h-8 px-4 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[11px] rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
                    >
                      <Download size={12} />
                      <span>Unduh Laporan Kolaborasi Human-AI</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSendPrompt} className="w-full max-w-2xl relative bg-white border border-[#DCE3DD] rounded-2xl flex items-center justify-between h-16 px-4.5 gap-3 shrink-0 mb-2">
        <input type="text" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} disabled={stepStatus !== 'idle'} placeholder={stepStatus !== 'idle' ? "Selesaikan sesi interaktivitas di atas..." : "Tulis perintah tugas akademik Anda di sini..."} className="flex-1 h-full bg-transparent outline-none text-sm text-gray-800 font-medium disabled:opacity-50" />
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setIsDroptopOpen(!isDroptopOpen)} className="h-10 px-3.5 bg-[#F4F6F3] border border-[#DCE3DD] rounded-xl flex items-center gap-2 text-gray-800 font-bold text-xs cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>{modelName}</span>
          </button>
          <button type="submit" disabled={stepStatus !== 'idle'} className="w-10 h-10 bg-[#10B981] disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-xl flex items-center justify-center transition cursor-pointer shadow-xs"><Send size={15} /></button>
        </div>
        {isDroptopOpen && (
          <div className="absolute bottom-full right-[60px] mb-3 w-44 bg-white border border-[#DCE3DD] rounded-xl shadow-xl p-1 z-50 flex flex-col gap-0.5">
            {['Gemini Pro', 'GPT-4o Omnis', 'Claude 3.5'].map((name) => (
              <button key={name} type="button" onClick={() => { setModelName(name); setIsDroptopOpen(false); }} className="w-full h-8 px-3 rounded-lg text-left text-xs font-semibold text-gray-700 hover:bg-[#F4F6F3] flex items-center justify-between">
                <span>{name}</span> {modelName === name && <Check size={12} className="text-emerald-600" />}
              </button>
            ))}
          </div>
        )}
      </form>

    </main>
  );
}