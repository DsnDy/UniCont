import React, { useContext } from 'react';

import lupa from '../../assets/lupa.svg';
import AppContext from '../../context';
import styles from './Search.module.scss';

function Search() {
	const { search, setSearch } = useContext(AppContext);

	const handleChangeSearch = e => {
		setSearch(e.target.value);
	};
	return (
		<button className={styles.search}>
			<input
				value={search}
				onChange={handleChangeSearch}
				placeholder='Найти'
				type='text'
				className='text-gray-400 outline-none'
			/>
			<img src={lupa} alt='поиск' className='mr-3' />
		</button>
	);
}

export default Search;
