//todo-item 이름을 가진 컴포넌트 정의
Vue.component('todo-item', {
    //todo-item 컴포넌트는 "prop"이라고 하는 
    //사용자 정의 속성 같은 것을 입력받을 수 있습니다.
    //이 prop은 todo라는 이름으로 정의했습니다.
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
});
var app = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            {id: 0, text: 'text1'},
            {id: 1, text: 'text2'},
            {id: 2, text: 'text3'},
            {id: 3, text: 'text4'}
        ]
    }
});