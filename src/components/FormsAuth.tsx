import { FormsAuthProps } from "../interface/props";
import { useState, MouseEvent } from "react";



export const FormsAuth = ({onLogin, onRegister}: FormsAuthProps) => {
  const [login, setLogin] = useState({email: '', password: ''});
  const [register, setRegister] = useState({email: '', password: ''});

  const onLoginHandler = (e: MouseEvent) => {
    e.preventDefault();
    onLogin(login);
    setLogin({email: '', password: ''});
  }

  const onRegisterHandler = (e: MouseEvent) => {
    e.preventDefault();
    onRegister(register);
    setRegister({email: '', password: ''});
  }

  return (
    <div className="forms-panel">
      <div className="panel-left">
        <h4>Авторизация</h4>
        <form className="form-auth form-login">
          <input 
            type="email" 
            name="email" 
            onChange={(e) => setLogin(prev => ({ ...prev, email: e.target.value }))}
            value={login.email}
          />
          <input 
            type="password" 
            name="password" 
            onChange={(e) => setLogin(prev => ({ ...prev, password: e.target.value }))}
            value={login.password}
          />
          <input type="submit" value="Отправить" onClick={onLoginHandler}/>
        </form>        
      </div>
      <div className="panel-right">
        <h4>Регистрация</h4>
        <form className="form-auth form-register">
          <input 
            type="email" 
            name="email"
            onChange={(e) => setRegister(prev => ({ ...prev, email: e.target.value }))}
            value={register.email}
          />
          <input 
            type="password" 
            name="password"
            onChange={(e) => setRegister(prev => ({ ...prev, password: e.target.value }))}
            value={register.password}
          />
          <input type="submit" value="Отправить" onClick={onRegisterHandler}/>
        </form> 
      </div>
    </div>
  )
}
