import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    // console.log(email, password);

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    // console.log(response.data);

    const { token, user } = response.data;

    if (!user.admin) {
      toast.error('Usuário não é administrador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/order');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados!');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      admin: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
