import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DeleteIcon from '@mui/icons-material/Delete';

import {
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaShieldAlt, FaCoins, FaShippingFast } from "react-icons/fa";
import img3 from "/20.jpg";
import img4 from "/17.jpg";
import img5 from "/24.jpg";
const categories = [
  {
    title: "Medications",
    desc: "Prescription and over-the-counter medicines to support your health.",
  },
  {
    title: "Hair care products",
    desc: "Shampoos, conditioners, and treatments for strong and healthy hair.",
  },
  {
    title: "Skin care products",
    desc: "Moisturizers, cleansers, and treatments for glowing, healthy skin.",
  },
  {
    title: "Daily hygiene products",
    desc: "Essential hygiene items for everyday freshness and protection.",
  },
  {
    title: "Mother and baby products",
    desc: "Safe and gentle care products for moms and their little ones.",
  },
  {
    title: "Makeup and accessories",
    desc: "Cosmetics and beauty tools to enhance your natural look.",
  },
  {
    title: "Medical supplies",
    desc: "Essential equipment and supplies for home and professional care.",
  },
  {
    title: "Vitamins",
    desc: "Boost your immunity and energy with trusted vitamins and supplements.",
  },
  {
    title: "Pet supplies",
    desc: "Healthy food and care products for your beloved pets.",
  },
];

const elementsItems = [
  "about",
  "contact",
  "Blog",
  "Feedback",
  "delivery",
  "Questions",
];

const navItems = [
  "All Categories",
  "Home",
  "Shop",
  "bestseller",
  "Sales",
  "Elements",
];

const shapes = {
  shape1: {
    imgs: ["/images/home-img-2.jpeg", "/images/home-img-6.jpeg"],
    texts: [
      "Your essential vitamins for stronger health every day",
      "Natural supplements to boost your immunity and energy",
    ],
  },
  shape2: {
    imgs: ["/images/home-img-1.jpeg", "/images/home-img-5.jpeg"],
    texts: [
      "Guaranteed quality from leading pharmaceutical brands",
      "Healthy solutions tailored to your lifestyle",
    ],
  },
  shape3: {
    imgs: ["/images/home-img-3.jpeg", "/images/home-img-7.jpeg"],
    texts: ["20% off all vitamins this week!", "Buy 2, get 1 free"],
  },
  shape4: {
    imgs: ["/images/home-img-4.jpeg", "/images/home-img-8.jpeg"],
    texts: [
      "We make a difference with a healthy smile and an active life",
      "Choose the best for your health from our trusted selection",
    ],
  },
};
const products = [
  {
    id: 1,
    title: "Pain Reliever & Vitamin C",
    images: ["/public/images/Products/1.jpg", "/public/images/Products/2.png"],
    desc: "Fast pain reliever for headache and body pain + Vitamin C to boost immunity and energy",
    price: "$12.99",
    category: "Medications",
    brand: "PharmaPlus",
    ratings: 4.6,
  },
  {
    id: 2,
    title: "Calcium & Moisturizer",
    images: ["/public/images/Products/3.jpg", "/public/images/Products/4.jpg"],
    desc: "Calcium supplement for strong bones + Moisturizing cream for dry and sensitive skin",
    price: "$15.50",
    category: "Vitamins",
    brand: "BioCare",
    ratings: 4.4,
  },
  {
    id: 3,
    title: "Cough Syrup & Antacid",
    images: ["/public/images/Products/5.jpg", "/public/images/Products/6.jpg"],
    desc: "Cough syrup to ease dry cough + Antacid for quick relief from heartburn",
    price: "$9.99",
    category: "Medications",
    brand: "HealthCo",
    ratings: 4.2,
  },
  {
    id: 4,
    title: "Nasal Drops & Mouthwash",
    images: ["/public/images/Products/7.jpg", "/public/images/Products/8.jpg"],
    desc: "Nasal drops for cold relief + Mouthwash to fight bacteria and refresh breath",
    price: "$11.25",
    category: "Daily hygiene products",
    brand: "PureLine",
    ratings: 4.5,
  },
  {
    id: 5,
    title: "Shampoo & Vitamin D",
    images: ["/public/images/Products/9.jpg", "/public/images/Products/10.jpg"],
    desc: "Anti-dandruff shampoo for healthy scalp + Vitamin D for bone strength and immunity",
    price: "$18.40",
    category: "Hair care products",
    brand: "NatureEssence",
    ratings: 4.7,
  },
  {
    id: 6,
    title: "Relief Gel & Allergy Tablets",
    images: [
      "/public/images/Products/11.jpg",
      "/public/images/Products/12.jpg",
    ],
    desc: "Pain relief gel for muscles and joints + Allergy tablets for sneezing and itching",
    price: "$13.70",
    category: "Medications",
    brand: "Relaxa",
    ratings: 4.3,
  },
  {
    id: 7,
    title: "Sunscreen & Omega 3",
    images: [
      "/public/images/Products/13.jpg",
      "/public/images/Products/14.jpg",
    ],
    desc: "Sunscreen cream for UV protection + Omega 3 capsules for heart health",
    price: "$21.99",
    category: "Skin care products",
    brand: "SunWell",
    ratings: 4.8,
  },
  {
    id: 8,
    title: "Kids Syrup & Antiseptic",
    images: [
      "/public/images/Products/15.jpg",
      "/public/images/Products/16.jpg",
    ],
    desc: "Kids syrup to reduce fever + Antiseptic solution for wound cleaning",
    price: "$10.50",
    category: "Mother and baby products",
    brand: "BabySafe",
    ratings: 4.6,
  },
  {
    id: 9,
    title: "Zinc & Healing Ointment",
    images: [
      "/public/images/Products/17.jpg",
      "/public/images/Products/18.jpg",
    ],
    desc: "Zinc supplement for immunity + Healing ointment for burns and cuts",
    price: "$14.20",
    category: "Medical supplies",
    brand: "HealFast",
    ratings: 4.4,
  },
  {
    id: 10,
    title: "Iron & Face Wash",
    images: [
      "/public/images/Products/19.png",
      "/public/images/Products/20.jpg",
    ],
    desc: "Iron tablets for anemia + Face wash for oily and acne-prone skin",
    price: "$16.80",
    category: "Skin care products",
    brand: "GlowMed",
    ratings: 4.5,
  },
  {
    id: 11,
    title: "Laxative & Eye Drops",
    images: [
      "/public/images/Products/21.jpg",
      "/public/images/Products/22.jpg",
    ],
    desc: "Gentle laxative syrup for digestion + Eye drops for hydration and comfort",
    price: "$12.30",
    category: "Medications",
    brand: "CarePlus",
    ratings: 4.2,
  },
  {
    id: 12,
    title: "Probiotics & Sanitizer",
    images: [
      "/public/images/Products/23.jpg",
      "/public/images/Products/24.jpg",
    ],
    desc: "Probiotics for gut health + Hand sanitizer to kill germs quickly",
    price: "$8.99",
    category: "Daily hygiene products",
    brand: "CleanWell",
    ratings: 4.6,
  },
];

