import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { IPost } from '..'
import { formatText } from '../../../utils/formatText'
import { PostCardContainer } from './styles'

interface IPostCard {
  post: IPost
}

export function PostCard({ post }: IPostCard) {
  const { created_at: createdAt, body, title, number } = post
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    locale: ptBR,
    addSuffix: true,
  })
  return (
    <PostCardContainer to={`/${number}`}>
      <header>
        <h1>{title}</h1>
        <span>{formattedDate}</span>
      </header>
      <main>
        <p>{formatText(body, 80)}</p>
      </main>
    </PostCardContainer>
  )
}
