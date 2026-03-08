import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle, CheckSquare, CreditCard, Award, Settings,
  Sun, Moon, MapPin, Music, Share2, Bell, Lock,
  Mail, Phone, Chrome, Eye, EyeOff, ArrowRight, Plus, X,
  Timer, BookOpen, Camera, TrendingUp, Zap, Star,
  ChevronRight, RefreshCw, Send, Check, AlertCircle,
  Home, Trash2, Edit3, Cloud, Wifi, Battery, BarChart2,
  Target, Copy, LogOut, Globe, Flame, Trophy,
  Calendar, Heart, List, ChevronLeft, Repeat,
  Layers, Search, Download, FileText, BarChart,
  Mic, MicOff, Clock, Languages, Crown, Users, Gift,
  Activity, PieChart, AlertTriangle, ShieldCheck, Sparkles,
  ArrowUp, Infinity, UserPlus, Link2, ChevronUp
} from "lucide-react";

const Icon = ({ ic: Ic, size = 18, color, style = {} }) => (
  <Ic size={size} color={color} strokeWidth={2} style={{ flexShrink:0, ...style }}/>
);

// ── i18n ──────────────────────────────────────────────────────────────────────
const STRINGS = {
  tr: {
    appName:"hayatım", greeting_morning:"Günaydın", greeting_day:"İyi günler", greeting_evening:"İyi akşamlar",
    chat:"Sohbet", tasks:"Görevler", budget:"Bütçe", habits:"Alışkanlık", more:"Daha Fazla",
    typeHere:"Ne yapmam gerekiyor?...", send:"Gönder",
    pending:"Bekleyenler", completed:"Tamamlananlar", noTask:"Görev yok!",
    noTaskSub:"Sohbet sekmesinden başla",
    search:"Görev ve notlarda ara...", searchTitle:"Arama",
    weeklyReport:"Haftalık Rapor", export:"Dışa Aktar",
    calendar:"Takvim", notes:"Notlar", badges:"Rozetler",
    leaderboard:"Liderboard", share:"Paylaş", settings:"Ayarlar",
    logout:"Çıkış Yap", save:"Kaydet", cancel:"İptal", add:"Ekle", delete:"Sil",
    theme:"Tema", security:"Güvenlik", pinLock:"PIN Kilidi", pinActive:"Aktif",
    pinOff:"Kapalı", language:"Dil",
    budget_setup:"Kurulum", budget_plan:"AI Plan", budget_track:"Takip",
    salary:"Aylık Maaş", fixedExpenses:"Sabit Giderler",
    generatePlan:"AI Harcama Planı Oluştur", generating:"Plan hazırlanıyor...",
    addExpense:"Harcama Ekle", noExpense:"Henüz harcama yok.",
    remaining:"Bu ay kalan", spent:"harcandı",
    habits_title:"Alışkanlıklarım", newHabit:"Yeni", habitName:"Alışkanlık adı...",
    noHabit:"Alışkanlık yok!", noHabitSub:"Her gün yapacağın şeyleri ekle.",
    dayStreak:"günlük seri",
    notes_title:"Notlarım", newNote:"Yeni Not", noNote:"Not yok!", noNoteSub:"Zengin not editörüyle fikirlerini kaydet.",
    untitled:"Başlıksız", emptyNote:"Boş not",
    badgesTitle:"Rozetler", points:"puan", earned:"Kazanıldı",
    exportTitle:"Dışa Aktar", exportTasks:"Görevleri CSV İndir", exportNotes:"Notları TXT İndir",
    exportDone:"İndirme başladı!",
    reportTitle:"Haftalık Rapor", reportGenerating:"Rapor hazırlanıyor...", reportBtn:"Rapor Oluştur",
    reminderTime:"Hatırlatıcı Saati", setReminder:"Saat Ayarla",
    welcomeTitle:"hayatım", welcomeSub:"Günlük hayatını yönetmek hiç bu kadar kolay olmamıştı.",
    startFree:"Ücretsiz Başla", login:"Giriş Yap", register:"Kayıt Ol",
    name:"Adın", email:"Email", password:"Şifre",
    noAccount:"Hesabın yok mu? Kayıt ol", hasAccount:"Zaten hesabın var mı? Giriş yap",
    back:"Geri", verify:"Doğrula", sendCode:"Kod Gönder",
    pinCreate:"PIN Oluştur", pinConfirm:"PIN'i Onayla", pinEnter:"PIN Gir",
    pinSet1:"4 haneli bir PIN belirle", pinSet2:"Aynı PIN'i tekrar gir", pinVerify:"Uygulamaya giriş için PIN'ini gir",
    wrongPin:"Yanlış PIN", pinMismatch:"PIN'ler eşleşmedi, tekrar dene",
    onboard1t:"Sadece yaz,\ngerisini ben hallederim", onboard1s:"Doğal Türkçe yaz, görev/hatırlatıcı/randevu otomatik oluşsun.",
    onboard2t:"Bütçeni kur,\nAI planı çıkarsın", onboard2s:"Maaş ve sabit giderlerini gir, AI en akıllı planı hazırlasın.",
    onboard3t:"Alışkanlık kazan,\nseri yap!", onboard3s:"Her gün tekrarlayan alışkanlıklarını takip et, seri kır.",
    startApp:"Başlayalım ✦", continueBtn:"Devam →",
    badgeEarned:"Rozet Kazandın!",
  },
  en: {
    appName:"mylife", greeting_morning:"Good morning", greeting_day:"Good afternoon", greeting_evening:"Good evening",
    chat:"Chat", tasks:"Tasks", budget:"Budget", habits:"Habits", more:"More",
    typeHere:"What do I need to do?...", send:"Send",
    pending:"Pending", completed:"Completed", noTask:"No tasks!",
    noTaskSub:"Start from the Chat tab",
    search:"Search tasks and notes...", searchTitle:"Search",
    weeklyReport:"Weekly Report", export:"Export",
    calendar:"Calendar", notes:"Notes", badges:"Badges",
    leaderboard:"Leaderboard", share:"Share", settings:"Settings",
    logout:"Log Out", save:"Save", cancel:"Cancel", add:"Add", delete:"Delete",
    theme:"Theme", security:"Security", pinLock:"PIN Lock", pinActive:"Active",
    pinOff:"Disabled", language:"Language",
    budget_setup:"Setup", budget_plan:"AI Plan", budget_track:"Track",
    salary:"Monthly Salary", fixedExpenses:"Fixed Expenses",
    generatePlan:"Generate AI Spending Plan", generating:"Generating plan...",
    addExpense:"Add Expense", noExpense:"No expenses yet.",
    remaining:"Remaining this month", spent:"spent",
    habits_title:"My Habits", newHabit:"New", habitName:"Habit name...",
    noHabit:"No habits!", noHabitSub:"Add things you do every day.",
    dayStreak:"day streak",
    notes_title:"My Notes", newNote:"New Note", noNote:"No notes!", noNoteSub:"Save your ideas with the rich editor.",
    untitled:"Untitled", emptyNote:"Empty note",
    badgesTitle:"Badges", points:"points", earned:"Earned",
    exportTitle:"Export", exportTasks:"Download Tasks CSV", exportNotes:"Download Notes TXT",
    exportDone:"Download started!",
    reportTitle:"Weekly Report", reportGenerating:"Generating report...", reportBtn:"Generate Report",
    reminderTime:"Reminder Time", setReminder:"Set Time",
    welcomeTitle:"mylife", welcomeSub:"Managing your daily life has never been this easy.",
    startFree:"Start Free", login:"Log In", register:"Sign Up",
    name:"Your name", email:"Email", password:"Password",
    noAccount:"No account? Sign up", hasAccount:"Already have an account? Log in",
    back:"Back", verify:"Verify", sendCode:"Send Code",
    pinCreate:"Create PIN", pinConfirm:"Confirm PIN", pinEnter:"Enter PIN",
    pinSet1:"Set a 4-digit PIN", pinSet2:"Re-enter the same PIN", pinVerify:"Enter your PIN to access the app",
    wrongPin:"Wrong PIN", pinMismatch:"PINs don't match, try again",
    onboard1t:"Just type,\nI'll handle the rest", onboard1s:"Write naturally, tasks/reminders/appointments are created automatically.",
    onboard2t:"Set your budget,\nAI makes the plan", onboard2s:"Enter salary and fixed expenses, AI prepares the smartest plan.",
    onboard3t:"Build habits,\nmake streaks!", onboard3s:"Track your daily recurring habits and build streaks.",
    startApp:"Let's go ✦", continueBtn:"Continue →",
    badgeEarned:"Badge Earned!",
  }
};

// ── Themes ────────────────────────────────────────────────────────────────────
const THEMES = {
  blue:   { n:"Ocean",   a:"#0A84FF", b:"#0055CC", glow:"rgba(10,132,255,0.35)",  o1:"rgba(10,132,255,0.14)",  o2:"rgba(80,160,255,0.08)" },
  purple: { n:"Galaxy",  a:"#BF5AF2", b:"#8B1FD8", glow:"rgba(191,90,242,0.35)", o1:"rgba(191,90,242,0.14)", o2:"rgba(120,60,200,0.08)" },
  green:  { n:"Forest",  a:"#30D158", b:"#1A9140", glow:"rgba(48,209,88,0.35)",  o1:"rgba(48,209,88,0.13)",  o2:"rgba(20,150,60,0.07)"  },
  orange: { n:"Fire",    a:"#FF9F0A", b:"#CC7000", glow:"rgba(255,159,10,0.35)", o1:"rgba(255,159,10,0.14)", o2:"rgba(255,80,20,0.08)"  },
};

const C = {
  bg:"#080810", surface:"#0c0c18",
  g1:"rgba(255,255,255,0.05)", g2:"rgba(255,255,255,0.085)",
  g3:"rgba(255,255,255,0.13)",
  b1:"rgba(255,255,255,0.09)", b2:"rgba(255,255,255,0.17)",
  t1:"rgba(255,255,255,0.94)", t2:"rgba(255,255,255,0.50)", t3:"rgba(255,255,255,0.24)",
  green:"#30D158", orange:"#FF9F0A", pink:"#FF375F", purple:"#BF5AF2", red:"#FF3B30", gold:"#FFD60A",
  tints:{
    "görev":       { c:"#0A84FF", bg:"rgba(10,132,255,0.09)",  bdr:"rgba(10,132,255,0.22)" },
    "hatırlatıcı": { c:"#FF9F0A", bg:"rgba(255,159,10,0.09)",  bdr:"rgba(255,159,10,0.22)" },
    "not":         { c:"#30D158", bg:"rgba(48,209,88,0.09)",   bdr:"rgba(48,209,88,0.22)"  },
    "randevu":     { c:"#BF5AF2", bg:"rgba(191,90,242,0.09)",  bdr:"rgba(191,90,242,0.22)" },
    "alışveriş":   { c:"#FF375F", bg:"rgba(255,55,95,0.09)",   bdr:"rgba(255,55,95,0.22)"  },
    "task":        { c:"#0A84FF", bg:"rgba(10,132,255,0.09)",  bdr:"rgba(10,132,255,0.22)" },
    "reminder":    { c:"#FF9F0A", bg:"rgba(255,159,10,0.09)",  bdr:"rgba(255,159,10,0.22)" },
    "note":        { c:"#30D158", bg:"rgba(48,209,88,0.09)",   bdr:"rgba(48,209,88,0.22)"  },
  }
};

const EXPENSE_CATS = [
  { id:"food",     label:"Yemek/Food",   Icon:Home,      color:"#FF9F0A" },
  { id:"transport",label:"Ulaşım/Trans", Icon:MapPin,    color:"#0A84FF" },
  { id:"shopping", label:"Alışveriş",    Icon:CreditCard,color:"#FF375F" },
  { id:"health",   label:"Sağlık/Health",Icon:Heart,     color:"#30D158" },
  { id:"fun",      label:"Eğlence/Fun",  Icon:Star,      color:"#BF5AF2" },
  { id:"other",    label:"Diğer/Other",  Icon:BarChart2, color:"#636366" },
];

const BADGE_DEFS = [
  { id:"first_task",   Icon:Star,        name:{tr:"İlk Adım",      en:"First Step"},    desc:{tr:"İlk görevini tamamladın!", en:"You completed your first task!"}, check:s=>s.totalDone>=1 },
  { id:"streak_3",     Icon:Flame,       name:{tr:"3 Günlük Seri", en:"3-Day Streak"},  desc:{tr:"3 gün üst üste aktif!",    en:"Active 3 days in a row!"},         check:s=>s.streak>=3 },
  { id:"streak_7",     Icon:Trophy,      name:{tr:"Hafta Şampiyonu",en:"Week Champion"},desc:{tr:"7 gün üst üste aktif!",    en:"Active 7 days in a row!"},         check:s=>s.streak>=7 },
  { id:"tasks_10",     Icon:CheckSquare, name:{tr:"10 Görev",      en:"10 Tasks"},      desc:{tr:"10 görev tamamladın!",     en:"Completed 10 tasks!"},             check:s=>s.totalDone>=10 },
  { id:"budget_setup", Icon:CreditCard,  name:{tr:"Finansçı",      en:"Budgeter"},      desc:{tr:"Bütçeni kurdun!",          en:"You set up your budget!"},         check:s=>s.budgetSetup },
  { id:"habit_7",      Icon:Repeat,      name:{tr:"Alışkanlık Ustası",en:"Habit Master"},desc:{tr:"7 günlük alışkanlık!",   en:"7-day habit streak!"},             check:s=>s.habitStreak>=7 },
  { id:"journal_1",    Icon:BookOpen,    name:{tr:"Düşünür",       en:"Thinker"},       desc:{tr:"İlk journal girişi!",      en:"First journal entry!"},            check:s=>s.journalCount>=1 },
  { id:"pomodoro_1",   Icon:Timer,       name:{tr:"Odaklanmış",    en:"Focused"},       desc:{tr:"İlk Pomodoro bitti!",      en:"First Pomodoro done!"},            check:s=>s.pomodoroCount>=1 },
];

// ── AI prompts ────────────────────────────────────────────────────────────────
const CHAT_PROMPT = `Sen "Hayatım/MyLife" Türkçe ve İngilizce kişisel asistan AI'ısın.
Kullanıcının diline göre yanıt ver. Mesajdan görev/hatırlatıcı/not/randevu/alışveriş çıkar, kısa samimi yanıt ver.
JSON (HER ZAMAN): <items>[{"type":"görev"|"hatırlatıcı"|"not"|"randevu"|"alışveriş","title":"...","detail":"...","date":"...veya null","time":"HH:MM veya null","priority":"yüksek"|"orta"|"düşük","emoji":"tek emoji"}]</items>`;

const BUDGET_PROMPT = `Türkçe finans danışmanısın. Maaş ve sabit giderler verildi. SADECE JSON döndür, başka hiçbir şey yazma:
{"plan":[{"category":"...","amount":0,"emoji":"tek emoji","reason":"kısa neden","percent":0}],"totalFixed":0,"disposable":0,"savingTip":"...","warning":"...veya null"}`;

const JOURNAL_PROMPT = `Empatik Türkçe/İngilizce journal asistanısın. Kullanıcının diline göre yanıt ver. 2-3 cümle yanıtla.
Sonuna: <mood>{"score":1-10,"label":"mutlu/happy"|"sakin/calm"|"stresli/stressed"|"enerjik/energetic"|"yorgun/tired","color":"#hex"}</mood>`;

const REPORT_PROMPT = `Sen bir Türkçe/İngilizce üretkenlik koçusun. Kullanıcının haftalık verisini analiz et, motive edici bir rapor yaz.
Şu formatta SADECE JSON döndür:
{"summary":"2-3 cümle özet","highlights":["öne çıkan 1","öne çıkan 2","öne çıkan 3"],"improvements":["iyileştirme 1","iyileştirme 2"],"nextWeekTip":"öneri","mood":"💪 veya 🌟 veya 🎯 veya 🔥"}`;

// ── Premium Config ─────────────────────────────────────────────────────────────
const PREMIUM_PRICE = "49₺";
const FREE_LIMITS = { dailyMessages:5, maxTasks:20, maxHabits:3, maxNotes:10 };
const PREMIUM_FEATURES = [
  { Icon:Infinity,    title:"Sınırsız AI Mesaj",    desc:"Günde istediğin kadar sohbet" },
  { Icon:Activity,    title:"İstatistik & Grafikler",desc:"Haftalık/aylık detaylı analiz" },
  { Icon:PieChart,    title:"AI Bütçe Planı",        desc:"Kişisel harcama optimizasyonu" },
  { Icon:BarChart,    title:"Haftalık Rapor",         desc:"AI koçundan haftalık özet" },
  { Icon:Download,    title:"Dışa Aktarma",           desc:"CSV, TXT indir" },
  { Icon:ShieldCheck, title:"Bağımlılık Rehberi",     desc:"AI destekli kişisel koçluk" },
  { Icon:Target,      title:"Sınırsız Alışkanlık",   desc:"3 alışkanlık limitini kaldır" },
  { Icon:Edit3,       title:"Sınırsız Not",           desc:"10 not limitini kaldır" },
];
const REFERRAL_BONUS_DAYS = 7; // free premium günü

// ── Storage ───────────────────────────────────────────────────────────────────
const STORE_KEY = "hayatim_v10";
async function loadStore() {
  try { const r = await window.storage.get(STORE_KEY); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function saveStore(data) {
  try { await window.storage.set(STORE_KEY, JSON.stringify(data)); } catch {}
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const makeCSS = (ta, tb, tg) => `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased;}
::-webkit-scrollbar{display:none;}
body,button,input,textarea,select{font-family:'DM Sans',-apple-system,sans-serif;}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.87)}to{opacity:1;transform:scale(1)}}
@keyframes slideR{from{opacity:0;transform:translateX(-13px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideL{from{opacity:0;transform:translateX(13px)}to{opacity:1;transform:translateX(0)}}
@keyframes bounce{0%,80%,100%{transform:scale(0.4);opacity:0.2}40%{transform:scale(1);opacity:1}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
@keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-38px) scale(1.09)}66%{transform:translate(-16px,16px) scale(0.94)}}
@keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-24px,24px) scale(0.94)}66%{transform:translate(16px,-16px) scale(1.08)}}
@keyframes confetti{0%{transform:translateY(-8px) rotate(0deg);opacity:1}100%{transform:translateY(900px) rotate(720deg);opacity:0}}
@keyframes badgePop{0%{transform:scale(0) rotate(-12deg)}70%{transform:scale(1.15) rotate(3deg)}100%{transform:scale(1) rotate(0)}}
@keyframes pomodoroTick{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}
@keyframes pinShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
@keyframes musicBar{0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}}
@keyframes onboardIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes reportIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.gc{background:${C.g1};backdrop-filter:blur(34px) saturate(180%);-webkit-backdrop-filter:blur(34px) saturate(180%);border:1px solid ${C.b1};}
.gb{background:${C.g2};backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid ${C.b2};transition:all 0.13s;cursor:pointer;}
.gb:hover{background:${C.g3};}
.gb:active{transform:scale(0.96);}
.ic{animation:scaleIn 0.24s cubic-bezier(0.34,1.5,0.64,1) both;transition:transform 0.13s;}
.ic:hover{transform:scale(1.011);}
.sbtn{background:linear-gradient(135deg,${ta},${tb}) !important;box-shadow:0 4px 16px ${tg} !important;transition:all 0.16s !important;}
.sbtn:hover{transform:scale(1.04) !important;}
.sbtn:active{transform:scale(0.94) !important;}
.chip{transition:all 0.13s;cursor:pointer;}
.chip:hover{background:${C.g3} !important;transform:translateY(-1px);}
.chip:active{transform:scale(0.95);}
input:focus,textarea:focus,select:focus{outline:none;}
input::placeholder,textarea::placeholder{color:${C.t3};}
.pbar{height:5px;background:${C.g2};border-radius:10px;overflow:hidden;}
.pfill{height:100%;background:linear-gradient(90deg,${ta},${tb});border-radius:10px;transition:width 0.8s cubic-bezier(.4,0,.2,1);}
.spin{animation:spin 1s linear infinite;}
`;

// ── Shared UI ─────────────────────────────────────────────────────────────────
const Ambient = ({ t }) => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", borderRadius:"inherit", zIndex:0, pointerEvents:"none" }}>
    <div style={{ position:"absolute", width:270, height:270, background:`radial-gradient(circle,${t.o1} 0%,transparent 70%)`, top:-65, right:-45, borderRadius:"50%", animation:"orb1 13s ease-in-out infinite" }}/>
    <div style={{ position:"absolute", width:230, height:230, background:`radial-gradient(circle,${t.o2} 0%,transparent 70%)`, bottom:90, left:-65, borderRadius:"50%", animation:"orb2 16s ease-in-out infinite" }}/>
  </div>
);

const Confetti = ({ on }) => !on ? null : (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:999, overflow:"hidden" }}>
    {Array.from({length:28},(_,i)=>({ x:Math.random()*100, col:["#FF375F","#0A84FF","#30D158","#FF9F0A","#BF5AF2","#fff"][i%6], sz:4+Math.random()*7, dl:Math.random()*0.6, dr:1.2+Math.random()*0.9, sq:Math.random()>0.5 })).map((p,i)=>(
      <div key={i} style={{ position:"absolute", left:`${p.x}%`, top:-12, width:p.sz, height:p.sz, background:p.col, borderRadius:p.sq?3:"50%", animation:`confetti ${p.dr}s ${p.dl}s ease-in forwards` }}/>
    ))}
  </div>
);

const Dots = ({ t }) => (
  <div style={{ display:"flex", gap:5 }}>
    {[0,1,2].map(i=><div key={i} style={{ width:7, height:7, borderRadius:"50%", background:t.a, animation:`bounce 1.3s ${i*0.18}s infinite` }}/>)}
  </div>
);

// ── PIN Screen ────────────────────────────────────────────────────────────────
function PINScreen({ mode, savedPIN, onSuccess, onCancel, t, S }) {
  const [entry, setEntry] = useState("");
  const [confirm, setConfirm] = useState("");
  const [step, setStep] = useState(1);
  const [shake, setShake] = useState(false);
  const [err, setErr] = useState("");

  const press = (d) => {
    if (d === "⌫") { setEntry(e=>e.slice(0,-1)); return; }
    const next = entry + d;
    if (next.length > 4) return;
    setEntry(next);
    if (next.length === 4) setTimeout(()=>check(next), 80);
  };

  const check = (pin) => {
    if (mode === "verify") {
      if (pin === savedPIN) onSuccess();
      else { setShake(true); setErr(S.wrongPin); setEntry(""); setTimeout(()=>setShake(false),500); }
    } else {
      if (step === 1) { setConfirm(pin); setEntry(""); setStep(2); setErr(""); }
      else {
        if (pin === confirm) onSuccess(pin);
        else { setShake(true); setErr(S.pinMismatch); setEntry(""); setStep(1); setConfirm(""); setTimeout(()=>setShake(false),500); }
      }
    }
  };

  return (
    <div style={{ position:"absolute", inset:0, zIndex:200, background:"rgba(8,8,16,0.97)", backdropFilter:"blur(40px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <Lock size={32} color={t.a} strokeWidth={1.8} style={{ marginBottom:16, opacity:0.7 }}/>
      <div style={{ fontSize:17, fontWeight:800, color:C.t1, marginBottom:6 }}>
        {mode==="setup" ? (step===1?S.pinCreate:S.pinConfirm) : S.pinEnter}
      </div>
      <div style={{ fontSize:13, color:C.t3, marginBottom:28 }}>
        {mode==="setup" ? (step===1?S.pinSet1:S.pinSet2) : S.pinVerify}
      </div>
      <div style={{ display:"flex", gap:14, marginBottom:10, animation:shake?"pinShake 0.4s ease":"none" }}>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{ width:14, height:14, borderRadius:"50%", background:i<entry.length?t.a:C.g2, border:`2px solid ${i<entry.length?t.a:C.b2}`, boxShadow:i<entry.length?`0 0 9px ${t.glow}`:"none", transition:"all 0.2s" }}/>
        ))}
      </div>
      {err && <div style={{ fontSize:12, color:C.red, marginBottom:10 }}>{err}</div>}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginTop:16, width:220 }}>
        {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((d,i)=>(
          d===""
            ? <div key={i}/>
            : <button key={i} onClick={()=>press(d)} style={{ height:58, borderRadius:16, border:`1px solid ${C.b1}`, background:d==="⌫"?"transparent":C.g2, color:C.t1, fontSize:d==="⌫"?18:22, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(12px)", transition:"all 0.1s" }}>
                {d==="⌫" ? <ChevronLeft size={20} color={C.t2}/> : d}
              </button>
        ))}
      </div>
      {onCancel && <button onClick={onCancel} style={{ background:"none", border:"none", color:C.t3, fontSize:13, cursor:"pointer", marginTop:24 }}>{S.cancel}</button>}
    </div>
  );
}

