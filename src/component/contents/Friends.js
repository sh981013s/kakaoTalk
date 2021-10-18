import { useEffect, useState } from 'react';
import jason from '../../resources/img/jason.jpg';
import basic from '../../resources/img/basic_profile.jpg';
import {getData} from '../../utils/Api';

function Friends(props) {



	const [copyList, setCopyList] = useState([]);

	const [showProfile, setShowProfile] = useState(true);

	const getFriendsData = async() => {
		const resultData = await getData.get('member/getFriends');
		setCopyList(resultData.data);
	}

	useEffect(()=>{
		getFriendsData();
	},[])

	const entireUser = [
		{ name: 'robot1', desc: 'hi', pic: 'jason' },
		{ name: 'robot2', desc: 'lol', pic: 'jason' },
		{ name: 'robot3', desc: '', pic: 'jason' },
		{ name: 'robot4', desc: 'kk', pic: 'jason' },
		{ name: 'robot5', desc: 'good', pic: 'jason' },
		{ name: 'robot6', desc: 'good', pic: 'jason' },
		{ name: 'robot7', desc: 'good', pic: 'jason' },

	];


	const bowl = [
		{ name: 'robot1', desc: 'hi', pic: 'jason' },
		{ name: 'robot2', desc: 'lol', pic: 'jason' },
		{ name: 'robot3', desc: '', pic: 'jason' },
		{ name: 'robot4', desc: 'kk', pic: 'jason' },
		{ name: 'robot5', desc: 'good', pic: 'jason' },
	];

	useEffect(() => {
		const resultData = bowl.filter((value) =>
			value.name.includes(props.searchText)
		);
		setCopyList(resultData);
		if(props.searchText !== '') {
			setShowProfile(false);
		} else {
			setShowProfile(true)
		}
	}, [props.searchText]);

	useEffect(() => {
		props.func(copyList);
	}, [copyList]);

	return (
		<main className='friendsList'>
			<DatePicker />
			{
				showProfile
					? <>
						<div className='userComponent'>

							<img src={jason} alt='lol' className="userComponentAvatar userComponentAvatarXl" />
							<div className='userComponentDetails'>
								<div className='userComponentName'>
									<h4>Jason Lee</h4>
								</div>
								<div className='userComponentDesc'>
									<h5>Hi</h5>
								</div>
							</div>

						</div>
						<hr />
						<p>friends { copyList.length }</p>
					</>
					: null
			}

			{copyList.map((e)=>{
				return(
					<div className='userComponent'>

						<img src={ basic } alt='lol' className="userComponentAvatar userComponentAvatarXl" />
						<div className='userComponentDetails'>
							<div className='userComponentName'>
								<h4>{ e.name }</h4>
							</div>
							<div className='userComponentDesc'>
								<h5>{ e.desc }</h5>
							</div>
						</div>

					</div>
				)
			})}

		</main>
	);
};


export default Friends;

