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

type PolymorphicAsProp<E extends React.ElementType> = {
  as?: E
}

interface PropsLoginForm
  extends PolymorphicAsProp<React.ElementType> {
  children: React.ReactNode
  onSubmit?: (event: React.FormEvent) => void
}

function LoginForm({ as, children, onSubmit }: PropsLoginForm) {
  return (
    <Form as={as} onSubmit={onSubmit}>
      {children}
    </Form>
  )
}

LoginForm.Fields = FormFields
LoginForm.Actions = FormActions

export default LoginForm
