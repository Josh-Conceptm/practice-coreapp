import type { SVGProps } from 'react'

/** Shown while the sidenav is collapsed (clicking it expands the rail). */
function PanelExpandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17.5 2.5C17.9602 2.5 18.3333 2.8731 18.3333 3.33333V16.6667C18.3333 17.1269 17.9602 17.5 17.5 17.5H2.49996C2.03973 17.5 1.66663 17.1269 1.66663 16.6667V3.33333C1.66663 2.8731 2.03973 2.5 2.49996 2.5H17.5ZM5.83329 4.16667H3.33329V15.8333H5.83329V4.16667ZM16.6666 4.16667H7.49996V15.8333H16.6666V4.16667Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default PanelExpandIcon
