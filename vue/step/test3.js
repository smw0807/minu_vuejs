//데이터와 메소드
var data = {a: 1};
var vm = new Vue({
    el: "#data1",
    data: data
});
vm.a = 4;
vm.$watch('a', function(newVal, oldVal) {
    console.log("vm.a가 변경되면 호출됨...??");
    console.log('new : ' + newVal);
    console.log('old : ' + oldVal);
})

/**
 * 인스턴스에 있는 속성은 원본 데이터에 있는 값을 반환한다.
 */
// vm.a === data.a; // => true
// console.log("------- step 1 --------");
// console.log("data : " + data);
// console.log("vm : " + vm);
// console.log("vm.a : " + vm.a);
// console.log("data.a : " + data.a);
// console.log("boolean : " + vm.a === data.a);

/**
 * 인스턴스에 있는 속성값을 변경하면 원본 데이터에도 영향을 미친다.
 */
// vm.a = 2;
// console.log("------- step 2 --------");
// console.log("data : " + data);
// console.log("vm : " + vm);
// console.log("vm.a : " + vm.a);
// console.log("data.a : " + data.a);
// 반대로 해도 마찬가지이다 
// data.a = 1;
/**
 * data에 있는 속성들은 인스턴스가 생성될 때 존재한 것들만 반응형이기 때문에,
 * 처음 생성할 때 a만 있었으므로 a가 변경될 때만 반응형이고 a가 아닌 다른 데이터를 추가할 때는
 * 화면이 갱신되지 않는다.
 */


 var obj = {
     foo: 'bar'
 };

 Object.freeze(obj); //속성이 변하는 것을 막아줌
 new Vue({
    el:"#data2",
    data: obj
 });

