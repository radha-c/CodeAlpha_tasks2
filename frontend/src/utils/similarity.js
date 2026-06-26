import faqs from "../data/faq.json";
import { removeStopwords } from "stopword";

function preprocess(text) {
  let words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ");

  return removeStopwords(words);
}

function similarity(words1, words2) {
  const common = words1.filter(word =>
    words2.includes(word)
  );

  return common.length;
}

export function findBestMatch(question) {

  const userWords = preprocess(question);

  let bestScore = 0;
  let bestAnswer =
    "Sorry, I couldn't find an answer.";

  faqs.forEach(faq => {

    const faqWords =
      preprocess(faq.question);

    const score =
      similarity(userWords, faqWords);

    if (score > bestScore) {
      bestScore = score;
      bestAnswer = faq.answer;
    }
  });

  return bestAnswer;
}