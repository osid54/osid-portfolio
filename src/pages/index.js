import BulletinBoard from '../components/BulletinBoard';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-full bg-center bg-cover flex justify-center items-center overflow-hidden"
      style={{ backgroundImage: "url('/assets/brickWall.jpg')" }}
    >

      <motion.div>
        <img
          src={'/assets/leaves/leaves1.png'}
          alt={null}
          className='absolute left-[92%] top-[0%] z-10 h-[130%]'
          style={{ filter: `drop-shadow(-8px 12px 8px rgba(0, 0, 0, .8))` }}
          draggable="false"
        />
      </motion.div>

      <BulletinBoard />

      <motion.div>
        <img
          src={'/assets/leaves/leaves1.png'}
          alt={null}
          className='absolute -left-[17%] top-[0%] z-10 h-[130%]'
          style={{ filter: `drop-shadow(-8px 12px 8px rgba(0, 0, 0, .8))` }}
          draggable="false"
        />
      </motion.div>
    </div>
  );
}
//<img className='absolute left-[-17%] z-10 drop-shadow-2xl shadow-black w-[25%]' src='/assets/leaves/leaves1.png' alt='leaves' />
//<img className = 'absolute left-[90%] z-10 drop-shadow-2xl shadow-black w-[25%]' src='/assets/leaves/leaves1.png' alt='leaves' />