<template>
    <div class="chat-container">
        <div class="message-container" id="message-container">
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
    },
    watch: {
        messageList() {
            this.$nextTick(() => {
                document.getElementById('message-container').scrollTop = document.getElementById('message-container').scrollHeight;
            })  
        }
    }
}

</script>

<style scoped>
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
        height: 1.0333rem;
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
        padding: 0.2666rem 0.4rem;
        border-radius: 0.1033rem;
    }
    input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 0.0533rem;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        display: inline-block;
        font-size: inherit;
        height: 0.96rem;
        line-height: 1;
        outline: none;
        padding: 0.08rem 0.2666rem;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 80%;
    }
    .message-container {
        padding-top: 0.64rem;
    }
    .message-container li{
        display: flex;
        padding: 0 0.24rem 0.4rem 0.24rem;
    }
    .message-container img{
        width: 1.1067rem;
        height: 1.1067rem;
        margin-right: 0.2667rem;
    }
    .message-container p{
        color: #0d0d0d;
        background-color: #fff;
        padding: 0.24rem;
    }
    .message-container li.mine{
        flex-direction: row-reverse;
        padding: 0 0.24rem 0.4rem 0.24rem;
    }
    .message-container .mine p{
        background-color: #a2e854;
    }
    .message-container .mine img{
        margin-left: 0.2667rem;
    }
    
</style>