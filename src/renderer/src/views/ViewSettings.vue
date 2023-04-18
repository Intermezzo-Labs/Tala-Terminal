<template>
  <AppPanel title="Settings" class="pr-8">
    <form action="" class="grid grid-cols-1 lg:grid-cols-2 gap-8" @submit.prevent="">
      <fieldset>
        <legend>Company Information</legend>
        <InputField
          v-model.lazy="settings.companyName"
          label="Name"
          @change="handleUpdateSetting('companyName')"
        />
        <InputField
          v-model.lazy="settings.companyAddress"
          label="Address"
          @change="handleUpdateSetting('companyAddress')"
        />
        <InputField
          v-model.lazy="settings.companyPhone"
          label="Phone Number"
          @change="handleUpdateSetting('companyPhone')"
        />
      </fieldset>
      <fieldset>
        <legend>Payments</legend>
        <InputField
          v-model.lazy="settings.taxRate"
          label="Tax Rate"
          @change="handleUpdateSetting('taxRate')"
        />
        <InputField
          v-model.lazy="settings.bitcoinAccount"
          label="Bitcoin Address"
          @change="handleUpdateSetting('bitcoinAccount')"
        />
      </fieldset>
      <fieldset>
        <legend>Basic</legend>
        <InputField
          v-model.lazy="settings.currency"
          label="Currency"
          @change="handleUpdateSetting('currency')"
        />
        <InputField
          v-model.lazy="settings.language"
          label="Language"
          @change="handleUpdateSetting('language')"
        />
        <InputField
          v-model.lazy="settings.timezone"
          label="Timezone"
          @change="handleUpdateSetting('timezone')"
        />
      </fieldset>
      <fieldset>
        <legend>User Preferences</legend>
        <InputField
          v-model.lazy="settings.receiptFooter"
          label="Receipt Footer"
          @change="handleUpdateSetting('receiptFooter')"
        />
      </fieldset>
    </form>
  </AppPanel>
</template>

<script setup lang="ts">
import AppPanel from '@renderer/components/AppPanel.vue'
import InputField from '@renderer/components/InputField.vue'
import { SettingKey } from '@shared/models'
import { onMounted, reactive } from 'vue'

const initialSettings: { [key: string]: string } = Object.values(SettingKey).reduce(
  (result, curr) => {
    result[curr] = ''
    return result
  },
  {}
)
const settings = reactive({
  ...initialSettings
})

onMounted(async () => {
  const response = await window.api.settings.getSettings()
  for (const responseSetting of response) {
    settings[responseSetting.key] = responseSetting.value ?? ''
  }
})

async function handleUpdateSetting(key: string): Promise<void> {
  await window.api.settings.updateSetting(key, settings[key])
}
</script>

<style scoped>
fieldset {
  @apply space-y-2;
}
legend {
  @apply text-highlight;
}
</style>
