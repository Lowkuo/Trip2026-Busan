import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CloudSun, 
  Languages, 
  Calculator, 
  MapPin, 
  Volume2, 
  ArrowRightLeft,
  Sun,
  CloudRain,
  Umbrella,
  ShoppingBag,
  Utensils,
  Camera,
  Train,
  Anchor,
  Ship,
  Landmark, 
  Waves,    
  Plane,    
  Snowflake,
  RefreshCw,
  Search,
  X,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  BookOpen,
  History
} from 'lucide-react';

// --- Multi-language Resources ---

const TRANSLATIONS = {
  zh: {
    title: "2026春節釜山行",
    subtitle: "2026 春節之旅",
    nav: { plan: "行程", sky: "天氣", talk: "翻譯", cash: "匯率" },
    common: { moreInfo: "參考資料", aiIntro: "AI 景點介紹" },
    weather: {
      title: "目前天氣",
      forecast: "未來預報",
      feelsLike: "體感",
      advice: "2月海風強勁，請務必洋蔥式穿搭。",
      sunny: "晴朗", cloudy: "多雲", rain: "有雨",
      dayPrefix: "Day"
    },
    history: {
      tab: "探索",
      title: "釜山與韓國歷史",
      subtitle: "穿越千年的時光之旅",
      timeline_label: "中國朝代",
      korea: "韓國朝代",
      connection: "行程連結"
    },
    phrases: {
      searchPlaceholder: "搜尋單字 (中文/韓文/拼音)...",
      searchResult: "搜尋結果",
      clear: "清除搜尋",
      notFound: "找不到「{term}」的字卡",
      tryTranslate: "試試看直接翻譯？",
      googleTranslate: "去 Google 翻譯",
      sourceLabel: "中文",
      targetLabel: "韓文"
    },
    currency: {
      rateTitle: "即時匯率",
      updated: "更新於",
      krwLabel: "韓幣",
      targetLabel: "台幣", 
      targetCode: "TWD",
      quickRef: "快速換算",
      refItems: { subway: "地鐵", latte: "拿鐵", meal: "一餐", feast: "大餐" }
    }
  },
  en: {
    title: "Busan Trip 2026",
    subtitle: "Spring Festival 2026",
    nav: { plan: "Plan", sky: "Sky", talk: "Talk", cash: "Cash" },
    common: { moreInfo: "More Info", aiIntro: "AI Landmark Intro" },
    weather: {
      title: "Current Weather",
      forecast: "Forecast",
      feelsLike: "Feels Like",
      advice: "February is cold & windy. Dress in layers!",
      sunny: "Sunny", cloudy: "Cloudy", rain: "Rainy",
      dayPrefix: "Day"
    },
    history: {
      tab: "Explore",
      title: "History of Busan",
      subtitle: "A Journey Through Time",
      timeline_label: "British Era",
      korea: "Korean Era",
      connection: "Itinerary Link"
    },
    phrases: {
      searchPlaceholder: "Search (English/Korean)...",
      searchResult: "Results",
      clear: "Clear",
      notFound: "No results for '{term}'",
      tryTranslate: "Try direct translation?",
      googleTranslate: "Google Translate",
      sourceLabel: "English",
      targetLabel: "Korean"
    },
    currency: {
      rateTitle: "Exchange Rate",
      updated: "Updated",
      krwLabel: "KRW Won",
      targetLabel: "GBP", 
      targetCode: "GBP",
      quickRef: "Quick Reference",
      refItems: { subway: "Subway", latte: "Latte", meal: "Meal", feast: "Feast" }
    }
  }
};

// --- History Data ---
const HISTORY_DATA = [
  {
    period_zh: "新羅時期 (Silla)",
    period_en: "Silla Dynasty",
    ref_zh: "唐朝 (Tang)",
    ref_en: "Anglo-Saxon Heptarchy",
    desc_zh: "佛教文化的黃金時代。定都慶州（古稱金城），創造了輝煌的佛教藝術。釜山當時為對日貿易的軍事要塞。",
    desc_en: "Golden age of Buddhism. While Alfred the Great was uniting England, Silla was creating masterful Buddhist art in Gyeongju.",
    related_days: [2],
    related_spots: { zh: "佛國寺、石窟庵、雁鴨池", en: "Bulguksa, Seokguram" }
  },
  {
    period_zh: "朝鮮王朝 (Joseon)",
    period_en: "Joseon Dynasty",
    ref_zh: "明/清 (Ming/Qing)",
    ref_en: "Tudors ~ Victorians",
    desc_zh: "深受儒家思想影響。釜山設有「倭館」，是朝鮮唯一允許對日本通商的口岸，成為國際交流的窗口。",
    desc_en: "Confucianism prevailed. Spanning from Henry VIII to Queen Victoria, Busan served as the sole gateway for trade with Japan.",
    related_days: [4],
    related_spots: { zh: "南浦洞 (舊倭館周邊)", en: "Nampodong Area" }
  },
  {
    period_zh: "韓戰時期 (Korean War)",
    period_en: "Korean War (1950s)",
    ref_zh: "共和國初期",
    ref_en: "House of Windsor (Post-War)",
    desc_zh: "1950年韓戰爆發，首爾淪陷，釜山成為「臨時首都」。來自全國的難民湧入，在山坡上蓋起密集的板房，形成了獨特的聚落。",
    desc_en: "Busan became the temporary wartime capital. Like post-Blitz London, refugees rebuilt their lives, creating hillside villages.",
    related_days: [5],
    related_spots: { zh: "甘川洞文化村 (難民聚落)", en: "Gamcheon Culture Village" }
  },
  {
    period_zh: "現代釜山 (Modern)",
    period_en: "Modern Busan",
    ref_zh: "現代",
    ref_en: "Modern Era",
    desc_zh: "韓國第一大港，電影與海洋之都。傳統市場與現代摩天大樓共存，展現了韓國經濟奇蹟後的活力。",
    desc_en: "Korea's largest port, city of film and ocean. A dynamic mix of traditional markets and modern skyscrapers.",
    related_days: [1, 3],
    related_spots: { zh: "西面鬧區、海雲台", en: "Seomyeon, Haeundae" }
  }
];

