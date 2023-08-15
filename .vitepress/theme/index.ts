// https://vitepress.dev/guide/custom-theme
import { h, ref, onMounted, watch } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'

const currentTime = new Date().getTime(); // get current timestamp
const hideUntil = localStorage.getItem('hideBannerUntil'); // retrieve stored timestamp

export default {
  ...Theme, 
  Layout: () => {
    // A reactive property to determine if the banner should be shown
    const showBanner = ref(true)

    // Check sessionStorage when the component is mounted
    onMounted(() => {
      const hideBanner = sessionStorage.getItem('hideBanner')
      if (hideBanner) {
        showBanner.value = false
      }
    })

    // Watch for changes in showBanner's value
    watch(showBanner, (newValue) => {
      if (!newValue) {
        sessionStorage.setItem('hideBanner', 'true')
      }
    })

    // Check if we have passed the 24 hours since the banner was closed
    if (hideUntil && currentTime < parseInt(hideUntil)) {
      showBanner.value = false;
    }
    
    const closeBanner = () => {
      const hideTime = new Date().getTime() + 24 * 60 * 60 * 1000; // current time + 24 hours in milliseconds
      localStorage.setItem('hideBannerUntil', hideTime.toString());
      showBanner.value = false;
    }

    return h(Theme.Layout, null, {
      'layout-top': () => 
        showBanner.value 
        ? h('div', { class: 'layout-top' }, [
            'This site is under construction 🏗️',
            h('button', { class: 'close-button', onClick: closeBanner }, 'X')
          ]) 
        : null
    })
  },
}