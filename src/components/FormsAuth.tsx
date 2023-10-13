import { FormsAuthProps } from "../interface/props";
import { useState, MouseEvent } from "react";



export const FormsAuth = ({onLogin, onRegister}: FormsAuthProps) => {
  const [login, setLogin] = useState({email: '', pass: ''});
  const [register, setRegister] = useState({email: '', pass: ''});

  const onLoginHandler = (e: MouseEvent) => {
    e.preventDefault();
    onLogin(login);
    setLogin({email: '', pass: ''});
  }

  const onRegisterHandler = (e: MouseEvent) => {
    e.preventDefault();
    onRegister(register);
    setRegister({email: '', pass: ''});
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
            onChange={(e) => setLogin(prev => ({ ...prev, pass: e.target.value }))}
            value={login.pass}
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
            onChange={(e) => setRegister(prev => ({ ...prev, pass: e.target.value }))}
            value={register.pass}
          />
          <input type="submit" value="Отправить" onClick={onRegisterHandler}/>
        </form> 
      </div>
    </div>
  )
}