// --- Itinerary Data with Direct Images ---

const ITINERARY_DATA = [
  {
    day: 1,
    date: "2/14",
    location: { zh: "釜山 - 西面", en: "Busan - Seomyeon" },
    weather: "cloudy",
    temp: "8°C",
    // Day 1: Updated to new Wikimedia URL
    header_img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Seomyeon%2C_Busan.jpg",
    img_desc: { zh: "西面商圈繁華夜景", en: "Seomyeon Downtown Night View" },
    activities: [
      { 
        time: "Arrival", 
        title: { zh: "金海國際機場", en: "Gimhae Int'l Airport" }, 
        icon: <Plane size={18} />, 
        note: { zh: "領取SIM卡 (每人1G)", en: "Pick up SIM Card (1G)" } 
      },
      { 
        time: "Afternoon", 
        title: { zh: "西面鬧區 (美食大探索)", en: "Seomyeon Street Food" }, 
        icon: <ShoppingBag size={18} />, 
        note: { zh: "自由逛街 1~1.5hr", en: "Free time 1.5hr" } 
      },
      { 
        time: "Dinner", 
        title: { zh: "畜產直營美味豬肉拼盤", en: "Premium Pork BBQ" }, 
        icon: <Utensils size={18} />, 
        note: { zh: "含韓式蒸蛋+拉麵吃到飽", en: "Inc. Steamed Egg + Ramen" } 
      },
      { 
        time: "Stay", 
        title: { zh: "GNB / TT / CONNECT 飯店", en: "GNB / TT / CONNECT Hotel" }, 
        icon: <MapPin size={18} />, 
        note: { zh: "同級市區飯店", en: "City Center Hotel" } 
      }
    ]
  },
  {
    day: 2,
    date: "2/15",
    location: { zh: "慶州 - 古蹟", en: "Gyeongju - Heritage" },
    weather: "sunny",
    temp: "5°C",
    // Day 2: 석굴암 (Seokguram)
    header_img: "https://korea.ggogo.com/tour/images/scenery/gyeongju/sukgulam_01_b.jpg",
    img_desc: { zh: "新羅佛教藝術與古蹟", en: "Silla Buddhist Heritage" },
    activities: [
      { 
        time: "Morning", 
        title: { zh: "佛國寺 & 石窟庵", en: "Bulguksa & Seokguram" }, 
        icon: <Landmark size={18} />, 
        note: { zh: "世界文化遺產", en: "UNESCO World Heritage" },
        ai_desc: {
          zh: "佛國寺是新羅佛教藝術的精華，創建於八世紀。其多寶塔與釋迦塔代表了新羅的精湛工藝。石窟庵則供奉了新羅時期最美麗的佛像，是東方佛教藝術的傑作。",
          en: "Bulguksa Temple, built in the 8th century, is the essence of Silla Buddhist art, famed for its stunning pagodas. Seokguram Grotto houses a beautiful Buddha statue, a masterpiece of Eastern Buddhist sculpture."
        }
      },
      { 
        time: "Lunch", 
        title: { zh: "南瓜鴨風味餐", en: "Pumpkin Smoked Duck" }, 
        icon: <Utensils size={18} />, 
        note: { zh: "評價極高在地美食", en: "Famous Local Dish" } 
      },
      { 
        time: "Afternoon", 
        title: { zh: "皇理團路 & 瞻星臺", en: "Hwangnidan-gil & Cheomseongdae" }, 
        icon: <Camera size={18} />, 
        note: { zh: "文青散步路線", en: "Trendy Walking Street" } 
      },
      { 
        time: "Evening", 
        title: { zh: "雁鴨池 (東宮與月池)", en: "Donggung Palace & Wolji Pond" }, 
        icon: <Landmark size={18} />, 
        note: { zh: "CNN推薦絕美夜景", en: "Beautiful Night View" },
        ai_desc: {
          zh: "雁鴨池原是新羅王宮的離宮，用於設宴款待貴賓。夜間點燈後建築倒映水面，景色絕美。它不僅是古建築，更是新羅繁榮時期皇室美學的象徵。",
          en: "Formerly the Silla Crown Prince’s palace, this pond and garden complex was used for royal banquets. The illuminated buildings reflected in the water offer a stunning view, symbolizing Silla's aesthetics."
        }
      },
      { 
        time: "Dinner", 
        title: { zh: "星菜盤傳統菜包肉", en: "Ssambap (Leaf Wraps)" }, 
        icon: <Utensils size={18} />, 
        note: { zh: "慶州必吃特色餐", en: "Traditional Gyeongju Meal" } 
      }
    ]
  },
  {
    day: 3,
    date: "2/16",
    location: { zh: "海雲台", en: "Haeundae" },
    weather: "sunny",
    temp: "7°C",
    // Day 3: Haeundae Beach
    header_img: "https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/iewij5wcrmvdefurbnuv.jpg",
    img_desc: { zh: "海雲台蔚藍海岸線", en: "Haeundae Coastline" },
    activities: [
      { 
        time: "Morning", 
        title: { zh: "海雲台天空膠囊列車", en: "Haeundae Sky Capsule" }, 
        icon: <Train size={18} />, 
        note: { zh: "尾浦-青沙浦 (4人一車)", en: "Mipo-Cheongsapo (4p/car)" } 
      },
      { 
        time: "Spot", 
        title: { zh: "青沙浦紅白燈塔", en: "Twin Lighthouses" }, 
        icon: <Anchor size={18} />, 
        note: { zh: "IG打卡聖地", en: "Photo Spot" } 
      },
      { 
        time: "Afternoon", 
        title: { zh: "CLUBD OASIS 汗蒸幕", en: "CLUBD OASIS Spa" }, 
        icon: <Waves size={18} />, 
        note: { zh: "多喝水、敷面膜鎮定肌膚", en: "Stay hydrated" } 
      },
      { 
        time: "Dinner", 
        title: { zh: "長腳蟹豪華套餐", en: "Snow Crab Feast" }, 
        icon: <Utensils size={18} />, 
        note: { zh: "賀歲大餐 + 宵夜炸雞", en: "New Year Dinner + Fried Chicken" } 
      }
    ]
  },
  {
    day: 4,
    date: "2/17",
    location: { zh: "松島/南浦洞", en: "Songdo/Nampodong" },
    weather: "cloudy",
    temp: "9°C",
    // Day 4: Songdo Cable Car
    header_img: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_1784/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ulhfkzn47rllnnvupgtb/%E6%9D%BE%E5%B3%B6%E6%B5%B7%E4%B8%8A%E7%BA%9C%E8%BB%8A%E9%96%80%E7%A5%A8-Klook%E5%AE%A2%E8%B7%AF.jpg",
    img_desc: { zh: "松島海上纜車絕景", en: "Songdo Marine Cable Car" },
    activities: [
      { 
        time: "Morning", 
        title: { zh: "松島海上纜車 & 龍宮雲橋", en: "Songdo Marine Cable Car" }, 
        icon: <Ship size={18} />, 
        note: { zh: "若遇維修改去五六島", en: "Skywalk if under maintenance" } 
      },
      { 
        time: "Spot", 
        title: { zh: "白淺灘文化壁畫村", en: "Huinnyeoul Culture Village" }, 
        icon: <Camera size={18} />, 
        note: { zh: "絕影海岸散步路", en: "Coastal Walk" } 
      },
      { 
        time: "Afternoon", 
        title: { zh: "ARTE MUSEUM", en: "ARTE MUSEUM" }, 
        icon: <Waves size={18} />, 
        note: { zh: "沉浸式媒體藝術展", en: "Immersive Media Art" } 
      },
      { 
        time: "Shopping", 
        title: { zh: "南浦洞/BIFF/國際市場", en: "Nampodong/BIFF Square" }, 
        icon: <ShoppingBag size={18} />, 
        note: { zh: "晚餐自理 (發放₩10000)", en: "Dinner on own (₩10000 provided)" } 
      },
      { 
        time: "Lunch", 
        title: { zh: "韓式豬腳風味餐", en: "Braised Pork Knuckle" }, 
        icon: <Utensils size={18} />, 
        note: { zh: "在地傳統口味", en: "Local Specialty" } 
      }
    ]
  },
  {
    day: 5,
    date: "2/18",
    location: { zh: "甘川洞/返家", en: "Gamcheon/Home" },
    weather: "sunny",
    temp: "10°C",
    // Day 5: Gamcheon
    header_img: "https://www.settour.com.tw/ss_img/info/location/PUS/S0/PUS0000072/PUS0000072_136913.jpg",
    img_desc: { zh: "甘川洞文化村全景", en: "Gamcheon Village Panorama" },
    activities: [
      { 
        time: "Morning", 
        title: { zh: "甘川洞文化村", en: "Gamcheon Culture Village" }, 
        icon: <MapPin size={18} />, 
        note: { zh: "贈送地圖 (停留1hr)", en: "Free Map (1hr stay)" },
        ai_desc: {
          zh: "甘川洞原是韓戰難民聚集地，後透過「夢想釜山馬丘比丘」計畫重生。層疊錯落的彩色房屋與街頭藝術，使其成為充滿活力的現代藝術景觀。小王子雕塑是必打卡的文化符號。",
          en: "Originally a refugee settlement, Gamcheon was transformed into a vibrant cultural landmark through an art project. Its colorful tiered houses earned it the nickname 'Busan's Machu Picchu'."
        }
      },
      { 
        time: "Lunch", 
        title: { zh: "安東粉絲燉雞", en: "Andong Jjimdak" }, 
        icon: <Utensils size={18} />, 
        note: { zh: "最後一餐道地美味", en: "Last Korean Meal" } 
      },
      { 
        time: "Return", 
        title: { zh: "金海機場 -> 桃園", en: "Gimhae -> Taoyuan" }, 
        icon: <Plane size={18} />, 
        note: { zh: "整理行囊，溫暖的家", en: "Sweet Home" } 
      }
    ]
  }
];

