import { TerminalSquare, Palette, Smartphone, Database, Server, BrainCircuit } from 'lucide-react';
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
    title: "E-commerce Platform",
    slug: "ecommerce-platform",
    description: "A full-featured e-commerce platform with a modern, responsive design and a complete admin dashboard.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    links: {
      github: "#",
      live: "#",
    },
  },
  {
    title: "Task Management App",
    slug: "task-management-app",
    description: "A collaborative task management tool with drag-and-drop functionality and real-time updates.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "Firebase", "Material-UI", "Node.js"],
    links: {
      github: "#",
      live: "#",
    },
  },
  {
    title: "Portfolio Website",
    slug: "portfolio-website",
    description: "A personal portfolio website to showcase projects and skills, built with a focus on performance and aesthetics.",
    image: "https://placehold.co/600x400.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    links: {
      github: "#",
      live: "#",
    },
  },
  {
    title: "Weather App",
    slug: "weather-app",
    description: "A simple weather application that provides real-time weather data for any location.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "API", "CSS"],
    links: {
      github: "#",
      live: "#",
    },
  },
];

export const allTags = [...new Set(projects.flatMap(p => p.tags))].sort();

export const skills = [
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "React", level: 95 },
  { name: "Next.js", level: 92 },
  { name: "Node.js", level: 88 },
  { name: "PostgreSQL", level: 85 },
  { name: "Tailwind CSS", level: 98 },
  { name: "Figma", level: 80 },
  { name: "GraphQL", level: 78 },
  { name: "Docker", level: 75 },
  { name: "Python", level: 82 },
  { name: "Git", level: 94 },
];

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Web Development",
    description: "Creating responsive and high-performance websites with modern technologies.",
    icon: TerminalSquare,
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and visually appealing user interfaces and experiences.",
    icon: Palette,
  },
  {
    title: "Mobile Apps",
    description: "Building cross-platform mobile applications that run smoothly on iOS and Android.",
    icon: Smartphone,
  },
];

export const blogPosts = [
    {
        slug: 'mastering-react-hooks',
        title: 'Mastering React Hooks: A Deep Dive',
        description: 'An in-depth guide to understanding and mastering React Hooks for more efficient and cleaner code.',
        date: '2024-05-15',
        tags: ['React', 'JavaScript', 'Web Development'],
        content: `
## Understanding the Power of Hooks

React Hooks, introduced in React 16.8, revolutionized how we write components. They let you use state and other React features without writing a class. This makes your code more readable, reusable, and easier to test.

### The useState Hook

The most fundamental hook is \`useState\`. It allows you to add state to functional components.

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### The useEffect Hook

The \`useEffect\` hook lets you perform side effects in functional components. It's a close replacement for \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\`.

- **Fetching data**: You can fetch data from an API when the component mounts.
- **Subscribing to events**: Set up event listeners and clean them up when the component unmounts.
- **Manually changing the DOM**: Directly interact with the DOM when needed.

## Custom Hooks for Reusability

One of the most powerful features of Hooks is the ability to create your own. Custom Hooks are a mechanism to reuse stateful logic. For example, you could create a custom hook to handle form inputs or to fetch data.

\`\`\`jsx
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}
\`\`\`

## Conclusion

React Hooks are a powerful tool in any React developer's arsenal. By understanding and using them effectively, you can write more concise, readable, and maintainable code. They encourage a more functional approach to building components, leading to better application architecture.
`
    }
]
