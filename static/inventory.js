(function (window) {
  const root = `https://assets.thetryingtimes.com`;

  const guaranteed = [
    {
      target: 'https://buymeacoffee.com/the.trying.times',
      asset: `/bmac-v2.jpg`
    }
  ];

  const inventory = [
    {
      target: 'https://www.youtube.com/watch?v=9tocssf3w80',
      asset: `/concede-v3.jpg`
    },
    {
      target: 'https://thetryingtimes.com/mission-statement',
      asset: `/independent-v1.jpg`
    },
    {
      target: 'https://the-trying-times.beehiiv.com/subscribe',
      asset: `/newsletter-v3.jpg`
    },
    {
      target: 'https://www.tiktok.com/@mikeyjoe12345/video/7468371632579693870',
      asset: `/social-proof-v2.jpg`
    }
  ];

  function template(inventory) {
    return `<a href="${inventory.target}" target="_blank" style="display:block;text-align:center;max-width:420px;margin:2rem auto;"><img src="${root}${inventory.asset}" width="420" height="420" alt="" style="max-width:100%;height:auto;aspect-ratio:1/1;display:inline-block;"/></a>`;
  }

  function populate(e) {
    const els = document.querySelectorAll('.inventory-container');
    let ad_index = 0;
    let ads = inventory.sort(() => Math.random() - 0.5);
    ads = [...guaranteed, ...ads];

    els.forEach((el) => {
      if (!inventory[ad_index]) ad_index = 0;
      el.innerHTML = template(ads[ad_index]);
      ad_index++;
    });
  }

  window.addEventListener('popstate', populate);
  window.addEventListener('load', populate);
})(window);
