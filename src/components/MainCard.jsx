import styles from '../styles/MainCard.module.sass'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
function MainCard({data, getRepos}){
    const [repos, setRepos] = useState([])
    useEffect(() => {
        if(data !== ''){
            axios.get(`https://api.github.com/users/${data.login}/repos`)
            .then(res => setRepos(res.data))
            .catch(err => console.log('Не удалось найти репозитории', err))
        }
    }, [data])
    return (
        <>
        {data !== '' ?
            <div className={styles.card}>
                <img src={data.avatar_url}></img>
                <h2>{data.login}</h2>
                <div>
                    <h3>Репозитории</h3>
                    <ul>
                        {repos.map((rep, i) => {
                            return <li>
                                <a href="#" onClick={() => getRepos(rep.name)}>{i + 1}. {rep.name}</a>
                            </li> 
                        })}
                    </ul>
                </div>
            </div> : 
            <div className={styles.card}>
                <h1>Нет такого пользователя в GitHub</h1>
            </div>}
        </>
    )
}
export default MainCard