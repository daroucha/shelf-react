import { styled } from 'goober'
import { $space } from 'remaster-ui'

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: inherit;
`

const FormFields = styled('div')`
  display: inherit;
  flex-direction: inherit;
  gap: ${$space.gap.xxl};
`

const FormActions = styled('div')`
  display: inherit;
  flex-direction: inherit;
  gap: ${$space.gap.lg};
`

interface PropsLoginForm {
  children: React.ReactNode
  onSubmit: (event: React.FormEvent) => void
}

function LoginForm({ children, onSubmit }: PropsLoginForm) {
  return <Form onSubmit={onSubmit}>{children}</Form>
}

LoginForm.Fields = FormFields
LoginForm.Actions = FormActions

export default LoginForm
