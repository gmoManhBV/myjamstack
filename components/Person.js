import Link from 'next/link'
import styled from 'styled-components'
const RedLink = styled.a`
  color: red;
`

export default function Person({ person }) {
  return (
    <li>
      <Link href="/person/[id]" as={`/person/${person.id}`}>
        <RedLink href="/person/[id]">
          {person.name}
        </RedLink>
      </Link>
    </li>
  )
}