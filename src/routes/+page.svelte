<script lang="ts">
    import { tick, onMount } from 'svelte';
	import Checkbox from './Checkbox.svelte';
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();
    let selectedItems: string[] = $state([]);
    let outcomeyes = $state(false);
    let nameyes = $state("");
    let priceyes = $state(0);
    let gridData: Map<string, number> = $state(data.post.gridData);


    function addExpense(name: string, price: number) {
        const newData = new Map(gridData);
        newData.set(name, price); // varsa günceller, yoksa ekler
        gridData = newData;
        window.localStorage.setItem("expenses", JSON.stringify(Array.from(gridData.entries())));
    }

    function removeExpense(name: string) {
        const newData = new Map(gridData);
        newData.delete(name); // varsa siler
        gridData = newData;
        window.localStorage.setItem("expenses", JSON.stringify(Array.from(gridData.entries())));
    }
    
    function loadExpense(){
    // Sayfa yüklendiğinde localStorage'dan verileri al ve gridData'ya ekle
        if (window.localStorage.getItem("expenses") || false) {
            new Map(JSON.parse(window.localStorage.getItem("expenses") ?? "[]")).forEach((value, key) => {
                let name: any = key;
                let price: any = value;
                addExpense(name, price);
            });
        }
    }
    onMount(async () => {
    // tüm DOM güncellendikten sonra çalışır
        await tick();
        loadExpense();
    });
</script>
<div class="main w-full flex flex-col items-center justify-center mt-10 data-sveltekit-reload">
        <h1 class="text-4xl text-zinc-300">Hesapbiçer</h1>
        <p class="text-zinc-400">Basit gider hesabı</p>
        <div id="expenseList" class="grid grid-cols-4 w-4/5 ">
            {#each gridData.entries() as [name, price]}
                <div >
                    <input 
                        class="hidden peer m-4" 
                        bind:group={selectedItems} 
                        value={name} type="checkbox" 
                        name="{name}" 
                        id="{name}" 
                    />
                    <label for="{name}" 
                        class="expense border-2 border-zinc-300 m-2 p-2 rounded-lg bg-zinc-800 peer-checked:border-blue-600 dark:peer-checked:blue-600 cursor-pointer hover:bg-zinc-700 flex flex-row"
                    >
                        
                        <i class="nf nf-fa-{name.split(' ')[0].toLowerCase()} nf-md-{name.split(' ')[0].toLowerCase()} m-3 text-2xl"></i>

                        <div class="flex flex-col">
                            <p class="text-zinc-300">{name}</p>
                            <p class="text-zinc-400">{price} ₺</p>
                        </div>
                        <div class="del flex-grow flex justify-end items-start">
                            <button 
                                onclick={() => removeExpense(name)} 
                                class="cursor-pointer hover:bg-red-700 text-zinc-300 rounded-full relative h-7 w-7 leading-0 "
                            >
                                <i class="nf nf-oct-x"></i>
                            </button>
                        </div>
                    </label>
                </div>
            {/each}
        </div>

        <div class="w-4/5 flex flex-col" id="calculation">
            {#each selectedItems as item}
                <div class="w-full">
                    {item} : {gridData.get(item)} ₺
                </div>
            {/each}
            <div class="w-full border-t-2 border-zinc-300 mt-2 pt-2">
                Toplam: {selectedItems.reduce((pre, curr) => pre + (gridData.get(curr) ?? 0), 0)} ₺ <br>
                Yıllık Toplam: {selectedItems.reduce((pre, curr) => pre + (gridData.get(curr) ?? 0), 0) * 12} ₺
            </div>
        </div>

        <div class="addoutcome w-1/2 flex flex-col mt-4">
            <input bind:value={nameyes} id="outcomeName" type="text" placeholder="Gider adı" class="outcum peer m-2 p-2 rounded-lg bg-zinc-800 border-2 border-zinc-300 text-zinc-300" />
            <input bind:value={priceyes} id="outcomePrice" type="number" placeholder="Gider tutarı" class="outcum peer m-2 p-2 rounded-lg bg-zinc-800 border-2 border-zinc-300 text-zinc-300" />
            <button disabled={!(nameyes && priceyes)} onclick={() => addExpense(nameyes, priceyes)} class="m-2 p-2 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:hover:cursor-not-allowed">Ekle</button>
        </div>
</div>