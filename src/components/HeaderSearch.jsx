import styles from '../styles/HeaderSearch.module.sass'
import {useRef, useEffect, useState} from 'react'
function HeaderSearch({searchFunc}){
    const inputRef = useRef();
    const [saveSearch, setSaveSearch] = useState([])
    function searchData(e){
        e.preventDefault()
        searchFunc(inputRef.current.value)
        setSaveSearch(prevState => [...prevState, inputRef.current.value])
        inputRef.current.value = '';
    }
    return (
    <>
        <h1 className={styles.h1}>GitHub Search</h1>
        <form className={styles.search} action="action_page.php">
            <input type="text" ref={inputRef} placeholder="Найти пользователя..." name="search"/>
            <button type="submit" onClick={searchData}><i class="fa fa-search"></i></button>
        </form>
    </>
    )
}
export default HeaderSearch;