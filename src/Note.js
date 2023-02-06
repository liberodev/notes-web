export const Note = (props) => {
  const { content, date } = props

  return (
    <li>
      <p>{content}</p>
      <small>{date}</small>
    </li>
  )
}
