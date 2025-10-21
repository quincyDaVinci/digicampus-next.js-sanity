'use client'

import {QueryResponseInitial, useQuery} from '@sanity/react-loader'
import {PageRenderer} from '@/components/pageBuilder'
import type {PageDocument} from '@/types/pageBuilder'

type PagePreviewProps = {
  initial: QueryResponseInitial<PageDocument | null>
  query: string
  params: {slug: string}
}

export function PagePreview({initial, query, params}: PagePreviewProps) {
  const {data} = useQuery<PageDocument | null>(query, params, {initial})
  
  if (!data) {
    return <div className="p-6">Page not found in preview</div>
  }
  
  return <PageRenderer page={data} />
}
