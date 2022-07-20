<template>
    <div class="lanav">
        <nav>
            <ul>
                <li>
                    <router-link to="/">Home</router-link> |
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
                    <router-view/>

        </nav>
        
    </div>

   

    
</template>

<script>

</script>

<style scoped>

ul{
    background-color: aqua;
    display: flex;
}

</style>