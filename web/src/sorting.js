export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function createColorStops(n) {
  const colors = [
    [124, 58, 237],
    [59, 130, 246],
    [6, 182, 212],
    [16, 185, 129],
  ];
  return Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0 : i / (n - 1);
    const segment = t * (colors.length - 1);
    const idx = Math.min(Math.floor(segment), colors.length - 2);
    const frac = segment - idx;
    const r = Math.round(colors[idx][0] + (colors[idx + 1][0] - colors[idx][0]) * frac);
    const g = Math.round(colors[idx][1] + (colors[idx + 1][1] - colors[idx][1]) * frac);
    const b = Math.round(colors[idx][2] + (colors[idx + 1][2] - colors[idx][2]) * frac);
    return `rgb(${r},${g},${b})`;
  });
}

export function generateArray(size, setArray, setColors) {
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 500) + 5);
  setArray(arr);
  setColors(createColorStops(size));
}

export function shuffleArray(arr, setArray) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  setArray(a);
  return a;
}

// ─── Bubble Sort ─── O(n²)
export async function bubbleSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      onStep({ states: new Map([[j, 'comparing'], [j + 1, 'comparing']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
      }
    }
  }
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Insertion Sort ─── O(n²)
export async function insertionSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  const n = a.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      comparisons++;
      onStep({ states: new Map([[j, 'comparing'], [j - 1, 'comparing']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      if (a[j] < a[j - 1]) {
        [a[j], a[j - 1]] = [a[j - 1], a[j]];
        swaps++;
        j--;
      } else {
        break;
      }
    }
  }
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Selection Sort ─── O(n²)
export async function selectionSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      onStep({ states: new Map([[j, 'comparing'], [minIdx, 'pivot'], [i, 'pivot']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      swaps++;
    }
    onStep({ states: new Map([[i, 'sorted']]), comparisons, swaps, array: [...a] });
  }
  onStep({ states: new Map([[n - 1, 'sorted']]), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Merge Sort ─── O(n log n)
export async function mergeSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;

  async function merge(l, m, r) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      comparisons++;
      onStep({ states: new Map([[k, 'comparing']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
        swaps++;
      }
    }
    while (i < left.length) {
      a[k] = left[i];
      onStep({ states: new Map([[k, 'swapping']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      k++; i++;
    }
    while (j < right.length) {
      a[k] = right[j];
      onStep({ states: new Map([[k, 'swapping']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      k++; j++;
    }
  }

  async function sort(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    await sort(l, m);
    await sort(m + 1, r);
    await merge(l, m, r);
  }

  await sort(0, a.length - 1);
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Quick Sort ─── O(n log n) avg
export async function quickSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;

  async function partition(low, high) {
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      comparisons++;
      onStep({ states: new Map([[j, 'comparing'], [high, 'pivot']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    swaps++;
    onStep({ states: new Map([[i + 1, 'pivot']]), comparisons, swaps, array: [...a] });
    return i + 1;
  }

  async function sort(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
  }

  await sort(0, a.length - 1);
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Radix Sort (LSD) ─── O(d * (n + k))
export async function radixSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  const max = Math.max(...a);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(a.length);
    const count = new Array(10).fill(0);

    for (let i = 0; i < a.length; i++) {
      const digit = Math.floor(a[i] / exp) % 10;
      count[digit]++;
      onStep({ states: new Map([[i, 'comparing']]), comparisons, swaps, array: [...a] });
      await sleep(Math.max(1, Math.floor(getDelay() / 3)));
    }

    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = a.length - 1; i >= 0; i--) {
      const digit = Math.floor(a[i] / exp) % 10;
      output[count[digit] - 1] = a[i];
      count[digit]--;
    }

    for (let i = 0; i < a.length; i++) {
      const old = a[i];
      a[i] = output[i];
      if (old !== output[i]) swaps++;
      onStep({ states: new Map([[i, 'swapping']]), comparisons, swaps, array: [...a] });
      await sleep(Math.max(1, Math.floor(getDelay() / 3)));
    }
  }
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Heap Sort ─── O(n log n)
export async function heapSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  const n = a.length;

  async function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      comparisons++;
      if (a[left] > a[largest]) largest = left;
    }
    if (right < size) {
      comparisons++;
      if (a[right] > a[largest]) largest = right;
    }

    if (largest !== root) {
      onStep({ states: new Map([[root, 'comparing'], [largest, 'pivot']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      [a[root], a[largest]] = [a[largest], a[root]];
      swaps++;
      onStep({ states: new Map([[root, 'swapping'], [largest, 'swapping']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      await heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    onStep({ states: new Map([[0, 'swapping'], [i, 'swapping']]), comparisons, swaps, array: [...a] });
    await sleep(getDelay());
    [a[0], a[i]] = [a[i], a[0]];
    swaps++;
    onStep({ states: new Map([[i, 'sorted']]), comparisons, swaps, array: [...a] });
    await heapify(i, 0);
  }

  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Shell Sort ─── O(n log² n)
export async function shellSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  const n = a.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = a[i];
      let j = i;
      while (j >= gap) {
        comparisons++;
        onStep({ states: new Map([[j, 'comparing'], [j - gap, 'comparing']]), comparisons, swaps, array: [...a] });
        await sleep(getDelay());
        if (a[j - gap] > temp) {
          a[j] = a[j - gap];
          swaps++;
          onStep({ states: new Map([[j, 'swapping']]), comparisons, swaps, array: [...a] });
          j -= gap;
        } else {
          break;
        }
      }
      a[j] = temp;
    }
  }
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Cocktail Shaker Sort ─── O(n²)
export async function cocktailSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  let start = 0, end = a.length - 1;

  while (start < end) {
    for (let i = start; i < end; i++) {
      comparisons++;
      onStep({ states: new Map([[i, 'comparing'], [i + 1, 'comparing']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swaps++;
      }
    }
    end--;
    for (let i = end; i > start; i--) {
      comparisons++;
      onStep({ states: new Map([[i, 'comparing'], [i - 1, 'comparing']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      if (a[i] < a[i - 1]) {
        [a[i], a[i - 1]] = [a[i - 1], a[i]];
        swaps++;
      }
    }
    start++;
  }
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Gnome Sort ─── O(n²)
export async function gnomeSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  let i = 0;

  while (i < a.length) {
    if (i === 0) {
      i++;
    } else {
      comparisons++;
      onStep({ states: new Map([[i, 'comparing'], [i - 1, 'comparing']]), comparisons, swaps, array: [...a] });
      await sleep(getDelay());
      if (a[i] >= a[i - 1]) {
        i++;
      } else {
        [a[i], a[i - 1]] = [a[i - 1], a[i]];
        swaps++;
        onStep({ states: new Map([[i, 'swapping'], [i - 1, 'swapping']]), comparisons, swaps, array: [...a] });
        i--;
      }
    }
  }
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Bucket Sort ─── O(n + k) avg
export async function bucketSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  const n = a.length;
  if (n === 0) return a;

  const max = Math.max(...a);
  const min = Math.min(...a);
  const bucketCount = Math.max(1, Math.floor(n / 5));
  const range = max - min + 1;

  const buckets = Array.from({ length: bucketCount }, () => []);

  for (let i = 0; i < n; i++) {
    const idx = Math.min(Math.floor(((a[i] - min) / range) * bucketCount), bucketCount - 1);
    buckets[idx].push(a[i]);
    onStep({ states: new Map([[i, 'comparing']]), comparisons, swaps, array: [...a] });
    await sleep(Math.max(1, Math.floor(getDelay() / 3)));
  }

  let k = 0;
  for (let b = 0; b < bucketCount; b++) {
    const bucket = buckets[b];
    // Insertion sort within bucket
    for (let i = 1; i < bucket.length; i++) {
      let j = i;
      while (j > 0) {
        comparisons++;
        if (bucket[j] < bucket[j - 1]) {
          [bucket[j], bucket[j - 1]] = [bucket[j - 1], bucket[j]];
          swaps++;
          j--;
        } else {
          break;
        }
      }
    }
    // Copy sorted bucket back into main array immediately
    for (let j = 0; j < bucket.length; j++) {
      a[k] = bucket[j];
      onStep({ states: new Map([[k, 'swapping']]), comparisons, swaps, array: [...a] });
      await sleep(Math.max(1, Math.floor(getDelay() / 3)));
      k++;
    }
  }
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}

// ─── Counting Sort ─── O(n + k)
export async function countingSort(arr, getDelay, onStep) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;
  const n = a.length;
  if (n === 0) return a;

  const max = Math.max(...a);
  const min = Math.min(...a);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(n);

  for (let i = 0; i < n; i++) {
    count[a[i] - min]++;
    onStep({ states: new Map([[i, 'comparing']]), comparisons, swaps, array: [...a] });
    await sleep(Math.max(1, Math.floor(getDelay() / 3)));
  }

  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
    comparisons++;
  }

  for (let i = n - 1; i >= 0; i--) {
    output[count[a[i] - min] - 1] = a[i];
    count[a[i] - min]--;
  }

  for (let i = 0; i < n; i++) {
    const old = a[i];
    a[i] = output[i];
    if (old !== output[i]) swaps++;
    onStep({ states: new Map([[i, 'swapping']]), comparisons, swaps, array: [...a] });
    await sleep(Math.max(1, Math.floor(getDelay() / 3)));
  }
  onStep({ states: new Map(), comparisons, swaps, array: [...a] });
  return a;
}
