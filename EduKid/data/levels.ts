
import { Question, TopicID } from '../types';

// Generate increasing difficulty ranges based on level number
const rangeForLevel = (level: number) => {
  // Scale number range from small to larger
  const stage = Math.ceil(level / 50); // 10 stages across 500 levels
  const max = Math.min(10 + stage * 10, 120);
  const min = 0;
  return { min, max };
};

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const clampLevel = (level: number) => Math.max(1, Math.min(500, Math.floor(level)));

export function generateQuestion(topic: TopicID, lvl: number): Question {
  const level = clampLevel(lvl);
  const { min, max } = rangeForLevel(level);

  // Adjust difficulty: more terms at higher levels for addition/subtraction
  const extraTerm = level > 300 ? 1 : 0;

  let a = rand(min, max);
  let b = rand(min, max);

  // Avoid trivial zeros too frequently at higher levels
  if (level > 50) {
    if (a === 0) a = rand(1, max);
    if (b === 0) b = rand(1, max);
  }

  let question = '';
  let correct = 0;

  if (topic === 'addition') {
    if (extraTerm) {
      const c = rand(min, max);
      correct = a + b + c;
      question = `${a} + ${b} + ${c} = ?`;
    } else {
      correct = a + b;
      question = `${a} + ${b} = ?`;
    }
  } else if (topic === 'subtraction') {
    // ensure non-negative results for kids
    const [big, small] = a >= b ? [a, b] : [b, a];
    correct = big - small;
    question = `${big} - ${small} = ?`;
  } else if (topic === 'multiplication') {
    // limit factor sizes at lower levels
    const factorCap = Math.max(5, Math.floor(max / 2));
    a = rand(1, factorCap);
    b = rand(1, factorCap);
    correct = a * b;
    question = `${a} × ${b} = ?`;
  } else if (topic === 'division') {
    // create divisible pairs
    b = rand(1, Math.max(2, Math.floor(max / 2)));
    correct = rand(1, Math.max(2, Math.floor(max / 2)));
    a = b * correct;
    question = `${a} ÷ ${b} = ?`;
  }

  const options = makeOptions(correct, topic, level);
  const correctIndex = options.indexOf(correct);

  return { question, options, correctIndex };
}

function makeOptions(correct: number, topic: TopicID, level: number): number[] {
  const opts = new Set<number>([correct]);
  const spread = Math.max(2, Math.floor(level / 10));
  while (opts.size < 4) {
    let delta = rand(1, spread);
    if (Math.random() < 0.5) delta *= -1;
    let cand = correct + delta;
    if (topic === 'division' || topic === 'multiplication') {
      // Keep in reasonable range
      if (cand < 0) cand = Math.abs(cand);
    } else {
      if (cand < 0) cand = 0;
    }
    opts.add(cand);
  }
  return shuffle(Array.from(opts));
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
