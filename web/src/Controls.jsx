const algorithms = [
  {
    id: 'bubble', label: 'Bubble', icon: 'Bu', category: 'O(n\u00B2)',
    description: 'Compare adjacent elements and swap if wrong order. Largest elements "bubble" to the end after each pass.',
    example: '[3,1,4] \u2192 compare 3&1, swap \u2192 [1,3,4] \u2192 compare 3&4, done \u2192 sorted',
    bestFor: 'Small or nearly sorted arrays.',
  },
  {
    id: 'insertion', label: 'Insertion', icon: 'In', category: 'O(n\u00B2)',
    description: 'Pick each element and slide it into its correct position among the sorted ones. Like sorting cards in hand.',
    example: '[3,1,4] \u2192 slide 1 before 3 \u2192 [1,3,4] \u2192 sorted',
    bestFor: 'Small arrays or nearly sorted data.',
  },
  {
    id: 'selection', label: 'Selection', icon: 'Se', category: 'O(n\u00B2)',
    description: 'Find the smallest unsorted element and swap it to the front. Repeat until done.',
    example: '[3,1,4] \u2192 find min=1, swap with 3 \u2192 [1,3,4] \u2192 sorted',
    bestFor: 'When you want minimal swaps.',
  },
  {
    id: 'merge', label: 'Merge', icon: 'Me', category: 'O(n log n)',
    description: 'Split in half, sort each half, merge back in order. Guaranteed O(n log n) and stable.',
    example: '[3,1,4] \u2192 split [3,1] | [4] \u2192 sort halves \u2192 merge [1,3,4]',
    bestFor: 'When you need guaranteed speed and stability.',
  },
  {
    id: 'quick', label: 'Quick', icon: 'Qu', category: 'O(n log n)',
    description: 'Pick a pivot. Smaller goes left, bigger goes right. Recurse on both sides. Fastest in practice.',
    example: '[3,1,4,5] \u2192 pivot=5, smaller go left \u2192 [3,1,4] [5] \u2192 recurse',
    bestFor: 'Fastest for random data.',
  },
  {
    id: 'heap', label: 'Heap', icon: 'He', category: 'O(n log n)',
    description: 'Build a max-heap tree, then repeatedly extract the largest element and move it to the end.',
    example: 'Build heap \u2192 swap max to end \u2192 re-heapify \u2192 repeat',
    bestFor: 'Guaranteed speed with no extra memory.',
  },
  {
    id: 'shell', label: 'Shell', icon: 'Sh', category: 'O(n log\u00B2n)',
    description: 'Insertion sort with a twist: compare elements far apart first using a gap, then shrink the gap until it\u2019s 1.',
    example: 'gap=2: compare 2 apart \u2192 gap=1: compare neighbors \u2192 sorted',
    bestFor: 'Medium arrays. Faster than plain insertion sort.',
  },
  {
    id: 'radix', label: 'Radix', icon: 'Ra', category: 'O(d\u00B7n)',
    description: 'Sort digit by digit from right to left. Each pass uses counting sort for one digit position.',
    example: '[12,3,45] \u2192 sort by ones \u2192 sort by tens \u2192 done',
    bestFor: 'Integers with fixed number of digits.',
  },
  {
    id: 'counting', label: 'Counting', icon: 'Co', category: 'O(n+k)',
    description: 'Count how many times each value appears, then place them in order. No comparisons needed.',
    example: '[3,1,4,1] \u2192 count {1:2,3:1,4:1} \u2192 place [1,1,3,4]',
    bestFor: 'Small value range. Blazing fast.',
  },
  {
    id: 'bucket', label: 'Bucket', icon: 'Bk', category: 'O(n+k)',
    description: 'Group elements into buckets by value range, sort each bucket, concatenate.',
    example: '[15,5,25] \u2192 bucket0:[15,5] bucket1:[25] \u2192 sort \u2192 [5,15,25]',
    bestFor: 'Uniformly distributed data.',
  },
  {
    id: 'cocktail', label: 'Cocktail', icon: 'Ck', category: 'O(n\u00B2)',
    description: 'Bubble sort that goes forward and backward alternately. Moves small elements to the start faster.',
    example: 'Forward: [1,3,4] \u2192 Backward: [1,3,4] \u2192 sorted',
    bestFor: 'Slightly better than bubble sort.',
  },
  {
    id: 'gnome', label: 'Gnome', icon: 'Gn', category: 'O(n\u00B2)',
    description: 'Compare current with previous. Swap if wrong and step back. Move forward if correct.',
    example: '[3,1,4] \u2192 swap 3&1 \u2192 [1,3,4] \u2192 move forward \u2192 sorted',
    bestFor: 'Simplest sort to understand.',
  },
];

