import styles from '../../styles/AdvocateCell.module.css'

interface AdvocateCellProps {
    value: string | number | React.JSX.Element[];
}

export const AdvocateCell = (props: AdvocateCellProps) => {
    const { value } = props;

    return (
        <td className={styles.advocateCell}>
            <div className={styles.advocateCellContent}>
                {value}
            </div>
        </td>
    )
}