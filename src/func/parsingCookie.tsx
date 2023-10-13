export const parsingCookie = (name: string) => {
  const cookies = document.cookie;
  const arrCookies = cookies.split('; ');
  console.log(arrCookies)
  const authCookie = arrCookies.find(el => el.includes(name));
  if(authCookie) {
    return authCookie.split('=')[1];
  } else {
    return '';
  }
}