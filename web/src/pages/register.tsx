import React from 'react'
import { Formik, Form } from 'formik'
import { Button } from '@chakra-ui/react'
import { Wrapper } from '../components/Wrapper'
import { RCInputField } from '../components/RCInputField'
import { useRegisterMutation } from '../generated/graphql'
import { toErrMap } from '../utils/toErrMap'
import { useRouter } from 'next/router'

interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper size="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values)
          if (response.data?.register.errors) {
            setErrors(toErrMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            router.push('/')
          }
        }}
      >
        {(props) => (
          <Form>
            <RCInputField name="username" label="Username" placeholder="Enter username" />

            <RCInputField name="password" label="Password" placeholder="Enter password" type="password" />

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Register
          </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}


export default Register