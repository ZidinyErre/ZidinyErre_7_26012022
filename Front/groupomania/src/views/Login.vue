<template>

    <div class="container">
        <h1>Page de Connexion</h1>
        <br>
        <br>
        <div class="row">
            <div class="col-md-3">
                
            </div>
            <div class="col-md-6">
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">E-mail</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        <p id="emailHelp" class="form-text">Pas encore de compte ? <a @click="goToInscription" class="linkTo"> Par ici</a></p>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Mots de passe </label>
                        <input type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Connexion</button>
                </form>
            </div>
            <div class="col-md-3">
                
            </div>
        </div>

    </div>
    
</template>

<script>
export default {

    methods: {
        goToInscription(){
            this.$router.push('/signup')
        }
    }

}
</script>

<style scoped>
.linkTo{
    cursor:pointer;
}
</style>