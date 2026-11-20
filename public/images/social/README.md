# /public/images/social

Real Instagram/Facebook/TikTok post screenshots for the `SocialFeed`
component's photo wall (`socialPosts` in `lib/mockData.ts`).

Instagram and Facebook block anonymous scraping of post content, so these
can't be fetched automatically — save the images here (e.g.
`/images/social/post-1.jpg`) and fill in the matching entry's `image_url`,
`caption`, and `href` (link to the actual post) in `lib/mockData.ts`.

`SocialFeed`/`ImagePlaceholder` fall back to a branded placeholder tile if an
image is missing — never a broken image icon.
