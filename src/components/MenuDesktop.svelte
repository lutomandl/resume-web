<script>
    
</script>

<style>
    
    nav {
        position: fixed;
        left: 50px;
        height: 100vh;
        display: flex;
        align-items: center; 
    }

    ul {
        height: 400px;
        display: flex;
        list-style: none;
        flex-direction: column;
        justify-content: space-between;
    }

    .icon {
        opacity: 0.7;
    }

    .icon:hover{
        opacity: 1;
        cursor: pointer;
    }

    .icon-active {
        opacity: 1;
    }
</style>

<nav>
    <ul>
        <li>
            <a href="#home" ><img class="icon icon-active" alt="home-icon" src="home.svg" /></a>
        </li>
        <li>
            <a href="#projects" ><img class="icon" alt="projects-icon" src="projects.svg" /></a>
        </li>
        <li>
            <a href="#work" ><img class="icon" alt="work-icon" src="work.svg" /></a>
        </li>
        <li>
            <a href="#education" ><img class="icon" alt="education-icon" src="education.svg" /></a>
        </li>
        <li>
            <a href="#skills" ><img class="icon" alt="skills-icon" src="skills.svg" /></a>
        </li>
        <li>
            <a href="#hobbies" ><img class="icon" alt="hobbies-icon" src="hobbies.svg" /></a>
        </li>
        <li>
            <a href="#contact" ><img class="icon" alt="contact-icon" src="contact.svg" /></a>
        </li>
    </ul>
</nav>