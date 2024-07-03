import { NavigationLink, SectionTitle } from 'remaster-ui'
import ProfileWrapper from '../../components/Profile/ProfileWrapper'
import { SignOut, UserCircle } from '@phosphor-icons/react'
import Divider from '../../components/Common/Divider'
import ProfileSidebar from '../../components/Profile/ProfileSidebar'
import ProfileContent from '../../components/Profile/ProfileContent'
import ProfileSection from '../../components/Profile/ProfileSection'
import ProfileFormBox from '../../components/Profile/ProfileFormBox'
import ProfileList from '../../components/Profile/ProfileList'
import { useUser } from '../../hooks/useUser'
import ProfileAvatarFile from '../../features/Profile/ProfileAvatarFile'
import AccountContext from '../../contexts/Profile/AccountContext'
import ProfileCollectionDelete from '../../features/Profile/ProfileCollectionDelete'
import ProfileCollectionStatus from '../../features/Profile/ProfileCollectionStatus'
import ProfileData from '../../features/Profile/ProfileData'
import { useState } from 'react'

function Profile() {
  const { user } = useUser()

  const [name, setName] = useState(user?.name || '')
  const [picture, setPicture] = useState(user?.picture || '')

  if (!user) {
    return
  }

  const value = {
    name,
    picture,
    email: user.email,
    bio: user?.bio,
    location: user?.location,
    setName,
    setPicture,
  }

  return (
    <AccountContext.Provider value={value}>
      <ProfileWrapper>
        <ProfileSidebar
          title={name}
          text="-- títulos"
          avatar={picture}
          followers="-- seguidores"
        >
          <NavigationLink
            className="stretch"
            size="small"
            text="Conta"
            leading={<UserCircle />}
            active={true}
          />

          <Divider />

          <NavigationLink
            className="stretch"
            size="small"
            text="Sair"
            leading={<SignOut />}
          />
        </ProfileSidebar>

        <ProfileContent>
          <ProfileSection>
            <SectionTitle text="Perfil" />

            <ProfileFormBox>
              <ProfileData />

              <ProfileAvatarFile />
            </ProfileFormBox>
          </ProfileSection>

          <ProfileSection>
            <SectionTitle text="Ações sensíveis" />

            <ProfileList>
              <ProfileCollectionStatus />

              <ProfileCollectionDelete />
            </ProfileList>
          </ProfileSection>
        </ProfileContent>
      </ProfileWrapper>
    </AccountContext.Provider>
  )
}

export default Profile
