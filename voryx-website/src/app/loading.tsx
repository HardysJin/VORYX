'use client'

import Loading from '@/components/ui/Loading'

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-voryx-dark flex items-center justify-center">
      <Loading message="Preparing expedition..." />
    </div>
  )
}