// --- Phrases Data ---

const PHRASES_DATA = [
  {
    category: { zh: "基本", en: "Basic" },
    items: [
      { ko: "안녕하세요", zh: "你好", en: "Hello", pron: "An-nyeong-ha-se-yo" },
      { ko: "감사합니다", zh: "謝謝", en: "Thank you", pron: "Gam-sa-ham-ni-da" },
      { ko: "죄송합니다", zh: "對不起", en: "Sorry", pron: "Joe-song-ham-ni-da" },
      { ko: "잠시만요", zh: "借過/等一下", en: "Excuse me/Wait", pron: "Jam-si-man-yo" },
      { ko: "네 / 아니요", zh: "是 / 不是", en: "Yes / No", pron: "Ne / A-ni-yo" },
    ]
  },
  {
    category: { zh: "交通", en: "Transport" },
    items: [
      { ko: "부산역 가주세요", zh: "請去釜山站", en: "To Busan Station pls", pron: "Busan-yeok ga-ju-se-yo" },
      { ko: "여기서 세워주세요", zh: "請在這裡停車", en: "Stop here please", pron: "Yeo-gi-seo se-wo-ju-se-yo" },
      { ko: "얼마나 걸려요?", zh: "要多久？", en: "How long?", pron: "Eol-ma-na geol-ryeo-yo?" },
      { ko: "지하철역 어디예요?", zh: "地鐵站在哪？", en: "Where is subway?", pron: "Ji-ha-cheol-yeok eo-di-ye-yo?" },
    ]
  },
  {
    category: { zh: "住宿", en: "Hotel" },
    items: [
      { ko: "체크인 할게요", zh: "我要辦理入住", en: "Check-in please", pron: "Che-keu-in hal-ge-yo" },
      { ko: "짐 맡겨도 돼요?", zh: "可以寄放行李嗎？", en: "Can I leave bags?", pron: "Jim mat-gyeo-do dwae-yo?" },
      { ko: "와이파이 비밀번호", zh: "Wifi 密碼", en: "Wifi Password", pron: "Wa-i-pa-i bi-mil-beon-ho" },
      { ko: "수건 더 주세요", zh: "請再給我毛巾", en: "More towels please", pron: "Su-geon deo ju-se-yo" },
    ]
  },
  {
    category: { zh: "點餐", en: "Dining" },
    items: [
      { ko: "메뉴판 주세요", zh: "請給我菜單", en: "Menu please", pron: "Me-nyu-pan ju-se-yo" },
      { ko: "이거 주세요", zh: "請給我這個", en: "This one please", pron: "I-geo ju-se-yo" },
      { ko: "물 좀 주세요", zh: "請給我水", en: "Water please", pron: "Mul jom ju-se-yo" },
      { ko: "安 맵게 해주세요", zh: "請做不辣的", en: "Not spicy please", pron: "An maep-ge hae-ju-se-yo" },
      { ko: "맛있어요", zh: "很好吃", en: "Delicious", pron: "Ma-si-sseo-yo" },
      { ko: "계산해 주세요", zh: "請結帳", en: "Bill please", pron: "Gye-san-hae ju-se-yo" },
    ]
  },
  {
    category: { zh: "購物", en: "Shopping" },
    items: [
      { ko: "얼마예요?", zh: "多少錢？", en: "How much?", pron: "Eol-ma-ye-yo?" },
      { ko: "깎아주세요", zh: "請算便宜點", en: "Discount please", pron: "Kka-kka-ju-se-yo" },
      { ko: "입어봐도 돼요?", zh: "可以試穿嗎？", en: "Can I try it on?", pron: "I-beo-bwa-do dwae-yo?" },
      { ko: "봉투 주세요", zh: "請給我袋子", en: "Bag please", pron: "Bong-tu ju-se-yo" },
      { ko: "택스 리펀 돼요?", zh: "可以退稅嗎？", en: "Tax refund?", pron: "Taek-seu ri-peon dwae-yo?" },
    ]
  },
  {
    category: { zh: "緊急", en: "Emergency" },
    items: [
      { ko: "화장실 어디예요?", zh: "洗手間在哪裡？", en: "Where is toilet?", pron: "Hwa-jang-sil eo-di-ye-yo?" },
      { ko: "도와주세요", zh: "請幫幫我", en: "Help me", pron: "Do-wa-ju-se-yo" },
      { ko: "경찰 불러주세요", zh: "請叫警察", en: "Call police", pron: "Gyeong-chal bul-leo-ju-se-yo" },
      { ko: "병원 어디예요?", zh: "醫院在哪裡？", en: "Where is hospital?", pron: "Byeong-won eo-di-ye-yo?" },
    ]
  },
  {
    category: { zh: "新年", en: "New Year" },
    items: [
      { ko: "새해 복 많이 받으세요", zh: "新年快樂", en: "Happy New Year", pron: "Sae-hae bok ma-ni ba-deu-se-yo" },
      { ko: "건강하세요", zh: "祝您健康", en: "Stay healthy", pron: "Geon-gang-ha-se-yo" },
    ]
  }
];

