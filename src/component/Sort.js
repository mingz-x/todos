import React, { useEffect, useState } from 'react'
import store from '../state/store'

const Sort = () => {

    let {data, sortData, sortCtrl} = store();
    let [type, setType] = useState('All');

    /*
      function sortFn(type){
          sortCtrl({type});
      }
    */

    useEffect(()=>{
        sortCtrl({type});
    },[data, type])

  return (
    <div className='footer'>
        <div>{sortData.length} item</div>
        <div>
            <button onClick={()=>setType('All')}>All</button>
            <button onClick={()=>setType('Active')}>Active</button>
            <button onClick={()=>setType('Completed')}>Completed</button>
        </div>
    </div>
  )
}

export default Sort