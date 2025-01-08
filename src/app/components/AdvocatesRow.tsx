import { Advocate } from '../page';
import { AdvocateCell } from './AdvocateCell'
import styles from '../../styles/AdvocatesRow.module.css';
interface AdvocatesRowProps {
    advocate: Advocate;
}

export const AdvocatesRow = (props: AdvocatesRowProps) => {
    const { advocate } = props;

    return (
        <tr key={advocate.id} className={styles.advocatesRow}>
            <AdvocateCell value={ advocate.firstName } />
            <AdvocateCell value={advocate.lastName} />
            <AdvocateCell value={advocate.city} />
            <AdvocateCell value={advocate.degree} />
            <AdvocateCell value={
                advocate.specialties.map((s) => (
                    <div>{s}</div>
                ))
            } />
            
            <AdvocateCell value={advocate.yearsOfExperience} />
            <AdvocateCell value={advocate.phoneNumber} />
        </tr>
    );
}