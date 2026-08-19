import AddIcon from '../icons/AddIcon'
import ArrowOutwardIcon from '../icons/ArrowOutwardIcon'
import Button from './Button'
import PreviewCard from './PreviewCard'

export interface TemplateCardProps {
  name: string
  previewImageUrl: string
  onPreview?: () => void
  onUseTemplate?: () => void
}

// Figma node 3976:7342 ("templates"): a not-yet-connected template in the
// gallery — name only, no "Last Updated"/"New" tag (those are a connected
// spreadsheet's concern, see SpreadsheetCard). "Preview" reuses the same
// outward-arrow icon as SpreadsheetCard's "View Sheet" (both mean "open
// this sheet"); "Use template" gets a distinct plus icon (it means
// "create a new sheet from this"), per the Figma markup — the default
// state's hidden, opacity-0 "Make Changes"/"View Sheet" pair on this node
// is leftover debris from duplicating SpreadsheetCard and is intentionally
// not reproduced here.
function TemplateCard({ name, previewImageUrl, onPreview, onUseTemplate }: TemplateCardProps) {
  const meta = (
    <div className="flex flex-col items-start gap-2">
      <span className="whitespace-nowrap text-label-overline font-sans font-medium text-content-tertiary">
        Name:
      </span>
      <span className="whitespace-nowrap text-body-medium font-sans font-normal text-content-primary">
        {name}
      </span>
    </div>
  )

  const actions = (
    <>
      <Button variant="outline" size="small" rightIcon={<ArrowOutwardIcon />} onClick={onPreview}>
        Preview
      </Button>
      <Button variant="tertiary" size="small" rightIcon={<AddIcon />} onClick={onUseTemplate}>
        Use template
      </Button>
    </>
  )

  return <PreviewCard previewImageUrl={previewImageUrl} meta={meta} actions={actions} />
}

export default TemplateCard
