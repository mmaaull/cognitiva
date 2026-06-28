import React from 'react';
import { Brain, ShieldAlert, Code, FileText, ArrowLeft } from 'lucide-react';

export default function SkillPage({ setActivePage }) {
  // Data array daftar Agent AI pendukung ekosistem Thinker AI
  const agents = [
    {
      id: 'socratic',
      name: 'Socratic Agent',
      description: 'Mitra berpikir utama yang didesain untuk memberikan pertanyaan pemantik alih-alih memberikan jawaban instan demi melatih pemikiran kritis mandiri.',
      icon: <Brain className="text-[#007A5A]" size={22} />,
      status: 'Aktif',
    },
    {
      id: 'critic',
      name: 'Devil\'s Advocate (Critic)',
      description: 'Bertugas menantang draf hipotesis, argumen, atau struktur esai Anda guna mendeteksi celah logika sebelum dikumpulkan.',
      icon: <ShieldAlert className="text-orange-600" size={22} />,
      status: 'Gunakan',
    },
    {
      id: 'technical',
      name: 'Technical Partner',
      description: 'Asisten review yang berfokus mendeteksi optimasi performa logika, debugging sistem perangkat lunak, serta manajemen data.',
      icon: <Code className="text-blue-600" size={22} />,
      status: 'Gunakan',
    },
    {
      id: 'synthesis',
      name: 'Synthesis Agent',
      description: 'Membantu mereduksi materi teks yang panjang menjadi ringkasan peta argumen visual dan poin konklusi terstruktur.',
      icon: <FileText className="text-purple-600" size={22} />,
      status: 'Gunakan',
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
          <p className="text-sm text-gray-500">Pilih spesialisasi kecerdasan buatan untuk menemani sesi kerja Anda.</p>
        </div>
      </div>

      {/* Grid Katalog Kumpulan AI Agent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
        {agents.map((agent) => (
          <div 
            key={agent.id}
            className={`bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between gap-5 transition-all duration-200 ${
              agent.status === 'Aktif' 
                ? 'border-[#10B981] ring-1 ring-[#10B981]/20' 
                : 'border-[#DCE3DD] hover:border-gray-300'
            }`}
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

            {/* Action State Button */}
            <div className="flex justify-end pt-1">
              <button 
                onClick={() => {
                  if (agent.status !== 'Aktif') {
                    // Logika aktivasi agen bisa dikembangkan di sini, lalu kembali ke halaman chat
                    setActivePage('chat');
                  }
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition duration-150 cursor-pointer ${
                  agent.status === 'Aktif' 
                    ? 'bg-[#D1E7DD] text-[#007A5A]' 
                    : 'bg-[#F4F6F3] border border-[#DCE3DD] hover:bg-gray-200 text-gray-700'
                }`}
              >
                {agent.status}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}