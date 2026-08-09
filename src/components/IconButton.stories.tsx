import type { Meta, StoryObj } from '@storybook/react-vite'
import AddIcon from '../icons/AddIcon'
import IconButton, { type IconButtonVariant } from './IconButton'
import type { ButtonSize } from './shared'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  args: {
    icon: <AddIcon />,
    'aria-label': 'Add item',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'tertiary', 'outline', 'ghost'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
}

const VARIANTS: IconButtonVariant[] = ['primary', 'tertiary', 'outline', 'ghost']
const SIZES: ButtonSize[] = ['small', 'medium', 'large']

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-16 shrink-0 text-label-small font-sans font-medium text-content-secondary">
            {variant}
          </span>
          {SIZES.map((size) => (
            <IconButton
              key={size}
              variant={variant}
              size={size}
              icon={<AddIcon />}
              aria-label={`Add (${variant} ${size})`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
}
