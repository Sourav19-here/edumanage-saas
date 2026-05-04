const STORAGE_KEY = "edumanage-saas-mvp-v1";

// ── Supabase init (replace with your project credentials) ──
const SUPABASE_URL = "https://upfbgiymsydadnhahyrx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZmJnaXltc3lkYWRuaGFoeXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDY2NzksImV4cCI6MjA5MzQ4MjY3OX0.6DOHS3jjaSreR7SuBXrUgExRvoz_CWdBMgimnPxPShA";
const { createClient } = window.supabase ?? {};
const supabase = createClient ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

let currentUser = null;
let authReady = false;

// ── Auth state listener ──
if (supabase) {
  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user ?? null;
    authReady = true;
    if (currentUser) {
      loadStateFromSupabase().then(() => {
        render();
      });
    } else {
      state = loadState();
      render();
    }
  });
} else {
  authReady = true;
}

const labels = {
  en: {
    "brand.tagline": "Coaching OS",
    "nav.dashboard": "Dashboard",
    "nav.students": "Students",
    "nav.attendance": "Attendance",
    "nav.fees": "Fees",
    "nav.reminders": "Reminders",
    "nav.receipts": "Receipts",
    "nav.settings": "Settings",
    "plan.current": "Current plan",
    "actions.addStudent": "Add student",
    "actions.save": "Save",
    "actions.cancel": "Cancel",
    "actions.edit": "Edit",
    "actions.delete": "Delete",
    "actions.recordPayment": "Record payment",
    "actions.markPaid": "Mark paid",
    "actions.generate": "Generate",
    "actions.copy": "Copy",
    "actions.sent": "Sent",
    "actions.print": "Print",
    "actions.export": "Export data",
    "actions.reset": "Reset demo",
    "page.dashboard": "Dashboard",
    "page.students": "Students",
    "page.attendance": "Attendance",
    "page.fees": "Fees",
    "page.reminders": "Reminders",
    "page.receipts": "Receipts",
    "page.settings": "Settings",
    "dashboard.title": "Owner command center",
    "dashboard.subtitle": "Today at a glance",
    "metric.students": "Active students",
    "metric.attendance": "Attendance today",
    "metric.collected": "Collected this month",
    "metric.overdue": "Overdue fees",
    "chart.collection": "Collection health",
    "chart.attendance": "Attendance mix",
    "dashboard.batches": "Today's batches",
    "dashboard.followups": "Fee follow-ups",
    "students.title": "Student enrollment",
    "students.form": "Student profile",
    "students.list": "Student list",
    "attendance.title": "Attendance",
    "attendance.summary": "Daily summary",
    "fees.title": "Fee collection",
    "fees.form": "Payment entry",
    "fees.history": "Payment history",
    "reminders.title": "Reminder queue",
    "receipts.title": "PDF receipt",
    "settings.title": "Institute settings",
    "settings.pricing": "Pricing plans",
    "empty.noStudents": "No students match this view.",
    "empty.noPayments": "No payments recorded yet.",
    "empty.noReminders": "No reminders in the queue.",
    "status.present": "Present",
    "status.absent": "Absent",
    "status.late": "Late",
    "status.unmarked": "Unmarked",
    "status.paid": "Paid",
    "status.overdue": "Overdue",
    "status.dueSoon": "Due soon",
    "status.open": "Open",
    "toast.saved": "Saved",
    "toast.deleted": "Deleted",
    "toast.payment": "Payment recorded",
    "toast.attendance": "Attendance updated",
    "toast.reminders": "Reminder queue updated",
    "toast.copied": "Message copied",
    "toast.sent": "Marked as sent",
    "toast.exported": "Data export downloaded",
    "toast.reset": "Demo data restored",
    "greeting.morning": "Good morning",
    "greeting.afternoon": "Good afternoon",
    "greeting.evening": "Good evening"
  },
  bn: {
    "brand.tagline": "কোচিং অপারেশন",
    "nav.dashboard": "ড্যাশবোর্ড",
    "nav.students": "শিক্ষার্থী",
    "nav.attendance": "উপস্থিতি",
    "nav.fees": "ফি",
    "nav.reminders": "রিমাইন্ডার",
    "nav.receipts": "রসিদ",
    "nav.settings": "সেটিংস",
    "plan.current": "বর্তমান প্ল্যান",
    "actions.addStudent": "শিক্ষার্থী যোগ",
    "actions.save": "সেভ",
    "actions.cancel": "বাতিল",
    "actions.edit": "এডিট",
    "actions.delete": "মুছুন",
    "actions.recordPayment": "পেমেন্ট নিন",
    "actions.markPaid": "পেইড",
    "actions.generate": "তৈরি",
    "actions.copy": "কপি",
    "actions.sent": "পাঠানো",
    "actions.print": "প্রিন্ট",
    "actions.export": "ডেটা এক্সপোর্ট",
    "actions.reset": "ডেমো রিসেট",
    "page.dashboard": "ড্যাশবোর্ড",
    "page.students": "শিক্ষার্থী",
    "page.attendance": "উপস্থিতি",
    "page.fees": "ফি",
    "page.reminders": "রিমাইন্ডার",
    "page.receipts": "রসিদ",
    "page.settings": "সেটিংস",
    "dashboard.title": "ওনার ড্যাশবোর্ড",
    "dashboard.subtitle": "আজকের সারাংশ",
    "metric.students": "সক্রিয় শিক্ষার্থী",
    "metric.attendance": "আজ উপস্থিত",
    "metric.collected": "এই মাসে কালেকশন",
    "metric.overdue": "বকেয়া ফি",
    "chart.collection": "কালেকশন",
    "chart.attendance": "উপস্থিতি",
    "dashboard.batches": "আজকের ব্যাচ",
    "dashboard.followups": "ফি ফলো-আপ",
    "students.title": "শিক্ষার্থী ভর্তি",
    "students.form": "শিক্ষার্থীর প্রোফাইল",
    "students.list": "শিক্ষার্থীর তালিকা",
    "attendance.title": "উপস্থিতি",
    "attendance.summary": "দিনের সারাংশ",
    "fees.title": "ফি কালেকশন",
    "fees.form": "পেমেন্ট এন্ট্রি",
    "fees.history": "পেমেন্ট হিস্ট্রি",
    "reminders.title": "রিমাইন্ডার কিউ",
    "receipts.title": "PDF রসিদ",
    "settings.title": "ইনস্টিটিউট সেটিংস",
    "settings.pricing": "প্রাইসিং প্ল্যান",
    "empty.noStudents": "এই ভিউতে কোনো শিক্ষার্থী নেই।",
    "empty.noPayments": "এখনও কোনো পেমেন্ট নেই।",
    "empty.noReminders": "রিমাইন্ডার কিউ খালি।",
    "status.present": "উপস্থিত",
    "status.absent": "অনুপস্থিত",
    "status.late": "দেরি",
    "status.unmarked": "মার্ক হয়নি",
    "status.paid": "পেইড",
    "status.overdue": "বকেয়া",
    "status.dueSoon": "শীঘ্রই",
    "status.open": "ওপেন",
    "toast.saved": "সেভ হয়েছে",
    "toast.deleted": "মুছে দেওয়া হয়েছে",
    "toast.payment": "পেমেন্ট রেকর্ড হয়েছে",
    "toast.attendance": "উপস্থিতি আপডেট হয়েছে",
    "toast.reminders": "রিমাইন্ডার কিউ আপডেট হয়েছে",
    "toast.copied": "মেসেজ কপি হয়েছে",
    "toast.sent": "পাঠানো হিসেবে মার্ক হয়েছে",
    "toast.exported": "ডেটা এক্সপোর্ট হয়েছে",
    "toast.reset": "ডেমো ডেটা ফিরেছে",
    "greeting.morning": "সুপ্রভাত",
    "greeting.afternoon": "শুভ অপরাহ্ন",
    "greeting.evening": "শুভ সন্ধ্যা"
  }
};

const pageTitles = {
  dashboard: "page.dashboard",
  students: "page.students",
  attendance: "page.attendance",
  fees: "page.fees",
  reminders: "page.reminders",
  receipts: "page.receipts",
  settings: "page.settings"
};

const viewRoot = document.getElementById("viewRoot");
const pageTitle = document.getElementById("pageTitle");
const workspaceLabel = document.getElementById("workspaceLabel");
const sidebarPlan = document.getElementById("sidebarPlan");
const sidebarStudentCount = document.getElementById("sidebarStudentCount");
const langToggle = document.getElementById("langToggle");
const toastNode = document.getElementById("toast");

