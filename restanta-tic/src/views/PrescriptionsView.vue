<template>
    <div class="p-5 mt-20">
        <Suspense>
            <PrescriptionsGrid />
        </Suspense>
    </div>
</template>
  
<script>
// @ is an alias to /src
import PrescriptionsGrid from "@/components/Prescriptions/PrescriptionsGrid.vue";
export default {
    name: "PrescriptionsView",
    components: {
        PrescriptionsGrid,
    },
};
</script>