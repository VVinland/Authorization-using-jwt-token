import { useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm.jsx";
import { observer } from "mobx-react-lite";
import { Context } from "./index.js";
import PersonService from "./services/PersonService.js";

const App = observer(() => {
  const { person } = useContext(Context);
  const [persons, setPersons] = useState([]);

  const getAllPersons = async () => {
    try {
      const response = await PersonService.getAllPersons();
      // if(!Array.isArray(response.data)) throw new Error('Закончился accessToken');

      setPersons(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      person.checkIsAuth();
    }
  }, [])

  if (person.getIsLoading) {
    return (
      <div>Загрузка...</div>
    )
  }

  if (!person.getIsAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={() => getAllPersons()}>Вывести пользователей</button>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>{`Пользователь авторизован: ${person.personData.login}`}</h1>
      <button onClick={() => person.logout()}>Выйти</button>
      <div>
        <button onClick={() => getAllPersons()}>Вывести пользователей</button>
        {persons.map(item => {
          return <div key={item.id}>{item.login}</div>
        })}
      </div>
    </div>
  );
})

export default App;
