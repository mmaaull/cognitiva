import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SkillPage from './components/SkillPage';
import AnalyticsPage from './components/AnalyticsPage';
import TeacherDashboard from './components/TeacherDashboard'; // Komponen Baru
import { WelcomePage, LoginPage, RegisterPage } from './components/AuthPages';

const AUTH_STAGE_KEY = 'cognitiva.authStage';
const AUTH_ROLE_KEY = 'cognitiva.userRole';
const AUTH_USER_KEY = 'cognitiva.authUser';
const AUTH_USERS_KEY = 'cognitiva.authUsers';

const AUTH_STAGES = ['welcome', 'login', 'register', 'authenticated'];
const DEFAULT_ROLE = 'student';

const DEMO_USERS = [
  {
    id: 'demo-teacher',
    name: 'Dr. Budi',
    email: 'admin@cognitiva.ai',
    password: 'cognitiva-demo',
    role: 'teacher'
  },
  {
    id: 'demo-student',
    name: 'Faiz',
    email: 'student@cognitiva.ai',
    password: 'cognitiva-demo',
    role: 'student'
  }
];

const STUDENT_CHAT_HISTORY = [
  {
    id: 'h1',
    title: 'Sesi: Dampak AI dalam Pendidikan',
    prompt: 'Saya ingin membahas dampak AI pada pendidikan agar tidak terjadi copy-paste instan.',
    reflection: 'AI membantu belajar, tetapi harus dibatasi dengan proses refleksi agar siswa tetap berpikir mandiri.',
    sessionMeta: {
      intention: 'concept-exploration',
      risk: { index: 66, level: 'medium' },
      routed: { reason: 'Model router memilih mode scaffolding konseptual untuk pembahasan reflektif.' },
      model: 'Gemini Pro'
    },
    messages: [
      { role: 'user', text: 'Saya ingin membahas dampak AI pada pendidikan agar tidak terjadi copy-paste instan.' },
      { role: 'ai', agent: 'Socratic Agent', text: 'Klaim utama apa yang ingin kamu buktikan terlebih dahulu terkait dampak AI di kelas?' },
      { role: 'user', text: 'Klaim saya: AI bermanfaat jika mendorong refleksi, bukan memberi jawaban final.' },
      { role: 'ai', agent: 'Reasoning Agent', text: 'Susun alur logikanya: masalah utama, penyebab, lalu solusi yang kamu tawarkan.' },
      { role: 'ai', agent: 'Evidence Checker Agent', text: 'Tambahkan bukti: data, studi, atau contoh nyata penggunaan AI di tugas akademik.' },
      { role: 'ai', agent: 'Counter-Argument Agent', text: 'Bagaimana jika ada pihak yang berpendapat AI justru selalu meningkatkan produktivitas belajar?' },
      { role: 'user', text: 'Saya jawab: produktivitas naik, tetapi kualitas berpikir bisa turun jika tanpa guardrail.' },
      { role: 'ai', agent: 'Reflection Coach Agent', text: 'Refleksikan kembali: bagian argumenmu mana yang masih lemah dan perlu diperkuat?' },
      { role: 'ai', agent: 'Argument Evaluator Agent', text: 'Evaluasi sementara: struktur argumen sudah kuat, bukti empiris perlu ditambah agar lebih meyakinkan.' },
      { role: 'ai', agent: 'Summary Agent', text: 'Ringkasan: AI sebaiknya diposisikan sebagai mitra berpikir dengan sistem refleksi, bukan mesin jawaban instan.' }
    ]
  },
  {
    id: 'h2',
    title: 'Sesi: Analisis Taksonomi Bloom',
    prompt: 'Tolong bantu saya mengembangkan analisis Bloom tanpa langsung memberi jawaban jadi.',
    reflection: 'Saya ingin mulai dari level analisis dan evaluasi agar argumen esai lebih dalam.',
    sessionMeta: {
      intention: 'concept-exploration',
      risk: { index: 58, level: 'medium' },
      routed: { reason: 'Model router mengarahkan ke pembahasan bertahap berbasis reasoning dan evaluasi.' },
      model: 'GPT-4o'
    },
    messages: [
      { role: 'user', text: 'Tolong bantu saya mengembangkan analisis Bloom tanpa langsung memberi jawaban jadi.' },
      { role: 'ai', agent: 'Socratic Agent', text: 'Pada level Bloom mana analisismu saat ini, dan level mana yang ingin kamu capai?' },
      { role: 'user', text: 'Saat ini baru memahami konsep, saya ingin naik ke analisis dan evaluasi.' },
      { role: 'ai', agent: 'Reasoning Agent', text: 'Bagus. Mari pecah menjadi: identifikasi komponen, relasi antarkomponen, lalu nilai kekuatan argumen.' },
      { role: 'ai', agent: 'Summary Agent', text: 'Ringkas: kamu perlu mengubah uraian deskriptif menjadi analisis perbandingan + evaluasi berbasis bukti.' }
    ]
  },
  {
    id: 'h3',
    title: 'Sesi: Review Arsitektur Cognitiva',
    prompt: 'Bantu review arsitektur Cognitiva agar alurnya konsisten dari prompt sampai output.',
    reflection: 'Fokus saya memastikan guardrail dan orchestrator benar-benar berjalan sebelum summary.',
    sessionMeta: {
      intention: 'draft-review',
      risk: { index: 44, level: 'medium' },
      routed: { reason: 'Model router memilih mode review argumen agar evaluasi arsitektur lebih presisi.' },
      model: 'Claude 3.5'
    },
    messages: [
      { role: 'user', text: 'Bantu review arsitektur Cognitiva agar alurnya konsisten dari prompt sampai output.' },
      { role: 'ai', agent: 'Argument Evaluator Agent', text: 'Kekuatan arsitekturmu: pembagian layer jelas. Celah utama: definisi trigger tiap guardrail perlu dipertegas.' },
      { role: 'ai', agent: 'Counter-Argument Agent', text: 'Jika pengguna mencoba bypass refleksi, mekanisme fallback apa yang kamu siapkan?' },
      { role: 'user', text: 'Saya akan pakai response limiter dan wajibkan reflection requirement sebelum reveal.' },
      { role: 'ai', agent: 'Summary Agent', text: 'Ringkasan review: arsitektur sudah tepat untuk prototipe, lanjutkan dengan aturan trigger yang lebih eksplisit.' }
    ]
  }
];

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

