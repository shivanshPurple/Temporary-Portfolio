export interface Media {
  type: "image" | "video";
  src: string;
  poster?: string; // Added: Optional thumbnail image path for video previews
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
