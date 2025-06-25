<template>
    <div class="loader-container">
        <div class="loading">
            <span class="loader"></span>
            <p>Loading ...</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading'
};
</script>

<style lang="css">

*{
    margin: 0;
    text-decoration: none;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}

.loader-container{
        position: fixed; /* Make sure it sticks even when scrolling */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;

        text-align: center;
        z-index: 9999999;
        backdrop-filter: blur(5px) brightness(50%);

    }
.loader-container .loading{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

.loader-container .loading  .loader {
            
            margin-bottom: 1em;
            width: 6em;
            height: 6em;
            border: 1em solid rgba(95, 139, 202, 0.3);
            border-bottom-color: #5F8BCA;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
        }
        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
        }
</style>