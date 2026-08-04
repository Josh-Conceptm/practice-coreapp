const SAMPLE = 'The quick brown fox jumps over the lazy dog'

type TokenSpec = {
  token: string
  className: string
  meta: string
}

type TokenGroup = {
  title: string
  tokens: TokenSpec[]
}

const groups: TokenGroup[] = [
  {
    title: 'Display',
    tokens: [
      {
        token: 'display-2xl',
        className: 'text-display-2xl font-display font-semibold',
        meta: 'display-2xl — 48/56, semibold, -1px',
      },
    ],
  },
  {
    title: 'Heading',
    tokens: [
      {
        token: 'heading-xl',
        className: 'text-heading-xl font-display font-bold',
        meta: 'heading-xl — 40/48, bold, -1px',
      },
      {
        token: 'heading-lg',
        className: 'text-heading-lg font-display font-semibold',
        meta: 'heading-lg — 32/40, semibold, -1px',
      },
      {
        token: 'heading-md',
        className: 'text-heading-md font-display font-semibold',
        meta: 'heading-md — 24/32, semibold, -0.5px',
      },
      {
        token: 'heading-sm',
        className: 'text-heading-sm font-sans font-semibold',
        meta: 'heading-sm — 20/28, semibold, -0.5px',
      },
      {
        token: 'heading-xs',
        className: 'text-heading-xs font-sans font-medium',
        meta: 'heading-xs — 18/26, medium, -0.5px',
      },
      {
        token: 'heading-2xs',
        className: 'text-heading-2xs font-sans font-medium',
        meta: 'heading-2xs — 16/24, medium, 0px',
      },
    ],
  },
  {
    title: 'Body',
    tokens: [
      {
        token: 'body-large',
        className: 'text-body-large font-sans font-normal',
        meta: 'body-large — 18/28, regular, 0px',
      },
      {
        token: 'body-medium',
        className: 'text-body-medium font-sans font-normal',
        meta: 'body-medium — 16/24, regular, 0px',
      },
      {
        token: 'body-small',
        className: 'text-body-small font-sans font-normal',
        meta: 'body-small — 14/20, regular, 0px',
      },
    ],
  },
  {
    title: 'Label',
    tokens: [
      {
        token: 'label-lead',
        className: 'text-label-lead font-sans font-normal',
        meta: 'label-lead — 20/28, regular, -0.5px',
      },
      {
        token: 'label-large',
        className: 'text-label-large font-sans font-medium',
        meta: 'label-large — 16/24, medium, 0px',
      },
      {
        token: 'label-small',
        className: 'text-label-small font-sans font-medium',
        meta: 'label-small — 14/20, medium, 0px',
      },
      {
        token: 'label-caption',
        className: 'text-label-caption font-sans font-normal',
        meta: 'label-caption — 12/16, regular, 0px',
      },
      {
        token: 'label-overline',
        className: 'text-label-overline font-sans font-medium',
        meta: 'label-overline — 12/16, medium, 0px',
      },
    ],
  },
  {
    title: 'Button',
    tokens: [
      {
        token: 'button-large',
        className: 'text-button-large font-sans font-semibold',
        meta: 'button-large — 16/24, semibold, 0px',
      },
      {
        token: 'button-medium',
        className: 'text-button-medium font-sans font-semibold',
        meta: 'button-medium — 14/20, semibold, 0px',
      },
      {
        token: 'button-small',
        className: 'text-button-small font-sans font-semibold',
        meta: 'button-small — 12/16, semibold, 0px',
      },
    ],
  },
]

function TypographyPreview() {
  return (
    <main className="min-h-screen bg-background-primary px-8 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-16">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="text-label-overline font-sans font-medium text-content-tertiary uppercase">
              {group.title}
            </h2>
            <div className="mt-6 flex flex-col gap-8">
              {group.tokens.map((t) => (
                <div key={t.token}>
                  <p className="text-label-caption font-sans font-normal text-content-secondary">
                    {t.meta}
                  </p>
                  <p className={`${t.className} text-content-primary`}>{SAMPLE}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

export default TypographyPreview
