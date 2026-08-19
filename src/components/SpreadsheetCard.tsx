import ArrowOutwardIcon from '../icons/ArrowOutwardIcon'
import Button from './Button'
import PreviewCard from './PreviewCard'

export interface SpreadsheetCardProps {
  name: string
  previewImageUrl: string
  lastUpdated: string
  /** Shows the red "New" pill next to the name — for a spreadsheet that
   *  was connected recently. */
  isNew?: boolean
  onMakeChanges?: () => void
  onViewSheet?: () => void
}

// Figma node 3976:7323 ("spreadsheet preview"): an already-connected
// spreadsheet. "Make Changes" is text-only (outline button, no icon);
// "View Sheet" gets the outward-arrow icon — confirmed from the Figma
// markup, not assumed symmetry between the two buttons.
function SpreadsheetCard({
  name,
  previewImageUrl,
  lastUpdated,
  isNew = false,
  onMakeChanges,
  onViewSheet,
}: SpreadsheetCardProps) {
  const meta = (
    <div className="flex flex-col items-start gap-2">
      <span className="whitespace-nowrap text-label-overline font-sans font-medium text-content-disabled">
        Name:
      </span>
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2.5">
          <span className="whitespace-nowrap text-body-medium font-sans font-normal text-content-primary">
            {name}
          </span>
          {isNew && (
            <span className="rounded-full bg-feedback-error px-2 py-1 text-label-caption font-sans font-normal whitespace-nowrap text-content-primary-inverse">
              New
            </span>
          )}
        </div>
        <span className="whitespace-nowrap text-label-caption font-sans font-normal text-content-tertiary">
          Last Updated: {lastUpdated}
        </span>
      </div>
    </div>
  )

  const actions = (
    <>
      <Button variant="outline" size="small" onClick={onMakeChanges}>
        Make Changes
      </Button>
      <Button variant="tertiary" size="small" rightIcon={<ArrowOutwardIcon />} onClick={onViewSheet}>
        View Sheet
      </Button>
    </>
  )

  return <PreviewCard previewImageUrl={previewImageUrl} meta={meta} actions={actions} />
}

export default SpreadsheetCard
