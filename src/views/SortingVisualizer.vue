<script setup>
import { onMounted, watch, ref } from "vue";

import algorithm from "../algorithm/sorting";

// * Array Container
let arrayContainer = $ref(null);
let containerHeight = $computed(() => arrayContainer.clientHeight);
let containerWidth = $computed(() => arrayContainer.clientWidth);
let barWidth = $ref(5);

const calcBarHeight = (value) => {
    return Math.round((value * containerHeight) / 1000);
};

// * Sort configuaration
let sortConfig = $ref({
    length: 50,
    animationTime: 5,
});
watch(
    () => sortConfig.length,
    () => generateArray()
);

// * Timeout Capture
const timeoutCapture = [];
const clearAllTimeout = () => {
    while (timeoutCapture.length > 0) {
        const timeout = timeoutCapture.pop();
        clearTimeout(timeout);
    }
};

// * Array itself
let array = $ref([]);
const generateArray = () => {
    barWidth = Math.floor(containerWidth / sortConfig.length);

    clearAllTimeout();

    array = [];
    for (let i = 0; i < sortConfig.length; i++) {
        array.push(generateRandomInt({}));
    }
};

// * Sort algorithm
const mergeSort = () => {
    /* Trigger merge sort animation */
    if (isSorted(array) || timeoutCapture.length > 0) return;

    const copyArr = [...array];
    const steps = algorithm.doMergeSort(copyArr);

    steps.forEach((step, index) => {
        const bars = document.querySelectorAll("li.element");

        const [barOneIndex, secondVal, action] = step;

        if (action !== "swap") {
            const barOneStyle = bars[barOneIndex].style;
            const barTwoStyle = bars[secondVal].style;

            const color = action === "compare" ? "blue" : "lightcoral";

            timeoutCapture.push(
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, index * sortConfig.animationTime)
            );
        } else {
            timeoutCapture.push(
                setTimeout(() => {
                    const [barOneIndex, val] = step;
                    array[barOneIndex] = val;
                }, index * sortConfig.animationTime)
            );
        }
    });
};

const quickSort = () => {
    if (isSorted(array) || timeoutCapture.length > 0) return;

    const copyArr = [...array];
    const steps = algorithm.doQuickSort(copyArr);
    // console.log(steps);

    steps.forEach((step, stepIndex) => {
        const bars = document.querySelectorAll("li.element");

        const { state } = step;
        if (state === "pivot") {
            const { index } = step;
            timeoutCapture.push(
                setTimeout(() => {
                    bars[index].style.backgroundColor = "blue";
                }, stepIndex * sortConfig.animationTime)
            );
        } else if (state === "mark") {
            const { index1, index2 } = step;
            timeoutCapture.push(
                setTimeout(() => {
                    bars[index1].style.backgroundColor = "green";
                    bars[index2].style.backgroundColor = "green";
                }, stepIndex * sortConfig.animationTime)
            );
        } else if (state === "swap") {
            const { index1, index2 } = step;
            timeoutCapture.push(
                setTimeout(() => {
                    swap(index1, index2);
                }, stepIndex * sortConfig.animationTime)
            );
        } else if (state === "invert") {
            const { index1, index2 } = step;
            timeoutCapture.push(
                setTimeout(() => {
                    bars[index1].style.backgroundColor = "lightcoral";
                    bars[index2].style.backgroundColor = "lightcoral";
                }, stepIndex * sortConfig.animationTime)
            );
        }
    });
};

// ** Life cycle hooks
onMounted(() => {
    generateArray();
});

