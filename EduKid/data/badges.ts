
import { Badge } from '../types';
import { colors } from '../styles/commonStyles';

export const badgeThresholds = [1, 10, 25, 50, 100, 250, 500];

export function buildBadges(topicTitle: string): Badge[] {
  return badgeThresholds.map((th, idx) => ({
    id: `${topicTitle.toLowerCase()}-${th}`,
    title: `${topicTitle} Lv. ${th}`,
    description: `Completed level ${th} in ${topicTitle}`,
    color: idx % 2 === 0 ? colors.accentBlue : colors.accentPink,
    bgColor: idx % 2 === 0 ? colors.pastelBlue : '#FFE3F0',
    threshold: th,
  }));
}
