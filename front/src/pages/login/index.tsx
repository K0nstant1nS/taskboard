import { useForm } from 'react-hook-form';
import Input from '../../components/input/Input';
import styles from './styles.module.scss';

type TLoginForm = {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({mode: 'onChange'});
  return ( <div className={styles.container}>
    <div>
      <h1>Привет друг, представишься?</h1>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Input name='email' register={register} placeholder='Email' error={errors.email?.message} />
        <Input name='password' register={register} placeholder='Пароль' error={errors.password?.message} />
        <button type='submit'>Войти</button>
      </form>

      <p>Нет аккаунта? <a href='/registration'>Зарегистрироваться</a></p>
    </div>
  </div> );
}

export default Login;
