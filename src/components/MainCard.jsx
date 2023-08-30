import styles from '../styles/MainCard.module.sass'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
function MainCard({data}){
    const [repos, setRepos] = useState([])
    const [reposURL, setReposURL] = useState(null)
    // function findURL(e){
    //     e.preventDefault();
    //     setReposURL()
    // }
    useEffect(() => {
        if(data){
            axios.get(`https://api.github.com/users/${data.login}/repos`)
            .then(res => setRepos(res.data))
            .catch(err => console.log('Не удалось найти репозитории', err))
        }
    }, [data])
    useEffect(() => {
        if(reposURL){
            axios.get(`https://api.github.com/repos/${data.login}/${reposURL}/readme`)
            .then(res => setReposURL(res.data))
            .catch(err => console.log('Не удалось прочитать репозиторий', err))
        }
    })
    console.log(repos)
    return (
    <div className={styles.card}>
        <img src={data.avatar_url}></img>
        <h2>{data.login}</h2>
        <h2>Repositories</h2>
        {repos.map((rep, index)=> {
            return <p key={index}><a href={reposURL} onClick={(e) =>{e.preventDefault(); setReposURL(rep.name);}}>{index + 1}. {rep.name}</a></p>
        })}
    </div>
    )
}
export default MainCard