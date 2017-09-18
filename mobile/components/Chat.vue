<template>
    <div class="chat-container">
        <div class="message-container">
        </div>
        <div class="form-container">
            <input type="text" ref="messageInput"/>
            <a @click="sendMessage">发送</a>
        </div>   
    </div>
</template>    

<script>
export default {
    methods: {
        sendMessage() {
            let message = this.$refs.messageInput.value;
            this.$axios.post('http://localhost:8360/message/index/add_message',{
                'message': message,
                'to': 'admin'
            }).then(response => {
                if (!response.data.errno) {
                    alert('添加成功');
                    this.$refs.messageInput.value = '';
                }
            }).catch(e => {
                console.log(e);
            })
        }
    }
}

</script>

<style lang="css">
    .chat-container{
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .message-container{
        flex: 1;
    }
    .form-container{
        height: 40px;
    }
    button{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #bfcbd9;
        border-color: #c4c4c4;
        color: #1f2d3d;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 10px 15px;
        font-size: 14px;
        border-radius: 4px;
    }
    input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        display: inline-block;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: none;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 80%;
    }
</style>