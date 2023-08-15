// https://vitepress.dev/guide/custom-theme
import { h, ref, onMounted, watch } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'

export default {
  ...Theme, 
  Layout: () => {
    // A reactive property to determine if the banner should be shown
    const showBanner = ref(true);
    let hideUntil;

    // Check sessionStorage and localStorage when the component is mounted
    onMounted(() => {
      // retrieve stored timestamp only after component has been mounted
      hideUntil = localStorage.getItem('hideBannerUntil');

      const currentTime = new Date().getTime(); // get current timestamp
      
      const hideBanner = sessionStorage.getItem('hideBanner');
      if (hideBanner) {
        showBanner.value = false;
      }

      // Check if we have passed the 24 hours since the banner was closed
      if (hideUntil && currentTime < parseInt(hideUntil)) {
        showBanner.value = false;
      }
    })

    // Watch for changes in showBanner's value
    watch(showBanner, (newValue) => {
      if (!newValue) {
        sessionStorage.setItem('hideBanner', 'true');
      }
    })

    const closeBanner = () => {
      // current time + 24 hours in milliseconds
      const hideTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem('hideBannerUntil', hideTime.toString());
      showBanner.value = false;
    }

    return h(Theme.Layout, null, {
      'layout-top': () => 
        showBanner.value 
        ? h('div', { class: 'banner-bar' }, [
          'This site is under construction 🏗️',
          h('button', { class: 'close-button', onClick: closeBanner }, '×')
        ])
      : null
    })
  },
}
