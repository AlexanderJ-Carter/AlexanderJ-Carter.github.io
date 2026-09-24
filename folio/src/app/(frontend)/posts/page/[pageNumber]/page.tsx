import { redirect } from 'next/navigation'

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page(_args: Args) {
  redirect('/posts')
}
