
import { Topic } from '../types';
import { colors } from '../styles/commonStyles';

export const topics: Topic[] = [
  {
    id: 'addition',
    title: 'Addition',
    description: 'Add numbers to reach the right answer.',
    icon: 'add-circle-outline',
    color: colors.pastelGreen,
    image: require('../assets/images/final_quest_240x240__.png'),
  },
  {
    id: 'subtraction',
    title: 'Subtraction',
    description: 'Subtract numbers carefully!',
    icon: 'remove-circle-outline',
    color: colors.pastelYellow,
    image: require('../assets/images/final_quest_240x240__.png'),
  },
  {
    id: 'multiplication',
    title: 'Multiplication',
    description: 'Multiply to get the product.',
    icon: 'resize-outline',
    color: colors.pastelPurple,
    image: require('../assets/images/final_quest_240x240__.png'),
  },
  {
    id: 'division',
    title: 'Division',
    description: 'Divide evenly to find the quotient.',
    icon: 'pie-chart-outline',
    color: colors.pastelBlue,
    image: require('../assets/images/final_quest_240x240__.png'),
  },
];
