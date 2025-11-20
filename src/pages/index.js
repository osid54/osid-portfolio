import BulletinBoard from '../components/BulletinBoard';

export default function Home() {
  return (
    <div
      className="relative w-full h-screen bg-center bg-cover flex justify-center items-center overflow-hidden"
      style={{ backgroundImage: "url('/assets/brickWall.jpg')"}}
    >
      <div className='flex justify-start items-center h-full w-full'>
        <img
          src={'/assets/leaves/leaves1.png'}
          alt={null}
          className='relative -left-[34%] top-[5%] z-10 w-[50%] aspect-[181/495]'
          style={{ filter: `drop-shadow(-8px 12px 8px rgba(0, 0, 0, .8))` }}
          draggable="false"
        />
      </div>

      <BulletinBoard />

      <div className='flex justify-start items-center h-full w-full'>
        <img
          src={'/assets/leaves/leaves1.png'}
          alt={null}
          className='relative left-[82%] top-[0%] z-10 w-[50%] aspect-[181/495]'
          style={{ filter: `drop-shadow(-8px 12px 8px rgba(0, 0, 0, .8))` }}
          draggable="false"
        />
      </div>
    </div>
  );
}
//<img className='absolute left-[-17%] z-10 drop-shadow-2xl shadow-black w-[25%]' src='/assets/leaves/leaves1.png' alt='leaves' />
//<img className = 'absolute left-[90%] z-10 drop-shadow-2xl shadow-black w-[25%]' src='/assets/leaves/leaves1.png' alt='leaves' /> 