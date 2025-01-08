import styles from "../../styles/Header.module.scss"

interface HeaderProps {
    onChange: () => React.SetStateAction<React.ChangeEvent<HTMLInputElement>>;
    onClick: () => void;
    searchTerm: string;
}

export const Header = (props: HeaderProps) => {
    const {
        onChange,
        onClick,
        searchTerm,
    } = props;
    
    return (
        <div className={styles.header}>
            <div>
                <h1 className={styles.headerText}>Solace Advocates</h1>
            </div>
            <div className={styles.searchBar}>
                <input
                    value={searchTerm}
                    placeholder={"Find an Advocate"}
                    style={{ border: "1px solid black" }}
                    onChange={onChange} 
                />
                <button onClick={onClick}>Reset Search</button>
            </div>
        </div>
    )
}