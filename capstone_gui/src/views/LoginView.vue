<template>
    <div class="container">
      <div class="home align-center">
        <div class="row justify-content-center">
          <div class="col-md-6 image-container">
            <img src="https://i.postimg.cc/hjGv0VTy/2221e8be-f780-4528-b1c1-19fbce13f220.jpg" class="img-fluid img-left" alt="profile image">
          </div>
          <div class="col-md-6 card-wrapper gray-background">
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">WELCOME</h3>
                <div class="form-group">
                  <input type="email" class="form-control" placeholder="Email Address">
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" placeholder="Password">
                </div>
                <button class="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .home {
    display: flex;
  }
  
  .image-container {
    padding: 20px;
    text-align: center; 
  }
  
  .card-wrapper {
    padding: 20px;
  }
  
  .img-left {
    max-width: 100%;
    height: auto;
  }
  
  .gray-background {
    background-color: #f0f0f0;
  }
  
  .card-title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  