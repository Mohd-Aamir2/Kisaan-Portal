/**
 * cropCalendar.js — crop-wise stage timings aur us stage pe kya karna hai.
 *
 * Din "days after sowing" (DAS) me hain. Transplanted crops (dhaan) me
 * transplanting date ko hi day 0 maano.
 *
 * ⚠️ IMPORTANT: Ye standard agronomic ranges hain (North India / UP ke liye).
 * Variety, region aur mausam se ye shift hote hain. Deploy karne se pehle
 * apne State Agricultural University ki Package of Practices se verify
 * karwa lena — NDUAT Ayodhya ya CSAUAT Kanpur UP ke liye.
 *
 * `critical: true` wale actions wo hain jinka time nikal jaye to
 * paidawar par seedha asar padta hai.
 */

export const CROP_CALENDAR = {
  wheat: {
    displayName: { en: "Wheat", hi: "गेहूँ" },
    aliases: ["gehu", "gehun", "गेहूँ", "गेहू", "triticale"],
    durationDays: 140,
    sowingWindow: { from: "11-01", to: "11-25" },
    stages: [
      {
        key: "sowing",
        name: { en: "Sowing", hi: "बुवाई" },
        startDay: 0,
        endDay: 15,
        actions: [
          {
            key: "seed_treatment",
            day: 0,
            critical: false,
            title: { en: "Treat seed before sowing", hi: "बुवाई से पहले बीज उपचार" },
            detail: {
              en: "Treat seed with a recommended fungicide before sowing.",
              hi: "बुवाई से पहले बीज को संस्तुत फफूंदनाशक से उपचारित करें।",
            },
          },
        ],
      },
      {
        key: "cri",
        name: { en: "Crown Root Initiation (CRI)", hi: "जड़ बनने की अवस्था (CRI)" },
        startDay: 20,
        endDay: 28,
        actions: [
          {
            key: "irrigation_1",
            day: 21,
            critical: true,
            title: { en: "First irrigation — most important", hi: "पहली सिंचाई — सबसे ज़रूरी" },
            detail: {
              en: "CRI stage irrigation has the biggest effect on final yield. Do not delay.",
              hi: "CRI अवस्था की सिंचाई पैदावार पर सबसे ज़्यादा असर डालती है। देर न करें।",
            },
          },
          {
            key: "top_dress_n",
            day: 22,
            critical: false,
            title: { en: "First nitrogen top dressing", hi: "पहली नाइट्रोजन टॉप ड्रेसिंग" },
            detail: {
              en: "Apply the first nitrogen split with the CRI irrigation.",
              hi: "पहली सिंचाई के साथ नाइट्रोजन की पहली मात्रा डालें।",
            },
          },
        ],
      },
      {
        key: "tillering",
        name: { en: "Tillering", hi: "कल्ले निकलना" },
        startDay: 29,
        endDay: 55,
        actions: [
          {
            key: "weed_control",
            day: 32,
            critical: true,
            title: { en: "Weed control window", hi: "खरपतवार नियंत्रण का समय" },
            detail: {
              en: "Control weeds within 30-35 days. Later application is much less effective.",
              hi: "30-35 दिन के भीतर खरपतवार नियंत्रण करें। बाद में असर बहुत कम होता है।",
            },
          },
          {
            key: "irrigation_2",
            day: 45,
            critical: false,
            title: { en: "Second irrigation", hi: "दूसरी सिंचाई" },
            detail: {
              en: "Irrigate at late tillering.",
              hi: "कल्ले निकलने के अंत में सिंचाई करें।",
            },
          },
        ],
      },
      {
        key: "jointing",
        name: { en: "Jointing", hi: "गांठ बनना" },
        startDay: 56,
        endDay: 85,
        actions: [
          {
            key: "irrigation_3",
            day: 65,
            critical: false,
            title: { en: "Third irrigation", hi: "तीसरी सिंचाई" },
            detail: {
              en: "Irrigate at jointing stage.",
              hi: "गांठ बनने की अवस्था पर सिंचाई करें।",
            },
          },
          {
            key: "rust_watch",
            day: 70,
            critical: false,
            title: { en: "Watch for rust", hi: "रतुआ रोग पर नज़र रखें" },
            detail: {
              en: "Inspect leaves for yellow or brown rust pustules, especially in humid weather.",
              hi: "पत्तियों पर पीला या भूरा रतुआ देखें, खासकर नमी वाले मौसम में।",
            },
          },
        ],
      },
      {
        key: "flowering",
        name: { en: "Flowering", hi: "फूल आना" },
        startDay: 86,
        endDay: 100,
        actions: [
          {
            key: "irrigation_4",
            day: 90,
            critical: true,
            title: { en: "Flowering irrigation", hi: "फूल आने पर सिंचाई" },
            detail: {
              en: "Water stress at flowering causes a sharp yield loss.",
              hi: "फूल आने पर पानी की कमी से पैदावार में बड़ी गिरावट होती है।",
            },
          },
        ],
      },
      {
        key: "grain_filling",
        name: { en: "Grain filling", hi: "दाना भरना" },
        startDay: 101,
        endDay: 125,
        actions: [
          {
            key: "irrigation_5",
            day: 105,
            critical: false,
            title: { en: "Grain filling irrigation", hi: "दाना भरने पर सिंचाई" },
            detail: {
              en: "Keep soil moist during grain filling for better grain weight.",
              hi: "दाना भरते समय नमी बनाए रखें, दाने का वजन बढ़ेगा।",
            },
          },
        ],
      },
      {
        key: "maturity",
        name: { en: "Maturity & harvest", hi: "पकना और कटाई" },
        startDay: 126,
        endDay: 150,
        actions: [
          {
            key: "harvest",
            day: 130,
            critical: false,
            title: { en: "Harvest window", hi: "कटाई का समय" },
            detail: {
              en: "Harvest when grains are hard and straw turns golden.",
              hi: "जब दाने कड़े हो जाएं और भूसा सुनहरा हो जाए तब कटाई करें।",
            },
          },
        ],
      },
    ],
  },

  potato: {
    displayName: { en: "Potato", hi: "आलू" },
    aliases: ["aloo", "alu", "आलू"],
    durationDays: 100,
    sowingWindow: { from: "10-10", to: "11-20" },
    stages: [
      {
        key: "sowing",
        name: { en: "Planting", hi: "बुवाई" },
        startDay: 0,
        endDay: 12,
        actions: [],
      },
      {
        key: "emergence",
        name: { en: "Emergence", hi: "अंकुरण" },
        startDay: 13,
        endDay: 25,
        actions: [
          {
            key: "irrigation_1",
            day: 15,
            critical: false,
            title: { en: "Light irrigation", hi: "हल्की सिंचाई" },
            detail: {
              en: "Keep soil moist but never waterlogged.",
              hi: "मिट्टी में नमी रखें, पर पानी न भरें।",
            },
          },
        ],
      },
      {
        key: "vegetative",
        name: { en: "Vegetative growth", hi: "वानस्पतिक वृद्धि" },
        startDay: 26,
        endDay: 40,
        actions: [
          {
            key: "earthing_up",
            day: 28,
            critical: true,
            title: { en: "Earthing up", hi: "मिट्टी चढ़ाना" },
            detail: {
              en: "Earthing up prevents tubers turning green and improves yield.",
              hi: "मिट्टी चढ़ाने से कंद हरे नहीं होते और पैदावार बढ़ती है।",
            },
          },
          {
            key: "top_dress_n",
            day: 30,
            critical: false,
            title: { en: "Nitrogen top dressing", hi: "नाइट्रोजन टॉप ड्रेसिंग" },
            detail: {
              en: "Apply remaining nitrogen with earthing up.",
              hi: "मिट्टी चढ़ाते समय बची हुई नाइट्रोजन डालें।",
            },
          },
        ],
      },
      {
        key: "tuber_bulking",
        name: { en: "Tuber bulking", hi: "कंद बनना" },
        startDay: 41,
        endDay: 75,
        actions: [
          {
            key: "blight_watch",
            day: 45,
            critical: true,
            title: { en: "Late blight risk period", hi: "पछेती झुलसा का खतरा" },
            detail: {
              en: "Cool humid weather with fog is high risk for late blight. Inspect leaves every few days for dark water-soaked patches.",
              hi: "ठंडा, नमी वाला और कोहरे वाला मौसम पछेती झुलसा के लिए खतरनाक है। पत्तियों पर काले गीले धब्बे रोज़ देखें।",
            },
          },
          {
            key: "irrigation_regular",
            day: 50,
            critical: true,
            title: { en: "Keep moisture steady", hi: "नमी बनाए रखें" },
            detail: {
              en: "Tuber bulking needs steady moisture. Irregular watering causes cracked and misshapen tubers.",
              hi: "कंद बनते समय लगातार नमी चाहिए। असमान सिंचाई से कंद फट जाते हैं।",
            },
          },
        ],
      },
      {
        key: "maturity",
        name: { en: "Maturity & harvest", hi: "पकना और खुदाई" },
        startDay: 76,
        endDay: 115,
        actions: [
          {
            key: "haulm_cutting",
            day: 80,
            critical: false,
            title: { en: "Haulm cutting", hi: "हॉम कटाई" },
            detail: {
              en: "Cut haulms about 10-15 days before digging to harden the skin.",
              hi: "खुदाई से 10-15 दिन पहले हॉम काट दें, छिलका मजबूत होगा।",
            },
          },
        ],
      },
    ],
  },

  mustard: {
    displayName: { en: "Mustard", hi: "सरसों" },
    aliases: ["sarso", "sarson", "सरसों", "rai", "raya"],
    durationDays: 125,
    sowingWindow: { from: "10-05", to: "10-30" },
    stages: [
      {
        key: "sowing",
        name: { en: "Sowing", hi: "बुवाई" },
        startDay: 0,
        endDay: 12,
        actions: [],
      },
      {
        key: "rosette",
        name: { en: "Rosette", hi: "रोज़ेट अवस्था" },
        startDay: 13,
        endDay: 40,
        actions: [
          {
            key: "thinning",
            day: 18,
            critical: false,
            title: { en: "Thinning", hi: "छँटाई" },
            detail: {
              en: "Remove extra plants to keep proper spacing.",
              hi: "अतिरिक्त पौधे निकालकर उचित दूरी बनाए रखें।",
            },
          },
          {
            key: "irrigation_1",
            day: 30,
            critical: true,
            title: { en: "First irrigation", hi: "पहली सिंचाई" },
            detail: {
              en: "First irrigation around 30-35 days matters most for yield.",
              hi: "30-35 दिन पर पहली सिंचाई पैदावार के लिए सबसे ज़रूरी है।",
            },
          },
        ],
      },
      {
        key: "flowering",
        name: { en: "Flowering", hi: "फूल आना" },
        startDay: 41,
        endDay: 70,
        actions: [
          {
            key: "aphid_watch",
            day: 50,
            critical: true,
            title: { en: "Watch for aphids", hi: "माहू (चेपा) पर नज़र रखें" },
            detail: {
              en: "Aphids attack during flowering and can badly cut yield. Check the underside of leaves and flower shoots.",
              hi: "फूल आने पर माहू का हमला होता है और पैदावार बहुत घट सकती है। पत्तियों के नीचे और फूलों की डंठल देखें।",
            },
          },
        ],
      },
      {
        key: "siliqua",
        name: { en: "Pod formation", hi: "फली बनना" },
        startDay: 71,
        endDay: 100,
        actions: [
          {
            key: "irrigation_2",
            day: 75,
            critical: true,
            title: { en: "Pod-filling irrigation", hi: "फली भरने पर सिंचाई" },
            detail: {
              en: "Irrigation at pod filling directly affects seed weight.",
              hi: "फली भरते समय सिंचाई से दाने का वजन बढ़ता है।",
            },
          },
        ],
      },
      {
        key: "maturity",
        name: { en: "Maturity & harvest", hi: "पकना और कटाई" },
        startDay: 101,
        endDay: 140,
        actions: [
          {
            key: "harvest",
            day: 110,
            critical: false,
            title: { en: "Harvest window", hi: "कटाई का समय" },
            detail: {
              en: "Harvest when pods turn yellowish-brown. Delay causes pod shattering and seed loss.",
              hi: "जब फलियाँ पीली-भूरी हो जाएं तब कटाई करें। देर करने पर फलियाँ चटककर दाने गिर जाते हैं।",
            },
          },
        ],
      },
    ],
  },

  gram: {
    displayName: { en: "Gram (Chickpea)", hi: "चना" },
    aliases: ["chana", "chickpea", "चना", "bengal gram"],
    durationDays: 120,
    sowingWindow: { from: "10-15", to: "11-15" },
    stages: [
      { key: "sowing", name: { en: "Sowing", hi: "बुवाई" }, startDay: 0, endDay: 12, actions: [] },
      {
        key: "vegetative",
        name: { en: "Vegetative growth", hi: "वानस्पतिक वृद्धि" },
        startDay: 13,
        endDay: 45,
        actions: [
          {
            key: "weed_control",
            day: 30,
            critical: false,
            title: { en: "Weed control", hi: "खरपतवार नियंत्रण" },
            detail: {
              en: "Remove weeds within 30-35 days.",
              hi: "30-35 दिन के भीतर खरपतवार निकालें।",
            },
          },
        ],
      },
      {
        key: "flowering",
        name: { en: "Flowering", hi: "फूल आना" },
        startDay: 46,
        endDay: 70,
        actions: [
          {
            key: "pod_borer_watch",
            day: 55,
            critical: true,
            title: { en: "Watch for pod borer", hi: "फली छेदक पर नज़र रखें" },
            detail: {
              en: "Pod borer is the biggest threat to gram. Install pheromone traps and inspect flowers regularly.",
              hi: "फली छेदक चने का सबसे बड़ा दुश्मन है। फेरोमोन ट्रैप लगाएं और फूलों की नियमित जाँच करें।",
            },
          },
        ],
      },
      {
        key: "pod_formation",
        name: { en: "Pod formation", hi: "फली बनना" },
        startDay: 71,
        endDay: 100,
        actions: [
          {
            key: "irrigation_pod",
            day: 75,
            critical: false,
            title: { en: "Light irrigation if dry", hi: "सूखा हो तो हल्की सिंचाई" },
            detail: {
              en: "Gram needs little water. Irrigate lightly only if the soil is very dry.",
              hi: "चने को कम पानी चाहिए। मिट्टी बहुत सूखी हो तभी हल्की सिंचाई करें।",
            },
          },
        ],
      },
      {
        key: "maturity",
        name: { en: "Maturity & harvest", hi: "पकना और कटाई" },
        startDay: 101,
        endDay: 135,
        actions: [
          {
            key: "harvest",
            day: 110,
            critical: false,
            title: { en: "Harvest window", hi: "कटाई का समय" },
            detail: {
              en: "Harvest when leaves turn yellow and pods are dry.",
              hi: "जब पत्तियाँ पीली हो जाएं और फलियाँ सूख जाएं तब कटाई करें।",
            },
          },
        ],
      },
    ],
  },

  paddy: {
    displayName: { en: "Paddy (Rice)", hi: "धान" },
    aliases: ["dhan", "rice", "धान", "chawal"],
    durationDays: 120,
    // day 0 = transplanting date, not nursery sowing
    sowingWindow: { from: "06-15", to: "07-15" },
    stages: [
      {
        key: "transplant",
        name: { en: "Transplanting", hi: "रोपाई" },
        startDay: 0,
        endDay: 15,
        actions: [
          {
            key: "water_level",
            day: 3,
            critical: false,
            title: { en: "Maintain water level", hi: "पानी का स्तर बनाए रखें" },
            detail: {
              en: "Keep 2-5 cm standing water after transplanting.",
              hi: "रोपाई के बाद 2-5 सेमी पानी खेत में बनाए रखें।",
            },
          },
        ],
      },
      {
        key: "tillering",
        name: { en: "Tillering", hi: "कल्ले निकलना" },
        startDay: 16,
        endDay: 45,
        actions: [
          {
            key: "top_dress_n",
            day: 25,
            critical: false,
            title: { en: "Nitrogen top dressing", hi: "नाइट्रोजन टॉप ड्रेसिंग" },
            detail: {
              en: "Apply nitrogen at active tillering.",
              hi: "कल्ले निकलते समय नाइट्रोजन डालें।",
            },
          },
          {
            key: "weed_control",
            day: 20,
            critical: true,
            title: { en: "Weed control", hi: "खरपतवार नियंत्रण" },
            detail: {
              en: "Control weeds within the first 30 days.",
              hi: "पहले 30 दिन के भीतर खरपतवार नियंत्रण करें।",
            },
          },
        ],
      },
      {
        key: "panicle_initiation",
        name: { en: "Panicle initiation", hi: "बाली बनना" },
        startDay: 46,
        endDay: 65,
        actions: [
          {
            key: "top_dress_n2",
            day: 50,
            critical: true,
            title: { en: "Nitrogen at panicle initiation", hi: "बाली बनने पर नाइट्रोजन" },
            detail: {
              en: "This nitrogen split has a strong effect on grain number.",
              hi: "इस समय की नाइट्रोजन से दानों की संख्या बढ़ती है।",
            },
          },
        ],
      },
      {
        key: "flowering",
        name: { en: "Flowering", hi: "फूल आना" },
        startDay: 66,
        endDay: 90,
        actions: [
          {
            key: "keep_water",
            day: 70,
            critical: true,
            title: { en: "Do not let the field dry", hi: "खेत सूखने न दें" },
            detail: {
              en: "Water stress at flowering causes heavy grain sterility.",
              hi: "फूल आने पर पानी की कमी से दाने खाली रह जाते हैं।",
            },
          },
        ],
      },
      {
        key: "maturity",
        name: { en: "Maturity & harvest", hi: "पकना और कटाई" },
        startDay: 91,
        endDay: 130,
        actions: [
          {
            key: "drain_field",
            day: 100,
            critical: false,
            title: { en: "Drain the field", hi: "खेत का पानी निकालें" },
            detail: {
              en: "Drain water about 10 days before harvest.",
              hi: "कटाई से लगभग 10 दिन पहले खेत का पानी निकाल दें।",
            },
          },
        ],
      },
    ],
  },
};

export default CROP_CALENDAR;