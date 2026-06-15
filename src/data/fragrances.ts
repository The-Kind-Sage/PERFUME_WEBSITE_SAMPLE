export interface Fragrance {
  id: string;
  number: string;
  name: string;
  tagline: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  mood: string[];
  season: string;
  intensity: number; // 1-5
  sillage: number; // 1-5
  longevity: number; // 1-5
  price: {
    "30ml": number;
    "50ml": number;
    "100ml": number;
  };
  bottleAccent: string;
  color: string;
  description: string;
  story: string;
  image: string;
  perfumer: string;
}

export const fragrances: Fragrance[] = [
  {
    id: "lumiere-rose",
    number: "01",
    name: "LUMIÈRE ROSE",
    tagline: "The one that starts like sunrise.",
    notes: {
      top: ["Bulgarian Rose", "White Peach"],
      heart: ["Orris Root", "White Jasmine"],
      base: ["Sandalwood", "Warm Musk"],
    },
    mood: ["Joyful", "Romantic", "Feminine"],
    season: "Spring",
    intensity: 3,
    sillage: 4,
    longevity: 4,
    price: { "30ml": 85, "50ml": 120, "100ml": 185 },
    bottleAccent: "Blush Pink",
    color: "#F2D4C8",
    description:
      "It begins with the kind of morning you only remember in fragments. The light through linen curtains. Coffee not yet brewed. The world not yet complicated.",
    story:
      "Lumière Rose opens with Bulgarian rose and white peach — a greeting so warm it feels like an embrace. As it blooms, orris root emerges, adding depth and quiet authority. On your skin, hours later: a whisper of sandalwood and musk. Still there. Still luminous. Still yours.",
    image: "/images/bottle-lumiere-rose.jpg",
    perfumer: "Camille Durand",
  },
  {
    id: "velvet-noir",
    number: "02",
    name: "VELVET NOIR",
    tagline: "The one you wear when you want to be remembered.",
    notes: {
      top: ["Black Pepper", "Saffron"],
      heart: ["Black Orchid", "Oud"],
      base: ["Amber Resin", "Vanilla", "Smoked Incense"],
    },
    mood: ["Mysterious", "Seductive", "Confident"],
    season: "Winter",
    intensity: 5,
    sillage: 5,
    longevity: 5,
    price: { "30ml": 95, "50ml": 135, "100ml": 210 },
    bottleAccent: "Deep Obsidian",
    color: "#2D1B2E",
    description:
      "The room goes quiet when you enter. Not because you demanded it. Because some presences simply rearrange the air.",
    story:
      "Velvet Noir is for the woman who knows that mystery is not absence — it is invitation. Oud and black orchid create a dark, velvety heart, while amber resin lingers for hours, turning every head you leave behind.",
    image: "/images/bottle-velvet-noir.jpg",
    perfumer: "Jean-Pierre Moreau",
  },
  {
    id: "soir-de-soie",
    number: "03",
    name: "SOIR DE SOIE",
    tagline: "The one that feels like silk on your skin.",
    notes: {
      top: ["Bergamot", "Almond Blossom"],
      heart: ["White Musk", "Vanilla Iris"],
      base: ["Sandalwood", "Cashmere Wood", "Tonka Bean"],
    },
    mood: ["Comforting", "Intimate", "Warm"],
    season: "Year-round",
    intensity: 2,
    sillage: 3,
    longevity: 3,
    price: { "30ml": 80, "50ml": 115, "100ml": 175 },
    bottleAccent: "Champagne Gold",
    color: "#C9A96E",
    description:
      "There is a kind of beauty that doesn't announce itself. It simply surrounds you, like cashmere in candlelight.",
    story:
      "Soir de Soie was composed for the woman who finds her deepest luxury in quiet moments. White musk and vanilla iris create a skin-scent that feels like being wrapped in something infinitely soft. The kind of fragrance someone leans in to find.",
    image: "/images/bottle-soir-soie.jpg",
    perfumer: "Isabelle Vaugnier",
  },
  {
    id: "jardin-sauvage",
    number: "04",
    name: "JARDIN SAUVAGE",
    tagline: "The one that smells like freedom.",
    notes: {
      top: ["Neroli", "Green Fig Leaf"],
      heart: ["Vetiver", "Jasmine Sambac"],
      base: ["Oakmoss", "Cedar", "White Amber"],
    },
    mood: ["Wild", "Independent", "Earthy"],
    season: "Summer",
    intensity: 3,
    sillage: 4,
    longevity: 4,
    price: { "30ml": 85, "50ml": 120, "100ml": 185 },
    bottleAccent: "Forest Green",
    color: "#4A6741",
    description:
      "She does not follow paths. She makes them. And she leaves the scent of green things growing in her wake.",
    story:
      "Jardin Sauvage captures the exact moment when sun-warmed fig leaf meets cool vetiver. It is untamed elegance — the fragrance of a woman who belongs nowhere and everywhere at once.",
    image: "/images/bottle-lumiere-rose.jpg",
    perfumer: "Marco Bellini",
  },
  {
    id: "minuit-mystere",
    number: "05",
    name: "MINUIT MYSTÈRE",
    tagline: "The one that holds secrets.",
    notes: {
      top: ["Plum", "Pink Pepper"],
      heart: ["Midnight Jasmine", "Patchouli"],
      base: ["Dark Chocolate", "Myrrh", "Leather"],
    },
    mood: ["Mysterious", "Bold", "Intense"],
    season: "Autumn",
    intensity: 4,
    sillage: 4,
    longevity: 5,
    price: { "30ml": 90, "50ml": 130, "100ml": 200 },
    bottleAccent: "Midnight Plum",
    color: "#6B3F5E",
    description:
      "Midnight is not an ending. It is a threshold. And on the other side, everything is possible.",
    story:
      "Minuit Mystère was composed for the hours when the world sleeps and the self awakens. Plum and pink pepper open with unexpected sweetness, then deepen into midnight jasmine and dark chocolate — a fragrance that transforms as the night unfolds.",
    image: "/images/bottle-velvet-noir.jpg",
    perfumer: "Camille Durand",
  },
  {
    id: "etoile-doree",
    number: "06",
    name: "ÉTOILE DORÉE",
    tagline: "The one that catches the light.",
    notes: {
      top: ["Mandarin", "Pink Grapefruit", "Champagne"],
      heart: ["Orange Blossom", "Honey", "Ylang-Ylang"],
      base: ["Benzoin", "Golden Amber", "White Cedar"],
    },
    mood: ["Radiant", "Joyful", "Golden"],
    season: "Summer",
    intensity: 3,
    sillage: 4,
    longevity: 4,
    price: { "30ml": 85, "50ml": 120, "100ml": 185 },
    bottleAccent: "Warm Gold",
    color: "#C9A96E",
    description:
      "Some women don't walk into rooms. They arrive. And the light seems to find them, every time.",
    story:
      "Étoile Dorée is champagne in fragrance form. Mandarin and orange blossom create an effervescent opening that settles into golden amber — a scent that feels like golden hour, captured and held.",
    image: "/images/bottle-soir-soie.jpg",
    perfumer: "Isabelle Vaugnier",
  },
];

