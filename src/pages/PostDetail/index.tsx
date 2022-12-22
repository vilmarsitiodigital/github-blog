import { useCallback, useEffect, useState } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { api } from '../../lib/axios'
import {
  NavButton,
  PostDetailCard,
  PostDetailContainer,
  PostDetailContent,
} from './styles'

interface IPostDetail {
  title: string
  comments: number
  createdAt: string
  githubUsername: string
  url: string
  body: string
}

export function PostDetail() {
  const [post, setPost] = useState<IPostDetail>({} as IPostDetail)
  const { id } = useParams()

  const fetchPost = useCallback(async () => {
    const response = await api.get(
      `/repos/vilmarsitiodigital/github-blog/issues/${id}`,
    )
    const {
      title,
      comments,
      created_at: createdAt,
      user,
      html_url: htmlUrl,
      body,
    } = response.data
    const newPostObj = {
      title,
      githubUsername: user.login,
      comments,
      createdAt: formatDistanceToNow(new Date(createdAt), {
        locale: ptBR,
        addSuffix: true,
      }),
      url: htmlUrl,
      body,
    }
    setPost(newPostObj)
  }, [id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <PostDetailContainer>
      <PostDetailCard>
        <header>
          <NavButton to="/" type="button">
            <i className="fa-solid fa-chevron-left"></i>
            Voltar
          </NavButton>
          <a href={post.url} target="_blank" rel="noreferrer">
            Ver no Github
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </header>
        <div>
          <h1>{post.title}</h1>
        </div>
        <footer>
          <span>
            <i className="fa-brands fa-github"></i>
            {post.githubUsername}
          </span>
          <span>
            <i className="fa-solid fa-calendar"></i>
            {post.createdAt}
          </span>
          <span>
            <i className="fa-solid fa-comment"></i>
            {post.comments} Comentários
          </span>
        </footer>
      </PostDetailCard>
      <PostDetailContent>
        <div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
      </PostDetailContent>
    </PostDetailContainer>
  )
}
