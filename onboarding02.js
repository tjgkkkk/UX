// 1. 환자 등록번호 랜덤 생성하여 화면에 표시하기
const randomId = String(
    Math.floor(Math.random() * 100000000)
).padStart(8, '0');

document.getElementById('patient-id').textContent = randomId;




        // 2. 이전 페이지에서 입력한 데이터 불러와서 자동 연동하기
        const savedData = localStorage.getItem('sharedPatientData');

        if (savedData) {
            const data = JSON.parse(savedData);
            
            // 이름 연동
            if(data.name) {
                document.getElementById('patientName').textContent = data.name;
            }
            
            // 주민번호 기반 성별 및 나이 계산 후 연동 (사진 스타일 여 / 21 재현)
            if(data.rrn1 && data.rrn2) {
                const genderDigit = data.rrn2.charAt(0);
                const gender =
                    (genderDigit === '1' || genderDigit === '3')
                    ? '남'
                    : (genderDigit === '2' || genderDigit === '4')
                    ? '여'
                    : '';
        
                
                // 출생 연도 구하기 (1,2이면 1900년대 / 3,4이면 2000년대)
                const birthYearPrefix = (genderDigit === '1' || genderDigit === '2') ? '19' : '20';
                const birthYear = parseInt(birthYearPrefix + data.rrn1.substring(0, 2));
                
                // 현재 연도(2026년) 기준 나이 계산
                const currentYear = 2026;
                const age = currentYear - birthYear + 1; // 한국식 나이 계산 기법 적용
                
                document.getElementById('patientGenderAge').textContent = `${gender} / ${age}`;
            }

            // 디자인 레이아웃을 해치지 않고 '병실' 정보 노출하기
            if(data.room) {
                document.getElementById('sectionHeader').textContent = `입원 상태 (${data.room}호)`;
            }
        }

        // 3. '이전으로' 버튼 클릭 시 브라우저 히스토리 이전으로 이동
        document.getElementById('backBtn').addEventListener('click', () => {
            history.back();
        });

        // 4. '다음으로' 버튼 클릭 시 onboarding03.html로 이동
        document.getElementById('nextBtn').addEventListener('click', () => {
            window.location.href = 'onboarding03.html';
        });
