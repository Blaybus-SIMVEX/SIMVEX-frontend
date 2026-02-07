import { CardList } from '@/features/study/components/CardList';

export default async function Study() {
  return (
    <div className="flex flex-col justify-between items-start h-[758px] px-10 mt-9">
      <div className="flex flex-col gap-5">
        <h1 className="text-gray-900 text-[32px] font-bold">학습 콘텐츠 선택</h1>
      </div>
      <CardList />
    </div>
  );
}
