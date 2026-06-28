import React, { useEffect, useMemo, useState } from 'react';
import { Check, Download, GitFork, Lock, Send, ShieldAlert, Sparkles } from 'lucide-react';

const MODEL_GATEWAY = ['GPT-4o', 'Gemini Pro', 'Claude 3.5', 'Llama 3.1', 'Mistral Large'];

const AGENT_PIPELINE = [
  'Socratic Agent',
  'Reasoning Agent',
  'Evidence Checker Agent',
  'Counter-Argument Agent',
  'Reflection Coach Agent',
  'Argument Evaluator Agent',
  'Summary Agent'
];

const classifyPrompt = (prompt) => {
  const text = prompt.toLowerCase();
  if (/(buatkan|kerjakan|jawaban langsung|siap kumpul|langsung jadi)/.test(text)) {
    return 'instant-answer-request';
  }
  if (/(review|evaluasi|kritik|perbaiki|cek argumen)/.test(text)) {
    return 'draft-review';
  }
  return 'concept-exploration';
};

const detectOffloadingRisk = (prompt) => {
  const text = prompt.toLowerCase();
  let score = 35;
  if (/(buatkan|jawaban|langsung|instan|copy|paste|siap kumpul)/.test(text)) score += 40;
  if (/(esai|makalah|laporan|tugas)/.test(text)) score += 15;
  if (text.length < 25) score += 8;
  score = Math.max(10, Math.min(score, 95));

  if (score > 70) return { index: score, level: 'high' };
  if (score > 40) return { index: score, level: 'medium' };
  return { index: score, level: 'low' };
};

const routeModel = (intention, risk) => {
  if (risk.level === 'high') {
    return {
      model: 'Claude 3.5',
      reason: 'Dipilih untuk scaffolding reflektif bertahap saat risiko offloading tinggi.'
    };
  }
  if (intention === 'draft-review') {
    return {
      model: 'GPT-4o',
      reason: 'Dipilih untuk evaluasi argumen dan umpan balik revisi yang detail.'
    };
  }
  return {
    model: 'Gemini Pro',
    reason: 'Dipilih untuk eksplorasi konsep dan penjelasan terstruktur.'
  };
};

const riskBadge = (level) => {
  if (level === 'high') return 'bg-red-50 text-red-700 border-red-200';
  if (level === 'medium') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-emerald-50 text-emerald-700 border-emerald-200';
};

const riskLabel = (level) => {
  if (level === 'high') return 'TINGGI';
  if (level === 'medium') return 'SEDANG';
  return 'RENDAH';
};

const buildDummyDialogue = ({ prompt, reflection, selectedModel, intention, risk }) => {
  const initialIdea =
    reflection?.trim() ||
    'AI berpotensi membuat belajar cepat, tetapi bisa menurunkan kedalaman analisis jika dipakai sebagai jawaban instan.';

  return [
    {
      role: 'ai',
      agent: 'Socratic Agent',
      text: `Baik, kita bahas topik: "${prompt}". Klaim inti apa yang ingin kamu pertahankan terlebih dahulu?`
    },
    {
      role: 'user',
      text: `Klaim inti saya: ${initialIdea}`
    },
    {
      role: 'ai',
      agent: 'Evidence Checker Agent',
      text: 'Bukti apa yang akan kamu gunakan untuk mendukung klaim itu? Sebutkan data, studi, atau contoh konkret.'
    },
    {
      role: 'user',
      text: 'Saya akan gunakan riset tentang cognitive offloading dan contoh perilaku copy-paste pada tugas akademik.'
    },
    {
      role: 'ai',
      agent: 'Counter-Argument Agent',
      text: 'Bagus. Sekarang uji argumenmu: dalam kondisi apa AI justru meningkatkan kualitas berpikir, bukan menurunkannya?'
    },
    {
      role: 'user',
      text: 'Saat AI dipakai untuk brainstorming, umpan balik, dan refleksi—bukan untuk mengambil jawaban final mentah.'
    },
    {
      role: 'ai',
      agent: 'Summary Agent',
      text: `Ringkasan terarah (${selectedModel}): kamu memposisikan AI sebagai alat bantu refleksi, bukan mesin jawaban. Argumenmu kuat jika dilengkapi data empiris, pembahasan kontra-argumen, serta rekomendasi guardrail pembelajaran. Intensi prompt terdeteksi "${intention}" dengan risiko offloading ${riskLabel(risk.level)} (${risk.index}%).`
    }
  ];
};

