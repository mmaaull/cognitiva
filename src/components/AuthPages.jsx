import React, { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Fingerprint, LogIn, LockKeyhole, Mail, ShieldCheck, Sparkles, UserPlus } from 'lucide-react';
import logoIcon from '../assets/Logo.png';

function AuthShell({ eyebrow, title, description, children, footer, badge, onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-[32px] border border-emerald-100 bg-white/80 shadow-[0_24px_80px_rgba(16,185,129,0.12)] backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(6,95,70,0.10),_transparent_28%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] p-6 sm:p-10">
          <section className="rounded-[28px] bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-7 sm:p-10 flex flex-col justify-between min-h-[560px] shadow-xl">
            <div>
              <div className="inline-flex items-center gap-3">
                <img src={logoIcon} alt="Cognitiva Logo" className="h-10 w-auto object-contain shrink-0" />
                <div className="min-w-0">
                  <p className="text-base font-bold leading-tight text-white">Cognitiva</p>
                  <p className="text-[10px] leading-tight text-white/80">
                    (Cognitive Guidance and Intelligent Thinking Assistant)
                  </p>
                </div>
              </div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-50">
                <Sparkles size={12} />
                {eyebrow}
              </div>
              <h1 className="mt-6 max-w-lg text-4xl font-semibold tracking-tight sm:text-5xl">
                Cognitiva untuk alur belajar yang lebih terarah.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/85 sm:text-base">
                {description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <ShieldCheck size={18} className="text-emerald-300" />
                <p className="mt-3 text-sm font-semibold">Guardrail aktif</p>
                <p className="mt-1 text-xs leading-5 text-white/70">Mendorong refleksi sebelum jawaban ditampilkan penuh.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <BookOpen size={18} className="text-emerald-300" />
                <p className="mt-3 text-sm font-semibold">History tetap hidup</p>
                <p className="mt-1 text-xs leading-5 text-white/70">Riwayat chat dan workspace bisa dibuka ulang setelah login.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <Fingerprint size={18} className="text-emerald-300" />
                <p className="mt-3 text-sm font-semibold">Multi-role sync</p>
                <p className="mt-1 text-xs leading-5 text-white/70">Juri, dosen, dan mahasiswa berpindah mode tanpa reset total.</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-center">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                <CheckCircle2 size={12} />
                {badge}
              </span>
              {onBack && (
                <button onClick={onBack} className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">
                  Kembali
                </button>
              )}
            </div>
            <div className="rounded-[28px] border border-emerald-100 bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
              {children}
              {footer}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function WelcomePage({ onOpenLogin, onOpenRegister, onEnterDemo }) {
  return (
    <AuthShell
      eyebrow="Cognitiva Public Access"
      badge="Landing"
      onBack={undefined}
      description="Platform ini menyatukan pembelajaran berbasis refleksi, kontrol anti-copy-paste, dan sinkronisasi multi-role untuk skenario demo edukasi."
      footer={
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button onClick={onOpenLogin} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700">
            Masuk ke Dashboard
            <ArrowRight size={16} />
          </button>
          <button onClick={onOpenRegister} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50">
            Daftar Demo
            <UserPlus size={16} />
          </button>
          <button onClick={onEnterDemo} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Demo cepat
            <Sparkles size={16} />
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-600">Pengenalan Sistem</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Mode publik yang bersih, lalu masuk ke pengalaman belajar penuh.</h2>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Halaman ini menampilkan ringkasan sistem, sementara akses ke dashboard utama dibuka setelah simulasi login atau registrasi selesai.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Fokus</p>
            <p className="mt-2 text-sm text-slate-700">Interaksi AI yang tetap mengajak berpikir, bukan sekadar menyalin jawaban.</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Akses</p>
            <p className="mt-2 text-sm text-slate-700">Dukungan mahasiswa, dosen, dan juri dalam satu struktur state pusat.</p>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}

export function LoginPage({ onBack, onOpenRegister, onLogin }) {
  const [email, setEmail] = useState('admin@cognitiva.ai');
  const [password, setPassword] = useState('cognitiva-demo');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Lengkapi email dan password terlebih dahulu.');
      return;
    }

    const result = onLogin?.({ email, password });
    if (result && result.ok === false) {
      setErrorMessage(result.message);
      return;
    }

    setErrorMessage('');
  };

  return (
    <AuthShell
      eyebrow="Secure Sign In"
      badge="Login"
      onBack={onBack}
      description="Masuk untuk membuka dashboard Cognitiva, melihat history chat, dan mengakses mode sesuai role akun Anda."
      footer={
        <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-600">
          <span>Belum punya akun?</span>
          <button onClick={onOpenRegister} className="font-semibold text-emerald-700 hover:text-emerald-900">Daftar di sini</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Email</label>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Mail size={16} className="text-emerald-600" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full bg-transparent text-sm outline-none" placeholder="nama@kampus.ac.id" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Password</label>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <LockKeyhole size={16} className="text-emerald-600" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full bg-transparent text-sm outline-none" placeholder="••••••••" />
          </div>
        </div>
        {errorMessage && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium leading-6 text-rose-700">
            {errorMessage}
          </p>
        )}
        <p className="text-xs leading-6 text-slate-500">
          Akun demo tersedia: <span className="font-semibold text-slate-700">admin@cognitiva.ai</span> atau <span className="font-semibold text-slate-700">student@cognitiva.ai</span> dengan password <span className="font-semibold text-slate-700">cognitiva-demo</span>.
        </p>
        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700">
          Masuk ke Cognitiva
          <LogIn size={16} />
        </button>
      </form>
    </AuthShell>
  );
}

export function RegisterPage({ onBack, onOpenLogin, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Lengkapi nama, email, dan password terlebih dahulu.');
      return;
    }

    const result = onRegister?.({ name, email, password, role });
    if (result && result.ok === false) {
      setErrorMessage(result.message);
      return;
    }

    setErrorMessage('');
  };

  return (
    <AuthShell
      eyebrow="Create Account"
      badge="Register"
      onBack={onBack}
      description="Registrasi demo digunakan untuk menunjukkan alur publik sebelum peserta masuk ke workspace belajar dan dashboard multi-role."
      footer={
        <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-600">
          <span>Sudah punya akun?</span>
          <button onClick={onOpenLogin} className="font-semibold text-emerald-700 hover:text-emerald-900">Masuk sekarang</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nama</label>
          <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Nama lengkap" />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Email</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="nama@kampus.ac.id" />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Password</label>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Buat kata sandi" />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Role</label>
          <select value={role} onChange={(event) => setRole(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        {errorMessage && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium leading-6 text-rose-700">
            {errorMessage}
          </p>
        )}
        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          Buat Akun Demo
          <UserPlus size={16} />
        </button>
      </form>
    </AuthShell>
  );
}