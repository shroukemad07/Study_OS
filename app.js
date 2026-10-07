// =========================================================================
// SHROUK'S PERSONAL OPERATING SYSTEM - COMPLETE LOGIC (V4 REAL METRICS & PWA)
// =========================================================================

// Service Worker Registration for Offline & Mobile PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Registration Note:', err));
  });
}

// Web Audio API Synthesizer (Works 100% offline, on mobile and desktop without external files)
function playNotificationSound(type = 'chime') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'chime') {
      // Harmonic two-tone notification chime (C5 -> G5)
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.5);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now + 0.16);
      gain2.gain.setValueAtTime(0.22, now + 0.16);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.16);
      osc2.stop(now + 0.7);
    } else if (type === 'success') {
      // Crisp satisfying soft click/chime for completed checkmark
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (e) {
    console.log('Audio Context note:', e);
  }
}

// Browser Notification System
function triggerNotification(title, body) {
  playNotificationSound('chime');
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body: body,
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧬</text></svg>"
      });
    } catch (err) {
      console.log('Notification trigger error:', err);
    }
  }
}

function initShroukOS() {
  window.__shroukInitRan = true;
  try {

  // 1. STATE INITIALIZATION (V8 Real 0% Baseline - Clean Start)
  let state = INITIAL_STATE;
  try {
    const saved = localStorage.getItem("shrouk_personal_os_state_v8");
    if (saved) {
      state = JSON.parse(saved);
      // Validate complete schema integrity
      if (!state.academicCourses || !state.academicCourses[0].topicsList ||
          !state.trainings || !state.trainings[0].modulesList ||
          !state.courses || !state.courses[0].modulesList ||
          !state.personalIdeas || !state.personalIdeas[0].category ||
          !state.universitySchedule || !state.appointments) {
        state = INITIAL_STATE;
      }
    }
  } catch (e) {
    console.error("Falling back to seed", e);
    state = INITIAL_STATE;
  }

  function saveState() {
    localStorage.setItem("shrouk_personal_os_state_v8", JSON.stringify(state));
    updateGlobalHeaderMetrics();
  }

  const engine = new PersonalOSEngine(state);
  let currentActiveDay = "Wednesday";
  let currentTaskHorizon = "today"; // "today", "week", "all"
  let currentIdeasFilter = "all";

  // Quotes Library
  const quotesLibrary = [
    { text: "«النظام يتكيف مع حياتكِ، ولستِ أنتِ من تتكيفين مع النظام.»", author: "— مبدأ شروق الاستراتيجي" },
    { text: "«الرؤية بدون تنفيذ مجرد حلم، والتنفيذ بدون رؤية مضيعة للوقت؛ الرؤية مع التنفيذ قادرة على تغيير العالم.»", author: "— مثل ياباني" },
    { text: "«الانضباط هو الجسر الممتد بين الأهداف وتحقيقها؛ والتركيز معرفة ما ترفض تضييع وقتك فيه.»", author: "— جيم رون" },
    { text: "«لا تصارع الأمواج بقسوة، بل تعلم كيف توجّه أشرعتك لتستفيد من اتجاه الرياح.»", author: "— سينيكا (الفلسفة الرواقية)" },
    { text: "«كل مسألة معقدة في العلم هي في أصلها مجموعة مسائل بسيطة تنتظر من يفككها بهدوء.»", author: "— رينيه ديكارت" },
    { text: "«لا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ العَلِيِّ العَظِيم»", author: "— طمأنينة وتوكل" },
    { text: "«أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ»", author: "— سكينة القلب" }
  ];

  // 2. AMBIENT CANVAS & THEME SYSTEM
  initThemeSystem();
  initCanvasAnimation();
  initClockAndWeather();

  function initThemeSystem() {
    const savedMode = localStorage.getItem("shrouk_mode") || "dark";
    const savedColor = localStorage.getItem("shrouk_color") || "purple";
    const savedWallpaper = localStorage.getItem("shrouk_wallpaper") || "stars";

    document.body.setAttribute("data-mode", savedMode);
    document.body.setAttribute("data-color", savedColor);
    document.body.setAttribute("data-wallpaper", savedWallpaper);

    const modeIcon = document.getElementById("modeIcon");
    if (modeIcon) modeIcon.textContent = savedMode === "dark" ? "☀️" : "🌙";

    const modeBtn = document.getElementById("modeToggleBtn");
    if (modeBtn) {
      modeBtn.onclick = () => {
        const cur = document.body.getAttribute("data-mode");
        const next = cur === "dark" ? "light" : "dark";
        document.body.setAttribute("data-mode", next);
        localStorage.setItem("shrouk_mode", next);
        if (modeIcon) modeIcon.textContent = next === "dark" ? "☀️" : "🌙";
      };
    }

    const openAppBtn = document.getElementById("openAppearanceBtn");
    const drawer = document.getElementById("appearanceDrawer");
    const closeDrawerBtn = document.getElementById("closeDrawerBtn");
    const wpSelect = document.getElementById("wallpaperSelector");
    const colorSelect = document.getElementById("themeColorSelector");

    if (wpSelect) wpSelect.value = savedWallpaper;
    if (colorSelect) colorSelect.value = savedColor;

    if (openAppBtn && drawer) {
      openAppBtn.onclick = (e) => {
        e.stopPropagation();
        drawer.classList.toggle("active");
      };
    }
    if (closeDrawerBtn && drawer) {
      closeDrawerBtn.onclick = () => drawer.classList.remove("active");
    }
    document.addEventListener("click", (e) => {
      if (drawer && !drawer.contains(e.target) && e.target !== openAppBtn) {
        drawer.classList.remove("active");
      }
    });

    if (wpSelect) {
      wpSelect.onchange = (e) => {
        document.body.setAttribute("data-wallpaper", e.target.value);
        localStorage.setItem("shrouk_wallpaper", e.target.value);
      };
    }

    if (colorSelect) {
      colorSelect.onchange = (e) => {
        document.body.setAttribute("data-color", e.target.value);
        localStorage.setItem("shrouk_color", e.target.value);
      };
    }
  }

  function initClockAndWeather() {
    function update() {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "م" : "ص";
      h = h % 12 || 12;

      const clockEl = document.getElementById("clock");
      if (clockEl) clockEl.textContent = `${h}:${m} ${ampm}`;

      const greetingEl = document.getElementById("greetingBadge");
      if (greetingEl) {
        greetingEl.textContent = now.getHours() >= 12 
          ? "مساء الخير يا شروق 🌙" 
          : "صباح الخير يا شروق ☀️";
      }
    }
    update();
    setInterval(update, 30000);
  }

  function initCanvasAnimation() {
    const canvas = document.getElementById("liveCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.15
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const wp = document.body.getAttribute("data-wallpaper") || "stars";
      const isLight = document.body.getAttribute("data-mode") === "light";

      if (wp !== "none") {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = isLight 
            ? `rgba(99, 102, 241, ${p.alpha * 0.6})` 
            : `rgba(255, 255, 255, ${p.alpha * 0.75})`;
          ctx.fill();

          if (wp === "particles") {
            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
              if (dist < 110) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = isLight ? `rgba(168, 85, 247, 0.08)` : `rgba(168, 85, 247, 0.15)`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // 3. TABS SWITCHING
  const tabButtons = document.querySelectorAll(".tab-btn");
  function switchToTab(tabId) {
    tabButtons.forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-tab") === tabId);
    });
    document.querySelectorAll(".tab-view").forEach(v => {
      v.classList.toggle("active", v.id === tabId);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabButtons.forEach(btn => {
    btn.onclick = () => {
      const tabId = btn.getAttribute("data-tab");
      switchToTab(tabId);
    };
  });

  // Jump Buttons in Dashboard
  document.querySelectorAll(".jump-btn, .btn-quick-jump-fadaqa").forEach(btn => {
    btn.onclick = () => {
      const target = btn.getAttribute("data-jump");
      if (target) switchToTab(target);
    };
  });

  // 4. RENDER ALL VIEWS
  renderAllViews();

  function renderAllViews() {
    populateQuickTaskCategoriesDropdown();
    renderDashboardCockpit();
    renderAcademicCoursesView();
    renderTrainingsView();
    renderSelfCoursesView();
    renderPersonalCornerView();
    renderPlannerView(currentActiveDay);
    renderReportsView();
    updateGlobalHeaderMetrics();
  }

  function updateGlobalHeaderMetrics() {
    const todayPct = engine.calculateTodayPlanProgress();
    const txt = document.getElementById("todayProgressText");
    const bar = document.getElementById("todayProgressBar");
    if (txt) txt.textContent = `نسبة إنجاز اليوم الفعلية: ${todayPct}% (${state.tasks.filter(t=>t.completed).length} من ${state.tasks.length} مهام)`;
    if (bar) bar.style.width = `${todayPct}%`;
  }

  // Populate dynamic category selector for Task Creator
  function populateQuickTaskCategoriesDropdown() {
    const sel = document.getElementById("quickTaskCategory");
    if (!sel) return;

    let html = `<optgroup label="المقررات الأكاديمية (جامعة دمياط)">`;
    state.academicCourses.forEach(c => {
      html += `<option value="${c.id}">${c.name}</option>`;
    });
    html += `</optgroup><optgroup label="المسارات المهنية والتدريبات">`;
    state.trainings.forEach(t => {
      html += `<option value="${t.id}">${t.title}</option>`;
    });
    html += `</optgroup><optgroup label="الكورسات وتطوير الذات">`;
    state.courses.forEach(k => {
      html += `<option value="${k.id}">${k.title}</option>`;
    });
    html += `</optgroup><optgroup label="أخرى">
      <option value="personal">ركن القراءة والمشاريع الشخصية</option>
      <option value="general">تطوير عام</option>
    </optgroup>`;

    sel.innerHTML = html;
  }

  // =========================================================================
  // VIEW 1: DASHBOARD & DIRECT TASK CREATOR
  // =========================================================================

  function renderDashboardCockpit() {
    renderTodayTaskList();
    renderRadarList();
    renderRealLifePulse();
    renderUniversityScheduleTable();
    renderAppointmentsList();
    updateHeaderIdeasNotification();
  }

  // Task Horizon Filter Buttons Wiring
  document.querySelectorAll(".horizon-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".horizon-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentTaskHorizon = btn.getAttribute("data-horizon");
      renderTodayTaskList();
    };
  });

  // Direct Task Creation Form Listener
  const directTaskForm = document.getElementById("quickAddDirectTaskForm");
  if (directTaskForm) {
    directTaskForm.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById("quickTaskTitle").value.trim();
      const programId = document.getElementById("quickTaskCategory").value;
      const tier = document.getElementById("quickTaskTier").value;
      const activeOutput = (document.getElementById("quickTaskOutput")?.value.trim()) || title;
      const nextAction = (document.getElementById("quickTaskNextAction")?.value.trim()) || "البدء بالخطوة الأولى";
      const deadline = document.getElementById("quickTaskDeadline")?.value || null;

      addNewTaskToState({
        title,
        programId,
        tier,
        target: title,
        finishLine: activeOutput,
        activeOutput,
        nextAction,
        energyRequired: "Deep Focus",
        deadline,
        completed: false
      });

      directTaskForm.reset();
      showToast("تمت إضافة المهمة بنجاح إلى مركز القيادة! 🎯");
    };
  }

  // Smart Day Auto-Planner & Task Prioritizer
  const btnAutoPlan = document.getElementById("btnAutoPlanToday");
  if (btnAutoPlan) {
    btnAutoPlan.onclick = () => {
      const ranked = engine.rankTasksForDay(currentActiveDay);
      const uncompleted = ranked;
      const completed = state.tasks.filter(t => t.completed);
      state.tasks = [...uncompleted, ...completed];
      saveState();
      renderTodayTaskList();
      renderPlannerView(currentActiveDay);
      playNotificationSound('chime');

      const recs = engine.getPredictiveRecommendations(currentActiveDay);
      const topAdvice = recs[0] ? recs[0].advice : "تمت إعادة ترتيب أولويات مهام اليوم وفقاً لمواعيد التسليم وسعة الدوام!";
      showToast(`تم ترتيب أولويات مهام اليوم بذكاء! 🧭 ${topAdvice}`);
    };
  }

  function addNewTaskToState(taskObj) {
    const newTask = {
      id: "t_" + Date.now(),
      deferredCount: 0,
      ...taskObj
    };
    state.tasks.unshift(newTask);
    saveState();
    renderTodayTaskList();
    renderPlannerView(currentActiveDay);
    renderRadarList();
    return newTask;
  }

  function renderTodayTaskList() {
    const container = document.getElementById("dashboardTasksContainer");
    if (!container) return;

    let filteredTasks = state.tasks;
    if (currentTaskHorizon === "today") {
      // Must tasks or tasks due today/soon
      filteredTasks = state.tasks.filter(t => t.tier === "MUST" || t.deadline === "2026-10-09" || !t.completed);
      if (filteredTasks.length === 0) filteredTasks = state.tasks.slice(0, 5);
    } else if (currentTaskHorizon === "week") {
      // All active tasks for the week
      filteredTasks = state.tasks;
    }

    if (filteredTasks.length === 0) {
      container.innerHTML = `<div class="sub-muted">لا توجد مهام مسجلة في هذا النطاق حالياً. استخدمي النموذج أعلاه لإضافة مهمة فوراً ✨</div>`;
      return;
    }

    container.innerHTML = filteredTasks.map(task => {
      const matchCourse = state.academicCourses.find(c => c.id === task.programId);
      const matchTraining = state.trainings.find(t => t.id === task.programId);
      const matchSelfCourse = state.courses.find(k => k.id === task.programId);
      const progTitle = matchCourse?.name || matchTraining?.title || matchSelfCourse?.title || task.programId || 'عام';

      return `
        <div class="task-large-item" data-id="${task.id}">
          <div class="task-item-top">
            <label class="custom-checkbox">
              <input type="checkbox" class="task-chk-toggle" data-id="${task.id}" ${task.completed ? "checked" : ""}>
              <span class="checkmark"></span>
            </label>
            <div class="task-item-title ${task.completed ? 'completed-strike' : ''}">${escapeHtml(task.title)}</div>
            <div style="display: flex; gap: 6px;">
              <button class="btn-hour-pill btn-edit-task" data-id="${task.id}" title="تعديل">✏️</button>
              <button class="btn-hour-pill btn-del-task" data-id="${task.id}" title="حذف" style="color: #ef4444; border-color: rgba(239,68,68,0.3);">✕</button>
            </div>
          </div>
          <div class="task-badges-row">
            <span class="tag-pill ${task.tier.toLowerCase()}">${task.tier}</span>
            <span class="tag-pill prog">${escapeHtml(progTitle)}</span>
            ${task.deadline ? `<span class="tag-pill prog">📅 ${task.deadline}</span>` : ""}
          </div>
          <div class="task-item-output">
            <strong>المخرج الملموس:</strong> ${escapeHtml(task.activeOutput || "")} | <strong>الخطوة:</strong> ${escapeHtml(task.nextAction || "")}
          </div>
        </div>
      `;
    }).join("");

    // Toggle Task
    document.querySelectorAll(".task-chk-toggle").forEach(chk => {
      chk.onchange = (e) => {
        const id = e.target.getAttribute("data-id");
        const t = state.tasks.find(x => x.id === id);
        if (t) {
          t.completed = e.target.checked;
          saveState();
          renderTodayTaskList();
          renderPlannerView(currentActiveDay);
          playNotificationSound(t.completed ? "success" : "chime");
          showToast(t.completed ? "مبروك إنجاز المهمة! 🎉" : "تم إلغاء الإنجاز");
        }
      };
    });

    // Delete Task
    document.querySelectorAll(".btn-del-task").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        if (confirm("هل ترغبين في حذف هذه المهمة؟")) {
          state.tasks = state.tasks.filter(x => x.id !== id);
          saveState();
          renderTodayTaskList();
          renderPlannerView(currentActiveDay);
          showToast("تم حذف المهمة ✓");
        }
      };
    });

    // Edit Task
    document.querySelectorAll(".btn-edit-task").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const t = state.tasks.find(x => x.id === id);
        if (t) {
          const newTitle = prompt("تعديل عنوان المهمة:", t.title);
          if (newTitle !== null && newTitle.trim() !== "") {
            t.title = newTitle.trim();
            const newOutput = prompt("تعديل المخرج الملموس (Active Output):", t.activeOutput);
            if (newOutput !== null) t.activeOutput = newOutput.trim();
            saveState();
            renderTodayTaskList();
            renderPlannerView(currentActiveDay);
            showToast("تم تحديث المهمة بنجاح ✓");
          }
        }
      };
    });
  }

  function renderRadarList() {
    const container = document.getElementById("dashboardRadarContainer");
    if (!container) return;

    const radar = engine.getDeadlineRadar();
    const criticalList = [...radar.today, ...radar.next3Days];
    const attentionList = radar.next7Days;

    container.innerHTML = `
      ${criticalList.map(t => `
        <div class="radar-card-item critical">
          <div>
            <strong>${escapeHtml(t.title)}</strong>
            <div class="sub-muted">تاريخ التسليم: ${t.deadline} (خلال ${t.diffDays <= 0 ? 'اليوم' : t.diffDays + ' أيام'})</div>
          </div>
          <span class="tag-pill must">حرج 🔴</span>
        </div>
      `).join("")}

      ${attentionList.map(t => `
        <div class="radar-card-item attention">
          <div>
            <strong>${escapeHtml(t.title)}</strong>
            <div class="sub-muted">تاريخ التسليم: ${t.deadline}</div>
          </div>
          <span class="tag-pill should">انتباه 🟡</span>
        </div>
      `).join("")}

      ${criticalList.length === 0 && attentionList.length === 0 ? '<div class="sub-muted">لا توجد تسليمات حرجة حالياً 👍</div>' : ''}
    `;
  }

  // SHOW REAL PROGRESS FOR ALL SUBJECTS, TRAININGS & COURSES (100% REAL METRICS)
  function renderRealLifePulse() {
    const container = document.getElementById("dashboardRealPulse");
    if (!container) return;

    // 1. Overall Academic Completion
    let totalTopics = 0;
    let completedTopics = 0;
    state.academicCourses.forEach(c => {
      totalTopics += c.topicsList ? c.topicsList.length : (c.topicsTotal || 1);
      completedTopics += c.topicsList ? c.topicsList.filter(t => t.completed).length : (c.topicsCompleted || 0);
    });
    const overallAcademicPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    let html = `
      <div class="pulse-card mb-4" style="border: 2px solid var(--accent-primary);">
        <div class="pulse-head">
          <h4>🎓 المعدل العام للمقررات الأكاديمية (GPA +3.0)</h4>
          <span class="tag-pill energy">${overallAcademicPct}% إنجاز شامل</span>
        </div>
        <div class="pulse-bar"><div class="fill" style="width: ${overallAcademicPct}%;"></div></div>
        <div class="pulse-meta"><span>${completedTopics} من أصل ${totalTopics} موضوعات منجزة في جميع المواد</span></div>
      </div>

      <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 8px;">متابعة تقدم كل مادة على حدة (All Subjects):</h4>
      <div class="all-subjects-pulse-grid mb-4">
    `;

    state.academicCourses.forEach(c => {
      const pct = engine.calculateCourseProgress(c);
      const total = c.topicsList ? c.topicsList.length : (c.topicsTotal || 0);
      const comp = c.topicsList ? c.topicsList.filter(t => t.completed).length : (c.topicsCompleted || 0);

      html += `
        <div class="subject-mini-pulse-card ${c.id === 'genetics' ? 'genetics-highlight' : ''}">
          <div class="subject-mini-head">
            <span>${escapeHtml(c.name)}</span>
            <span style="color: var(--accent-primary); font-weight: 800;">${pct}%</span>
          </div>
          <div class="pulse-bar" style="height: 6px;"><div class="fill" style="width: ${pct}%;"></div></div>
          <div class="sub-muted" style="font-size: 0.75rem; margin-top: 4px;">${comp} / ${total} موضوعات</div>
        </div>
      `;
    });

    html += `</div>`;

    // 2. Professional Trainings Pulse
    html += `
      <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 8px; margin-top: 18px;">متابعة المسارات والتدريبات المهنية (Trainings Pulse):</h4>
      <div class="all-subjects-pulse-grid mb-4">
    `;
    state.trainings.forEach(t => {
      const pct = engine.calculateTrainingProgress(t);
      const total = t.modulesList ? t.modulesList.length : (t.tasksTotal || 0);
      const comp = t.modulesList ? t.modulesList.filter(m => m.completed).length : (t.tasksCompleted || 0);

      html += `
        <div class="subject-mini-pulse-card ${t.id === 'fadaqa' ? 'fadaqa-highlight' : ''}">
          <div class="subject-mini-head">
            <span>${escapeHtml(t.title)}</span>
            <span style="color: #10b981; font-weight: 800;">${pct}%</span>
          </div>
          <div class="pulse-bar" style="height: 6px;"><div class="fill" style="width: ${pct}%; background: #10b981;"></div></div>
          <div class="sub-muted" style="font-size: 0.75rem; margin-top: 4px;">${comp} / ${total} مهام منجزة</div>
        </div>
      `;
    });
    html += `</div>`;

    // 3. Courses & Self-Development Pulse
    html += `
      <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 8px; margin-top: 18px;">متابعة الكورسات والمنح وتطوير الذات (Courses Pulse):</h4>
      <div class="all-subjects-pulse-grid">
    `;
    state.courses.forEach(c => {
      const pct = engine.calculateCourseItemProgress(c);
      const total = c.modulesList ? c.modulesList.length : (c.modulesTotal || 0);
      const comp = c.modulesList ? c.modulesList.filter(m => m.completed).length : (c.modulesCompleted || 0);

      html += `
        <div class="subject-mini-pulse-card ${c.id === 'berlitz' ? 'genetics-highlight' : ''}">
          <div class="subject-mini-head">
            <span>${escapeHtml(c.title)}</span>
            <span style="color: #38bdf8; font-weight: 800;">${pct}%</span>
          </div>
          <div class="pulse-bar" style="height: 6px;"><div class="fill" style="width: ${pct}%; background: #38bdf8;"></div></div>
          <div class="sub-muted" style="font-size: 0.75rem; margin-top: 4px;">${comp} / ${total} وحدات منجزة</div>
        </div>
      `;
    });
    html += `</div>`;

    container.innerHTML = html;
  }

  // =========================================================================
  // DASHBOARD EXTENSION: UNIVERSITY LECTURES & PRACTICAL SCHEDULE TABLE
  // =========================================================================
  function renderUniversityScheduleTable() {
    const container = document.getElementById("uniScheduleTableContainer");
    if (!container) return;

    const list = state.universitySchedule || [];
    if (list.length === 0) {
      container.innerHTML = `<div class="sub-muted">لا يوجد جدول محاضرات مسجل حالياً.</div>`;
      return;
    }

    container.innerHTML = `
      <table class="uni-schedule-table">
        <thead>
          <tr>
            <th>اليوم</th>
            <th>الساعات والدوام</th>
            <th>المقرر الدراسي والمحتوى</th>
            <th>نوع الحضور</th>
            <th>المكان / القاعة</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(item => `
            <tr>
              <td><span class="uni-day-badge">${escapeHtml(item.dayAr)}</span></td>
              <td><span class="uni-time-pill">${escapeHtml(item.start)} - ${escapeHtml(item.end)}</span></td>
              <td>
                <strong>${escapeHtml(item.subject)}</strong>
                ${item.notes ? `<div class="sub-muted" style="font-size: 0.76rem; margin-top: 2px;">${escapeHtml(item.notes)}</div>` : ''}
              </td>
              <td><span class="tag-pill ${item.type.includes('No') ? 'could' : item.type.includes('Practical') || item.type.includes('Lab') ? 'energy' : 'prog'}">${escapeHtml(item.type)}</span></td>
              <td class="sub-muted">${escapeHtml(item.location)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  // =========================================================================
  // DASHBOARD EXTENSION: FIXED APPOINTMENTS & COMMITMENTS CALENDAR
  // =========================================================================
  function renderAppointmentsList() {
    const container = document.getElementById("appointmentsListContainer");
    if (!container) return;

    const list = state.appointments || [];
    if (list.length === 0) {
      container.innerHTML = `<div class="sub-muted">لا توجد مواعيد ثابتة مسجلة حالياً. يمكنكِ إضافة موعد جديد باستخدام الزر أعلاه 📅</div>`;
      return;
    }

    container.innerHTML = list.map(apt => `
      <div class="appointment-item-card">
        <div>
          <div class="apt-title">${escapeHtml(apt.title)}</div>
          <div class="apt-meta-row">
            <span>📅 ${escapeHtml(apt.date)}</span>
            <span>⏱️ ${escapeHtml(apt.time)}</span>
            <span>📍 ${escapeHtml(apt.location || 'أونلاين')}</span>
            <span class="sub-muted">• ${escapeHtml(apt.type || 'موعد')}</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="${apt.urgency === 'High' ? 'apt-badge-high' : 'apt-badge-med'}">${apt.urgency === 'High' ? 'حرج 🔴' : 'مجدول 🟢'}</span>
          <button class="btn-hour-pill btn-del-appointment" data-id="${apt.id}" style="color: #ef4444;" title="حذف الموعد">✕</button>
        </div>
      </div>
    `).join("");

    // Wire delete appointment
    document.querySelectorAll(".btn-del-appointment").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        if (confirm("هل ترغبين في حذف هذا الموعد؟")) {
          state.appointments = state.appointments.filter(a => a.id !== id);
          saveState();
          renderAppointmentsList();
          showToast("تم حذف الموعد بنجاح ✓");
        }
      };
    });
  }

  // Add New Appointment Button Wiring
  const btnAddAppointment = document.getElementById("btnAddNewAppointment");
  if (btnAddAppointment) {
    btnAddAppointment.onclick = () => {
      const title = prompt("عنوان الموعد أو الالتزام الجديد:", "ورشة عمل أو تسليم تكليف");
      if (title && title.trim()) {
        const date = prompt("التاريخ (YYYY-MM-DD):", new Date().toISOString().split("T")[0]) || new Date().toISOString().split("T")[0];
        const time = prompt("الوقت (مثال: 08:00 م أو 20:00 - 23:00):", "20:00");
        const location = prompt("المكان أو المنصة:", "Google Classroom / Online") || "Online";

        if (!state.appointments) state.appointments = [];
        state.appointments.push({
          id: "apt_" + Date.now(),
          title: title.trim(),
          date: date.trim(),
          time: time.trim(),
          type: "موعد مخصص",
          location: location.trim(),
          urgency: "Medium"
        });

        saveState();
        renderAppointmentsList();
        playNotificationSound('chime');
        showToast("تمت إضافة الموعد بنجاح إلى جدول المواعيد! 📅✨");
      }
    };
  }

  // Update Header Ideas Notification Count
  function updateHeaderIdeasNotification() {
    const badge = document.getElementById("headerIdeasCount");
    if (badge && state.personalIdeas) {
      badge.textContent = state.personalIdeas.length;
    }
  }

  // Header Ideas Top Button Navigation Wiring
  const openIdeasTopBtn = document.getElementById("openIdeasBankTopBtn");
  if (openIdeasTopBtn) {
    openIdeasTopBtn.onclick = () => {
      // Switch tab to personal
      const personalTabBtn = document.querySelector('.tab-btn[data-tab="tab-personal"]');
      if (personalTabBtn) {
        personalTabBtn.click();
        // Scroll smoothly to ideas section
        const ideasSection = document.getElementById("ideasBankGrid");
        if (ideasSection) {
          ideasSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        showToast("مرحباً بكِ في بنك الأفكار والمشاريع المتجدد! 💡");
      }
    };
  }

  // =========================================================================
  // VIEW 2: ACADEMIC COURSES (WITH TOPICS CHECKLIST & ADDING NEW SUBJECTS)
  // =========================================================================
  function renderAcademicCoursesView() {
    const grid = document.getElementById("academicCoursesGrid");
    if (!grid) return;

    grid.innerHTML = state.academicCourses.map(c => {
      const isGenetics = c.id === "genetics";
      const pct = engine.calculateCourseProgress(c);
      const topics = c.topicsList || [];
      const compCount = topics.filter(t => t.completed).length;

      return `
        <div class="course-large-card">
          <div class="course-top-row">
            <div>
              <span class="course-code">${c.code}</span>
              <h3 class="course-name">${escapeHtml(c.name)}</h3>
            </div>
            <div style="text-align: left;">
              <span class="course-target-tag">الهدف: ${c.targetGrade}</span>
              <div style="margin-top: 6px; display: flex; gap: 6px;">
                <button class="btn-hour-pill btn-quick-task-course" data-course-id="${c.id}" data-course-name="${escapeHtml(c.name)}">+ مهمة للمادة</button>
                <button class="btn-hour-pill btn-del-course" data-id="${c.id}" style="color: #ef4444;" title="حذف المادة">✕</button>
              </div>
            </div>
          </div>

          <div class="book-progress-box">
            <span>نسبة إنجاز موضوعات المادة:</span>
            <strong style="color: var(--accent-primary);">${pct}% (${compCount} من أصل ${topics.length} موضوعات)</strong>
          </div>
          <div class="pulse-bar"><div class="fill" style="width: ${pct}%;"></div></div>

          <!-- Interactive Topics Checklist (Click to complete in real-time) -->
          <div style="margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 0.86rem; font-weight: 700; color: var(--text-muted);">قائمة موضوعات ومحاضرات المقرر (اضغطي لتحديد المنجز):</span>
              <button class="btn-add-topic-sm" data-course-id="${c.id}">+ إضافة موضوع للمادة</button>
            </div>
            <div class="subject-topics-checklist">
              ${topics.map(t => `
                <div class="topic-check-row ${t.completed ? 'completed' : ''}">
                  <input type="checkbox" class="topic-chk" data-course-id="${c.id}" data-topic-id="${t.id}" ${t.completed ? "checked" : ""}>
                  <label class="topic-name-label">${escapeHtml(t.name)}</label>
                  <button class="btn-del-topic" data-course-id="${c.id}" data-topic-id="${t.id}" style="background: none; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer;">✕</button>
                </div>
              `).join("") || '<div class="sub-muted">لا توجد موضوعات مسجلة بعد. أضيفي أول موضوع!</div>'}
            </div>
          </div>

          <div class="components-row-large">
            ${c.components && c.components.lecture ? `
              <div class="comp-pill">
                <strong>📖 المحاضرة (${c.components.lecture.hours} س)</strong>
                <span>${c.components.lecture.prepStyle}</span>
              </div>
            ` : ''}
            ${c.components && c.components.practical ? `
              <div class="comp-pill">
                <strong>🧪 العملي (${c.components.practical.hours} س)</strong>
                <span>${c.components.practical.prepStyle}</span>
              </div>
            ` : ''}
            ${c.components && c.components.tutorial ? `
              <div class="comp-pill">
                <strong>✏️ السكشن (${c.components.tutorial.hours} س)</strong>
                <span>${c.components.tutorial.prepStyle}</span>
              </div>
            ` : ''}
          </div>

          <div style="display: flex; gap: 10px;">
            <button class="btn-hour-pill btn-recall-trigger" data-course="${escapeHtml(c.name)}">
              ⚡ توليد أسئلة استرجاع نشط لـ ${escapeHtml(c.name)}
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Wire Topics Checklist toggling (Real-time live progress recalculation!)
    document.querySelectorAll(".topic-chk").forEach(chk => {
      chk.onchange = (e) => {
        const courseId = e.target.getAttribute("data-course-id");
        const topicId = e.target.getAttribute("data-topic-id");
        const course = state.academicCourses.find(x => x.id === courseId);
        if (course && course.topicsList) {
          const topic = course.topicsList.find(t => t.id === topicId);
          if (topic) {
            topic.completed = e.target.checked;
            saveState();
            renderAcademicCoursesView();
            renderRealLifePulse();
            playNotificationSound(e.target.checked ? 'success' : 'chime');
            showToast(`تم تحديث إنجاز: "${topic.name}" بنجاح! 🎯`);
          }
        }
      };
    });

    // Delete a topic
    document.querySelectorAll(".btn-del-topic").forEach(b => {
      b.onclick = () => {
        const courseId = b.getAttribute("data-course-id");
        const topicId = b.getAttribute("data-topic-id");
        const course = state.academicCourses.find(x => x.id === courseId);
        if (course && course.topicsList) {
          course.topicsList = course.topicsList.filter(t => t.id !== topicId);
          saveState();
          renderAcademicCoursesView();
          renderRealLifePulse();
        }
      };
    });

    // Add Topic to a course
    document.querySelectorAll(".btn-add-topic-sm").forEach(b => {
      b.onclick = () => {
        const courseId = b.getAttribute("data-course-id");
        const course = state.academicCourses.find(x => x.id === courseId);
        if (course) {
          const topicName = prompt(`اسم الموضوع أو المحاضرة الجديدة لمقرر "${course.name}":`, "المحاضرة القادمة");
          if (topicName && topicName.trim()) {
            if (!course.topicsList) course.topicsList = [];
            course.topicsList.push({
              id: "tp_" + Date.now(),
              name: topicName.trim(),
              completed: false
            });
            saveState();
            renderAcademicCoursesView();
            renderRealLifePulse();
            showToast("تمت إضافة الموضوع للمقرر بنجاح! 📖");
          }
        }
      };
    });

    // Quick Task for Course
    document.querySelectorAll(".btn-quick-task-course").forEach(b => {
      b.onclick = () => {
        const cId = b.getAttribute("data-course-id");
        const cName = b.getAttribute("data-course-name");
        const taskTitle = prompt(`عنوان المهمة لمقرر "${cName}":`, `استذكار وحل مسائل ${cName}`);
        if (taskTitle && taskTitle.trim()) {
          addNewTaskToState({
            title: taskTitle.trim(),
            programId: cId,
            tier: "MUST",
            target: taskTitle.trim(),
            finishLine: "حل 10 مسائل / استرجاع المحاضرة",
            activeOutput: "ملخص المسائل المكتوب",
            nextAction: "البدء بالمسألة الأولى",
            energyRequired: "Deep Focus",
            deadline: null,
            completed: false
          });
          showToast(`تمت إضافة المهمة لـ ${cName} بنجاح! 🚀`);
        }
      };
    });

    // Delete Course
    document.querySelectorAll(".btn-del-course").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-id");
        const c = state.academicCourses.find(x => x.id === id);
        if (c && confirm(`هل ترغبين في حذف مادة "${c.name}"؟`)) {
          state.academicCourses = state.academicCourses.filter(x => x.id !== id);
          saveState();
          renderAcademicCoursesView();
          renderRealLifePulse();
          populateQuickTaskCategoriesDropdown();
          showToast("تم حذف المادة بنجاح ✓");
        }
      };
    });

    // Recall Trigger
    document.querySelectorAll(".btn-recall-trigger").forEach(b => {
      b.onclick = () => {
        const cName = b.getAttribute("data-course");
        openAiWithPrompt(`أريد بناء جلسة استرجاع نشط (Active Recall) لـ ${cName}. اقترح لي 5 أسئلة استرجاع عميقة بدون خيارات للمساعدة في الوصول لهدف GPA +3.0.`);
      };
    });
  }

  // ADD NEW ACADEMIC SUBJECT BUTTON (USER CAN ADD NEW SUBJECTS EASILY)
  const btnAddSubject = document.getElementById("btnAddNewAcademicSubject");
  if (btnAddSubject) {
    btnAddSubject.onclick = () => {
      const name = prompt("اسم المادة الدراسية الجديدة (مثال: بيولوجيا جزيئية / فسيولوجي نبات):", "مادة جديدة");
      if (name && name.trim()) {
        const code = prompt("كود المادة (اختياري، مثلاً BIO-305):", "BIO-305") || "GEN-100";
        const targetGrade = prompt("الهدف التقديري (A+ / A / B+):", "A+") || "A";
        state.academicCourses.push({
          id: "subj_" + Date.now(),
          name: name.trim(),
          code: code.trim(),
          priority: "مقرر أساسي",
          targetGrade: targetGrade.trim(),
          components: {
            lecture: { hours: 2, prepStyle: "فهم واسترجاع نشط", reviewCycle: "تلخيص المسارات" },
            practical: { hours: 2, prepStyle: "تجارب المعمل والبروتوكول", reviewCycle: "ملاحظات الفحص" }
          },
          topicsList: [
            { id: "tp_1", name: "مقدمة ومفاهيم المقرر الأولى", completed: true },
            { id: "tp_2", name: "المحاضرة الثانية وتطبيقاتها", completed: false }
          ]
        });
        saveState();
        renderAcademicCoursesView();
        renderRealLifePulse();
        populateQuickTaskCategoriesDropdown();
        showToast(`تمت إضافة مادة "${name}" بنجاح! 🎓`);
      }
    };
  }

  // =========================================================================
  // VIEW 3: PROFESSIONAL TRAININGS & TRACKS (WITH CHECKLISTS & CREATION)
  // =========================================================================
  function renderTrainingsView() {
    const grid = document.getElementById("trainingsGrid");
    if (!grid) return;

    grid.innerHTML = state.trainings.map(t => {
      const isFadaqa = t.id === "fadaqa";
      const pct = engine.calculateTrainingProgress(t);
      const modules = t.modulesList || [];
      const compCount = modules.filter(m => m.completed).length;

      return `
        <div class="program-card-large ${isFadaqa ? 'fadaqa-card' : ''}">
          <div class="prog-head-row">
            <div>
              <span class="prog-badge-tag ${isFadaqa ? 'urgent' : 'active'}">${t.lifecycle} • ${t.health}</span>
              <h3 class="prog-title-large">${escapeHtml(t.title)}</h3>
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button class="btn-hour-pill btn-log-training-hr" data-id="${t.id}" data-h="0.5">+30د</button>
              <button class="btn-hour-pill btn-log-training-hr" data-id="${t.id}" data-h="1.0">+1س</button>
              <button class="btn-hour-pill btn-del-training" data-id="${t.id}" style="color: #ef4444;" title="حذف المسار">✕</button>
            </div>
          </div>

          <div class="book-progress-box">
            <span>نسبة التقدم المحسوبة (نسبة حقيقية 100%):</span>
            <strong style="color: var(--accent-primary);">${pct}% (${compCount} من أصل ${modules.length} مهام/وحدات منجزة)</strong>
          </div>
          <div class="pulse-bar"><div class="fill" style="width: ${pct}%;"></div></div>

          <!-- Interactive Modules Checklist (Click to complete in real-time) -->
          <div style="margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 0.86rem; font-weight: 700; color: var(--text-muted);">قائمة المهام والتكليفات (اضغطي لتحديد المنجز):</span>
              <button class="btn-add-training-module-sm" data-training-id="${t.id}">+ إضافة تكليف للمسار</button>
            </div>
            <div class="subject-topics-checklist">
              ${modules.map(m => `
                <div class="topic-check-row ${m.completed ? 'completed' : ''}">
                  <input type="checkbox" class="training-mod-chk" data-training-id="${t.id}" data-mod-id="${m.id}" ${m.completed ? "checked" : ""}>
                  <label class="topic-name-label">${escapeHtml(m.name)}</label>
                  <button class="btn-del-training-mod" data-training-id="${t.id}" data-mod-id="${m.id}" style="background: none; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer;" title="حذف">✕</button>
                </div>
              `).join("") || '<div class="sub-muted">لا توجد تكليفات مسجلة بعد. أضيفي أول تكليف!</div>'}
            </div>
          </div>

          <div class="prog-hours-stat">
            <span>المستهدف الأسبوعي: ${t.weeklyTargetHours} س</span>
            <span>المنجز: <strong>${t.actualHoursThisWeek} س</strong></span>
            <span>التصنيف: ${escapeHtml(t.category)}</span>
          </div>

          ${isFadaqa ? `
            <div class="weak-topics-alert" style="color: #ef4444; border-color: rgba(239,68,68,0.4); background: rgba(239,68,68,0.06);">
              🚨 <strong>تسليم عاجل: الجمعة 9 أكتوبر 2026</strong> — ${escapeHtml(t.urgentTask || 'تسليم الـ PRD في Google Classroom')}
            </div>
          ` : ''}

          <div class="task-item-output">
            <strong>👉 الخطوة القادمة:</strong> ${escapeHtml(t.nextAction)}
          </div>
        </div>
      `;
    }).join("");

    // Wire Training Module toggles (Real-time live progress recalculation!)
    document.querySelectorAll(".training-mod-chk").forEach(chk => {
      chk.onchange = (e) => {
        const trId = e.target.getAttribute("data-training-id");
        const modId = e.target.getAttribute("data-mod-id");
        const training = state.trainings.find(x => x.id === trId);
        if (training && training.modulesList) {
          const mod = training.modulesList.find(m => m.id === modId);
          if (mod) {
            mod.completed = e.target.checked;
            training.tasksCompleted = training.modulesList.filter(m => m.completed).length;
            training.tasksTotal = training.modulesList.length;
            saveState();
            renderTrainingsView();
            renderRealLifePulse();
            playNotificationSound(e.target.checked ? 'success' : 'chime');
            showToast(`تم تحديث إنجاز: "${mod.name}" بنجاح! 🎯`);
          }
        }
      };
    });

    // Delete a training module
    document.querySelectorAll(".btn-del-training-mod").forEach(b => {
      b.onclick = () => {
        const trId = b.getAttribute("data-training-id");
        const modId = b.getAttribute("data-mod-id");
        const training = state.trainings.find(x => x.id === trId);
        if (training && training.modulesList) {
          training.modulesList = training.modulesList.filter(m => m.id !== modId);
          training.tasksCompleted = training.modulesList.filter(m => m.completed).length;
          training.tasksTotal = training.modulesList.length;
          saveState();
          renderTrainingsView();
          renderRealLifePulse();
        }
      };
    });

    // Add module to training
    document.querySelectorAll(".btn-add-training-module-sm").forEach(b => {
      b.onclick = () => {
        const trId = b.getAttribute("data-training-id");
        const training = state.trainings.find(x => x.id === trId);
        if (training) {
          const modName = prompt(`اسم التكليف أو المحاضرة الجديدة لمسار "${training.title}":`, "تكليف جديد");
          if (modName && modName.trim()) {
            if (!training.modulesList) training.modulesList = [];
            training.modulesList.push({
              id: "trm_" + Date.now(),
              name: modName.trim(),
              completed: false
            });
            training.tasksTotal = training.modulesList.length;
            saveState();
            renderTrainingsView();
            renderRealLifePulse();
            showToast(`تمت إضافة التكليف لمسار "${training.title}" بنجاح! 💼`);
          }
        }
      };
    });

    // Log hours to training
    document.querySelectorAll(".btn-log-training-hr").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-id");
        const hours = parseFloat(b.getAttribute("data-h"));
        const item = state.trainings.find(x => x.id === id);
        if (item) {
          item.actualHoursThisWeek = Math.round((item.actualHoursThisWeek + hours) * 10) / 10;
          saveState();
          renderTrainingsView();
          renderRealLifePulse();
          playNotificationSound('success');
          showToast(`تم تسجيل ${hours} ساعة بنجاح لـ ${item.title}! 🎉`);
        }
      };
    });

    // Delete training
    document.querySelectorAll(".btn-del-training").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-id");
        const t = state.trainings.find(x => x.id === id);
        if (t && confirm(`هل ترغبين في حذف هذا المسار التدريبي: "${t.title}"؟`)) {
          state.trainings = state.trainings.filter(x => x.id !== id);
          saveState();
          renderTrainingsView();
          renderRealLifePulse();
          populateQuickTaskCategoriesDropdown();
          showToast("تم حذف المسار بنجاح ✓");
        }
      };
    });
  }

  // ADD NEW TRAINING BUTTON
  const btnAddTraining = document.getElementById("btnAddNewTraining");
  if (btnAddTraining) {
    btnAddTraining.onclick = () => {
      const title = prompt("اسم المسار المهني أو التدريب الجديد:", "مسار جديد");
      if (title && title.trim()) {
        const category = prompt("التصنيف أو الجهة المنظمة:", "تدريب مهني") || "تطوير مهني";
        const weeklyHours = parseFloat(prompt("المستهدف الأسبوعي بالساعات:", "3.0") || "3.0");
        state.trainings.push({
          id: "tr_" + Date.now(),
          title: title.trim(),
          category: category.trim(),
          lifecycle: "Active",
          health: "Healthy",
          weeklyTargetHours: weeklyHours,
          actualHoursThisWeek: 0,
          tasksTotal: 2,
          tasksCompleted: 0,
          nextAction: "البدء بالوحدة الأولى للمسار",
          notes: "أضيف يدوياً بواسطة شروق",
          modulesList: [
            { id: "trm_1", name: "المحاضرة / التكليف الأول في المسار", completed: false },
            { id: "trm_2", name: "التطبيق العملي والتسليم الأسبوعي", completed: false }
          ]
        });
        saveState();
        renderTrainingsView();
        renderRealLifePulse();
        populateQuickTaskCategoriesDropdown();
        showToast(`تمت إضافة مسار "${title}" بنجاح! 💼`);
      }
    };
  }

  // =========================================================================
  // VIEW 4: COURSES & SELF-DEVELOPMENT (WITH CHECKLISTS & CREATION)
  // =========================================================================
  function renderSelfCoursesView() {
    const grid = document.getElementById("selfCoursesGrid");
    if (!grid) return;

    grid.innerHTML = state.courses.map(c => {
      const isBerlitz = c.id === "berlitz";
      const pct = engine.calculateCourseItemProgress(c);
      const modules = c.modulesList || [];
      const compCount = modules.filter(m => m.completed).length;

      return `
        <div class="program-card-large ${isBerlitz ? 'berlitz-card' : ''}">
          <div class="prog-head-row">
            <div>
              <span class="prog-badge-tag active">${c.lifecycle} • ${c.health}</span>
              <h3 class="prog-title-large">${escapeHtml(c.title)}</h3>
              <span class="sub-muted" style="display: block; margin-top: 2px;">المنصة / الجهة: ${escapeHtml(c.platform || 'أونلاين')}</span>
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button class="btn-hour-pill btn-log-course-hr" data-id="${c.id}" data-h="0.5">+30د</button>
              <button class="btn-hour-pill btn-log-course-hr" data-id="${c.id}" data-h="1.0">+1س</button>
              <button class="btn-hour-pill btn-del-course-item" data-id="${c.id}" style="color: #ef4444;" title="حذف الكورس">✕</button>
            </div>
          </div>

          <div class="book-progress-box">
            <span>نسبة إنجاز الوحدات (نسبة حقيقية 100%):</span>
            <strong style="color: var(--accent-primary);">${pct}% (${compCount} من أصل ${modules.length} وحدات/دروس منجزة)</strong>
          </div>
          <div class="pulse-bar"><div class="fill" style="width: ${pct}%;"></div></div>

          <!-- Interactive Course Modules Checklist (Click to complete in real-time) -->
          <div style="margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 0.86rem; font-weight: 700; color: var(--text-muted);">قائمة الدروس والوحدات (اضغطي لتحديد المنجز):</span>
              <button class="btn-add-course-module-sm" data-course-id="${c.id}">+ إضافة وحدة للكورس</button>
            </div>
            <div class="subject-topics-checklist">
              ${modules.map(m => `
                <div class="topic-check-row ${m.completed ? 'completed' : ''}">
                  <input type="checkbox" class="course-mod-chk" data-course-id="${c.id}" data-mod-id="${m.id}" ${m.completed ? "checked" : ""}>
                  <label class="topic-name-label">${escapeHtml(m.name)}</label>
                  <button class="btn-del-course-mod" data-course-id="${c.id}" data-mod-id="${m.id}" style="background: none; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer;" title="حذف">✕</button>
                </div>
              `).join("") || '<div class="sub-muted">لا توجد وحدات مسجلة بعد. أضيفي أول وحدة!</div>'}
            </div>
          </div>

          <div class="prog-hours-stat">
            <span>المستهدف: ${c.weeklyTargetHours} س</span>
            <span>المنجز: <strong>${c.actualHoursThisWeek} س</strong></span>
            ${c.streakDays ? `<span>🔥 استمرار: ${c.streakDays} أيام</span>` : ''}
          </div>

          ${c.accountStatus ? `
            <div class="weak-topics-alert" style="color: #14b8a6; border-color: rgba(20,184,166,0.4); background: rgba(20,184,166,0.06);">
              ℹ️ <strong>حالة الحساب:</strong> ${escapeHtml(c.accountStatus)}
            </div>
          ` : ''}

          <div class="task-item-output">
            <strong>👉 الخطوة القادمة:</strong> ${escapeHtml(c.nextAction)}
          </div>
        </div>
      `;
    }).join("");

    // Wire Course Module toggles (Real-time live progress recalculation!)
    document.querySelectorAll(".course-mod-chk").forEach(chk => {
      chk.onchange = (e) => {
        const crsId = e.target.getAttribute("data-course-id");
        const modId = e.target.getAttribute("data-mod-id");
        const course = state.courses.find(x => x.id === crsId);
        if (course && course.modulesList) {
          const mod = course.modulesList.find(m => m.id === modId);
          if (mod) {
            mod.completed = e.target.checked;
            course.modulesCompleted = course.modulesList.filter(m => m.completed).length;
            course.modulesTotal = course.modulesList.length;
            saveState();
            renderSelfCoursesView();
            renderRealLifePulse();
            playNotificationSound(e.target.checked ? 'success' : 'chime');
            showToast(`تم تحديث إنجاز: "${mod.name}" بنجاح! 🎯`);
          }
        }
      };
    });

    // Delete a course module
    document.querySelectorAll(".btn-del-course-mod").forEach(b => {
      b.onclick = () => {
        const crsId = b.getAttribute("data-course-id");
        const modId = b.getAttribute("data-mod-id");
        const course = state.courses.find(x => x.id === crsId);
        if (course && course.modulesList) {
          course.modulesList = course.modulesList.filter(m => m.id !== modId);
          course.modulesCompleted = course.modulesList.filter(m => m.completed).length;
          course.modulesTotal = course.modulesList.length;
          saveState();
          renderSelfCoursesView();
          renderRealLifePulse();
        }
      };
    });

    // Add module to course
    document.querySelectorAll(".btn-add-course-module-sm").forEach(b => {
      b.onclick = () => {
        const crsId = b.getAttribute("data-course-id");
        const course = state.courses.find(x => x.id === crsId);
        if (course) {
          const modName = prompt(`اسم الوحدة أو الدرس الجديد لكورس "${course.title}":`, "الوحدة القادمة");
          if (modName && modName.trim()) {
            if (!course.modulesList) course.modulesList = [];
            course.modulesList.push({
              id: "csm_" + Date.now(),
              name: modName.trim(),
              completed: false
            });
            course.modulesTotal = course.modulesList.length;
            saveState();
            renderSelfCoursesView();
            renderRealLifePulse();
            showToast(`تمت إضافة الوحدة لكورس "${course.title}" بنجاح! 📚`);
          }
        }
      };
    });

    // Log hours to course
    document.querySelectorAll(".btn-log-course-hr").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-id");
        const hours = parseFloat(b.getAttribute("data-h"));
        const item = state.courses.find(x => x.id === id);
        if (item) {
          item.actualHoursThisWeek = Math.round((item.actualHoursThisWeek + hours) * 10) / 10;
          saveState();
          renderSelfCoursesView();
          renderRealLifePulse();
          playNotificationSound('success');
          showToast(`تم تسجيل ${hours} ساعة بنجاح لـ ${item.title}! 🎉`);
        }
      };
    });

    // Delete course
    document.querySelectorAll(".btn-del-course-item").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-id");
        const c = state.courses.find(x => x.id === id);
        if (c && confirm(`هل ترغبين في حذف هذا الكورس: "${c.title}"؟`)) {
          state.courses = state.courses.filter(x => x.id !== id);
          saveState();
          renderSelfCoursesView();
          renderRealLifePulse();
          populateQuickTaskCategoriesDropdown();
          showToast("تم حذف الكورس بنجاح ✓");
        }
      };
    });
  }

  // ADD NEW COURSE BUTTON (FOR COURSERA, HARVARD, UDEMY, ETC.)
  const btnAddSelfCourse = document.getElementById("btnAddNewSelfCourse");
  if (btnAddSelfCourse) {
    btnAddSelfCourse.onclick = () => {
      const title = prompt("اسم الكورس أو المنحة الجديدة (مثال: Harvard CS50 / Python / Product School):", "كورس جديد");
      if (title && title.trim()) {
        const platform = prompt("المنصة أو الجهة (Coursera, edX, Harvard, Udemy):", "Coursera") || "Online";
        const weeklyHours = parseFloat(prompt("المستهدف الأسبوعي بالساعات:", "3.0") || "3.0");
        state.courses.push({
          id: "crs_" + Date.now(),
          title: title.trim(),
          category: "تطوير ذاتي وتقني",
          platform: platform.trim(),
          lifecycle: "Active",
          health: "Healthy",
          weeklyTargetHours: weeklyHours,
          actualHoursThisWeek: 0,
          modulesTotal: 2,
          modulesCompleted: 0,
          streakDays: 1,
          nextAction: "مشاهدة المحاضرة الافتتاحية وتدوين النقاط الرئيسية",
          notes: "أضيف يدوياً بواسطة شروق",
          modulesList: [
            { id: "csm_1", name: "المحاضرة الأولى والمقدمة التمهيدية", completed: false },
            { id: "csm_2", name: "التطبيق العملي واختبار نهاية الوحدة", completed: false }
          ]
        });
        saveState();
        renderSelfCoursesView();
        renderRealLifePulse();
        populateQuickTaskCategoriesDropdown();
        showToast(`تمت إضافة كورس "${title}" بنجاح! 📚`);
      }
    };
  }

  // =========================================================================
  // VIEW 5: SHROUK'S PERSONAL CORNER (BOOKS & IDEAS)
  // =========================================================================
  function renderPersonalCornerView() {
    renderBooksShelf();
    renderIdeasBank();
  }

  function renderBooksShelf() {
    const grid = document.getElementById("booksShelfGrid");
    if (!grid) return;

    grid.innerHTML = state.books.map(b => {
      const pct = engine.calculateBookProgress(b);

      return `
        <div class="book-card-large ${b.id === 'book_fallacies' ? 'spotlight' : ''}">
          <div class="book-top-row">
            <div>
              <h4 class="book-title">${escapeHtml(b.title)}</h4>
              <span class="book-author">${escapeHtml(b.author)}</span>
            </div>
            <button class="btn-hour-pill btn-update-page" data-id="${b.id}">تحديث الصفحة 📖</button>
          </div>

          <div class="book-progress-box">
            <span>نسبة القراءة الفعلية:</span>
            <strong style="color: var(--accent-primary);">${pct}% (صفحة ${b.currentPage} من ${b.totalPages})</strong>
          </div>
          <div class="pulse-bar"><div class="fill" style="width: ${pct}%;"></div></div>

          <div class="book-takeaways">
            <strong>💡 أبرز الأفكار المستفادة حتى الآن:</strong>
            <ul>
              ${b.keyTakeaways ? b.keyTakeaways.map(t => `<li>${escapeHtml(t)}</li>`).join("") : '<li>قيد التدوين...</li>'}
            </ul>
          </div>

          <div class="task-item-output">
            <strong>🎯 الهدف القادم في القراءة:</strong> ${escapeHtml(b.nextReadingTarget || "قراءة 20 صفحة")}
          </div>
        </div>
      `;
    }).join("");

    document.querySelectorAll(".btn-update-page").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-id");
        const bk = state.books.find(x => x.id === id);
        if (bk) {
          const pg = prompt(`أدخلي رقم الصفحة الحالية التي وصلتِ لها في "${bk.title}" (الإجمالي: ${bk.totalPages}):`, bk.currentPage);
          if (pg !== null && !isNaN(pg)) {
            bk.currentPage = Math.min(bk.totalPages, Math.max(0, parseInt(pg)));
            saveState();
            renderBooksShelf();
            renderRealLifePulse();
            showToast("تم تحديث تقدم القراءة الفعلي! 📖");
          }
        }
      };
    });
  }

  const addBookBtn = document.getElementById("btnAddNewBook");
  if (addBookBtn) {
    addBookBtn.onclick = () => {
      const title = prompt("اسم الكتاب الجديد:", "كتاب جديد");
      if (title) {
        const author = prompt("اسم المؤلف:", "المؤلف");
        const pages = parseInt(prompt("إجمالي عدد الصفحات:", "250") || "250");
        state.books.push({
          id: "book_" + Date.now(),
          title,
          author: author || "غير محدد",
          totalPages: pages,
          currentPage: 0,
          category: "تطوير وقراءة",
          status: "قيد البدء",
          keyTakeaways: ["تدوين الأفكار الأولى..."],
          nextReadingTarget: "قراءة المقدمة والفصل الأول"
        });
        saveState();
        renderBooksShelf();
        showToast("تمت إضافة الكتاب الجديد إلى ركنكِ الشخصي 📚");
      }
    };
  }

  function renderIdeasBank() {
    const grid = document.getElementById("ideasBankGrid");
    if (!grid) return;

    const filtered = currentIdeasFilter === "all"
      ? state.personalIdeas
      : state.personalIdeas.filter(i => i.category === currentIdeasFilter);

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="sub-muted">لا توجد أفكار مسجلة في هذا التصنيف حالياً. اضغطي على "اقتراح أفكار بالذكاء الاصطناعي" لتوليد أفكار فوراً! ✨</div>`;
      return;
    }

    grid.innerHTML = filtered.map(idea => {
      const catClass = idea.category === "academic" ? "energy" : idea.category === "courses" ? "should" : "could";
      const catBadge = idea.categoryLabel || (idea.category === "academic" ? "🎓 فكرة دراسية وبحثية" : idea.category === "courses" ? "💼 أفكار الكورسات والمسارات" : "💡 أفكار ومشاريع شخصية");

      return `
        <div class="idea-card-item">
          <div>
            <div class="idea-card-top mb-2">
              <span class="tag-pill ${catClass}">${catBadge}</span>
              <span class="tag-pill could">${escapeHtml(idea.status)}</span>
            </div>
            <h4 class="idea-card-title">${escapeHtml(idea.title)}</h4>
            <p class="idea-card-desc mb-2">${escapeHtml(idea.description)}</p>
            ${idea.suggestedOutput ? `<div class="idea-card-output mb-2">🎯 <strong>المخرج المقترح:</strong> ${escapeHtml(idea.suggestedOutput)}</div>` : ''}
          </div>

          <div class="idea-card-actions">
            <span class="sub-muted" style="font-size: 0.78rem;">📅 أضيفت: ${idea.dateAdded}</span>
            <div style="display: flex; gap: 6px;">
              <button class="btn-convert-idea-to-task btn-convert-idea" data-id="${idea.id}">⚡ تحويل لمهمة عمل</button>
              <button class="btn-hour-pill btn-del-idea" data-id="${idea.id}" style="color: #ef4444;" title="حذف">✕</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    updateHeaderIdeasNotification();

    // Wire convert to task
    document.querySelectorAll(".btn-convert-idea").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-id");
        const item = state.personalIdeas.find(x => x.id === id);
        if (item) {
          addNewTaskToState({
            title: item.title,
            programId: item.category === "academic" ? "genetics" : item.category === "courses" ? "fadaqa" : "personal",
            tier: "SHOULD",
            target: item.title,
            finishLine: item.suggestedOutput || "إنجاز مسودة المخرج الأولية",
            activeOutput: item.suggestedOutput || "مخرج عملي ملموس",
            nextAction: "البدء بالخطوة التنفيذية الأولى",
            energyRequired: "Deep Focus",
            deadline: null,
            completed: false
          });
          item.status = "قيد التنفيذ 🚀";
          saveState();
          renderPersonalCornerView();
          updateHeaderIdeasNotification();
          playNotificationSound('success');
          showToast(`تم تحويل الفكرة بنجاح إلى مهمة عمل في مركز القيادة! 🎯`);
        }
      };
    });

    // Wire delete idea
    document.querySelectorAll(".btn-del-idea").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-id");
        if (confirm("هل ترغبين في حذف هذه الفكرة من البنك؟")) {
          state.personalIdeas = state.personalIdeas.filter(x => x.id !== id);
          saveState();
          renderPersonalCornerView();
          updateHeaderIdeasNotification();
          showToast("تم حذف الفكرة بنجاح ✓");
        }
      };
    });
  }

  // Ideas Category Filter Chips Wiring
  document.querySelectorAll(".ideas-filter-chip").forEach(chip => {
    chip.onclick = () => {
      document.querySelectorAll(".ideas-filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentIdeasFilter = chip.getAttribute("data-filter");
      renderIdeasBank();
    };
  });

  // AI Idea Suggestions Generator
  const btnSuggestAiIdeas = document.getElementById("btnSuggestAiIdeas");
  if (btnSuggestAiIdeas) {
    btnSuggestAiIdeas.onclick = async () => {
      btnSuggestAiIdeas.textContent = "جاري توليد أفكار مبتكرة... ✨";
      const pool = [
        {
          title: "بناء جدول مقارن لحالات التثبيط الإنزيمي (Competitive vs Non-Competitive)",
          category: "academic",
          categoryLabel: "🎓 فكرة دراسية وبحثية",
          description: "رسم بياني يربط تغيرات Km و Vmax مع أمثلة حيوية لأدوية حقيقية للامتحان.",
          suggestedOutput: "ورقة رسم بياني مقارنة مع 5 مسائل محلولة"
        },
        {
          title: "محاكاة مقابلة عمل تقنية باللغة الإنجليزية لمجال إدارة المنتجات الحيوية",
          category: "courses",
          categoryLabel: "💼 أفكار الكورسات والمسارات",
          description: "دمج مهارات المحادثة من Berlitz مع مفاهيم المسارات المهنية لشرح مشروعي بطلاقة.",
          suggestedOutput: "تسجيل إجابات نموذجية لـ 5 أسئلة مقابلات بالإنجليزية"
        },
        {
          title: "تحليل مغالطة 'الرنجة الحمراء' و'رجل القش' في المقالات العلمية الشائعة",
          category: "personal",
          categoryLabel: "💡 فكرة ومشروع شخصي",
          description: "استخراج أمثلة من مقالات التكنولوجيا الحيوية العامة لتوضيح كيفية تفادي الاستدلال الفاسد.",
          suggestedOutput: "مقال نقدي تحليلي من صفحتين"
        },
        {
          title: "تصميم بطاقات استرجاع نشط لبروتوكولات فحص بكتيريا Staphylococci",
          category: "academic",
          categoryLabel: "🎓 فكرة دراسية وبحثية",
          description: "بطاقات فلاش ذكية لخطوات صبغة جرام واختبار الكاتاليز والتجلط مع نتائج المعمل.",
          suggestedOutput: "مجموعة بطاقات مراجعة سريعة قبل سكشن العملي"
        }
      ];

      const newItems = pool.filter(p => !state.personalIdeas.some(i => i.title === p.title)).slice(0, 2);
      if (newItems.length === 0) {
        newItems.push({
          title: "أتمتة مراجعة أوراق أبحاث الـ CRISPR بواسطة نماذج الذكاء الاصطناعي",
          category: "academic",
          categoryLabel: "🎓 فكرة دراسية وبحثية",
          description: "صياغة أوامر دقيقة لاستخراج الفرضيات والمنهجيات من أحدث أبحاث التعديل الجيني.",
          suggestedOutput: "قالب استخراج منهجي للأوراق البحثية"
        });
      }

      newItems.forEach(item => {
        state.personalIdeas.unshift({
          id: "idea_gen_" + Date.now() + Math.random().toString(36).substr(2, 4),
          title: item.title,
          category: item.category,
          categoryLabel: item.categoryLabel,
          description: item.description,
          suggestedOutput: item.suggestedOutput,
          status: "مقترح ذكي ✨",
          dateAdded: new Date().toISOString().split("T")[0]
        });
      });

      saveState();
      renderPersonalCornerView();
      btnSuggestAiIdeas.textContent = "✨ اقتراح أفكار بالذكاء الاصطناعي";
      playNotificationSound('chime');
      showToast("تم توليد أفكار جديدة وإضافتها لبنك الأفكار بنجاح! 💡🚀");
    };
  }

  // Add Custom Idea Form Listener
  const addIdeaBtn = document.getElementById("btnAddNewIdea");
  if (addIdeaBtn) {
    addIdeaBtn.onclick = () => {
      const title = prompt("عنوان الفكرة أو المشروع الجديد:", "فكرة مشروع جديدة");
      if (title && title.trim()) {
        const catType = prompt("اختاري تصنيف الفكرة (اكتبي: 1 للأكاديمي، 2 للكورسات، 3 للشخصي):", "1");
        let category = "academic";
        let categoryLabel = "🎓 فكرة دراسية وبحثية";
        if (catType === "2") {
          category = "courses";
          categoryLabel = "💼 أفكار الكورسات والمسارات";
        } else if (catType === "3") {
          category = "personal";
          categoryLabel = "💡 فكرة ومشروع شخصي";
        }

        const desc = prompt("وصف مختصر للفكرة ومجال تطبيقها:", "وصف الفكرة...");
        const output = prompt("المخرج المقترح للفكرة (Suggested Output):", "ملف عمل / ملخص مكتوب");

        state.personalIdeas.unshift({
          id: "idea_" + Date.now(),
          title: title.trim(),
          category,
          categoryLabel,
          description: desc || "فكرة مسجلة للتطوير",
          suggestedOutput: output || "مخرج ملموس",
          status: "فكرة مسجلة 💡",
          dateAdded: new Date().toISOString().split("T")[0]
        });
        saveState();
        renderPersonalCornerView();
        updateHeaderIdeasNotification();
        showToast("تم تسجيل الفكرة في بنك المشاريع بنجاح! 💡");
      }
    };
  }

  // =========================================================================
  // VIEW 6: ADAPTIVE DAY PLANNER & RECOVERY BUFFERS
  // =========================================================================
  function renderPlannerView(dayName) {
    currentActiveDay = dayName;

    document.querySelectorAll(".day-chip").forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-day") === dayName);
    });

    const plan = engine.generateAdaptiveDailyPlan(dayName);

    const advice = document.getElementById("plannerAdviceCard");
    if (advice) {
      advice.innerHTML = `
        <span style="font-size: 1.5rem;">💡</span>
        <div>
          <strong>تحليل سعة يوم ${translateDay(dayName)}:</strong>
          <p>${plan.systemAdvice}</p>
        </div>
      `;
    }

    const mustBox = document.getElementById("mustTasksBox");
    if (mustBox) {
      mustBox.innerHTML = plan.must.length > 0 
        ? plan.must.map(t => renderTierCardHtml(t)).join("")
        : `<div class="sub-muted">لا توجد مهام إجبارية حرجة اليوم ✨</div>`;
    }

    const shouldBox = document.getElementById("shouldTasksBox");
    if (shouldBox) {
      shouldBox.innerHTML = plan.should.length > 0
        ? plan.should.map(t => renderTierCardHtml(t)).join("")
        : `<div class="sub-muted">سعة متاحة للمراجعة أو الاستراحة 🌿</div>`;
    }

    const couldBox = document.getElementById("couldTasksBox");
    if (couldBox) {
      couldBox.innerHTML = plan.could.length > 0
        ? plan.could.map(t => renderTierCardHtml(t)).join("")
        : `<div class="sub-muted">مهام إضافية اختيارية فقط</div>`;
    }

    const timeline = document.getElementById("scheduleTimelineGrid");
    if (timeline) {
      const dayCommitments = state.fixedSchedule.filter(s => s.day === dayName);
      if (dayCommitments.length === 0) {
        timeline.innerHTML = `<div class="schedule-block-large recovery-buffer"><div class="block-info-large"><h4>يوم حر للاستراحة أو العمل العميق الاستراتيجي 🚀</h4></div></div>`;
      } else {
        timeline.innerHTML = dayCommitments.map(c => {
          const isRecovery = c.type === "recovery";
          const isUni = c.type === "university";
          const isAmb = c.id.includes("ai");

          return `
            <div class="schedule-block-large ${isRecovery ? 'recovery-buffer' : isUni ? 'university-block' : isAmb ? 'ambassador-block' : ''}">
              <div class="block-time-large">${c.start} - ${c.end}</div>
              <div class="block-info-large">
                <h4>${escapeHtml(c.title)}</h4>
                <p>${isRecovery ? '🛡️ مخزن استعادة الطاقة محمي برمجياً — يمنع جدولة أي مهام ثقيلة هنا.' : 'التزام ثابت وفقاً لجدولكِ المعتمد.'}</p>
              </div>
            </div>
          `;
        }).join("");
      }
    }
  }

  function renderTierCardHtml(task) {
    return `
      <div class="task-large-item">
        <div class="task-item-top">
          <label class="custom-checkbox">
            <input type="checkbox" class="task-chk-toggle" data-id="${task.id}" ${task.completed ? "checked" : ""}>
            <span class="checkmark"></span>
          </label>
          <div class="task-item-title">${escapeHtml(task.title)}</div>
        </div>
        <div class="task-item-output">
          <strong>الهدف:</strong> ${escapeHtml(task.target || "")}<br>
          <strong>المخرج:</strong> ${escapeHtml(task.activeOutput || "")}
        </div>
      </div>
    `;
  }

  document.querySelectorAll(".day-chip").forEach(chip => {
    chip.onclick = () => renderPlannerView(chip.getAttribute("data-day"));
  });

  // =========================================================================
  // VIEW 7: REAL REPORTS GENERATOR & LOGGER
  // =========================================================================
  function renderReportsView() {
    const list = document.getElementById("reportsArchiveList");
    if (!list) return;

    if (!state.reports || state.reports.length === 0) {
      list.innerHTML = `<div class="sub-muted">لا توجد تقارير محفوظة بعد. يمكنكِ إضافة أول تقرير باستخدام النموذج أعلاه 📝</div>`;
      return;
    }

    list.innerHTML = state.reports.map(rep => {
      return `
        <div class="report-item-card">
          <div class="report-item-header">
            <div>
              <span class="tag-pill could">${rep.type}</span>
              <span class="report-meta-tag">📅 ${rep.date} • ${escapeHtml(rep.energyLevel || '')}</span>
              <h4 style="margin-top: 6px;">${escapeHtml(rep.title)}</h4>
            </div>
            <button class="btn-hour-pill btn-del-report" data-id="${rep.id}" style="color: #ef4444;">حذف ✕</button>
          </div>

          <div class="report-section-block">
            <strong>✅ ما تم إنجازه فعلياً:</strong>
            <p>${escapeHtml(rep.achievements)}</p>
          </div>

          ${rep.challenges ? `
            <div class="report-section-block">
              <strong>⚠️ التحديات وما تم تأجيله ولماذا:</strong>
              <p>${escapeHtml(rep.challenges)}</p>
            </div>
          ` : ''}

          ${rep.notes ? `
            <div class="report-section-block">
              <strong>📌 ملاحظات وخطوات تالية:</strong>
              <p>${escapeHtml(rep.notes)}</p>
            </div>
          ` : ''}
        </div>
      `;
    }).join("");

    document.querySelectorAll(".btn-del-report").forEach(b => {
      b.onclick = () => {
        const id = b.getAttribute("data-id");
        if (confirm("هل ترغبين في حذف هذا التقرير؟")) {
          state.reports = state.reports.filter(x => x.id !== id);
          saveState();
          renderReportsView();
          showToast("تم حذف التقرير ✓");
        }
      };
    });
  }

  // Report Submission Form
  const newReportForm = document.getElementById("newReportForm");
  if (newReportForm) {
    newReportForm.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById("reportTitleInput").value.trim();
      const type = document.getElementById("reportTypeSelect").value;
      const energyLevel = document.getElementById("reportEnergySelect").value;
      const achievements = document.getElementById("reportAchievementsInput").value.trim();
      const challenges = document.getElementById("reportChallengesInput").value.trim();
      const notes = document.getElementById("reportNotesInput").value.trim();

      if (!state.reports) state.reports = [];
      state.reports.unshift({
        id: "rep_" + Date.now(),
        date: new Date().toISOString().split("T")[0],
        title,
        type,
        energyLevel,
        achievements,
        challenges,
        notes
      });

      saveState();
      newReportForm.reset();
      renderReportsView();
      showToast("تم حفظ التقرير في السجل بنجاح! 💾");
    };
  }

  // =========================================================================
  // AI STRATEGIC ASSISTANT
  // =========================================================================
  const aiModal = document.getElementById("aiAssistantModal");
  const openAiBtn = document.getElementById("openAiAssistantBtn");
  const closeAiBtn = document.getElementById("closeAiModalBtn");
  const floatingAiFab = document.getElementById("floatingAiFab");
  const dashboardOpenAiBtn = document.getElementById("dashboardOpenAiBtn");
  const aiInput = document.getElementById("aiInputText");
  const btnAiSend = document.getElementById("btnAiSend");
  const aiThread = document.getElementById("aiChatThread");

  const openAiModal = () => {
    if (aiModal) {
      aiModal.classList.add("active");
      if (aiInput) aiInput.focus();
    }
  };

  if (openAiBtn) {
    openAiBtn.onclick = openAiModal;
    openAiBtn.addEventListener("click", openAiModal);
  }
  if (floatingAiFab) {
    floatingAiFab.onclick = openAiModal;
    floatingAiFab.addEventListener("click", openAiModal);
  }
  if (dashboardOpenAiBtn) {
    dashboardOpenAiBtn.onclick = openAiModal;
    dashboardOpenAiBtn.addEventListener("click", openAiModal);
  }
  if (closeAiBtn && aiModal) {
    closeAiBtn.onclick = () => aiModal.classList.remove("active");
    closeAiBtn.addEventListener("click", () => aiModal.classList.remove("active"));
  }

  function appendAiMsg(role, text) {
    if (!aiThread) return;
    const div = document.createElement("div");
    div.className = `ai-message ${role}`;
    div.innerHTML = `<p>${text.replace(/\n/g, "<br>")}</p>`;
    aiThread.appendChild(div);
    aiThread.scrollTop = aiThread.scrollHeight;
  }

  function openAiWithPrompt(promptText) {
    if (aiModal) aiModal.classList.add("active");
    appendAiMsg("user", promptText);
    setTimeout(() => {
      processAiMessage(promptText);
    }, 400);
  }

  function handleAiSend() {
    if (!aiInput) return;
    const txt = aiInput.value.trim();
    if (!txt) return;

    appendAiMsg("user", txt);
    aiInput.value = "";
    setTimeout(() => {
      processAiMessage(txt);
    }, 450);
  }

  if (btnAiSend) btnAiSend.onclick = handleAiSend;
  if (aiInput) {
    aiInput.onkeydown = (e) => { if (e.key === "Enter") handleAiSend(); };
  }

  // Action chips
  document.querySelectorAll(".ai-chip-prompt").forEach(chip => {
    chip.onclick = () => {
      const act = chip.getAttribute("data-action");
      if (act === "plan_today" || act === "arrange_priorities") {
        const plan = engine.generateAdaptiveDailyPlan(currentActiveDay);
        appendAiMsg("assistant", `📋 <strong>الخطة الذكية المقترحة ليوم (${translateDay(currentActiveDay)}):</strong><br><br>
          ⚡ <strong>طاقة اليوم وسعته:</strong> ${plan.systemAdvice}<br><br>
          🔴 <strong>المهام الإجبارية (MUST):</strong><br>
          ${plan.must.length ? plan.must.map(m => `• «${escapeHtml(m.title)}» (المخرج: ${escapeHtml(m.activeOutput || 'مخرج ملموس')})`).join("<br>") : "لا توجد مهام إجبارية حرجة اليوم."}<br><br>
          🟡 <strong>المهام المهمة (SHOULD):</strong><br>
          ${plan.should.length ? plan.should.map(m => `• «${escapeHtml(m.title)}»`).join("<br>") : "لا توجد مهام."}<br><br>
          🛡️ <strong>تنبيه Buffer التعافي:</strong> يمنع جدولة أي مهام بين 4:00 إلى 6:00 مساءً لحماية الطاقة الذهنية.`);
      } else if (act === "add_fadaqa_task") {
        addNewTaskToState({
          title: "تسليم تكليف FadaQa Assignment 1 (Product Spec)",
          programId: "fadaqa",
          tier: "MUST",
          target: "رفع التكليف كاملاً في Google Classroom",
          finishLine: "Turned In confirmation on Google Classroom",
          activeOutput: "ملف PDF للـ PRD وخريطة تجربة المستخدم",
          nextAction: "فتح الكلاس روم وصياغة المسودة الأولى",
          energyRequired: "Deep Focus",
          deadline: "2026-10-09",
          completed: false
        });
        appendAiMsg("assistant", `✅ تم إضافة المهمة بنجاح إلى مركز القيادة: <strong>«تسليم تكليف FadaQa Assignment 1»</strong> بموعد نهائي الجمعة 9 أكتوبر 2026.`);
      } else if (act === "study_session" || act === "study_genetics") {
        const courseNames = state.academicCourses.map(c => c.name);
        const chosen = prompt("ما هي المادة التي ترغبين في جلسة استرجاع نشط لها؟\n" + courseNames.join("\n"), state.academicCourses[0]?.name || "علم الوراثة");
        if (chosen) {
          const matchCourse = state.academicCourses.find(c => c.name.includes(chosen.trim()) || chosen.includes(c.name));
          const progId = matchCourse ? matchCourse.id : "academic";
          addNewTaskToState({
            title: `جلسة استرجاع نشط: ${chosen.trim()}`,
            programId: progId,
            tier: "MUST",
            target: `حل وتلخيص أهم مفاهيم ${chosen.trim()} بدون الرجوع للملاحظات`,
            finishLine: "10 أسئلة محلولة ورسم ذهني واضح",
            activeOutput: `ملخص استرجاع نشط مكتوب لمقرر ${chosen.trim()}`,
            nextAction: "إغلاق السلايدات والبدء بكتابة ما تتذكرينه على ورقة بيضاء",
            energyRequired: "Deep Focus",
            deadline: null,
            completed: false
          });
          appendAiMsg("assistant", `🧬 تم إنشاء جلسة استرجاع نشط لمقرر <strong>«${escapeHtml(chosen)}»</strong> بنجاح وإضافتها لمركز القيادة! الهدف: ترسيخ الفهم لدعم المعدل التراكمي GPA +3.0.`);
        }
      } else if (act === "add_berlitz_task") {
        addNewTaskToState({
          title: "منحة Berlitz: جلسة تدريب المحادثة والاستماع (الوحدة 1)",
          programId: "berlitz",
          tier: "SHOULD",
          target: "إنجاز 45 دقيقة تدريب صوتي لتحقيق المستهدف الأسبوعي (3.5 ساعات)",
          finishLine: "اكتمال التدريب على منصة Berlitz",
          activeOutput: "45 دقيقة ممارسة وتدوين 15 كلمة جديدة",
          nextAction: "فتح بوابة Berlitz والبدء بالوحدة 1",
          energyRequired: "Medium Focus",
          deadline: "2026-10-11",
          completed: false
        });
        appendAiMsg("assistant", `🎓 تم إضافة جلسة تدريب Berlitz بنجاح للمهام! يمكنكِ تسجيل الساعات بنقرة واحدة عند الانتهاء.`);
      } else if (act === "read_fallacies") {
        addNewTaskToState({
          title: "قراءة فصل مغالطة الاحتكام إلى الجهل (كتاب المغالطات المنطقية)",
          programId: "personal",
          tier: "COULD",
          target: "قراءة 20 صفحة (ص 126 - 146) وتلخيص مثال واقعي",
          finishLine: "الوصول لصفحة 146",
          activeOutput: "صفحة تلخيص للمغالطة وتطبيقها في النقاشات",
          nextAction: "فتح الكتاب عند صفحة 125",
          energyRequired: "Medium Focus",
          deadline: "2026-10-12",
          completed: false
        });
        appendAiMsg("assistant", `📖 تم إضافة جلسة قراءة كتاب المغالطات المنطقية لد. عادل مصطفى بنجاح!`);
      }
    };
  });

  // REAL GEMINI API CALLER & DIRECTIVE ENGINE
  async function callGeminiApi(userQuery) {
    const apiKey = localStorage.getItem("shrouk_gemini_api_key");
    if (!apiKey) {
      return null;
    }

    const systemPrompt = `أنت المساعد الذكي لنظام التشغيل الشخصي الخاص بشروق عماد (Shrouk Emad) - طالبة بيوتكنولوجي بجامعة دمياط.
شخصيتها تمزج بين الفكر الاستراتيجي (INTJ) والتحليل المنطقي والفضول المعرفي (INTP)، لا تصنفها أبداً كـ ENTJ.
أنت تدير معها: الجامعة، 8 مواد أكاديمية بهدف معدل GPA +3.0 (حيث هدف الكيمياء الحيوية والرياضيات والكيمياء التحليلية هو B، وباقي المواد A أو A+)، برامج قيادية وسفراء الذكاء الاصطناعي، منحة Berlitz، تكليف FadaQa (الموعد الحرج الجمعة 9 أكتوبر 2026)، وقراءة كتاب المغالطات المنطقية لد. عادل مصطفى.
حماية مخازن التعافي 4-6 مساءً الاثنين والأربعاء خط أحمر.

يمكنك تنفيذ أوامر حقيقية بتضمين وسوم خاصة في إجابتك:
1. لإضافة مهمة:
[ADD_TASK: {"title": "اسم المهمة", "tier": "MUST", "activeOutput": "المخرج الملموس", "programId": "genetics"}]
(tier: MUST, SHOULD, COULD)
2. لإنهاء مهمة:
[COMPLETE_TASK: "كلمة من عنوان المهمة"]
3. لحذف مهمة:
[DELETE_TASK: "كلمة من عنوان المهمة"]
4. لإضافة فكرة لبنك الأفكار:
[ADD_IDEA: {"title": "عنوان الفكرة", "category": "academic", "notes": "شرح الفكرة", "suggestedOutput": "المخرج"}]
(category: academic, courses, personal)

أجب بالعربية بأسلوب استراتيجي، تحليلي، محفز وعملي جداً، ونفذ الأوامر متى طلبت شروق إضافة أو تعديل أي شيء.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nسؤال أو طلب شروق: ${userQuery}` }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        })
      });

      if (!response.ok) {
        console.error("Gemini API Error:", response.status, response.statusText);
        return null;
      }

      const data = await response.json();
      const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return candidateText || null;
    } catch (err) {
      console.error("Failed to fetch from Gemini:", err);
      return null;
    }
  }

  function handleAiDirectives(responseText) {
    let cleanText = responseText;
    let actionsPerformed = [];

    // Parse [ADD_TASK: {...}]
    const addTaskRegex = /\[ADD_TASK:\s*(\{.*?\})\]/gs;
    let match;
    while ((match = addTaskRegex.exec(responseText)) !== null) {
      try {
        const taskData = JSON.parse(match[1]);
        addNewTaskToState({
          title: taskData.title || "مهمة مقترحة من Gemini",
          programId: taskData.programId || "general",
          tier: taskData.tier || "MUST",
          target: taskData.target || taskData.title,
          finishLine: taskData.finishLine || "اكتمال المخرج المطلوب",
          activeOutput: taskData.activeOutput || "مخرج ملموس",
          nextAction: taskData.nextAction || "البدء بالخطوة الأولى",
          energyRequired: taskData.energyRequired || "Deep Focus",
          deadline: taskData.deadline || null,
          completed: false
        });
        actionsPerformed.push(`✨ تمت إضافة المهمة: «${taskData.title}»`);
      } catch (e) {
        console.error("Error parsing ADD_TASK directive:", e);
      }
    }
    cleanText = cleanText.replace(addTaskRegex, "");

    // Parse [COMPLETE_TASK: "..."]
    const completeTaskRegex = /\[COMPLETE_TASK:\s*"([^"]+)"\]/g;
    while ((match = completeTaskRegex.exec(responseText)) !== null) {
      const keyword = match[1].toLowerCase();
      const task = state.tasks.find(t => t.title.toLowerCase().includes(keyword));
      if (task) {
        task.completed = true;
        saveState();
        renderDashboardCockpit();
        renderRealLifePulse();
        actionsPerformed.push(`✅ تم وضع علامة إنجاز على مهمة: «${task.title}»`);
      }
    }
    cleanText = cleanText.replace(completeTaskRegex, "");

    // Parse [DELETE_TASK: "..."]
    const deleteTaskRegex = /\[DELETE_TASK:\s*"([^"]+)"\]/g;
    while ((match = deleteTaskRegex.exec(responseText)) !== null) {
      const keyword = match[1].toLowerCase();
      const task = state.tasks.find(t => t.title.toLowerCase().includes(keyword));
      if (task) {
        state.tasks = state.tasks.filter(t => t.id !== task.id);
        saveState();
        renderDashboardCockpit();
        renderRealLifePulse();
        actionsPerformed.push(`🗑️ تم حذف المهمة: «${task.title}»`);
      }
    }
    cleanText = cleanText.replace(deleteTaskRegex, "");

    // Parse [ADD_IDEA: {...}]
    const addIdeaRegex = /\[ADD_IDEA:\s*(\{.*?\})\]/gs;
    while ((match = addIdeaRegex.exec(responseText)) !== null) {
      try {
        const ideaData = JSON.parse(match[1]);
        if (!state.personalIdeas) state.personalIdeas = [];
        state.personalIdeas.unshift({
          id: "idea_" + Date.now() + Math.random().toString(36).substring(2, 5),
          category: ideaData.category || "academic",
          title: ideaData.title || "فكرة جديدة",
          status: "Spark",
          notes: ideaData.notes || "",
          suggestedOutput: ideaData.suggestedOutput || "مخرج تجريبي"
        });
        saveState();
        renderIdeasBank();
        actionsPerformed.push(`💡 تمت إضافة فكرة جديدة إلى بنك الأفكار: «${ideaData.title}»`);
      } catch (e) {
        console.error("Error parsing ADD_IDEA directive:", e);
      }
    }
    cleanText = cleanText.replace(addIdeaRegex, "");

    return { cleanText: cleanText.trim(), actionsPerformed };
  }

  async function processAiMessage(query) {
    const q = query.toLowerCase();

    // 1. Try real Gemini API first if configured
    const apiKey = localStorage.getItem("shrouk_gemini_api_key");
    if (apiKey) {
      appendAiMsg("assistant", "⏳ <em>جاري التفكير والتواصل مع Gemini 1.5 Flash...</em>");
      const loadingEl = aiThread.lastElementChild;

      try {
        const geminiResponse = await callGeminiApi(query);
        if (loadingEl) loadingEl.remove();

        if (geminiResponse) {
          const { cleanText, actionsPerformed } = handleAiDirectives(geminiResponse);
          let finalMsg = cleanText;
          if (actionsPerformed.length > 0) {
            finalMsg += `<br><br><div style="padding: 8px 12px; background: rgba(34, 197, 94, 0.15); border-radius: 8px; border-right: 3px solid #22c55e;"><strong>الإجراءات التلقائية المنفذة:</strong><br>${actionsPerformed.join("<br>")}</div>`;
          }
          appendAiMsg("assistant", finalMsg);
          return;
        }
      } catch (e) {
        if (loadingEl) loadingEl.remove();
        console.error("Gemini failed:", e);
      }
    }

    // 2. Fallback local smart strategic intelligence
    if (q.includes("ضيف") || q.includes("اضف") || q.includes("سجل مهمة") || q.includes("أنشئ مهمة") || q.includes("تاسك")) {
      let taskTitle = query.replace(/(ضيف|اضف|سجل|أنشئ|مهمة|تاسك|عايزة مهمة)/g, "").trim();
      if (!taskTitle) taskTitle = "مهمة عمل جديدة";

      const newTask = addNewTaskToState({
        title: taskTitle,
        programId: q.includes("وراثة") || q.includes("كلية") || q.includes("مادة") ? "academic" : q.includes("فدقة") || q.includes("fadaqa") ? "fadaqa" : "general",
        tier: "MUST",
        target: taskTitle,
        finishLine: "إنجاز العمل المطلوب وتوثيقه",
        activeOutput: "مخرج ملموس محدد",
        nextAction: "البدء بالخطوة الأولى",
        energyRequired: "Deep Focus",
        deadline: null,
        completed: false
      });

      appendAiMsg("assistant", `✅ <strong>تمت الإضافة بنجاح!</strong> قمتُ بإنشاء المهمة وإدراجها في مركز القيادة فوراً:<br>«${escapeHtml(newTask.title)}»<br>المستوى: <strong>MUST</strong>.`);
      return;
    }

    if (q.includes("fadaqa") || q.includes("فدقة") || q.includes("تسليم")) {
      appendAiMsg("assistant", `بشأن <strong>FadaQa (Product Management)</strong>:<br>
        الموعد النهائي الحرج هو <strong>الجمعة 9 أكتوبر 2026</strong>.<br>
        المهمة المطلوبة: تسليم الـ PRD في Google Classroom.<br>
        المقترح: تخصيص قالب عمل عميق مدته 90 دقيقة مساء الخميس لإغلاق هذا التسليم مبكراً.`);
      return;
    }

    if (q.includes("berlitz") || q.includes("بيرلتز") || q.includes("منحة")) {
      const bz = state.courses.find(x => x.id === "berlitz");
      appendAiMsg("assistant", `بشأن <strong>منحة Berlitz / English for All</strong>:<br>
        حالة البرنامج: <strong>نشط ومؤكد (Active)</strong>.<br>
        المستهدف الأسبوعي: <strong>3.5 ساعات</strong> (المنجز حتى الآن: ${bz?.actualHoursThisWeek || 1} س).<br>
        أفضل وقت للممارسة: مساء الخميس أو صباح الجمعة بعيداً عن إجهاد دوام الكلية.`);
      return;
    }

    if (q.includes("مغالطات") || q.includes("كتاب") || q.includes("قراءة") || q.includes("عادل مصطفى")) {
      const bk = state.books.find(x => x.id === "book_fallacies");
      appendAiMsg("assistant", `بشأن <strong>كتاب المغالطات المنطقية (د. عادل مصطفى)</strong>:<br>
        أنتِ حالياً عند صفحة <strong>${bk?.currentPage || 125}</strong> من أصل <strong>${bk?.totalPages || 340}</strong> صفحة (نسبة إنجاز ${engine.calculateBookProgress(bk)}%).<br>
        الهدف القادم: قراءة فصلي "الاحتكام إلى الجهل" و"السؤال المشحون". قراءة ممتعة وعميقة!`);
      return;
    }

    if (q.includes("gpa") || q.includes("معدل") || q.includes("3.0") || q.includes("دراسة") || q.includes("كلية")) {
      appendAiMsg("assistant", `بشأن <strong>المعدل التراكمي المستهدف GPA +3.0</strong>:<br>
        المعدل موزع استراتيجياً على المقررات:<br>
        • الكيمياء الحيوية، الرياضيات (التفاضل والتكامل 2)، والكيمياء التحليلية: <strong>B</strong>.<br>
        • الوراثة السيتوبلازمية، البكتيريا، الفطريات، أصول البيوتكنولوجي، المصطلحات العلمية: <strong>A أو A+</strong>.<br>
        استراتيجيتكِ المعتمدة: <em>الفهم ← الربط ← الاسترجاع النشط (Active Recall) ← التثبيت</em>.`);
      return;
    }

    appendAiMsg("assistant", `سؤال استراتيجي ممتاز يا شروق. نظامكِ يراعي الموازنة بين دوام الكلية والبرامج المهنية، مع حماية مخزن التعافي (4 - 6 م)، وتوزيع درجات المقررات الأكاديمية لدعم GPA +3.0.`);
  }

  // =========================================================================
  // GOOGLE CALENDAR, TASKS & GEMINI SYNC MODAL
  // =========================================================================
  const syncModal = document.getElementById("syncModal");
  const openSyncBtn = document.getElementById("openSyncModalBtn");
  const closeSyncBtn = document.getElementById("closeSyncModalBtn");

  if (openSyncBtn && syncModal) openSyncBtn.onclick = () => syncModal.classList.add("active");
  if (closeSyncBtn && syncModal) closeSyncBtn.onclick = () => syncModal.classList.remove("active");

  const btnSyncGCal = document.getElementById("btnSyncGCalendarWeb");
  if (btnSyncGCal) {
    btnSyncGCal.onclick = () => {
      const title = encodeURIComponent("دوام جامعة دمياط ومخزن التعافي - شروق عماد");
      const details = encodeURIComponent("جدول شروق الأسبوعي مع مخازن التعافي المحمية (4-6 م) ومواعيد الكلية وسفراء الذكاء الاصطناعي");
      window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`, "_blank");
    };
  }

  const btnDownloadIcs = document.getElementById("btnDownloadIcs");
  const btnExportWeek = document.getElementById("btnExportWeekToCal");

  function downloadIcsFile() {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Shrouk Personal OS//Damietta University//EN\n";
    state.fixedSchedule.forEach(item => {
      icsContent += `BEGIN:VEVENT\nSUMMARY:${item.title}\nDESCRIPTION:${item.title} - شروق عماد\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shrouk_schedule.ics";
    link.click();
    showToast("تم تحميل ملف التقويم (.ics) بنجاح! يمكنكِ فتحه في Google Calendar أو الموبايل 📅");
  }

  if (btnDownloadIcs) btnDownloadIcs.onclick = downloadIcsFile;
  if (btnExportWeek) btnExportWeek.onclick = downloadIcsFile;

  const btnCopyTasks = document.getElementById("btnCopyGTasksFormat");
  if (btnCopyTasks) {
    btnCopyTasks.onclick = () => {
      const tasksFormatted = state.tasks.map(t => `[ ] ${t.title} (المخرج: ${t.activeOutput || ''})`).join("\n");
      navigator.clipboard.writeText(tasksFormatted).then(() => {
        showToast("تم نسخ مهام اليوم بتنسيق Google Tasks إلى الحافظة! 📋");
      }).catch(() => {
        prompt("انسخي مهام اليوم:", tasksFormatted);
      });
    };
  }

  const geminiInput = document.getElementById("geminiApiKeyInput");
  const btnSaveGeminiKey = document.getElementById("btnSaveGeminiKey");
  const geminiStatusTag = document.getElementById("geminiStatusTag");

  const savedGeminiKey = localStorage.getItem("shrouk_gemini_api_key");
  if (savedGeminiKey && geminiInput) {
    geminiInput.value = savedGeminiKey;
    if (geminiStatusTag) geminiStatusTag.textContent = "Gemini API متصل ✅";
  }

  if (btnSaveGeminiKey && geminiInput) {
    btnSaveGeminiKey.onclick = () => {
      const key = geminiInput.value.trim();
      if (key) {
        localStorage.setItem("shrouk_gemini_api_key", key);
        if (geminiStatusTag) geminiStatusTag.textContent = "Gemini API متصل ✅";
        showToast("تم حفظ مفتاح Gemini API بنجاح! ✨");
      }
    };
  }

  // Reset All Progress to 0% Handler
  const btnResetZero = document.getElementById("btnResetAllProgressToZero");
  if (btnResetZero) {
    btnResetZero.onclick = () => {
      if (confirm("هل ترغبين في تصفير جميع نسب الإنجاز إلى 0% للبدء بالتسجيل الفعلي من الآن؟")) {
        state.academicCourses.forEach(c => {
          if (c.topicsList) c.topicsList.forEach(t => t.completed = false);
        });
        state.trainings.forEach(t => {
          if (t.modulesList) t.modulesList.forEach(m => m.completed = false);
        });
        state.courses.forEach(k => {
          if (k.modulesList) k.modulesList.forEach(m => m.completed = false);
        });
        state.tasks.forEach(t => t.completed = false);
        if (state.books) state.books.forEach(b => b.currentPage = 0);

        saveState();
        renderAllViews();
        playNotificationSound("chime");
        showToast("تم تصفير جميع النسب بنجاح إلى 0%! يبدأ التسجيل الحقيقي الآن 🎯✨");
      }
    };
  }

  // =========================================================================
  // QUOTES MODAL
  // =========================================================================
  const quotesModal = document.getElementById("quotesModal");
  const openQuotesBtn = document.getElementById("openQuotesModalBtn");
  const closeQuotesBtn = document.getElementById("closeQuotesModalBtn");
  const closeQuotesFooterBtn = document.getElementById("closeQuotesFooterBtn");
  const nextQuoteBtn = document.getElementById("nextQuoteDialogBtn");
  const quoteTextEl = document.getElementById("dialogQuoteText");
  const quoteAuthorEl = document.getElementById("dialogQuoteAuthor");

  function pickRandomQuote() {
    const q = quotesLibrary[Math.floor(Math.random() * quotesLibrary.length)];
    if (quoteTextEl) quoteTextEl.textContent = q.text;
    if (quoteAuthorEl) quoteAuthorEl.textContent = q.author;
  }

  if (openQuotesBtn && quotesModal) {
    openQuotesBtn.onclick = () => {
      pickRandomQuote();
      quotesModal.classList.add("active");
    };
  }
  const closeQuotes = () => quotesModal && quotesModal.classList.remove("active");
  if (closeQuotesBtn) closeQuotesBtn.onclick = closeQuotes;
  if (closeQuotesFooterBtn) closeQuotesFooterBtn.onclick = closeQuotes;
  if (nextQuoteBtn) nextQuoteBtn.onclick = pickRandomQuote;

  // =========================================================================
  // NOTIFICATIONS SYSTEM WIRING
  // =========================================================================
  const btnNotif = document.getElementById("btnToggleNotifications");
  const notifIcon = document.getElementById("notifIcon");
  const notifLabel = document.getElementById("notifLabel");

  function updateNotificationUI() {
    if ("Notification" in window && Notification.permission === "granted") {
      if (btnNotif) btnNotif.classList.add("notif-active");
      if (notifLabel) notifLabel.textContent = "التنبيهات (مفعلة)";
      if (notifIcon) notifIcon.textContent = "🔔";
    } else {
      if (btnNotif) btnNotif.classList.remove("notif-active");
      if (notifLabel) notifLabel.textContent = "التنبيهات";
    }
  }

  if (btnNotif) {
    btnNotif.onclick = async () => {
      if (!("Notification" in window)) {
        showToast("المتصفح لا يدعم التنبيهات المنبثقة، ولكن نغمة الأجراس تعمل بنجاح! 🔔");
        playNotificationSound("chime");
        return;
      }

      if (Notification.permission === "granted") {
        triggerNotification("نظام تشغيل شروق الشخصي 🧬", "نظام التنبيهات نشط! تذكير: تسليم فدقة الجمعة 9 أكتوبر، وتدريب Berlitz الليلة.");
        showToast("تم إرسال إشعار تجريبي وتشغيل نغمة الإشعار بنجاح! 🔔✨");
      } else {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          updateNotificationUI();
          triggerNotification("مرحباً يا شروق! 🧬", "تم تفعيل التنبيهات بنجاح. ستصلكِ إشعارات عند انتهاء المؤقت ومواعيد التسليم.");
          showToast("تم تفعيل التنبيهات بنجاح! 🔔✨");
        } else {
          showToast("تم رفض إذن التنبيهات في المتصفح. يمكنكِ تفعيلها يدوياً من إعدادات الموقع.");
        }
      }
    };
  }
  updateNotificationUI();

  // =========================================================================
  // MOBILE & PWA GUIDE MODAL WIRING
  // =========================================================================
  const openMobileBtn = document.getElementById("openMobileModalBtn");
  const mobileModal = document.getElementById("mobileModal");
  const closeMobileBtn = document.getElementById("closeMobileModalBtn");
  const closeMobileFooterBtn = document.getElementById("closeMobileModalFooterBtn");

  if (openMobileBtn && mobileModal) {
    openMobileBtn.onclick = () => {
      const hint = document.getElementById("localIpHint");
      if (hint && window.location.hostname && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        hint.textContent = `http://${window.location.hostname}:8080`;
      }
      mobileModal.classList.add("active");
    };
  }
  if (closeMobileBtn && mobileModal) closeMobileBtn.onclick = () => mobileModal.classList.remove("active");
  if (closeMobileFooterBtn && mobileModal) closeMobileFooterBtn.onclick = () => mobileModal.classList.remove("active");

  // =========================================================================
  // UNIVERSITY SCHEDULE & APPOINTMENTS MODALS WIRING
  // =========================================================================
  const scheduleModal = document.getElementById("scheduleModal");
  const openScheduleBtn = document.getElementById("openScheduleModalBtn");
  const closeScheduleBtn = document.getElementById("closeScheduleModalBtn");
  const closeScheduleFooterBtn = document.getElementById("closeScheduleModalFooterBtn");

  if (openScheduleBtn && scheduleModal) openScheduleBtn.onclick = () => scheduleModal.classList.add("active");
  if (closeScheduleBtn && scheduleModal) closeScheduleBtn.onclick = () => scheduleModal.classList.remove("active");
  if (closeScheduleFooterBtn && scheduleModal) closeScheduleFooterBtn.onclick = () => scheduleModal.classList.remove("active");

  const appointmentsModal = document.getElementById("appointmentsModal");
  const openAppointmentsBtn = document.getElementById("openAppointmentsModalBtn");
  const closeAppointmentsBtn = document.getElementById("closeAppointmentsModalBtn");
  const closeAppointmentsFooterBtn = document.getElementById("closeAppointmentsModalFooterBtn");

  if (openAppointmentsBtn && appointmentsModal) openAppointmentsBtn.onclick = () => appointmentsModal.classList.add("active");
  if (closeAppointmentsBtn && appointmentsModal) closeAppointmentsBtn.onclick = () => appointmentsModal.classList.remove("active");
  if (closeAppointmentsFooterBtn && appointmentsModal) closeAppointmentsFooterBtn.onclick = () => appointmentsModal.classList.remove("active");

  // Close modals when clicking on overlay background
  [scheduleModal, appointmentsModal, mobileModal, document.getElementById("aiAssistantModal"), document.getElementById("quotesModal")].forEach(mod => {
    if (mod) {
      mod.addEventListener("click", (e) => {
        if (e.target === mod) mod.classList.remove("active");
      });
    }
  });

  // Helper Toast Notification
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "os-toast-notification";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 20);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  function translateDay(d) {
    const map = {
      "Saturday": "السبت", "Sunday": "الأحد", "Monday": "الاثنين",
      "Tuesday": "الثلاثاء", "Wednesday": "الأربعاء", "Thursday": "الخميس", "Friday": "الجمعة"
    };
    return map[d] || d;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  } catch (err) {
    console.error("FATAL ERROR IN initShroukOS:", err);
    window.__fatalErr = err.toString() + "\n" + (err.stack || "");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initShroukOS);
} else {
  initShroukOS();
}