export const allFragrances: Fragrance[] = [
  ...fragrances,
  {
    id: "noir-et-blanc",
    number: "07",
    name: "NOIR ET BLANC",
    tagline: "The one that defies category.",
    notes: {
      top: ["Ice accord", "Peppermint"],
      heart: ["White Tea", "Lily of the Valley"],
      base: ["White Musk", "Sandalwood", "Clean Linen"],
    },
    mood: ["Minimalist", "Refined", "Modern"],
    season: "Year-round",
    intensity: 2,
    sillage: 2,
    longevity: 3,
    price: { "30ml": 80, "50ml": 115, "100ml": 175 },
    bottleAccent: "Pure White",
    color: "#F5F0EB",
    description: "Less is not absence. Less is everything, chosen with intention.",
    story: "Noir et Blanc strips perfumery to its essence. White tea and clean linen create a fragrance that smells like fresh beginnings and quiet confidence.",
    image: "/images/bottle-soir-soie.jpg",
    perfumer: "Marco Bellini",
  },
  {
    id: "rose-eternelle",
    number: "08",
    name: "ROSE ÉTERNELLE",
    tagline: "The one that never fades.",
    notes: {
      top: ["Damask Rose", "Geranium"],
      heart: ["Rose Absolute", "Peony", "Lychee"],
      base: ["Ambergris", "White Musk", "Vetiver"],
    },
    mood: ["Romantic", "Timeless", "Elegant"],
    season: "Spring",
    intensity: 3,
    sillage: 4,
    longevity: 5,
    price: { "30ml": 90, "50ml": 130, "100ml": 200 },
    bottleAccent: "Dusty Rose",
    color: "#C4808A",
    description: "Some roses bloom once and are gone. This one stays, unfolding forever.",
    story: "Rose Éternelle is not a single rose — it is every rose you have ever loved, layered into one eternal moment. Damask rose and peony create a heart that never wilts.",
    image: "/images/bottle-lumiere-rose.jpg",
    perfumer: "Camille Durand",
  },
  {
    id: "ambre-sacre",
    number: "09",
    name: "AMBRE SACRÉ",
    tagline: "The one that feels like prayer.",
    notes: {
      top: ["Bergamot", "Cardamom", "Cinnamon"],
      heart: ["Amber", "Labdanum", "Myrrh"],
      base: ["Vanilla", "Sandalwood", "Tonka Bean", "Oud"],
    },
    mood: ["Spiritual", "Warm", "Sacred"],
    season: "Winter",
    intensity: 4,
    sillage: 5,
    longevity: 5,
    price: { "30ml": 95, "50ml": 140, "100ml": 215 },
    bottleAccent: "Burnished Copper",
    color: "#A0522D",
    description: "There are scents that make you close your eyes. This is one of them.",
    story: "Ambre Sacré is the fragrance of ancient temples and whispered intentions. Amber and myrrh create a sacred warmth that feels like being held by something larger than yourself.",
    image: "/images/bottle-velvet-noir.jpg",
    perfumer: "Jean-Pierre Moreau",
  },
  {
    id: "fleur-de-mer",
    number: "10",
    name: "FLEUR DE MER",
    tagline: "The one that carries the sea.",
    notes: {
      top: ["Sea Salt", "Citrus", "Marine Accord"],
      heart: ["Seaweed", "Water Lily", "Coconut"],
      base: ["Driftwood", "Ambergris", "White Musk"],
    },
    mood: ["Fresh", "Free", "Airy"],
    season: "Summer",
    intensity: 2,
    sillage: 3,
    longevity: 3,
    price: { "30ml": 80, "50ml": 115, "100ml": 175 },
    bottleAccent: "Seafoam",
    color: "#B8D4D1",
    description: "Not every ocean is made of water. Some are made of memory.",
    story: "Fleur de Mer captures the exact moment when salt air meets warm skin. It is the fragrance of barefoot walks, infinite horizons, and the courage to begin again.",
    image: "/images/bottle-soir-soie.jpg",
    perfumer: "Marco Bellini",
  },
  {
    id: "velours-blanc",
    number: "11",
    name: "VELOURS BLANC",
    tagline: "The one that feels like being held.",
    notes: {
      top: ["Rice Milk", "White Pepper"],
      heart: ["White Lily", "Almond", "Heliotrope"],
      base: ["Vanilla", "Sandalwood", "White Musk", "Powder"],
    },
    mood: ["Soft", "Comforting", "Gentle"],
    season: "Autumn",
    intensity: 2,
    sillage: 2,
    longevity: 3,
    price: { "30ml": 80, "50ml": 115, "100ml": 175 },
    bottleAccent: "Soft Cream",
    color: "#EDE0C8",
    description: "Some fragrances are worn. This one is inhabited.",
    story: "Velours Blanc is cashmere in scent form. Rice milk and white lily create a powdery softness that feels like the most comforting embrace — the one you didn't know you needed.",
    image: "/images/bottle-soir-soie.jpg",
    perfumer: "Isabelle Vaugnier",
  },
  {
    id: "feu-de-bois",
    number: "12",
    name: "FEU DE BOIS",
    tagline: "The one that warms from within.",
    notes: {
      top: ["Smoked Birch", "Cinnamon Bark"],
      heart: ["Burning Wood", "Guaiac Wood", "Leather"],
      base: ["Tobacco", "Vanilla", "Amber", "Musk"],
    },
    mood: ["Warm", "Cozy", "Intimate"],
    season: "Winter",
    intensity: 4,
    sillage: 4,
    longevity: 5,
    price: { "30ml": 90, "50ml": 130, "100ml": 200 },
    bottleAccent: "Smoked Ember",
    color: "#5C3A2A",
    description: "There is a fire that needs no wood. It lives in the spaces between memory and desire.",
    story: "Feu de Bois is the fragrance of being exactly where you want to be. Smoked birch and burning wood create an amber warmth that feels like the perfect evening, every evening.",
    image: "/images/bottle-velvet-noir.jpg",
    perfumer: "Jean-Pierre Moreau",
  },
];

