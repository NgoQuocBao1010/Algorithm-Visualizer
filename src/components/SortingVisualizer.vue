<template>
    <div class="wrapper">
        <div class="array-container">
            <ul ref="arrayContainer">
                <li
                    v-for="(value, index) in array"
                    :key="index"
                    :style="{
                        height: `${calcHeight(value)}px`,
                        width: `${barWidth}px !important`,
                    }"
                >
                    <span v-if="barWidth > 40" class="value">{{ value }}</span>
                </li>
            </ul>
        </div>

        {{ message }}
        <!-- Control buttons -->
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

                <!-- Array length input -->
                <div class="inputs">
                    <label for="arrayLength">
                        Sort Animation: {{ sortConfig.animationTime }}
                    </label>
                    <input
                        v-model="sortConfig.animationTime"
                        type="range"
                        min="1"
                        max="5"
                        class="slider"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import algorithm from "../algorithm/sorting";

export default {
    name: "SortingVisualizer",
    data() {
        return {
            array: [],
            arrayContainerHeight: null,

            barWidth: 5,

            sortConfig: {
                length: 35,
                animationTime: 5,
            },
            message: "",

            timeoutCapture: [],
        };
    },
    watch: {
        "sortConfig.length"() {
            this.generateArray();
        },
    },
    methods: {
        generateArray() {
            /* Generate a new array */

            // Calculate the barwidth to nicely fit the container
            const containerWidth = this.$refs.arrayContainer.clientWidth;
            this.barWidth = Math.floor(containerWidth / this.sortConfig.length);

            // generate random number for array
            this.array = [];
            for (let i = 0; i < this.sortConfig.length; i++) {
                this.array.push(getRandomInt(50, 900));
            }

            this.clearAllTimeout();
        },
        calcHeight(value) {
            /* Calculate the height of each elemen depends on the container height */

            const height = Math.round(
                (value * this.arrayContainerHeight) / 1000
            );
            return height;
        },
        async mergeSort() {
            /* Merge sort algorithm */

            if (isSorted(this.array)) {
                this.message = "Array is already sorted";
                return;
            }

            this.message = "";
            const copyArr = [...this.array];
            const steps = algorithm.doMergeSort(copyArr);

            steps.forEach(async (step, index) => {
                const bars = document.querySelectorAll("li");

                const [barOneIndex, secondVal, action] = step;

                if (action !== "swap") {
                    const barOneStyle = bars[barOneIndex].style;
                    const barTwoStyle = bars[secondVal].style;

                    const color = action === "compare" ? "blue" : "lightcoral";

                    this.timeoutCapture.push(
                        setTimeout(() => {
                            barOneStyle.backgroundColor = color;
                            barTwoStyle.backgroundColor = color;
                        }, index * this.sortConfig.animationTime)
                    );
                } else {
                    this.timeoutCapture.push(
                        setTimeout(() => {
                            const [barOneIndex, val] = step;
                            this.array[barOneIndex] = val;
                        }, index * this.sortConfig.animationTime)
                    );
                }
            });
        },
        clearAllTimeout() {
            for (let i = 0; i < this.timeoutCapture.length; i++) {
                clearTimeout(this.timeoutCapture[i]);
            }
        },
    },
    mounted() {
        this.generateArray();

        this.arrayContainerHeight = this.$refs.arrayContainer.clientHeight;
    },
};

const getRandomInt = (min, max) => {
    /* Generate a random number */
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
</script>

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
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
                rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

            li {
                list-style: none;
                background: lightcoral;
                height: 100%;
                margin: 0 1px;

                display: flex;
                justify-content: center;
                align-items: center;

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
            justify-content: space-between;
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
                    width: 100%;
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
