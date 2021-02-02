import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useRouter } from 'next/router';

import PageTitleTemplate from '../components/templates/PageTitleTemplate';
import { useLoginMutation, Community, User } from '../generated/graphql';
import Button from '../components/Button';
import { RegisterForm } from '../styles/pages/Register';
import { toErrorMap } from '../utils/toErrorMap';

interface LoginInput {
  email: string;
  password: string;
}

// interface LoginProps {}

const Login: React.FC = () => {
  const [community, setCommunity] = useState<
    | ({ __typename?: 'Community' } & Pick<
        Community,
        | '_id'
        | 'logo'
        | 'title'
        | 'slug'
        | 'description'
        | 'followersCount'
        | 'membersCount'
      > & { creator: { __typename?: 'User' } & Pick<User, 'name' | 'surname'> })
    | undefined
    | null
  >(null);

  const router = useRouter();

  const [login] = useLoginMutation();

  const formik = useFormik<LoginInput>({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const response = await login({
        variables: {
          loginData: values,
        },
      });

      if (response.data?.login.errors) {
        setErrors(toErrorMap(response.data.login.errors));
      } else if (response.data?.login.data) {
        const { user } = response.data.login.data;

        router.push('/');
      }
    },
  });

  return (
    <>
      <PageTitleTemplate
        title="Faça seu login"
        community={{
          title: community ? community.title : 'Headshare',
          creator: {
            name: community ? community.creator.name : 'Headshare',
            surname: community ? community.creator.surname : '',
          },
          slug: community ? community.slug : '',
        }}
      >
        <RegisterForm onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="E-mail"
            placeholder="joao@exemplo.com"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            placeholder="******"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button text="Entrar" type="submit" />
        </RegisterForm>
      </PageTitleTemplate>
    </>
  );
};

export default Login;
