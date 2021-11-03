import { Input } from 'antd';
import { useState } from 'react';
import { pageStepStore, userRegiInfoStore } from '../../../zustand/FriendsStore';

const FifthPage = () => {
  const { setRegPage } = pageStepStore((state) => state);
  const {userInfo, setUserInfo } = userRegiInfoStore((state) => state);
  const [inputPw, setInputPw] = useState({ pw: '', conPw: '' });

  return (
    <div className='firstEntire'>
      <div className='third'>
        <h1>KakaoTalk</h1>
        <div className='fourthBox'>
          <div className='progressBar'>
            <div className='realBar' />
          </div>
          <h2 className='regiTitle'>카카오계정 로그인에 사용할</h2>
          <h2 className='regiTitle'>비밀번호를 등록해 주세요.</h2>

          <p className='regiRow'>카카오계정</p>
          <p className='regiUsername'>sh981013@kakao.com</p>

          <p className='regiRow'>비밀번호</p>
          <div className='registerThirdPhoneInput'>
            <Input
              placeholder='비밀번호 입력 (8~32자리)'
              className='addFriendsPhone'
              onChange={(e) => {
                setInputPw({ ...inputPw, pw: e.target.value });
              }}
            />
          </div>
          <div className='registerThirdPhoneInputSecond'>
            <Input
              placeholder='비밀번호 재입력'
              className='addFriendsPhone'
              onChange={(e) => {
                setInputPw({ ...inputPw, conPw: e.target.value });
              }}
            />
          </div>
          <ul className='fourthList'>
            <li>
              비밀번호는 8~32자리의 영문 대소문자, 숫자, 특수문자를 조합하여
              설정해 주세요.
            </li>
            <li>
              다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는 사용하지
              마세요.
            </li>
            <li>
              안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해 주세요.
            </li>
          </ul>
          <button
            type='submit'
            className='agreeBtn'
            onClick={() => {
              setUserInfo({
                ...userInfo,
                pw: inputPw.pw,
              });
              setRegPage(5);
            }}
          >
            다음
          </button>
        </div>
        <ul className='regiBottom'>
          <li>이용약관</li>
          <li>개인정보 처리방침</li>
          <li>운영정책</li>
          <li>고객센터</li>
          <li>공지사항</li>
          <li>한국어</li>
        </ul>
        <p className='regiBottomText'>
          Copyright SeungHwanLee. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FifthPage;
