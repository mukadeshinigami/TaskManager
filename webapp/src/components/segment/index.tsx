import PropTypes from 'prop-types'
import css from './index.module.scss'

export const Segment = ({ title, size, description, children }) => {
  return (
    <div className={css.segment}>
      {size === 1 ? <h1 className={css.title}>{title}</h1> : <h2 className={css.title}>{title}</h2>}
      {description && <p className={css.description}>{description}</p>}
      <div className={css.content}>{children}</div>
    </div>
  )
}

Segment.propTypes = {
  title: PropTypes.node.isRequired, // React.ReactNode
  size: PropTypes.oneOf([1, 2]), // 1 | 2 (optional)
  description: PropTypes.string, // optional string
  children: PropTypes.node.isRequired, // React.ReactNode
}
