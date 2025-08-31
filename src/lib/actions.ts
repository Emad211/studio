
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Project, BlogPost, SiteSettings, Credentials } from "./data";
import { services } from "./data";
import { cookies } from 'next/headers';
import { put, head, del } from '@vercel/blob';

// --- Data Structure for the main JSON file ---
interface AppData {
    projects: Project[];
    blogPosts: BlogPost[];
    siteSettings: SiteSettings;
}

// --- Vercel Blob Helper Functions ---

const DATA_KEY = "data.json";
const CREDENTIALS_KEY = "credentials.json";

// Gets all public application data (projects, posts, settings)
async function getAppData(): Promise<AppData> {
    try {
        const blob = await head(DATA_KEY);
        const response = await fetch(blob.url);
        if (!response.ok) {
            if (response.status === 404) {
                 console.log(`'${DATA_KEY}' not found. Initializing with default data.`);
                 const defaultData = getDefaultAppData();
                 await saveAppData(defaultData);
                 return defaultData;
            }
            throw new Error(`Failed to fetch app data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        if ((error as any).message.includes('404')) {
             console.log(`'${DATA_KEY}' not found. Initializing with default data.`);
             const defaultData = getDefaultAppData();
             await saveAppData(defaultData);
             return defaultData;
        }
        console.warn(`[Vercel Blob] Could not fetch '${DATA_KEY}'. Returning default data. Error:`, error);
        return getDefaultAppData();
    }
}

// Saves all public application data
async function saveAppData(data: AppData): Promise<void> {
    await put(DATA_KEY, JSON.stringify(data, null, 2), { 
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN 
    });
    revalidatePath("/", "layout");
}

// Gets sensitive credentials
export async function getCredentials(): Promise<Credentials> {
    try {
        const blob = await head(CREDENTIALS_KEY, { token: process.env.BLOB_READ_WRITE_TOKEN });
        const response = await fetch(blob.url);
        if (!response.ok) {
            if (response.status === 404) {
                console.log(`'${CREDENTIALS_KEY}' not found. Initializing with default credentials.`);
                const defaultCreds = getDefaultCredentials();
                await saveCredentialsData(defaultCreds);
                return defaultCreds;
            }
            throw new Error(`Failed to fetch credentials: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
       if ((error as any).message.includes('404')) {
            console.log(`'${CREDENTIALS_KEY}' not found. Initializing with default credentials.`);
            const defaultCreds = getDefaultCredentials();
            await saveCredentialsData(defaultCreds);
            return defaultCreds;
        }
        console.warn(`[Vercel Blob] Could not fetch '${CREDENTIALS_KEY}'. Returning default credentials. Error:`, error);
        return getDefaultCredentials();
    }
}

// Saves sensitive credentials
async function saveCredentialsData(data: Credentials): Promise<void> {
    await put(CREDENTIALS_KEY, JSON.stringify(data, null, 2), { 
        access: 'public', // URL is unguessable
        token: process.env.BLOB_READ_WRITE_TOKEN 
    }); 
}


// --- Default Data Functions (for first-time setup) ---

function getDefaultAppData(): AppData {
    return {
        projects: [
          {
            title: "AI Financial Trading Agent",
            title_fa: "عامل هوشمند معاملات مالی",
            slug: "ai-trading-agent",
            categories: ["AI Model Development", "AI Agent Development"],
            categories_fa: ["توسعه مدل‌های هوش مصنوعی", "توسعه ایجنت‌های هوشمند"],
            description: "An autonomous agent that analyzes market data, predicts stock movements, and executes trades using reinforcement learning.",
            description_fa: "یک عامل هوشمند و مستقل که داده‌های بازار را تحلیل کرده، حرکت سهام را پیش‌بینی می‌کند و با استفاده از یادگیری تقویتی معاملات را انجام می‌دهد.",
            image: "https://picsum.photos/600/400?random=1",
            tags: ["Reinforcement Learning", "LLM", "Python", "TensorFlow"],
            links: {
              github: "https://github.com",
              live: "https://google.com"
            },
            showcase_simulator: false,
            showcase_ai_chatbot: true,
            aiPromptContext: "The AI Financial Trading Agent is a sophisticated system built with Python, TensorFlow, and reinforcement learning. Its core architecture consists of three main components: the Data Ingestion module, the Prediction Engine, and the Execution Module. The Data Ingestion module collects real-time market data from various APIs like Alpha Vantage and Polygon. The Prediction Engine uses a combination of an LSTM model for time-series forecasting and a transformer-based model to analyze news sentiment. The agent was trained over 5 years of historical S&P 500 data and achieved a Sharpe ratio of 1.8 in backtesting, significantly outperforming the buy-and-hold strategy. The biggest challenge was managing risk and preventing catastrophic losses during market volatility, which was solved by implementing a dynamic stop-loss mechanism based on the VIX index.",
            about: "This project showcases the development of a fully autonomous financial trading agent. The agent leverages advanced AI techniques to operate in the stock market, aiming to maximize returns while managing risk. The core of this project is a sophisticated reinforcement learning model that learns and adapts its trading strategies over time.",
            about_fa: "این پروژه توسعه یک عامل معاملات مالی کاملاً مستقل را به نمایش می‌گذارد. این عامل از تکنیک‌های پیشرفته هوش مصنوعی برای فعالیت در بازار سهام بهره می‌برد و هدف آن حداکثر کردن بازده و مدیریت ریسک است. هسته اصلی این پروژه یک مدل یادگیری تقویتی پیچیده است که استراتژی‌های معاملاتی خود را در طول زمان یاد می‌گیرد و تطبیق می‌دهد.",
            technical_details: "The agent is built on a microservices architecture using Python. The primary AI model is a Deep Q-Network (DQN) implemented in TensorFlow. Market data is streamed via WebSockets and processed in real-time. A custom-built backtesting engine, based on Pandas and NumPy, was developed to evaluate the agent's performance on historical data.",
            technical_details_fa: "این عامل بر اساس یک معماری میکروسرویس با پایتون ساخته شده است. مدل اصلی هوش مصنوعی یک شبکه Deep Q-Network (DQN) است که با TensorFlow پیاده‌سازی شده. داده‌های بازار از طریق وب‌سوکت‌ها استریم شده و به صورت بلادرنگ پردازش می‌شوند. یک موتور بک‌تست سفارشی بر پایه Pandas و NumPy برای ارزیابی عملکرد عامل بر روی داده‌های تاریخی توسعه داده شد.",
            challenges: "One of the main challenges was the high volatility and noise in financial data, which made training a stable agent difficult. Another challenge was preventing the agent from overfitting to historical data and ensuring it could generalize to new market conditions.",
            challenges_fa: "یکی از چالش‌های اصلی، نوسانات و نویز بالای داده‌های مالی بود که آموزش یک عامل پایدار را دشوار می‌کرد. چالش دیگر جلوگیری از بیش‌برازش (overfitting) عامل به داده‌های تاریخی و اطمینان از قابلیت تعمیم آن به شرایط جدید بازار بود.",
            solution: "To combat noise, we implemented advanced data preprocessing techniques, including wavelet transforms. To prevent overfitting, we used a combination of dropout layers in the neural network and an ensemble of models trained on different time periods. A strict risk management module was also integrated to automatically halt trading during black swan events.",
            solution_fa: "برای مقابله با نویز، ما تکنیک‌های پیش‌پردازش داده پیشرفته‌ای، از جمله تبدیل موجک، را پیاده‌سازی کردیم. برای جلوگیری از بیش‌برازش، از ترکیبی از لایه‌های dropout در شبکه عصبی و یک گروه از مدل‌های آموزش دیده بر روی دوره‌های زمانی مختلف استفاده کردیم. یک ماژول مدیریت ریسک سختگیرانه نیز برای توقف خودکار معاملات در طول رویدادهای قوی سیاه ادغام شد.",
            code_snippet: "def execute_trade(self, action, stock_price):\n    if action == 'buy':\n        self.portfolio.buy(stock=self.ticker, price=stock_price)\n        print(f'Executing BUY for {self.ticker} at {stock_price}')\n    elif action == 'sell':\n        self.portfolio.sell(stock=self.ticker, price=stock_price)\n        print(f'Executing SELL for {self.ticker} at {stock_price}')",
            code_snippet_fa: "def execute_trade(self, action, stock_price):\n    if action == 'buy':\n        self.portfolio.buy(stock=self.ticker, price=stock_price)\n        print(f'خرید سهم {self.ticker} با قیمت {stock_price}')\n    elif action == 'sell':\n        self.portfolio.sell(stock=self.ticker, price=stock_price)\n        print(f'فروش سهم {self.ticker} با قیمت {stock_price}')"
          },
          {
            title: "Computer Vision Security System",
            title_fa: "سیستم امنیتی با بینایی کامپیوتر",
            slug: "cv-security-system",
            categories: ["AI Model Development", "Data Analysis & Statistics"],
            categories_fa: ["توسعه مدل‌های هوش مصنوعی", "تحلیل داده و آمار"],
            description: "An intelligent security system that uses YOLOv8 for real-time object detection to identify intruders and unauthorized objects.",
            description_fa: "یک سیستم امنیتی هوشمند که از مدل YOLOv8 برای تشخیص اشیاء در زمان واقعی جهت شناسایی متجاوزین و اشیاء غیرمجاز استفاده می‌کند.",
            image: "https://picsum.photos/600/400?random=2",
            tags: ["Computer Vision", "YOLOv8", "PyTorch", "OpenCV"],
            links: {
              github: "https://github.com",
            },
            showcase_simulator: true,
            gallery: [
                "https://res.cloudinary.com/dfiwrj1dm/image/upload/v1725066491/cld-sample-2.jpg",
                "https://res.cloudinary.com/dfiwrj1dm/image/upload/v1725066487/cld-sample.jpg",
                "https://res.cloudinary.com/dfiwrj1dm/image/upload/v1725066495/samples/people/boy-snow-hoodie.jpg",
                "https://res.cloudinary.com/dfiwrj1dm/image/upload/v1725066498/samples/landscapes/beach-boat.jpg"
            ],
            showcase_ai_chatbot: false,
            about: "This project involves building a real-time security monitoring system using state-of-the-art object detection models. The system can be deployed on edge devices like a Raspberry Pi and streams video to a central server for analysis and alerting. It is designed to be robust against various lighting conditions and camera angles.",
            about_fa: "این پروژه شامل ساخت یک سیستم نظارت امنیتی بلادرنگ با استفاده از مدل‌های پیشرفته تشخیص اشیاء است. این سیستم قابلیت استقرار بر روی دستگاه‌های لبه مانند رزبری پای را دارد و ویدیو را برای تحلیل و هشدار به یک سرور مرکزی استریم می‌کند. این سیستم به گونه‌ای طراحی شده که در برابر شرایط نوری مختلف و زوایای دوربین مقاوم باشد.",
            technical_details: "The core of the system is a fine-tuned YOLOv8 model, trained on a custom dataset of security footage. The model is implemented using PyTorch. Video processing and streaming are handled by OpenCV and GStreamer. The backend is a Flask server that receives alerts and sends notifications via Telegram Bot API.",
            technical_details_fa: "هسته اصلی سیستم یک مدل YOLOv8 بهینه‌سازی شده است که بر روی یک مجموعه داده سفارشی از فیلم‌های امنیتی آموزش دیده است. مدل با استفاده از PyTorch پیاده‌سازی شده. پردازش و استریم ویدیو توسط OpenCV و GStreamer انجام می‌شود. بک‌اند یک سرور Flask است که هشدارها را دریافت کرده و از طریق API ربات تلگرام اعلان ارسال می‌کند.",
            challenges: "The primary challenge was achieving high accuracy in low-light conditions. Another significant hurdle was optimizing the model to run efficiently on resource-constrained edge devices without sacrificing too much accuracy.",
            challenges_fa: "چالش اصلی، دستیابی به دقت بالا در شرایط کم نور بود. مانع مهم دیگر، بهینه‌سازی مدل برای اجرای کارآمد بر روی دستگاه‌های لبه با منابع محدود بدون قربانی کردن بیش از حد دقت بود.",
            solution: "To improve low-light performance, we used data augmentation techniques like random brightness and contrast adjustments. For optimization, we applied model quantization and used the TensorRT engine, which resulted in a 3x speedup on the edge device with only a 2% drop in mAP.",
            solution_fa: "برای بهبود عملکرد در نور کم، از تکنیک‌های افزایش داده مانند تنظیمات تصادفی روشنایی و کنتراست استفاده کردیم. برای بهینه‌سازی، ما کوانتیزه‌سازی مدل را اعمال کرده و از موتور TensorRT استفاده نمودیم که منجر به افزایش سرعت ۳ برابری روی دستگاه لبه با تنها ۲٪ کاهش در mAP شد.",
            code_snippet: "results = model(frame)  # Run YOLOv8 inference\nfor r in results:\n    boxes = r.boxes\n    for box in boxes:\n        if model.names[int(box.cls)] == 'person':\n            send_alert(frame, box.xyxy)",
            code_snippet_fa: "results = model(frame)  # اجرای مدل YOLOv8\nfor r in results:\n    boxes = r.boxes\n    for box in boxes:\n        if model.names[int(box.cls)] == 'person':\n            send_alert(frame, box.xyxy) # ارسال هشدار شناسایی انسان"
          }
        ],
        blogPosts: [
            {
                slug: "rise-of-generative-ai",
                title: "The Rise of Generative AI",
                title_fa: "ظهور هوش مصنوعی مولد",
                description: "A deep dive into the models, technologies, and implications of the recent explosion in generative AI, from LLMs to diffusion models.",
                description_fa: "نگاهی عمیق به مدل‌ها، تکنولوژی‌ها و پیامدهای انفجار اخیر در حوزه هوش مصنوعی مولد، از مدل‌های زبان بزرگ تا مدل‌های انتشاری.",
                date: "2024-08-15",
                tags: ["Generative AI", "LLM", "Diffusion Models", "Technology"],
                content: "Generative AI has taken the world by storm. In this post, we explore the core concepts behind this revolution...",
                content_fa: "هوش مصنوعی مولد جهان را متحول کرده است. در این پست، ما مفاهیم اصلی پشت این انقلاب را بررسی می‌کنیم...",
                featured_image: "https://picsum.photos/1280/720?random=3",
                status: 'published',
                meta_title_en: "The Ultimate Guide to Generative AI in 2024",
                meta_description_en: "Learn everything you need to know about Generative AI, including Large Language Models (LLMs) and image diffusion models. Explore the tech and its impact.",
                meta_title_fa: "راهنمای جامع هوش مصنوعی مولد در سال ۲۰۲۴",
                meta_description_fa: "همه چیز را در مورد هوش مصنوعی مولد، از جمله مدل‌های زبان بزرگ (LLM) و مدل‌های انتشار تصویر بیاموزید. با این تکنولوژی و تاثیرات آن آشنا شوید.",
                og_image: "https://picsum.photos/1200/630?random=4"
            },
            {
                slug: "deep-dive-tensorflow",
                title: "Deep Dive into TensorFlow 2.0",
                title_fa: "بررسی عمیق TensorFlow 2.0",
                description: "An overview of the key features and changes in TensorFlow 2.0, with code examples and best practices.",
                description_fa: "مروری بر ویژگی‌ها و تغییرات کلیدی در TensorFlow 2.0، همراه با مثال‌های کد و بهترین شیوه‌ها.",
                date: "2024-07-22",
                tags: ["TensorFlow", "Deep Learning", "Python"],
                content: "TensorFlow 2.0 introduced many changes, including eager execution by default. This article explores how to adapt your code...",
                content_fa: "تنسورفلو ۲.۰ تغییرات زیادی را معرفی کرد، از جمله اجرای مشتاقانه (eager execution) به صورت پیش‌فرض. این مقاله به بررسی چگونگی تطبیق کدهای شما می‌پردازد...",
                featured_image: "https://picsum.photos/1280/720?random=5",
                status: 'draft',
            }
        ],
        siteSettings: {
            en: { 
                siteName: "Emad Karimi", 
                authorName: "Emad Karimi", 
                metaTitle: "Emad Karimi - AI Specialist & Developer", 
                metaDescription: "The professional portfolio of Emad Karimi, an AI specialist and computer engineer." 
            },
            fa: { 
                siteName: "عماد کریمی", 
                authorName: "عماد کریمی", 
                metaTitle: "عماد کریمی - متخصص هوش مصنوعی و توسعه‌دهنده", 
                metaDescription: "پورتفولیو حرفه‌ای عماد کریمی، متخصص هوش مصنوعی و مهندس کامپیوتر." 
            },
            seo: { 
                siteURL: "https://example.com",
                metaKeywords: "AI, Artificial Intelligence, Portfolio, Developer, Computer Engineer",
                twitterUsername: "your_twitter",
                ogImage: "https://picsum.photos/1200/630?random=6"
            },
            socials: { 
                email: "test@example.com", 
                github: "https://github.com", 
                telegram: "https://telegram.org"
            },
        }
    };
}

function getDefaultCredentials(): Credentials {
    const defaultPassword = process.env.ADMIN_PASSWORD || "admin";
    const passwordHash = Buffer.from(defaultPassword).toString('base64');
    return {
        adminEmail: process.env.ADMIN_EMAIL || "admin@example.com",
        adminPasswordHash: passwordHash,
        integrations: {
            geminiApiKey: process.env.GEMINI_API_KEY || "",
        }
    };
}

// --- Public Data Getters ---

export async function getProjects(): Promise<Project[]> {
    try {
        const data = await getAppData();
        return data.projects.sort((a, b) => a.title_fa.localeCompare(b.title_fa));
    } catch (error) {
        console.error("Failed to get projects:", error);
        return [];
    }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
     try {
        const data = await getAppData();
        return data.blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error("Failed to get blog posts:", error);
        return [];
    }
}

export async function getSiteSettings(): Promise<SiteSettings> {
    try {
        const data = await getAppData();
        return data.siteSettings;
    } catch (error) {
        console.error("Failed to get site settings:", error);
        // Return a fallback default to prevent crashes
        return getDefaultAppData().siteSettings;
    }
}

export async function getAllCategories(lang: 'en' | 'fa') {
  if (lang === 'fa') {
    return services.map(s => s.title_fa);
  }
  return services.map(s => s.title);
}

// --- Authentication Actions ---
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export async function handleLogin(prevState: any, formData: FormData) {
  try {
    const { email, password } = loginSchema.parse(Object.fromEntries(formData));
    const credentials = await getCredentials();
    
    if (!credentials.adminEmail || !credentials.adminPasswordHash) {
      return { success: false, message: "تنظیمات ورود در سرور پیکربندی نشده است." };
    }
    
    const inputPasswordHash = Buffer.from(password).toString('base64');

    if (email === credentials.adminEmail && inputPasswordHash === credentials.adminPasswordHash) {
      const session = { user: { email: credentials.adminEmail }, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) };
      cookies().set("session", JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: session.expires,
        sameSite: 'lax',
        path: '/',
      });
      return { success: true, message: "ورود موفقیت‌آمیز بود." };
    } else {
      return { success: false, message: "ایمیل یا رمز عبور نامعتبر است." };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: "لطفاً ایمیل و رمز عبور معتبر وارد کنید." };
    }
    console.error("Login error:", error);
    return { success: false, message: "خطای ناشناخته‌ای رخ داد." };
  }
}

