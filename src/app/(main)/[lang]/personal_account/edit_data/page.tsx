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

const EditData: React.FC<EditDataProps> = ({ params }) => {
  console.log('Params: ', params);
  const [personalData, setPersonalData] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
    streetAndHouseNumber: '',
    city: '',
    postalCode: '',
  });

  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: '',
  });

  const [newEmail, setNewEmail] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [actionType, setActionType] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };
  return (
    <Form className={styles.editDataForm} action={updatePersonalData}>
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
              onChange={e => {
                handleChange(e);
              }}
            />
            <Input
              placeholder="Прізвище"
              name="surname"
              type="text"
              onChange={e => {
                handleChange(e);
              }}
            />
            <Input
              type="text"
              placeholder="Телефон"
              name="phoneNumber"
              onChange={e => {
                handleChange(e);
              }}
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
              onChange={e => {
                handleChange(e);
              }}
            />
            <Input
              placeholder="Місто"
              name="city"
              type="text"
              onChange={e => {
                handleChange(e);
              }}
            />
            <Input
              placeholder="Поштовий індекс"
              name="postalCode"
              type="text"
              onChange={e => {
                handleChange(e);
              }}
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
      />
      {/* <Input type="submit" value="Зберегти дані" /> */}
      <br />
      <h6 className={styles.spam}>Змінити пароль</h6>
      <div className={styles.EditPassword}>
        <Input placeholder="Новий пароль" type="password" />
        <Input placeholder="Повторити пароль" type="password" />
      </div>
      <Button
        className={styles.submitButton}
        text="Змінити пароль"
        type="submit"
        color="transparent"
        onClick={async () => {
          console.log('Clicked!');
        }}
      />
      <br />

      <h6 className={styles.spam}>Змінити імейл</h6>
      <div className={styles.EditEmailContainer}>
        <div className={styles.editEmail}>
          <Input placeholder="E-mail" type="email" />
          <Input placeholder="Пароль" type="password" />
          <Input placeholder="Повторити пароль" type="password" />
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
        onClick={async () => {
          console.log('Clicked!');
        }}
      />
    </Form>
  );
};

export default EditData;
