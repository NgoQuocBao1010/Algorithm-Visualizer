const mergeUnsortedArr = (leftArr, rightArr) => {
    const sortedArr = [];
    // Continue if there is any element left in 1 of 2 arrays
    while (leftArr.length && rightArr.length) {
        // Check for the smaller element and put them into the new array
        if (leftArr[0] <= rightArr[0]) {
            sortedArr.push(leftArr.shift());
        } else {
            sortedArr.push(rightArr.shift());
        }
    }

    return [...sortedArr, ...leftArr, ...rightArr];
};

const mergeSort = (arr) => {
    // Divide array into 2 smaller array
    if (arr.length <= 1) return arr; // No need to divide a sigle element array

    const middleIndex = arr.length / 2;

    const right = [...arr];
    const left = right.splice(0, middleIndex);

    return mergeUnsortedArr(mergeSort(left), mergeSort(right));
};

export default { mergeSort };
