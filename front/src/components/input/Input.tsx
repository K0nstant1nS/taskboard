import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';

type TProps = {
  placeholder?: string;
  error?: string;
  extraClass?: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  name: string;
};

function Input({ placeholder, error, extraClass, register, name, registerOptions }: TProps) {

  return ( <div className={`${styles.container} ${extraClass}`}>
    <input className={styles.input} type="text" placeholder={placeholder} {...register(name, registerOptions)}  />
    <p className={styles.error}>{error}</p>
  </div> );
}

export default Input;
