<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="w-screen h-10 fixed top-0 bg-zinc-800 flex flex-col justify-center p-2">
    <title>Hesapbiçer</title>
    <div class="logo flex flex-row " id="logo">
        <a class="p-3 hover:bg-zinc-709" href="/">
            <img class="" src="" alt="Hesapbiçer" srcset="">
        </a>
        <a class="about p-3 hover:bg-zinc-700"href="about" >Hakkında</a>
        <div class="flex-grow"></div>
        <a href="https://github.com/Tarik366" class="p-3 hover:bg-zinc-700"><i class="nf nf-fa-github"></i></a>
    </div>
</header>
<div class="bg-zinc-900 w-screen h-screen flex items-center justify-center flex-col">
{@render children?.()}
</div>