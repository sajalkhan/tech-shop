import { ComponentMeta, ComponentStory } from '@storybook/react';
import LoginForm from '.';

export default {
  title: 'components/molecules/LoginForm',
  component: LoginForm,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = args => <LoginForm {...args} onSubmit={args.onSubmit} />;

export const Normal = Template.bind({});
