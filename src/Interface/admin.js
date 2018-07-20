import intercept from '../Store/filterToken';

export function login(data) {
  return intercept({
    url: '/api/login',
    method: 'post',
    data: data
  });
}

