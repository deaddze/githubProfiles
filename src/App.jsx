import styles from './App.module.sass'
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
  const [isLoading, setIsLoading] = useState(false)
  function getRepos(name){
    setHidden(false)
    setOneRepos(name)
  }
  useEffect(() => {
    if(searchName){
      (async() => {
        try{
          setIsLoading(true)
          const res =  await axios.get(`https://api.github.com/users/${searchName}`);
          setData(res.data); setIsLoading(false)
        }catch(err){
          console.log('Не удалось найти пользователя', err); setData(''); setIsLoading(false)
        }
      })();
    }
  }, [searchName]);

  useEffect(() => {
    if(oneRepos){
      (async() => {
        try{
          const res = await axios.get(`https://api.github.com/repos/${searchName}/${oneRepos}/readme`)
          const base64Content = res.data.content;
          const decodedContent = atob(base64Content); 
          setDecoded(decodedContent)
        }catch(err){
          console.log('Не удалось взять readme', err); setDecoded('Нет readme репозитория')
        }
      })()
    }
  }, [oneRepos])
  return (
    <div className={styles.app}>
      <HeaderSearch setSearchName={setSearchName}/>
      {isLoading && <h1 style={{"text-align": 'center', "margin-top": '50px'}}>Загрузка...</h1>}
      {hidden && searchName && <MainCard data={data} getRepos={getRepos}/>}
      {!hidden &&
        <ReadmeContent rep={oneRepos} decoded={decoded} setHidden={setHidden}/>
        }
    </div>
  );
}

export default App;

