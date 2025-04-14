<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const message = ref('');
const loading = ref(false);

const subscribe = async () => {
  if (!email.value || !email.value.includes('@')) {
    message.value = 'Please enter a valid email address.';
    showToast(message.value);
    return;
  }
  loading.value = true;
  try {
    const response = await $fetch('/api/subscribe', {
      method: 'POST',
      body: { email: email.value },
    });
    message.value = response.message;
    showToast(message.value, 'success');
    email.value = ''; // Clear the input after success
    loading.value = false;
  } catch (error) {
    message.value = error?.data?.statusMessage || 'An error occurred.';
    showToast(message.value);
    loading.value = false;
  }
};

const toast = useToast();

function showToast(msg, type = 'error') {
  toast.add({
    title: 'Newsletter',
    description: msg,
    color: type,
    icon: 'solar:letter-unread-outline',
  });
}
</script>

<template>
  <UCard class="dark:bg-gray-500/10 dark:ring-white/10">
    <div class="mb-3 inline-flex items-center gap-3">
      <UChip color="primary" />
      <h2 class="uppercase text-xs font-semibold text-gray-400">
        {{ $t('components.newsletter.title') }}
      </h2>
    </div>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      {{ $t('components.newsletter.subtitle') }}
    </p>
    <div class="flex items-center gap-3 mt-6">
      <UInput
        placeholder="johndoe@gmail.com"
        icon="solar:letter-outline"
        class="flex-1"
        type="email"
        size="lg"
        v-model.trim="email"
      />
      <UButton
        :label="$t('components.newsletter.subscribe') + ' &rarr;'"
        size="lg"
        class="cursor-pointer transition duration-300 ease-in-out"
        color="neutral"
        :disabled="loading || !email"
        @click="subscribe"
      />
    </div>
  </UCard>
</template>
