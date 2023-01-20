$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 为发送按钮绑定鼠标点击事件
    $("#btnSend").on('click',function(){
        var text=$("#ipt").val().trim()
        if(text.length<=0){
            return $("#ipt").val("")
        }
        // 如果用户输入的聊天内容，则将聊天内容追加到页面显示
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+text+'</span></li>')
        $("#ipt").val("")
        // 重叠滚动条
        resetui()
        // 发起请求，获取聊天内容
        getMsg(text)
    })
    // 获取聊天机器人发送回来的信息
    function getMsg(text){
        $.ajax({
            type: "get",
            url: "http://www.liulongbin.top:3006/api/robot",
            data: {
                spoken:text
            },
            success: function (res) {
                // console.log(res);
                if(res.message==='success'){
                    var msg=res.data.info.text;
                    // 接收回来的聊天消息
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+msg+'</span></span></li>')
                    resetui()
                    // 调用getVoice（）函数，把语音转换为文本
                    getVoice(msg)
                }
            }
        });
    }
    // 把文字转换为语音
    function getVoice(text){
        $.ajax({
            type:"get",
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text
            },
            success:function(res){
                console.log(res);
                if(res.status===200){
                    // 播放语音
                    $("#voics").attr('src',res.voiceUrl)
                }
                // console.log(res);
            }
        })
    }
    // 让文本输入框响应回车事件后，提交消息
    $('#ipt').on('keyup',function(e){
        console.log(e.keyCode);
        if(e.keyCode==13){
            // 调用按钮的click函数，可以通过编程的方式触发按钮的点击事件
            $("#btnSend").click()
        }
    })
  })