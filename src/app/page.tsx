'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

export default function Home() {
  const [state, setState] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(state.length !== 3){
        alert("Diso ny kaody nampidirinao.")
    }
  };

  return (
    <div className='w-screen flex justify-center items-center h-screen py-4'>
      <form onSubmit={handlerSubmit}>
        <label htmlFor='price' className='block text-lg my-2z font-medium leading-6 text-gray-900'>
          Kaody
        </label>
        <div className='rounded-md border border-blue-500 px-1 overflow-hidden'>
          <input onChange={handleChange} type='text' className='outline-none h-[2.5rem] mx-2' />
        </div>
        <button type='submit' className='btn my-2  h-[2.5rem] px-[3rem] rounded-lg bg-blue-500'>
          Anomboka
        </button>
      </form>
    </div>
  );
}
