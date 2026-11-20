import type { MenuItem, Review, SocialPost } from "./types";

// Real posts, not yet retrievable automatically (Instagram/Facebook/TikTok
// block anonymous scraping of post content). Drop screenshots into
// /public/images/social and fill in the real caption + post URL below —
// SocialFeed falls back to a branded placeholder tile until you do.
export const socialPosts: SocialPost[] = [
  { id: "post-1", platform: "instagram", href: "https://www.instagram.com/mozaic.cbk", caption: "", image_url: null },
  { id: "post-2", platform: "instagram", href: "https://www.instagram.com/mozaic.cbk", caption: "", image_url: null },
  { id: "post-3", platform: "instagram", href: "https://www.instagram.com/mozaic.cbk", caption: "", image_url: null },
  { id: "post-4", platform: "instagram", href: "https://www.instagram.com/mozaic.cbk", caption: "", image_url: null },
];

// Real reviews, transcribed by hand from mozaic's Google Maps listing
// (https://maps.app.goo.gl/hgtcJ11VabbjQv486) in Aug 2026. Copied verbatim —
// including original typos — because nothing on this strip should be authored
// by us. `rating` is the reviewer's OVERALL star rating, not their per-category
// Food/Service/Atmosphere sub-scores (several gave a 4 in one category while
// still leaving 5 stars overall). `date` is Google's own relative wording, so
// these drift stale — re-read the listing if they start reading oddly.
// photo_url stays null: the avatars on Google are hotlinked from their CDN, so
// ReviewMarquee's initials fallback is used instead of embedding those URLs.
// Do not scrape or fabricate content — see CLAUDE.md hard rules.
export const reviews: Review[] = [
  {
    id: "review-1",
    name: "John Michael San Diego",
    rating: 5,
    text: "A new go-to hangout spot in the city that's open until midnight! Perfect for those who want to sit back and catch up with friends over a wide variety of coffee and alcoholic beverages. They also offer a range of food options, whether you're sharing with friends or dining solo. Try out their boneless chicken — we loved it during our visit!\n\nThey also have this unique concept (at least in the area) of writing a letter to your future self, which is a fun activity to do with friends. For only PHP 70, you receive a postcard, an envelope, stickers, and some wax to seal your letter. They keep your letter in the cafe until the date you wish to open it. It's something to try out and look forward to on your visit!",
    date: "a year ago",
    photo_url: null,
  },
  {
    id: "review-2",
    name: "Clark",
    rating: 5,
    text: "This is already my 3rd time visiting this cafe and I still enjoy coming back. The ambience is nice and relaxing, the staff are friendly and approachable, and the food and drinks are good. I also like that it's pet-friendly, staff's even played with my baby and very convenient since there's a car wash beside it. Definitely one of those places I don't mind visiting again and again.",
    date: "4 months ago",
    photo_url: null,
  },
  {
    id: "review-3",
    name: "Wilson Concepcion",
    rating: 5,
    text: "The food and drinks are really good, and what makes it even better is the board and card games you can play while waiting or eating. It's such a fun combo, perfect for barkadas who just want to hang out and chill.",
    date: "8 months ago",
    photo_url: null,
  },
  {
    id: "review-4",
    name: "Juan Miguel Magdangal",
    rating: 5,
    text: "An unassuming place with really good food and ambiance. They have a couple of games and is right beside car wash places.",
    date: "a year ago",
    photo_url: null,
  },
  {
    id: "review-5",
    name: "Jed R",
    rating: 5,
    text: "The service owner was super friendly and welcoming. The place had a cool and cozy vibe, and the lighting was great for taking Instagram-worthy photos.",
    date: "a year ago",
    photo_url: null,
  },
  {
    id: "review-6",
    name: "Richardson Guevarra",
    rating: 5,
    text: "It was a good ecperience. Kudos sa staff that was there 08/04/2026. Although the food could be better the customer service was superb..",
    date: "3 weeks ago",
    photo_url: null,
  },
  {
    // Left in Filipino on Google; the text below is Google's own English
    // translation as displayed on the listing, not one we produced.
    id: "review-7",
    name: "Ralph Bryan Cabrera",
    rating: 5,
    text: "The place is perfect. The food is delicious!",
    date: "a year ago",
    photo_url: null,
  },
];

