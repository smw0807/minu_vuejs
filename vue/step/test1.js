console.log("hi");
var app = new Vue({
    el: '#app',
    data:{
        message:"test"
    }
})

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'this page is ' + new Date() + ' load'
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            {text: '11111111111111111', seen: true},
            {text: '22222222222222222', seen: true},
            {text: '33333333333333333', seen: true},
            {test: 'tttttttttttt', seen: false},
            {test: 'eeeeeeeeeeee', seen: false}
        ]
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello!!'
    },
    methods: {
        reverseMessage: function () {
            console.log("reverseMessage");
            this.message = this.message.split('').reverse().join('');
        },
        changeMessage: function () {
            console.log("changeMessage");
            this.message = new Date();
        },
        showAlertMessage: function () {
            console.log("showAlertMessage!!");
            alert("hello vue.js~");
        }
    }
});

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: '안녕하세요 Vue!!!'
    }
})