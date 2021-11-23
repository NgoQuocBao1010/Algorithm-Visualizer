/* Merge sort with auxiliary array */
const doMergeSort = (array) => {
    let steps = [];

    if (array.length <= 1) return array;
    let auxArray = array.slice();

    mergeSort(array, auxArray, 0, array.length - 1, steps);

    return steps;
};

const mergeSort = (array, auxArray, low, high, steps) => {
    if (low === high) return;

    const mid = Math.floor((low + high) / 2);

    mergeSort(auxArray, array, low, mid, steps);
    mergeSort(auxArray, array, mid + 1, high, steps);
    merge(array, auxArray, low, mid, high, steps);
};

const merge = (array, auxArray, low, mid, high, steps) => {
    let k = low;
    let i = low;
    let j = mid + 1;

    // Merge the 2 parts
    while (i <= mid && j <= high) {
        steps.push([i, j, "compare"]);
        steps.push([i, j, "revert"]);

        if (auxArray[i] <= auxArray[j]) {
            steps.push([k, auxArray[i], "swap"]);
            array[k] = auxArray[i];

            k++;
            i++;
        } else {
            steps.push([k, auxArray[j], "swap"]);
            array[k] = auxArray[j];

            k++;
            j++;
        }
    }

    // Merge the left over there is still element has not checked
    while (i <= mid) {
        steps.push([k, auxArray[i], "swap"]);
        array[k] = auxArray[i];
        k++;
        i++;
    }

    while (j <= high) {
        steps.push([k, auxArray[j], "swap"]);
        array[k] = auxArray[j];

        k++;
        j++;
    }
};

/* Quick sort */
const swap = (array, pos1, pos2) => {
    const tmp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = tmp;
};

const partition = (array, low, high, animations) => {
    const pivot = array[high];
    animations.push({ index: high, state: "pivot" });

    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            swap(array, i, j);
            animations.push({ index1: i, index2: j, state: "mark" });
            animations.push({ index1: i, index2: j, state: "swap" });
            animations.push({ index1: i, index2: j, state: "invert" });
        }
    }

    swap(array, i + 1, high);
    animations.push({ index1: i + 1, index2: high, state: "mark" });
    animations.push({ index1: i + 1, index2: high, state: "swap" });
    animations.push({ index1: i + 1, index2: high, state: "invert" });
    return i + 1;
};

const quickSort = (array, low, high, animations) => {
    if (low < high) {
        const pivot = partition(array, low, high, animations);

        quickSort(array, low, pivot - 1, animations);
        quickSort(array, pivot + 1, high, animations);
    }
};

const doQuickSort = (array) => {
    const animations = [];
    quickSort(array, 0, array.length - 1, animations);

    return animations;
};

export default { doMergeSort, doQuickSort };
