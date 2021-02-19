<script>

    let menuOpened = false;

    function toggleMenu() {
        if (menuOpened) {
            menuOpened = false;
        } else {
            menuOpened = true;
        }
    }
</script>

<style>
    div.burger-button {
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 3;
        height: 80px;
        width: 80px;
    }

    div.burger-button > img {
        width: 24px;
        position: fixed;
        top: 28px;
        left: 28px;
    }

    div.menu-tab {
        background: #ffffff70;
        position: fixed;
        top: 0;
        width: 80px;
        height: 100vh;
        left: -80px;
        z-index: 2;
        transition: 150ms;
        overflow-y: scroll;
    }
    
    div.menu-tab.menuOpened {
        left: 0;
        display: flex;
        align-items: center;
        
    }

    nav {
        position: absolute;
        top: 80px;
    }

    ul {
        height: 400px;
        display: flex;
        list-style: none;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 28px;
        position: relative;
    }

    .icon {
        opacity: 0.7;
        width: 24px;
        z-index: 3;
    }

    .icon:hover{
        opacity: 1;
        cursor: pointer;
    }

    .icon-focus {
        opacity: 1;
    }

    .backdrop {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        opacity: 0.25;
        z-index: 1;
    }

    .backdrop.menuOpened {
        display: block;
    }
</style>
  
<div class="burger-button" class:menuOpened on:click={toggleMenu}>
    {#if menuOpened}
        <img src="x.svg" alt="Menu" />
    {:else}
        <img src="menu.svg" alt="Menu" />
    {/if}
</div>
<div class="menu-tab" class:menuOpened>
    <nav>
        <ul>
            <li>
                <a href="#home" on:click={toggleMenu}><img class="icon icon-focus" alt="home-icon" src="home.svg" /></a>
            </li>
            <li>
                <a href="#projects" on:click={toggleMenu}><img class="icon" alt="projects-icon" src="projects.svg" /></a>
            </li>
            <li>
                <a href="#work" on:click={toggleMenu}><img class="icon" alt="work-icon" src="work.svg" /></a>
            </li>
            <li>
                <a href="#education" on:click={toggleMenu}><img class="icon" alt="education-icon" src="education.svg" /></a>
            </li>
            <li>
                <a href="#skills" on:click={toggleMenu}><img class="icon" alt="skills-icon" src="skills.svg" /></a>
            </li>
            <li>
                <a href="#hobbies" on:click={toggleMenu}><img class="icon" alt="hobbies-icon" src="hobbies.svg" /></a>
            </li>
            <li>
                <a href="#contact" on:click={toggleMenu}><img class="icon" alt="contact-icon" src="contact.svg" /></a>
            </li>
        </ul>
    <nav/>
</div>

<div class="backdrop" class:menuOpened on:click={toggleMenu} />
