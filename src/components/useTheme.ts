import { ref, onMounted, watch } from 'vue';

export function useTheme() {
const isDarkMode = ref(false);

const initTheme = () => {
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

isDarkMode.value = savedTheme === 'dark' || (!savedTheme && prefersDark);
document.documentElement.classList.toggle('dark-theme', isDarkMode.value);
};

const toggleTheme = () => {
isDarkMode.value = !isDarkMode.value;
localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

watch(isDarkMode, (newValue) => {
document.documentElement.classList.toggle('dark-theme', newValue);
});

onMounted(() => {
initTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
if (!localStorage.getItem('theme')) {
isDarkMode.value = e.matches;
}
});
});

return {
isDarkMode,
toggleTheme
};
}