import React, { useState, useEffect } from "react";
import { Modal, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

import useAxios from "../../hooks/useAxios";

import BtnSubmit from "../common/BtnSubmit";
import { ROUTER_PATH } from "../../constants/constants";

interface MyKkosoonaeModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  onPetSelect?: (petName: string, breed: string, weight: string) => void;
}

interface MypetInfo {
  petNumber: number;
  petImg: string;
  petName: string;
  breed: string;
  weight: string;
}

const MyKkosoonaeModal: React.FC<MyKkosoonaeModalProps> = ({
  openModal,
  setOpenModal,
  onPetSelect,
}) => {
  const { error, handleRequest, Loading } = useAxios();
  const [petInfo, setPetInfo] = useState<MypetInfo[]>([]);
  const navigate = useNavigate();

  const getPetInfo = async () => {
    try {
      await handleRequest({
        url: "api/user/reservation/my-pet",
        method: "GET",
        setData: setPetInfo,
      });
    } catch (err) {
      if (error) {
        return (
          <div className="my-8 px-4">
            <p>펫 정보를 불러올수 없습니다.</p>
          </div>
        );
      }
      setPetInfo([]);
    }
  };

  useEffect(() => {
    getPetInfo();
  }, []);

  const handlePetSelect = (pet: MypetInfo) => {
    if (onPetSelect) {
      onPetSelect(pet.petName, pet.breed, pet.weight.toString());
    }
    setOpenModal(false);
  };

  return (
    <div>
      {Loading}
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
        <Modal.Header>내 꼬순내 정보 불러오기</Modal.Header>
        <Modal.Body>
          {petInfo.length > 0 ? (
            <div>
              {petInfo.map((pet, index) => (
                <div
                  key={index}
                  className="border border-gray-400 rounded mb-2 flex items-center gap-4 px-2 py-2"
                >
                  <Avatar
                    img={pet.petImg}
                    size="lg"
                    alt={pet.petName}
                    rounded
                  />
                  <div className="w-32">
                    <h3 className="text-lg font-bold">{pet.petName}</h3>
                    <p className="text-xs text-gray-500 to-MAIN_COLOR">
                      견종/묘종 {pet.breed}
                    </p>

                    <p className="text-xs text-gray-500">
                      몸무게: {pet.weight} kg
                    </p>
                  </div>
                  <button
                    className="h-10 border border-gray-800 rounded text-xs text-gray-800 px-4 py-2 ml-auto"
                    onClick={() => handlePetSelect(pet)}
                  >
                    선택하기
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>등록된 내 꼬순내 정보가 없습니다.</p>

              <BtnSubmit
                type="button"
                value="내 꼬순내(펫) 등록하기"
                onClick={() => navigate(ROUTER_PATH.mypage)}
              ></BtnSubmit>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyKkosoonaeModal;
