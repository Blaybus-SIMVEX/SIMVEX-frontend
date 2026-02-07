import Card from '@/features/components/Card';
import { CardData } from '@/features/types';

const dummy: CardData = {
  id: 1,
  name: 'V4 실린더 엔진',
  nameEn: 'V4 Engine',
  description:
    'V4 실린더 엔진의 구조와 작동 원리를 학습할 수 있는 3D 모델입니다. 피스톤의 왕복 운동이 크랭크샤프트의 회전 운동으로 변환되는 과정을 관찰할 수 있습니다.',
  thumbnailUrl:
    'https://kr.object.ncloudstorage.com/simvex-bucket/v4-engine/V4%EC%8B%A4%EB%A6%B0%EB%8D%94%20%EC%97%94%EC%A7%84%20%EC%A1%B0%EB%A6%BD%EB%8F%84.png',
  categoryTags: ['항공', '기계공학'],
};

export default function Study() {
  return (
    <div>
      <Card data={dummy} />
    </div>
  );
}
