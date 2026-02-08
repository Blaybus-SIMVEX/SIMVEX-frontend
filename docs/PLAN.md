# API 연동

## API 연동 대상 및 유의사항
1. @3DViewer.tsx, @InfoModal.tsx, @MemoPad.tsx, @AIAssistant.tsx
2. request parameter, response 모두 타입스크립트로 정의한다.
3. API 연동은 study 페이지와 동일한 방식으로 구현한다.

### 오브젝트 상세 조회
1. @3DViewer.tsx
  1-1. api: [GET] /api/objects/{id}
  1-2. response: 
{
  "message": "오브젝트 상세 조회 성공",
  "data": {
    "id": 1,
    "name": "V4 실린더 엔진",
    "nameEn": "V4 Engine",
    "description": "V4 실린더 엔진의 구조와 작동 원리를 학습할 수 있는 3D 모델입니다. 피스톤의 왕복 운동이 크랭크샤프트의 회전 운동으로 변환되는 과정을 관찰할 수 있습니다.",
    "thumbnailUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/V4%EC%8B%A4%EB%A6%B0%EB%8D%94%20%EC%97%94%EC%A7%84%20%EC%A1%B0%EB%A6%BD%EB%8F%84.png",
    "categories": [
      "기계공학"
    ],
    "theory": "V4 엔진은 4개의 실린더가 V자 형태로 배치된 내연기관입니다. 4행정 사이클(흡입-압축-폭발-배기)을 통해 화학 에너지를 기계적 에너지로 변환합니다. 피스톤의 왕복운동이 커넥팅 로드를 통해 크랭크샤프트의 회전운동으로 바뀌어 동력을 전달합니다",
    "components": [
      {
        "id": 1,
        "name": "크랭크샤프트",
        "nameEn": "Crankshaft",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Crankshaft.glb",
        "material": "단조강",
        "role": "피스톤의 왕복 운동을 회전 운동으로 변환하는 핵심 부품입니다."
      },
      {
        "id": 2,
        "name": "피스톤",
        "nameEn": "Piston",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Piston.glb",
        "material": "알루미늄 합금",
        "role": "연소 가스의 압력을 받아 왕복 운동하며 커넥팅 로드로 힘을 전달합니다."
      },
      {
        "id": 3,
        "name": "커넥팅 로드",
        "nameEn": "Connecting Rod",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Connecting%20Rod.glb",
        "material": "단조강",
        "role": "피스톤과 크랭크샤프트를 연결하여 왕복 운동을 전달합니다."
      },
      {
        "id": 4,
        "name": "커넥팅 로드 캡",
        "nameEn": "Connecting Rod Cap",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Connecting%20Rod%20Cap.glb",
        "material": "단조강",
        "role": "커넥팅 로드를 크랭크샤프트에 고정하는 캡입니다."
      },
      {
        "id": 5,
        "name": "피스톤 핀",
        "nameEn": "Piston Pin",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Piston%20Pin.glb",
        "material": "침탄강",
        "role": "피스톤과 커넥팅 로드를 연결하는 핀입니다."
      },
      {
        "id": 6,
        "name": "피스톤 링",
        "nameEn": "Piston Ring",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Piston%20Ring.glb",
        "material": "주철",
        "role": "실린더 벽면과 피스톤 사이를 밀봉하고 오일을 긁어내는 역할을 합니다."
      },
      {
        "id": 7,
        "name": "커넥팅 로드 볼트",
        "nameEn": "Conrod Bolt",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Conrod%20Bolt.glb",
        "material": "고강도 합금강",
        "role": "커넥팅 로드 캡을 고정하는 볼트입니다."
      }
    ]
  },
  "timestamp": "2026-02-08T21:31:00.98603697"
}

2. @InfoModal.tsx
  2-1. api: [GET]/api/objects/{objectId}/components
  2-2. response: 
{
  "message": "부품 목록 조회 성공",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "크랭크샤프트",
        "nameEn": "Crankshaft",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Crankshaft.glb",
        "material": "단조강",
        "role": "피스톤의 왕복 운동을 회전 운동으로 변환하는 핵심 부품입니다."
      },
      {
        "id": 2,
        "name": "피스톤",
        "nameEn": "Piston",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Piston.glb",
        "material": "알루미늄 합금",
        "role": "연소 가스의 압력을 받아 왕복 운동하며 커넥팅 로드로 힘을 전달합니다."
      },
      {
        "id": 3,
        "name": "커넥팅 로드",
        "nameEn": "Connecting Rod",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Connecting%20Rod.glb",
        "material": "단조강",
        "role": "피스톤과 크랭크샤프트를 연결하여 왕복 운동을 전달합니다."
      },
      {
        "id": 4,
        "name": "커넥팅 로드 캡",
        "nameEn": "Connecting Rod Cap",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Connecting%20Rod%20Cap.glb",
        "material": "단조강",
        "role": "커넥팅 로드를 크랭크샤프트에 고정하는 캡입니다."
      },
      {
        "id": 5,
        "name": "피스톤 핀",
        "nameEn": "Piston Pin",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Piston%20Pin.glb",
        "material": "침탄강",
        "role": "피스톤과 커넥팅 로드를 연결하는 핀입니다."
      },
      {
        "id": 6,
        "name": "피스톤 링",
        "nameEn": "Piston Ring",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Piston%20Ring.glb",
        "material": "주철",
        "role": "실린더 벽면과 피스톤 사이를 밀봉하고 오일을 긁어내는 역할을 합니다."
      },
      {
        "id": 7,
        "name": "커넥팅 로드 볼트",
        "nameEn": "Conrod Bolt",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Conrod%20Bolt.glb",
        "material": "고강도 합금강",
        "role": "커넥팅 로드 캡을 고정하는 볼트입니다."
      }
    ],
    "totalElements": 7,
    "totalPages": 1,
    "page": 1,
    "size": 8
  },
  "timestamp": "2026-02-08T21:31:20.699961926"
}

