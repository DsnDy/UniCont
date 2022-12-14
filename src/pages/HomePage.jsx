import React from 'react';
import useAuth from '../hooks/useAuth';

const HomePage = () => {
	const { signOut } = useAuth();
	return (
		<div className='bg-cyan-600'>
			<h1>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
				recusandae dolores porro illum dicta, blanditiis numquam pariatur qui
				similique, et amet itaque, iusto maiores consectetur perspiciatis
				voluptatum ex quos aliquam nemo sequi ratione veritatis ab nesciunt vel.
				Doloribus eveniet debitis modi, maxime fuga tenetur perferendis adipisci
				delectus sit incidunt animi quibusdam voluptatibus repellendus commodi
				quae! Sint exercitationem dolor consectetur eligendi ipsam excepturi
				voluptatum rerum vel facere ducimus blanditiis, vitae sunt reiciendis
				dolorum maiores fugit qui adipisci temporibus assumenda eos. Possimus a
				numquam placeat libero, accusamus alias fuga facilis, vero ad error
				velit asperiores soluta. Animi, unde? Animi praesentium sunt modi!
			</h1>
			<button onClick={signOut}>Выйти</button>
		</div>
	);
};

export default HomePage;
