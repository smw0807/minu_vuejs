new Vue({
    data: {
        a: 1
    },
    created: function () {
        // this는 vm 인스턴스를 가르킨다.
        console.log('a is : ' + this.a);
        // -> "a is : 1"
    }
});

var bindTest = new Vue({
    el: "#app2",
    data: {
        isButtonDisabled: true
    },
    onClick: function() {
        console.log('click');
    }
});