let toastTimer;
let searchDebounceTimer;
let feeStatusCache = new Map();
let feeCacheVersion = "";
let state = loadState();
let ui = {
  view: "dashboard",
  authMode: "signin",
  studentSearch: "",
  studentBatch: "all",
  editingStudentId: null,
  attendanceDate: todayISO(),
  attendanceBatch: "all",
  paymentStudentId: null,
  selectedReceiptId: null
};

render();

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    ui.view = viewButton.dataset.view;
    if (viewButton.dataset.receipt) {
      ui.selectedReceiptId = viewButton.dataset.receipt;
    }
    if (ui.view === "students" && !ui.editingStudentId) {
      ui.editingStudentId = null;
    }
    render();
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const { action, id, status } = actionButton.dataset;

  if (action === "toggle-auth-mode") {
    ui.authMode = ui.authMode === "signup" ? "signin" : "signup";
    render();
  }

  if (action === "open-student-form") {
    ui.view = "students";
    ui.editingStudentId = null;
    render();
  }

  if (action === "edit-student") {
    ui.view = "students";
    ui.editingStudentId = id;
    render();
  }

  if (action === "cancel-student") {
    ui.editingStudentId = null;
    document.getElementById("studentForm")?.reset();
    render();
  }

  if (action === "delete-student") {
    deleteStudent(id);
  }

  if (action === "student-payment") {
    ui.view = "fees";
    ui.paymentStudentId = id;
    render();
  }

  if (action === "mark-attendance") {
    upsertAttendance(id, ui.attendanceDate, status);
    saveState();
    toast(t("toast.attendance"));
    render();
  }

  if (action === "mark-all-present") {
    filteredAttendanceStudents().forEach((student) => {
      upsertAttendance(student.id, ui.attendanceDate, "present");
    });
    saveState();
    toast(t("toast.attendance"));
    render();
  }

  if (action === "quick-collect") {
    quickCollect(id);
  }

  if (action === "generate-reminders") {
    generateReminders();
  }

  if (action === "copy-reminder") {
    copyReminder(id);
  }

  if (action === "mark-reminder-sent") {
    const reminder = state.reminders.find((item) => item.id === id);
    if (reminder) {
      reminder.status = "sent";
      reminder.sentAt = todayISO();
      saveState();
      toast(t("toast.sent"));
      render();
    }
  }

  if (action === "print-receipt") {
    window.print();
  }

  if (action === "export-data") {
    exportData();
  }

  if (action === "reset-demo") {
    if (window.confirm("Restore demo data?")) {
      state = createDemoState();
      ui = { ...ui, selectedReceiptId: null, editingStudentId: null, paymentStudentId: null };
      saveState();
      toast(t("toast.reset"));
      render();
    }
  }

  if (action === "sign-out") {
    signOut();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "authForm") {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "").trim();
    if (ui.authMode === "signup") signUp(email, password).then(() => toast("Check email to confirm"));
    else signIn(email, password);
  }

  if (event.target.id === "studentForm") {
    event.preventDefault();
    saveStudent(event.target);
  }

  if (event.target.id === "paymentForm") {
    event.preventDefault();
    savePayment(event.target);
  }

  if (event.target.id === "settingsForm") {
    event.preventDefault();
    saveSettings(event.target);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "studentSearch") {
    ui.studentSearch = event.target.value;
    window.clearTimeout(searchDebounceTimer);
    searchDebounceTimer = window.setTimeout(() => {
      renderStudentsListOnly();
      const input = document.getElementById("studentSearch");
      if (input) {
        const cursor = input.selectionStart;
        input.focus();
        input.setSelectionRange(cursor, cursor);
      }
    }, 150);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "studentBatch") {
    ui.studentBatch = event.target.value;
    renderStudentsListOnly();
  }

  if (event.target.id === "attendanceDate") {
    ui.attendanceDate = event.target.value || todayISO();
    render();
  }

  if (event.target.id === "attendanceBatch") {
    ui.attendanceBatch = event.target.value;
    render();
  }

  if (event.target.id === "paymentStudent") {
    ui.paymentStudentId = event.target.value;
    render();
  }

  if (event.target.id === "receiptSelect") {
    ui.selectedReceiptId = event.target.value;
    render();
  }
});

langToggle.addEventListener("click", () => {
  state.institute.locale = currentLang() === "en" ? "bn" : "en";
  saveState();
  render();
});

// Floating social button toggle
const socialToggle = document.getElementById("socialToggle");
const floatingSocial = document.getElementById("floatingSocial");

if (socialToggle && floatingSocial) {
  socialToggle.addEventListener("click", () => {
    floatingSocial.classList.toggle("open");
    const isOpen = floatingSocial.classList.contains("open");
    socialToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!floatingSocial.contains(event.target) && floatingSocial.classList.contains("open")) {
      floatingSocial.classList.remove("open");
      socialToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function render() {
  if (!authReady) {
    viewRoot.innerHTML = `<div class="empty-state">Loading...</div>`;
    return;
  }

  if (!currentUser) {
    viewRoot.innerHTML = renderAuth();
    return;
  }

  applyChrome();

  const views = {
    dashboard: renderDashboard,
    students: renderStudents,
    attendance: renderAttendance,
    fees: renderFees,
    reminders: renderReminders,
    receipts: renderReceipts,
    settings: renderSettings
  };

  viewRoot.innerHTML = views[ui.view]();
}

function renderAuth() {
  return `
    <div class="auth-container">
      <div class="brand" style="justify-content:center;margin-bottom:24px">
        <div class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="img"><path d="M4 6.5 12 3l8 3.5-8 3.5-8-3.5Z"></path><path d="M7 10v5.2c0 1.7 2.2 3 5 3s5-1.3 5-3V10"></path><path d="M20 7v5"></path></svg>
        </div>
        <div>
          <strong>EduManage</strong>
          <span data-i18n="brand.tagline">Coaching OS</span>
        </div>
      </div>
      <div class="panel" style="max-width:400px;margin:0 auto">
        <div class="panel-head">
          <h3>${ui.authMode === "signup" ? (currentLang() === "bn" ? "অ্যাকাউন্ট তৈরি করুন" : "Create account") : (currentLang() === "bn" ? "সাইন ইন করুন" : "Sign in")}</h3>
        </div>
        <form id="authForm" class="form-grid">
          <label class="field span-2">
            <span>Email</span>
            <input name="email" type="email" required placeholder="you@example.com">
          </label>
          <label class="field span-2">
            <span>Password</span>
            <input name="password" type="password" required minlength="6" placeholder="••••••">
          </label>
          <div class="form-actions">
            <button class="button primary" type="submit">${ui.authMode === "signup" ? (currentLang() === "bn" ? "রেজিস্টার" : "Register") : (currentLang() === "bn" ? "সাইন ইন" : "Sign in")}</button>
          </div>
        </form>
        <p style="text-align:center;margin-top:12px">
          <button class="button ghost" data-action="toggle-auth-mode" type="button">
            ${ui.authMode === "signup" ? (currentLang() === "bn" ? "অ্যাকাউন্ট আছে? সাইন ইন" : "Have an account? Sign in") : (currentLang() === "bn" ? "নতুন অ্যাকাউন্ট? রেজিস্টার" : "New account? Register")}
          </button>
        </p>
      </div>
    </div>
  `;
}

function applyChrome() {
  const lang = currentLang();
  document.documentElement.lang = lang === "bn" ? "bn" : "en";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === ui.view);
  });

  pageTitle.textContent = t(pageTitles[ui.view]);
  workspaceLabel.textContent = state.institute.name;
  sidebarPlan.textContent = state.institute.plan;
  sidebarStudentCount.textContent = `${activeStudents().length} ${lang === "bn" ? "শিক্ষার্থী" : "students"}`;
  langToggle.textContent = lang === "bn" ? "English" : "বাংলা";
}

