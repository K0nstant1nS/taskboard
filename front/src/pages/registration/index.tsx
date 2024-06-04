import { useForm } from 'react-hook-form';
import Input from '../../components/input/Input';
import styles from './styles.module.scss';
import { registrationAPI } from '../../API/auth/registration';
import { useNavigate } from 'react-router';

type TRegistrationForm = {
  email: string;
  password: string;
  name: string;
}

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegistrationForm>({mode: 'onChange'});

  const navigate = useNavigate();

  const onSubmit = (data: TRegistrationForm) => registrationAPI(data).then(() => navigate('/'));
  return ( <div className={styles.container}>
    <div>
      <h1>Привет друг, представишься?</h1>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Input name='email' register={register} placeholder='Email' error={errors.email?.message} />
        <Input name='password' register={register} placeholder='Пароль' error={errors.password?.message} />
        <Input name='name' register={register} placeholder='Имя' error={errors.name?.message} />
        <button type='submit'>Войти</button>
      </form>

      <p>Есть аккаунт? <a href='/'>Войти</a></p>
    </div>
  </div> );
}

export default Registration;
