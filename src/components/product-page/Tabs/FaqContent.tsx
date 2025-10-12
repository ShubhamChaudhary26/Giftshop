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
    question: "What materials are the candles made from?",
    answer:
      "Our candles are made from 100% natural soy wax with a cotton wick for a clean and long-lasting burn.",
  },
  {
    question: "How long do the candles burn?",
    answer:
      "The burn time varies by size, ranging from 30 to 50 hours depending on the candle type and size.",
  },
  {
    question: "Are the candles scented?",
    answer:
      "Yes, each candle is infused with high-quality fragrance oils, such as lavender, vanilla, and sandalwood.",
  },
  {
    question: "Are the candles safe for indoors?",
    answer:
      "Absolutely. Our candles are designed for indoor use and produce minimal soot when burned properly.",
  },
  {
    question: "Do you offer shipping and delivery?",
    answer:
      "Yes, we provide nationwide shipping. Delivery times vary depending on your location and chosen shipping method.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery for unopened and unused candles. Refunds or exchanges will be processed accordingly.",
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