// --- Project Actions ---
const projectSchema = z.object({
  title: z.string().min(1, "عنوان انگلیسی الزامی است."),
  title_fa: z.string().min(1, "عنوان فارسی الزامی است."),
  slug: z.string().min(1, "اسلاگ الزامی است."),
  description: z.string().min(1, "توضیحات انگلیسی الزامی است."),
  description_fa: z.string().min(1, "توضیحات فارسی الزامی است."),
  image: z.string().url("باید یک URL معتبر باشد."),
  tags: z.string().min(1, "حداقل یک تگ الزامی است."),
  categories: z.array(z.string()).min(1, "حداقل یک دسته‌بندی انتخاب کنید."),
  
  github: z.string().url("لینک گیت‌هاب باید یک URL معتبر باشد.").optional().or(z.literal('')),
  live: z.string().url("لینک پیش‌نمایش زنده باید یک URL معتبر باشد.").optional().or(z.literal('')),
  showcase_simulator: z.boolean(),
  gallery: z.string().optional(),
  showcase_ai_chatbot: z.boolean(),
  aiPromptContext: z.string().optional(),

  about: z.string().min(1, "About content is required."),
  about_fa: z.string().min(1, "محتوای درباره پروژه الزامی است."),
  technical_details: z.string().min(1, "Technical details are required."),
  technical_details_fa: z.string().min(1, "جزئیات فنی الزامی است."),
  challenges: z.string().min(1, "Challenges content is required."),
  challenges_fa: z.string().min(1, "محتوای چالش‌ها الزامی است."),
  solution: z.string().min(1, "Solution content is required."),
  solution_fa: z.string().min(1, "محتوای راه‌حل الزامی است."),
  code_snippet: z.string().min(1, "Code snippet is required."),
  code_snippet_fa: z.string().min(1, "قطعه کد الزامی است."),
});

