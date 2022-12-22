import { useCallback, useEffect, useState } from 'react'
import { PersonInfoContainer } from './styles'

import { api } from '../../../lib/axios'

interface IUserInfo {
  name: string
  followers: number
  githubUsername: string
  company: string
  url: string
  imgUrl: string
  description: string
}

export function PersonInfo() {
  const [userInfo, setUserInfo] = useState<IUserInfo>()

  const fetchUsers = useCallback(async () => {
    const response = await api.get('users/vilmarsitiodigital')
    const {
      name,
      followers,
      login,
      company,
      html_url: htmlUrl,
      avatar_url: avatarUrl,
      bio,
    } = response.data
    const newUserObj = {
      name,
      followers,
      githubUsername: login,
      company,
      url: htmlUrl,
      imgUrl: avatarUrl,
      description: bio,
    }
    setUserInfo(newUserObj)
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <PersonInfoContainer>
      <img width={148} height={148} src={userInfo?.imgUrl} alt="Person Photo" />
      <div>
        <header>
          <h1>{userInfo?.name}</h1>
          <a href={userInfo?.url} target="_blank" rel="noreferrer">
            GITHUB <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </header>
        <main>
          <p>{userInfo?.description}</p>
        </main>
        <footer>
          <span>
            <i className="fa-brands fa-github"></i>
            {userInfo?.githubUsername}
          </span>
          <span>
            <i className="fa-solid fa-building"></i>
            {userInfo?.company}
          </span>
          <span>
            <i className="fa-solid fa-user-group"></i>
            {userInfo?.followers} Followers
          </span>
        </footer>
      </div>
    </PersonInfoContainer>
  )
}
