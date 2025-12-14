import {draftMode} from 'next/headers'
import {redirect} from 'next/navigation'
import {NextRequest} from 'next/server'

export async function GET(request: NextRequest) {
  const draft = await draftMode()
  const {searchParams} = request.nextUrl
  const slug = searchParams.get('slug')
  
  // Enable draft mode
  draft.enable()
  
  // Redirect to the page
  if (slug) {
    redirect(`/${slug}`)
  }
  
  // Default to home if no slug provided
  redirect('/')
}

