function resolveDate(data){
  var arr=[]
  for(var k in data){
    // console.log(k);
    var str=k+'='+data[k]
    arr.push(str)
    // console.log(arr);
  }
  return arr.join('&')
}
// var res=resolveDate({name:'zs',age:20})
// console.log(res); name=zs&age=10

function itheima(option){
  var xhr=new XMLHttpRequest()
  // 把外界传递过来的参数对象 转换为查询字符串
  var qs=resolveDate(option.data)
  if(option.method.toUpperCase()==='GET'){
    xhr.open(option.method,option.url+'?'+qs)
    xhr.send()
  }else if(option.method.toUpperCase()==='POST'){
    xhr.open(option.method,option.url)
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send(qs)
  }
  xhr.onreadystatechange=function(){
    if(xhr.readyState===4&&xhr.status===200){
      var result=JSON.parse(xhr.responseText)
      option.success(result)
    }
  }
}