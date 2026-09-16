type WithOptionalImage = {
  image?: string | null;
};

type ProjectLike = WithOptionalImage & {
  slug?: string;
  sector?: string | null;
};

type NewsLike = WithOptionalImage & {
  slug?: string;
  category?: string | null;
};

type ActivityLike = {
  slug?: string;
  title?: string;
};

const PROJECT_IMAGES: Record<string, string> = {
  "mineral-exploration-initiative": "/images/industry.jpg",
  "kinshasa-commercial-hub": "/images/cranes.jpg",
  "mweka-agri-project": "/images/mweka-site-1.jpg",
};

const NEWS_IMAGES: Record<string, string> = {
  "establishment-of-ntz-sprl-and-ksd-sarl": "/images/office.jpg",
  "ksd-sarl-kasai-sud-diamant-launch": "/images/diamond.jpg",
  "building-business-in-drc": "/images/team-working.jpg",
  "terrakili-agricultural-concession-kasai": "/images/mweka-field.jpg",
  "mweka-agri-project-commercial-farming": "/images/mweka-site-2.jpg",
  "terrakili-smallholder-farmer-training-kasai": "/images/mweka-field.jpg",
};

export function projectImage(project?: ProjectLike | null): string {
  if (project?.image) return project.image;
  if (project?.slug && PROJECT_IMAGES[project.slug]) return PROJECT_IMAGES[project.slug];
  const sector = (project?.sector ?? "").toLowerCase();
  if (sector.includes("natural") || sector.includes("resource") || sector.includes("mineral")) {
    return "/images/industry.jpg";
  }
  if (sector.includes("invest") || sector.includes("develop") || sector.includes("commercial")) {
    return "/images/cranes.jpg";
  }
  return "/images/office.jpg";
}

export function newsImage(article?: NewsLike | null): string {
  if (article?.image) return article.image;
  if (article?.slug && NEWS_IMAGES[article.slug]) return NEWS_IMAGES[article.slug];
  const category = (article?.category ?? "").toLowerCase();
  if (category.includes("announcement") || category.includes("company")) {
    return "/images/office.jpg";
  }
  return "/images/team-working.jpg";
}

export function activityImage(activity?: ActivityLike | null): string {
  const slug = activity?.slug ?? "";
  const title = (activity?.title ?? "").toLowerCase();
  if (slug.includes("natural") || title.includes("natural") || title.includes("resource")) {
    return "/images/diamond.jpg";
  }
  if (slug.includes("partner") || title.includes("partner")) {
    return "/images/team.jpg";
  }
  if (slug.includes("invest") || title.includes("invest") || title.includes("development")) {
    return "/images/cranes.jpg";
  }
  if (slug.includes("agriculture") || slug.includes("agri") || title.includes("agriculture") || title.includes("agribusiness")) {
    return "/images/mweka-site-1.jpg";
  }
  if (slug.includes("trading") || title.includes("trading") || title.includes("commerce")) {
    return "/images/business-strategy.jpg";
  }
  return "/images/office.jpg";
}