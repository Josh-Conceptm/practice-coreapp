import type { Meta, StoryObj } from '@storybook/react-vite'
import AddIcon from '../icons/AddIcon'
import Button, { type ButtonVariant } from './Button'
import type { ButtonSize } from './shared'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'tertiary', 'outline', 'borderless', 'link'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
}

const VARIANTS: ButtonVariant[] = ['primary', 'tertiary', 'outline', 'borderless', 'link']
const SIZES: ButtonSize[] = ['small', 'medium', 'large']

function VariantSizeMatrix({ withIcons }: { withIcons: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-24 shrink-0 text-label-small font-sans font-medium text-content-secondary">
            {variant}
          </span>
          {SIZES.map((size) => (
            <Button
              key={size}
              variant={variant}
              size={size}
              leftIcon={withIcons ? <AddIcon /> : undefined}
            >
              {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => <VariantSizeMatrix withIcons={false} />,
}

export const AllVariantsWithIcons: Story = {
  parameters: { layout: 'padded' },
  render: () => <VariantSizeMatrix withIcons={true} />,
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    fullWidth: true,
    children: 'Full width button',
  },
  parameters: { layout: 'padded' },
  decorators: [
    (StoryComponent) => (
      <div className="w-[480px]">
        <StoryComponent />
      </div>
    ),
  ],
}
