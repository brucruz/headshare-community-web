import { useCallback } from 'react';
import { useFormik } from 'formik';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { AuthType, useAuth } from '../hooks/useAuth';
import {
  AuthHeaderContainer,
  AuthModalContainer,
  OtherAuthOptions,
  AuthForm,
  MultiStepContainer,
} from '../styles/components/AuthModal';
import Input from './Input';
import Modal from './Modal';
import { useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import Button from './Button';
import MultiStep from './Multistep';

interface RegisterVariables {
  name: string;
  surname?: string;
  email: string;
  password: string;
}

interface LoginVariables {
  email: string;
  password: string;
}

interface ForgotPasswordVariables {
  email: string;
}

interface AuthModalProps {}

const AuthModal: React.FC<AuthModalProps> = ({}) => {
  const { isAuthOpen, closeAuth, authType, changeAuthType } = useAuth();

  const router = useRouter();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const registerForm = useFormik<RegisterVariables>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required!'),
      surname: Yup.string(),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
      password: Yup.string()
        .min(6, 'Password must have at least 6 characters')
        .required('Password is required!'),
    }),
    onSubmit: async (values, { setErrors }) => {
      const response = await register({
        variables: {
          data: {
            name: values.name,
            surname: values.surname,
            email: values.email,
            password: values.password,
          },
        },
      });

      if (response.data?.register.errors) {
        setErrors(toErrorMap(response.data.register.errors));
      } else if (response.data?.register.user) {
        router.reload();
      }
    },
  });

  const loginForm = useFormik<LoginVariables>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
      password: Yup.string()
        .min(6, 'Password must have at least 6 characters')
        .required('Password is required!'),
    }),
    onSubmit: async (values, { setErrors }) => {
      const response = await login({
        variables: {
          loginData: {
            email: values.email,
            password: values.password,
          },
        },
      });

      if (response.data?.login.errors) {
        setErrors(toErrorMap(response.data.login.errors));
      } else if (response.data?.login.user) {
        router.reload();
      }
    },
  });

  const forgotPasswordForm = useFormik<ForgotPasswordVariables>({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    }),
    onSubmit: async (values, { setErrors }) => {
      console.log(values);
      // const response = await login({
      //   variables: {
      //     email: values.email,
      //     password: values.password,
      //   },
      // });

      // if (response.data?.login.errors) {
      //   setErrors(toErrorMap(response.data.login.errors));
      // } else if (response.data?.login.data) {
      //   const { user } = response.data.login.data;

      //   router.push('/');
      // }
    },
  });

  const authHeader = useCallback((type: AuthType) => {
    switch (type) {
      case 'register':
        return 'Faça seu cadastro';

      case 'forgotPassword':
        return 'Recupere sua senha';

      default:
        return 'Faça seu login';
    }
  }, []);

  const authForm = useCallback(
    (type: AuthType) => {
      switch (type) {
        case 'register':
          return (
            <AuthForm onSubmit={registerForm.handleSubmit}>
              <MultiStep submitText="Cadastrar">
                <MultiStepContainer>
                  <Input
                    id="name"
                    name="name"
                    label="Nome*"
                    placeholder="John"
                    value={registerForm.values.name}
                    onChange={e =>
                      registerForm.setValues(oldState => {
                        const { name, ...rest } = oldState;

                        return {
                          name: e.target.value,
                          ...rest,
                        };
                      })
                    }
                    error={
                      registerForm.touched.name && registerForm.errors.name
                    }
                  />

                  <Input
                    id="surname"
                    name="surname"
                    label="Sobrenome"
                    placeholder="Snow"
                    value={registerForm.values.surname || ''}
                    onChange={e =>
                      registerForm.setValues(oldState => {
                        const { surname, ...rest } = oldState;

                        return {
                          surname: e.target.value,
                          ...rest,
                        };
                      })
                    }
                    error={
                      registerForm.touched.surname &&
                      registerForm.errors.surname
                    }
                  />
                </MultiStepContainer>

                <MultiStepContainer>
                  <Input
                    id="email"
                    name="email"
                    label="E-mail*"
                    placeholder="john.snow@gmail.com"
                    value={registerForm.values.email}
                    onChange={e =>
                      registerForm.setValues(oldState => {
                        const { email, ...rest } = oldState;

                        return {
                          email: e.target.value,
                          ...rest,
                        };
                      })
                    }
                    error={
                      registerForm.touched.email && registerForm.errors.email
                    }
                  />

                  <Input
                    id="password"
                    name="password"
                    label="Senha*"
                    placeholder="******"
                    type="password"
                    value={registerForm.values.password}
                    onChange={e =>
                      registerForm.setValues(oldState => {
                        const { password, ...rest } = oldState;

                        return {
                          password: e.target.value,
                          ...rest,
                        };
                      })
                    }
                    error={
                      registerForm.touched.password &&
                      registerForm.errors.password
                    }
                  />
                </MultiStepContainer>
              </MultiStep>
            </AuthForm>
          );

        case 'forgotPassword':
          return (
            <AuthForm onSubmit={forgotPasswordForm.handleSubmit}>
              <Input
                id="email"
                name="email"
                label="E-mail"
                placeholder="john@gmail.com"
                value={forgotPasswordForm.values.email}
                onChange={e =>
                  forgotPasswordForm.setValues(oldState => {
                    const { email, ...rest } = oldState;

                    return {
                      email: e.target.value,
                      ...rest,
                    };
                  })
                }
                error={
                  forgotPasswordForm.touched.email &&
                  forgotPasswordForm.errors.email
                }
              />

              <Button text="Entrar" type="submit" stretch />
            </AuthForm>
          );

        default:
          return (
            <AuthForm onSubmit={loginForm.handleSubmit}>
              <Input
                id="email"
                name="email"
                label="E-mail"
                placeholder="john@gmail.com"
                value={loginForm.values.email}
                onChange={e =>
                  loginForm.setValues(oldState => {
                    const { email, ...rest } = oldState;

                    return {
                      email: e.target.value,
                      ...rest,
                    };
                  })
                }
                error={loginForm.touched.email && loginForm.errors.email}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Senha"
                placeholder="******"
                value={loginForm.values.password || ''}
                onChange={e =>
                  loginForm.setValues(oldState => {
                    const { password, ...rest } = oldState;

                    return {
                      password: e.target.value,
                      ...rest,
                    };
                  })
                }
                error={loginForm.touched.password && loginForm.errors.password}
              />

              <Button text="Entrar" type="submit" stretch />
            </AuthForm>
          );
      }
    },
    [loginForm, registerForm, forgotPasswordForm],
  );

  const otherAuthOptions = useCallback(
    (type: AuthType) => {
      switch (type) {
        case 'register':
          return (
            <OtherAuthOptions>
              <p>
                Já possui cadastro?{' '}
                <a onClick={() => changeAuthType('login')}>Entrar</a>
              </p>
            </OtherAuthOptions>
          );

        case 'forgotPassword':
          return (
            <OtherAuthOptions>
              <p>
                Voltar para o{' '}
                <a onClick={() => changeAuthType('login')}>Login</a>
              </p>
            </OtherAuthOptions>
          );

        default:
          return (
            <OtherAuthOptions>
              <p>
                Ainda não possui cadastro?{' '}
                <a onClick={() => changeAuthType('register')}>Cadastrar</a>
              </p>

              <p>
                <a onClick={() => changeAuthType('forgotPassword')}>
                  Esqueci minha senha
                </a>
              </p>
            </OtherAuthOptions>
          );
      }
    },
    [changeAuthType],
  );

  return (
    <Modal isOpen={isAuthOpen} setIsOpen={() => closeAuth()}>
      <AuthModalContainer>
        <AuthHeaderContainer>
          <button type="button" onClick={() => closeAuth()}>
            <MdClose />
          </button>

          <h2>{authHeader(authType)}</h2>
        </AuthHeaderContainer>

        {authForm(authType)}

        {otherAuthOptions(authType)}
      </AuthModalContainer>
    </Modal>
  );
};

export default AuthModal;
