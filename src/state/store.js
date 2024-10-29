import axios from 'axios';
import { create } from 'zustand';

// const instance = axios.create({
//     baseURL: 'http://localhost:4000/todos',
//   });      // 배포 후 -> 배포된 주소로 변경 -> 다시 배포
  
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
  });
  

const store = create((set) => ({
  data: [],
  sortData : [],
  dataCtrl : async function(action){
    let res;
    switch(action.type){
        case 'get' : 
        res = await instance.get("/");
        set({data:res.data});  
        break;
        
        case 'post' : 
        await instance.post("/", action.data); 
        set((state)=>{
          return {data:[...state.data, action.data]}
        })
        break;

        case 'put' : 
        await instance.put("/", action.data);
        set((state)=>{
          let update = [...state.data].map((obj)=>{
                          if(action.data.id == obj.id){
                            obj.state = action.status
                          }
                          return obj;
                        })
          return {data : update};
        });
        break;

        case 'delete' : 
        res = await instance.delete(`/?id=${action.data}`); 
        set((state)=>{
          let del = [...state.data].filter((obj)=>{
                      return obj.id != action.data
                    })
          return{data:del};
        })
        break;
    }
    // set({data:res.data})
    // set((state)=>{ return {data:[...state.data, ...res.data]}; });
    // set((state)=>{ return {data:[...state.data, action.data]}; });

    /*
        set((d)=>{
            // return {data:d.data + 10}
            return {data:n}
        })
    */

  },
  sortCtrl : function(sort){
    // console.log(store.data);

    /*
      let findData;
      switch(sort.type){
        case 'Active':;
        case 'Completed':; break;
        default:;
      }
    */

    set((state)=>{
      // state.data.filter(obj=>obj.status == false)
      // true = 일끝 | false = 할일

      // return {sortData: state.data}

      let findData;
      switch(sort.type){
        case 'Active': return {sortData: state.data.filter(obj=>obj.status == false)};
        case 'Completed': return {sortData: state.data.filter(obj=>obj.status == true)};
        default: return {sortData: state.data};
      }
    });
  }
}))

export default store;