// 구르미 갤러리 JS - main.js
//////////////////////// 로딩구역 ///////////////////////////////

$(function () { //////////// JQB /////////////////////

    // 버튼클릭시 이미지 이동하기
    // 대상 : .abtn -> .lb , .rb 두가지 구분!
    // 변경대상 : .gbx (이미지를 담은 박스)
    let gbx = $(".gbx");

    // __________________________________________________________
    // 광클금지 상태변수
    let prot = 0; //1-불허용,0-허용

    $(".abtn").click(function () {

        // 광클금지/////////////
        if (prot) return; // prot가 1이면 돌아갓!
        prot = 1; //잠금!
        setTimeout(() => {
            prot = 0; //해제!
        }, 400); ///////////타임아웃///////////
        /////////////////////////////////////
        //400은 css이미지트랜지션의 .4초를 확보
        // 광클금지는 광클상태변수를 조정하여 애니메이션이 그려지는 시간동안 코드실행을 막아준다!

        // 자동호출지우기
        clearAuto();
        // __________________________________________________________

        // console.log($(this).is(".rb"));
        // is() 메서드는 선택요소의 태그나 이름을 확인함
        // -> 맞을경우 true를 리턴함! 오른쪽일경우 true
        // -> 여기서는 오른쪽 버튼 클래스 여부를 확인함!


        if ($(this).is(".rb")) { // 오른쪽 버튼일때
            // console.log("오른쪽");
            goSlide(1); //오른쪽이동호출
        } ///////////// if //////////
        else { // 왼쪽 버튼일때
            // console.log("왼쪽");
            goSlide(0); //왼쪽이동호출
        } ///////// else /////////
    }); ////////// click ///////////
    // _______________________________________________________________

    /*
        함수명 : goSlide
        기능 : 이미지 이동하기(자동)
    */ 


    let goSlide = dir => { // dir - 1=오른쪽, 0=왼쪽
        console.log("방향" + dir);


        // 이미지박스에 이미지 읽어오기(새로읽어오기)
        let gimg = gbx.find("img");


        // 오른쪽방향////////////////////////////
        if (dir) {
            // 맨앞이미지 맨뒤으로 이동(append)
            gbx.append(gimg.first());
            // gbx.append(맨앞이미지);

        } //////if////////

        // 왼쪽방향//////////////////////////////
        else {
            // 맨뒤이미지 맨앞으로이동(prepend)
            gbx.prepend(gimg.last());
            // gbx.prepend(맨뒤이미지);

        } /////////else////////

    }; /////////////goSlide 함수///////////////
    /////////////////////////////////////////

    // _______________________________________________________________
    // 인터벌용 변수(지우기위함!)
    let autoI;
    // _______________________________________________________________

    /* 
        함수명 : autoSlide
        기능 : 자동넘기기
    */
    let autoSlide =()=>{
        // setInterval(함수,시간) -> 일정시간간격함수호출!
        autoI = setInterval(()=>{
            goSlide(1);//오른쪽 이동호출!
        },3000);/////인터발함수///////
    };//////////////autoSlide//////////////
    // _______________________________________________________________
    // 자동호출함수 최초호출(함수 아래에서 호출할것!)
    autoSlide();

    // 타임아웃용 변수(지우기위함!)
    let autoT;
    // _______________________________________________________________
    /* 
        함수명 : clearAuto
        기능 : 자동호출지우기 + 일정시간뒤 다시자동
    */
    let clearAuto =()=>{
        console.log("자동지우기");
        // 1. 인터벌지우기
        clearInterval(autoI);
        // clearInterval() 인터벌함수 지우는 메서드

        // 2. 타임아웃 지우기 (안지우면 실행쓰나미가 일어남!!!)
        clearTimeout(autoT);
        // 결과적으로 타임아웃 셋팅이 하나만 남는다!

        // 3. 일정시간뒤 다시 자동호출하기 : 변수에 할당
        autoT = setTimeout(autoSlide,4000);

    };///////////////clearAuto//////////////////
    // _______________________________________________________________




}); ////////////////////// JQB /////////////////////
//////////////////////////////////////////////////