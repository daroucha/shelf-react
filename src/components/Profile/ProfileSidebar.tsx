import { Avatar, ListComponent } from 'remaster-ui'
import ViewSidebar, {
  ViewSidebarContent,
  ViewSidebarNavigation,
  ViewSidebarTitle,
} from '../Common/ViewSidebar'
import ProfileTitle from './ProfileTitle'
import ProfileText from './ProfileText'
import { User, UserCircle } from '@phosphor-icons/react'

interface PropsProfileSidebar {
  avatar?: string
  children: React.ReactNode
  title?: string
  text?: string
}

function ProfileSidebar({
  avatar,
  children,
  title,
  text,
}: PropsProfileSidebar) {
  return (
    <ViewSidebar>
      <Avatar
        size={186}
        icon={<UserCircle weight="fill" />}
        src={avatar}
      />

      <ViewSidebarContent>
        <ViewSidebarTitle>
          <div>
            <ProfileTitle>{title}</ProfileTitle>

            <ProfileText>{text}</ProfileText>
          </div>

          <ListComponent leading={<User />} title="32 seguidores" />
        </ViewSidebarTitle>

        <ViewSidebarNavigation>{children}</ViewSidebarNavigation>
      </ViewSidebarContent>
    </ViewSidebar>
  )
}

export default ProfileSidebar
