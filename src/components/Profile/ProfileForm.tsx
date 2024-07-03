import { styled } from 'goober'
import { $space } from 'remaster-ui'

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: ${$space.gap.xxl};
  width: 30svw;
`

const FormFields = styled('div')`
  display: inherit;
  flex-direction: inherit;
  gap: inherit;
`

const FormActions = styled('div')`
  align-items: center;
  display: inherit;
  flex-direction: row;
  justify-content: flex-start;
  gap: ${$space.gap.lg};
`

interface PropsProfileForm {
  children: React.ReactNode
  onSubmit: (event: React.FormEvent) => void
}

function ProfileForm({ children, onSubmit }: PropsProfileForm) {
  return <Form onSubmit={onSubmit}>{children}</Form>
}

ProfileForm.Fields = FormFields
ProfileForm.Actions = FormActions

export default ProfileForm
