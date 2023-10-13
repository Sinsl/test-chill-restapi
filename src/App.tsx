import { useState } from 'react'
import { FormsAuth } from './components/FormsAuth'
import { DataUserAuth, optionRequest, TokenParse} from './interface/props';
import './App.css'
import { Link } from 'react-router-dom';
import { parsingCookie } from './func/parsingCookie';
import jwt_decode from "jwt-decode";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [tkn, setTkn] = useState({iat: 0, user: {id: '', email: ''}});

  const requestFunc = async (url: string, opt: optionRequest) => {
    const baseUrl = import.meta.env.VITE_URL + '/users';
    const option: RequestInit = {
      // В случае, если используются сессии
      // credentials: "include",
      // mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...opt.headers
      },
      ...opt
    }
    const response = await fetch(baseUrl + url, option)
    console.log(response)
    response.status === 401 ? setIsAuth(false) : setIsAuth(true);
    const data = await response.json();
    if (url === '/current' && response.status !== 401) {
      console.log(data)
    }
    if (url === '/login') {
      document.cookie = 'auth-token=' + data.token + '; max-age=3600';
    }
    console.log(data);
  }

  const onLoginHandler = (data: DataUserAuth) => {
    requestFunc('/login', 
    {
      method: 'post',
      body: JSON.stringify(data)
    });
  }

  const onRegisterHandler = (data: DataUserAuth) => {
    requestFunc('/register',
    {
      method: 'post',
      body: JSON.stringify(data)
    }
    );
  }

  const logoutHandler = () => {
    const token = parsingCookie('auth-token');
    document.cookie = 'auth-token=' + token + '; max-age=-1';
    onParsing();
  }

  const isAuthHandler = () => {
    const token = parsingCookie('auth-token');
    requestFunc('/current', 
    {
      method: 'get',
      headers: {
        Authorization: `bearer ${token}`
      }      
    });
  }

  const onParsing = () => {
    const token = parsingCookie('auth-token');
    console.log(token)
    if (token) {
      const decoder: TokenParse = jwt_decode(token);
      setTkn(decoder)
    } else {
      setTkn({iat: 0, user: {id: '', email: ''}});
      setIsAuth(false);
    }    
  }

  return (
    <div className='main'>
      <h1>Интерфейс для тестов авторизации</h1>
      <FormsAuth onLogin={onLoginHandler} onRegister={onRegisterHandler}/>
      <div className='btns-panel'>
        <div className="panel-left">
          <div className='btn logout' onClick={logoutHandler}>Выход</div>
          <div className='btn get-auth' onClick={isAuthHandler}>Запрос аутентификации</div>
          <div className='get-auth-answer'>{String(isAuth)}</div>
        </div>      
        <div className="panel-right">
          <Link className='btn' to='/private'>Переход на приватный роут /private</Link>
          <div className='btn get-auth' onClick={onParsing}>Распарсить токен</div>
          {(tkn.iat > 0) &&
            <div>
              <p>iat: {tkn.iat}</p>
              <p>user:</p>
                <p>id: {tkn.user.id}</p>
                <p>email: {tkn.user.email}</p>
            </div>
          }
        </div>
      </div>      
    </div>
  )
}

export default App
