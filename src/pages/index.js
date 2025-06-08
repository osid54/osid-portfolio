import BulletinBoard from '../components/BulletinBoard';

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-full bg-center bg-cover flex justify-center items-center overflow-hidden"
      style={{ backgroundImage: "url('/assets/brickWall.jpg')" }}
    >
      <img
        className='absolute left-[90%] z-10 drop-shadow-2xl shadow-black w-[25%]'
        src='/assets/leaves/leaves1.png'
        alt='leaves'
      />
      <BulletinBoard />
      <img
        className='absolute left-[-17%] z-10 drop-shadow-2xl shadow-black w-[25%]'
        src='/assets/leaves/leaves1.png'
        alt='leaves'
      />
    </div>
  );
}
