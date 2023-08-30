import styles from '../styles/MainCard.module.sass'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
function MainCard({data}){
    const [repos, setRepos] = useState([])
    const [reposName, setReposName] = useState('')
    // const [url, setUrl] = useState('')
    // function findUrl(e, name){
    //     e.preventDefault();
    //     setReposName(name)
    // }
    useEffect(() => {
        if(data){
            axios.get(`https://api.github.com/users/${data.login}/repos`)
            .then(res => setRepos(res.data))
            .catch(err => console.log('Не удалось найти репозитории', err))
        }
    }, [data])
    useEffect(() => {
        if(reposName){
            axios.get(`https://api.github.com/repos/${data.login}/${reposName}/contents/README.md`)
            .then(res => {
                const base64Content = res.data.content;
                const decodedContent = atob(base64Content);
                // setReadmeContent(decodedContent);
            })
            .catch(err => console.log('Не удалось прочитать репозиторий', err))
        }
    }, [reposName])
    console.log(repos)
    return (
    <div className={styles.card}>
        <img src={data.avatar_url}></img>
        <h2>{data.login}</h2>
        <div>
            <h3>Репозитории</h3>
            <ul>
                {repos.map((rep, i) => {
                    return <li>
                        <a href={`https://api.github.com/repos/${data.login}/${rep.name}/readme`} key={i}>{i + 1}. {rep.name}</a>
                    </li>
                })}
            </ul>
        </div>
    </div>
    )
}
export default MainCard