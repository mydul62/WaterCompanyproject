export interface PressStory {
  id: string;
  slug: string;
  title: string;
  englishTitle: string;
  banglaTitle?: string;
  outlet: string;
  newspaper?: string;
  outletColor: string;
  date: string;
  dateLabel?: string;
  category: string;
  readTime: string;
  image: string;
  clippingUrl?: string;
  summary: string;
  fullArticle: string[];
  keyHighlights: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
  originalSourceUrl: string;
  tag?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export const PRESS_STORIES: PressStory[] = [
  {
    id: "story-1",
    slug: "noor-plastic-kaliakoir-automated-expansion",
    title: "গাজীপুরে নূর প্লাস্টিকের স্বয়ংক্রিয় প্যাকেজিং সম্প্রসারণ",
    englishTitle: "নূর প্লাস্টিক ইন্ডাস্ট্রিজের আধুনিক প্লাস্টিক ও ওয়াটার কন্টেইনার উৎপাদন যাত্রা",
    outlet: "Prothom Alo",
    outletColor: "#d9232a",
    date: "১৪ অক্টোবর ২০২৫",
    category: "উদ্যোক্তা ও বাণিজ্য",
    readTime: "৩ মিনিট পাঠ",
    image: "/cropped/news-card-1.png",
    summary:
      "কালিয়াকৈরের লতিফপুর শিল্পাঞ্চলে ফুড-গ্রেড প্লাস্টিক ও বিশুদ্ধ পানির কন্টেইনার উৎপাদনে নূর প্লাস্টিক ইন্ডাস্ট্রিজের আধুনিক শিল্প উদ্যোগ।",
    fullArticle: [
      "অদম্য উদ্যম ও নিরলস পরিশ্রমের মাধ্যমে শুরু হয়েছিল যাত্রা। গাজীপুরের কালিয়াকৈর লতিফপুর-বি এলাকায় অবস্থিত নূর প্লাস্টিক ইন্ডাস্ট্রিজ আজ দেশের প্লাস্টিক ও বিশুদ্ধ পানির কন্টেইনার প্যাকেজিং খাতের অন্যতম আস্থার প্রতীক।",
      "স্বত্বাধিকারী মো. নূরুল ইসলামের নেতৃত্বে স্বয়ংক্রিয় ব্লো ও ইনজেকশন মোল্ডিং প্রযুক্তি এবং ১০০% ভার্জিন পলিপ্রোপিলিন ও পেট (PET) রেজিন ব্যবহারের ফলে শীর্ষস্থানীয় বেভারেজ ও শিল্প প্রতিষ্ঠানগুলো নূর প্লাস্টিকের ওপর আস্থা রাখছে।",
      "নিজস্ব কোয়ালিটি কন্ট্রোল ও ল্যাব পরীক্ষার মাধ্যমে প্রতিটি জার ও কন্টেইনার বিএসটিআই ও আন্তর্জাতিক ফুড-গ্রেড মানদণ্ড অনুসরণ করে বাজারজাত করা হচ্ছে।",
      "ভবিষ্যৎ পরিকল্পনা সম্পর্কে উদ্যোক্তা জানান, দেশের চাহিদা মিটিয়ে পরিবেশবান্ধব রিসাইকেলেবল প্যাকেজিং ও সারাদেশে নিরবচ্ছিন্ন সরবরাহ নেটওয়ার্ক বিস্তৃত করাই তাঁদের লক্ষ্য।",
    ],
    keyHighlights: [
      "কালিয়াকৈর পৌরসভা অনুমোদিত আধুনিক প্লাস্টিক উৎপাদন ও সরবরাহ কেন্দ্র",
      "বিশুদ্ধ পানির জার, ইন্ডাস্ট্রিয়াল পেইল ও ফুড-গ্রেড কন্টেইনার উৎপাদন",
      "দক্ষ প্রকৌশলী ও আধুনিক অটোমেটেড মেশিনারি সমন্বিত প্ল্যান্ট",
      "সারা দেশে দ্রুততম সময়ে কর্পোরেট ও বাল্ক ডেলিভারি সক্ষমতা",
    ],
    quote: {
      text: "কোয়ালিটিতে আপস না করাই নূর প্লাস্টিকের এগিয়ে যাওয়ার একমাত্র মূলমন্ত্র। আমরা কেবল পাত্র বানাই না, একটি ব্র্যান্ডের পণ্যের নিরাপত্তা নিশ্চিত করি।",
      author: "নূরুল ইসলাম",
      role: "স্বত্বাধিকারী, নূর প্লাস্টিক ইন্ডাস্ট্রিজ",
    },
    originalSourceUrl: "https://www.prothomalo.com/business",
  },
  {
    id: "story-2",
    slug: "gazipur-decentralized-plastic-packaging-hub",
    title: "সবাইকে ঢাকায় ছুটতে হয় কেন: কালিয়াকৈর শিল্প করিডোর",
    englishTitle: "ঢাকার বাইরে আধুনিক প্লাস্টিক ও প্যাকেজিং শিল্প পার্কের সম্ভাবনা",
    outlet: "The Daily Star",
    outletColor: "#0284c7",
    date: "২৮ নভেম্বর ২০২৫",
    category: "শিল্প পরিকাঠামো ও অর্থনীতি",
    readTime: "৪ মিনিট পাঠ",
    image: "/cropped/news-card-2.png",
    summary:
      "রাজধানীর বাইরে কালিয়াকৈর-গাজীপুরে আধুনিক স্বয়ংক্রিয় প্যাকেজিং কারখানা স্থাপন করে কীভাবে সাপ্লাই চেইন ও কর্মসংস্থান বিকেন্দ্রীকরণ সম্ভব—তা নিয়ে বিশেষ বিশ্লেষণ।",
    fullArticle: [
      "বাংলাদেশের প্রধান প্রধান শিল্প কারখানা ও বাণিজ্যিক কার্যক্রম দীর্ঘদিন ধরে ঢাকাকেন্দ্রিক হওয়ায় যানজট ও পরিবহন ব্যয় বেড়েছে। এই প্রেক্ষাপটে গাজীপুরের কালিয়াকৈরে স্থাপিত আধুনিক প্লাস্টিক ও প্যাকেজিং প্ল্যান্টগুলো নতুন দিগন্ত উন্মোচন করছে।",
      "নূর প্লাস্টিক ইন্ডাস্ট্রিজের লতিফপুর-বি প্ল্যান্টটি মহাসড়ক ও শিল্প করিডোরের সাথে সরাসরি লজিস্টিকস নেটওয়ার্ক গড়ে তোলার মাধ্যমে ২৪ ঘণ্টার মধ্যে দেশের বিভিন্ন প্রান্তে কন্টেইনার ও পানির জার পৌঁছানোর সক্ষমতা তৈরি করেছে।",
      "বিশ্লেষকদের মতে, আধুনিক ইন-হাউস মোল্ডিং ও সরাসরি কারখানা-টু-ওয়্যারহাউস ডেলিভারি পদ্ধতির ফলে উৎপাদনশীলতা প্রায় ৩৫% বৃদ্ধি করা সম্ভব হয়েছে।",
    ],
    keyHighlights: [
      "কালিয়াকৈর মহাসড়ক সংলগ্ন ডেডিকেটেড ডেলিভারি ও সাপ্লাই চ্যানেল",
      "গাজীপুর শিল্পাঞ্চলে স্থানীয় দক্ষ মানবসম্পদ উন্নয়ন ও কর্মসংস্থান",
      "ঢাকার যানজট এড়িয়ে লজিস্টিকস সময় সাশ্রয়",
      "পরিবেশবান্ধব ও রিসাইকেলযোগ্য পলিমার ব্যবস্থাপনা",
    ],
    quote: {
      text: "শিল্পকে কালিয়াকৈর ও গাজীপুরের মতো শিল্প করিডোরে সম্প্রসারণ করলেই টেকসই অর্থনৈতিক উন্নয়ন ও দ্রুত সরবরাহ সম্ভব।",
      author: "শিল্প বিশ্লেষক ফোরাম",
      role: "ন্যাশনাল ইন্ডাস্ট্রিয়াল রিপোর্ট",
    },
    originalSourceUrl: "https://www.thedailystar.net/business",
  },
  {
    id: "story-3",
    slug: "noor-plastic-food-grade-water-packaging-resilience",
    title: "স্থানীয় উদ্যোক্তার মানসম্মত শিল্প গড়ে তোলার গল্প",
    englishTitle: "সততা ও আধুনিক প্রযুক্তিতে বিশ্বমানের প্লাস্টিক প্যাকেজিং নির্মাণ",
    outlet: "Samakal",
    outletColor: "#16a34a",
    date: "১২ মে ২০২৬",
    category: "সংগ্রাম ও সাফল্য",
    readTime: "৩ মিনিট পাঠ",
    image: "/cropped/news-card-3.png",
    summary:
      "নানা চ্যালেঞ্জ মোকাবিলা করে স্বচ্ছতা, ট্রেড লাইসেন্স ও নিয়মতান্ত্রিক মানদণ্ড বজায় রেখে নির্ভরযোগ্য প্লাস্টিক প্যাকেজিং শিল্প গড়ে তোলার গল্প।",
    fullArticle: [
      "প্রতিযোগিতামূলক প্লাস্টিক ও প্যাকেজিং বাজারে সঠিক মান ধরে রাখা সবসময়ই বড় চ্যালেঞ্জ। নূর প্লাস্টিক ইন্ডাস্ট্রিজ শুরু থেকেই ভেজালমুক্ত ভার্জিন গ্রেড কাঁচামাল এবং সঠিক ওজন-পরিমাপ নিশ্চিত করে গ্রাহকদের আস্থা অর্জন করেছে।",
      "প্রতিষ্ঠানটি বিশুদ্ধ পানির ডিসপেন্সার বোতল থেকে শুরু করে পেইন্ট ও ইন্ডাস্ট্রিয়াল পেইল উৎপাদনে আধুনিক প্রিসিশন মোল্ড ব্যবহার করছে।",
      "সততা, অধ্যবসায় এবং সময়মতো ডেলিভারির প্রতিশ্রুতি আজ নূর প্লাস্টিককে কর্পোরেট ও বাণিজ্যিক ক্রেতাদের পছন্দের তালিকায় শীর্ষে নিয়ে এসেছে।",
    ],
    keyHighlights: [
      "শতভাগ লাইসেন্সপ্রাপ্ত ও নিয়মতান্ত্রিক শিল্প প্রতিষ্ঠান (কালিয়াকৈর, গাজীপুর)",
      "ফুড-গ্রেড ও বিপিএ-মুক্ত নিরাপদ ওয়াটার কন্টেইনার উৎপাদন",
      "কর্পোরেট ও ইন্ডাস্ট্রিয়াল খাতের শীর্ষ গ্রাহকদের আস্থা অর্জন",
      "জিরো-ডিফেক্ট কোয়ালিটি কন্ট্রোল ও নির্ভুল মোল্ডিং",
    ],
    quote: {
      text: "গ্রাহকের আস্থা ও পণ্যের গুণগত মানই আমাদের সবচেয়ে বড় পুঁজি। প্রতিটি ব্যাচেই আমরা শতভাগ মান নিশ্চিত করি।",
      author: "নূরুল ইসলাম",
      role: "স্বত্বাধিকারী, নূর প্লাস্টিক ইন্ডাস্ট্রিজ",
    },
    originalSourceUrl: "https://samakal.com/economics",
  },
  {
    id: "story-4",
    slug: "bangladesh-recyclable-plastic-industrial-growth",
    title: "শিল্পবান্ধব অবকাঠামো ও প্যাকেজিং খাতের ভবিষ্যৎ",
    englishTitle: "দেশের প্লাস্টিক ও পুনর্ব্যবহারযোগ্য প্যাকেজিং শিল্পের সম্ভাবনা",
    outlet: "Bonik Barta",
    outletColor: "#ea580c",
    date: "০৫ আগস্ট ২০২৬",
    category: "জাতীয় অর্থনীতি ও পলিসি",
    readTime: "৪ মিনিট পাঠ",
    image: "/cropped/news-card-4.png",
    summary:
      "দেশের জাতীয় প্যাকেজিং শিল্পের সক্ষমতা বৃদ্ধি, কাঁচামাল আমদানি ও পরিবেশবান্ধব প্লাস্টিক পুনর্ব্যবহার কাঠামোর ওপর আলোকপাত।",
    fullArticle: [
      "অভ্যন্তরীণ উৎপাদন ও রপ্তানিমুখী শিল্পের সাথে তাল মিলিয়ে দেশে ফুড-গ্রেড প্লাস্টিক বোতল, জার ও হেভি-ডিউটি ইন্ডাস্ট্রিয়াল পেইলের চাহিদা দ্রুত বাড়ছে।",
      "নূর প্লাস্টিক ইন্ডাস্ট্রিজের মতো নিবন্ধিত ও আধুনিক কারখানাগুলো যদি কাঁচামাল আমদানি ও নিরবচ্ছিন্ন বিদ্যুৎ সহায়তা পায়, তবে আমদানি নির্ভরতা কমিয়ে দেশেই বিশ্বমানের কন্টেইনার সরবরাহ আরও জোরদার হবে।",
      "সার্কুলার ইকোনমি ও শতভাগ রিসাইকেলযোগ্য পলিমারের ব্যবহার সম্প্রসারণে সচেতনতা বাড়াতে শিল্প উদ্যোক্তারা একযোগে কাজ করছেন।",
    ],
    keyHighlights: [
      "আমদানি নির্ভরতা কমিয়ে দেশীয় ভারী প্যাকেজিং সক্ষমতা বৃদ্ধি",
      "বিশুদ্ধ পানির প্যাকেজিং ও ফুড-গ্রেড রেজিন মানদণ্ড অনুসরণ",
      "নতুন উদ্যোক্তা ও মাঝারি শিল্পে টেকসই সাপ্লাই চেইন সহায়তা",
      "সার্কুলার ইকোনমি ও গ্রিন প্যাকেজিংয়ের ভবিষ্যৎ রূপরেখা",
    ],
    quote: {
      text: "একটি দেশের শিল্প কতটা অগ্রসর, তার প্রমাণ মেলে তাদের প্যাকেজিং খাতের সক্ষমতায়। আমাদের স্থানীয় উৎপাদন বিশ্বমানের চেয়ে কোনো অংশে পিছিয়ে নেই।",
      author: "শিল্প পলিসি এক্সপার্ট",
      role: "বণিক বার্তা বিশেষ সম্পাদকীয়",
    },
    originalSourceUrl: "https://bonikbarta.net/home",
  },
];

export function normalizePressStory(item: any): PressStory {
  const quoteObj =
    item.quote && typeof item.quote === "object"
      ? item.quote
      : {
          text: item.highlightQuote || "",
          author: item.quoteAuthor || "নূরুল ইসলাম",
          role: item.quoteRole || "স্বত্বাধিকারী, নূর প্লাস্টিক ইন্ডাস্ট্রিজ",
        };

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    englishTitle: item.englishTitle || item.banglaTitle || item.title,
    banglaTitle: item.banglaTitle || item.englishTitle || item.title,
    outlet: item.outlet || item.newspaper || "National Media",
    newspaper: item.newspaper || item.outlet || "National Media",
    outletColor: item.outletColor || "#0284c7",
    date: item.date || item.dateLabel || "",
    dateLabel: item.dateLabel || item.date || "",
    category: item.category || "শিল্প ও বাণিজ্য",
    readTime: item.readTime || "৩ মিনিট পাঠ",
    image: item.image || item.clippingUrl || "/cropped/news-card-1.png",
    clippingUrl: item.clippingUrl || item.image || "/cropped/news-card-1.png",
    summary: item.summary || "",
    fullArticle: Array.isArray(item.fullArticle)
      ? item.fullArticle
      : item.summary
      ? [item.summary]
      : [],
    keyHighlights: Array.isArray(item.keyHighlights) ? item.keyHighlights : [],
    quote: quoteObj,
    originalSourceUrl: item.originalSourceUrl || "",
    tag: item.tag || "Industrial Milestone",
    isActive: item.isActive ?? true,
    sortOrder: item.sortOrder ?? 0,
  };
}

export function getStoryBySlug(slug: string, list: PressStory[] = PRESS_STORIES): PressStory | undefined {
  const query = decodeURIComponent(slug).toLowerCase();
  return (
    list.find(
      (s) => s.slug.toLowerCase() === query || s.id.toLowerCase() === query
    ) || list[0]
  );
}
