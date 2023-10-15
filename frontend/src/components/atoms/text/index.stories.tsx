import { ComponentMeta, ComponentStory } from '@storybook/react';
import Text from './';

export default {
  title: 'components/atoms/Text',
  component: Text,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = () => <Text />;

export const Normal = Template.bind({});
