import { useEffect, useState } from 'react';
import { Popover, Spin } from 'antd';
import { getData } from '../../utils/Api';
import { myInfoStore, useStore } from '../../zustand/FriendsStore';
import Profile from '../MainPage/Profile';

function Friends(props) {
	const {friendsLists, setFriendsLists } = useStore((state) => state);

	const { myInfo } = myInfoStore((state) => state);
	const [friendList, setFriendsList] = useState([]);
	const [showProfile, setShowProfile] = useState(true);

	const [loading, setLoading] = useState(true);

	const getFriendsData = async () => {
		if (myInfo) {
			const parameter = {
				uid: myInfo.uid
			};
			await getData.get('friend/getFriends', { params: parameter }).then(res=> {
				setFriendsLists(res.data);
				setFriendsList(res.data);
				setLoading(false)
			} );
		}
	};

	useEffect(() => {
		getFriendsData();
	}, [myInfo]);



	useEffect(() => {
		// eslint-disable-next-line array-callback-return,react/prop-types
		const resultData = friendsLists.filter((value) => value.name.includes(props.searchText));
		setFriendsList(resultData);
			// eslint-disable-next-line react/prop-types
			if (props.searchText !== '') {
				setShowProfile(false);
			} else {
				setShowProfile(true);
			}

		// eslint-disable-next-line react/destructuring-assignment,react/prop-types
	}, [props.searchText]);

	const openChat = () => {
		window.open(
			`/chat/${myInfo.uid}`,
			'네이버새창',
			'width=500, height=800, toolbar=no, menubar=no, scrollbars=no, resizable=yes'
		);
	};

	const openBirthPage = () => {
		window.open(
			'/birthFriends',
			'네이버새창',
			'width=400, height=600, toolbar=no, menubar=no, scrollbars=no, resizable=yes'
		);
	};
	return (
		<Spin spinning={loading} tip='Loading...'>
		<main className='friendsList'>
			{showProfile ? (
				<>
					<div className='userComponent' onDoubleClick={openChat}>
						<Popover
							placement='left'
							overlayClassName='profileOverall'
							content={Profile(myInfo, 'me')}
							trigger='click'
						>
							<img
								src={`http://localhost:8080/img/${myInfo.pic}`}
								alt='lol'
								className='userComponentAvatar userComponentAvatarXl'
							/>
						</Popover>
						<div className='userComponentDetails'>
							<div className='userComponentName'>
								<h4>{myInfo.name}</h4>
							</div>
							<div className='userComponentDesc'>
								<h5>{myInfo.state}</h5>
							</div>
						</div>
					</div>

					<hr />
					<p>Friends with Birthdays</p>
					<div className='userComponent' onDoubleClick={openBirthPage}>
						<div className='friendsListIcon'>
							<div className='iconBox'>
								<i className='fas fa-birthday-cake fa-3x' />
							</div>
						</div>
						<div className='userComponentDetails'>
							<div className='userComponentName'>
								<h4>View more birthdays</h4>
							</div>
						</div>
					</div>
					<hr />
					<p>friends {friendsLists.length}</p>
				</>
			) : null}
			{friendList.map((value) => (
				// eslint-disable-next-line react/jsx-key
				<div className='userComponent' onDoubleClick={openChat}>
					<Popover
						placement='left'
						overlayClassName='profileOverall'
						content={Profile(value, 'friends')}
						trigger='click'
					>
						<img
							src={`http://localhost:8080/img/${value.pic}`}
							alt='lol'
							className='userComponentAvatar userComponentAvatarXl'
						/>
					</Popover>
					<div className='userComponentDetails'>
						<div className='userComponentName'>
							<h4>{value.name}</h4>
						</div>
						<div className='userComponentDesc'>
							<h5>{value.desc}</h5>
						</div>
					</div>
				</div>
			))}
		</main>
		</Spin>
	);
}

export default Friends;
