export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  folderPath: string;
  themeColor: string;
  gradient: string;
  highlights: string[];
  stats: { label: string; val: string }[];
  heroSection: { title: string; subtitle: string };
  processSection: { title: string; subtitle: string };
  qualitySection: { title: string; subtitle: string };
  ctaSection: { title: string; subtitle: string };
  detailsSection: { title: string; description: string; imageAlt: string };
  whyUsSection: { title: string; description: string };
  enquirySection: {
    minOrder: string;
    unit: string;
    capabilities: string[];
    deliveryInfo: string;
    serviceGuarantee: string;
  };
}

export const services: Service[] = [
  {
    id: "custom-cutting",
    name: "Custom Wood Cutting",
    tagline: "Cut to your exact specifications.",
    description:
      "We supply Casurina and Eucalyptus wood cut to any size the buyer needs — logs, planks, poles, or beams. Precision cutting with professional equipment.",
    folderPath: "/images/wood",
    themeColor: "#8D6E63",
    gradient: "linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)",
    highlights: ["Any Custom Size", "Precision Equipment", "Bulk Orders Welcome"],
    stats: [
      { label: "Accuracy", val: "±1cm" },
      { label: "Capacity", val: "50+ tons/day" },
      { label: "Experience", val: "15+ yrs" },
    ],
    heroSection: {
      title: "Custom Wood Cutting.",
      subtitle: "Your size. Our precision.",
    },
    processSection: {
      title: "Tell us the size, we handle the rest.",
      subtitle:
        "From raw Casurina and Eucalyptus logs to perfectly dimensioned planks and poles — cut on-site or at our yard, ready for pickup or delivery.",
    },
    qualitySection: {
      title: "Seasoned wood. Clean cuts.",
      subtitle:
        "Every piece is inspected for quality, ensuring straight grain and structural integrity.",
    },
    ctaSection: { title: "Built to your blueprint.", subtitle: "" },
    detailsSection: {
      title: "How We Cut",
      description:
        "We operate heavy-duty sawmills and precision cutting rigs capable of processing Casurina and Eucalyptus logs into any dimension — round poles for fencing, square beams for construction, thin planks for shuttering, or split logs for industrial use. Our team measures twice and cuts once, ensuring minimal waste and maximum value for every order.",
      imageAlt: "Wood cutting process",
    },
    whyUsSection: {
      title: "Why Casurina & Eucalyptus?",
      description:
        "Casurina and Eucalyptus are among the fastest-growing hardwoods, known for exceptional strength-to-weight ratio, termite resistance, and straight-grained structure. Ideal for construction poles, fencing, scaffolding, paper pulp, and fuel. Our plantation-sourced trees are sustainably harvested and legally compliant.",
    },
    enquirySection: {
      minOrder: "Contact for Quote",
      unit: "per cubic foot / per ton",
      capabilities: ["Logs", "Planks", "Poles", "Custom Dimensions"],
      deliveryInfo:
        "We deliver across India with our own fleet of trucks. Same-week dispatch for standard orders.",
      serviceGuarantee:
        "100% satisfaction — if the dimensions don't match your spec, we recut at no extra charge.",
    },
  },
  {
    id: "transport-delivery",
    name: "Wood Transport & Delivery",
    tagline: "From our yard to your site.",
    description:
      "Reliable door-to-door delivery of cut wood using our own fleet. We transport logs, planks, and firewood safely across India — covering AP, Telangana, Karnataka, Odisha, Maharashtra and more.",
    folderPath: "/images/wood",
    themeColor: "#6D4C41",
    gradient: "linear-gradient(135deg, #795548 0%, #4E342E 100%)",
    highlights: ["Own Fleet of Trucks", "GPS Tracked", "Safe & Secured Loading"],
    stats: [
      { label: "Fleet", val: "20+ trucks" },
      { label: "Range", val: "Pan India" },
      { label: "On-Time", val: "98%" },
    ],
    heroSection: {
      title: "Wood Transport.",
      subtitle: "Delivered to your doorstep.",
    },
    processSection: {
      title: "We move mountains of wood.",
      subtitle:
        "Our dedicated fleet handles everything — loading, securing, transporting, and unloading at your site with care.",
    },
    qualitySection: {
      title: "GPS-tracked. On-time. Every time.",
      subtitle:
        "Real-time tracking and professional drivers ensure your order arrives safely and on schedule.",
    },
    ctaSection: { title: "Logistics you can rely on.", subtitle: "" },
    detailsSection: {
      title: "Our Fleet & Process",
      description:
        "We own and maintain a fleet of 20+ heavy-duty trucks specifically designed for timber transport. Every load is professionally stacked, strapped, and secured to prevent damage during transit. Our drivers are trained in safe timber handling and know the best routes to get your wood to site quickly.",
      imageAlt: "Wood transport trucks",
    },
    whyUsSection: {
      title: "End-to-End Logistics",
      description:
        "From the moment your order is confirmed, we handle the entire logistics chain. Our dispatch team coordinates cutting schedules with transport schedules to minimize storage time. You get fresher wood, faster. We handle all documentation, weight slips, and delivery receipts for your records.",
    },
    enquirySection: {
      minOrder: "Minimum 1 truck load",
      unit: "per trip / per ton-km",
      capabilities: [
        "Full Truck Loads",
        "Part Loads",
        "Express Delivery",
        "Multi-Drop Routes",
      ],
      deliveryInfo:
        "We cover pan-India delivery from multiple sourcing locations. Bulk orders get priority scheduling. Multi-site drops available.",
      serviceGuarantee:
        "Guaranteed delivery window. Delays beyond our control are communicated proactively with a revised ETA.",
    },
  },
  {
    id: "firewood",
    name: "Firewood & Paper Wood",
    tagline: "Premium fuel & paper pulp supply.",
    description:
      "High-quality Casurina and Eucalyptus firewood and paper wood — split, dried, and ready. Supplied to fire wood industries, paper mills, brick kilns, boilers, and more.",
    folderPath: "/images/wood",
    themeColor: "#D84315",
    gradient: "linear-gradient(135deg, #FF7043 0%, #BF360C 100%)",
    highlights: ["High Calorific Value", "Paper Wood Supply", "Bulk Tons Available"],
    stats: [
      { label: "Moisture", val: "<15%" },
      { label: "Burn Time", val: "Long" },
      { label: "Ash", val: "Minimal" },
    ],
    heroSection: {
      title: "Firewood & Paper Wood.",
      subtitle: "Bulk supply for industries & mills.",
    },
    processSection: {
      title: "Seasoned, split, and delivered.",
      subtitle:
        "We supply bulk firewood that burns hotter and cleaner. Ideal for industrial and commercial use.",
    },
    qualitySection: {
      title: "Consistent quality, every load.",
      subtitle:
        "Uniform split sizes, proper seasoning, and moisture-checked batches for predictable burn performance.",
    },
    ctaSection: { title: "Fuel your operations.", subtitle: "" },
    detailsSection: {
      title: "Our Supply Process",
      description:
        "Casurina and Eucalyptus are prized for firewood and paper pulp. We supply bulk firewood to industries and paper wood to mills in the required quantity of tons and sizes. Every load is properly seasoned, split into uniform pieces, and delivered on time with our own transport fleet.",
      imageAlt: "Firewood and paper wood stacks",
    },
    whyUsSection: {
      title: "Industrial & Mill Supply",
      description:
        "We supply firewood to brick kilns, crematoriums, boiler houses, bakeries, and hotels, and paper wood to pulp mills across India. Our bulk pricing is competitive — we cut out the middlemen. Every load is weighed at our yard on a certified weighbridge and you receive a weight slip with your delivery.",
    },
    enquirySection: {
      minOrder: "Minimum 5 tons",
      unit: "per ton",
      capabilities: [
        "Bulk Industrial Firewood",
        "Paper Wood for Mills",
        "Split Logs",
        "Custom Ton Orders",
      ],
      deliveryInfo:
        "Delivered in open-top trucks across India. We can unload at your storage yard or stack on-site with labor if needed.",
      serviceGuarantee:
        "Weight guaranteed via certified weighbridge. Moisture content verified on request.",
    },
  },
];
