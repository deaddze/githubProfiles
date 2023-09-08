import styles from '../styles/CloseButton.module.sass'
function CloseButton({setHidden}){
    return (
        <button className={styles.close} onClick={() => setHidden(true)}>x</button>
    )
}
export default CloseButton;