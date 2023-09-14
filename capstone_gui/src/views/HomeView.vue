<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="position-relative">
          <div class="welcome">
            <h1>Welcome to The Knowledge Hub</h1>
          </div>
          <img
            src="https://i.pinimg.com/564x/eb/03/d5/eb03d57ebf68a097d78f3ce9771ea393.jpg"
            class="card-img img-top img-fluid custom-img"
            alt="profile image"
          />
          <div class="text-overlay">
            <p class="text">Opening Time : 08:30</p>
            <p class="text">Closing Time : 15:00</p>
            <p class="text">Monday - Friday</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container-fluid{
  background-color: #D9D9D9;
}
.position-relative {
  position: relative;
}
.welcome{
  position: absolute;
  top: 8%;
  left: 50%;
  width: 700px;
  transform: translate(-50%, -50%);
  padding: 10px;
  color: rgb(99, 74, 74);
}
.welcome h1{
  font-size: 30px;
  font-style: italic;
  text-decoration: underline;
}
.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  color: white;
  border-radius: 5px;
}

.text {
  margin: 0;
  text-align: center;
}

.custom-img {
  margin: 20px 0;
  object-fit: cover;
  width: 100%;
  height: 85vh;
}
</style>
