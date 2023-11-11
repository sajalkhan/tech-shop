import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LoadingToRedirect } from '.';

export default {
  title: 'components/atoms/LoadingToRedirect',
  component: LoadingToRedirect,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
} as ComponentMeta<typeof LoadingToRedirect>;

const Template: ComponentStory<typeof LoadingToRedirect> = () => <LoadingToRedirect />;

export const Normal = Template.bind({});
