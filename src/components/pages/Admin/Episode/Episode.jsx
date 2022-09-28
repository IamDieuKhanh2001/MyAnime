import React from 'react'
import AddEpisode from './AddEpisode/AddEpisode';
import AllEpisode from './AllEpisode/AllEpisode';

export default function Episode() {
  return (
    <div className='episode'>
      <AddEpisode/>
      <AllEpisode/>
    </div>
  )
}
