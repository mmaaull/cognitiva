import React from 'react';
import { ShieldCheck, Percent, Award, ArrowUpRight } from 'lucide-react';

export default function AnalyticsPage({ analyticsData }) {
  // Tentukan label status berdasarkan indeks ketergantungan AI
  const getDependencyStatus = (index) => {
    if (index > 70) return { label: 'TINGGI', color: 'text-red-600 bg-red-50 border-red-200' };
    if (index > 40) return { label: 'SEDANG', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { label: 'RENDAH (IDEAL)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  };

  const status = getDependencyStatus(analyticsData.dependencyIndex);

  return (
    <div className="h-full w-full p-8 flex flex-col overflow-y-auto font-sans bg-gradient-to-br from-[#F4F9F6] via-[#F4F6F3] to-[#EEF4F8] animate-in fade-in duration-200">
      
      {/* Header Dashboard */}
      <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 mb-3 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-emerald-700">
          Cognitiva Insights
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Cognitive Offloading Analytics</h1>
        <p className="text-sm text-gray-500">Pantau perkembangan berpikir kritis, risiko ketergantungan AI, dan konsistensi refleksi belajar.</p>
      </div>

      {/* Grid Statistik Angka */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto mb-6">
        
        {/* Card 1: AI Dependency Index */}
        <div className="bg-white/90 backdrop-blur border border-[#DCE3DD] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start text-gray-400">
            <Percent size={18} className="text-red-500" />
            <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded ${status.color}`}>{status.label}</span>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-3">{analyticsData.dependencyIndex}%</p>
          <p className="text-xs text-gray-400 font-semibold mt-1">AI Dependency Index</p>
        </div>

        {/* Card 2: Critical Thinking Score */}
        <div className="bg-white/90 backdrop-blur border border-[#DCE3DD] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start text-gray-400">
            <Award size={18} className="text-emerald-500" />
            <span className="text-[10px] text-gray-500 font-bold bg-gray-100 px-1.5 py-0.5 rounded">SKOR</span>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-3">{analyticsData.criticalThinkingScore}/100</p>
          <p className="text-xs text-gray-400 font-semibold mt-1">Critical Thinking Score</p>
        </div>

        {/* Card 3: Aktivitas Berpikir */}
        <div className="bg-white/90 backdrop-blur border border-[#DCE3DD] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start text-gray-400">
            <ShieldCheck size={18} className="text-blue-500" />
            <ArrowUpRight size={14} />
          </div>
          <p className="text-2xl font-black text-gray-900 mt-3">{analyticsData.sessionsLogged} Kali</p>
          <p className="text-xs text-gray-400 font-semibold mt-1">Refleksi Lolos Guardrail</p>
        </div>

      </div>

      {/* Detail Grafik Visualisasi Batang Pure Tailwind */}
      <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur border border-[#DCE3DD] rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Grafik Parameter Kognitif</h3>
          <p className="text-xs text-gray-400 mt-0.5">Semakin sering Anda menyelesaikan intervensi refleksi, Indeks Ketergantungan AI Anda akan menurun.</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Batang 1 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-gray-700">
              <span>AI Dependency Index (Tingkat Ketergantungan Jawaban Instan)</span>
              <span className="text-red-600">{analyticsData.dependencyIndex}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-500" 
                style={{ width: `${analyticsData.dependencyIndex}%` }}
              />
            </div>
          </div>

          {/* Batang 2 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-gray-700">
              <span>Critical Thinking Score (Ketajaman Evaluasi Argumen Mandiri)</span>
              <span className="text-emerald-600">{analyticsData.criticalThinkingScore}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${analyticsData.criticalThinkingScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-2 text-center">
          <p className="text-[11px] text-gray-400 font-medium">
            💡 *Petunjuk Demo:* Ketik prompt di halaman chat, lalu kirim refleksi jawaban Anda. Angka metrik di halaman ini otomatis akan berubah menguat!
          </p>
        </div>
      </div>

    </div>
  );
}