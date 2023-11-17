import { ComponentMeta, ComponentStory } from '@storybook/react';
import Navigation from '.';
import { Key } from 'react';

export default {
  title: 'components/atoms/Navigation',
  component: Navigation,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (
  args: JSX.IntrinsicAttributes & {
    onClick?: ((e: { key: Key }) => void) | undefined;
    logout?: (() => void) | undefined;
  }
) => <Navigation {...args} />;

export const Normal = Template.bind({});
