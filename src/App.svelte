<script>
	import MenuDesktop from "../src/components/MenuDesktop.svelte"
	import MenuMobile from "../src/components/MenuMobile.svelte"
	import Head from "../src/components/Head.svelte"
	import Home from "../src/components/Home.svelte"
</script>

<div class="background"></div> 

<header class="desktop">
	<MenuDesktop />
</header>
<header class="mobile">
	<MenuMobile/>
</header>

<main>	
	<Head/>
	<section id="home" class="pageWrapper">
		<Home/>
	</section>
	<section id="projects" class="pageWrapper">
		<Home/>
	</section>	
	<section id="work" class="pageWrapper">
		<Home/>
	</section>	
	<section id="education" class="pageWrapper">
		<Home/>
	</section>	
	<section id="skills" class="pageWrapper">
		<Home/>
	</section>	
	<section id="hobbies" class="pageWrapper">
		<Home/>
	</section>	
	<section id="contact" class="pageWrapper">
		<Home/>
	</section>	
</main>

<style>
	.background {
		background-color: #ffffff80;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}

	main {
		padding-left: 160px;
		padding-right: 50px;
		padding-top: 50px
	}

	section.pageWrapper {
		min-height: 100vh;
		max-width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 1024px) {
		.mobile{
			display: none;
		}
	}

	@media (max-width: 1024px) {
		.desktop{
			display: none;
		}

		main {
			padding-left: 50px;
		}

		section.pageWrapper {
			flex-direction: column;
			align-items: normal;
		}
	}
</style>