const activeGradients = {
  bubble: 'from-purple-500 to-indigo-600',
  insertion: 'from-blue-500 to-cyan-600',
  selection: 'from-cyan-500 to-teal-600',
  merge: 'from-emerald-500 to-green-600',
  quick: 'from-amber-500 to-orange-600',
  heap: 'from-orange-500 to-red-600',
  shell: 'from-pink-500 to-rose-600',
  radix: 'from-rose-500 to-pink-600',
  counting: 'from-fuchsia-500 to-purple-600',
  bucket: 'from-violet-500 to-indigo-600',
  cocktail: 'from-teal-500 to-cyan-600',
  gnome: 'from-lime-500 to-green-600',
};

export default function Controls({
  selected,
  onSelect,
  onSort,
  onShuffle,
  speed,
  onSpeedChange,
  size,
  onSizeChange,
  sorting,
  comparisons,
  swaps,
}) {
  const handleSizeInput = (val) => {
    const n = Math.min(200, Math.max(5, Number(val) || 5));
    onSizeChange(n);
  };

  const activeAlgo = algorithms.find((a) => a.id === selected);

  return (
    <div className="flex flex-col gap-5 mb-6">
      {/* Algorithm selector */}
      <div className="grid grid-cols-6 gap-2 justify-items-center">
        {algorithms.map((algo) => {
          const active = selected === algo.id;
          return (
            <button
              key={algo.id}
              onClick={() => !sorting && onSelect(algo.id)}
              disabled={sorting}
              className={`
                w-full px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-300 ease-out cursor-pointer
                ${sorting ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                ${
                  active
                    ? `bg-gradient-to-r ${activeGradients[algo.id]} text-white shadow-lg shadow-black/30`
                    : 'bg-dark-700/80 text-gray-400 hover:bg-dark-600 hover:text-gray-200 hover:shadow-md hover:shadow-black/20'
                }
              `}
            >
              <span className="flex flex-col items-center gap-0.5">
                <span className="text-[11px] opacity-60">{algo.category}</span>
                <span>{algo.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Algorithm explanation */}
      {activeAlgo && (
        <div className="glass rounded-xl px-6 py-5 text-base text-gray-200 leading-relaxed">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-lg text-sm font-bold text-white bg-gradient-to-r ${activeGradients[activeAlgo.id]}`}>
              {activeAlgo.label} Sort
            </span>
            <span className="text-sm text-gray-400 font-mono">{activeAlgo.category}</span>
          </div>
          <p className="mb-3 text-lg">{activeAlgo.description}</p>
          <p className="text-sm text-gray-400 font-mono mb-1.5">{activeAlgo.example}</p>
          <p className="text-sm text-gray-400">Best for: {activeAlgo.bestFor}</p>
        </div>
      )}

      {/* Action buttons + sliders */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onShuffle}
          disabled={sorting}
          className="btn-shine px-5 py-2.5 rounded-xl bg-dark-700/80 text-gray-300 font-medium
            hover:bg-dark-600 hover:text-white hover:shadow-md hover:shadow-black/20
            active:scale-95 transition-all duration-200 cursor-pointer
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Shuffle
        </button>

        <button
          onClick={onSort}
          disabled={sorting}
          className={`
            btn-shine px-8 py-2.5 rounded-xl font-semibold text-white
            transition-all duration-300 cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            ${
              sorting
                ? 'bg-gradient-to-r from-gray-600 to-gray-700'
                : 'bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 pulse-ring'
            }
          `}
        >
          {sorting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sorting...
            </span>
          ) : (
            'Sort'
          )}
        </button>

        <div className="glass rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Speed</span>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(+e.target.value)}
            disabled={sorting}
            className="disabled:opacity-40"
          />
          <span className="text-[10px] text-gray-400 w-6 text-right tabular-nums">{speed}</span>
        </div>

        <div className="glass rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Size</span>
          <input
            type="range"
            min="5"
            max="200"
            value={size}
            onChange={(e) => onSizeChange(+e.target.value)}
            disabled={sorting}
            className="disabled:opacity-40"
          />
          <input
            type="number"
            min="5"
            max="200"
            value={size}
            onChange={(e) => handleSizeInput(e.target.value)}
            disabled={sorting}
            className="w-14 bg-dark-900/60 text-gray-300 text-[10px] text-center rounded-md px-1 py-1 border border-dark-600 focus:border-purple-500 focus:outline-none tabular-nums disabled:opacity-40"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="glass rounded-xl px-4 py-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-gray-500 text-xs">Comparisons</span>
          <strong className="text-purple-400 tabular-nums" key={comparisons}>
            {comparisons.toLocaleString()}
          </strong>
        </div>
        <div className="glass rounded-xl px-4 py-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-gray-500 text-xs">Swaps</span>
          <strong className="text-red-400 tabular-nums" key={swaps}>
            {swaps.toLocaleString()}
          </strong>
        </div>
      </div>
    </div>
  );
}
