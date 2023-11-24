import { GitlabLogo, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

  let currentYear = new Date().getFullYear()

  const { user } = useContext(AuthContext)

  let component: ReactNode

  if (user.token !== "") {

    component = (
      <div className="flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className='text-xl font-bold'>
            Blog Pessoal Generation | Copyright: {currentYear}
          </p>
          <p className='text-lg'>Acesse nossas redes sociais</p>
          <div className='flex gap-2'>
            <a target='_blank' href="https://www.linkedin.com/in/jair-gino-64b408264">
              <LinkedinLogo size={48} />
            </a>
            <a target='_blank' href="https://github.com/JairGino/">
              <GithubLogo size={48} />
            </a>
            <a target='_blank' href="https://github.com/JairGino/">
              <GitlabLogo size={48} />
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {component}
    </>
  )
}

export default Footer