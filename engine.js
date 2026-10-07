// =========================================================================
// INTELLIGENT REASONING, ADAPTIVE PLANNING & REAL METRICS ENGINE
// =========================================================================

class PersonalOSEngine {
  constructor(state) {
    this.state = state;
  }

  // 1. CALCULATE REAL PROGRESS PERCENTAGES (No Fake/Hardcoded Numbers)
  calculateCourseProgress(course) {
    if (course.topicsList && course.topicsList.length > 0) {
      const completed = course.topicsList.filter(t => t.completed).length;
      return Math.round((completed / course.topicsList.length) * 100);
    }
    if (!course.topicsTotal || course.topicsTotal === 0) return 0;
    return Math.round((course.topicsCompleted / course.topicsTotal) * 100);
  }

  calculateTrainingProgress(training) {
    if (training.modulesList && training.modulesList.length > 0) {
      const comp = training.modulesList.filter(m => m.completed).length;
      return Math.round((comp / training.modulesList.length) * 100);
    }
    if (training.tasksTotal && training.tasksTotal > 0) {
      return Math.round((training.tasksCompleted / training.tasksTotal) * 100);
    }
    return 0;
  }

  calculateCourseItemProgress(item) {
    if (item.modulesList && item.modulesList.length > 0) {
      const comp = item.modulesList.filter(m => m.completed).length;
      return Math.round((comp / item.modulesList.length) * 100);
    }
    if (item.modulesTotal && item.modulesTotal > 0) {
      return Math.round((item.modulesCompleted / item.modulesTotal) * 100);
    }
    return 0;
  }

  calculateBookProgress(book) {
    if (!book.totalPages || book.totalPages === 0) return 0;
    return Math.round((book.currentPage / book.totalPages) * 100);
  }

  calculateTodayPlanProgress() {
    const total = this.state.tasks.length;
    if (total === 0) return 100;
    const completed = this.state.tasks.filter(t => t.completed).length;
    return Math.round((completed / total) * 100);
  }

  // 2. RANK TASKS FOR THE DAY
  rankTasksForDay(dayName = "Wednesday") {
    const tasks = [...this.state.tasks].filter(t => !t.completed);
    const dayCommitments = this.state.fixedSchedule.filter(s => s.day === dayName);

    const isHeavyDay = dayName === "Monday" || dayName === "Wednesday" || dayName === "Tuesday";

    return tasks.map(task => {
      let score = 0;
      let reasons = [];

      // A. Deadline Proximity
      if (task.deadline) {
        const today = new Date("2026-10-07");
        const due = new Date(task.deadline);
        const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

        if (diffDays <= 2) {
          score += 50;
          reasons.push(`اقتراب موعد التسليم الحرج (${diffDays <= 0 ? 'اليوم' : diffDays + ' يوم متبقي'})`);
        } else if (diffDays <= 5) {
          score += 25;
          reasons.push(`موعد التسليم خلال الأسبوع الجاري`);
        }
      }

      // B. Program Importance (Academic GPA 3.0+ Goal, FadaQa Urgent, Berlitz)
      const isAcademic = this.state.academicCourses.some(c => c.id === task.programId);
      if (isAcademic) {
        score += 35;
        reasons.push("مقرر أكاديمي (لدعم هدف المعدل التراكمي GPA +3.0)");
      } else if (task.programId === "fadaqa") {
        score += 30;
        reasons.push("مسار مهني عاجل (FadaQa PM) تسليم الجمعة 9 أكتوبر");
      } else if (task.programId === "berlitz") {
        score += 20;
        reasons.push("منحة لغوية نشطة تتطلب استمرارية التفاعل");
      }

      // C. Tier
      if (task.tier === "MUST") score += 25;
      if (task.tier === "SHOULD") score += 15;

      // D. Energy fit
      if (isHeavyDay && task.energyRequired === "Deep Focus") {
        score -= 15;
        reasons.push(`يوم كلية طويل (${dayName})؛ ينصح بعدم إجهاد الذهن بعد ساعات المعامل`);
      }

      return {
        ...task,
        calculatedScore: score,
        priorityExplanation: reasons.join(" • ")
      };
    }).sort((a, b) => b.calculatedScore - a.calculatedScore);
  }

