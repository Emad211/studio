import { BrainCircuit, Book, Database, Code, Activity, Bot, Languages, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
  };
}

export const projects: Project[] = [
  {
    title: "AI-Powered E-commerce Platform",
    slug: "ai-ecommerce-platform",
    description: "A full-featured e-commerce platform using AI for personalized recommendations and a complete admin dashboard.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "React", "TypeScript", "Python", "TensorFlow", "PostgreSQL"],
    links: {
      github: "https://github.com/Emad211",
      live: "#",
    },
  },
  {
    title: "Intelligent Task Management App",
    slug: "intelligent-task-app",
    description: "A collaborative task management tool with AI-driven task prioritization and real-time updates.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "Firebase", "Python", "Flask", "Scikit-learn"],
    links: {
      github: "https://github.com/Emad211",
      live: "#",
    },
  },
  {
    title: "AI Portfolio Website",
    slug: "ai-portfolio-website",
    description: "A personal portfolio to showcase AI projects and skills, built with a focus on performance and aesthetics.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    links: {
      github: "https://github.com/Emad211",
      live: "#",
    },
  },
  {
    title: "Deep Learning Weather Forecaster",
    slug: "dl-weather-app",
    description: "A weather application that uses deep learning models to provide highly accurate, long-term weather forecasts.",
    image: "https://placehold.co/600x400.png",
    tags: ["Python", "TensorFlow", "Keras", "Flask"],
    links: {
      github: "https://github.com/Emad211",
      live: "#",
    },
  },
];

export const allTags = [...new Set(projects.flatMap(p => p.tags))].sort();


export const skillGraph = {
  nodes: [
    { id: 'python', name: 'Python', category: 'Language' },
    { id: 'r', name: 'R', category: 'Language' },
    { id: 'matlab', name: 'MATLAB', category: 'Language' },
    
    { id: 'deep-learning', name: 'Deep Learning', category: 'AI/ML' },
    { id: 'gen-ai', name: 'Generative AI', category: 'AI/ML' },
    { id: 'computer-vision', name: 'Computer Vision', category: 'AI/ML' },
    { id: 'agent-dev', name: 'Agent Development', category: 'AI/ML' },
    { id: 'nlp', name: 'NLP', category: 'AI/ML' },
    { id: 'neural-networks', name: 'Neural Networks', category: 'AI/ML' },

    { id: 'tensorflow', name: 'TensorFlow', category: 'AI Framework' },
    { id: 'pytorch', name: 'PyTorch', category: 'AI Framework' },
    { id: 'scikit-learn', name: 'Scikit-learn', category: 'AI Framework' },
    { id: 'opencv', name: 'OpenCV', category: 'AI Framework' },
    { id: 'langchain', name: 'LangChain', category: 'AI Framework' },
    { id: 'autogen', name: 'AutoGen', category: 'AI Framework' },
    
    { id: 'pandas', name: 'Pandas', category: 'Data Science' },
    { id: 'numpy', name: 'NumPy', category: 'Data Science' },
    { id: 'statistics', name: 'Statistics', category: 'Data Science' },
    { id: 'matplotlib', name: 'Matplotlib', category: 'Data Science' },
    { id: 'seaborn', name: 'Seaborn', category: 'Data Science' },
    { id: 'plotly', name: 'Plotly', category: 'Data Science' },
    
    { id: 'research', name: 'Research Methods', category: 'Research' },
    { id: 'latex', name: 'LaTeX', category: 'Research' },
    { id: 'academic-writing', name: 'Academic Writing', category: 'Research' },
    { id: 'spss', name: 'SPSS', category: 'Research' },

    { id: 'html', name: 'HTML5', category: 'Web Dev' },
    { id: 'css', name: 'CSS3', category: 'Web Dev' },
    { id: 'react', name: 'React', category: 'Web Dev' },
    { id: 'nodejs', name: 'Node.js', category: 'Web Dev' },
    { id: 'flask', name: 'Flask', category: 'Web Dev' },
    { id: 'bootstrap', name: 'Bootstrap', category: 'Web Dev' },
    
    { id: 'sql', name: 'SQL', category: 'Database' },
    { id: 'postgres', name: 'PostgreSQL', category: 'Database' },
    { id: 'mysql', name: 'MySQL', category: 'Database' },
    { id: 'mongodb', name: 'MongoDB', category: 'Database' },
    
    { id: 'git', name: 'Git', category: 'Tools' },
    { id: 'github', name: 'GitHub', category: 'Tools' },
    { id: 'docker', name: 'Docker', category: 'Tools' },
    { id: 'terminal', name: 'Terminal', category: 'Tools' },
  ],
  links: [
    // Python ecosystem
    { source: 'python', target: 'deep-learning' },
    { source: 'python', target: 'tensorflow' },
    { source: 'python', target: 'pytorch' },
    { source: 'python', target: 'scikit-learn' },
    { source: 'python', target: 'pandas' },
    { source: 'python', target: 'numpy' },
    { source: 'python', target: 'flask' },
    { source: 'python', target: 'opencv' },
    { source: 'python', target: 'langchain' },
    
    // AI/ML core
    { source: 'deep-learning', target: 'neural-networks' },
    { source: 'deep-learning', target: 'tensorflow' },
    { source: 'deep-learning', target: 'pytorch' },
    { source: 'gen-ai', target: 'deep-learning' },
    { source: 'gen-ai', target: 'agent-dev' },
    { source: 'gen-ai', target: 'langchain' },
    { source: 'agent-dev', target: 'autogen' },
    { source: 'agent-dev', target: 'langchain' },
    { source: 'nlp', target: 'deep-learning' },
    { source: 'nlp', target: 'langchain' },
    { source: 'computer-vision', target: 'deep-learning' },
    { source: 'computer-vision', target: 'opencv' },
    { source: 'neural-networks', target: 'tensorflow' },
    { source: 'neural-networks', target: 'pytorch' },

    // Data Science
    { source: 'pandas', target: 'numpy' },
    { source: 'pandas', target: 'scikit-learn' },
    { source: 'statistics', target: 'scikit-learn' },
    { source: 'statistics', target: 'r' },
    { source: 'statistics', target: 'spss' },
    { source: 'matplotlib', target: 'pandas' },
    { source: 'seaborn', target: 'matplotlib' },
    { source: 'plotly', target: 'pandas' },
    
    // Research
    { source: 'research', target: 'academic-writing' },
    { source: 'research', target: 'statistics' },
    { source: 'latex', target: 'academic-writing' },
    
    // Web Development
    { source: 'html', target: 'css' },
    { source: 'css', target: 'bootstrap' },
    { source: 'react', target: 'html' },
    { source: 'react', target: 'nodejs' },
    { source: 'flask', target: 'sql' },
    { source: 'nodejs', target: 'sql' },
    
    // Databases
    { source: 'sql', target: 'postgres' },
    { source: 'sql', target: 'mysql' },
    { source: 'nodejs', target: 'mongodb' },
    
    // Tools
    { source: 'git', target: 'github' },
    { source: 'docker', target: 'flask' },
    { source: 'docker', target: 'nodejs' },
    { source: 'terminal', target: 'git' },
  ],
};


interface Service {
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

export const blogPosts = [
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
]

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
]
