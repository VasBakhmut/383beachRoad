export const property = {
  streetLine1: "383B Beach Road",
  streetLine2: "Beaumaris",
  fullAddress: "383B Beach Road, Beaumaris",
  tagline: "Four levels of magnificent beachfront living",
  priceLow: "$3,400,000",
  priceHigh: "$3,600,000",
  saleType: "Private Sale",
  inspection: "By appointment only",
};

export const facts = [
  { label: "Bedrooms", value: "4" },
  { label: "Bathrooms", value: "4" },
  { label: "Car spaces", value: "4+" },
  { label: "Internal area", value: "335m²" },
  { label: "Levels", value: "4" },
  { label: "Rooftop terrace", value: "1" },
] as const;

export const heroHighlights = [
  "Lift to all four levels",
  "Rooftop terrace with spa & BBQ",
  "Heated lap pool",
  "Dolomite & Gaggenau kitchen",
  "Port Phillip Bay views",
] as const;

export const livingKitchenCopy = {
  eyebrow: "First Floor",
  heading: "Living, dining & the kitchen",
  paragraphs: [
    "Above, a magnificent living and dining domain is centred around a lavish kitchen of exceptional form and finish. Dolomite surfaces, Gaggenau appliances, an integrated Fisher & Paykel French door fridge/freezer and a walk-in pantry support the space, while a curved breakfast bar, brushed brass tapware and Zip HydroTap bring both beauty and practicality.",
    "A landscape fireplace anchors the living area, while full-height stacker doors open to a broad covered terrace, allowing the space to move easily between indoors and out while taking in views of the bay.",
  ],
  tags: ["Dolomite surfaces", "Gaggenau appliances", "Walk-in pantry", "Zip HydroTap"],
};

export const suitesCopy = {
  eyebrow: "First Floor",
  heading: "Suites & bathrooms",
  paragraphs: [
    "Positioned for privacy at the rear of this level, the primary main suite enjoys tranquil outlooks where surrounding greenery becomes part of the interior. Beautifully crafted cabinetry provides exquisite storage, while the sumptuous ensuite reveals twin vanities and a circular bath, creating an indulgent setting for daily retreat.",
    "The ground level introduces the first of the home's beautifully appointed main suites, with a luxurious ensuite incorporating twin vanities and a tranquil bathing area where a deep soaking bath looks out to the landscape.",
  ],
  tags: ["Twin vanities", "Circular bath", "Custom cabinetry", "Private outlooks"],
};

export const closeCopy = {
  eyebrow: "The Location",
  heading: "Beaumaris, at your doorstep",
  paragraphs: [
    "Architectural clarity and understated elegance shape this magnificent beachfront residence, where sculptural forms, gentle curves and expansive glazing establish a confident contemporary presence.",
    "Ricketts Point and the bay trail sit just footsteps away, while the cafes, restaurants and boutiques of the Concourse, surrounding parklands and zoning for Beaumaris Primary School, Mentone Girls' Secondary College and Beaumaris Secondary College complete this exceptional offering.",
  ],
  highlights: [
    {
      title: "Rooftop terrace",
      body: "Four lift-accessed levels rising to a spa, BBQ zone and sweeping Port Phillip Bay views.",
    },
    {
      title: "Gourmet kitchen",
      body: "Dolomite surfaces, Gaggenau appliances, integrated F&P fridge, walk-in pantry, Zip HydroTap.",
    },
    {
      title: "Garage with turntable",
      body: "Parking for 4+ vehicles with an integrated turntable and three-phase power for EV.",
    },
  ],
};

export const additionalFeatures = [
  "Security alarm & CCTV",
  "Keyless entry",
  "Integrated Sonos audio",
  "Two powder rooms",
  "Full laundry",
  "Zoned reverse-cycle air conditioning",
  "Three-phase power for EV charging",
  "French oak floors throughout",
] as const;

export const agents = [
  {
    name: "Romana Altman",
    agency: "Buxton Sandringham",
    initials: "RA",
  },
  {
    name: "Zoe Duggan",
    agency: "Buxton Sandringham",
    initials: "ZD",
  },
] as const;

export const agencyAddress = "Buxton Sandringham · 11 Bay Road, Sandringham VIC 3191";

export const levels = [
  {
    key: "basement",
    number: "B",
    label: "Basement",
    title: "Basement & Garage",
    description:
      "Parking for four or more vehicles with an integrated turntable for effortless manoeuvring. Three-phase power provision supports future EV charging, while a dedicated ventilation system ensures the space operates with ease.",
    dims: "4 Car Garage · 6.3 × 13.5",
    images: ["/images/garage-turntable.webp", "/images/garage-alt-angle.webp"],
  },
  {
    key: "ground",
    number: "G",
    label: "Ground Floor",
    title: "Ground Floor",
    description:
      "Three ensuite bedrooms with tailored storage, a family lounge and kitchenette opening to the timber deck, and landscaped surrounds around the heated lap pool.",
    dims: "Family 5.6 × 6.6 · Bedrooms from 3.5 × 4.1",
    images: ["/images/ground-lounge.webp", "/images/pool-lap-side.webp", "/images/powder-room.webp"],
  },
  {
    key: "first",
    number: "01",
    label: "First Floor",
    title: "First Floor",
    description:
      "Bay-facing living and dining, a Dolomite and Gaggenau kitchen, a covered terrace, and a private primary suite with circular bath ensuite positioned for privacy at the rear of the level.",
    dims: "Master 4.7 × 7.5 · Living/Dining 5.1 × 9.9",
    images: [
      "/images/living-bay-view.webp",
      "/images/kitchen-island.webp",
      "/images/suite-bedroom-two.webp",
      "/images/ensuite-arch-mirror.webp",
    ],
  },
  {
    key: "rooftop",
    number: "R",
    label: "Rooftop",
    title: "Rooftop Terrace",
    description:
      "An open-air entertaining level with spa, barbecue zone and sweeping Port Phillip Bay views from sunrise through sunset.",
    dims: "Terrace 3.0 × 4.6 · Spa 3.0 × 4.0",
    images: ["/images/rooftop-terrace-wide.webp", "/images/rooftop-spa-sunset.webp", "/images/rooftop-bbq.webp"],
  },
] as const;

export const galleryImages = [
  { src: "/images/facade-twilight.webp", alt: "383B Beach Road facade at twilight" },
  { src: "/images/living-bay-view.webp", alt: "Living room with Port Phillip Bay view" },
  { src: "/images/kitchen-island.webp", alt: "Dolomite kitchen island with brass pendant" },
  { src: "/images/pool-dusk-exterior.webp", alt: "Rear exterior with heated lap pool at dusk" },
  { src: "/images/suite-ensuite-tub.webp", alt: "Ensuite with freestanding bath" },
  { src: "/images/rooftop-spa-sunset.webp", alt: "Rooftop spa at sunset" },
  { src: "/images/living-dining-fireplace.webp", alt: "Living and dining with landscape fireplace" },
  { src: "/images/ensuite-arch-mirror.webp", alt: "Ensuite with arched mirror" },
  { src: "/images/garage-turntable.webp", alt: "Garage with car turntable" },
  { src: "/images/sunset-balcony.webp", alt: "Bay sunset from the balcony" },
  { src: "/images/staircase-detail.webp", alt: "Staircase detail with warm lighting" },
  { src: "/images/rooftop-bbq.webp", alt: "Rooftop terrace BBQ and dining zone" },
] as const;
