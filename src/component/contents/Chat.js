/* eslint-disable */
import { useEffect, useState } from 'react';
import _ from 'lodash';
import kakaoChat from '../../resources/img/kakaoChat.png';
import blank from '../../resources/img/blank.png';
import { getData } from '../../utils/Api';
import { myChatStore } from '../../zustand/FriendsStore'
import * as moment from 'moment';


const Chat = (props) => {
  const { myChat, setMyChat } = myChatStore((state)=> state)
  const {match} = props;

  const getChatList = async () => {
    const parameter = {
      uid: match.params.param
    }
    await getData.post('chat/getChatlist', parameter).then((res) => setMyChat(res.data));
  }

  const [myChatToUse, setMyChatToUse] = useState(_.cloneDeep(myChat));

  const sendMessage = async () => {
    const parameter = {
      // eslint-disable-next-line react/prop-types
      uid: match.params.param,
      contents: 'a ssi pal'
    }
    await getData.post('chat/addChat', parameter)
  }

  const indexDataReudcer = (acc, cur) => {
    const date = new Date(cur.time)
    const dateToUse = `${date.getMonth()+1} ${date.getDate()}, ${date.getFullYear()}`
    const timeToUse = moment(date).format('HH:mm A');
    return (
      [...acc, {date: dateToUse, time: timeToUse, contents: cur.contents}]
    )
  };

  const timeCompressingReducer = (acc, cur) => {
/*    if(cur === tmp[0]) {
      return (
        [{date: cur.date, time: [{time: cur.time, contents: [cur.contents]}]}]
      )
    }*/
    return(
      [...acc, {date: cur.date, time: [{time: cur.time, contents: [cur.contents]}]}]
    )
  }

/*  [
    {
      date: '11 5 2021',
      time: [
        {time: '9:40 AM', contents: 'yes'},
        {time: '3 20 PM', contents: ['hi','bye']}
      ]
    },
    {
      date: '11 6 2021',
      time: [
        {time: '5:40 AM', contents: 'yes'},
        {time: '8 20 PM', contents: ['hi','bye']}
      ]
    }
  ]*/



/*  const today = new Date();
  let time = `${today.getHours()}:${today.getMinutes()}`;
  if (today.getMinutes() < 10) {
    time = `${today.getHours()}:${+0}${today.getMinutes()}`;
  }*/

  const [input, inputChange] = useState('');


  const last = '';

  const [tmp,setTmp] = useState([{time: '00', contents:'--'}]);
  const [real, setReal] = useState([]);

  useEffect(()=>{
    getChatList();
    setMyChatToUse(myChat);
    // console.log(myChatToUse.reduce(indexDataReudcer, ''));
    setTmp(myChatToUse.reduce(indexDataReudcer, ''));
    setReal(tmp.reduce(timeCompressingReducer, ''));
    // console.log(tmp)
  },[])


/*  const tmptmp = moment(myChat[0].time).format('YYYY-MM-DD HH:mm Z');
  console.log(tmptmp, '::::;123')
  const tmptmp2 = new Date(myChat[0].time)
  const tmptmp3 = new Date(myChat[1].time)*/


  return (
      <div onClick={()=>console.log(real, 'real')}>asdasdas</div>
/*    <div className='chatScreen'>
      <div className='main'>
        <div className='mainChat'>
          {newData.map((e) => {
            if (e.name === 'beom') {
              if (typeof e.contents !== 'string') {
                return e.contents.map((f, idx) => {
                  if (idx === 0) {
                    return (
                      <div className='messageRow'>
                        <img src={kakaoChat} alt='profile' />
                        <div className='messageRowContent'>
                          <span className='messageAuthor'>{e.name}</span>
                          <div className='messageInfo'>
                            <span className='messageBubble'>
                              {e.contents[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  if (idx === e.contents.length - 1) {
                    return (
                      <div className='messageRow'>
                        <img src={blank} alt='profile' />
                        <div className='messageRowContent'>
                          {/!* <span className="messageAuthor">{e.name}</span> *!/}
                          <div className='messageInfo'>
                            <span className='messageBubble'>
                              {e.contents[e.contents.length - 1]}
                            </span>
                            <span className='messageTime'>21:27</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className='messageRow'>
                      <img src={blank} alt='profile' />
                      <div className='messageRowContent'>
                        {/!* <span className="messageAuthor">{e.name}</span> *!/}
                        <div className='messageInfo'>
                          <span className='messageBubble'>
                            {e.contents[idx]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                });
              }
              if (last.name === e.name) {
                last = e;
                return (
                  <div className='messageRow'>
                    <img src={blank} alt='profile' />
                    <div className='messageRowContent'>
                      <div className='messageInfo'>
                        <span className='messageBubble'>{e.contents}</span>
                        <span className='messageTime'>{e.time}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              last = e;
              return (
                <div className='messageRow'>
                  <img src={kakaoChat} alt='profile' />
                  <div className='messageRowContent'>
                    <span className='messageAuthor'>{e.name}</span>
                    <div className='messageInfo'>
                      <span className='messageBubble'>{e.contents}</span>
                      <span className='messageTime'>{e.time}</span>
                    </div>
                  </div>
                </div>
              );
            }
            // 나라면
            if (typeof e.contents !== 'string') {
              return e.contents.map((f, idx) => {
                if (idx === e.contents.length - 1) {
                  return (
                    <div className='messageRow messageRowOwn'>
                      <div className='messageRowContent'>
                        <div className='messageInfo'>
                          <div className='messageBubble'>
                            {e.contents[e.contents.length - 1]}
                          </div>
                          <div className='messageTime'>{e.time}</div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div className='messageRow messageRowOwn'>
                    <div className='messageRowContent'>
                      <div className='messageInfo'>
                        <div className='messageBubble'>{e.contents[idx]}</div>
                      </div>
                    </div>
                  </div>
                );
              });
            }
            return (
              // eslint-disable-next-line react/jsx-key
              <div className='messageRow messageRowOwn'>
                <div className='messageRowContent'>
                  <div className='messageInfo'>
                    <div className='messageBubble'>{e.contents}</div>
                    <div className='messageTime'>{e.time}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className='reply'>
            <div className='replyColumn'>
              <i className='far fa-plus-square fa-lg' />
            </div>

            <div className='replyColumn'>
              <input
                id='chatInput'
                type='text'
                placeholder='Write a message...'
                onChange={(e) => {
                  inputChange(e.target.value);
                }}
              />
              <i id='iconPush' className='far fa-grin fa-lg' />
              {/!* eslint-disable-next-line react/button-has-type *!/}
              <button
                onClick={() =>{
                  sendMessage();
                {
                  setSample([
                    ...sample,
                    { name: 'me', contents: input, time, profile: 'me' },
                  ]);
                  const chatInput = document.querySelector('#chatInput');
                  chatInput.value = '';
                }
                  }}
              >
                <i className='fas fa-arrow-up' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> */
  );
};

export default Chat;