export async function saveProject(
  formData: z.infer<typeof projectSchema>,
  existingSlug?: string
) {
  const validatedData = projectSchema.parse(formData);
  const data = await getAppData();
  
  const slug = validatedData.slug;
  const isEditing = !!existingSlug;
  
  if (!isEditing && data.projects.some(p => p.slug === slug)) {
      throw new Error("اسلاگ تکراری است. لطفاً یک اسلاگ دیگر انتخاب کنید.");
  }

  const categories_fa = validatedData.categories.map(categoryName => {
    const service = services.find(s => s.title === categoryName);
    return service ? service.title_fa : categoryName;
  });

  const projectData: Project = {
    ...validatedData,
    categories_fa: categories_fa,
    tags: validatedData.tags.split(",").map((t) => t.trim()),
    links: {
      github: validatedData.github,
      live: validatedData.live,
    },
    gallery: validatedData.gallery ? validatedData.gallery.split("\n").map(url => url.trim()).filter(url => url) : [],
  };

  if (isEditing) {
    const index = data.projects.findIndex(p => p.slug === existingSlug);
    if (index !== -1) {
      data.projects[index] = projectData;
    } else {
        // This case should ideally not happen if UI is correct
        data.projects.push(projectData);
    }
  } else {
    data.projects.push(projectData);
  }

  await saveAppData(data);
}

