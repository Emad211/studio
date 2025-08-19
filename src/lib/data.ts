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
  showcaseType: 'links' | 'simulator' | 'ai_chatbot';
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
    advanced: {
        adminEmail: string;
    }
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
        about: "This project is an advanced e-commerce platform that leverages AI to create a personalized shopping experience. The system analyzes user behavior to provide tailored product recommendations, increasing engagement and sales. It includes a comprehensive admin dashboard for managing products, users, and orders.",
        about_fa: "این پروژه یک پلتفرم فروشگاهی پیشرفته است که از هوش مصنوعی برای ایجاد تجربه خرید شخصی‌سازی شده بهره می‌برد. سیستم با تحلیل رفتار کاربر، پیشنهادهای محصول متناسب ارائه می‌دهد که منجر به افزایش تعامل و فروش می‌شود. این پلتفرم شامل یک داشبورد مدیریت جامع برای مدیریت محصولات، کاربران و سفارشات است.",
        technical_details: "The frontend is built with Next.js and React, utilizing server-side rendering for optimal performance. The backend is a Node.js server with a PostgreSQL database to handle complex queries. The recommendation engine is a custom model developed with TensorFlow, served via a Flask API.",
        technical_details_fa: "فرانت‌اند با Next.js و React ساخته شده و از رندر سمت سرور برای عملکرد بهینه استفاده می‌کند. بک‌اند یک سرور Node.js با پایگاه داده PostgreSQL برای مدیریت کوئری‌های پیچیده است. موتور پیشنهاددهنده یک مدل سفارشی توسعه‌داده‌شده با TensorFlow است که از طریق یک Flask API سرویس‌دهی می‌شود.",
        challenges: "One of the main challenges was integrating the AI model with the real-time user data stream without affecting site performance. We implemented a message queue system with RabbitMQ to process data asynchronously.",
        challenges_fa: "یکی از چالش‌های اصلی، یکپارچه‌سازی مدل هوش مصنوعی با جریان داده آنی کاربران بدون تأثیر منفی بر عملکرد سایت بود. ما یک سیستم صف پیام با RabbitMQ برای پردازش غیرهمزمان داده‌ها پیاده‌سازی کردیم.",
        solution: "The asynchronous architecture allowed us to decouple the recommendation engine from the main application, ensuring scalability and responsiveness. The AI model updates personalized recommendations in near real-time without blocking user interactions.",
        solution_fa: "معماری غیرهمزمان به ما اجازه داد تا موتور پیشنهاددهنده را از برنامه اصلی جدا کنیم و مقیاس‌پذیری و واکنش‌گرایی را تضمین کنیم. مدل هوش مصنوعی پیشنهادهای شخصی‌سازی‌شده را تقریباً در لحظه و بدون مسدود کردن تعاملات کاربر به‌روز می‌کند.",
        code_snippet: "import { RecommendationEngine } from '@/lib/ai/ecommerce';",
        code_snippet_fa: "import { RecommendationEngine } from '@/lib/ai/ecommerce';"
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
        links: {
            github: "",
            live: ""
        },
        showcaseType: "simulator",
        gallery: [
          "https://placehold.co/1280x720.png",
          "https://placehold.co/1280x720.png",
          "https://placehold.co/1280x720.png"
        ],
        aiPromptContext: "",
        about: "This app helps teams manage their tasks intelligently. An AI agent analyzes task descriptions, deadlines, and dependencies to suggest priorities and optimal workflows. It features real-time collaboration, notifications, and progress tracking.",
        about_fa: "این برنامه به تیم‌ها کمک می‌کند تا وظایف خود را هوشمندانه مدیریت کنند. یک ایجنت هوش مصنوعی توضیحات، مهلت‌ها و وابستگی‌های وظایف را تحلیل کرده و اولویت‌ها و گردش کارهای بهینه را پیشنهاد می‌دهد. این برنامه دارای قابلیت همکاری آنی، اعلان‌ها و پیگیری پیشرفت است.",
        technical_details: "The application is built using React for the frontend and Firebase (Firestore and Realtime Database) for the backend and real-time data synchronization. The AI agent for task prioritization is a custom model built with Scikit-learn, deployed as a cloud function.",
        technical_details_fa: "اپلیکیشن با استفاده از React برای فرانت‌اند و Firebase (Firestore و Realtime Database) برای بک‌اند و همگام‌سازی آنی داده‌ها ساخته شده است. ایجنت هوش مصنوعی برای اولویت‌بندی وظایف، یک مدل سفارشی ساخته‌شده با Scikit-learn است که به عنوان یک Cloud Function مستقر شده است.",
        challenges: "Ensuring real-time updates across all clients without performance degradation was a key challenge. We optimized our Firestore queries and data structures extensively and used the Realtime Database for presence indicators.",
        challenges_fa: "اطمینان از به‌روزرسانی‌های آنی در تمام کلاینت‌ها بدون کاهش عملکرد، یک چالش کلیدی بود. ما کوئری‌های Firestore و ساختارهای داده خود را به طور گسترده بهینه‌سازی کردیم و از Realtime Database برای نشانگرهای حضور آنلاین استفاده کردیم.",
        solution: "By leveraging Firebase's strengths, we achieved a highly responsive and scalable real-time system. The AI agent operates independently in the background, pushing priority updates to clients without interrupting their workflow.",
        solution_fa: "با بهره‌گیری از نقاط قوت Firebase، ما به یک سیستم آنی بسیار واکنش‌گرا و مقیاس‌پذیر دست یافتیم. ایجنت هوش مصنوعی به طور مستقل در پس‌زمینه عمل می‌کند و به‌روزرسانی‌های اولویت را بدون ایجاد وقفه در گردش کار کاربران به آن‌ها ارسال می‌کند.",
        code_snippet: "import { TaskPrioritizerAgent } from '@/lib/ai/tasks';",
        code_snippet_fa: "import { TaskPrioritizerAgent } from '@/lib/ai/tasks';"
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
        about: "This is the very portfolio website you are looking at. It's designed to be a clean, modern, and performant platform to showcase my work in the field of AI and software development. It features a bilingual interface (English/Persian) and a content management system for projects and blog posts.",
        about_fa: "این همان وب‌سایت پورتفولیویی است که در حال مشاهده آن هستید. این سایت به عنوان یک پلتفرم تمیز، مدرن و با کارایی بالا برای نمایش کارهای من در زمینه هوش مصنوعی و توسعه نرم‌افزار طراحی شده است. این سایت دارای یک رابط کاربری دوزبانه (انگلیسی/فارسی) و یک سیستم مدیریت محتوا برای پروژه‌ها و پست‌های وبلاگ است.",
        technical_details: "Built with Next.js App Router for optimal performance and SEO. Styled with Tailwind CSS and ShadCN UI components for a consistent and modern look. Interactive elements are enhanced with Framer Motion. The entire application is statically generated where possible and deployed on Vercel.",
        technical_details_fa: "با Next.js App Router برای عملکرد و سئوی بهینه ساخته شده است. با Tailwind CSS و کامپوننت‌های ShadCN UI برای ظاهری یکپارچه و مدرن استایل‌دهی شده است. عناصر تعاملی با Framer Motion بهبود یافته‌اند. کل برنامه تا حد امکان به صورت استاتیک تولید و بر روی Vercel مستقر شده است.",
        challenges: "A major challenge was creating a fully functional admin panel from scratch that could manage the bilingual content of the portfolio without a traditional database, relying instead on updating a JSON file on the server.",
        challenges_fa: "یک چالش بزرگ، ایجاد یک پنل مدیریت کاملاً کاربردی از ابتدا بود که بتواند محتوای دوزبانه پورتفولیو را بدون یک پایگاه داده سنتی مدیریت کند و در عوض به به‌روزرسانی یک فایل JSON روی سرور متکی باشد.",
        solution: "I implemented a system using Next.js Server Actions that read from and write to a local JSON file. This acts as a simple, file-based CMS, allowing for easy content updates through the admin dashboard, which then triggers revalidation of static paths to reflect changes instantly.",
        solution_fa: "من یک سیستم با استفاده از Next.js Server Actions پیاده‌سازی کردم که از یک فایل JSON محلی می‌خواند و در آن می‌نویسد. این سیستم به عنوان یک CMS ساده و مبتنی بر فایل عمل می‌کند و امکان به‌روزرسانی آسان محتوا از طریق داشبورد مدیریت را فراهم می‌کند، که سپس باعث اعتبارسنجی مجدد مسیرهای استاتیک برای انعکاس فوری تغییرات می‌شود.",
        code_snippet: "import { getProjects } from '@/lib/actions';",
        code_snippet_fa: "import { getProjects } from '@/lib/actions';"
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
        links: {
            github: "",
            live: ""
        },
        showcaseType: "ai_chatbot",
        gallery: [],
        aiPromptContext: "This project is a sophisticated weather forecasting application that leverages a Long Short-Term Memory (LSTM) deep learning model, implemented with TensorFlow and Keras. The primary goal was to achieve higher accuracy in long-range weather predictions compared to traditional models. The model was trained on a massive historical weather dataset spanning over 20 years, including variables like temperature, humidity, wind speed, and pressure. A Flask API was developed to serve the model's predictions, which can be integrated into various front-end applications. One of the main challenges was handling the time-series nature of the data and preventing model overfitting, which was addressed using techniques like dropout and early stopping. The final model demonstrated a 15% improvement in accuracy for 7-day forecasts over the baseline model.",
        about: "This project aims to provide more accurate weather forecasts using a deep learning approach. Traditional models often struggle with long-term predictions, but by using an LSTM (Long Short-Term Memory) network, this model can capture complex temporal dependencies in historical weather data.",
        about_fa: "هدف این پروژه ارائه پیش‌بینی‌های دقیق‌تر آب و هوا با استفاده از یک رویکرد یادگیری عمیق است. مدل‌های سنتی اغلب با پیش‌بینی‌های بلندمدت مشکل دارند، اما با استفاده از یک شبکه LSTM (حافظه طولانی کوتاه‌مدت)، این مدل می‌تواند وابستگی‌های زمانی پیچیده در داده‌های تاریخی آب و هوا را ثبت کند.",
        technical_details: "The core of the project is an LSTM model built with TensorFlow and Keras. It was trained on over 20 years of hourly weather data. The model is exposed via a REST API created with Flask. This allows any frontend application to easily fetch prediction data.",
        technical_details_fa: "هسته اصلی پروژه یک مدل LSTM است که با TensorFlow و Keras ساخته شده. این مدل بر روی داده‌های ساعتی آب و هوای بیش از ۲۰ سال آموزش دیده است. مدل از طریق یک REST API که با Flask ایجاد شده، در دسترس قرار گرفته است. این به هر برنامه فرانت‌اند اجازه می‌دهد تا به راحتی داده‌های پیش‌بینی را دریافت کند.",
        challenges: "The biggest challenge was data preprocessing and feature engineering for the time-series data. Normalizing the data and creating the correct input sequences for the LSTM model was crucial. Preventing overfitting on such a large dataset was also a major concern.",
        challenges_fa: "بزرگترین چالش، پیش‌پردازش داده‌ها و مهندسی ویژگی برای داده‌های سری زمانی بود. نرمال‌سازی داده‌ها و ایجاد توالی‌های ورودی صحیح برای مدل LSTM حیاتی بود. جلوگیری از بیش‌برازش بر روی چنین مجموعه داده بزرگی نیز یک نگرانی عمده بود.",
        solution: "We implemented a sliding window technique to generate sequences for training. We also used dropout layers and an early stopping mechanism during training to combat overfitting. The final model showed a significant 15% improvement in accuracy for 7-day forecasts compared to a baseline ARIMA model.",
        solution_fa: "ما یک تکنیک پنجره لغزان برای تولید توالی‌ها برای آموزش پیاده‌سازی کردیم. همچنین از لایه‌های dropout و مکانیزم توقف زودهنگام در حین آموزش برای مقابله با بیش‌برازش استفاده کردیم. مدل نهایی بهبود قابل توجه ۱۵ درصدی در دقت برای پیش‌بینی‌های ۷ روزه در مقایسه با مدل پایه ARIMA نشان داد.",
        code_snippet: "from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import LSTM, Dense, Dropout",
        code_snippet_fa: "from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import LSTM, Dense, Dropout"
      }
    ];

    const initialBlogPosts: BlogPost[] = [
        {
            slug: 'mastering-deep-learning',
            title: 'Mastering Deep Learning: A Deep Dive',
            title_fa: 'تسلط بر یادگیری عمیق: یک شیرجه عمیق',
            description: 'An in-depth guide to understanding and mastering Deep Learning for more efficient and powerful models.',
            description_fa: 'یک راهنمای عمیق برای درک و تسلط بر یادگیری عمیق برای مدل‌های کارآمدتر و قدرتمندتر.',
            date: '2024-05-15',
            tags: ['Deep Learning', 'Python', 'AI'],
            status: 'published',
            featured_image: "https://placehold.co/1200x630.png",
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
`,
            content_fa: `
## درک قدرت یادگیری عمیق

یادگیری عمیق، زیرمجموعه‌ای از یادگیری ماشین، بر پایه شبکه‌های عصبی مصنوعی است. این حوزه با ایجاد پیشرفت‌هایی در زمینه‌هایی مانند بینایی کامپیوتر، پردازش زبان طبیعی و هوش مصنوعی مولد، صنایع را متحول کرده است.

### پرسپترون

بنیادی‌ترین واحد، پرسپترون است، یک مدل تک نورونی.

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

### هوک useEffect در ری‌اکت

هوک \`useEffect\` به شما اجازه می‌دهد تا در کامپوننت‌های تابعی، عملیات جانبی انجام دهید. این هوک جایگزین نزدیکی برای \`componentDidMount\`، \`componentDidUpdate\` و \`componentWillUnmount\` است.

- **واکشی داده**: می‌توانید هنگام بارگذاری کامپوننت، داده‌ها را از یک API واکشی کنید.
- **اشتراک در رویدادها**: شنونده‌های رویداد را تنظیم کرده و هنگام پیاده‌سازی کامپوننت، آن‌ها را پاک کنید.
- **تغییر دستی در DOM**: در صورت نیاز، به طور مستقیم با DOM تعامل داشته باشید.

## راه‌حل‌های سفارشی برای قابلیت استفاده مجدد

یکی از قدرتمندترین ویژگی‌های یادگیری عمیق، یادگیری انتقالی است. مدل‌های از پیش آموزش‌دیده می‌توانند به عنوان نقطه شروعی برای حل مسائل جدید استفاده شوند. به عنوان مثال، مدلی که روی ImageNet آموزش دیده است، می‌تواند برای یک وظیفه طبقه‌بندی تصویر خاص، تنظیم دقیق شود.

## نتیجه‌گیری

یادگیری عمیق یک ابزار قدرتمند است. با درک و استفاده مؤثر از آن، می‌توانید مدل‌های بسیار قدرتمندی بسازید. این حوزه، هسته هوش مصنوعی مدرن است.
`,
            meta_title_en: "A Deep Dive into Mastering Deep Learning",
            meta_description_en: "Learn the fundamentals and advanced concepts of Deep Learning in this comprehensive guide. Perfect for beginners and experts alike.",
            meta_title_fa: "شیرجه عمیق در تسلط بر یادگیری عمیق",
            meta_description_fa: "در این راهنمای جامع، اصول و مفاهیم پیشرفته یادگیری عمیق را بیاموزید. مناسب برای مبتدیان و متخصصان.",
            og_image: "https://placehold.co/1200x630.png"
        }
    ];

    const initialSettings: SiteSettings = {
        en: {
            siteName: "Emad Karimi",
            authorName: "Emad Karimi",
            metaTitle: "CodeCanvas | A modern portfolio for developers",
            metaDescription: "Showcase your projects and skills with this modern, AI-powered portfolio website."
        },
        fa: {
            siteName: "عماد کریمی",
            authorName: "عماد کریمی",
            metaTitle: "کدکانواس | یک پورتفولیو مدرن برای توسعه‌دهندگان",
            metaDescription: "پروژه‌ها و مهارت‌های خود را با این وب‌سایت پورتفولیو مدرن و مجهز به هوش مصنوعی به نمایش بگذارید."
        },
        seo: {
            siteURL: "https://example.com",
            metaKeywords: "AI, Portfolio, Next.js, React, Developer",
            twitterUsername: "emad211",
            ogImage: "https://placehold.co/1200x630.png"
        },
        socials: {
            email: "emad.k50000@gmail.com",
            github: "https://github.com/Emad211",
            telegram: "https://t.me/Freelancer_programmerr"
        },
        advanced: {
            adminEmail: "admin@example.com"
        }
    };
    
    return { projects: initialProjects, blogPosts: initialBlogPosts, settings: initialSettings };
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
