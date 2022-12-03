import { Input } from 'reactstrap';
import { useFormik } from 'formik';
import { loginInitialValues, loginValidationSchema } from './login.schema';
import ErrorComponent from '../../../components/React/Form/ErrorComponent';
import { useLoginQuery } from './login.query';
import Button from '../../../components/React/Form/Button/Button';

interface Props {
  page: 'login' | 'signup';
}

const Login: FunctionComponent<Props> = ({ page }) => {
  const mutation = useLoginQuery(page);

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (data) => mutation.mutate(data)
  });

  return (
    <section className="vh-100 vw-100" style={{ backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <h4 className="mb-2 text-primary">Patient Management System</h4>
                <h3 className="mb-5">{page === 'login' ? 'Login' : 'Signup'}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group text-start mb-4">
                    <Input
                      size={'lg' as any}
                      type="email"
                      placeholder={'Email'}
                      name={'email'}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorComponent touched={touched} error={errors} name={'email'} />
                  </div>
                  <div className="form-group text-start mb-4">
                    <Input
                      size={'lg' as any}
                      type="password"
                      placeholder={'Password'}
                      name={'password'}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorComponent touched={touched} error={errors} name={'password'} />
                  </div>
                  <Button
                    loading={mutation.isLoading}
                    color={'primary'}
                    size={'lg'}
                    className="w-100"
                    type="submit">
                    {page === 'login' ? 'Login' : 'Signup'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
