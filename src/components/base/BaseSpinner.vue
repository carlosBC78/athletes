<template>
    <div class="base-spinner">
      <div class="base-spinner--lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .base-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .base-spinner--lds-roller {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .base-spinner--lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  .base-spinner--lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3d008d;
    margin: -4px 0 0 -4px;
  }
  .base-spinner--lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
  }
  .base-spinner--lds-roller div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }
  .base-spinner--lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
  }
  .base-spinner--lds-roller div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
  .base-spinner--lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
  }
  .base-spinner--lds-roller div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
  .base-spinner--lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
  }
  .base-spinner--lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
  .base-spinner--lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
  }
  .base-spinner--lds-roller div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
  .base-spinner--lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
  }
  .base-spinner--lds-roller div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
  .base-spinner--lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
  }
  .base-spinner--lds-roller div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
  .base-spinner--lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
  }
  .base-spinner--lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>