// Transcribed from mozaic's own published menu (linktr.ee/moz.cbk -> Menu).
// image_url stays null until real product photos are dropped into
// /public/images/menu — ImagePlaceholder falls back to the item name.
export const menuItems: MenuItem[] = [
  // --- Cafe: Coffee ---
  { id: "cafe-americano", name: "Americano", description: "", price: 100, category: "cafe", group: "Coffee", image_url: null, is_available: true },
  { id: "cafe-latte", name: "Latte", description: "", price: 120, category: "cafe", group: "Coffee", image_url: null, is_available: true },
  { id: "cafe-vanilla-latte", name: "Vanilla Latte", description: "", price: 150, category: "cafe", group: "Coffee", image_url: null, is_available: true },
  { id: "cafe-white-mocha", name: "White Mocha", description: "", price: 150, category: "cafe", group: "Coffee", image_url: null, is_available: true },
  { id: "cafe-caramel-latte", name: "Caramel Latte", description: "", price: 150, category: "cafe", group: "Coffee", image_url: null, is_available: true },
  { id: "cafe-spanish-latte", name: "Spanish Latte", description: "", price: 150, category: "cafe", group: "Coffee", image_url: null, is_available: true },

  // --- Cafe: Matcha ---
  { id: "cafe-pink-cloud-matcha", name: "Pink Cloud Matcha", description: "", price: 180, category: "cafe", group: "Matcha", image_url: null, is_available: true },
  { id: "cafe-matcha-latte", name: "Matcha Latte", description: "", price: 150, category: "cafe", group: "Matcha", image_url: null, is_available: true },
  { id: "cafe-matcha-dalgona", name: "Matcha Dalgona", description: "", price: 170, category: "cafe", group: "Matcha", image_url: null, is_available: true },
  { id: "cafe-matcha-oat-latte", name: "Matcha Oat Latte", description: "", price: 170, category: "cafe", group: "Matcha", image_url: null, is_available: true },

  // --- Cafe: Moz Signatures ---
  { id: "cafe-cloud-espresso", name: "Cloud Espresso", description: "", price: 180, category: "cafe", group: "Moz Signatures", image_url: null, is_available: true },
  { id: "cafe-dalgona", name: "Dalgona", description: "", price: 170, category: "cafe", group: "Moz Signatures", image_url: null, is_available: true },
  { id: "cafe-dirty-biscoff", name: "Dirty Biscoff", description: "", price: 170, category: "cafe", group: "Moz Signatures", image_url: null, is_available: true },
  { id: "cafe-dirty-nutella", name: "Dirty Nutella", description: "", price: 170, category: "cafe", group: "Moz Signatures", image_url: null, is_available: true },
  { id: "cafe-seasalt-latte", name: "Seasalt Latte", description: "", price: 170, category: "cafe", group: "Moz Signatures", image_url: null, is_available: true },
  { id: "cafe-tiramisu", name: "Tiramisu", description: "", price: 170, category: "cafe", group: "Moz Signatures", image_url: null, is_available: true },

  // --- Cafe: Spritz ---
  { id: "cafe-zesty-blossom", name: "Zesty Blossom", description: "", price: 150, category: "cafe", group: "Spritz", image_url: null, is_available: true },
  { id: "cafe-verdant-splash", name: "Verdant Splash", description: "", price: 150, category: "cafe", group: "Spritz", image_url: null, is_available: true },
  { id: "cafe-curapple-spark", name: "Curapple Spark", description: "", price: 150, category: "cafe", group: "Spritz", image_url: null, is_available: true },

  // --- Cafe: Milk ---
  { id: "cafe-milk-strawberry", name: "Strawberry", description: "", price: 150, category: "cafe", group: "Milk", image_url: null, is_available: true },
  { id: "cafe-milk-mango", name: "Mango", description: "", price: 150, category: "cafe", group: "Milk", image_url: null, is_available: true },
  { id: "cafe-milk-kiwi", name: "Kiwi", description: "", price: 150, category: "cafe", group: "Milk", image_url: null, is_available: true },
  { id: "cafe-milky-biscoff", name: "Milky Biscoff", description: "", price: 150, category: "cafe", group: "Milk", image_url: null, is_available: true },
  { id: "cafe-milky-nutella", name: "Milky Nutella", description: "", price: 150, category: "cafe", group: "Milk", image_url: null, is_available: true },

  // --- Cafe: Frappe ---
  { id: "cafe-mocha-frappe", name: "Mocha Frappe", description: "", price: 170, category: "cafe", group: "Frappe", image_url: null, is_available: true },
  { id: "cafe-caramel-frappe", name: "Caramel Frappe", description: "", price: 170, category: "cafe", group: "Frappe", image_url: null, is_available: true },
  { id: "cafe-hershey-cream", name: "Hershey Cream", description: "", price: 170, category: "cafe", group: "Frappe", image_url: null, is_available: true },
  { id: "cafe-strawberries-cream", name: "Strawberries & Cream", description: "", price: 170, category: "cafe", group: "Frappe", image_url: null, is_available: true },
  { id: "cafe-oreo-cream", name: "Oreo Cream", description: "", price: 170, category: "cafe", group: "Frappe", image_url: null, is_available: true },

  // --- Cafe: Add-ons (modifiers — rendered as a compact price list, not cards) ---
  { id: "cafe-addon-sub-oat", name: "Sub Oat", description: "", price: 35, category: "cafe", group: "Add-ons", image_url: null, is_available: true },
  { id: "cafe-addon-xtra-sauce", name: "Xtra Sauce", description: "", price: 25, category: "cafe", group: "Add-ons", image_url: null, is_available: true },
  { id: "cafe-addon-xtra-drizzle", name: "Xtra Drizzle", description: "", price: 15, category: "cafe", group: "Add-ons", image_url: null, is_available: true },
  { id: "cafe-addon-xtra-spread", name: "Xtra Spread", description: "", price: 30, category: "cafe", group: "Add-ons", image_url: null, is_available: true },
  { id: "cafe-addon-espresso-shot", name: "Espresso Shot", description: "", price: 25, category: "cafe", group: "Add-ons", image_url: null, is_available: true },

  // --- Kitchen: Appetizer ---
  { id: "kitchen-catch-and-crunch", name: "Catch & Crunch", description: "Baby fish fillets and fries served with beer.", price: 240, category: "kitchen", group: "Appetizer", image_url: null, is_available: true },
  { id: "kitchen-cheesy-beefadilla", name: "Cheesy Beefadilla", description: "Tortilla filled with beef & cheesy goodness.", price: 240, category: "kitchen", group: "Appetizer", image_url: null, is_available: true },
  { id: "kitchen-moz-nacho", name: "Moz's Nacho", description: "Nachos piled with cheese and hotdogs.", price: 250, category: "kitchen", group: "Appetizer", image_url: null, is_available: true },
  { id: "kitchen-fries-galore", name: "Fries Galore", description: "Crispy on the outside, soft on the inside.", price: 100, category: "kitchen", group: "Appetizer", image_url: null, is_available: true },
  { id: "kitchen-chili-cheddar-galore", name: "Chili Cheddar Galore", description: "Fries smothered in chili and cheddar sauce.", price: 200, category: "kitchen", group: "Appetizer", image_url: null, is_available: true },

  // --- Kitchen: Mains ---
  { id: "kitchen-beefy-salpicao", name: "Beefy Salpicao", description: "Tender beef strips sauteed in a savory & slightly tangy sauce.", price: 350, category: "kitchen", group: "Mains", image_url: null, is_available: true },
  { id: "kitchen-belly-fusion-salad", name: "Belly Fusion Salad", description: "Grilled pork belly mixed with veggies & greens.", price: 280, category: "kitchen", group: "Mains", image_url: null, is_available: true },
  { id: "kitchen-tomato-braised-beef-stew", name: "Tomato-Braised Beef Stew", description: "Tender beef chunks simmered in a rich tomato sauce.", price: 330, category: "kitchen", group: "Mains", image_url: null, is_available: true },
  { id: "kitchen-parm-crusted-chicken", name: "Parm Crusted Chicken", description: "Grilled chicken with marinara & parmesan cheese.", price: 290, category: "kitchen", group: "Mains", image_url: null, is_available: true },

  // --- Kitchen: Mozaic Samplers ---
  { id: "kitchen-snack-platter-fiesta", name: "Snack Platter Fiesta", description: "A variety of tasty bites in one big sampler plate.", price: 480, category: "kitchen", group: "Mozaic Samplers", image_url: null, is_available: true },
  { id: "kitchen-moz-rib-feast", name: "Moz Rib Feast", description: "Ribs with lasagna, fries and corn on the side.", price: 450, category: "kitchen", group: "Mozaic Samplers", image_url: null, is_available: true },
  { id: "kitchen-steak-it-up-board", name: "Steak It Up Board", description: "Juicy ribeye steak, fries & lasagna served on a board.", price: 595, category: "kitchen", group: "Mozaic Samplers", image_url: null, is_available: true },

  // --- Kitchen: Chicken (choose one flavor: Buffalo, Sweet Hot BBQ, Sriracha Garlic Zing, Garlic Parm Delight, Salted Egg) ---
  { id: "kitchen-wings", name: "Wings (6pcs)", description: "Choose one flavor: Buffalo, Sweet Hot BBQ, Sriracha Garlic Zing, Garlic Parm Delight, or Salted Egg.", price: 240, category: "kitchen", group: "Chicken", image_url: null, is_available: true },
  { id: "kitchen-boneless", name: "Boneless", description: "Choose one flavor: Buffalo, Sweet Hot BBQ, Sriracha Garlic Zing, Garlic Parm Delight, or Salted Egg.", price: 200, category: "kitchen", group: "Chicken", image_url: null, is_available: true },

  // --- Kitchen: Burger (comes with fries) ---
  { id: "kitchen-cheese-bliss-burger", name: "Cheese Bliss Burger", description: "Juicy beef patty topped with cheese sauce, lettuce, tomato & mayo. Comes with fries.", price: 220, category: "kitchen", group: "Burger", image_url: null, is_available: true },
  { id: "kitchen-crispy-chick-n-delight", name: "Crispy Chick N Delight", description: "Crispy fried chicken topped with mayo, lettuce & pickles. Comes with fries.", price: 240, category: "kitchen", group: "Burger", image_url: null, is_available: true },

  // --- Kitchen: Salad ---
  { id: "kitchen-vinaigrette-berry-bliss", name: "Vinaigrette Berry Bliss", description: "Mixed greens, vinaigrette dressing.", price: 240, category: "kitchen", group: "Salad", image_url: null, is_available: true },
  { id: "kitchen-caesar-garden", name: "Caesar & Garden", description: "Greens, chicken, caesar dressing, parmesan cheese.", price: 240, category: "kitchen", group: "Salad", image_url: null, is_available: true },

  // --- Kitchen: Sides ---
  { id: "kitchen-mozaic-rice-fusion", name: "Mozaic Rice Fusion", description: "Savory fried rice with a medley of flavors.", price: 210, category: "kitchen", group: "Sides", image_url: null, is_available: true },
  { id: "kitchen-rice", name: "Rice", description: "", price: 30, category: "kitchen", group: "Sides", image_url: null, is_available: true },

  // --- Kitchen: Pasta ---
  { id: "kitchen-zesty-chicken-florentine", name: "Zesty Chicken Florentine", description: "Pasta tossed with chicken, spinach and creamy Alfredo sauce.", price: 320, category: "kitchen", group: "Pasta", image_url: null, is_available: true },
  { id: "kitchen-ocean-aglio-e-olio", name: "Ocean Aglio e Olio", description: "", price: 320, category: "kitchen", group: "Pasta", image_url: null, is_available: true },
  { id: "kitchen-red-tide-marinara", name: "Red Tide Marinara", description: "Pasta tossed with seafood in a delicious marinara sauce.", price: 310, category: "kitchen", group: "Pasta", image_url: null, is_available: true },
  { id: "kitchen-pesto-chicken-perfection", name: "Pesto Chicken Perfection", description: "Grilled chicken tossed in pesto pasta sauce.", price: 280, category: "kitchen", group: "Pasta", image_url: null, is_available: true },
  { id: "kitchen-stroganoff-twist", name: "Stroganoff Twist", description: "Sauteed beef tossed with a creamy beef stroganoff sauce.", price: 300, category: "kitchen", group: "Pasta", image_url: null, is_available: true },

  // --- Kitchen: Pizza ---
  { id: "kitchen-mozaic-beast", name: "Mozaic Beast", description: "A massive loaded pizza that packs the punch of flavor.", price: 380, category: "kitchen", group: "Pizza", image_url: null, is_available: true },
  { id: "kitchen-quattro-formaggio", name: "Quattro Formaggio", description: "A classic Italian pizza with 4 types of cheese.", price: 350, category: "kitchen", group: "Pizza", image_url: null, is_available: true },
  { id: "kitchen-moz-deep-za", name: "Moz Deep Za", description: "A delightful pizza showcasing the best of the sea.", price: 400, category: "kitchen", group: "Pizza", image_url: null, is_available: true },
  { id: "kitchen-creamy-pesto-delight", name: "Creamy Pesto Delight", description: "A delightful pizza with rich pesto & tender chicken.", price: 360, category: "kitchen", group: "Pizza", image_url: null, is_available: true },

  // --- Kitchen: Rice Meals ---
  { id: "kitchen-katsu-crunch", name: "Katsu Crunch", description: "Crispy breaded chicken with a side of katsu sauce.", price: 220, category: "kitchen", group: "Rice Meals", image_url: null, is_available: true },
  { id: "kitchen-pork-katsu-crunch", name: "Pork Katsu Crunch", description: "Crispy breaded pork with a side of katsu sauce.", price: 240, category: "kitchen", group: "Rice Meals", image_url: null, is_available: true },
  { id: "kitchen-teriyaki-bliss", name: "Teriyaki Bliss", description: "Chicken glazed in sweet teriyaki sauce.", price: 220, category: "kitchen", group: "Rice Meals", image_url: null, is_available: true },
  { id: "kitchen-hickory-glazed-pork-ribs", name: "Hickory-Glazed Pork Ribs", description: "Tender pork ribs glazed in smoky hickory bbq sauce.", price: 280, category: "kitchen", group: "Rice Meals", image_url: null, is_available: true },
  { id: "kitchen-tender-roast-beef", name: "Tender Roast Beef", description: "Tender roast beef with a rich, savory sauce.", price: 295, category: "kitchen", group: "Rice Meals", image_url: null, is_available: true },
  { id: "kitchen-ribeye-steak", name: "Ribeye Steak", description: "Tender broiled ribeye steak served with vegetables.", price: 420, category: "kitchen", group: "Rice Meals", image_url: null, is_available: true },
  { id: "kitchen-boneless-inasal-grill", name: "Boneless Inasal Grill", description: "Filipino-style grilled chicken with a tangy marinade.", price: 220, category: "kitchen", group: "Rice Meals", image_url: null, is_available: true },
  { id: "kitchen-grilled-pork-belly", name: "Grilled Pork Belly", description: "Grilled pork belly with a tangy marinade.", price: 290, category: "kitchen", group: "Rice Meals", image_url: null, is_available: true },

  // --- Kitchen: Other Beverages ---
  { id: "kitchen-coke-coke-zero", name: "Coke / Coke Zero", description: "", price: 65, category: "kitchen", group: "Other Beverages", image_url: null, is_available: true },
  { id: "kitchen-sprite-royal", name: "Sprite / Royal", description: "In can.", price: 65, category: "kitchen", group: "Other Beverages", image_url: null, is_available: true },
  { id: "kitchen-redbull", name: "Redbull", description: "", price: 100, category: "kitchen", group: "Other Beverages", image_url: null, is_available: true },
  { id: "kitchen-mineral-water", name: "Mineral Water", description: "", price: 30, category: "kitchen", group: "Other Beverages", image_url: null, is_available: true },
  { id: "kitchen-pineapple-juice", name: "Pineapple Juice", description: "", price: 60, category: "kitchen", group: "Other Beverages", image_url: null, is_available: true },
  { id: "kitchen-mango-juice", name: "Mango Juice", description: "", price: 80, category: "kitchen", group: "Other Beverages", image_url: null, is_available: true },

  // --- Bar: Beers ---
  { id: "bar-san-mig-light", name: "San Mig Light", description: "", price: 85, category: "bar", group: "Beers", image_url: null, is_available: true },
  { id: "bar-san-mig-apple", name: "San Mig Apple", description: "", price: 85, category: "bar", group: "Beers", image_url: null, is_available: true },
  { id: "bar-pale-pilsen", name: "Pale Pilsen", description: "", price: 85, category: "bar", group: "Beers", image_url: null, is_available: true },
  { id: "bar-stallion", name: "Stallion", description: "", price: 85, category: "bar", group: "Beers", image_url: null, is_available: true },
  { id: "bar-smirnoff", name: "Smirnoff", description: "", price: 90, category: "bar", group: "Beers", image_url: null, is_available: true },

  // --- Bar: Hard-Liquor (price = bottle; shot noted in description where sold by the shot) ---
  { id: "bar-alfonso-light", name: "Alfonso Light", description: "Sold by the bottle only.", price: 550, category: "bar", group: "Hard-Liquor", image_url: null, is_available: true },
  { id: "bar-fundador", name: "Fundador", description: "Sold by the bottle only.", price: 750, category: "bar", group: "Hard-Liquor", image_url: null, is_available: true },
  { id: "bar-jose-cuervo-gold", name: "Jose Cuervo Gold", description: "Bottle ₱1500 · Shot ₱90.", price: 1500, category: "bar", group: "Hard-Liquor", image_url: null, is_available: true },
  { id: "bar-absolut", name: "Absolut", description: "Bottle ₱1300 · Shot ₱70.", price: 1300, category: "bar", group: "Hard-Liquor", image_url: null, is_available: true },
  { id: "bar-jagermeister", name: "Jägermeister", description: "Bottle ₱1500 · Shot ₱80.", price: 1500, category: "bar", group: "Hard-Liquor", image_url: null, is_available: true },
  { id: "bar-jack-daniels", name: "Jack Daniels No.7", description: "Bottle ₱2200 · Shot ₱110.", price: 2200, category: "bar", group: "Hard-Liquor", image_url: null, is_available: true },

  // --- Bar: Moz Cocktails ---
  { id: "bar-jagerbomb", name: "Jägerbomb", description: "Jägermeister, Redbull.", price: 180, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
  { id: "bar-daiquiri", name: "Daiquiri", description: "White rum, lime sugar.", price: 200, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
  { id: "bar-blue-lagoon", name: "Blue Lagoon", description: "Vodka, lemon.", price: 200, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
  { id: "bar-gentlemans-drink", name: "Gentleman's Drink", description: "Gentleman's drink.", price: 200, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
  { id: "bar-long-island", name: "Long Island", description: "Vodka, rum, tequila, lime, coke.", price: 220, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
  { id: "bar-margarita", name: "Margarita", description: "Tequila, lime.", price: 220, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
  { id: "bar-tequila-sunrise", name: "Tequila Sunrise", description: "Tequila, orange, grenadine.", price: 240, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
  { id: "bar-amaretto-sour", name: "Amaretto Sour", description: "Amaretto, lime, eggwhites.", price: 240, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
  { id: "bar-blue-apple-bolt", name: "Blue Apple Bolt", description: "Rum, green apple, curaçao, citrus.", price: 240, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
  { id: "bar-sour-grape-glow", name: "Sour Grape Glow", description: "Vodka, sour grape, lemons.", price: 240, category: "bar", group: "Moz Cocktails", image_url: null, is_available: true },
];
