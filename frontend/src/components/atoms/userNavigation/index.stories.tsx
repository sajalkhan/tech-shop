import { ComponentMeta, ComponentStory } from '@storybook/react';
import UserNavigation from '.';

export default {
  title: 'components/atoms/UserNavigation',
  component: UserNavigation,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
} as ComponentMeta<typeof UserNavigation>;

const Template: ComponentStory<typeof UserNavigation> = args => <UserNavigation {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: 'This is a content',
};
