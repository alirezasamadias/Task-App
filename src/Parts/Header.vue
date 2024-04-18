<template>
    <nav class="navbar">
        <!-- website logo -->
        <a href="index.html" title="website logo" class="website-logo">
            <img src="../assets/Images/Website-Logo.png" alt="nadin soft logo">
        </a>

        <!-- menu -->
        <ul class="menu" :class="{'show-menu' : show}">
            <li class="menu-item">
                <router-link active-class="active" :to="{name: 'home'}" class="menu-item-link">
                    {{$t("dashboard")}}
                </router-link>
            </li>

            <li class="menu-item">
                <router-link active-class="active" :to="{name: 'todo'}" class="menu-item-link">
                    {{$t("todos")}}
                </router-link>
            </li>

            <li class="menu-item">
                <router-link active-class="active" :to="{name: 'weather'}" class="menu-item-link">
                    {{$t("weather")}}
                </router-link>
            </li>

            <li class="menu-item">
                <router-link active-class="active" :to="{name: 'profile'}" class="menu-item-link">
                    {{$t("profile")}}
                </router-link>
            </li>
        </ul>

        <!-- menu hamburger -->
        <div class="menu-hamburger icon-menu" :class="{'icon-close' : show}" @click="showMenu"></div>

        <!-- profile -->
        <div class="profile">
            <span v-text="userName" class="title-md"></span>
            <i class="btn icon-user"></i>
        </div>
    </nav>
</template>
<script setup>
import { ref } from "vue";

const show = ref(false);
const showMenu = () => show.value = !show.value;

// user name
const userName = ref(localStorage.getItem("userName") || 'user');

// chang theme
window.document.body.dataset.theme = localStorage.getItem('theme');
</script>

<style>
.navbar {
    width: 100%;
    height: 64px;
    padding: 8px 48px;
    background-color: var(--navbar-bg);
    display: flex;
    justify-content:space-between;
    align-items: center;
}

/* website logo */
.website-logo {
    height: 100%;
}

/* menu */
.menu {
    width: 210px;
    height: calc(100% - 64px);
    padding-top: 64px;
    background-color: var(--navbar-bg);
    backdrop-filter: blur(9px);
    position: absolute;
    top: 64px;
    left: 0;
    z-index: 98;
    display: flex;
    flex-direction: column;
    color: var(--menu-text-color);
    transition-duration: var(--duration-time);
}

.menu-item {
    padding: 4px 8px;
}

.menu-item-link {
    width: 100%;
    padding: 16px 32px;
    border-radius: var(--border-radius);
    text-transform: uppercase;
    letter-spacing: 2px;
    font: 15px "montserrat";
    transition-duration: var(--duration-time);
}
.menu-item-link:hover ,
.active {
    background-color: var(--primary-color);
    color: #fff;
}

.profile {
    display: flex;
    column-gap: 8px;
}

/* menu hamburger */
.menu-hamburger {
    display: none;
}

@media(max-width:768px) {
    .navbar {
        height: 56px;
        padding: 8px 24px;
        row-gap: 20px;
    }

    .website-logo {
        margin-right: auto;
    }

    .menu {
        height: calc(100% - 56px);
        top: 56px;
        left: unset;
        right: 0;
        transform: translateX(100%);
        visibility: hidden;
        opacity: 0;
    }

    .menu-hamburger {
        order: 1;
        margin-left: 10px;
        display: block;
        font-size: 28px;
        cursor: pointer;
        position: relative;
        z-index: 99;
        color: #fff;
        transition: var(--duration-time) , color 0.1s;
    }

    .menu-hamburger:active {
        color: #000;
    }

    .show-menu {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
    }

    .icon-close {
        transform: rotate(-180deg);
    }
}    
</style>