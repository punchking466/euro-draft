"use client";

// import { useState } from 'react';

export default function PlayerForm({
  action,
}: {
  action: (data: FormData) => void;
}) {
  return (
    <form
      action={action}
      className='flex flex-col gap-4 bg-card p-6 rounded-xl border border-border shadow-md'
    >
      <input
        name='name'
        placeholder='이름'
        required
        className='bg-bg border border-border px-4 py-2 rounded-md text-text placeholder-subtext'
      />
      <select
        name='position'
        required
        className='bg-bg border border-border px-4 py-2 rounded-md text-text'
      >
        <option value=''>포지션 선택</option>
        <option value='PG'>PG</option>
        <option value='SG'>SG</option>
        <option value='SF'>SF</option>
        <option value='PF'>PF</option>
        <option value='C'>C</option>
      </select>

      <input
        name='score'
        type='number'
        placeholder='점수'
        required
        className='bg-bg border border-border px-4 py-2 rounded-md text-text placeholder-subtext'
      />
      <input
        name='birthYear'
        type='number'
        placeholder='출생년도'
        required
        className='bg-bg border border-border px-4 py-2 rounded-md text-text placeholder-subtext'
      />
      <input
        name='lastPlayed'
        type='date'
        required
        className='bg-bg border border-border px-4 py-2 rounded-md text-text placeholder-subtext'
      />

      <button
        type='submit'
        className='bg-accent text-white py-2 rounded-md hover:opacity-90 transition'
      >
        등록하기
      </button>
    </form>
  );
}
