import './App.module.sass'
import HeaderSearch from './components/HeaderSearch'
import MainCard from './components/MainCard'
import {useState, useEffect} from 'react'
import axios from 'axios'
function App() {
  const [searchName, setSearchName] = useState(null);
  const [data, setData] = useState('');
  function searchFunc(data){
    setSearchName(data)
  }
  useEffect(() => {
    if(searchName){
      const users = axios.get(` https://api.github.com/users/${searchName}`)
      .then(res => setData(res.data))
      .catch(err => console.log('Не удалось найти пользователя', err))
    }
  }, [searchName])
  return (
    <div className="App">
      <header>
        <HeaderSearch searchFunc={searchFunc}/>
      </header>
      {data && <main>
        <MainCard data={data}/>
      </main>}
    </div>
  );
}

export default App;
