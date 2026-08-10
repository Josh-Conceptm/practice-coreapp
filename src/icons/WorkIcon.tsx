import type { SVGProps } from 'react'

function WorkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M22.668 11.4168H19.3346V9.75016C19.3346 8.82516 18.593 8.0835 17.668 8.0835H14.3346C13.4096 8.0835 12.668 8.82516 12.668 9.75016V11.4168H9.33464C8.40964 11.4168 7.6763 12.1585 7.6763 13.0835L7.66797 22.2502C7.66797 23.1752 8.40964 23.9168 9.33464 23.9168H22.668C23.593 23.9168 24.3346 23.1752 24.3346 22.2502V13.0835C24.3346 12.1585 23.593 11.4168 22.668 11.4168ZM17.668 11.4168H14.3346V9.75016H17.668V11.4168Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default WorkIcon
