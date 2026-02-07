'use client';

export default function LeafSpringInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 w-80 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-lg text-gray-900 leading-tight">
          Leaf Spring<br />
          <span className="text-gray-500 text-sm font-normal">(판스프링/리프 스프링)</span>
        </h2>
        <button className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        <span className="px-2 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded border border-primary-200">
          완제품
        </span>
        <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded border border-gray-200">
          부품상세 설명
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-bold text-sm text-gray-800">이론</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          리프 스프링은 길이와 곡률이 다른 여러 개의 강판을 겹쳐서 만든 스프링이다. 
          주로 화물차나 트럭 등 대형 차량의 현가장치에 사용되며, 구조가 간단하고 내구성이 강하여 충격 흡수 능력이 뛰어나다.
        </p>
      </div>
    </div>
  );
}
