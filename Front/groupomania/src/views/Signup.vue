<template>

    <div class="container">
        <h1>Inscription</h1>
        <br>
        <br>
        <div class="row">
            <div class="col-md-3">
                
            </div>
            <div class="col-md-6">
                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="inputName" class="form-label">Nom</label>
                        <input type="name" class="form-control" id="inputName">
                    </div>
                    <div class="col-md-6">
                        <label for="inputFirstName" class="form-label">Prénom</label>
                        <input type="firstname" class="form-control" id="inputFirstName">
                    </div>
                    <p id="retourLogin" class="form-text">Vous avez déjà un compte? <a @click="goToConnexion" class="linkTo"> Par ici</a></p>
                    <div class="col-12">
                        <label for="inputEmail" class="form-label">E-mail</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="@">
                    </div>
                    <div class="col-12">
                        <label for="inputPassword" class="form-label">Mots de passe </label>
                        <input type="password" class="form-control" id="inputPassword" placeholder="A l'abri des regards indiscret ">
                    </div>
                    <div class="col-md-6">
                        <label for="inputService" class="form-label">Service</label>
                        <input type="text" class="form-control" id="inputService">
                    </div>
                    <!-- <div class="col-md-4">
                        <label for="inputState" class="form-label">Statue</label>
                        <select id="inputState" class="form-select">
                        <option selected>Utilisateur</option>
                        <option>Admin</option>
                        </select>
                    </div> -->

                    
                    <div class="col-12">
                        <button  @click="createAccount()"  type="submit" class="btn btn-primary">S'inscrire</button>
                    </div>
                </form>
            </div>
            <div class="col-md-3">
                
            </div>
        </div>

    </div>
    
</template>

<script>
export default {
    name: 'signup',
    data: function () {
        return{
        nom: '', 
        prenom: '',
        email: '',
        password: '',
        service : ''
        }
        
    },
    methods: {
    
        goToConnexion(){
            this.$router.push('/login')
        },
        createAccount: function(){
            this.$store.dispatch('createAccount',{
                nom: this.nom, 
                prenom: this.prenom,
                email: this.email,
                password: this.password,
                service : this.service
            })
        }
    }
}
</script>

<style scoped>
.linkTo{
    cursor: pointer;
}
</style>