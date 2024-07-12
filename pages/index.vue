<template>
  <div>
   <div class="maindiv">
    
    <img class="img1"  src="../assets/pinia.png" alt="pinia-Logo">
    <h2><span class="your">Your</span> <span class="task"> Task</span></h2>
    <img class="img2" src="../assets/pinia.png" alt="pinia-Logo">
   </div>
    <home />
  </div>
</template>

<script setup>

</script>
<style>
.maindiv{
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: auto;
    align-items: center;

}
.maindiv h2{
    font-size: 30px;
    font-weight: 800;
    margin-left: 6px;
}

.img1{
height: 120px;
transform: rotate(10deg);
}
.img2{
    height: 120px;
    transform: rotate(-10deg);
}
@media (max-width:600px) {
    .img1{
height: 80px;
transform: rotate(10deg);
}
.img2{
    height: 80px;
    transform: rotate(-10deg);
}
.maindiv{
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: auto;
    align-items: center;

}
}
.your{
    color: green;
}
.task{
    color: yellow;
    
}
</style>