3. @InfoModal.tsx
  3-1. api: [GET] /api/objects/{objectId}/components/{componentId}
  3-2. response: 
{
  "message": "부품 목록 조회 성공",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "크랭크샤프트",
        "nameEn": "Crankshaft",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Crankshaft.glb",
        "material": "단조강",
        "role": "피스톤의 왕복 운동을 회전 운동으로 변환하는 핵심 부품입니다."
      },
      {
        "id": 2,
        "name": "피스톤",
        "nameEn": "Piston",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Piston.glb",
        "material": "알루미늄 합금",
        "role": "연소 가스의 압력을 받아 왕복 운동하며 커넥팅 로드로 힘을 전달합니다."
      },
      {
        "id": 3,
        "name": "커넥팅 로드",
        "nameEn": "Connecting Rod",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Connecting%20Rod.glb",
        "material": "단조강",
        "role": "피스톤과 크랭크샤프트를 연결하여 왕복 운동을 전달합니다."
      },
      {
        "id": 4,
        "name": "커넥팅 로드 캡",
        "nameEn": "Connecting Rod Cap",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Connecting%20Rod%20Cap.glb",
        "material": "단조강",
        "role": "커넥팅 로드를 크랭크샤프트에 고정하는 캡입니다."
      },
      {
        "id": 5,
        "name": "피스톤 핀",
        "nameEn": "Piston Pin",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Piston%20Pin.glb",
        "material": "침탄강",
        "role": "피스톤과 커넥팅 로드를 연결하는 핀입니다."
      },
      {
        "id": 6,
        "name": "피스톤 링",
        "nameEn": "Piston Ring",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Piston%20Ring.glb",
        "material": "주철",
        "role": "실린더 벽면과 피스톤 사이를 밀봉하고 오일을 긁어내는 역할을 합니다."
      },
      {
        "id": 7,
        "name": "커넥팅 로드 볼트",
        "nameEn": "Conrod Bolt",
        "modelFileUrl": "https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/Conrod%20Bolt.glb",
        "material": "고강도 합금강",
        "role": "커넥팅 로드 캡을 고정하는 볼트입니다."
      }
    ],
    "totalElements": 7,
    "totalPages": 1,
    "page": 1,
    "size": 8
  },
  "timestamp": "2026-02-08T21:31:20.699961926"
}

4. @MemoPad.tsx
 4-1. api: [GET]/api/objects/{objectId}/memos?objectId={objectId}&sessionId={sessionId}
 4-2. response: 
{
  "message": "string",
  "data": {
    "content": [
      {
        "id": 1,
        "objectId": 1,
        "content": "피스톤의 왕복운동이 크랭크샤프트로 전달되는 원리 정리",
        "createdAt": "2026-02-08T12:46:30.293Z",
        "updatedAt": "2026-02-08T12:46:30.293Z"
      }
    ],
    "totalElements": 0,
    "totalPages": 0,
    "page": 0,
    "size": 0
  },
  "timestamp": "2026-02-08T12:46:30.293Z"
}

5. @MemoPad.tsx
  5-1. api: [POST] /api/objects/{objectId}/memos?sessionId={sessionId}
  5-2. request:
{
  "content": "피스톤의 왕복운동이 크랭크샤프트로 전달되는 원리 정리"
}
  5-3. response: 
{
  "message": "string",
  "data": {
    "id": 1,
    "objectId": 1,
    "content": "피스톤의 왕복운동이 크랭크샤프트로 전달되는 원리 정리",
    "createdAt": "2026-02-08T12:47:06.938Z",
    "updatedAt": "2026-02-08T12:47:06.938Z"
  },
  "timestamp": "2026-02-08T12:47:06.938Z"
} 

6. @MemoPad.tsx
  6-1. api: [PUT] /api/memos/{memoId}?memo={memoId}&sessionId={sessionId}
  6-2. request:
  {
  "content": "피스톤의 왕복운동이 크랭크샤프트로 전달되는 원리 정리"
} 
  6-3. response: 
{
  "message": "string",
  "data": {
    "id": 1,
    "objectId": 1,
    "content": "피스톤의 왕복운동이 크랭크샤프트로 전달되는 원리 정리",
    "createdAt": "2026-02-08T12:47:06.938Z",
    "updatedAt": "2026-02-08T12:47:06.938Z"
  },
  "timestamp": "2026-02-08T12:47:06.938Z"
}   

7. @MemoPad.tsx
  7-1. api: [DELETE] /api/memos/{memoId}?memo={memoId}&sessionId={sessionId}
  7-2. response: 
{
  "message": "string",
  "data": {},
  "timestamp": "2026-02-08T12:48:52.235Z"
}  

8. @AIAssistant.tsx
  8-1. api: [POST] /api/ai/chat
  8-2. request: 
  {
  "object3DId": 0,
  "question": "string",
  "conversationHistory": [
    {
      "role": "string",
      "content": "string"
    }
  ]
}
  8-3. response: 
{
  "answer": "string",
  "role": "string"
}