// ** Helper functions
const generateRandomInt = ({ min = 40, max = 900 }) => {
    /* Generate random int between min and max args */
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isSorted = (arr) => {
    /* Check if arr is sorted from small to big */
    const arrLength = arr.length;

    if (arrLength === 1 || arrLength === 0) return true;

    const reduceArr = arr.slice(0, -1);
    return arr[arrLength - 1] >= arr[arrLength - 2] && isSorted(reduceArr);
};

const swap = (pos1, pos2) => {
    const tmp = array[pos1];
    array[pos1] = array[pos2];
    array[pos2] = tmp;
};
</script>

<template>
    <div class="wrapper">
        <!-- Array Container -->
        <div class="array-container">
            <ul ref="arrayContainer">
                <li
                    class="element"
                    v-for="(value, index) in array"
                    :key="index"
                    :style="{
                        height: `${calcBarHeight(value)}px`,
                        width: `${barWidth}px !important`,
                    }"
                >
                    <span
                        v-if="array.length < 100"
                        class="value"
                        :style="{
                            fontSize: barWidth <= 32 ? `${barWidth / 2}px` : '16px',
                        }"
                    >
                        {{ value }}
                    </span>
                </li>
            </ul>
        </div>

        <!-- Control Panel -->
        <div class="control-container">
            <h3>Sorting Control</h3>
            <div class="buttons">
                <button @click="generateArray()">Gerenare new Array</button>

                <button @click="mergeSort()">Sorting</button>

                <!-- Array length input -->
                <div class="inputs">
                    <label for="arrayLength">
                        Array Length: {{ sortConfig.length }}
                    </label>
                    <input
                        v-model="sortConfig.length"
                        type="range"
                        min="10"
                        max="300"
                        class="slider"
                    />
                </div>

                <!-- Animation length input -->
                <div class="inputs">
                    <label for="animation">
                        Sort Animation: {{ sortConfig.animationTime }}
                    </label>
                    <input
                        v-model="sortConfig.animationTime"
                        type="range"
                        min="1"
                        max="50"
                        class="slider"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    margin-top: 2rem;
    width: 100%;

    .array-container {
        display: flex;
        justify-content: center;
        align-items: center;

        ul {
            padding: 1rem 10px;
            margin: 1rem 0;
            width: 95%;
            height: 50vh;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            border-radius: 1.5rem;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
                rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

            li.element {
                list-style: none;
                background: lightcoral;
                height: 100%;
                margin: 0 1px;

                display: flex;
                justify-content: center;
                align-items: center;

                border-top-right-radius: 5px;
                border-top-left-radius: 5px;

                span {
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                }
            }
        }
    }

    .control-container {
        margin: 2rem;
        padding: 1.2rem;
        display: flex;
        gap: 1rem;
        display: flex;
        flex-direction: column;
        background: rgba(173, 216, 230, 0.6);
        border-radius: 15px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
            rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

        .buttons {
            margin: 1em 0;
            display: flex;
            align-items: flex-end;
            justify-content: space-around;
            gap: 2rem;

            button {
                margin-right: 20px;
                height: 3em;
                width: 11em;
                background: rgb(0, 89, 255);
                color: rgb(255, 255, 255);
                font-size: 1.05em;
                border: none;
                border-radius: 5px;
                position: relative;
                background: rgb(0, 89, 255);
                z-index: 1;
                transition: all 0.3s ease-out;

                &:hover {
                    color: black;
                    cursor: pointer;

                    &::after {
                        width: 100%;
                    }
                }

                &::after {
                    content: " ";
                    position: absolute;
                    height: 100%;
                    width: 0;
                    background: #fffb0e;
                    right: 0;
                    top: 0;
                    border-radius: 5px;
                    z-index: -1;
                    transition: all 0.3s ease-out;
                }
            }

            .inputs {
                display: flex;
                flex-direction: column;

                label {
                    font-size: 20px;
                }

                .slider {
                    margin-top: 10px;
                    -webkit-appearance: none;
                    width: 200px;
                    max-width: 200px;
                    height: 25px;
                    background: #fff;
                    outline: none;
                    opacity: 0.7;
                    -webkit-transition: 0.2s;
                    transition: opacity 0.2s;

                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 25px;
                        height: 25px;
                        background: #04aa6d;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
