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
    question: "What types of IT and AI books do you offer?",
    answer:
      "We offer a wide range of IT and AI books including programming, data science, machine learning, artificial intelligence, cloud computing, cybersecurity, and more.",
  },
  {
    question: "Are your books suitable for beginners?",
    answer:
      "Yes! We have books for all levels, from complete beginners to advanced professionals looking to deepen their knowledge.",
  },
  {
    question: "Do you provide e-books or only physical copies?",
    answer:
      "We provide both physical copies and e-books. You can choose your preferred format while purchasing.",
  },
  {
    question: "Are the books up-to-date with the latest technologies?",
    answer:
      "Absolutely. We carefully curate our collection to include the latest editions and trending topics in IT and AI.",
  },
  {
    question: "Do you offer worldwide shipping?",
    answer:
      "Yes, we provide worldwide shipping. Delivery times vary depending on the destination and chosen shipping method.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "We accept returns within 14 days of delivery for unopened or defective books. Refunds or exchanges are processed promptly according to our policy.",
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
