import styles from '../styles/ReadmeContent.module.sass'
import CloseButton from './CloseButton'
import {useEffect, useState} from 'react'
function ReadmeContent({rep, decoded, setHidden}){
    return (
        <div class={styles.content}>
            <div><CloseButton setHidden={setHidden}/></div>
            <h2>{rep}</h2>
            <p>{decoded}</p>
        </div>
    )
}

export default ReadmeContent