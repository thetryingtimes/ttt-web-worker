<script lang="ts">
  const links = [
    {
      href: 'mailto:thetryingtimes@proton.me?subject=Letter+to+the+editor',
      label: 'thetryingtimes@proton.me',
      icon: 'mail_lock'
    },
    {
      href: '#',
      label: 'Buy me a Coffee',
      icon: 'coffee'
    },
    {
      href: 'https://github.com/thetryingtimes',
      label: 'Open Source Software',
      icon: 'terminal'
    },
    {
      href: '/terms-of-use',
      label: 'Terms of Use',
      icon: 'gavel'
    },
    {
      href: '/privacy-policy',
      label: 'Privacy Policy',
      icon: 'policy'
    }
  ];
</script>

<footer
  class="border-t-ttt border-b-ttt border-t-8 border-b-8 bg-gray-100 py-2"
>
  <div class="m-auto flex max-w-prose flex-col gap-4">
    <div class="flex gap-2 px-2">
      <img
        src="/icon.svg"
        alt="The Trying Times"
        class="aspect-square grow-0"
      />
      <div class="flex grow flex-col items-center justify-center gap-2 text-sm">
        <p class="text-center text-pretty md:px-8">
          “The only thing necessary for the triumph of evil is for good men to
          do nothing.”
        </p>
        <p><strong>Edmund Burke, 1795</strong></p>
      </div>
    </div>
    <ul class="flex flex-wrap justify-center gap-4">
      {#each links as link (link.href)}
        <li>
          <a href={link.href} class="flex items-center gap-1">
            <span
              aria-hidden="true"
              class="material-symbols-outlined no-underline">{link.icon}</span
            >
            <span class="font-bold underline">{link.label}</span></a
          >
        </li>
      {/each}
      <li class="copyleft flex items-center gap-1">
        <span aria-hidden="true" class="material-symbols-outlined"
          >attribution</span
        >
        <span aria-hidden="true" class="material-symbols-outlined"
          >closed_caption</span
        >
        This work is licensed under
        <a
          class="font-bold underline"
          href="https://creativecommons.org/licenses/by/4.0/deed.en"
          >CC BY 4.0</a
        >
      </li>
    </ul>
  </div>
</footer>

<style>
  li .material-symbols-outlined {
    font-size: 18px;
  }
</style>
