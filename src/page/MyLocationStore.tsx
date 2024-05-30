import React, { useState, useEffect } from 'react';
import OuterLayout from '../components/common/OuterLayout';
import PageTitle from '../components/common/PageTitle';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import KakaoMap from '../components/mylocationstore/KakaoMap';
import StoreList from '../components/mylocationstore/StoreList';
import StyleSlider from '../components/mylocationstore/StyleSlider';
import { fetchStores, Store } from '../components/mylocationstore/LocationApi';

const MyLocationStore: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const initialLat = 37.4995;
  const initialLon = 127.0332;

  useEffect(() => {
    const fetchInitialStores = async () => {
      const stores = await fetchStores(initialLat, initialLon);
      setStores(stores);
    };

    fetchInitialStores();
  }, []);

  return (
    <OuterLayout>
      <PageTitle title="내 주변 미용실" />
      <div className="px-4 pb-20">
        <KakaoMap stores={stores} />
        <StoreList stores={stores} />
        <StyleSlider stores={stores} />
      </div>
      <Footer />
      <Nav />
    </OuterLayout>
  );
};

export default MyLocationStore;