export async function deleteProject(slug: string): Promise<void> {
    const data = await getAppData();
    data.projects = data.projects.filter(p => p.slug !== slug);
    await saveAppData(data);
}

// --- Blog Post Actions ---
const blogPostSchema = z.object({
  title_fa: z.string().min(1, "عنوان فارسی الزامی است."),
  content_fa: z.string().min(10, "محتوای فارسی باید حداقل 10 کاراکتر باشد."),
  featured_image: z.string().url({ message: "لطفاً یک URL معتبر برای تصویر شاخص وارد کنید." }).optional().or(z.literal('')),
  
  title: z.string().optional(),
  content: z.string().optional(),
  
  slug: z.string().min(1, "اسلاگ الزامی است."),
  date: z.string().min(1, "تاریخ الزامی است."),
  tags: z.string().min(1, "حداقل یک تگ الزامی است."),
  status: z.enum(['published', 'draft']),

  meta_title_fa: z.string().optional(),
  meta_description_fa: z.string().optional(),
  meta_title_en: z.string().optional(),
  meta_description_en: z.string().optional(),
  og_image: z.string().url({ message: "لطفاً یک URL معتبر برای تصویر OG وارد کنید." }).optional().or(z.literal('')),
});

export async function saveBlogPost(
  formData: z.infer<typeof blogPostSchema>,
  existingSlug?: string
) {
    const validatedData = blogPostSchema.parse(formData);
    const data = await getAppData();
    const slug = validatedData.slug;
    const isEditing = !!existingSlug;

    if (!isEditing && data.blogPosts.some(p => p.slug === slug)) {
        throw new Error("اسلاگ تکراری است. لطفاً یک اسلاگ دیگر انتخاب کنید.");
    }
    
    const blogPostData: Omit<BlogPost, 'description' | 'description_fa'> & { description?: string; description_fa?: string } = {
        ...validatedData,
        title: validatedData.title || validatedData.title_fa,
        content: validatedData.content || validatedData.content_fa,
        tags: validatedData.tags.split(",").map((t) => t.trim()),
    };

    blogPostData.description_fa = validatedData.meta_description_fa || blogPostData.content_fa.substring(0, 150);
    blogPostData.description = validatedData.meta_description_en || (blogPostData.content || '').substring(0, 150);

    if (isEditing) {
        const index = data.blogPosts.findIndex(p => p.slug === existingSlug);
        if (index !== -1) {
            data.blogPosts[index] = blogPostData as BlogPost;
        } else {
            data.blogPosts.push(blogPostData as BlogPost);
        }
    } else {
        data.blogPosts.push(blogPostData as BlogPost);
    }
    
    await saveAppData(data);
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const data = await getAppData();
  data.blogPosts = data.blogPosts.filter(p => p.slug !== slug);
  await saveAppData(data);
}

