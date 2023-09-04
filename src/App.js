import './App.module.sass'
import HeaderSearch from './components/HeaderSearch'
import MainCard from './components/MainCard'
import ReadmeContent from './components/ReadmeContent'
import {useState, useEffect} from 'react'
import axios from 'axios'
function App() {
  const [searchName, setSearchName] = useState(null);
  const [data, setData] = useState('');
  const [hidden, setHidden] = useState(true)
  const [oneRepos, setOneRepos] = useState(null)
  const [decoded, setDecoded] = useState('')
  function isHidden(){
    setHidden(true)
  }
  function searchFunc(data){
    setSearchName(data)
  }

  function getRepos(name){
    setHidden(false)
    setOneRepos(name)
  }

  useEffect(() => {
    if(searchName){
      axios.get(` https://api.github.com/users/${searchName}`)
      .then(res => setData(res.data))
      .catch(err => console.log('Не удалось найти пользователя', err), setData(''))
    }
  }, [searchName]);

  useEffect(() => {
    if(!hidden && oneRepos){
      axios.get(`https://api.github.com/repos/${searchName}/${oneRepos}/readme`)
      .then(res =>{
        const base64Content = res.data.content;
        const decodedContent = atob(base64Content); 
        setDecoded(decodedContent)
      })
      .catch(err => console.log('Не удалось взять readme', err), setDecoded('Нет readme репозитория'))
    }
  }, [oneRepos, hidden])

  return (
    <div className="App">
      <header>
        <HeaderSearch searchFunc={searchFunc}/>
      </header>
      {hidden && data && searchName? <main> <MainCard data={data} getRepos={getRepos}/></main>
      : (data === '' && searchName ? <h1>Не удалось найти пользователя</h1> : '')}
      {!hidden && <main>
        <ReadmeContent rep={oneRepos} decoded={decoded} isHidden={isHidden}/>
        </main>}
    </div>
  );
}

export default App;

