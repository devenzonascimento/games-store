import React from 'react'

export function Logo(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width={77}
      height={20}
      viewBox="0 0 77 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>logo</title>
      <g clipPath="url(#clip0_19_90)">
        <path
          d="M5 9.167h3.333M6.667 7.5v3.333M12.5 10h.008M15 8.333h.008m-.575-4.166H5.567a3.333 3.333 0 00-3.315 2.991l-.014.127c-.068.562-.571 4.762-.571 6.048a2.5 2.5 0 002.5 2.5c.833 0 1.25-.416 1.666-.833l1.179-1.178a1.666 1.666 0 011.178-.489h3.62c.442 0 .866.176 1.178.489L14.167 15c.416.417.833.833 1.666.833a2.5 2.5 0 002.5-2.5c0-1.287-.503-5.486-.57-6.048l-.015-.126a3.334 3.334 0 00-3.315-2.992z"
          stroke="#fff"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g clipPath="url(#clip1_19_90)" fill="#fff">
          <path d="M63.88 3.505h10.974V5.59H70.5v10.966h-2.177V5.59H63.88V3.505zM45.833 3.505V5.59h-8.796v3.353h7.074v2.085h-7.074v3.443h8.796v2.085H34.861V5.59h-.001V3.505h10.973zM51.313 3.51h-2.849l10.203 13.051h2.856l-5.102-6.52 5.094-6.52-2.848.004-3.672 4.693-3.682-4.707zM54.236 12.833l-1.427-1.825-4.353 5.563h2.857l2.922-3.738z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M34.937 16.556L24.72 3.5H22v13.05h2.177V6.29l8.026 10.266h2.734z"
          />
        </g>
      </g>
    </svg>
  )
}