export const testimonials = [
  {
    id: 1,
    text: "Lumière Rose is the first perfume that has ever made me cry. I opened the bottle on a Tuesday morning and suddenly I was 19 again, standing in my grandmother's garden. I didn't know a perfume could do that.",
    author: "Isabelle M.",
    location: "Paris, France",
    fragrance: "Lumière Rose",
  },
  {
    id: 2,
    text: "Velvet Noir doesn't just make an entrance. It makes the room rearrange itself around you. I've never felt more like myself than when I'm wearing it.",
    author: "Sarah K.",
    location: "New York, USA",
    fragrance: "Velvet Noir",
  },
  {
    id: 3,
    text: "Soir de Soie feels like the answer to a question I didn't know I was asking. It's not perfume. It's a permission slip to be soft.",
    author: "Yuki T.",
    location: "Tokyo, Japan",
    fragrance: "Soir de Soie",
  },
  {
    id: 4,
    text: "My husband says he can find me in a crowd now. Not by sight — by scent. Minuit Mystère has become my signature, and I have never felt more seen.",
    author: "Amara O.",
    location: "Dubai, UAE",
    fragrance: "Minuit Mystère",
  },
];

export const pressQuotes = [
  { quote: "VELURA is what luxury perfumery has been missing.", source: "Vogue" },
  { quote: "A debut that rivals the great French maisons.", source: "Harper's Bazaar" },
  { quote: "The most beautiful bottle of the year.", source: "ELLE" },
];

export const journalPosts = [
  {
    id: 1,
    title: "How to Layer Fragrances Like a Perfumer",
    excerpt: "The secret isn't mixing — it's composing. Our head perfumer shares the art of creating your own signature blend.",
    category: "Fragrance Education",
    date: "May 15, 2024",
    image: "/images/lifestyle-spritz.jpg",
  },
  {
    id: 2,
    title: "The Story of Bulgarian Rose",
    excerpt: "Before it reaches your skin, a Bulgarian rose travels through dawn, dew, and decades of tradition. This is its journey.",
    category: "The Ingredients",
    date: "April 28, 2024",
    image: "/images/atelier.jpg",
  },
  {
    id: 3,
    title: "A Day in Our Paris Atelier",
    excerpt: "Step inside the atelier where every VELURA fragrance is born. From raw materials to the final bottle — witness the craft.",
    category: "Behind The Scenes",
    date: "March 12, 2024",
    image: "/images/hero-main.jpg",
  },
];
