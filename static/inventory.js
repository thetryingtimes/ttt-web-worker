(function (window) {
  const root = `https://assets.thetryingtimes.com`;

  const inventory = [
    {
      target: 'https://buymeacoffee.com/thetryingtimes',
      asset: `/bmac-v1.jpg`
    },
    { target: 'https://thetryingtimes.com', asset: `/concede-v1.jpg` },
    { target: 'https://thetryingtimes.com', asset: `/independent-v1.jpg` },
    {
      target: 'https://the-trying-times.beehiiv.com/subscribe',
      asset: `/newsletter-v1.jpg`
    },
    {
      target:
        'https://www.tiktok.com/@mikeyjoe12345/video/7468371632579693870?is_from_webapp=1&sender_device=pc&web_id=7468828952762631723',
      asset: `/social-proof-v1.jpg`
    }
  ];

  function template(inventory) {
    return `<a href="${inventory.target}" target="_blank" style="display:block;text-align:center;max-width:500px;margin:2rem auto;"><img src="${root}${inventory.asset}" alt="" style="width:100%;max-width:500px;display:inline-block;"/></a>`;
  }

  function populate(e) {
    const els = document.querySelectorAll('[data-inventory-after]');
    let ad_index = 0;
    let ads = inventory.sort(() => Math.random() - 0.5);

    els.forEach((el) => {
      if (!inventory[ad_index]) ad_index = 0;
      el.insertAdjacentHTML('afterend', template(ads[ad_index]));
      ad_index++;
      el.addEventListener('load_error', () => {
        el.nextSibling.remove();
        el.remove();
      });
    });
  }

  window.addEventListener('popstate', populate);
})(window);
