import { useContext, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const LoginForm = observer(() => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { person } = useContext(Context);
    return (
        <div>
            <input
                type="text"
                placeholder="login"
                value={login}
                onChange={event => setLogin(event.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            <button onClick={() => person.login(login, password)}>Авторизация</button>
            <button onClick={() => person.registration(login, password)}>Регистрация</button>
        </div>
    );
})

export default LoginForm;