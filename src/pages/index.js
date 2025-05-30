import BulletinBoard from '../components/BulletinBoard';

export default function Home() {
  return (
    <div
      className="min-h-screen w-full bg-center bg-cover flex justify-center items-center"
      style={{ backgroundImage: "url('/assets/brickWall.jpg')" }}
    >

      <BulletinBoard />
    </div>
  );
}
