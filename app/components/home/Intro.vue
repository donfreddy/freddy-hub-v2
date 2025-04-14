<script setup lang="ts">
const toast = useToast();
const { locale, t } = useI18n();

const openMail = () => {
  const email = 'freddytamwo@gmai.com';
  const subject = 'Hello Don Freddy!';
  const body = 'Hi Don Freddy, I\'m reaching out to you because...';

  window.location.href = `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
};

function downloadCV() {
  const fileName = `cv-${locale.value}.pdf`;
  const filePath = `/${fileName}`;
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName;
  link.click();

  // show toast notification after 5 seconds
  setTimeout(() => {
    toast.add({
      title: t('download.thank_you_title'),
      description: t('download.thank_you_description'),
      icon: 'i-tabler-heart-handshake',
      color: 'success',
    });
  }, 5000);
}
</script>


<template>
  <div class="space-y-6">
    <NuxtImg
      src="/avatar.png"
      alt="Don Freddy"
      class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16"
      sizes="48px sm:64px"
      placeholder
      format="pmg"
    />
    <h1 class="text-3xl font-bold tracking-tight ">
      {{ $t('pages.home.title') }}
    </h1>
    <p>
      {{ $t('pages.home.subtitle') }}
    </p>
    <p>
      {{ $t('pages.home.subtitle2') }}
    </p>
    <div class="flex gap-3">
      <UButton
        @click="downloadCV"
        color="neutral"
        icon="solar:file-download-outline"
        variant="outline"
        size="sm"
        class="cursor-pointer transition duration-300 ease-in-out"
      >{{ $t('pages.home.action_download') }}
      </UButton
      >

      <UButton
        @click="openMail"
        color="neutral"
        icon="solar:letter-outline"
        variant="outline"
        size="sm"
        class="cursor-pointer transition duration-300 ease-in-out"
      >{{ $t('pages.home.action_get_in_touch') }}
      </UButton
      >
    </div>
  </div>
</template>
