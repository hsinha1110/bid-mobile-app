export const formateServiceErrors = errorData => {
    let errorObj = Object.keys(errorData);
    let errors = {};
    errorObj.forEach(obj => {
      errors[obj] = errorData[obj][0];
    });
    return errors;
  };
  
  export const replaceUrl = (url, data) => {
    var regex = new RegExp(':(' + Object.keys(data).join('|') + ')', 'g');
    return url?.replace(regex, (m, $1) => data[$1] || m);
  };
  
  export const appointmentStatus =(arr,id)=>{
  return arr?.filter(obj=>obj.id===id)[0].title
  }
  export const mask = (cc, num = 4, mask = '*') =>{
    console.log(cc,"vvvvvvvvvvvvvvvv")
  return `${cc} `.slice(-1).padStart(`${cc}`.length, mask);
}

  // export const chartState =(ids,arr)=>{
  //   const a =ids.map(item=>arr?.filter(obj=>obj.id===item.id)[0].title)
  // }
  
  