// =========================================================================
// INITIAL SEED STATE FOR SHROUK'S PERSONAL OPERATING SYSTEM (V3 INTERACTIVE)
// =========================================================================

const INITIAL_STATE = {
  profile: {
    name: "شروق عماد",
    title: "Biotechnology Scholar & Systems Builder",
    university: "Damietta University (Biotechnology Track)",
    targetGpa: "3.0+ GPA",
    topAcademicFocus: "Nuclear & Cytoplasmic Genetics"
  },

  // 1. UNIVERSITY ACADEMIC STUDY (الدراسة الأكاديمية - جميع المواد مع موضوعات تفاعلية)
  academicCourses: [
    {
      id: "genetics",
      name: "Nuclear & Cytoplasmic Genetics",
      code: "BIO-301",
      priority: "الأولوية الأكاديمية القصوى",
      targetGrade: "A+",
      components: {
        lecture: { hours: 2, prepStyle: "فهم عميق وتفكيك الآليات الوراثية", reviewCycle: "استرجاع نشط ورسم آليات CMS" },
        practical: { hours: 2, prepStyle: "بروتوكول المعمل وفحص الصبغيات", reviewCycle: "سجل المشاهدات المجهرية" },
        tutorial: { hours: 1, prepStyle: "حل مسائل النسب غير المندلية", reviewCycle: "حل 10 مسائل بدون مذكرات" }
      },
      topicsList: [
        { id: "gen_1", name: "Chromosome Structure & Chromatin Remodeling", completed: false },
        { id: "gen_2", name: "Mendelian Genetics Review & Extensions", completed: false },
        { id: "gen_3", name: "Mitochondrial & Chloroplast DNA Organization", completed: false },
        { id: "gen_4", name: "Maternal Effect & Organelle Inheritance", completed: false },
        { id: "gen_5", name: "Cytoplasmic Male Sterility (CMS) Mechanisms", completed: false },
        { id: "gen_6", name: "Non-Mendelian Ratios & Epistasis Interaction", completed: false },
        { id: "gen_7", name: "Plasmids & Extrachromosomal Inheritance in Yeast", completed: false },
        { id: "gen_8", name: "Genomic Imprinting & Epigenetic Controls", completed: false },
        { id: "gen_9", name: "Cytoplasmic Mutation Analysis & Pedigrees", completed: false },
        { id: "gen_10", name: "Comprehensive Problem Solving & Exam Prep", completed: false }
      ]
    },
    {
      id: "biotech_fund",
      name: "Fundamentals & Theories of Biotechnology",
      code: "BIO-302",
      priority: "تخصص أساسي",
      targetGrade: "A+",
      components: {
        lecture: { hours: 2, prepStyle: "تطبيقات الـ Recombinant DNA", reviewCycle: "خرائط مفاهيم" },
        practical: { hours: 2, prepStyle: "Gel Prep & Pipetting", reviewCycle: "مراجعة خطوات التجربة" }
      },
      topicsList: [
        { id: "bt_1", name: "History & Historical Eras of Biotechnology", completed: false },
        { id: "bt_2", name: "Recombinant DNA Technology Core Principles", completed: false },
        { id: "bt_3", name: "Cloning Vectors: Plasmids, Cosmids & Phages", completed: false },
        { id: "bt_4", name: "Vector Selection Constraints & Expression Systems", completed: false },
        { id: "bt_5", name: "PCR Principles & Primer Design", completed: false },
        { id: "bt_6", name: "Gene Editing & CRISPR-Cas9 Overview", completed: false },
        { id: "bt_7", name: "Industrial & Agricultural Biotech Applications", completed: false },
        { id: "bt_8", name: "Biosafety, Ethics & Intellectual Property", completed: false }
      ]
    },
    {
      id: "bacteria",
      name: "General & Medical Bacteria",
      code: "MIC-201",
      priority: "مهم جداً",
      targetGrade: "A",
      components: {
        lecture: { hours: 2, prepStyle: "آليات الإمراضية وتصنيف البكتيريا", reviewCycle: "بطاقات استرجاع نشط" },
        practical: { hours: 2, prepStyle: "Gram Staining & Culture media", reviewCycle: "التعرف على المستعمرات" }
      },
      topicsList: [
        { id: "bac_1", name: "Bacterial Cell Wall Architecture (Gram+ vs Gram-)", completed: false },
        { id: "bac_2", name: "Bacterial Growth Curve & Chemostat Dynamics", completed: false },
        { id: "bac_3", name: "Culture Media Formulation & Sterilization", completed: false },
        { id: "bac_4", name: "Pathogenic Staphylococci & Streptococci", completed: false },
        { id: "bac_5", name: "Biochemical Identification Tests (IMViC / Catalase)", completed: false },
        { id: "bac_6", name: "Enterobacteriaceae & Gram-Negative Bacilli", completed: false },
        { id: "bac_7", name: "Bacterial Toxins: Exotoxins vs Endotoxins", completed: false },
        { id: "bac_8", name: "Antibiotic Resistance & Beta-Lactamases", completed: false },
        { id: "bac_9", name: "Clinical Diagnosis & Specimen Handling", completed: false }
      ]
    },
    {
      id: "biochem",
      name: "Intro Biochemistry",
      code: "CHM-204",
      priority: "مهم",
      targetGrade: "B",
      components: {
        lecture: { hours: 2, prepStyle: "المركبات الجزيئية وحركية الإنزيمات", reviewCycle: "رسم المسارات الكيميائية" },
        practical: { hours: 2, prepStyle: "Spectrophotometry & Assays", reviewCycle: "حسابات المنحنيات" }
      },
      topicsList: [
        { id: "bc_1", name: "Water Properties, pH & Buffers in Biology", completed: false },
        { id: "bc_2", name: "Amino Acids Classification & Peptide Bond Formation", completed: false },
        { id: "bc_3", name: "Protein Structure: Primary to Quaternary", completed: false },
        { id: "bc_4", name: "Enzyme Kinetics: Michaelis-Menten Equation", completed: false },
        { id: "bc_5", name: "Lineweaver-Burk Double Reciprocal Plots", completed: false },
        { id: "bc_6", name: "Enzyme Inhibition: Competitive vs Non-Competitive", completed: false },
        { id: "bc_7", name: "Carbohydrate Metabolism: Glycolysis Flow", completed: false },
        { id: "bc_8", name: "Citric Acid Cycle & Oxidative Phosphorylation", completed: false }
      ]
    },
    {
      id: "analytical_chem",
      name: "Analytical Chemistry",
      code: "CHM-202",
      priority: "متوسط إلى مرتفع",
      targetGrade: "B",
      components: {
        lecture: { hours: 2, prepStyle: "الاتزان الكيميائي ومعايرة الأحماض", reviewCycle: "حل مسائل المعايرة" },
        practical: { hours: 2, prepStyle: "Volumetric titration", reviewCycle: "حساب نسبة الخطأ" }
      },
      topicsList: [
        { id: "ac_1", name: "Units of Concentration (Molarity, Normality, ppm)", completed: false },
        { id: "ac_2", name: "Chemical Equilibrium & Le Chatelier's Principle", completed: false },
        { id: "ac_3", name: "Acid-Base Titration Curves & Indicators", completed: false },
        { id: "ac_4", name: "Buffer Capacity Equations & Preparation", completed: false },
        { id: "ac_5", name: "Precipitation Titration (Mohr & Volhard Methods)", completed: false },
        { id: "ac_6", name: "Complexometric Titration with EDTA", completed: false },
        { id: "ac_7", name: "Redox Titration & Electrochemical Cells", completed: false },
        { id: "ac_8", name: "Spectrophotometric Error Analysis", completed: false }
      ]
    },
    {
      id: "fungi",
      name: "Fungi & Plant Diseases",
      code: "BOT-205",
      priority: "متوسط",
      targetGrade: "A",
      components: {
        lecture: { hours: 2, prepStyle: "دورات حياة الفطريات وتصنيف الجراثيم", reviewCycle: "رسم دورات الحياة" },
        practical: { hours: 1.5, prepStyle: "شرائح الفحص المجهري", reviewCycle: "رسم الشرائح باليد" }
      },
      topicsList: [
        { id: "bot_1", name: "General Characteristics & Fungal Ultrastructure", completed: false },
        { id: "bot_2", name: "Zygomycota: Rhizopus Life Cycle & Spores", completed: false },
        { id: "bot_3", name: "Ascomycetes Life Cycle & Ascospore Development", completed: false },
        { id: "bot_4", name: "Basidiomycetes: Rusts & Smuts in Crops", completed: false },
        { id: "bot_5", name: "Phytophthora & Late Blight in Potatoes", completed: false },
        { id: "bot_6", name: "Host-Pathogen Interactions & Plant Defense", completed: false },
        { id: "bot_7", name: "Antifungal Agents & Crop Protection Strategies", completed: false }
      ]
    },
    {
      id: "math_calc",
      name: "General Math / Calculus 2",
      code: "MTH-102",
      priority: "متوسط",
      targetGrade: "B",
      components: {
        lecture: { hours: 2, prepStyle: "قواعد التكامل والمعادلات التفاضلية", reviewCycle: "حل مسائل مكثف" },
        tutorial: { hours: 1.5, prepStyle: "شيت التمارين الأسبوعي", reviewCycle: "تثبيت القوانين" }
      },
      topicsList: [
        { id: "mth_1", name: "Techniques of Integration: Substitution Rule", completed: false },
        { id: "mth_2", name: "Integration by Parts Formula & Drills", completed: false },
        { id: "mth_3", name: "Trigonometric Integrals & Substitutions", completed: false },
        { id: "mth_4", name: "Partial Fractions Decomposition", completed: false },
        { id: "mth_5", name: "First-Order Differential Equations in Biology", completed: false },
        { id: "mth_6", name: "Exponential Growth & Decay Modeling", completed: false },
        { id: "mth_7", name: "Definite Integrals: Area & Volume of Solids", completed: false },
        { id: "mth_8", name: "Infinite Sequences & Convergence Tests", completed: false }
      ]
    },
    {
      id: "sci_term",
      name: "Scientific Terminology",
      code: "GEN-101",
      priority: "قياسي",
      targetGrade: "A+",
      components: {
        lecture: { hours: 1, prepStyle: "الجذور اللاتينية والمصطلحات الحيوية", reviewCycle: "استرجاع معاني المصطلحات" }
      },
      topicsList: [
        { id: "st_1", name: "Greek & Latin Roots in Biological Sciences", completed: false },
        { id: "st_2", name: "Prefixes for Anatomical & Cellular Structures", completed: false },
        { id: "st_3", name: "Suffixes Indicating Pathology & Procedures", completed: false },
        { id: "st_4", name: "Biotechnology & Genetic Engineering Vocabulary", completed: false },
        { id: "st_5", name: "Clinical & Diagnostic Terminology", completed: false },
        { id: "st_6", name: "Scientific Writing & Reading Terminology", completed: false }
      ]
    }
  ],

  // 2. PROFESSIONAL TRAININGS & TRACKS (التدريبات والمسارات المهنية)
  trainings: [
    {
      id: "fadaqa",
      title: "FadaQa — Product Management",
      category: "مسار مهني وتدريب معتمد",
      lifecycle: "Active",
      health: "Needs Attention",
      weeklyTargetHours: 4.0,
      actualHoursThisWeek: 1.5,
      urgentDeadline: "2026-10-09",
      urgentTask: "تسليم تكليف الـ PRD في Google Classroom قبل الجمعة 9 أكتوبر",
      nextAction: "مشاهدة تسجيل المحاضرة 3 وصياغة الـ User Journey",
      notes: "تسليم الجمعة حرج جداً لتفادي تأخير التقييم في المسار.",
      modulesList: [
        { id: "fad_1", name: "المحاضرة 1: مدخل إدارة المنتجات ودورة حياة المنتج", completed: false },
        { id: "fad_2", name: "المحاضرة 2: أبحاث المستخدم وبناء الـ Persona", completed: false },
        { id: "fad_3", name: "المحاضرة 3: صياغة الـ PRD و User Journey (تكليف الجمعة 9 أكتوبر)", completed: false },
        { id: "fad_4", name: "المحاضرة 4: ترتيب الأولويات (RICE & MoSCoW Framework)", completed: false },
        { id: "fad_5", name: "المحاضرة 5: مؤشرات الأداء والـ OKRs والـ Go-To-Market", completed: false }
      ]
    },
    {
      id: "ai_ambassadors",
      title: "AI Ambassadors (سفراء الذكاء الاصطناعي)",
      category: "قيادة وذكاء اصطناعي",
      lifecycle: "Active",
      health: "Healthy",
      weeklyTargetHours: 6.0,
      actualHoursThisWeek: 3.0,
      schedulePattern: "السبت والثلاثاء (8 - 11 م)",
      nextAction: "حضور ورشة الثلاثاء وتجهيز تحديث مشروع الـ ML",
      notes: "مواعيد مسائية ثابتة مرتين أسبوعياً.",
      modulesList: [
        { id: "ai_1", name: "ورشة التعريف ببرنامج السفراء وتحديد المسارات", completed: false },
        { id: "ai_2", name: "أساسيات نماذج الذكاء الاصطناعي التوليدي LLMs", completed: false },
        { id: "ai_3", name: "هندسة الأوامر المتقدمة (Advanced Prompt Engineering)", completed: false },
        { id: "ai_4", name: "بناء تطبيقات بالذكاء الاصطناعي وربط الـ APIs", completed: false },
        { id: "ai_5", name: "تجهيز وتطوير المشروع الجماعي الأسبوعي", completed: false },
        { id: "ai_6", name: "جلسة العرض والمناقشة المباشرة (السبت/الثلاثاء)", completed: false },
        { id: "ai_7", name: "الهاكاثون الداخلي وتقييم النماذج", completed: false },
        { id: "ai_8", name: "المشروع الختامي ونشر الحلول الذكية", completed: false }
      ]
    },
    {
      id: "mckinsey_forward",
      title: "McKinsey Forward",
      category: "تطوير استراتيجي وقيادي",
      lifecycle: "Active",
      health: "Stalled",
      weeklyTargetHours: 1.0,
      actualHoursThisWeek: 0.0,
      nextAction: "جلسة تنشيط تدريجية ساعة واحدة يوم الخميس لإنهاء الفصل 2",
      notes: "إعادة تنشيط هادئة بدون محاولة تعويض كل شيء دفعة واحدة.",
      modulesList: [
        { id: "mck_1", name: "Foundation Module: Adaptive Mindset & Resilience", completed: false },
        { id: "mck_2", name: "Problem Solving Frameworks (Structured Thinking)", completed: false },
        { id: "mck_3", name: "Digital & AI Fluency for Young Leaders", completed: false },
        { id: "mck_4", name: "Communicating for Impact & Influence", completed: false },
        { id: "mck_5", name: "Final Cohort Reflection & Action Plan", completed: false }
      ]
    },
    {
      id: "fsp_2",
      title: "FSP 2.0 Product Management",
      category: "مسار مهني معتمد",
      lifecycle: "Accepted",
      health: "Healthy",
      weeklyTargetHours: 2.5,
      actualHoursThisWeek: 0.5,
      nextAction: "مراجعة خارطة طريق المسار والربط مع مفاهيم فدقة",
      notes: "مسار مقبول يعزز مهارات إدارة المنتجات.",
      modulesList: [
        { id: "fsp_1", name: "Onboarding & Product Track Orientation", completed: false },
        { id: "fsp_2", name: "Market Research & Competitive Analysis", completed: false },
        { id: "fsp_3", name: "Feature Scoping & MVP Definition", completed: false },
        { id: "fsp_4", name: "Agile & Scrum for Product Managers", completed: false },
        { id: "fsp_5", name: "Final Capstone Presentation", completed: false }
      ]
    },
    {
      id: "red_crescent",
      title: "الهلال الأحمر المصري (Egyptian Red Crescent)",
      category: "تطوع وخدمة مجتمعية",
      lifecycle: "Active",
      health: "Healthy",
      weeklyTargetHours: 1.5,
      actualHoursThisWeek: 1.0,
      nextAction: "تنسيق منشور التوعية الميدانية",
      notes: "مهام خفيفة في الأمسيات المستقرة.",
      modulesList: [
        { id: "rc_1", name: "برنامج تدريب الإسعافات الأولية الأساسي", completed: false },
        { id: "rc_2", name: "إدارة الأزمات والتطوع الميداني", completed: false },
        { id: "rc_3", name: "حملات التوعية الصحية المجتمعية", completed: false },
        { id: "rc_4", name: "تنسيق القوافل الطبية القادمة", completed: false }
      ]
    },
    {
      id: "yia",
      title: "YIA Mentoring & Youth Leadership",
      category: "إرشاد وتوجيه طلابي",
      lifecycle: "Active",
      health: "Healthy",
      weeklyTargetHours: 1.5,
      actualHoursThisWeek: 1.5,
      nextAction: "الرد على استفسارات الطلاب في الشات",
      notes: "مرتبط بالطلبات المباشرة من الطلاب.",
      modulesList: [
        { id: "yia_1", name: "جلسات التوجيه الأكاديمي للطلاب الجدد", completed: false },
        { id: "yia_2", name: "بناء خطط الاستذكار وتنظيم الوقت", completed: false },
        { id: "yia_3", name: "الإرشاد في مسارات المنح والأنشطة", completed: false },
        { id: "yia_4", name: "جلسة المتابعة الدورية الفردية", completed: false },
        { id: "yia_5", name: "تقييم مخرجات الطلاب الشهرية", completed: false }
      ]
    }
  ],

  // 3. COURSES & SELF-DEVELOPMENT (الكورسات وتطوير الذات - قابلة للإضافة والتعديل)
  courses: [
    {
      id: "berlitz",
      title: "منحة Berlitz / English for All",
      category: "منحة لغوية وتطوير مهني",
      platform: "بوابة Berlitz الرسمية",
      lifecycle: "Active",
      health: "Healthy",
      weeklyTargetHours: 3.5,
      actualHoursThisWeek: 1.0,
      streakDays: 4,
      accountStatus: "مقبولة ونشطة — تتطلب استمرار التفاعل والممارسة",
      nextAction: "إنهاء تدريبات التحدث والاستماع في الوحدة 1 على البوابة",
      notes: "منحة مؤكدة تستلزم تخصيص وقت أسبوعي ثابت للحفاظ على المنحة.",
      modulesList: [
        { id: "bz_1", name: "الوحدة 1: اختبار تحديد المستوى والمحادثة الافتتاحية", completed: false },
        { id: "bz_2", name: "الوحدة 2: Listening & Audio Drills (تمارين الاستماع)", completed: false },
        { id: "bz_3", name: "الوحدة 3: Professional Vocabulary & Fluency (المفردات)", completed: false },
        { id: "bz_4", name: "الوحدة 4: Live Speaking Session (جلسة تحدث حية)", completed: false },
        { id: "bz_5", name: "الوحدة 5: Business Communication & Email Writing", completed: false },
        { id: "bz_6", name: "الوحدة 6: Presentation Skills & Pronunciation", completed: false },
        { id: "bz_7", name: "الوحدة 7: Advanced Conversation Workshop", completed: false },
        { id: "bz_8", name: "الوحدة 8: Final Level Assessment & Certificate", completed: false }
      ]
    },
    {
      id: "ieee",
      title: "IEEE Technical Workshops & Learning",
      category: "مجتمع تقني وورش عمل",
      platform: "منصة IEEE التعليمية",
      lifecycle: "Active",
      health: "Healthy",
      weeklyTargetHours: 2.0,
      actualHoursThisWeek: 0.5,
      nextAction: "مشاهدة تسجيل ورشة تحليل البيانات الحيوية يوم الجمعة",
      notes: "محتوى مسجل يفضل جدولته صباح الجمعة.",
      modulesList: [
        { id: "ieee_1", name: "ورشة أدوات البحث العلمي وقواعد البيانات", completed: false },
        { id: "ieee_2", name: "مدخل البرمجة بلغة بايثون في تحليل البيانات الحيوية", completed: false },
        { id: "ieee_3", name: "ورشة كتابة الأوراق العلمية والتوثيق", completed: false },
        { id: "ieee_4", name: "تحليل التسلسلات الجينية وأدوات الـ Bioinformatics", completed: false },
        { id: "ieee_5", name: "تطبيقات التعلم الآلي في التكنولوجيا الحيوية", completed: false },
        { id: "ieee_6", name: "المشروع التطبيقي والمناقشة الختامية", completed: false }
      ]
    }
  ],

  // 4. SHROUK'S PERSONAL CORNER: BOOKS & READING
  books: [
    {
      id: "book_fallacies",
      title: "المغالطات المنطقية (فصول في المنطق غير الصوري)",
      author: "د. عادل مصطفى",
      totalPages: 340,
      currentPage: 0,
      category: "فلسفة وتفكير نقدي",
      status: "قيد القراءة حالياً 📖",
      keyTakeaways: [
        "مغالطة رجل القش: تحريف حجة الخصم لتسهيل نقضها.",
        "مغالطة الحجة الشخصية (Ad Hominem): الهجوم على شخص صاحب الحجة بدلاً من الحجة نفسها.",
        "مغالطة التماس السؤال: مصادرة على المطلوب وجعل النتيجة إحدى المقدمات."
      ],
      nextReadingTarget: "قراءة مغالطة الاحتكام إلى الجهل + مغالطة السؤال المشحون (ص 126 - 150)"
    },
    {
      id: "book_deep_work",
      title: "Deep Work (التركيز والعمل العميق)",
      author: "Cal Newport",
      totalPages: 290,
      currentPage: 0,
      category: "إنتاجية ونظم ذهنية",
      status: "قيد المراجعة والتطبيق",
      keyTakeaways: [
        "القدرة على العمل العميق تصبح نادرة ومطلوبة في نفس الوقت.",
        "تفريغ فترات محددة بدون مشتتات ينتج أضعاف العمل المبعثر."
      ],
      nextReadingTarget: "فصل بناء طقوس التركيز الصباحية"
    }
  ],

  // 5. SHROUK'S PERSONAL CORNER: BRAINSTORM & IDEAS BANK (CATEGORIZED & FRESH)
  personalIdeas: [
    // Academic & Research Ideas (أفكار أكاديمية وبحثية)
    {
      id: "idea_ac_1",
      title: "بناء بنك أسئلة استرجاع نشط (Active Recall System) للبكتيريا والوراثة",
      category: "academic",
      categoryLabel: "🎓 فكرة دراسية وبحثية",
      description: "تحويل السلايدات إلى أسئلة فهم عميق ومخططات مقارنة لدعم هدف المعدل GPA +3.0 في الامتحانات.",
      suggestedOutput: "ملف بنك أسئلة يحتوي على 50 سؤال استرجاع نشط",
      status: "قيد التنفيذ 🚀",
      dateAdded: "2026-10-06"
    },
    {
      id: "idea_ac_2",
      title: "مخطط خوارزمي مقارن لآليات الانتقال غير المندلي وتوارث الميتوكوندريا",
      category: "academic",
      categoryLabel: "🎓 فكرة دراسية وبحثية",
      description: "تصميم ورقة ملخصة تجمع حالات الوراثة السيتوبلازمية و CMS والنسب غير المندلية بدون مذكرات.",
      suggestedOutput: "مخطط بصري ملخص شامل (Cheat Sheet)",
      status: "فكرة مسجلة",
      dateAdded: "2026-10-05"
    },
    {
      id: "idea_ac_3",
      title: "أتمتة حسابات تجارب الكيمياء التحليلية وحركية الإنزيمات ببرنامج بايثون",
      category: "academic",
      categoryLabel: "🎓 فكرة دراسية وبحثية",
      description: "كتابة سكريبت بسيط يرسم منحنيات Lineweaver-Burk ومعايرة الأحماض لحساب النتائج المعملية بدقة.",
      suggestedOutput: "سكريبت بايثون لحساب قيم Km و Vmax",
      status: "فكرة جديدة",
      dateAdded: "2026-10-07"
    },

    // Courses & Tracks Ideas (أفكار الكورسات والمسارات المهنية)
    {
      id: "idea_cr_1",
      title: "صياغة PRD متكامل لمشروع تطبيقي في التكنولوجيا الحيوية (مسار فدقة)",
      category: "courses",
      categoryLabel: "💼 أفكار الكورسات والمسارات",
      description: "تطبيق أدوات إدارة المنتجات التي نتعلمها في فدقة على مشكلة حيوية واقعية مثل كشف التلوث الجرثومي.",
      suggestedOutput: "وثيقة متطلبات منتج (PRD) من 4 صفحات",
      status: "قيد التخطيط",
      dateAdded: "2026-10-06"
    },
    {
      id: "idea_cr_2",
      title: "تسجيل بودكاست صوتي أسبوعي دقيقتين باللغة الإنجليزية (منحة Berlitz)",
      category: "courses",
      categoryLabel: "💼 أفكار الكورسات والمسارات",
      description: "شرح مفهوم علمي أو تلخيص موضوع من مواضيع الأسبوع باللغة الإنجليزية لتطوير طلاقة المحادثة.",
      suggestedOutput: "ملف تسجيل صوتي وتفريغ المفردات الجديدة",
      status: "فكرة جديدة",
      dateAdded: "2026-10-07"
    },
    {
      id: "idea_cr_3",
      title: "نموذج ذكاء اصطناعي لتصنيف متواليات الـ DNA (مشروع سفراء الذكاء الاصطناعي)",
      category: "courses",
      categoryLabel: "💼 أفكار الكورسات والمسارات",
      description: "استخدام أدوات البرمجة وهندسة الأوامر لبناء بروتوتايب عملي لمشروع المسار قبل الهاكاثون.",
      suggestedOutput: "بروتوتايب تجريبي على Google Colab",
      status: "قيد التخطيط",
      dateAdded: "2026-10-04"
    },

    // Personal & Creative Ideas (أفكار ومشاريع شخصية وتطوير ذاتي)
    {
      id: "idea_ps_1",
      title: "كتيب مرئي: أشهر 10 مغالطات منطقية في النقاشات الأكاديمية والعلمية",
      category: "personal",
      categoryLabel: "💡 فكرة ومشروع شخصي",
      description: "مستوحى من قراءة كتاب المغالطات المنطقية لد. عادل مصطفى، مع أمثلة حية من المجتمع الجامعي.",
      suggestedOutput: "ملف منشورات ومخطط إنفوجرافيك للمغالطات",
      status: "قيد التنفيذ 🚀",
      dateAdded: "2026-10-05"
    },
    {
      id: "idea_ps_2",
      title: "بناء أرشيف استراتيجي للمنح والفرص المستقبلية مع شروط التقديم",
      category: "personal",
      categoryLabel: "💡 فكرة ومشروع شخصي",
      description: "جمع فرص ITIDA، TIEC، Creativa، والمنح الدولية مع مواعيد التقديم والمستندات المطلوبة مسبقاً.",
      suggestedOutput: "جدول بيانات مصفوفة الفرص والمواعيد",
      status: "فكرة جديدة",
      dateAdded: "2026-10-07"
    }
  ],

  // 6. TASKS MODEL
  tasks: [
    {
      id: "t_fadaqa",
      programId: "fadaqa",
      title: "تسليم تكليف FadaQa Assignment 1 (Product Specification)",
      tier: "MUST",
      target: "رفع التكليف كاملاً في Google Classroom قبل الجمعة 9 أكتوبر",
      finishLine: "ظهور إشعار 'Turned In' في الكلاس روم",
      activeOutput: "ملف PDF يحتوي على مسودة الـ PRD وخريطة مسار المستخدم",
      nextAction: "فتح الكلاس روم ← استخراج عناصر الواجب ← كتابة المسودة الأولى",
      energyRequired: "Deep Focus",
      estimatedMinutes: 90,
      deadline: "2026-10-09",
      completed: false,
      deferredCount: 0
    },
    {
      id: "t_genetics_recall",
      programId: "genetics",
      title: "جلسة وراثة نشطة: Cytoplasmic Inheritance & Male Sterility",
      tier: "MUST",
      target: "إتقان وحل مسائل الوراثة السيتوبلازمية بدون الاستعانة بالمذكرات",
      finishLine: "الإجابة الصحيحة على 10 أسئلة استرجاع ورسم آلية التوارث الذكري",
      activeOutput: "ورقة بيضاء مرسوم عليها مخطط CMS + قائمة الفروق المندلية",
      nextAction: "إغلاق السلايدات والبدء بالرسم الحر للكروموسومات والميتوكوندريا",
      energyRequired: "Deep Focus",
      estimatedMinutes: 60,
      deadline: "2026-10-10",
      completed: false,
      deferredCount: 0
    },
    {
      id: "t_berlitz_practice",
      programId: "berlitz",
      title: "منحة Berlitz: إتمام جلسة التحدث والتدريب الصوتي (الوحدة 1)",
      tier: "SHOULD",
      target: "المحافظة على المستهدف الأسبوعي (3.5 ساعات) والتفاعل النشط",
      finishLine: "اكتمال تدريبات الوحدة 1 بنسبة 100% على بوابة Berlitz",
      activeOutput: "تسجيل 45 دقيقة استماع وتحدث + تدوين 15 مفردة جديدة",
      nextAction: "تسجيل الدخول إلى حساب Berlitz والبدء بالوحدة الأولى",
      energyRequired: "Medium Focus",
      estimatedMinutes: 45,
      deadline: "2026-10-11",
      completed: false,
      deferredCount: 0
    },
    {
      id: "t_reading_fallacies",
      programId: "personal",
      title: "قراءة 25 صفحة من كتاب المغالطات المنطقية (د. عادل مصطفى)",
      tier: "COULD",
      target: "استيعاب مغالطتي الاحتكام إلى الجهل والسؤال المشحون",
      finishLine: "الوصول إلى صفحة 150 وتلخيص مثال واقعي على كل مغالطة",
      activeOutput: "صفحة ملخص في كشكول القراءة",
      nextAction: "فتح الكتاب عند ص 125 وقراءة الفصل بتركيز",
      energyRequired: "Medium Focus",
      estimatedMinutes: 40,
      deadline: "2026-10-12",
      completed: false,
      deferredCount: 0
    }
  ],

  // 7. TIME BUDGETS
  timeBudgets: {
    academicStudy: { planned: 12.0, actual: 5.5 },
    berlitz: { planned: 3.5, actual: 1.0 },
    fadaqa: { planned: 4.0, actual: 1.5 },
    aiAmbassadors: { planned: 6.0, actual: 3.0 },
    mckinsey: { planned: 1.0, actual: 0.0 },
    recoveryBuffer: { planned: 4.0, actual: 4.0 }
  },

  // 8. LOGGED PROGRESS REPORTS
  reports: [
    {
      id: "rep_1",
      date: "2026-10-06",
      type: "تقرير يومي",
      title: "تقرير إنجاز الثلاثاء الأكاديمي والذكاء الاصطناعي",
      achievements: "حضور دوام الكلية ومختبر البكتيريا + حضور ورشة سفراء الذكاء الاصطناعي (8-11 م) والتفاعل مع تحديثات المشروع.",
      challenges: "طاقة اليوم كانت مستهلكة بعد 6 ساعات كلية، وتم تفعيل مخزن التعافي بامتياز دون ضغط إضافي.",
      energyLevel: "متوسطة ومستقرة",
      notes: "تم نقل مهام الوراثة الثقيلة ليوم الخميس حيث تتوفر سعة ذهنية عالية."
    }
  ],

  // 9. FIXED SCHEDULE & BUFFERS
  fixedSchedule: [
    { id: "sat_uni", day: "Saturday", title: "جامعة دمياط (دوام عملي ونظري)", start: "09:00", end: "14:00", type: "university" },
    { id: "sat_ai", day: "Saturday", title: "جلسة سفراء الذكاء الاصطناعي (AI Ambassadors)", start: "20:00", end: "23:00", type: "commitment" },
    { id: "sun_uni", day: "Sunday", title: "جامعة دمياط (محاضرات ومعامل)", start: "10:00", end: "15:00", type: "university" },
    { id: "mon_uni", day: "Monday", title: "جامعة دمياط (دوام طويل)", start: "08:00", end: "16:00", type: "university" },
    { id: "mon_buffer", day: "Monday", title: "☕ مخزن تعافٍ وراحة إجباري محمي (NO DEEP WORK)", start: "16:00", end: "18:00", type: "recovery" },
    { id: "mon_tutoring", day: "Monday", title: "جلسة تدريس وتوجيه طلابي", start: "18:00", end: "19:30", type: "mentoring" },
    { id: "tue_uni", day: "Tuesday", title: "جامعة دمياط", start: "10:00", end: "16:00", type: "university" },
    { id: "tue_ai", day: "Tuesday", title: "جلسة سفراء الذكاء الاصطناعي (AI Ambassadors)", start: "20:00", end: "23:00", type: "commitment" },
    { id: "wed_uni", day: "Wednesday", title: "جامعة دمياط (دوام طويل)", start: "08:00", end: "16:00", type: "university" },
    { id: "wed_buffer", day: "Wednesday", title: "☕ مخزن تعافٍ وراحة إجباري محمي (NO DEEP WORK)", start: "16:00", end: "18:00", type: "recovery" },
    { id: "wed_tutoring", day: "Wednesday", title: "جلسة تدريس وتوجيه طلابي", start: "18:00", end: "19:30", type: "mentoring" },
    { id: "thu_free", day: "Thursday", title: "🚀 يوم السعة الاستراتيجية والعمل العميق (بدون كلية)", start: "10:00", end: "18:00", type: "flexible_strategic" },
    { id: "fri_review", day: "Friday", title: "🌿 مراجعة أسبوعية، محتوى مسجل، وتعافٍ واستجمام", start: "14:00", end: "20:00", type: "weekly_review" }
  ],

  // 10. DECISION LOG
  decisionLog: [
    {
      id: "dec_1",
      date: "2026-10-04",
      decision: "حماية فترة 4:00 - 6:00 م يومي الاثنين والأربعاء كـ Buffer إجباري",
      reason: "دوام الكلية 8 ص - 4 م يستهلك الطاقة، والتدريس 6 م يتطلب حضوراً ذهنياً. كسر هذه الفترة بالعمل يؤدي لإنهاك سريع.",
      alternativesConsidered: "محاولة الاستذكار بعد الكلية مباشرة"
    },
    {
      id: "dec_2",
      date: "2026-10-05",
      decision: "تخصيص يوم الخميس كاملاً للعمل الاستراتيجي ومنحة Berlitz وتسليم FadaQa",
      reason: "الخميس يخلو من دوام الجامعة ويوفر سعة ذهنية عالية للاستيعاب العميق والتنفيذ بدون مقاطعات.",
      alternativesConsidered: "توزيع مهام الـ PRD على أيام الكلية المزدحمة"
    }
  ],

  // 11. WAITING ROOM
  waitingRoom: [
    {
      id: "w_berlitz_support",
      subject: "استفسار الدعم الأكاديمي لمنحة Berlitz بشأن جدول جلسات المحادثة",
      entity: "فريق دعم Berlitz",
      dateRequested: "2026-10-04",
      expectedResponse: "خلال 48 ساعة",
      followUpDate: "2026-10-09",
      status: "Waiting",
      notes: "الحساب نشط وتم إرسال السؤال عن مواعيد مجموعات التحدث."
    }
  ],

  // 12. UNIVERSITY LECTURES & PRACTICAL SCHEDULE (جدول المحاضرات بالساعات والأنواع)
  universitySchedule: [
    { day: "Saturday", dayAr: "السبت", start: "09:00", end: "14:00", subject: "Fundamentals & Theories of Biotechnology", type: "Lecture & Practical", location: "مدرج 2 + معمل البيوتكنولوجي", notes: "محاضرة 2 س + عملي 2 س" },
    { day: "Sunday", dayAr: "الأحد", start: "10:00", end: "15:00", subject: "General & Medical Bacteria", type: "Lecture & Practical", location: "مدرج النبات + معمل الميكروبيولوجي", notes: "صبغات ومزارع بكتيرية" },
    { day: "Monday", dayAr: "الاثنين", start: "08:00", end: "16:00", subject: "Nuclear & Cytoplasmic Genetics + Intro Biochemistry", type: "Lecture & Lab & Tutorial", location: "مبنى كلية العلوم - دمياط", notes: "دوام طويل 8 ساعات يليه مخزن تعافٍ إجباري 4-6 م" },
    { day: "Tuesday", dayAr: "الثلاثاء", start: "10:00", end: "16:00", subject: "Analytical Chemistry + Scientific Terminology", type: "Lecture & Titration Lab", location: "مدرج الكيمياء + معمل التحليلية", notes: "تجارب المعايرة وحسابات التركيز" },
    { day: "Wednesday", dayAr: "الأربعاء", start: "08:00", end: "16:00", subject: "Fungi & Plant Diseases + Calculus 2", type: "Lecture & Practical & Section", location: "مبنى كلية العلوم - دمياط", notes: "دوام طويل 8 ساعات يليه مخزن تعافٍ إجباري 4-6 م" },
    { day: "Thursday", dayAr: "الخميس", start: "-", end: "-", subject: "يوم مخصص للعمل الاستراتيجي والبرامج المهنية", type: "No University", location: "المنزل / مساحة عمل هادئة", notes: "خالٍ من الكلية — مخصص لـ FadaQa ومنحة Berlitz" },
    { day: "Friday", dayAr: "الجمعة", start: "-", end: "-", subject: "يوم المراجعة الأسبوعية والمحتوى المسجل والاستجمام", type: "No University", location: "المنزل", notes: "خالٍ من الكلية — استجمام ومراجعة هادئة" }
  ],

  // 13. APPOINTMENTS & COMMITMENTS CALENDAR (قسم المواعيد والالتزامات الثابتة)
  appointments: [
    { id: "apt_1", title: "تسليم تكليف FadaQa Assignment 1 (PRD)", date: "2026-10-09", time: "23:59", type: "تسليم نهائي حرج", location: "Google Classroom", urgency: "High" },
    { id: "apt_2", title: "جلسة سفراء الذكاء الاصطناعي (AI Ambassadors)", date: "2026-10-10", time: "20:00 - 23:00", type: "التزام أسبوعي ثابت", location: "Online Workshop", urgency: "Medium" },
    { id: "apt_3", title: "جلسة التدريس والتوجيه الطلابي (Tutoring)", date: "2026-10-12", time: "18:00 - 19:30", type: "جلسة توجيه", location: "Online Mentoring", urgency: "Medium" },
    { id: "apt_4", title: "جلسة التحدث الصوتي الأسبوعية (منحة Berlitz)", date: "2026-10-11", time: "17:00", type: "تطوير مهني ولغة", location: "منصة Berlitz", urgency: "Medium" }
  ]
};
