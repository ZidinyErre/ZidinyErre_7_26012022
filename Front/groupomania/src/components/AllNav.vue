<template>
<div class="allnav">
      <img src="../assets/icon-left-font.png" alt="logo-groupomania" class="logo">
      <div>
                <router-link to="/">Home</router-link> |
                <router-link to="/signup">Signup</router-link> |
                <router-link to="/login">Login</router-link> |
                <router-link to="/post">Publication</router-link>
        <router-view/>
            </div>
    </div>
          
</template>

<script>

</script>

<style scoped>

.logo{
    width: 15em;
}

ul{
    background-color: aqua;
    display: flex;
}


</style>