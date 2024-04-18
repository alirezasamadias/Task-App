import { onMounted } from "vue";

const useTabTitle = (TabTitleText) => {
    onMounted(() => 
        document.title = `Task App - ${TabTitleText}`
    )
};

export default useTabTitle;