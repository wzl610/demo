<template>
    <div class="chat-container">
        <div class="message-container">
            <ul>
                <li v-for="item in messageList" :class="{mine: item.send != 'admin'}">
                    <img src="../public/img/head.jpg"/>
                    <div>
                        <p>{{item.message}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="form-container">
            <input type="text" ref="messageInput"/>
            <a @click="sendMessage">发送</a>
        </div>   
    </div>
</template>    

<script>
export default {
    mounted() {
        this.$axios.post('http://localhost:8360/message/index/query_message_by_user',{
            
        }).then(response => {
            if (response.data.errno == 1004) {
                location.href = '/#/index'
            }
            this.messageList = response.data.data;
        }).catch(e => {
            console.log(e);
        })
    },
    methods: {
        sendMessage() {
            let message = this.$refs.messageInput.value;
            this.$axios.post('http://localhost:8360/message/index/add_message',{
                'message': message,
                'receiver': 'admin'
            }).then(response => {
                if (!response.data.errno) {
                    this.messageList.push({
                        'send': 'mine',
                        'message': message
                    })
                    this.$refs.messageInput.value = '';
                }
            }).catch(e => {
                console.log(e);
            })
        }
    },
    data() {
        return {
            messageList: ''
        }
    }
}

</script>

<style lang="css">
    .chat-container{
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #ebebeb;
    }
    .message-container{
        flex: 1;
        overflow: auto;
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
    .message-container {
        padding-top: 25px;
    }
    .message-container li{
        display: flex;
        padding: 0 50px 18px 18px;
    }
    .message-container img{
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .message-container p{
        font-size: 14px;
        color: #0d0d0d;
        background-color: #fff;
        padding: 13px;
    }
    .message-container li.mine{
        flex-direction: row-reverse;
        padding: 0 18px 18px 50px;
    }
    .message-container .mine p{
        background-color: #a2e854;
    }
    .message-container .mine img{
        margin-left: 10px;
    }
    
</style>