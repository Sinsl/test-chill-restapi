import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { parsingCookie } from '../func/parsingCookie';

export const PrivatePage = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState(['']);

  // это должно быть context или toolkit
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      let set = false;
      const token = parsingCookie('auth-token');
      if(token) {
        const response = await fetch(
          import.meta.env.VITE_URL + '/users/current',
          {
            method: 'get',
            headers: {
              Authorization: `bearer ${token}`,
              'Content-Type': 'application/json'
            } 
          }
        )
        if(response.status !== 401){
          set = true;
        }      
      }
      if(set) {
        setMsg(['Вы успешно прошли авторизацию']);
      } else {
        setMsg(['Аутентификация не пройдена.', 'Вы будете перенаправлены на форму авторизации']);
        setTimeout(() => {
          navigate('/')
        }, 3000)
      }
      setAuth(set);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="private-page">
      {msg.map((str, i) => <p key={i} className='msg'>{str}</p>)}
      {auth && 
        <div>
          <p>Мы вынуждены отталкиваться от того, что глубокий уровень погружения является качественно новой ступенью укрепления моральных ценностей.</p>
          <p>Наше дело не так однозначно, как может показаться: выбранный нами инновационный путь требует от нас анализа прогресса профессионального сообщества.</p>
          <p>Как принято считать, акционеры крупнейших компаний и по сей день остаются уделом либералов, которые жаждут быть указаны как претенденты на роль ключевых факторов.</p>
        </div>
      }
    </div>
  )
}