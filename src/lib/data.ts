
import { BrainCircuit, Book, Database, Code, Activity, Bot, Languages, Server, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  title_fa: string;
  slug: string;
  categories: string[];
  categories_fa: string[];
  description: string;
  description_fa: string;
  image: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
  };
  showcase_simulator: boolean;
  showcase_ai_chatbot: boolean;
  gallery?: string[];
  aiPromptContext?: string;
  about: string;
  about_fa: string;
  technical_details: string;
  technical_details_fa: string;
  challenges: string;
  challenges_fa: string;
  solution: string;
  solution_fa: string;
  code_snippet: string;
  code_snippet_fa: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  title_fa: string;
  description: string;
  description_fa: string;
  date: string;
  tags: string[];
  content: string;
  content_fa: string;
  featured_image: string;
  status: 'published' | 'draft';
  meta_title_en?: string;
  meta_description_en?: string;
  meta_title_fa?: string;
  meta_description_fa?: string;
  og_image?: string;
}

export interface SiteSettings {
    en: {
        siteName: string;
        authorName: string;
        metaTitle: string;
        metaDescription: string;
    };
    fa: {
        siteName: string;
        authorName: string;
        metaTitle: string;
        metaDescription: string;
    };
    seo: {
        siteURL: string;
        metaKeywords?: string;
        twitterUsername?: string;
        ogImage?: string;
    };
    socials: {
        email: string;
        github: string;
        telegram: string;
    };
}

export interface Credentials {
    adminEmail: string;
    adminPasswordHash: string;
    integrations: {
        geminiApiKey?: string;
    }
}

type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
type SkillLevelFa = 'متخصص' | 'پیشرفته' | 'متوسط' | 'مبتدی';

interface Skill {
    name: string;
    level: SkillLevel | SkillLevelFa;
}

interface SkillCategory {
    title: string;
    icon: LucideIcon;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        title: "AI & Machine Learning",
        icon: BrainCircuit,
        skills: [
            { name: "Deep Learning", level: "Expert" },
            { name: "Generative AI", level: "Expert" },
            { name: "Neural Networks", level: "Expert" },
            { name: "Agent Development", level: "Advanced" },
            { name: "Computer Vision", level: "Advanced" },
            { name: "NLP", level: "Advanced" },
        ],
    },
    {
        title: "AI Frameworks",
        icon: Server,
        skills: [
            { name: "TensorFlow", level: "Expert" },
            { name: "PyTorch", level: "Expert" },
            { name: "Scikit-learn", level: "Advanced" },
            { name: "OpenCV", level: "Advanced" },
            { name: "LangChain", level: "Advanced" },
            { name: "AutoGen", level: "Intermediate" },
        ],
    },
    {
        title: "Data Science",
        icon: Activity,
        skills: [
            { name: "Pandas", level: "Expert" },
            { name: "NumPy", level: "Expert" },
            { name: "Statistics", level: "Expert" },
            { name: "Matplotlib", level: "Advanced" },
            { name: "Seaborn", level: "Advanced" },
            { name: "Plotly", level: "Intermediate" },
        ],
    },
    {
        title: "Programming Languages",
        icon: Languages,
        skills: [
            { name: "Python", level: "Expert" },
            { name: "R", level: "Advanced" },
            { name: "MATLAB", level: "Advanced" },
        ],
    },
    {
        title: "Web Development",
        icon: Code,
        skills: [
            { name: "Flask", level: "Advanced" },
            { name: "HTML5", level: "Advanced" },
            { name: "CSS3", level: "Advanced" },
            { name: "Bootstrap", level: "Advanced" },
            { name: "React", level: "Intermediate" },
            { name: "Node.js", level: "Intermediate" },
        ],
    },
    {
        title: "Databases",
        icon: Database,
        skills: [
            { name: "SQL", level: "Advanced" },
            { name: "PostgreSQL", level: "Intermediate" },
            { name: "MySQL", level: "Intermediate" },
            { name: "MongoDB", level: "Beginner" },
        ],
    },
        {
        title: "Research & Writing",
        icon: Book,
        skills: [
            { name: "Research Methods", level: "Expert" },
            { name: "LaTeX", level: "Expert" },
            { name: "Academic Writing", level: "Advanced" },
            { name: "SPSS", level: "Advanced" },
        ],
    },
    {
        title: "Tools & Technologies",
        icon: Wrench,
        skills: [
            { name: "Git", level: "Advanced" },
            { name: "GitHub", level: "Advanced" },
            { name: "Docker", level: "Intermediate" },
            { name: "Terminal", level: "Advanced" },
        ],
    },
];

