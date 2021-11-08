import { useEffect, useState } from 'react';
import { Button, Input, Menu, Popover, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import telCode from '../utils/telCode';
import { myInfoStore, useStore, friendsRefreshStore } from '../zustand/FriendsStore';
import { API_URL, getData } from '../utils/Api';
import Friends from '../component/contents/Friends'


function Header(props) {
	const { myInfo } = myInfoStore((state) => state);
	const { setRefresh } = friendsRefreshStore((state) => state);

	// eslint-disable-next-line react/prop-types
	const { receive, type } = props;
	const [text, setText] = useState('');
	const [trigger, setTrigger] = useState(false);
	const [current, setCurrent] = useState('contacts');
	const [searchFriends, setSearchFriends] = useState('');
	const [countryCode, setCountryCode] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [allFilled, setAllFilled] = useState(false);
	const [isValidInfoToAdd, setIsValidInfoToAdd] = useState(true);
	const [isAlreadyExistAsFriend, setIsAlreadyExistAs] = useState(false);

	const [searchFriendsById, setSearchFriendsById] = useState('');
	const [isExistById, setIsExistById] = useState('');


	const [searchByIdInputSave] = useState('');
	const [searchInfo, setSearchInfo] = useState('');
	const [fdSwitch, setFdSwitch] = useState(false);
	const { friendsLists ,setFriendsLists} = useStore((state) => state);


	const [friendsList, setFriendsList] = useState([]);
	const addFriendsButtonColor = `addFriendsButton${
		allFilled ? ' addFriendsButton-active' : ''
	}`;

	const [visible, setVisible] = useState(false);

	const handleVisibleChange = () => {
		setVisible(!visible);
	}

	const getFriendsData = async () => {
		if (myInfo) {
			const parameter = {
				uid: myInfo.uid
			};
			await getData.get('friend/getFriends', { params: parameter }).then(res=> {
				setFriendsLists(res.data);
			} );
		}
	};


	useEffect(() => {
		if (
			(countryCode && searchFriends && phoneNumber !== '') ||
			searchFriendsById !== ''
		) {
			setAllFilled(true);
		} else {
			setAllFilled(false);
		}
	}, [countryCode, searchFriends, phoneNumber, searchFriendsById]);

	const getSearchData = async () => {
	};

	const handleClick = (e) => {
		setCurrent(e.key);
	};

	let entireUser = [];

	useEffect(() => {
		getSearchData();
		entireUser = friendsLists;
	}, []);

	useEffect(() => {
		receive(text);
	}, [text]);


	const addFriendEventByContacts = () => {
		const userToAdd = entireUser.filter(
			(user) =>
				user.countryCode === countryCode && user.phoneNumber === phoneNumber
		);
		if (userToAdd.length > 0) {
			const isAlreadyExist = friendsList.find(
				(c) => c.phoneNumber === userToAdd[0].phoneNumber
			);
			if (isAlreadyExist) {
				setIsValidInfoToAdd(false);
				setIsAlreadyExistAs(true);
				setAllFilled(false);
			} else {
				userToAdd[0].name = searchFriends;
				// friendsList.push(...userToAdd);

				setFriendsList([...friendsList, { ...userToAdd[0] }]);
				setIsValidInfoToAdd(true);

			}
		} else {
			setIsValidInfoToAdd(false);
			setAllFilled(false);
		}
	};


	// eslint-disable-next-line consistent-return
	const searchResult = (prop) => {
		switch (prop.resultType) {
			case 0 :
				return alert('None');

				// it's not my friend
			case 1 :
				setIsExistById(true);
				setFdSwitch(false);
				setSearchInfo(prop.fdInfo);
				break;
				case 2 :
					setIsExistById(true);
					setFdSwitch(true);
					setSearchInfo(prop.fdInfo);
					break;
			default :
				return null;
		}

	};

	const searchById = async () => {

		const parameter = {
			uid: myInfo.uid,
			keyword: searchFriendsById
		};

		await getData.get('friend/searchFriends', { params: parameter }).then(res => searchResult(res.data));
	};

	// eslint-disable-next-line consistent-return
	const addFriendEventById = async () => {
		if (fdSwitch) {
			const parameter = {
				uid: myInfo.uid,
				fdId: searchInfo.uid
			}
			const param = {
				uid: myInfo.uid
			}
			await getData.post('friend/addFriends', parameter).then(async () => {
				await getData.get('friend/getFriends', { params: param })
					.then(res => setFriendsLists(res.data))
					.then(()=>setVisible(false))
					.then(()=>setRefresh(true));
			})
		} else {
			// 1:1
		}
	};

	const searchByIdContent =
		// eslint-disable-next-line no-nested-ternary
		isExistById && !!searchInfo ? (
/*				<div>
					<span>{searchInfo.name}</span>
					<img src={`${API_URL}img/${searchInfo.pic}`} style={{width: 50}} alt="" />
				</div> */

			<div className='searchByIdContent'>
				<div className='addFriendsByIdProfilePicBox'>
					<img src={`${API_URL}img/${searchInfo.pic}`} alt='lol' className='addFriendsByIdProfilePic' />
				</div>
				<p className='searchByIdContentName'>{searchInfo.name}</p>
				<p className='searchByIdContentDesc'>{searchInfo.state}</p>
			</div>
			) : // eslint-disable-next-line no-nested-ternary
			isExistById === false ? (
				<div className='searchByIdContent'>
					<p className='searchByIdContentName'>
						{/* eslint-disable-next-line react/no-unescaped-entities */}
						Unable to find '{searchByIdInputSave}'
					</p>
					<p className='searchByIdContentDesc'>
						The ID does not exist or is non-searchable.
					</p>
				</div>
			) : isExistById === '' ? (
				<div>
					<p className='searchByIdContentDesc'>
						You can find friends if they have created an ID and it is set as
						searchable to others
					</p>
				</div>
			) : null;

	useEffect(() => {
		receive(text);
	}, [text]);

	// eslint-disable-next-line no-nested-ternary
	const addFriendsModalDesc = isValidInfoToAdd
		? 'Enter a name and phone number.'
		: isAlreadyExistAsFriend
			? 'This user is alreay on your KakaoTalk friends list.'
			: 'Invalid phone number. Please enter a different number.';

	const addFriendsClearBtnFunc = () => {
		setIsExistById('');
		setSearchFriendsById('');
	};

	const content = (
		<div className='addFriendsModal'>
			<h2 className='addFriendsModalTitle'>Add Friends</h2>
			<Menu
				className='addFriends'
				onClick={handleClick}
				selectedKeys={[current]}
				mode='horizontal'
			>
				<Menu.Item key='contacts'>Contacts</Menu.Item>
				<Menu.Item key='ID'>ID</Menu.Item>
			</Menu>
			{current === 'contacts' ? (
				<>
					<div className='addFriendsContent'>
						<Input
							placeholder='Name'
							value={searchFriends}
							onChange={(e) => setSearchFriends(e.target.value)}
							suffix={
								// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
								<span
									onClick={() => {
										setSearchFriends('');
									}}
								>
                  <i className='fas fa-times-circle' />
                </span>
							}
						/>
						<div className='addFriendsFirstInput'>
							<Select
								className='addFriendsCountry'
								onChange={(e) => setCountryCode(e)}
								value={countryCode}
								style={{ width: 100 }}
							>
								{telCode.map((country) => (
									// eslint-disable-next-line react/jsx-key
									<Option value={country.dial_code}>
										{country.dial_code} {country.name}
									</Option>
								))}
							</Select>
							<Input
								placeholder='Phone Number'
								className='addFriendsPhone'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
						<p>{addFriendsModalDesc}</p>
						<Button
							className={addFriendsButtonColor}
							disabled={!allFilled}
							onClick={addFriendEventByContacts}
						>
							Add Friends
						</Button>
					</div>
				</>
			) : (
				<>
					<div className='addFriendsContent'>
						<Input
							placeholder='KakakoTalk ID'
							value={searchFriendsById}
							onChange={(e) => setSearchFriendsById(e.target.value)}
							onPressEnter={searchById}
							suffix={
								// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
								<span onClick={addFriendsClearBtnFunc}>
                  <i className='fas fa-times-circle' />
                </span>
							}
						/>
						{/* <p>{ addFriendsModalDesc }</p> */}
						{searchByIdContent}
						<Button
							className={addFriendsButtonColor}
							disabled={!allFilled}
							onClick={addFriendEventById}
						>
							{/* eslint-disable-next-line no-nested-ternary */}
							{fdSwitch ? 'Add Friends' :  (searchInfo.uid !== myInfo.uid ? '1:1 chat' : "it's me" )}
						</Button>
					</div>
				</>
			)}
		</div>
	);



	return (
		<header className='screenHeader'>
			<div className='mainTop'>
				{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
				<h1
					className='screenHeaderTitle'
					onClick={() => {
					}}
				>
					{/* eslint-disable-next-line no-nested-ternary */}
					{type === 'friends' ? 'Friends'
						: type === 'chats' ? 'Chat'
							: 'More'}
				</h1>
				<div className='screenHeaderIcons'>
          <span>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
						<i
							className='fas fa-search fa-lg'
							onClick={() => {
								setTrigger(!trigger);
							}}
						/>
          </span>
					<span>
            {/* eslint-disable-next-line no-nested-ternary */}
						{type === 'friends' ? (
							<Popover
								placement='bottomRight'
								content={content}
								trigger='click'
								visible={visible}
								onVisibleChange={handleVisibleChange}
							>
								<i className='fas fa-user-plus fa-lg' />
							</Popover>
						) : type === 'chats' ? (
							<Popover
								placement='bottomRight'
								content={content}
								trigger='click'
								visible={visible}
								onVisibleChange={handleVisibleChange}
							>
								<i className='fas fa-comment-medical fa-lg' />
							</Popover>
						) : null}
          </span>
				</div>
			</div>
			{trigger ? (
				<div className='searchModal'>
					<input
						className='searchModalInput'
						type='text'
						placeholder='&#xf002;  Search Friends'
						onChange={(e) => {
							setText(e.target.value);
						}}
					/>
				</div>
			) : null}
		</header>
	);
}

export default Header;