// --- Sub-Components ---

const WeatherIcon = ({ type, size = 24, className = "" }) => {
  switch (type) {
    case 'sunny': return <Sun size={size} className={`text-red-500 ${className}`} />;
    case 'cloudy': return <CloudSun size={size} className={`text-stone-400 ${className}`} />;
    case 'rain': return <CloudRain size={size} className={`text-blue-800 ${className}`} />;
    default: return <Sun size={size} className={`text-red-500 ${className}`} />;
  }
};

// --- SAFE IMAGE COMPONENT ---
const SafeImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-blue-900 to-blue-800 flex flex-col items-center justify-center text-white/50 ${className}`}>
        <ImageIcon size={32} />
        <span className="text-xs mt-2 uppercase tracking-widest font-bold">BUSAN 2026</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt}
      referrerPolicy="no-referrer"
      onLoad={() => setLoading(false)}
      onError={() => setError(true)}
      className={`w-full h-full object-cover transition-opacity duration-700 ${className} ${loading ? 'opacity-0' : 'opacity-100'}`}
    />
  );
};


const ItineraryView = ({ onSelectDay, selectedDay, lang }) => {
  const currentDayData = selectedDay === 0 
    ? null 
    : (ITINERARY_DATA.find(d => d.day === selectedDay) || ITINERARY_DATA[0]);
    
  const t = TRANSLATIONS[lang];

  const handleSearch = (activityTitle) => {
    const prefix = lang === 'zh' ? "釜山 " : "Busan ";
    const query = prefix + activityTitle;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Date Selector */}
      <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide px-1">
        {/* Explore Tab */}
        <button
            key="history"
            onClick={() => onSelectDay(0)}
            className={`flex-shrink-0 px-4 py-4 rounded-xl flex flex-col items-center min-w-[72px] transition-all duration-300 border ${
              selectedDay === 0
                ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-500/30 transform -translate-y-1' 
                : 'bg-white text-stone-400 border-stone-200 hover:border-red-400/50'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedDay === 0 ? 'text-red-100' : 'opacity-80 text-red-500'}`}>
                {t.history.tab}
            </span>
            <span className="text-sm font-bold mt-1">
                <BookOpen size={18} />
            </span>
        </button>

        {/* Regular Days */}
        {ITINERARY_DATA.map((item) => (
          <button
            key={item.day}
            onClick={() => onSelectDay(item.day)}
            className={`flex-shrink-0 px-4 py-4 rounded-xl flex flex-col items-center min-w-[72px] transition-all duration-300 border ${
              selectedDay === item.day 
                ? 'bg-blue-950 text-white border-blue-950 shadow-lg shadow-blue-900/20 transform -translate-y-1' 
                : 'bg-white text-stone-400 border-stone-200 hover:border-blue-900/30'
            }`}
          >
            <span className={`text-[10px] font-medium uppercase tracking-wider ${selectedDay === item.day ? 'text-blue-200' : 'opacity-80'}`}>{t.weather.dayPrefix} {item.day}</span>
            <span className="text-sm font-bold mt-1 font-sans">{item.date}</span>
          </button>
        ))}
      </div>

      {/* Main Content Render */}
      {selectedDay === 0 ? (
        // === HISTORY VIEW ===
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden min-h-[400px] p-6">
            <div className="mb-6 border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-black text-blue-950 tracking-tight">{t.history.title}</h2>
                <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest">{t.history.subtitle}</p>
            </div>

            <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-stone-200"></div>

                {HISTORY_DATA.map((item, idx) => (
                    <div key={idx} className="relative pl-10">
                        {/* Dot */}
                        <div className="absolute left-[15px] top-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white ring-1 ring-red-100 z-10"></div>
                        
                        {/* Period Title */}
                        <div className="flex flex-col mb-1">
                            <h3 className="font-bold text-lg text-blue-950">
                                {lang === 'zh' ? item.period_zh : item.period_en}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded font-medium">
                                    {t.history.korea}
                                </span>
                                <ArrowRightLeft size={10} className="text-stone-300" />
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                                    {lang === 'zh' ? item.ref_zh : item.ref_en} ({t.history.timeline_label})
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-stone-600 leading-relaxed mt-2 mb-3 bg-stone-50/50 p-3 rounded-lg border border-stone-100">
                            {lang === 'zh' ? item.desc_zh : item.desc_en}
                        </p>

                        {/* Itinerary Link */}
                        <div className="flex items-start gap-2">
                            <div className="mt-0.5 text-red-500"><MapPin size={12} /></div>
                            <div className="text-xs font-medium text-stone-500">
                                <span className="text-red-500 font-bold mr-1">{t.history.connection}:</span>
                                {lang === 'zh' ? item.related_spots.zh : item.related_spots.en}
                                <span className="ml-1 text-[10px] text-stone-400 bg-stone-100 px-1 rounded">
                                    {item.related_days.map(d => `Day ${d}`).join(', ')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      ) : (
        // === STANDARD ITINERARY VIEW ===
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden min-h-[400px]">
            {/* Header Image */}
            <div className="relative w-full aspect-video bg-stone-100 overflow-hidden">
                <SafeImage 
                    src={currentDayData.header_img} 
                    alt={currentDayData.location[lang]} 
                    className="transition-transform duration-1000 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Image Caption - Small & Elegant */}
                <div className="absolute bottom-3 left-4 right-4 pointer-events-none flex items-end">
                    <div className="bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                        <div className="flex items-center gap-1.5 text-white/90">
                            <ImageIcon size={10} className="text-white/80" />
                            <span className="text-[10px] font-medium tracking-wider uppercase">
                                {currentDayData.img_desc[lang]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-6">
                {/* Header Info */}
                <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4">
                <div>
                    <h2 className="text-sm font-bold text-stone-400 tracking-widest uppercase flex items-center gap-2">
                    {t.weather.dayPrefix} {currentDayData.day} / {currentDayData.date}
                    </h2>
                </div>
                
                {/* Weather Pill */}
                <div className="flex flex-col items-center bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2">
                        <WeatherIcon type={currentDayData.weather} size={16} />
                        <span className="text-sm font-bold text-blue-900">{currentDayData.temp}</span>
                    </div>
                </div>
                </div>

                {/* Timeline Activities */}
                <div className="space-y-0">
                {currentDayData.activities.map((activity, index) => (
                    <div key={index} className="flex gap-4 group">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center w-8 pt-2">
                        <div className="w-2.5 h-2.5 bg-white border-[3px] border-red-500 rounded-full z-10 group-hover:scale-125 transition-transform duration-300 shadow-sm"></div>
                        {index !== currentDayData.activities.length - 1 && (
                        <div className="w-[1px] h-full bg-stone-200 -mt-1 mb-[-8px]"></div>
                        )}
                    </div>
                    
                    {/* Content Card */}
                    <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black text-stone-400 font-mono tracking-wider uppercase bg-stone-100 px-1.5 py-0.5 rounded">
                            {activity.time}
                        </span>
                        </div>

                        <div className="transition-all duration-200">
                            <h3 className="font-bold text-blue-950 text-base mb-1.5 flex items-center gap-2">
                            <span className="text-stone-400">{activity.icon}</span>
                            {activity.title[lang]}
                            </h3>
                            
                            {/* AI Generated Introduction */}
                            {activity.ai_desc && (
                                <p className="text-xs text-stone-600 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100 mt-2 flex items-start gap-2">
                                    <span className="text-blue-900 mt-0.5 font-black text-[10px] uppercase tracking-wide">Guide:</span>
                                    {activity.ai_desc[lang]}
                                </p>
                            )}

                            {activity.note && (
                            <p className="text-xs text-stone-500 leading-relaxed bg-[#FDFBF7] p-3 rounded-lg border border-stone-100 mt-2 flex items-start gap-2">
                                <span className="text-red-500 mt-0.5 text-[10px]">●</span>
                                {activity.note[lang]}
                            </p>
                            )}
                            
                            {/* Google Search Button */}
                            <button
                                onClick={() => handleSearch(activity.title[lang])}
                                className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-blue-900/70 hover:text-blue-950 bg-white border border-stone-200 hover:bg-blue-50 hover:border-blue-200 px-3 py-1.5 rounded-full transition-all w-fit shadow-sm"
                            >
                                <Search size={12} />
                                {t.common.moreInfo}
                            </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const WeatherWidget = ({ selectedDay, lang }) => {
  const today = selectedDay === 0 
    ? ITINERARY_DATA[0] // Default to Day 1 if viewing history
    : (ITINERARY_DATA.find(d => d.day === selectedDay) || ITINERARY_DATA[0]);
    
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      {/* Main Weather Display */}
      <div className="bg-blue-950 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-blue-900/20">
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
            <svg viewBox="0 0 1440 320" className="w-full h-full">
               <path fill="#fff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-200 font-bold text-[10px] tracking-[0.2em] uppercase mb-1">{t.weather.title}</p>
              <h2 className="text-3xl font-bold text-white tracking-tight">{today.location[lang].split(' - ')[0]}</h2>
            </div>
            <div className="text-right">
                 <WeatherIcon type={today.weather} size={32} className="text-red-500" />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-6xl font-light tracking-tighter text-stone-50">{today.temp}</span>
            <div className="flex flex-col items-end">
               <span className="text-lg font-bold capitalize text-white">
                 {t.weather[today.weather]}
               </span>
               <span className="text-xs text-blue-200 mt-1">{t.weather.feelsLike} -2°C</span>
            </div>
          </div>

          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 border border-white/10">
             <Snowflake size={14} className="text-blue-200" />
             <span className="text-xs font-medium text-blue-100">{t.weather.advice}</span>
          </div>
        </div>
      </div>

      {/* Forecast List */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200">
        <h3 className="font-bold text-blue-950 mb-4 text-xs tracking-widest uppercase flex items-center gap-2">
          <Calendar size={14} className="text-red-500" />
          {t.weather.forecast}
        </h3>
        <div className="space-y-2">
          {ITINERARY_DATA.map((day) => (
             <div key={day.day} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FDFBF7] transition-colors cursor-pointer group border border-transparent hover:border-stone-100">
               <div className="flex items-center gap-4">
                 <div className="text-stone-300 group-hover:text-red-500 transition-colors">
                   <WeatherIcon type={day.weather} size={18} />
                 </div>
                 <div>
                   <p className="font-bold text-blue-950 text-sm">{day.date}</p>
                 </div>
               </div>
               <span className="font-medium text-stone-500 text-xs">{day.temp}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LanguageCards = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState("基本");
  const [searchTerm, setSearchTerm] = useState("");
  const t = TRANSLATIONS[lang];
  
  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("您的瀏覽器不支援語音播放");
    }
  };

  useEffect(() => {
    setActiveCategory(PHRASES_DATA[0].category[lang]);
  }, [lang]);

  const getDisplayItems = () => {
    if (searchTerm.trim() !== "") {
      const allItems = PHRASES_DATA.flatMap(cat => cat.items);
      return allItems.filter(item => 
        item.zh.includes(searchTerm) || 
        item.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ko.includes(searchTerm) ||
        item.pron.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return PHRASES_DATA.find(c => c.category[lang] === activeCategory)?.items || [];
  };

  const displayedItems = getDisplayItems();

  return (
    <div className="pb-24 animate-fade-in h-full flex flex-col">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-stone-400" />
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.phrases.searchPlaceholder}
          className="w-full pl-10 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-sm text-blue-950 placeholder-stone-400 focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950 transition-all"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-red-500"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      {!searchTerm && (
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {PHRASES_DATA.map(cat => (
            <button
              key={cat.category[lang]}
              onClick={() => setActiveCategory(cat.category[lang])}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-xs font-bold tracking-wide transition-all border ${
                activeCategory === cat.category[lang]
                  ? 'bg-blue-950 text-white border-blue-950 shadow-md'
                  : 'bg-white text-stone-500 border-stone-200 hover:border-blue-900/30'
              }`}
            >
              {cat.category[lang]}
            </button>
          ))}
        </div>
      )}

      {/* Search Result Feedback */}
      {searchTerm && (
        <div className="mb-4 flex items-center justify-between px-1">
          <span className="text-xs font-bold text-blue-950">{t.phrases.searchResult} ({displayedItems.length})</span>
          <button onClick={() => setSearchTerm("")} className="text-xs text-red-500 font-medium">{t.phrases.clear}</button>
        </div>
      )}

      {/* Cards List */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {displayedItems.length > 0 ? (
          displayedItems.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 relative group active:scale-[0.99] transition-transform duration-100 shadow-sm hover:border-blue-900/20">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{t.phrases.sourceLabel}</span>
                  <h3 className="text-lg font-bold text-blue-950">{item[lang]}</h3>
                </div>
                <button 
                  onClick={() => handleSpeak(item.ko)}
                  className="p-3 bg-[#FDFBF7] text-stone-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                  aria-label="Play audio"
                >
                  <Volume2 size={18} />
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-1">
                <span className="text-[10px] text-red-500 font-bold tracking-wider uppercase">{t.phrases.targetLabel}</span>
                <p className="text-xl font-medium text-slate-800 font-sans">{item.ko}</p>
                <p className="text-xs text-stone-400 font-mono mt-0.5">{item.pron}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-stone-400 flex flex-col items-center">
             <p className="text-sm font-bold text-blue-950 mb-2">{t.phrases.notFound.replace('{term}', searchTerm)}</p>
             <p className="text-xs mb-4">{t.phrases.tryTranslate}</p>
             <a 
               href={`https://translate.google.com/?sl=${lang === 'zh' ? 'zh-TW' : 'en'}&tl=ko&text=${encodeURIComponent(searchTerm)}&op=translate`}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 bg-blue-950 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-900 transition-colors"
             >
               <span>{t.phrases.googleTranslate}</span>
               <ExternalLink size={14} />
             </a>
          </div>
        )}
      </div>
    </div>
  );
};

