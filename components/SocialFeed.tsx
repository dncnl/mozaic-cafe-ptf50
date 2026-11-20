import ImagePlaceholder from "./ImagePlaceholder";
import SocialButton from "./SocialButton";
import { socialPosts } from "@/lib/mockData";
import { SOCIAL_HANDLE, SOCIAL_LINKS } from "@/lib/social";

/**
 * Every entry in socialPosts is still scaffolding: no image, no caption, and
 * an href pointing at the profile root rather than an actual post. Rendering
 * them produces a grid that *looks* like a live feed but links nowhere real,
 * so the wall stays hidden until genuine posts are supplied — the same rule
 * ReviewMarquee applies to placeholder reviews.
 *
 * Instagram and Facebook block anonymous scraping, so these can only ever be
 * filled in by hand. See CLAUDE.md hard rules.
 */
function hasRealPosts() {
  return socialPosts.some((post) => Boolean(post.image_url));
}

export default function SocialFeed({ variant = "full" }: { variant?: "full" | "wall" }) {
  const showWall = hasRealPosts();
  // "wall" = just the post grid (the homepage bento carries its own follow
  // buttons), and nothing at all until a real post exists.
  if (variant === "wall" && !showWall) return null;

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      {variant === "full" && (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
        <SocialButton platform="facebook" href={SOCIAL_LINKS.facebook} handle={SOCIAL_HANDLE} variant="tile" />
        <SocialButton platform="instagram" href={SOCIAL_LINKS.instagram} handle={SOCIAL_HANDLE} variant="tile" />
        <SocialButton platform="tiktok" href={SOCIAL_LINKS.tiktok} handle={SOCIAL_HANDLE} variant="tile" />
      </div>
      )}

      {showWall && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">
          {socialPosts
            .filter((post) => Boolean(post.image_url))
            .map((post) => (
              <a
                key={post.id}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="moz-lift group relative rounded-moz-sm"
              >
                <ImagePlaceholder
                  src={post.image_url}
                  alt={post.caption || `mozaic on ${post.platform}`}
                  label="mozaic"
                  aspectRatio="aspect-square"
                  variant="brand"
                />
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
