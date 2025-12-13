import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { TaskManagerRoutes, TodoPageRoutes } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
  const location = useLocation()
  // Fix footer for the editing page (routes like /edit/:id)
  const isFooterFixed = location.pathname.startsWith('/edit/')
  return (
    <div className={css.layout}>
      <header className={css['layout-header']}>
        <div className={css.logo}>Task Manager</div>
        <div className={css.actions}>
          <NavLink to={TodoPageRoutes()} className={css.primary}>
            + New
          </NavLink>
        </div>
      </header>

      <main className={css['layout-main']}>
        <aside className={css['layout-sidebar']}>
          <nav className={css.nav}>
            <ul className={css['nav-list']}>
              <li>
                <NavLink
                  to={TaskManagerRoutes()}
                  className={({ isActive }) => (isActive ? css['nav-item-active'] : css['nav-item'])}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={TodoPageRoutes()}
                  className={({ isActive }) => (isActive ? css['nav-item-active'] : css['nav-item'])}
                >
                  To-Do
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <section className={css['layout-content']}>
          <Outlet />
        </section>
      </main>

      <footer className={`${css['layout-footer']} ${isFooterFixed ? css.fixed : ''}`}>
        © {new Date().getFullYear()} Task Manager
      </footer>
    </div>
  )
}
