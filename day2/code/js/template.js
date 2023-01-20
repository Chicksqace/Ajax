function template(id,data){
  var str=document.getElementById(id).innerHTML;
  var pattern=/{{\s*([a-zA-Z]+)\s*}}/
  var pattResult=null;
  while(pattResult=pattern.exec(str)){
    console.log(pattResult);
    console.log(pattResult[0]);
    console.log(pattResult[1]);
    str=str.replace(pattResult[0],data[pattResult[1]])
    console.log(pattResult[0]);
  }
  return str
}