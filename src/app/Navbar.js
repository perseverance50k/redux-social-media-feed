import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationsSlice'
import { useEffect, useState } from 'react'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const [numOfUnreadNotification, setNumOfUnreadNotifications] = useState(0)

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  const unreadNotificationsBadge =
    numOfUnreadNotification > 0 ? (
      <span className="badge">{numOfUnreadNotification}</span>
    ) : (
      ''
    )

  useEffect(() => {
    setNumOfUnreadNotifications(
      notifications.filter((notification) => !notification.read).length,
    )
  })

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
        </div>
        <br />
        <button className="button" onClick={fetchNewNotifications}>
          Refresh Notifications
        </button>
      </section>
    </nav>
  )
}
