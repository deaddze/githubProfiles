import styles from '../styles/HeaderSearch.module.sass'
import {useRef, useEffect, useState} from 'react'
function HeaderSearch({setSearchName}){
    const inputRef = useRef();
    const [saveSearch, setSaveSearch] = useState([])
    function searchData(e){
        e.preventDefault()
        setSearchName(inputRef.current.value)
        setSaveSearch(prevState => [...prevState, inputRef.current.value])
        inputRef.current.value = '';
    }
    return (
    <div className={styles.header}>
        <h1>GitHub Search</h1>
        <form action="action_page.php">
            <input type="text" ref={inputRef} placeholder="Найти пользователя..." name="search"/>
            <button type="submit" onClick={searchData}><i class="fa fa-search"></i></button>
        </form>
    </div>
    )
}
export default HeaderSearch;