// --- Site Settings Actions ---
const publicSettingsSchema = z.object({
  en: z.object({ siteName: z.string().min(1), authorName: z.string().min(1), metaTitle: z.string().min(1), metaDescription: z.string().min(1), }),
  fa: z.object({ siteName: z.string().min(1), authorName: z.string().min(1), metaTitle: z.string().min(1), metaDescription: z.string().min(1), }),
  seo: z.object({ siteURL: z.string().url(), metaKeywords: z.string().optional(), twitterUsername: z.string().optional(), ogImage: z.string().url().optional().or(z.literal('')), }),
  socials: z.object({ email: z.string().email(), github: z.string().url(), telegram: z.string().url(), }),
});

export async function saveSiteSettings(formData: z.infer<typeof publicSettingsSchema>) {
    const validatedData = publicSettingsSchema.parse(formData);
    const data = await getAppData();
    data.siteSettings = validatedData;
    await saveAppData(data);
}

const credentialsSchema = z.object({
    adminEmail: z.string().email("Please enter a valid admin email."),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
    integrations: z.object({
        geminiApiKey: z.string().optional(),
    })
}).refine(data => {
    if (data.newPassword) { return data.newPassword === data.confirmNewPassword; }
    return true;
}, { message: "رمز عبور جدید و تکرار آن باید یکسان باشند.", path: ["confirmNewPassword"], });