export const skillCategoriesFa: SkillCategory[] = [
    {
        title: "هوش مصنوعی و یادگیری ماشین",
        icon: BrainCircuit,
        skills: [
            { name: "یادگیری عمیق", level: "متخصص" },
            { name: "هوش مصنوعی مولد", level: "متخصص" },
            { name: "شبکه‌های عصبی", level: "متخصص" },
            { name: "توسعه ایجنت", level: "پیشرفته" },
            { name: "بینایی کامپیوتر", level: "پیشرفته" },
            { name: "پردازش زبان طبیعی", level: "پیشرفته" },
        ],
    },
    {
        title: "فریم‌ورک‌های هوش مصنوعی",
        icon: Server,
        skills: [
            { name: "TensorFlow", level: "متخصص" },
            { name: "PyTorch", level: "متخصص" },
            { name: "Scikit-learn", level: "پیشرفته" },
            { name: "OpenCV", level: "پیشرفته" },
            { name: "LangChain", level: "پیشرفته" },
            { name: "AutoGen", level: "متوسط" },
        ],
    },
    {
        title: "علم داده",
        icon: Activity,
        skills: [
            { name: "Pandas", level: "متخصص" },
            { name: "NumPy", level: "متخصص" },
            { name: "آمار", level: "متخصص" },
            { name: "Matplotlib", level: "پیشرفته" },
            { name: "Seaborn", level: "پیشرفته" },
            { name: "Plotly", level: "متوسط" },
        ],
    },
    {
        title: "زبان‌های برنامه‌نویسی",
        icon: Languages,
        skills: [
            { name: "Python", level: "متخصص" },
            { name: "R", level: "پیشرفته" },
            { name: "MATLAB", level: "پیشرفته" },
        ],
    },
    {
        title: "توسعه وب",
        icon: Code,
        skills: [
            { name: "Flask", level: "پیشرفته" },
            { name: "HTML5", level: "پیشرفته" },
            { name: "CSS3", level: "پیشرفته" },
            { name: "Bootstrap", level: "پیشرفته" },
            { name: "React", level: "متوسط" },
            { name: "Node.js", level: "متوسط" },
        ],
    },
    {
        title: "پایگاه داده",
        icon: Database,
        skills: [
            { name: "SQL", level: "پیشرفته" },
            { name: "PostgreSQL", level: "متوسط" },
            { name: "MySQL", level: "متوسط" },
            { name: "MongoDB", level: "مبتدی" },
        ],
    },
    {
        title: "تحقیق و نگارش",
        icon: Book,
        skills: [
            { name: "روش تحقیق", level: "متخصص" },
            { name: "LaTeX", level: "متخصص" },
            { name: "نگارش آکادمیک", level: "پیشرفته" },
            { name: "SPSS", level: "پیشرفته" },
        ],
    },
    {
        title: "ابزارها و تکنولوژی‌ها",
        icon: Wrench,
        skills: [
            { name: "Git", level: "پیشرفته" },
            { name: "GitHub", level: "پیشرفته" },
            { name: "Docker", level: "متوسط" },
            { name: "ترمینال", level: "پیشرفته" },
        ],
    },
];

