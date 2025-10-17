<script lang="ts">
  export let title: string = "Tailspin Toys";
  export let homeUrl: string = "/";
  export let showAbout: boolean = true;
  
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  // Close menu when clicking outside
  function handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container')) {
      menuOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<header class="bg-blue-500 dark:bg-blue-700 text-white p-4 shadow-md transition-colors duration-300">
  <div class="container mx-auto flex justify-between items-center pl-4 pr-4">
    <div class="flex items-center">
      <div class="relative group menu-container">
        <button 
          on:click={toggleMenu}
          class="focus:outline-none mr-4"
          data-testid="menu-toggle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <nav 
          class="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded shadow-lg z-10 transition-colors duration-300"
          class:hidden={!menuOpen}
          data-testid="menu"
        >
          <ul class="py-1">
            <li>
              <a 
                href={homeUrl} 
                class="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                on:click={closeMenu}
              >
                Home
              </a>
            </li>
            {#if showAbout}
              <li>
                <a 
                  href="/about" 
                  class="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                  on:click={closeMenu}
                >
                  About
                </a>
              </li>
            {/if}
          </ul>
        </nav>
      </div>
      <div class="text-xl font-bold">
        <a href={homeUrl} class="hover:underline" data-testid="site-title">{title}</a>
      </div>
    </div>
  </div>
</header>