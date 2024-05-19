import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";

interface MyPagePetInfoProps {
  img: string;
  name: string;
  type: string;
  age: string;
  gender: string;
  weigth: string;
}

const MyPagePetInfo: React.FC<MyPagePetInfoProps> = (props) => {
  // TODO 예약하기 - 내 꼬순내 불러오기에서 선택하기 변경위함
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  return (
    <div className="border-2 border-solid border-MAIN_LIGHT_COLOR rounded-2xl w-full h-36">
      <div className="flex justify-start items-center px-5 py-3 gap-5 w-full">
        <Avatar img={props.img} size="lg" rounded />
        <div>
          <div className="flex items-center gap-1">
            <div className="text-lg font-bold">{props.name}</div>
            {props.gender == "여아" ? (
              <TbGenderFemale color="#e91e63" size="20px" />
            ) : (
              <TbGenderMale color="#004fe5" size="20px" />
            )}
          </div>
          <div className="text-gray-400">{props.type}</div>
          <div className="text-gray-400">
            {props.age} • {props.weigth}
          </div>
        </div>
      </div>
      <div className="w-full text-center border-t-2 border-solid border-MAIN_LIGHT_COLOR pt-1">
        {location.pathname === `/reservation/${id}` ? (
          <Link to="/editmykkosoonae">선택하기</Link>
        ) : (
          <Link to="/editmykkosoonae">수정하기</Link>
        )}
      </div>
    </div>
  );
};

export default MyPagePetInfo;
