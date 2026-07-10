import { useState, useRef, useCallback } from 'react';
import Controls from './Controls';
import Visualizer from './Visualizer';
import {
  generateArray,
  shuffleArray,
  sleep,
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  radixSort,
  heapSort,
  shellSort,
  cocktailSort,
  gnomeSort,
  bucketSort,
  countingSort,
} from './sorting';

const algoMap = {
  bubble: bubbleSort,
  insertion: insertionSort,
  selection: selectionSort,
  merge: mergeSort,
  quick: quickSort,
  radix: radixSort,
  heap: heapSort,
  shell: shellSort,
  cocktail: cocktailSort,
  gnome: gnomeSort,
  bucket: bucketSort,
  counting: countingSort,
};

export default function App() {
  const [array, setArray] = useState([]);
  const [colors, setColors] = useState([]);
  const [states, setStates] = useState(new Map());
  const [selected, setSelected] = useState('bubble');
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [size, setSize] = useState(50);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const sortingRef = useRef(false);

  const getDelay = useCallback(() => Math.max(1, 101 - speed), [speed]);

  const handleShuffle = useCallback(() => {
    if (sortingRef.current) return;
    shuffleArray(array, setArray);
    setStates(new Map());
    setComparisons(0);
    setSwaps(0);
  }, [array]);

  const handleSort = useCallback(async () => {
    if (sortingRef.current) return;
    sortingRef.current = true;
    setSorting(true);
    setStates(new Map());
    setComparisons(0);
    setSwaps(0);

    const sortFn = algoMap[selected];

    const sortedArray = await sortFn(array, getDelay, ({ states: s, comparisons: c, swaps: w, array: currentArray }) => {
      if (!sortingRef.current) return;
      setArray(currentArray);
      setStates(new Map(s));
      setComparisons(c);
      setSwaps(w);
    });

    setArray(sortedArray);

    // Sweep animation
    const finalStates = new Map();
    for (let i = 0; i < sortedArray.length; i++) {
      finalStates.set(i, 'sorted');
      setStates(new Map(finalStates));
      await sleep(Math.max(1, Math.floor(100 / sortedArray.length)));
    }

    setSorting(false);
    sortingRef.current = false;
  }, [array, selected, getDelay]);

  const handleSizeChange = useCallback((newSize) => {
    setSize(newSize);
    if (!sortingRef.current) {
      generateArray(newSize, setArray, setColors);
      setStates(new Map());
      setComparisons(0);
      setSwaps(0);
    }
  }, []);

  // Initialize on first render
  useState(() => {
    generateArray(50, setArray, setColors);
  });

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <div className="bg-glow" />

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Sort Visualizer
        </h1>
        <p className="text-gray-600 text-sm">
          12 algorithms — pick one, adjust speed & size, then hit Sort
        </p>
      </div>

      <Controls
        selected={selected}
        onSelect={setSelected}
        onSort={handleSort}
        onShuffle={handleShuffle}
        speed={speed}
        onSpeedChange={setSpeed}
        size={size}
        onSizeChange={handleSizeChange}
        sorting={sorting}
        comparisons={comparisons}
        swaps={swaps}
      />

      <Visualizer array={array} states={states} colors={colors} />

      <div className="flex justify-center gap-6 mt-4 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-b from-white to-purple-300" /> Comparing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-b from-red-400 to-red-600" /> Swapping
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-b from-yellow-400 to-yellow-600" /> Pivot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-b from-emerald-400 to-emerald-600" /> Sorted
        </span>
      </div>
    </div>
  );
}
