<script>
export default {
    name: "Navigation",
};
</script>

<template>
    <div class="nav">
        <!-- Headers -->
        <div class="headers">
            Algo
            <div class="animated">
                <span style="--i: 1">V</span>
                <span style="--i: 2">i</span>
                <span style="--i: 3">s</span>
                <span style="--i: 4">u</span>
                <span style="--i: 5">a</span>
                <span style="--i: 6">l</span>
                <span style="--i: 7">i</span>
                <span style="--i: 8">z</span>
                <span style="--i: 9">e</span>
                <span style="--i: 10">r</span>
            </div>
        </div>

        <div class="select-algo">
            <p class="selected">Sort Alogrithm <i class="fas fa-caret-down"></i></p>
            <ul class="active">
                <li><router-link to="#">Sort Alogrithm</router-link></li>
                <li><router-link to="#">Path Finding Alogrithm</router-link></li>
            </ul>
        </div>

        <!-- Related Links -->
        <div class="related-links">
            <a href="https://github.com/NgoQuocBao1010" target="_blank">
                <i class="fab fa-github"></i>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.nav {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1.2rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    .headers {
        padding: 1rem 0;
        margin-right: auto;
        font-size: 2rem;

        display: flex;
        gap: 10px;

        .animated {
            span {
                font-family: "Comfortaa", cursive;
                font-weight: bold;
                letter-spacing: 1px;
                color: lightcoral;
                display: inline-block;
                animation: flip 3s infinite;
                animation-delay: calc(0.2s * var(--i));
            }
            @keyframes flip {
                0%,
                80% {
                    transform: rotateY(360deg);
                }
            }
        }
    }

    .select-algo {
        padding: 8px 16px;
        min-width: 300px;
        color: #fff;
        text-align: center;
        background: lightcoral;
        border-radius: 1rem;

        cursor: pointer;
        position: relative;

        i {
            margin: 0 0.2rem;
        }

        & ul {
            position: absolute;
            opacity: 0;
            pointer-events: none;
        }
    }

    .related-links {
        margin-left: auto;
        a {
            text-decoration: none;
            color: black;
            font-size: 2rem;
        }
    }
}
</style>
