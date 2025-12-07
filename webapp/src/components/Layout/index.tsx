import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { TaskManagerRoutes, TodoPageRoutes } from '../../lib/routes'
import './style.css'

export const Layout = () => {
  const location = useLocation()
  // Fix footer for the editing page (routes like /edit/:id)
  const isFooterFixed = location.pathname.startsWith('/edit/')
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="logo">Task Manager</div>
        <div className="actions">
          <NavLink to={TodoPageRoutes()} className="primary">
            + New
          </NavLink>
        </div>
      </header>

      <main className="layout-main">
        <aside className="layout-sidebar">
          <nav>
            <ul className="nav-list">
              <li>
                <NavLink
                  to={TaskManagerRoutes()}
                  className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={TodoPageRoutes()}
                  className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                >
                  To-Do
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <section className="layout-content">
          <Outlet />
        </section>
      </main>

      <footer className={`layout-footer ${isFooterFixed ? 'fixed' : ''}`}>
        © {new Date().getFullYear()} Task Manager
      </footer>
    </div>
  )
}
