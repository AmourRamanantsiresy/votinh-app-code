'use client';
import { femaleUsers } from './list-female-user';

export default function Home() {
  return (
    <div>
      {femaleUsers.sort().map((e, k) => (
        <div className={`h-screen w-full flex justify-center items-center relative`}>
          <div className='basis-4/12 bg-slate-50 h-screen w-full flex justify-center relative items-center'>
            <h1 className='text-[2rem] absolute top-9 text-nowrap left-4'>{e.name}</h1>
            <h1 className='text-[22rem]'>{k + 1}</h1>
          </div>
          <div className='basis-8/12 flex justify-center items-center w-full h-screen'>
            <div className='w-[35rem] h-[35rem] rounded-lg bg-slate-300 bg-cover p-2' style={{ backgroundImage: `url("./${e.name}.png")` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
