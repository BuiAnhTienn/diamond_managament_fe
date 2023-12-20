import { STORE } from '../constants/banner';

const StoreList = () => {
  return (
    <>
      {STORE.map((item, index) => (
        <div
          key={index}
          className='w-[90%] p-5 mx-auto mb-5 bg-white rounded-[25px]'>
          <p className='py-2 text-[#b37917] font-semibold text-[17px]'>
            {item.name}
          </p>
          <p className='py-1'>
            <i className='w-[25px] fa-solid fa-location-dot'></i>
            <span className='text-[15px]'>{item.address}</span>
          </p>
          <p className='py-1'>
            <i className='w-[25px] fa-solid fa-phone-volume'></i>
            <span>{item.phone}</span>
          </p>
          <p className='py-1'>
            <i className='w-[25px] fa-solid fa-clock'></i>
            <span>08:00 - 20:00</span>
          </p>
        </div>
      ))}
    </>
  );
};

export default StoreList;