function renderDashboard() {
  const students = activeStudents();
  const currentMonth = monthISO();
  const expected = students.reduce((sum, student) => sum + Number(student.fee || 0), 0);
  const collected = monthPayments(currentMonth).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const collectionRate = expected ? Math.min(100, Math.round((collected / expected) * 100)) : 0;
  const attendance = attendanceSummary(ui.attendanceDate);
  const attendanceRate = students.length ? Math.round(((attendance.present + attendance.late) / students.length) * 100) : 0;
  const overdue = overdueStudents();
  const batches = uniqueBatches();
  const monthSeries = [-3, -2, -1, 0].map((offset) => {
    const month = shiftMonth(currentMonth, offset);
    const amount = monthPayments(month).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    return { month, amount, percent: expected ? Math.min(100, Math.round((amount / expected) * 100)) : 0 };
  });

  const prevMonth = shiftMonth(currentMonth, -1);
  const prevCollected = monthPayments(prevMonth).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const collectionTrend = prevCollected > 0 ? Math.round(((collected - prevCollected) / prevCollected) * 100) : 0;

  const remaining = Math.max(0, expected - collected);
  const daysLeft = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate();
  const dailyTarget = daysLeft > 0 ? Math.round(remaining / daysLeft) : 0;

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? (currentLang() === "bn" ? "সুপ্রভাত" : "Good morning") : greetingHour < 17 ? (currentLang() === "bn" ? "শুভ অপরাহ্ন" : "Good afternoon") : (currentLang() === "bn" ? "শুভ সন্ধ্যা" : "Good evening");

  const insights = students.slice(0, 6).map((student) => {
    const att = studentAttendanceRate(student.id);
    const streak = studentPaymentStreak(student);
    return { student, att, streak };
  });

  const recentPayments = [...state.payments].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)).slice(0, 5);

  return `
    <div class="greeting-section">
      <h2>${greeting}, ${escapeHtml(state.institute.owner?.split(" ")[0] || "Owner")} 👋</h2>
      <p>${state.institute.name} · ${formatDate(todayISO())} · ${students.length} ${currentLang() === "bn" ? "সক্রিয় শিক্ষার্থী" : "active students"}</p>
      <div class="quick-actions">
        <button class="button" data-action="open-student-form" type="button">+ ${t("actions.addStudent")}</button>
        <button class="button" data-view="attendance" type="button">${currentLang() === "bn" ? "উপস্থিতি নিন" : "Mark attendance"}</button>
        <button class="button" data-view="fees" type="button">${currentLang() === "bn" ? "ফি সংগ্রহ" : "Collect fee"}</button>
        <button class="button" data-action="generate-reminders" type="button">${overdue.length ? overdue.length : currentLang() === "bn" ? "রিমাইন্ডার" : "Reminders"}</button>
      </div>
    </div>

    <div class="metric-grid">
      <div class="metric teal">
        <span>${t("metric.students")}</span>
        <strong>${students.length}</strong>
        <small>${batches.length} ${currentLang() === "bn" ? "ব্যাচ" : "batches"}</small>
      </div>
      <div class="metric blue">
        <span>${t("metric.attendance")}</span>
        <strong>${attendanceRate}%</strong>
        <div class="trend ${attendanceRate >= 75 ? "up" : "down"}">${attendanceRate >= 75 ? "↑" : "↓"} ${attendance.present} ${t("status.present").toLowerCase()}</div>
      </div>
      <div class="metric green">
        <span>${t("metric.collected")}</span>
        <strong>${formatMoney(collected)}</strong>
        ${collectionTrend !== 0 ? `<div class="trend ${collectionTrend > 0 ? "up" : "down"}">${collectionTrend > 0 ? "↑" : "↓"} ${Math.abs(collectionTrend)}% vs last month</div>` : `<small>${collectionRate}% of ${formatMoney(expected)}</small>`}
      </div>
      <div class="metric amber">
        <span>${t("metric.overdue")}</span>
        <strong>${overdue.length}</strong>
        <small>${overdue.length ? formatMoney(overdue.reduce((sum, item) => sum + item.balance, 0)) : t("status.paid")}</small>
      </div>
    </div>

    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>${t("chart.collection")}</h3>
            <p>${formatMonthLabel(shiftMonth(currentMonth, -3))} – ${formatMonthLabel(currentMonth)}</p>
          </div>
          <span class="badge">${formatMoney(collected)}</span>
        </div>
        <div class="chart">
          ${monthSeries.map((item, index) => `
            <div class="bar-row">
              <span>${formatMonthLabel(item.month, true)}</span>
              <div class="bar-track" aria-hidden="true">
                <div class="bar-fill ${index === 2 ? "amber" : ""}" style="width:${item.percent}%"></div>
              </div>
              <strong>${item.percent}%</strong>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>${currentLang() === "bn" ? "আজকের সারাংশ" : "Today's summary"}</h3>
            <p>${formatDate(ui.attendanceDate)}</p>
          </div>
        </div>
        <div class="attendance-layout">
          <div class="summary-ring" style="--value:${attendanceRate}">
            <span>${attendanceRate}%</span>
          </div>
          <div class="chart">
            ${attendanceBar("status.present", attendance.present, students.length, "green")}
            ${attendanceBar("status.absent", attendance.absent, students.length, "warn")}
            ${attendanceBar("status.late", attendance.late, students.length, "amber")}
            ${attendanceBar("status.unmarked", attendance.unmarked, students.length, "")}
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>${currentLang() === "bn" ? "রাজস্ব পূর্বাভাস" : "Revenue forecast"}</h3>
            <p>${currentLang() === "bn" ? "এই মাসের অনুমান" : "This month's projection"}</p>
          </div>
        </div>
        <div class="revenue-forecast">
          <div class="forecast-amount">${formatMoney(expected)}</div>
          <div class="forecast-detail">${currentLang() === "bn" ? "আদায় হয়েছে" : "Collected"}: ${formatMoney(collected)} · ${currentLang() === "bn" ? "বাকি" : "Remaining"}: ${formatMoney(remaining)}</div>
          ${dailyTarget > 0 ? `<div class="forecast-detail">${currentLang() === "bn" ? "দৈনিক লক্ষ্য" : "Daily target"}: ${formatMoney(dailyTarget)} (${daysLeft} ${currentLang() === "bn" ? "দিন বাকি" : "days left"})</div>` : ""}
        </div>
        <div style="margin-top:16px">
          <div class="panel-head">
            <div>
              <h3>${t("dashboard.followups")}</h3>
              <p>${overdue.length} ${currentLang() === "bn" ? "বকেয়া" : "overdue"}</p>
            </div>
            <button class="button slim" data-action="generate-reminders" type="button">${t("actions.generate")}</button>
          </div>
          ${renderOverdueList(overdue.slice(0, 3))}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>${currentLang() === "bn" ? "শিক্ষার্থী অন্তর্দৃষ্টি" : "Student insights"}</h3>
            <p>${currentLang() === "bn" ? "উপস্থিতি ও পেমেন্ট" : "Attendance & payment streaks"}</p>
          </div>
        </div>
        <div class="insights-grid">
          ${insights.map(({ student, att, streak }) => {
    const attClass = att.rate >= 75 ? "good" : att.rate >= 50 ? "warn" : "bad";
    const streakClass = streak >= 4 ? "green" : streak >= 2 ? "amber" : "red";
    return `
            <div class="insight-card">
              <div class="insight-header">
                <div>
                  <div class="insight-name">${escapeHtml(student.name)}</div>
                  <div class="insight-batch">${escapeHtml(student.batch)} · ${escapeHtml(student.klass)}</div>
                </div>
                <span class="badge ${feeStatus(student).key === "paid" ? "" : "warn"}">${t(`status.${feeStatus(student).key}`)}</span>
              </div>
              <div class="insight-stats">
                <div class="insight-stat ${attClass}">
                  <label>${currentLang() === "bn" ? "উপস্থিতি" : "Attendance"}</label>
                  <strong>${att.rate}%</strong>
                  <div class="streak-bar"><div class="streak-bar-fill ${attClass === "good" ? "green" : attClass === "warn" ? "amber" : "red"}" style="width:${att.rate}%"></div></div>
                </div>
                <div class="insight-stat ${streak >= 3 ? "good" : streak >= 1 ? "warn" : "bad"}">
                  <label>${currentLang() === "bn" ? "পেমেন্ট ধারাবাহিকতা" : "Payment streak"}</label>
                  <strong>${streak}m</strong>
                  <small style="color:var(--muted);font-size:11px">${streak >= 3 ? (currentLang() === "bn" ? "চমৎকার" : "Excellent") : streak >= 1 ? (currentLang() === "bn" ? "ভালো" : "Good") : (currentLang() === "bn" ? "সতর্কতা" : "Watch")}</small>
                </div>
              </div>
            </div>
          `;
  }).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>${currentLang() === "bn" ? "সাম্প্রতিক কার্যকলাপ" : "Recent activity"}</h3>
            <p>${recentPayments.length} ${currentLang() === "bn" ? "রেকর্ড" : "records"}</p>
          </div>
        </div>
        <div class="activity-feed">
          ${recentPayments.map((payment) => {
    const student = studentById(payment.studentId);
    const icon = payment.method === "UPI" ? "⚡" : payment.method === "Cash" ? "💵" : "🏦";
    return `
            <div class="activity-item">
              <div class="activity-icon ${payment.amount >= Number(student?.fee || 0) ? "green" : "amber"}">${icon}</div>
              <div class="activity-text">
                <strong>${escapeHtml(student?.name || "Unknown")} · ${formatMoney(payment.amount)}</strong>
                <small>${escapeHtml(payment.method)} · ${formatDate(payment.date)}</small>
              </div>
            </div>
          `;
  }).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderStudents() {
  return `
    <div class="view-header">
      <div>
        <p class="eyebrow">${t("students.title")}</p>
        <h2>${t("students.list")}</h2>
      </div>
    </div>

    <div class="content-grid">
      <section class="panel" id="studentsListPanel">
        ${renderStudentsList()}
      </section>
      <section class="panel">
        ${renderStudentForm()}
      </section>
    </div>
  `;
}

function renderStudentsListOnly() {
  if (ui.view !== "students") return;
  const panel = document.getElementById("studentsListPanel");
  if (panel) panel.innerHTML = renderStudentsList();
}

function renderStudentsList() {
  const batches = uniqueBatches();
  const filtered = filteredStudents();

  return `
    <div class="panel-head">
      <div>
        <h3>${t("students.list")}</h3>
        <p>${activeStudents().length} ${currentLang() === "bn" ? "সক্রিয়" : "active"}</p>
      </div>
    </div>
    <div class="toolbar">
      <label class="field">
        <span class="sr-only">Search</span>
        <input id="studentSearch" value="${escapeHtml(ui.studentSearch)}" placeholder="${currentLang() === "bn" ? "নাম, ক্লাস, ফোন" : "Name, class, phone"}">
      </label>
      <label class="field">
        <span class="sr-only">Batch</span>
        <select id="studentBatch">
          <option value="all">${currentLang() === "bn" ? "সব ব্যাচ" : "All batches"}</option>
          ${batches.map((batch) => `<option value="${escapeHtml(batch)}" ${ui.studentBatch === batch ? "selected" : ""}>${escapeHtml(batch)}</option>`).join("")}
        </select>
      </label>
    </div>
    ${filtered.length ? `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>${currentLang() === "bn" ? "শিক্ষার্থী" : "Student"}</th>
              <th>${currentLang() === "bn" ? "ব্যাচ" : "Batch"}</th>
              <th>${currentLang() === "bn" ? "গার্ডিয়ান" : "Guardian"}</th>
              <th>${currentLang() === "bn" ? "মাসিক ফি" : "Monthly fee"}</th>
              <th>${currentLang() === "bn" ? "স্ট্যাটাস" : "Status"}</th>
              <th>${currentLang() === "bn" ? "অ্যাকশন" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(renderStudentRow).join("")}
          </tbody>
        </table>
      </div>
    ` : emptyState(t("empty.noStudents"))}
  `;
}

function renderStudentRow(student) {
  const fee = feeStatus(student);
  return `
    <tr>
      <td>
        <div class="name-cell">
          <strong>${escapeHtml(student.name)}</strong>
          <small>${escapeHtml(student.klass)} · ${escapeHtml(student.subjects.join(", "))}</small>
        </div>
      </td>
      <td>${escapeHtml(student.batch)}</td>
      <td>
        <div class="name-cell">
          <strong>${escapeHtml(student.guardian)}</strong>
          <small>${escapeHtml(student.phone)}</small>
        </div>
      </td>
      <td>${formatMoney(student.fee)} <small class="muted">/ ${currentLang() === "bn" ? "মাস" : "month"}</small></td>
      <td>${feeBadge(fee)}</td>
      <td>
        <div class="row-actions">
          <button class="button slim" data-action="edit-student" data-id="${student.id}" type="button">${t("actions.edit")}</button>
          <button class="button slim" data-action="student-payment" data-id="${student.id}" type="button">${t("actions.recordPayment")}</button>
        </div>
      </td>
    </tr>
  `;
}

function renderStudentForm() {
  const editing = state.students.find((student) => student.id === ui.editingStudentId);
  const student = editing || {
    name: "",
    klass: "",
    subjects: [],
    batch: "",
    guardian: "",
    phone: "",
    fee: 799,
    dueDay: 5,
    status: "active"
  };

  return `
    <form id="studentForm">
      <div class="panel-head">
        <div>
          <h3>${t("students.form")}</h3>
          <p>${editing ? escapeHtml(editing.name) : currentLang() === "bn" ? "নতুন শিক্ষার্থী" : "New student"}</p>
        </div>
      </div>
      <div class="form-grid">
        ${field("studentName", currentLang() === "bn" ? "নাম" : "Name", "text", student.name, true)}
        ${field("studentClass", currentLang() === "bn" ? "ক্লাস" : "Class", "text", student.klass, true, "Class 10")}
        ${field("studentSubjects", currentLang() === "bn" ? "বিষয়" : "Subjects", "text", student.subjects.join(", "), true, "Maths, Science")}
        ${field("studentBatchName", currentLang() === "bn" ? "ব্যাচ" : "Batch", "text", student.batch, true, "Morning A")}
        ${field("guardianName", currentLang() === "bn" ? "গার্ডিয়ান" : "Guardian", "text", student.guardian, true)}
        ${field("guardianPhone", currentLang() === "bn" ? "ফোন" : "Phone", "tel", student.phone, true, "+91 98xxxxxxx")}
        ${field("monthlyFee", currentLang() === "bn" ? "মাসিক ফি" : "Monthly fee", "number", student.fee, true)}
        ${field("dueDay", currentLang() === "bn" ? "ডিউ ডে" : "Due day", "number", student.dueDay, true)}
        <label class="field span-2">
          <span>${currentLang() === "bn" ? "স্ট্যাটাস" : "Status"}</span>
          <select name="status">
            <option value="active" ${student.status === "active" ? "selected" : ""}>${currentLang() === "bn" ? "সক্রিয়" : "Active"}</option>
            <option value="paused" ${student.status === "paused" ? "selected" : ""}>${currentLang() === "bn" ? "পজ" : "Paused"}</option>
          </select>
        </label>
      </div>
      <div class="form-actions">
        <button class="button primary" type="submit">${t("actions.save")}</button>
        ${editing ? `<button class="button ghost" data-action="cancel-student" type="button">${t("actions.cancel")}</button>` : ""}
        ${editing ? `<button class="button danger" data-action="delete-student" data-id="${editing.id}" type="button">${t("actions.delete")}</button>` : ""}
      </div>
    </form>
  `;
}

function renderAttendance() {
  const batches = uniqueBatches();
  const students = filteredAttendanceStudents();
  const summary = attendanceSummary(ui.attendanceDate, students);
  const total = students.length || 1;
  const rate = Math.round(((summary.present + summary.late) / total) * 100);

  return `
    <div class="view-header">
      <div>
        <p class="eyebrow">${t("attendance.title")}</p>
        <h2>${formatDate(ui.attendanceDate)}</h2>
      </div>
      <button class="button primary" data-action="mark-all-present" type="button">${currentLang() === "bn" ? "সবাই উপস্থিত" : "Mark all present"}</button>
    </div>

    <section class="panel">
      <div class="toolbar">
        <label class="field">
          <span>${currentLang() === "bn" ? "তারিখ" : "Date"}</span>
          <input id="attendanceDate" type="date" value="${ui.attendanceDate}">
        </label>
        <label class="field">
          <span>${currentLang() === "bn" ? "ব্যাচ" : "Batch"}</span>
          <select id="attendanceBatch">
            <option value="all">${currentLang() === "bn" ? "সব ব্যাচ" : "All batches"}</option>
            ${batches.map((batch) => `<option value="${escapeHtml(batch)}" ${ui.attendanceBatch === batch ? "selected" : ""}>${escapeHtml(batch)}</option>`).join("")}
          </select>
        </label>
      </div>

      <div class="attendance-layout">
        <div class="panel subtle">
          <div class="panel-head">
            <div>
              <h3>${t("attendance.summary")}</h3>
              <p>${students.length} ${currentLang() === "bn" ? "শিক্ষার্থী" : "students"}</p>
            </div>
          </div>
          <div class="summary-ring" style="--value:${rate}">
            <span>${rate}%</span>
          </div>
        </div>
        <div class="roster">
          ${students.length ? students.map(renderRosterCard).join("") : emptyState(t("empty.noStudents"))}
        </div>
      </div>
    </section>
  `;
}

function renderRosterCard(student) {
  const record = attendanceRecord(student.id, ui.attendanceDate);
  const status = record?.status || "unmarked";

  return `
    <article class="roster-card">
      <div class="roster-card-head">
        <div class="name-cell">
          <strong>${escapeHtml(student.name)}</strong>
          <small>${escapeHtml(student.klass)} · ${escapeHtml(student.batch)}</small>
        </div>
        ${statusBadge(status)}
      </div>
      <div class="status-toggle" aria-label="Attendance status">
        ${["present", "absent", "late"].map((item) => `
          <button
            class="${status === item ? "is-active" : ""}"
            data-action="mark-attendance"
            data-id="${student.id}"
            data-status="${item}"
            type="button"
          >${t(`status.${item}`)}</button>
        `).join("")}
      </div>
    </article>
  `;
}

function renderFees() {
  const overdue = overdueStudents();

  return `
    <div class="view-header">
      <div>
        <p class="eyebrow">${t("fees.title")}</p>
        <h2>${formatMonthLabel(monthISO())}</h2>
      </div>
    </div>

    <div class="content-grid equal">
      <section class="panel">
        ${renderPaymentForm()}
      </section>
      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>${t("dashboard.followups")}</h3>
            <p>${overdue.length} ${currentLang() === "bn" ? "বকেয়া" : "overdue"}</p>
          </div>
        </div>
        ${renderOverdueList(overdue)}
      </section>
    </div>

    <section class="panel" style="margin-top:14px">
      <div class="panel-head">
        <div>
          <h3>${t("fees.history")}</h3>
          <p>${state.payments.length} ${currentLang() === "bn" ? "রেকর্ড" : "records"}</p>
        </div>
      </div>
      ${renderPaymentHistory()}
    </section>
  `;
}

function renderPaymentForm() {
  const students = activeStudents();
  const selected = students.find((student) => student.id === ui.paymentStudentId) || students[0];
  const selectedId = selected?.id || "";

  return `
    <form id="paymentForm">
      <div class="panel-head">
        <div>
          <h3>${t("fees.form")}</h3>
          <p>${formatDate(todayISO())}</p>
        </div>
      </div>
      <div class="form-grid">
        <label class="field span-2">
          <span>${currentLang() === "bn" ? "শিক্ষার্থী" : "Student"}</span>
          <select id="paymentStudent" name="studentId" required>
            ${students.map((student) => `<option value="${student.id}" ${student.id === selectedId ? "selected" : ""}>${escapeHtml(student.name)} · ${escapeHtml(student.batch)}</option>`).join("")}
          </select>
        </label>
        ${field("paymentAmount", currentLang() === "bn" ? "অ্যামাউন্ট" : "Amount", "number", selected?.fee || 0, true)}
        ${field("paymentMonth", currentLang() === "bn" ? "মাস" : "Month", "month", monthISO(), true)}
        ${field("paymentDate", currentLang() === "bn" ? "তারিখ" : "Date", "date", todayISO(), true)}
        <label class="field">
          <span>${currentLang() === "bn" ? "মেথড" : "Method"}</span>
          <select name="method">
            <option>Cash</option>
            <option>UPI</option>
            <option>Bank transfer</option>
            <option>Cheque</option>
          </select>
        </label>
      </div>
      <div class="form-actions">
        <button class="button primary" type="submit">${t("actions.recordPayment")}</button>
      </div>
    </form>
  `;
}

function renderPaymentHistory() {
  const payments = [...state.payments].sort((a, b) => b.date.localeCompare(a.date));

  if (!payments.length) return emptyState(t("empty.noPayments"));

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>${currentLang() === "bn" ? "রসিদ" : "Receipt"}</th>
            <th>${currentLang() === "bn" ? "শিক্ষার্থী" : "Student"}</th>
            <th>${currentLang() === "bn" ? "মাস" : "Month"}</th>
            <th>${currentLang() === "bn" ? "অ্যামাউন্ট" : "Amount"}</th>
            <th>${currentLang() === "bn" ? "মেথড" : "Method"}</th>
            <th>${currentLang() === "bn" ? "তারিখ" : "Date"}</th>
          </tr>
        </thead>
        <tbody>
          ${payments.map((payment) => {
            const student = studentById(payment.studentId);
            return `
              <tr>
                <td><button class="button slim" data-view="receipts" data-receipt="${payment.id}" type="button">${escapeHtml(payment.receiptNo)}</button></td>
                <td>${escapeHtml(student?.name || "Deleted student")}</td>
                <td>${formatMonthLabel(payment.month, true)}</td>
                <td>${formatMoney(payment.amount)}</td>
                <td>${escapeHtml(payment.method)}</td>
                <td>${formatDate(payment.date)}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderOverdueList(items) {
  if (!items.length) {
    return emptyState(currentLang() === "bn" ? "সব ফি আপডেট আছে।" : "All fees are up to date.");
  }

  return `
    <div class="student-strip">
      ${items.map((item) => `
        <div class="strip-item">
          <div class="mini-stack">
            <strong>${escapeHtml(item.student.name)}</strong>
            <small>${escapeHtml(item.student.guardian)} · ${escapeHtml(item.student.phone)}</small>
          </div>
          <div class="row-actions">
            <span class="badge warn">${formatMoney(item.balance)}</span>
            <button class="button slim" data-action="quick-collect" data-id="${item.student.id}" type="button">${t("actions.markPaid")}</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderReminders() {
  const reminders = [...state.reminders].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

  return `
    <div class="view-header">
      <div>
        <p class="eyebrow">${t("reminders.title")}</p>
        <h2>${state.reminders.filter((item) => item.status !== "sent").length} ${currentLang() === "bn" ? "পেন্ডিং" : "pending"}</h2>
      </div>
      <button class="button primary" data-action="generate-reminders" type="button">${t("actions.generate")}</button>
    </div>

    <section class="panel">
      ${reminders.length ? `
        <div class="reminder-list">
          ${reminders.map(renderReminder).join("")}
        </div>
      ` : emptyState(t("empty.noReminders"))}
    </section>
  `;
}

function renderReminder(reminder) {
  const student = studentById(reminder.studentId);
  if (!student) return "";
  const message = reminderMessage(student, reminder.month, reminder.channel);

  return `
    <article class="strip-item">
      <div class="mini-stack">
        <strong>${escapeHtml(student.name)} · ${escapeHtml(reminder.channel)}</strong>
        <small>${escapeHtml(message)}</small>
      </div>
      <div class="row-actions">
        <span class="badge ${reminder.status === "sent" ? "" : "alt"}">${escapeHtml(reminder.status)}</span>
        <button class="button slim" data-action="copy-reminder" data-id="${reminder.id}" type="button">${t("actions.copy")}</button>
        <button class="button slim" data-action="mark-reminder-sent" data-id="${reminder.id}" type="button">${t("actions.sent")}</button>
      </div>
    </article>
  `;
}

function renderReceipts() {
  const payments = [...state.payments].sort((a, b) => b.date.localeCompare(a.date));
  if (!payments.length) {
    return `
      <div class="view-header">
        <div>
          <p class="eyebrow">${t("receipts.title")}</p>
          <h2>${t("page.receipts")}</h2>
        </div>
      </div>
      <section class="panel">${emptyState(t("empty.noPayments"))}</section>
    `;
  }

  if (!ui.selectedReceiptId || !payments.some((payment) => payment.id === ui.selectedReceiptId)) {
    ui.selectedReceiptId = payments[0].id;
  }

  const payment = state.payments.find((item) => item.id === ui.selectedReceiptId);

  return `
    <div class="view-header">
      <div>
        <p class="eyebrow">${t("receipts.title")}</p>
        <h2>${escapeHtml(payment.receiptNo)}</h2>
      </div>
      <button class="button primary" data-action="print-receipt" type="button">${t("actions.print")}</button>
    </div>

    <section class="panel">
      <div class="toolbar">
        <label class="field">
          <span>${currentLang() === "bn" ? "রসিদ" : "Receipt"}</span>
          <select id="receiptSelect">
            ${payments.map((item) => `<option value="${item.id}" ${item.id === payment.id ? "selected" : ""}>${escapeHtml(item.receiptNo)} · ${formatMoney(item.amount)}</option>`).join("")}
          </select>
        </label>
      </div>
      ${renderReceiptPreview(payment)}
    </section>
  `;
}

function renderReceiptPreview(payment) {
  const student = studentById(payment.studentId);
  const institute = state.institute;

  return `
    <div class="receipt" id="receiptPreview">
      <div class="receipt-head">
        <div>
          <h3 class="receipt-title">${escapeHtml(institute.name)}</h3>
          <p class="muted">${escapeHtml(institute.address || "Barddhaman, West Bengal")}</p>
        </div>
        <div class="mini-stack">
          <strong>${escapeHtml(payment.receiptNo)}</strong>
          <small>${formatDate(payment.date)}</small>
        </div>
      </div>
      <div class="receipt-meta">
        <div class="receipt-line">
          <span>${currentLang() === "bn" ? "শিক্ষার্থী" : "Student"}</span>
          <strong>${escapeHtml(student?.name || "Deleted student")}</strong>
        </div>
        <div class="receipt-line">
          <span>${currentLang() === "bn" ? "গার্ডিয়ান" : "Guardian"}</span>
          <strong>${escapeHtml(student?.guardian || "-")}</strong>
        </div>
        <div class="receipt-line">
          <span>${currentLang() === "bn" ? "ফি মাস" : "Fee month"}</span>
          <strong>${formatMonthLabel(payment.month)}</strong>
        </div>
        <div class="receipt-line">
          <span>${currentLang() === "bn" ? "পেমেন্ট মেথড" : "Payment method"}</span>
          <strong>${escapeHtml(payment.method)}</strong>
        </div>
        <div class="receipt-line receipt-total">
          <span>${currentLang() === "bn" ? "মোট পেমেন্ট" : "Total paid"}</span>
          <strong>${formatMoney(payment.amount)}</strong>
        </div>
      </div>
      <p class="muted">${currentLang() === "bn" ? "ধন্যবাদ।" : "Thank you."}</p>
    </div>
  `;
}

function renderSettings() {
  return `
    <div class="view-header">
      <div>
        <p class="eyebrow">${t("settings.title")}</p>
        <h2>${escapeHtml(state.institute.name)}</h2>
      </div>
    </div>

    <div class="content-grid">
      <section class="panel">
        <form id="settingsForm">
          <div class="panel-head">
            <div>
              <h3>${t("settings.title")}</h3>
              <p>${escapeHtml(state.institute.owner)}</p>
            </div>
          </div>
          <div class="form-grid">
            ${field("instituteName", currentLang() === "bn" ? "নাম" : "Institute name", "text", state.institute.name, true)}
            ${field("ownerName", currentLang() === "bn" ? "ওনার" : "Owner", "text", state.institute.owner, true)}
            ${field("ownerPhone", currentLang() === "bn" ? "ফোন" : "Phone", "tel", state.institute.phone, true)}
            ${field("instituteAddress", currentLang() === "bn" ? "ঠিকানা" : "Address", "text", state.institute.address, false)}
            <label class="field span-2">
              <span>${currentLang() === "bn" ? "প্ল্যান" : "Plan"}</span>
              <select name="plan">
                ${["Starter", "Professional", "Institute Plus"].map((plan) => `<option ${state.institute.plan === plan ? "selected" : ""}>${plan}</option>`).join("")}
              </select>
            </label>
          </div>
          <div class="form-actions">
            <button class="button primary" type="submit">${t("actions.save")}</button>
            <button class="button ghost" data-action="export-data" type="button">${t("actions.export")}</button>
            <button class="button danger" data-action="reset-demo" type="button">${t("actions.reset")}</button>
          </div>
        </form>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>${t("settings.pricing")}</h3>
            <p>${currentLang() === "bn" ? "লোকাল কোচিং সেন্টারের জন্য" : "For local coaching centers"}</p>
          </div>
        </div>
        <div class="pricing-grid">
          ${priceCard("Starter", 499, ["75 students", "Attendance", "Fee management", "50 messages"], false)}
          ${priceCard("Professional", 799, ["250 students", "PDF reports", "Parent view", "5 teachers"], true)}
          ${priceCard("Institute Plus", 1199, ["Unlimited students", "Multi-branch", "Priority support", "Custom branding"], false)}
        </div>
      </section>

      ${currentUser ? `
      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>${currentLang() === "bn" ? "অ্যাকাউন্ট" : "Account"}</h3>
            <p>${currentUser.email}</p>
          </div>
        </div>
        <div class="form-actions">
          <button class="button ghost" data-action="sign-out" type="button">${currentLang() === "bn" ? "সাইন আউট" : "Sign out"}</button>
        </div>
      </section>
      ` : ""}
    </div>
  `;
}

function saveStudent(form) {
  const data = new FormData(form);
  const payload = {
    name: String(data.get("studentName") || "").trim(),
    klass: String(data.get("studentClass") || "").trim(),
    subjects: String(data.get("studentSubjects") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    batch: String(data.get("studentBatchName") || "").trim(),
    guardian: String(data.get("guardianName") || "").trim(),
    phone: String(data.get("guardianPhone") || "").trim(),
    fee: Number(data.get("monthlyFee") || 0),
    dueDay: clamp(Number(data.get("dueDay") || 5), 1, 28),
    status: String(data.get("status") || "active")
  };

  if (!payload.name || !payload.klass || !payload.batch || !payload.guardian || !payload.phone) {
    toast(currentLang() === "bn" ? "প্রয়োজনীয় তথ্য দিন" : "Please fill the required fields");
    return;
  }

  if (ui.editingStudentId) {
    state.students = state.students.map((student) => {
      if (student.id !== ui.editingStudentId) return student;
      return { ...student, ...payload };
    });
  } else {
    state.students.push({
      id: createId("stu"),
      joined: todayISO(),
      ...payload
    });
  }

  ui.editingStudentId = null;
  saveState();
  toast(t("toast.saved"));
  render();
}

function deleteStudent(id) {
  const student = studentById(id);
  if (!student) return;
  if (!window.confirm(`Delete ${student.name}?`)) return;

  state.students = state.students.filter((item) => item.id !== id);
  state.attendance = state.attendance.filter((item) => item.studentId !== id);
  state.reminders = state.reminders.filter((item) => item.studentId !== id);
  ui.editingStudentId = null;
  saveState();
  toast(t("toast.deleted"));
  render();
}

function savePayment(form) {
  const data = new FormData(form);
  const studentId = String(data.get("studentId") || "");
  const student = studentById(studentId);
  if (!student) return;

  const amount = Number(data.get("paymentAmount") || 0);
  const month = String(data.get("paymentMonth") || monthISO());
  const date = String(data.get("paymentDate") || todayISO());
  const method = String(data.get("method") || "Cash");

  if (!amount || amount < 1) {
    toast(currentLang() === "bn" ? "সঠিক অ্যামাউন্ট দিন" : "Enter a valid amount");
    return;
  }

  state.payments.push({
    id: createId("pay"),
    studentId,
    amount,
    month,
    date,
    method,
    receiptNo: nextReceiptNo(date)
  });

  state.reminders = state.reminders.map((reminder) => {
    if (reminder.studentId === studentId && reminder.month === month && reminder.status !== "sent") {
      return { ...reminder, status: "paid" };
    }
    return reminder;
  });

  ui.paymentStudentId = studentId;
  ui.selectedReceiptId = state.payments[state.payments.length - 1].id;
  saveState();
  toast(t("toast.payment"));
  render();
}

function saveSettings(form) {
  const data = new FormData(form);
  state.institute = {
    ...state.institute,
    name: String(data.get("instituteName") || "").trim(),
    owner: String(data.get("ownerName") || "").trim(),
    phone: String(data.get("ownerPhone") || "").trim(),
    address: String(data.get("instituteAddress") || "").trim(),
    plan: String(data.get("plan") || "Professional")
  };
  saveState();
  toast(t("toast.saved"));
  render();
}

function upsertAttendance(studentId, date, status) {
  const existing = state.attendance.find((item) => item.studentId === studentId && item.date === date);
  if (existing) {
    existing.status = status;
    return;
  }

  state.attendance.push({
    id: createId("att"),
    studentId,
    date,
    status
  });
}

function quickCollect(studentId) {
  const student = studentById(studentId);
  if (!student) return;
  const fee = feeStatus(student);
  const amount = fee.balance || student.fee;

  state.payments.push({
    id: createId("pay"),
    studentId,
    amount,
    month: monthISO(),
    date: todayISO(),
    method: "Cash",
    receiptNo: nextReceiptNo(todayISO())
  });

  state.reminders = state.reminders.map((reminder) => {
    if (reminder.studentId === studentId && reminder.month === monthISO() && reminder.status !== "sent") {
      return { ...reminder, status: "paid" };
    }
    return reminder;
  });

  ui.selectedReceiptId = state.payments[state.payments.length - 1].id;
  saveState();
  toast(t("toast.payment"));
  render();
}

function generateReminders() {
  const existingKeys = new Set(state.reminders.map((item) => `${item.studentId}:${item.month}`));
  let added = 0;

  overdueStudents().forEach(({ student }) => {
    const key = `${student.id}:${monthISO()}`;
    if (existingKeys.has(key)) return;

    state.reminders.push({
      id: createId("rem"),
      studentId: student.id,
      month: monthISO(),
      channel: "WhatsApp",
      status: "queued",
      createdAt: todayISO()
    });
    added += 1;
  });

  saveState();
  toast(added ? t("toast.reminders") : currentLang() === "bn" ? "নতুন রিমাইন্ডার নেই" : "No new reminders");
  ui.view = "reminders";
  render();
}

async function copyReminder(id) {
  const reminder = state.reminders.find((item) => item.id === id);
  const student = reminder ? studentById(reminder.studentId) : null;
  if (!reminder || !student) return;

  const text = reminderMessage(student, reminder.month, reminder.channel);

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    toast(t("toast.copied"));
  } catch {
    toast(text);
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `edumanage-export-${todayISO()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  toast(t("toast.exported"));
}

function filteredStudents() {
  const query = ui.studentSearch.trim().toLowerCase();

  return activeStudents().filter((student) => {
    const inBatch = ui.studentBatch === "all" || student.batch === ui.studentBatch;
    const haystack = [
      student.name,
      student.klass,
      student.batch,
      student.guardian,
      student.phone,
      student.subjects.join(" ")
    ].join(" ").toLowerCase();
    return inBatch && (!query || haystack.includes(query));
  });
}

function filteredAttendanceStudents() {
  return activeStudents().filter((student) => ui.attendanceBatch === "all" || student.batch === ui.attendanceBatch);
}

function activeStudents() {
  return state.students.filter((student) => student.status !== "paused");
}

function uniqueBatches() {
  return [...new Set(activeStudents().map((student) => student.batch).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function studentById(id) {
  return state.students.find((student) => student.id === id);
}

function attendanceRecord(studentId, date) {
  return state.attendance.find((item) => item.studentId === studentId && item.date === date);
}

function studentAttendanceRate(studentId) {
  const records = state.attendance.filter((a) => a.studentId === studentId);
  if (!records.length) return { rate: 0, present: 0, total: 0 };
  const present = records.filter((a) => a.status === "present" || a.status === "late").length;
  return { rate: Math.round((present / records.length) * 100), present, total: records.length };
}

function studentPaymentStreak(student) {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  let streak = 0;
  for (const m of months) {
    if (studentMonthPaid(student.id, m) >= Number(student.fee || 0)) streak++;
    else break;
  }
  return streak;
}

function attendanceSummary(date, roster = activeStudents()) {
  const counts = { present: 0, absent: 0, late: 0, unmarked: 0 };

  roster.forEach((student) => {
    const status = attendanceRecord(student.id, date)?.status || "unmarked";
    counts[status] += 1;
  });

  return counts;
}

function monthPayments(month) {
  return state.payments.filter((payment) => payment.month === month);
}

function studentMonthPaid(studentId, month) {
  return state.payments
    .filter((payment) => payment.studentId === studentId && payment.month === month)
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
}

function feeStatus(student) {
  if (feeStatusCache.has(student.id)) {
    return feeStatusCache.get(student.id);
  }
  const month = monthISO();
  const paid = studentMonthPaid(student.id, month);
  const balance = Math.max(0, Number(student.fee || 0) - paid);
  const dueDate = dueDateISO(month, student.dueDay);

  let result;
  if (balance <= 0) result = { key: "paid", balance: 0 };
  else if (todayISO() > dueDate) result = { key: "overdue", balance };
  else {
    const dueTime = new Date(`${dueDate}T00:00:00`).getTime();
    const todayTime = new Date(`${todayISO()}T00:00:00`).getTime();
    const daysAway = Math.round((dueTime - todayTime) / 86400000);
    result = daysAway <= 3 ? { key: "dueSoon", balance } : { key: "open", balance };
  }

  feeStatusCache.set(student.id, result);
  return result;
}

function overdueStudents() {
  return activeStudents()
    .map((student) => ({ student, ...feeStatus(student) }))
    .filter((item) => item.key === "overdue")
    .sort((a, b) => b.balance - a.balance);
}

function reminderMessage(student, month, channel) {
  const balance = feeStatus(student).balance || student.fee;
  if (currentLang() === "bn") {
    return `প্রিয় ${student.guardian}, ${student.name}-এর ${formatMonthLabel(month)} মাসের ${formatMoney(balance)} ফি বকেয়া আছে। অনুগ্রহ করে ${state.institute.name}-এ পেমেন্ট করুন।`;
  }

  return `Dear ${student.guardian}, ${student.name}'s ${formatMonthLabel(month)} fee of ${formatMoney(balance)} is pending. Please pay at ${state.institute.name}.`;
}

function metric(label, value, detail) {
  return `
    <article class="metric">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(detail)}</small>
    </article>
  `;
}

function attendanceBar(labelKey, count, total, tone) {
  const percent = total ? Math.round((count / total) * 100) : 0;
  return `
    <div class="bar-row">
      <span>${t(labelKey)}</span>
      <div class="bar-track" aria-hidden="true">
        <div class="bar-fill ${tone}" style="width:${percent}%"></div>
      </div>
      <strong>${count}</strong>
    </div>
  `;
}

function field(name, label, type, value, required = false, placeholder = "") {
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <input
        name="${escapeHtml(name)}"
        type="${escapeHtml(type)}"
        value="${escapeHtml(value ?? "")}"
        placeholder="${escapeHtml(placeholder)}"
        ${required ? "required" : ""}
      >
    </label>
  `;
}

function feeBadge(fee) {
  const classes = {
    paid: "",
    overdue: "warn",
    dueSoon: "alt",
    open: "alt"
  };
  return `<span class="badge ${classes[fee.key] || ""}">${t(`status.${fee.key}`)}</span>`;
}

function statusBadge(status) {
  return `<span class="status-pill ${status}">${t(`status.${status}`)}</span>`;
}

function emptyState(text) {
  return `<div class="empty-state">${escapeHtml(text)}</div>`;
}

function priceCard(name, price, features, featured) {
  return `
    <article class="price-card ${featured ? "is-featured" : ""}">
      <h4>${escapeHtml(name)}</h4>
      <p class="price">${formatMoney(price)}</p>
      <ul>
        ${features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}
      </ul>
    </article>
  `;
}

function nextReceiptNo(date) {
  const count = state.payments.length + 1;
  return `EDU-${date.replaceAll("-", "")}-${String(count).padStart(4, "0")}`;
}

function currentLang() {
  return state.institute.locale === "bn" ? "bn" : "en";
}

function t(key) {
  return labels[currentLang()]?.[key] || labels.en[key] || key;
}

function formatMoney(value) {
  const formatted = new Intl.NumberFormat(currentLang() === "bn" ? "bn-IN" : "en-IN", {
    maximumFractionDigits: 0
  }).format(Number(value || 0));
  return `Rs. ${formatted}`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(currentLang() === "bn" ? "bn-IN" : "en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

function formatMonthLabel(value, compact = false) {
  return new Intl.DateTimeFormat(currentLang() === "bn" ? "bn-IN" : "en-IN", {
    month: compact ? "short" : "long",
    year: "numeric"
  }).format(new Date(`${value}-01T00:00:00`));
}

function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function monthISO(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 7);
}

function shiftMonth(month, offset) {
  const [year, monthIndex] = month.split("-").map(Number);
  const shifted = new Date(year, monthIndex - 1 + offset, 1);
  return `${shifted.getFullYear()}-${String(shifted.getMonth() + 1).padStart(2, "0")}`;
}

function dueDateISO(month, dueDay) {
  return `${month}-${String(clamp(Number(dueDay || 1), 1, 28)).padStart(2, "0")}`;
}

function createId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function toast(message) {
  window.clearTimeout(toastTimer);
  toastNode.textContent = message;
  toastNode.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toastNode.classList.remove("is-visible");
  }, 2600);
}

function saveState() {
  feeStatusCache.clear();
  feeCacheVersion = "";
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (currentUser && supabase) saveStateToSupabase();
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  const demo = createDemoState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
  return demo;
}

// ── Supabase sync helpers ──
async function saveStateToSupabase() {
  if (!currentUser || !supabase) return;
  const uid = currentUser.id;

  await Promise.all([
    syncUpsert("students", state.students.map(s => ({ ...s, user_id: uid }))),
    syncUpsert("attendance", state.attendance.map(a => ({ ...a, user_id: uid }))),
    syncUpsert("payments", state.payments.map(p => ({ ...p, user_id: uid }))),
    syncUpsert("reminders", state.reminders.map(r => ({ ...r, user_id: uid }))),
    supabase.from("institute_settings").upsert({ ...state.institute, user_id: uid }, { onConflict: "user_id" })
  ]);
}

async function loadStateFromSupabase() {
  if (!currentUser || !supabase) return;
  const uid = currentUser.id;

  const [stuRes, attRes, payRes, remRes, instRes] = await Promise.all([
    supabase.from("students").select("*").eq("user_id", uid),
    supabase.from("attendance").select("*").eq("user_id", uid),
    supabase.from("payments").select("*").eq("user_id", uid),
    supabase.from("reminders").select("*").eq("user_id", uid),
    supabase.from("institute_settings").select("*").eq("user_id", uid).single()
  ]);

  const institute = instRes.data || state.institute;
  const students = stuRes.data || state.students;
  const attendance = attRes.data || state.attendance;
  const payments = payRes.data || state.payments;
  const reminders = remRes.data || state.reminders;

  state = { institute, students, attendance, payments, reminders };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

async function syncUpsert(table, rows) {
  if (!rows.length) return;
  const { error } = await supabase.from(table).upsert(rows, { onConflict: "id" });
  if (error) console.warn(`Sync failed for ${table}:`, error.message);
}

// ── Auth helpers (call these from browser console or add UI) ──
async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) toast(error.message);
  return data;
}

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) toast(error.message);
  return data;
}

async function signOut() {
  await supabase.auth.signOut();
  currentUser = null;
  state = loadState();
  render();
}

function createDemoState() {
  const currentMonth = monthISO();
  const previousMonth = shiftMonth(currentMonth, -1);
  const twoMonthsAgo = shiftMonth(currentMonth, -2);
  const today = todayISO();

  const students = [
    {
      id: "stu_riya",
      name: "Riya Das",
      klass: "Class 10",
      subjects: ["Maths", "Science"],
      batch: "Morning A",
      guardian: "Mita Das",
      phone: "+91 98745 11021",
      fee: 800,
      dueDay: 2,
      status: "active",
      joined: "2026-04-08"
    },
    {
      id: "stu_arjun",
      name: "Arjun Pal",
      klass: "Class 9",
      subjects: ["English"],
      batch: "Evening B",
      guardian: "Subhash Pal",
      phone: "+91 98302 88201",
      fee: 650,
      dueDay: 5,
      status: "active",
      joined: "2026-04-12"
    },
    {
      id: "stu_tanisha",
      name: "Tanisha Mondal",
      klass: "Class 11",
      subjects: ["Physics", "Chemistry"],
      batch: "Science XI",
      guardian: "Rakesh Mondal",
      phone: "+91 90072 44510",
      fee: 1200,
      dueDay: 3,
      status: "active",
      joined: "2026-04-10"
    },
    {
      id: "stu_sayan",
      name: "Sayan Ghosh",
      klass: "Class 8",
      subjects: ["Maths"],
      batch: "Morning A",
      guardian: "Nirmal Ghosh",
      phone: "+91 98311 45077",
      fee: 600,
      dueDay: 7,
      status: "active",
      joined: "2026-04-18"
    },
    {
      id: "stu_megha",
      name: "Megha Roy",
      klass: "Class 12",
      subjects: ["Biology"],
      batch: "Science XII",
      guardian: "Anindita Roy",
      phone: "+91 80177 88120",
      fee: 1000,
      dueDay: 1,
      status: "active",
      joined: "2026-04-20"
    },
    {
      id: "stu_ayan",
      name: "Ayan Mukherjee",
      klass: "Class 10",
      subjects: ["History", "Geography"],
      batch: "Evening B",
      guardian: "Debashis Mukherjee",
      phone: "+91 97488 66231",
      fee: 700,
      dueDay: 4,
      status: "active",
      joined: "2026-04-24"
    }
  ];

  return {
    institute: {
      name: "Barddhaman Scholars",
      owner: "Sourav Roy",
      phone: "+91 98765 43210",
      address: "Barddhaman, West Bengal",
      plan: "Professional",
      locale: "en"
    },
    students,
    attendance: [
      { id: "att_1", studentId: "stu_riya", date: today, status: "present" },
      { id: "att_2", studentId: "stu_arjun", date: today, status: "late" },
      { id: "att_3", studentId: "stu_tanisha", date: today, status: "present" },
      { id: "att_4", studentId: "stu_sayan", date: today, status: "absent" },
      { id: "att_5", studentId: "stu_megha", date: today, status: "present" }
    ],
    payments: [
      { id: "pay_1", studentId: "stu_arjun", amount: 650, month: currentMonth, date: today, method: "UPI", receiptNo: nextDemoReceipt(today, 1) },
      { id: "pay_2", studentId: "stu_sayan", amount: 600, month: currentMonth, date: today, method: "Cash", receiptNo: nextDemoReceipt(today, 2) },
      { id: "pay_3", studentId: "stu_riya", amount: 800, month: previousMonth, date: `${previousMonth}-05`, method: "Cash", receiptNo: nextDemoReceipt(`${previousMonth}-05`, 3) },
      { id: "pay_4", studentId: "stu_megha", amount: 1000, month: previousMonth, date: `${previousMonth}-04`, method: "UPI", receiptNo: nextDemoReceipt(`${previousMonth}-04`, 4) },
      { id: "pay_5", studentId: "stu_tanisha", amount: 1200, month: twoMonthsAgo, date: `${twoMonthsAgo}-06`, method: "Bank transfer", receiptNo: nextDemoReceipt(`${twoMonthsAgo}-06`, 5) }
    ],
    reminders: [
      { id: "rem_1", studentId: "stu_riya", month: currentMonth, channel: "WhatsApp", status: "queued", createdAt: today },
      { id: "rem_2", studentId: "stu_megha", month: currentMonth, channel: "WhatsApp", status: "queued", createdAt: today }
    ]
  };
}

function nextDemoReceipt(date, count) {
  return `EDU-${date.replaceAll("-", "")}-${String(count).padStart(4, "0")}`;
}

/*
  SUPABASE TABLE SETUP — run this SQL in your Supabase SQL Editor:

  -- Institute settings (one row per user)
  create table if not exists public.institute_settings (
    user_id uuid references auth.users not null default auth.uid(),
    name text not null default '',
    owner text not null default '',
    phone text not null default '',
    address text not null default '',
    plan text not null default 'Professional',
    locale text not null default 'en',
    primary key (user_id)
  );
  alter table public.institute_settings enable row level security;
  create policy "Users manage own institute"
    on public.institute_settings for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

  -- Students
  create table if not exists public.students (
    id text primary key,
    user_id uuid references auth.users not null default auth.uid(),
    name text not null,
    klass text not null,
    subjects text[] not null,
    batch text not null,
    guardian text not null,
    phone text not null,
    fee integer not null,
    dueDay integer not null,
    status text not null,
    joined text not null
  );
  alter table public.students enable row level security;
  create policy "Users manage own students"
    on public.students for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

  -- Attendance
  create table if not exists public.attendance (
    id text primary key,
    user_id uuid references auth.users not null default auth.uid(),
    studentId text not null,
    date text not null,
    status text not null
  );
  alter table public.attendance enable row level security;
  create policy "Users manage own attendance"
    on public.attendance for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

  -- Payments
  create table if not exists public.payments (
    id text primary key,
    user_id uuid references auth.users not null default auth.uid(),
    studentId text not null,
    amount integer not null,
    month text not null,
    date text not null,
    method text not null,
    receiptNo text not null
  );
  alter table public.payments enable row level security;
  create policy "Users manage own payments"
    on public.payments for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

  -- Reminders
  create table if not exists public.reminders (
    id text primary key,
    user_id uuid references auth.users not null default auth.uid(),
    studentId text not null,
    month text not null,
    channel text not null,
    status text not null,
    createdAt text,
    sentAt text
  );
  alter table public.reminders enable row level security;
  create policy "Users manage own reminders"
    on public.reminders for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
*/
