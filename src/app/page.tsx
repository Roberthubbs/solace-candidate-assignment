"use client";

import { useEffect, useState } from "react";
import { AdvocatesRow } from "./components/AdvocatesRow";
import { Header } from "./components/Header"
import styles from "../styles/Page.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

enum Degrees {
  PHD = "Phd",
  MSW = "MSW",
  MD = "MD",
}

export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: Degrees;
  specialties: string[];
  phoneNumber: number;
  yearsOfExperience: number;
}

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState('up')

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(() => {
          return jsonResponse.data.sort((a: Advocate, b: Advocate) => b.yearsOfExperience - a.yearsOfExperience)
        });
        setFilteredAdvocates(() => {
          return jsonResponse.data.sort((a: Advocate, b: Advocate) => b.yearsOfExperience - a.yearsOfExperience)
        });
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    console.log("filtering advocates...");
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName?.toLowerCase().includes(lowerCaseSearchTerm) ||
        advocate.lastName?.toLowerCase().includes(lowerCaseSearchTerm) ||
        advocate.city?.toLowerCase().includes(lowerCaseSearchTerm) ||
        advocate.degree?.toLowerCase().includes(lowerCaseSearchTerm) ||
        advocate.specialties?.join(',').toLowerCase().includes(lowerCaseSearchTerm) ||
        advocate.yearsOfExperience === parseInt(lowerCaseSearchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm('');
    setFilteredAdvocates(advocates);
  };

  const onSortingChange = () => {
    setFilteredAdvocates(filteredAdvocates.sort((a: Advocate, b: Advocate) => {
      return sorting === 'up' ? a.yearsOfExperience - b.yearsOfExperience : b.yearsOfExperience - a.yearsOfExperience;
    }));
    sorting === 'up' ? setSorting('down') : setSorting('up');
  }

  return (
    <main style={{ margin: "24px" }}>
      <Header onClick={onClick} onChange={onChange} searchTerm={searchTerm} />
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeaderCell}>First Name</th>
            <th className={styles.tableHeaderCell}>Last Name</th>
            <th className={styles.tableHeaderCell}>City</th>
            <th className={styles.tableHeaderCell}>Degree</th>
            <th className={styles.tableHeaderCell}>Specialties</th>
            <th className={styles.tableHeaderCell}>Years of Experience&nbsp;
              {sorting === 'down' && <button onClick={onSortingChange}><FontAwesomeIcon icon={faArrowUp} /></button>}
              {sorting === 'up' && <button onClick={onSortingChange}><FontAwesomeIcon icon={faArrowDown} /></button>}
            </th>
            <th className={styles.tableHeaderCell}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate: Advocate) => {
            return (
              <AdvocatesRow advocate={advocate} />
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
