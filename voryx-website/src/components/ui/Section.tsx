import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'default' | 'dark' | 'gradient'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Section({ 
  children, 
  className, 
  background = 'default',
  padding = 'lg'
}: SectionProps) {
  const backgrounds = {
    default: '',
    dark: 'bg-voryx-gray/30',
    gradient: 'bg-gradient-to-r from-black to-voryx-gray'
  }
  
  const paddings = {
    sm: 'py-10 px-4',
    md: 'py-16 px-4', 
    lg: 'py-20 px-4',
    xl: 'py-32 px-4'
  }

  return (
    <section className={cn(backgrounds[background], paddings[padding], className)}>
      {children}
    </section>
  )
}