  // 4. PREDICTIVE RECOMMENDATIONS & ALERTS
  getPredictiveRecommendations(dayName = "Wednesday") {
    const alerts = [];
    const today = new Date("2026-10-07");

    // Check deadlines
    this.state.tasks.filter(t => !t.completed && t.deadline).forEach(t => {
      const due = new Date(t.deadline);
      const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
      if (diffDays <= 2) {
        alerts.push({
          type: "critical",
          icon: "🚨",
          title: `تسليم حرج وشيك (${diffDays <= 0 ? 'اليوم' : diffDays + ' يوم متبقي'}): ${t.title}`,
          advice: `خصصي جلسة عمل مركزة مدتها 60-90 دقيقة لإغلاق هذا التسليم مبكراً وتجنب ضغط اللحظات الأخيرة.`
        });
      }
    });

    // Check day load
    if (dayName === "Monday" || dayName === "Wednesday") {
      alerts.push({
        type: "buffer",
        icon: "🛡️",
        title: `تنبؤ استراتيجي لليوم: دوام كامل في الكلية (8 ص - 4 م)`,
        advice: `مخزن التعافي من 4 إلى 6 م محمي برمجياً. نوصي بتخصيص المساء لمهام خفيفة أو مراجعة استرجاع نشط هادئة.`
      });
    } else if (dayName === "Thursday") {
      alerts.push({
        type: "strategic",
        icon: "🚀",
        title: `يوم الخميس: مساحة العمل العميق الاستراتيجي المفتوح`,
        advice: `أفضل فرصة لإنجاز تكليفات المسارات المهنية والتركيز على المقررات الصعبة بدون إرهاق الدوام.`
      });
    }

    return alerts;
  }

  // 3. GENERATE ADAPTIVE DAILY PLAN
  generateAdaptiveDailyPlan(dayName = "Wednesday") {
    const ranked = this.rankTasksForDay(dayName);
    const dayCommitments = this.state.fixedSchedule.filter(s => s.day === dayName);

    const mustTasks = ranked.filter(t => t.tier === "MUST");
    const shouldTasks = ranked.filter(t => t.tier === "SHOULD");
    const couldTasks = ranked.filter(t => t.tier === "COULD");

    const isHeavyDay = dayName === "Monday" || dayName === "Wednesday";

    return {
      dayName,
      fixedCommitments: dayCommitments,
      must: mustTasks.slice(0, 2),
      should: shouldTasks.slice(0, 2),
      could: couldTasks.slice(0, 2),
      systemAdvice: isHeavyDay
        ? "اليوم يشمل دوام جامعة طويل (8 ص - 4 م) + جلسة تدريس 6 م. تم حماية فترة 4-6 م كفترة راحة وتعافٍ إجبارية. تم تقليص مهام اليوم للحد الأدنى لتجنب الإرهاق."
        : "اليوم يتيح مرونة وسعة ذهنية أعلى للتركيز على المهام العميقة والمسارات المهنية."
    };
  }

  // 4. TRIAGE TASK
  triageTask(taskId, action, payload = {}) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (!task) return null;

    switch (action) {
      case "RESCHEDULE":
        task.deferredCount = (task.deferredCount || 0) + 1;
        task.deadline = payload.newDate || "2026-10-15";
        return { task, message: `تمت إعادة جدولة المهمة إلى ${task.deadline} بكل مرونة.` };

      case "CONVERT_TO_WAITING":
        const waitingItem = {
          id: "w_" + Date.now(),
          subject: task.title,
          entity: payload.entity || "جهة خارجية",
          dateRequested: new Date().toISOString().split("T")[0],
          expectedResponse: "خلال أيام",
          followUpDate: "خلال أسبوع",
          status: "Waiting",
          notes: "تم تحويلها لغرفة الانتظار لأنها معلقة على رد خارجي"
        };
        this.state.waitingRoom.push(waitingItem);
        this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
        return { waitingItem, message: "تم نقل المهمة لغرفة الانتظار لتصفية ذهنك." };

      case "DROP":
        this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
        return { droppedTask: task, message: "تم استبعاد المهمة بوعي استراتيجي." };

      default:
        return null;
    }
  }

  // 5. DEADLINE RADAR
  getDeadlineRadar() {
    const today = new Date("2026-10-07");
    const radar = {
      today: [],
      next3Days: [],
      next7Days: [],
      next14Days: [],
      later: []
    };

    this.state.tasks.filter(t => !t.completed && t.deadline).forEach(task => {
      const due = new Date(task.deadline);
      const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

      let risk = "🟢 آمن";
      if (diffDays <= 2) risk = "🔴 حرج";
      else if (diffDays <= 5) risk = "🟡 تنبيه";

      const item = { ...task, diffDays, riskLabel: risk };

      if (diffDays <= 0) radar.today.push(item);
      else if (diffDays <= 3) radar.next3Days.push(item);
      else if (diffDays <= 7) radar.next7Days.push(item);
      else if (diffDays <= 14) radar.next14Days.push(item);
      else radar.later.push(item);
    });

    return radar;
  }
}
