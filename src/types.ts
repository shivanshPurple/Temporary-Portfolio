export interface Media {
  type: 'image' | 'video';
  src: string;
}

export interface Link {
  text: string;
  url: string;
}

export interface Project {
  category: string;
  title: string;
  technologies: string[];
  duration: string;
  description: string;
  media: Media[];
  links: Link[];
}