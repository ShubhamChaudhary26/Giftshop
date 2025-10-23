// src/lib/static-data.ts
import { Review } from "@/types/review.types";

import { 
  Coffee, 
  Frame, 
  Key, 
  Package, 
  Heart, 
  Gift, 
  Users, 
  Sparkles,
  Calendar,
  Award,
  Zap,
  Home,
  Briefcase,
  Star
} from "lucide-react";

export const reviewsData = [
  {
    id: 1,
    user: "Priya Sharma",
    content:
      "Absolutely loved the personalized mug! The photo quality is amazing and my husband was so happy on his birthday. Will order again! 🎁",
    rating: 5,
    date: "December 15, 2024",
    icon: Coffee,
    iconColor: "from-pink-500 to-rose-500",
    productType: "Photo Mug"
  },
  {
    id: 2,
    user: "Rahul Verma",
    content:
      "Ordered a custom photo frame for my parents' anniversary. The quality exceeded my expectations! Beautiful packaging too. Highly recommended! 💝",
    rating: 5,
    date: "December 14, 2024",
    icon: Frame,
    iconColor: "from-purple-500 to-indigo-500",
    productType: "Photo Frame"
  },
  {
    id: 3,
    user: "Ananya Patel",
    content:
      "Best gift shop ever! Got matching couple keyrings customized with our names. Super cute and excellent quality. My boyfriend loved it! ❤️",
    rating: 5,
    date: "December 13, 2024",
    icon: Key,
    iconColor: "from-blue-500 to-cyan-500",
    productType: "Couple Keyrings"
  },
  {
    id: 4,
    user: "Rohan Singh",
    content:
      "Ordered 10 personalized mugs for my office team as Diwali gifts. Everyone absolutely loved them! Fast delivery and great customer service. 🙌",
    rating: 5,
    date: "December 12, 2024",
    icon: Briefcase,
    iconColor: "from-amber-500 to-orange-500",
    productType: "Corporate Gifts"
  },
  {
    id: 5,
    user: "Sneha Desai",
    content:
      "The magic mug is incredible! My photo appears when I pour hot coffee. My friends were amazed! Such a unique gift idea. ✨",
    rating: 5,
    date: "December 11, 2024",
    icon: Sparkles,
    iconColor: "from-pink-500 to-purple-500",
    productType: "Magic Mug"
  },
  {
    id: 6,
    user: "Arjun Reddy",
    content:
      "Got a beautiful wooden photo frame with laser engraving. The customization is perfect and it looks so premium. Worth every penny! 🌟",
    rating: 5,
    date: "December 10, 2024",
    icon: Award,
    iconColor: "from-green-500 to-emerald-500",
    productType: "Premium Frame"
  },
  {
    id: 7,
    user: "Kavya Iyer",
    content:
      "Ordered a personalized keyring with my daughter's photo. She carries it everywhere now! The print quality is crystal clear. Thank you! 😍",
    rating: 5,
    date: "December 9, 2024",
    icon: Heart,
    iconColor: "from-red-500 to-pink-500",
    productType: "Photo Keyring"
  },
  {
    id: 8,
    user: "Vikram Malhotra",
    content:
      "Premium quality products at affordable prices! Got a gift hamper with mug, frame, and keyring - all customized. Perfect anniversary gift! 💕",
    rating: 5,
    date: "December 8, 2024",
    icon: Package,
    iconColor: "from-violet-500 to-purple-500",
    productType: "Gift Hamper"
  },
  {
    id: 9,
    user: "Divya Nair",
    content:
      "The cushion with my family photo is so soft and vibrant! My mom got emotional when she saw it. Best Mother's Day gift ever! 🥰",
    rating: 5,
    date: "December 7, 2024",
    icon: Home,
    iconColor: "from-teal-500 to-cyan-500",
    productType: "Photo Cushion"
  },
  {
    id: 10,
    user: "Karan Kapoor",
    content:
      "Super fast delivery! Ordered a customized desk nameplate and received it in 2 days. Quality is top-notch. Will definitely order more gifts! 🚀",
    rating: 5,
    date: "December 6, 2024",
    icon: Zap,
    iconColor: "from-yellow-500 to-orange-500",
    productType: "Desk Nameplate"
  },
  {
    id: 11,
    user: "Meera Gupta",
    content:
      "The personalized photo calendar is beautiful! Each month has different family photos. Such a thoughtful gift for grandparents. 📅❤️",
    rating: 5,
    date: "December 5, 2024",
    icon: Calendar,
    iconColor: "from-indigo-500 to-blue-500",
    productType: "Photo Calendar"
  },
  {
    id: 12,
    user: "Aditya Joshi",
    content:
      "Ordered couple mugs with our wedding photo. The quality is fantastic and the colors are so vibrant! My wife loved it! Best gift shop online. 💑",
    rating: 5,
    date: "December 4, 2024",
    icon: Users,
    iconColor: "from-pink-500 to-rose-600",
    productType: "Couple Mugs"
  },
];