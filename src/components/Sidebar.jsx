import React from 'react';
import { Plus, BarChart3, Folder, Brain, Settings, MessageSquare, Users, ToggleLeft, ToggleRight, LogOut } from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, activeAgent, userRole, setUserRole, onLogout }) {
  // Data riwayat chat (History) tetap dipertahankan secara statis & fungsional
  const chatHistory = [
    { id: 'h1', title: 'Esai Cognitive Offloading' },
    { id: 'h2', title: 'Analisis Taksonomi Bloom' },
    { id: 'h3', title: 'Review Arsitektur THINKER AI' }
  ];

  return (
    <aside className="w-[240px] h-screen bg-[#EAEFEA] border-r border-[#DCE3DD] flex flex-col justify-between p-4.5 font-sans select-none shrink-0">
      
      {/* KLASTER ATAS & TENGAH (TIDAK BERUBAH) */}
      <div className="flex flex-col gap-5 overflow-hidden flex-1">
        {/* Logo */}
        <div className="flex items-center gap-3 px-1.5 py-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center text-white font-black text-base shadow-sm">T</div>
          <span className="text-gray-900 font-bold text-base tracking-wide">THINKER AI</span>
        </div>

        {/* Tombol Workspace Chat */}
        <button 
          onClick={() => {
            setUserRole('student');
            setActivePage('chat');
          }}
          className={`w-full h-10 border rounded-xl flex items-center gap-2.5 px-3.5 font-semibold text-xs transition duration-200 shadow-xs cursor-pointer shrink-0 ${
            activePage === 'chat' ? 'bg-white border-[#10B981] text-gray-900' : 'bg-white border-[#DCE3DD] text-gray-700'
          }`}
        >
          <Plus size={16} className="text-[#10B981]" />
          <span>Workspace Chat</span>
        </button>

        {/* Menu Navigasi Utama */}
        <nav className="flex flex-col gap-1 shrink-0">
          <button 
            onClick={() => { setUserRole('student'); setActivePage('analytics'); }} 
            className={`w-full h-9 rounded-lg flex items-center gap-3 px-3 font-medium text-xs cursor-pointer ${activePage === 'analytics' ? 'bg-white/70 text-gray-900 font-semibold shadow-xs' : 'text-gray-600 hover:bg-white/50'}`}
          >
            <BarChart3 size={16} className="text-gray-500" />
            <span>Analytics Dashboard</span>
          </button>

          <button 
            onClick={() => { setUserRole('student'); setActivePage('project'); }} 
            className={`w-full h-9 rounded-lg flex items-center gap-3 px-3 font-medium text-xs cursor-pointer ${activePage === 'project' ? 'bg-white/70 text-gray-900 font-semibold shadow-xs' : 'text-gray-600 hover:bg-white/50'}`}
          >
            <Folder size={16} className="text-gray-500" />
            <span>Project Space</span>
          </button>

          <button 
            onClick={() => { setUserRole('student'); setActivePage('skill'); }} 
            className={`w-full h-10 rounded-xl flex items-center gap-3 px-3 font-bold text-xs cursor-pointer shadow-xs ${activePage === 'skill' ? 'bg-[#D1E7DD] text-[#007A5A]' : 'text-gray-600 hover:bg-white/50'}`}
          >
            <Brain size={16} className={activePage === 'skill' ? 'text-[#007A5A]' : 'text-gray-500'} />
            <div className="flex flex-col text-left overflow-hidden">
              <span className="leading-tight">Skill Workspace</span>
              <span className="text-[10px] font-normal opacity-80 truncate max-w-[140px]">Active: {activeAgent.name}</span>
            </div>
          </button>

          {/* INTEGRASI KEUNGGULAN BARU: Akses Panel Dosen disisipkan rapi di sini */}
          <button 
            onClick={() => { setUserRole('teacher'); setActivePage('teacher-overview'); }} 
            className={`w-full h-9 rounded-lg flex items-center gap-3 px-3 font-bold text-xs cursor-pointer transition ${
              ['teacher-overview', 'teacher-logs'].includes(activePage) 
                ? 'bg-blue-50 text-blue-700 shadow-xs border border-blue-100' 
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Users size={16} className={['teacher-overview', 'teacher-logs'].includes(activePage) ? 'text-blue-600' : 'text-gray-500'} />
            <span>Lecturer Control Panel</span>
          </button>
        </nav>

        {/* 📜 SEKSI RIWAYAT CHAT (HISTORY) - TETAP UTUH & TIDAK HILANG */}
        <div className="flex flex-col flex-1 overflow-hidden mt-2">
          <div className="px-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1.5 shrink-0">
            Riwayat Chat
          </div>
          
          <div className="flex flex-col gap-0.5 overflow-y-auto pr-1 select-none">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => { setUserRole('student'); setActivePage('chat'); }}
                className="w-full h-8 text-left px-3 rounded-lg text-xs font-medium text-gray-600 hover:bg-white/50 hover:text-gray-900 flex items-center gap-2.5 transition truncate cursor-pointer shrink-0"
              >
                <MessageSquare size={13} className="text-gray-400 shrink-0" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* KLASTER BAWAH (SETTING, DEMO CONTROLLER, & PROFIL) */}
      <div className="flex flex-col gap-2 border-t border-[#DCE3DD]/60 pt-4 shrink-0">
        
        {/* Tombol Sakelar Cepat untuk Demonstrasi di Hadapan Juri */}
        <button 
          onClick={() => {
            const nextRole = userRole === 'student' ? 'teacher' : 'student';
            setUserRole(nextRole);
            setActivePage(nextRole === 'teacher' ? 'teacher-overview' : 'chat');
          }}
          className="w-full h-9 rounded-xl bg-gray-900 text-white font-bold text-[10px] tracking-wider uppercase flex items-center justify-between px-3 hover:bg-gray-800 transition cursor-pointer shadow-md"
        >
          <span className="text-gray-300">Mode Demo:</span>
          <div className="flex items-center gap-1">
            <span>{userRole === 'student' ? 'Mahasiswa' : 'Dosen'}</span>
            {userRole === 'student' ? <ToggleLeft size={16} className="text-emerald-400" /> : <ToggleRight size={16} className="text-blue-400" />}
          </div>
        </button>

        <button onClick={() => setActivePage('project')} className="w-full h-9 rounded-lg flex items-center gap-3 px-3 font-medium text-xs text-gray-600 hover:bg-white/50 cursor-pointer">
          <Settings size={16} />
          <span>Setting</span>
        </button>

        <button onClick={onLogout} className="w-full h-9 rounded-lg flex items-center justify-between gap-3 px-3 font-semibold text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-100 cursor-pointer">
          <span className="flex items-center gap-3">
            <LogOut size={16} />
            <span>Keluar ke Publik</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Exit</span>
        </button>

        {/* Tampilan Profil Pengguna Akun Dinamis */}
        <div className="w-full h-10 flex items-center gap-3 px-2.5 text-gray-700 font-semibold text-xs border-t border-gray-200/50 pt-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold shrink-0 transition-colors duration-300 ${userRole === 'student' ? 'bg-emerald-600' : 'bg-blue-700'}`}>
            {userRole === 'student' ? 'F' : 'D'}
          </div>
          <div className="flex flex-col text-left overflow-hidden">
            <span className="text-gray-900 leading-tight truncate">{userRole === 'student' ? 'Faiz' : 'Dr. Budi (Dosen)'}</span>
            <span className="text-[10px] text-gray-400 font-normal truncate">{userRole === 'student' ? 'Student Account' : 'Lecturer Account'}</span>
          </div>
        </div>
      </div>

    </aside>
  );
}