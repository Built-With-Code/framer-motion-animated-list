import { v4 as uuid } from "uuid";

let titles = [
  ["Apple's newest iPhone is here", "Watch our July event"],
  ["Your funds have been processed", "See your latest deposit online"],
  ["This Week in Sports", "The finals are heating up"],
  ["Changelog update", "Edge subroutines and more"],
  ["React Hawaii is here!", "Time for fun in the sun"],
];

export interface MessageData {
  id: string;
  content: string[];
}

export const generateMessage = (): MessageData => {
  return {
    id: uuid(),
    content: titles[Math.floor(Math.random() * titles.length)],
  };
};
