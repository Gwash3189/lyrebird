import React from 'react'
import clsx from 'clsx'
import { GiGoose } from 'react-icons/gi'

type Sizes = 'large' | 'small'

export function Logo ({ className = '', size = 'large' }: { className?: string, size?: Sizes }) {
  switch (size) {
  case 'small':
    return (
      <GiGoose className={clsx('w-full h-14 text-purple-400', className)}/>
    )
  default:
    return (
      <GiGoose className={clsx('w-full h-20 text-purple-400', className)}/>
    )
  }
}
