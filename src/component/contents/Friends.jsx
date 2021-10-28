import { useEffect, useState } from 'react';
import { Popover } from 'antd';
import jason from '../../resources/img/jason.jpg';
import basic from '../../resources/img/basic_profile.jpg';
import { getData } from '../../utils/Api';
import { useStore } from '../../zustand/FriendsStore';
import Profile from '../MainPage/Profile';

function Friends(props) {
  const { setFriendsLists } = useStore((state) => state);

  const [rawFriendsData, setRawFriendsData] = useState([]);
  const [copyList, setCopyList] = useState([]);
  const [showProfile, setShowProfile] = useState(true);

  const getFriendsData = async () => {
    const resultData = await getData.get('member/getFriends');
    setRawFriendsData(resultData.data);
    setCopyList(resultData.data);
  };

  useEffect(() => {
    getFriendsData();
    setCopyList(rawFriendsData);
    setFriendsLists(copyList);
  }, []);

  useEffect(() => {
    setFriendsLists(copyList);
  }, [copyList]);

  useEffect(() => {
    const resultData = rawFriendsData.filter((value) =>
      // eslint-disable-next-line react/prop-types
      value.name.includes(props.searchText)
    );
    setCopyList(resultData);
    // eslint-disable-next-line react/prop-types
    if (props.searchText !== '') {
      setShowProfile(false);
    } else {
      setShowProfile(true);
    }
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  }, [props.searchText]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    props.func(copyList);
  }, [copyList]);
  const openChat = () => {
    window.open(
      '/chat',
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
    <main className='friendsList'>
      {showProfile ? (
        <>
          <div className='userComponent'>
            <img
              src={jason}
              alt='lol'
              className='userComponentAvatar userComponentAvatarXl'
            />
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
          <p>Friends with Birthdays {copyList.length}</p>
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
          <p>friends {copyList.length}</p>
        </>
      ) : null}
      {copyList.map((value) => (
        // eslint-disable-next-line react/jsx-key
        <div className='userComponent' onDoubleClick={openChat}>
          <Popover
            placement='left'
            overlayClassName='profileOverall'
            content={Profile(value, 'friends')}
            trigger='click'
          >
            <img
              src={basic}
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
  );
}

export default Friends;
