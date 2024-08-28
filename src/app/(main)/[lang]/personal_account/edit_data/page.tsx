'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n-config';
import { updatePersonalData, updatePassword, updateEmail } from '@/app/actions';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
import styles from './EditData.module.css';

interface EditDataProps {
  params: {
    lang: Locale;
  };
}

type FormDataGroup = 'personalData' | 'newPassword' | 'newEmail';

interface FormData {
  personalData: {
    name: string;
    surname: string;
    phoneNumber: string;
    streetAndHouseNumber: string;
    city: string;
    postalCode: string;
  };
  newPassword: {
    password: string;
    confirmPassword: string;
  };
  newEmail: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const EditData: React.FC<EditDataProps> = ({ params }) => {
  console.log('Params: ', params);
  const [formData, setFormData] = useState<FormData>({
    personalData: {
      name: '',
      surname: '',
      phoneNumber: '',
      streetAndHouseNumber: '',
      city: '',
      postalCode: '',
    },
    newPassword: {
      password: '',
      confirmPassword: '',
    },
    newEmail: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [actionType, setActionType] = useState<string | null>(null);

  const handleChange = (group: FormDataGroup) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({
      ...prevData,
      [group]: {
        ...prevData[group],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const filterEmptyFields = (data: Record<string, string>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value.trim() !== '') {
        formData.append(key, value);
      }
    });
    console.log('Filtered form Data:', formData);
    return formData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (actionType) {
      case 'updatePersonalData':
        const filteredPersonalData = filterEmptyFields(formData.personalData);
        await updatePersonalData(filteredPersonalData);
        break;
      case 'updatePassword':
        const filteredPasswordData = filterEmptyFields(formData.newPassword);
        await updatePassword(filteredPasswordData);
        break;
      case 'updateEmail':
        const filteredEmailData = filterEmptyFields(formData.newEmail);
        await updateEmail(filteredEmailData);
        break;
      default:
        console.error('Unknown action type');
    }
  };

  return (
    <Form className={styles.editDataForm} onSubmit={handleSubmit}>
      <div className={styles.heading}>
        <h4 className={styles.formHeader}>Редагувати дані</h4>
        <Link className={styles.deleteAccount} href="/">
          Видалити акаунт
        </Link>
      </div>
      <div className={styles.personalDataContainerWithHeader}>
        <p className={styles.personalDataHeder}>Особисті дані</p>
        <div className={styles.personalDataContainer}>
          <div className={styles.personalData}>
            <Input
              placeholder="Імʼя"
              name="name"
              type="text"
              onChange={handleChange('personalData')}
            />
            <Input
              placeholder="Прізвище"
              name="surname"
              type="text"
              onChange={handleChange('personalData')}
            />
            <Input
              type="text"
              placeholder="Телефон"
              name="phoneNumber"
              onChange={handleChange('personalData')}
            />
            {/* <Input placeholder="Вулиця та номер будинку" />
          <Input placeholder="Місто" />
          <Input placeholder="Поштовий індекс" /> */}
          </div>
          <div className={styles.personalData}>
            <Input
              placeholder="Вулиця та номер будинку"
              name="streetAndHouseNumber"
              type="text"
              onChange={handleChange('personalData')}
            />
            <Input
              placeholder="Місто"
              name="city"
              type="text"
              onChange={handleChange('personalData')}
            />
            <Input
              placeholder="Поштовий індекс"
              name="postalCode"
              type="text"
              onChange={handleChange('personalData')}
            />
          </div>
        </div>
      </div>
      <div className={styles.mailingContainet}>
        <h6 className={styles.spam}>Розсилка</h6>
        <div className={styles.subscriptionContainer}>
          <p className={styles.subscription}>Підписатися на новини сайту?</p>
          <Checkbox text="Так" className={styles.checkbox} />
          <Checkbox text="Ні" className={styles.checkbox} />
        </div>
      </div>
      <Button
        className={styles.submitButton}
        text="Зберегти дані"
        type="submit"
        color="transparent"
        onClick={() => setActionType('updatePersonalData')}
      />
      {/* <Input type="submit" value="Зберегти дані" /> */}
      <br />
      <h6 className={styles.spam}>Змінити пароль</h6>
      <div className={styles.EditPassword}>
        <Input
          placeholder="Новий пароль"
          type="password"
          value={formData.newPassword.password}
          onChange={handleChange('newPassword')}
        />
        <Input
          placeholder="Повторити пароль"
          type="password"
          value={formData.newPassword.confirmPassword}
          onChange={handleChange('newPassword')}
        />
      </div>
      <Button
        className={styles.submitButton}
        text="Змінити пароль"
        type="submit"
        color="transparent"
        onClick={() => setActionType('updatePassword')}
      />
      <br />

      <h6 className={styles.spam}>Змінити імейл</h6>
      <div className={styles.EditEmailContainer}>
        <div className={styles.editEmail}>
          <Input
            placeholder="E-mail"
            type="email"
            value={formData.newEmail.email}
            onChange={handleChange('newEmail')}
          />
          <Input
            placeholder="Пароль"
            type="password"
            value={formData.newEmail.password}
            onChange={handleChange('newEmail')}
          />
          <Input
            placeholder="Повторити пароль"
            type="password"
            value={formData.newEmail.confirmPassword}
            onChange={handleChange('newEmail')}
          />
        </div>
        <p className={styles.emailChangeInfo}>
          Після того як натиснете кнопку "Змінити E-mail", необхідно підтвердити новий e-mail. Будь
          ласка, перевірте вашу поштову скриньку та перейдіть за посиланням у листі для завершення
          процесу верифікації. До тих пір ваш обліковий запис буде тимчасово недоступний. Дякуємо за
          розуміння та терпіння!
        </p>
      </div>
      <Button
        className={styles.submitButton}
        text="Змінити E-mail"
        color="transparent"
        type="submit"
        onClick={() => setActionType('updateEmail')}
      />
    </Form>
  );
};

export default EditData;
