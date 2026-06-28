import React from 'react';
import { Brain, ShieldAlert, FileText, ArrowLeft, GitFork, Search, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SkillPage({ setActivePage }) {
  // AI Agent Layer sesuai konsep Cognitiva pada dokumen esai
  const agents = [
    {
      id: 'socratic',
      name: 'Socratic Agent',
      description: 'Memberikan pertanyaan pemantik agar pengguna menemukan gagasan melalui proses berpikirnya sendiri.',
      icon: <Brain className="text-[#007A5A]" size={22} />,
    },
    {
      id: 'reasoning',
      name: 'Reasoning Agent',
      description: 'Membantu menyusun alur logika berpikir secara bertahap agar argumen lebih runtut dan konsisten.',
      icon: <GitFork className="text-blue-600" size={22} />,
    },
    {
      id: 'evidence-checker',
      name: 'Evidence Checker Agent',
      description: 'Meminta dan memeriksa bukti, data, atau referensi pendukung agar klaim tidak hanya berupa opini.',
      icon: <Search className="text-cyan-600" size={22} />,
    },
    {
      id: 'counter-argument',
      name: 'Counter-Argument Agent',
      description: 'Menantang argumen dengan sudut pandang berlawanan untuk melatih evaluasi kritis dan ketahanan gagasan.',
      icon: <ShieldAlert className="text-orange-600" size={22} />,
    },
    {
      id: 'reflection-coach',
      name: 'Reflection Coach Agent',
      description: 'Mengajak pengguna merefleksikan proses berpikir, asumsi, dan keputusan sebelum menyusun kesimpulan.',
      icon: <Sparkles className="text-indigo-600" size={22} />,
    },
    {
      id: 'argument-evaluator',
      name: 'Argument Evaluator Agent',
      description: 'Menilai kualitas argumen berdasarkan logika, relevansi, dan kekuatan bukti yang digunakan.',
      icon: <CheckCircle2 className="text-emerald-600" size={22} />,
    },
    {
      id: 'summary',
      name: 'Summary Agent',
      description: 'Menyusun ringkasan akhir setelah seluruh proses berpikir dilalui pengguna secara bertahap.',
      icon: <FileText className="text-purple-600" size={22} />,
    },
  ];

  return (
    <div className="h-full w-full p-8 flex flex-col overflow-y-auto font-sans animate-in fade-in duration-200">
      
      {/* Tombol Back & Header Judul Halaman */}
      <div className="flex items-center gap-4 mb-8 w-full max-w-3xl mx-auto">
        <button 
          onClick={() => setActivePage('chat')}
          className="p-2 hover:bg-gray-200/60 rounded-xl transition cursor-pointer text-gray-600"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Agent Skills Workspace</h1>
          <p className="text-sm text-gray-500">Daftar agent pedagogis Cognitiva untuk membimbing proses berpikir, bukan memberi jawaban instan.</p>
        </div>
      </div>

      {/* Grid Katalog Kumpulan AI Agent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
        {agents.map((agent) => (
          <div 
            key={agent.id}
            className="bg-white border border-[#DCE3DD] rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-5 transition-all duration-200 hover:border-gray-300"
          >
            <div className="flex gap-4 items-start">
              {/* Box Ikon */}
              <div className="p-2.5 bg-[#F4F6F3] rounded-xl flex items-center justify-center shrink-0">
                {agent.icon}
              </div>
              {/* Detail Teks Deskripsi */}
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">{agent.name}</h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{agent.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}