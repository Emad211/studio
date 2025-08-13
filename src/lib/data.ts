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
  showcaseType?: 'links' | 'simulator' | 'ai_chatbot';
  gallery?: string[];
  aiPromptContext?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

export const siteConfig = {
    name: "CodeCanvas",
    name_fa: "کدکانواس",
    description: "A modern portfolio for developers, showcasing AI projects and skills.",
    description_fa: "یک پورتفولیو مدرن برای توسعه‌دهندگان، برای نمایش پروژه‌ها و مهارت‌های هوش مصنوعی.",
    url: "https://your-domain.com", // TODO: Replace with your domain
    author: "Emad Karimi",
}

export function getInitialData() {
    const initialProjects: Project[] = [
      {
        title: "AI-Powered E-commerce Platform",
        title_fa: "پلتفرم فروشگاهی مجهز به هوش مصنوعی",
        slug: "ai-ecommerce-platform",
        categories: ["Web Development & Design", "AI Model Development"],
        categories_fa: ["توسعه و طراحی وب", "توسعه مدل‌های هوش مصنوعی"],
        description: "A full-featured e-commerce platform using AI for personalized recommendations and a complete admin dashboard.",
        description_fa: "یک پلتفرم فروشگاهی کامل با استفاده از هوش مصنوعی برای پیشنهادهای شخصی‌سازی شده و یک داشبورد مدیریت جامع.",
        image: "https://placehold.co/600x400.png",
        tags: ["Next.js", "React", "TypeScript", "Generative AI", "PostgreSQL", "Admin Panel"],
        links: {
          github: "https://github.com/Emad211",
          live: "#",
        },
        showcaseType: "links",
        gallery: [],
        aiPromptContext: "",
      },
      {
        title: "Intelligent Task Management App",
        title_fa: "اپلیکیشن هوشمند مدیریت وظایف",
        slug: "intelligent-task-app",
        categories: ["AI Agent Development", "Web Development & Design"],
        categories_fa: ["توسعه ایجنت‌های هوشمند", "توسعه و طراحی وب"],
        description: "A collaborative task management tool with AI-driven task prioritization and real-time updates.",
        description_fa: "یک ابزار مدیریت وظایف تیمی با اولویت‌بندی هوشمند وظایف توسط هوش مصنوعی و به‌روزرسانی‌های آنی.",
        image: "https://placehold.co/600x400.png",
        tags: ["React", "Firebase", "AI Agents", "Scikit-learn", "Real-time"],
        links: {},
        showcaseType: "simulator",
        gallery: [
          "https://placehold.co/1280x720.png",
          "https://placehold.co/1280x720.png",
          "https://placehold.co/1280x720.png",
        ],
        aiPromptContext: "",
      },
      {
        title: "AI Portfolio Website",
        title_fa: "وب‌سایت پورتفولیو با هوش مصنوعی",
        slug: "ai-portfolio-website",
        categories: ["Web Development & Design"],
        categories_fa: ["توسعه و طراحی وب"],
        description: "A personal portfolio to showcase AI projects and skills, built with a focus on performance and aesthetics.",
        description_fa: "یک پورتفolio شخصی برای نمایش پروژه‌ها و مهارت‌های مرتبط با هوش مصنوعی، ساخته شده با تمرکز بر عملکرد و زیبایی.",
        image: "https://placehold.co/600x400.png",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
        links: {
          github: "https://github.com/Emad211",
          live: "#",
        },
        showcaseType: "links",
        gallery: [],
        aiPromptContext: "",
      },
      {
        title: "Deep Learning Weather Forecaster",
        title_fa: "پیش‌بینی وضع هوا با یادگیری عمیق",
        slug: "dl-weather-app",
        categories: ["AI Model Development", "Data Analysis & Statistics"],
        categories_fa: ["توسعه مدل‌های هوش مصنوعی", "تحلیل داده و آمار"],
        description: "A weather application that uses deep learning models to provide highly accurate, long-term weather forecasts.",
        description_fa: "یک اپلیکیشن هواشناسی که از مدل‌های یادگیری عمیق برای ارائه پیش‌بینی‌های بلندمدت و بسیار دقیق استفاده می‌کند.",
        image: "https://placehold.co/600x400.png",
        tags: ["Python", "TensorFlow", "Keras", "Flask", "API"],
        links: {},
        showcaseType: "ai_chatbot",
        gallery: [],
        aiPromptContext: "This project is a sophisticated weather forecasting application that leverages a Long Short-Term Memory (LSTM) deep learning model, implemented with TensorFlow and Keras. The primary goal was to achieve higher accuracy in long-range weather predictions compared to traditional models. The model was trained on a massive historical weather dataset spanning over 20 years, including variables like temperature, humidity, wind speed, and pressure. A Flask API was developed to serve the model's predictions, which can be integrated into various front-end applications. One of the main challenges was handling the time-series nature of the data and preventing model overfitting, which was addressed using techniques like dropout and early stopping. The final model demonstrated a 15% improvement in accuracy for 7-day forecasts over the baseline model.",
      },
    ];

    const initialBlogPosts: BlogPost[] = [
        {
            slug: 'mastering-deep-learning',
            title: 'Mastering Deep Learning: A Deep Dive',
            description: 'An in-depth guide to understanding and mastering Deep Learning for more efficient and powerful models.',
            date: '2024-05-15',
            tags: ['Deep Learning', 'Python', 'AI'],
            content: `
## Understanding the Power of Deep Learning

Deep Learning, a subset of machine learning, is based on artificial neural networks. It has revolutionized industries by enabling breakthroughs in areas like computer vision, natural language processing, and generative AI.

### The Perceptron

The most fundamental unit is the Perceptron, a single neuron model.

\`\`\`python
import numpy as np

class Perceptron:
    def __init__(self, learning_rate=0.01, n_iters=1000):
        self.lr = learning_rate
        self.n_iters = n_iters
        self.activation_func = self._unit_step_func
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0
        y_ = np.array([1 if i > 0 else 0 for i in y])

        for _ in range(self.n_iters):
            for idx, x_i in enumerate(X):
                linear_output = np.dot(x_i, self.weights) + self.bias
                y_predicted = self.activation_func(linear_output)
                update = self.lr * (y_[idx] - y_predicted)
                self.weights += update * x_i
                self.bias += update

    def predict(self, X):
        linear_output = np.dot(X, self.weights) + self.bias
        y_predicted = self.activation_func(linear_output)
        return y_predicted

    def _unit_step_func(self, x):
        return np.where(x>=0, 1, 0)
\`\`\`

### The useEffect Hook in React

The \`useEffect\` hook lets you perform side effects in functional components. It's a close replacement for \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\`.

- **Fetching data**: You can fetch data from an API when the component mounts.
- **Subscribing to events**: Set up event listeners and clean them up when the component unmounts.
- **Manually changing the DOM**: Directly interact with the DOM when needed.

## Custom Solutions for Reusability

One of the most powerful features of Deep Learning is transfer learning. Pre-trained models can be used as a starting point to solve new problems. For example, a model trained on ImageNet can be fine-tuned for a specific image classification task.

## Conclusion

Deep Learning is a powerful tool. By understanding and using it effectively, you can build very powerful models. It is the core of modern AI.
`
        }
    ];
    return { projects: initialProjects, blogPosts: initialBlogPosts };
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
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "AI Model Development",
    description: "Developing custom machine learning and deep learning models to solve complex problems, from natural language processing to computer vision.",
    icon: BrainCircuit,
  },
  {
    title: "AI Agent Development",
    description: "Building intelligent, autonomous agents that can reason, plan, and execute complex tasks to automate workflows and enhance capabilities.",
    icon: Bot,
  },
  {
    title: "Data Analysis & Statistics",
    description: "In-depth data analysis, statistical modeling, and visualization to extract valuable insights and inform decision-making.",
    icon: Activity,
  },
  {
    title: "Research & Thesis Writing",
    description: "Providing expertise in academic research, experimental design, and writing high-quality technical papers and theses.",
    icon: Book,
  },
   {
    title: "Web Development & Design",
    description: "Creating modern, responsive, and high-performance websites and web applications tailored to your specific needs.",
    icon: Code,
  },
];

