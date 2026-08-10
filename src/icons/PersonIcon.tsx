import type { SVGProps } from 'react'

function PersonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.9987 16.0002C17.8404 16.0002 19.332 14.5085 19.332 12.6668C19.332 10.8252 17.8404 9.3335 15.9987 9.3335C14.157 9.3335 12.6654 10.8252 12.6654 12.6668C12.6654 14.5085 14.157 16.0002 15.9987 16.0002ZM15.9987 17.6668C13.7737 17.6668 9.33203 18.7835 9.33203 21.0002V22.6668H22.6654V21.0002C22.6654 18.7835 18.2237 17.6668 15.9987 17.6668Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default PersonIcon
