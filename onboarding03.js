
        const boxes = document.querySelectorAll('.personality-box');
        const completeBtn = document.getElementById('completeBtn');
        let selectedSystemInput = "";

        // 각 박스의 종류에 따른 systemInput 매핑
        const systemPrompts = {
            "polite": "너는 공손하고 정중한 비서야. 예의 바르고 격식 있는 말투를 사용해.",
            "friend": "너는 친구같은 비서야. 친근한 말투와 반말을 쓰도록 해.",
            "active": "너는 활발하고 긍정적인 비서야. 에너지가 넘치고 밝은 말투를 사용해.",
            "warm": "너는 따뜻하고 다정한 비서야. 포근하고 부드러운 말투로 상대방을 위로해줘."
        };

        // 1 & 2. 박스 선택 시 동작
        boxes.forEach(box => {
            box.addEventListener('click', () => {
                // 기존 선택 해제
                boxes.forEach(b => b.classList.remove('selected'));
                
                // 현재 클릭한 박스 선택
                box.classList.add('selected');
                
                // 해당 박스의 데이터 타입에 맞는 프롬프트 설정
                const type = box.getAttribute('data-type');
                selectedSystemInput = systemPrompts[type];

                // 버튼 활성화
                completeBtn.disabled = false;
            });
        });

        // 4. 완료 버튼 클릭 시 다음 페이지로 이동
        completeBtn.addEventListener('click', () => {
            if (selectedSystemInput) {
                // 다음 페이지(main.html)에서 쓸 수 있도록 localStorage에 저장
                localStorage.setItem('systemInput', selectedSystemInput);
                
                // 페이지 이동
                window.location.href = 'main.html';
            }
        });