const reviews = [
  {
    id: 1,
    name: "Remy Sharp",
    avatar: "/static/images/avatar/1.jpg",
    rating: 5,
    review:
      "Excellent pharmacy service! Always deliver my medications on time.",
  },
  {
    id: 2,
    name: "Alex Johnson",
    avatar: "/static/images/avatar/2.jpg",
    rating: 4,
    review: "Professional staff and great customer support.",
  },
  {
    id: 3,
    name: "Sarah Lee",
    avatar: "/static/images/avatar/3.jpg",
    rating: 5,
    review: "Affordable prices and genuine products. Highly recommended!",
  },
];
const banners = [
  { text: "Shop Medicines Online", btn: "Order Now" },
  { text: "Daily Health & Vitamins", btn: "Shop Vitamins" },
  { text: "Medical Equipment & Care", btn: "Explore Products" },
];

const colorsThemes = {};
const questionFaq = {
  "Orders & Delivery": [
    [
      "How can I place an order online?",
      "You can browse our products, add items to your cart, and complete checkout by entering your shipping details and choosing your payment method.",
    ],
    [
      "How long does delivery take?",
      "Delivery usually takes 1–3 business days depending on your location.",
    ],
    [
      "Can I track my order?",
      "Yes, once your order is shipped, you’ll receive a tracking link via email or SMS.",
    ],
    [
      "What should I do if my order hasn’t arrived?",
      "Please contact our Customer Support with your order number, and we’ll help you locate your package.",
    ],
  ],

  "Prescriptions & Medicines": [
    [
      "Do I need a prescription to buy medicines?",
      "Prescription drugs require a valid prescription from a licensed doctor, which you can upload during checkout.",
    ],
    [
      "Can I refill my prescription online?",
      "Yes, registered customers can easily refill prescriptions through their account dashboard.",
    ],
    [
      "Are generic medicines available?",
      "Yes, we provide high-quality generic alternatives for most branded medicines.",
    ],
    [
      "How are my medicines stored before delivery?",
      "All medicines are stored in temperature-controlled facilities to maintain their safety and effectiveness.",
    ],
  ],

  "Payments & Refunds": [
    [
      "What payment methods do you accept?",
      "We accept credit/debit cards, digital wallets, and cash on delivery (in select areas).",
    ],
    [
      "Is my payment information secure?",
      "Yes, all transactions are encrypted using SSL security to protect your data.",
    ],
    [
      "How can I cancel an order and get a refund?",
      "You can cancel your order before it is shipped; refunds are processed within 3–5 business days.",
    ],
    [
      "Why was my payment declined?",
      "Payment failures can occur due to network issues or incorrect card details. Try again or contact your bank.",
    ],
  ],

  "Health & Wellness": [
    [
      "Can I get advice on which medicine to use?",
      "Our licensed pharmacists are available online to guide you in choosing safe and effective medications.",
    ],
    [
      "Do you offer vitamins and supplements?",
      "Yes, we offer a wide range of vitamins, minerals, and health supplements for all ages.",
    ],
    [
      "How can I stay updated on health tips and offers?",
      "Subscribe to our newsletter or follow us on social media for updates, health blogs, and discounts.",
    ],
    [
      "Are your products authentic?",
      "Absolutely. All our products are 100% genuine and sourced directly from verified suppliers.",
    ],
  ],
};
const stats = [
  { value: "18+", label: "Years" },
  { value: "200+", label: "Employee" },
  { value: "85%", label: "Page Views" },
  { value: "27+", label: "Awards" },
];
const aboutCards = [
  {
    icon: <AiOutlineCheckCircle className="text-5xl mx-auto text-[#00a297]" />,
    title: "Submit a task",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    icon: <AiOutlineMessage className="text-5xl mx-auto text-[#00a297]" />,
    title: "Send message",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    icon: <AiOutlineUser className="text-5xl mx-auto text-[#00a297]" />,
    title: "Trusted experience",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
];
const generalRows = [
  { name: "Brand", info: "BUMTUM" },
  { name: "Manufacturer", info: "Millennium Babycares Pvt. Ltd." },
  {
    name: "Manufacturer Address",
    info: "Millennium Babycares Pvt. Ltd. Plot no. 111, Sector-2, Pithampur Industrial Area, Pithampur Dist. Dhar, Indore, Madhya Pradesh 454775",
  },
  { name: "Manufacturer Email", info: "demo@example.com" },
  { name: "Sold By", info: "FAMILYCARE CONSUMER PRIVATE LIMITED" },
  { name: "JioMart Customer Care Email", info: "demo@example.com" },
  { name: "JioMart Customer Care Phone", info: "9876543210" },
  { name: "Marketed By", info: "Familycare Consumer Pvt. Ltd." },
  { name: "Included Components", info: "62pcs in a pack" },
  { name: "Country of Origin", info: "India" },
];
const features = [
  {
    id: 1,
    icon: <FaShieldAlt className="w-6 h-6 text-[#00a297]" />,
    text: "101% Original",
  },
  {
    id: 2,
    icon: <FaCoins className="w-6 h-6 text-[#00a297]" />,
    text: "Lowest Price",
  },
  {
    id: 3,
    icon: <FaShippingFast className="w-6 h-6 text-[#00a297]" />,
    text: "Free Shipping",
  },
];
const relatedProducts = [
  {
    id: 1,
    name: "Omron HEM 7120 Fully Automatic",
    price: 20,
    stock: 5,
    img: img3,
  },
  {
    id: 2,
    name: "Easycare Big Display Digital Blood",
    price: 14.4,
    stock: 12,
    img: img4,
  },
  {
    id: 3,
    name: "Himalaya Baby Body Lotion 400 ml",
    price: 6.5,
    stock: 8,
    img: img5,
  },
];
const shopFilters = ["Categories", "Brands", "Price Filter"];
const filterOptions = {
  Categories: [
    "Mother and baby products",
    "Pet supplies",
    "Medical supplies",
    "Daily hygiene products",
    "Makeup and accessories",
    "Vitamins",
    "Medications",
    "Hair care products",
    "Skin care products",
  ],
  Brands: [
    "PharmaPlus",
    "BioCare",
    "HealthCo",
    "PureLine",
    "NatureEssence",
    "Relaxa",
    "SunWell",
    "BabySafe",
    "HealFast",
    "GlowMed",
    "CarePlus",
    "CleanWell",
  ],
  "Price Filter": ["All", "10L.E-15L.E", "15L.E-20L.E"],
};

const filterKeys = {
  Categories: "categories",
  Brands: "brands",
  "Price Filter": "price",
};

const productRows = [
  { name: "Minimum Age", info: "20" },
  { name: "Minimum Age UOM", info: "Month" },
  { name: "Maximum Age", info: "36" },
  { name: "Age Description", info: "Infant" },
  { name: "Size", info: "L" },
  { name: "Color", info: "White" },
];
const profileList = [
  { name: "Info", icon: <PersonIcon /> },
  { name: "Security", icon: <LockIcon /> },
  { name: "Notifications", icon: <NotificationsIcon /> },
  { name: "Delete Profile", icon: <DeleteIcon /> },
  { name: "Themes", icon: <ColorLensIcon /> },
];

export {
  categories,
  elementsItems,
  navItems,
  shapes,
  products,
  reviews,
  banners,
  questionFaq,
  profileList,
  stats,
  aboutCards,
  generalRows,
  productRows,
  features,
  relatedProducts,
  shopFilters,
  filterOptions,
  filterKeys,
};
