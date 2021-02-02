import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';

import { useState } from 'react';
import PageTitleTemplate from '../components/templates/PageTitleTemplate';
import { Community, User, useRegisterMutation } from '../generated/graphql';
import Button from '../components/Button';
import { RegisterForm } from '../styles/pages/Register';
import { toErrorMap } from '../utils/toErrorMap';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

// interface RegisterProps {}

const Register: React.FC = () => {
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

  const [register] = useRegisterMutation();

  const formik = useFormik<RegisterInput>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const response = await register({
        variables: {
          data: values,
        },
      });

      if (response.data?.register.errors) {
        setErrors(toErrorMap(response.data.register.errors));
      } else if (response.data?.register.data) {
        const { user } = response.data.register.data;

        router.push('/');
      }
    },
  });

  return (
    <>
      <PageTitleTemplate
        title="Faça seu cadastro"
        community={{
          title: community ? community.title : 'Headshare',
          slug: community ? community.slug : '',
          creator: {
            name: community ? community.creator.name : 'Headshare',
            surname: community ? community.creator.surname : '',
          },
        }}
      >
        <RegisterForm onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            name="name"
            label="Nome"
            placeholder="João"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
          <Button text="Cadastrar" type="submit" />
        </RegisterForm>
      </PageTitleTemplate>
    </>
  );
};

export default Register;
