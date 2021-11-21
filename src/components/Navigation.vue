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

        <!-- Related Links -->
        <ul class="related-links">
            <li><router-link to="/sort">Sorting Algorithm</router-link></li>
            <li><router-link to="/path">Pathfinding Algorithm</router-link></li>
            <li>
                <a href="https://github.com/NgoQuocBao1010" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
            </li>
        </ul>
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

    .related-links {
        display: flex;
        align-items: center;
        gap: 2rem;

        li {
            list-style: none;
            font-size: 1.2rem;
            padding-bottom: 3px;

            a {
                text-decoration: none;
                color: black;

                i {
                    font-size: 2rem;
                }

                &.router-link-active {
                    border-bottom: 0.1em solid lightcoral;
                    color: lightcoral;
                }
            }
        }
    }
}
</style>
