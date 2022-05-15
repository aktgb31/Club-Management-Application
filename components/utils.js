import React from 'react';
export default function checkBlank(details)
{
    let flag=true;
    Object.entries(details).forEach(detail=>{
        if(!detail[1]){
            flag=false;
        }
    })
    return flag;
}