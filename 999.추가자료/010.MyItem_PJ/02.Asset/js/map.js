// 마이아이템 오시는길 페이지 JS - map.js

$(function () { /// jQB /////////////////////

    // 다음맵 실행함수 호출여부
    let dact = 1; // 1-실행전

    //// 지도 메뉴 클릭시 해당지도 보이기 ///
    // 대상: .menu a
    $(".menu a").click(function (e) {
        // 기본이동막기
        e.preventDefault();

        // 1. 클릭된 a요소 순번 알아오기
        // 알아오는 이유: 지도 .maps의 순번과 같음
        let idx = $(this).index();
        console.log("순번:" + idx);

        // 2. 클릭된 a요소에만 클래스 on넣기
        $(this).addClass("on")
            .siblings().removeClass("on");

        // 3. 해당순번과 동일한 지도보이기
        $(".maps").eq(idx).show()
            .siblings(".maps").hide();

        // 4. 다음맵일 경우 처음 한번만 실행함수 호출
        if (idx === 2 && dact === 1) {
            dact = 0; //처음 한번만 실행!
            dmapAct();
        } /////////// if문 ///////////

    }); ///////////// click ////////////////

}); ///////////// jQB /////////////////////