const readStorageValue = (key, fallback) => {
  if (!canUseStorage()) return fallback;

  try {
    const rawValue = window.localStorage.getItem(key);
    if (rawValue === null) return fallback;
    return JSON.parse(rawValue);
  } catch {
    return fallback;
  }
};

const writeStorageValue = (key, value) => {
  if (!canUseStorage()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write failures so the UI stays usable.
  }
};

const readStoredAuth = () => {
  const storedStage = readStorageValue(AUTH_STAGE_KEY, 'welcome');
  const storedRole = readStorageValue(AUTH_ROLE_KEY, DEFAULT_ROLE);
  const storedUser = readStorageValue(AUTH_USER_KEY, null);

  return {
    authStage: AUTH_STAGES.includes(storedStage) ? storedStage : 'welcome',
    userRole: storedRole === 'teacher' ? 'teacher' : DEFAULT_ROLE,
    authUser: storedUser && typeof storedUser === 'object' ? storedUser : null
  };
};

const normalizeEmail = (value) => value.trim().toLowerCase();

export default function App() {
  const storedAuth = readStoredAuth();
  const [activePage, setActivePage] = useState('chat');
  const [userRole, setUserRole] = useState(storedAuth.authUser?.role === 'teacher' ? 'teacher' : storedAuth.userRole); // 'student' atau 'teacher'
  const [authStage, setAuthStage] = useState(storedAuth.authStage); // 'welcome', 'login', 'register', 'authenticated'
  const [authUser, setAuthUser] = useState(storedAuth.authUser);
  const [selectedHistoryId, setSelectedHistoryId] = useState(STUDENT_CHAT_HISTORY[0].id);

  const [activeAgent, setActiveAgent] = useState({
    id: 'socratic',
    name: 'Socratic Agent',
    dotBg: 'bg-emerald-500',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
    label: 'SOCRATIC PARTNER',
    defaultResponse: 'Analisis draf awal Anda mengenai dampak kognitif AI sangat menarik, Faiz. Namun, bagaimana Anda akan membuktikan klaim tersebut secara objektif menggunakan landasan empiris di dalam esai ini?'
  });

  const [analyticsData, setAnalyticsData] = useState({
    dependencyIndex: 82,
    criticalThinkingScore: 68,
    sessionsLogged: 14
  });

  useEffect(() => {
    if (!canUseStorage()) return;

    const storedUsers = readStorageValue(AUTH_USERS_KEY, null);
    if (!Array.isArray(storedUsers) || storedUsers.length === 0) {
      writeStorageValue(AUTH_USERS_KEY, DEMO_USERS);
      return;
    }

    const normalizedStored = [...storedUsers];
    DEMO_USERS.forEach((demoUser) => {
      const exists = normalizedStored.some((user) => normalizeEmail(user.email) === normalizeEmail(demoUser.email));
      if (!exists) normalizedStored.push(demoUser);
    });
    writeStorageValue(AUTH_USERS_KEY, normalizedStored);
  }, []);

  useEffect(() => {
    writeStorageValue(AUTH_STAGE_KEY, authStage);
    writeStorageValue(AUTH_ROLE_KEY, userRole);

    if (authUser) {
      writeStorageValue(AUTH_USER_KEY, authUser);
    } else if (canUseStorage()) {
      try {
        window.localStorage.removeItem(AUTH_USER_KEY);
      } catch {
        // Ignore storage cleanup failures.
      }
    }
  }, [authStage, authUser, userRole]);

  const readUsers = () => {
    const storedUsers = readStorageValue(AUTH_USERS_KEY, DEMO_USERS);
    return Array.isArray(storedUsers) ? storedUsers : DEMO_USERS;
  };

  const saveUsers = (users) => {
    writeStorageValue(AUTH_USERS_KEY, users);
  };

  const triggerReflectionSuccess = () => {
    setAnalyticsData(prev => ({
      ...prev,
      dependencyIndex: Math.max(prev.dependencyIndex - 4, 45),
      criticalThinkingScore: Math.min(prev.criticalThinkingScore + 3, 100)
    }));
  };

  const handleAuthenticated = (nextUser) => {
    const nextRole = nextUser?.role === 'teacher' ? 'teacher' : 'student';
    const safeUser = {
      id: nextUser?.id ?? `user-${Date.now()}`,
      name: nextUser?.name?.trim() || (nextRole === 'teacher' ? 'Dr. Budi' : 'Faiz'),
      email: normalizeEmail(nextUser?.email ?? ''),
      role: nextRole
    };

    setUserRole(nextRole);
    setAuthUser(safeUser);
    setActivePage(nextRole === 'teacher' ? 'teacher-overview' : 'chat');
    if (nextRole === 'student') {
      setSelectedHistoryId(STUDENT_CHAT_HISTORY[0].id);
    }
    setAuthStage('authenticated');

    return { ok: true, user: safeUser };
  };

  const handleLogout = () => {
    setAuthStage('welcome');
    setAuthUser(null);
    setActivePage('chat');
    setSelectedHistoryId(STUDENT_CHAT_HISTORY[0].id);
  };

  const selectedHistorySession = STUDENT_CHAT_HISTORY.find((item) => item.id === selectedHistoryId) || STUDENT_CHAT_HISTORY[0];

  const handleLogin = ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const aliasEmail = normalizedEmail
      .replace('@thinker.ai', '@cognitiva.ai')
      .replace('@cognitiva.ai', '@thinker.ai');
    const matchedUser = readUsers().find((user) => {
      const userEmail = normalizeEmail(user.email);
      return userEmail === normalizedEmail || userEmail === aliasEmail;
    });

    if (!matchedUser) {
      return { ok: false, message: 'Akun belum ditemukan. Coba daftar dulu atau pakai akun demo yang tersedia.' };
    }

    if (matchedUser.password !== password) {
      return { ok: false, message: 'Password salah. Periksa kembali kredensial Anda.' };
    }

    return handleAuthenticated(matchedUser);
  };

  const handleRegister = ({ name, email, password, role }) => {
    const normalizedEmail = normalizeEmail(email);
    const existingUsers = readUsers();

    if (existingUsers.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
      return { ok: false, message: 'Email sudah terdaftar. Gunakan login atau email lain.' };
    }

    const nextUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: role === 'teacher' ? 'teacher' : 'student'
    };

    saveUsers([...existingUsers, nextUser]);

    return handleAuthenticated(nextUser);
  };

  const renderPublicAuthStage = () => {
    if (authStage === 'login') {
      return (
        <LoginPage
          onBack={() => setAuthStage('welcome')}
          onOpenRegister={() => setAuthStage('register')}
          onLogin={handleLogin}
        />
      );
    }

    if (authStage === 'register') {
      return (
        <RegisterPage
          onBack={() => setAuthStage('welcome')}
          onOpenLogin={() => setAuthStage('login')}
          onRegister={handleRegister}
        />
      );
    }

    return (
      <WelcomePage
        onOpenLogin={() => setAuthStage('login')}
        onOpenRegister={() => setAuthStage('register')}
        onEnterDemo={() => handleLogin({ email: 'admin@cognitiva.ai', password: 'cognitiva-demo' })}
      />
    );
  };

  if (authStage !== 'authenticated') {
    return (
      <div key={authStage} className="auth-scene min-h-screen w-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-[#F4F6F3] to-white text-gray-900">
        {renderPublicAuthStage()}
      </div>
    );
  }

  return (
    <div key={`${authStage}-${userRole}`} className="dashboard-scene flex w-screen h-screen bg-[#F4F6F3] overflow-hidden">
      
      {/* Sidebar dengan sistem kendali Multi-Role */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        userRole={userRole} 
        authUser={authUser}
        chatHistory={STUDENT_CHAT_HISTORY}
        selectedHistoryId={selectedHistoryId}
        onSelectHistory={setSelectedHistoryId}
        onLogout={handleLogout}
      />

      <div className="flex-1 h-full overflow-hidden">
        {/* VIEW MAHASISWA */}
        {userRole === 'student' && (
          <>
            {activePage === 'chat' && (
              <MainContent
                activeAgent={activeAgent}
                onReflectionComplete={triggerReflectionSuccess}
                historySession={selectedHistorySession}
              />
            )}
            {activePage === 'skill' && (
              <SkillPage setActivePage={setActivePage} activeAgent={activeAgent} setActiveAgent={setActiveAgent} />
            )}
            {activePage === 'analytics' && (
              <AnalyticsPage analyticsData={analyticsData} />
            )}
          </>
        )}

        {/* VIEW DOSEN / GURU (KEUNGGULAN UTAMA) */}
        {userRole === 'teacher' && (
          <TeacherDashboard activeTab={activePage} setActiveTab={setActivePage} />
        )}
        
        {/* Fallback Halaman Umum */}
        {['project', 'setting'].includes(activePage) && (
          <div className="h-full flex items-center justify-center text-sm text-gray-400 font-medium">
            Halaman {activePage.toUpperCase()} Belum Tersedia
          </div>
        )}
      </div>

    </div>
  );
}