export const servicesFa: Service[] = [
  {
    title: "توسعه مدل‌های هوش مصنوعی",
    description: "توسعه مدل‌های سفارشی یادگیری ماشین و یادگیری عمیق برای حل مسائل پیچیده، از پردازش زبان طبیعی تا بینایی کامپیوتر.",
    icon: BrainCircuit,
  },
  {
    title: "توسعه ایجنت‌های هوشمند",
    description: "ساخت ایجنت‌های هوشمند و مستقل که می‌توانند استدلال، برنامه‌ریزی و اجرای وظایف پیچیده را برای خودکارسازی گردش کار و افزایش قابلیت‌ها انجام دهند.",
    icon: Bot,
  },
  {
    title: "تحلیل داده و آمار",
    description: "تحلیل عمیق داده‌ها، مدل‌سازی آماری و تصویرسازی برای استخراج بینش‌های ارزشمند و اطلاع‌رسانی در تصمیم‌گیری‌ها.",
    icon: Activity,
  },
  {
    title: "تحقیق و نگارش پایان‌نامه",
    description: "ارائه تخصص در تحقیقات آکادمیک، طراحی آزمایش‌ها و نگارش مقالات فنی و پایان‌نامه‌های با کیفیت بالا.",
    icon: Book,
  },
   {
    title: "توسعه و طراحی وب",
    description: "ایجاد وب‌سایت‌ها و برنامه‌های کاربردی وب مدرن، واکنش‌گرا و با کارایی بالا متناسب با نیازهای خاص شما.",
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
