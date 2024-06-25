import React, { useEffect, useState } from "react";

import OuterLayout from "../components/common/OuterLayout";
import PageTitle from "../components/common/PageTitle";
import Nav from "../components/common/Nav";
import MyLikeStoreCard from "../components/mylikestore/MyLikeStoreCard";
import PageNothing from "../components/common/PageNothing";
import ModalDelete from "../components/common/ModalDelete";
import useAxios from "../hooks/useAxios";
import useToastMessage from "../hooks/useToastMessage";

interface MyLikeStoreType {
  likeNo: number;
  storeNo: number;
  storeImg: string;
  storeName: string;
  scope: number;
  totalLikeCount: number;
  roadAddress: string;
  openTime: string;
  closeTime: string;
}

const MyLikeStore: React.FC = () => {
  const [myLikeStore, setMyLikeStore] = useState<MyLikeStoreType[]>([]);
  const [loadingMyLikeStore, setLoadingMyLikeStore] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [likeNo, setLikeNo] = useState<number>(0);

  const { error, handleRequest, Loading } = useAxios();
  const { showToast, Toast } = useToastMessage();

  const deleteMyLikeStore = async (likeNo: number) => {
    handleRequest({
      url: `/api/user/mypage/like-cancel/${likeNo}`,
      method: "DELETE",
    });
    setShowModalDelete(false);
    if (!error) {
      showToast({
        message: "관심매장이 삭제되었습니다",
        action: () => {
          window.location.reload();
        },
      });
    } else {
      showToast({
        message: "오류가 발생했습니다",
      });
    }
  };

  const handlerLikeStoreCancel = (likeNo: number) => {
    setLikeNo(likeNo);
    setShowModalDelete(true);
  };

  useEffect(() => {
    handleRequest({
      url: "/api/user/mypage/like-store",
      method: "GET",
      setData: (data) => {
        setMyLikeStore(data);
        setLoadingMyLikeStore(true);
      },
    });
    if (error) {
      showToast({
        message: "오류가 발생했습니다. 잠시 후 다시 실행해주세요",
      });
    }
  }, []);

  return (
    <OuterLayout>
      <PageTitle title="관심매장" leftBtn={true} />
      <div className="pt-4 pb-24 px-4">
        {Loading}
        {myLikeStore.length === 0 && loadingMyLikeStore ? (
          <PageNothing message="관심매장이 없습니다" />
        ) : (
          myLikeStore.map((item: MyLikeStoreType) => (
            <MyLikeStoreCard
              key={item.likeNo}
              storeNo={item.storeNo}
              storeImg={item.storeImg}
              storeName={item.storeName}
              scope={item.scope}
              totalLikeCount={item.totalLikeCount}
              roadAddress={item.roadAddress}
              openTime={item.openTime}
              closeTime={item.closeTime}
              onClick={() => {
                handlerLikeStoreCancel(item.likeNo);
              }}
            />
          ))
        )}
        <ModalDelete
          showModalDelete={showModalDelete}
          setShowModalDelete={setShowModalDelete}
          onClick={() => {
            deleteMyLikeStore(likeNo);
          }}
          description="선택한 관심매장을 삭제하시겠습니까?"
          delBtnValue="삭제"
          cancelBtnValue="취소"
        />
        <Toast />
      </div>
      <Nav />
    </OuterLayout>
  );
};

export default MyLikeStore;
