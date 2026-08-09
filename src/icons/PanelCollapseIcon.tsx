import type { SVGProps } from 'react'

/** Shown while the sidenav is open (clicking it collapses the rail). */
function PanelCollapseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17.5001 2.5C17.9603 2.5 18.3334 2.8731 18.3334 3.33333V16.6667C18.3334 17.1269 17.9603 17.5 17.5001 17.5H7.50008V2.5H17.5001ZM5.83341 17.5H2.50008C2.03985 17.5 1.66675 17.1269 1.66675 16.6667V3.33333C1.66675 2.8731 2.03985 2.5 2.50008 2.5H5.83341V17.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default PanelCollapseIcon