// ── Auth ──────────────────────────────────────────────────────────────────────
function AuthScreen({ onAuth, t, S }) {
  const [mode, setMode] = useState("welcome");
  const [email, setEmail] = useState(""); const [pass, setPass] = useState(""); const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); const [otp, setOtp] = useState(""); const [showOtp, setShowOtp] = useState(false);
  const [showPass, setShowPass] = useState(false); const [loading, setLoading] = useState(false); const [err, setErr] = useState("");
  const sim = fn => { setLoading(true); setErr(""); setTimeout(()=>{setLoading(false);fn();},1000); };
  const inpS = { width:"100%", padding:"14px 16px", borderRadius:14, background:C.g2, border:`1px solid ${C.b1}`, color:C.t1, fontSize:15, fontFamily:"inherit" };

  if (mode==="welcome") return (
    <div style={{ position:"absolute", inset:0, zIndex:100, background:C.bg, display:"flex", flexDirection:"column", padding:"60px 28px 44px" }}>
      <Ambient t={t}/>
      <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:78, height:78, borderRadius:24, background:`linear-gradient(135deg,${t.a},${t.b})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 36px ${t.glow}`, marginBottom:22, animation:"pulse 2.5s ease infinite" }}>
          <span style={{ fontSize:34, fontWeight:900, color:"#fff" }}>✦</span>
        </div>
        <div style={{ fontSize:34, fontWeight:900, color:C.t1, letterSpacing:-1, marginBottom:10 }}>{S.welcomeTitle}</div>
        <div style={{ fontSize:15, color:C.t2, textAlign:"center", lineHeight:1.65, maxWidth:280, marginBottom:36 }}>{S.welcomeSub}</div>
        <button className="sbtn" onClick={()=>setMode("register")} style={{ width:"100%", padding:"16px", borderRadius:18, border:"none", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", marginBottom:12 }}>{S.startFree}</button>
        <button className="gb" onClick={()=>setMode("login")} style={{ width:"100%", padding:"15px", borderRadius:18, color:C.t1, fontSize:15, fontWeight:600 }}>{S.login}</button>
        <div style={{ display:"flex", gap:10, width:"100%", marginTop:14 }}>
          <button className="gc" onClick={()=>sim(()=>onAuth({name:"Google User",email:"user@gmail.com"}))} style={{ flex:1, padding:"12px", borderRadius:15, color:C.t1, fontSize:13, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", gap:7, cursor:"pointer" }}><Chrome size={14} color={C.t2}/> Google</button>
          <button className="gc" onClick={()=>setMode("phone")} style={{ flex:1, padding:"12px", borderRadius:15, color:C.t1, fontSize:13, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", gap:7, cursor:"pointer" }}><Phone size={14} color={C.t2}/> {S.name==="Adın"?"Telefon":"Phone"}</button>
        </div>
      </div>
    </div>
  );

  if (mode==="phone") return (
    <div style={{ position:"absolute", inset:0, zIndex:100, background:C.bg, display:"flex", flexDirection:"column", padding:"56px 28px 40px", animation:"fadeIn 0.3s ease", overflowY:"auto" }}>
      <Ambient t={t}/>
      <div style={{ position:"relative", zIndex:1 }}>
        <button onClick={()=>{setMode("welcome");setShowOtp(false);setErr("");}} style={{ background:"none", border:"none", color:C.t2, cursor:"pointer", display:"flex", alignItems:"center", gap:6, marginBottom:28, fontSize:14, fontWeight:600 }}><ChevronLeft size={16} color={C.t2}/> {S.back}</button>
        <div style={{ fontSize:26, fontWeight:800, color:C.t1, marginBottom:6 }}>{showOtp?S.pinEnter:"Phone"}</div>
        <div style={{ fontSize:14, color:C.t2, marginBottom:28 }}>{showOtp?`${phone} sent.`:"We'll send a verification SMS."}</div>
        {!showOtp
          ? <div style={{ position:"relative" }}><div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }}><Phone size={17} color={C.t3}/></div><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+90 5XX XXX XX XX" type="tel" style={{ ...inpS, paddingLeft:42 }}/></div>
          : <input value={otp} onChange={e=>setOtp(e.target.value.slice(0,4))} placeholder="••••" maxLength={4} style={{ ...inpS, textAlign:"center", fontSize:30, fontWeight:800, letterSpacing:18 }}/>}
        {err&&<div style={{ display:"flex", alignItems:"center", gap:6, marginTop:10, color:C.red, fontSize:12 }}><AlertCircle size={13} color={C.red}/>{err}</div>}
        <button className="sbtn" onClick={()=>{ if(!showOtp){if(phone.length<10)return setErr("Enter valid number"); sim(()=>setShowOtp(true));}else{if(otp.length<4)return setErr("Enter code"); sim(()=>onAuth({name:"User",phone}));} }} style={{ marginTop:22, width:"100%", padding:"16px", borderRadius:18, border:"none", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {loading?<Dots t={t}/>:(showOtp?S.verify:S.sendCode)}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ position:"absolute", inset:0, zIndex:100, background:C.bg, display:"flex", flexDirection:"column", padding:"56px 28px 40px", animation:"fadeIn 0.3s ease", overflowY:"auto" }}>
      <Ambient t={t}/>
      <div style={{ position:"relative", zIndex:1 }}>
        <button onClick={()=>{setMode("welcome");setErr("");}} style={{ background:"none", border:"none", color:C.t2, cursor:"pointer", display:"flex", alignItems:"center", gap:6, marginBottom:26, fontSize:14, fontWeight:600 }}><ChevronLeft size={16} color={C.t2}/> {S.back}</button>
        <div style={{ fontSize:26, fontWeight:800, color:C.t1, marginBottom:6 }}>{mode==="login"?"👋 "+S.login : "✦ "+S.register}</div>
        <div style={{ fontSize:14, color:C.t2, marginBottom:26 }}>{mode==="login"?"Log in to your account.":"Start for free."}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
          {mode==="register"&&<div style={{ position:"relative" }}><div style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)" }}><Edit3 size={17} color={C.t3}/></div><input value={name} onChange={e=>setName(e.target.value)} placeholder={S.name} style={{ ...inpS, paddingLeft:40 }}/></div>}
          <div style={{ position:"relative" }}><div style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)" }}><Mail size={17} color={C.t3}/></div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder={S.email} type="email" style={{ ...inpS, paddingLeft:40 }}/></div>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)" }}><Lock size={17} color={C.t3}/></div>
            <input value={pass} onChange={e=>setPass(e.target.value)} placeholder={S.password} type={showPass?"text":"password"} style={{ ...inpS, paddingLeft:40, paddingRight:42 }}/>
            <button onClick={()=>setShowPass(p=>!p)} style={{ position:"absolute", right:13, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer" }}>{showPass?<EyeOff size={17} color={C.t3}/>:<Eye size={17} color={C.t3}/>}</button>
          </div>
        </div>
        {err&&<div style={{ display:"flex", alignItems:"center", gap:6, marginTop:10, color:C.red, fontSize:12 }}><AlertCircle size={13} color={C.red}/>{err}</div>}
        <button className="sbtn" onClick={()=>{
          if(mode==="login"){if(!email||!pass)return setErr("Fill all fields"); sim(()=>onAuth({name:email.split("@")[0],email}));}
          else{if(!name||!email||!pass)return setErr("Fill all fields"); if(pass.length<6)return setErr("Password min 6 chars"); sim(()=>onAuth({name,email}));}
        }} style={{ marginTop:22, width:"100%", padding:"16px", borderRadius:18, border:"none", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {loading?<Dots t={t}/>:(mode==="login"?S.login:S.register)}
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:10, margin:"18px 0" }}><div style={{ flex:1, height:1, background:C.b1 }}/><span style={{ fontSize:11, color:C.t3 }}>or</span><div style={{ flex:1, height:1, background:C.b1 }}/></div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="gc" onClick={()=>sim(()=>onAuth({name:"Google User",email:"user@gmail.com"}))} style={{ flex:1, padding:"12px", borderRadius:15, color:C.t1, fontSize:13, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", gap:7, cursor:"pointer" }}><Chrome size={14} color={C.t2}/> Google</button>
          <button className="gc" onClick={()=>setMode("phone")} style={{ flex:1, padding:"12px", borderRadius:15, color:C.t1, fontSize:13, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", gap:7, cursor:"pointer" }}><Phone size={14} color={C.t2}/> Phone</button>
        </div>
        <button onClick={()=>{setMode(mode==="login"?"register":"login");setErr("");}} style={{ background:"none", border:"none", color:C.t2, cursor:"pointer", fontSize:14, marginTop:18, textAlign:"center", width:"100%" }}>
          {mode==="login"?S.noAccount:S.hasAccount}
        </button>
      </div>
    </div>
  );
}

// ── Onboarding ────────────────────────────────────────────────────────────────
function Onboarding({ onDone, t, S }) {
  const [step, setStep] = useState(0);
  const steps = [
    { Icon:MessageCircle, title:S.onboard1t, sub:S.onboard1s, col:t.a },
    { Icon:CreditCard,    title:S.onboard2t, sub:S.onboard2s, col:C.green },
    { Icon:Target,        title:S.onboard3t, sub:S.onboard3s, col:C.orange },
  ];
  const s = steps[step];
  return (
    <div style={{ position:"absolute", inset:0, zIndex:95, background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:28 }}>
      <Ambient t={t}/>
      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", width:"100%", animation:"onboardIn 0.42s ease" }} key={step}>
        <div style={{ display:"flex", gap:6, marginBottom:40 }}>
          {steps.map((_,i)=><div key={i} style={{ width:i===step?22:6, height:6, borderRadius:3, background:i===step?t.a:C.g2, transition:"all 0.3s" }}/>)}
        </div>
        <div style={{ width:78, height:78, borderRadius:24, background:`${s.col}15`, border:`1.5px solid ${s.col}30`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22, boxShadow:`0 0 26px ${s.col}26`, animation:"pulse 2.5s ease infinite" }}>
          <s.Icon size={34} color={s.col} strokeWidth={1.8}/>
        </div>
        <div style={{ fontSize:24, fontWeight:800, color:C.t1, textAlign:"center", lineHeight:1.2, letterSpacing:-0.5, marginBottom:12, whiteSpace:"pre-line" }}>{s.title}</div>
        <div style={{ fontSize:14, color:C.t2, textAlign:"center", lineHeight:1.65, marginBottom:38, maxWidth:288 }}>{s.sub}</div>
        <button className="sbtn" onClick={()=>step<steps.length-1?setStep(p=>p+1):onDone()} style={{ width:"100%", padding:"16px", borderRadius:20, border:"none", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer" }}>
          {step<steps.length-1?S.continueBtn:S.startApp}
        </button>
        {step>0&&<button onClick={()=>setStep(p=>p-1)} style={{ background:"none", border:"none", color:C.t3, cursor:"pointer", fontSize:13, marginTop:14 }}>← {S.back}</button>}
      </div>
    </div>
  );
}

// ── Badge Toast ───────────────────────────────────────────────────────────────
function BadgeToast({ badge, onClose, S, lang }) {
  useEffect(()=>{ const x=setTimeout(onClose,3500); return()=>clearTimeout(x); },[]);
  return (
    <div style={{ position:"absolute", top:106, left:14, right:14, zIndex:250, animation:"badgePop 0.48s cubic-bezier(.34,1.56,.64,1)" }}>
      <div className="gc" style={{ borderRadius:20, padding:"13px 15px", border:"1px solid rgba(255,215,0,0.28)", background:"rgba(255,215,0,0.06)", display:"flex", alignItems:"center", gap:13 }}>
        <div style={{ width:44, height:44, borderRadius:13, background:"rgba(255,215,0,0.13)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 0 13px rgba(255,215,0,0.24)" }}>
          <badge.Icon size={22} color={C.gold} strokeWidth={1.8}/>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:9, color:C.gold, fontWeight:700, letterSpacing:0.9, textTransform:"uppercase", marginBottom:2 }}>{S.badgeEarned}</div>
          <div style={{ fontSize:14, fontWeight:800, color:C.t1 }}>{badge.name[lang]}</div>
          <div style={{ fontSize:11, color:C.t2, marginTop:1 }}>{badge.desc[lang]}</div>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer" }}><X size={15} color={C.t3}/></button>
      </div>
    </div>
  );
}

// ── Item Card ─────────────────────────────────────────────────────────────────
function ItemCard({ item, index, onToggle, onSetTime, t }) {
  const tint = C.tints[item.type] || C.tints["görev"];
  const pc = item.priority==="yüksek"||item.priority==="high"?C.pink:item.priority==="orta"||item.priority==="medium"?C.orange:C.green;
  const TIcon = { "görev":CheckSquare,"hatırlatıcı":Bell,"not":Edit3,"randevu":Timer,"alışveriş":CreditCard,"task":CheckSquare,"reminder":Bell,"note":Edit3 }[item.type]||CheckSquare;
  return (
    <div className="ic gc" style={{ display:"flex", alignItems:"flex-start", gap:11, padding:"12px 13px", borderRadius:15, borderLeft:`2.5px solid ${tint.c}`, background:item.done?"rgba(255,255,255,0.02)":tint.bg, marginBottom:8, animationDelay:`${Math.min(index,5)*0.05}s`, opacity:item.done?0.35:1, cursor:"default", transition:"opacity 0.3s" }}>
      <button onClick={()=>onToggle&&onToggle(item.id)} style={{ width:34, height:34, borderRadius:10, background:tint.bg, border:`1px solid ${tint.bdr}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }}>
        <TIcon size={17} color={tint.c} strokeWidth={2}/>
      </button>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:3, flexWrap:"wrap" }}>
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:0.7, color:tint.c, textTransform:"uppercase", background:`${tint.c}12`, padding:"2px 7px", borderRadius:20 }}>{item.type}</span>
          {item.priority&&<div style={{ width:5, height:5, borderRadius:"50%", background:pc }}/>}
          {item.done&&<span style={{ fontSize:9, color:C.green, fontWeight:700, display:"flex", alignItems:"center", gap:2 }}><Check size={9} color={C.green}/>Done</span>}
        </div>
        <div style={{ fontSize:13, fontWeight:600, color:C.t1, lineHeight:1.4, textDecoration:item.done?"line-through":"none" }}>{item.title}</div>
        {item.detail&&<div style={{ fontSize:11, color:C.t2, marginTop:2, lineHeight:1.4 }}>{item.detail}</div>}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4, flexWrap:"wrap" }}>
          {item.date&&<div style={{ display:"flex", alignItems:"center", gap:3 }}><Timer size={10} color={C.t3}/><span style={{ fontSize:10, color:C.t2 }}>{item.date}</span></div>}
          {item.time&&<div style={{ display:"flex", alignItems:"center", gap:3, background:`${tint.c}15`, padding:"2px 7px", borderRadius:10 }}><Clock size={10} color={tint.c}/><span style={{ fontSize:10, color:tint.c, fontWeight:700 }}>{item.time}</span></div>}
          {!item.done&&onSetTime&&<button onClick={()=>onSetTime(item.id)} style={{ display:"flex", alignItems:"center", gap:3, background:"transparent", border:"none", cursor:"pointer", padding:0 }}><Clock size={10} color={C.t3}/><span style={{ fontSize:10, color:C.t3 }}>+saat</span></button>}
        </div>
      </div>
    </div>
  );
}

// ── Bubble ────────────────────────────────────────────────────────────────────
const Bubble = ({ msg, t }) => {
  const isUser = msg.role==="user";
  return (
    <div style={{ display:"flex", flexDirection:isUser?"row-reverse":"row", alignItems:"flex-end", gap:8, marginBottom:13, animation:isUser?"slideL 0.25s ease":"slideR 0.25s ease" }}>
      {!isUser&&<div style={{ width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${t.a},${t.b})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0,boxShadow:`0 0 10px ${t.glow}` }}>✦</div>}
      <div style={{ maxWidth:"76%",padding:"10px 14px",borderRadius:isUser?"18px 18px 4px 18px":"18px 18px 18px 4px",background:isUser?`linear-gradient(135deg,${t.a},${t.b})`:C.g2,border:isUser?"none":`1px solid ${C.b1}`,fontSize:14,lineHeight:1.56,color:C.t1,whiteSpace:"pre-wrap",boxShadow:isUser?`0 3px 13px ${t.glow}`:"none",letterSpacing:-0.1 }}>{msg.text}</div>
    </div>
  );
};

// ── Search Panel ──────────────────────────────────────────────────────────────
function SearchPanel({ items, notes, onClose, t, S }) {
  const [q, setQ] = useState("");
  const matches = q.trim().length < 1 ? [] : [
    ...items.filter(i=>(i.title||"").toLowerCase().includes(q.toLowerCase())||(i.detail||"").toLowerCase().includes(q.toLowerCase())).map(i=>({...i,_kind:"task"})),
    ...notes.filter(n=>(n.title||"").toLowerCase().includes(q.toLowerCase())||(n.content||"").toLowerCase().includes(q.toLowerCase())).map(n=>({...n,_kind:"note"})),
  ];
  return (
    <div style={{ position:"absolute", inset:0, zIndex:90, background:"rgba(0,0,0,0.95)", backdropFilter:"blur(24px)", display:"flex", flexDirection:"column", animation:"fadeIn 0.3s ease" }}>
      <div style={{ padding:"16px 14px 10px", display:"flex", alignItems:"center", gap:10, borderBottom:`0.5px solid ${C.b1}` }}>
        <div className="gc" style={{ flex:1, borderRadius:14, display:"flex", alignItems:"center", gap:10, padding:"10px 14px" }}>
          <Search size={16} color={C.t3}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder={S.search} autoFocus style={{ flex:1, background:"none", border:"none", color:C.t1, fontSize:14, fontFamily:"inherit" }}/>
          {q&&<button onClick={()=>setQ("")} style={{ background:"none", border:"none", cursor:"pointer" }}><X size={14} color={C.t3}/></button>}
        </div>
        <button className="gb" onClick={onClose} style={{ width:36, height:36, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center" }}><X size={15} color={C.t2}/></button>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 14px" }}>
        {q.length>0&&matches.length===0&&<div style={{ textAlign:"center", padding:"32px 0", color:C.t3, fontSize:13 }}>Sonuç yok.</div>}
        {matches.map((item,i)=>(
          <div key={i} className="ic gc" style={{ borderRadius:14, padding:"11px 13px", marginBottom:8, animationDelay:`${i*0.04}s`, display:"flex", alignItems:"center", gap:11 }}>
            <div style={{ width:32,height:32,borderRadius:9,background:item._kind==="note"?"rgba(48,209,88,0.12)":"rgba(10,132,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              {item._kind==="note"?<Edit3 size={15} color={C.green}/>:<CheckSquare size={15} color={t.a}/>}
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontSize:12,fontWeight:700,color:C.t1,lineHeight:1.3 }}>{item.title||item._kind}</div>
              {(item.detail||item.content)&&<div style={{ fontSize:11,color:C.t2,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.detail||item.content}</div>}
            </div>
            <span style={{ fontSize:9,color:item._kind==="note"?C.green:t.a,fontWeight:700,background:item._kind==="note"?"rgba(48,209,88,0.12)":`${t.a}12`,padding:"2px 7px",borderRadius:10,textTransform:"uppercase" }}>{item._kind}</span>
          </div>
        ))}
        {q.length===0&&<div style={{ textAlign:"center", padding:"32px 0", color:C.t3, fontSize:13 }}>{S.search}</div>}
      </div>
    </div>
  );
}

// ── Reminder Time Setter ──────────────────────────────────────────────────────
function ReminderTimePicker({ itemId, items, setItems, onClose, t, S }) {
  const item = items.find(i=>i.id===itemId);
  const [time, setTime] = useState(item?.time||"09:00");
  return (
    <div style={{ position:"absolute", inset:0, zIndex:95, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(12px)", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div className="gc" style={{ width:"100%", borderRadius:"24px 24px 0 0", padding:"24px 22px 36px", animation:"fadeUp 0.3s ease" }}>
        <div style={{ fontSize:15,fontWeight:800,color:C.t1,marginBottom:6 }}>{S.reminderTime}</div>
        <div style={{ fontSize:12,color:C.t3,marginBottom:18 }}>{item?.title}</div>
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} style={{ width:"100%",padding:"14px",borderRadius:14,background:C.g2,border:`1px solid ${t.a}50`,color:t.a,fontSize:22,fontWeight:800,fontFamily:"inherit",textAlign:"center",marginBottom:16 }}/>
        <div style={{ display:"flex",gap:10 }}>
          <button className="gb" onClick={onClose} style={{ flex:1,padding:"13px",borderRadius:14,color:C.t2,fontFamily:"inherit",fontSize:14,fontWeight:600 }}>{S.cancel}</button>
          <button className="sbtn" onClick={()=>{setItems(p=>p.map(i=>i.id===itemId?{...i,time}:i));onClose();}} style={{ flex:2,padding:"13px",borderRadius:14,border:"none",color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer" }}>{S.setReminder} ✓</button>
        </div>
      </div>
    </div>
  );
}

// ── Export Panel ──────────────────────────────────────────────────────────────
function ExportPanel({ items, notes, onClose, t, S }) {
  const [done, setDone] = useState("");

  const exportCSV = () => {
    const headers = "Type,Title,Detail,Date,Time,Priority,Done\n";
    const rows = items.map(i=>`"${i.type}","${i.title||""}","${i.detail||""}","${i.date||""}","${i.time||""}","${i.priority||""}","${i.done?'Yes':'No'}"`).join("\n");
    const blob = new Blob([headers+rows], {type:"text/csv"});
    const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="hayatim-tasks.csv"; a.click();
    setDone(S.exportDone);
  };

  const exportNotesTXT = () => {
    const txt = notes.map(n=>`=== ${n.title||S.untitled} ===\n${n.content||""}\n\n`).join("");
    const blob = new Blob([txt], {type:"text/plain"});
    const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="hayatim-notes.txt"; a.click();
    setDone(S.exportDone);
  };

  return (
    <div style={{ position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",padding:22,animation:"fadeIn 0.3s ease" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
        <div style={{ fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:8 }}><Download size={17} color={t.a}/> {S.exportTitle}</div>
        <button className="gb" onClick={onClose} style={{ width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center" }}><X size={15} color={C.t2}/></button>
      </div>
      {done&&<div style={{ marginBottom:14,padding:"10px 14px",borderRadius:13,background:"rgba(48,209,88,0.12)",border:"1px solid rgba(48,209,88,0.25)",fontSize:13,color:C.green,fontWeight:600 }}>✓ {done}</div>}
      {[
        { label:S.exportTasks, sub:`${items.length} görev/task`, Icon:CheckSquare, fn:exportCSV, color:t.a },
        { label:S.exportNotesTXT, sub:`${notes.length} not/note`, Icon:FileText, fn:exportNotesTXT, color:C.green },
      ].map((opt,i)=>(
        <button key={i} className="gb" onClick={opt.fn} style={{ width:"100%",padding:"15px 16px",borderRadius:16,color:C.t1,fontFamily:"inherit",display:"flex",alignItems:"center",gap:13,marginBottom:10,textAlign:"left",cursor:"pointer" }}>
          <div style={{ width:40,height:40,borderRadius:12,background:`${opt.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><opt.Icon size={19} color={opt.color}/></div>
          <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:700,color:C.t1 }}>{opt.label}</div><div style={{ fontSize:11,color:C.t3,marginTop:2 }}>{opt.sub}</div></div>
          <Download size={14} color={C.t3}/>
        </button>
      ))}
    </div>
  );
}

// ── Weekly Report ─────────────────────────────────────────────────────────────
function WeeklyReportPanel({ items, habits, totalDone, streak, points, onClose, t, S, lang }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const weekDone = items.filter(i=>i.done).length;
  const weekPending = items.filter(i=>!i.done).length;
  const habitsDoneToday = habits.filter(h=>(h.completedDates||[]).includes(new Date().toISOString().split("T")[0])).length;

  const generate = async () => {
    setLoading(true);
    try {
      const data = { totalDone, weekDone, weekPending, streak, points, habitsCount:habits.length, habitsDoneToday, topHabits:habits.slice(0,3).map(h=>h.name) };
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:`${REPORT_PROMPT}\nDil: ${lang==="tr"?"Türkçe":"English"}\nVeri: ${JSON.stringify(data)}`}]})});
      const d = await res.json();
      const text = d.content?.[0]?.text||"";
      const cleaned = text.replace(/```json|```/g,"").trim();
      setReport(JSON.parse(cleaned));
    } catch {
      setReport({ summary:lang==="tr"?`Bu hafta ${weekDone} görev tamamladın, ${streak} günlük serinle harika gidiyorsun!`:`You completed ${weekDone} tasks this week with a ${streak}-day streak!`, highlights:[`${weekDone} görev tamamlandı`,`${streak} günlük seri`,`${points} puan kazanıldı`], improvements:[lang==="tr"?"Daha fazla alışkanlık ekle":"Add more habits",lang==="tr"?"Bütçeni takip et":"Track your budget"], nextWeekTip:lang==="tr"?"Her gün en az 3 görev tamamlamayı hedefle.":"Aim to complete at least 3 tasks every day.", mood:"🔥" });
    }
    setLoading(false);
  };

  return (
    <div style={{ position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",padding:22,animation:"fadeIn 0.3s ease",overflowY:"auto" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18 }}>
        <div style={{ fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:8 }}><BarChart size={17} color={t.a}/> {S.weeklyReport}</div>
        <button className="gb" onClick={onClose} style={{ width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center" }}><X size={15} color={C.t2}/></button>
      </div>

      {/* Stats row */}
      <div style={{ display:"flex",gap:8,marginBottom:16 }}>
        {[{l:lang==="tr"?"Tamamlanan":"Done",v:weekDone,c:C.green},{l:lang==="tr"?"Bekleyen":"Pending",v:weekPending,c:C.orange},{l:"Streak",v:streak,c:t.a},{l:lang==="tr"?"Puan":"Points",v:points,c:C.gold}].map(s=>(
          <div key={s.l} className="gc" style={{ flex:1,borderRadius:13,padding:"10px 6px",textAlign:"center" }}>
            <div style={{ fontSize:18,fontWeight:900,color:s.c,letterSpacing:-0.5 }}>{s.v}</div>
            <div style={{ fontSize:9,color:C.t3,marginTop:2,fontWeight:600 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {!report ? (
        <button className="sbtn" onClick={generate} style={{ width:"100%",padding:"14px",borderRadius:16,border:"none",color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
          {loading?<><Dots t={t}/><span style={{marginLeft:8}}>{S.reportGenerating}</span></>:<><Zap size={15} color="#fff"/> {S.reportBtn}</>}
        </button>
      ) : (
        <div style={{ animation:"reportIn 0.4s ease" }}>
          <div className="gc" style={{ borderRadius:18,padding:16,marginBottom:13,border:`1px solid ${t.a}25` }}>
            <div style={{ fontSize:28,marginBottom:10 }}>{report.mood}</div>
            <div style={{ fontSize:14,color:C.t1,lineHeight:1.65 }}>{report.summary}</div>
          </div>
          <div className="gc" style={{ borderRadius:16,padding:14,marginBottom:11 }}>
            <div style={{ fontSize:11,fontWeight:700,color:C.green,letterSpacing:0.7,textTransform:"uppercase",marginBottom:10 }}>✦ {lang==="tr"?"Öne Çıkanlar":"Highlights"}</div>
            {report.highlights?.map((h,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderTop:i>0?`1px solid ${C.b1}`:"none" }}>
                <div style={{ width:6,height:6,borderRadius:"50%",background:C.green,flexShrink:0 }}/>
                <span style={{ fontSize:13,color:C.t1 }}>{h}</span>
              </div>
            ))}
          </div>
          <div className="gc" style={{ borderRadius:16,padding:14,marginBottom:11 }}>
            <div style={{ fontSize:11,fontWeight:700,color:C.orange,letterSpacing:0.7,textTransform:"uppercase",marginBottom:10 }}>↗ {lang==="tr"?"İyileştirme":"Improvements"}</div>
            {report.improvements?.map((h,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderTop:i>0?`1px solid ${C.b1}`:"none" }}>
                <div style={{ width:6,height:6,borderRadius:"50%",background:C.orange,flexShrink:0 }}/>
                <span style={{ fontSize:13,color:C.t1 }}>{h}</span>
              </div>
            ))}
          </div>
          {report.nextWeekTip&&<div className="gc" style={{ borderRadius:14,padding:"12px 14px",fontSize:13,color:t.a,lineHeight:1.6,border:`1px solid ${t.a}22` }}>
            <TrendingUp size={13} color={t.a} style={{ display:"inline",marginRight:6 }}/>{report.nextWeekTip}
          </div>}
          <button className="gb" onClick={()=>setReport(null)} style={{ width:"100%",padding:"11px",borderRadius:14,color:C.t2,fontFamily:"inherit",fontSize:13,fontWeight:600,marginTop:10 }}>↺ {lang==="tr"?"Yenile":"Regenerate"}</button>
        </div>
      )}
    </div>
  );
}

// ── Calendar ──────────────────────────────────────────────────────────────────
function CalendarScreen({ items, t }) {
  const [cur, setCur] = useState(new Date());
  const [selected, setSelected] = useState(new Date().getDate());
  const year=cur.getFullYear(), month=cur.getMonth();
  const monthName=new Intl.DateTimeFormat("tr-TR",{month:"long",year:"numeric"}).format(cur);
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const today=new Date();
  const startOffset=firstDay===0?6:firstDay-1;
  const getItemsForDay=day=>items.filter(i=>i.date&&(i.date.includes(`${day}.${String(month+1).padStart(2,"0")}.${year}`)||i.date.includes(`${day}`)));
  const selectedItems=getItemsForDay(selected);
  return (
    <div style={{ flex:1,overflowY:"auto",padding:"12px 14px" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13 }}>
        <button className="gb" onClick={()=>setCur(new Date(year,month-1,1))} style={{ width:33,height:33,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center" }}><ChevronLeft size={15} color={C.t2}/></button>
        <div style={{ fontSize:14,fontWeight:700,color:C.t1 }}>{monthName}</div>
        <button className="gb" onClick={()=>setCur(new Date(year,month+1,1))} style={{ width:33,height:33,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center" }}><ChevronRight size={15} color={C.t2}/></button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6 }}>
        {["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"].map(d=><div key={d} style={{ textAlign:"center",fontSize:9,fontWeight:700,color:C.t3,padding:"3px 0" }}>{d}</div>)}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:14 }}>
        {Array.from({length:startOffset}).map((_,i)=><div key={`e${i}`}/>)}
        {Array.from({length:daysInMonth},(_,i)=>i+1).map(day=>{
          const isToday=day===today.getDate()&&month===today.getMonth()&&year===today.getFullYear();
          const isSel=day===selected;
          const hasItems=getItemsForDay(day).length>0;
          return (
            <button key={day} onClick={()=>setSelected(day)} style={{ aspectRatio:"1",borderRadius:11,border:`1.5px solid ${isSel?t.a:isToday?`${t.a}38`:"transparent"}`,background:isSel?t.a:isToday?`${t.a}10`:C.g1,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,transition:"all 0.14s" }}>
              <span style={{ fontSize:12,fontWeight:isSel||isToday?700:400,color:isSel?"#fff":isToday?t.a:C.t1 }}>{day}</span>
              {hasItems&&<div style={{ width:4,height:4,borderRadius:"50%",background:isSel?"rgba(255,255,255,0.8)":t.a }}/>}
            </button>
          );
        })}
      </div>
      <div style={{ fontSize:10,fontWeight:700,color:C.t3,letterSpacing:0.7,textTransform:"uppercase",marginBottom:9 }}>
        {selected} {new Intl.DateTimeFormat("tr-TR",{month:"long"}).format(cur)} — {selectedItems.length} öğe
      </div>
      {selectedItems.length===0?<div style={{ textAlign:"center",padding:"18px 0",color:C.t3,fontSize:12 }}>Bu gün için görev yok.</div>:selectedItems.map((item,i)=><ItemCard key={item.id||i} item={item} index={i} t={t}/>)}
    </div>
  );
}

// ── Habits ────────────────────────────────────────────────────────────────────
function HabitsScreen({ habits, setHabits, t, onBadge, onPoints, S }) {
  const [adding, setAdding] = useState(false);
  const [nh, setNh] = useState({name:"",icon:"🎯",freq:"daily",color:t.a});
  const todayKey = new Date().toISOString().split("T")[0];
  const ICONS=["🎯","💪","📚","🧘","💧","🏃","🍎","😴","✍️","🎨","🎵","🌿"];
  const COLORS=[t.a,"#30D158","#FF375F","#BF5AF2","#FF9F0A","#0A84FF"];

  const toggleToday = id => {
    setHabits(prev=>prev.map(h=>{
      if(h.id!==id)return h;
      const done=h.completedDates||[];
      const already=done.includes(todayKey);
      const newDone=already?done.filter(d=>d!==todayKey):[...done,todayKey];
      let streak=0;
      const now=new Date();
      for(let i=0;i<365;i++){const d=new Date(now);d.setDate(now.getDate()-i);const k=d.toISOString().split("T")[0];if(newDone.includes(k))streak++;else break;}
      if(!already){onPoints(10);if(streak>=7)onBadge("habit_7");}
      return{...h,completedDates:newDone,streak};
    }));
  };

  return (
    <div style={{ flex:1,overflowY:"auto",padding:"12px 14px" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13 }}>
        <div style={{ fontSize:14,fontWeight:700,color:C.t1 }}>{S.habits_title}</div>
        <button className="gb" onClick={()=>setAdding(a=>!a)} style={{ padding:"5px 12px",borderRadius:11,color:t.a,fontSize:12,fontWeight:700,fontFamily:"inherit",border:`1px solid ${t.a}35`,display:"flex",alignItems:"center",gap:4 }}>
          <Plus size={12} color={t.a}/>{adding?S.cancel:S.newHabit}
        </button>
      </div>
      {adding&&(
        <div className="gc" style={{ borderRadius:17,padding:13,marginBottom:13,animation:"fadeUp 0.22s ease" }}>
          <div style={{ display:"flex",gap:7,marginBottom:9 }}>
            <select value={nh.icon} onChange={e=>setNh(p=>({...p,icon:e.target.value}))} style={{ width:46,padding:"8px",borderRadius:10,background:C.g2,border:`1px solid ${C.b1}`,color:C.t1,fontSize:16,textAlign:"center",fontFamily:"inherit",cursor:"pointer" }}>
              {ICONS.map(ic=><option key={ic} value={ic}>{ic}</option>)}
            </select>
            <input value={nh.name} onChange={e=>setNh(p=>({...p,name:e.target.value}))} placeholder={S.habitName} style={{ flex:1,padding:"9px 12px",borderRadius:10,background:C.g2,border:`1px solid ${C.b1}`,color:C.t1,fontSize:13,fontFamily:"inherit" }}/>
          </div>
          <div style={{ display:"flex",gap:6,marginBottom:11 }}>
            {COLORS.map(col=><button key={col} onClick={()=>setNh(p=>({...p,color:col}))} style={{ width:24,height:24,borderRadius:"50%",background:col,border:`3px solid ${nh.color===col?"#fff":"transparent"}`,cursor:"pointer",transition:"all 0.14s" }}/>)}
          </div>
          <button className="sbtn" onClick={()=>{if(!nh.name.trim())return;setHabits(p=>[...p,{id:Date.now(),...nh,completedDates:[],streak:0}]);setNh({name:"",icon:"🎯",freq:"daily",color:t.a});setAdding(false);}} style={{ width:"100%",padding:"10px",borderRadius:12,border:"none",color:"#fff",fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer" }}>{S.add}</button>
        </div>
      )}
      {habits.length===0&&!adding&&(
        <div style={{ textAlign:"center",padding:"34px 0",color:C.t3 }}>
          <Target size={42} color={C.t3} strokeWidth={1.5} style={{ marginBottom:11,opacity:0.35 }}/>
          <div style={{ fontSize:14,fontWeight:700,color:C.t1,marginBottom:5 }}>{S.noHabit}</div>
          <div style={{ fontSize:12,lineHeight:1.6 }}>{S.noHabitSub}</div>
        </div>
      )}
      {habits.map((h,i)=>{
        const done=(h.completedDates||[]).includes(todayKey);
        const last7=Array.from({length:7},(_,j)=>{const d=new Date();d.setDate(d.getDate()-6+j);return d.toISOString().split("T")[0];});
        return (
          <div key={h.id} className="ic gc" style={{ borderRadius:17,padding:13,marginBottom:10,animationDelay:`${i*0.05}s`,border:`1px solid ${done?h.color+"38":C.b1}`,background:done?`${h.color}07`:C.g1 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
              <div style={{ width:40,height:40,borderRadius:12,background:`${h.color}17`,border:`1.5px solid ${h.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0 }}>{h.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13,fontWeight:700,color:C.t1 }}>{h.name}</div>
                <div style={{ display:"flex",alignItems:"center",gap:5,marginTop:3 }}><Flame size={10} color={C.orange}/><span style={{ fontSize:11,color:C.orange,fontWeight:700 }}>{h.streak||0} {S.dayStreak}</span></div>
              </div>
              <button onClick={()=>toggleToday(h.id)} style={{ width:38,height:38,borderRadius:12,background:done?h.color:`${h.color}15`,border:`1.5px solid ${h.color}38`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",boxShadow:done?`0 0 11px ${h.color}55`:"none" }}>
                <Check size={17} color={done?"#fff":h.color}/>
              </button>
            </div>
            <div style={{ display:"flex",gap:3 }}>
              {last7.map((d,j)=>{const filled=(h.completedDates||[]).includes(d);return <div key={d} style={{ flex:1,height:5,borderRadius:3,background:filled?h.color:C.g2,boxShadow:filled&&j===6?`0 0 5px ${h.color}`:"none",transition:"all 0.3s" }}/>;  })}
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",marginTop:3 }}>
              <span style={{ fontSize:9,color:C.t3 }}>7 gün önce</span>
              <span style={{ fontSize:9,color:C.t3 }}>Bugün</span>
            </div>
            <button onClick={()=>setHabits(p=>p.filter(x=>x.id!==h.id))} style={{ background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:10,marginTop:5,display:"flex",alignItems:"center",gap:3 }}>
              <Trash2 size={10} color={C.t3}/> {S.delete}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ── Notes ─────────────────────────────────────────────────────────────────────
function NoteEditor({ note, onSave, onClose, t, S }) {
  const [title, setTitle] = useState(note?.title||"");
  const [content, setContent] = useState(note?.content||"");
  const [color, setColor] = useState(note?.color||t.a);
  const COLORS=[t.a,"#30D158","#FF375F","#BF5AF2","#FF9F0A","#636366"];
  const ins=(pre,suf="")=>{const ta=document.getElementById("note-ta");if(!ta)return;const s=ta.selectionStart,e=ta.selectionEnd,sel=content.slice(s,e),nv=content.slice(0,s)+pre+sel+suf+content.slice(e);setContent(nv);setTimeout(()=>{ta.focus();ta.setSelectionRange(s+pre.length,e+pre.length);},0);};
  return (
    <div style={{ position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.96)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease" }}>
      <div style={{ padding:"16px 14px 10px",display:"flex",alignItems:"center",gap:10,borderBottom:`0.5px solid ${C.b1}` }}>
        <button className="gb" onClick={onClose} style={{ width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center" }}><ChevronLeft size={15} color={C.t2}/></button>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder={S.untitled} style={{ flex:1,background:"none",border:"none",color:C.t1,fontSize:16,fontWeight:700,fontFamily:"inherit" }}/>
        <button className="sbtn" onClick={()=>onSave({...note,title,content,color,id:note?.id||Date.now(),updatedAt:new Date().toLocaleDateString("tr-TR")})} style={{ padding:"7px 15px",borderRadius:12,border:"none",color:"#fff",fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer" }}>{S.save}</button>
      </div>
      <div style={{ display:"flex",gap:5,padding:"8px 13px",borderBottom:`0.5px solid ${C.b1}`,overflowX:"auto" }}>
        {[["B","**","**"],["İ","_","_"],["# ","",""],["- ","",""],["☐ ","",""]].map(([lbl,pre,suf])=>(
          <button key={lbl} className="gb" onClick={()=>lbl.includes("#")||lbl.includes("-")||lbl.includes("☐")?ins(pre+lbl):ins(pre,suf)} style={{ padding:"5px 10px",borderRadius:8,color:C.t1,fontSize:12,fontWeight:lbl==="B"?800:400,fontStyle:lbl==="İ"?"italic":"normal",fontFamily:"inherit",flexShrink:0 }}>{lbl}</button>
        ))}
        <div style={{ display:"flex",gap:4,marginLeft:4 }}>
          {COLORS.map(col=><button key={col} onClick={()=>setColor(col)} style={{ width:20,height:20,borderRadius:"50%",background:col,border:`2.5px solid ${color===col?"#fff":"transparent"}`,cursor:"pointer" }}/>)}
        </div>
      </div>
      <textarea id="note-ta" value={content} onChange={e=>setContent(e.target.value)} placeholder="..." style={{ flex:1,padding:"14px",background:"transparent",border:"none",color:C.t1,fontSize:14,resize:"none",fontFamily:"inherit",lineHeight:1.65 }}/>
      <div style={{ padding:"7px 14px 11px",borderTop:`0.5px solid ${C.b1}` }}><div style={{ width:22,height:4,borderRadius:3,background:color,boxShadow:`0 0 7px ${color}` }}/></div>
    </div>
  );
}

function NotesScreen({ notes, setNotes, t, S }) {
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const saveNote = note => { setNotes(prev=>{ const ex=prev.find(n=>n.id===note.id); return ex?prev.map(n=>n.id===note.id?note:n):[note,...prev]; }); setEditing(null); setCreating(false); };
  if (editing||creating) return <NoteEditor note={editing} onSave={saveNote} onClose={()=>{setEditing(null);setCreating(false);}} t={t} S={S}/>;
  return (
    <div style={{ flex:1,overflowY:"auto",padding:"12px 14px" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13 }}>
        <div style={{ fontSize:14,fontWeight:700,color:C.t1 }}>{S.notes_title} ({notes.length})</div>
        <button className="sbtn" onClick={()=>setCreating(true)} style={{ padding:"7px 13px",borderRadius:12,border:"none",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",gap:4 }}><Plus size={12} color="#fff"/> {S.newNote}</button>
      </div>
      {notes.length===0&&<div style={{ textAlign:"center",padding:"34px 0",color:C.t3 }}><Edit3 size={42} color={C.t3} strokeWidth={1.5} style={{ marginBottom:11,opacity:0.35 }}/><div style={{ fontSize:14,fontWeight:700,color:C.t1,marginBottom:5 }}>{S.noNote}</div><div style={{ fontSize:12,lineHeight:1.6 }}>{S.noNoteSub}</div></div>}
      <div style={{ columns:2,gap:9 }}>
        {notes.map((note,i)=>(
          <div key={note.id} className="ic gc" onClick={()=>setEditing(note)} style={{ borderRadius:15,padding:"12px",marginBottom:9,breakInside:"avoid",cursor:"pointer",animationDelay:`${i*0.05}s`,borderTop:`3px solid ${note.color||t.a}` }}>
            <div style={{ fontSize:12,fontWeight:700,color:C.t1,marginBottom:5,lineHeight:1.3 }}>{note.title||S.untitled}</div>
            <div style={{ fontSize:11,color:C.t2,lineHeight:1.5,WebkitLineClamp:4,display:"-webkit-box",WebkitBoxOrient:"vertical",overflow:"hidden" }}>{note.content||S.emptyNote}</div>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:7 }}>
              <span style={{ fontSize:9,color:C.t3 }}>{note.updatedAt}</span>
              <button onClick={e=>{e.stopPropagation();setNotes(p=>p.filter(n=>n.id!==note.id));}} style={{ background:"none",border:"none",cursor:"pointer" }}><Trash2 size={11} color={C.t3}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Budget ────────────────────────────────────────────────────────────────────
function BudgetScreen({ budgetData, setBudgetData, t, onBadge, onPoints, S }) {
  const {salary="",fixedItems=[],plan=null,expenses=[]} = budgetData;
  const [view,setView]=useState("setup"); const [addingFixed,setAddingFixed]=useState(false);
  const [nf,setNf]=useState({label:"",amount:"",emoji:"🏠",dueDay:""}); const [addExp,setAddExp]=useState(false);
  const [nexp,setNexp]=useState({cat:"food",amount:"",desc:""}); const [loadingPlan,setLoadingPlan]=useState(false);
  const upd=patch=>setBudgetData(prev=>({...prev,...patch}));
  const salaryNum=parseFloat(String(salary).replace(/\./g,"").replace(",","."))||0;
  const totalFixed=fixedItems.reduce((s,i)=>s+i.amount,0);
  const disposable=salaryNum-totalFixed;
  const totalSpent=expenses.reduce((s,e)=>s+e.amount,0);
  const remaining=disposable-totalSpent;
  const FIXED_ICONS=["🏠","💡","📱","🌊","🔥","🚗","📺","🏥","🎓","💳"];
  const inpS={width:"100%",padding:"11px 12px",borderRadius:11,background:C.g2,border:`1px solid ${C.b1}`,color:C.t1,fontSize:13,fontFamily:"inherit"};
  const genPlan=async()=>{
    if(!salary||fixedItems.length===0)return; setLoadingPlan(true);
    try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:700,messages:[{role:"user",content:`${BUDGET_PROMPT}\nMaaş:${salaryNum}₺ Sabit:${JSON.stringify(fixedItems)} Harcanabilir:${disposable}₺`}]})});const d=await res.json();const text=d.content?.[0]?.text||"";const p=JSON.parse(text.replace(/```json|```/g,"").trim());upd({plan:p});setView("plan");onBadge("budget_setup");onPoints(100);}
    catch{const fb={plan:[{category:"Yiyecek",amount:Math.round(disposable*.3),emoji:"🍔",reason:"Temel ihtiyaç",percent:30},{category:"Ulaşım",amount:Math.round(disposable*.15),emoji:"🚗",reason:"Günlük",percent:15},{category:"Eğlence",amount:Math.round(disposable*.1),emoji:"🎮",reason:"Sosyal",percent:10},{category:"Tasarruf",amount:Math.round(disposable*.3),emoji:"💰",reason:"Acil fon",percent:30},{category:"Diğer",amount:Math.round(disposable*.15),emoji:"📦",reason:"Beklenmedik",percent:15}],totalFixed,disposable,savingTip:"Gelirinin %30'unu tasarrufa ayır.",warning:disposable<3000?"Harcanabilir para az!":null};upd({plan:fb});setView("plan");onBadge("budget_setup");onPoints(100);}
    setLoadingPlan(false);
  };
  return (
    <div style={{flex:1,overflowY:"auto",padding:"10px 14px 14px"}}>
      <div className="gc" style={{borderRadius:12,padding:4,display:"flex",marginBottom:12}}>
        {[[S.budget_setup,"setup"],[S.budget_plan,"plan"],[S.budget_track,"track"]].map(([l,v])=>(
          <button key={v} onClick={()=>setView(v)} style={{flex:1,padding:"8px 4px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",background:view===v?t.a:"transparent",color:view===v?"#fff":C.t3,fontWeight:700,fontSize:11,transition:"all 0.18s"}}>{l}</button>
        ))}
      </div>
      {view==="setup"&&(<div style={{animation:"fadeIn 0.3s ease"}}>
        <div className="gc" style={{borderRadius:16,padding:13,marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,color:C.t3,marginBottom:8,letterSpacing:0.6,textTransform:"uppercase"}}>{S.salary}</div>
          <div style={{position:"relative"}}><input value={salary} onChange={e=>upd({salary:e.target.value})} placeholder="25000" type="number" style={{...inpS,fontSize:20,fontWeight:800,paddingRight:32,border:`1px solid ${salary?t.a+"50":C.b1}`}}/><span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",fontSize:13,fontWeight:700,color:C.t2}}>₺</span></div>
        </div>
        <div className="gc" style={{borderRadius:16,padding:13,marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{fontSize:10,fontWeight:700,color:C.t3,letterSpacing:0.6,textTransform:"uppercase"}}>{S.fixedExpenses}</div>
            <button className="gb" onClick={()=>setAddingFixed(f=>!f)} style={{padding:"4px 10px",borderRadius:9,color:t.a,fontSize:11,fontWeight:700,fontFamily:"inherit",border:`1px solid ${t.a}35`}}>{addingFixed?S.cancel:"+ "+S.add}</button>
          </div>
          {addingFixed&&(<div style={{marginBottom:10,padding:10,borderRadius:11,background:C.g2,border:`1px solid ${C.b1}`,animation:"fadeUp 0.22s ease"}}>
            <div style={{display:"flex",gap:6,marginBottom:6}}><select value={nf.emoji} onChange={e=>setNf(p=>({...p,emoji:e.target.value}))} style={{width:44,padding:"7px",borderRadius:9,background:C.g1,border:`1px solid ${C.b1}`,color:C.t1,fontSize:15,fontFamily:"inherit",cursor:"pointer"}}>{FIXED_ICONS.map(e=><option key={e} value={e}>{e}</option>)}</select><input value={nf.label} onChange={e=>setNf(p=>({...p,label:e.target.value}))} placeholder="Kira, Elektrik..." style={{...inpS,flex:1}}/></div>
            <div style={{display:"flex",gap:6,marginBottom:8}}><input value={nf.amount} onChange={e=>setNf(p=>({...p,amount:e.target.value}))} placeholder="₺" type="number" style={{...inpS,flex:1}}/><input value={nf.dueDay} onChange={e=>setNf(p=>({...p,dueDay:e.target.value}))} placeholder="Gün" type="number" min="1" max="31" style={{...inpS,flex:1}}/></div>
            <button className="sbtn" onClick={()=>{if(!nf.label||!nf.amount)return;upd({fixedItems:[...fixedItems,{...nf,id:Date.now(),amount:parseFloat(nf.amount)}]});setNf({label:"",amount:"",emoji:"🏠",dueDay:""});setAddingFixed(false);}} style={{width:"100%",padding:"9px",borderRadius:10,border:"none",color:"#fff",fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{S.add}</button>
          </div>)}
          {fixedItems.length===0?<div style={{textAlign:"center",padding:"12px 0",color:C.t3,fontSize:12}}>Kira, fatura ekle.</div>:fixedItems.map((item,i)=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:i<fixedItems.length-1?`1px solid ${C.b1}`:"none"}}>
              <span style={{fontSize:16}}>{item.emoji}</span>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.t1}}>{item.label}</div>{item.dueDay&&<div style={{fontSize:10,color:C.t3}}>Her ayın {item.dueDay}. günü</div>}</div>
              <span style={{fontSize:13,fontWeight:800,color:t.a}}>{item.amount.toLocaleString("tr-TR")}₺</span>
              <button onClick={()=>upd({fixedItems:fixedItems.filter(x=>x.id!==item.id)})} style={{background:"none",border:"none",cursor:"pointer"}}><Trash2 size={12} color={C.t3}/></button>
            </div>
          ))}
          {fixedItems.length>0&&<div style={{marginTop:8,paddingTop:8,borderTop:`1px solid ${C.b1}`,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.t2}}>Toplam</span><span style={{fontSize:12,fontWeight:800,color:C.pink}}>{totalFixed.toLocaleString("tr-TR")}₺</span></div>}
        </div>
        {salaryNum>0&&<div className="gc" style={{borderRadius:14,padding:"11px 13px",marginBottom:10,border:`1px solid ${disposable>0?t.a+"30":C.pink+"30"}`}}>
          {[["Maaş",`+${salaryNum.toLocaleString("tr-TR")}₺`,C.green],["Sabit",`-${totalFixed.toLocaleString("tr-TR")}₺`,C.pink]].map(([l,v,col])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:11,color:C.t2}}>{l}</span><span style={{fontSize:11,fontWeight:700,color:col}}>{v}</span></div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",paddingTop:6,borderTop:`1px solid ${C.b1}`}}><span style={{fontSize:12,fontWeight:700,color:C.t1}}>Harcanabilir</span><span style={{fontSize:17,fontWeight:900,color:disposable>=0?C.green:C.pink,letterSpacing:-0.5}}>{disposable.toLocaleString("tr-TR")}₺</span></div>
        </div>}
        <button className="sbtn" onClick={genPlan} disabled={!salary||fixedItems.length===0||loadingPlan} style={{width:"100%",padding:"13px",borderRadius:15,border:"none",color:"#fff",fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",opacity:salary&&fixedItems.length>0?1:0.4,display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
          {loadingPlan?<Dots t={t}/>:<><Zap size={14} color="#fff"/> {S.generatePlan}</>}
        </button>
      </div>)}
      {view==="plan"&&(<div style={{animation:"fadeIn 0.3s ease"}}>
        {!plan?<div style={{textAlign:"center",padding:"34px 0",color:C.t3,fontSize:12}}>Kurulum sekmesinden başla.</div>:(
          <>
            <div className="gc" style={{borderRadius:16,padding:12,marginBottom:11}}>
              <div style={{display:"flex",gap:7,marginBottom:10}}>
                {[["Maaş",salaryNum,C.green],["Sabit",plan.totalFixed,C.pink],["Serbest",plan.disposable,t.a]].map(([l,v,c])=>(
                  <div key={l} className="gc" style={{flex:1,borderRadius:10,padding:"7px",textAlign:"center"}}><div style={{fontSize:13,fontWeight:900,color:c,letterSpacing:-0.4}}>{v?.toLocaleString("tr-TR")}₺</div><div style={{fontSize:9,color:C.t3,marginTop:1,fontWeight:600}}>{l}</div></div>
                ))}
              </div>
              {plan.savingTip&&<div style={{fontSize:11,color:C.green,background:"rgba(48,209,88,0.08)",borderRadius:9,padding:"7px 10px",lineHeight:1.5,display:"flex",alignItems:"flex-start",gap:5}}><TrendingUp size={11} color={C.green} style={{flexShrink:0,marginTop:1}}/>{plan.savingTip}</div>}
              {plan.warning&&<div style={{fontSize:11,color:C.orange,background:"rgba(255,159,10,0.08)",borderRadius:9,padding:"7px 10px",lineHeight:1.5,marginTop:6,display:"flex",alignItems:"flex-start",gap:5}}><AlertCircle size={11} color={C.orange} style={{flexShrink:0,marginTop:1}}/>{plan.warning}</div>}
            </div>
            {plan.plan?.map((item,i)=>(
              <div key={i} className="ic gc" style={{borderRadius:13,padding:"11px 12px",marginBottom:8,animationDelay:`${i*0.05}s`}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:32,height:32,borderRadius:9,background:`${t.a}13`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{item.emoji}</div><div><div style={{fontSize:12,fontWeight:700,color:C.t1}}>{item.category}</div><div style={{fontSize:10,color:C.t3,marginTop:1}}>{item.reason}</div></div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:900,color:t.a,letterSpacing:-0.4}}>{item.amount?.toLocaleString("tr-TR")}₺</div><div style={{fontSize:9,color:C.t3}}>%{item.percent}</div></div>
                </div>
                <div className="pbar"><div className="pfill" style={{width:`${item.percent}%`}}/></div>
              </div>
            ))}
          </>
        )}
      </div>)}
      {view==="track"&&(<div style={{animation:"fadeIn 0.3s ease"}}>
        <div className="gc" style={{borderRadius:16,padding:12,marginBottom:10,textAlign:"center"}}>
          <div style={{fontSize:10,color:C.t3,marginBottom:3}}>{S.remaining}</div>
          <div style={{fontSize:29,fontWeight:900,color:remaining>=0?C.green:C.pink,letterSpacing:-1}}>{remaining.toLocaleString("tr-TR")}₺</div>
          <div className="pbar" style={{marginTop:9}}><div className="pfill" style={{width:`${Math.min(100,Math.round(totalSpent/Math.max(disposable,1)*100))}%`,background:totalSpent>disposable*.8?`linear-gradient(90deg,${C.orange},${C.pink})`:`linear-gradient(90deg,${t.a},${t.b})`}}/></div>
          <div style={{fontSize:10,color:C.t3,marginTop:4}}>{totalSpent.toLocaleString("tr-TR")}₺ {S.spent}</div>
        </div>
        {addExp?(<div className="gc" style={{borderRadius:14,padding:11,marginBottom:10,animation:"fadeUp 0.22s ease"}}>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>
            {EXPENSE_CATS.map(cat=>(
              <button key={cat.id} onClick={()=>setNexp(p=>({...p,cat:cat.id}))} style={{padding:"4px 8px",borderRadius:9,border:`1.5px solid ${nexp.cat===cat.id?cat.color:C.b1}`,background:nexp.cat===cat.id?`${cat.color}13`:"transparent",cursor:"pointer",fontFamily:"inherit",fontSize:10,color:nexp.cat===cat.id?cat.color:C.t3,fontWeight:nexp.cat===cat.id?700:400,transition:"all 0.12s",display:"flex",alignItems:"center",gap:3}}>
                <cat.Icon size={10} color={nexp.cat===cat.id?cat.color:C.t3}/>{cat.label.split("/")[0]}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:6,marginBottom:7}}><input value={nexp.amount} onChange={e=>setNexp(p=>({...p,amount:e.target.value}))} placeholder="₺" type="number" style={{...inpS,flex:1}}/><input value={nexp.desc} onChange={e=>setNexp(p=>({...p,desc:e.target.value}))} placeholder="Açıklama..." style={{...inpS,flex:2}}/></div>
          <div style={{display:"flex",gap:6}}>
            <button className="gb" onClick={()=>setAddExp(false)} style={{flex:1,padding:"8px",borderRadius:10,color:C.t2,fontFamily:"inherit",fontSize:12,fontWeight:600}}>{S.cancel}</button>
            <button className="sbtn" onClick={()=>{if(!nexp.amount)return;const e={...nexp,id:Date.now(),amount:parseFloat(nexp.amount),date:new Date().toLocaleDateString("tr-TR")};upd({expenses:[e,...expenses]});setNexp({cat:"food",amount:"",desc:""});setAddExp(false);}} style={{flex:2,padding:"8px",borderRadius:10,border:"none",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{S.add} ✓</button>
          </div>
        </div>):(<button className="gb" onClick={()=>setAddExp(true)} style={{width:"100%",padding:"10px",borderRadius:13,color:t.a,fontSize:12,fontWeight:700,fontFamily:"inherit",border:`1px solid ${t.a}28`,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><Plus size={13} color={t.a}/> {S.addExpense}</button>)}
        {expenses.length===0?<div style={{textAlign:"center",padding:"16px 0",color:C.t3,fontSize:11}}>{S.noExpense}</div>:expenses.map((e,i)=>{const cat=EXPENSE_CATS.find(c=>c.id===e.cat)||EXPENSE_CATS[5];return(
          <div key={e.id} className="ic gc" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,marginBottom:6,animationDelay:`${i*0.04}s`}}>
            <div style={{width:30,height:30,borderRadius:8,background:`${cat.color}13`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><cat.Icon size={14} color={cat.color}/></div>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.t1}}>{e.desc||cat.label.split("/")[0]}</div><div style={{fontSize:10,color:C.t3,marginTop:1}}>{cat.label.split("/")[0]} · {e.date}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:13,fontWeight:800,color:cat.color}}>{e.amount.toLocaleString("tr-TR")}₺</span><button onClick={()=>upd({expenses:expenses.filter(x=>x.id!==e.id)})} style={{background:"none",border:"none",cursor:"pointer"}}><X size={11} color={C.t3}/></button></div>
          </div>
        );})}
      </div>)}
    </div>
  );
}

// ── Tab Bar ───────────────────────────────────────────────────────────────────
function TabBar({ active, onChange, taskCount, t, S }) {
  const tabs=[{id:"chat",Icon:MessageCircle,l:S.chat},{id:"tasks",Icon:CheckSquare,l:S.tasks,c:taskCount},{id:"budget",Icon:CreditCard,l:S.budget},{id:"habits",Icon:Target,l:S.habits},{id:"more",Icon:Layers,l:S.more}];
  return (
    <div style={{display:"flex",padding:"8px 5px 22px",background:"rgba(0,0,0,0.72)",backdropFilter:"blur(38px)",WebkitBackdropFilter:"blur(38px)",borderTop:`0.5px solid ${C.b1}`}}>
      {tabs.map(tab=>(
        <button key={tab.id} onClick={()=>onChange(tab.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"5px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative",fontFamily:"inherit"}}>
          {tab.c>0&&<div style={{position:"absolute",top:0,right:"calc(50% - 12px)",background:C.pink,color:"#fff",fontSize:9,fontWeight:800,width:14,height:14,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{tab.c}</div>}
          <div style={{width:32,height:25,borderRadius:9,background:active===tab.id?`${t.a}17`:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.17s",boxShadow:active===tab.id?`0 0 8px ${t.glow}`:"none"}}>
            <tab.Icon size={17} color={active===tab.id?t.a:C.t3} strokeWidth={active===tab.id?2.2:1.8}/>
          </div>
          <span style={{fontSize:9,fontWeight:active===tab.id?700:400,color:active===tab.id?t.a:C.t3,transition:"color 0.17s"}}>{tab.l}</span>
        </button>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("loading");
  const [panel, setPanel] = useState(null);
  const [subPanel, setSubPanel] = useState(null); // for nested panels
  const [confettiOn, setConfettiOn] = useState(false);
  const [badgeToast, setBadgeToast] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [themeKey, setThemeKey] = useState("blue");
  const [lang, setLang] = useState("tr");
  const t = THEMES[themeKey];
  const S = STRINGS[lang];

  // State
  const [user, setUser] = useState(null);
  const [pin, setPin] = useState(null);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [messages, setMessages] = useState([{role:"assistant",text:"Merhaba! 👋 Ben Hayatım.\n\nNe yapman gerekiyor?",items:[]}]);
  const [allItems, setAllItems] = useState([]);
  const [habits, setHabits] = useState([]);
  const [notes, setNotes] = useState([]);
  const [budgetData, setBudgetData] = useState({salary:"",fixedItems:[],plan:null,expenses:[]});
  const [streak, setStreak] = useState(0);
  const [totalDone, setTotalDone] = useState(0);
  const [points, setPoints] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [journalCount, setJournalCount] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [habitStreak, setHabitStreak] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [storeReady, setStoreReady] = useState(false);
  const [reminderTarget, setReminderTarget] = useState(null);
  // Premium
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiry, setPremiumExpiry] = useState(null); // ISO date string
  const [dailyMsgCount, setDailyMsgCount] = useState(0);
  const [dailyMsgDate, setDailyMsgDate] = useState("");
  // Referral
  const [referralCode] = useState(() => Math.random().toString(36).slice(2,8).toUpperCase());
  const [referralCount, setReferralCount] = useState(0);
  const [referralBonusDays, setReferralBonusDays] = useState(0);
  // Stats (tracked automatically)
  const [dailyDone, setDailyDone] = useState([]); // [{date, count}]

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(()=>messagesEndRef.current?.scrollIntoView({behavior:"smooth"}),[messages,loading]);

  // Load
  useEffect(()=>{
    loadStore().then(data=>{
      if(data){
        if(data.user)setUser(data.user);
        if(data.pin)setPin(data.pin);
        if(data.pinEnabled!==undefined)setPinEnabled(data.pinEnabled);
        if(data.messages?.length)setMessages(data.messages);
        if(data.allItems)setAllItems(data.allItems);
        if(data.habits)setHabits(data.habits);
        if(data.notes)setNotes(data.notes);
        if(data.budgetData)setBudgetData(data.budgetData);
        if(data.streak)setStreak(data.streak);
        if(data.totalDone)setTotalDone(data.totalDone);
        if(data.points)setPoints(data.points);
        if(data.earnedBadges)setEarnedBadges(data.earnedBadges);
        if(data.journalCount)setJournalCount(data.journalCount);
        if(data.pomodoroCount)setPomodoroCount(data.pomodoroCount);
        if(data.themeKey)setThemeKey(data.themeKey);
        if(data.habitStreak)setHabitStreak(data.habitStreak);
        if(data.lang)setLang(data.lang);
        if(data.isPremium!==undefined)setIsPremium(data.isPremium);
        if(data.premiumExpiry)setPremiumExpiry(data.premiumExpiry);
        if(data.dailyMsgCount)setDailyMsgCount(data.dailyMsgCount);
        if(data.dailyMsgDate)setDailyMsgDate(data.dailyMsgDate);
        if(data.referralCount)setReferralCount(data.referralCount);
        if(data.referralBonusDays)setReferralBonusDays(data.referralBonusDays);
        if(data.dailyDone)setDailyDone(data.dailyDone);
        setScreen(data.user?(data.pinEnabled&&data.pin?"pin-verify":"app"):"auth");
      } else setScreen("auth");
      setStoreReady(true);
    });
  },[]);

  // Save
  useEffect(()=>{
    if(!storeReady)return;
    saveStore({user,pin,pinEnabled,messages,allItems,habits,notes,budgetData,streak,totalDone,points,earnedBadges,journalCount,pomodoroCount,themeKey,habitStreak,lang,isPremium,premiumExpiry,dailyMsgCount,dailyMsgDate,referralCount,referralBonusDays,dailyDone});
  },[user,pin,pinEnabled,messages,allItems,habits,notes,budgetData,streak,totalDone,points,earnedBadges,journalCount,pomodoroCount,themeKey,habitStreak,lang,isPremium,premiumExpiry,dailyMsgCount,dailyMsgDate,referralCount,referralBonusDays,dailyDone,storeReady]);

  const showConfetti=()=>{setConfettiOn(true);setTimeout(()=>setConfettiOn(false),2400);};

  const tryBadge=useCallback(id=>{
    setEarnedBadges(prev=>{
      if(prev.includes(id))return prev;
      const def=BADGE_DEFS.find(b=>b.id===id);
      if(!def)return prev;
      setBadgeToast(def);showConfetti();
      return[...prev,id];
    });
  },[]);

  const addPoints=useCallback(n=>setPoints(p=>p+n),[]);

  useEffect(()=>{
    const stats={totalDone,streak,budgetSetup:!!budgetData.plan,journalCount,pomodoroCount,habitStreak};
    BADGE_DEFS.forEach(b=>{if(!earnedBadges.includes(b.id)&&b.check(stats))tryBadge(b.id);});
  },[totalDone,streak,budgetData.plan,journalCount,pomodoroCount,habitStreak]);

  // ── Premium helpers ──────────────────────────────────────────────────────
  const activePremium = isPremium && premiumExpiry && new Date(premiumExpiry) > new Date();
  const todayStr = new Date().toISOString().split("T")[0];
  const todayMsgCount = dailyMsgDate === todayStr ? dailyMsgCount : 0;
  const canSendMsg = activePremium || todayMsgCount < FREE_LIMITS.dailyMessages;
  const msgsLeft = Math.max(0, FREE_LIMITS.dailyMessages - todayMsgCount);
  const canAddHabit = activePremium || habits.length < FREE_LIMITS.maxHabits;
  const canAddNote = activePremium || notes.length < FREE_LIMITS.maxNotes;
  const canAddTask = activePremium || allItems.length < FREE_LIMITS.maxTasks;

  const activatePremium = (days=30) => {
    const expiry = new Date(); expiry.setDate(expiry.getDate()+days);
    setIsPremium(true); setPremiumExpiry(expiry.toISOString());
    showConfetti(); addPoints(500);
  };

  const applyReferral = (code) => {
    if (code.trim().toUpperCase() === referralCode) return "own";
    // Simulate: any valid-looking 6-char code works
    if (code.trim().length === 6) {
      setReferralBonusDays(d => d + REFERRAL_BONUS_DAYS);
      activatePremium(REFERRAL_BONUS_DAYS);
      setReferralCount(c => c+1);
      return "ok";
    }
    return "invalid";
  };

  const parseItems=txt=>{try{const m=txt.match(/<items>([\s\S]*?)<\/items>/);if(m)return JSON.parse(m[1]);}catch{}return[];};
  const cleanText=txt=>txt.replace(/<items>[\s\S]*?<\/items>/g,"").trim();

  const sendMessage=async()=>{
    if(!input.trim()||loading)return;
    // Daily limit check
    if(!canSendMsg){ setPanel("premium"); return; }
    const userText=input.trim();setInput("");
    // Increment daily counter
    const today=new Date().toISOString().split("T")[0];
    setDailyMsgDate(today);
    setDailyMsgCount(dailyMsgDate===today ? dailyMsgCount+1 : 1);
    setMessages(p=>[...p,{role:"user",text:userText}]);setLoading(true);
    try{
      const history=messages.slice(-10).map(m=>({role:m.role,content:m.role==="assistant"?m.text+(m.items?.length?`\n<items>${JSON.stringify(m.items)}</items>`:"<items>[]</items>"):m.text}));
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:CHAT_PROMPT,messages:[...history,{role:"user",content:userText}]})});
      const data=await res.json();const full=data.content?.map(c=>c.text||"").join("")||"Bir hata oluştu.";
      const newItems=parseItems(full);const cleaned=cleanText(full);
      setMessages(p=>[...p,{role:"assistant",text:cleaned,items:newItems}]);
      if(newItems.length>0){setAllItems(p=>[...newItems.map((item,i)=>({...item,id:Date.now()+i,done:false})),...p]);setStreak(s=>s+1);addPoints(5);}
    }catch{setMessages(p=>[...p,{role:"assistant",text:"Bir sorun oluştu 🙏",items:[]}]);}
    setLoading(false);
  };

  const toggleItem=id=>{
    setAllItems(p=>p.map(i=>{
      if(i.id!==id)return i;
      if(!i.done){
        setTotalDone(d=>d+1);addPoints(10);showConfetti();
        // Track daily done stats
        const td=new Date().toISOString().split("T")[0];
        setDailyDone(prev=>{const ex=prev.find(x=>x.date===td);return ex?prev.map(x=>x.date===td?{...x,count:x.count+1}:x):[...prev,{date:td,count:1}];});
      } else setTotalDone(d=>Math.max(0,d-1));
      return{...i,done:!i.done};
    }));
  };

  const taskCount=allItems.filter(i=>!i.done&&(i.type==="görev"||i.type==="hatırlatıcı"||i.type==="task"||i.type==="reminder")).length;
  const hour=new Date().getHours();
  const greeting=hour<12?S.greeting_morning:hour<18?S.greeting_day:S.greeting_evening;

  // ── Settings ──────────────────────────────────────────────────────────────
  const SettingsPanel = () => {
    const [pinSetup, setPinSetup] = useState(false);
    if (pinSetup) return <PINScreen mode="setup" onSuccess={np=>{setPin(np);setPinEnabled(true);setPinSetup(false);}} onCancel={()=>setPinSetup(false)} t={t} S={S}/>;
    return (
      <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease"}}>
        <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
          <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Settings size={16} color={t.a}/> {S.settings}</div>
          <button className="gb" onClick={()=>setPanel(null)} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"13px 15px"}}>
          {/* Profile */}
          <div className="gc" style={{borderRadius:17,padding:"15px",marginBottom:13,textAlign:"center"}}>
            <div style={{width:54,height:54,borderRadius:"50%",background:`linear-gradient(135deg,${t.a},${t.b})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",boxShadow:`0 0 15px ${t.glow}`}}>
              <span style={{fontSize:22,fontWeight:900,color:"#fff"}}>{(user?.name||"U")[0].toUpperCase()}</span>
            </div>
            <div style={{fontSize:15,fontWeight:800,color:C.t1}}>{user?.name}</div>
            <div style={{fontSize:10,color:C.t3,marginTop:2}}>{user?.email||user?.phone||""}</div>
            <div style={{fontSize:10,color:C.t3,marginTop:3}}>{totalDone} {lang==="tr"?"görev":"tasks"} · {points} {S.points} · {earnedBadges.length} {S.badges}</div>
          </div>
          {/* Language */}
          <div className="gc" style={{borderRadius:15,padding:12,marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,color:C.t3,letterSpacing:0.6,textTransform:"uppercase",marginBottom:10,display:"flex",alignItems:"center",gap:5}}><Languages size={11} color={C.t3}/> {S.language}</div>
            <div style={{display:"flex",gap:8}}>
              {[["tr","🇹🇷 Türkçe"],["en","🇬🇧 English"]].map(([l,label])=>(
                <button key={l} onClick={()=>setLang(l)} style={{flex:1,padding:"10px",borderRadius:12,border:`2px solid ${lang===l?t.a:C.b1}`,background:lang===l?`${t.a}15`:C.g1,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:700,color:lang===l?t.a:C.t2,transition:"all 0.18s",boxShadow:lang===l?`0 0 9px ${t.glow}`:"none"}}>{label}</button>
              ))}
            </div>
          </div>
          {/* Theme */}
          <div className="gc" style={{borderRadius:15,padding:12,marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,color:C.t3,letterSpacing:0.6,textTransform:"uppercase",marginBottom:10}}>🎨 {S.theme}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {Object.entries(THEMES).map(([key,th])=>(
                <button key={key} onClick={()=>setThemeKey(key)} style={{padding:"11px",borderRadius:12,border:`2px solid ${themeKey===key?th.a:C.b1}`,background:themeKey===key?`${th.a}12`:C.g1,cursor:"pointer",fontFamily:"inherit",boxShadow:themeKey===key?`0 0 9px ${th.glow}`:"none",transition:"all 0.17s"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:`linear-gradient(135deg,${th.a},${th.b})`,margin:"0 auto 6px",boxShadow:`0 0 6px ${th.glow}`}}/>
                  <div style={{fontSize:11,fontWeight:700,color:themeKey===key?th.a:C.t2}}>{th.n}</div>
                </button>
              ))}
            </div>
          </div>
          {/* PIN */}
          <div className="gc" style={{borderRadius:15,padding:12,marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,color:C.t3,letterSpacing:0.6,textTransform:"uppercase",marginBottom:10}}>🔐 {S.security}</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <div style={{width:32,height:32,borderRadius:9,background:`${t.a}13`,display:"flex",alignItems:"center",justifyContent:"center"}}><Lock size={15} color={t.a}/></div>
                <div><div style={{fontSize:12,fontWeight:600,color:C.t1}}>{S.pinLock}</div><div style={{fontSize:10,color:C.t3,marginTop:1}}>{pinEnabled?S.pinActive:S.pinOff}</div></div>
              </div>
              <div onClick={()=>{if(pinEnabled){setPin(null);setPinEnabled(false);}else setPinSetup(true);}} style={{width:44,height:25,borderRadius:13,background:pinEnabled?t.a:C.g2,border:`1px solid ${pinEnabled?t.a:C.b1}`,cursor:"pointer",position:"relative",transition:"all 0.24s",boxShadow:pinEnabled?`0 0 8px ${t.glow}`:"none"}}>
                <div style={{position:"absolute",width:17,height:17,borderRadius:"50%",background:"#fff",top:3,left:pinEnabled?23:3,transition:"left 0.24s",boxShadow:"0 1px 3px rgba(0,0,0,0.28)"}}/>
              </div>
            </div>
          </div>
          {/* Logout */}
          <button className="gb" onClick={()=>{setUser(null);setScreen("auth");saveStore(null);}} style={{width:"100%",padding:"12px 13px",borderRadius:14,display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontFamily:"inherit",border:`1px solid ${C.red}28`}}>
            <div style={{width:32,height:32,borderRadius:9,background:`${C.red}13`,display:"flex",alignItems:"center",justifyContent:"center"}}><LogOut size={15} color={C.red}/></div>
            <div style={{fontSize:13,fontWeight:700,color:C.red}}>{S.logout}</div>
          </button>
        </div>
      </div>
    );
  };

  // ── Badges panel ──────────────────────────────────────────────────────────
  const BadgesPanel = () => (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease"}}>
      <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
        <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Award size={16} color={C.gold}/> {S.badges}</div>
        <button className="gb" onClick={()=>setPanel(null)} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"13px 15px"}}>
        <div className="gc" style={{borderRadius:16,padding:"11px 13px",marginBottom:13,display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:40,height:40,borderRadius:12,background:"rgba(255,215,0,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}><Star size={19} color={C.gold} strokeWidth={1.8}/></div>
          <div style={{flex:1}}><div style={{fontSize:20,fontWeight:900,color:C.gold,letterSpacing:-0.6}}>{points} <span style={{fontSize:11,color:C.t3,fontWeight:600}}>{S.points}</span></div><div style={{fontSize:10,color:C.t3,marginTop:1}}>{earnedBadges.length}/{BADGE_DEFS.length} {S.badges}</div></div>
        </div>
        <div className="pbar" style={{marginBottom:13}}><div className="pfill" style={{width:`${Math.round(earnedBadges.length/BADGE_DEFS.length*100)}%`}}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {BADGE_DEFS.map((b,i)=>{const earned=earnedBadges.includes(b.id);return(
            <div key={b.id} className="ic gc" style={{borderRadius:15,padding:"13px 11px",textAlign:"center",border:`1px solid ${earned?"rgba(255,215,0,0.24)":C.b1}`,background:earned?"rgba(255,215,0,0.05)":C.g1,animationDelay:`${i*0.04}s`,opacity:earned?1:0.4}}>
              <div style={{width:42,height:42,borderRadius:12,background:earned?"rgba(255,215,0,0.12)":C.g2,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px",boxShadow:earned?"0 0 12px rgba(255,215,0,0.18)":"none"}}><b.Icon size={20} color={earned?C.gold:C.t3} strokeWidth={1.8}/></div>
              <div style={{fontSize:11,fontWeight:700,color:earned?C.gold:C.t2,marginBottom:3}}>{b.name[lang]}</div>
              <div style={{fontSize:10,color:C.t3,lineHeight:1.45}}>{b.desc[lang]}</div>
              {earned&&<div style={{fontSize:9,color:C.gold,marginTop:4,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:2}}><Check size={8} color={C.gold}/> {S.earned}</div>}
            </div>
          );})}
        </div>
      </div>
    </div>
  );

  // ── Game Panel ────────────────────────────────────────────────────────────
  const GamePanel = () => {
    const board=[{n:user?.name||"Sen",pts:points,you:true},{n:"Ahmet K.",pts:Math.max(0,points-55)},{n:"Zeynep S.",pts:Math.max(0,points-145)},{n:"Murat T.",pts:Math.max(0,points-270)},{n:"Elif B.",pts:Math.max(0,points-410)},{n:"Can D.",pts:Math.max(0,points-590)}].sort((a,b)=>b.pts-a.pts);
    const rank=board.findIndex(x=>x.you)+1;
    return (
      <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",padding:21,animation:"fadeIn 0.3s ease",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Trophy size={16} color={C.gold}/> {S.leaderboard}</div>
          <button className="gb" onClick={()=>setPanel(null)} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
        </div>
        <div className="gc" style={{borderRadius:16,padding:13,marginBottom:13,textAlign:"center",border:"1px solid rgba(255,215,0,0.18)",background:"rgba(255,215,0,0.04)"}}>
          <div style={{fontSize:9,color:C.gold,fontWeight:700,letterSpacing:0.8,textTransform:"uppercase",marginBottom:5}}>#{lang==="tr"?"Sıran":"Rank"}</div>
          <div style={{fontSize:38,fontWeight:900,color:C.gold,letterSpacing:-1}}>#{rank}</div>
          <div style={{fontSize:12,color:C.t2,marginTop:3}}>{points} {S.points}</div>
        </div>
        {board.map((u,i)=>(
          <div key={i} className={u.you?"ic":""} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,marginBottom:7,background:u.you?`${t.a}12`:C.g1,border:`1px solid ${u.you?t.a+"35":C.b1}`}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:i<3?["rgba(255,215,0,0.17)","rgba(192,192,192,0.17)","rgba(205,127,50,0.17)"][i]:C.g2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:i<3?[C.gold,"#C0C0C0","#CD7F32"][i]:C.t3,flexShrink:0}}>
              {i<3?["🥇","🥈","🥉"][i]:i+1}
            </div>
            <div style={{flex:1,fontSize:12,fontWeight:u.you?800:600,color:u.you?t.a:C.t1}}>{u.n}{u.you?` (${lang==="tr"?"Sen":"You"})`:""}</div>
            <div style={{fontSize:13,fontWeight:800,color:u.you?t.a:C.t2}}>{u.pts}</div>
            <TrendingUp size={12} color={u.you?t.a:C.t3}/>
          </div>
        ))}
        <div className="gc" style={{borderRadius:12,padding:"10px 12px",marginTop:3,fontSize:10,color:C.t2,lineHeight:1.6}}>
          <Zap size={11} color={C.orange} style={{display:"inline",marginRight:5}}/>
          {lang==="tr"?"Görev: +10 · Pomodoro: +50 · Bütçe: +100 · Alışkanlık: +10/gün":"Task: +10 · Pomodoro: +50 · Budget: +100 · Habit: +10/day"}
        </div>
      </div>
    );
  };

  // ── Share Panel ───────────────────────────────────────────────────────────
  const SharePanelComp = () => {
    const [copied,setCopied]=useState(false);
    const text=lang==="tr"
      ?`🔥 Hayatım'da bu hafta:\n✅ ${totalDone} görev tamamladım\n🔥 ${streak} günlük seri\n🏅 ${earnedBadges.length} rozet · ⭐ ${points} puan\n\nhayatim.app ile hayatını organize et!`
      :`🔥 This week on MyLife:\n✅ ${totalDone} tasks done\n🔥 ${streak}-day streak\n🏅 ${earnedBadges.length} badges · ⭐ ${points} points\n\nOrganize your life at hayatim.app!`;
    return (
      <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",padding:21,animation:"fadeIn 0.3s ease",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Share2 size={16} color={t.a}/> {S.share}</div>
          <button className="gb" onClick={()=>setPanel(null)} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
        </div>
        <div className="gc" style={{borderRadius:16,padding:13,marginBottom:12,border:`1px solid ${t.a}20`,fontSize:13,color:C.t1,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{text}</div>
        {[{n:"WhatsApp",color:"#25D366",Icon:MessageCircle},{n:"Twitter/X",color:"#000",Icon:Globe},{n:"Instagram",color:"#E1306C",Icon:Share2},{n:"LinkedIn",color:"#0077B5",Icon:Globe}].map((p,i)=>(
          <div key={i} className="ic" style={{display:"flex",alignItems:"center",gap:11,padding:"13px",borderRadius:15,background:p.color,marginBottom:9,cursor:"pointer",animationDelay:`${i*0.05}s`}}>
            <p.Icon size={17} color="#fff" strokeWidth={2}/><span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{p.n}</span><ChevronRight size={15} color="rgba(255,255,255,0.55)" style={{marginLeft:"auto"}}/>
          </div>
        ))}
        <button className="gb" onClick={()=>{navigator.clipboard?.writeText(text).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2200);}} style={{width:"100%",padding:"12px",borderRadius:14,color:copied?C.green:C.t1,fontSize:13,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:7,border:`1px solid ${copied?C.green:C.b1}`,transition:"all 0.3s"}}>
          <Copy size={14} color={copied?C.green:C.t2}/> {copied?`✓ Copied!`:lang==="tr"?"Metni Kopyala":"Copy Text"}
        </button>
      </div>
    );
  };

  // ── Render tabs ───────────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeTab==="chat") return (
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"7px 13px 0",display:"flex",gap:6,overflowX:"auto"}}>
          {[{ic:Timer,l:"Pomodoro",p:"pomodoro"},{ic:BookOpen,l:"Journal",p:"journal"},{ic:Music,l:"Spotify",p:"spotify"},{ic:MapPin,l:lang==="tr"?"Konum":"Location",p:"location"},{ic:MessageCircle,l:"WhatsApp",p:"whatsapp"},{ic:Sun,l:lang==="tr"?"Hava":"Weather",p:"weather"},{ic:Share2,l:S.share,p:"share"},{ic:Trophy,l:lang==="tr"?"Sıralama":"Rank",p:"game"}].map(b=>(
            <button key={b.p} className="gb chip" onClick={()=>setPanel(b.p)} style={{flexShrink:0,padding:"6px 11px",borderRadius:18,fontSize:11,fontWeight:600,color:C.t2,fontFamily:"inherit",display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"}}>
              <b.ic size={12} color={C.t2}/><span>{b.l}</span>
            </button>
          ))}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"10px 13px 7px"}}>
          {messages.map((msg,i)=>(<div key={i}><Bubble msg={msg} t={t}/>{msg.items?.length>0&&<div style={{paddingLeft:38,marginBottom:10}}>{msg.items.map((item,j)=><ItemCard key={j} item={item} index={j} t={t}/>)}</div>}</div>))}
          {loading&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:11,animation:"fadeIn 0.3s ease"}}><div style={{width:29,height:29,borderRadius:"50%",background:`linear-gradient(135deg,${t.a},${t.b})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 0 10px ${t.glow}`}}>✦</div><div className="gc" style={{padding:"10px 14px",borderRadius:"16px 16px 16px 4px"}}><Dots t={t}/></div></div>}
          <div ref={messagesEndRef}/>
        </div>
        {messages.length<=2&&<div style={{padding:"0 13px 7px",display:"flex",gap:6,overflowX:"auto"}}>
          {["📅 Yarın saat 10'da toplantım var","🛒 Markete süt ekmek yumurta","💊 Her gün ilaç almayı hatırlat"].map((a,i)=>(
            <button key={i} className="gc chip" onClick={()=>{setInput(a.substring(2));inputRef.current?.focus();}} style={{flexShrink:0,padding:"7px 12px",borderRadius:20,fontSize:11,color:C.t2,fontFamily:"inherit",whiteSpace:"nowrap",cursor:"pointer"}}>{a}</button>
          ))}
        </div>}
        <div style={{padding:"9px 13px 13px",display:"flex",gap:9,alignItems:"flex-end",borderTop:`0.5px solid ${C.b1}`,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(16px)"}}>
          <div className="gc" style={{flex:1,borderRadius:22,overflow:"hidden",border:input?`1px solid ${t.a}48`:undefined,transition:"all 0.18s"}}>
            <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}} placeholder={S.typeHere} rows={1} style={{width:"100%",padding:"11px 14px",background:"transparent",border:"none",color:C.t1,fontSize:14,resize:"none",fontFamily:"inherit",lineHeight:1.5}}/>
          </div>
          <button onClick={sendMessage} disabled={!input.trim()||loading} className={input.trim()&&!loading?"sbtn":"gc"} style={{width:40,height:40,borderRadius:"50%",border:`1px solid ${C.b1}`,cursor:input.trim()&&!loading?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <Send size={15} color={input.trim()&&!loading?"#fff":C.t3}/>
          </button>
        </div>
      </div>
    );

    if (activeTab==="tasks") {
      const pending=allItems.filter(i=>!i.done), done=allItems.filter(i=>i.done);
      return (
        <div style={{flex:1,overflowY:"auto",padding:"12px 13px"}}>
          {/* Search bar */}
          <button className="gc chip" onClick={()=>setPanel("search")} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"10px 13px",borderRadius:14,marginBottom:12,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
            <Search size={14} color={C.t3}/><span style={{fontSize:13,color:C.t3}}>{S.search}</span>
          </button>
          {allItems.length===0&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"58%",gap:12,animation:"fadeIn 0.4s ease"}}><CheckSquare size={48} color={C.t3} strokeWidth={1.5} style={{opacity:0.33}}/><div style={{color:C.t1,fontSize:14,fontWeight:700}}>{S.noTask}</div><div style={{color:C.t3,fontSize:12,textAlign:"center",lineHeight:1.65}}>{S.noTaskSub}</div></div>}
          {pending.length>0&&<><div style={{fontSize:9,fontWeight:700,color:C.t3,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>{S.pending} ({pending.length})</div>{pending.map((item,i)=><ItemCard key={item.id} item={item} index={i} onToggle={toggleItem} onSetTime={id=>setReminderTarget(id)} t={t}/>)}</>}
          {done.length>0&&<><div style={{fontSize:9,fontWeight:700,color:C.green,letterSpacing:1,textTransform:"uppercase",marginBottom:8,marginTop:13}}>{S.completed} ({done.length})</div>{done.map((item,i)=><ItemCard key={item.id} item={item} index={i} onToggle={toggleItem} t={t}/>)}</>}
        </div>
      );
    }

    if (activeTab==="budget") return <BudgetScreen budgetData={budgetData} setBudgetData={setBudgetData} t={t} onBadge={tryBadge} onPoints={addPoints} S={S}/>;
    if (activeTab==="habits") return <HabitsScreen habits={habits} setHabits={setHabits} t={t} onBadge={tryBadge} onPoints={addPoints} S={S}/>;
    if (activeTab==="more") return (
      <div style={{flex:1,overflowY:"auto",padding:"11px 13px"}}>
        {[
          {ic:Calendar,  l:S.calendar,     sub:lang==="tr"?"Aylık görev takvimi":"Monthly task calendar",   p:"calendar"},
          {ic:Activity,  l:lang==="tr"?"İstatistikler":"Statistics", sub:lang==="tr"?"Grafikler & analizler":"Charts & analysis", p:"stats"},
          {ic:ShieldCheck,l:lang==="tr"?"Bağımlılık Rehberi":"Addiction Guide", sub:lang==="tr"?"AI destekli koçluk":"AI-powered coaching", p:"addiction"},
          {ic:UserPlus,  l:lang==="tr"?"Arkadaş Davet":"Invite Friends", sub:lang==="tr"?`${referralCount} davet · +${REFERRAL_BONUS_DAYS} gün premium`:`${referralCount} invites · +${REFERRAL_BONUS_DAYS} days premium`, p:"referral"},
          {ic:Crown,     l:lang==="tr"?"Premium":"Premium", sub:activePremium?(lang==="tr"?"Aktif 👑":"Active 👑"):(lang==="tr"?`${msgsLeft} mesaj kaldı · ${PREMIUM_PRICE}/ay`:`${msgsLeft} msgs left · ${PREMIUM_PRICE}/mo`), p:"premium"},
          {ic:Edit3,     l:S.notes,         sub:lang==="tr"?"Zengin not editörü":"Rich note editor",          p:"notes"},
          {ic:Search,    l:S.searchTitle,   sub:lang==="tr"?"Görev ve notlarda ara":"Search tasks and notes", p:"search"},
          {ic:BarChart,  l:S.weeklyReport,  sub:lang==="tr"?"AI haftalık özet":"AI weekly summary",           p:"report"},
          {ic:Download,  l:S.export,        sub:lang==="tr"?"CSV / TXT indir":"Download CSV / TXT",           p:"export"},
          {ic:Award,     l:S.badges,        sub:`${earnedBadges.length}/${BADGE_DEFS.length} ${lang==="tr"?"kazanıldı":"earned"}`, p:"badges"},
          {ic:Trophy,    l:S.leaderboard,   sub:`${points} ${S.points}`,                                      p:"game"},
          {ic:Share2,    l:S.share,         sub:lang==="tr"?"Viral ol":"Go viral",                            p:"share"},
          {ic:Settings,  l:S.settings,      sub:lang==="tr"?"Tema, PIN, dil, hesap":"Theme, PIN, language",   p:"settings"},
        ].map((a,i)=>(
          <button key={i} className="gb" onClick={()=>setPanel(a.p)} style={{width:"100%",padding:"12px 13px",borderRadius:15,color:C.t1,fontSize:13,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:11,marginBottom:8,textAlign:"left"}}>
            <div style={{width:34,height:34,borderRadius:10,background:C.g2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><a.ic size={16} color={t.a} strokeWidth={1.9}/></div>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.t1}}>{a.l}</div><div style={{fontSize:10,color:C.t3,marginTop:1}}>{a.sub}</div></div>
            <ChevronRight size={13} color={C.t3}/>
          </button>
        ))}
      </div>
    );
  };

  // Simple inline panels for pomodoro/journal/spotify/location/whatsapp/weather
  const renderPanel = () => {
    if (panel==="settings") return <SettingsPanel/>;
    if (panel==="premium") return <PremiumPanel isPremium={activePremium} premiumExpiry={premiumExpiry} onActivate={activatePremium} onClose={()=>setPanel(null)} t={t} lang={lang}/>;
    if (panel==="referral") return <ReferralPanel referralCode={referralCode} referralCount={referralCount} referralBonusDays={referralBonusDays} onApply={applyReferral} onClose={()=>setPanel(null)} t={t} lang={lang}/>;
    if (panel==="stats") return <StatsPanel items={allItems} habits={habits} dailyDone={dailyDone} totalDone={totalDone} streak={streak} points={points} budgetData={budgetData} isPremium={activePremium} onUpgrade={()=>setPanel("premium")} onClose={()=>setPanel(null)} t={t} lang={lang}/>;
    if (panel==="addiction") return <AddictionPanel isPremium={activePremium} onUpgrade={()=>setPanel("premium")} onClose={()=>setPanel(null)} t={t} lang={lang}/> ;
    if (panel==="badges") return <BadgesPanel/>;
    if (panel==="game") return <GamePanel/>;
    if (panel==="share") return <SharePanelComp/>;
    if (panel==="search") return <SearchPanel items={allItems} notes={notes} onClose={()=>setPanel(null)} t={t} S={S}/>;
    if (panel==="export") {
      if (!activePremium) { setTimeout(()=>setPanel("premium"),0); return null; }
      return <ExportPanel items={allItems} notes={notes} onClose={()=>setPanel(null)} t={t} S={S}/>;
    }
    if (panel==="report") {
      if (!activePremium) { setTimeout(()=>setPanel("premium"),0); return null; }
      return <WeeklyReportPanel items={allItems} habits={habits} totalDone={totalDone} streak={streak} points={points} onClose={()=>setPanel(null)} t={t} S={S} lang={lang}/>;
    }
    if (panel==="calendar") return (
      <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease"}}>
        <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
          <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Calendar size={16} color={t.a}/> {S.calendar}</div>
          <button className="gb" onClick={()=>setPanel(null)} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
        </div>
        <CalendarScreen items={allItems} t={t}/>
      </div>
    );
    if (panel==="notes") return (
      <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease"}}>
        <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
          <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Edit3 size={16} color={t.a}/> {S.notes}</div>
          <button className="gb" onClick={()=>setPanel(null)} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
        </div>
        <NotesScreen notes={notes} setNotes={setNotes} t={t} S={S}/>
      </div>
    );

    // Inline simple panels
    const simpleHeader = (label, icon) => (
      <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
        <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}>{icon} {label}</div>
        <button className="gb" onClick={()=>setPanel(null)} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
      </div>
    );
    const wrap = content => <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease"}}>{content}</div>;

    if (panel==="pomodoro") return wrap(<PomodoroInline t={t} onClose={()=>setPanel(null)} onDone={()=>{setPomodoroCount(c=>c+1);addPoints(50);tryBadge("pomodoro_1");}} lang={lang}/>);
    if (panel==="journal") return wrap(<JournalInline t={t} onClose={()=>setPanel(null)} onBadge={id=>{setJournalCount(c=>c+1);tryBadge(id);}} lang={lang}/>);
    if (panel==="spotify") return wrap(<SpotifyInline t={t} onClose={()=>setPanel(null)}/>);
    if (panel==="location") return wrap(<LocationInline t={t} onClose={()=>setPanel(null)} lang={lang}/>);
    if (panel==="whatsapp") return wrap(<WAInline t={t} onClose={()=>setPanel(null)} onAdd={items=>{setAllItems(p=>[...items.map((x,i)=>({...x,id:Date.now()+i,done:false})),...p]);showConfetti();}} lang={lang}/>);
    if (panel==="weather") return wrap(<WeatherInline t={t} onClose={()=>setPanel(null)} lang={lang}/>);
    return null;
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (screen==="loading") return (
    <div style={{fontFamily:"'DM Sans',-apple-system,sans-serif",background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <style>{makeCSS(THEMES.blue.a,THEMES.blue.b,THEMES.blue.glow)}</style>
      <div style={{width:393,height:852,background:C.surface,borderRadius:50,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 40px 100px rgba(0,0,0,0.95)"}}>
        <Ambient t={THEMES.blue}/>
        <div style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <div style={{fontSize:42,fontWeight:900,color:C.t1,letterSpacing:-1,marginBottom:12}}>✦</div>
          <div style={{fontSize:18,fontWeight:800,color:C.t1,marginBottom:20}}>hayatım</div>
          <RefreshCw size={20} color={THEMES.blue.a} className="spin"/>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'DM Sans',-apple-system,sans-serif",background:"#000",minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <style>{makeCSS(t.a,t.b,t.glow)}</style>
      <div style={{width:393,height:852,background:C.surface,borderRadius:50,overflow:"hidden",display:"flex",flexDirection:"column",position:"relative",boxShadow:"0 40px 100px rgba(0,0,0,0.95),0 0 0 0.5px rgba(255,255,255,0.12),inset 0 0 0 0.5px rgba(255,255,255,0.05)"}}>
        <Ambient t={t}/>
        <Confetti on={confettiOn}/>

        {screen==="auth" && <AuthScreen onAuth={u=>{setUser(u);setScreen("onboard");}} t={t} S={S}/>}
        {screen==="onboard" && <Onboarding onDone={()=>setScreen("app")} t={t} S={S}/>}
        {screen==="pin-verify" && <PINScreen mode="verify" savedPIN={pin} onSuccess={()=>setScreen("app")} t={t} S={S}/>}

        {renderPanel()}
        {reminderTarget && <ReminderTimePicker itemId={reminderTarget} items={allItems} setItems={setAllItems} onClose={()=>setReminderTarget(null)} t={t} S={S}/>}
        {badgeToast && <BadgeToast badge={badgeToast} onClose={()=>setBadgeToast(null)} S={S} lang={lang}/>}

        {screen==="app" && (
          <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",height:"100%"}}>
            <div style={{display:"flex",justifyContent:"center",paddingTop:13}}>
              <div style={{width:124,height:32,background:"#000",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"space-around",padding:"0 26px"}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:"#111"}}/><div style={{width:7,height:7,borderRadius:"50%",background:"#1a1a1a"}}/>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 24px 0"}}>
              <span style={{fontSize:14,fontWeight:700,color:C.t1,letterSpacing:-0.3}}>{new Date().getHours().toString().padStart(2,"0")}:{new Date().getMinutes().toString().padStart(2,"0")}</span>
              <div style={{display:"flex",gap:5,alignItems:"center"}}><Wifi size={13} color={C.t1} strokeWidth={2}/><Battery size={17} color={C.t1} strokeWidth={2}/></div>
            </div>
            <div style={{padding:"11px 19px 9px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,color:C.t3,fontWeight:500,marginBottom:1}}>{greeting}{user?.name?`, ${user.name.split(" ")[0]}`:""}</div>
                  <div style={{fontSize:22,fontWeight:900,background:"linear-gradient(135deg,#fff 30%,rgba(255,255,255,0.44) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:-0.6,lineHeight:1.1}}>{S.appName} ✦</div>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  {activePremium && <div className="gc" onClick={()=>setPanel("premium")} style={{padding:"5px 9px",borderRadius:11,display:"flex",alignItems:"center",gap:4,cursor:"pointer",border:`1px solid ${C.gold}40`,background:`rgba(255,215,10,0.07)`}}><Crown size={12} color={C.gold}/><span style={{fontSize:11,fontWeight:800,color:C.gold}}>PRO</span></div>}
                  {!activePremium && <div className="gc" onClick={()=>setPanel("premium")} style={{padding:"5px 9px",borderRadius:11,display:"flex",alignItems:"center",gap:4,cursor:"pointer"}}><MessageCircle size={12} color={msgsLeft<=1?C.red:C.t3}/><span style={{fontSize:11,fontWeight:700,color:msgsLeft<=1?C.red:C.t3}}>{msgsLeft}/{FREE_LIMITS.dailyMessages}</span></div>}
                  {streak>0&&<div className="gc" style={{padding:"5px 9px",borderRadius:11,display:"flex",alignItems:"center",gap:4}}><Flame size={12} color={C.orange}/><span style={{fontSize:12,fontWeight:800,color:C.orange}}>{streak}</span></div>}
                  {points>0&&<div className="gc" style={{padding:"5px 9px",borderRadius:11,display:"flex",alignItems:"center",gap:4}}><Star size={12} color={C.gold}/><span style={{fontSize:12,fontWeight:800,color:C.gold}}>{points}</span></div>}
                  <button className="gb chip" onClick={()=>setPanel("search")} style={{width:34,height:34,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center"}}><Search size={15} color={C.t2}/></button>
                </div>
              </div>
            </div>
            <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>{renderContent()}</div>
            <TabBar active={activeTab} onChange={setActiveTab} taskCount={taskCount} t={t} S={S}/>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// INLINE PANELS (Pomodoro, Journal, Spotify, Location, WhatsApp, Weather)
// ══════════════════════════════════════════════════════════════════════════════
// ── Premium Panel ─────────────────────────────────────────────────────────────
// ── Premium Panel ─────────────────────────────────────────────────────────────
function PremiumPanel({ isPremium, premiumExpiry, onActivate, onClose, t, lang }) {
  const [plan, setPlan] = useState("monthly");
  const [step, setStep] = useState("plans"); // plans | confirm | processing | success
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardErr, setCardErr] = useState("");

  const prices = {
    monthly: { price:"49₺", label:lang==="tr"?"Aylık":"Monthly", sub:lang==="tr"?"/ ay":"/ month", save:null, days:30 },
    yearly:  { price:"399₺",label:lang==="tr"?"Yıllık":"Yearly",  sub:lang==="tr"?"/ yıl":"/ year",  save:lang==="tr"?"189₺ tasarruf":"Save 189₺", days:365 },
  };
  const p = prices[plan];

  const formatCard = (v) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExp  = (v) => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };

  const handleConfirmPay = () => {
    setCardErr("");
    const rawCard = cardNum.replace(/\s/g,"");
    if (rawCard.length < 16) return setCardErr(lang==="tr"?"Geçerli kart numarası gir (16 hane)":"Enter valid card number (16 digits)");
    if (!cardName.trim()) return setCardErr(lang==="tr"?"Kart sahibi adını gir":"Enter cardholder name");
    if (cardExp.length < 5) return setCardErr(lang==="tr"?"Son kullanma tarihini gir (AA/YY)":"Enter expiry date (MM/YY)");
    if (cardCvv.length < 3) return setCardErr(lang==="tr"?"CVV kodunu gir":"Enter CVV code");
    setStep("processing");
    setTimeout(() => { setStep("success"); onActivate(p.days); }, 2200);
  };

  if (isPremium && step !== "success") return (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(8,8,16,0.97)",backdropFilter:"blur(28px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease"}}>
      <div style={{padding:"20px 18px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:36,height:36,borderRadius:11,background:`linear-gradient(135deg,${C.gold},${C.orange})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 16px rgba(255,215,10,0.4)`}}><Crown size={18} color="#fff" strokeWidth={2}/></div>
          <div><div style={{fontSize:17,fontWeight:900,color:C.t1}}>hayatım <span style={{color:C.gold}}>Premium</span></div><div style={{fontSize:11,color:C.t3,marginTop:1}}>{lang==="tr"?"Aktif üyelik":"Active subscription"}</div></div>
        </div>
        <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 18px 24px"}}>
        <div style={{borderRadius:20,padding:"22px",marginBottom:18,background:"linear-gradient(135deg,rgba(255,215,10,0.1),rgba(255,159,10,0.05))",border:"1px solid rgba(255,215,10,0.25)",textAlign:"center"}}>
          <div style={{fontSize:44,marginBottom:8}}>👑</div>
          <div style={{fontSize:18,fontWeight:900,color:C.gold,marginBottom:4}}>{lang==="tr"?"Premium Aktif":"Premium Active"}</div>
          {premiumExpiry && <div style={{fontSize:12,color:C.t2}}>{lang==="tr"?"Bitiş tarihi":"Expires"}: {new Date(premiumExpiry).toLocaleDateString("tr-TR")}</div>}
        </div>
        {PREMIUM_FEATURES.map((f,i)=>(
          <div key={i} className="ic gc" style={{borderRadius:13,padding:"11px 13px",display:"flex",alignItems:"center",gap:10,marginBottom:8,animationDelay:`${i*0.04}s`,border:"1px solid rgba(255,215,10,0.1)"}}>
            <div style={{width:30,height:30,borderRadius:9,background:"rgba(255,215,10,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><f.Icon size={15} color={C.gold}/></div>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.t1}}>{f.title}</div><div style={{fontSize:10,color:C.t3}}>{f.desc}</div></div>
            <Check size={14} color={C.green}/>
          </div>
        ))}
        <button className="gb" onClick={onClose} style={{width:"100%",padding:"13px",borderRadius:15,color:C.t2,fontFamily:"inherit",fontSize:14,fontWeight:600,marginTop:8}}>{lang==="tr"?"Kapat":"Close"}</button>
      </div>
    </div>
  );

  // ── SUCCESS screen ────────────────────────────────────────────────────────
  if (step === "success") return (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(8,8,16,0.97)",backdropFilter:"blur(28px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,animation:"fadeIn 0.3s ease"}}>
      <div style={{fontSize:58,marginBottom:16,animation:"badgePop 0.5s ease"}}>👑</div>
      <div style={{fontSize:22,fontWeight:900,color:C.gold,textAlign:"center",marginBottom:8}}>{lang==="tr"?"Hoş Geldin, Premium Üye!":"Welcome, Premium Member!"}</div>
      <div style={{fontSize:13,color:C.t2,textAlign:"center",lineHeight:1.7,marginBottom:28,maxWidth:280}}>{lang==="tr"?`${p.label} plan aktif. Tüm özellikler açıldı.`:`${p.label} plan activated. All features unlocked.`}</div>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:7,marginBottom:24}}>
        {PREMIUM_FEATURES.slice(0,5).map((f,i)=>(
          <div key={i} className="ic" style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:12,background:"rgba(255,215,10,0.06)",border:"1px solid rgba(255,215,10,0.12)",animationDelay:`${i*0.06}s`}}>
            <f.Icon size={14} color={C.gold}/><span style={{fontSize:12,color:C.t1,fontWeight:600}}>{f.title}</span><Check size={13} color={C.green} style={{marginLeft:"auto"}}/>
          </div>
        ))}
      </div>
      <button onClick={onClose} style={{width:"100%",padding:"14px",borderRadius:16,border:"none",background:`linear-gradient(135deg,${C.gold},${C.orange})`,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 20px rgba(255,159,10,0.4)"}}>
        {lang==="tr"?"Uygulamaya Dön 🚀":"Back to App 🚀"}
      </button>
    </div>
  );

  // ── PROCESSING screen ─────────────────────────────────────────────────────
  if (step === "processing") return (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(8,8,16,0.97)",backdropFilter:"blur(28px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
      <div style={{width:64,height:64,borderRadius:20,background:"linear-gradient(135deg,rgba(255,215,10,0.15),rgba(255,159,10,0.08))",border:"1px solid rgba(255,215,10,0.3)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 28px rgba(255,215,10,0.2)"}}><RefreshCw size={28} color={C.gold} className="spin"/></div>
      <div style={{fontSize:16,fontWeight:800,color:C.t1}}>{lang==="tr"?"Ödeme İşleniyor...":"Processing Payment..."}</div>
      <div style={{fontSize:12,color:C.t3,textAlign:"center",maxWidth:220}}>{lang==="tr"?"Güvenli bağlantı üzerinden işlem yapılıyor.":"Transaction is being processed over a secure connection."}</div>
      <div style={{display:"flex",gap:6,marginTop:8}}>
        {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:C.gold,animation:`bounce 1.3s ${i*0.2}s infinite`}}/>)}
      </div>
    </div>
  );

  // ── PAYMENT FORM ──────────────────────────────────────────────────────────
  if (step === "confirm") {
    const inpS = {width:"100%",padding:"13px 14px",borderRadius:13,background:C.g2,border:`1px solid ${C.b1}`,color:C.t1,fontSize:14,fontFamily:"inherit"};
    return (
      <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(8,8,16,0.97)",backdropFilter:"blur(28px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease"}}>
        <div style={{padding:"18px 18px 12px",display:"flex",alignItems:"center",gap:10,borderBottom:`0.5px solid ${C.b1}`}}>
          <button className="gb" onClick={()=>setStep("plans")} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={15} color={C.t2}/></button>
          <div style={{flex:1,fontSize:15,fontWeight:800,color:C.t1}}>{lang==="tr"?"Ödeme Bilgileri":"Payment Details"}</div>
          <div style={{fontSize:12,color:C.gold,fontWeight:800,background:"rgba(255,215,10,0.1)",padding:"4px 10px",borderRadius:10}}>{p.price}</div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px 18px 24px"}}>
          {/* Order summary */}
          <div style={{borderRadius:14,padding:"12px 14px",marginBottom:18,background:"rgba(255,215,10,0.06)",border:"1px solid rgba(255,215,10,0.18)",display:"flex",alignItems:"center",gap:12}}>
            <Crown size={18} color={C.gold}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:C.t1}}>hayatım Premium · {p.label}</div>
              <div style={{fontSize:11,color:C.t3,marginTop:2}}>{lang==="tr"?"Tüm özellikler açılır":"All features unlocked"}</div>
            </div>
            <div style={{fontSize:16,fontWeight:900,color:C.gold}}>{p.price}</div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:C.t3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:6}}>{lang==="tr"?"Kart Numarası":"Card Number"}</div>
              <div style={{position:"relative"}}>
                <input value={cardNum} onChange={e=>setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} style={{...inpS,letterSpacing:1.5,paddingRight:48}} inputMode="numeric"/>
                <div style={{position:"absolute",right:13,top:"50%",transform:"translateY(-50%)",fontSize:18}}>💳</div>
              </div>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:C.t3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:6}}>{lang==="tr"?"Kart Sahibi":"Cardholder Name"}</div>
              <input value={cardName} onChange={e=>setCardName(e.target.value.toUpperCase())} placeholder="AD SOYAD" style={{...inpS,letterSpacing:0.5}} autoComplete="cc-name"/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:700,color:C.t3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:6}}>{lang==="tr"?"Son Kullanma":"Expiry"}</div>
                <input value={cardExp} onChange={e=>setCardExp(formatExp(e.target.value))} placeholder="AA/YY" maxLength={5} style={{...inpS}} inputMode="numeric"/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:700,color:C.t3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:6}}>CVV</div>
                <input value={cardCvv} onChange={e=>setCardCvv(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="123" maxLength={4} style={{...inpS}} inputMode="numeric" type="password"/>
              </div>
            </div>
          </div>

          {cardErr && <div style={{marginTop:10,padding:"9px 12px",borderRadius:11,background:"rgba(255,59,48,0.1)",border:"1px solid rgba(255,59,48,0.25)",fontSize:12,color:C.red,display:"flex",alignItems:"center",gap:7}}><AlertTriangle size={13} color={C.red}/>{cardErr}</div>}

          <div style={{display:"flex",alignItems:"center",gap:6,margin:"14px 0 6px",padding:"10px 12px",borderRadius:12,background:"rgba(48,209,88,0.06)",border:"1px solid rgba(48,209,88,0.2)"}}>
            <ShieldCheck size={14} color={C.green}/><span style={{fontSize:11,color:C.green,fontWeight:600}}>{lang==="tr"?"256-bit SSL şifreleme ile güvende":"Secured with 256-bit SSL encryption"}</span>
          </div>

          <button onClick={handleConfirmPay} style={{width:"100%",padding:"16px",borderRadius:18,border:"none",background:`linear-gradient(135deg,${C.gold},${C.orange})`,color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 6px 24px rgba(255,159,10,0.4)",display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginTop:8}}>
            <Crown size={17} color="#fff"/>{lang==="tr"?"Ödemeyi Onayla":"Confirm Payment"} · {p.price}
          </button>
          <div style={{textAlign:"center",fontSize:11,color:C.t3,marginTop:10,lineHeight:1.6}}>{lang==="tr"?"İstediğin zaman iptal edebilirsin":"Cancel anytime"}</div>
        </div>
      </div>
    );
  }

  // ── PLANS screen (default) ────────────────────────────────────────────────
  return (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(8,8,16,0.97)",backdropFilter:"blur(28px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease",overflowY:"auto"}}>
      <div style={{padding:"20px 18px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:36,height:36,borderRadius:11,background:`linear-gradient(135deg,${C.gold},${C.orange})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 16px rgba(255,215,10,0.4)`}}><Crown size={18} color="#fff" strokeWidth={2}/></div>
          <div><div style={{fontSize:17,fontWeight:900,color:C.t1}}>hayatım <span style={{color:C.gold}}>Premium</span></div><div style={{fontSize:11,color:C.t3,marginTop:1}}>{lang==="tr"?"Sınırsız potansiyelini aç":"Unlock your full potential"}</div></div>
        </div>
        <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
      </div>
      <div style={{flex:1,padding:"0 18px 24px",overflowY:"auto"}}>
        <div style={{borderRadius:15,padding:"11px 14px",marginBottom:16,background:"rgba(255,59,48,0.07)",border:"1px solid rgba(255,59,48,0.2)",display:"flex",alignItems:"flex-start",gap:10}}>
          <AlertTriangle size={15} color={C.red} style={{flexShrink:0,marginTop:1}}/>
          <div style={{fontSize:11,color:C.t1,lineHeight:1.6}}>
            <strong style={{color:C.red}}>{lang==="tr"?"Ücretsiz limitler:":"Free limits:"} </strong>
            {lang==="tr"?`Günde ${FREE_LIMITS.dailyMessages} AI mesaj · ${FREE_LIMITS.maxHabits} alışkanlık · ${FREE_LIMITS.maxNotes} not · ${FREE_LIMITS.maxTasks} görev`:
            `${FREE_LIMITS.dailyMessages} msgs/day · ${FREE_LIMITS.maxHabits} habits · ${FREE_LIMITS.maxNotes} notes · ${FREE_LIMITS.maxTasks} tasks`}
          </div>
        </div>
        {/* Plan cards */}
        <div style={{display:"flex",gap:10,marginBottom:18}}>
          {Object.entries(prices).map(([key,pp])=>(
            <button key={key} onClick={()=>setPlan(key)} style={{flex:1,padding:"16px 10px",borderRadius:18,border:`2.5px solid ${plan===key?C.gold:C.b1}`,background:plan===key?"rgba(255,215,10,0.07)":C.g1,cursor:"pointer",fontFamily:"inherit",position:"relative",transition:"all 0.2s",boxShadow:plan===key?"0 0 18px rgba(255,215,10,0.2)":"none"}}>
              {pp.save && <div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${C.green},#1a9140)`,color:"#fff",fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:20,whiteSpace:"nowrap"}}>{pp.save}</div>}
              <div style={{fontSize:11,fontWeight:600,color:plan===key?C.gold:C.t3,marginBottom:6}}>{pp.label}</div>
              <div style={{fontSize:24,fontWeight:900,color:plan===key?C.gold:C.t1,letterSpacing:-1}}>{pp.price}</div>
              <div style={{fontSize:10,color:C.t3,marginTop:2}}>{pp.sub}</div>
              {plan===key && <div style={{width:20,height:20,borderRadius:"50%",background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",margin:"8px auto 0"}}><Check size={11} color="#fff" strokeWidth={3}/></div>}
            </button>
          ))}
        </div>
        {/* Feature grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
          {PREMIUM_FEATURES.map((f,i)=>(
            <div key={i} className="ic gc" style={{borderRadius:13,padding:"10px",border:"1px solid rgba(255,215,10,0.1)",animationDelay:`${i*0.03}s`}}>
              <div style={{width:26,height:26,borderRadius:8,background:"rgba(255,215,10,0.1)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:6}}><f.Icon size={13} color={C.gold}/></div>
              <div style={{fontSize:11,fontWeight:700,color:C.t1,lineHeight:1.3,marginBottom:1}}>{f.title}</div>
              <div style={{fontSize:9,color:C.t3,lineHeight:1.4}}>{f.desc}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setStep("confirm")} style={{width:"100%",padding:"16px",borderRadius:18,border:"none",background:`linear-gradient(135deg,${C.gold},${C.orange})`,color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 6px 24px rgba(255,159,10,0.4)",display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginBottom:10}}>
          <Crown size={17} color="#fff"/>{lang==="tr"?"Satın Al":"Buy Now"} · {prices[plan].price}
        </button>
        <div style={{textAlign:"center",fontSize:11,color:C.t3,lineHeight:1.7,marginBottom:10}}>{lang==="tr"?"🔒 Güvenli ödeme · İstediğin zaman iptal":"🔒 Secure payment · Cancel anytime"}</div>
        <div style={{textAlign:"center"}}><button onClick={onClose} style={{background:"none",border:"none",color:C.t3,fontSize:12,cursor:"pointer"}}>{lang==="tr"?"Şimdilik ücretsiz devam et →":"Continue free for now →"}</button></div>
      </div>
    </div>
  );
}

// ── Referral Panel ────────────────────────────────────────────────────────────
function ReferralPanel({ referralCode, referralCount, referralBonusDays, onApply, onClose, t, lang }) {
  const [inputCode, setInputCode] = useState("");
  const [msg, setMsg] = useState(null); // {type:"ok"|"error", text}
  const [copied, setCopied] = useState(false);

  const shareText = lang==="tr"
    ? `🔥 Hayatım uygulamasını dene! Ücretsiz 7 gün premium kazan.\nDavet kodum: ${referralCode}\nhayatim.app`
    : `🔥 Try the Hayatım app! Get 7 free premium days.\nMy referral code: ${referralCode}\nhayatim.app`;

  const handleApply = () => {
    const res = onApply(inputCode);
    if (res==="ok") setMsg({type:"ok",text:lang==="tr"?`🎉 ${REFERRAL_BONUS_DAYS} gün ücretsiz premium kazandın!`:`🎉 You got ${REFERRAL_BONUS_DAYS} free premium days!`});
    else if (res==="own") setMsg({type:"error",text:lang==="tr"?"Kendi kodunu kullanamazsın 😅":"You can't use your own code 😅"});
    else setMsg({type:"error",text:lang==="tr"?"Geçersiz kod. Tekrar dene.":"Invalid code. Try again."});
  };

  return (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.95)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease",overflowY:"auto"}}>
      <div style={{padding:"18px 16px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
        <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:8}}><UserPlus size={17} color={t.a}/> {lang==="tr"?"Arkadaş Davet":"Invite Friends"}</div>
        <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
      </div>
      <div style={{flex:1,padding:"16px",overflowY:"auto"}}>
        {/* How it works */}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {[[lang==="tr"?"Kodunu paylaş":"Share code",UserPlus,t.a],[lang==="tr"?"Arkadaşın kaydolur":"Friend signs up",Check,C.green],[lang==="tr"?`+${REFERRAL_BONUS_DAYS} gün premium`:`+${REFERRAL_BONUS_DAYS} days premium`,Crown,C.gold]].map(([l,Ic,col],i)=>(
            <div key={i} className="gc" style={{flex:1,borderRadius:13,padding:"10px 8px",textAlign:"center",border:`1px solid ${col}20`}}>
              <div style={{width:30,height:30,borderRadius:10,background:`${col}14`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}><Ic size={15} color={col}/></div>
              <div style={{fontSize:10,color:C.t1,fontWeight:700,lineHeight:1.35}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Your code */}
        <div style={{borderRadius:18,padding:"18px",marginBottom:14,background:`${t.a}10`,border:`1px solid ${t.a}28`,textAlign:"center"}}>
          <div style={{fontSize:10,fontWeight:700,color:C.t3,letterSpacing:0.8,textTransform:"uppercase",marginBottom:8}}>{lang==="tr"?"Davet Kodun":"Your Referral Code"}</div>
          <div style={{fontSize:34,fontWeight:900,color:t.a,letterSpacing:5,marginBottom:12,fontVariantNumeric:"tabular-nums"}}>{referralCode}</div>
          <div style={{display:"flex",gap:8,justifyContent:"center"}}>
            <button className="gb" onClick={()=>{navigator.clipboard?.writeText(shareText).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{padding:"9px 16px",borderRadius:12,color:copied?C.green:C.t2,fontSize:12,fontWeight:700,fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,transition:"all 0.2s",border:`1px solid ${copied?C.green:C.b2}`}}>
              <Copy size={13} color={copied?C.green:C.t2}/>{copied?(lang==="tr"?"Kopyalandı!":"Copied!"):(lang==="tr"?"Kopyala":"Copy")}
            </button>
            <button className="sbtn" onClick={()=>{navigator.share?.({text:shareText}).catch(()=>{});}} style={{padding:"9px 16px",borderRadius:12,border:"none",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
              <Share2 size={13} color="#fff"/>{lang==="tr"?"Paylaş":"Share"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[[referralCount,lang==="tr"?"Davet":"Invited",Users,t.a],[referralBonusDays,lang==="tr"?"Bonus Gün":"Bonus Days",Crown,C.gold]].map(([v,l,Ic,col])=>(
            <div key={l} className="gc" style={{flex:1,borderRadius:13,padding:"12px",textAlign:"center"}}>
              <Ic size={16} color={col} style={{marginBottom:4}}/>
              <div style={{fontSize:22,fontWeight:900,color:col,letterSpacing:-0.5}}>{v}</div>
              <div style={{fontSize:10,color:C.t3,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Apply a code */}
        <div className="gc" style={{borderRadius:16,padding:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.t3,letterSpacing:0.7,textTransform:"uppercase",marginBottom:10}}>{lang==="tr"?"Davet Kodu Gir":"Enter Referral Code"}</div>
          <div style={{display:"flex",gap:8}}>
            <input value={inputCode} onChange={e=>setInputCode(e.target.value.toUpperCase().slice(0,6))} placeholder="ABC123" maxLength={6} style={{flex:1,padding:"11px 14px",borderRadius:12,background:C.g2,border:`1px solid ${C.b1}`,color:t.a,fontSize:16,fontWeight:900,letterSpacing:3,fontFamily:"inherit",textAlign:"center"}}/>
            <button className="sbtn" onClick={handleApply} disabled={inputCode.length<6} style={{padding:"11px 16px",borderRadius:12,border:"none",color:"#fff",fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:inputCode.length>=6?"pointer":"not-allowed",opacity:inputCode.length>=6?1:0.4}}>{lang==="tr"?"Uygula":"Apply"}</button>
          </div>
          {msg && <div style={{marginTop:10,padding:"9px 12px",borderRadius:11,background:msg.type==="ok"?"rgba(48,209,88,0.1)":"rgba(255,59,48,0.1)",border:`1px solid ${msg.type==="ok"?C.green:C.red}30`,fontSize:12,color:msg.type==="ok"?C.green:C.red,fontWeight:600}}>{msg.text}</div>}
        </div>
      </div>
    </div>
  );
}

// ── Stats Panel ───────────────────────────────────────────────────────────────
function StatsPanel({ items, habits, dailyDone, totalDone, streak, points, budgetData, isPremium, onUpgrade, onClose, t, lang }) {
  const [period, setPeriod] = useState("week"); // week | month

  const today = new Date();
  const days = period==="week" ? 7 : 30;
  const dateRange = Array.from({length:days},(_,i)=>{
    const d = new Date(today); d.setDate(today.getDate()-days+1+i);
    return d.toISOString().split("T")[0];
  });

  const maxDone = Math.max(...dateRange.map(d=>(dailyDone.find(x=>x.date===d)||{count:0}).count),1);

  const completedItems = items.filter(i=>i.done).length;
  const pendingItems = items.filter(i=>!i.done).length;
  const completionRate = items.length>0 ? Math.round(completedItems/items.length*100) : 0;

  const typeBreakdown = ["görev","hatırlatıcı","not","randevu","alışveriş"].map(type=>({
    type, count: items.filter(i=>i.type===type).length,
    color: (C.tints[type]||C.tints["görev"]).c
  })).filter(x=>x.count>0);

  const habitsDoneToday = habits.filter(h=>(h.completedDates||[]).includes(today.toISOString().split("T")[0])).length;
  const totalSpent = (budgetData.expenses||[]).reduce((s,e)=>s+e.amount,0);

  if (!isPremium) return (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.95)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,animation:"fadeIn 0.3s ease"}}>
      <div style={{textAlign:"center"}}>
        <div style={{width:64,height:64,borderRadius:20,background:`rgba(255,215,10,0.1)`,border:`1px solid ${C.gold}30`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><Activity size={30} color={C.gold} strokeWidth={1.8}/></div>
        <div style={{fontSize:20,fontWeight:900,color:C.t1,marginBottom:8}}>{lang==="tr"?"İstatistikler Premium'da":"Stats are Premium"}</div>
        <div style={{fontSize:13,color:C.t2,lineHeight:1.65,marginBottom:24,maxWidth:280}}>{lang==="tr"?"Haftalık/aylık grafikler, görev tamamlama oranları ve alışkanlık analizleri Premium üyelere açık.":"Weekly/monthly charts, task completion rates and habit analytics are available for Premium members."}</div>
        <button className="sbtn" onClick={onUpgrade} style={{width:"100%",padding:"14px",borderRadius:16,border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Crown size={16} color="#fff"/>{lang==="tr"?"Premium'a Geç":"Go Premium"}</button>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.t3,fontSize:13,cursor:"pointer",marginTop:16}}>{lang==="tr"?"Kapat":"Close"}</button>
      </div>
    </div>
  );

  return (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease"}}>
      <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
        <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Activity size={16} color={t.a}/> {lang==="tr"?"İstatistikler":"Statistics"} <span style={{fontSize:10,color:C.gold,background:"rgba(255,215,10,0.1)",padding:"2px 8px",borderRadius:9,fontWeight:700,marginLeft:2}}>PRO</span></div>
        <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
        {/* Period toggle */}
        <div className="gc" style={{borderRadius:11,padding:3,display:"flex",marginBottom:14}}>
          {[["week",lang==="tr"?"7 Gün":"7 Days"],["month",lang==="tr"?"30 Gün":"30 Days"]].map(([v,l])=>(
            <button key={v} onClick={()=>setPeriod(v)} style={{flex:1,padding:"7px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",background:period===v?t.a:"transparent",color:period===v?"#fff":C.t3,fontWeight:700,fontSize:12,transition:"all 0.18s"}}>{l}</button>
          ))}
        </div>
        {/* Summary cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
          {[{l:lang==="tr"?"Tamamlanan":"Done",v:completedItems,c:C.green},{l:lang==="tr"?"Bekleyen":"Pending",v:pendingItems,c:C.orange},{l:lang==="tr"?"Oran":"Rate",v:`%${completionRate}`,c:t.a},{l:"Streak",v:streak,c:C.orange},{l:lang==="tr"?"Puan":"Points",v:points,c:C.gold},{l:lang==="tr"?"Harcama":"Spent",v:`${totalSpent.toLocaleString("tr-TR")}₺`,c:C.pink}].map(s=>(
            <div key={s.l} className="ic gc" style={{borderRadius:13,padding:"10px 8px",textAlign:"center"}}>
              <div style={{fontSize:16,fontWeight:900,color:s.c,letterSpacing:-0.5}}>{s.v}</div>
              <div style={{fontSize:9,color:C.t3,marginTop:2,fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Bar chart: daily done */}
        <div className="gc" style={{borderRadius:16,padding:14,marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.t3,letterSpacing:0.7,textTransform:"uppercase",marginBottom:12}}>{lang==="tr"?"Günlük Tamamlama":"Daily Completions"}</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:3,height:72}}>
            {dateRange.map((d,i)=>{
              const cnt=(dailyDone.find(x=>x.date===d)||{count:0}).count;
              const h=maxDone>0?Math.max(6,Math.round(cnt/maxDone*64)):6;
              const isToday=d===today.toISOString().split("T")[0];
              return (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{width:"100%",height:h,borderRadius:"3px 3px 0 0",background:isToday?t.a:`${t.a}50`,boxShadow:isToday?`0 0 6px ${t.glow}`:"none",transition:"height 0.5s ease",minHeight:4}}/>
                  {(i===0||i===days-1||isToday)&&<span style={{fontSize:8,color:isToday?t.a:C.t3,fontWeight:isToday?700:400}}>{isToday?(lang==="tr"?"Bug.":"Tod."):new Date(d).getDate()}</span>}
                </div>
              );
            })}
          </div>
          {dailyDone.length===0&&<div style={{textAlign:"center",fontSize:11,color:C.t3,marginTop:8}}>{lang==="tr"?"Görev tamamladıkça grafik dolar.":"Complete tasks to fill the chart."}</div>}
        </div>
        {/* Type breakdown */}
        {typeBreakdown.length>0&&<div className="gc" style={{borderRadius:16,padding:14,marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.t3,letterSpacing:0.7,textTransform:"uppercase",marginBottom:12}}>{lang==="tr"?"Görev Dağılımı":"Task Breakdown"}</div>
          {typeBreakdown.map((tb,i)=>(
            <div key={i} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:C.t2,fontWeight:600,textTransform:"capitalize"}}>{tb.type}</span><span style={{fontSize:11,color:tb.color,fontWeight:800}}>{tb.count}</span></div>
              <div className="pbar"><div style={{height:"100%",width:`${Math.round(tb.count/items.length*100)}%`,background:tb.color,borderRadius:10,transition:"width 0.8s ease"}}/></div>
            </div>
          ))}
        </div>}
        {/* Habits streak */}
        {habits.length>0&&<div className="gc" style={{borderRadius:16,padding:14,marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.t3,letterSpacing:0.7,textTransform:"uppercase",marginBottom:11}}>{lang==="tr"?"Alışkanlık Serileri":"Habit Streaks"}</div>
          {habits.slice(0,5).map((h,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderTop:i>0?`1px solid ${C.b1}`:"none"}}>
              <span style={{fontSize:18}}>{h.icon}</span>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.t1}}>{h.name}</div></div>
              <div style={{display:"flex",alignItems:"center",gap:4}}><Flame size={11} color={C.orange}/><span style={{fontSize:12,fontWeight:800,color:C.orange}}>{h.streak||0}</span></div>
            </div>
          ))}
          <div style={{marginTop:8,fontSize:11,color:t.a,fontWeight:700}}>{lang==="tr"?`Bugün ${habitsDoneToday}/${habits.length} alışkanlık tamamlandı`:`${habitsDoneToday}/${habits.length} habits done today`}</div>
        </div>}
      </div>
    </div>
  );
}

// ── Addiction Guide Panel ─────────────────────────────────────────────────────
const ADDICTION_TOPICS = [
  { id:"social",  emoji:"📱", title:{tr:"Sosyal Medya",          en:"Social Media"},        color:"#0A84FF" },
  { id:"phone",   emoji:"📲", title:{tr:"Telefon Bağımlılığı",   en:"Phone Addiction"},     color:"#BF5AF2" },
  { id:"sugar",   emoji:"🍬", title:{tr:"Şeker & Yiyecek",       en:"Sugar & Food"},        color:"#FF9F0A" },
  { id:"smoke",   emoji:"🚬", title:{tr:"Sigara & Nikotin",      en:"Smoking & Nicotine"},  color:"#636366" },
  { id:"gaming",  emoji:"🎮", title:{tr:"Oyun Bağımlılığı",      en:"Gaming Addiction"},    color:"#30D158" },
  { id:"alcohol", emoji:"🍺", title:{tr:"Alkol",                 en:"Alcohol"},             color:"#FF375F" },
  { id:"caffeine",emoji:"☕", title:{tr:"Kafein",                en:"Caffeine"},            color:"#8B5F3A" },
  { id:"work",    emoji:"💼", title:{tr:"İş Bağımlılığı",        en:"Workaholism"},         color:"#FF9F0A" },
];

const ADDICTION_SYSTEM = `Sen empatik bir bağımlılık rehberi uzmanısın. Türkçe veya İngilizce yanıt ver.
Kişinin seçtiği bağımlılık türü için:
1. Empatiyle başla (yargılamadan)
2. Neden olduğunu kısaca açıkla (beyin kimyası, dopamin)
3. Somut 3 adım teknik öner (bu hafta yapabilecekleri)
4. Günlük alışkanlık öner (sisteme eklenebilir)
5. Motivasyonla bitir

Format: JSON
{"intro":"...","why":"...","steps":["adım1","adım2","adım3"],"habit":{"name":"...","icon":"emoji","freq":"daily"},"closing":"...","severity":1-10}`;

function AddictionPanel({ isPremium, onUpgrade, onClose, t, lang }) {
  const [selected, setSelected] = useState(null);
  const [level, setLevel] = useState(5);
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInp, setChatInp] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),[chatMsgs]);

  const generate = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const topic = ADDICTION_TOPICS.find(a=>a.id===selected);
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:700,messages:[{role:"user",content:`${ADDICTION_SYSTEM}\nBağımlılık: ${topic.title[lang==="tr"?"tr":"en"]}\nŞiddet seviyesi: ${level}/10\nDil: ${lang==="tr"?"Türkçe":"English"}`}]})});
      const d = await res.json();
      const text = d.content?.[0]?.text||"";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      setGuide(parsed);
    } catch {
      const topic = ADDICTION_TOPICS.find(a=>a.id===selected);
      setGuide({intro:`${topic.title[lang==="tr"?"tr":"en"]} bağımlılığıyla mücadele zor ama mümkün.`,why:"Beyindeki dopamin sistemi tekrarlayan davranışları ödüllendirerek bağımlılık yaratır.",steps:[lang==="tr"?"24 saatlik kural: bugün sadece 1 kez kontrol et":"24-hour rule: check only once today",lang==="tr"?"Fark et & durdur tekniği: her isteği 5 dakika ertele":"Notice & pause: delay each urge by 5 minutes",lang==="tr"?"Tetikleyicilerini not et":"Write down your triggers"],habit:{name:lang==="tr"?"Bağımlılık günlüğü":"Addiction journal",icon:"📝",freq:"daily"},closing:lang==="tr"?"Her küçük adım bir zaferdir. Devam et! 💪":"Every small step is a victory. Keep going! 💪",severity:level});
    }
    setLoading(false);
  };

  const sendChat = async () => {
    if (!chatInp.trim()||chatLoading) return;
    const txt = chatInp.trim(); setChatInp("");
    setChatMsgs(p=>[...p,{role:"user",text:txt}]);
    setChatLoading(true);
    try {
      const topic = ADDICTION_TOPICS.find(a=>a.id===selected);
      const sys = `Sen ${topic?.title[lang==="tr"?"tr":"en"]} bağımlılığı konusunda uzman empatik bir koçsun. Kısa, destekleyici yanıtlar ver.`;
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,system:sys,messages:[...chatMsgs.map(m=>({role:m.role,content:m.text})),{role:"user",content:txt}]})});
      const d = await res.json();
      setChatMsgs(p=>[...p,{role:"assistant",text:d.content?.[0]?.text||"..."}]);
    } catch { setChatMsgs(p=>[...p,{role:"assistant",text:lang==="tr"?"Seninle birlikteyim 💙":"I'm here with you 💙"}]); }
    setChatLoading(false);
  };

  if (!isPremium) return (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.95)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,animation:"fadeIn 0.3s ease"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:40,marginBottom:14}}>🛡️</div>
        <div style={{fontSize:20,fontWeight:900,color:C.t1,marginBottom:8}}>{lang==="tr"?"Bağımlılık Rehberi":"Addiction Guide"}</div>
        <div style={{fontSize:13,color:C.t2,lineHeight:1.65,marginBottom:24,maxWidth:280}}>{lang==="tr"?"AI destekli kişisel bağımlılık rehberi ve koçluk sistemi Premium üyelere açık.":"AI-powered personal addiction guide and coaching is available for Premium members."}</div>
        <button className="sbtn" onClick={onUpgrade} style={{width:"100%",padding:"14px",borderRadius:16,border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:12}}><Crown size={16} color="#fff"/>{lang==="tr"?"Premium'a Geç":"Go Premium"}</button>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.t3,fontSize:13,cursor:"pointer"}}>{lang==="tr"?"Kapat":"Close"}</button>
      </div>
    </div>
  );

  return (
    <div style={{position:"absolute",inset:0,zIndex:90,background:"rgba(0,0,0,0.94)",backdropFilter:"blur(24px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.3s ease"}}>
      <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
        <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><ShieldCheck size={16} color={C.green}/> {lang==="tr"?"Bağımlılık Rehberi":"Addiction Guide"} <span style={{fontSize:9,color:C.gold,background:"rgba(255,215,10,0.1)",padding:"2px 7px",borderRadius:8,fontWeight:700}}>PRO</span></div>
        <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
      </div>

      {!guide ? (
        <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
          <div style={{fontSize:13,color:C.t2,lineHeight:1.6,marginBottom:14}}>
            {lang==="tr"?"Hangi konuda destek istiyorsun? AI koçun kişisel rehber hazırlayacak.":"Which area do you need support with? Your AI coach will prepare a personal guide."}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            {ADDICTION_TOPICS.map(topic=>(
              <button key={topic.id} onClick={()=>setSelected(topic.id)} style={{padding:"12px 10px",borderRadius:15,border:`2px solid ${selected===topic.id?topic.color:C.b1}`,background:selected===topic.id?`${topic.color}12`:C.g1,cursor:"pointer",fontFamily:"inherit",transition:"all 0.17s",boxShadow:selected===topic.id?`0 0 12px ${topic.color}35`:"none"}}>
                <div style={{fontSize:22,marginBottom:5}}>{topic.emoji}</div>
                <div style={{fontSize:11,fontWeight:700,color:selected===topic.id?topic.color:C.t2,lineHeight:1.3}}>{topic.title[lang==="tr"?"tr":"en"]}</div>
              </button>
            ))}
          </div>
          {selected && (<>
            <div className="gc" style={{borderRadius:16,padding:14,marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:C.t3,letterSpacing:0.6,textTransform:"uppercase",marginBottom:10}}>{lang==="tr"?"Şiddet Seviyesi (1-10)":"Severity Level (1-10)"}</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <input type="range" min={1} max={10} value={level} onChange={e=>setLevel(Number(e.target.value))} style={{flex:1,accentColor:t.a}}/>
                <div style={{fontSize:20,fontWeight:900,color:level>=7?C.red:level>=4?C.orange:C.green,width:28,textAlign:"center"}}>{level}</div>
              </div>
              <div style={{fontSize:10,color:C.t3,marginTop:5}}>{level<=3?(lang==="tr"?"Hafif — kontroldesin":"Mild — you're in control"):level<=6?(lang==="tr"?"Orta — dikkat et":"Moderate — be aware"):(lang==="tr"?"Ciddi — profesyonel destek de al":"Serious — also seek professional help")}</div>
            </div>
            <button className="sbtn" onClick={generate} style={{width:"100%",padding:"14px",borderRadius:16,border:"none",color:"#fff",fontSize:14,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {loading?<><RefreshCw size={15} color="#fff" className="spin"/>{lang==="tr"?"Rehber Hazırlanıyor...":"Preparing Guide..."}</>:<><ShieldCheck size={15} color="#fff"/>{lang==="tr"?"Kişisel Rehber Oluştur":"Create Personal Guide"}</>}
            </button>
          </>)}
        </div>
      ) : !chatMode ? (
        <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
          <div className="gc" style={{borderRadius:16,padding:14,marginBottom:12,border:`1px solid ${C.green}25`}}>
            <div style={{fontSize:24,marginBottom:8}}>{ADDICTION_TOPICS.find(a=>a.id===selected)?.emoji}</div>
            <div style={{fontSize:13,color:C.t1,lineHeight:1.65,marginBottom:6}}>{guide.intro}</div>
            <div style={{fontSize:11,color:C.t2,lineHeight:1.6,fontStyle:"italic"}}>{guide.why}</div>
            <div style={{marginTop:8,display:"flex",alignItems:"center",gap:5}}>
              {Array.from({length:10},(_,i)=><div key={i} style={{flex:1,height:4,borderRadius:3,background:i<guide.severity?(guide.severity>=7?C.red:guide.severity>=4?C.orange:C.green):C.g2,transition:"background 0.3s"}}/>)}
            </div>
            <div style={{fontSize:9,color:C.t3,marginTop:3}}>{lang==="tr"?"Şiddet seviyesi":"Severity"}: {guide.severity}/10</div>
          </div>
          <div style={{fontSize:10,fontWeight:700,color:C.t3,letterSpacing:0.7,textTransform:"uppercase",marginBottom:9}}>{lang==="tr"?"Bu Hafta Yap":"Do This Week"}</div>
          {guide.steps?.map((step,i)=>(
            <div key={i} className="ic gc" style={{borderRadius:13,padding:"11px 13px",marginBottom:8,display:"flex",alignItems:"flex-start",gap:10,animationDelay:`${i*0.07}s`}}>
              <div style={{width:22,height:22,borderRadius:7,background:`${t.a}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{fontSize:11,fontWeight:800,color:t.a}}>{i+1}</span></div>
              <div style={{fontSize:12,color:C.t1,lineHeight:1.55,flex:1}}>{step}</div>
            </div>
          ))}
          {guide.habit && <div className="gc" style={{borderRadius:14,padding:12,marginTop:4,marginBottom:12,border:`1px solid ${C.green}25`,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>{guide.habit.icon}</span>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.green}}>{lang==="tr"?"Önerilen Alışkanlık":"Suggested Habit"}</div><div style={{fontSize:12,color:C.t1}}>{guide.habit.name}</div></div>
          </div>}
          {guide.closing && <div style={{fontSize:13,color:t.a,lineHeight:1.65,fontWeight:600,marginBottom:14,textAlign:"center"}}>{guide.closing}</div>}
          <div style={{display:"flex",gap:8}}>
            <button className="gb" onClick={()=>setGuide(null)} style={{flex:1,padding:"11px",borderRadius:14,color:C.t2,fontFamily:"inherit",fontSize:12,fontWeight:600}}>{lang==="tr"?"← Geri":"← Back"}</button>
            <button className="sbtn" onClick={()=>setChatMode(true)} style={{flex:2,padding:"11px",borderRadius:14,border:"none",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><MessageCircle size={13} color="#fff"/>{lang==="tr"?"Koçla Konuş":"Chat with Coach"}</button>
          </div>
        </div>
      ) : (
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{flex:1,overflowY:"auto",padding:"10px 14px"}}>
            <div style={{padding:"10px 12px",borderRadius:12,background:`${C.green}10`,border:`1px solid ${C.green}22`,fontSize:12,color:C.t2,marginBottom:12}}>{lang==="tr"?"Koçun seninle 1-1 konuşmaya hazır. Sorularını, zorlukları anlat.":"Your coach is ready for 1-1 conversation. Share your questions and challenges."}</div>
            {chatMsgs.map((m,i)=>(
              <div key={i} style={{display:"flex",flexDirection:m.role==="user"?"row-reverse":"row",alignItems:"flex-end",gap:7,marginBottom:11,animation:m.role==="user"?"slideL 0.25s ease":"slideR 0.25s ease"}}>
                {m.role==="assistant"&&<div style={{width:28,height:28,borderRadius:"50%",background:`${C.green}20`,border:`1px solid ${C.green}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🛡️</div>}
                <div style={{maxWidth:"76%",padding:"10px 13px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?`linear-gradient(135deg,${t.a},${t.b})`:C.g2,border:m.role==="user"?"none":`1px solid ${C.b1}`,fontSize:13,lineHeight:1.55,color:C.t1}}>{m.text}</div>
              </div>
            ))}
            {chatLoading&&<div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:28,height:28,borderRadius:"50%",background:`${C.green}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🛡️</div><div className="gc" style={{padding:"10px 14px",borderRadius:"16px 16px 16px 4px"}}><Dots t={{a:C.green}}/></div></div>}
            <div ref={endRef}/>
          </div>
          <div style={{padding:"9px 13px 13px",display:"flex",gap:8,alignItems:"flex-end",borderTop:`0.5px solid ${C.b1}`}}>
            <div className="gc" style={{flex:1,borderRadius:20,overflow:"hidden",border:chatInp?`1px solid ${C.green}45`:undefined}}>
              <textarea value={chatInp} onChange={e=>setChatInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat();}}} placeholder={lang==="tr"?"Koçuna yaz...":"Write to your coach..."} rows={1} style={{width:"100%",padding:"10px 14px",background:"transparent",border:"none",color:C.t1,fontSize:14,resize:"none",fontFamily:"inherit",lineHeight:1.5}}/>
            </div>
            <button onClick={sendChat} disabled={!chatInp.trim()||chatLoading} style={{width:38,height:38,borderRadius:"50%",background:chatInp.trim()&&!chatLoading?C.green:C.g2,border:`1px solid ${C.b1}`,cursor:chatInp.trim()&&!chatLoading?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:chatInp.trim()&&!chatLoading?`0 0 10px ${C.green}45`:"none",transition:"all 0.2s"}}>
              <Send size={14} color={chatInp.trim()&&!chatLoading?"#fff":C.t3}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PomodoroInline({ t, onClose, onDone, lang }) {
  const [mode,setMode]=useState("work"); const [secs,setSecs]=useState(25*60); const [running,setRunning]=useState(false); const [sessions,setSessions]=useState(0);
  const ref=useRef(null); const total=mode==="work"?25*60:5*60; const pct=(total-secs)/total*100;
  const mm=String(Math.floor(secs/60)).padStart(2,"0"); const ss=String(secs%60).padStart(2,"0"); const R=68,circ=2*Math.PI*R;
  useEffect(()=>{ if(running){ref.current=setInterval(()=>setSecs(s=>{ if(s<=1){clearInterval(ref.current);setRunning(false);if(mode==="work"){const ns=sessions+1;setSessions(ns);if(ns===1)onDone();setMode("break");setSecs(5*60);}else{setMode("work");setSecs(25*60);}return 0;}return s-1;}),1000);} else clearInterval(ref.current); return()=>clearInterval(ref.current); },[running,mode]);
  return (<>
    <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
      <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Timer size={16} color={t.a}/> Pomodoro</div>
      <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
    </div>
    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"16px 20px"}}>
      <div className="gc" style={{borderRadius:12,padding:4,display:"flex",marginBottom:24}}>
        {[["work",lang==="tr"?"Çalışma":"Work","25dk"],["break",lang==="tr"?"Mola":"Break","5dk"]].map(([m,l,d])=>(
          <button key={m} onClick={()=>{setMode(m);setSecs(m==="work"?25*60:5*60);setRunning(false);}} style={{flex:1,padding:"9px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",background:mode===m?t.a:"transparent",color:mode===m?"#fff":C.t3,fontWeight:700,fontSize:13,transition:"all 0.2s"}}>{l} · {d}</button>
        ))}
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{position:"relative",width:174,height:174,marginBottom:30}}>
          <svg width={174} height={174} style={{transform:"rotate(-90deg)"}}>
            <circle cx={87} cy={87} r={R} fill="none" stroke={C.g2} strokeWidth={8}/>
            <circle cx={87} cy={87} r={R} fill="none" stroke={t.a} strokeWidth={8} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ-(circ*pct/100)} style={{transition:"stroke-dashoffset 1s linear",filter:`drop-shadow(0 0 8px ${t.a})`}}/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:36,fontWeight:900,color:C.t1,letterSpacing:-1,fontVariantNumeric:"tabular-nums"}}>{mm}:{ss}</div>
            <div style={{fontSize:11,color:C.t3,marginTop:3}}>{mode==="work"?(lang==="tr"?"odak zamanı":"focus time"):(lang==="tr"?"mola zamanı":"break time")}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="gb" onClick={()=>{setSecs(mode==="work"?25*60:5*60);setRunning(false);}} style={{width:50,height:50,borderRadius:15,display:"flex",alignItems:"center",justifyContent:"center"}}><RefreshCw size={17} color={C.t2}/></button>
          <button className="sbtn" onClick={()=>setRunning(r=>!r)} style={{width:76,height:50,borderRadius:15,border:"none",color:"#fff",fontSize:22,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>{running?"⏸":"▶"}</button>
          <button className="gb" onClick={()=>{setMode(m=>m==="work"?"break":"work");setSecs(mode==="work"?5*60:25*60);setRunning(false);}} style={{width:50,height:50,borderRadius:15,display:"flex",alignItems:"center",justifyContent:"center"}}>⏭</button>
        </div>
        <div style={{display:"flex",gap:7,marginTop:20}}>
          {Array.from({length:4},(_,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<sessions%4?t.a:C.g2,boxShadow:i<sessions%4?`0 0 5px ${t.glow}`:"none",transition:"all 0.3s"}}/>)}
        </div>
        <div style={{marginTop:10,fontSize:12,color:C.t3}}>{sessions} {lang==="tr"?"oturum":"sessions"}</div>
      </div>
    </div>
  </>);
}

function JournalInline({ t, onClose, onBadge, lang }) {
  const [msgs,setMsgs]=useState([]); const [inp,setInp]=useState(""); const [loading,setLoading]=useState(false); const endRef=useRef(null);
  useEffect(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),[msgs]);
  const send=async()=>{
    if(!inp.trim()||loading)return; const txt=inp.trim();setInp("");setMsgs(p=>[...p,{role:"user",text:txt}]);setLoading(true);
    try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,system:JOURNAL_PROMPT,messages:[...msgs.map(m=>({role:m.role,content:m.text})),{role:"user",content:txt}]})});
    const d=await res.json(); const full=d.content?.[0]?.text||""; const mm=full.match(/<mood>([\s\S]*?)<\/mood>/); const mood=mm?JSON.parse(mm[1]):null; const cleaned=full.replace(/<mood>[\s\S]*?<\/mood>/g,"").trim();
    setMsgs(p=>[...p,{role:"assistant",text:cleaned,mood}]); if(msgs.length===0)onBadge("journal_1");}
    catch{setMsgs(p=>[...p,{role:"assistant",text:"Seni duyuyorum 💙"}]);} setLoading(false);
  };
  return (<>
    <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
      <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><BookOpen size={16} color={t.a}/> Journal</div>
      <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
    </div>
    {msgs.length===0&&<div style={{padding:"16px 14px"}}>
      <div className="gc" style={{borderRadius:16,padding:14,textAlign:"center",marginBottom:12}}><Moon size={28} color={t.a} strokeWidth={1.5} style={{marginBottom:8}}/><div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:5}}>{lang==="tr"?"Bugün nasıl geçti?":"How was your day?"}</div><div style={{fontSize:12,color:C.t2,lineHeight:1.6}}>{lang==="tr"?"Aklındakileri anlat, yargılamadan dinliyorum.":"Tell me what's on your mind, I'm here to listen."}</div></div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {(lang==="tr"?["Bugün çok yoruldum 😔","Harika bir gün! 🎉","Stresli hissediyorum","Motive olamıyorum"]:["Feeling tired today 😔","Amazing day! 🎉","I'm feeling stressed","Can't get motivated"]).map((q,i)=>(
          <button key={i} className="gc chip" onClick={()=>setInp(q)} style={{padding:"7px 11px",borderRadius:18,fontSize:11,color:C.t2,fontFamily:"inherit",cursor:"pointer"}}>{q}</button>
        ))}
      </div>
    </div>}
    <div style={{flex:1,overflowY:"auto",padding:"8px 14px"}}>
      {msgs.map((m,i)=>(
        <div key={i} style={{marginBottom:12}}>
          <div style={{display:"flex",flexDirection:m.role==="user"?"row-reverse":"row",alignItems:"flex-end",gap:7,animation:m.role==="user"?"slideL 0.25s ease":"slideR 0.25s ease"}}>
            {m.role==="assistant"&&<div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${t.a},${t.b})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0}}>🧠</div>}
            <div style={{maxWidth:"76%",padding:"10px 13px",borderRadius:m.role==="user"?"17px 17px 4px 17px":"17px 17px 17px 4px",background:m.role==="user"?`linear-gradient(135deg,${t.a},${t.b})`:C.g2,border:m.role==="user"?"none":`1px solid ${C.b1}`,fontSize:13,lineHeight:1.55,color:C.t1}}>{m.text}</div>
          </div>
          {m.mood&&<div style={{paddingLeft:35,marginTop:5}}><span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:18,background:`${m.mood.color}14`,border:`1px solid ${m.mood.color}30`,fontSize:10,color:m.mood.color,fontWeight:700}}>● {m.mood.label} · {m.mood.score}/10</span></div>}
        </div>
      ))}
      {loading&&<div style={{display:"flex",alignItems:"center",gap:7,animation:"fadeIn 0.3s ease"}}><div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${t.a},${t.b})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>🧠</div><div className="gc" style={{padding:"10px 14px",borderRadius:"16px 16px 16px 4px"}}><Dots t={t}/></div></div>}
      <div ref={endRef}/>
    </div>
    <div style={{padding:"9px 13px 18px",display:"flex",gap:8,alignItems:"flex-end",borderTop:`0.5px solid ${C.b1}`}}>
      <div className="gc" style={{flex:1,borderRadius:20,overflow:"hidden",border:inp?`1px solid ${t.a}45`:undefined}}>
        <textarea value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder={lang==="tr"?"Bugün nasıl hissediyorsun?...":"How are you feeling today?..."} rows={1} style={{width:"100%",padding:"10px 14px",background:"transparent",border:"none",color:C.t1,fontSize:13,resize:"none",fontFamily:"inherit",lineHeight:1.5}}/>
      </div>
      <button onClick={send} disabled={!inp.trim()||loading} className={inp.trim()&&!loading?"sbtn":"gc"} style={{width:38,height:38,borderRadius:"50%",border:`1px solid ${C.b1}`,cursor:inp.trim()&&!loading?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <Send size={14} color={inp.trim()&&!loading?"#fff":C.t3}/>
      </button>
    </div>
  </>);
}

function SpotifyInline({ t, onClose }) {
  const [playing,setPlaying]=useState(null);
  const playlists=[{n:"Deep Focus",m:"Derin konsantrasyon",c:"#1DB954"},{n:"Lo-Fi Beats",m:"Sakin çalışma",c:"#1DB954"},{n:"Motivasyon",m:"Enerjik başlangıç",c:"#FF375F"},{n:"Ambient Flow",m:"Yaratıcı düşünce",c:"#BF5AF2"},{n:"Study Vibes",m:"Uzun oturumlar",c:"#0A84FF"}];
  return (<>
    <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
      <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Music size={16} color="#1DB954"/> Spotify</div>
      <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
      {playlists.map((p,i)=>(
        <div key={i} className="ic gc" style={{borderRadius:15,padding:"12px 14px",marginBottom:9,display:"flex",alignItems:"center",gap:12,animationDelay:`${i*0.06}s`}}>
          <div style={{width:44,height:44,borderRadius:12,background:`${p.c}20`,border:`1px solid ${p.c}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Music size={19} color={p.c} strokeWidth={1.8}/></div>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.t1}}>{p.n}</div><div style={{fontSize:11,color:C.t2,marginTop:1}}>{p.m}</div></div>
          <button onClick={()=>setPlaying(playing===i?null:i)} style={{width:34,height:34,borderRadius:"50%",background:playing===i?"#1DB954":C.g2,border:`1px solid ${playing===i?"#1DB954":C.b1}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,transition:"all 0.2s",boxShadow:playing===i?"0 0 12px rgba(29,185,84,0.45)":"none"}}>{playing===i?"⏸":"▶"}</button>
        </div>
      ))}
      {playing!==null&&<div className="gc" style={{borderRadius:14,padding:12,textAlign:"center",marginTop:2}}>
        <div style={{fontSize:11,color:"#1DB954",fontWeight:600,marginBottom:7}}>🎵 {playlists[playing]?.n}</div>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:2,height:22}}>
          {Array.from({length:16}).map((_,i)=><div key={i} style={{width:3,background:"#1DB954",borderRadius:2,animation:`musicBar ${0.5+Math.random()*0.7}s ${Math.random()*0.4}s ease-in-out infinite`,height:3+Math.random()*16}}/>)}
        </div>
      </div>}
    </div>
  </>);
}

function LocationInline({ t, onClose, lang }) {
  const [detected,setDetected]=useState(false);
  const locs=[{n:"Migros",d:"320m",items:["Süt, ekmek","Yumurta"]},{n:"Eczane",d:"150m",items:["İlaç al"]},{n:"Ofis",d:"1.2km",items:["Toplantı hazırlığı"]}];
  return (<>
    <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
      <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><MapPin size={16} color={C.green}/> {lang==="tr"?"Konum Hatırlatıcılar":"Location Reminders"}</div>
      <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
      <div className="gc" style={{borderRadius:17,padding:14,marginBottom:13,textAlign:"center"}}>
        {detected?(<><div style={{position:"relative",display:"inline-block",marginBottom:8}}><MapPin size={26} color={t.a} strokeWidth={1.8}/><div style={{position:"absolute",inset:-5,borderRadius:"50%",border:`2px solid ${t.a}`,animation:"pulse 1.5s ease-out infinite",opacity:0.45}}/></div><div style={{fontSize:13,fontWeight:700,color:C.t1}}>İstanbul, Kadıköy</div><div style={{fontSize:10,color:C.t3,marginTop:3}}>Konum algılandı ✓</div></>):(<><div style={{opacity:0.38,marginBottom:9}}><MapPin size={26} color={C.t3}/></div><div style={{fontSize:12,color:C.t2,marginBottom:13,lineHeight:1.6}}>{lang==="tr"?"Konumunu algılayarak yakındaki görevleri göster":"Detect your location to show nearby tasks"}</div><button className="sbtn" onClick={()=>setTimeout(()=>setDetected(true),900)} style={{padding:"11px 22px",borderRadius:13,border:"none",color:"#fff",fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{lang==="tr"?"Konumu Algıla":"Detect Location"}</button></>)}
      </div>
      {detected&&locs.map((loc,i)=>(
        <div key={i} className="ic gc" style={{borderRadius:15,padding:"12px 13px",marginBottom:9,animationDelay:`${i*0.07}s`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:34,height:34,borderRadius:10,background:`${t.a}16`,display:"flex",alignItems:"center",justifyContent:"center"}}><MapPin size={17} color={t.a}/></div><div><div style={{fontSize:13,fontWeight:700,color:C.t1}}>{loc.n}</div><div style={{fontSize:11,color:t.a}}>📍 {loc.d}</div></div></div>
            <span style={{fontSize:10,fontWeight:700,color:t.a,background:`${t.a}14`,padding:"3px 9px",borderRadius:9}}>{loc.items.length} görev</span>
          </div>
          {loc.items.map((item,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:7,padding:"4px 0",borderTop:`1px solid ${C.b1}`}}><div style={{width:5,height:5,borderRadius:"50%",background:t.a}}/><span style={{fontSize:11,color:C.t2}}>{item}</span></div>)}
        </div>
      ))}
    </div>
  </>);
}

function WAInline({ t, onClose, onAdd, lang }) {
  const [text,setText]=useState(""); const [parsed,setParsed]=useState([]); const [loading,setLoading]=useState(false); const [step,setStep]=useState("input");
  const parse=async()=>{if(!text.trim())return;setLoading(true);try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,system:CHAT_PROMPT,messages:[{role:"user",content:text}]})});const d=await res.json();const full=d.content?.[0]?.text||"";const m=full.match(/<items>([\s\S]*?)<\/items>/);if(m)setParsed(JSON.parse(m[1]));setStep("review");}catch{setParsed([{type:"görev",title:text.substring(0,40),emoji:"📋",priority:"orta"}]);setStep("review");}setLoading(false);};
  return (<>
    <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
      <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><MessageCircle size={16} color="#25D366"/> WhatsApp</div>
      <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
      {step==="input"?(<>
        <div className="gc" style={{borderRadius:15,padding:13,marginBottom:13}}>
          <textarea value={text} onChange={e=>setText(e.target.value)} placeholder={lang==="tr"?"WhatsApp mesajını buraya yapıştır...":"Paste your WhatsApp message here..."} rows={4} style={{width:"100%",background:"transparent",border:"none",color:C.t1,fontSize:13,resize:"none",fontFamily:"inherit",lineHeight:1.6}}/>
          <button className="sbtn" onClick={parse} disabled={!text.trim()||loading} style={{width:"100%",padding:"11px",borderRadius:12,border:"none",color:"#fff",fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,opacity:text.trim()?1:0.4}}>
            {loading?<Dots t={t}/>:<><Zap size={14} color="#fff"/> {lang==="tr"?"Göreve Dönüştür":"Convert to Tasks"}</>}
          </button>
        </div>
        <div style={{fontSize:10,fontWeight:700,color:C.t3,letterSpacing:0.7,textTransform:"uppercase",marginBottom:8}}>{lang==="tr"?"Örnek Mesajlar":"Examples"}</div>
        {["Bugün saat 15:30'da diş doktoru var","Yarın toplantı için sunum hazırla","Marketten yoğurt peynir meyve al"].map((e,i)=><button key={i} className="gb chip" onClick={()=>setText(e)} style={{width:"100%",padding:"10px 13px",borderRadius:12,color:C.t2,fontSize:12,fontFamily:"inherit",textAlign:"left",marginBottom:7,lineHeight:1.5,display:"flex",alignItems:"center",gap:7}}><MessageCircle size={13} color={C.t3}/>{e}</button>)}
      </>):(<>
        <div style={{fontSize:12,fontWeight:700,color:C.t1,marginBottom:11}}>✨ {parsed.length} {lang==="tr"?"öğe bulundu":"items found"}:</div>
        {parsed.map((item,i)=>{const tint=C.tints[item.type]||C.tints["görev"];return <div key={i} className="ic gc" style={{display:"flex",alignItems:"center",gap:11,padding:"10px 12px",borderRadius:13,marginBottom:7,border:`1px solid ${tint.bdr}`,animationDelay:`${i*0.06}s`}}><div style={{width:32,height:32,borderRadius:9,background:tint.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><CheckSquare size={15} color={tint.c}/></div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.t1}}>{item.title}</div>{item.date&&<div style={{fontSize:10,color:C.t2,marginTop:1}}>🕐 {item.date}</div>}</div><span style={{fontSize:9,color:tint.c,background:`${tint.c}12`,padding:"2px 7px",borderRadius:9,fontWeight:700,textTransform:"uppercase"}}>{item.type}</span></div>;})}
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <button className="gb" onClick={()=>{setStep("input");setParsed([]);}} style={{flex:1,padding:"11px",borderRadius:13,color:C.t2,fontSize:12,fontWeight:600,fontFamily:"inherit"}}>{lang==="tr"?"Geri":"Back"}</button>
          <button className="sbtn" onClick={()=>{onAdd(parsed);onClose();}} style={{flex:2,padding:"11px",borderRadius:13,border:"none",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>{lang==="tr"?"Hepsini Ekle":"Add All"} ✓</button>
        </div>
      </>)}
    </div>
  </>);
}

function WeatherInline({ t, onClose, lang }) {
  const W={temp:18,desc:lang==="tr"?"Parçalı Bulutlu":"Partly Cloudy",humidity:65,wind:12,forecast:[{day:lang==="tr"?"Yarın":"Tomorrow",temp:20,s:Sun},{day:lang==="tr"?"Çarş.":"Wed",temp:16,s:Cloud},{day:lang==="tr"?"Perş.":"Thu",temp:14,s:Cloud},{day:lang==="tr"?"Cum.":"Fri",temp:22,s:Sun},{day:lang==="tr"?"Cmt.":"Sat",temp:19,s:Sun}]};
  return (<>
    <div style={{padding:"17px 15px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.b1}`}}>
      <div style={{fontSize:16,fontWeight:800,color:C.t1,display:"flex",alignItems:"center",gap:7}}><Sun size={16} color={t.a}/> {lang==="tr"?"Hava Durumu":"Weather"}</div>
      <button className="gb" onClick={onClose} style={{width:32,height:32,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.t2}/></button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
      <div className="gc" style={{borderRadius:18,padding:18,marginBottom:13,textAlign:"center",background:`linear-gradient(135deg,${t.a}16,${t.b}09)`,border:`1px solid ${t.a}22`}}>
        <Sun size={48} color={t.a} strokeWidth={1.5} style={{marginBottom:7}}/>
        <div style={{fontSize:48,fontWeight:900,color:C.t1,letterSpacing:-2,lineHeight:1}}>{W.temp}°</div>
        <div style={{fontSize:14,color:C.t2,marginTop:5}}>{W.desc}</div>
        <div style={{display:"flex",justifyContent:"center",gap:18,marginTop:13}}>
          <div style={{textAlign:"center"}}><Wifi size={13} color={C.t3}/><div style={{fontSize:11,color:C.t2,marginTop:3}}>{W.wind} km/s</div></div>
          <div style={{textAlign:"center"}}><Cloud size={13} color={C.t3}/><div style={{fontSize:11,color:C.t2,marginTop:3}}>%{W.humidity}</div></div>
        </div>
      </div>
      <div className="gc" style={{borderRadius:16,padding:13}}>
        <div style={{fontSize:10,fontWeight:700,color:C.t3,letterSpacing:0.7,textTransform:"uppercase",marginBottom:11}}>{lang==="tr"?"5 Günlük Tahmin":"5-Day Forecast"}</div>
        <div style={{display:"flex",gap:6}}>
          {W.forecast.map((f,i)=>{const FI=f.s;return(
            <div key={i} style={{flex:1,textAlign:"center",padding:"9px 0",borderRadius:11,background:i===0?`${t.a}13`:"transparent",border:i===0?`1px solid ${t.a}28`:`1px solid transparent`}}>
              <div style={{fontSize:9,color:C.t3,marginBottom:5,fontWeight:600}}>{f.day}</div>
              <FI size={14} color={i===0?t.a:C.t3} strokeWidth={1.8} style={{marginBottom:5}}/>
              <div style={{fontSize:12,fontWeight:700,color:i===0?t.a:C.t2}}>{f.temp}°</div>
            </div>
          );})}
        </div>
      </div>
      <div className="gc" style={{borderRadius:13,padding:"10px 12px",marginTop:11,fontSize:11,color:C.t2,lineHeight:1.6}}>
        💡 {lang==="tr"?"Bugün dışarı çıkacaksan hafif bir ceket almayı unutma!":"Don't forget a light jacket if you're heading out today!"}
      </div>
    </div>
  </>);
}
