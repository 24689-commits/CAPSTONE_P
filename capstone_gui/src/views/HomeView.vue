<template>
  <div class="home">
    <div class="card" style="max-width: 100%; height:100vh;">
      <div class="row g-0">
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Borrow books online?<br>
              From bestsellers </h5>
              <input type="text" v-model="input" placeholder="Search by title or author"/>
           
          </div>
        </div>
        <div class="col-md-4">
          <img src="https://i.postimg.cc/sfNWn9wc/7c039dd45d88f828766cc8cf5fa09f23.jpg" class="img-fluid rounded-start" alt="books">
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {

  
}
</script>
<style scoped>
.home{
  justify-content: center;

  
}
.card-title{
  padding-top: 90px;
  font-size: 40px;
}
.card-body{
  padding: 70px;
}
.card{
  justify-content: center;

}
.img-fluid{
top: 100px;


}
</style>