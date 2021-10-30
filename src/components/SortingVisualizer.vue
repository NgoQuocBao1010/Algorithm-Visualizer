<template>
    <div class="wrapper">
        <div class="array-container">
            <ul ref="arrayContainer">
                <li
                    v-for="(value, index) in array"
                    :key="index"
                    :style="{ height: `${calcHeight(value)}px` }"
                >
                    {{ value }}
                </li>
            </ul>
        </div>

        <!-- Control buttons -->
        <div class="button-container">
            <button @click="generateArray()">Gerenare new Array</button>
            <button @click="mergeSort()">Sorting</button>
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
        };
    },
    computed: {},
    methods: {
        generateArray(length = 10) {
            /* Generate a new array */
            this.array = [];
            for (let i = 0; i < length; i++) {
                this.array.push(getRandomInt(5, 200));
            }
        },
        calcHeight(value) {
            /* Calculate the height of each elemen depends on the container height */

            const height = Math.round(
                (value * this.arrayContainerHeight) / 200
            );
            return height;
        },
        mergeSort() {
            const copyArr = [...this.array];
            const steps = algorithm.doMergeSort(copyArr);

            steps.forEach((step, index) => {
                const bars = document.querySelectorAll("li");
            });
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
            margin: 1rem 0;
            width: 80%;
            height: 50vh;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;

            li {
                list-style: none;
                background: lightcoral;
                width: 3px;
                max-width: 3px !important;
                height: 100%;
            }
        }
    }

    .button-container {
        margin: 2rem;
        display: flex;
        gap: 1rem;

        button {
            cursor: pointer;
            padding: 8px 16px;
        }
    }
}
</style>
