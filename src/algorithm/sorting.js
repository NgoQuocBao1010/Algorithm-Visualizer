// const mergeUnsortedArr = (leftArr, rightArr) => {
//     const sortedArr = [];
//     // Continue if there is any element left in 1 of 2 arrays
//     while (leftArr.length && rightArr.length) {
//         // Check for the smaller element and put them into the new array
//         if (leftArr[0] <= rightArr[0]) {
//             sortedArr.push(leftArr.shift());
//         } else {
//             sortedArr.push(rightArr.shift());
//         }
//     }

//     return [...sortedArr, ...leftArr, ...rightArr];
// };

// const mergeSort = (arr) => {
//     // Divide array into 2 smaller array
//     if (arr.length <= 1) return arr; // No need to divide a sigle element array

//     const middleIndex = arr.length / 2;

//     const right = [...arr];
//     const left = right.splice(0, middleIndex);

//     return mergeUnsortedArr(mergeSort(left), mergeSort(right));
// };

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

export default { doMergeSort };
