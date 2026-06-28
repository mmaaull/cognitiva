import React from 'react';
import { Plus, BarChart3, Folder, Brain, Settings, MessageSquare, Users, FileText, LogOut } from 'lucide-react';
import logoIcon from '../assets/Logo.png';

export default function Sidebar({ activePage, setActivePage, userRole, authUser, chatHistory = [], selectedHistoryId, onSelectHistory, onLogout }) {
  return (
    <aside className="w-[260px] h-screen bg-gradient-to-b from-[#ECF7F1] via-[#EAF2EE] to-[#E7EEF2] border-r border-[#DCE3DD] flex flex-col justify-between p-4.5 font-sans select-none shrink-0">
      
      {/* KLASTER ATAS & TENGAH (TIDAK BERUBAH) */}
      <div className="flex flex-col gap-5 overflow-hidden flex-1">
        {/* Logo */}
        <div className="px-1.5 py-2 shrink-0">
          <div className="px-1 py-1 flex items-center gap-2.5">
            <img src={logoIcon} alt="Cognitiva Logo" className="h-9 w-auto object-contain shrink-0" />
            <div className="min-w-0">
              <span className="block text-sm font-extrabold text-gray-900 leading-tight">Cognitiva</span>
              <span className="block text-[9px] text-gray-500 font-semibold leading-tight">
                (Cognitive Guidance and Intelligent Thinking Assistant)
              </span>
            </div>
          </div>
        </div>

        {userRole === 'student' && (
          <button
            onClick={() => setActivePage('chat')}
            className={`w-full h-10 border rounded-xl flex items-center gap-2.5 px-3.5 font-semibold text-xs transition duration-200 shadow-xs cursor-pointer shrink-0 ${
              activePage === 'chat' ? 'bg-white border-[#10B981] text-gray-900' : 'bg-white border-[#DCE3DD] text-gray-700'
            }`}
          >
            <Plus size={16} className="text-[#10B981]" />
            <span>Workspace Chat</span>
          </button>
        )}

        {/* Menu Navigasi Utama */}
        <nav className="flex flex-col gap-1 shrink-0">
          {userRole === 'student' && (
            <>
              <button
                onClick={() => setActivePage('analytics')}
                className={`w-full h-9 rounded-lg flex items-center gap-3 px-3 font-medium text-xs cursor-pointer ${activePage === 'analytics' ? 'bg-white/70 text-gray-900 font-semibold shadow-xs' : 'text-gray-600 hover:bg-white/50'}`}
              >
                <BarChart3 size={16} className="text-gray-500" />
                <span>Analytics Dashboard</span>
              </button>

              <button
                onClick={() => setActivePage('project')}
                className={`w-full h-9 rounded-lg flex items-center gap-3 px-3 font-medium text-xs cursor-pointer ${activePage === 'project' ? 'bg-white/70 text-gray-900 font-semibold shadow-xs' : 'text-gray-600 hover:bg-white/50'}`}
              >
                <Folder size={16} className="text-gray-500" />
                <span>Project Space</span>
              </button>

              <button
                onClick={() => setActivePage('skill')}
                className={`w-full h-10 rounded-xl flex items-center gap-3 px-3 font-bold text-xs cursor-pointer shadow-xs ${activePage === 'skill' ? 'bg-[#D1E7DD] text-[#007A5A]' : 'text-gray-600 hover:bg-white/50'}`}
              >
                <Brain size={16} className={activePage === 'skill' ? 'text-[#007A5A]' : 'text-gray-500'} />
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="leading-tight">Skill Workspace</span>
                  <span className="text-[10px] font-normal opacity-80 truncate max-w-[140px]">AI Agent Layer Lengkap</span>
                </div>
              </button>
            </>
          )}

          {userRole === 'teacher' && (
            <>
              <button
                onClick={() => setActivePage('teacher-overview')}
                className={`w-full h-9 rounded-lg flex items-center gap-3 px-3 font-bold text-xs cursor-pointer transition ${
                  activePage === 'teacher-overview'
                    ? 'bg-blue-50 text-blue-700 shadow-xs border border-blue-100'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                <Users size={16} className={activePage === 'teacher-overview' ? 'text-blue-600' : 'text-gray-500'} />
                <span>Class Overview</span>
              </button>

              <button
                onClick={() => setActivePage('teacher-logs')}
                className={`w-full h-9 rounded-lg flex items-center gap-3 px-3 font-bold text-xs cursor-pointer transition ${
                  activePage === 'teacher-logs'
                    ? 'bg-blue-50 text-blue-700 shadow-xs border border-blue-100'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                <FileText size={16} className={activePage === 'teacher-logs' ? 'text-blue-600' : 'text-gray-500'} />
                <span>Thinking Logs</span>
              </button>
            </>
          )}
        </nav>

        {userRole === 'student' && (
          <div className="flex flex-col flex-1 overflow-hidden mt-2">
            <div className="px-3 text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1.5 shrink-0">
              Riwayat Chat
            </div>

            <div className="flex flex-col gap-0.5 overflow-y-auto pr-1 select-none">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    onSelectHistory?.(chat.id);
                    setActivePage('chat');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-start gap-2.5 transition cursor-pointer shrink-0 ${
                    selectedHistoryId === chat.id
                      ? 'bg-white text-gray-900 border border-[#DCE3DD]'
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                  }`}
                >
                  <MessageSquare size={13} className="text-gray-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="block truncate font-semibold">{chat.title}</span>
                    <span className="block truncate text-[10px] text-gray-400">
                      User: {chat.prompt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* KLASTER BAWAH (SETTING, DEMO CONTROLLER, & PROFIL) */}
      <div className="flex flex-col gap-2 border-t border-[#DCE3DD]/60 pt-4 shrink-0">
        <button onClick={() => setActivePage('setting')} className="w-full h-9 rounded-lg flex items-center gap-3 px-3 font-medium text-xs text-gray-600 hover:bg-white/50 cursor-pointer">
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
            {(authUser?.name?.[0] || (userRole === 'student' ? 'S' : 'T')).toUpperCase()}
          </div>
          <div className="flex flex-col text-left overflow-hidden">
            <span className="text-gray-900 leading-tight truncate">{authUser?.name || (userRole === 'student' ? 'Student User' : 'Teacher User')}</span>
            <span className="text-[10px] text-gray-400 font-normal truncate">
              {userRole === 'student' ? 'Student Account' : 'Lecturer Account'}
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
}