export default function MainContent({ activeAgent, onReflectionComplete, historySession }) {
  const [isDroptopOpen, setIsDroptopOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Auto (Model Router)');
  const [userPrompt, setUserPrompt] = useState('');
  const [reflectionInput, setReflectionInput] = useState('');
  const [stepStatus, setStepStatus] = useState('idle');
  const [showReportToast, setShowReportToast] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sessionMeta, setSessionMeta] = useState(null);

  const analysisMeta = useMemo(() => {
    if (!userPrompt.trim()) return null;
    const intention = classifyPrompt(userPrompt);
    const risk = detectOffloadingRisk(userPrompt);
    const routed = routeModel(intention, risk);
    const finalModel = selectedModel === 'Auto (Model Router)' ? routed.model : selectedModel;
    return {
      intention,
      risk,
      routed,
      model: finalModel,
      requiresReflection: risk.level !== 'low'
    };
  }, [selectedModel, userPrompt]);

  useEffect(() => {
    if (!historySession) return;
    setUserPrompt(historySession.prompt || '');
    setReflectionInput(historySession.reflection || '');
    setSessionMeta(historySession.sessionMeta || null);
    setMessages(Array.isArray(historySession.messages) ? historySession.messages : []);
    setStepStatus('answered');
  }, [historySession]);

  const triggerDownloadReport = () => {
    setShowReportToast(true);
    setTimeout(() => setShowReportToast(false), 3000);
  };

  const handleSendPrompt = (event) => {
    event.preventDefault();
    if (!userPrompt.trim() || !analysisMeta) return;

    setMessages([{ role: 'user', text: userPrompt }]);
    setSessionMeta(analysisMeta);
    setReflectionInput('');

    if (analysisMeta.requiresReflection) {
      setStepStatus('reflecting');
      return;
    }

    setStepStatus('deliberating');
    setTimeout(() => {
      const dummy = buildDummyDialogue({
        prompt: userPrompt,
        reflection: '',
        selectedModel: analysisMeta.model,
        intention: analysisMeta.intention,
        risk: analysisMeta.risk
      });
      setMessages((prev) => [...prev, ...dummy]);
      setStepStatus('answered');
      onReflectionComplete();
    }, 900);
  };

  const handleSendReflection = (event) => {
    event.preventDefault();
    if (!reflectionInput.trim() || !sessionMeta) return;

    setMessages((prev) => [...prev, { role: 'user', text: reflectionInput }]);
    setStepStatus('deliberating');

    setTimeout(() => {
      const dummy = buildDummyDialogue({
        prompt: userPrompt,
        reflection: reflectionInput,
        selectedModel: sessionMeta.model,
        intention: sessionMeta.intention,
        risk: sessionMeta.risk
      });
      setMessages((prev) => [...prev, ...dummy]);
      setStepStatus('answered');
      onReflectionComplete();
    }, 1100);
  };

  return (
    <main className="flex-1 h-screen flex flex-col items-center justify-between p-6 bg-gradient-to-br from-[#F4F9F6] via-[#F4F6F3] to-[#EEF4F8] relative font-sans">
      {showReportToast && (
        <div className="absolute top-4 bg-gray-900 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xl z-50 flex items-center gap-2 animate-bounce">
          <Download size={14} className="text-emerald-400" />
          <span>Mengekspor Human-AI Collaboration Report.pdf Berhasil!</span>
        </div>
      )}

      <div className="w-full max-w-3xl flex-1 flex flex-col overflow-y-auto pt-2 pb-8 gap-4">
        <section className="bg-white/95 backdrop-blur border border-[#DCE3DD] rounded-2xl p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-emerald-700">Cognitiva Workspace</p>
              <h3 className="text-sm font-semibold text-gray-900 mt-0.5">Belajar lebih reflektif dengan AI Agent Layer</h3>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">User-Friendly</span>
              <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">Guided Flow</span>
            </div>
          </div>
        </section>

        {stepStatus === 'idle' && (
          <div className="text-center select-none my-auto">
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Good evening, Faiz</h2>
            <p className="text-xs text-gray-400 mt-2">Ketik prompt tugas. Sistem akan menjalankan classifier, detector, model router, dan agent pipeline.</p>
          </div>
        )}

        {sessionMeta && (
          <section className="bg-white border border-[#DCE3DD] rounded-2xl p-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
              <span className="px-2 py-1 rounded border bg-slate-50 text-slate-700 border-slate-200">
                Prompt Intention: {sessionMeta.intention}
              </span>
              <span className={`px-2 py-1 rounded border ${riskBadge(sessionMeta.risk.level)}`}>
                AI Dependency Index: {sessionMeta.risk.index}% ({riskLabel(sessionMeta.risk.level)})
              </span>
              <span className="px-2 py-1 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">
                Model Router: {sessionMeta.model}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">{sessionMeta.routed.reason}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {AGENT_PIPELINE.map((agent) => (
                <span key={agent} className="px-2 py-1 rounded-lg bg-[#F4F6F3] border border-[#DCE3DD] text-[10px] font-semibold text-gray-700">
                  {agent}
                </span>
              ))}
            </div>
          </section>
        )}

        {stepStatus === 'reflecting' && (
          <section className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-4.5 shadow-xs">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-2">
              <ShieldAlert size={15} />
              <span>REFLECT BEFORE REVEAL (GUARDRAIL AKTIF)</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed mb-3">
              Risiko cognitive offloading terdeteksi. Tulis dulu hipotesis/argumen awalmu sebelum sistem membuka respons AI lengkap.
            </p>
            <form onSubmit={handleSendReflection} className="flex gap-2">
              <input
                type="text"
                value={reflectionInput}
                onChange={(event) => setReflectionInput(event.target.value)}
                placeholder="Tuliskan gagasan awal versi Anda..."
                className="flex-1 h-9 bg-white border border-amber-300 rounded-xl px-3 text-xs outline-none focus:border-amber-500 text-gray-800"
              />
              <button className="h-9 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl cursor-pointer">Kirim</button>
            </form>
          </section>
        )}

        {stepStatus === 'deliberating' && (
          <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold pl-1">
            <Sparkles size={14} className="animate-spin text-emerald-500" />
            <span>Pedagogical AI Orchestrator menjalankan agent pipeline...</span>
          </div>
        )}

        {messages.length > 0 && (
          <section className="flex flex-col gap-3">
            {messages.map((msg, index) => {
              const isSummary = msg.role === 'ai' && msg.agent === 'Summary Agent';
              const bubbleClass =
                msg.role === 'user'
                  ? 'self-end bg-emerald-600 text-white rounded-2xl rounded-tr-none'
                  : 'self-start bg-white border border-[#DCE3DD] text-gray-800 rounded-2xl rounded-tl-none';
              return (
                <div key={`${msg.role}-${index}`} className={`max-w-[88%] px-4 py-3 text-sm shadow-xs ${bubbleClass}`}>
                  {msg.agent && (
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {msg.agent}
                    </div>
                  )}
                  <p className={isSummary ? 'select-none pointer-events-none leading-relaxed font-medium' : 'leading-relaxed'}>
                    {msg.text}
                  </p>
                  {isSummary && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 border border-red-200 rounded-lg">
                      <Lock size={10} />
                      <span>ANTI-COPY PASTE ACTIVE</span>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {stepStatus === 'answered' && (
          <section className="w-full bg-white border border-[#DCE3DD] rounded-2xl p-5 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-xs border-b border-gray-100 pb-2">
              <GitFork size={14} className="text-emerald-600" />
              <span>OUTPUT LAYER (SIMULASI): ARGUMENT MAP + COLLABORATION REPORT</span>
            </div>
            <div className="flex flex-col gap-2 text-[11px] font-medium text-center">
              <div className="mx-auto w-full max-w-[260px] rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">
                <span className="block font-bold text-[9px] text-emerald-600 uppercase mb-0.5">Akar Argumen</span>
                {userPrompt.substring(0, 38) || 'Menunggu klaim utama'}
              </div>
              <div className="flex items-center justify-center">
                <div className="h-4 w-px bg-emerald-200" />
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                  <span className="block font-bold text-[9px] text-amber-600 uppercase mb-0.5">Cabang Bukti</span>
                  {reflectionInput.substring(0, 38) || 'Data dan studi pendukung'}
                </div>
                <div className="rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-purple-800">
                  <span className="block font-bold text-[9px] text-purple-600 uppercase mb-0.5">Cabang Kontra-Argumen</span>
                  AI dapat efektif bila dipakai sebagai sparring partner
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-100">
              <div className="text-[11px] text-gray-500 font-semibold">
                Active Agent: {activeAgent.name}
              </div>
              <button
                onClick={triggerDownloadReport}
                className="h-8 px-4 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[11px] rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
              >
                <Download size={12} />
                <span>Unduh Human-AI Collaboration Report</span>
              </button>
            </div>
          </section>
        )}
      </div>

      <form onSubmit={handleSendPrompt} className="w-full max-w-3xl relative bg-white border border-[#DCE3DD] rounded-2xl flex items-center justify-between h-16 px-4.5 gap-3 shrink-0 mb-2">
        <input
          type="text"
          value={userPrompt}
          onChange={(event) => setUserPrompt(event.target.value)}
          disabled={stepStatus === 'deliberating'}
          placeholder={stepStatus === 'deliberating' ? 'Sistem sedang memproses orchestration...' : 'Tulis prompt akademik Anda...'}
          className="flex-1 h-full bg-transparent outline-none text-sm text-gray-800 font-medium disabled:opacity-60"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsDroptopOpen(!isDroptopOpen)}
            className="h-10 px-3.5 bg-[#F4F6F3] border border-[#DCE3DD] rounded-xl flex items-center gap-2 text-gray-800 font-bold text-xs cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>{selectedModel}</span>
          </button>
          <button
            type="submit"
            disabled={stepStatus === 'deliberating'}
            className="w-10 h-10 bg-[#10B981] disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-xl flex items-center justify-center transition cursor-pointer shadow-xs"
          >
            <Send size={15} />
          </button>
        </div>

        {isDroptopOpen && (
          <div className="absolute bottom-full right-[60px] mb-3 w-52 bg-white border border-[#DCE3DD] rounded-xl shadow-xl p-1 z-50 flex flex-col gap-0.5">
            {['Auto (Model Router)', ...MODEL_GATEWAY].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setSelectedModel(name);
                  setIsDroptopOpen(false);
                }}
                className="w-full h-8 px-3 rounded-lg text-left text-xs font-semibold text-gray-700 hover:bg-[#F4F6F3] flex items-center justify-between"
              >
                <span>{name}</span>
                {selectedModel === name && <Check size={12} className="text-emerald-600" />}
              </button>
            ))}
          </div>
        )}
      </form>
    </main>
  );
}
