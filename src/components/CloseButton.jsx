import styles from '../styles/CloseButton.module.sass'
function CloseButton({isHidden}){
    return (
        <button className={styles.close} onClick={isHidden}>x</button>
    )
}
export default CloseButton;