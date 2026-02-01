import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'writing', name: 'Writing & SEO', icon: '✍️', description: 'Content creation, blog posts, and optimization.' },
  { id: 'image', name: 'Image Generation', icon: '🎨', description: 'Transform text into stunning visuals and art.' },
  { id: 'video', name: 'Video & Motion', icon: '🎥', description: 'AI video editing, avatars, and animations.' },
  { id: 'coding', name: 'Coding & Dev', icon: '💻', description: 'Code assistance, debugging, and web building.' },
  { id: 'productivity', name: 'Productivity', icon: '⚡', description: 'Meetings, organization, and automation.' },
  { id: 'marketing', name: 'Marketing', icon: '📈', description: 'Social media, ad copy, and campaign tools.' },
  { id: 'audio', name: 'Audio & Music', icon: '🎵', description: 'Voiceovers, music generation, and editing.' },
  { id: 'design', name: 'Design & UI', icon: '✨', description: 'Logo makers, UI generators, and layouts.' },
];

export const APP_NAME = "AI Finder";