// 2. 실시간 현재 시간 구하기 함수 추가
        function startLiveClock() {
            const clockTarget = document.getElementById('realTimeClock');
            
            function updateTime() {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                
                // 시:분 형태로 뱃지 텍스트 교체
                clockTarget.textContent = `${hours}:${minutes}`;
            }

            updateTime(); // 최초 실행 (딜레이 방지)
            setInterval(updateTime, 1000); // 1초마다 계속 갱신
        }
        document.addEventListener('DOMContentLoaded', () => {
            // 시간 실시간 구동 연동
            startLiveClock();

            // 이전 입력값 이름 연동
            const savedData = localStorage.getItem('sharedPatientData');
            let patientName = "김수정"; 
            
            if (savedData) {
                const data = JSON.parse(savedData);
                if (data.name) {
                    patientName = data.name;
                }
            }
            
            // [요구사항 4] 로고 옆 이름 주입
            document.getElementById('userNameHeader').textContent = patientName;
            
            // [요구사항 5] 메인 카드 배너 내부 성명 주입 (성 제외 이름만 추출하여 친근하게 표현)
            // 예: "김수정" -> "수정", "이익준" -> "익준", 외자일 경우 전체 출력 예외 대응
            const shortName = patientName.length >= 3 ? patientName.substring(1) : patientName;
            document.getElementById('userNameBanner').textContent = shortName;
        });

        

        
        
        // [요구사항 6] '나비와 대화하기' 버튼 누르면 navi.html로 이동
        document.getElementById('chatBtn').addEventListener('click', () => {
            window.location.href = 'navi.html';
        });

        // SOS 버튼
        document.getElementById('emergencyBtn').addEventListener('click', () => {

            const isConfirmed = confirm('의료진을 긴급 호출 하시겠습니까?');

            if (isConfirmed) {
                window.location.href = 'sos.html';
            }
        });

        // 로그아웃 버튼
        document.getElementById('logoutBtn').addEventListener('click', () => {

            const isConfirmed = confirm('로그아웃 하시겠습니까?');

            if (isConfirmed) {
                window.location.href = 'index.html';
            }
        });


const navItems = document.querySelectorAll(
    '.nav-item01, .nav-item02, .nav-item03, .nav-item04'
);

const indicator = document.querySelector('.nav-indicator');

const navData = {
    navItem01: {
        defaultImg: 'img/home.png',
        activeImg: 'img/home2.png'
    },

    navItem02: {
        defaultImg: 'img/navi.png',
        activeImg: 'img/navi2.png',
        link: 'navi.html'
    },

    navItem03: {
        defaultImg: 'img/alarm.png',
        activeImg: 'img/alarm2.png'
    },

    navItem04: {
        defaultImg: 'img/note.png',
        activeImg: 'img/note2.png'
    }
};

function moveIndicator(target){
    indicator.style.top = target.offsetTop + 'px';
}

navItems.forEach(item => {

    item.addEventListener('click', () => {

        // 기존 active 제거
        navItems.forEach(nav => {

            nav.classList.remove('active');

            const img = nav.querySelector('img');

            if(nav.classList.contains('nav-item01')){
                img.src = navData.navItem01.defaultImg;
            }

            if(nav.classList.contains('nav-item02')){
                img.src = navData.navItem02.defaultImg;
            }

            if(nav.classList.contains('nav-item03')){
                img.src = navData.navItem03.defaultImg;
            }

            if(nav.classList.contains('nav-item04')){
                img.src = navData.navItem04.defaultImg;
            }
        });

       // 현재 선택 적용
item.classList.add('active');

const currentImg = item.querySelector('img');

// 파란 원 먼저 이동
moveIndicator(item);

// 원이 어느 정도 도착한 뒤 이미지 변경
setTimeout(() => {

    if(item.classList.contains('nav-item01')){
        currentImg.src = navData.navItem01.activeImg;
    }

    if(item.classList.contains('nav-item02')){
        currentImg.src = navData.navItem02.activeImg;
    }

    if(item.classList.contains('nav-item03')){
        currentImg.src = navData.navItem03.activeImg;
    }

    if(item.classList.contains('nav-item04')){
        currentImg.src = navData.navItem04.activeImg;
    }

}, 120);

        // navi.html 이동
        if(item.classList.contains('nav-item02')){

            setTimeout(() => {
                window.location.href = 'navi.html';
            }, 420);
        }
    });
});

// main.html 기본 active 위치
const defaultActive = document.querySelector('.nav-item01');

if(defaultActive){
    moveIndicator(defaultActive);
}



