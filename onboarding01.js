

// 가상의 병원 데이터베이스 리스트
        const hospitalDatabase = [
            "성북제일병원", 
            "성북제일큰병원", 
            "성북제일작은병원", 
            "서울중앙병원", 
            "국립의료원",
            "서울대병원",
            "튼튼치과",
            "이익준내과",
            "성신성형외과",
            "성신최고병원",
            "성신의료원",
            "가장좋은병원",
            "성북튼튼치과",
            "성북365정형외과"
        ];

        const hospitalInput = document.getElementById('hospitalInput');
        const searchBtn = document.getElementById('searchBtn');
        const searchResults = document.getElementById('searchResults');
        const submitBtn = document.getElementById('submitBtn');

        // 실시간 검색 기능 함수
        function performSearch() {
            const query = hospitalInput.value.trim();
            searchResults.innerHTML = ''; 
            
            // 아무것도 입력하지 않았을 때는 리스트를 숨김
            if (!query) {
                searchResults.style.display = 'none';
                return;
            }
          }

        // 2. 검색 아이콘 클릭 시 작동하는 검색 기능 구현
        function performSearch() {
            const query = hospitalInput.value.trim();
            searchResults.innerHTML = ''; // 이전 결과 초기화
            
            if (!query) {
                searchResults.style.display = 'none';
                return;
            }
            

            // 입력어가 포함된 병원 필터링
            const matchedHospitals = hospitalDatabase.filter(hp => hp.includes(query));

            if (matchedHospitals.length > 0) {
                matchedHospitals.forEach(hp => {
                    const li = document.createElement('li');
                    li.textContent = hp;
                    // 검색된 아이템 클릭 시 인풋창에 자동 입력
                    li.addEventListener('click', () => {
                        hospitalInput.value = hp;
                        searchResults.style.display = 'none';
                    });
                    searchResults.appendChild(li);
                });
                searchResults.style.display = 'block';
            } else {
               // [핵심 추가] 일치하는 병원이 검색 결과에 단 하나도 없을 때 작동
                const li = document.createElement('li');
                li.textContent = "없는 병원입니다.";
                li.classList.add('no-match'); // 클릭 방지 및 회색 처리를 위한 클래스 부여
                
                searchResults.appendChild(li);
                searchResults.style.display = 'block'; // 검색 결과 리스트 박스를 강제로 켬
            }

            //여기에 추가!!!!!!!!!!!!!!!!!!!!!!!
        }

        searchBtn.addEventListener('click', performSearch);
        
        // 엔터키를 눌러도 검색이 되도록 설정
        hospitalInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        // [핵심 변경 사항] 버튼 클릭 대신 'input' 이벤트를 사용하여 타이핑할 때마다 즉시 실행
        hospitalInput.addEventListener('input', performSearch);

        // 바탕화면 아무곳이나 누르면 검색창 닫히기
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.hospital-search')) {
                searchResults.style.display = 'none';
            }
        });

        // 3. 버튼 클릭 시 다음 페이지로 데이터 전송하며 이동
        submitBtn.addEventListener('click', () => {
            const patientData = {
                hospital: hospitalInput.value,
                name: document.getElementById('nameInput').value,
                rrn1: document.getElementById('rrn1').value,
                rrn2: document.getElementById('rrn2').value,
                room: document.getElementById('roomInput').value
            };

            // 브라우저 임시 저장소(localStorage)에 데이터 저장
            localStorage.setItem('sharedPatientData', JSON.stringify(patientData));

            // result.html 페이지로 이동
            window.location.href = 'onboarding02.html';
        });