export async function saveCredentials(formData: z.infer<typeof credentialsSchema>) {
    const validatedData = credentialsSchema.parse(formData);
    const currentCredentials = await getCredentials();

    const newCredentials: Partial<Credentials> = {
        adminEmail: validatedData.adminEmail,
        integrations: validatedData.integrations
    };

    if (validatedData.newPassword) {
        if (!validatedData.currentPassword) { throw new Error("برای تغییر رمز عبور، باید رمز عبور فعلی خود را وارد کنید."); }
        const inputCurrentPasswordHash = Buffer.from(validatedData.currentPassword).toString('base64');
        if (inputCurrentPasswordHash !== currentCredentials.adminPasswordHash) { throw new Error("رمز عبور فعلی نادرست است."); }
        newCredentials.adminPasswordHash = Buffer.from(validatedData.newPassword).toString('base64');
    }
    
    // Create a new object with all credentials, merging old and new
    const finalCredentials: Credentials = {
        adminEmail: newCredentials.adminEmail || currentCredentials.adminEmail,
        adminPasswordHash: newCredentials.adminPasswordHash || currentCredentials.adminPasswordHash,
        integrations: newCredentials.integrations || currentCredentials.integrations,
    };

    await saveCredentialsData(finalCredentials);
    revalidatePath("/admin/settings");
}
