import { ComponentMeta, ComponentStory } from '@storybook/react';
import RegistrationForm from '.';

export default {
  title: 'components/molecules/RegistrationForm',
  component: RegistrationForm,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
} as ComponentMeta<typeof RegistrationForm>;

const Template: ComponentStory<typeof RegistrationForm> = (args: any) => (
  <RegistrationForm {...args} onSubmit={args.onSubmit} />
);

export const Normal = Template.bind({});
