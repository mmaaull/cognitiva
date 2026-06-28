import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SkillPage from './components/SkillPage';
import AnalyticsPage from './components/AnalyticsPage';
import TeacherDashboard from './components/TeacherDashboard'; // Komponen Baru
import { WelcomePage, LoginPage, RegisterPage } from './components/AuthPages';

const AUTH_STAGE_KEY = 'thinker.authStage';
const AUTH_ROLE_KEY = 'thinker.userRole';
const AUTH_USER_KEY = 'thinker.authUser';
const AUTH_USERS_KEY = 'thinker.authUsers';

const AUTH_STAGES = ['welcome', 'login', 'register', 'authenticated'];
const DEFAULT_ROLE = 'student';

const DEMO_USERS = [
  {
    id: 'demo-teacher',
    name: 'Dr. Budi',
    email: 'admin@thinker.ai',
    password: 'thinker-demo',
    role: 'teacher'
  },
  {
    id: 'demo-student',
    name: 'Faiz',
    email: 'student@thinker.ai',
    password: 'thinker-demo',
    role: 'student'
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
    }
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

  // Fungsi otomatis ganti halaman default saat ganti role
  const handleRoleChange = (role) => {
    const nextRole = role === 'teacher' ? 'teacher' : 'student';
    setUserRole(nextRole);
    setAuthUser(prevUser => (prevUser ? { ...prevUser, role: nextRole } : prevUser));
    setActivePage(nextRole === 'teacher' ? 'teacher-overview' : 'chat');
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
    setAuthStage('authenticated');

    return { ok: true, user: safeUser };
  };

  const handleLogout = () => {
    setAuthStage('welcome');
    setAuthUser(null);
    setActivePage('chat');
  };

  const handleLogin = ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const matchedUser = readUsers().find((user) => normalizeEmail(user.email) === normalizedEmail);

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
        onEnterDemo={() => handleLogin({ email: 'admin@thinker.ai', password: 'thinker-demo' })}
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
        activeAgent={activeAgent} 
        userRole={userRole} 
        setUserRole={handleRoleChange} 
        onLogout={handleLogout}
      />

      <div className="flex-1 h-full overflow-hidden">
        {/* VIEW MAHASISWA */}
        {userRole === 'student' && (
          <>
            {activePage === 'chat' && (
              <MainContent activeAgent={activeAgent} onReflectionComplete={triggerReflectionSuccess} />
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