export interface Service {
  title: string;
  title_fa: string;
  description: string;
  description_fa: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "AI Model Development",
    title_fa: "توسعه مدل‌های هوش مصنوعی",
    description: "Developing custom machine learning and deep learning models to solve complex problems, from natural language processing to computer vision.",
    description_fa: "توسعه مدل‌های سفارشی یادگیری ماشین و یادگیری عمیق برای حل مسائل پیچیده، از پردازش زبان طبیعی تا بینایی کامپیوتر.",
    icon: BrainCircuit,
  },
  {
    title: "AI Agent Development",
    title_fa: "توسعه ایجنت‌های هوشمند",
    description: "Building intelligent, autonomous agents that can reason, plan, and execute complex tasks to automate workflows and enhance capabilities.",
    description_fa: "ساخت ایجنت‌های هوشمند و مستقل که می‌توانند استدلال، برنامه‌ریزی و اجرای وظایf پیچیده را برای خودکارسازی گردش کار و افزایش قابلیت‌ها انجام دهند.",
    icon: Bot,
  },
  {
    title: "Data Analysis & Statistics",
    title_fa: "تحلیل داده و آمار",
    description: "In-depth data analysis, statistical modeling, and visualization to extract valuable insights and inform decision-making.",
    description_fa: "تحلیل عمیق داده‌ها، مدل‌سازی آماری و تصویرسازی برای استخراج بینش‌های ارزشمند و اطلاع‌رسانی در تصمیم‌گیری‌ها.",
    icon: Activity,
  },
  {
    title: "Research & Thesis Writing",
    title_fa: "تحقیق و نگارش پایان‌نامه",
    description: "Providing expertise in academic research, experimental design, and writing high-quality technical papers and theses.",
    description_fa: "ارائه تخصص در تحقیقات آکادمیک، طراحی آزمایش‌ها و نگارش مقالات فنی و پایان‌نامه‌های با کیفیت بالا.",
    icon: Book,
  },
   {
    title: "Web Development & Design",
    title_fa: "توسعه و طراحی وب",
    description: "Creating modern, responsive, and high-performance websites and web applications tailored to your specific needs.",
    description_fa: "ایجاد وب‌سایت‌ها و برنامه‌های کاربردی وب مدرن، واکنش‌گرا و با کارایی بالا متناسب با نیازهای خاص شما.",
    icon: Code,
  },
];


export const education = [
    {
        degree: "Master's in Computer Engineering",
        specialization: "AI Specialization",
        university: "Mazandaran University",
        duration: "2024-Present",
    },
    {
        degree: "Bachelor's in Computer Engineering",
        university: "Mazandaran University",
        duration: "2020-2024",
    }
]

export const experience = [
    {
        role: "Freelance Programmer",
        company: "Self-employed",
        duration: "April 2023 - Present",
        location: "Remote"
    },
    {
        role: "Python Programmer",
        company: "استارت اپ مسو",
        duration: "2020 - 2023",
        location: "Remote"
    },
    {
        role: "Statistician",
        company: "Golbahar Oil Factory",
        location: "Tehran, Varamin",
        duration: "April 2019 - April 2020"
    }
];

export const educationFa = [
    {
        degree: "کارشناسی ارشد مهندسی کامپیوتر",
        specialization: "گرایش هوش مصنوعی",
        university: "دانشگاه مازندران",
        duration: "۱۴۰۳-اکنون",
    },
    {
        degree: "کارشناسی مهندسی کامپیوتر",
        university: "دانشگاه مازندران",
        duration: "۱۳۹۹-۱۴۰۳",
    }
];

export const experienceFa = [
    {
        role: "برنامه‌نویس فریلنسر",
        company: "خویش‌فرما",
        duration: "فروردین ۱۴۰۲ - اکنون",
        location: "دورکاری"
    },
    {
        role: "برنامه‌نویس پایتون",
        company: "استارت اپ مسو",
        duration: "۱۳۹۹ - ۱۴۰۲",
        location: "دورکاری"
    },
    {
        role: "کارشناس آمار",
        company: "کارخانه روغن گلبهار",
        location: "تهران، ورامین",
        duration: "فروردین ۱۳۹۸ - فروردین ۱۳۹۹"
    }
];
