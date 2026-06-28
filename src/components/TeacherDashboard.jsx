import React from 'react';
import { Users, FileText, AlertTriangle, CheckCircle, Search } from 'lucide-react';

export default function TeacherDashboard({ activeTab, setActiveTab }) {
  // Mock data mahasiswa yang dipantau oleh dosen secara real-time
  const students = [
    { id: 's1', name: 'Faiz', index: '82%', indexStatus: 'Tinggi', score: '68/100', logs: '3 Intervensi', alert: true },
    { id: 's2', name: 'Aditya Pratama', index: '48%', indexStatus: 'Sedang', score: '84/100', logs: '8 Intervensi', alert: false },
    { id: 's3', name: 'Siti Rahma', index: '32%', indexStatus: 'Rendah', score: '92/100', logs: '12 Intervensi', alert: false }
  ];

  return (
    <div className="h-full w-full p-8 flex flex-col overflow-y-auto font-sans bg-gradient-to-br from-[#F4F9F6] via-[#F4F6F3] to-[#EEF4F8] animate-in fade-in duration-200">
      
      {/* Header Dashboard Dosen */}
      <div className="w-full max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Lecturer Control Panel</h1>
          <p className="text-sm text-gray-500">Panel Cognitiva untuk memantau log penalaran, integritas akademik, dan progres berpikir kelas.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            LMS Sync Connected
          </span>
        </div>
      </div>

      {/* VIEW TABS 1: IKHTISAR KELAS */}
      {activeTab === 'teacher-overview' && (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
          
          {/* Bar Data Ringkasan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/95 backdrop-blur border border-[#DCE3DD] rounded-2xl p-5 shadow-sm">
              <span className="text-gray-400 font-bold text-[10px] uppercase">Rerata Ketergantungan AI</span>
              <p className="text-2xl font-black text-red-600 mt-2">54.3%</p>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="w-[54%] h-full bg-red-500 rounded-full" />
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur border border-[#DCE3DD] rounded-2xl p-5 shadow-sm">
              <span className="text-gray-400 font-bold text-[10px] uppercase">Rerata Berpikir Kritis</span>
              <p className="text-2xl font-black text-emerald-600 mt-2">81.3/100</p>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="w-[81%] h-full bg-emerald-500 rounded-full" />
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur border border-[#DCE3DD] rounded-2xl p-5 shadow-sm">
              <span className="text-gray-400 font-bold text-[10px] uppercase">Anomali Copy-Paste Diterkam</span>
              <p className="text-2xl font-black text-amber-600 mt-2">1 Kasus</p>
              <p className="text-[10px] text-amber-600 font-semibold mt-1">⚠️ Segera evaluasi log siswa terkait</p>
            </div>
          </div>

          {/* Tabel Utama Monitoring Siswa */}
          <div className="bg-white/95 backdrop-blur border border-[#DCE3DD] rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={16} className="text-gray-500" />
              Daftar Rekam Kognitif Mahasiswa (Kelas A)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold text-[10px] uppercase bg-gray-50/50">
                    <th className="py-2.5 px-3">Nama Mahasiswa</th>
                    <th className="py-2.5 px-3">AI Dependency Index</th>
                    <th className="py-2.5 px-3">Critical Thinking Score</th>
                    <th className="py-2.5 px-3">Status Guardrail</th>
                    <th className="py-2.5 px-3 text-center">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-3 px-3 font-bold text-gray-900">{st.name}</td>
                      <td className={`py-3 px-3 font-bold ${st.alert ? 'text-red-600' : 'text-gray-700'}`}>{st.index} ({st.indexStatus})</td>
                      <td className="py-3 px-3 text-gray-700 font-semibold">{st.score}</td>
                      <td className="py-3 px-3">
                        {st.alert ? (
                          <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit">
                            <AlertTriangle size={10} /> Offloading Alert
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit">
                            <CheckCircle size={10} /> Aman Mandiri
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button onClick={() => setActiveTab('teacher-logs')} className="px-3 py-1 bg-gray-900 text-white font-bold text-[10px] rounded-lg hover:bg-gray-800 transition cursor-pointer">
                          Buka Log
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* VIEW TABS 2: THINKING PROCESS LOG */}
      {activeTab === 'teacher-logs' && (
        <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur border border-[#DCE3DD] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <FileText size={16} className="text-blue-500" />
              Thinking Process Log: Detil Kasus Perubahan Berpikir (Siswa: Faiz)
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Membongkar kronologi penuh interaksi prompt siswa sebelum AI Summary Layer diaktifkan.</p>
          </div>

          <div className="flex flex-col gap-4 text-xs">
            {/* Log Item 1 */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative">
              <span className="absolute top-3 right-4 text-[9px] font-bold text-gray-400">LOG #014 - 10 Menit Lalu</span>
              <p className="font-bold text-gray-900">1. Raw Prompt (Input Awal Siswa):</p>
              <p className="text-gray-600 bg-white p-2 rounded-lg border border-gray-100 mt-1 italic">"buatkan esai tentang dampak AI dalam pendidikan beserta daftar pustaka komplit"</p>
              
              <p className="font-bold text-gray-900 mt-3 text-amber-700">2. Intervensi Kebijakan (Reflect Before Reveal Input):</p>
              <p className="text-amber-800 bg-amber-50/50 p-2 rounded-lg border border-amber-200 mt-1 italic">"Saya rasa AI membuat siswa malas berpikir karena langsung menyuapi jawaban instan tanpa proses analisa kognitif."</p>

              <p className="font-bold text-gray-900 mt-3 text-emerald-700">3. Hasil Evaluasi Kritis (Socratic Response):</p>
              <p className="text-emerald-900 bg-emerald-50/30 p-2 rounded-lg border border-emerald-100 mt-1">Sistem berhasil memblokir copy-paste otomatis dan memaksa struktur esai dibangun 85% dari diksi kata mandiri siswa.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}