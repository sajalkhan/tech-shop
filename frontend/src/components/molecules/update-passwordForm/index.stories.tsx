import { ComponentMeta, ComponentStory } from '@storybook/react';
import UpdatePasswordForm from '.';

export default {
  title: 'components/molecules/UpdatePasswordForm',
  component: UpdatePasswordForm,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
} as ComponentMeta<typeof UpdatePasswordForm>;

const Template: ComponentStory<typeof UpdatePasswordForm> = args => (
  <UpdatePasswordForm {...args} onSubmit={args.onSubmit} />
);

export const Normal = Template.bind({});
