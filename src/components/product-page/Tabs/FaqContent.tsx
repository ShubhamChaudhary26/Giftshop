import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What types of candles do you offer?",
    answer:
      "We offer a wide range of candles including scented, soy, beeswax, decorative, and aromatherapy candles — perfect for gifting or home décor.",
  },
  {
    question: "Are your candles handmade?",
    answer:
      "Yes! All our candles are hand-poured with care using high-quality, eco-friendly wax and premium fragrance oils.",
  },
  {
    question: "Do you provide custom or personalized candles?",
    answer:
      "Absolutely! We offer custom labels, scents, and packaging for special occasions such as weddings, birthdays, and corporate gifting.",
  },
  {
    question: "Are your candles safe and non-toxic?",
    answer:
      "Yes, our candles are made from 100% natural waxes and lead-free cotton wicks, ensuring a clean, safe, and long-lasting burn.",
  },
  {
    question: "Do you offer nationwide or international shipping?",
    answer:
      "We provide fast nationwide delivery across India, and international shipping is available for select countries.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "We accept returns within 14 days of delivery for unused or damaged items. Refunds or replacements are processed promptly according to our policy.",
  },
];



const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently Asked Questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