const CurrencyConverter = ({ lang }) => {
  const [krw, setKrw] = useState("");
  const [twd, setTwd] = useState("");
  const [rate, setRate] = useState(lang === 'zh' ? 42.5 : 1750); 
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("...");
  const [direction, setDirection] = useState("KRW_TO_TWD"); 
  const t = TRANSLATIONS[lang];
  const currencyCode = t.currency.targetCode; 

  useEffect(() => {
    setKrw("");
    setTwd("");
    setDirection("KRW_TO_TWD");
    setRate(lang === 'zh' ? 42.5 : 1750);
  }, [lang]);

  const fetchRate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`);
      const data = await response.json();
      if (data && data.rates && data.rates.KRW) {
        setRate(data.rates.KRW);
        const now = new Date();
        setLastUpdated(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
      }
    } catch (error) {
      console.error("Failed to fetch rate", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, [currencyCode]);

  const handleKrwChange = (val) => {
    const value = val.replace(/[^0-9.]/g, '');
    setKrw(value);
    if (value) {
      setTwd((parseFloat(value) / rate).toFixed(currencyCode === 'GBP' ? 2 : 0));
    } else {
      setTwd("");
    }
  };

  const handleTwdChange = (val) => {
    const value = val.replace(/[^0-9.]/g, '');
    setTwd(value);
    if (value) {
      setKrw((parseFloat(value) * rate).toFixed(0));
    } else {
      setKrw("");
    }
  };

  return (
    <div className="pb-24 animate-fade-in flex flex-col h-full">
      {/* Rate Status Card */}
      <div className="mb-4 bg-white border border-stone-200 rounded-lg p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
           <div className={`p-1.5 rounded-full ${isLoading ? 'bg-stone-100 animate-spin' : 'bg-[#FDFBF7]'}`}>
             <RefreshCw size={14} className="text-stone-400" />
           </div>
           <div>
             <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.currency.rateTitle}</p>
             <p className="text-sm font-bold text-blue-950">1 {t.currency.targetLabel} ≈ {rate.toFixed(2)} {t.currency.krwLabel}</p>
           </div>
        </div>
        <div className="text-[10px] text-stone-400 text-right">
          {t.currency.updated}<br/>{lastUpdated}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-stone-200 mb-4 text-center shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col gap-8">
          {/* KRW Input */}
          <div className={`transition-all duration-300 ${direction === 'KRW_TO_TWD' ? 'order-1' : 'order-3'}`}>
             <label className="flex items-center justify-center gap-2 text-xs font-bold text-stone-400 mb-2 tracking-widest uppercase">
               <span>🇰🇷 {t.currency.krwLabel}</span>
             </label>
             <div className="relative inline-block w-full">
               <input
                 type="text"
                 inputMode="decimal"
                 value={krw}
                 onChange={(e) => handleKrwChange(e.target.value)}
                 placeholder="0"
                 className={`w-full text-4xl font-light text-center p-2 bg-transparent focus:outline-none placeholder-stone-200 transition-all ${direction === 'KRW_TO_TWD' ? 'text-blue-950' : 'text-stone-300 scale-95'}`}
               />
             </div>
          </div>

          {/* Switch Button */}
          <div className="order-2 flex justify-center relative py-2">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[1px] bg-stone-100"></div>
             </div>
             <button 
              onClick={() => {
                setDirection(prev => prev === 'KRW_TO_TWD' ? 'TWD_TO_KRW' : 'KRW_TO_TWD');
              }}
              className="group relative z-10 bg-[#FDFBF7] border border-stone-200 p-3 rounded-full text-stone-400 hover:text-red-500 hover:border-red-200 transition-all active:scale-95"
            >
              <ArrowRightLeft size={16} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          {/* TWD Input */}
          <div className={`transition-all duration-300 ${direction === 'KRW_TO_TWD' ? 'order-3' : 'order-1'}`}>
             <label className="flex items-center justify-center gap-2 text-xs font-bold text-stone-400 mb-2 tracking-widest uppercase">
                <span>{currencyCode === 'TWD' ? '🇹🇼' : '🇬🇧'} {t.currency.targetLabel}</span>
             </label>
             <div className="relative inline-block w-full">
               <input
                 type="text"
                 inputMode="decimal"
                 value={twd}
                 onChange={(e) => handleTwdChange(e.target.value)}
                 placeholder="0"
                 className={`w-full text-4xl font-light text-center p-2 bg-transparent focus:outline-none placeholder-stone-200 transition-all ${direction === 'KRW_TO_TWD' ? 'text-stone-300 scale-95' : 'text-blue-950'}`}
               />
             </div>
          </div>
        </div>
      </div>
      
      {/* Quick Tips */}
      <h3 className="text-xs font-bold text-blue-950 mb-3 ml-1 tracking-widest uppercase">{t.currency.quickRef}</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: t.currency.refItems.subway, sub:"1,500₩", val: (1500/rate).toFixed(currencyCode === 'GBP' ? 2 : 0) },
          { label: t.currency.refItems.latte, sub:"5,000₩", val: (5000/rate).toFixed(currencyCode === 'GBP' ? 2 : 0) },
          { label: t.currency.refItems.meal, sub:"10,000₩", val: (10000/rate).toFixed(currencyCode === 'GBP' ? 2 : 0) },
          { label: t.currency.refItems.feast, sub:"50,000₩", val: (50000/rate).toFixed(currencyCode === 'GBP' ? 2 : 0) },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded-lg border border-stone-200 flex justify-between items-center px-4 hover:border-blue-900/30 transition-colors">
            <div className="flex flex-col">
              <span className="text-xs text-stone-500 font-bold">{item.label}</span>
              <span className="text-[10px] text-stone-300">{item.sub}</span>
            </div>
            <span className="font-bold text-blue-950 text-sm">{item.val} <span className="text-[10px] text-stone-400">{t.currency.targetCode}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedDay, setSelectedDay] = useState(1);
  const [lang, setLang] = useState('zh'); 

  // Auto-detect language
  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.toLowerCase().startsWith('en')) {
      setLang('en');
    } else {
      setLang('zh');
    }
  }, []);

  const toggleLanguage = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const t = TRANSLATIONS[lang];

  const renderContent = () => {
    switch (activeTab) {
      case 'itinerary': return <ItineraryView onSelectDay={setSelectedDay} selectedDay={selectedDay} lang={lang} />;
      case 'weather': return <WeatherWidget selectedDay={selectedDay} lang={lang} />;
      case 'language': return <LanguageCards lang={lang} />;
      case 'calculator': return <CurrencyConverter lang={lang} />;
      default: return <ItineraryView lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-blue-950/95 backdrop-blur-md z-40 pt-safe-top border-b border-blue-900">
        <div className="flex items-center justify-between px-6 py-4 max-w-md mx-auto relative">
          <div>
            <span className="text-[10px] font-bold text-blue-200 tracking-widest uppercase block">{t.subtitle}</span>
            <h1 className="text-xl font-black tracking-tight text-white uppercase flex items-center gap-2">
              {t.title}
            </h1>
          </div>
          
          <button 
            onClick={toggleLanguage}
            className="h-8 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-[10px] font-bold hover:bg-white/20 transition-all gap-1"
          >
            <Globe size={12} />
            {lang === 'zh' ? 'EN' : '中'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 px-6 max-w-md mx-auto min-h-screen pb-10">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-blue-950/95 backdrop-blur-md border-t border-blue-900 pb-safe-bottom z-50">
        <div className="max-w-md mx-auto px-8 py-3 flex justify-between items-center">
          <NavButton 
            active={activeTab === 'itinerary'} 
            onClick={() => setActiveTab('itinerary')} 
            icon={<Calendar size={20} />} 
            label={t.nav.plan}
          />
          <NavButton 
            active={activeTab === 'weather'} 
            onClick={() => setActiveTab('weather')} 
            icon={<CloudSun size={20} />} 
            label={t.nav.sky}
          />
          <NavButton 
            active={activeTab === 'language'} 
            onClick={() => setActiveTab('language')} 
            icon={<Languages size={20} />} 
            label={t.nav.talk}
          />
          <NavButton 
            active={activeTab === 'calculator'} 
            onClick={() => setActiveTab('calculator')} 
            icon={<Calculator size={20} />} 
            label={t.nav.cash}
          />
        </div>
      </nav>
      
      {/* Global Styles */}
      <style>{`
        .pt-safe-top { padding-top: env(safe-area-inset-top); }
        .pb-safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 w-12 ${
      active 
        ? 'text-white transform -translate-y-1' 
        : 'text-white/60 hover:text-white/80'
    }`}
  >
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-white/20' : 'bg-transparent'}`}>
       {icon}
    </div>
    <span className={`text-[10px] font-bold tracking-wide transition-opacity ${active ? 'opacity-100' : 'opacity-70'}`}>
      {label}
    </span>
  </button>
);
